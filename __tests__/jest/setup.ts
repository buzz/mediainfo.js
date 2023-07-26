import crypto from 'crypto'
import { readFile } from 'fs/promises'
import { createWriteStream, statSync } from 'fs'
import { resolve } from 'path'
import https from 'https'

const TEST_FILES = {
  'AudioVideoInterleave.avi': {
    url: 'https://github.com/mathiasbynens/small/raw/master/AudioVideoInterleave.avi',
    md5: 'a51c3aff106210abcf32a9d4285628a6',
  },
  'Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3': {
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Creative_Commons/Dead_Combo/CC_Affiliates_Mixtape_1/Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3',
    md5: 'b02fc030703403a13c9a6cef5922c6d1',
  },
  'file_example_MP4_480_1_5MG.mp4': {
    url: 'https://www.dwsamplefiles.com/?dl_id=348',
    md5: '6c104de9464c1b0c29f0510b5d520f53',
  },
  'many_tracks.mp4': {
    url: undefined,
    md5: '0e002574aad79365477ab8f904fef616',
  },
}

function downloadFile(url: string, filePath: string) {
  return new Promise<void>((resolve, reject) => {
    https.get(url, (res) => {
      const code = res.statusCode ?? 0

      // handle redirects
      if (code > 300 && code < 400 && !!res.headers.location) {
        return resolve(downloadFile(res.headers.location, filePath))
      }

      const fileStream = createWriteStream(filePath)
        .on('finish', () => resolve())
        .on('error', (err) => reject(err))

      res.pipe(fileStream)
    })
  })
}

async function downloadFixtures() {
  for (const [fileName, { url, md5 }] of Object.entries(TEST_FILES)) {
    const filePath = resolve(__dirname, '..', 'fixtures', fileName)

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
