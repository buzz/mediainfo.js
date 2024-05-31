import { analyzeFile, expectToBeDefined, expectTrackType, fixturePath } from './utils'

it('should parse file with many tracks', async () => {
  const result = await analyzeFile(fixturePath('many_tracks.mp4'))
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(102)

  const [track0, track1] = track
  expectTrackType(track0, 'General')
  expect(track0.Format).toBe('MPEG-4')
  expect(track0.FileSize).toBe('208534')

  expectTrackType(track1, 'Video')
  expect(track1.Format).toBe('AVC')

  const track101 = track[101]
  expectTrackType(track101, 'Text')
  expect(track[101].Format).toBe('Timed Text')
})
