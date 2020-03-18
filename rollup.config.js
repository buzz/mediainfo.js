import path from 'path'
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    file: path.resolve(__dirname, 'dist', 'mediainfo.js'),
    format: 'umd',
    name: 'MediaInfo'
  },
  plugins: [commonjs()]
};
