// Test problematic MPG file
// https://github.com/buzz/mediainfo.js/issues/36
import path from 'path'

import MediaInfo from '../dist/mediainfo'
import analyzeFile from './analyzeFile'

const FILEPATH = path.resolve(__dirname, 'fixtures', 'centaur_1.mpg')
let mi

beforeEach(async () => {
  mi = await MediaInfo()
})

afterEach(() => mi.close)

// test suspended due to offline source file
xdescribe('Issue #36: centaur_1.mpg', () => {
  xit('should parse file', async () => {
    expect.assertions(33)

    const result = await analyzeFile(mi, FILEPATH)
    expect(result).toBeInstanceOf(Object)
    const { track } = result.media
    expect(track).toHaveLength(2)
    const [track0, track1] = track

    expect(track0['@type']).toBe('General')
    expect(track0.Format).toBe('MPEG Video')
    expect(track0.Format_Version).toBe('1')
    expect(track0.FileSize).toBe('563016')
    expect(parseFloat(track0.Duration)).toBeCloseTo(13.981)
    expect(track0.OverallBitRate_Mode).toBe('CBR')
    expect(parseInt(track0.OverallBitRate)).toBeNear(322161, 2)

    expect(track1['@type']).toBe('Video')
    expect(track1.Format).toBe('MPEG Video')
    expect(track1.Format_Version).toBe('1')
    expect(track1.Format_Settings_BVOP).toBe('Yes')
    expect(track1.Format_Settings_Matrix).toBe('Default')
    expect(track1.Format_Settings_GOP).toBe('M=3, N=15')
    expect(parseFloat(track1.Duration)).toBeCloseTo(13.981)
    expect(track1.BitRate_Mode).toBe('CBR')
    expect(parseInt(track1.BitRate)).toBeNear(320000, 2)
    expect(track1.Width).toBe('320')
    expect(track1.Height).toBe('240')
    expect(track1.DisplayAspectRatio).toBe('1.333')
    expect(track1.FrameRate).toBe('29.970')
    expect(track1.FrameCount).toBe('419')
    expect(track1.ColorSpace).toBe('YUV')
    expect(track1.ChromaSubsampling).toBe('4:2:0')
    expect(track1.BitDepth).toBe('8')
    expect(track1.ScanType).toBe('Progressive')
    expect(track1.Compression_Mode).toBe('Lossy')
    expect(track1.Delay).toBe('0.000')
    expect(track1.TimeCode_FirstFrame).toBe('00:00:00:00')
    expect(track1.Gop_OpenClosed).toBe('Closed')
    expect(track1.StreamSize).toBe('563016')
    expect(track1.BufferSize).toBe('40960')
  })
})
