import React, { useCallback, useState } from 'react'
import MediaInfo from 'mediainfo.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faList } from '@fortawesome/free-solid-svg-icons'

import usePersist from '../hooks/usePersist'
import DropZone from './DropZone'
import Result from './Result'

const readChunk = (file) => (chunkSize, offset) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target.error) {
        reject(event.target.error)
      }
      resolve(new Uint8Array(event.target.result))
    }
    reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
  })

const getRandomId = () => Math.random().toString(36).substr(2, 9)

const collapseAll = (restoredResults) =>
  Object.entries(restoredResults).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key]: {
        ...val,
        collapsed: true,
      },
    }),
    {}
  )

const MediaInfoJs = ({ className }) => {
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState({})

  usePersist({
    key: 'results',
    onRestore: collapseAll,
    setState: setResults,
    state: results,
  })

  const onDrop = useCallback(([file]) => {
    if (file) {
      setAnalyzing(true)
      MediaInfo().then((mediainfo) =>
        mediainfo
          .analyzeData(() => file.size, readChunk(file))
          .then((result) =>
            setResults((prevResults) => ({
              [getRandomId()]: {
                ...result,
                name: file.name,
                collapsed: false,
              },
              ...prevResults,
            }))
          )
          .catch((error) =>
            setResults((prevResults) => ({
              [getRandomId()]: { collapsed: false, error: error.stack },
              ...prevResults,
            }))
          )
          .finally(() => setAnalyzing(false))
      )
    }
  }, [])

  const onCollapse = useCallback(
    (resultId) =>
      setResults((prevResults) => ({
        ...prevResults,
        [resultId]: {
          ...prevResults[resultId],
          collapsed: !prevResults[resultId].collapsed,
        },
      })),
    []
  )

  const onRemove = useCallback(
    (resultId) => setResults(({ [resultId]: _, ...rest }) => rest),
    []
  )

  const resultsContainer = Object.entries(results).map(([resultId, result]) => (
    <Result
      id={resultId}
      key={resultId}
      onCollapse={onCollapse}
      onRemove={onRemove}
      result={result}
    />
  ))

  return (
    <div className={className}>
      <DropZone analyzing={analyzing} onDrop={onDrop} />
      <p>
        <strong>mediainfo.js</strong> shows information about media files. It
        works with <code>.avi</code>, <code>.mkv</code>, <code>.mp3</code> and{' '}
        <a href="https://mediaarea.net/nn/MediaInfo"> many more…</a>
      </p>
      <p>
        <em>
          <FontAwesomeIcon className="blue" icon={faInfoCircle} size="lg" /> No
          data is leaving your computer. All analyzing is done in the browser!
        </em>
      </p>
      <div id="results">
        <h2>
          <FontAwesomeIcon icon={faList} /> results
        </h2>
        {resultsContainer}
        {Object.keys(results).length ? null : 'No results yet…'}
      </div>
    </div>
  )
}

export default MediaInfoJs
