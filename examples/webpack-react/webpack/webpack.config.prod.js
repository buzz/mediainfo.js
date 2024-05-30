import plugins from './webpack.plugins.js'
import rules from './webpack.rules.js'

export default {
  mode: 'production',
  entry: ['./src/main.tsx'],
  module: { rules },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    clean: true,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  stats: 'errors-warnings',
  optimization: {
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
}
