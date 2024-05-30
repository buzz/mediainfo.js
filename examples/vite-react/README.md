# mediainfo.js Vite/React example

## WASM module

The `MediaInfoModule.wasm` file is copied during build using `vite-plugin-static-copy`.

```javascript
  viteStaticCopy({
    targets: [
      {
        src: path.join(__dirname, 'node_modules', 'mediainfo.js', 'dist', 'MediaInfoModule.wasm'),
        dest: '',
      },
    ],
  }),
```
