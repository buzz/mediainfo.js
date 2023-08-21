# mediainfo.js

This is a JavaScript port of the excellent
[MediaInfoLib](https://mediaarea.net/en/MediaInfo) and can run directly in a
browser or in Node.js. It is transpiled from C++ source code using
[Emscripten](http://emscripten.org/).

## Demo

Try mediainfo.js in your browser: [https://mediainfo.js.org](https://mediainfo.js.org)

## Usage

```js
import MediaInfoFactory from 'mediainfo.js'

MediaInfoFactory().then((mediainfo) => {
  mediainfo.analyzeFile(...)
})
```

See the [API docs](API.md) for detailed instructions.

### Browser

You can either use a CDN to include the script file directly in your page or
use a JavaScript bundler like webpack.

- **CDN**:  
  `<script type="text/javascript" src="https://unpkg.com/mediainfo.js"></script>`
- **Bundler**: `npm install mediainfo.js`

#### WASM file loading

Be aware that mediainfo.js needs to load the `MediaInfoModule.wasm` file (around
**3.5 MiB**). The WASM module is loaded and instantiated automatically. By
default its load path is determined from the script location. This works
out-of-the-box for the UMD and Node.js version.

❗️ **If using a bundler, you need to ensure the module loader can fetch the WASM
file by configuring your bundler/web server accordingly** ([examples](#examples)).

Note that you can override the WASM file location by specifying a custom
[`locateFile`](https://emscripten.org/docs/api_reference/module.html#Module.locateFile)
function to `MediaInfoFactory`.

### Node.js

Install [mediainfo.js from NPM](https://www.npmjs.com/package/mediainfo.js).

```sh
$ npm install -g mediainfo.js
```

It can be used as a CLI from the **shell**.

```sh
$ mediainfo.js /path/to/media.avi
```

Or use it as a [library](API.md).

## Examples

- [Browser UMD via CDN](https://github.com/buzz/mediainfo.js/tree/main/examples/browser-umd)
- [CDN (CodePen)](https://codepen.io/buzzone/pen/eYNjJrx)
- [Vite/React](https://github.com/buzz/mediainfo.js/tree/main/examples/vite-react)
- [Webpack/React](https://github.com/buzz/mediainfo.js/tree/main/examples/webpack-react)
- [Angular](https://github.com/buzz/mediainfo.js/tree/main/examples/angular)
- [Node.js](https://github.com/buzz/mediainfo.js/blob/main/src/cli.ts)

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
Copyright (c) 2002-2023 [MediaArea.net SARL](mailto:Info@MediaArea.net).
