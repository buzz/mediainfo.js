// toBeNear by offset match from
// https://github.com/jest-community/jest-extended/pull/183/commits/dca63a359c9856c5c761cfc1a598f4d7e583978e

import { expect } from 'vitest'

const passMessage = (received: number, value: number, offset: number) =>
  `Expected ${received} not to be within ${offset} of ${value} (interval [${value - offset}, ${value + offset}])`

const failMessage = (received: number, value: number, offset: number) =>
  `Expected ${received} to be within ${offset} of ${value} (interval [${value - offset}, ${value + offset}])`

expect.extend({
  toBeNear: function (received: number, value: number, offset: number) {
    const pass = Math.abs(received - value) <= offset
    if (pass) {
      return {
        pass: true,
        message: () => passMessage(received, value, offset),
      }
    }
    return {
      pass: false,
      message: () => failMessage(received, value, offset),
    }
  },
})
