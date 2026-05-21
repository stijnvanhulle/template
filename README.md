<div align="center">

  <h1>Template</h1>

  <p>
    A modern TypeScript monorepo template — pnpm workspaces, Turborepo, oxlint, oxfmt, tsdown, Vitest and Changesets.
  </p>

  <h4>
    <a href="https://github.com/stijnvanhulle/template/issues/">Report Bug</a>
    <span> · </span>
    <a href="https://github.com/stijnvanhulle/template/issues/">Request Feature</a>
  </h4>
</div>

<br />

## About

A drop-in monorepo starter. Fork it, rename a few fields, and you have a
production-ready repository with build, test, lint, format, release and CI
already wired up.

## What's inside

| Tool | Purpose |
|---|---|
| [pnpm](https://pnpm.io/) | Workspaces + dependency catalog |
| [Turborepo](https://turbo.build/) | Monorepo task runner |
| [tsdown](https://github.com/sxzz/tsdown) | Bundler + `.d.ts` generation |
| [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Linter (Rust-based) |
| [oxfmt](https://github.com/oxc-project/oxfmt) | Formatter (Rust-based) |
| [Vitest](https://vitest.dev/) | Test runner |
| [CSpell](https://cspell.org/) | Spell checker |
| [Changesets](https://github.com/changesets/changesets) | Versioning + changelogs |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |
| [taze](https://github.com/antfu-collective/taze) | Dependency upgrades |

## Layout

```
.
├── .changeset/          # Changeset configuration
├── .claude/             # Claude Code workspace config
├── .github/
│   ├── ISSUE_TEMPLATE/  # Issue templates
│   ├── setup/           # Reusable setup composite action
│   └── workflows/       # CI workflows
├── .skills/             # Claude Code skills
├── configs/             # Shared TS bases + vitest config
├── internals/           # Internal, non-published packages
│   └── utils/
├── packages/            # Publishable packages
│   ├── core/
│   └── demo/
├── env.d.ts
├── oxfmt.config.ts
├── oxlint.config.ts
├── package.json
├── pnpm-workspace.yaml
├── reset.d.ts
├── tsconfig.json
└── turbo.json
```

## Prerequisites

- Node.js `>= 22`
- pnpm `>= 11`

## Commands

```bash
pnpm install         # Install dependencies
pnpm build           # Build all packages
pnpm test            # Run tests
pnpm test:watch      # Watch mode
pnpm test:bench      # Run benchmarks
pnpm lint            # Lint with oxlint
pnpm lint:fix        # Lint + auto-fix
pnpm format          # Format with oxfmt
pnpm typecheck       # Type-check all packages
pnpm lint:spell      # Spell check
pnpm changeset       # Create a changeset
pnpm clean           # Clean build artifacts
pnpm upgrade         # Bump dependencies to latest (via taze)
```

## Using this template

1. Click **Use this template** on GitHub.
2. Update `package.json` `name`/`namespace`, `repository.url`, and the
   author block.
3. Replace `packages/core` and `packages/demo` with your own packages
   (keep `internals/utils` if useful).
4. Update `oxlint.config.ts` / `oxfmt.config.ts` ignore patterns if needed.
5. Update `.changeset/config.json` `changelog.repo` and `fixed`/`ignore` arrays.
6. Update `tsconfig.json` `paths` to match the new packages.
7. Edit `README.md`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`
   for the new project.
8. Push to `main` — CI runs immediately.

## Releasing

This template uses [Changesets](https://github.com/changesets/changesets):

```bash
pnpm changeset             # Add a changeset entry describing the change
git commit -am "feat: ..."
git push
```

The `release.yml` workflow opens a "Version Packages" PR on `main`. Merging
that PR publishes the affected packages to npm with provenance.

For pre-release tags (canary/alpha/beta/rc) see `pnpm version:canary` and
`pnpm release:canary`.

## Upgrading dependencies

```bash
pnpm upgrade && pnpm install
```

The `upgrade` script runs [taze](https://github.com/antfu-collective/taze)
with `--maturity-period 3` so new releases need at least 3 days of soak
time before being adopted.

## License

[MIT](./LICENSE) © Stijn Van Hulle
