import { type ChangeEvent, useState, useEffect, useRef } from 'react'

import mediaInfoFactory from 'mediainfo.js'
import type { MediaInfo, ReadChunkFunc } from 'mediainfo.js'
import mediaInfoWasmUrl from 'mediainfo.js/MediaInfoModule.wasm?url'

function makeReadChunk(file: File): ReadChunkFunc {
  return async (chunkSize: number, offset: number) =>
    new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer())
}

function App() {
  const mediaInfoRef = useRef<MediaInfo<'text'> | null>(null)
  const [result, setResult] = useState('')

  useEffect(() => {
    mediaInfoFactory({
      format: 'text',
      locateFile: (path, prefix) =>
        path === 'MediaInfoModule.wasm' ? mediaInfoWasmUrl : `${prefix}${path}`,
    })
      .then((mi) => {
        mediaInfoRef.current = mi
      })
      .catch((error: unknown) => {
        console.error(error)
      })

    return () => {
      if (mediaInfoRef.current) {
        mediaInfoRef.current.close()
      }
    }
  }, [])

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]
    if (file && mediaInfoRef.current) {
      mediaInfoRef.current
        .analyzeData(file.size, makeReadChunk(file))
        .then(setResult)
        .catch((error: unknown) => {
          console.error(error)
        })
    }
  }

  return (
    <>
      <input type="file" placeholder="Select file..." onChange={handleChange} />
      <pre>{result}</pre>
    </>
  )
}

export default App
