import mediaInfoFactory, { type MediaInfo } from '../src'

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
  mediaInfoFactory({}, (mi: MediaInfo) => {
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

it('should reset the MediaInfo instance', async () => {
  expect.assertions(9);
  let mi: MediaInfo | undefined;
  try {
    mi = await mediaInfoFactory();
    expectMediainfoObj(mi);

    // Perform a reset
    mi.reset();

    // Verify that the instance is still functional after reset
    expectMediainfoObj(mi);
  } finally {
    if (mi) {
      mi.close();
    }
  }
});
