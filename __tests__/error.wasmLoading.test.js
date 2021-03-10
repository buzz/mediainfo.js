import MediaInfo from '../dist/mediainfo'

describe('Error on WASM loading', () => {
  it('should return error via callback', (done) => {
    MediaInfo(
      { locateFile: () => 'file_does_not_exist.wasm' },
      () => {
        throw new Error('Should never get here.')
      },
      (err) => {
        expect(err.message).toMatch('no such file')
        done()
      }
    )
  })

  it('should return error via Promise', () =>
    expect(MediaInfo({ locateFile: () => 'file_does_not_exist.wasm' })).rejects.toThrow())
})
