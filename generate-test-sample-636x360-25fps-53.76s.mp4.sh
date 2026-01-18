#!/bin/sh

ffmpeg \
  -f lavfi -i "testsrc=duration=53.76:size=636x360:rate=25" \
  -f lavfi -i "sine=frequency=440:sample_rate=44100:duration=53.76" \
  -map 0:v -map 1:a \
  -c:v libx264 -profile:v high -level 3.0 -pix_fmt yuv420p \
  -b:v 558k -x264-params "ref=3:cabac=1:keyint=250:bframes=3" -preset medium \
  -c:a aac -b:a 128k -ac 2 -ar 44100 \
  -movflags +faststart \
  test-sample-636x360-25fps-53.76s.mp4
