# mediainfo.js Angular example

## WASM module

Add `MediaInfoModule.wasm` to the `assets` section in the options of the build
target in your `angular.json`.

```json
"assets": [
  {
    "input": "node_modules/mediainfo.js/dist",
    "glob": "MediaInfoModule.wasm",
    "output": ""
  }
]
```

## Credits

Based on a [Stack Overflow answer](https://stackoverflow.com/a/63049567) by
[David](https://stackoverflow.com/users/1160794/david).
