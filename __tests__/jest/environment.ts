import fs from 'fs/promises'

import { TestEnvironment } from 'jest-environment-node'

import MediaInfoFactory from '../..'
import type { FormatType, MediaInfoFactoryOptions, ReadChunkFunc } from '../..'

class MediaInfoEnvironment extends TestEnvironment {
  async setup() {
    this.global.analyzeFile = MediaInfoEnvironment.analyzeFile
  }

  getVmContext() {
    return super.getVmContext()
  }

  static async analyzeFile<TFormat extends FormatType = 'object'>(
    filepath: string,
    opts?: MediaInfoFactoryOptions<TFormat>
  ) {
    const mi = await MediaInfoFactory(opts)
    const fileHandle = await fs.open(filepath, 'r')
    const getSize = async () => (await fileHandle.stat()).size
    const readChunk: ReadChunkFunc = async (size, offset) => {
      const buffer = new Uint8Array(size)
      await fileHandle.read(buffer, 0, size, offset)
      return buffer
    }
    const result = await mi.analyzeData(getSize, readChunk)
    fileHandle.close()
    mi.close()
    return result
  }
}

export default MediaInfoEnvironment
