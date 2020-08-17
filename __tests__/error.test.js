import MediaInfo from '../dist/mediainfo'

describe('error', () => {
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

  it('should return error via Promise', async () => {
    expect.assertions(1)
    await expect(
      MediaInfo({ locateFile: () => 'file_does_not_exist.wasm' })
    ).rejects.toThrow()
  })
})
