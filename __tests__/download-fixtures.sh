#!/bin/sh

set -e

urls=(
  "a51c3aff106210abcf32a9d4285628a6,https://github.com/mathiasbynens/small/raw/master/AudioVideoInterleave.avi"
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
