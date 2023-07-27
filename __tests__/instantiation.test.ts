import MediaInfoFactory, { type MediaInfo } from '..'

const expectMediainfoObj = (mi: MediaInfo) => {
  const methodNames = [
    'analyzeData',
    'close',
    'inform',
    'openBufferContinue',
    'openBufferFinalize',
    'openBufferContinueGotoGet',
    'openBufferInit',
  ] as const
  methodNames.forEach((name) => expect(mi[name]).toBeInstanceOf(Function))
  expect(mi.options.chunkSize).toEqual(expect.any(Number))
}

it('should instantiate via callback', async () => {
  expect.assertions(8)
  const mi = await MediaInfoFactory()
  expectMediainfoObj(mi)
  mi.close()
})

it('should instantiate via Promise', async () => {
  expect.assertions(8)
  const mi = await MediaInfoFactory()
  expectMediainfoObj(mi)
  mi.close()
})
