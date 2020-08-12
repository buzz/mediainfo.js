const fileinput = document.getElementById('fileinput')
const output = document.getElementById('output')

function get_file_info(mediainfo, file) {
  let getSize = () => file.size
  let readChunk = (chunkSize, offset) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (event) => {
        if (event.target.error) {
          reject(event.target.error)
        }
        resolve(new Uint8Array(event.target.result))
      }
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
    })

  return mediainfo
    .analyzeData(getSize, readChunk)
    .then((result) => {
      //Display outcome in html
      output.value = `${output.value}${result}`
    })
    .catch((error) => {
      output.value = `${output.value}\n\nAn error occured:\n${error.stack}`
    })
}

async function onChangeFile(mediainfo) {
  let file
  output.value = null
  if (fileinput.files.length >= 2) {
    for (let i = 0; i < fileinput.files.length; i++) {
      file = fileinput.files[i]
      if (file) {
        await get_file_info(mediainfo, file)
        if (i + 1 == fileinput.files.length) {
          return
        }
      }
    }
  } else {
    file = fileinput.files[0]
    if (file) {
      await get_file_info(mediainfo, file)
    }
  }
}

MediaInfo({ format: 'text' }, (mediainfo) => {
  fileinput.addEventListener('change', () => onChangeFile(mediainfo))
})
