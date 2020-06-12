#!/bin/bash

set -xe

source scripts/build-opts

mkdir -p build dist
cd build

emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
  -std=c++11 \
  -I vendor/MediaInfoLib/Source \
  -I vendor/ZenLib/Source \
  --bind \
  -c ../src/mediainfojs.cpp

emcc \
  ${CXXFLAGS} \
  ${MediaInfoLib_CXXFLAGS} \
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
wasm-opt -Oz -o dist/mediainfo.wasm build/mediainfo.wasm
npx rollup -c
