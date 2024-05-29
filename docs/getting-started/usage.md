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
    const result = mediainfo.analyzeFile(...);
    mediainfo.close();
    ```
  </TabItem>
  <TabItem value="promise" label="Promise">
    ```js
    import mediaInfoFactory from 'mediainfo.js';

    mediaInfoFactory().then((mediainfo) => {
      const result = mediainfo.analyzeFile(...);
      mediainfo.close();
    });
    ```
  </TabItem>
  <TabItem value="callback" label="Callback">
    ```js
    import mediaInfoFactory from 'mediainfo.js';

    mediaInfoFactory({}, (mediainfo) => {
      const result = mediainfo.analyzeFile(...);
      mediainfo.close();
    });
    ```
  </TabItem>
</Tabs>

### Options

You can configure the [`MediaInfo`][MediaInfo] instance using
[`MediaInfoFactoryOptions`][MediaInfoFactoryOptions].

Notable options include:

- `format`: The default and typically most useful option is `object`.
- `full`: Enables the display of all internal tags.
- `locateFile`: Customizes the path for loading the WASM file.

## `MediaInfo` object

[`analyzeData`][analyzeData] is provided as a convenient wrapper around the more low-level methods
of the [`MediaInfo`][MediaInfo] object. It supports asynchronous invocation or callbacks and
operates on chunks of [`Uint8Array`][Uint8Array]. Ensure to provide the following arguments:

- `size`: The file size, which can be either a number or a function returning a number.
- `readChunk`: Reads a data chunk from the file, returning a [`Uint8Array`][Uint8Array]. This
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

The [`analyzeData`][analyzeData] method returns a [`MediaInfoType`][MediaInfoType]. Files may
contain multiple [tracks][TrackType] of types such as `General`, `Video`, `Audio`, `Text`, `Image`,
`Chapters`, `Menu`, or `Other`.

For a comprehensive list of possible fields, consult the [API documentation][TrackType].

:::note
The library is fully typed to enhance the developer experience in supported editors.
:::

  [MediaInfo]: /api/class/MediaInfo
  [mediaInfoFactory]: /api/function/mediaInfoFactory
  [close]: /api/class/MediaInfo#close
  [MediaInfoFactoryOptions]: /api/interface/MediaInfoFactoryOptions
  [analyzeData]: /api/class/MediaInfo#analyzeData
  [MediaInfoType]: /api/interface/MediaInfoType
  [TrackType]: /api/interface/TrackType
  [Uint8Array]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
