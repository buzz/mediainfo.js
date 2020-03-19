import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faTrophy } from '@fortawesome/free-solid-svg-icons'

const About = () => (
  <div id="about">
    <h1>about</h1>
    <p>
      <strong>mediainfo.js</strong> can analyze all kinds of media files for
      you. It shows technical details and metadata.
    </p>

    <h2>
      <FontAwesomeIcon icon={faTrophy} /> thanks
    </h2>

    <p>- mediainfo - dragster - font awesome</p>

    <h2>
      <FontAwesomeIcon icon={faEnvelope} /> contact
    </h2>

    <p>
      Get in touch on <a href="https://github.com/buzz/mediainfo.js">GitHub</a>.
    </p>
  </div>
)

export default About
