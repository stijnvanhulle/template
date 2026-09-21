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

| Aspect          | Choice                      |
| --------------- | --------------------------- |
| Monorepo        | pnpm workspaces + Turborepo |
| Module system   | ESM-only (`type: "module"`) |
| Node version    | 22                          |
| Package manager | pnpm 11+                    |
| Linter          | oxlint                      |
| Formatter       | oxfmt                       |
| Bundler         | tsdown                      |
| Tests           | Vitest                      |
| Versioning      | Changesets                  |
| CI/CD           | GitHub Actions              |

## Commits and PRs

Use [Conventional Commits](https://www.conventionalcommits.org/). Before a PR, run
`pnpm format && pnpm lint:fix && pnpm typecheck && pnpm test`, and add a changeset
(`pnpm changeset`) for any published-package change. The same command sequence is
what the PR template asks contributors to confirm.

## Resuming work

When picking up an in-progress task, before editing anything:

1. `git status` and `git log -10 --oneline` to see the working tree and recent history.
2. Run `pnpm install`, then the same pre-PR sequence above to confirm the baseline
   is green before changing code.

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

`AGENTS.md` is canonical. `AGENT.md` and `CLAUDE.md` symlink to it. Skills live in
`.agents/skills/`, rules in `.agents/skills/conventions/rules/`, and each supported agent's
toolkit under `tools/<agent>/`. `pnpm agent-files` runs in CI and fails if the Claude and Cursor
command sets diverge or a Cursor rule drifts from its source.

For the full wiring (which path symlinks where, plugin manifests, install steps) see
the per-agent READMEs under `tools/` and the
[README](README.md#ai-assistant-configuration).

Three toolkit manifests ship this content and each carries its own `version` field:
`tools/claude/.claude-plugin/plugin.json`, `tools/cursor/.cursor-plugin/plugin.json`,
and `.codex-plugin/plugin.json`. `claude plugin update` (and the Cursor and Codex equivalents)
compare that field to decide whether there's anything new, so a content change with no version
bump makes the update look like a no-op.

The Claude, Cursor, and Codex manifests are versioned through Changesets: `tools/claude`,
`tools/cursor`, and `tools/codex` are private workspace packages
(`@stijnvanhulle/template-claude-plugin`, `@stijnvanhulle/template-cursor-plugin`,
`@stijnvanhulle/template-codex-plugin`) in the same `fixed` group as every other
`@stijnvanhulle/template-*` package. Add a changeset when you change any of those
plugins. Release syncs the bumped version into the matching `plugin.json` automatically
(`scripts/syncPluginVersion.mjs`), so never edit those `version` fields by hand.

## Rules

Conventions for this repo. `plain-language`, `security`, `usa-english`, and `user-questions`
apply to every request. The rest carry `paths:` frontmatter and load when you open a matching
file. The same files ship in the `conventions` skill for tools that load `SKILL.md`
folders on demand.

- [code-style](.agents/skills/conventions/rules/code-style.md): ESM conventions, naming, imports, exports.
- [jsdoc](.agents/skills/conventions/rules/jsdoc.md): JSDoc essentials. The `jsdoc` skill is the full reference.
- [markdown](.agents/skills/conventions/rules/markdown.md): Markdown structure. The `documentation` and `humanizer` skills cover voice and SEO.
- [plain-language](.agents/skills/conventions/rules/plain-language.md): ISO 24495-1 plain language for agent responses and user-facing output.
- [security](.agents/skills/conventions/rules/security.md): Secrets, input validation at trust boundaries, safe shell use.
- [testing](.agents/skills/conventions/rules/testing.md): Vitest patterns and what to test.
- [usa-english](.agents/skills/conventions/rules/usa-english.md): Write code, comments, and docs in USA English spellings.
- [user-questions](.agents/skills/conventions/rules/user-questions.md): Follow the `ask` skill. `AskUserQuestion` in Claude Code, `AskQuestion` in Cursor, a lettered list everywhere else.

<skills>

## Skills

You have new skills. If any skill might be relevant then you MUST read it.

- [ask](.agents/skills/ask/SKILL.md) - Ask a blocking multiple-choice question with the client's native picker, or a lettered list when none exists.
- [backlog](.agents/skills/backlog/SKILL.md) - Triage recent GitHub, ClickUp, or Jira issues, then implement confirmed ones in isolated worktrees.
- [branch](.agents/skills/branch/SKILL.md) - Name and create a Conventional Commit branch from a GitHub, ClickUp, or Jira issue.
- [changelog](.agents/skills/changelog/SKILL.md) - Turn commit history and changesets into user-facing release notes.
- [changeset](.agents/skills/changeset/SKILL.md) - Write or review a release-note changeset with the correct bump.
- [conventions](.agents/skills/conventions/SKILL.md) - Apply the shared TypeScript, markdown, testing, security, and language rules.
- [deslop](.agents/skills/deslop/SKILL.md) - Audit a diff for over-engineering and AI code/prose tells, then apply only confirmed fixes.
- [documentation](.agents/skills/documentation/SKILL.md) - Write or review developer documentation using the project style and SEO guidance.
- [humanizer](.agents/skills/humanizer/SKILL.md) - Find AI writing tells and apply only confirmed rewrites.
- [issue](.agents/skills/issue/SKILL.md) - Create or triage a GitHub or Jira issue with its type, labels, and fields filled.
- [jsdoc](.agents/skills/jsdoc/SKILL.md) - Apply the TypeScript JSDoc format, examples, tags, and ordering.
- [pr](.agents/skills/pr/SKILL.md) - Prepare, open, update, or assess a pull request, including checks, changesets, title, template, and CI.
</skills>
