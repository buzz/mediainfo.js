/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    /**
     * Use `.toBeNear` when checking if a number is a given offset away from a given value.
     *
     * @param {Number} value
     * @param {Number} offset
     */
    toBeNear(value: number, offset: number): R
  }
}
