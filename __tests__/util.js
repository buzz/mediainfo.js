import { promises as fs } from 'fs'
import http from 'http'
import https from 'https'

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

const analyzeHttpFile = (mi, url) =>
  new Promise((resolve, reject) => {
    const proto = url.startsWith('https://') ? https : http
    proto
      .get(url, (res) => {
        const contentLength = parseInt(res.headers['content-length'], 10)
        const data = new Uint8Array(contentLength)
        let pos = 0
        res
          .on('data', function (chunk) {
            data.set(chunk, pos)
            pos += chunk.length
          })
          .on('end', function () {
            const getSize = () => contentLength
            const readChunk = (size, offset) =>
              data.slice(offset, offset + size)
            mi.analyzeData(getSize, readChunk).then(resolve)
          })
      })
      .on('error', reject)
  })

export { analyzeFile, analyzeHttpFile }
