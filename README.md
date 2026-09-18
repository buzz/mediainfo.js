# mediainfo.js Test Fixtures

## `AudioVideoInterleave.avi`

Taken from https://github.com/mathiasbynens/small.

## `av1_10bit_pq_limited_range.mp4`

Attached to [issue #188](https://github.com/buzz/mediainfo.js/issues/188) by [MiikaH](https://github.com/MiikaH).
Created with ffmpeg 9.0 using:

```
ffmpeg -f lavfi -i nullsrc=s=256x512:r=30:d=5 -vf 'format=yuv420p10le,geq=lum="723":cb="512":cr="512",setparams=range=tv:color_primaries=bt2020:color_trc=smpte2084:colorspace=bt2020nc' -c:v libsvtav1 -crf 12 -svtav1-params color-primaries=9:transfer-characteristics=16:matrix-coefficients=9:color-range=0 -pix_fmt yuv420p10le -color_range tv -color_primaries bt2020 -color_trc smpte2084 -colorspace bt2020nc av1_10bit_pq_limited_range.mp4
```

The file is committed as-is (4747 bytes, `moov` at the end). Regenerating it with another
ffmpeg/SVT-AV1 version may produce a different byte layout and thus no longer trigger the bug.

## `Dead_Combo_-_01_-_Povo_Que_Cas_Descalo.mp3`

**Povo Que Caís Descalço** by [Dead Combo](https://freemusicarchive.org/music/Dead_Combo/) is licensed under a
[Attribution-NonCommercial 3.0 International License](https://creativecommons.org/licenses/by-nc/3.0/).

## `empty-menu-track.mp4`

Generated with `generate-empty-menu-track.sh` (ffmpeg n9.0.1). Fully synthetic: `testsrc` pattern plus
`anullsrc` tone, muxed with a single chapter whose title is empty and `-movflags +faststart`.

The chapter with an empty title leaves MediaInfoLib with a Menu stream that has no field to display
at all. That is the only case in which the JSON writer serialises the per-stream node created by
`new Node()` in `MediaInfo_Inform.cpp` - and `Node`'s default constructor does not initialise its
`bool Multiple`. When that byte reads back as non-zero, `To_JSON_Elements()` wraps the stream body in
a `[ ... ]` pair, closing the `"track"` array too early:

```
,{"@type":"Menu","@typeorder":"2","":{}]}]}   mediainfo.js (broken, uninitialised read)
,{"@type":"Menu","@typeorder":"2","":null}]}  native mediainfo, same version
```

The upstream bug is tracked in [issue #159](https://github.com/buzz/mediainfo.js/issues/159).

Committed as-is (10410 bytes, md5 `3d1a78875d179f8588f71d34d01e9e59`). Whether the uninitialised byte
is zero depends on the heap layout down to the 4 `mvhd` creation-time bytes, so regenerating the file
is expected to produce a file that parses cleanly - keep this copy.

## `flv-duration-no-metadata.flv`

Generated using `generate-flv-duration-no-metadata.sh`. Fully synthetic: ffmpeg's `testsrc2`
pattern plus a generated sine tone, muxed as Sorenson Spark video + MP3 audio (2.41 MiB, 60 s).

The two unusual properties are what make it a reproducer for
[issue #164](https://github.com/buzz/mediainfo.js/issues/164): without an `onMetaData` tag, and
with the file above 2 MiB, MediaInfoLib has to recover the duration by walking FLV tags backwards
from the end of the file, which needs several seeks. Announcing those seeks with the known file
size aborts the walk and drops Duration, OverallBitRate and StreamSize.

Committed as-is (2523204 bytes, md5 `839903b35fe4528bd90400ebb4156b9d`). Regenerating it with
another ffmpeg version may produce a different byte layout and thus no longer trigger the bug.


## `freeMXF-mxf1.mxf`

Taken from http://freemxf.org/samples/index.html.

## `id3_char_encodings.mp3`

Generated with `generate-id3_char_encodings.sh` (ffmpeg + mutagen): one second of silence carrying
four ID3v2.3 text frames, one per frame encoding.

| Frame | Encoding   | Field      |
|-------|------------|------------|
| TIT2  | UTF-8      | Title      |
| TPE1  | Latin-1    | Performer  |
| TALB  | UTF-16+BOM | Album      |
| TCON  | UTF-16BE   | Genre      |

Every frame holds the same non-ASCII text. The WASM build of MediaInfoLib returns the UTF-8 frame
only; Latin-1 comes back mangled and the two UTF-16 frames come back as `binary.base64`, which is
the symptom of [issue #150](https://github.com/buzz/mediainfo.js/issues/150).

Committed as-is (6400 bytes, md5 `9ad305f22be7e4566c225b857ae570c3`). The audio payload does not
matter, only the tag bytes do.

## `many_tracks.mp4`

Generated using [HandBrake](https://handbrake.fr/). Based on [*Big Buck Bunny*](https://peach.blender.org/), licensed under [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/).

## `sample.mkv`

Taken from https://github.com/sbraz/pymediainfo.

## `test-sample-320x240-29.970fps-14.014s.m1v`

Generated using `generate-test-sample-320x240-29.970fps-14.014s.m1v.sh`.

## `test-sample-636x360-25fps-53.76s.mp4`

Generated using `generate-test-sample-636x360-25fps-53.76s.mp4.sh`.
