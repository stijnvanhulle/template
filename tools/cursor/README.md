# stijnvanhulle Cursor plugin

A reusable toolkit for TypeScript monorepos: a spec-driven workflow, writing-voice skills, and
the conventions (code style, JSDoc, markdown, plain language, security, testing, USA English).

It ships under the plugin name `toolkit` from the `stijnvanhulle` marketplace. Its `skills/`
symlinks to the repo's canonical `.agents/skills`.

## What you get

Slash commands for the spec-driven workflow and releases:

- `/spec <feature>` writes the Phase 0 spec (requirements and acceptance criteria).
- `/plan <feature>` turns the spec into a numbered implementation plan.
- `/implement <feature>` executes a plan slice and ticks done criteria.
- `/verify <feature>` checks the implementation against the spec.
- `/changeset [patch|minor|major]` creates Changesets for affected packages.
- `/deslop [path]` removes AI-generated code slop from the branch's changes.
- `/humanizer [path]` removes AI writing patterns from the prose the branch changed.

Rules that Cursor auto-attaches by file type, or applies always:

- `code-style` attaches on `.ts`, `.tsx`, and `.vue` files, `jsdoc` on `.ts` and `.tsx`.
- `testing` attaches on `*.test.*` and `*.spec.*` files.
- `markdown` attaches on `.md` and `.mdx`.
- `plain-language`, `security`, and `usa-english` apply on every request.

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

Add the marketplace, then install the plugin. From any shell, with the Cursor CLI (`agent`):

```bash
agent plugin marketplace add https://github.com/stijnvanhulle/template
agent plugin install toolkit@stijnvanhulle
```

The same two steps work as `/plugin` inside a Cursor CLI session, and in the editor under
Settings, Customize, Marketplaces. The manifest Cursor reads is
`.cursor-plugin/marketplace.json` at the repo root.

This plugin's `skills/` is a symlink to `.agents/skills` at the repo root, so an install that
fetches only `tools/cursor/` leaves the link dangling and the skills do not load. When that
happens, clone the whole repo into Cursor's local plugin folder so the symlink resolves:

```bash
git clone https://github.com/stijnvanhulle/template.git ~/.cursor/plugins/local/toolkit
```

Cursor has no plugin deeplink, so there is no one-click install button. Its only deeplink today,
`cursor://anysphere.cursor-deeplink/mcp/install`, installs MCP servers, not plugins.

To try it locally before publishing, point Cursor at this folder as a workspace
plugin, or copy `rules/`, `commands/`, and `agents/` into a project's `.cursor/`
directory, with the skills from `.agents/skills`.

## Usage

Slash commands run when you type them. Name the command and pass any argument:

```text
/deslop                    # strip AI code slop from the whole branch diff
/deslop apps/web           # limit it to one path
/humanizer docs            # rewrite the prose the branch changed under docs/
/spec offline-mode         # start a spec-driven feature
/plan offline-mode         # turn the spec into a numbered plan
/implement offline-mode    # work the next plan slice
/verify offline-mode       # check the result against the spec
/changeset minor           # add a changeset for the current changes
```

Skills load on their own. Each carries a description, and the agent reads the matching one when
the task fits, so writing release notes pulls in `changelog` and cleaning prose pulls in
`humanizer` without being asked. To force one, name it: "use the deslop skill on this diff."

Rules apply on their own too. `plain-language`, `security`, and `usa-english` are always on, and the rest attach
when you open a matching file. The guiding split: rules always apply (or attach by file type),
skills are optional expertise loaded when relevant, and commands are actions you trigger yourself.

## Scope

The plugin ships generic, project-agnostic content. Workspace-specific pieces
(format and lint hooks, `pnpm install` session-start hook, and the template repo's
permissions) stay in this repo's `.claude/` and do not ship with the plugin.
