const { resolve } = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const pkginfo = require('./package.json')

const devMode = process.env.NODE_ENV !== 'production'
const srcPath = resolve(__dirname, 'src')
const distPath = resolve(__dirname, 'dist')

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: { app: resolve(srcPath, 'index.js') },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve(distPath, 'index.html'),
      // favicon: resolve(srcPath, 'static', 'favicon.png'),
      meta: {
        description: pkginfo.description,
        author: pkginfo.author,
        keywords: pkginfo.keywords.join(' '),
        viewport: 'width=device-width,initial-scale=1',
      },
      minify: false,
      title: 'mediainfo.js',
    }),
    new CopyPlugin([
      {
        from: resolve('node_modules', 'mediainfo.js', 'dist', 'mediainfo.wasm'),
        to: '.',
      },
    ]),
    new HtmlWebpackRootPlugin(),
    ...(devMode
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
          new CleanWebpackPlugin([distPath]), // clean dist folder before build
          new MiniCssExtractPlugin({ filename: '[name].css' }),
        ]),
  ],
  output: {
    path: distPath,
    filename: 'mediainfo-demo.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.sass$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: '.',
            },
          },
        ],
      },
      {
        test: /favicon\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' },
          },
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  ...(devMode ? { devtool: 'inline-source-map' } : {}),
}
