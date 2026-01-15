import crypto from 'node:crypto'
import { createWriteStream, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import https from 'node:https'
import path from 'node:path'

const TEST_FILES = {
  'AudioVideoInterleave.avi': {
    url: 'https://github.com/mathiasbynens/small/raw/master/AudioVideoInterleave.avi',
    md5: 'a51c3aff106210abcf32a9d4285628a6',
  },
  'Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3': {
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Creative_Commons/Dead_Combo/CC_Affiliates_Mixtape_1/Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3',
    md5: 'b02fc030703403a13c9a6cef5922c6d1',
  },
  // File has 0 bytes when downloaded...
  'dwsample mp4 360p.mp4': {
    url: 'https://www.dwsamplefiles.com/?dl_id=348',
    md5: '6c104de9464c1b0c29f0510b5d520f53',
  },
  'many_tracks.mp4': {
    url: undefined,
    md5: '0e002574aad79365477ab8f904fef616',
  },
  'sample.mkv': {
    url: 'https://github.com/sbraz/pymediainfo/raw/master/tests/data/sample.mkv',
    md5: '130830537d5b0b79e78d68be16dde0fd',
  },
  'freeMXF-mxf1.mxf': {
    url: 'http://freemxf.org/samples/freeMXF-mxf1.mxf',
    md5: '25f21195085450603ba476d22ab85dae',
  },
}

function downloadFile(url: string, filePath: string) {
  return new Promise<void>((resolve, reject) => {
    https.get(url, (res) => {
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

async function downloadFixtures() {
  for (const [fileName, { url, md5 }] of Object.entries(TEST_FILES)) {
    const filePath = path.resolve(__dirname, 'fixtures', fileName)

    // Check existing file
    try {
      statSync(filePath)
    } catch {
      // Download file
      if (url) {
        await downloadFile(url, filePath)
      }
    }

    // Check md5 hash
    const content = await readFile(filePath)
    const hash = crypto.createHash('md5').update(content).digest('hex')
    if (hash !== md5) {
      throw new Error(`File ${fileName} has md5 mismatch!`)
    }
  }
}

export default downloadFixtures
