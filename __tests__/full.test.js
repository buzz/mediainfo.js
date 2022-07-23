import path from 'path'

import MediaInfo from '../dist/mediainfo'
import analyzeFile from './analyzeFile'

const FILEPATH = path.resolve(__dirname, 'fixtures', 'file_example_MP4_640_3MG.mp4')
let mi

afterEach(() => mi.close)

describe('full: file_example_MP4_640_3MG.mp4', () => {
  it('should return full data', async () => {
    expect.assertions(16)

    mi = await MediaInfo({ full: true })
    const result = await analyzeFile(mi, FILEPATH)

    const { track } = result.media
    const [track0, track1, track2] = track

    expect(track0.InternetMediaType).toBe('video/mp4')
    expect(track0.FileSize_String).toBe('2.97 MiB')
    expect(track0.Duration_String).toBe('30 s 527 ms')
    expect(track0.OverallBitRate_String).toBe('816 kb/s')
    expect(track0.StreamSize_String).toBe('18.6 KiB (1%)')

    expect(track1.Format_Info).toBe('Advanced Video Codec')
    expect(track1.Format_Url).toBe('http://developers.videolan.org/x264.html')
    expect(track1.InternetMediaType).toBe('video/H264')
    expect(track1.CodecID_Info).toBe('Advanced Video Coding')
    expect(track1.DisplayAspectRatio_String).toBe('16:9')
    expect(track1.StreamSize_String).toBe('2.54 MiB (86%)')

    expect(track2.Format_Info).toBe('Advanced Audio Codec Low Complexity')
    expect(track2.BitRate_Mode_String).toBe('Constant')
    expect(track2.Channels_String).toBe('2 channels')
    expect(track2.ChannelPositions_String2).toBe('2/0/0')
    expect(track2.SamplingRate_String).toBe('48.0 kHz')
  })

  it('should not return full data', async () => {
    expect.assertions(16)
    mi = await MediaInfo()

    const result = await analyzeFile(mi, FILEPATH)

    const { track } = result.media
    const [track0, track1, track2] = track

    expect(track0.InternetMediaType).not.toBeDefined()
    expect(track0.FileSize_String).not.toBeDefined()
    expect(track0.Duration_String).not.toBeDefined()
    expect(track0.OverallBitRate_String).not.toBeDefined()
    expect(track0.StreamSize_String).not.toBeDefined()

    expect(track1.Format_Info).not.toBeDefined()
    expect(track1.Format_Url).not.toBeDefined()
    expect(track1.InternetMediaType).not.toBeDefined()
    expect(track1.CodecID_Info).not.toBeDefined()
    expect(track1.DisplayAspectRatio_String).not.toBeDefined()
    expect(track1.StreamSize_String).not.toBeDefined()

    expect(track2.Format_Info).not.toBeDefined()
    expect(track2.BitRate_Mode_String).not.toBeDefined()
    expect(track2.Channels_String).not.toBeDefined()
    expect(track2.ChannelPositions_String2).not.toBeDefined()
    expect(track2.SamplingRate_String).not.toBeDefined()
  })
})
