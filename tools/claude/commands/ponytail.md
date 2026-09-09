---
argument-hint: [path]
description: Audit the current branch's changes for over-engineering (unneeded deps, wrappers, config)
---

!`git diff --stat HEAD`

Audit the branch's diff against the default branch for over-engineering, narrowed to
`$ARGUMENTS` when given.

1. For each new dependency, file, wrapper, or exported symbol, walk the ladder: needed, already
   in the codebase, stdlib or platform, installed dependency, one line.
2. Name the rung each violation should have stopped at and propose the smaller replacement.
   Leave checks that guard a real trust boundary alone.
3. Apply only what the user confirms, run `pnpm format && pnpm lint:fix`, and report a 1-3
   sentence summary.

Follow the `ponytail` skill for the full ladder and guardrails.
