import { createDefaultEsmPreset } from 'ts-jest'

import type { Config } from 'jest'

const jestConfig = {
  globalSetup: '<rootDir>/setup.ts',
  setupFilesAfterEnv: ['<rootDir>/toBeNear.ts'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
  ...createDefaultEsmPreset({
    tsconfig: 'tsconfig.json',
  }),
} satisfies Config

export default jestConfig
