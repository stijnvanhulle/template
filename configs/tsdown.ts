import type { UserConfig } from 'tsdown'

/**
 * The builds every package has: the ESM JavaScript, then its declarations.
 * `deps` replaces the default, which keeps `@stijnvanhulle/*` external and bundles the private `@internals/*`.
 */
export function packageBuilds({
  entry = { index: 'src/index.ts' },
  deps = { neverBundle: [/^@stijnvanhulle\//], alwaysBundle: [/@internals/], onlyBundle: false },
}: Pick<UserConfig, 'entry' | 'deps'> = {}): Array<UserConfig> {
  const shared: UserConfig = {
    entry,
    format: 'esm',
    platform: 'node',
    tsconfig: 'tsconfig.src.json',
    sourcemap: true,
    shims: true,
    fixedExtension: false,
    deps,
  }

  return [
    { ...shared, dts: false, exports: true, outputOptions: { keepNames: true } },
    // Declarations get their own build: `keepNames` leaks an untyped `__name` helper into .d.ts files.
    { ...shared, dts: { dtsOnly: true } },
  ]
}
