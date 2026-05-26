---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.vue"
---

# Coding style

Conventions for code in this repo. Repo setup and tooling are in AGENTS.md. For release
workflows, see the `changelog` and `pr` skills. For test authoring and CI, see the `testing`
rule.

## Style

- Single quotes, no semicolons
- Prefer functional patterns
- Keep ternaries one level deep. For nested conditions use if/else or extract a helper

## Naming

| Context                | Convention  |
| ---------------------- | ----------- |
| File / directory names | `camelCase` |
| Variables / functions  | `camelCase` |
| Types / interfaces     | `PascalCase`|
| React components        | `PascalCase`|

## TypeScript

- Module resolution `"bundler"`, ESM only
- Never use `any` or `as any`. Use proper types, generics, or `unknown`/`never`
- `.ts` for libraries, `.tsx` for React, `.vue` for Vue components
- DTS output is managed by tsdown
- Use module-level import statements, not inline type imports
- Expose the public API through the `"exports"` map and `typesVersions`. Keep it stable
- Define types at the file root, not inside functions
- Use function syntax (not arrow functions) for object methods so `this` works
- Use `type` instead of `interface`. Reserve `interface` for declaration merging, like
  augmenting a global in a `.d.ts`
- When a function takes two or more parameters, pass a single object instead of positional
  arguments

## Tests

- Add or update tests for every code change and keep the suite green
- After moving files or changing imports, run `pnpm lint && pnpm typecheck`
- See the `testing` rule for authoring conventions and how to run the suite
