import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const name = 'MediaInfo'
const format = 'umd'

export default {
  input: path.resolve(__dirname, 'src', 'index.js'),
  output: [
    {
      file: path.resolve(__dirname, 'dist', 'mediainfo.js'),
      format,
      name,
    },
    {
      file: path.resolve(__dirname, 'dist', 'mediainfo.min.js'),
      format,
      name,
      plugins: [terser()],
    },
  ],
  external: ['fs', 'path'],
  plugins: [commonjs()],
}
