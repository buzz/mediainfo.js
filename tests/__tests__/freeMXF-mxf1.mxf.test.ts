import fs from 'node:fs/promises'

import mediaInfoFactory from 'mediainfo.js'

import { expectToBeDefined, expectTrackType, fixturePath } from '../utils.ts'

const makeReadChunk = (fh: fs.FileHandle) => async (chunkSize: number, offset: number) => {
  const buffer = new Uint8Array(chunkSize)
  await fh.read(buffer, 0, chunkSize, offset)
  return buffer
}

it('should parse MXF correctly on second run (issue #177)', async () => {
  const mi = await mediaInfoFactory()

  for (let i = 0; i < 2; ++i) {
    const fileHandle = await fs.open(fixturePath('freeMXF-mxf1.mxf'), 'r')
    const { size } = await fileHandle.stat()

    const result = await mi.analyzeData(size, makeReadChunk(fileHandle))

    expectToBeDefined(result.media)
    const { track } = result.media

    const [track0, track1, ,] = track
    expectTrackType(track0, 'General')
    expect(track0.Format).toBe('MXF')
    expect(track0.Duration).toBe(10.64)
    expect(track0.OverallBitRate).toBe(2_116_833)
    expect(track0.FrameCount).toBe(266)
    expect(track0.StreamSize).toBe(26_112)
    expect(track0.FooterSize).toBe(4439)
    expect(track0.Encoded_Date).toBe('2006-01-11 18:58:47.524')

    expectTrackType(track1, 'Video')
    expect(track1.Format_Settings_GOP).toBe('M=3, N=12')
    expect(track1.Duration).toBe(10.64)
    expect(track1.FrameCount).toBe(266)
    expect(track1.Delay).toBeNear(3600, 5) // Still slightly off 🤷
    expect(track1.StreamSize).toBe(2_789_276)

    await fileHandle.close()
  }
})
