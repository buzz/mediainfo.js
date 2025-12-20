# mediainfo.js Vite + React Example

This example shows how to use `mediainfo.js` in a Vite + React project with Vite’s asset pipeline for the WebAssembly (WASM) file.

## WebAssembly Handling (Recommended)

Import the WASM as an asset URL so Vite fingerprints and emits it, then provide that URL to `mediainfo.js` via the `locateFile` option:

```ts
import mediaInfoFactory from 'mediainfo.js'
import mediaInfoWasmUrl from 'mediainfo.js/MediaInfoModule.wasm?url'

await mediaInfoFactory({
  locateFile: (path, prefix) =>
    path === 'MediaInfoModule.wasm' ? mediaInfoWasmUrl : `${prefix}${path}`,
})
```

## Vite Build Warning

Vite can emit a warning about `new URL('MediaInfoModule.wasm', import.meta.url)` inside the generated loader. This example removes it via a tiny transform plugin in `examples/vite-react/vite.config.ts` (`fixMediainfoWasmImportMetaUrl`).
