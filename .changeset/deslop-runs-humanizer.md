---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
---

`deslop` now runs the `humanizer` pattern list as a third pass over any changed README, doc,
comment block, or other user-facing markdown in the diff, alongside its existing reuse-first
ladder and code style-tell checks.

- One `/deslop` run now covers over-engineering, code style tells, and AI writing tells in
  prose, instead of needing a separate `/humanizer` pass for prose changes.
- `humanizer` still works standalone for prose review outside a code diff.
