import gulp from 'gulp'

import mediainfolib from './compile/mediainfolib.ts'
import wasm from './compile/wasm.ts'
import zenlib from './compile/zenlib.ts'
import declaration from './declaration.ts'
import download from './download.ts'
import generateTypes from './generate-types/generate.ts'
import babel from './transpile/babel.ts'
import rollup from './transpile/rollup.ts'

const defaultTask = gulp.series([
  gulp.parallel([
    generateTypes,
    gulp.series([download, gulp.series([zenlib, mediainfolib, wasm])]),
  ]),
  gulp.parallel([babel, declaration, rollup]),
])
defaultTask.displayName = 'default'
defaultTask.description = 'Build project'

export default defaultTask
