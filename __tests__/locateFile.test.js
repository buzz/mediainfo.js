import { resolve } from 'path'

import MediaInfo from '../dist/mediainfo'

const distDir = resolve(__dirname, '..', 'dist')

describe('locateFile', () => {
  it('should use locateFile callback', async () => {
    expect.assertions(2)
    const locateFile = jest.fn((filename, path) => resolve(path, filename))
    await MediaInfo({ locateFile })
    expect(locateFile).toBeCalledTimes(1)
    expect(locateFile).toBeCalledWith('MediaInfoModule.wasm', `${distDir}/`)
  })
})
