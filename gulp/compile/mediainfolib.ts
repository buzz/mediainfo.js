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
  const present = await spawn('grep', ['-qF', c1FilterMarker, analyzedStreamsFile], sourceDir).then(
    () => true,
    () => false
  )

  if (!present) {
    throw new Error(
      `Cannot patch ${analyzedStreamsFile}: "${c1FilterMarker}" not found. Either upstream fixed MediaArea/MediaInfoLib#2601 (delete this patch) or the filter moved (re-check UTF-8 metadata before dropping it).`
    )
  }

  await spawn('sed', ['-i', `s/${c1FilterMarker}/(c == 0x7F)/`, analyzedStreamsFile], sourceDir)
}

async function task() {
  await spawn('./autogen.sh', [], mediainfolibDir)
  await spawn('sed', ['-i', 's/-O2/-Oz/', 'configure'], mediainfolibDir)
  await patchC1Filter()
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
