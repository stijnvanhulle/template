---
'@stijnvanhulle/template-claude-plugin': major
'@stijnvanhulle/template-cursor-plugin': major
---

Fold the `ponytail` skill and its `/ponytail` command into `deslop`, so one skill and one
`/deslop` command run both checks in a single pass.

- Runs the reuse-first decision ladder (over-engineering: unneeded deps, wrappers, config)
  alongside the existing AI style-tell checklist (needless comments, defensive checks, `any`
  casts).
- Lists every finding with the file, what it violates, and the proposed fix, then asks before
  changing anything, using a native picker where the client has one and a lettered list
  otherwise. `deslop` used to apply its fixes directly; it now asks first, matching how
  `ponytail` already worked.
- Applies only the findings you confirm.

To upgrade, run `/deslop` where you used to run `/ponytail`.
