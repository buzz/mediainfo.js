const formatChoices = ['JSON', 'XML', 'HTML', 'text'] as const

type WasmConstructableFormatType = (typeof formatChoices)[number]

interface MediaInfoWasmInterface {
  close(): void
  inform(): string
  open_buffer_continue(data: Uint8Array, size: number): number
  open_buffer_continue_goto_get_lower(): number
  open_buffer_continue_goto_get_upper(): number
  open_buffer_finalize(): number
  open_buffer_init(estimatedFileSize: number, fileOffset: number): number
}

interface MediaInfoWasmConstructable {
  new (
    format: WasmConstructableFormatType,
    coverData: boolean,
    full: boolean
  ): MediaInfoWasmInterface
}

interface MediaInfoModule extends EmscriptenModule {
  MediaInfo: MediaInfoWasmConstructable
}

declare const mediaInfoModuleFactory: EmscriptenModuleFactory<MediaInfoModule>

export { formatChoices }
export type {
  MediaInfoModule,
  MediaInfoWasmConstructable,
  MediaInfoWasmInterface,
  WasmConstructableFormatType,
}
export default mediaInfoModuleFactory
