/**
 * Used for the `flatConfig` (new)
 * @link https://eslint.org/docs/latest/use/configure/configuration-files-new
 * @example `ESLINT_USE_FLAT_CONFIG=true eslint`
 */

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// configs
import config from '@stijnvanhulle/eslint-config/flat'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  config.configs.recommended,
  config.configs.tests,
  config.configs.build,
  {
    files: ['packages/**'],
    ignores: ['vitest.config.ts', 'vite.config.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
        project: ['./packages/*/tsconfig.json', './packages/config/*/tsconfig.json'],
      },
    },
  },
]
