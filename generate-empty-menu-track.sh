#!/bin/sh
# Regenerates the structure of empty-menu-track.mp4 (issue #159). NOT byte-reproducible, see below.
#
# Three properties are needed, verified with MediaInfoLib 26.05:
#
#  1. A chapter. ffmpeg's mov/mp4 muxer writes chapters twice: as a Timed Text ('text') track
#     referenced by a 'chap' track, and as a Nero 'chpl' item. MediaInfoLib turns both into Menu
#     streams.
#  2. An EMPTY chapter title (`title=` below). The 'chpl' Menu stream then has no field left to
#     display, which is what makes the JSON writer take the "track without RawContent" branch for
#     that stream. With a non-empty title every track has fields and the file is harmless.
#  3. `-movflags +faststart` (`moov` before `mdat`). Without it the same content parses cleanly.
#
# The bug itself is upstream: MediaInfoLib's `struct Node` (Source/MediaInfo/OutputHelpers.h) has a
# default constructor that leaves the `Multiple` member uninitialized, and MediaInfo_Inform.cpp
# creates exactly one such node per stream: `Node* Track = new Node()`. In To_JSON_Elements(), a
# non-zero `Multiple` on that node adds a `[` ... `]` pair around the stream body, so the "track"
# array is closed too early and the result is not valid JSON:
#
#   ,{"@type":"Menu","@typeorder":"2","":{}]}]}      (broken)  vs.
#   ,{"@type":"Menu","@typeorder":"2","":null}]}     (native mediainfo, valid)
#
# Whether that byte reads back as zero depends on how much of the heap got recycled before the last
# node was allocated - which depends on the file layout down to the 4 `mvhd` creation-time bytes.
# Both `-fflags +bitexact` variants of this recipe (i.e. a fixed creation time) parse cleanly, so
# the file is committed as-is and this script only documents how it was made.

set -e

OUT=empty-menu-track.mp4
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i 'testsrc=size=320x240:rate=25' -t 1 \
  -f lavfi -i 'anullsrc=r=48000:cl=stereo' -shortest \
  -c:v libx264 -pix_fmt yuv420p -c:a aac \
  "$TMP/base.mp4"

cat > "$TMP/base.ffmeta" <<'EOF'
;FFMETADATA1
[CHAPTER]
TIMEBASE=1/1000
START=0
END=1000
title=
EOF

ffmpeg -hide_banner -loglevel error -y \
  -i "$TMP/base.mp4" -i "$TMP/base.ffmeta" \
  -map 0 -map_metadata 1 -c copy \
  -movflags +faststart \
  "$OUT"

md5sum "$OUT"
