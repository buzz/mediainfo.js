import MediaInfoFactoryFactory from '..'

describe('Error on WASM loading', () => {
  it('should return error via callback', (done) => {
    MediaInfoFactoryFactory(
      { locateFile: () => 'file_does_not_exist.wasm' },
      () => undefined,
      (err) => {
        expect(err.message).toMatch('no such file')
        done()
      }
    )
  })

  it('should return error via Promise', () =>
    expect(
      MediaInfoFactoryFactory({ locateFile: () => 'file_does_not_exist.wasm' })
    ).rejects.toThrow(/no such file/))
})
