import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from '../utils.ts'

/**
 * Regression test for issue #164.
 *
 * The fixture has no `onMetaData` tag, so MediaInfoLib can only learn the duration by seeking to
 * the end of the file and walking the FLV tags backwards (`File_Flv::Searching_Duration`). Handing
 * the *known* file size to `Open_Buffer_Init()` on such a seek re-inits the parser and aborts that
 * walk, which drops every duration-derived field. It happens at every chunk size, so this is not
 * the issue #188 read-loop bug. `generate-flv-duration-no-metadata.sh` on the test-fixtures branch
 * regenerates the fixture.
 */
it('should parse the duration of an FLV without metadata (issue #164)', async () => {
  const result = await analyzeFile(fixturePath('flv-duration-no-metadata.flv'))
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(3)
  const [track0, track1, track2] = track

  expectTrackType(track0, 'General')
  expect(track0.Format).toBe('Flash Video')
  expect(track0.FileSize).toBe('2523204')
  expect(track0.Duration).toBeCloseTo(60.055, 3)
  expect(track0.OverallBitRate).toBeNear(336_119, 3)
  expect(track0.StreamSize).toBe(166_899)

  expectTrackType(track1, 'Video')
  expect(track1.Format).toBe('Sorenson Spark')
  expect(track1.Width).toBe(256)
  expect(track1.Height).toBe(144)
  expect(track1.BitDepth).toBe(8)
  expect(track1.Duration).toBeCloseTo(60.05, 3)
  expect(track1.StreamSize).toBe(1_875_865)

  expectTrackType(track2, 'Audio')
  expect(track2.Format).toBe('MPEG Audio')
  expect(track2.Format_Profile).toBe('Layer 3')
  expect(track2.SamplingRate).toBeCloseTo(22_050)
  expect(track2.Channels).toBe(1)
  expect(track2.Duration).toBeCloseTo(60.055, 3)
  expect(track2.StreamSize).toBe(480_440)
})
