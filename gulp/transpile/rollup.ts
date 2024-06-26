import fs from 'node:fs/promises'
import path from 'node:path'

import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import virtual from '@rollup/plugin-virtual'
import gulp from 'gulp'
import rollup from 'rollup'

import { BUILD_DIR, DIST_DIR, SRC_DIR, UMD_NAME } from '../constants.ts'

import type { OutputOptions } from 'rollup'

interface Bundle {
  format: OutputOptions['format']
  minify: boolean
}

let mediaInfoModuleContent: string

async function loadMediaInfoModuleContent() {
  const modulePath = path.join(BUILD_DIR, 'MediaInfoModule.browser.js')
  mediaInfoModuleContent = await fs.readFile(modulePath, { encoding: 'utf8' })
}

function makeBuildTask({ format, minify }: Bundle) {
  const task = async () => {
    const bundle = await rollup.rollup({
      input: path.join(SRC_DIR, 'index.ts'),
      plugins: [
        resolve({ extensions: ['.ts'] }),

        // The module loader generated by emscripten is different for each environment.
        // For the bundler we just inject the correct content.
        virtual({ 'src/MediaInfoModule.js': mediaInfoModuleContent }),

        babel({
          babelHelpers: 'bundled',
          envName: 'ESM_ROLLUP',
          exclude: ['./node_modules/**', './src/cli.ts'],
          extensions: ['.ts'],
          include: ['./src/**'],
        }),
      ],
    })

    const outputOptions = {
      file: path.join(
        DIST_DIR,
        format === 'esm' ? 'esm-bundle' : 'umd',
        `index${minify ? '.min' : ''}.js`
      ),
      format,
      name: format === 'umd' ? UMD_NAME : undefined,
      plugins: minify ? [terser()] : undefined,
      sourcemap: true,
      exports: 'named',
    } satisfies OutputOptions

    await bundle.write(outputOptions)
  }

  task.displayName = `transpile:rollup:${format}${minify ? ':min' : ''}`
  return task
}

const bundles: Bundle[] = [
  { format: 'esm', minify: false },
  { format: 'esm', minify: true },
  { format: 'umd', minify: false },
  { format: 'umd', minify: true },
]

const rollupTask = gulp.series([
  loadMediaInfoModuleContent,
  gulp.parallel(bundles.map((build) => makeBuildTask(build))),
])
rollupTask.displayName = 'transpile:rollup'
rollupTask.description = 'Transpile Browser bundles'

export default rollupTask
