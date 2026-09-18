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

// FIXME(libmediainfo): Drop once upstream merges
// https://github.com/MediaArea/MediaInfoLib/pull/2661 (fix for
// https://github.com/MediaArea/MediaInfoLib/issues/2659).
// 26.05's AnnexB AV1 support (MediaArea/MediaInfoLib#2516) reads `obu_size` via Get_leb128;
// on zero bytes that yields 0 and the parser loops through the whole file without ever
// rejecting, so File__MultipleParsing never empties and the analysis only fills at EOF. On a
// virtual 2^63-byte file that overflows the analyzeData recursion stack
// (tests/__tests__/bigInt.test.ts). The #2661 patch, unlike re-adding the 25.10 "probing
// mode" early reject, keeps the new AnnexB AV1 feature working.
const av1File = 'MediaInfo/Video/File_Av1.cpp'
const av1RejectMarker = 'if (obu_size == 0 && Element_Offset < Element_Size)'
const av1InsertMarker =
  '        Get_leb128 (obu_size,                                   "obu_size");'
const av1RejectCode = [
  '        if (obu_size == 0 && Element_Offset < Element_Size) {',
  '            // Prevents looping on zero bytes',
  '            // Real AV1 files should have OBU of at least one byte for the OBU header',
  '            // Exclude conditions where Get_leb128 runs out of buffer on valid files and returns 0',
  '            Reject();',
  '            return;',
  '        }',
].join('\n')

async function patchAv1Reject() {
  const file = path.join(sourceDir, av1File)
  const source = await readFile(file, 'utf8')

  // No-op when the reject is already there: our own patch on a dirty vendor tree, or upstream
  // merged PR #2661 (in which case delete this patch per the FIXME).
  if (source.includes(av1RejectMarker)) {
    return
  }

  // Fails loudly if upstream changed Header_Parse: a silently skipped patch means shipping
  // an AV1 parser that loops forever on zero bytes, so check by hand instead of guessing.
  if (!source.includes(av1InsertMarker)) {
    throw new Error(
      `Cannot patch ${av1File}: "${av1InsertMarker}" not found. Upstream changed File_Av1::Header_Parse (re-check AV1 reject handling before dropping this patch).`
    )
  }

  await writeFile(
    file,
    source.replace(av1InsertMarker, () => `${av1InsertMarker}\n${av1RejectCode}`)
  )
}

// FIXME(libmediainfo): Drop once upstream initializes the member.
// `struct Node` (Source/MediaInfo/OutputHelpers.h) has a default constructor that leaves its
// `bool Multiple` uninitialized while every other constructor sets it, and MediaInfo_Inform.cpp
// creates exactly one such node per stream: `Node* Track = new Node()`. To_JSON_Elements() branches
// on that member, so whenever the recycled heap byte is non-zero the stream body is wrapped in a
// stray `[ ... ]` pair, which closes the "track" array before the track object itself is closed and
// the result is not valid JSON. Only reachable for a stream with no field to display (the node's
// RawContent is empty then), e.g. an MP4 carrying a Nero chapter with an empty title. Native
// mediainfo reads back 0 for the same bytes and prints valid JSON, which is why this only ever
// showed up here. Covered by tests/__tests__/empty-menu-track.mp4.test.ts (issue #159).
const outputHelpersFile = 'MediaInfo/OutputHelpers.h'
const nodeDefaultCtorMarker = '    Node()\n    {\n    }'
const nodeDefaultCtorFixed = '    Node() : Multiple(false)\n    {\n    }'

async function patchNodeMultipleInit() {
  const file = path.join(sourceDir, outputHelpersFile)
  const source = await readFile(file, 'utf8')

  // No-op when the member is already initialized: our own patch on a dirty vendor tree, or upstream
  // fixed it (in which case delete this patch per the FIXME).
  if (source.includes(nodeDefaultCtorFixed)) {
    return
  }

  // Fails loudly if upstream changed the struct: a silently skipped patch means shipping a JSON
  // writer that reads uninitialized memory, so check by hand instead of guessing.
  if (!source.includes(nodeDefaultCtorMarker)) {
    throw new Error(
      `Cannot patch ${outputHelpersFile}: "${nodeDefaultCtorMarker}" not found. Either upstream initialized Node::Multiple (delete this patch) or the constructor moved (re-check the JSON output before dropping it).`
    )
  }

  await writeFile(
    file,
    source.replace(nodeDefaultCtorMarker, () => nodeDefaultCtorFixed)
  )
}

async function task() {
  await spawn('./autogen.sh', [], mediainfolibDir)
  await spawn('sed', ['-i', 's/-O2/-Oz/', 'configure'], mediainfolibDir)
  await patchC1Filter()
  await patchAv1Reject()
  await patchNodeMultipleInit()
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
