import { unknownToError } from './error.js'
import { FLOAT_FIELDS, INT_FIELDS } from './MediaInfoResult.js'
import type { MediaInfoFactoryOptions } from './mediaInfoFactory.js'
import type { MediaInfoModule } from './MediaInfoModule.js'
import type { MediaInfoResult, Track } from './MediaInfoResult.js'

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
  private ptr: number
  private isAnalyzing = false

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
    this.ptr = this.instantiateModuleInstance()
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
          this.isAnalyzing = false
          if (error || !result) {
            reject(unknownToError(error))
          } else {
            resolve(result)
          }
        }
        this.analyzeData(size, readChunk, resultCb)
      })
    }

    if (this.isAnalyzing) {
      callback(null, new Error('cannot start a new analysis while another is in progress'))
      return
    }
    this.reset()
    this.isAnalyzing = true

    const finalize = () => {
      try {
        this.openBufferFinalize()
        const result = this.inform()
        if (this.options.format === 'object') {
          callback(this.parseResultJson(result))
        } else {
          callback(result)
        }
      } finally {
        this.isAnalyzing = false
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
          this.isAnalyzing = false
          callback(null, unknownToError(error))
          return
        }

        if (dataValue instanceof Promise) {
          dataValue.then(readNextChunk).catch((error: unknown) => {
            this.isAnalyzing = false
            callback(null, unknownToError(error))
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

    const fileSizeValue = typeof size === 'function' ? size() : size

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
    if (this.ptr) {
      this.mediainfoModule._mi_close(this.ptr)
    }
  }

  /**
   * Reset the MediaInfoLib WASM instance to its initial state.
   *
   * This method ensures that the instance is ready for a new parse.
   * @group General Use
   */
  reset(): void {
    if (this.ptr) {
      this.mediainfoModule._mi_delete(this.ptr)
    }
    this.ptr = this.instantiateModuleInstance()
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
    const resPtr = this.mediainfoModule._mi_inform(this.ptr)
    return this.mediainfoModule.UTF8ToString(resPtr)
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
    // Copy data to Wasm heap
    const dataPtr = this.mediainfoModule._malloc(size)
    this.mediainfoModule.HEAPU8.set(data, dataPtr)

    const result = this.mediainfoModule._mi_open_buffer_continue(this.ptr, dataPtr, size)

    this.mediainfoModule._free(dataPtr)
    // Bit 3 set (0x08) means processing is complete
    return !!(result & 0x08)
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
    // BigInt return value converted to standard JS number
    const seekTo = this.mediainfoModule._mi_open_buffer_continue_goto_get(this.ptr)
    return Number(seekTo)
  }

  /**
   * Inform MediaInfoLib that no more data is being read.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @group Low-level
   */
  openBufferFinalize(): void {
    this.mediainfoModule._mi_open_buffer_finalize(this.ptr)
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
    // Use BigInt for 64-bit compatibility
    this.mediainfoModule._mi_open_buffer_init(this.ptr, BigInt(size), BigInt(offset))
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

  /**
   * Instantiate a new WASM module instance.
   *
   * @returns MediaInfo module instance
   */
  private instantiateModuleInstance(): number {
    const format = this.options.format === 'object' ? 'JSON' : this.options.format

    const bytesNeeded = this.mediainfoModule.lengthBytesUTF8(format) + 1
    const formatPtr = this.mediainfoModule._malloc(bytesNeeded)

    try {
      this.mediainfoModule.stringToUTF8(format, formatPtr, bytesNeeded)

      return this.mediainfoModule._mi_new(
        formatPtr,
        this.options.coverData ? 1 : 0,
        this.options.full ? 1 : 0
      )
    } finally {
      this.mediainfoModule._free(formatPtr)
    }
  }
}

export type { FormatType, ReadChunkFunc, ResultMap, SizeArg }
export { DEFAULT_OPTIONS, FORMAT_CHOICES }
export default MediaInfo
