import { analyzeFile, expectToBeDefined, fixturePath } from './utils'

it('should parse file with many tracks', async () => {
  const result = await analyzeFile(fixturePath('many_tracks.mp4'))
  expectToBeDefined(result.media)

  const { track } = result.media
  expect(track).toHaveLength(102)

  expect(track[0]['@type']).toBe('General')
  expect(track[0].Format).toBe('MPEG-4')
  expect(track[0].FileSize).toBe('208534')
  expect(track[1]['@type']).toBe('Video')
  expect(track[1].Format).toBe('AVC')
  expect(track[101]['@type']).toBe('Text')
  expect(track[101].Format).toBe('Timed Text')
})
