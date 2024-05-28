import mediaInfoFactory from '..'
import { expectToBeDefined } from './utils'
import type { MediaInfo, SizeArg } from '..'

it.each([
  ['number', 20],
  ['function', () => 20],
  ['async function', () => Promise.resolve(20)],
])('should accept %s as size arg', async (_: string, size: SizeArg) => {
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()
    const result = await mi.analyzeData(size, () => new Uint8Array(10))
    expectToBeDefined(result.media)
    const { track } = result.media
    expect(track).toHaveLength(1)
    expect(track[0].FileSize).toBe('20')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})
