---
sidebar_position: 1
description: 'Use a CDN or install via npm.'
---

# Installation

## Bundler

Install mediainfo.js using a package manager of your choice.

```sh
$ npm install mediainfo.js
```

### WASM file loading

When calling [`mediaInfoFactory()`](/api/function/mediaInfoFactory), the WASM file is automatically
loaded. By default, it is searched for in the parent directory relative to the script file, aligning
with the package distribution structure. This setup works out-of-the-box for the CDN version.

When using a bundler:

- Ensure the file `node_modules/mediainfo.js/dist/MediaInfoModule.wasm` is accessible by the web
  server. The steps to achieve this depend on your framework and project setup. The simplest method
  is to copy the file to your `static` files folder.

- The [`locateFile`](/api/interface/MediaInfoFactoryOptions#locateFile) option allows you to adjust
  the location from which the WASM file is loaded.

:::tip
Refer to the [examples page](/docs/category/examples) for instructions on using different
frameworks.
:::

## CDN

For simple projects you might want to use the CDN version of mediainfo.js. Just add the `script` tag
to your website.

```html
<script type="text/javascript" src="https://unpkg.com/mediainfo.js"></script>
```

:::note
Users of the CDN version do not need to manage WASM file loading, as it is preconfigured to load
from the CDN server.
:::
