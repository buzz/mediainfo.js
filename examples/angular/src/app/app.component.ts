import { Component } from '@angular/core'
import MediaInfoFactory from 'mediainfo.js'
import { MediaInfo, ReadChunkFunc, Result } from 'mediainfo.js/dist/types'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  videoInfo = 'No file'

  getMetadata(mediainfo: MediaInfo, fileinput: HTMLInputElement): Promise<string> {
    return new Promise<string>((resolve) => {
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
      const p = <Promise<Result>>mediainfo.analyzeData(getSize, readChunk)
      p.then((result: string) => resolve(result)).catch(() =>
        resolve("Can't get media information")
      )
    })
  }

  onChangeFile(input: HTMLInputElement): void {
    MediaInfoFactory({ format: 'text' }, (mediainfo: MediaInfo) => {
      this.getMetadata(mediainfo, input).then((info) => {
        this.videoInfo = info.replace(/(?:\r\n|\r|\n)/g, '<br>')
      })
    })
  }
}
