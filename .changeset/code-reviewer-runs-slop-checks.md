---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
---

`code-reviewer` now folds `deslop`'s reuse-first ladder and AI style tells, `jsdoc`'s
conventions, `humanizer`'s pattern list, and `documentation`'s style guide into its review, in
that order, then asks which findings to hand off for fixing.

- Stays read-only: it reports findings by these skills' criteria instead of applying their
  fixes, then follows the `user-questions` rule to ask which of `deslop`, `jsdoc`, `humanizer`,
  or `documentation` you want run next.
- A pass with nothing in its category (no exported symbols touched, no prose changed) is
  skipped rather than forced.
