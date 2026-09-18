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

## `freeMXF-mxf1.mxf`

Taken from http://freemxf.org/samples/index.html.

## `many_tracks.mp4`

Generated using [HandBrake](https://handbrake.fr/). Based on [*Big Buck Bunny*](https://peach.blender.org/), licensed under [Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/).

## `sample.mkv`

Taken from https://github.com/sbraz/pymediainfo.

## `test-sample-320x240-29.970fps-14.014s.m1v`

Generated using `generate-test-sample-320x240-29.970fps-14.014s.m1v.sh`.

## `test-sample-636x360-25fps-53.76s.mp4`

Generated using `generate-test-sample-636x360-25fps-53.76s.mp4.sh`.
