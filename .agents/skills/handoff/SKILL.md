---
name: handoff
description: "Write a handoff document that compresses the current session for the next agent or session. Use when context is getting long, when switching tasks, or before ending a session that another agent will pick up."
---

# Handoff

Condense the current conversation into a compact document the next session can read cold.

## Where to write

Default: `plans/<feature>/handoff.md` if a feature folder exists, otherwise `plans/handoff-<short-slug>.md`. Commit it - the goal is durable context, not scratch state.

## What to include

- **Goal** - one sentence on what we're trying to do.
- **Status** - what's done, what's in progress, what's blocked.
- **Key decisions** - decisions taken and the reasoning, with links to ADRs, PRDs, or `research.md` rather than copying the content.
- **Open questions** - things the next session must decide before continuing.
- **Pointers** - paths and line numbers for the relevant code, the PR or branch name, the failing test if any.
- **Suggested skills** - which skills in `.agents/skills/` the next agent should read first.

## What to leave out

- Full file contents that already exist on disk - reference paths instead.
- Long quoted conversation history - summarise outcomes.
- Secrets, tokens, or PII - redact.

## Format

Keep it under one screen. If it doesn't fit, the next agent won't read it. Use short bulleted sections, not prose.

## After writing

Return the path to the user and a one-line summary. If the conversation is ending, also note the branch name and the next concrete action.
