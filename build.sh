#!/bin/bash

# download sources
wget https://mediaarea.net/download/source/libmediainfo/0.7.82/libmediainfo_0.7.82.tar.bz2 -q -O - | tar -xj
wget https://mediaarea.net/download/source/libzen/0.4.32/libzen_0.4.32.tar.bz2 -q -O - | tar -xj
mkdir -p Shared/Source
wget http://zlib.net/zlib-1.2.8.tar.gz -q -O - | tar -xz -C Shared/Source
mv Shared/Source/zlib-1.2.8 Shared/Source/zlib

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

# mediainfo.js
em++ -Oz -DUNICODE -std=c++11 -I MediaInfoLib/Source -I ZenLib/Source --bind -c mediainfojs.cpp
em++ -O3 --bind -s TOTAL_MEMORY=67108864 mediainfojs.o MediaInfoLib/Project/GNU/Library/.libs/libmediainfo.a ZenLib/Project/GNU/Library/.libs/libzen.a Shared/Source/zlib/libz.a -o mediainfo.js
