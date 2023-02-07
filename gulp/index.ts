import gulp from 'gulp'

import mediainfolib from './compile/mediainfolib'
import wasm from './compile/wasm'
import zenlib from './compile/zenlib'
import zlib from './compile/zlib'
import declaration from './declaration'
import download from './download'
import generateTypes from './generate-types/generate'
import babel from './transpile/babel'
import rollup from './transpile/rollup'

const task = gulp.series([
  download,
  gulp.series([zlib, zenlib, mediainfolib, wasm]),
  gulp.parallel([babel, declaration, rollup]),
])
task.displayName = 'default'
task.description = 'Build project'

export { babel, declaration, download, generateTypes, mediainfolib, rollup, wasm, zenlib, zlib }
export default task
