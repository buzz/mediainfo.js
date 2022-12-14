export type FormatType = 'object' | 'JSON' | 'XML' | 'HTML' | 'text'

export interface MediaInfoWasmInterface {
  close(): void
  inform(): string
  open_buffer_continue(data: Uint8Array, size: number): number
  open_buffer_continue_goto_get_lower(): number
  open_buffer_continue_goto_get_upper(): number
  open_buffer_finalize(): number
  open_buffer_init(estimatedFileSize: number, fileOffset: number): number
}

export interface MediaInfoWasmConstructable {
  /**
   * Create MediaInfoWasm instance.
   *
   * @param format Output format.
   * @param coverData Include cover data in the output.
   * @param full Full information display (all internal tags).
   */
  new (format: FormatType, coverData: boolean, full: boolean): MediaInfoWasmInterface
}

export interface MediaInfoOptions {
  coverData?: boolean
  chunkSize?: number
  format?: FormatType
  full?: boolean
  locateFile?(url: string, scriptDirectory: string): string
}

export interface MediaInfo {
  readonly options: MediaInfoOptions

  /**
   * Convenience method for analyzing a buffer chunk by chunk.
   *
   * @param getSize Return total buffer size in bytes.
   * @param readChunk Read chunk of data and return an {@link Uint8Array}.
   */
  analyzeData(getSize: GetSizeFunc, readChunk: ReadChunkFunc): Promise<Result>

  /**
   * Convenience method for analyzing a buffer chunk by chunk (sync version).
   *
   * @param getSize Return total buffer size in bytes.
   * @param readChunk Read chunk of data and return an {@link Uint8Array}.
   * @param callback Function that is called once the processing is done
   */
  analyzeData(
    getSize: GetSizeFunc,
    readChunk: ReadChunkFunc,
    callback: (result: Result, err?: Error) => void
  ): void

  /**
   * Close the MediaInfoLib WASM instance.
   *
   * (This is a low-level MediaInfoLib function.)
   */
  close(): void

  /**
   * Receive result data from the WASM instance.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @returns Result data (format can be configured in options)
   */
  inform(): string

  /**
   * Send more data to the WASM instance.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @param data Data buffer
   * @param size Buffer size
   * @returns Processing state: `0` (no bits set) = not finished, Bit `0` set = enough data read for providing information
   */
  openBufferContinue(data: Uint8Array, size: number): boolean

  /**
   * Retrieve seek position from WASM instance.
   * The MediaInfoLib function `Open_Buffer_GoTo` returns an integer with 64 bit precision.
   * It would be cut at 32 bit due to the JavaScript bindings. Here we transport the low and high
   * parts separately and put them together.
   *
   * (This is a low-level MediaInfoLib function.)
   *
   * @returns Seek position (where MediaInfoLib wants go in the data buffer)
   */
  openBufferContinueGotoGet(): number

  /**
   * Inform MediaInfoLib that no more data is being read.
   */
  openBufferFinalize(): void

  /**
   * Prepare MediaInfoLib to process a data buffer.
   *
   * @param size Expected buffer size
   * @param offset Buffer offset
   */
  openBufferInit(size: number, offset: number): void
}

export type Track = {
  '@type': 'General' | 'Video' | 'Audio' | 'Text' | 'Image' | 'Chapters' | 'Menu'
  // Endless more properties:
  // https://github.com/MediaArea/MediaInfoLib/tree/master/Source/Resource/Text/Stream
} & Record<string, unknown>

export interface ResultObject {
  '@ref': string
  media: {
    track: Track[]
  }
}

export type Result = ResultObject | string

export interface GetSizeFunc {
  (): Promise<number> | number
}

export interface ReadChunkFunc {
  (size: number, offset: number): Promise<Uint8Array> | Uint8Array
}
