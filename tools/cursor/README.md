# stijnvanhulle Cursor plugin

A reusable toolkit for TypeScript monorepos: a spec-driven workflow, writing-voice
skills, a code-reviewer agent, and Cursor rules that ship the always-on conventions
(code style, JSDoc, markdown, security, testing, USA English).

The toolkit is extracted from [stijnvanhulle/template](https://github.com/stijnvanhulle/template)
so the same content powers the template repo itself and any project that installs
the plugin. It ships under the plugin name `toolkit` from the `stijnvanhulle` marketplace.
It is the Cursor counterpart of the Claude Code plugin in [../claude](../claude). Both symlink
their `skills/` to the repo's canonical `.agents/skills`, so the two never drift.

## What you get

Slash commands for the spec-driven workflow and releases:

- `/spec <feature>` writes the Phase 0 spec (requirements and acceptance criteria).
- `/plan <feature>` turns the spec into a numbered implementation plan.
- `/implement <feature>` executes a plan slice and ticks done criteria.
- `/verify <feature>` checks the implementation against the spec.
- `/changeset [patch|minor|major]` creates Changesets for affected packages.
- `/deslop [path]` removes AI-generated code slop from the branch's changes.

Rules that Cursor auto-attaches by file type, or applies always:

- `code-style`, `jsdoc`, and `testing` attach when you edit matching TypeScript files.
- `markdown` attaches when you edit markdown.
- `security` and `usa-english` apply on every request.

Skills loaded on demand from their descriptions:

- `changelog` turns commit history into a user-facing changelog.
- `deslop` strips AI-generated code slop from a diff, the code counterpart to `humanizer`.
- `documentation` is the writing style guide for blog posts and docs.
- `humanizer` removes AI tells from user-facing markdown.
- `jsdoc` covers JSDoc tags and examples for TypeScript.
- `pr` is the PR-prep and release checklist for a Changesets monorepo.
- `spec-driven` drives the spec, plan, implement, and verify loop.
- `conventions` bundles the same rule text the Cursor rules carry.

A `code-reviewer` subagent reviews TypeScript changes for correctness, security,
and maintainability. It is read-only and runs in its own context.

## Install

Add this repo as a marketplace in Cursor's Customize page (Settings, Customize,
Marketplaces), then install the `toolkit` plugin from it. The marketplace manifest
lives at the repo root in `.cursor-plugin/marketplace.json`.

To try it locally before publishing, point Cursor at this folder as a workspace
plugin, or copy `rules/`, `commands/`, and `agents/` into a project's `.cursor/`
directory, with the skills from `.agents/skills`.

## Usage

Slash commands run when you type them. Name the command and pass any argument:

```text
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

Rules apply on their own too. `security` and `usa-english` are always on, and the rest attach
when you open a matching file. The guiding split: rules always apply (or attach by file type),
skills are optional expertise loaded when relevant, and commands are actions you trigger yourself.

## Scope

The plugin ships generic, project-agnostic content. Workspace-specific pieces
(format and lint hooks, `pnpm install` session-start hook, and the template repo's
permissions) stay in this repo's `.claude/` and do not ship with the plugin.
