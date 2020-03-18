const fileinput = document.getElementById('fileinput')
const output = document.getElementById('output')

const onChangeFile = (mediainfo) => {
  const file = fileinput.files[0]
  if (file) {
    output.value = 'Working…'
    mediainfo
      .analyzeData({
        readData: (chunkSize, offset) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) => {
              if (event.target.error) {
                reject(event.target.error)
              }
              resolve(new Uint8Array(event.target.result))
            }
            reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
          }),
        getSize: () => file.size,
      })
      .then((result) => {
        output.value = result
      })
      .catch((error) => {
        output.value = `An error occured:\n${error.stack}`
      })
  }
}

MediaInfo({ format: 'text' }).then((mediainfo) => {
  fileinput.addEventListener('change', () => onChangeFile(mediainfo))
})
