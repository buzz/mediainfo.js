import MediaInfo from '../build/mediainfo.js'

const mediaInfoLib = MediaInfo()

const createMI = (mi, { chunkSize, format }) => {
  const analyzeData = async ({ getSize, readData }) => {
    let offset = 0
    const fileSize = await getSize()
    openBufferInit(fileSize, offset)
    for (;;) {
      const data = await readData(
        Math.min(chunkSize, fileSize - offset),
        offset
      )
      if (data.length === 0 || openBufferContinue(data, data.length)) {
        break
      }
      const seekTo = openBufferContinueGotoGet()
      if (seekTo === -1) {
        offset += data.length
      } else {
        offset = seekTo
        openBufferInit(fileSize, seekTo)
      }
    }
    openBufferFinalize()
    const result = inform()
    return format === 'JSON' ? JSON.parse(result) : result
  }

  const close = () => mi.close()

  const inform = () => mi.inform()

  const openBufferContinue = (data, size) =>
    mi.open_buffer_continue(data, size) & 0x02 // bit 0 set -> done

  const openBufferContinueGotoGet = () => {
    // JS bindings don' support 64 bit int
    // https://github.com/buzz/mediainfo.js/issues/11
    let seekTo = -1
    const seekToLow = mi.open_buffer_continue_goto_get_lower()
    const seekToHigh = mi.open_buffer_continue_goto_get_upper()
    if (seekToLow == -1 && seekToHigh == -1) {
      seekTo = -1
    } else if (seekToLow < 0) {
      seekTo = seekToLow + 4294967296 + seekToHigh * 4294967296
    } else {
      seekTo = seekToLow + seekToHigh * 4294967296
    }
    return seekTo
  }

  const openBufferFinalize = () => mi.open_buffer_finalize()

  const openBufferInit = (size, offset) => mi.open_buffer_init(size, offset)

  return {
    analyzeData,
    chunkSize,
    close,
    inform,
    openBufferContinue,
    openBufferContinueGotoGet,
    openBufferFinalize,
    openBufferInit,
  }
}

const mediaInfoFactory = (userOptions = {}) =>
  new Promise((resolve) => {
    const defaultOptions = {
      chunkSize: 1024 * 1024,
      format: 'JSON',
    }
    const opts = {
      ...defaultOptions,
      ...userOptions,
    }
    mediaInfoLib.then((MI) =>
      resolve(createMI(new MI.MediaInfo(opts.format), opts))
    )
  })

export default mediaInfoFactory
