import path from 'path'

import MediaInfo from '../dist/mediainfo'
import analyzeFile from './analyzeFile'

const FILEPATH = path.resolve(
  __dirname,
  'fixtures',
  'file_example_MP4_640_3MG.mp4'
)
let mi

afterEach(() => mi.close)

describe('file_example_MP4_640_3MG.mp4', () => {
  it('should parse file', async () => {
    expect.assertions(77)

    mi = await MediaInfo()
    const result = await analyzeFile(mi, FILEPATH)

    expect(result).toBeInstanceOf(Object)
    const { track } = result.media
    expect(track).toHaveLength(3)
    const [track0, track1, track2] = track

    expect(track0['@type']).toBe('General')
    expect(track0.Format).toBe('MPEG-4')
    expect(track0.Format_Profile).toBe('Base Media')
    expect(track0.CodecID).toBe('mp42')
    expect(track0.CodecID_Compatible).toBe('mp42/mp41/isom/avc1')
    expect(track0.FileSize).toBe('3114374')
    expect(track0.Duration).toBe('30.527')
    expect(track0.OverallBitRate).toBe('816162')
    expect(track0.FrameRate).toBe('30.000')
    expect(track0.FrameCount).toBe('901')
    expect(track0.StreamSize).toBe('19022')
    expect(track0.HeaderSize).toBe('19014')
    expect(track0.DataSize).toBe('3095360')
    expect(track0.FooterSize).toBe('0')
    expect(track0.IsStreamable).toBe('Yes')
    expect(track0.Encoded_Date).toBe('UTC 2015-08-07 09:13:05')
    expect(track0.Tagged_Date).toBe('UTC 2015-08-07 09:13:05')

    expect(track1['@type']).toBe('Video')
    expect(track1.StreamOrder).toBe('0')
    expect(track1.ID).toBe('1')
    expect(track1.Format).toBe('AVC')
    expect(track1.Format_Profile).toBe('High')
    expect(track1.Format_Level).toBe('3.1')
    expect(track1.Format_Settings_CABAC).toBe('Yes')
    expect(track1.Format_Settings_RefFrames).toBe('4')
    expect(track1.Format_Settings_GOP).toBe('M=4, N=90')
    expect(track1.CodecID).toBe('avc1')
    expect(track1.Duration).toBe('30.033')
    expect(track1.BitRate).toBe('710666')
    expect(track1.BitRate_Nominal).toBe('750000')
    expect(track1.Width).toBe('640')
    expect(track1.Height).toBe('360')
    expect(track1.Stored_Height).toBe('368')
    expect(track1.Sampled_Width).toBe('640')
    expect(track1.PixelAspectRatio).toBe('1.000')
    expect(track1.DisplayAspectRatio).toBe('1.778')
    expect(track1.Rotation).toBe('0.000')
    expect(track1.FrameRate_Mode).toBe('CFR')
    expect(track1.FrameRate_Mode_Original).toBe('VFR')
    expect(track1.FrameRate).toBe('30.000')
    expect(track1.FrameCount).toBe('901')
    expect(track1.ColorSpace).toBe('YUV')
    expect(track1.ChromaSubsampling).toBe('4:2:0')
    expect(track1.BitDepth).toBe('8')
    expect(track1.ScanType).toBe('Progressive')
    expect(track1.StreamSize).toBe('2667960')
    expect(track1.Encoded_Library).toBe('x264 - core 146 r11M 121396c')
    expect(track1.Encoded_Library_Name).toBe('x264')
    expect(track1.Encoded_Library_Version).toBe('core 146 r11M 121396c')
    expect(track1.Encoded_Library_Settings).toBe(
      'cabac=1 / ref=3 / deblock=1:0:0 / analyse=0x3:0x113 / me=hex / subme=7 / psy=1 / psy_rd=1.00:0.00 / mixed_ref=1 / me_range=16 / chroma_me=1 / trellis=1 / 8x8dct=1 / cqm=0 / deadzone=21,11 / fast_pskip=1 / chroma_qp_offset=-2 / threads=48 / lookahead_threads=2 / sliced_threads=0 / nr=0 / decimate=1 / interlaced=0 / bluray_compat=0 / stitchable=1 / constrained_intra=0 / bframes=3 / b_pyramid=2 / b_adapt=1 / b_bias=0 / direct=1 / weightb=1 / open_gop=0 / weightp=2 / keyint=infinite / keyint_min=30 / scenecut=40 / intra_refresh=0 / rc_lookahead=40 / rc=2pass / mbtree=1 / bitrate=750 / ratetol=1.0 / qcomp=0.60 / qpmin=5 / qpmax=69 / qpstep=4 / cplxblur=20.0 / qblur=0.5 / vbv_maxrate=825 / vbv_bufsize=900 / nal_hrd=none / filler=0 / ip_ratio=1.40 / aq=1:1.00'
    )
    expect(track1.Encoded_Date).toBe('UTC 2015-08-07 09:13:05')
    expect(track1.Tagged_Date).toBe('UTC 2015-08-07 09:13:05')
    expect(track1.extra.CodecConfigurationBox).toBe('avcC')

    expect(track2['@type']).toBe('Audio')
    expect(track2.StreamOrder).toBe('1')
    expect(track2.ID).toBe('2')
    expect(track2.Format).toBe('AAC')
    expect(track2.Format_AdditionalFeatures).toBe('LC')
    expect(track2.CodecID).toBe('mp4a-40-2')
    expect(track2.Duration).toBe('30.527')
    expect(track2.BitRate_Mode).toBe('CBR')
    expect(track2.BitRate).toBe('112004')
    expect(track2.Channels).toBe('2')
    expect(track2.ChannelPositions).toBe('Front: L R')
    expect(track2.ChannelLayout).toBe('L R')
    expect(track2.SamplesPerFrame).toBe('1024')
    expect(track2.SamplingRate).toBe('48000')
    expect(track2.SamplingCount).toBe('1465296')
    expect(track2.FrameRate).toBe('46.875')
    expect(track2.FrameCount).toBe('1431')
    expect(track2.Compression_Mode).toBe('Lossy')
    expect(track2.StreamSize).toBe('427392')
    expect(track2.StreamSize_Proportion).toBe('0.13723')
    expect(track2.Encoded_Date).toBe('UTC 2015-08-07 09:13:05')
    expect(track2.Tagged_Date).toBe('UTC 2015-08-07 09:13:05')
  })
})
