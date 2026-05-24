<div align="center">

  <h1>Template</h1>

  <p>
    A modern TypeScript monorepo template (pnpm workspaces, Turborepo, oxlint, oxfmt, tsdown, Vitest, and Changesets).
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

## AI assistant configuration

This template is set up for AI coding agents. It builds on two open formats, AGENTS.md and
Agent Skills, and uses symlinks so every tool reads from one source instead of drifting copies.

`AGENTS.md` is the canonical instruction file. Skills live in `.agents/skills/` as portable
`SKILL.md` folders. Everything else points back to those two through symlinks, so there is one
source of truth.

### Folder structure

```
AGENTS.md                                     # canonical instructions every agent reads
CLAUDE.md → AGENTS.md                         # Claude Code
GEMINI.md → AGENTS.md                         # Gemini CLI
.github/copilot-instructions.md → AGENTS.md   # GitHub Copilot in VS Code
.agents/
└── skills/                                   # cross-provider Agent Skills, one SKILL.md folder each
    └── changelog, documentation, humanizer, jsdoc, pr, spec-driven
.claude/                                      # Claude-specific extensions
├── settings.json                             # permissions and hook registration
├── skills → ../.agents/skills                # lets Claude load the shared skills
├── rules/                                    # always-on conventions: code-style, jsdoc, markdown, testing, security
├── commands/                                 # slash commands: /changeset, /spec, /plan, /verify
├── agents/                                   # subagents: code-reviewer
├── output-styles/                            # system-prompt modes: plan
└── hooks/                                    # shell hooks: session-start, format
plans/                                        # spec-driven workflow
├── README.md                                 # workflow guide
├── templates/                                # blank docs, copied per feature
│   ├── spec.md                               # requirements and acceptance criteria
│   ├── research.md                           # decisions, open questions, constraints
│   ├── plan.md                               # architecture and numbered slices
│   ├── verification.md                       # end-to-end scenarios, one per AC
│   └── slice.md                              # one implementation slice
└── <feature>/                                # one folder per plan
    ├── spec.md  research.md  plan.md  verification.md
    └── NNN-<slug>.md                         # slices, copied from templates/slice.md
```

Supported agents:

- **Claude Code** reads `CLAUDE.md` (symlink to `AGENTS.md`) and `.claude/skills` (symlink to
  `.agents/skills`), plus the Claude-specific extensions below.
- **OpenAI Codex / ChatGPT** reads `AGENTS.md` and Agent Skills natively.
- **GitHub Copilot** reads `AGENTS.md` natively, and `.github/copilot-instructions.md`
  (symlink to `AGENTS.md`) in VS Code.
- **Cursor** reads `AGENTS.md` natively. It does not follow symlinks into `.cursor/rules/`,
  so rules are not duplicated there. The rule files under `.claude/rules/` are referenced from
  `AGENTS.md` instead.
- **OpenCode** reads `AGENTS.md` and Agent Skills natively.
- **Gemini CLI** reads `GEMINI.md` (symlink to `AGENTS.md`).
- **Windsurf and other AGENTS.md runtimes** read `AGENTS.md` natively.

| Entry point | Tool | Mechanism |
|---|---|---|
| `AGENTS.md` | Codex / ChatGPT, Cursor, Copilot, OpenCode, Windsurf | Read natively |
| `CLAUDE.md` → `AGENTS.md` | Claude Code | Symlink |
| `GEMINI.md` → `AGENTS.md` | Gemini CLI | Symlink |
| `.github/copilot-instructions.md` → `AGENTS.md` | Copilot (VS Code) | Symlink |
| `.agents/skills/` | Any Agent Skills runtime | Open `SKILL.md` format |
| `.claude/skills` → `.agents/skills` | Claude Code | Symlink |

Claude-specific extensions layer on top. The pieces, and when each one loads:

| Path | What it does | When it loads |
|---|---|---|
| `.claude/rules/` | Always-on conventions: code style, JSDoc, markdown humanizer, testing, security | Session start, or when a matching file opens for path-scoped rules |
| `.agents/skills/` | Playbooks: changelog, documentation, humanizer, jsdoc, pr, spec-driven | On demand, when the task matches the skill description |
| `.claude/commands/` | Explicit slash-command actions, such as `/changeset` | When you type the command |
| `.claude/agents/` | Subagents with their own context window, such as `code-reviewer` | When delegated a matching task |
| `.claude/output-styles/` | System-prompt modes, such as `plan` | When selected |
| `.claude/hooks/` | Scripts that install deps on session start and format files on edit | On the matching event |
| `.claude/settings.json` | Permissions and hook registration | Always |

The guiding split: rules always apply, skills are optional expertise loaded only when
relevant, and commands are actions you trigger yourself.

For larger features, `plans/` holds a spec-driven workflow (spec, research, plan, slices,
verification) driven by the `spec-driven` skill and the `/spec`, `/plan`, and `/verify`
commands. See [plans/README.md](plans/README.md). For quick changes, use the `plan` output
style instead.

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
8. Push to `main`. CI runs immediately.

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
