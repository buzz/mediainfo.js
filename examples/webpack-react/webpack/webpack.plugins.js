import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const inDev = process.env.NODE_ENV === 'development'

const wasmFile = path.resolve(
  import.meta.dirname,
  '..',
  'node_modules',
  'mediainfo.js',
  'dist',
  'MediaInfoModule.wasm'
)

export default [
  inDev && new webpack.HotModuleReplacementPlugin(),
  inDev && new ReactRefreshWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    inject: true,
  }),
  new CopyPlugin({
    patterns: [{ from: wasmFile, to: '.' }],
  }),
].filter(Boolean)
