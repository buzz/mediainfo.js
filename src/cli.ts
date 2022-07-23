#!/usr/bin/env node

import { promises as fsPromises } from 'fs'
import * as yargs from 'yargs'
import { Argv } from 'yargs'

import MediaInfoFactory from '../dist/mediainfo'
import type { FormatType, MediaInfo, ReadChunkFunc, Result } from './types'

interface Arguments {
  file: string
  format: FormatType
  coverData: boolean
}

const formatChoices: ReadonlyArray<FormatType> = ['JSON', 'XML', 'HTML', 'text']

const parser = yargs
  .option('format', {
    alias: 'f',
    default: 'text',
    describe: 'Choose format',
    choices: formatChoices,
    type: 'string',
  })
  .option('cover-data', {
    default: false,
    describe: 'Output cover data as base64',
    type: 'boolean',
  })
  .command('$0 <file>', 'Show information about media files', (yargs: Argv) => {
    yargs.positional('file', {
      describe: 'File to analyze',
      type: 'string',
    })
  })
  .fail(function (msg: string, err: Error, yargs) {
    if (msg) {
      console.error(yargs.help())
      console.error(msg)
    }
    if (err) {
      console.error(err.message)
    }
    process.exit(1)
  })

const analyze = async ({ coverData, file, format }: Arguments) => {
  let fileHandle: fsPromises.FileHandle | undefined
  let fileSize: number
  let mediainfo: MediaInfo | undefined
  let result: Result

  if (coverData && !['JSON', 'XML'].includes(format)) {
    throw TypeError('For cover data you need to choose JSON or XML as output format!')
  }

  const readChunk: ReadChunkFunc = async (size, offset) => {
    const buffer = new Uint8Array(size)
    await (fileHandle as fsPromises.FileHandle).read(buffer, 0, size, offset)
    return buffer
  }

  try {
    fileHandle = await fsPromises.open(file, 'r')
    fileSize = (await fileHandle.stat()).size
    mediainfo = (await MediaInfoFactory({ format, coverData })) as MediaInfo
    result = (await mediainfo.analyzeData(() => fileSize, readChunk)) as Result
  } finally {
    fileHandle && (await fileHandle.close())
    mediainfo && mediainfo.close()
  }

  return result
}

;(async () => {
  const argv = await parser.argv

  try {
    const result = await analyze({
      coverData: argv.coverData,
      file: argv.file as string,
      format: argv.format as FormatType,
    })
    console.log(result)
  } catch (err) {
    console.error(err)
  }
})()
