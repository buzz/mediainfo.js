import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { CPU_CORES, CXXFLAGS, MediaInfoLib_CXXFLAGS, VENDOR_DIR } from '../constants.ts'
import { spawn } from '../utils.ts'

const mediainfolibDir = path.join(VENDOR_DIR, 'MediaInfoLib', 'Project', 'GNU', 'Library')
const sourceDir = path.join(VENDOR_DIR, 'MediaInfoLib', 'Source')

// FIXME(libmediainfo): Drop once upstream fixes
// https://github.com/MediaArea/MediaInfoLib/issues/2601.
// The C1 control character filter added in 26.01 checks single bytes, but we build ZenLib with
// --disable-unicode, so Ztrings hold UTF-8 and bytes 0x80-0x9F are valid continuation bytes.
// Every metadata value containing such a byte got corrupted, e.g. '’' (U+2019) -> '?'.
const analyzedStreamsFile = 'MediaInfo/File__Analyze_Streams.cpp'
const c1FilterMarker = '(c >= 0x7F && c < 0xA0)'

async function patchC1Filter() {
  // Fails loudly if upstream changed the filter: a silently skipped patch means shipping
  // corrupted UTF-8 metadata, so check by hand instead of guessing.
  const isPresent = await spawn('grep', ['-qF', c1FilterMarker, analyzedStreamsFile], sourceDir)
    .then(() => true)
    .catch(() => false)

  if (!isPresent) {
    throw new Error(
      `Cannot patch ${analyzedStreamsFile}: "${c1FilterMarker}" not found. Either upstream fixed MediaArea/MediaInfoLib#2601 (delete this patch) or the filter moved (re-check UTF-8 metadata before dropping it).`
    )
  }

  await spawn('sed', ['-i', `s/${c1FilterMarker}/(c == 0x7F)/`, analyzedStreamsFile], sourceDir)
}

// FIXME(libmediainfo): Drop once we move past 26.10; upstream fixed it in
// MediaArea/MediaInfoLib@7a3b2a2590 (PR #2753, 2026-11-01).
// 26.10 includes <cmath> only under `#if MEDIAINFO_DEMUX`, while ceil() is used in code that is
// compiled with MEDIAINFO_DEMUX_NO, our configuration. It went unnoticed because libc++ pulled
// <cmath> in transitively; libc++ 23 (Emscripten 7.0.0) stopped doing that, so the guard became a
// hard 'use of undeclared identifier' error in MediaInfo_Config_MediaInfo.cpp.
const configMediaInfoFile = 'MediaInfo/MediaInfo_Config_MediaInfo.cpp'
const cmathGuardedMarker = [
  '#if MEDIAINFO_DEMUX',
  '    #include <cmath>',
  '#endif //MEDIAINFO_DEMUX',
]
const cmathFixedLine = '#include <cmath>'

async function patchCmathInclude() {
  const file = path.join(sourceDir, configMediaInfoFile)
  const source = await readFile(file, 'utf8')

  // No-op when <cmath> is already included unconditionally (line-anchored: the guarded variant
  // holds the same text, only indented). Upstream fixed it, so delete this patch per the FIXME.
  if (new RegExp(`^${cmathFixedLine}$`, 'm').test(source)) {
    return
  }

  // Upstream keeps CRLF in this file, so match the line endings that are actually there.
  const eol = source.includes('\r\n') ? '\r\n' : '\n'
  const guarded = cmathGuardedMarker.join(eol)

  // Fails loudly if upstream reworked the includes: a silently skipped patch means the build
  // breaks again on the next libc++ bump, so check by hand instead of guessing.
  if (!source.includes(guarded)) {
    throw new Error(
      `Cannot patch ${configMediaInfoFile}: guarded <cmath> include not found. Either upstream made the include unconditional (delete this patch) or the include block moved (re-check the MEDIAINFO_DEMUX_NO build).`
    )
  }

  await writeFile(
    file,
    source.replace(guarded, () => cmathFixedLine)
  )
}

async function task() {
  // Emscripten 6.x moved zlib to the lazy-built ports system: libz.a is no
  // longer prebuilt in the sysroot, only generated when a command line carries
  // -sUSE_ZLIB=1. configure link-tests `-lz` with CFLAGS (which don't carry
  // it, only CXXFLAGS do), so prebuild the port for it.
  await spawn('embuilder', ['build', 'zlib'], mediainfolibDir)

  await spawn('sh', ['./autogen.sh'], mediainfolibDir)
  await spawn('sed', ['-i', 's/-O2/-Oz/', 'configure'], mediainfolibDir)
  await patchC1Filter()
  await patchCmathInclude()
  await spawn(
    'emconfigure',
    [
      './configure',
      '--host=le32-unknown-nacl',
      '--enable-static',
      '--disable-shared',
      '--disable-dll',
      `CXXFLAGS=${CXXFLAGS} ${MediaInfoLib_CXXFLAGS}`,
    ],
    mediainfolibDir
  )
  await spawn('emmake', ['make', `-j${CPU_CORES}`], mediainfolibDir)
}

task.displayName = 'compile:mediainfolib'
task.description = 'Compile MediaInfoLib'

export default task
