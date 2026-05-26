import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    conditions: ['development', 'import', 'module', 'node', 'default'],
  },
  test: {
    include: ['**/*.bench.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/mocks/**'],
    benchmark: {
      include: ['**/*.bench.ts'],
    },
  },
})
