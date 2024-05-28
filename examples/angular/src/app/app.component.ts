import { Component } from '@angular/core'
import mediaInfoFactory from 'mediainfo.js'
import type { MediaInfo, ReadChunkFunc } from 'mediainfo.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  videoInfo = 'No file'

  getMetadata(mediainfo: MediaInfo<'text'>, fileinput: HTMLInputElement): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const file = fileinput.files[0]
      if (!file) {
        return resolve("Can't get media information")
      }

      const getSize = () => file.size
      const readChunk: ReadChunkFunc = (chunkSize, offset) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target.error) {
              reject(event.target.error)
            }
            resolve(new Uint8Array(event.target.result as ArrayBuffer))
          }
          reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
        })

      mediainfo
        .analyzeData(getSize, readChunk)
        .then((result) => {
          resolve(result)
        })
        .catch(() => {
          reject(new Error("Can't get media information"))
        })
    })
  }

  onChangeFile(input: HTMLInputElement) {
    mediaInfoFactory({ format: 'text' })
      .then((mi) => {
        this.getMetadata(mi, input)
          .then((info) => {
            this.videoInfo = info.replace(/(?:\r\n|\r|\n)/g, '<br>')
            return undefined
          })
          .catch((err) => {
            console.error('Failed to process file:', err)
          })
        return undefined
      })
      .catch((err) => {
        console.error('Failed to instantiate MediaInfo:', err)
      })
  }
}
