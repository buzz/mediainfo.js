import fs from 'node:fs/promises'
import path from 'node:path'

import type { PluginModule } from '@docusaurus/types'

const wasmFilePath = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'mediainfo.js',
  'dist',
  'MediaInfoModule.wasm'
)

const copyWasm: PluginModule = () => ({
  name: 'override-webpack-config',
  configureWebpack() {
    return {
      resolve: {
        alias: {
          'MediaInfoModule.wasm': wasmFilePath,
        },
      },
    }
  },
})

export default copyWasm
