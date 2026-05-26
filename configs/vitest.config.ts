import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 30_000,
    exclude: ['**/node_modules/**', '**/dist/**', '**/mocks/**', '**/*.bench.ts'],
    coverage: {
      exclude: [
        '**/dist/**',
        '**/mocks/**',
        '**/configs/**',
        '**/scripts/**',
        '**/index.ts',
        '**/types.ts',
        '**/tests/**',
        '**/coverage/**',
        '**/__snapshots__/**',
        '**/packages/*/test?(s)/**',
        '**/*.d.ts',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/*.bench.ts',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsdown,build}.config.*',
        '**/.rc.{?(c|m)js,yml}',
      ],
    },
  },
  resolve: {
    conditions: ['development', 'import', 'module', 'node', 'default'],
  },
})
