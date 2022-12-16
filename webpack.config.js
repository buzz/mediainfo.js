const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const pkginfo = require('./package.json')

const devMode = process.env.NODE_ENV !== 'production'
const srcPath = resolve(__dirname, 'src')
const distPath = resolve(__dirname, 'dist')
const wasmFile = resolve(
  __dirname,
  'node_modules',
  'mediainfo.js',
  'dist',
  'MediaInfoModule.wasm'
)

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
      templateContent: ({ htmlWebpackPlugin }) => `
        <html>
          <head>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <div id="root" />
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
    }),
    new CopyPlugin({
      patterns: [
        { from: wasmFile, to: '.' },
        { from: 'CNAME', to: '.' },
      ],
    }),
    ...(devMode
      ? []
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
  resolve: {
    extensions: ['*', '.js'],
    fallback: {
      fs: false,
      path: false,
      url: false,
      module: false,
    },
  },
  ...(devMode ? { devtool: 'inline-source-map' } : {}),
}
