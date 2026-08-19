<div align="center">

[![Stars][stars-src]][stars-href]
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

Every agent reads from the same source: `AGENTS.md` plus the Agent Skills in `.agents/skills/`.
Tool-specific files are symlinks, not copies, so nothing drifts out of sync.

[![Install in Claude Code][claude-install-src]][claude-install-href] [![Install in Cursor][cursor-install-src]][cursor-install-href]

Claude Code and Cursor also get a matching plugin (rules, slash commands, a code-reviewer
subagent) from this repo's marketplace:

```bash
# Claude Code
claude plugin marketplace add stijnvanhulle/template && claude plugin install toolkit@stijnvanhulle

# Cursor (agent is the Cursor CLI)
agent plugin marketplace add https://github.com/stijnvanhulle/template
agent plugin install toolkit@stijnvanhulle
```

The badges above link to those commands rather than installing anything directly: neither tool
has a URL scheme for installing a plugin from a third-party marketplace yet. Cursor's one
deeplink is for MCP servers, and the Claude Code equivalent is an
[open feature request](https://github.com/anthropics/claude-code/issues/62481).

<details>
<summary><strong>Claude Code</strong></summary>

Reads `CLAUDE.md` (a symlink to `AGENTS.md`) and gets the full plugin: rules, skills, slash
commands, and the `code-reviewer` subagent, all under `.claude/`, which itself symlinks into
`tools/claude/`.

| Path | What it does | When it loads |
|---|---|---|
| `.claude/rules/` | Always-on conventions: code style, JSDoc, markdown, security, testing, USA English | Session start, plus path-scoped rules when a matching file opens |
| `.claude/skills/` | Playbooks: changelog, deslop, documentation, humanizer, jsdoc, pr, spec-driven | On demand, when a task matches the skill |
| `.claude/commands/` | Slash commands: `/changeset`, `/deslop`, `/spec`, `/plan`, `/implement`, `/verify` | When you type the command |
| `.claude/agents/` | Subagents with their own context window (`code-reviewer`) | When delegated a matching task |
| `.claude/output-styles/` | System-prompt modes: `house` (default), `plan`, `diagrams-first` | Session start, or when selected |
| `.claude/hooks/` | Installs deps in remote sessions, blocks edits to the lockfile and build output, formats and lints on turn end | On the matching event |
| `.claude/settings.json` | Permissions, hook registration, default output style | Always |

Other projects can pull in the same plugin without cloning this repo — see
[tools/claude/README.md](tools/claude/README.md).

</details>

<details>
<summary><strong>Cursor</strong></summary>

Reads `AGENTS.md` natively and gets the toolkit as a Cursor plugin under `tools/cursor/`
(conventions as `rules/*.mdc`, the same slash commands, and the `code-reviewer` subagent),
wired into this repo through `.cursor/`.

Other projects install it from `.cursor-plugin/marketplace.json` — see
[tools/cursor/README.md](tools/cursor/README.md).

</details>

<details>
<summary><strong>Other agents</strong></summary>

- **Gemini CLI** reads `GEMINI.md`, a symlink to `AGENTS.md`.
- **GitHub Copilot** (VS Code) reads `.github/copilot-instructions.md`, also a symlink to
  `AGENTS.md`.
- **OpenAI Codex / ChatGPT** and **OpenCode** read `AGENTS.md` and the Agent Skills in
  `.agents/skills/` natively, no symlink needed.
- **Windsurf**, and anything else that speaks the AGENTS.md convention, reads `AGENTS.md`
  directly.

</details>

<details>
<summary><strong>Folder structure</strong></summary>

```
AGENTS.md                                     # canonical instructions every agent reads
CLAUDE.md → AGENTS.md                         # Claude Code
GEMINI.md → AGENTS.md                         # Gemini CLI
.github/copilot-instructions.md → AGENTS.md   # GitHub Copilot in VS Code
.agents/skills/                               # canonical cross-provider Agent Skills
├── changelog, deslop, documentation, humanizer, jsdoc, pr, spec-driven
└── conventions/                              # always-on rules: code-style, jsdoc, markdown, security, testing, usa-english
tools/claude/                                 # distributable Claude Code plugin
├── skills → ../../.agents/skills
├── commands/                                 # /changeset, /deslop, /humanizer, /spec, /plan, /implement, /verify
├── agents/                                   # code-reviewer
└── output-styles/                            # house (default), plan, diagrams-first
tools/cursor/                                 # distributable Cursor plugin, same toolset
├── rules/                                    # Cursor rules (.mdc)
├── commands/
├── agents/
└── skills → ../../.agents/skills
.cursor-plugin/marketplace.json               # Cursor marketplace manifest
.claude/                                      # Claude workspace config, symlinked into tools/claude/
.cursor/                                      # Cursor workspace config, symlinked into tools/cursor/
plans/                                        # spec-driven workflow: spec, research, plan, slices, verification
```

</details>

For larger features, `plans/` holds a spec-driven workflow driven by the `spec-driven` skill
and the `/spec`, `/plan`, `/implement`, and `/verify` commands. See
[plans/README.md](plans/README.md). For quick changes, use the `plan` output style instead.

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
[claude-install-src]: https://img.shields.io/badge/Install%20in-Claude%20Code-D97757?logo=claude&logoColor=white&style=for-the-badge
[claude-install-href]: tools/claude/README.md#install
[cursor-install-src]: https://img.shields.io/badge/Install%20in-Cursor-1A1A1A?logo=cursor&logoColor=white&style=for-the-badge
[cursor-install-href]: tools/cursor/README.md#install
