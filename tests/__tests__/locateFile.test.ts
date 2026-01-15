import path from 'node:path'

import { jest } from '@jest/globals'
import mediaInfoFactory from 'mediainfo.js'

const distDir = path.resolve(import.meta.dirname, '..', '..', 'dist', 'esm')

it('should use locateFile callback', async () => {
  const locateFile = jest.fn((filename: string, prefix: string) =>
    path.resolve(prefix, '..', filename)
  )
  const mi = await mediaInfoFactory({ locateFile })
  expect(locateFile).toHaveBeenCalledTimes(1)
  expect(locateFile).toHaveBeenCalledWith('MediaInfoModule.wasm', `${distDir}/`)
  mi.close()
})
