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

Claude Code, Cursor, and Codex read from the same source: `AGENTS.md` plus the Agent Skills in
`.agents/skills/`. Tool-specific files are symlinks where their formats match.

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

### Skills and commands

All three supported agents share one toolset:

| Path                                     | What it does                                                                                                                                                           | When it loads                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `.agents/skills/conventions/`            | Rules: code style, JSDoc, markdown, plain language, security, testing, USA English                                                                                     | Session start, plus path-scoped rules when a matching file opens |
| `.agents/skills/`                        | Playbooks: ask, backlog, branch, changelog, changeset, deslop, documentation, humanizer, issue, jsdoc, pr                                                               | On demand, when a task matches the skill, or when you name it    |
| `tools/*/commands/create-branch`         | `/create-branch` cuts a Conventional Commit branch from the issue it belongs to                                                                                        | When you type the command                                        |
| `tools/*/commands/create-changeset`      | `/create-changeset` creates a changeset with the right semver bump                                                                                                     | When you type the command                                        |
| `tools/*/commands/create-issue`          | `/create-issue` opens a GitHub issue with the type, labels, and fields filled in                                                                                       | When you type the command                                        |
| `tools/*/commands/create-pr`             | `/create-pr` runs the pre-push checks, adds a changeset when one is needed, and opens the pull request                                                                 | When you type the command                                        |
| `tools/{claude,cursor}/agents/`          | Subagents with their own context window (`code-reviewer`). Not supported by Codex                                                                                      | When delegated a matching task                                   |
| `tools/claude/output-styles/`            | System-prompt modes: `house` (default), `plan`, `diagrams-first`. Claude Code only                                                                                     | Session start, or when selected                                  |

Each plugin manifest sits at the repo root and points back at the shared content under
`tools/`: `.claude-plugin/`, `.cursor-plugin/`, and `.codex-plugin/`.

Codex uses Claude Code's command syntax, so `tools/codex/prompts/` is a symlink to
`tools/claude/commands/`. Cursor needs its commands and rules in its own format, so those are
real files. `pnpm agent-files` checks in CI that the command sets match and that Cursor's rules
have not drifted from their sources.

`.claude/` and `.cursor/` are workspace config, symlinked into their `tools/` folders so this
repo runs the same plugins it distributes.

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
