import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    globalSetup: './setup.ts',
    setupFiles: ['./toBeNear.ts'],
    environment: 'node',
    include: ['__tests__/**/*.test.ts'],
    exclude: ['node_modules/**/*'],
    watch: false,
  }
})
