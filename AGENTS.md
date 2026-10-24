# AGENTS.md

This repository is a pnpm TypeScript monorepo template.

## Architecture

- `packages/` contains publishable packages bundled with tsdown.
- `internals/` contains private workspace libraries.
- `configs/` contains shared TypeScript and Vitest configuration.
- Turborepo orchestrates builds, type checks, tests, linting, and cleanup.
- Changesets versions and publishes packages.

`AGENT.md` symlinks to this file.

## Toolchain

| Area | Choice |
| --- | --- |
| Runtime | Node.js 22 or newer |
| Package manager | pnpm 12 or newer |
| Modules | ESM |
| Language | Strict TypeScript |
| Build | tsdown |
| Tests | Vitest |
| Lint | oxlint |
| Format | oxfmt |
| Releases | Changesets |

## Commands

```bash
pnpm install
pnpm build
pnpm typecheck
pnpm test
pnpm lint
pnpm format
```

Run `pnpm build` after package source changes. Before a pull request, run format, lint, type
checks, and tests. Add a changeset for every user-visible package change.

## Changes

- Use ESM imports and exports.
- Keep publishable code in `packages/` and private shared code in `internals/`.
- Add tests alongside changed behavior.
- Use Conventional Commits.
- Do not edit generated output or the lockfile by hand.
- Do not weaken types, lint rules, or tests to make a change pass.

## Reusable agent workflows

Shared skills, rules, commands, and subagents are distributed from
[`stijnvanhulle/agents`](https://github.com/stijnvanhulle/agents). They are optional and are
not vendored into this template.
