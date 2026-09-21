---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
'@stijnvanhulle/template-codex-plugin': minor
---

Drop the `backlog`, `deslop`, and `humanizer` commands, which showed up twice in the slash menu next to the skills of the same name.

- Reach all three through their skills, which the slash menu already lists.
- Keep the four `create-*` commands, and stop on the `ask` skill instead of guessing a bump,
  tracker, type, or dirty working tree.
- Remove the Gemini CLI and OpenCode integrations. The toolkit now supports Claude Code,
  Cursor, and Codex.
