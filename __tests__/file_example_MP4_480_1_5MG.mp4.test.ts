import path from 'path'

const FILEPATH = path.resolve(__dirname, 'fixtures', 'file_example_MP4_480_1_5MG.mp4')

describe('file_example_MP4_640_3MG.mp4', () => {
  it('should parse file', async () => {
    expect.assertions(67)

    const result = await analyzeFile(FILEPATH)
    if (!result.media) throw new Error()

    const { track } = result.media
    expect(track).toHaveLength(3)
    const [track0, track1, track2] = track

    expect(track0['@type']).toBe('General')
    expect(track0.Format).toBe('MPEG-4')
    expect(track0.Format_Profile).toBe('Base Media')
    expect(track0.CodecID).toBe('isom')
    expect(track0.CodecID_Compatible).toBe('isom/iso2/avc1/mp41')
    expect(track0.FileSize).toBe('4553606')
    expect(track0.Duration).toBeCloseTo(53.76)
    expect(track0.OverallBitRate).toBeNear(677620, 2)
    expect(track0.FrameRate).toBeCloseTo(25)
    expect(track0.FrameCount).toBe(1344)
    expect(track0.StreamSize).toBe(47623)
    expect(track0.HeaderSize).toBe(40)
    expect(track0.DataSize).toBe(4507105)
    expect(track0.FooterSize).toBe(46461)
    expect(track0.IsStreamable).toBe('No')

    expect(track1['@type']).toBe('Video')
    expect(track1.StreamOrder).toBe(0)
    expect(track1.ID).toBe('1')
    expect(track1.Format).toBe('AVC')
    expect(track1.Format_Profile).toBe('High')
    expect(track1.Format_Level).toBe('3')
    expect(track1.Format_Settings_CABAC).toBe('Yes')
    expect(track1.Format_Settings_RefFrames).toBe(4)
    expect(track1.CodecID).toBe('avc1')
    expect(track1.Duration).toBeCloseTo(53.76)
    expect(track1.BitRate).toBeNear(558000, 2)
    expect(track1.Width).toBe(636)
    expect(track1.Height).toBe(360)
    expect(track1.Stored_Height).toBe(368)
    expect(track1.Sampled_Width).toBe(636)
    expect(track1.PixelAspectRatio).toBeCloseTo(1.0)
    expect(track1.DisplayAspectRatio).toBeCloseTo(1.767)
    expect(track1.Rotation).toBe('0.000')
    expect(track1.FrameRate_Mode).toBe('CFR')
    expect(track1.FrameRate_Mode_Original).toBe('VFR')
    expect(track1.FrameRate).toBeCloseTo(25.0)
    expect(track1.FrameCount).toBe(1344)
    expect(track1.ColorSpace).toBe('YUV')
    expect(track1.ChromaSubsampling).toBe('4:2:0')
    expect(track1.BitDepth).toBe(8)
    expect(track1.ScanType).toBe('Progressive')
    expect(track1.StreamSize).toBe(3645916)
    expect(track1.Encoded_Library).toBe('x264 - core 155 r2917 0a84d98')
    expect(track1.Encoded_Library_Name).toBe('x264')
    expect(track1.Encoded_Library_Version).toBe('core 155 r2917 0a84d98')
    expect(track1.Encoded_Library_Settings).toBe(
      'cabac=1 / ref=3 / deblock=1:0:0 / analyse=0x3:0x113 / me=hex / subme=7 / psy=1 / psy_rd=1.00:0.00 / mixed_ref=1 / me_range=16 / chroma_me=1 / trellis=1 / 8x8dct=1 / cqm=0 / deadzone=21,11 / fast_pskip=1 / chroma_qp_offset=-2 / threads=11 / lookahead_threads=1 / sliced_threads=0 / nr=0 / decimate=1 / interlaced=0 / bluray_compat=0 / constrained_intra=0 / bframes=3 / b_pyramid=2 / b_adapt=1 / b_bias=0 / direct=1 / weightb=1 / open_gop=0 / weightp=2 / keyint=250 / keyint_min=25 / scenecut=40 / intra_refresh=0 / rc_lookahead=40 / rc=abr / mbtree=1 / bitrate=558 / ratetol=1.0 / qcomp=0.60 / qpmin=0 / qpmax=69 / qpstep=4 / ip_ratio=1.40 / aq=1:1.00'
    )
    if (track1.extra === undefined) {
      throw new Error('Expected extra data on track')
    }
    expect(track1.extra.CodecConfigurationBox).toBe('avcC')

    expect(track2['@type']).toBe('Audio')
    expect(track2.StreamOrder).toBe(1)
    expect(track2.ID).toBe('2')
    expect(track2.Format).toBe('AAC')
    expect(track2.Format_AdditionalFeatures).toBe('LC')
    expect(track2.CodecID).toBe('2 / 40 / mp4a-40-2')
    expect(track2.Duration).toBeCloseTo(53.76)
    expect(track2.BitRate_Mode).toBe('CBR')
    expect(track2.BitRate).toBeNear(128041, 2)
    expect(track2.Channels).toBe(2)
    expect(track2.ChannelPositions).toBe('Front: L R')
    expect(track2.ChannelLayout).toBe('L R')
    expect(track2.SamplesPerFrame).toBeCloseTo(1024.0)
    expect(track2.SamplingRate).toBeCloseTo(44100.0)
    expect(track2.SamplingCount).toBe(2370816)
    expect(track2.FrameRate).toBeCloseTo(43.066)
    expect(track2.FrameCount).toBe(2315)
    expect(track2.Compression_Mode).toBe('Lossy')
    expect(track2.StreamSize).toBe(860067)
  })
})
