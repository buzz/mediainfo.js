import { analyzeFile, expectToBeDefined, fixturePath } from './utils.ts'

it('should parse file', async () => {
  const result = await analyzeFile(fixturePath('AudioVideoInterleave.avi'))
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(2)
  const [track0, track1] = track

  expect(track0['@type']).toBe('General')
  expect(track0.Format).toBe('AVI')
  expect(track0.FileSize).toBe('5686')
  expect(track0.Encoded_Application).toBe('Lavf57.41.100')

  expect(track1['@type']).toBe('Video')
  expect(track1.Format).toBe('MPEG-4 Visual')
  expect(track1.CodecID).toBe('FMP4')
  expect(track1.Height).toBe(1)
  expect(track1.Width).toBe(1)
  expect(track1.DisplayAspectRatio).toBeCloseTo(1)
  expect(track1.FrameRate).toBeCloseTo(100)
  expect(track1.ColorSpace).toBe('YUV')
  expect(track1.ChromaSubsampling).toBe('4:2:0')
  expect(track1.Compression_Mode).toBe('Lossy')
})
