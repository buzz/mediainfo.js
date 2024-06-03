import { faBars, faFile, faFont, faVideo, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import type { Track } from 'mediainfo.js'

import { isObject } from '@site/src/utils'

import styles from './styles.module.css'
import type { Result } from './Result'

const typeIconMap = {
  Audio: faVolumeHigh,
  Menu: faBars,
  Text: faFont,
  Video: faVideo,
  default: faFile,
} as const

function isTypeIcon(key: string): key is keyof typeof typeIconMap {
  return Object.keys(typeIconMap).includes(key)
}

function isValue(thing: unknown): thing is string | number {
  return ['string', 'number'].includes(typeof thing)
}

const getIcon = (type: string) => (isTypeIcon(type) ? typeIconMap[type] : typeIconMap.default)

function PropertyRow({ name, value }: PropertyRowProps) {
  if (isValue(value)) {
    return (
      <tr>
        <td className="text--truncate">{name}</td>
        <td>{value}</td>
      </tr>
    )
  }

  // Extra
  if (isObject(value)) {
    return Object.entries(value).map(([extraName, extraValue], idx) =>
      isValue(extraValue) ? (
        <tr key={`extra-${idx}`}>
          <td className="text--truncate">{extraName}</td>
          <td>{extraValue}</td>
        </tr>
      ) : null
    )
  }

  return null
}

interface PropertyRowProps {
  name: string
  value: Track[keyof Track]
}

function Track({ index, track }: TrackProps) {
  const { '@type': type, ...properties } = track
  const [collapsed, setCollapsed] = useState(index > 0)

  const onClick = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed)
  }

  const headerRow = (
    <tr>
      <th colSpan={2}>
        <button
          className={styles.trackCollapseButton}
          onClick={onClick}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          <h3 className="margin-bottom--none">
            <span>
              <FontAwesomeIcon className="margin-right--xs" fixedWidth icon={getIcon(type)} />{' '}
              {type}
            </span>
            <span>{`#${index + 1}`}</span>
          </h3>
        </button>
      </th>
    </tr>
  )

  const propertyRows = collapsed
    ? null
    : Object.entries(properties).map(([name, value]) => (
        <PropertyRow name={name} value={value} key={name} />
      ))

  return (
    <table className={styles.resultTable} data-collapsed={collapsed ? 'true' : 'false'}>
      <colgroup>
        <col className={styles.colLabel} />
        <col className={styles.colValue} />
      </colgroup>
      <thead>{headerRow}</thead>
      <tbody>{propertyRows}</tbody>
    </table>
  )
}

interface TrackProps {
  index: number
  track: Track
}

function ResultTable({ result }: ResultTableProps) {
  const tracks = result.media?.track ?? []

  return tracks.map((track, idx) => (
    <Track
      index={idx}
      track={track}
      key={track.UniqueID ?? track.ID ?? `${track['@type']}${idx}`}
    />
  ))
}

interface ResultTableProps {
  result: Result
}

export default ResultTable
