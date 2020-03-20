import React, { useCallback } from 'react'
import { Collapse } from 'react-collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'

import ResultTable from './ResultTable'

const Result = ({ id, result, onCollapse, onRemove }) => {
  const handleKeyPress = useCallback(
    (resultId, event) => {
      // Enter, Space
      if ([13, 32].includes(event.charCode)) {
        event.preventDefault()
        onCollapse(resultId)
      }
    },
    [onCollapse]
  )

  return (
    <div className="result">
      <div
        className="result-head"
        onClick={() => onCollapse(id)}
        onKeyPress={(event) => handleKeyPress(id, event)}
        role="button"
        tabIndex={0}
        title={result.collapsed ? 'Expand' : 'Collapse'}
      >
        <div className="pull-right">
          <button
            className="remove"
            onClick={(event) => {
              event.stopPropagation()
              onRemove(id)
            }}
            tabIndex={0}
            title="Remove from list"
            type="button"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <FontAwesomeIcon
          className="toggle-collapse"
          icon={faCaretRight}
          rotation={result.collapsed ? undefined : 90}
          size="lg"
        />
        <span className="filename">{result.name}</span>
      </div>
      <Collapse isOpened={!result.collapsed}>
        <div className="result-body">
          {result.error ? (
            <div className="result-error">{result.error}</div>
          ) : (
            <ResultTable result={result} />
          )}
        </div>
      </Collapse>
    </div>
  )
}

export default Result
