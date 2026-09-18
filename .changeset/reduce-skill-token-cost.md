---
'@stijnvanhulle/template-claude-plugin': patch
'@stijnvanhulle/template-cursor-plugin': patch
---

Cut the token cost of the `jsdoc` and `pr` skills without dropping any guidance.

- Moved the `jsdoc` skill's full `@example` gallery and documentation patterns into
  `references/examples.md`, so the default load only carries the tag tables, guidelines, and tag
  order.
- Shortened the `jsdoc` skill's frontmatter description, since it stays in context in every
  `<skills>` listing whether or not the skill loads.
- Tightened repetitive prose across the `pr` skill's steps, keeping every check and guardrail.
