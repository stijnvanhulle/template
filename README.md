<div align="center">

  <h1>Template</h1>

  <p>
    A monorepo template aligned with the <a href="https://github.com/kubb-labs">Kubb organisation</a> conventions — pnpm workspaces, Turborepo, oxlint, oxfmt, tsdown, Vitest and Changesets.
  </p>

  <h4>
    <a href="https://github.com/stijnvanhulle/template/issues/">Report Bug</a>
    <span> · </span>
    <a href="https://github.com/stijnvanhulle/template/issues/">Request Feature</a>
  </h4>
</div>

<br />

## About

This repository is the starting point for new repositories inside the
[`kubb-labs`](https://github.com/kubb-labs) organisation. It ships with the
exact toolchain that `kubb-labs/kubb` and `kubb-labs/plugins` use, so a fork
is immediately consistent with the rest of the org.

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

## Layout

```
.
├── .changeset/          # Changeset configuration
├── .claude/             # Claude Code workspace config
├── .github/workflows/   # CI workflows (pr, release, autofix, cleanup)
├── .skills/             # Claude Code skills
├── configs/             # Shared TS bases + vitest config
├── internals/           # Internal, non-published packages
│   └── utils/
├── packages/            # Publishable packages
│   ├── core/
│   └── demo/
├── oxfmt.config.ts
├── oxlint.config.ts
├── package.json
├── pnpm-workspace.yaml
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
pnpm lint            # Lint with oxlint
pnpm lint:fix        # Lint + auto-fix
pnpm format          # Format with oxfmt
pnpm typecheck       # Type-check all packages
pnpm lint:spell      # Spell check
pnpm changeset       # Create a changeset
pnpm clean           # Clean build artifacts
```

## Using this template for a new Kubb repository

1. Click **Use this template** on GitHub or `gh repo create kubb-labs/<name> --template stijnvanhulle/template`.
2. Update `package.json` `name`/`namespace`, `repository.url`, and the
   author block.
3. Replace `packages/core` and `packages/demo` with the packages for the new
   repo (keep `internals/utils` if useful).
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

## License

[MIT](./LICENSE) © Stijn Van Hulle
