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
  `<script type="text/javascript" src="https://unpkg.com/mediainfo.js/dist/mediainfo.min.js"></script>`
- **Bundler**: `npm install mediainfo.js`

#### WASM file loading

Be aware that mediainfo.js is a WebAssembly port of MediaInfoLib. Thus it
depends on `MediaInfoModule.wasm` which weighs around **4.2 MiB**. The WASM
module is loaded and instantiated automatically. By default it uses
`location.href` as the base for constructing the module file URL.

E.g. if the webpage is served from `https://example.com/`, the WASM module file
is loaded from `https://example.com/MediaInfoModule.wasm`. You can freely
override this behavior using [Emscripten Module
`locateFile`](https://emscripten.org/docs/api_reference/module.html#Module.locateFile).

For the CDN version have a look at this
[example](https://github.com/buzz/mediainfo.js/blob/0b18458780338eeefa829be48781cfc017503ee3/examples/browser-simple/example.js#L37).
If you're using a bundler there are examples for
[React/webpack](https://github.com/buzz/mediainfo.js/blob/gh-pages-src/webpack.config.js#L42)
and [Angular](https://github.com/buzz/mediainfo.js/tree/master/examples/angular)
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

- [Simple browser](https://github.com/buzz/mediainfo.js/tree/master/examples/browser-simple)
- [Multi-file browser](https://github.com/buzz/mediainfo.js/tree/master/examples/browser-multiple)
- [CDN (CodePen)](https://codepen.io/buzzone/pen/eYNjJrx)
- [React/webpack](https://github.com/buzz/mediainfo.js/tree/gh-pages-src)
- [Angular](https://github.com/buzz/mediainfo.js/tree/master/examples/angular)
- [Node.js](https://github.com/buzz/mediainfo.js/blob/master/src/cli.ts)

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
$ export PATH=$PATH:$(pwd)/upstream/bin # for wasm-opt
```

In the project root of mediainfo.js run the following to build.

```sh
$ npm install
$ npm run build
```

Find the resulting files `mediainfo.js`, `mediainfo.min.js` and `mediainfo.wasm`
in the `dist` directory.

## Tests

You can run a test suite against the dist build.

```sh
$ npm run test
```

## License

This program is freeware under BSD-2-Clause license conditions:
[MediaInfo(Lib) License](https://mediaarea.net/en/MediaInfo/License)

This product uses [MediaInfo](https://mediaarea.net/en/MediaInfo) library,
Copyright (c) 2002-2020 [MediaArea.net SARL](mailto:Info@MediaArea.net).
