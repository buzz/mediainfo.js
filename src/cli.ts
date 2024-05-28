#!/usr/bin/env node

import { promises as fsPromises } from 'node:fs'

import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

import { unknownToError } from './error.js'
import { FORMAT_CHOICES } from './MediaInfo.js'
import mediaInfoFactory from './mediaInfoFactory.js'
import type { ReadChunkFunc } from './MediaInfo.js'
import type MediaInfo from './MediaInfo.js'

const analyze = async ({ coverData, file, format, full }: ReturnType<typeof parseArgs>) => {
  let fileHandle: fsPromises.FileHandle | undefined
  let fileSize: number
  let mediainfo: MediaInfo<typeof format> | undefined

  if (!file) {
    throw new TypeError('No file received!')
  }

  if (coverData && !['JSON', 'XML'].includes(format)) {
    throw new TypeError('For cover data you need to choose JSON or XML as output format!')
  }

  const readChunk: ReadChunkFunc = async (size, offset) => {
    if (fileHandle === undefined) {
      throw new Error('File unavailable')
    }
    const buffer = new Uint8Array(size)
    await fileHandle.read(buffer, 0, size, offset)
    return buffer
  }

  try {
    fileHandle = await fsPromises.open(file, 'r')
    const fileStat = await fileHandle.stat()
    fileSize = fileStat.size
    try {
      mediainfo = await mediaInfoFactory({ format, coverData, full })
    } catch (error: unknown) {
      throw unknownToError(error)
    }
    console.log(await mediainfo.analyzeData(() => fileSize, readChunk))
  } finally {
    fileHandle && (await fileHandle.close())
    mediainfo && mediainfo.close()
  }
}

function parseArgs() {
  const yargsInstance = yargs(hideBin(process.argv))
  return yargsInstance
    .wrap(yargsInstance.terminalWidth())
    .option('format', {
      alias: 'f',
      default: 'text' as const,
      describe: 'Choose format',
      choices: FORMAT_CHOICES,
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
    .command('$0 <file>', 'Show information about media file')
    .positional('file', { describe: 'File to analyze', type: 'string' })
    .help('h')
    .alias('h', 'help')
    .fail((message: string, error: Error, argv) => {
      if (message) {
        console.error(argv.help())
        console.error(message)
      }
      console.error(error.message)
      process.exit(1)
    })
    .parseSync()
}

try {
  await analyze(parseArgs())
} catch (error: unknown) {
  console.error(unknownToError(error).message)
}
