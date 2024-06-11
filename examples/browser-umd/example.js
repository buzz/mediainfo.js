const fileinput = document.getElementById('fileinput')
const output = document.getElementById('output')

const onChangeFile = (mediainfo) => {
  const file = fileinput.files[0]
  if (file) {
    output.value = 'Working…'

    const readChunk = async (chunkSize, offset) =>
      new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer())

    mediainfo
      .analyzeData(file.size, readChunk)
      .then((result) => {
        output.value = result
      })
      .catch((error) => {
        output.value = `An error occured:\n${error.stack}`
      })
  }
}

MediaInfo.mediaInfoFactory({ format: 'text' }, (mediainfo) => {
  fileinput.removeAttribute('disabled')
  fileinput.addEventListener('change', () => onChangeFile(mediainfo))
})
