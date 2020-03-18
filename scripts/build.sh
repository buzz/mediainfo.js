#!/bin/bash

set -xe

OPTS="-O0"

mkdir -p build dist
cd build

emcc \
  ${OPTS} \
  -DUNICODE \
  -std=c++11 \
  -I vendor/MediaInfoLib/Source \
  -I vendor/ZenLib/Source \
  --bind \
  -c ../src/mediainfojs.cpp

emcc \
  ${OPTS} \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s ASSERTIONS=0 \
  -s ENVIRONMENT="node,web" \
  -s EXPORT_NAME="MediaInfo" \
  -s LEGACY_VM_SUPPORT=0 \
  -s MODULARIZE=1 \
  -s NO_FILESYSTEM=1 \
  --bind \
  mediainfojs.o \
  vendor/MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a \
  vendor/ZenLib/Project/GNU/Library/.libs/libzen.a \
  vendor/Shared/Source/zlib/libz.a \
  -o mediainfo.js

cd ..
mv build/mediainfo.wasm dist/
npx rollup -c
