# Changelog

All notable changes to this project will be documented in this file.

:::note
Changes preceding version 0.2.0 are not included in the changelog.
:::

## [0.3.7](https://github.com/buzz/mediainfo.js/compare/v0.3.6...v0.3.7) (2026-01-18)


### Features

* replace embind with extern "C" ABI and adopt size-first WASM pipeline ([c6b843d](https://github.com/buzz/mediainfo.js/commit/c6b843df517bbcf139f1d661a8396a966f17dff1))


### Bug Fixes

* **examples:** use Vite asset pipeline over `vite-plugin-static-copy` ([26159f6](https://github.com/buzz/mediainfo.js/commit/26159f61828e6b5c0ae92035114aedd83883e19e)), closes [#183](https://github.com/buzz/mediainfo.js/issues/183)


### Upgrades

* **deps:** upgrade libmediainfo to v25.10 ([1442871](https://github.com/buzz/mediainfo.js/commit/14428713a6b35b60752140d55293d1c11926e1b7))

## [0.3.6](https://github.com/buzz/mediainfo.js/compare/v0.3.5...v0.3.6) (2025-08-31)


### Bug Fixes

* prevent multiple simultaneous analysis runs ([3b0c2cb](https://github.com/buzz/mediainfo.js/commit/3b0c2cb2e073c83902a748fd97c7cb01f424f03b)), closes [#173](https://github.com/buzz/mediainfo.js/issues/173)
* reset MediaInfo module instance before analyze ([2a9e587](https://github.com/buzz/mediainfo.js/commit/2a9e587a99824a9870373fb0e2c76aaf84589256)), closes [#177](https://github.com/buzz/mediainfo.js/issues/177)
* reset MediaInfoModule to its initial state ([3444be5](https://github.com/buzz/mediainfo.js/commit/3444be577d98df8432f03cf44061d41af8338fa9))


### Upgrades

* **deps:** upgrade libmediainfo to v25.07 ([66a1467](https://github.com/buzz/mediainfo.js/commit/66a14673015cfa2555a9853e6af47c33114c25f6))

## [0.3.5](https://github.com/buzz/mediainfo.js/compare/v0.3.4...v0.3.5) (2025-04-02)


### Upgrades

* **deps:** upgrade libmediainfo to v25.03 ([062a445](https://github.com/buzz/mediainfo.js/commit/062a44593cdf0c601e7137583ff3e1afbd9e07a9))

## [0.3.4](https://github.com/buzz/mediainfo.js/compare/v0.3.3...v0.3.4) (2024-12-14)


### Upgrades

* **deps:** upgrade libmediainfo to v24.12 ([9e79d67](https://github.com/buzz/mediainfo.js/commit/9e79d67a21284e9dc5445e017048d36223530e41))

## [0.3.3](https://github.com/buzz/mediainfo.js/compare/v0.3.2...v0.3.3) (2024-11-13)


### Upgrades

* **deps:** upgrade libmediainfo to v24.11 ([43512a4](https://github.com/buzz/mediainfo.js/commit/43512a4d958d20af971e3a77bcb90161bdc9420a))

## [0.3.2](https://github.com/buzz/mediainfo.js/compare/v0.3.1...v0.3.2) (2024-07-11)


### Upgrades

* **deps:** upgrade libmediainfo to v24.06 ([5de50e7](https://github.com/buzz/mediainfo.js/commit/5de50e7f0f9820151fda7cdeb3e78be677550ba4))

## [0.3.1](https://github.com/buzz/mediainfo.js/compare/v0.3.0...v0.3.1) (2024-06-01)


### Bug Fixes

* **deps:** support Node.js 18 ([dbbfbed](https://github.com/buzz/mediainfo.js/commit/dbbfbedc53d54bbf0e50a73be1a68cf9f01229f6)), closes [#155](https://github.com/buzz/mediainfo.js/issues/155)

## [0.3.0](https://github.com/buzz/mediainfo.js/compare/v0.2.2...v0.3.0) (2024-05-31)


### ⚠ BREAKING CHANGES

* Consumers of the library need to update their types.

### Features

* add interfaces and detailed descriptions for all track types ([69482a7](https://github.com/buzz/mediainfo.js/commit/69482a766f96e7ccade965d027c32e67bccf353e))
* also accept number as size argument ([4405da4](https://github.com/buzz/mediainfo.js/commit/4405da4a5347e1b3fec10af7bc52b65f81613f94))
* **build:** optimize WASM file size ([fa05a1a](https://github.com/buzz/mediainfo.js/commit/fa05a1ab684897d38b76d26211aa5fe488bd481c))
* **types:** move common track fields to `BaseTrack` ([e2b4c1a](https://github.com/buzz/mediainfo.js/commit/e2b4c1af84a09756ecb01887b3ac3e5c0719fb17))


### Upgrades

* **deps:** upgrade libmediainfo to v24.04 ([98531dd](https://github.com/buzz/mediainfo.js/commit/98531dd37def908d23e653ca9e7f3c603e08f836))
* **deps:** upgrade libmediainfo to v24.05 ([ee4ad2b](https://github.com/buzz/mediainfo.js/commit/ee4ad2b8974942402087bbac0be2aa3b96e0a126))

## [0.2.2](https://github.com/buzz/mediainfo.js/compare/v0.2.1...v0.2.2) (2024-02-28)


### Upgrades

* **deps:** upgrade libmediainfo to v24.01 ([63422ca](https://github.com/buzz/mediainfo.js/commit/63422ca1fef1295c0d4649b19f493ce1af4dc987))

## [0.2.1](https://github.com/buzz/mediainfo.js/compare/v0.2.0...v0.2.1) (2023-08-21)


### Features

* **umd:** add custom `locateFile` code that handles the CDN version (closes [#142](https://github.com/buzz/mediainfo.js/issues/142)) ([c223eb7](https://github.com/buzz/mediainfo.js/commit/c223eb7fb16355e2ae75febb183fd7107df1d77c))


### Bug Fixes

* **examples:** fix scope error in cli.ts ([cd044ff](https://github.com/buzz/mediainfo.js/commit/cd044ff82d46092eb765f2fdab7d1f8d47e824ba)), closes [/github.com/buzz/mediainfo.js/issues/136#issuecomment-1657697043](https://github.com/buzz//github.com/buzz/mediainfo.js/issues/136/issues/issuecomment-1657697043)

## [0.2.0](https://github.com/buzz/mediainfo.js/compare/v0.1.8...v0.2.0) (2023-07-28)


### ⚠ BREAKING CHANGES

* **types:** Consumers of the library may need to update their
type imports accordingly.

### Features

* **build:** add separate builds for UMD, CJS, and ESM ([c681079](https://github.com/buzz/mediainfo.js/commit/c6810790e4daf3b2168e84c0de368090a38f6254))
* **types:** generate typings for MediaInfo result object (closes [#117](https://github.com/buzz/mediainfo.js/issues/117)) ([57ca6f3](https://github.com/buzz/mediainfo.js/commit/57ca6f3ecbf7b75cdc7f8d977268da434b0b6047))
* **types:** proper type conversion from JSON result ([9b87930](https://github.com/buzz/mediainfo.js/commit/9b879303f956bb572d83776677328dcda3ab0fdc))

## [0.1.9](https://github.com/buzz/mediainfo.js/compare/v0.1.8...v0.1.9) (2022-12-15)

## [0.1.8](https://github.com/buzz/mediainfo.js/compare/v0.1.7...v0.1.8) (2022-07-23)

## [0.1.7](https://github.com/buzz/mediainfo.js/compare/v0.1.6...v0.1.7) (2021-10-19)

## [0.1.6](https://github.com/buzz/mediainfo.js/compare/v0.1.5...v0.1.6) (2021-09-02)

## [0.1.5](https://github.com/buzz/mediainfo.js/compare/v0.1.4...v0.1.5) (2021-03-10)

## [0.1.4](https://github.com/buzz/mediainfo.js/compare/v0.1.3...v0.1.4) (2020-08-21)

## [0.1.3](https://github.com/buzz/mediainfo.js/compare/v0.1.2...v0.1.3) (2020-08-07)

## [0.1.2](https://github.com/buzz/mediainfo.js/compare/v0.1.1...v0.1.2) (2020-06-14)

## [0.1.1](https://github.com/buzz/mediainfo.js/compare/v0.1.0...v0.1.1) (2020-06-13)

## [0.1.0](https://github.com/buzz/mediainfo.js/compare/v0.0.3...v0.1.0) (2020-06-12)

## [0.0.3](https://github.com/buzz/mediainfo.js/compare/v0.0.2...v0.0.3) (2020-03-19)

## [0.0.2](https://github.com/buzz/mediainfo.js/compare/v0.0.1...v0.0.2) (2016-12-21)

## [0.0.1](https://github.com/buzz/mediainfo.js/tree/v0.0.1) (2016-02-21)
