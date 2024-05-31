import { unknownToError } from './error.js'
import { FLOAT_FIELDS, INT_FIELDS, type MediaInfoResult, type Track } from './MediaInfoResult.js'
import type { MediaInfoFactoryOptions } from './mediaInfoFactory.js'
import type { MediaInfoModule, MediaInfoWasmInterface } from './MediaInfoModule.js'

const MAX_UINT32_PLUS_ONE = 2 ** 32

/** Format of the result type */
type FormatType = 'object' | 'JSON' | 'XML' | 'HTML' | 'text'

type MediaInfoOptions<TFormat extends FormatType> = Required<
  Omit<MediaInfoFactoryOptions<TFormat>, 'locateFile'>
>

type SizeArg = (() => Promise<number> | number) | number

type ReadChunkFunc = (size: number, offset: number) => Promise<Uint8Array> | Uint8Array

interface ResultMap {
  object: MediaInfoResult
  JSON: string
  XML: string
  HTML: string
  text: string
}

const FORMAT_CHOICES = ['JSON', 'XML', 'HTML', 'text'] as const

const DEFAULT_OPTIONS = {
  coverData: false,
  chunkSize: 256 * 1024,
  format: 'object',
  full: false,
} as const

type ResultCallback<TFormat extends FormatType> = (
  result: ResultMap[TFormat] | null,
  err?: unknown
) => void

/**
 * Wrapper for the MediaInfoLib WASM module.
 *
 * This class should not be instantiated directly. Use the {@link mediaInfoFactory} function
 * to create instances of `MediaInfo`.
 *
 * @typeParam TFormat - The format type, defaults to `object`.
 */
class MediaInfo<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format> {
  private readonly mediainfoModule: MediaInfoModule
  private readonly mediainfoModuleInstance: MediaInfoWasmInterface

  /** @group General Use */
  readonly options: MediaInfoOptions<TFormat>

  /**
   * The constructor should not be called directly, instead use {@link mediaInfoFactory}.
   *
   * @hidden
   * @param mediainfoModule WASM module
   * @param options User options
   */
  constructor(mediainfoModule: MediaInfoModule, options: MediaInfoOptions<TFormat>) {
    this.mediainfoModule = mediainfoModule
    this.options = options

    // Instantiate
    this.mediainfoModuleInstance = new mediainfoModule.MediaInfo(
      options.format === 'object' ? 'JSON' : options.format,
      options.coverData,
      options.full
    )
  }

  /**
   * Convenience method for analyzing a buffer chunk by chunk.
   *
   * @param size Return total buffer size in bytes.
   * @param readChunk Read chunk of data and return an {@link Uint8Array}.
   * @group General Use
   */
  analyzeData(size: SizeArg, readChunk: ReadChunkFunc): Promise<ResultMap[TFormat]>

  /**
   * Convenience method for analyzing a buffer chunk by chunk.
   *
   * @param size Return total buffer size in bytes.
   * @param readChunk Read chunk of data and return an {@link Uint8Array}.
   * @param callback Function that is called once the processing is done
   * @group General Use
   */
  analyzeData(size: SizeArg, readChunk: ReadChunkFunc, callback: ResultCallback<TFormat>): void

  analyzeData(
    size: SizeArg,
    readChunk: ReadChunkFunc,
    callback?: ResultCallback<TFormat>
  ): Promise<ResultMap[TFormat] | null> | undefined {
    // Support promise signature
    if (callback === undefined) {
      return new Promise((resolve, reject) => {
        const resultCb: ResultCallback<TFormat> = (result, error) => {
          if (error || !result) {
            reject(unknownToError(error))
          } else {
            resolve(result)
          }
        }
        this.analyzeData(size, readChunk, resultCb)
      })
    }

    const finalize = () => {
      this.openBufferFinalize()
      const result = this.inform()
      if (this.options.format === 'object') {
        callback(this.parseResultJson(result))
      } else {
        callback(result)
      }
    }

    let offset = 0
    const runReadDataLoop = (fileSize: number) => {
      const readNextChunk = (data: Uint8Array) => {
        if (continueBuffer(data)) {
          getChunk()
        } else {
          finalize()
        }
      }

      const getChunk = () => {
        let dataValue
        try {
          const safeSize = Math.min(this.options.chunkSize, fileSize - offset)
          dataValue = readChunk(safeSize, offset)
        } catch (error: unknown) {
          callback('', unknownToError(error))
          return
        }

        if (dataValue instanceof Promise) {
          dataValue.then(readNextChunk).catch((error: unknown) => {
            callback('', unknownToError(error))
          })
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

      this.openBufferInit(fileSize, offset)
      getChunk()
    }

    const fileSizeValue = size instanceof Function ? size() : size

    if (fileSizeValue instanceof Promise) {
      fileSizeValue.then(runReadDataLoop).catch((error: unknown) => {
        callback(null, unknownToError(error))
      })
    } else {
      runReadDataLoop(fileSizeValue)
    }
  }

  /**
   * Close the MediaInfoLib WASM instance.
   *
   * @group General Use
   */
  close(): void {
    if (typeof this.mediainfoModuleInstance.close === 'function') {
      this.mediainfoModuleInstance.close()
    }
    if (typeof this.mediainfoModule.destroy === 'function') {
      this.mediainfoModule.destroy(this.mediainfoModuleInstance)
    }
  }

  /**
   * Receive result data from the WASM instance.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @returns Result data (format can be configured in options)
   * @group Low-level
   */
  inform(): string {
    return this.mediainfoModuleInstance.inform()
  }

  /**
   * Send more data to the WASM instance.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @param data Data buffer
   * @param size Buffer size
   * @returns Processing state: `0` (no bits set) = not finished, Bit `0` set = enough data read for providing information
   * @group Low-level
   */
  openBufferContinue(data: Uint8Array, size: number): boolean {
    // bit 3 set -> done
    return !!(this.mediainfoModuleInstance.open_buffer_continue(data, size) & 0x08)
  }

  /**
   * Retrieve seek position from WASM instance.
   * The MediaInfoLib function `Open_Buffer_GoTo` returns an integer with 64 bit precision.
   * It would be cut at 32 bit due to the JavaScript bindings. Here we transport the low and high
   * parts separately and put them together.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @returns Seek position (where MediaInfoLib wants go in the data buffer)
   * @group Low-level
   */
  openBufferContinueGotoGet(): number {
    // JS bindings don't support 64 bit int
    // https://github.com/buzz/mediainfo.js/issues/11
    let seekTo = -1
    const seekToLow: number = this.mediainfoModuleInstance.open_buffer_continue_goto_get_lower()
    const seekToHigh: number = this.mediainfoModuleInstance.open_buffer_continue_goto_get_upper()
    if (seekToLow == -1 && seekToHigh == -1) {
      seekTo = -1
    } else if (seekToLow < 0) {
      seekTo = seekToLow + MAX_UINT32_PLUS_ONE + seekToHigh * MAX_UINT32_PLUS_ONE
    } else {
      seekTo = seekToLow + seekToHigh * MAX_UINT32_PLUS_ONE
    }
    return seekTo
  }

  /**
   * Inform MediaInfoLib that no more data is being read.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @group Low-level
   */
  openBufferFinalize(): void {
    this.mediainfoModuleInstance.open_buffer_finalize()
  }

  /**
   * Prepare MediaInfoLib to process a data buffer.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @param size Expected buffer size
   * @param offset Buffer offset
   * @group Low-level
   */
  openBufferInit(size: number, offset: number): void {
    this.mediainfoModuleInstance.open_buffer_init(size, offset)
  }

  /**
   * Parse result JSON. Convert integer/float fields.
   *
   * @param result Serialized JSON from MediaInfo
   * @returns Parsed JSON object
   */
  private parseResultJson(resultString: string): ResultMap[TFormat] {
    type Writable<T> = { -readonly [P in keyof T]: T[P] }

    const intFields = INT_FIELDS as readonly string[]
    const floatFields = FLOAT_FIELDS as readonly string[]

    // Parse JSON
    const result = JSON.parse(resultString) as MediaInfoResult

    if (result.media) {
      const newMedia = { ...result.media, track: [] as Writable<Track>[] }

      if (Array.isArray(result.media.track)) {
        for (const track of result.media.track) {
          let newTrack: Writable<Track> = { '@type': track['@type'] }
          for (const [key, val] of Object.entries(track) as [string, unknown][]) {
            if (key === '@type') {
              continue
            }
            if (typeof val === 'string' && intFields.includes(key)) {
              newTrack = { ...newTrack, [key]: Number.parseInt(val, 10) }
            } else if (typeof val === 'string' && floatFields.includes(key)) {
              newTrack = { ...newTrack, [key]: Number.parseFloat(val) }
            } else {
              newTrack = { ...newTrack, [key]: val }
            }
          }
          newMedia.track.push(newTrack)
        }
      }

      return { ...result, media: newMedia } as ResultMap[TFormat]
    }

    return result as ResultMap[TFormat]
  }
}

export type { FormatType, ReadChunkFunc, ResultMap, SizeArg }
export { DEFAULT_OPTIONS, FORMAT_CHOICES }
export default MediaInfo
