import type MediaInfo from './MediaInfo'
import type { FormatType, GetSizeFunc, ReadChunkFunc, ResultMap } from './MediaInfo'
import MediaInfoFactory, { type MediaInfoFactoryOptions } from './MediaInfoFactory'
import type { CreationType, ExtraType, TrackType, MediaType, MediaInfoType } from './MediaInfoType'

export type {
  FormatType,
  GetSizeFunc,
  MediaInfo,
  MediaInfoFactoryOptions,
  ReadChunkFunc,
  ResultMap,
  CreationType,
  ExtraType,
  TrackType,
  MediaType,
  MediaInfoType,
}
export default MediaInfoFactory
