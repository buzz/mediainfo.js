# mediainfo.js

This is a JavaScript port of the excellent
[MediaInfoLib](https://mediaarea.net/en/MediaInfo) and can run directly in a
browser or in Node.js. It is transpiled from C++ source code using
[Emscripten](http://emscripten.org/).

## Demo

Try mediainfo.js in your browser: [https://mediainfo.js.org](https://mediainfo.js.org)

## Usage

### Browser

You can either use a CDN to include the script file directly in your page or
use a JavaScript bundler like webpack.

- **CDN**:  
  `<script type="text/javascript" src="https://unpkg.com/mediainfo.js"></script>`
- **Bundler**: `npm install mediainfo.js`

#### WASM file loading

Be aware that mediainfo.js is a WebAssembly port of MediaInfoLib. Thus it
depends on `MediaInfoModule.wasm` which weighs around **4.2 MiB**. The WASM
module is loaded and instantiated automatically. By default its load path
is determined from the script location.

E.g. if the script is loaded from `https://example.com/dist/umd/index.js`, the
WASM module file is loaded from `https://example.com/dist/MediaInfoModule.wasm`.
This setup works out-of-the-box for the UMD build.

You can override the location by specifying a custom
[`locateFile`](https://emscripten.org/docs/api_reference/module.html#Module.locateFile)
function to `MediaInfoFactory`.

For the CDN/UMD version have a look at this
[example](https://github.com/buzz/mediainfo.js/tree/main/examples/browser-umd).
If you're using a bundler there are examples for
[React/webpack](https://github.com/buzz/mediainfo.js/tree/main/examples/webpack)
and [Angular](https://github.com/buzz/mediainfo.js/tree/main/examples/angular)
on how to achieve this.

### Node.js

Install [mediainfo.js from NPM](https://www.npmjs.com/package/mediainfo.js).

```sh
$ npm install -g mediainfo.js
```

You can use it directly from the **shell**.

```sh
$ mediainfo.js /path/to/media.avi
```

Or use it as a [library](#api).

```js
require('mediainfo.js')().then((mediainfo) => {
  // mediainfo ready…
})
```

### Examples

- [Browser UMD/CDN](https://github.com/buzz/mediainfo.js/tree/main/examples/browser-umd)
- [CDN (CodePen)](https://codepen.io/buzzone/pen/eYNjJrx)
- [Vite/React](https://github.com/buzz/mediainfo.js/tree/main/examples/vite-react)
- [Webpack/React](https://github.com/buzz/mediainfo.js/tree/main/examples/webpack-react)
- [Angular](https://github.com/buzz/mediainfo.js/tree/main/examples/angular)
- [Node.js](https://github.com/buzz/mediainfo.js/blob/main/src/cli.ts)

### API

#### `MediaInfo(opts, successCallback, errorCallback)`

> Create an instance of `mediainfo`.

Defaults: `opts = { chunkSize: 256*1024, coverData: false, format: 'object', full: false, ... }`

- `chunkSize`: Chunk size used by `analyzeData` (in bytes)
- `coverData`: Whether to extract binary cover data (Base64-encoded)
- `format`: Format of result value (choices: `object`, `JSON`, `XML`, `HTML` or `text`)
- `full`: Full information display (all internal tags)
- Other [Emscripten Module attributes](https://emscripten.org/docs/api_reference/module.html)
- Returns a Promise if no callback is given.

```js
const MediaInfo = require('mediainfo.js')
MediaInfo(opts, callback, errorCallback)
```

Media files can be several gigabytes in size. The preferred way is to load data
in chunks to prevent memory exhaustion. `analyzeData` is a helper method that
facilitates this somewhat cumbersome process.

#### `mediainfo.analyzeData(getSize, readChunk, cb)`

> Convenience method for analyzing a buffer chunk by chunk.

- You need to provide two callback functions. They can either return a Promise
  or directly the value.
  - `getSize()` - Return total buffer size.
  - `readChunk(size, offset)` - Read data chunk of `size` with `offset` and
    return an `Uint8Array`.
- Returns a Promise if no callback is given.

#### Low-level methods

The `mediainfo` object also exposes a number of low-level methods analogous to
the
[MediaInfoLib buffer methods](https://mediaarea.net/en/MediaInfo/Support/SDK/Buffers).

`close()`, `inform()`, `openBufferContinue(data, size)`,
`openBufferContinueGotoGet()`, `openBufferFinalize()`,
`openBufferInit(size, offset)`

## Build

Install Emscripten preferably using
[Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html#installation-instructions).

```bash
$ git clone https://github.com/emscripten-core/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
$ source ./emsdk_env.sh
```

In the project root of mediainfo.js run the following to build.

```sh
$ pnpm install
$ pnpm build
```

Find the resulting files in the `dist` directory.

## Tests

You can run a test suite against the dist build.

```sh
$ pnpm test
```

## License

This program is freeware under BSD-2-Clause license conditions:
[MediaInfo(Lib) License](https://mediaarea.net/en/MediaInfo/License)

This product uses [MediaInfo](https://mediaarea.net/en/MediaInfo) library,
Copyright (c) 2002-2020 [MediaArea.net SARL](mailto:Info@MediaArea.net).
