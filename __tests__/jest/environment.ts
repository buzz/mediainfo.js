import fs from 'fs/promises'

import { TestEnvironment } from 'jest-environment-node'

import MediaInfoFactory from '../..'
import type { ReadChunkFunc } from '../..'
import type { DEFAULT_OPTIONS, FormatType } from '../../dist/MediaInfo'

class MediaInfoEnvironment extends TestEnvironment {
  async setup() {
    this.global.analyzeFile = MediaInfoEnvironment.analyzeFile
  }

  getVmContext() {
    return super.getVmContext()
  }

  static async analyzeFile<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format>(
    filepath: string,
    opts?: Parameters<typeof MediaInfoFactory<TFormat>>[0]
  ) {
    const mi = await MediaInfoFactory<TFormat>(opts)
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
