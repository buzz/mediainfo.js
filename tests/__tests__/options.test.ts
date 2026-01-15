import { assertIsNodeLike } from '@xmldom/is-dom-node'
import { DOMParser } from '@xmldom/xmldom'
import mediaInfoFactory from 'mediainfo.js'
import xpath from 'xpath'

import { expectToBeDefined, expectTrackType } from '../utils.ts'

import type { FormatType, MediaInfo, ResultMap } from 'mediainfo.js'

function analyzeFakeData<TFormat extends FormatType>(mi: MediaInfo<TFormat>) {
  return mi.analyzeData(
    () => 20,
    () => new Uint8Array(10)
  )
}

it('should use default options', async () => {
  expect.assertions(4)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory()
    expect(mi.options.coverData).toBe(false)
    expect(mi.options.chunkSize).toBe(256 * 1024)
    expect(mi.options.full).toBe(false)
    expect(await analyzeFakeData(mi)).toBeInstanceOf(Object)
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should accepts options', async () => {
  expect.assertions(6)
  let mi: MediaInfo | undefined

  try {
    mi = await mediaInfoFactory({
      chunkSize: 16 * 1024,
      coverData: true,
      format: 'object',
      full: true,
    })
    expect(mi.options.chunkSize).toBe(16 * 1024)
    expect(mi.options.coverData).toBe(true)
    expect(mi.options.full).toBe(true)
    const result = await analyzeFakeData(mi)
    expectToBeDefined(result.media)
    const [track0] = result.media.track
    expectTrackType(track0, 'General')
    expect(track0.FileSize).toBe('20')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should return JSON string', async () => {
  expect.assertions(5)
  let mi: MediaInfo<'JSON'> | undefined

  try {
    mi = await mediaInfoFactory({ format: 'JSON' })
    const result = await analyzeFakeData(mi)
    expect(result).toEqual(expect.any(String))
    let fileSize: string | undefined
    expect(() => {
      const resultObj = JSON.parse(result) as ResultMap['object']
      expectToBeDefined(resultObj.media)
      const [track0] = resultObj.media.track
      expectTrackType(track0, 'General')
      fileSize = track0.FileSize
    }).not.toThrow()
    expect(fileSize).toBe('20')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should return HTML string', async () => {
  expect.assertions(4)
  let mi: MediaInfo<'HTML'> | undefined

  try {
    mi = await mediaInfoFactory({ format: 'HTML' })
    const result = await analyzeFakeData(mi)
    expect(result).toEqual(expect.any(String))
    expect(result).toMatch(/<html/)
    expect(result).toMatch('20.0 Bytes')
    expect(result).toMatch('</html>')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should return formatted text string', async () => {
  expect.assertions(3)
  let mi: MediaInfo<'text'> | undefined

  try {
    mi = await mediaInfoFactory({ format: 'text' })
    const result = await analyzeFakeData(mi)
    expect(result).toEqual(expect.any(String))
    expect(result).toMatch('File size')
    expect(result).toMatch('20.0 Bytes')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})

it('should return XML string', async () => {
  expect.assertions(2)
  let mi: MediaInfo<'XML'> | undefined

  try {
    mi = await mediaInfoFactory({ format: 'XML' })
    const result = await analyzeFakeData(mi)
    expect(result).toEqual(expect.any(String))

    const parser = new DOMParser()
    const doc = parser.parseFromString(result, 'text/xml')
    assertIsNodeLike(doc)
    const select = xpath.useNamespaces({ mi: 'https://mediaarea.net/mediainfo' })

    const elems = select('//mi:media/mi:track/mi:FileSize/text()', doc)

    if (!xpath.isArrayOfNodes(elems) || !xpath.isTextNode(elems[0])) {
      throw new Error('FileSize not found')
    }

    expect(elems[0].nodeValue?.trim()).toBe('20')
  } finally {
    if (mi) {
      mi.close()
    }
  }
})
