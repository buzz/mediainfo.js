import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const isDev = process.env.NODE_ENV === 'development'

// IMPORTANT: help webpack find the wasm file
const wasmFilePath = path.resolve(
  import.meta.dirname,
  'node_modules',
  'mediainfo.js',
  'dist',
  'MediaInfoModule.wasm'
)

export default {
  mode: process.env.NODE_ENV,
  entry: './src/main.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
      },
    ],
  },
  output: {
    path: path.resolve(import.meta.dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    // IMPORTANT: ensure the wasm filename doesn't get mangled by webpack
    assetModuleFilename: '[name][ext]',
    clean: !isDev,
  },
  resolve: {
    // IMPORTANT: help webpack find the wasm file
    alias: { 'MediaInfoModule.wasm': wasmFilePath },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  devServer: isDev ? { open: true } : undefined,
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    isDev && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ].filter(Boolean),
}
