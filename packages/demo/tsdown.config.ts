import { defineConfig, type UserConfig } from 'tsdown'

const shared: Partial<UserConfig> = {
  platform: 'node',
  tsconfig: 'tsconfig.src.json',
  sourcemap: true,
  shims: true,
  exports: true,
  fixedExtension: false,
  deps: {
    // Other @stijnvanhulle/* packages resolve from npm at runtime — never bundle them.
    neverBundle: [/^@stijnvanhulle\//],
    // @internals/* packages are private and not published — inline them into the output.
    alwaysBundle: [/@internals/],
    onlyBundle: false,
  },
  outputOptions: {
    keepNames: true,
  },
}

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: 'esm',
    dts: true,
    ...shared,
  },
])
