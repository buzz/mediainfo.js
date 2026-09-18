import path from 'node:path'

import gulp from 'gulp'

import { DIST_DIR, PROJECT_DIR, SRC_DIR } from './constants.ts'
import { spawn } from './utils.ts'

// TypeScript 6 refuses files on the command line when a tsconfig.json is present (TS5112),
// so declaration emit runs from its own project file.
async function generateDeclaration() {
  await spawn('tsc', ['--project', 'tsconfig.declaration.json'], PROJECT_DIR)
}

function copyDeclaration() {
  return gulp.src(path.join(SRC_DIR, 'MediaInfoModule.d.ts')).pipe(gulp.dest(DIST_DIR))
}

const declarationTask = gulp.parallel([generateDeclaration, copyDeclaration])
declarationTask.displayName = 'declaration'
declarationTask.description = 'Generate TS declaration'

export default declarationTask
