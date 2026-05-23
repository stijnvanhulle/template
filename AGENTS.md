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
├── .agents/
│   └── skills/              # Agent skills, shared across providers (Claude, Copilot, OpenCode, Cursor, ChatGPT)
└── .claude/                 # Claude Code workspace config
    ├── settings.json        # Permissions + hooks (format-on-edit, session-start)
    ├── skills -> ../.agents/skills
    ├── rules/               # Always-on conventions (coding-style, jsdoc, markdown)
    ├── commands/            # Slash commands (/changeset)
    ├── agents/              # Subagents (code-reviewer)
    ├── output-styles/       # System-prompt styles (plan)
    └── hooks/               # Hook scripts
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

## Commits and PRs

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`,
`chore:`, `refactor:`, `test:`, `perf:`). Before opening a PR, run:

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm test
```

For any change to a published package, run `pnpm changeset` and commit the generated file.

## How agents read this repo

AGENTS.md is the canonical, cross-provider instruction file. Every agent reaches it through an
open format or a symlink, so there is a single source of truth:

| Entry point | Tool | Mechanism |
| --- | --- | --- |
| `AGENTS.md` | Codex / ChatGPT, Cursor, Copilot, OpenCode, Windsurf | Read natively |
| `CLAUDE.md` → `AGENTS.md` | Claude Code | Symlink |
| `GEMINI.md` → `AGENTS.md` | Gemini CLI | Symlink |
| `.github/copilot-instructions.md` → `AGENTS.md` | GitHub Copilot (VS Code) | Symlink |
| `.agents/skills/<name>/SKILL.md` | Claude, Codex, Cursor, Copilot, OpenCode, and 35+ runtimes | Open SKILL.md format |
| `.claude/skills` → `.agents/skills` | Claude Code | Symlink |

Path-scoped rules (`.claude/rules/`) are auto-loaded by Claude. Cursor reads `AGENTS.md`
natively but does not follow symlinks into `.cursor/rules/`, so its rules are not duplicated
there; any agent can read the rule files directly from the locations listed below.

Configuration is separated by how each piece is used:

| Type | Location | Role |
| --- | --- | --- |
| Rules | `.claude/rules/` | Constraints that always apply: repo setup, naming, TypeScript style, how to run tests. Claude auto-loads them; other agents can read the files directly. |
| Skills | `.agents/skills/` | On-demand playbooks, loaded when the task matches the description. Portable via the open SKILL.md format. |
| Commands | `.claude/commands/` | Explicit `/name` actions you trigger yourself. |
| Subagents | `.claude/agents/` | Isolated specialists with their own context window. |

<skills>

## Skills

You have new skills. If any skill might be relevant then you MUST read it.

- [changelog](.agents/skills/changelog/SKILL.md) - Automatically creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes. Turns hours of manual changelog writing into minutes of automated generation.
- [documentation](.agents/skills/documentation/SKILL.md) - Use when writing blog posts or documentation markdown files - provides writing style guide (active voice, present tense), content structure patterns, and SEO optimization. Overrides brevity rules for proper grammar.
- [pr](.agents/skills/pr/SKILL.md) - Rules and checklist for preparing PRs, creating changesets, and releasing packages in the monorepo.
- [testing](.agents/skills/testing/SKILL.md) - Testing, CI, and troubleshooting guidance for running the repository's test suite and interpreting CI failures.
</skills>
