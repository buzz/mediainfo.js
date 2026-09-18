import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from '../utils.ts'

const filePath = fixturePath('av1_10bit_pq_limited_range.mp4')

/**
 * Regression test for issue #188.
 *
 * The file is 4747 bytes long and its `moov` box sits at the end. Once
 * MediaInfoLib sees the `av01` sample entry it wants to seek back to the AV1
 * configuration inside `mdat`, but with a chunk size >= the file size it
 * signals "finished" in the *same* `Open_Buffer_Continue()` call that raises
 * the pending seek. The seek has to be serviced anyway, otherwise the codec
 * level fields (BitDepth, ChromaSubsampling, Format_Profile, Format_Level)
 * are missing from the result.
 */
it.each([1024, 64 * 1024, 256 * 1024 /* = default chunk size */, 1024 * 1024])(
  'should parse the AV1 sequence header with chunkSize=%i (issue #188)',
  async (chunkSize) => {
    const result = await analyzeFile(filePath, { chunkSize })
    expectToBeDefined(result.media)

    const { track } = result.media
    expect(track).toHaveLength(2)
    const [track0, track1] = track

    expectTrackType(track0, 'General')
    expect(track0.Format).toBe('MPEG-4')

    expectTrackType(track1, 'Video')
    expect(track1.Format).toBe('AV1')
    expect(track1.CodecID).toBe('av01')
    expect(track1.Width).toBe(256)
    expect(track1.Height).toBe(512)
    expect(track1.Format_Profile).toBe('Main')
    expect(track1.Format_Level).toBe('2.0')
    expect(track1.BitDepth).toBe(10)
    expect(track1.ChromaSubsampling).toBe('4:2:0')
  }
)
