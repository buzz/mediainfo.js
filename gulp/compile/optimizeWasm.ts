import fs from 'node:fs/promises'
import path from 'node:path'

import { BUILD_DIR, DIST_DIR, WASM_FILE } from '../constants'
import { spawn } from '../utils'

const DCE_CONFIG_FILE = path.join(BUILD_DIR, 'dceConfig.json')
const DCE_WASM_PATH = path.join(BUILD_DIR, 'dce.wasm')

async function extractExports() {
  const objdump = await spawn('wasm-objdump', ['-x', 'MediaInfoModule.wasm'], BUILD_DIR, true)
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

async function optimizeWasm() {
  const exports = await extractExports()
  await createDceConfig(exports)
  await spawn(
    'wasm-metadce',
    ['-all', '-f', DCE_CONFIG_FILE, '-o', DCE_WASM_PATH, WASM_FILE],
    BUILD_DIR
  )
  await fs.mkdir(DIST_DIR, { recursive: true })
  await spawn(
    'wasm-opt',
    ['-c', '-Oz', '-o', path.join(DIST_DIR, WASM_FILE), DCE_WASM_PATH],
    BUILD_DIR
  )
}

optimizeWasm.displayName = 'compile:optimize-wasm'
optimizeWasm.description = 'Optimize WASM'

export default optimizeWasm
