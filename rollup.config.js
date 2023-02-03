import { resolve } from 'path'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const name = 'MediaInfo'
const format = 'umd'

const srcDir = resolve(__dirname, 'src')
const distDir = resolve(__dirname, 'dist')

export default {
  input: resolve(srcDir, 'index.ts'),
  output: [
    {
      file: resolve(distDir, 'index.js'),
      format,
      name,
      sourcemap: true,
    },
    {
      file: resolve(distDir, 'index.min.js'),
      format,
      name,
      plugins: [terser()],
      sourcemap: false,
    },
  ],
  external: ['fs', 'path', 'module'],
  plugins: [typescript({ exclude: ['src/cli.ts'] })],
}
