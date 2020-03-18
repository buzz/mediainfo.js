#!/bin/bash

set -xe

LIBMEDIAINFO_VERSION=19.09
LIBZEN_VERSION=0.4.37
ZLIB_VERSION=1.2.11

mkdir -p build/vendor
cd build/vendor

# download sources
wget https://mediaarea.net/download/source/libmediainfo/${LIBMEDIAINFO_VERSION}/libmediainfo_${LIBMEDIAINFO_VERSION}.tar.bz2 -q -O - | tar -xj
wget https://mediaarea.net/download/source/libzen/${LIBZEN_VERSION}/libzen_${LIBZEN_VERSION}.tar.bz2 -q -O - | tar -xj
mkdir -p Shared/Source
wget http://zlib.net/zlib-${ZLIB_VERSION}.tar.gz -q -O - | tar -xz -C Shared/Source
mv Shared/Source/zlib-${ZLIB_VERSION} Shared/Source/zlib

# zlib
cd Shared/Source/zlib
emconfigure ./configure
emmake make
cd ../../..

# Zenlib
cd ZenLib/Project/GNU/Library/
./autogen.sh
emconfigure ./configure --host=le32-unknown-nacl
emmake make
cd ../../../..

# MediaInfoLib
cd MediaInfoLib/Project/GNU/Library
./autogen.sh
emconfigure ./configure --with-libz-static --host=le32-unknown-nacl
emmake make
