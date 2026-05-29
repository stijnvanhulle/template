# AGENTS.md

A modern TypeScript monorepo template (pnpm workspaces, Turborepo, oxlint, oxfmt, tsdown, Vitest, and Changesets).

## High-level architecture

A drop-in monorepo starter. Fork it, rename a few fields, and you have a production-ready repository with build, test, lint, format, release, and CI already wired up. It is built from:

- Publishable packages in `packages/`, bundled with tsdown
- Internal, non-published packages in `internals/`
- Shared TypeScript bases and Vitest config in `configs/`
- A Turborepo pipeline that orchestrates build, test, lint, and typecheck

## Project structure and commands

The full folder structure, repository setup, and commands live in
[CONTRIBUTING.md](CONTRIBUTING.md).

## Repository setup

| Aspect | Choice |
| --- | --- |
| Monorepo | pnpm workspaces + Turborepo |
| Module system | ESM-only (`type: "module"`) |
| Node version | 22 |
| Package manager | pnpm 11+ |
| Linter | oxlint |
| Formatter | oxfmt |
| Bundler | tsdown |
| Tests | Vitest |
| Versioning | Changesets |
| CI/CD | GitHub Actions |

## Commits and PRs

Use [Conventional Commits](https://www.conventionalcommits.org/). Before a PR, run
`pnpm format && pnpm lint && pnpm typecheck && pnpm test`, and add a changeset
(`pnpm changeset`) for any published-package change.

## Token optimized CLI (rtk)

`rtk` is a CLI proxy that filters and compresses command output to cut token usage. Prefix shell
commands with it so their output stays small:

```bash
rtk git status
rtk git log -10
rtk pnpm test
```

Run these meta commands directly:

```bash
rtk gain              # Token savings dashboard
rtk gain --history    # Per-command savings history
rtk discover          # Find missed rtk opportunities
rtk proxy <cmd>       # Run raw without filtering but still track usage
```

## How agents read this repo

`AGENTS.md` is the canonical instruction file. `CLAUDE.md`, `GEMINI.md`, and
`.github/copilot-instructions.md` symlink to it. Skills live in `.agents/skills/` (open
`SKILL.md` format, cross-provider). Always-on conventions live in `.claude/rules/`
(`code-style`, `jsdoc`, `markdown`, `testing`, `security`), and `.claude/` also holds commands,
subagents, output styles, and hooks. See the
[README](README.md#ai-assistant-configuration) for the full folder structure and how each piece
loads.

<skills>

## Skills

You have new skills. If any skill might be relevant then you MUST read it.

- [changelog](.agents/skills/changelog/SKILL.md) - Creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes.
- [documentation](.agents/skills/documentation/SKILL.md) - Use when writing blog posts or documentation markdown files - provides writing style guide (active voice, present tense), content structure patterns, and SEO optimization. Overrides brevity rules for proper grammar.
- [humanizer](.agents/skills/humanizer/SKILL.md) - Remove AI writing patterns to make documentation sound natural, specific, and human. Covers content patterns, language patterns, style patterns, and communication patterns.
- [jsdoc](.agents/skills/jsdoc/SKILL.md) - Full JSDoc format guide for TypeScript, covering @example formats, tag usage (@default, @deprecated, what to avoid), documentation patterns for properties/enums/functions, and tag order.
- [pr](.agents/skills/pr/SKILL.md) - Rules and checklist for preparing PRs, creating changesets, and releasing packages in the monorepo.
- [spec-driven](.agents/skills/spec-driven/SKILL.md) - Drive a spec-driven workflow for a larger feature: specify requirements and acceptance criteria, research decisions, plan numbered slices, implement, then verify. Use for multi-step features that need a reviewable paper trail. Skip it for small, obvious changes.
</skills>
