// toBeNear by offset match from
// https://github.com/jest-community/jest-extended/pull/183/commits/dca63a359c9856c5c761cfc1a598f4d7e583978e

import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

const passMessage = (received: number, value: number, offset: number) => () =>
  matcherHint('.not.toBeNear', 'received', 'value', { secondArgument: 'offset' }) +
  '\n\n' +
  `Value:    ${printExpected(value)}\n` +
  `Offset:   ${printExpected(offset)}\n` +
  `Interval: [${printExpected(value - offset)}, ${printExpected(value + offset)}]\n` +
  `Received: ${printReceived(received)}`

const failMessage = (received: number, value: number, offset: number) => () =>
  matcherHint('.toBeNear', 'received', 'value', { secondArgument: 'offset' }) +
  '\n\n' +
  `Value:    ${printExpected(value)}\n` +
  `Offset:   ${printExpected(offset)}\n` +
  `Interval: [${printExpected(value - offset)}, ${printExpected(value + offset)}]\n` +
  `Received: ${printReceived(received)}`

expect.extend({
  toBeNear: (received: number, value: number, offset: number) => {
    const pass = Math.abs(received - value) <= offset
    if (pass) {
      return { pass: true, message: passMessage(received, value, offset) }
    }
    return { pass: false, message: failMessage(received, value, offset) }
  },
})
