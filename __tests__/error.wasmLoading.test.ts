import mediaInfoFactory from '..'
import { expectToBeError } from './utils'

beforeEach(() => {
  // Suppress console output from emscripten module
  jest.spyOn(console, 'error')
  // @ts-expect-error TS doesn't know mockImplementation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.error.mockImplementation(() => null)
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Error on WASM loading', () => {
  it('should return error via callback and throw Exception', (done) => {
    mediaInfoFactory(
      { locateFile: () => 'file_does_not_exist.wasm' },
      () => {
        done('Resolve callback should not fire')
      },
      (error) => {
        expectToBeError(error)
        expect(error.message).toMatch('no such file')
        done()
      }
    )
  })

  it('should return error via Promise and throw Exception', (done) => {
    mediaInfoFactory({ locateFile: () => 'file_does_not_exist.wasm' })
      .then(() => {
        done('Resolve callback should not fire')
      })
      .catch((error: unknown) => {
        expectToBeError(error)
        expect(error.message).toMatch('no such file')
        done()
      })
  })
})
