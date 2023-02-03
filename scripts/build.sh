#!/bin/bash

# https://github.com/emscripten-core/emscripten/blob/main/src/settings.js

set -xe

source scripts/build-opts

mkdir -p build dist
cd build

export EM_NODE_JS="$EMSDK_NODE"
WASM_OPT="$EMSDK/upstream/bin/wasm-opt"

emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
  -std=c++11 \
  -I vendor/MediaInfoLib/Source \
  -I vendor/ZenLib/Source \
  -c ../src/MediaInfoModule.cpp

# node cjs
emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s ASSERTIONS=0 \
  -s ENVIRONMENT="node" \
  -s EXPORT_ES6=0 \
  -s LEGACY_VM_SUPPORT=0 \
  -s MODULARIZE=1 \
  -s NO_FILESYSTEM=1 \
  -s USE_ES6_IMPORT_META=0 \
  --bind \
  MediaInfoModule.o \
  vendor/MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a \
  vendor/ZenLib/Project/GNU/Library/.libs/libzen.a \
  vendor/Shared/Source/zlib/libz.a \
  -o MediaInfoModule.js
pnpm exec prettier build/MediaInfoModule.js > MediaInfoModule.cjs.js

# node esm
emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s ASSERTIONS=0 \
  -s ENVIRONMENT="node" \
  -s EXPORT_ES6=1 \
  -s LEGACY_VM_SUPPORT=0 \
  -s MODULARIZE=1 \
  -s NO_FILESYSTEM=1 \
  -s USE_ES6_IMPORT_META=1 \
  -lembind \
  MediaInfoModule.o \
  vendor/MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a \
  vendor/ZenLib/Project/GNU/Library/.libs/libzen.a \
  vendor/Shared/Source/zlib/libz.a \
  -o MediaInfoModule.js
pnpm exec prettier build/MediaInfoModule.js > MediaInfoModule.esm.js

# web esm
emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s ASSERTIONS=0 \
  -s ENVIRONMENT="web" \
  -s EXPORT_ES6=1 \
  -s LEGACY_VM_SUPPORT=0 \
  -s MODULARIZE=1 \
  -s NO_FILESYSTEM=1 \
  -s USE_ES6_IMPORT_META=1 \
  -lembind \
  MediaInfoModule.o \
  vendor/MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a \
  vendor/ZenLib/Project/GNU/Library/.libs/libzen.a \
  vendor/Shared/Source/zlib/libz.a \
  -o MediaInfoModule.js
pnpm exec prettier build/MediaInfoModule.js > MediaInfoModule.browser.js

"$WASM_OPT" -Oz -o MediaInfoModule.cjs.wasm ../dist/MediaInfoModule.wasm
rm MediaInfoModule.{cjs,esm,browser}.wasm
