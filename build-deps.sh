#!/bin/bash

# download sources
wget https://mediaarea.net/download/source/libmediainfo/19.07/libmediainfo_19.07.tar.bz2 -q -O - | tar -xj
wget https://mediaarea.net/download/source/libzen/0.4.37/libzen_0.4.37.tar.bz2 -q -O - | tar -xj
mkdir -p Shared/Source
wget http://zlib.net/zlib-1.2.11.tar.gz -q -O - | tar -xz -C Shared/Source
mv Shared/Source/zlib-1.2.11 Shared/Source/zlib

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
