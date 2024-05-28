import fs from 'node:fs/promises'
import path from 'node:path'

import type { PluginModule } from '@docusaurus/types'

const projectDir = path.resolve(__dirname, '..')

const mediainfoWasmCopy: PluginModule = (context, options) => ({
  name: 'mediainfo-wasm-copy',
  async loadContent() {
    await fs.copyFile(
      path.join(projectDir, 'node_modules', 'mediainfo.js', 'dist', 'MediaInfoModule.wasm'),
      path.join(projectDir, 'static', 'MediaInfoModule.wasm')
    )
  },
})

export default mediainfoWasmCopy
