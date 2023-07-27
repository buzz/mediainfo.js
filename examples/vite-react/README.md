# mediainfo.js Vite/React example

## WASM module

Make sure the WASM file can be loaded, e.g. by using `vite-plugin-static-copy`.

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
