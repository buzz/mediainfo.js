import { copyFile } from 'fs/promises'
import { join } from 'path'

import gulp from 'gulp'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

import { BUILD_DIR, DIST_DIR, SRC_DIR } from '../constants'

type Variant = 'cjs' | 'esm'

function changeExtname(val: string) {
  return val.replace(/\.js$/, '.cjs')
}

function transpileBabel(variant: Variant) {
  const task = () =>
    gulp
      .src([join(SRC_DIR, '**', '*.ts'), '!' + join(SRC_DIR, '**', '*.d.ts')])
      .pipe(sourcemaps.init())
      .pipe(babel({ envName: variant.toUpperCase() }))
      .pipe(
        rename((path) => {
          if (variant === 'esm') return path
          if (path.extname === '.js') return { ...path, extname: '.cjs' }
          return { ...path, basename: changeExtname(path.basename) } // .map
        })
      )
      .pipe(
        // gulp-sourcemaps patched to support .cjs extension
        sourcemaps.write('.', {
          sourceMappingURL:
            variant !== 'cjs' ? (file) => `${changeExtname(file.relative)}.map` : undefined,
          mapFile: variant === 'cjs' ? changeExtname : undefined,
          sourceRoot: '../../src',
        })
      )
      .pipe(gulp.dest(join(DIST_DIR, variant)))
  task.displayName = `transpile:babel:${variant}`
  return task
}

function copyModuleLoader(variant: Variant) {
  const task = () =>
    copyFile(
      join(BUILD_DIR, `MediaInfoModule.${variant}.js`),
      join(DIST_DIR, variant, `MediaInfoModule${variant === 'cjs' ? '.cjs' : '.js'}`)
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
