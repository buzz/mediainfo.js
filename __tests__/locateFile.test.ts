import { resolve } from 'path'

import MediaInfoFactory from '..'

const distDir = resolve(__dirname, '..', 'dist', 'cjs')

it('should use locateFile callback', async () => {
  expect.assertions(2)
  const locateFile = jest.fn((filename, path) => resolve(path, '..', filename))
  const mi = await MediaInfoFactory({ locateFile })
  expect(locateFile).toBeCalledTimes(1)
  expect(locateFile).toBeCalledWith('MediaInfoModule.wasm', `${distDir}/`)
  mi.close()
})
