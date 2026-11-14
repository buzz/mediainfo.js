import { analyzeFile, expectToBeDefined, fixturePath } from '../utils.ts'

/**
 * Regression test for issue #190.
 *
 * When `readChunk()` reads the whole file in one call, `File__MultipleParsing::Read_Buffer_Continue()`
 * mistakes the chunk end for the end of analysis and calls `Open_Buffer_Finalize()` on active parsers.
 * Re-initializing the parser for the pending seek then parses the header a second time,
 * duplicating or dropping field values.
 *
 * Metadata must match regardless of `chunkSize`.
 */
const FIXTURES = [
  // File            size (bytes)
  { file: 'av1_10bit_pq_limited_range.mp4', size: 4747 },
  { file: 'empty-menu-track.mp4', size: 10_410 },
  { file: 'many_tracks.mp4', size: 208_534 },
]

function wholeFileChunkSizes(size: number) {
  return [size, size + 1, 64 * 1024, 256 * 1024 /* default */, 1024 * 1024]
}

it.each(FIXTURES)(
  'should report the same metadata whatever the chunk size is for $file (issue #190)',
  async ({ file, size }) => {
    const filePath = fixturePath(file)

    // Reference: multi-chunk read
    const reference = await analyzeFile(filePath, { chunkSize: 1024 })
    expectToBeDefined(reference.media)

    for (const chunkSize of wholeFileChunkSizes(size)) {
      const result = await analyzeFile(filePath, { chunkSize })
      expect({ chunkSize, media: result.media }).toEqual({ chunkSize, media: reference.media })
    }
  }
)

it('should not duplicate the codec configuration of a whole-file read (issue #190)', async () => {
  const result = await analyzeFile(fixturePath('av1_10bit_pq_limited_range.mp4'), {
    chunkSize: 256 * 1024,
  })
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(2)

  const video = track[1]
  expect(video['@type']).toBe('Video')
  expect(video.extra?.CodecConfigurationBox).toBe('av1C')
  expect(video.colour_range).toBe('Limited')
  expect(video.colour_primaries).toBe('BT.2020')
  expect(video.StreamSize).toBe(3124)
})
