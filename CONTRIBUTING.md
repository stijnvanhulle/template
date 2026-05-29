# Contributing

Thanks for considering a contribution. Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

- Be respectful and open-minded.
- Search the [issue tracker](https://github.com/stijnvanhulle/template/issues) before opening a PR.
- For opinion-driven changes, [open an issue](https://github.com/stijnvanhulle/template/issues/new) first.

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
| [CSpell](https://cspell.org/) | Spell checker |
| [Changesets](https://github.com/changesets/changesets) | Versioning and changelogs |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |

## Getting started

**Requirements:** Node.js `>=22`, pnpm `>=11`

```bash
gh repo fork stijnvanhulle/template --clone
cd template
pnpm install
```

## Commands

```bash
pnpm build          # Build all packages
pnpm clean          # Remove build artifacts
pnpm test           # Run tests
pnpm test:watch     # Watch mode
pnpm lint           # Lint
pnpm lint:fix       # Lint and auto-fix
pnpm format         # Format code
pnpm typecheck      # Type-check all packages
pnpm lint:spell     # Spell check
pnpm changeset      # Create a changeset
```

## Project structure

```
.
├── .agents/
│   └── skills/          # Agent skills, shared across providers
├── .changeset/          # Changeset configuration
├── .claude/             # Claude Code config (rules, commands, agents, hooks, settings)
│   └── skills/          # → ../.agents/skills
├── .github/
│   ├── ISSUE_TEMPLATE/  # Issue templates
│   ├── setup/           # Reusable setup composite action
│   └── workflows/       # CI workflows
├── configs/             # Shared TS bases + vitest config
├── internals/           # Internal, non-published packages
│   └── utils/
├── packages/            # Publishable packages
│   ├── core/
│   └── demo/
├── plans/               # Spec-driven workflow (templates + per-feature folders)
├── codecov.yml          # Coverage targets + ignores
├── env.d.ts
├── oxfmt.config.ts
├── oxlint.config.ts
├── package.json
├── pnpm-workspace.yaml
├── reset.d.ts
├── tsconfig.json
└── turbo.json
```

## Submitting changes

1. Run `pnpm format && pnpm lint && pnpm typecheck && pnpm test` locally.
2. Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`.
3. Run `pnpm changeset` and commit the generated file (required for any package change).
4. Open a PR against `main` and fill out the template.

> Spell-check false positives: fix typos in code, or add technical terms/proper nouns to the `words` array in `cspell.json`.
