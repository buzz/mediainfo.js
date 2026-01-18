import mediaInfoFactory, { type MediaInfo } from 'mediainfo.js'

import { expectToBeDefined, expectTrackType } from '../utils.ts'

// 64-bit value: larger than 2^31-1 (2,147,483,647)
// eslint-disable-next-line unicorn/number-literal-case
const BIT64_VALUE = 0x7f_ff_ff_ff_ff_ff_ff_ffn

function createVirtualChunkGenerator(fileSize: number) {
  return {
    size: fileSize,
    readChunk: (_size: number) => new Uint8Array(_size),
  }
}

it('should handle file sizes exceeding 32-bit limits', async () => {
  expect.assertions(3)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()

    const largeSize = Number(BIT64_VALUE)
    const { size, readChunk } = createVirtualChunkGenerator(largeSize)

    const result = await mi.analyzeData(size, readChunk)
    expectToBeDefined(result.media)
    const { track } = result.media
    expect(track).toHaveLength(1)
    const [track0] = track
    expectTrackType(track0, 'General')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should handle large file size within 32-bit range', async () => {
  expect.assertions(3)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()

    const size = 100_000_000 // 100 MB
    const { readChunk } = createVirtualChunkGenerator(size)

    const result = await mi.analyzeData(size, readChunk)
    expectToBeDefined(result.media)
    const { track } = result.media
    expect(track).toHaveLength(1)
    const [track0] = track
    expectTrackType(track0, 'General')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should handle sentinel value from sequential chunking', async () => {
  expect.assertions(3)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()

    const size = 100
    const { readChunk } = createVirtualChunkGenerator(size)

    const result = await mi.analyzeData(size, readChunk)
    expectToBeDefined(result.media)
    const { track } = result.media
    expect(track).toHaveLength(1)
    const [track0] = track
    expectTrackType(track0, 'General')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should handle chunking with controlled offsets', async () => {
  expect.assertions(3)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()

    const chunkCount = 10
    const chunkSize = 10
    const totalSize = chunkCount * chunkSize
    const { readChunk } = createVirtualChunkGenerator(totalSize)

    const result = await mi.analyzeData(totalSize, readChunk)
    expectToBeDefined(result.media)
    const { track } = result.media
    expect(track).toHaveLength(1)
    const [track0] = track
    expectTrackType(track0, 'General')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should handle async readChunk with large sizes', async () => {
  expect.assertions(3)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()

    const size = Number(BIT64_VALUE)
    const { readChunk } = createVirtualChunkGenerator(size)
    const asyncReadChunk = async (_size: number) => {
      await new Promise<void>((r) => setTimeout(r, 1))
      return readChunk(_size)
    }

    const result = await mi.analyzeData(size, asyncReadChunk)
    expectToBeDefined(result.media)
    const { track } = result.media
    expect(track).toHaveLength(1)
    const [track0] = track
    expectTrackType(track0, 'General')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})
