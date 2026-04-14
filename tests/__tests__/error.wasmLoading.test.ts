import mediaInfoFactory from 'mediainfo.js'
import { vi } from 'vitest'

import { expectToBeError } from '../utils.ts'

beforeEach(() => {
  // Suppress console output from emscripten module
  vi.spyOn(console, 'error').mockImplementation(() => null)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Error on WASM loading', () => {
  it('should return error via callback and throw Exception', async () => {
    await expect(
      new Promise<void>((resolve, reject) => {
        mediaInfoFactory(
          { locateFile: () => 'file_does_not_exist.wasm' },
          () => {
            reject(new Error('Resolve callback should not fire'))
          },
          (error) => {
            try {
              expectToBeError(error)
              expect(error.message).toMatch('no such file')
              resolve()
            } catch (error_) {
              reject(error_ instanceof Error ? error_ : new Error(String(error_)))
            }
          }
        )
      })
    ).resolves.toBeUndefined()
  })

  it('should return error via Promise and throw Exception', async () => {
    await expect(
      mediaInfoFactory({ locateFile: () => 'file_does_not_exist.wasm' })
    ).rejects.toThrow('no such file')
  })
})
