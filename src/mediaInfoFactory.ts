import MediaInfo, { DEFAULT_OPTIONS, type FormatType } from './MediaInfo.js'
import mediaInfoModuleFactory, { type MediaInfoModule } from './MediaInfoModule.js'

interface MediaInfoFactoryOptions<TFormat extends FormatType> {
  /** Output cover data as base64 */
  coverData?: boolean

  /** Chunk size used by `analyzeData` (in bytes) */
  chunkSize?: number

  /** Result format (`object`, `JSON`, `XML`, `HTML` or `text`) */
  format?: TFormat

  /** Full information display (all internal tags) */
  full?: boolean

  /**
   * This method will be called before loading the WASM file. It should return the actual URL to
   * `MediaInfoModule.wasm`.
   *
   * @see https://emscripten.org/docs/api_reference/module.html#Module.locateFile
   */
  locateFile?: (path: string, prefix: string) => string
}

const noopPrint = () => {
  // No-op
}

type FactoryCallback<TFormat extends FormatType> = (mediainfo: MediaInfo<TFormat>) => void
type ErrorCallback = (error: unknown) => void

function defaultLocateFile(path: string, prefix: string) {
  try {
    const url = new URL(prefix)
    if (url.pathname === '/') {
      return `${prefix}mediainfo.js/dist/${path}`
    }
  } catch {
    // empty
  }
  return `${prefix}../${path}`
}

// TODO pass through more emscripten module options?

/**
 * Creates a {@link MediaInfo} instance with the specified options.
 *
 * @typeParam TFormat - The format type, defaults to `object`.
 * @param options - Configuration options for creating the {@link MediaInfo} instance.
 * @returns A promise that resolves to a {@link MediaInfo} instance when no callback is provided.
 */
function mediaInfoFactory<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format>(
  options?: MediaInfoFactoryOptions<TFormat>
): Promise<MediaInfo<TFormat>>

/**
 * Creates a {@link MediaInfo} instance with the specified options and executes the callback.
 *
 * @typeParam TFormat - The format type, defaults to `object`.
 * @param options - Configuration options for creating the {@link MediaInfo} instance.
 * @param callback - Function to call with the {@link MediaInfo} instance.
 * @param errCallback - Optional function to call on error.
 */
function mediaInfoFactory<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format>(
  options: MediaInfoFactoryOptions<TFormat>,
  callback: FactoryCallback<TFormat>,
  errCallback?: ErrorCallback
): void

function mediaInfoFactory<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format>(
  options: MediaInfoFactoryOptions<TFormat> = {},
  callback?: FactoryCallback<TFormat>,
  errCallback?: ErrorCallback
): Promise<MediaInfo<TFormat>> | undefined {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      mediaInfoFactory(options, resolve, reject)
    })
  }

  const { locateFile, ...mergedOptions } = {
    ...DEFAULT_OPTIONS,
    ...options,
    format: (options.format ?? DEFAULT_OPTIONS.format) as TFormat,
  }

  const mediaInfoModuleFactoryOpts: Partial<MediaInfoModule> = {
    // Silence all print in module
    print: noopPrint,
    printErr: noopPrint,

    locateFile: locateFile ?? defaultLocateFile,
    onAbort: (err: Error) => {
      if (errCallback) {
        errCallback(err)
      }
    },
  }

  // Fetch and load WASM module
  mediaInfoModuleFactory(mediaInfoModuleFactoryOpts)
    .then((wasmModule) => {
      callback(new MediaInfo<TFormat>(wasmModule, mergedOptions))
    })
    .catch((error: unknown) => {
      if (errCallback) {
        errCallback(error)
      }
    })
}

export type { MediaInfoFactoryOptions }
export default mediaInfoFactory
