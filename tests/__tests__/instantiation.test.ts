import mediaInfoFactory, { type MediaInfo } from 'mediainfo.js'

const methodNames = [
  'analyzeData',
  'close',
  'inform',
  'openBufferContinue',
  'openBufferFinalize',
  'openBufferContinueGotoGet',
  'openBufferInit',
  'reset',
] as const

const expectMediainfoObj = (mi: MediaInfo) => {
  for (const name of methodNames) {
    expect(mi[name]).toBeInstanceOf(Function)
  }
  expect(mi.options.chunkSize).toEqual(expect.any(Number))
}

it('should instantiate via callback', async () => {
  await new Promise<void>((resolve, reject) => {
    mediaInfoFactory(
      {},
      (mi) => {
        try {
          expectMediainfoObj(mi)
        } finally {
          mi.close()
          resolve()
        }
      },
      (err) => {
        reject(err instanceof Error ? err : new Error(String(err)))
      }
    )
  })
})

it('should instantiate via Promise', async () => {
  let mi: MediaInfo | undefined
  try {
    mi = await mediaInfoFactory()
    expectMediainfoObj(mi)
  } finally {
    if (mi) {
      mi.close()
    }
  }
})
