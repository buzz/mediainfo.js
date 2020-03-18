#!/usr/bin/env node

const { open } = require('fs').promises
const MediaInfo = require('../dist/mediainfo.js')

const main = async (filePath) => {
  let fileHandle
  let mediainfo
  try {
    fileHandle = await open(filePath, 'r')
    mediainfo = await MediaInfo({ format: 'text' })
    const result = await mediainfo.analyzeData({
      readData: async (size, offset) => {
        const buffer = new Uint8Array(size)
        await fileHandle.read(buffer, 0, size, offset)
        return buffer
      },
      getSize: async () => (await fileHandle.stat()).size,
    })
    console.log(result)
  } catch (error) {
    console.error(error)
  } finally {
    fileHandle && (await fileHandle.close())
    mediainfo && mediainfo.close()
  }
}

const filePath = process.argv[2]
if (!filePath) {
  console.log(`Usage: ${process.argv[1]} FILENAME`)
} else {
  main(filePath)
}
