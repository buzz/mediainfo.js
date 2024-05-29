import { usePluginData } from '@docusaurus/useGlobalData'

import { isObject } from '@site/src/utils'

interface VersionInfo {
  MediaInfoLib: string
  mediainfoJs: string
}

function isVersionInfo(thing: unknown): thing is VersionInfo {
  return isObject(thing) && Object.values(thing).every((value) => typeof value === 'string')
}

function useVersionInfo() {
  const maybeVersionInfo = usePluginData('extract-versions')
  return isVersionInfo(maybeVersionInfo)
    ? maybeVersionInfo
    : { MediaInfoLib: 'Unknown', mediainfoJs: 'Unknown' }
}

export default useVersionInfo
