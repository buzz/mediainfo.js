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

const ResultTable = ({ result }) => {
  const tracks = result.media.track.map(({ '@type': type, ...rest }, i) => {
    const properties = Object.entries(rest).map(([name, val]) =>
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
    return (
      <React.Fragment key={i.toString()}>
        <tr className="header">
          <td colSpan="2">
            <h2>
              <FontAwesomeIcon icon={getIcon(type)} size="lg" /> {type}
            </h2>
          </td>
        </tr>
        {properties}
      </React.Fragment>
    )
  })

  return (
    <table>
      <tbody>{tracks}</tbody>
    </table>
  )
}

export default ResultTable
