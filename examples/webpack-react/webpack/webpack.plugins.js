const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const inDev = process.env.NODE_ENV === 'development'

const wasmFile = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'mediainfo.js',
  'dist',
  'MediaInfoModule.wasm'
)

module.exports = [
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
