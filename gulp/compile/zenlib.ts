import path from 'node:path'

import { CPU_CORES, CXXFLAGS, VENDOR_DIR } from '../constants.ts'
import { spawn } from '../utils.ts'

const zenlibDir = path.join(VENDOR_DIR, 'ZenLib', 'Project', 'GNU', 'Library')

async function task() {
  await spawn('./autogen.sh', [], zenlibDir)
  await spawn('sed', ['-i', 's/-O2/-Oz/', 'configure'], zenlibDir)
  await spawn(
    'emconfigure',
    [
      './configure',
      '--host=le32-unknown-nacl',
      '--disable-unicode',
      '--enable-static',
      '--disable-shared',
      `CXXFLAGS=${CXXFLAGS}`,
    ],
    zenlibDir
  )
  await spawn('emmake', ['make', `-j${CPU_CORES}`], zenlibDir)
}

task.displayName = 'compile:zenlib'
task.description = 'Compile zenlib'

export default task
