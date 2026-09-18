import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { CPU_CORES, CXXFLAGS, VENDOR_DIR } from '../constants.ts'
import { spawn } from '../utils.ts'

const zenlibDir = path.join(VENDOR_DIR, 'ZenLib', 'Project', 'GNU', 'Library')
const sourceDir = path.join(VENDOR_DIR, 'ZenLib', 'Source')
const ztringFile = 'ZenLib/Ztring.cpp'

// FIXME(libzen): Drop once we vendor a libzen release containing
// https://github.com/MediaArea/ZenLib/pull/176 (merged 2025-04-06, i.e. after 0.4.41 of 2023-04-04).
// We build ZenLib with --disable-unicode, so `Ztring` is a `std::string` holding UTF-8, and these
// are exactly the code paths that produce that UTF-8. Unpatched, in that mode:
//
//  * `From_ISO_8859_1/_2(S, Start, Length)` keeps its `#ifdef _UNICODE` conversion branch and takes
//    the `#else` one instead, which assigns the raw bytes: a Latin-1 ID3 frame ends up as invalid
//    UTF-8.
//  * `From_Unicode(S)` sizes the output buffer with `wcslen(S)` (characters) instead of the byte
//    count `wcstombs()` reported, so every multi-byte tail gets cut off.
//
// Together with the `setlocale(LC_ALL, "C.UTF-8")` in src/MediaInfoModule.cpp this is what issue
// #150 needs; tests/__tests__/id3_char_encodings.test.ts covers it.
const broken = [
  String.raw`    #ifdef _UNICODE
        char* Temp = new char[Length+1];
        strncpy(Temp, S +Start, Length);
        Temp[Length] = '\0';
        From_ISO_8859_1(Temp);
        delete[] Temp;
    #else
        assign(S +Start, Length);
        if (find(__T('\0')) != std::string::npos)
            resize(find(__T('\0')));
    #endif`,
  String.raw`    #ifdef _UNICODE
        char* Temp = new char[Length+1];
        strncpy(Temp, S +Start, Length);
        Temp[Length] = '\0';
        From_ISO_8859_2(Temp);
        delete[] Temp;
    #else
        assign(S +Start, Length);
        if (find(__T('\0')) != std::string::npos)
            resize(find(__T('\0')));
    #endif`,
  '                    Size=wcstombs(AnsiString, S, wcslen(S));',
]

const fixed = [
  String.raw`    char* Temp = new char[Length+1];
    strncpy(Temp, S +Start, Length);
    Temp[Length] = '\0';
    From_ISO_8859_1(Temp);
    delete[] Temp;`,
  String.raw`    char* Temp = new char[Length+1];
    strncpy(Temp, S +Start, Length);
    Temp[Length] = '\0';
    From_ISO_8859_2(Temp);
    delete[] Temp;`,
  '                    Size=wcstombs(AnsiString, S, Size+1);',
]

async function patchEncodingConversions() {
  const file = path.join(sourceDir, ztringFile)
  let source = await readFile(file, 'utf8')
  // Ztring.cpp is CRLF, keep it that way
  const eol = source.includes('\r\n') ? '\r\n' : '\n'
  const eolOf = (hunk: string) => hunk.split('\n').join(eol)

  for (let index = 0; index < broken.length; index++) {
    const brokenHunk = eolOf(broken[index])
    const fixedHunk = eolOf(fixed[index])
    // Already applied: our own patch on a dirty vendor tree, or upstream fixed it (in which case
    // delete this patch per the FIXME).
    if (source.includes(fixedHunk)) {
      continue
    }

    // Fails loudly if upstream reworked the conversions: a silently skipped patch means shipping
    // corrupted metadata tags, so check by hand instead of guessing.
    if (!source.includes(brokenHunk)) {
      throw new Error(
        `Cannot patch ${ztringFile}: hunk ${index + 1} of ${broken.length} (ZenLib#176) not found. Either upstream fixed it (delete this patch) or Ztring.cpp changed (re-port the fix).`
      )
    }

    source = source.replace(brokenHunk, () => fixedHunk)
  }

  await writeFile(file, source)
}

async function task() {
  await spawn('./autogen.sh', [], zenlibDir)
  await spawn('sed', ['-i', 's/-O2/-Oz/', 'configure'], zenlibDir)
  await patchEncodingConversions()
  await spawn(
    'emconfigure',
    [
      './configure',
      '--host=le32-unknown-nacl',
      '--disable-unicode',
      '--enable-static',
      '--disable-shared',
      `CXXFLAGS=${CXXFLAGS}`,
    ],
    zenlibDir
  )
  await spawn('emmake', ['make', `-j${CPU_CORES}`], zenlibDir)
}

task.displayName = 'compile:zenlib'
task.description = 'Compile zenlib'

export default task
