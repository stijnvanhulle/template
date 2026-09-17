---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
---

Adds a `user-questions` convention rule so every skill asks the user a short, concrete question
instead of an open paragraph when a task has a few known paths.

- Uses the native multiple-choice tool (`AskUserQuestion` in Claude Code and Claude Desktop)
  where the client supports it, and falls back to a lettered list in plain text for Codex,
  Cursor, Gemini CLI, and OpenCode.
- Applies to every request, alongside `plain-language`, `security`, and `usa-english`.
- Updates the `backlog` skill's per-issue confirmation to point at the fallback for clients
  without a native picker.
