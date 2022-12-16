import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope, faTrophy } from '@fortawesome/free-solid-svg-icons'

function About({ className }) {
  return (
    <div className={className} id="about">
      <h1>
        <FontAwesomeIcon icon={faAddressCard} /> about
      </h1>
      <p>
        <strong>mediainfo.js</strong> can analyze all kinds of media files for
        you. It shows technical details and metadata.
      </p>

      <h2>
        <FontAwesomeIcon icon={faTrophy} /> thanks
      </h2>

      <p>
        - <a href="https://mediaarea.net/en/MediaInfo">mediainfo</a> -{' '}
        <a href="https://react-dropzone.js.org/">react-dropzone</a> -{' '}
        <a href="https://fontawesome.com/">font awesome</a>
      </p>

      <h2>
        <FontAwesomeIcon icon={faEnvelope} /> contact
      </h2>

      <p>
        Get in touch on{' '}
        <a href="https://github.com/buzz/mediainfo.js">GitHub</a>.
      </p>
    </div>
  )
}

export default About
