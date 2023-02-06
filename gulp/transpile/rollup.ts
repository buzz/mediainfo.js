import { basename, dirname, join } from 'path'

import rollupStream from '@rollup/stream'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import type { RollupOptions } from 'rollup'
import { loadConfigFile } from 'rollup/loadConfigFile'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'

import { PROJECT_DIR } from '../constants'

function bundle(options: RollupOptions) {
  return new Promise<void>((resolve, reject) => {
    if (options.output === undefined || Array.isArray(options.output))
      throw new Error('Invalid output options')

    const { file } = options.output
    if (file === undefined) throw new Error('output.file undefined')

    rollupStream(options)
      .pipe(source(basename(file))) // output name
      .pipe(buffer()) // gulp-sourcemaps doesn't support streams
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.mapSources((sourcePath) => sourcePath.replace('../../src/', '')))
      .pipe(sourcemaps.write('.', { sourceRoot: '../../src' })) // relative to output
      .pipe(gulp.dest(dirname(file)))
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
  })
}

function rollupTask() {
  return loadConfigFile(join(PROJECT_DIR, 'rollup.config.js')).then(
    ({ options: optionsArray, warnings }) => {
      const options = optionsArray[0]
      if (warnings.count) warnings.flush()

      // @rollup/stream supports one output per run
      return Promise.all(options.output.map((output) => bundle({ ...options, output })))
    }
  )
}

rollupTask.displayName = 'transpile:rollup'
rollupTask.description = 'Transpile Browser bundles'

export default rollupTask
