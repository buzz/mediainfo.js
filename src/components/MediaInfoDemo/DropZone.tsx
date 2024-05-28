import { faHandRock } from '@fortawesome/free-regular-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { type DropzoneOptions, useDropzone } from 'react-dropzone'

import styles from './styles.module.css'

function DropZone({ isAnalyzing, onDrop }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isAnalyzing,
    multiple: false,
    onDrop,
  })
  return (
    <div
      id="dropzone"
      className={clsx(styles.dropzone, 'margin-vert--lg text--center', { dragover: isDragActive })}
      {...getRootProps()}
    >
      {isAnalyzing ? (
        <div id="status" className="hidden">
          <FontAwesomeIcon icon={faCog} size="lg" spin /> Analyzing file…
        </div>
      ) : (
        <div id="dropcontrols">
          <div id="dropcontrolstext">
            <FontAwesomeIcon icon={faHandRock} size="lg" /> Drop a media file here!
            <br />
            <span className={styles.dropZoneSmall}>(or click)</span>
          </div>
          <input id="fileinput" type="file" {...getInputProps()} />
        </div>
      )}
    </div>
  )
}

interface DropZoneProps {
  isAnalyzing: boolean
  onDrop: DropzoneOptions['onDrop']
}

export default DropZone
