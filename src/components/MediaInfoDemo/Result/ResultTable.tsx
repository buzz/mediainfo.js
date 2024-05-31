import { faFile, faFileAlt, faFileAudio, faFileVideo } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Track } from 'mediainfo.js'

import { isObject } from '@site/src/utils'

import styles from './styles.module.css'
import type { Result } from './Result'

const typeIconMap = {
  Audio: faFileAudio,
  Menu: faBars,
  Text: faFileAlt,
  Video: faFileVideo,
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
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    )
  }

  // Extra
  if (isObject(value)) {
    return Object.entries(value).map(([extraName, extraValue], idx) =>
      isValue(extraValue) ? (
        <tr key={`extra-${idx}`}>
          <td>{extraName}</td>
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

function Track({ track }: TrackProps) {
  const { '@type': type, ...properties } = track

  return (
    <>
      <tr>
        <td colSpan={2}>
          <h3 className="margin-bottom--none">
            <FontAwesomeIcon icon={getIcon(type)} /> {type}
          </h3>
        </td>
      </tr>
      {Object.entries(properties).map(([name, value]) => (
        <PropertyRow name={name} value={value} key={name} />
      ))}
    </>
  )
}

interface TrackProps {
  track: Track
}

function ResultTable({ result }: ResultTableProps) {
  const track = result.media?.track ?? []

  return (
    <table className={styles.resultTable}>
      <tbody>
        {track.map((track, idx) => {
          const key = track.UniqueID ?? track.ID ?? `${track['@type']}${idx}`
          return <Track track={track} key={key} />
        })}
      </tbody>
    </table>
  )
}

interface ResultTableProps {
  result: Result
}

export default ResultTable
