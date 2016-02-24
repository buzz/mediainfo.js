# mediainfo.js

This is a JavaScript port of the excellent [MediaInfoLib](https://mediaarea.net/en/MediaInfo) and meant to be run directly in a browser. mediainfo.js was created using [Emscripten](http://emscripten.org/).

## Demo

Try it out in your browser:  [https://mediainfo.js.org](https://mediainfo.js.org)

## Build

Make sure the
[Emscripten tools](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)
can be found in `$PATH`. Something like this will do:

    source ~/programs/emsdk_portable/emsdk_env.sh

First you must build the dependencies:

    ./build-dev.sh

Then build `mediainfo.js` using:

    ./build.sh

The resulting files are `mediainfo.js` and `mediainfo.js.mem`.

## License

This program is freeware under BSD-2-Clause license conditions:
[https://mediaarea.net/nn/MediaInfo/License](https://mediaarea.net/nn/MediaInfo/License)

This product uses [MediaInfo](http://mediaarea.net/MediaInfo) library, Copyright (c) 2002-2015
[MediaArea.net SARL](mailto:Info@MediaArea.net).
