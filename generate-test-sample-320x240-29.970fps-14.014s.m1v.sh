#!/bin/sh

ffmpeg \
  -f lavfi -i "testsrc=duration=13.981:size=320x240:rate=30000/1001" \
  -an \
  -c:v mpeg1video \
  -pix_fmt yuv420p \
  -b:v 320k -minrate 320k -maxrate 320k -bufsize 40k \
  -g 15 -bf 2 \
  -sc_threshold 1000000000 \
  -f mpeg1video \
  test-sample-320x240-29.970fps-14.014s.m1v
