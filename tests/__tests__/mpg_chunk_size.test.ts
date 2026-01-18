import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from '../utils.ts'

it('should parse m1v (issue #36)', async () => {
  const result = await analyzeFile(fixturePath('test-sample-320x240-29.970fps-14.014s.m1v'))
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(2)
  const [track0, track1] = track

  expectTrackType(track0, 'General')
  expect(track0.Format).toBe('MPEG Video')
  expect(track0.Format_Version).toBe('1')
  expect(track0.FileSize).toBe('574177')
  expect(track0.Duration).toBeCloseTo(14.014)
  expect(track0.OverallBitRate_Mode).toBe('CBR')
  expect(track0.OverallBitRate).toBeNear(327_773, 2)

  expectTrackType(track1, 'Video')
  expect(track1.Format).toBe('MPEG Video')
  expect(track1.Format_Version).toBe('1')
  expect(track1.Format_Settings_BVOP).toBe('Yes')
  expect(track1.Format_Settings_Matrix).toBe('Default')
  expect(track1.Format_Settings_GOP).toBe('M=3, N=15')
  expect(track1.Duration).toBeCloseTo(14.014)
  expect(track1.BitRate_Mode).toBe('CBR')
  expect(track1.BitRate).toBeNear(327_773, 2)
  expect(track1.Width).toBe(320)
  expect(track1.Height).toBe(240)
  expect(track1.DisplayAspectRatio).toBe(1.333)
  expect(track1.FrameRate).toBe(29.97)
  expect(track1.FrameCount).toBe(420)
  expect(track1.ColorSpace).toBe('YUV')
  expect(track1.ChromaSubsampling).toBe('4:2:0')
  expect(track1.BitDepth).toBe(8)
  expect(track1.ScanType).toBe('Progressive')
  expect(track1.Compression_Mode).toBe('Lossy')
  expect(track1.Delay).toBe(0)
  expect(track1.TimeCode_FirstFrame).toBe('00:00:00:00')
  expect(track1.Gop_OpenClosed).toBe('Open')
  expect(track1.StreamSize).toBe(574_177)
  expect(track1.BufferSize).toBe('6144')
})
