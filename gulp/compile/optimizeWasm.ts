import fs from 'node:fs/promises'
import path from 'node:path'

import { BUILD_DIR, DIST_DIR, WASM_FILE } from '../constants'
import { spawn } from '../utils'

const DCE_CONFIG_FILE = path.join(BUILD_DIR, 'dceConfig.json')
const DCE_WASM_PATH = path.join(BUILD_DIR, 'dce.wasm')
const DCE_STRIPPED_WASM_PATH = path.join(BUILD_DIR, 'dce.stripped.wasm')

async function extractExports() {
  const objdump = await spawn(
    'wasm-objdump',
    ['--details', 'MediaInfoModule.wasm'],
    BUILD_DIR,
    true
  )
  const lines = objdump.split('\n')

  const reExport = /^ - \w+\[\d+] .+"(.+)"/

  const exports: string[] = []

  let foundExports = false
  while (true) {
    const line = lines.shift()
    if (line === undefined) {
      throw new Error('Failed to parse wasm-objdump output')
    }

    if (foundExports) {
      const match = reExport.exec(line)
      if (!match) {
        break
      }
      exports.push(match[1])
    } else if (line.startsWith('Export[')) {
      foundExports = true
    }
  }

  return exports
}

interface ConfigItem {
  name: string
  root?: true
  reaches?: string[]
  export?: string
}

async function createDceConfig(exports: string[]) {
  const config: ConfigItem[] = [
    {
      name: 'outside',
      root: true,
      reaches: exports.map((name) => `export-${name}`),
    },
  ]
  for (const name of exports) {
    config.push({
      name: `export-${name}`,
      export: name,
    })
  }

  await fs.writeFile(DCE_CONFIG_FILE, JSON.stringify(config))
}

async function getWasmOptFeatureFlags() {
  const output = await spawn(
    'wasm-opt',
    [
      '--print-features',
      '--enable-bulk-memory-opt',
      '--enable-nontrapping-float-to-int',
      WASM_FILE,
    ],
    BUILD_DIR,
    true
  )
  return [
    ...new Set(
      output
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('--enable-'))
    ),
  ]
}

async function optimizeWasm() {
  const exports = await extractExports()

  await createDceConfig(exports)

  const wasmOptFeatureFlags = await getWasmOptFeatureFlags()

  await spawn(
    'wasm-metadce',
    ['-all', '-f', DCE_CONFIG_FILE, '-o', DCE_WASM_PATH, WASM_FILE],
    BUILD_DIR
  )

  // Strip `target_features` section
  await spawn(
    'wasm-opt',
    [
      '--strip-target-features',
      '--enable-bulk-memory-opt',
      '--enable-nontrapping-float-to-int',
      '-o',
      DCE_STRIPPED_WASM_PATH,
      DCE_WASM_PATH,
    ],
    BUILD_DIR
  )

  await fs.mkdir(DIST_DIR, { recursive: true })
  await spawn(
    'wasm-opt',
    [
      // Run with explicit safe feature set
      '--mvp-features',
      '--enable-bulk-memory-opt',
      '--enable-nontrapping-float-to-int',
      ...wasmOptFeatureFlags,
      '--emit-target-features',
      '-c',
      '-Oz',
      '-o',
      path.join(DIST_DIR, WASM_FILE),
      DCE_STRIPPED_WASM_PATH,
    ],
    BUILD_DIR
  )
}

optimizeWasm.displayName = 'compile:optimize-wasm'
optimizeWasm.description = 'Optimize WASM'

export default optimizeWasm
