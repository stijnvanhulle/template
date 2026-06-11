<div align="center">

[![Stars][stars-src]][stars-href]
[![License][license-src]][license-href]
[![Coverage][coverage-src]][coverage-href]

  <h4>
    <a href="https://github.com/stijnvanhulle/template/issues/">Report Bug</a>
    <span> · </span>
    <a href="https://github.com/stijnvanhulle/template/issues/">Request Feature</a>
  </h4>
</div>

<br />

# Template

A modern TypeScript monorepo template (pnpm workspaces, Turborepo, oxlint, oxfmt, tsdown, Vitest, and Changesets).

## About

A drop-in monorepo starter. Fork it, rename a few fields, and you have a
production-ready repository with build, test, lint, format, release and CI
already wired up.

## AI assistant configuration

This template is set up for AI coding agents. It builds on two open formats, AGENTS.md and
Agent Skills, and uses symlinks so every tool reads from one source instead of drifting copies.

`AGENTS.md` is the canonical instruction file. The shared toolset (skills, commands,
code-reviewer agent, output styles, and conventions) lives in `tools/claude/`, which doubles as
a Claude Code plugin (installable as `template@stijnvanhulle`). The workspace paths under `.claude/` and `.agents/`
symlink into that folder, so the template repo and any project that installs the plugin run
the same content from a single source of truth. See [tools/claude/README.md](tools/claude/README.md)
for install steps.

### Folder structure

```
AGENTS.md                                     # canonical instructions every agent reads
CLAUDE.md → AGENTS.md                         # Claude Code
GEMINI.md → AGENTS.md                         # Gemini CLI
.github/copilot-instructions.md → AGENTS.md   # GitHub Copilot in VS Code
tools/claude/                                 # distributable Claude Code plugin (single source of truth)
├── .claude-plugin/plugin.json                # plugin manifest
├── README.md                                 # install + usage
├── skills/                                   # cross-provider Agent Skills, one SKILL.md folder each
│   ├── changelog, documentation, humanizer, jsdoc, pr, spec-driven
│   └── conventions/                          # always-on rules: code-style, jsdoc, markdown, security, testing
├── commands/                                 # slash commands: /changeset, /spec, /plan, /implement, /verify
├── agents/                                   # subagents: code-reviewer
└── output-styles/                            # system-prompt modes: house (default), plan, diagrams-first
.agents/
└── skills → ../tools/claude/skills           # lets cross-provider runtimes find the shared skills
.claude/                                      # Claude-specific workspace config
├── settings.json                             # permissions and hook registration
├── hooks/                                    # shell hooks: session-start, format-lint, guard-edit
├── skills → ../tools/claude/skills           # all seven skills, including conventions
├── commands → ../tools/claude/commands
├── agents → ../tools/claude/agents
├── output-styles → ../tools/claude/output-styles
└── rules → ../tools/claude/skills/conventions # the conventions skill files, exposed as rules
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
  `tools/claude/skills`), plus the Claude-specific extensions below. Other projects can install
  the same toolset as a marketplace plugin (see [tools/claude/README.md](tools/claude/README.md)).
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
| `tools/claude/skills/` | Any Agent Skills runtime | Open `SKILL.md` format |
| `.agents/skills` → `tools/claude/skills` | Cross-provider runtimes | Symlink |
| `.claude/skills` → `tools/claude/skills` | Claude Code | Symlink |
| `tools/claude/.claude-plugin/plugin.json` | Other projects, via marketplace install | Claude Code plugin |

Claude-specific extensions layer on top. The pieces, and when each one loads:

| Path | What it does | When it loads |
|---|---|---|
| `.claude/rules/` → `tools/claude/skills/conventions/` | Always-on conventions: code style, JSDoc, markdown, security, testing | Session start, or when a matching file opens for path-scoped rules |
| `.claude/skills/` → `tools/claude/skills/` | Playbooks: changelog, documentation, humanizer, jsdoc, pr, spec-driven, conventions | On demand, when the task matches the skill description |
| `.claude/commands/` → `tools/claude/commands/` | Explicit slash-command actions, such as `/changeset` | When you type the command |
| `.claude/agents/` → `tools/claude/agents/` | Subagents with their own context window, such as `code-reviewer` | When delegated a matching task |
| `.claude/output-styles/` → `tools/claude/output-styles/` | System-prompt modes: `house` (the default, set in `settings.json`), `plan`, and `diagrams-first` | At session start (house), or when selected |
| `.claude/hooks/` | Scripts that install deps on session start and format files on edit | On the matching event |
| `.claude/settings.json` | Permissions and hook registration | Always |

The guiding split: rules always apply, skills are optional expertise loaded only when
relevant, and commands are actions you trigger yourself.

For larger features, `plans/` holds a spec-driven workflow (spec, research, plan, slices,
verification) driven by the `spec-driven` skill and the `/spec`, `/plan`, and `/verify`
commands. See [plans/README.md](plans/README.md). For quick changes, use the `plan` output
style instead.

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

When changesets land on `main`, the `release.yml` workflow opens a "Version
Packages" PR. Merging that PR publishes the affected packages to npm with
provenance.

## Upgrading dependencies

```bash
pnpm upgrade && pnpm install
```

The `upgrade` script runs [taze](https://github.com/antfu-collective/taze)
with `--maturity-period 3` so new releases need at least 3 days of soak
time before being adopted.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the project structure, prerequisites, local setup, and commands.

## License

[MIT](./LICENSE) © Stijn Van Hulle

<!-- Badges -->

[stars-src]: https://shieldcn.dev/github/stars/stijnvanhulle/template.svg?variant=secondary&size=xs&theme=zinc&mode=dark
[stars-href]: https://github.com/stijnvanhulle/template
[license-src]: https://shieldcn.dev/npm/license/@stijnvanhulle/template-core.svg?variant=secondary&size=xs&theme=zinc
[license-href]: https://github.com/stijnvanhulle/template/blob/main/LICENSE
[coverage-src]: https://shieldcn.dev/codecov/github/stijnvanhulle/template.svg?variant=secondary&size=xs&theme=zinc&mode=dark
[coverage-href]: https://app.codecov.io/gh/stijnvanhulle/template
