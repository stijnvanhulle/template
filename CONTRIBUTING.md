# Contributing

Thanks for considering a contribution. A few ways to get involved:

- Found a bug? File it in the [issue tracker](https://github.com/stijnvanhulle/template/issues).
- Have an idea? [Open an issue](https://github.com/stijnvanhulle/template/issues/new) to share it.

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Be respectful and open-minded, search the [issue tracker](https://github.com/stijnvanhulle/template/issues) before opening a PR, and for opinion-driven changes open an issue first.

## Prerequisites

- Node.js 22 or newer
- pnpm 11 or newer. The repo pins a version in `packageManager`, so the easiest way to match it is `corepack enable` and let Corepack pick the right pnpm
- Git

## Getting started

Fork the repo, then clone your fork and install:

```bash
gh repo fork stijnvanhulle/template --clone   # or: git clone https://github.com/stijnvanhulle/template.git
cd template
pnpm install
pnpm build
```

`pnpm build` compiles every package with tsdown. Run it once after install so local packages resolve each other, and again after you change package source.

## What is inside this repo

```
.
├── packages/            # Publishable packages (core, demo)
├── internals/           # Internal, non-published packages (utils)
├── configs/             # Shared TypeScript bases and Vitest config
├── plans/               # Spec-driven workflow (templates and per-feature folders)
├── tools/claude/        # Shared agent toolset (skills, commands, code-reviewer agent), packaged as the toolkit plugin
├── .changeset/          # Changeset configuration
├── .agents/skills/      # Cross-provider agent skills
├── .claude/             # Claude rules, commands, agents, output styles, hooks
└── .github/             # Issue templates, setup action, CI workflows
```

Publishable code lives in `packages/`, internal helpers that never ship live in `internals/`, and shared build and test config lives in `configs/`. A Turborepo pipeline orchestrates build, test, lint, and typecheck across the workspace.

## Tech stack

| Tool | Purpose |
|---|---|
| [TypeScript](https://www.typescriptlang.org/) | Primary language (strict, ESM only) |
| [pnpm](https://pnpm.io/) | Package manager with workspaces |
| [Turborepo](https://turbo.build/) | Monorepo task runner |
| [tsdown](https://github.com/sxzz/tsdown) | Bundler and `.d.ts` generation |
| [Vitest](https://vitest.dev/) | Testing |
| [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Linter |
| [oxfmt](https://github.com/oxc-project/oxfmt) | Formatter |
| [Changesets](https://github.com/changesets/changesets) | Versioning and changelogs |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |

## Commands

```bash
pnpm build          # Build all packages with tsdown
pnpm clean          # Remove build artifacts
pnpm test           # Run tests once
pnpm test:watch     # Run tests in watch mode
pnpm test:bench     # Run performance benchmarks
pnpm typecheck      # Type-check all packages
pnpm lint           # Lint with oxlint
pnpm lint:fix       # Lint and auto-fix
pnpm format         # Format with oxfmt
pnpm changeset      # Create a changeset
pnpm upgrade        # Bump dependencies with taze
```

To run a single package's tests, point Vitest at its folder:

```bash
pnpm vitest run --config ./configs/vitest.config.ts packages/core
pnpm vitest run --config ./configs/vitest.config.ts -u packages/core   # update snapshots
```

## Development workflow

1. Create a branch from `main`.
2. Make your change, with tests for new behavior.
3. Build and verify locally with `pnpm build && pnpm typecheck && pnpm test`.
4. Fix style with `pnpm format && pnpm lint:fix`.

## Opening a pull request

1. Run the full check locally first:

   ```bash
   pnpm format && pnpm lint:fix
   pnpm typecheck
   pnpm test
   ```

2. Add a changeset for any change that affects a published package (see below).
3. Commit with [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`.
4. Push your branch and open a PR against `main`, then fill out the template.

### Changesets

Changesets drive versioning and the changelog. When your change affects a published package, run:

```bash
pnpm changeset
```

Pick the packages you changed, choose the bump (patch for fixes, minor for features, major for breaking changes), and write a short summary aimed at users. Commit the generated file under `.changeset/`. Docs-only or internal changes that touch no published package do not need one.
