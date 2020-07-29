module.exports = {
  globalSetup: '<rootDir>/__tests__/jestGlobalSetup.js',
  testMatch: ['**/__tests__/**/*.test.js'],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/.eslintrc.js',
  ],
  verbose: true,
}
