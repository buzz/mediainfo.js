import mediaInfoFactory from '..'
import { expectToBeError } from './utils'

const originalProcess = process._original()
const originalUncaughtExceptionListeners: NodeJS.UncaughtExceptionListener[] = []
const originalUnhandledRejectionListeners: NodeJS.UnhandledRejectionListener[] = []

beforeEach(() => {
  for (const listener of originalProcess.listeners('uncaughtException')) {
    originalUncaughtExceptionListeners.push(listener)
    originalProcess.off('uncaughtException', listener)
  }
  for (const listener of originalProcess.listeners('unhandledRejection')) {
    originalUnhandledRejectionListeners.push(listener)
    originalProcess.off('unhandledRejection', listener)
  }

  // Suppress console output from emscripten module
  jest.spyOn(console, 'error')
  // @ts-expect-error TS doesn't know mockImplementation
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.error.mockImplementation(() => null)
})

afterEach(() => {
  jest.restoreAllMocks()

  for (const listener of originalUncaughtExceptionListeners) {
    originalProcess.on('uncaughtException', listener)
  }
  for (const listener of originalUnhandledRejectionListeners) {
    originalProcess.on('unhandledRejection', listener)
  }
})

describe('Error on WASM loading', () => {
  it('should return error via callback and throw Exception', (done) => {
    let asyncCatched = false

    // Listener for uncaught exceptions
    const errorListener = (err: Error) => {
      expect(err.message).toMatch('no such file')
      expect(asyncCatched).toBeTruthy()
      originalProcess.removeListener('uncaughtException', errorListener)
      done()
    }

    originalProcess.on('uncaughtException', errorListener)

    mediaInfoFactory(
      { locateFile: () => 'file_does_not_exist.wasm' },
      () => {
        done.fail('Resolve callback should not fire')
      },
      (error) => {
        expectToBeError(error)
        expect(error.message).toMatch('no such file')
        asyncCatched = true
      }
    )
  })

  it('should return error via Promise and throw Exception', (done) => {
    let asyncCatched = false

    // Listener for uncaught exceptions
    const errorListener = (err: Error) => {
      expect(err.message).toMatch('no such file')
      expect(asyncCatched).toBeTruthy()
      originalProcess.removeListener('uncaughtException', errorListener)
      done()
    }

    originalProcess.on('uncaughtException', errorListener)

    mediaInfoFactory({ locateFile: () => 'file_does_not_exist.wasm' })
      .then(() => {
        done.fail('Resolve callback should not fire')
      })
      .catch((error: unknown) => {
        expectToBeError(error)
        expect(error.message).toMatch('no such file')
        asyncCatched = true
      })
  })
})
