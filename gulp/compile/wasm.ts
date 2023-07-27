// https://github.com/emscripten-core/emscripten/blob/main/src/settings.js

import { copyFile, mkdir } from 'fs/promises'
import { join } from 'path'

import gulp from 'gulp'

import { BUILD_DIR, CXXFLAGS, DIST_DIR, MediaInfoLib_CXXFLAGS } from '../constants'
import { format, spawn } from '../utils'

const moduleFilepath = join(BUILD_DIR, 'MediaInfoModule.js')

function makeArgs(environment: 'web' | 'node', es6: boolean, es6ImportMeta: boolean) {
  return [
    ...CXXFLAGS.split(' '),
    ...MediaInfoLib_CXXFLAGS.split(' '),
    '-s',
    'ALLOW_MEMORY_GROWTH=1',
    '-s',
    'ASSERTIONS=0',
    '-s',
    `ENVIRONMENT=${environment}`,
    '-s',
    `EXPORT_ES6=${es6 ? '1' : '0'}`,
    '-s',
    'LEGACY_VM_SUPPORT=0',
    '-s',
    'MODULARIZE=1',
    '-s',
    'NO_FILESYSTEM=1',
    '-s',
    `USE_ES6_IMPORT_META=${es6ImportMeta ? '1' : '0'}`,
    '-lembind',
    'MediaInfoModule.o',
    'vendor/MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a',
    'vendor/ZenLib/Project/GNU/Library/.libs/libzen.a',
    'vendor/Shared/Source/zlib/libz.a',
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
      '-std=c++11',
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
  await spawn('emcc', makeArgs('node', false, false), BUILD_DIR)
  await format(moduleFilepath, join(BUILD_DIR, 'MediaInfoModule.cjs.js'))
}

buildNodeCjs.displayName = 'compile:node-cjs'
buildNodeCjs.description = 'Build WASM (Node CJS)'

// MediaInfoModule.js (Node ESM)
async function buildNodeEsm() {
  await spawn('emcc', makeArgs('node', true, true), BUILD_DIR)
  await format(moduleFilepath, join(BUILD_DIR, 'MediaInfoModule.esm.js'))
}

buildNodeEsm.displayName = 'compile:node-esm'
buildNodeEsm.description = 'Build WASM (Node ESM)'

// MediaInfoModule.js (Browser)
async function buildBrowser() {
  await spawn('emcc', makeArgs('web', true, false), BUILD_DIR)
  await format(moduleFilepath, join(BUILD_DIR, 'MediaInfoModule.browser.js'))
}

buildBrowser.displayName = 'compile:browser'
buildBrowser.description = 'Build WASM (Browser)'

async function copyWasm() {
  try {
    await mkdir(DIST_DIR)
  } catch {}
  await copyFile(join(BUILD_DIR, 'MediaInfoModule.wasm'), join(DIST_DIR, 'MediaInfoModule.wasm'))
}

copyWasm.displayName = 'compile:copy-wasm'
copyWasm.description = 'Copy WASM'

const wasmTask = gulp.series([
  compileMediaInfoModule,
  buildNodeCjs,
  buildNodeEsm,
  buildBrowser,
  copyWasm,
])

wasmTask.displayName = 'compile:wasm'
wasmTask.description = 'Build WASM and loader code'

export default wasmTask
