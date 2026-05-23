# Coding style

Repository conventions that always apply. For the workflows beyond these conventions, reach
for the skills: `pr` (PR prep and checklist), `testing` (CI and test troubleshooting), and
`changelog` (release notes and changesets).

## Repository facts

- Monorepo managed by pnpm workspaces and Turborepo
- ESM-only (`type: "module"` across the repo)
- Node 22, pnpm 11+
- oxlint (lint), oxfmt (format), tsdown (bundle), Vitest (test), Changesets (versioning)

## Style

- Single quotes, no semicolons
- Prefer functional patterns
- Keep ternaries one level deep; for nested conditions use if/else or extract a helper

## Naming

| Context                | Convention  |
| ---------------------- | ----------- |
| File / directory names | `camelCase` |
| Variables / functions  | `camelCase` |
| Types / interfaces     | `PascalCase`|
| React components        | `PascalCase`|

## TypeScript

- Module resolution `"bundler"`, ESM only
- Never use `any` or `as any`; use proper types, generics, or `unknown`/`never`
- `.ts` for libraries, `.tsx` for React, `.vue` for Vue components
- DTS output is managed by tsdown
- Use module-level import statements, not inline type imports
- Expose the public API through the `"exports"` map and `typesVersions`; keep it stable
- Define types at the file root, not inside functions
- Use function syntax (not arrow functions) for object methods so `this` works

## Tests

- Location: `*.test.ts` or `*.test.tsx` in `src` folders
- Run all with `pnpm test`, one with `pnpm test "<name>"`, update snapshots with `-u`
- Add or update tests for every code change and keep the suite green
- After moving files or changing imports, run `pnpm lint && pnpm typecheck`
