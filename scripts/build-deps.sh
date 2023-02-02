#!/bin/bash

set -xe

LIBMEDIAINFO_VERSION=22.12
LIBZEN_VERSION=0.4.40
ZLIB_VERSION=1.2.13

LIBMEDIAINFO_URL="https://mediaarea.net/download/source/libmediainfo/${LIBMEDIAINFO_VERSION}/libmediainfo_${LIBMEDIAINFO_VERSION}.tar.bz2"
LIBZEN_URL="https://mediaarea.net/download/source/libzen/${LIBZEN_VERSION}/libzen_${LIBZEN_VERSION}.tar.bz2"
ZLIB_URL="http://zlib.net/zlib-${ZLIB_VERSION}.tar.gz"

source scripts/build-opts

mkdir -p build/vendor
cd build/vendor

export EM_NODE_JS="${NODE}"

# download sources
wget ${LIBMEDIAINFO_URL} -q -O - | tar -xj
wget ${LIBZEN_URL} -q -O - | tar -xj
mkdir -p Shared/Source
wget ${ZLIB_URL} -q -O - | tar -xz -C Shared/Source
mv Shared/Source/zlib-${ZLIB_VERSION} Shared/Source/zlib

# zlib
cd Shared/Source/zlib
emconfigure ./configure
emmake make
cd ../../..

# Zenlib
cd ZenLib/Project/GNU/Library/
./autogen.sh
emconfigure \
  ./configure \
  --host=le32-unknown-nacl \
  CFLAGS="${CFLAGS}" \
  CXXFLAGS="${CXXFLAGS}"
emmake make
cd ../../../..

# MediaInfoLib
cd MediaInfoLib/Project/GNU/Library
./autogen.sh
emconfigure \
  ./configure \
  --with-libz-static \
  --host=le32-unknown-nacl \
  CFLAGS="${CFLAGS}" \
  CXXFLAGS="${CXXFLAGS} ${MediaInfoLib_CXXFLAGS}"
emmake make
