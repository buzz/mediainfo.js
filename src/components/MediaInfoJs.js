import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const MediaInfoJs = () => {
  return (
    <>
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
    </>
  )
}

export default MediaInfoJs
