import path from 'path'

import MediaInfoFactory from '../dist/cjs/index.cjs'
import { type MediaInfo } from '..'
import analyzeFile from './analyzeFile'

let mi: MediaInfo

beforeEach(async () => {
  mi = await MediaInfoFactory()
})

afterEach(() => mi.close)

it('should parse file with many tracks', async () => {
  expect.assertions(9)

  const result = await analyzeFile(mi, path.resolve(__dirname, 'fixtures', 'many_tracks.mp4'))
  expect(result).toBeInstanceOf(Object)
  if (!result.media) throw new Error()
  const { track } = result.media
  expect(track).toHaveLength(102)

  expect(track[0]['@type']).toBe('General')
  expect(track[0].Format).toBe('MPEG-4')
  expect(track[0].FileSize).toBe('208534')
  expect(track[1]['@type']).toBe('Video')
  expect(track[1].Format).toBe('AVC')
  expect(track[101]['@type']).toBe('Text')
  expect(track[101]['Format']).toBe('Timed Text')
})
