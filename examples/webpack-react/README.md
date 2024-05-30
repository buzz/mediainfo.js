# mediainfo.js Webpack/React example

## WASM module

The `MediaInfoModule.wasm` file is copied during build using `copy-webpack-plugin`.

```javascript
const wasmFile = path.resolve(
  import.meta.dirname,
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
