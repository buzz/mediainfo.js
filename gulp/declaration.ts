import { join } from 'path'

import gulp from 'gulp'

import { DIST_DIR, PROJECT_DIR, SRC_DIR } from './constants'
import { spawn } from './utils'

function generateDeclaration() {
  return spawn(
    'tsc',
    [
      '--emitDeclarationOnly',
      '--declarationDir',
      DIST_DIR,
      '--declaration',
      'true',
      join(SRC_DIR, 'index.ts'),
    ],
    PROJECT_DIR
  )
}

function copyDeclaration() {
  return gulp.src(join(SRC_DIR, 'MediaInfoModule.d.ts')).pipe(gulp.dest(DIST_DIR))
}

const declarationTask = gulp.parallel([generateDeclaration, copyDeclaration])
declarationTask.displayName = 'declaration'
declarationTask.description = 'Generate TS declaration'

export default declarationTask
