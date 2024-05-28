import mediaInfoFactory, { type MediaInfo } from '..'

const methodNames = [
  'analyzeData',
  'close',
  'inform',
  'openBufferContinue',
  'openBufferFinalize',
  'openBufferContinueGotoGet',
  'openBufferInit',
] as const

const expectMediainfoObj = (mi: MediaInfo) => {
  for (const name of methodNames) {
    expect(mi[name]).toBeInstanceOf(Function)
  }
  expect(mi.options.chunkSize).toEqual(expect.any(Number))
}

it('should instantiate via callback', (done) => {
  mediaInfoFactory({}, (mi) => {
    try {
      expectMediainfoObj(mi)
    } finally {
      mi.close()
      done()
    }
  })
})

it('should instantiate via Promise', async () => {
  expect.assertions(8)
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
