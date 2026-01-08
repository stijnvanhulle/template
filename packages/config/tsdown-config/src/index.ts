import type { Config } from 'tsdown'

export const bannerCJS: Config['banner'] = {}

export const bannerESM: Config['banner'] = {
  /**
   * @link https://stackoverflow.com/questions/31931614/require-is-not-defined-node-js
   */
  js: `
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url);
  `,
}

export const options: Config = {
  entry: ['src/index.ts'],
  treeshake: true,
  sourcemap: true,
  minify: false,
  clean: true,
  platform: 'node',
  shims: true,
}

export const optionsESM: Config = {
  ...options,
  format: 'esm',
  dts: true,
  splitting: false,
  banner: bannerESM,
}

export const optionsCJS: Config = {
  ...options,
  format: 'cjs',
  dts: true,
  banner: bannerCJS,
  splitting: false,
}
