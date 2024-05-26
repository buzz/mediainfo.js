import { copyFile } from 'node:fs/promises'
import path from 'node:path'

import gulp from 'gulp'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

import { BUILD_DIR, DIST_DIR, SRC_DIR } from '../constants.ts'

type Variant = 'cjs' | 'esm'

function changeExtname(val: string) {
  return val.replace(/\.js$/, '.cjs')
}

function transpileBabel(variant: Variant) {
  const task = () =>
    gulp
      .src([path.join(SRC_DIR, '**', '*.ts'), '!' + path.join(SRC_DIR, '**', '*.d.ts')])
      .pipe(sourcemaps.init())
      .pipe(babel({ envName: variant.toUpperCase() }))
      .pipe(
        rename((path) => {
          if (variant === 'esm') {
            return path
          }
          if (path.extname === '.js') {
            return { ...path, extname: '.cjs' }
          }
          return { ...path, basename: changeExtname(path.basename) } // .map
        })
      )
      .pipe(
        // gulp-sourcemaps patched to support .cjs extension
        sourcemaps.write('.', {
          sourceMappingURL:
            variant === 'cjs' ? undefined : (file) => `${changeExtname(file.relative)}.map`,
          mapFile: variant === 'cjs' ? changeExtname : undefined,
          sourceRoot: '../../src',
        })
      )
      .pipe(gulp.dest(path.join(DIST_DIR, variant)))
  task.displayName = `transpile:babel:${variant}`
  return task
}

function copyModuleLoader(variant: Variant) {
  const task = () =>
    copyFile(
      path.join(BUILD_DIR, `MediaInfoModule.${variant}.js`),
      path.join(DIST_DIR, variant, `MediaInfoModule${variant === 'cjs' ? '.cjs' : '.js'}`)
    )
  task.displayName = `transpile:babel:copy-loader:${variant}`
  return task
}

const esmTask = gulp.series([transpileBabel('esm'), copyModuleLoader('esm')])
const cjsTask = gulp.series([transpileBabel('cjs'), copyModuleLoader('cjs')])

const babelTask = gulp.parallel([esmTask, cjsTask])
babelTask.displayName = 'transpile:babel'
babelTask.description = 'Transpile Node.js'

export default babelTask
