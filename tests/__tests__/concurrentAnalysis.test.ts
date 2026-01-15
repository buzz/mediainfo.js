import mediaInfoFactory, { type ReadChunkFunc } from 'mediainfo.js'

const readChunk: ReadChunkFunc = async () => {
  await new Promise((r) => setTimeout(r, 50))
  return new Uint8Array([1, 2, 3])
}

it('should not allow multiple simultaneous analyzeData calls (issue #173)', async () => {
  const mi = await mediaInfoFactory()
  void mi.analyzeData(99_999, readChunk)

  await expect(mi.analyzeData(99_999, readChunk)).rejects.toThrow(
    /cannot start a new analysis while another is in progress/
  )
})
