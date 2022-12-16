import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFile,
  faFileAlt,
  faFileAudio,
  faFileVideo,
} from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const typeIconMap = {
  Audio: faFileAudio,
  Menu: faBars,
  Text: faFileAlt,
  Video: faFileVideo,
  default: faFile,
}

const getIcon = (type) =>
  typeIconMap[type] ? typeIconMap[type] : typeIconMap.default

function ResultTable({ result }) {
  const tracks = result.media.track.map(
    ({ '@type': type, ...properties }, i) => {
      const propertiesTable = Object.entries(properties).map(([name, val]) =>
        val instanceof Object ? (
          Object.entries(val).map(([extraName, extraVal]) => (
            <tr key={extraName}>
              <td>{extraName}</td>
              <td>{extraVal}</td>
            </tr>
          ))
        ) : (
          <tr key={name}>
            <td>{name}</td>
            <td>{val}</td>
          </tr>
        )
      )

      const key = properties.UniqueID ?? properties.ID ?? `${type}${i}`
      return (
        <React.Fragment key={key}>
          <tr className="header">
            <td colSpan="2">
              <h2>
                <FontAwesomeIcon icon={getIcon(type)} size="lg" /> {type}
              </h2>
            </td>
          </tr>
          {propertiesTable}
        </React.Fragment>
      )
    }
  )

  return (
    <table>
      <tbody>{tracks}</tbody>
    </table>
  )
}

export default ResultTable
