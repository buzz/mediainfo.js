# mediainfo.js Angular example

## WASM module

The `MediaInfoModule.wasm` file is copied during build using `assets` configuration.

```json
"assets": [
  {
    "input": "node_modules/mediainfo.js/dist",
    "glob": "MediaInfoModule.wasm",
    "output": ""
  }
],
```
