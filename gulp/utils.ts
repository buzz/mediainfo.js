import { spawn as spawnChild } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import https from 'node:https'

import prettier from 'prettier'

function downloadFile(dlUrl: string, destDir: string) {
  return new Promise<void>((resolve, reject) => {
    const file = createWriteStream(destDir)

    https.get(dlUrl, function (response) {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
        file.on('error', (err) => {
          file.close()
          reject(err)
        })
      } else {
        file.close()
        const msg =
          `Failed to download ${dlUrl}` +
          (response.statusCode === undefined ? '' : `, status=${response.statusCode}`)
        reject(new Error(msg))
      }
    })
  })
}

async function format(filepath: string, destFilepath: string) {
  const text = await readFile(filepath, 'utf8')
  const options = await prettier.resolveConfig(filepath)
  if (options === null) {
    throw new Error('Could not find prettier config')
  }
  await writeFile(destFilepath, await prettier.format(text, { ...options, filepath }))
}

function spawn(cmd: string, args: string[], cwd: string) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawnChild(cmd, args, { cwd })
    proc.stdout.on('data', (data) => {
      if (Buffer.isBuffer(data)) {
        process.stdout.write(data.toString())
      }
    })
    proc.stderr.on('data', (data) => {
      if (Buffer.isBuffer(data)) {
        process.stderr.write(data.toString())
      }
    })
    proc.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Program exited with status code ${code ?? 'null'}`))
      }
    })
    proc.stderr.on('error', (err) => {
      reject(err)
    })
  })
}

export { downloadFile, format, spawn }
