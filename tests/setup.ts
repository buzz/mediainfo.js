import crypto from 'node:crypto'
import { createWriteStream, existsSync } from 'node:fs'
import { mkdir, readFile } from 'node:fs/promises'
import https from 'node:https'
import path from 'node:path'

// Filename -> MD5 hash
const TEST_FILES = {
  'av1_10bit_pq_limited_range.mp4': '5c7c8f240046ece3811ba58089a10fe1', // issue #188
  'AudioVideoInterleave.avi': 'a51c3aff106210abcf32a9d4285628a6',
  'Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3': 'b02fc030703403a13c9a6cef5922c6d1',
  'empty-menu-track.mp4': '3d1a78875d179f8588f71d34d01e9e59', // issue #159
  'flv-duration-no-metadata.flv': '839903b35fe4528bd90400ebb4156b9d', // issue #164
  'test-sample-636x360-25fps-53.76s.mp4': '354a59f58ec403d2f56834ee94125a33',
  'test-sample-320x240-29.970fps-14.014s.m1v': '5c606590c7a37a2f4f5ba5bbd42eb4e2',
  'many_tracks.mp4': '0e002574aad79365477ab8f904fef616',
  'sample.mkv': '130830537d5b0b79e78d68be16dde0fd',
  'freeMXF-mxf1.mxf': '25f21195085450603ba476d22ab85dae',
  'id3_char_encodings.mp3': '9ad305f22be7e4566c225b857ae570c3', // issue #150
}

function url(filename: string) {
  return `https://raw.githubusercontent.com/buzz/mediainfo.js/test-fixtures/${filename}`
}

function downloadFile(filename: string, filePath: string) {
  return new Promise<void>((resolve, reject) => {
    https.get(url(filename), (res) => {
      const code = res.statusCode ?? 0

      // handle redirects
      if (code > 300 && code < 400 && !!res.headers.location) {
        resolve(downloadFile(res.headers.location, filePath))
        return
      }

      const fileStream = createWriteStream(filePath)
        .on('finish', () => {
          resolve()
        })
        .on('error', (err) => {
          reject(err)
        })

      res.pipe(fileStream)
    })
  })
}

export default async function downloadFixtures() {
  const fixturesPath = path.resolve(__dirname, 'fixtures')
  if (!existsSync(fixturesPath)) {
    await mkdir(fixturesPath)
  }

  for (const [filename, md5] of Object.entries(TEST_FILES)) {
    const filePath = path.resolve(__dirname, 'fixtures', filename)

    // Download file
    if (!existsSync(filePath)) {
      await downloadFile(filename, filePath)
      console.info(`Downloaded test fixture ${filename}`)
    }

    // Check md5 hash
    const content = await readFile(filePath)
    const hash = crypto.createHash('md5').update(content).digest('hex')
    if (hash !== md5) {
      throw new Error(`File ${filename} has md5 mismatch!`)
    }
  }
}
