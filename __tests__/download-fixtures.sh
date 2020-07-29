#!/bin/sh

set -e

urls=(
  "a51c3aff106210abcf32a9d4285628a6,https://github.com/mathiasbynens/small/raw/master/AudioVideoInterleave.avi"
  "b02fc030703403a13c9a6cef5922c6d1,https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Creative_Commons/Dead_Combo/CC_Affiliates_Mixtape_1/Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3"
  "82d9b86b01560ce17d310f3fd2a79ca9,https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4"
)

mkdir -p ./fixtures
for url in ${urls[@]}; do
  md5hash=$(echo $url | cut -d, -f1)
  url=$(echo $url | cut -d, -f2)
  filename="./fixtures/$(basename $url)"

  if [ ! -f "${filename}" ]; then
    wget --quiet --directory-prefix=./fixtures "$url"
    echo "Downloaded $filename"
  fi

  if ! echo "${md5hash} ${filename}" | md5sum -c --quiet; then
    exit -1
  fi
done
