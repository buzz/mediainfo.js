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

const webpackResolveWasm: PluginModule = () => ({
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

export default webpackResolveWasm
