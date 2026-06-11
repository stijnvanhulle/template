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
`pnpm format && pnpm lint:fix && pnpm typecheck && pnpm test`, and add a changeset
(`pnpm changeset`) for any published-package change. The same command sequence is
what the PR template asks contributors to confirm.

## Resuming work

When picking up an in-progress task, before editing anything:

1. `git status` and `git log -10 --oneline` to see the working tree and recent history.
2. Check `plans/` for an active feature folder. If one exists, read its `spec.md`,
   the latest unchecked slice (`NNN-<slug>.md`), and `verification.md` to find the
   next step.
3. Run `pnpm install`, then the same pre-PR sequence above to confirm the baseline
   is green before changing code.
4. Leave a short note in the relevant slice or `verification.md` before ending the
   session so the next agent knows where you stopped.

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

`AGENTS.md` is the canonical instruction file, read natively by Codex /
ChatGPT, OpenCode, Windsurf, Cursor (0.46+), and any other AGENTS.md
runtime. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md`
symlink to it so Claude Code, Gemini CLI, and GitHub Copilot pick up the
same content. The shared toolset (skills, commands, code-reviewer agent,
output styles, and conventions) lives in `tools/claude/`, which is also
packaged as a Claude Code plugin (installable as
`plugin@stijnvanhulle-template`). The `.claude/` and `.agents/skills/`
paths used by the workspace symlink into that folder, so the template repo
and any project that installs the plugin run the same content.
Workspace-only pieces (hooks and `settings.json`) stay under `.claude/`.
See [tools/claude/README.md](tools/claude/README.md) for install steps and
the [README](README.md#ai-assistant-configuration) for the full folder
structure.

## Rules

Always-on conventions for this repo. Read the file that matches what you
are doing. The same files ship in the `conventions` skill, so any tool
that loads `SKILL.md` folders also picks them up on demand.

- [code-style](.agents/skills/conventions/rules/code-style.md) - ESM conventions, naming, imports, exports.
- [jsdoc](.agents/skills/conventions/rules/jsdoc.md) - Always-on JSDoc essentials. The `jsdoc` skill is the full reference.
- [markdown](.agents/skills/conventions/rules/markdown.md) - Markdown structure. The `documentation` and `humanizer` skills cover voice and SEO.
- [security](.agents/skills/conventions/rules/security.md) - Secrets, input validation at trust boundaries, safe shell use.
- [testing](.agents/skills/conventions/rules/testing.md) - Vitest patterns and what to test.
- [usa-english](.agents/skills/conventions/rules/usa-english.md) - Write code, comments, and docs in USA English spellings.

<skills>

## Skills

You have new skills. If any skill might be relevant then you MUST read it.

- [changelog](.agents/skills/changelog/SKILL.md) - Creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes.
- [conventions](.agents/skills/conventions/SKILL.md) - Always-on conventions for TypeScript monorepos. Use when writing or reviewing TypeScript, markdown, or tests, when handling secrets, env vars, or input at trust boundaries, or any time you would otherwise reach for a project style guide. Bundles code style, JSDoc, markdown structure, security, and testing rules.
- [documentation](.agents/skills/documentation/SKILL.md) - Use when writing blog posts or documentation markdown files - provides writing style guide (active voice, present tense), content structure patterns, and SEO optimization. Overrides brevity rules for proper grammar.
- [humanizer](.agents/skills/humanizer/SKILL.md) - Remove AI writing patterns to make documentation sound natural, specific, and human. Covers content patterns, language patterns, style patterns, and communication patterns.
- [jsdoc](.agents/skills/jsdoc/SKILL.md) - Full JSDoc format guide for TypeScript, covering @example formats (short, multi-line, multi-variant), tag usage (@default, @deprecated, what to avoid), documentation patterns for properties/enums/functions, and tag order.
- [pr](.agents/skills/pr/SKILL.md) - Rules and checklist for preparing PRs, creating changesets, and releasing packages in the monorepo.
- [spec-driven](.agents/skills/spec-driven/SKILL.md) - Drive a spec-driven workflow for a larger feature: specify requirements and acceptance criteria, research decisions, plan numbered slices, implement, then verify. Use for multi-step features that need a reviewable paper trail. Skip it for small, obvious changes.
</skills>
