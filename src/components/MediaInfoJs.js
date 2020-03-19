import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faInfoCircle,
  faSpinner,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { faHandRock } from '@fortawesome/free-regular-svg-icons'

const MediaInfoJs = () => {
  const onDrop = useCallback((files) => {
    console.log(files)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  })
  return (
    <>
      <div id="dropzone" className="big center" {...getRootProps()}>
        <button className="cancel hidden" type="button">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div id="loader" className="center" style={{ display: 'none' }}>
          <FontAwesomeIcon icon={faSpinner} size="lg" spin />
          <br />
          Loading…
        </div>
        <div id="dropcontrols">
          <div id="dropcontrolstext">
            <FontAwesomeIcon icon={faHandRock} size="lg" /> Drop a media file
            here!
            <br />
            <span className="small">(or click)</span>
          </div>
          <input id="fileinput" type="file" {...getInputProps()} />
        </div>
        <div id="status" className="hidden">
          <FontAwesomeIcon icon={faCog} size="lg" />
          Analyzing file…
        </div>
      </div>
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
      <div id="results">
        <h2>
          <i className="fa fa-list" /> results
        </h2>
        <div id="resultscontainer">
          <div className="result">
            <div className="result-head">
              <div className="pull-right">
                <button
                  title="Remove from list"
                  className="remove"
                  type="button"
                >
                  <i className="fa fa-lg fa-times" />
                </button>
              </div>
              <button
                title="Un/collapse"
                className="toggle-collapse"
                type="button"
              >
                <i className="fa fa-lg fa-caret-right" />
              </button>
              <span className="filename">
                Fleabag.S02E04.720p.BluRay.x264-SHORTBREHD.mkv
              </span>
            </div>
            <div className="result-body" />
          </div>
        </div>
      </div>
    </>
  )
}

export default MediaInfoJs
