import path from 'node:path'

import gulp from 'gulp'

import { DIST_DIR, PROJECT_DIR, SRC_DIR } from './constants.ts'
import { spawn } from './utils.ts'

async function generateDeclaration() {
  const args = [
    '--emitDeclarationOnly',
    '--declarationDir',
    DIST_DIR,
    '--declaration',
    'true',
    '--skipLibCheck',
    path.join(SRC_DIR, 'index.ts'),
  ]
  await spawn('tsc', args, PROJECT_DIR)
}

function copyDeclaration() {
  return gulp.src(path.join(SRC_DIR, 'MediaInfoModule.d.ts')).pipe(gulp.dest(DIST_DIR))
}

const declarationTask = gulp.parallel([generateDeclaration, copyDeclaration])
declarationTask.displayName = 'declaration'
declarationTask.description = 'Generate TS declaration'

export default declarationTask
