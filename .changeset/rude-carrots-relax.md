---
"@stijnvanhulle/template-claude-plugin": minor
"@stijnvanhulle/template-cursor-plugin": minor
---

Rename the `/issue` command to `/create-issue`

The command name now reads as an action rather than a noun, matching how a
user would ask for it. The `issue` skill it invokes keeps its name, so
`.agents/skills/issue/SKILL.md` is unaffected.
