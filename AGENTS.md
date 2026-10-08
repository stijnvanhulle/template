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

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
