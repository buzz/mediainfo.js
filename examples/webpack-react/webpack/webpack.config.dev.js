import plugins from './webpack.plugins.js'
import rules from './webpack.rules.js'

export default {
  mode: 'development',
  entry: ['./src/main.tsx'],
  module: { rules },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
}
