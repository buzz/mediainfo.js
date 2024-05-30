import { Component } from '@angular/core'

import mediaInfoFactory from 'mediainfo.js'
import type { MediaInfo, ReadChunkFunc } from 'mediainfo.js'

function makeReadChunk(file: File): ReadChunkFunc {
  return async (chunkSize: number, offset: number) =>
    new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer())
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  mediaInfo: MediaInfo<'text'> | undefined = undefined
  result = ''
  disabled = true

  constructor() {
    mediaInfoFactory({ format: 'text' })
      .then((mediaInfo) => {
        this.mediaInfo = mediaInfo
        this.disabled = false
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }

  onChangeFile(event: Event) {
    if (this.mediaInfo && event.target) {
      const target = event.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        const file = target.files[0]
        this.mediaInfo
          .analyzeData(file.size, makeReadChunk(file))
          .then((result) => {
            this.result = result
          })
          .catch((error: unknown) => {
            console.error(error)
          })
      }
    }
  }
}
