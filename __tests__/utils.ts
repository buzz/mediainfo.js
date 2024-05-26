import fs from 'node:fs/promises'
import path from 'node:path'

import MediaInfoFactory from '..'
import type { FormatType, MediaInfo, MediaInfoFactoryOptions, ReadChunkFunc, ResultMap } from '..'

function fixturePath(name: string) {
  return path.resolve(import.meta.dirname, 'fixtures', name)
}

async function analyzeFile<TFormat extends FormatType = 'object'>(
  filepath: string,
  opts?: MediaInfoFactoryOptions<TFormat>
) {
  let mi: MediaInfo<TFormat> | undefined
  let result: ResultMap[TFormat]

  try {
    mi = await MediaInfoFactory(opts)
    let fileHandle: fs.FileHandle | undefined

    const getSize = async () => {
      if (!fileHandle) {
        throw new Error('Should not happen')
      }
      const stat = await fileHandle.stat()
      return stat.size
    }
    const readChunk: ReadChunkFunc = async (size, offset) => {
      if (!fileHandle) {
        throw new Error('Should not happen')
      }
      const buffer = new Uint8Array(size)
      await fileHandle.read(buffer, 0, size, offset)
      return buffer
    }

    try {
      fileHandle = await fs.open(filepath, 'r')
      result = await mi.analyzeData(getSize, readChunk)
    } finally {
      if (fileHandle) {
        await fileHandle.close()
      }
    }
  } finally {
    if (mi) {
      mi.close()
    }
  }

  return result
}

function expectToBeDefined<T>(arg: T): asserts arg is Exclude<T, undefined> {
  expect(arg).toBeDefined()
}

function expectToBeError(error: unknown): asserts error is Error {
  expect(
    error !== null &&
      typeof error === 'object' &&
      Object.prototype.hasOwnProperty.call(error, 'message')
  ).toBeTruthy()
}
export { analyzeFile, expectToBeDefined, expectToBeError, fixturePath }
