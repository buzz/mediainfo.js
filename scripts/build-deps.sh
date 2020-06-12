#!/bin/bash

set -xe

LIBMEDIAINFO_VERSION=19.09
LIBZEN_VERSION=0.4.37
ZLIB_VERSION=1.2.11

MediaInfoLib_CXXFLAGS="-I ../../../Source -I ../../../../ZenLib/Source -s USE_ZLIB=1 \
  -DMEDIAINFO_ADVANCED_NO -DMEDIAINFO_REFERENCES_NO -DMEDIAINFO_FILTER_NO -DMEDIAINFO_DUPLICATE_NO -DMEDIAINFO_MACROBLOCKS_NO \
  -DMEDIAINFO_TRACE_NO -DMEDIAINFO_TRACE_FFV1CONTENT_NO -DMEDIAINFO_IBI_NO -DMEDIAINFO_DIRECTORY_NO -DMEDIAINFO_JNI_NO\
  -DMEDIAINFO_LIBCURL_NO -DMEDIAINFO_LIBMMS_NO -DMEDIAINFO_DVDIF_ANALYZE_NO -DMEDIAINFO_MPEGTS_DUPLICATE_NO \
  -DMEDIAINFO_READTHREAD_NO -DMEDIAINFO_MD5_NO -DMEDIAINFO_SHA1_NO -DMEDIAINFO_SHA2_NO -DMEDIAINFO_EVENTS_NO \
  -DMEDIAINFO_DEMUX_NO -DMEDIAINFO_AES_NO -DMEDIAINFO_FIXITY_NO -DMEDIAINFO_READER_NO -DMEDIAINFO_NEXTPACKET_NO"

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
emconfigure ./configure --with-libz-static --host=le32-unknown-nacl CXXFLAGS="$MediaInfoLib_CXXFLAGS"
emmake make
