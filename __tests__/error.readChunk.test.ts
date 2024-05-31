import mediaInfoFactory, { type MediaInfo } from '..'
import { expectToBeError } from './utils.ts'

const getSize = () => 99
const readChunk = () => {
  throw new Error('Foo error')
}

it('should return error via callback', async () => {
  expect.assertions(2)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()
    mi.analyzeData(getSize, readChunk, (result, error) => {
      expectToBeError(error)
      expect(error.message).toBe('Foo error')
    })
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should return error via Promise', async () => {
  expect.assertions(1)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()
    await expect(mi.analyzeData(getSize, readChunk)).rejects.toThrow('Foo error')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})
