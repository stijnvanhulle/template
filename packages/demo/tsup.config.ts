import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  treeshake: true,
  sourcemap: true,
  minify: true,
  splitting: false,
  clean: true,
  dts: true,
  format: ["cjs", "esm", "iife"],
});
