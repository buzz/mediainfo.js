import { promises as fs } from 'fs'

const analyzeFile = async (mi, filepath) => {
  const fileHandle = await fs.open(filepath, 'r')
  const getSize = async () => (await fileHandle.stat()).size
  const readChunk = async (size, offset) => {
    const buffer = new Uint8Array(size)
    await fileHandle.read(buffer, 0, size, offset)
    return buffer
  }
  const result = await mi.analyzeData(getSize, readChunk)
  fileHandle.close()
  return result
}

export default analyzeFile
