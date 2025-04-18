# mediainfo.js Webpack + React Example

This minimal example demonstrates how to integrate `mediainfo.js` with a Webpack + React setup. It focuses on correctly handling the WebAssembly (WASM) file so Webpack can locate and load it properly.

## Webpack Configuration

To ensure the WASM file is handled correctly, two adjustments are necessary in `webpack.config.js`:

1. **Preserve the original WASM filename**

```js
assetModuleFilename: '[name][ext]',
```

2. **Make the WASM file discoverable via alias**

```js
alias: { 'MediaInfoModule.wasm': wasmFilePath },
```

## Loading the WASM in React

In `App.tsx`, override the `locateFile` function when calling `mediaInfoFactory` to instruct the browser where to find the WASM file:

```js
locateFile: (filename) => filename,
```
