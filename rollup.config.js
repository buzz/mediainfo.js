import { join } from 'path'

import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const umdName = 'MediaInfo'
const srcDir = join(__dirname, 'src')
const bundlesDir = join(__dirname, 'dist', 'bundles')

export default {
  external: ['fs', 'path', 'module'],
  input: join(srcDir, 'index.ts'),
  output: [
    {
      format: 'esm',
      file: join(bundlesDir, 'index.esm.js'),
      sourcemap: true,
    },
    {
      format: 'esm',
      file: join(bundlesDir, 'index.esm.min.js'),
      plugins: [terser()],
      sourcemap: true,
    },
    {
      format: 'umd',
      file: join(bundlesDir, 'index.umd.js'),
      name: umdName,
      sourcemap: true,
    },
    {
      format: 'umd',
      file: join(bundlesDir, 'index.umd.min.js'),
      name: umdName,
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ extensions: ['.ts'] }),
    babel({
      babelHelpers: 'bundled',
      envName: 'ESM_BUNDLED',
      exclude: ['./node_modules/**', './src/cli.ts'],
      extensions: ['.ts'],
      include: ['./src/**'],
    }),
  ],
}
