import { spawn as spawnChild } from 'node:child_process'
import { createWriteStream } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import https from 'node:https'

import prettier from 'prettier'

function downloadFile(url: string) {
  return new Promise<string>((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        let data = ''
        response.on('data', (chunk: string) => {
          data += chunk
        })
        response
          .on('end', () => {
            resolve(data)
          })
          .on('error', reject)
      } else {
        const msg =
          `Failed to download ${url}` +
          (response.statusCode === undefined ? '' : `, status=${response.statusCode}`)
        reject(new Error(msg))
      }
    })
  })
}

function downloadFileToDir(url: string, destDir: string) {
  return new Promise<void>((resolve, reject) => {
    const file = createWriteStream(destDir)

    https.get(url, function (response) {
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
          `Failed to download ${url}` +
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

function spawn(cmd: string, args: string[], cwd: string, captureStdout = false) {
  return new Promise<string>((resolve, reject) => {
    const proc = spawnChild(cmd, args, { cwd })
    let output = ''

    proc.stdout.on('data', (data) => {
      if (Buffer.isBuffer(data)) {
        if (captureStdout) {
          output += data.toString()
        } else {
          process.stdout.write(data.toString())
        }
      }
    })

    proc.stderr.on('data', (data) => {
      if (Buffer.isBuffer(data)) {
        process.stderr.write(data.toString())
      }
    })

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(output)
      } else {
        reject(new Error(`Program exited with status code ${code ?? 'null'}`))
      }
    })

    proc.stderr.on('error', (err) => {
      reject(err)
    })
  })
}

export { downloadFile, downloadFileToDir, format, spawn }
