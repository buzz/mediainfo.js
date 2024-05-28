# mediainfo.js API

The main package export is a factory function that will handle instantiation and
loading of the WASM module for you. It works asynchronous.

## `mediaInfoFactory(opts, successCallback, errorCallback)`

> Asynchronously create an instance of MediaInfo.

Defaults: `opts = { chunkSize: 256*1024, coverData: false, format: 'object', full: false, ... }`

- `chunkSize`: Chunk size used by `analyzeData` (in bytes)
- `coverData`: Whether to extract binary cover data (Base64-encoded)
- `format`: Format of result value (choices: `object`, `JSON`, `XML`, `HTML` or `text`)
- `full`: Full information display (all internal tags)
- Other [Emscripten Module attributes](https://emscripten.org/docs/api_reference/module.html)
- Returns a `Promise` if no callback is given.

### Example

```js
const mediainfo = await mediaInfoFactory({ format: 'text' })
```

## `MediaInfo`

### `MediaInfo.analyzeData(getSize, readChunk, cb)`

> Convenience method for analyzing a buffer chunk by chunk.

Media files can be several gigabytes in size. The preferred way is to load data
in chunks to prevent memory exhaustion. `analyzeData` is a helper method that
facilitates this somewhat cumbersome process.

You need to provide two functions.

- `getSize`: Return total buffer size  
  `(): Promise<number> | number`  
- `readChunk`: Read a data chunk of `size` with `offset`  
  `(size: number, offset: number): Promise<Uint8Array> | Uint8Array`  

You can either provide a callback function that is called once the processing is done or the function will return a `Promise`.

### Example

```js
// Fake data (replace this with real file data)
const getSize = () => 100;
const readChunk = () => new Uint8Array(10);

const result = await mediainfo.analyzeFile(getSize, readChunk);
```

### Low-level methods

The `mediainfo` object also exposes a number of low-level methods analogous to
the
[MediaInfoLib buffer methods](https://mediaarea.net/en/MediaInfo/Support/SDK/Buffers).

`close()`, `inform()`, `openBufferContinue(data, size)`,
`openBufferContinueGotoGet()`, `openBufferFinalize()`,
`openBufferInit(size, offset)`
