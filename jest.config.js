module.exports = {
  testMatch: ['**/__tests__/**/*.test.js'],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/.eslintrc.js',
  ],
  verbose: true,
}
