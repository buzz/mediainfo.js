import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from '../utils.ts'

const filePath = fixturePath('id3_char_encodings.mp3')

/**
 * Regression test for issue #150.
 *
 * The fixture carries four ID3v2.3 text frames, one per frame encoding: UTF-8 (TIT2), Latin-1
 * (TPE1), UTF-16 with BOM (TALB) and UTF-16BE without BOM (TCON). MediaInfoLib is expected to hand
 * every frame back as the UTF-8 string it was written from.
 *
 * UTF-8 always worked. The other three did not, for two separate upstream reasons:
 *
 *  * Latin-1: fixed by `patchEncodingConversions()` in gulp/compile/zenlib.ts (upstream
 *    MediaArea/ZenLib#176) plus the `setlocale(LC_ALL, "C.UTF-8")` in src/MediaInfoModule.cpp
 *    (upstream MediaArea/MediaInfoLib#2244, which does not reach us because that patch is in
 *    MediaInfoJS.cpp and we ship our own wrapper).
 *  * UTF-16 and UTF-16BE: still broken. ZenLib is built with --disable-unicode, so `Char` is
 *    `char`, and `Ztring::From_UTF16LE/BE()` append `(Char)LittleEndian2int16u(S)`: every code
 *    unit is truncated to 8 bits and the surrogate pair of U+10348 never gets decoded. Native
 *    MediaInfoLib in that mode mangles the same frames, so this is not ours to fix.
 */
it('should parse id3 tags with UTF-8 and Latin-1 frames (issue #150)', async () => {
  const result = await analyzeFile(filePath)
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(2)
  const [track0] = track

  expectTrackType(track0, 'General')
  expect(track0.Format).toBe('MPEG Audio')
  expect(track0.Title).toBe('utf-8 Ã£â‚¬Æ’𐍈')
  expect(track0.Performer).toBe('latin-1 Ã£â¬Æ')
})

/** Tripwire for the ZenLib limitation above: `fails` flips into an error once it passes. */
it.fails('should parse id3 tags with UTF-16 and UTF-16BE frames (issue #150)', async () => {
  const result = await analyzeFile(filePath)
  expectToBeDefined(result.media)

  const [track0] = result.media.track
  expectTrackType(track0, 'General')
  expect(track0.Album).toBe('utf-16 Ã£â‚¬Æ’𐍈')
  expect(track0.Genre).toBe('utf-16be Ã£â‚¬Æ’𐍈')
})
