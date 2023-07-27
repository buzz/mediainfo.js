import MediaInfoFactoryFactory from '..'
import { isErrorObject } from './jest/utils'

describe('Error on WASM loading', () => {
  it('should return error via callback', (done) => {
    MediaInfoFactoryFactory(
      { locateFile: () => 'file_does_not_exist.wasm' },
      () => undefined,
      (error) => {
        if (!isErrorObject(error)) {
          throw new Error('Expected to received error object')
        }
        expect(error.message).toMatch('no such file')
        done()
      }
    )
  })

  it('should return error via Promise', () =>
    expect(
      MediaInfoFactoryFactory({ locateFile: () => 'file_does_not_exist.wasm' })
    ).rejects.toThrow(/no such file/))
})
