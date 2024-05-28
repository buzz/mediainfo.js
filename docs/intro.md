---
sidebar_position: 1
---

# Introduction

mediainfo.js is a web-compatible version of the [MediaInfoLib](https://mediaarea.net/MediaInfo), originally written in
C++. Compiled from C++ to [WebAssembly](https://webassembly.org/), mediainfo.js enables browser compatibility while also
supporting Node.js execution.

## What can mediainfo.js do for you?

mediainfo.js analyzes various media files and provides detailed information about them. While the
original MediaInfo program runs on computers or servers, mediainfo.js is designed for browser use.
It is a library that can be integrated into web or Node.js projects and also comes as a command-line
tool.

:::tip
Visit the [demo page](/demo) to try mediainfo.js yourself.
:::

### Example

<details>
  <summary>Click to view a sample MP3 file analysis.</summary>
  ```
  General
  Format                                   : MPEG Audio
  File size                                : 6.06 MiB
  Duration                                 : 3 min 23 s
  Overall bit rate mode                    : Variable
  Overall bit rate                         : 243 kb/s
  Album                                    : CC Affiliates Mixtape #1
  Album/Performer                          : Creative Commons
  Track name                               : Povo Que Caís Descalço
  Track name/Position                      : 1
  Compilation                              : Yes
  Performer                                : Dead Combo
  Genre                                    : International
  Recorded date                            : 2017-03-03 15:14:12 UTC
  Writing library                          : LAME3.99r
  Copyright                                : Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/
  Cover                                    : Yes
  Cover MIME                               : image/jpeg
  Comment                                  : URL: http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/

  Audio
  Format                                   : MPEG Audio
  Format version                           : Version 1
  Format profile                           : Layer 3
  Format settings                          : Joint stereo
  Duration                                 : 3 min 23 s
  Bit rate mode                            : Variable
  Bit rate                                 : 243 kb/s
  Minimum bit rate                         : 32.0 kb/s
  Channel(s)                               : 2 channels
  Sampling rate                            : 44.1 kHz
  Frame rate                               : 38.281 FPS (1152 SPF)
  Compression mode                         : Lossy
  Stream size                              : 5.90 MiB (97%)
  Writing library                          : LAME3.99r
  Encoding settings                        : -m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32

  Image
  Format                                   : JPEG
  Width                                    : 800 pixels
  Height                                   : 800 pixels
  Color space                              : YUV
  Chroma subsampling                       : 4:4:4
  Bit depth                                : 8 bits
  Compression mode                         : Lossy
  Stream size                              : 140 KiB (100%) / 140 KiB (2%) / 140 KiB (2%) / 140 KiB (2%)
  ```
</details>

## How to use mediainfo.js?

:::tip
Check out the [example page](/docs/category/examples).
:::

### JavaScript library

Typically, you would use mediainfo.js as a library for your web project. Depending on your needs,
you can integrate it with a web bundler or load it as a stand-alone file from a CDN or your web
server.

### Command-Line interace

mediainfo.js is also available as a CLI program. Install it as usual, and you're ready to go:

```sh
$ npm install mediainfo.js
$ mediainfo.js video.mp4
```

This is useful when you can't install programs on your server but can use NPM packages.
