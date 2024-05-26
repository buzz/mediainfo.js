import MediaInfoFactory, { type MediaInfo } from '..'
import { expectToBeError } from './utils.ts'

const getSize = () => 99
const readChunk = () => {
  throw new Error('Foo error')
}

describe('Error in readChunk', () => {
  let mi: MediaInfo

  beforeEach(async () => {
    mi = await MediaInfoFactory()
  })

  afterEach(() => {
    mi.close()
  })

  it('should return error via callback', (done) => {
    mi.analyzeData(getSize, readChunk, (result, error) => {
      expectToBeError(error)
      expect(error.message).toBe('Foo error')
      done()
    })
  })

  it('should return error via Promise', () =>
    expect(mi.analyzeData(getSize, readChunk)).rejects.toThrow('Foo error'))
})
