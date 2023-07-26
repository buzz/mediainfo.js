import MediaInfoFactoryFactory, { MediaInfo } from '..'

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
      expect(error?.message).toBe('Foo error')
      done()
    })
  })

  it('should return error via Promise', () =>
    expect(mi.analyzeData(getSize, readChunk)).rejects.toThrow('Foo error'))
})
