# mediainfo.js Webpack/React example

## WASM module

Make sure the WASM file can be loaded, e.g. by using `copy-webpack-plugin`.

```javascript
const wasmFile = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'mediainfo.js',
  'dist',
  'MediaInfoModule.wasm'
)

new CopyPlugin({
  patterns: [{ from: wasmFile, to: '.' }],
}),
```
