import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from './utils.ts'

const filePath = fixturePath('file_example_MP4_480_1_5MG.mp4')

it('should return full data', async () => {
  const result = await analyzeFile(filePath, { full: true })
  expectToBeDefined(result.media)

  const { track } = result.media
  const [track0, track1, track2] = track

  expectTrackType(track0, 'General')
  expect(track0.InternetMediaType).toBe('video/mp4')
  expect(track0.FileSize_String).toBe('4.34 MiB')
  expect(track0.Duration_String).toBe('53 s 760 ms')
  expect(track0.OverallBitRate_String).toBe('678 kb/s')
  expect(track0.StreamSize_String).toBe('46.5 KiB (1%)')

  expectTrackType(track1, 'Video')
  expect(track1.Format_Info).toBe('Advanced Video Codec')
  expect(track1.Format_Url).toBe('http://developers.videolan.org/x264.html')
  expect(track1.InternetMediaType).toBe('video/H264')
  expect(track1.CodecID_Info).toBe('Advanced Video Coding')
  expect(track1.DisplayAspectRatio_String).toBe('16:9')
  expect(track1.StreamSize_String).toBe('3.48 MiB (80%)')

  expectTrackType(track2, 'Audio')
  expect(track2.Format_Info).toBe('Advanced Audio Codec Low Complexity')
  expect(track2.BitRate_Mode_String).toBe('Constant')
  expect(track2.Channels_String).toBe('2 channels')
  expect(track2.ChannelPositions_String2).toBe('2/0/0')
  expect(track2.SamplingRate_String).toBe('44.1 kHz')
})

it('should not return full data', async () => {
  const result = await analyzeFile(filePath, { full: false })
  expectToBeDefined(result.media)

  const { track } = result.media
  const [track0, track1, track2] = track

  expectTrackType(track0, 'General')
  expect(track0.InternetMediaType).not.toBeDefined()
  expect(track0.FileSize_String).not.toBeDefined()
  expect(track0.Duration_String).not.toBeDefined()
  expect(track0.OverallBitRate_String).not.toBeDefined()
  expect(track0.StreamSize_String).not.toBeDefined()

  expectTrackType(track1, 'Video')
  expect(track1.Format_Info).not.toBeDefined()
  expect(track1.Format_Url).not.toBeDefined()
  expect(track1.InternetMediaType).not.toBeDefined()
  expect(track1.CodecID_Info).not.toBeDefined()
  expect(track1.DisplayAspectRatio_String).not.toBeDefined()
  expect(track1.StreamSize_String).not.toBeDefined()

  expectTrackType(track2, 'Audio')
  expect(track2.Format_Info).not.toBeDefined()
  expect(track2.BitRate_Mode_String).not.toBeDefined()
  expect(track2.Channels_String).not.toBeDefined()
  expect(track2.ChannelPositions_String2).not.toBeDefined()
  expect(track2.SamplingRate_String).not.toBeDefined()
})
