import MediaInfoModuleFactory from '../build/MediaInfoModule'

import {
  AnalyzeFunc,
  FormatType,
  MediaInfoInterface,
  MediaInfoOptions,
  MediaInfoWasmInterface,
} from './types'

import { MediaInfoModule } from './MediaInfoModule'

const DEFAULT_OPTIONS: MediaInfoOptions = {
  chunkSize: 1024 * 1024,
  format: 'object',
}

const makeMediaInfo = (
  wasmModuleInstance: MediaInfoWasmInterface,
  { chunkSize, format }: MediaInfoOptions
): MediaInfoInterface => {
  const analyzeData: AnalyzeFunc = (getSize, readChunk, cb) => {
    if (cb === undefined) {
      return new Promise((resolve) =>
        analyzeData(getSize, readChunk, (result) => resolve(result))
      )
    }

    const fileSizeValue = getSize()
    let offset = 0

    const runReadDataLoop = (fileSize: number) => {
      const getChunk = () => {
        const readNextChunk = (data: Uint8Array) => {
          if (continueBuffer(data)) {
            getChunk()
          } else {
            finalize()
          }
        }
        const dataValue = readChunk(
          Math.min(chunkSize as number, fileSize - offset),
          offset
        )
        if (dataValue instanceof Promise) {
          dataValue.then(readNextChunk)
        } else {
          readNextChunk(dataValue)
        }
      }

      const continueBuffer = (data: Uint8Array): boolean => {
        if (data.length === 0 || openBufferContinue(data, data.length)) {
          return false
        }
        const seekTo: number = openBufferContinueGotoGet()
        if (seekTo === -1) {
          offset += data.length
        } else {
          offset = seekTo
          openBufferInit(fileSize, seekTo)
        }
        return true
      }

      const finalize = () => {
        openBufferFinalize()
        const result = inform()
        cb(format === 'object' ? JSON.parse(result) : result)
      }

      openBufferInit(fileSize, offset)
      getChunk()
    }

    if (fileSizeValue instanceof Promise) {
      fileSizeValue.then(runReadDataLoop)
    } else {
      runReadDataLoop(fileSizeValue)
    }
  }

  const close = () => wasmModuleInstance.close()

  const inform = () => wasmModuleInstance.inform()

  // bit 0 set -> done
  const openBufferContinue = (data: Uint8Array, size: number) =>
    !!(wasmModuleInstance.open_buffer_continue(data, size) & 0x02)

  const openBufferContinueGotoGet = () => {
    // JS bindings don't support 64 bit int
    // https://github.com/buzz/mediainfo.js/issues/11
    let seekTo = -1
    const seekToLow: number = wasmModuleInstance.open_buffer_continue_goto_get_lower()
    const seekToHigh: number = wasmModuleInstance.open_buffer_continue_goto_get_upper()
    if (seekToLow == -1 && seekToHigh == -1) {
      seekTo = -1
    } else if (seekToLow < 0) {
      seekTo = seekToLow + 4294967296 + seekToHigh * 4294967296
    } else {
      seekTo = seekToLow + seekToHigh * 4294967296
    }
    return seekTo
  }

  const openBufferFinalize = () => wasmModuleInstance.open_buffer_finalize()

  const openBufferInit = (size: number, offset: number) =>
    wasmModuleInstance.open_buffer_init(size, offset)

  return {
    analyzeData,
    chunkSize: chunkSize as number,
    close,
    inform,
    openBufferContinue,
    openBufferContinueGotoGet,
    openBufferFinalize,
    openBufferInit,
  }
}

const MediaInfoFactory = (
  options: MediaInfoOptions = {},
  callback?: (mediainfo: MediaInfoInterface) => void
): Promise<MediaInfoInterface> | void => {
  if (callback === undefined) {
    return new Promise((resolve) =>
      MediaInfoFactory(options, (mediainfo) => resolve(mediainfo))
    )
  }

  const mergedOptions: MediaInfoOptions = { ...DEFAULT_OPTIONS, ...options }

  // Wait for WASM module to be fetched and loaded
  MediaInfoModuleFactory().then((wasmModule: MediaInfoModule) => {
    const format =
      mergedOptions.format === 'object' ? 'JSON' : mergedOptions.format
    const wasmModuleInstance: MediaInfoWasmInterface = new wasmModule.MediaInfo(
      format as FormatType
    )
    callback(makeMediaInfo(wasmModuleInstance, mergedOptions))
  })
}

export default MediaInfoFactory
