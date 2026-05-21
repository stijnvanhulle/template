# AGENTS.md

A modern TypeScript monorepo template — pnpm workspaces, Turborepo, oxlint, oxfmt, tsdown, Vitest and Changesets.

## Folder Structure

```
template/
├── packages/                # Publishable packages
│   ├── core/                # Example library package
│   └── demo/                # Example consumer package depending on core
├── internals/               # Non-published shared utilities
│   └── utils/
├── configs/                 # Shared TypeScript + Vitest configs
├── .github/setup/           # Reusable composite action for CI setup
├── .github/workflows/       # CI workflows
├── .claude/                 # Claude Code workspace config
└── .skills/                 # Claude Code skills
```

## Repository Setup

- **Monorepo** — pnpm workspaces + Turborepo
- **Module system** — ESM-only (`type: "module"`)
- **Node version** — 22
- **Package manager** — pnpm 11+
- **Linter** — oxlint
- **Formatter** — oxfmt
- **Bundler** — tsdown
- **Tests** — Vitest
- **Versioning** — Changesets
- **CI/CD** — GitHub Actions

## Commands

```bash
pnpm install                 # Install dependencies
pnpm clean                   # Clean build artifacts
pnpm build                   # Build all packages
pnpm test                    # Run tests
pnpm test:bench              # Run benchmarks
pnpm typecheck               # Type-check all packages
pnpm format                  # Format code with oxfmt
pnpm lint                    # Lint code with oxlint
pnpm lint:fix                # Lint and fix issues
pnpm lint:spell              # Spell-check
pnpm changeset               # Create a changelog entry
pnpm run upgrade && pnpm i   # Upgrade dependencies via taze
```

<skills>

## Skills

You have new skills. If any skill might be relevant then you MUST read it.

- [changelog](.skills/changelog/SKILL.md) - Automatically creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes.
- [coding-style](.skills/coding-style/SKILL.md) - Coding style, testing, and PR guidelines. Use when writing or reviewing code.
- [documentation](.skills/documentation/SKILL.md) - Use when writing blog posts or documentation markdown files - provides writing style guide (active voice, present tense), content structure patterns, and SEO optimization.
- [jsdoc](.skills/jsdoc/SKILL.md) - Guidelines for writing minimal, high-quality JSDoc comments in TypeScript.
- [pr](.skills/pr/SKILL.md) - Rules and checklist for preparing PRs, creating changesets, and releasing packages in the monorepo.
- [testing](.skills/testing/SKILL.md) - Testing, CI, and troubleshooting guidance for running the repository's test suite and interpreting CI failures.
</skills>
