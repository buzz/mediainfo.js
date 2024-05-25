import { DOMParser } from '@xmldom/xmldom'
import xpath from 'xpath'

import MediaInfoFactory from '..'
import type { FormatType, MediaInfo } from '..'

function analyzeFakeData<TFormat extends FormatType>(mi: MediaInfo<TFormat>) {
  return mi.analyzeData(
    () => 20,
    () => new Uint8Array(10)
  )
}

it('should use default options', async () => {
  expect.assertions(4)

  const mi = await MediaInfoFactory()
  expect(mi.options.coverData).toBe(false)
  expect(mi.options.chunkSize).toBe(256 * 1024)
  expect(mi.options.full).toBe(false)
  expect(await analyzeFakeData(mi)).toBeInstanceOf(Object)
  mi.close()
})

it('should accepts options', async () => {
  expect.assertions(4)

  const mi = await MediaInfoFactory({
    chunkSize: 16 * 1024,
    coverData: true,
    format: 'object',
    full: true,
  })
  expect(mi.options.chunkSize).toBe(16 * 1024)
  expect(mi.options.coverData).toBe(true)
  expect(mi.options.full).toBe(true)
  const result = await analyzeFakeData(mi)
  expect(result.media?.track[0].FileSize).toBe('20')
  mi.close()
})

it('should return JSON string', async () => {
  expect.assertions(3)
  const mi = await MediaInfoFactory({ format: 'JSON' })
  const result = await analyzeFakeData(mi)
  expect(result).toEqual(expect.any(String))
  let fileSize: string = ''
  expect(() => {
    fileSize = JSON.parse(result).media.track[0].FileSize
  }).not.toThrow()
  expect(fileSize).toBe('20')
  mi.close()
})

it('should return HTML string', async () => {
  expect.assertions(4)
  const mi = await MediaInfoFactory({ format: 'HTML' })
  const result = await analyzeFakeData(mi)
  expect(result).toEqual(expect.any(String))
  expect(result).toMatch('<html>')
  expect(result).toMatch('20.0 Bytes')
  expect(result).toMatch('</html>')
  mi.close()
})

it('should return formatted text string', async () => {
  expect.assertions(3)
  const mi = await MediaInfoFactory({ format: 'text' })
  const result = await analyzeFakeData(mi)
  expect(result).toEqual(expect.any(String))
  expect(result).toMatch('File size')
  expect(result).toMatch('20.0 Bytes')
  mi.close()
})

it('should return XML string', async () => {
  expect.assertions(2)
  const mi = await MediaInfoFactory({ format: 'XML' })
  const result = await analyzeFakeData(mi)
  expect(result).toEqual(expect.any(String))

  const parser = new DOMParser()
  const doc = parser.parseFromString(result, 'text/xml')
  const select = xpath.useNamespaces({ mi: 'https://mediaarea.net/mediainfo' })

  const elems = select('//mi:media/mi:track/mi:FileSize/text()', doc)

  if (!xpath.isArrayOfNodes(elems) || !xpath.isTextNode(elems[0])) {
    throw new Error('FileSize not found')
  }

  expect(elems[0].nodeValue?.trim()).toBe('20')
  mi.close()
})
