import { join } from 'path'

import { CFLAGS, CPU_CORES, CXXFLAGS, MediaInfoLib_CXXFLAGS, VENDOR_DIR } from '../constants'
import { spawn } from '../utils'

const mediainfolibDir = join(VENDOR_DIR, 'MediaInfoLib', 'Project', 'GNU', 'Library')

async function task() {
  await spawn('./autogen.sh', [], mediainfolibDir)
  await spawn(
    'emconfigure',
    [
      './configure',
      '--host=le32-unknown-nacl',
      '--enable-static',
      '--disable-shared',
      '--disable-dll',
      `CFLAGS=${CFLAGS}`,
      `CXXFLAGS=${CXXFLAGS} ${MediaInfoLib_CXXFLAGS}`,
    ],
    mediainfolibDir
  )
  await spawn('emmake', ['make', `-j${CPU_CORES}`], mediainfolibDir)
}

task.displayName = 'compile:mediainfolib'
task.description = 'Compile MediaInfoLib'

export default task
