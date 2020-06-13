import path from 'path'
// import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

const name = 'MediaInfo'
const format = 'umd'

export default {
  input: path.resolve(__dirname, 'src', 'mediainfo.ts'),
  output: [
    {
      file: path.resolve(__dirname, 'dist', 'mediainfo.js'),
      format,
      name,
      sourcemap: true,
    },
    {
      file: path.resolve(__dirname, 'dist', 'mediainfo.min.js'),
      format,
      name,
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  external: ['fs', 'path'],
  // plugins: [commonjs(), typescript()],
  plugins: [typescript()],
}
