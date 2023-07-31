import React, { type ChangeEvent, useState, useEffect, useRef } from 'react'
import MediaInfoFactory from 'mediainfo.js'
import type { ReadChunkFunc, MediaInfo } from 'mediainfo.js'

function getMetadata(mi: MediaInfo<'text'>, file: File) {
  const getSize = () => file.size
  const readChunk: ReadChunkFunc = (chunkSize, offset) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.error) {
          reject(event.target.error)
        }
        resolve(new Uint8Array(event.target?.result as ArrayBuffer))
      }
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
    })

  return mi.analyzeData(getSize, readChunk)
}

function App() {
  const miRef = useRef<MediaInfo<'text'>>()
  const [result, setResult] = useState('')

  useEffect(() => {
    MediaInfoFactory({ format: 'text' }).then((mi) => {
      miRef.current = mi
    })

    return () => {
      if (miRef.current) {
        miRef.current.close()
      }
    }
  }, [])

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]
    if (file && miRef.current) {
      getMetadata(miRef.current, file).then(setResult)
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
