# AGENTS.md

A modern TypeScript monorepo template (pnpm workspaces, Turborepo, oxlint, oxfmt, tsdown, Vitest, and Changesets).

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
├── plans/                   # Spec-driven workflow: templates/ + per-feature plan folders
├── .agents/
│   └── skills/              # Agent skills, shared across providers (Claude, Copilot, OpenCode, Cursor, ChatGPT)
└── .claude/                 # Claude Code workspace config
    ├── settings.json        # Permissions + hooks (format-on-edit, session-start)
    ├── skills -> ../.agents/skills
    ├── rules/               # Always-on conventions (code-style, jsdoc, markdown, testing, security)
    ├── commands/            # Slash commands (/changeset, /spec, /plan, /verify)
    ├── agents/              # Subagents (code-reviewer)
    ├── output-styles/       # System-prompt styles (plan)
    └── hooks/               # Hook scripts
```

## Repository Setup

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

## Commits and PRs

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`,
`chore:`, `refactor:`, `test:`, `perf:`). Before opening a PR, run:

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm test
```

For any change to a published package, run `pnpm changeset` and commit the generated file.

## How agents read this repo

`AGENTS.md` is the canonical instruction file. `CLAUDE.md`, `GEMINI.md`, and
`.github/copilot-instructions.md` symlink to it. Skills live in `.agents/skills/` (open
`SKILL.md` format, cross-provider). Always-on conventions live in `.claude/rules/`
(`code-style`, `jsdoc`, `markdown`, `testing`, `security`). `.claude/` also holds commands,
subagents, and hooks. See the README for the full cross-provider map and how each piece loads.

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
