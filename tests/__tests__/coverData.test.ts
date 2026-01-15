import crypto from 'node:crypto'

import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from '../utils.ts'

import type { MediaInfoResult } from 'mediainfo.js'

const filePath = fixturePath('Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3')

const testFields = (result: MediaInfoResult) => {
  const track = result.media?.track
  expectToBeDefined(track)

  expect(track).toHaveLength(3)

  const [track0, track1] = track

  expectTrackType(track0, 'General')
  expect(track0.Format).toBe('MPEG Audio')
  expect(track0.FileSize).toBe('6357777')
  expect(track0.Duration).toBeCloseTo(203.494)
  expect(track0.OverallBitRate_Mode).toBe('VBR')
  expect(track0.OverallBitRate).toBeNear(243_043, 2)
  expect(track0.StreamSize).toBe(175_116)
  expect(track0.Title).toBe('Povo Que Caís Descalço')
  expect(track0.Album).toBe('CC Affiliates Mixtape #1')
  expect(track0.Album_Performer).toBe('Creative Commons')
  expect(track0.Track).toBe('Povo Que Caís Descalço')
  expect(track0.Track_Position).toBe(1)
  expect(track0.Compilation).toBe('Yes')
  expect(track0.Performer).toBe('Dead Combo')
  expect(track0.Genre).toBe('International')
  expect(track0.Recorded_Date).toBe('2017-03-03 15:14:12 UTC')
  expect(track0.Encoded_Library).toBe('LAME3.99r')
  expect(track0.Copyright).toBe(
    'Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/'
  )
  expect(track0.Cover).toBe('Yes')
  expect(track0.Cover_Mime).toBe('image/jpeg')
  expect(track0.Comment).toBe(
    'URL: http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/'
  )

  expectTrackType(track1, 'Audio')
  expect(track1.Format).toBe('MPEG Audio')
  expect(track1.Format_Version).toBe('1')
  expect(track1.Format_Profile).toBe('Layer 3')
  expect(track1.Format_Settings_Mode).toBe('Joint stereo')
  expect(track1.Duration).toBeCloseTo(203.493)
  expect(track1.BitRate_Mode).toBe('VBR')
  expect(track1.BitRate).toBeNear(243_043, 2)
  expect(track1.BitRate_Minimum).toBeCloseTo(32_000)
  expect(track1.Channels).toBe(2)
  expect(track1.SamplesPerFrame).toBeCloseTo(1152)
  expect(track1.SamplingRate).toBe(44_100)
  expect(track1.SamplingCount).toBe(8_974_080)
  expect(track1.FrameRate).toBeCloseTo(38.281)
  expect(track1.Compression_Mode).toBe('Lossy')
  expect(track1.StreamSize).toBe(6_182_244)
  expect(track1.Encoded_Library).toBe('LAME3.99r')
  expect(track1.Encoded_Library_Settings).toBe('-m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32')
}

describe('coverData: Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3', () => {
  it('should return cover data', async () => {
    const result = await analyzeFile(filePath, { coverData: true })
    testFields(result)

    const track = result.media?.track
    expectToBeDefined(track)
    const [track0] = track
    expectTrackType(track0, 'General')
    const coverData = track0.Cover_Data ?? ''

    // Check cover data
    const coverDataDigest = crypto.createHash('md5').update(coverData).digest('hex')
    expect(coverDataDigest).toBe('10a34e34e74a39052dd26f16c76bc488')
  })

  it('should not return cover data', async () => {
    const result = await analyzeFile(filePath, { coverData: false })
    testFields(result)
    expect(result.media?.track[0]).not.toHaveProperty('Cover_Data')
  })
})
