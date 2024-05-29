import fs from 'node:fs/promises'
import path from 'node:path'

import type { PluginModule } from '@docusaurus/types'

import mediainfoJsPackageJson from '../../mediainfo.js/package.json' assert { type: 'json' }

const CONSTANTS_PATH = path.resolve(__dirname, '..', '..', 'mediainfo.js', 'gulp', 'constants.ts')

async function extractVersionFromSources() {
  const fileBuffer = await fs.readFile(CONSTANTS_PATH)

  const match = /LIBMEDIAINFO_VERSION\s*=\s*'([\d.]+)'/.exec(fileBuffer.toString())
  if (!match) {
    throw new Error('Failed to extract libmediainfo version')
  }

  return match[1]
}

const extractVersions: PluginModule = () => ({
  name: 'extract-versions',
  async contentLoaded({ actions }) {
    actions.setGlobalData({
      MediaInfoLib: await extractVersionFromSources(),
      mediainfoJs: mediainfoJsPackageJson.version,
    })
  },
})

export default extractVersions
