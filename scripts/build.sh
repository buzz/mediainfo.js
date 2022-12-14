#!/bin/bash

set -xe

source scripts/build-opts

mkdir -p build dist
cd build

export EM_NODE_JS="${NODE}"

emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
  -std=c++11 \
  -I vendor/MediaInfoLib/Source \
  -I vendor/ZenLib/Source \
  --bind \
  -c ../src/MediaInfoModule.cpp

emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s ASSERTIONS=0 \
  -s ENVIRONMENT="node,web" \
  -s EXPORT_ES6=1 \
  -s LEGACY_VM_SUPPORT=0 \
  -s MODULARIZE=1 \
  -s NO_FILESYSTEM=1 \
  -s USE_ES6_IMPORT_META=1 \
  --bind \
  MediaInfoModule.o \
  vendor/MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a \
  vendor/ZenLib/Project/GNU/Library/.libs/libzen.a \
  vendor/Shared/Source/zlib/libz.a \
  -o MediaInfoModule.js

echo "import MediaInfoModuleFactory from '../src/MediaInfoModule'" > MediaInfoModule.d.ts
echo "export default MediaInfoModuleFactory" >> MediaInfoModule.d.ts

cd ..
wasm-opt -Oz -o dist/MediaInfoModule.wasm build/MediaInfoModule.wasm
