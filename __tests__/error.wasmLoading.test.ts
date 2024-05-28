import mediaInfoFactory from '..'
import { expectToBeError } from './utils'

beforeEach(() => {
  jest.spyOn(console, 'error')
  // @ts-expect-error TS doesn't know mockImplementation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.error.mockImplementation(() => null)
})

afterEach(() => {
  // @ts-expect-error TS doesn't know mockImplementation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.error.mockRestore()
})

describe('Error on WASM loading', () => {
  it('should return error via callback', (done) => {
    mediaInfoFactory(
      { locateFile: () => 'file_does_not_exist.wasm' },
      () => {
        throw new Error('Callback should not fire')
      },
      (error) => {
        expectToBeError(error)
        expect(error.message).toMatch('no such file')
        done()
      }
    )
  })

  it('should return error via Promise', () =>
    expect(mediaInfoFactory({ locateFile: () => 'file_does_not_exist.wasm' })).rejects.toThrow(
      /no such file/
    ))
})
