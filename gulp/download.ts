import { access, mkdir } from 'fs/promises'
import { basename, join } from 'path'
import url from 'url'

import decompress from 'decompress'
import gulp from 'gulp'

import {
  LIBMEDIAINFO_VERSION,
  LIBZEN_VERSION,
  VENDOR_DIR,
  ZLIB_DIR,
  ZLIB_VERSION,
} from './constants'
import { downloadFile } from './utils'

const urls = {
  libmediainfo: {
    url: `https://mediaarea.net/download/source/libmediainfo/${LIBMEDIAINFO_VERSION}/libmediainfo_${LIBMEDIAINFO_VERSION}.tar.bz2`,
    dir: VENDOR_DIR,
  },
  libzen: {
    url: `https://mediaarea.net/download/source/libzen/${LIBZEN_VERSION}/libzen_${LIBZEN_VERSION}.tar.bz2`,
    dir: VENDOR_DIR,
  },
  zlib: {
    url: `https://zlib.net/zlib-${ZLIB_VERSION}.tar.gz`,
    dir: ZLIB_DIR,
  },
}

const task = gulp.parallel(
  Object.entries(urls).map(([name, { url: dlUrl, dir }]) => {
    const dlTask = async () => {
      await mkdir(dir, { recursive: true })
      const { pathname } = url.parse(dlUrl)
      if (pathname === null) throw new Error('URL pathname is null')
      const filename = basename(pathname)
      const filepath = join(VENDOR_DIR, filename)
      // skip download if file exists
      try {
        await access(filepath)
      } catch {
        await downloadFile(dlUrl, filepath)
      }
      await decompress(filepath, dir)
    }

    dlTask.displayName = `download:${name}`
    dlTask.Description = `Download ${name} sources`

    return dlTask
  })
)

task.displayName = 'download'
task.description = 'Download sources'

export default task
