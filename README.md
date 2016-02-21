# MediaInfo Javascript port



## Build

Make sure the [emscripten](http://emscripten.org/) tools can be found
in `PATH`. Something like this will do:

    source ~/programs/emsdk_portable/emsdk_env.sh

Then build `mediainfo.js` using:

    ./build.sh

This will download MediaInfo and its dependencies and build
everything. The resulting files are `mediainfo.js` and
`mediainfo.js.mem`.

## License

This program is freeware under BSD-2-Clause license conditions: https://mediaarea.net/nn/MediaInfo/License

This product uses [MediaInfo](http://mediaarea.net/MediaInfo) library, Copyright (c) 2002-2015
[MediaArea.net SARL](mailto:Info@MediaArea.net).
