# stijnvanhulle Codex prompts

A reusable toolkit for TypeScript monorepos: a spec-driven workflow, writing-voice skills, and
the conventions (code style, JSDoc, markdown, plain language, security, testing, USA English).

Codex reads `AGENTS.md` natively, so the instructions and conventions need no setup at all.
Only the slash commands need installing, and Codex uses a prompt format with `description` and
`argument-hint` frontmatter and `$ARGUMENTS`/`$1` placeholders, so `prompts/` is a symlink to
`../claude/commands` rather than a copy, and the two can never drift.

## What you get

- `/spec <feature>` writes the Phase 0 spec (requirements and acceptance criteria).
- `/plan <feature>` turns the spec into a numbered implementation plan.
- `/implement <feature>` executes a plan slice and ticks done criteria.
- `/verify <feature>` checks the implementation against the spec.
- `/changeset [patch|minor|major]` creates Changesets for affected packages.
- `/deslop [path]` removes AI-generated code slop from the branch's changes.
- `/humanizer [path]` removes AI writing patterns from the prose the branch changed.

Codex has no subagent concept, so there is no code-reviewer agent here.

## Install

Codex discovers prompts from `~/.codex/prompts/`, which is user-scoped rather than
project-scoped, so there is nothing a repo can commit to wire this up for a whole team. Each
person links the folder once:

```bash
mkdir -p ~/.codex/prompts
ln -s "$PWD/tools/codex/prompts"/*.md ~/.codex/prompts/
```

Restart Codex afterward, since it scans the folder at startup. Codex reads only top-level
markdown files there, so link the files rather than the directory.

`/changeset`, `/deslop`, and `/humanizer` open with a `` !`git diff --stat HEAD` `` line that
Claude Code expands into command output. If your Codex version does not support shell
injection in prompts, that line comes through as literal text and the command still works, it
just describes the diff instead of embedding it.

## Scope

The prompts ship generic, project-agnostic content. Workspace-specific pieces (hooks and the
template repo's permissions) stay in this repo's `.claude/` and do not ship here.
