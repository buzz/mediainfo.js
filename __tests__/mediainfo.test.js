import { promises as fs } from 'fs'
import path from 'path'
import xml2js from 'xml2js'

import MediaInfo from '../dist/mediainfo'

const analyzeFakeData = (mi) =>
  mi.analyzeData(
    () => 20,
    () => new Uint8Array(10)
  )

const analyzeAvi = async (mi) => {
  const fileHandle = await fs.open(path.resolve(__dirname, 'test.avi'), 'r')
  const getSize = async () => (await fileHandle.stat()).size
  const readChunk = async (size, offset) => {
    const buffer = new Uint8Array(size)
    await fileHandle.read(buffer, 0, size, offset)
    return buffer
  }
  const result = await mi.analyzeData(getSize, readChunk)
  fileHandle.close()
  return result
}

describe('mediainfo.js', () => {
  describe('instantiate', () => {
    const expectMediainfoObj = (mi) => {
      const methodNames = [
        'analyzeData',
        'close',
        'inform',
        'openBufferContinue',
        'openBufferFinalize',
        'openBufferContinueGotoGet',
        'openBufferInit',
      ]
      methodNames.forEach((name) => expect(mi[name]).toBeInstanceOf(Function))
      expect(mi.options.chunkSize).toEqual(expect.any(Number))
    }

    it('should instantiate via callback', (done) => {
      expect.assertions(8)
      MediaInfo({}, (mi) => {
        expectMediainfoObj(mi)
        done()
      })
    })

    it('should instantiate via Promise', async () => {
      expect.assertions(8)
      const mi = await MediaInfo()
      expectMediainfoObj(mi)
    })
  })

  describe('options', () => {
    describe('defaults', () => {
      it('should use chunk size of 1 MiB', async () => {
        expect.assertions(1)
        const mi = await MediaInfo()
        expect(mi.options.chunkSize).toEqual(1024 * 1024)
      })

      it('should return Object as result', async () => {
        expect.assertions(1)
        const mi = await MediaInfo()
        const result = await analyzeFakeData(mi)
        expect(result).toBeInstanceOf(Object)
      })
    })

    it('should use custom chunk size', async () => {
      const mi = await MediaInfo({ chunkSize: 16 * 1024 })
      expect(mi.options.chunkSize).toEqual(16 * 1024)
    })

    it('should return Object as result', async () => {
      expect.assertions(1)
      const mi = await MediaInfo({ format: 'object' })
      const result = await analyzeFakeData(mi)
      expect(result.media.track[0].FileSize).toBe('20')
    })

    it('should return JSON as result', async () => {
      expect.assertions(3)
      const mi = await MediaInfo({ format: 'JSON' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      let obj
      expect(() => {
        obj = JSON.parse(result)
      }).not.toThrow()
      expect(obj.media.track[0].FileSize).toBe('20')
    })

    it('should return HTML as result', async () => {
      expect.assertions(4)
      const mi = await MediaInfo({ format: 'HTML' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      expect(result).toMatch('<html>')
      expect(result).toMatch('20.0 Bytes')
      expect(result).toMatch('</html>')
    })

    it('should return XML as result', async () => {
      expect.assertions(2)
      const mi = await MediaInfo({ format: 'XML' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      const obj = await xml2js.parseStringPromise(result)
      expect(obj.MediaInfo.media[0].track[0].FileSize[0]).toBe('20')
    })

    it('should return text as result', async () => {
      expect.assertions(3)
      const mi = await MediaInfo({ format: 'text' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      expect(result).toMatch('File size')
      expect(result).toMatch('20.0 Bytes')
    })
  })

  describe('test.avi', () => {
    it('should parse AVI', async () => {
      expect.assertions(12)
      const mi = await MediaInfo()
      const result = await analyzeAvi(mi)
      expect(result).toBeInstanceOf(Object)
      const { track } = result.media
      expect(track).toHaveLength(2)
      const [track0, track1] = track
      expect(track0['@type']).toBe('General')
      expect(track0.Encoded_Application).toBe('Lavf57.41.100')
      expect(track0.FileSize).toBe('5686')
      expect(track0.Format).toBe('AVI')
      expect(track0.FrameRate).toBe('100.000')
      expect(track1['@type']).toBe('Video')
      expect(track1.CodecID).toBe('FMP4')
      expect(track1.ColorSpace).toBe('YUV')
      expect(track1.Height).toBe('1')
      expect(track1.Width).toBe('1')
    })
  })
})
