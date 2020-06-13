/// <reference types="emscripten" />

import { MediaInfoWasmConstructable } from './types'

export interface MediaInfoModule extends EmscriptenModule {
  MediaInfo: MediaInfoWasmConstructable
}

declare const mediaInfoModuleFactory: EmscriptenModuleFactory<MediaInfoModule>

export default mediaInfoModuleFactory
