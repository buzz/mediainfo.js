# mediainfo.js Vite + React Example

This example shows how to use `mediainfo.js` in a Vite + React project, with proper handling of the WebAssembly (WASM) file.

## WebAssembly Handling

The `MediaInfoModule.wasm` file is copied into the build output using `vite-plugin-static-copy` to ensure it's available at runtime:

```js
viteStaticCopy({
  targets: [
    {
      src: path.join(
        import.meta.dirname,
        'node_modules',
        'mediainfo.js',
        'dist',
        'MediaInfoModule.wasm'
      ),
      dest: '',
    },
  ],
}),
```
