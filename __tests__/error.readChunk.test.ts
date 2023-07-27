import MediaInfoFactoryFactory, { MediaInfo } from '..'
import { isErrorObject } from './jest/utils'

describe('Error in readChunk', () => {
  let mi: MediaInfo

  const getSize = () => 99
  const readChunk = () => {
    throw new Error('Foo error')
  }

  beforeEach(async () => {
    mi = await MediaInfoFactoryFactory()
  })

  afterEach(() => mi.close())

  it('should return error via callback', (done) => {
    mi.analyzeData(getSize, readChunk, (result, error) => {
      if (!isErrorObject(error)) {
        throw new Error('Expected to received error object')
      }
      expect(error?.message).toBe('Foo error')
      done()
    })
  })

  it('should return error via Promise', () =>
    expect(mi.analyzeData(getSize, readChunk)).rejects.toThrow('Foo error'))
})
