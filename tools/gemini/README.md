# stijnvanhulle Gemini CLI extension

The Gemini CLI counterpart of the [Claude Code plugin](../claude) and the
[Cursor plugin](../cursor): the same spec-driven workflow and writing-voice commands, plus the
always-on conventions.

Gemini CLI has no on-demand skill loading, so the conventions ship inlined in `GEMINI.md`
instead of as a skill the model picks up when a task matches. That file is generated from
`.agents/skills/conventions/rules/` by `scripts/agentFiles.ts`, and CI fails if it drifts. Edit
the rules, not the generated file.

## What you get

Slash commands, as `commands/*.toml`:

- `/spec <feature>` writes the Phase 0 spec (requirements and acceptance criteria).
- `/plan <feature>` turns the spec into a numbered implementation plan.
- `/implement <feature>` executes a plan slice and ticks done criteria.
- `/verify <feature>` checks the implementation against the spec.
- `/changeset [patch|minor|major]` creates Changesets for affected packages.
- `/deslop [path]` removes AI-generated code slop from the branch's changes.
- `/humanizer [path]` removes AI writing patterns from the prose the branch changed.

Gemini CLI has no subagent concept, so the `code-reviewer` agent that ships with the Claude and
Cursor plugins has no equivalent here.

## Install

```bash
gemini extensions install https://github.com/stijnvanhulle/template
```

Restart the CLI afterward. Management operations, including new slash commands, take effect
only on a fresh session. To try it from a local checkout:

```bash
gemini extensions install --path=./tools/gemini
```

## Usage

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

Commands take their argument through `{{args}}`, and the three that inspect the branch inject
`git diff --stat HEAD` with `!{...}`, which asks for confirmation before it runs.

## Scope

The extension ships generic, project-agnostic content. Workspace-specific pieces (hooks and the
template repo's permissions) stay in this repo's `.claude/` and do not ship here.
