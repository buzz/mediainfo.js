---
sidebar_position: 2
description: 'Learn how to instantiate MediaInfo and analyze files.'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Usage

## Factory function `mediaInfoFactory`

Instantiate [`MediaInfo`][MediaInfo] by utilizing the factory function
[`mediaInfoFactory`][mediaInfoFactory]. This function manages the loading of the WASM file and can
be invoked with either a callback or asynchronously. Ensure to close the [`MediaInfo`][MediaInfo]
instance using the [`close()`][close] method when finished, instead of instantiating and closing it
repeatedly. Retain the instance for the duration of its required usage.

<Tabs groupId="call-method">
  <TabItem value="async" label="Async" default>
    ```js
    import mediaInfoFactory from 'mediainfo.js';

    const mediainfo = await mediaInfoFactory();
    const result = mediainfo.analyzeData(...);
    mediainfo.close();
    ```
  </TabItem>
  <TabItem value="promise" label="Promise">
    ```js
    import mediaInfoFactory from 'mediainfo.js';

    mediaInfoFactory().then((mediainfo) => {
      const result = mediainfo.analyzeData(...);
      mediainfo.close();
    });
    ```
  </TabItem>
  <TabItem value="callback" label="Callback">
    ```js
    import mediaInfoFactory from 'mediainfo.js';

    mediaInfoFactory({}, (mediainfo) => {
      const result = mediainfo.analyzeData(...);
      mediainfo.close();
    });
    ```
  </TabItem>
</Tabs>

### Options

You can configure the [`MediaInfo`][MediaInfo] instance using
[`MediaInfoFactoryOptions`][MediaInfoFactoryOptions].

Notable options include:

- `format`: See [result output format](#result) for details.
- `full`: Enables the display of all internal tags.
- `locateFile`: Customizes the path for loading the WASM file.

## `MediaInfo` object

[`analyzeData`][analyzeData] is provided as a convenient wrapper around the more low-level methods
of the [`MediaInfo`][MediaInfo] object. It supports asynchronous invocation or callbacks and
operates on chunks of [`Uint8Array`][Uint8Array]. Ensure to provide the following arguments:

- `size`: The file size, which can be either a number or a function returning a number.
- `readChunk`: Reads a data chunk from the file, returning an [`Uint8Array`][Uint8Array]. This
  function can also be asynchronous.

<Tabs groupId="call-method">
  <TabItem value="async" label="Async" default>
    ```js
    const someBlob = ...;

    const fileSize = 123456;

    async function readChunk(chunkSize, offset) {
      const buffer = await someBlob.slice(offset, offset + chunkSize).arrayBuffer();
      return new Uint8Array(buffer);
    }

    const result = await mediaInfo.analyzeData(fileSize, readChunk);
    ```
  </TabItem>
  <TabItem value="promise" label="Promise">
    ```js
    const someBlob = ...;

    const fileSize = 123456;

    function readChunk(chunkSize, offset) {
      return new Promise((resolve) => {
        someBlob
          .slice(offset, offset + chunkSize)
          .arrayBuffer()
          .then((buffer) => {
            resolve(new Uint8Array(buffer))
          });
      });
    }

    mediaInfo.analyzeData(fileSize, readChunk).then((result) => {
      // ...
    });
    ```
  </TabItem>
  <TabItem value="callback" label="Callback">
    ```js
    const someBlob = ...;

    const fileSize = 123456;

    function readChunk(chunkSize, offset) {
      return new Promise((resolve) => {
        someBlob
          .slice(offset, offset + chunkSize)
          .arrayBuffer()
          .then((buffer) => {
            resolve(new Uint8Array(buffer))
          });
      });
    }

    mediaInfo.analyzeData(fileSize, readChunk, (result) => {
      // ...
    });
    ```
  </TabItem>
</Tabs>

## Result

Choose the result output format by using the `format` option on the
[`mediaInfoFactory`][mediaInfoFactory] function.

Possible values: `object` (default), `JSON`, `XML`, `HTML`, `text`.

Media files may contain multiple [tracks][Track] of types such as [`General`][GeneralTrack],
[`Video`][VideoTrack], [`Audio`][AudioTrack], [`Text`][TextTrack], [`Image`][ImageTrack],
[`Menu`][MenuTrack], or [`Other`][OtherTrack].

:::tip
For a comprehensive list of possible fields, consult the [API documentation](/api).
:::

### Output as JavaScript object

The default output format `object` returns the result as a JavaScript object. This is typically the
most useful option.

:::note
The library including the [result object][MediaInfoResult] is fully typed to enhance the developer
experience in supported editors.
:::

### String output

The remaining output options return the result as a string.

<details>
  <summary>String result formats</summary>
  <div>
    <Tabs>
      <TabItem value="JSON" label="JSON" default>
      ```json
      {
        "creatingLibrary": { "name": "MediaInfoLib", "version": "24.04", "url": "https://mediaarea.net/MediaInfo" },
        "media": {
          "@ref": "",
          "track": [
            {
              "@type": "General",
              "AudioCount": "1",
              "ImageCount": "1",
              "Format": "MPEG Audio",
              "FileSize": "6357777",
              "Duration": "203.493",
              "OverallBitRate_Mode": "VBR",
              "OverallBitRate": "243044",
              "StreamSize": "175116",
              "Title": "Povo Que Caís Descalço",
              "Album": "CC Affiliates Mixtape #1",
              "Album_Performer": "Creative Commons",
              "Track": "Povo Que Caís Descalço",
              "Track_Position": "1",
              "Compilation": "Yes",
              "Performer": "Dead Combo",
              "Genre": "International",
              "Recorded_Date": "2017-03-03 15:14:12 UTC",
              "Encoded_Library": "LAME3.99r",
              "Copyright": "Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/",
              "Cover": "Yes",
              "Cover_Mime": "image/jpeg",
              "Comment": "URL: http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/"
            },
            {
              "@type": "Audio",
              "Format": "MPEG Audio",
              "Format_Version": "1",
              "Format_Profile": "Layer 3",
              "Format_Settings_Mode": "Joint stereo",
              "Duration": "203.494",
              "BitRate_Mode": "VBR",
              "BitRate": "243044",
              "BitRate_Minimum": "32000",
              "Channels": "2",
              "SamplesPerFrame": "1152",
              "SamplingRate": "44100",
              "SamplingCount": "8974080",
              "FrameRate": "38.281",
              "FrameCount": "7790",
              "Compression_Mode": "Lossy",
              "StreamSize": "6182244",
              "Encoded_Library": "LAME3.99r",
              "Encoded_Library_Settings": "-m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32"
            },
            {
              "@type": "Image",
              "Format": "JPEG",
              "Width": "800",
              "Height": "800",
              "ColorSpace": "YUV",
              "ChromaSubsampling": "4:4:4",
              "BitDepth": "8",
              "Compression_Mode": "Lossy",
              "StreamSize": "142880"
            }
          ]
        }
      }
      ```
      </TabItem>
      <TabItem value="XML" label="XML">
      ```
      <?xml version="1.0" encoding="UTF-8"?>
      <MediaInfo xmlns="https://mediaarea.net/mediainfo"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://mediaarea.net/mediainfo https://mediaarea.net/mediainfo/mediainfo_2_0.xsd" version="2.0">
        <creatingLibrary version="24.04" url="https://mediaarea.net/MediaInfo">MediaInfoLib</creatingLibrary>
        <media ref="">
          <track type="General">
            <AudioCount>1</AudioCount>
            <ImageCount>1</ImageCount>
            <Format>MPEG Audio</Format>
            <FileSize>6357777</FileSize>
            <Duration>203.493</Duration>
            <OverallBitRate_Mode>VBR</OverallBitRate_Mode>
            <OverallBitRate>243044</OverallBitRate>
            <StreamSize>175116</StreamSize>
            <Title>Povo Que Caís Descalço</Title>
            <Album>CC Affiliates Mixtape #1</Album>
            <Album_Performer>Creative Commons</Album_Performer>
            <Track>Povo Que Caís Descalço</Track>
            <Track_Position>1</Track_Position>
            <Compilation>Yes</Compilation>
            <Performer>Dead Combo</Performer>
            <Genre>International</Genre>
            <Recorded_Date>2017-03-03 15:14:12 UTC</Recorded_Date>
            <Encoded_Library>LAME3.99r</Encoded_Library>
            <Copyright>Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/</Copyright>
            <Cover>Yes</Cover>
            <Cover_Mime>image/jpeg</Cover_Mime>
            <Comment>URL: http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/</Comment>
          </track>
          <track type="Audio">
            <Format>MPEG Audio</Format>
            <Format_Version>1</Format_Version>
            <Format_Profile>Layer 3</Format_Profile>
            <Format_Settings_Mode>Joint stereo</Format_Settings_Mode>
            <Duration>203.494</Duration>
            <BitRate_Mode>VBR</BitRate_Mode>
            <BitRate>243044</BitRate>
            <BitRate_Minimum>32000</BitRate_Minimum>
            <Channels>2</Channels>
            <SamplesPerFrame>1152</SamplesPerFrame>
            <SamplingRate>44100</SamplingRate>
            <SamplingCount>8974080</SamplingCount>
            <FrameRate>38.281</FrameRate>
            <FrameCount>7790</FrameCount>
            <Compression_Mode>Lossy</Compression_Mode>
            <StreamSize>6182244</StreamSize>
            <Encoded_Library>LAME3.99r</Encoded_Library>
            <Encoded_Library_Settings>-m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32</Encoded_Library_Settings>
          </track>
          <track type="Image">
            <Format>JPEG</Format>
            <Width>800</Width>
            <Height>800</Height>
            <ColorSpace>YUV</ColorSpace>
            <ChromaSubsampling>4:4:4</ChromaSubsampling>
            <BitDepth>8</BitDepth>
            <Compression_Mode>Lossy</Compression_Mode>
            <StreamSize>142880</StreamSize>
          </track>
        </media>
      </MediaInfo>
      ```
      </TabItem>
      <TabItem value="HTML" label="HTML">
      ```html
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </head>
        <body>
          <table width="100%" border="0" cellpadding="1" cellspacing="2" style="border: 1px solid Navy">
            <tr>
              <td width="150"><h2>General</h2></td>
            </tr>
            <tr>
              <td><i>Format :</i></td>
              <td colspan="3">MPEG Audio</td>
            </tr>
            <tr>
              <td><i>File size :</i></td>
              <td colspan="3">6.06 MiB</td>
            </tr>
            <tr>
              <td><i>Duration :</i></td>
              <td colspan="3">3 min 23 s</td>
            </tr>
            <tr>
              <td><i>Overall bit rate mode :</i></td>
              <td colspan="3">Variable</td>
            </tr>
            <tr>
              <td><i>Overall bit rate :</i></td>
              <td colspan="3">243 kb/s</td>
            </tr>
            <tr>
              <td><i>Album :</i></td>
              <td colspan="3">CC Affiliates Mixtape #1</td>
            </tr>
            <tr>
              <td><i>Album/Performer :</i></td>
              <td colspan="3">Creative Commons</td>
            </tr>
            <tr>
              <td><i>Track name :</i></td>
              <td colspan="3">Povo Que Caís Descalço</td>
            </tr>
            <tr>
              <td><i>Track name/Position :</i></td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td><i>Compilation :</i></td>
              <td colspan="3">Yes</td>
            </tr>
            <tr>
              <td><i>Performer :</i></td>
              <td colspan="3">Dead Combo</td>
            </tr>
            <tr>
              <td><i>Genre :</i></td>
              <td colspan="3">International</td>
            </tr>
            <tr>
              <td><i>Recorded date :</i></td>
              <td colspan="3">2017-03-03 15:14:12 UTC</td>
            </tr>
            <tr>
              <td><i>Writing library :</i></td>
              <td colspan="3">LAME3.99r</td>
            </tr>
            <tr>
              <td><i>Copyright :</i></td>
              <td colspan="3">Attribution-NonCommercial 3.0 International: http://creativecommons.org/licenses/by-nc/3.0/</td>
            </tr>
            <tr>
              <td><i>Cover :</i></td>
              <td colspan="3">Yes</td>
            </tr>
            <tr>
              <td><i>Cover MIME :</i></td>
              <td colspan="3">image/jpeg</td>
            </tr>
            <tr>
              <td><i>Comment :</i></td>
              <td colspan="3">
                URL:
                http://freemusicarchive.org/music/Dead_Combo/Creative_Commons_The_2015_Unofficial_Mixtape/01_Povo_Que_Cais_Descalco
                / Comments: http://freemusicarchive.org/ / Curator: Creative Commons / Copyright: Attribution-NonCommercial
                3.0 International: http://creativecommons.org/licenses/by-nc/3.0/
              </td>
            </tr>
          </table>
          <br />
          <table width="100%" border="0" cellpadding="1" cellspacing="2" style="border: 1px solid Navy">
            <tr>
              <td width="150"><h2>Audio</h2></td>
            </tr>
            <tr>
              <td><i>Format :</i></td>
              <td colspan="3">MPEG Audio</td>
            </tr>
            <tr>
              <td><i>Format version :</i></td>
              <td colspan="3">Version 1</td>
            </tr>
            <tr>
              <td><i>Format profile :</i></td>
              <td colspan="3">Layer 3</td>
            </tr>
            <tr>
              <td><i>Format settings :</i></td>
              <td colspan="3">Joint stereo</td>
            </tr>
            <tr>
              <td><i>Duration :</i></td>
              <td colspan="3">3 min 23 s</td>
            </tr>
            <tr>
              <td><i>Bit rate mode :</i></td>
              <td colspan="3">Variable</td>
            </tr>
            <tr>
              <td><i>Bit rate :</i></td>
              <td colspan="3">243 kb/s</td>
            </tr>
            <tr>
              <td><i>Minimum bit rate :</i></td>
              <td colspan="3">32.0 kb/s</td>
            </tr>
            <tr>
              <td><i>Channel(s) :</i></td>
              <td colspan="3">2 channels</td>
            </tr>
            <tr>
              <td><i>Sampling rate :</i></td>
              <td colspan="3">44.1 kHz</td>
            </tr>
            <tr>
              <td><i>Frame rate :</i></td>
              <td colspan="3">38.281 FPS (1152 SPF)</td>
            </tr>
            <tr>
              <td><i>Compression mode :</i></td>
              <td colspan="3">Lossy</td>
            </tr>
            <tr>
              <td><i>Stream size :</i></td>
              <td colspan="3">5.90 MiB (97%)</td>
            </tr>
            <tr>
              <td><i>Writing library :</i></td>
              <td colspan="3">LAME3.99r</td>
            </tr>
            <tr>
              <td><i>Encoding settings :</i></td>
              <td colspan="3">-m j -V 0 -q 0 -lowpass 22.1 --vbr-mt -b 32</td>
            </tr>
          </table>
          <br />
          <table width="100%" border="0" cellpadding="1" cellspacing="2" style="border: 1px solid Navy">
            <tr>
              <td width="150"><h2>Image</h2></td>
            </tr>
            <tr>
              <td><i>Format :</i></td>
              <td colspan="3">JPEG</td>
            </tr>
            <tr>
              <td><i>Width :</i></td>
              <td colspan="3">800 pixels</td>
            </tr>
            <tr>
              <td><i>Height :</i></td>
              <td colspan="3">800 pixels</td>
            </tr>
            <tr>
              <td><i>Color space :</i></td>
              <td colspan="3">YUV</td>
            </tr>
            <tr>
              <td><i>Chroma subsampling :</i></td>
              <td colspan="3">4:4:4</td>
            </tr>
            <tr>
              <td><i>Bit depth :</i></td>
              <td colspan="3">8 bits</td>
            </tr>
            <tr>
              <td><i>Compression mode :</i></td>
              <td colspan="3">Lossy</td>
            </tr>
            <tr>
              <td><i>Stream size :</i></td>
              <td colspan="3">140 KiB (100%) / 140 KiB (2%) / 140 KiB (2%) / 140 KiB (2%)</td>
            </tr>
          </table>
          <br />
        </body>
      </html>
      ```
      </TabItem>
      <TabItem value="text" label="text">
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
      </TabItem>
    </Tabs>
  </div>
</details>

  [MediaInfo]: /api/class/MediaInfo
  [MediaInfoResult]: /api/interface/MediaInfoResult
  [mediaInfoFactory]: /api/function/mediaInfoFactory
  [close]: /api/class/MediaInfo#close
  [MediaInfoFactoryOptions]: /api/interface/MediaInfoFactoryOptions
  [analyzeData]: /api/class/MediaInfo#analyzeData
  [Track]: /api#Track
  [GeneralTrack]: /api/interface/GeneralTrack
  [VideoTrack]: /api/interface/VideoTrack
  [AudioTrack]: /api/interface/AudioTrack
  [TextTrack]: /api/interface/TextTrack
  [ImageTrack]: /api/interface/ImageTrack
  [MenuTrack]: /api/interface/MenuTrack
  [OtherTrack]: /api/interface/OtherTrack
  [Uint8Array]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
