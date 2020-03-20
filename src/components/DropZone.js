import React from 'react'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faHandRock } from '@fortawesome/free-regular-svg-icons'

const DropZone = ({ analyzing, onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: analyzing,
    multiple: false,
    onDrop,
  })
  return (
    <div
      id="dropzone"
      className={classNames('big', 'center', { dragover: isDragActive })}
      {...getRootProps()}
    >
      {analyzing ? (
        <div id="status" className="hidden">
          <FontAwesomeIcon icon={faCog} size="lg" spin /> Analyzing file…
        </div>
      ) : (
        <div id="dropcontrols">
          <div id="dropcontrolstext">
            <FontAwesomeIcon icon={faHandRock} size="lg" /> Drop a media file
            here!
            <br />
            <span className="small">(or click)</span>
          </div>
          <input id="fileinput" type="file" {...getInputProps()} />
        </div>
      )}
    </div>
  )
}

export default DropZone
