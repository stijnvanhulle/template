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
├── env.d.ts
├── oxfmt.config.ts
├── oxlint.config.ts
├── package.json
├── pnpm-workspace.yaml
├── reset.d.ts
├── tsconfig.json
└── turbo.json
```

## AI assistant configuration

This template is set up for AI coding agents. It builds on two open formats, AGENTS.md and
Agent Skills, and uses symlinks so every tool reads from one source instead of drifting copies.

`AGENTS.md` is the canonical instruction file. Codex and ChatGPT, Cursor, Copilot, OpenCode,
and Windsurf read it natively; Claude Code reads `CLAUDE.md`, a symlink to it; GitHub Copilot
in VS Code also reads `.github/copilot-instructions.md`, another symlink to it. Skills live in
`.agents/skills/` as portable `SKILL.md` folders that work across those runtimes, and
`.claude/skills` symlinks there so Claude finds them too.

| Entry point | Tool | Mechanism |
|---|---|---|
| `AGENTS.md` | Codex / ChatGPT, Cursor, Copilot, OpenCode, Windsurf | Read natively |
| `CLAUDE.md` → `AGENTS.md` | Claude Code | Symlink |
| `.github/copilot-instructions.md` → `AGENTS.md` | Copilot (VS Code) | Symlink |
| `.agents/skills/` | Any Agent Skills runtime | Open `SKILL.md` format |
| `.claude/skills` → `.agents/skills` | Claude Code | Symlink |

Claude-specific extensions layer on top. The pieces, and when each one loads:

| Path | What it does | When it loads |
|---|---|---|
| `.claude/rules/` | Always-on conventions: coding style, JSDoc, markdown humanizer | Session start, or when a matching file opens for path-scoped rules |
| `.agents/skills/` | Playbooks for workflows: changelog, documentation, pr, testing | On demand, when the task matches the skill description |
| `.claude/commands/` | Explicit slash-command actions, such as `/changeset` | When you type the command |
| `.claude/agents/` | Subagents with their own context window, such as `code-reviewer` | When delegated a matching task |
| `.claude/output-styles/` | System-prompt modes, such as `plan` | When selected |
| `.claude/hooks/` | Scripts that install deps on session start and format files on edit | On the matching event |
| `.claude/settings.json` | Permissions and hook registration | Always |

The guiding split: rules always apply, skills are optional expertise loaded only when
relevant, and commands are actions you trigger yourself.

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
