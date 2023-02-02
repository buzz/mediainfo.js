import path from 'path'

import generate from './generate'

const outFilename = path.resolve(__dirname, '..', '..', 'src', 'types.generated.d.ts')

generate(outFilename)
  .then(() => {
    console.log(`Types generated: ${outFilename}`)
  })
  .catch(console.error)
