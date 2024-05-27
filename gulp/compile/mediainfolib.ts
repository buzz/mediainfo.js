import path from 'node:path'

import { CPU_CORES, CXXFLAGS, MediaInfoLib_CXXFLAGS, VENDOR_DIR } from '../constants.ts'
import { spawn } from '../utils.ts'

const mediainfolibDir = path.join(VENDOR_DIR, 'MediaInfoLib', 'Project', 'GNU', 'Library')

async function task() {
  await spawn('./autogen.sh', [], mediainfolibDir)
  await spawn('sed', ['-i', 's/-O2/-Oz/', 'configure'], mediainfolibDir)
  await spawn(
    'emconfigure',
    [
      './configure',
      '--host=le32-unknown-nacl',
      '--enable-static',
      '--disable-shared',
      '--disable-dll',
      `CXXFLAGS=${CXXFLAGS} ${MediaInfoLib_CXXFLAGS}`,
    ],
    mediainfolibDir
  )
  await spawn('emmake', ['make', `-j${CPU_CORES}`], mediainfolibDir)
}

task.displayName = 'compile:mediainfolib'
task.description = 'Compile MediaInfoLib'

export default task
