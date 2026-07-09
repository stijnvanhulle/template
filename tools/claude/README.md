# stijnvanhulle Claude Code plugin

A reusable toolkit for TypeScript monorepos: a spec-driven workflow, writing-voice
skills, a code-reviewer agent, output styles, and a `conventions` skill that ships
the always-on rules (code style, JSDoc, markdown, security, testing).

The toolkit is extracted from [stijnvanhulle/template](https://github.com/stijnvanhulle/template)
so the same content powers the template repo itself and any project that installs
the plugin. It is published under the plugin name `toolkit` from the `stijnvanhulle` marketplace, so the install reads as
`toolkit@stijnvanhulle`.

## What you get

Slash commands for the spec-driven workflow and releases:

- `/spec <feature>` writes the Phase 0 spec (requirements and acceptance criteria).
- `/plan <feature>` turns the spec into a numbered implementation plan.
- `/implement <feature>` executes a plan slice and ticks done criteria.
- `/verify <feature>` checks the implementation against the spec.
- `/changeset [patch|minor|major]` creates Changesets for affected packages.
- `/deslop [path]` removes AI-generated code slop from the branch's changes.

Skills loaded on demand from their descriptions:

- `changelog` turns commit history into a user-facing changelog.
- `deslop` strips AI-generated code slop from a diff, the code counterpart to `humanizer`.
- `documentation` is the writing style guide for blog posts and docs.
- `humanizer` removes AI tells from user-facing markdown.
- `jsdoc` covers JSDoc tags and examples for TypeScript.
- `pr` is the PR-prep and release checklist for a Changesets monorepo.
- `spec-driven` drives the spec → plan → implement → verify loop.
- `conventions` bundles the five always-on rules (code style, JSDoc, markdown,
  security, testing).

A `code-reviewer` subagent reviews TypeScript changes for correctness, security,
and maintainability. Three output styles set the writing voice (`house`),
spec-driven formatting (`plan`), and a diagrams-first layout (`diagrams-first`).

## Install

```bash
# add this repo as a marketplace, then install the plugin
/plugin marketplace add stijnvanhulle/template
/plugin install toolkit@stijnvanhulle
```

To try it locally before publishing:

```bash
claude --plugin-dir ./tools/claude
```

## Usage

Slash commands run when you type them. In Claude Code, name the command and pass any
argument:

```bash
/deslop                    # strip AI code slop from the whole branch diff
/deslop apps/web           # limit it to one path
/spec offline-mode         # start a spec-driven feature
/plan offline-mode         # turn the spec into a numbered plan
/implement offline-mode    # work the next plan slice
/verify offline-mode       # check the result against the spec
/changeset minor           # add a changeset for the current changes
```

Skills load on their own. Each carries a description, and the agent reads the matching one when
the task fits, so writing release notes pulls in `changelog` and cleaning prose pulls in
`humanizer` without being asked. To force one, name it: "use the deslop skill on this diff."

The `conventions` rules (code style, JSDoc, markdown, security, testing) are always on and need
no trigger. The guiding split: rules always apply, skills are optional expertise loaded when
relevant, and commands are actions you trigger yourself.

## Scope

The plugin ships generic, project-agnostic content. Workspace-specific pieces
(format and lint hooks, `pnpm install` session-start hook, edit guards, and the
template repo's `settings.json` permissions) stay in this repo's `.claude/` and
do not ship with the plugin.
