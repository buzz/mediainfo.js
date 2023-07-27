export function isErrorObject(error: unknown): error is Error {
  return Boolean(error) && typeof error === 'object' && 'message' in (error as object)
}
