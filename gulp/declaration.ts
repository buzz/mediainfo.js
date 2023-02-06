import { PROJECT_DIR } from './constants'
import { spawn } from './utils'

function declaration() {
  return spawn(
    'tsc',
    ['--emitDeclarationOnly', '--declarationDir', 'dist', '--declaration', 'true', 'src/index.ts'],
    PROJECT_DIR
  )
}

export default declaration
