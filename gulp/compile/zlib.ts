import { access, symlink } from 'fs/promises'
import { join } from 'path'

import { ZLIB_DIR, ZLIB_VERSION } from '../constants'
import { spawn } from '../utils'

const newZlibDir = join(ZLIB_DIR, 'zlib')

async function task() {
  try {
    await access(newZlibDir)
  } catch {
    await symlink(`zlib-${ZLIB_VERSION}`, newZlibDir)
  }

  await spawn('emconfigure', ['./configure'], newZlibDir)
  await spawn('emmake', ['make'], newZlibDir)
}

task.displayName = 'compile:zlib'
task.description = 'Compile zlib'

export default task
