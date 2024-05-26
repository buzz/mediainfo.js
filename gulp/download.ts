import { access, mkdir } from 'node:fs/promises'
import path from 'node:path'

import decompress from 'decompress'
import gulp from 'gulp'

import { LIBMEDIAINFO_VERSION, LIBZEN_VERSION, VENDOR_DIR } from './constants.ts'
import { downloadFile } from './utils.ts'

const urls = { libmediainfo: LIBMEDIAINFO_VERSION, libzen: LIBZEN_VERSION }

function getUrl(libname: string, version: string) {
  return `https://mediaarea.net/download/source/${libname}/${version}/${libname}_${version}.tar.bz2`
}

const task = gulp.parallel(
  Object.entries(urls).map(([libname, version]) => {
    const dlTask = async () => {
      await mkdir(VENDOR_DIR, { recursive: true })
      const dlUrl = getUrl(libname, version)
      const { pathname } = new URL(dlUrl)
      const filename = path.basename(pathname)
      const filepath = path.join(VENDOR_DIR, filename)

      // skip download if file exists
      try {
        await access(filepath)
      } catch {
        await downloadFile(dlUrl, filepath)
      }

      await decompress(filepath, VENDOR_DIR)
    }

    dlTask.displayName = `download:${libname}-v${version}`
    dlTask.Description = `Download ${libname} v${version} sources`

    return dlTask
  })
)

task.displayName = 'download'
task.description = 'Download sources'

export default task
