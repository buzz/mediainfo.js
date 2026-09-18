#!/bin/sh
# Regenerates flv-duration-no-metadata.flv (issue #164), byte for byte.
#
# Two properties are needed to reproduce, both verified with MediaInfoLib 26.05:
#
#  1. No `onMetaData` tag. With metadata MediaInfoLib takes the duration from it and never runs
#     the fallback path; without it, File_Flv jumps to the end of the file and walks the tags
#     backwards (`Searching_Duration`) to find the last video/audio timestamps.
#  2. More than 2 MiB, which is the condition (`File_Offset + 2 MiB < File_Size`) to start that walk.
#
# That walk needs an Open_Buffer_Init per step; passing the *known* file size there re-inits the
# parser and aborts it, so Duration, OverallBitRate and StreamSize go missing - at every chunk
# size. Native mediainfo passes (int64u)-1 ("position only") and reports everything.
#
# Everything in the file is synthetic: ffmpeg's testsrc2 pattern and a generated sine tone.
#
# Requires: ffmpeg with the flv muxer and libmp3lame, python3.

set -e

OUT=flv-duration-no-metadata.flv
TMP=$(mktemp --suffix=.flv)
trap 'rm -f "$TMP"' EXIT

# 60 s, 256x144, one keyframe per second: just over the 2 MiB walk threshold
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i 'testsrc2=size=256x144:rate=25:duration=60' \
  -f lavfi -i 'aevalsrc=0.2*sin(440*2*PI*t):d=60:s=22050' \
  -map 0:v -map 1:a \
  -c:v flv -g 25 -b:v 250k -maxrate 1M -bufsize 400k \
  -c:a libmp3lame -b:a 64k \
  -f flv "$TMP"

# drop the AMF script tags (type 18); the FLV tag framing (PreviousTagSize) stays valid
python3 - "$TMP" "$OUT" <<'PY'
import struct, sys

src, dst = sys.argv[1], sys.argv[2]
data = open(src, "rb").read()
off = struct.unpack(">I", data[5:9])[0] + 4
records = []
while off + 11 <= len(data):
    size = struct.unpack(">I", b"\0" + data[off + 1:off + 4])[0]
    records.append((off, off + 11 + size + 4, data[off]))
    off = records[-1][1]

dropped = [(s, e) for s, e, t in records if t == 18]
if not dropped:
    sys.exit("no onMetaData tag in the ffmpeg output, this script needs updating")
for s, e in reversed(dropped):
    data = data[:s] + data[e:]

open(dst, "wb").write(data)
print(f"{dst}: {len(data)} bytes, {len(records) - len(dropped)} tags")
PY
