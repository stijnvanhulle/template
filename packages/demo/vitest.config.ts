import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    dir: './src',
  },
  resolve: {
    conditions: ['development', 'import', 'module', 'node', 'default'],
  },
})
