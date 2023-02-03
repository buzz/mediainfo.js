#!/usr/bin/env node

import { promises as fsPromises } from 'fs'
import * as yargs from 'yargs'
import { Argv } from 'yargs'

import MediaInfoFactory from '../dist/mediainfo'
import type {
  FormatType,
  MediaInfo,
  MediaInfoFactoryOptions,
  ReadChunkFunc,
  ResultMap,
} from './_types'

interface Arguments<TFormat extends FormatType>
  extends Required<Pick<MediaInfoFactoryOptions<TFormat>, 'coverData' | 'format' | 'full'>> {
  file: string
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
  .option('full', {
    default: false,
    describe: 'Full information display (all internal tags)',
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

const analyze = async <TFormat extends FormatType>(args: Arguments<TFormat>) => {
  const { coverData, file, format, full } = args

  let fileHandle: fsPromises.FileHandle | undefined
  let fileSize: number
  let mediainfo: MediaInfo | undefined
  let result: ResultMap[FormatType]

  if (coverData && !['JSON', 'XML'].includes(format)) {
    throw TypeError('For cover data you need to choose JSON or XML as output format!')
  }

  const readChunk: ReadChunkFunc = async (size, offset) => {
    if (fileHandle === undefined) throw new Error('File unavailable')
    const buffer = new Uint8Array(size)
    await fileHandle.read(buffer, 0, size, offset)
    return buffer
  }

  try {
    fileHandle = await fsPromises.open(file, 'r')
    fileSize = (await fileHandle.stat()).size
    mediainfo = await MediaInfoFactory({ format, coverData, full })
    if (mediainfo === undefined) {
      throw new Error('Failed to initialize MediaInfo')
    }
    result = await mediainfo.analyzeData(() => fileSize, readChunk)
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
      full: argv.full,
    })
    console.log(result)
  } catch (err) {
    console.error(err)
  }
})()
