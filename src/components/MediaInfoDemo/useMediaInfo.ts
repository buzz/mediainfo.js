import mediaInfoFactory from 'mediainfo.js'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { MediaInfo, ReadChunkFunc } from 'mediainfo.js'

const readChunkFunc: (file: File) => ReadChunkFunc = (file) => async (chunkSize, offset) =>
  new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer())

function useMediaInfo() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const mediaInfoRef = useRef<MediaInfo>()

  useEffect(() => {
    mediaInfoFactory({ locateFile: (url, scriptDirectory) => `${scriptDirectory}${url}` })
      .then((mediaInfo) => {
        mediaInfoRef.current = mediaInfo
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

  const analyzeFile = useCallback(async (file: File) => {
    if (!mediaInfoRef.current) {
      throw new Error('MediaInfo not initialized')
    }

    setIsAnalyzing(true)
    const result = await mediaInfoRef.current.analyzeData(() => file.size, readChunkFunc(file))
    setIsAnalyzing(false)
    return result
  }, [])

  return { analyzeFile, isAnalyzing }
}

export default useMediaInfo
