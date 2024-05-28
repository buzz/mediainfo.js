import { useCallback } from 'react'
import type { DropzoneOptions } from 'react-dropzone'

import { isError } from '@site/src/utils'
import Admonition from '@theme/Admonition'

import DropZone from './DropZone'
import ResultSection from './Result/ResultSection'
import useMediaInfo from './useMediaInfo'
import usePersist from './usePersist'

const getRandomId = () => Math.random().toString(36).slice(2, 11)

function MediaInfoDemo() {
  const { analyzeFile, isAnalyzing } = useMediaInfo()
  const [results, setResults] = usePersist('results')

  const onDrop: DropzoneOptions['onDrop'] = useCallback(
    (files: File[]) => {
      if (files.length > 0) {
        analyzeFile(files[0])
          .then((result) => {
            setResults((prevResults) => ({
              [getRandomId()]: {
                ...result,
                name: files[0].name,
                collapsed: false,
              },
              ...prevResults,
            }))
          })
          .catch((error: unknown) => {
            if (isError(error)) {
              setResults((prevResults) => ({
                [getRandomId()]: { collapsed: false, error: error.message },
                ...prevResults,
              }))
            }
          })
      }
    },
    [analyzeFile, setResults]
  )

  const onRemove = useCallback(
    (resultId: string) => {
      setResults((prevResults) => {
        if (prevResults) {
          const { [resultId]: _, ...rest } = prevResults
          return rest
        }
      })
    },
    [setResults]
  )

  const resultsContainer = Object.entries(results).map(([resultId, result], index) => (
    <ResultSection id={resultId} index={index} key={resultId} onRemove={onRemove} result={result} />
  ))

  return (
    <section>
      <div className="container margin-vert--lg">
        <h1>Live Demo</h1>
        <Admonition type="note">
          No data leaves your computer. All analysis is performed within the browser.
        </Admonition>
        <DropZone isAnalyzing={isAnalyzing} onDrop={onDrop} />
        {Object.keys(results).length > 0 ? (
          <>
            <h2>Results</h2>
            {resultsContainer}
          </>
        ) : null}
      </div>
    </section>
  )
}

export default MediaInfoDemo
