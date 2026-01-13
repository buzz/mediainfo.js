interface MediaInfoModule extends EmscriptenModule {
  // C-style exports
  _mi_new(formatPtr: number, coverData: number, full: number): number
  _mi_delete(ptr: number): void
  _mi_open_buffer_init(ptr: number, size: bigint, offset: bigint): number
  _mi_open_buffer_continue(ptr: number, dataPtr: number, size: number): number
  _mi_open_buffer_continue_goto_get(ptr: number): bigint
  _mi_open_buffer_finalize(ptr: number): number
  _mi_inform(ptr: number): number
  _mi_close(ptr: number): void

  // Emscripten Standard Library
  _malloc(size: number): number
  _free(ptr: number): void
  lengthBytesUTF8(str: string): number
  stringToUTF8(str: string, outPtr: number, maxBytesToWrite: number): void
  UTF8ToString(ptr: number): string
}

declare const mediaInfoModuleFactory: EmscriptenModuleFactory<MediaInfoModule>

export type { MediaInfoModule }
export default mediaInfoModuleFactory
