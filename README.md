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

### 30-second setup

[![Install in Claude Code][claude-install-src]][claude-install-href] [![Install in Cursor][cursor-install-src]][cursor-install-href]

The badges link to the steps below rather than installing anything directly: neither tool has a
URL scheme yet for installing a plugin from a third-party marketplace. Cursor's one deeplink is
for MCP servers, and the Claude Code equivalent is an
[open feature request](https://github.com/anthropics/claude-code/issues/62481).

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude plugin marketplace add stijnvanhulle/template
claude plugin install toolkit@stijnvanhulle
```

Reads `CLAUDE.md` (a symlink to `AGENTS.md`) and installs the `toolkit` plugin: rules, skills,
slash commands, and the `code-reviewer` subagent. Other projects can install the same plugin
without cloning this repo — see [tools/claude/README.md](tools/claude/README.md).

</details>

<details>
<summary><strong>Cursor</strong></summary>

```bash
# agent is the Cursor CLI
agent plugin marketplace add https://github.com/stijnvanhulle/template
agent plugin install toolkit@stijnvanhulle
```

Reads `AGENTS.md` natively and installs the matching Cursor plugin: rules (as `.mdc` files), the
same slash commands, and the `code-reviewer` subagent. Other projects install it from
`.cursor-plugin/marketplace.json` — see [tools/cursor/README.md](tools/cursor/README.md).

</details>

<details>
<summary><strong>Gemini CLI</strong></summary>

```bash
gemini extensions install https://github.com/stijnvanhulle/template
```

Installs the extension from `gemini-extension.json` at the repo root, which is where Gemini
looks. It reads `GEMINI.md` and the seven slash commands in `commands/*.toml`. Gemini has no
on-demand skill loading, so `GEMINI.md` is generated as `AGENTS.md` plus the conventions
inlined, rather than symlinked like the other agents' instruction files. No subagent concept
either, so `code-reviewer` has no equivalent. See
[tools/gemini/README.md](tools/gemini/README.md).

</details>

<details>
<summary><strong>OpenCode</strong></summary>

```bash
git clone https://github.com/stijnvanhulle/template.git
```

Reads `opencode.json` and `AGENTS.md` from the repo root, and picks the toolkit up through
`.opencode/`, already wired in this repo. OpenCode uses the same command syntax Claude Code
does, so its `commands/` is a symlink to the Claude ones rather than a copy. The
`code-reviewer` subagent works here too, invoked with `@code-reviewer`. To wire it into another
project, see [tools/opencode/README.md](tools/opencode/README.md).

</details>

<details>
<summary><strong>Codex</strong></summary>

```bash
mkdir -p ~/.codex/prompts
ln -s "$PWD/tools/codex/prompts"/*.md ~/.codex/prompts/
```

Reads `AGENTS.md` natively, so instructions and conventions need no setup. Only the commands
need linking, and because Codex discovers prompts from `~/.codex/prompts/` rather than the
repo, each person links them once. `.codex-plugin/plugin.json` at the repo root describes the
same content for the Codex plugin marketplace. The prompt format matches Claude Code's, so
`prompts/` is a symlink, not a copy. See [tools/codex/README.md](tools/codex/README.md).

</details>

<details>
<summary><strong>Other agents</strong></summary>

Nothing to install. These read `AGENTS.md` directly, or through a symlink, with no plugin step
and no slash commands.

- **GitHub Copilot** (VS Code) reads `.github/copilot-instructions.md`.
- **Kiro** reads `.kiro/steering/` and **Zed** reads `.zed/`. Both are symlinks back to
  `AGENTS.md`.
- **Amp**, **Jules**, and anything else that speaks the AGENTS.md convention read it directly.
  `AGENT.md` is symlinked too, for the tools that look for the singular spelling.
- **Aider** takes it as an argument: `aider --read AGENTS.md`.

</details>

### Skills and commands

Every agent shares one toolset, so a skill or command written once works in all of them:

| Path | What it does | When it loads |
|---|---|---|
| `.agents/skills/conventions/` | Always-on rules: code style, JSDoc, markdown, security, testing, USA English | Session start, plus path-scoped rules when a matching file opens |
| `.agents/skills/` | Playbooks: changelog, deslop, documentation, humanizer, jsdoc, pr, spec-driven | On demand, when a task matches the skill |
| `tools/*/commands/changeset` | `/changeset` creates a changeset with the right semver bump | When you type the command |
| `tools/*/commands/deslop` | `/deslop` removes AI-generated code slop from the current branch's changes | When you type the command |
| `tools/*/commands/humanizer` | `/humanizer` removes AI writing patterns from the prose changed on the current branch | When you type the command |
| `tools/*/commands/spec` | `/spec` drafts or refines a feature's Phase 0 spec (requirements and acceptance criteria) | When you type the command |
| `tools/*/commands/plan` | `/plan` turns a feature's spec and research into `plan.md`, then scaffolds its slices | When you type the command |
| `tools/*/commands/implement` | `/implement` works a feature's slices one at a time, ticking each slice's done criteria | When you type the command |
| `tools/*/commands/verify` | `/verify` fills a feature's `verification.md` with scenarios mapped to acceptance criteria, then runs them | When you type the command |
| `tools/{claude,cursor,opencode}/agents/` | Subagents with their own context window (`code-reviewer`). Not supported by Gemini CLI or Codex | When delegated a matching task |
| `tools/claude/output-styles/` | System-prompt modes: `house` (default), `plan`, `diagrams-first`. Claude Code only | Session start, or when selected |

Each agent's plugin manifest sits at the repo root, where its CLI looks for it, and points back
at the shared content under `tools/`: `.claude-plugin/`, `.cursor-plugin/`, `.codex-plugin/`,
`gemini-extension.json`, and `opencode.json`. Gemini also needs its `commands/` beside the
manifest, so the root `commands/` symlink points at `tools/gemini/commands`.

Commands live once per format, not once per agent. OpenCode and Codex use Claude Code's command
syntax, so their folders are symlinks to `tools/claude/commands/`. Cursor and Gemini CLI need
their own formats (`.mdc` rules, `.toml` commands), so those are real files, and
`pnpm agent-files` checks in CI that they still expose the same command set. It also regenerates
`GEMINI.md`, the one generated file, with `pnpm agent-files --write`.

`.claude/`, `.cursor/`, `.gemini/`, and `.opencode/` are workspace config, symlinked into their
`tools/` folders so this repo runs the same plugins it distributes.

For larger features, `plans/` holds a spec-driven workflow (spec, research, plan, slices,
verification) driven by the `spec-driven` skill and the `/spec`, `/plan`, `/implement`, and
`/verify` commands. See [plans/README.md](plans/README.md). For quick changes, use the `plan`
output style instead.

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
