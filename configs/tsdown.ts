import type { UserConfig } from 'tsdown'

/**
 * The ESM build every package has, with declarations.
 * `deps` replaces the default, which keeps `@stijnvanhulle/*` external and bundles the private `@internals/*`.
 */
export function packageBuilds({
  entry = { index: 'src/index.ts' },
  deps = { neverBundle: [/^@stijnvanhulle\//], alwaysBundle: [/@internals/], onlyBundle: false },
}: Pick<UserConfig, 'entry' | 'deps'> = {}): Array<UserConfig> {
  return [
    {
      entry,
      format: 'esm',
      dts: true,
      platform: 'node',
      tsconfig: 'tsconfig.src.json',
      sourcemap: true,
      shims: true,
      exports: true,
      fixedExtension: false,
      deps,
      outputOptions: { keepNames: true },
    },
  ]
}
