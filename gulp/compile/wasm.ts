// https://github.com/emscripten-core/emscripten/blob/main/src/settings.js

import path from 'node:path'

import gulp from 'gulp'

import { BUILD_DIR, CXXFLAGS, MediaInfoLib_CXXFLAGS, WASM_INITIAL_MEMORY } from '../constants.ts'
import { format, spawn } from '../utils.ts'
import optimizeWasm from './optimizeWasm.ts'

const moduleFilepath = path.join(BUILD_DIR, 'MediaInfoModule.js')

const EXPORTED_FUNCTIONS = [
  '_mi_new',
  '_mi_delete',
  '_mi_open_buffer_init',
  '_mi_open_buffer_continue',
  '_mi_open_buffer_finalize',
  '_mi_open_buffer_continue_goto_get',
  '_mi_inform',
  '_mi_close',
  '_malloc',
  '_free',
] as const

const EXPORTED_RUNTIME_METHODS = [
  'HEAPU8',
  'lengthBytesUTF8',
  'stringToUTF8',
  'UTF8ToString',
] as const

function makeArgs(environment: 'web' | 'node', es6: boolean) {
  return [
    ...CXXFLAGS.split(' '),
    ...MediaInfoLib_CXXFLAGS.split(' '),
    `-sINITIAL_HEAP=${WASM_INITIAL_MEMORY}`,
    '-sALLOW_MEMORY_GROWTH=1',
    '-sMALLOC=emmalloc',
    '-sASSERTIONS=0',
    `-sENVIRONMENT=${environment}`,
    `-sEXPORT_ES6=${es6 ? '1' : '0'}`,
    '-sLEGACY_VM_SUPPORT=0',
    '-sMODULARIZE=1',
    '-sFILESYSTEM=0',
    '-sWASM_BIGINT=1',
    '-sINCOMING_MODULE_JS_API=locateFile,print,printErr,onAbort',
    '-sDYNAMIC_EXECUTION=0',
    '-sEXIT_RUNTIME=0',
    `-sEXPORTED_FUNCTIONS=${EXPORTED_FUNCTIONS.join(',')}`,
    `-sEXPORTED_RUNTIME_METHODS=${EXPORTED_RUNTIME_METHODS.join(',')}`,
    'MediaInfoModule.o',
    'vendor/MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a',
    'vendor/ZenLib/Project/GNU/Library/.libs/libzen.a',
    '-o',
    moduleFilepath,
  ]
}

// MediaInfoModule.cpp -> MediaInfoModule.o
function compileMediaInfoModule() {
  return spawn(
    'emcc',
    [
      ...CXXFLAGS.split(' '),
      ...MediaInfoLib_CXXFLAGS.split(' '),
      '-std=c++17',
      '-I',
      'vendor/MediaInfoLib/Source',
      '-I',
      'vendor/ZenLib/Source',
      '-c',
      '../src/MediaInfoModule.cpp',
    ],
    BUILD_DIR
  )
}

compileMediaInfoModule.displayName = 'compile:mediainfomodule'
compileMediaInfoModule.description = 'Compile MediaInfoModule'

// MediaInfoModule.js (Node CJS)
async function buildNodeCjs() {
  await spawn('emcc', makeArgs('node', false), BUILD_DIR)
  await format(moduleFilepath, path.join(BUILD_DIR, 'MediaInfoModule.cjs.js'))
}

buildNodeCjs.displayName = 'compile:node-cjs'
buildNodeCjs.description = 'Build WASM (Node CJS)'

// MediaInfoModule.js (Node ESM)
async function buildNodeEsm() {
  await spawn('emcc', makeArgs('node', true), BUILD_DIR)
  await format(moduleFilepath, path.join(BUILD_DIR, 'MediaInfoModule.esm.js'))
}

buildNodeEsm.displayName = 'compile:node-esm'
buildNodeEsm.description = 'Build WASM (Node ESM)'

// MediaInfoModule.js (Browser)
async function buildBrowser() {
  await spawn('emcc', makeArgs('web', true), BUILD_DIR)
  await format(moduleFilepath, path.join(BUILD_DIR, 'MediaInfoModule.browser.js'))
}

buildBrowser.displayName = 'compile:browser'
buildBrowser.description = 'Build WASM (Browser)'

const wasmTask = gulp.series([
  compileMediaInfoModule,
  buildNodeCjs,
  buildNodeEsm,
  buildBrowser,
  optimizeWasm,
])

wasmTask.displayName = 'compile:wasm'
wasmTask.description = 'Build WASM and loader code'

export default wasmTask
