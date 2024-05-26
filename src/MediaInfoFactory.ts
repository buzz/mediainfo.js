import MediaInfo, { DEFAULT_OPTIONS, type FormatType } from './MediaInfo.js'
import mediaInfoModuleFactory, { type MediaInfoModule } from './MediaInfoModule.js'

interface MediaInfoFactoryOptions<TFormat extends FormatType> {
  /** Output cover data as base64 */
  coverData?: boolean

  /** Chunk size used by `analyzeData` (in bytes) */
  chunkSize?: number

  /** Result format */
  format?: TFormat

  /** Full information display (all internal tags) */
  full?: boolean

  /** Customize loading path for files */
  locateFile?: EmscriptenModule['locateFile']
}

const noopPrint = () => {
  // No-op
}

type FactoryCallback<TFormat extends FormatType> = (mediainfo: MediaInfo<TFormat>) => void
type ErrorCallback = (error: unknown) => void

/**
 * This method will be called to look up the path for the `MediaInfoModule.wasm`
 * file. It handles the special case of loading from a CDN that serves
 * mediainfo.js from the root (e.g. `https://unpkg.com/mediainfo.js`).
 *
 * @see https://emscripten.org/docs/api_reference/module.html#Module.locateFile
 *
 * @param path File name
 * @param prefix Filepath prefix
 * @returns Full path to file
 */
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

/**
 * Factory function for {@link MediaInfo}.
 *
 * @param options User options
 * @returns MediaInfo object
 */
function MediaInfoFactory<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format>(
  options?: MediaInfoFactoryOptions<TFormat>
): Promise<MediaInfo<TFormat>>

/**
 * Factory function for {@link MediaInfoFactory}.
 *
 * @param options User options
 * @param callback Function that is called once the module is created
 * @param callback Error callback
 */
function MediaInfoFactory<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format>(
  options: MediaInfoFactoryOptions<TFormat>,
  callback: FactoryCallback<TFormat>,
  errCallback?: ErrorCallback
): void

// TODO pass through all emscripten module options
function MediaInfoFactory<TFormat extends FormatType = typeof DEFAULT_OPTIONS.format>(
  options: MediaInfoFactoryOptions<TFormat> = {},
  callback?: FactoryCallback<TFormat>,
  errCallback?: ErrorCallback
): Promise<MediaInfo<TFormat>> | undefined {
  if (callback === undefined) {
    return new Promise((resolve, reject) => {
      MediaInfoFactory(options, resolve, reject)
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
export default MediaInfoFactory
