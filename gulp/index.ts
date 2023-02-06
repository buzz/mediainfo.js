import gulp from 'gulp'

import download from './download'
import mediainfolib from './compile/mediainfolib'
import zenlib from './compile/zenlib'
import zlib from './compile/zlib'
import wasm from './compile/wasm'
import babel from './transpile/babel'
import rollup from './transpile/rollup'
import declaration from './declaration'
import generateTypes from './generate-types/generate'

const task = gulp.series([
  download,
  gulp.series([zlib, zenlib, mediainfolib, wasm]),
  gulp.parallel([babel, declaration, rollup]),
])
task.displayName = 'default'
task.description = 'Build project'

export { babel, declaration, download, generateTypes, mediainfolib, rollup, wasm, zenlib, zlib }
export default task
