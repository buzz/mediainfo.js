---
sidebar_position: 3
---

# Development

## Requirements

The development repository uses [pnpm](https://pnpm.io/) as package manager.

### WASM tools

Install Emscripten preferably using
[Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html#installation-instructions).

```bash
$ git clone https://github.com/emscripten-core/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
$ source ./emsdk_env.sh
```

You also need to have [Binaryen](https://github.com/WebAssembly/binaryen) and
[wabt](https://github.com/WebAssembly/wabt) available on your system.

## Building

In the project root of mediainfo.js run the following commands to build.

```sh
$ pnpm install
$ pnpm build
```

Find the resulting files in the `dist` directory.

## Tests

Run a test suite against the dist build.

```sh
$ pnpm test
```
