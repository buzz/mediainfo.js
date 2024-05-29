import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import Details from '@theme/Details'

import ResultTable from './ResultTable'
import styles from './styles.module.css'
import type { Result } from './Result'

function ResultSection({ id, index, result, onRemove }: ResultSectionProps) {
  const summary = (
    <summary className={styles.summary}>
      <span className={clsx(styles.filename, 'text--truncate')}>{result.name}</span>
      <button
        className="button button--danger button--sm"
        onClick={(event) => {
          event.stopPropagation()
          onRemove(id)
        }}
        title="Remove from list"
      >
        <FontAwesomeIcon icon={faTrash} size="lg" /> Remove
      </button>
    </summary>
  )

  return (
    <section className="margin-bottom--md">
      <Details summary={summary} open={index === 0}>
        {result.error ?? <ResultTable result={result} />}
      </Details>
    </section>
  )
}

interface ResultSectionProps {
  id: string
  index: number
  result: Result
  onRemove: (id: string) => void
}

export default ResultSection
