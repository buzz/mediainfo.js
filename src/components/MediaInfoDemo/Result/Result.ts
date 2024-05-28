import type { MediaInfoType } from 'mediainfo.js'

import { isObject } from '@site/src/utils'

function isResult(thing: unknown): thing is Result {
  return isObject(thing) && typeof thing.name === 'string' && typeof thing.collapsed === 'boolean'
}

function isResults(thing: unknown): thing is Results {
  return isObject(thing) && Object.values(thing).every((result) => isResult(result))
}

interface Result extends MediaInfoType {
  name?: string
  error?: string
}

type Results = Record<string, Result>

export { isResult, isResults }
export type { Result, Results }
