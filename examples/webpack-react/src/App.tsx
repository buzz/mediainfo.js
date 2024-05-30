import React, { type ChangeEvent, useState, useEffect, useRef } from 'react'

import mediaInfoFactory from 'mediainfo.js'
import type { ReadChunkFunc, MediaInfo } from 'mediainfo.js'

function makeReadChunk(file: File): ReadChunkFunc {
  return async (chunkSize: number, offset: number) =>
    new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer())
}

function App() {
  const mediaInfoRef = useRef<MediaInfo<'text'>>()
  const [result, setResult] = useState('')

  useEffect(() => {
    mediaInfoFactory({
      format: 'text',
      locateFile: (filename) => filename,
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
