import MediaInfoModuleFactory from '../build/MediaInfoModule'

import type {
  FormatType,
  GetSizeFunc,
  MediaInfo as MediaInfoInterface,
  MediaInfoOptions,
  MediaInfoWasmInterface,
  ReadChunkFunc,
  Result,
} from './types'

import { MediaInfoModule } from './MediaInfoModule'

const DEFAULT_OPTIONS: MediaInfoOptions = {
  coverData: false,
  chunkSize: 1024 * 1024,
  format: 'object',
}

/**
 * Wrapper around MediaInfoLib WASM module.
 */
class MediaInfo implements MediaInfoInterface {
  private readonly wasmInstance: MediaInfoWasmInterface
  readonly options: MediaInfoOptions

  /**
   * Create an instance of MediaInfo. The constructor should not be called directly.
   * Instead use {@link MediaInfoFactory} to receive {@link MediaInfo} instance.
   *
   * @param wasmInstance WASM module instance to be used
   * @param options User options
   */
  constructor(wasmInstance: MediaInfoWasmInterface, options: MediaInfoOptions) {
    this.wasmInstance = wasmInstance
    this.options = options
  }

  analyzeData(
    getSize: GetSizeFunc,
    readChunk: ReadChunkFunc,
    callback?: (result: Result) => void
  ): Promise<Result> | void {
    let offset = 0

    if (callback === undefined) {
      return new Promise((resolve) =>
        this.analyzeData(getSize, readChunk, (result: Result) =>
          resolve(result)
        )
      )
    }

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
          Math.min(this.options.chunkSize as number, fileSize - offset),
          offset
        )
        if (dataValue instanceof Promise) {
          dataValue.then(readNextChunk)
        } else {
          readNextChunk(dataValue)
        }
      }

      const continueBuffer = (data: Uint8Array): boolean => {
        if (data.length === 0 || this.openBufferContinue(data, data.length)) {
          return false
        }
        const seekTo: number = this.openBufferContinueGotoGet()
        if (seekTo === -1) {
          offset += data.length
        } else {
          offset = seekTo
          this.openBufferInit(fileSize, seekTo)
        }
        return true
      }

      const finalize = () => {
        this.openBufferFinalize()
        const result = this.inform()
        callback(this.options.format === 'object' ? JSON.parse(result) : result)
      }

      this.openBufferInit(fileSize, offset)
      getChunk()
    }

    const fileSizeValue = getSize()
    if (fileSizeValue instanceof Promise) {
      fileSizeValue.then(runReadDataLoop)
    } else {
      runReadDataLoop(fileSizeValue)
    }
  }

  close(): void {
    this.wasmInstance.close()
  }

  inform(): string {
    return this.wasmInstance.inform()
  }

  openBufferContinue(data: Uint8Array, size: number): boolean {
    // bit 0 set -> done
    return !!(this.wasmInstance.open_buffer_continue(data, size) & 0x02)
  }

  openBufferContinueGotoGet(): number {
    // JS bindings don't support 64 bit int
    // https://github.com/buzz/mediainfo.js/issues/11
    let seekTo = -1
    const seekToLow: number = this.wasmInstance.open_buffer_continue_goto_get_lower()
    const seekToHigh: number = this.wasmInstance.open_buffer_continue_goto_get_upper()
    if (seekToLow == -1 && seekToHigh == -1) {
      seekTo = -1
    } else if (seekToLow < 0) {
      seekTo = seekToLow + 4294967296 + seekToHigh * 4294967296
    } else {
      seekTo = seekToLow + seekToHigh * 4294967296
    }
    return seekTo
  }

  openBufferFinalize(): void {
    this.wasmInstance.open_buffer_finalize()
  }

  openBufferInit(size: number, offset: number): void {
    this.wasmInstance.open_buffer_init(size, offset)
  }
}

function MediaInfoFactory(
  options?: MediaInfoOptions
): Promise<MediaInfoInterface>
function MediaInfoFactory(
  options: MediaInfoOptions,
  callback: (mediainfo: MediaInfoInterface) => void
): void

function MediaInfoFactory(
  options: MediaInfoOptions = {},
  callback?: (mediainfo: MediaInfoInterface) => void
): Promise<MediaInfoInterface> | void {
  if (callback === undefined) {
    return new Promise((resolve) => MediaInfoFactory(options, resolve))
  }

  const mergedOptions: MediaInfoOptions = { ...DEFAULT_OPTIONS, ...options }

  // Wait for WASM module to be fetched and loaded
  MediaInfoModuleFactory().then((wasmModule: MediaInfoModule) => {
    const format =
      mergedOptions.format === 'object' ? 'JSON' : mergedOptions.format
    const wasmModuleInstance: MediaInfoWasmInterface = new wasmModule.MediaInfo(
      format as FormatType,
      mergedOptions.coverData as boolean
    )
    callback(new MediaInfo(wasmModuleInstance, mergedOptions))
  })
}

export type {
  FormatType,
  GetSizeFunc,
  MediaInfo,
  MediaInfoOptions,
  MediaInfoWasmInterface,
  ReadChunkFunc,
  Result,
}

export default MediaInfoFactory
