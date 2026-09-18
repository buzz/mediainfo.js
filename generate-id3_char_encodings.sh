#!/bin/sh
# Regenerates the id3 tags of id3_char_encodings.mp3 (issue #150).
#
# One ID3v2.3 text frame per frame encoding, all holding the same text:
#
#   TIT2  UTF-8          (Title)
#   TPE1  Latin-1        (Performer)
#   TALB  UTF-16 + BOM   (Album)
#   TCON  UTF-16BE       (Genre)
#
# The text is deliberately non-ASCII in every frame: a Latin-1 only subset (Ã, £, â, ¬, Æ) for
# TPE1, plus two characters Latin-1 cannot encode (‚ and ’) and an astral plane one (𐍈, U+10348,
# a surrogate pair in UTF-16) for the rest. MediaInfoLib is expected to hand every frame back as
# the UTF-8 string it was written from; in the WASM build only the UTF-8 one survives.
#
# Requires: ffmpeg with libmp3lame, python3 with mutagen (pip install mutagen).

set -e

OUT=id3_char_encodings.mp3
TMP=$(mktemp --suffix=.mp3)
trap 'rm -f "$TMP"' EXIT

# 1 s of silence, mono: only the container matters here, the audio payload does not
ffmpeg -hide_banner -loglevel error -y \
  -f lavfi -i 'anullsrc=r=44100:d=1' \
  -c:a libmp3lame -q:a 9 "$TMP"

python3 - "$TMP" <<'PY'
import sys
from mutagen.id3 import Encoding, ID3, TALB, TCON, TPE1, TIT2

#                                Ã   £   â   ‚   ¬   Æ   ’   𐍈
text = "\u00c3\u00a3\u00e2\u201a\u00ac\u00c6\u2019\U00010348"
# mutagen refuses to encode \u201a and \u2019 as Latin-1, so that frame carries the subset
latin1 = "\u00c3\u00a3\u00e2\u00ac\u00c6"

tags = ID3()
tags.add(TIT2(encoding=Encoding.UTF8, text=[f"utf-8 {text}"]))
tags.add(TPE1(encoding=Encoding.LATIN1, text=[f"latin-1 {latin1}"]))
tags.add(TALB(encoding=Encoding.UTF16, text=[f"utf-16 {text}"]))
tags.add(TCON(encoding=Encoding.UTF16BE, text=[f"utf-16be {text}"]))
tags.save(sys.argv[1])
PY

mv "$TMP" "$OUT"
trap - EXIT
echo "$OUT: $(wc -c <"$OUT") bytes"
