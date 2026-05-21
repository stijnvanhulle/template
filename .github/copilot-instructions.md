# Copilot Instructions

See [AGENTS.md](../AGENTS.md) for the canonical guidance.

## Quick reference

- **Stack:** TypeScript (ESM, strict), pnpm workspaces, Turborepo, tsdown, Vitest 4
- **Linter / formatter:** oxlint + oxfmt (not ESLint / Prettier)
- **Versioning:** Changesets
- **Node / pnpm:** `>=22` / `>=11`

## Before opening a PR

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm test
```

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`). For any change to a published package, run `pnpm changeset` and commit the generated file.
