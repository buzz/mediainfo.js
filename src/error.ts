function isError(error: unknown): error is Error {
  return (
    error !== null &&
    typeof error === 'object' &&
    Object.prototype.hasOwnProperty.call(error, 'message')
  )
}

function unknownToError(error: unknown): Error {
  return isError(error) ? error : new Error(typeof error === 'string' ? error : 'Unknown error')
}

export { unknownToError }
