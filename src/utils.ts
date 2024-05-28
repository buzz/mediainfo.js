function isObject(thing: unknown): thing is Record<string, unknown> {
  return typeof thing === 'object' && thing !== null
}

function isError(thing: unknown): thing is Error {
  return isObject(thing) && thing.message === 'string'
}

export { isError, isObject }
