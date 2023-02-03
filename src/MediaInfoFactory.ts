import MediaInfoModuleFactory from '../build/MediaInfoModule'

import MediaInfo, { DEFAULT_OPTIONS, type FormatType } from './MediaInfo'

import { MediaInfoModule } from './MediaInfoModule'

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
  locateFile?(url: string, scriptDirectory: string): string
}

const noopPrint = () => {
  // No-op
}

/**
 * Factory function for {@link MediaInfo}.
 *
 * @param options User options
 * @returns MediaInfo object
 */
function MediaInfoFactory<TFormat extends FormatType>(
  options?: MediaInfoFactoryOptions<TFormat>
): Promise<MediaInfo<TFormat>>

/**
 * Factory function for {@link MediaInfoFactory}.
 *
 * @param options User options
 * @param callback Function that is called once the module is created
 */
function MediaInfoFactory<TFormat extends FormatType>(
  options: MediaInfoFactoryOptions<TFormat>,
  callback: (mediainfo: MediaInfo<TFormat>) => void
): void

/**
 * Factory function for {@link MediaInfoFactory}.
 *
 * @param options User options
 * @param callback Function that is called once the module is created
 * @param callback Error callback
 */
function MediaInfoFactory<TFormat extends FormatType>(
  options: MediaInfoFactoryOptions<TFormat>,
  callback: (mediainfo: MediaInfo<TFormat>) => void,
  errCallback: (error: Error) => void
): void

function MediaInfoFactory<TFormat extends FormatType>(
  options: MediaInfoFactoryOptions<TFormat> = {},
  callback?: (mediainfo: MediaInfo<TFormat>) => void,
  errCallback?: (error: Error) => void
): Promise<MediaInfo<TFormat>> | void {
  if (callback === undefined) {
    return new Promise((resolve, reject) => MediaInfoFactory(options, resolve, reject))
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

    onAbort: (err: Error) => {
      if (errCallback) {
        errCallback(err)
      }
    },
  }
  if (locateFile) mediaInfoModuleFactoryOpts.locateFile = locateFile

  // Wait for WASM module to be fetched and loaded
  MediaInfoModuleFactory(mediaInfoModuleFactoryOpts)
    .then((wasmModule) => callback(new MediaInfo<TFormat>(wasmModule, mergedOptions)))
    .catch((err) => {
      if (errCallback) {
        errCallback(err)
      }
    })
}

export type { MediaInfoFactoryOptions }
export default MediaInfoFactory
