import xml2js from 'xml2js'

import MediaInfoFactory, { type MediaInfo } from '..'

const analyzeFakeData = (mi: MediaInfo) =>
  mi.analyzeData(
    () => 20,
    () => new Uint8Array(10)
  )

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
  })

  describe('options', () => {
    describe('defaults', () => {
      it('should use coverData=false', async () => {
        expect.assertions(1)
        const mi = await MediaInfoFactory()
        expect(mi.options.coverData).toBe(false)
        mi.close()
      })

      it('should use chunk size of 256 * 1024 bytes', async () => {
        expect.assertions(1)
        const mi = await MediaInfoFactory()
        expect(mi.options.chunkSize).toEqual(256 * 1024)
        mi.close()
      })

      it('should return Object as result', async () => {
        expect.assertions(1)
        const mi = await MediaInfoFactory()
        const result = await analyzeFakeData(mi)
        expect(result).toBeInstanceOf(Object)
        mi.close()
      })

      it('should use full=false', async () => {
        expect.assertions(1)
        const mi = await MediaInfoFactory()
        expect(mi.options.full).toBe(false)
        mi.close()
      })
    })

    it('should return true for coverData', async () => {
      const mi = await MediaInfoFactory({ coverData: true })
      expect(mi.options.coverData).toBe(true)
      mi.close()
    })

    it('should return true for full', async () => {
      const mi = await MediaInfoFactory({ full: true })
      expect(mi.options.full).toBe(true)
      mi.close()
    })

    it('should use custom chunk size', async () => {
      const mi = await MediaInfoFactory({ chunkSize: 16 * 1024 })
      expect(mi.options.chunkSize).toEqual(16 * 1024)
      mi.close()
    })

    it('should return Object as result', async () => {
      expect.assertions(1)
      const mi = await MediaInfoFactory({ format: 'object' })
      const result = await analyzeFakeData(mi)
      expect(result.media.track[0].FileSize).toBe('20')
      mi.close()
    })

    it('should return JSON as result', async () => {
      expect.assertions(3)
      const mi = await MediaInfoFactory({ format: 'JSON' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      let obj
      expect(() => {
        obj = JSON.parse(result)
      }).not.toThrow()
      expect(obj.media.track[0].FileSize).toBe('20')
      mi.close()
    })

    it('should return HTML as result', async () => {
      expect.assertions(4)
      const mi = await MediaInfoFactory({ format: 'HTML' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      expect(result).toMatch('<html>')
      expect(result).toMatch('20.0 Bytes')
      expect(result).toMatch('</html>')
      mi.close()
    })

    it('should return XML as result', async () => {
      expect.assertions(2)
      const mi = await MediaInfoFactory({ format: 'XML' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      const obj = await xml2js.parseStringPromise(result)
      expect(obj.MediaInfo.media[0].track[0].FileSize[0]).toBe('20')
      mi.close()
    })

    it('should return text as result', async () => {
      expect.assertions(3)
      const mi = await MediaInfoFactory({ format: 'text' })
      const result = await analyzeFakeData(mi)
      expect(result).toEqual(expect.any(String))
      expect(result).toMatch('File size')
      expect(result).toMatch('20.0 Bytes')
      mi.close()
    })
  })
})
