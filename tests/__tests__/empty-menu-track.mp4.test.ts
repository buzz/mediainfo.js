import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from '../utils.ts'

const filePath = fixturePath('empty-menu-track.mp4')

/**
 * Regression test for issue #159, an upstream MediaInfoLib bug.
 *
 * The fixture carries a chapter with an empty title, so MediaInfoLib ends up with a Menu stream
 * that has no field to display at all. That is the only case in which the JSON writer serialises
 * the per-stream node created by `new Node()` in MediaInfo_Inform.cpp - and `struct Node`
 * (Source/MediaInfo/OutputHelpers.h) has a default constructor that leaves its `bool Multiple`
 * member uninitialized. Every other constructor sets it.
 *
 * `To_JSON_Elements()` branches on that member, so when the byte reads back as non-zero the stream
 * body gets wrapped in a stray `[ ... ]` pair, which closes the `"track"` array before the last
 * track object is closed:
 *
 *   ,{"@type":"Menu","@typeorder":"2","":{}]}]}   <- what the WASM build returns, JSON.parse throws
 *   ,{"@type":"Menu","@typeorder":"2","":null}]}  <- what native mediainfo 26.05 returns
 *
 * So `analyzeData()` rejects with a `SyntaxError` instead of resolving. Native mediainfo prints
 * valid JSON for the same bytes only because its recycled heap block happens to hold a zero -
 * whether the byte is zero depends on the build and on the file layout, which is why the fixture is
 * committed byte for byte.
 *
 * Shipped as a vendor patch, see `patchNodeMultipleInit()` in gulp/compile/mediainfolib.ts. If this
 * test starts failing because it cannot fail anymore, the patch is gone: either upstream
 * initialized the member (then delete the patch) or the marker stopped matching (then fix it).
 */
it('should return parsable JSON for a track without any displayed field (issue #159)', async () => {
  const result = await analyzeFile(filePath)
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(5)
  const [track0] = track
  const [track3, track4] = track.slice(3)

  expectTrackType(track0, 'General')
  expect(track0.Format).toBe('MPEG-4')
  expect(track0.MenuCount).toBe(2)

  // The 'text' track referenced by the 'chap' track: a Menu track with fields, always fine
  expectTrackType(track3, 'Menu')
  expect(track3['@typeorder']).toBe('1')
  expect(track3.Format).toBe('Timed Text')

  // The Nero 'chpl' Menu track: no fields at all, the one the uninitialized read corrupts
  expectTrackType(track4, 'Menu')
  expect(track4['@typeorder']).toBe('2')
})
