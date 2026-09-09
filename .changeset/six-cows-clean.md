---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
---

Remove the spec-driven workflow tryout: the `spec-driven` skill, `plans/`, and the `/spec`,
`/plan`, `/implement`, and `/verify` commands. The `plan` output style stays for a quick, inline
implementation plan with no file scaffolding. This drops slash commands and a skill that shipped
in the plugin, so treat it as breaking if you relied on them.
