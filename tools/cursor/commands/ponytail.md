---
argument-hint: [path]
description: Audit the current branch's changes for over-engineering (unneeded deps, wrappers, config)
---

!`git diff --stat HEAD`

Audit the changes on this branch for over-engineering, narrowed to `$ARGUMENTS` when a path or
glob is given.

1. Review the branch's diff against the default branch.
2. For every new dependency, file, wrapper, or exported symbol, walk the decision ladder: does it
   need to exist, is it already in the codebase, does the stdlib or platform cover it, does an
   installed dependency cover it, would one line do?
3. Name each rung a change should have stopped at but didn't, and propose the smaller
   replacement. Do not touch a check that guards a real trust boundary.
4. Apply only the changes the user confirms, then run `pnpm format && pnpm lint:fix` and report a
   1-3 sentence summary.

Follow the `ponytail` skill for the full ladder and guardrails.
