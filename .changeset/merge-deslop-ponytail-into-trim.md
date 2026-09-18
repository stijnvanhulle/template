---
'@stijnvanhulle/template-claude-plugin': major
'@stijnvanhulle/template-cursor-plugin': major
---

Replace the `deslop` and `ponytail` skills and their `/deslop` and `/ponytail` commands with a
single `trim` skill and `/trim` command that runs both checks in one pass.

- Runs the reuse-first decision ladder (over-engineering: unneeded deps, wrappers, config) and
  the AI style-tell checklist (needless comments, defensive checks, `any` casts) together.
- Lists every finding with the file, what it violates, and the proposed fix, then asks before
  changing anything, using a native picker where the client has one and a lettered list
  otherwise.
- Applies only the findings you confirm.

To upgrade, run `/trim` where you used to run `/deslop` or `/ponytail`.
