---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# JSDoc conventions

Minimal, high-quality JSDoc. For the full format guide and examples, use the `jsdoc` skill.

- Document what a member does, not its TypeScript type
- Always use multi-line `/** ... */` blocks, never single-line
- Give every exported type, property, and function a comment that adds value beyond the signature
- Use concrete, full-sentence descriptions, not fragments like "Boolean value."
- Include `@default` only when the default is non-obvious (never `@default undefined` or `false`)
- Use `@example` for complex or multi-variant APIs, one concern per example, code on its own line
- Do not use `@param`, `@returns`, `@type`, or `@typedef`, since TypeScript already provides these
- Do not over-document trivial, self-explanatory members

## Voice

JSDoc is prose, so it follows the same house voice as chat replies, markdown files, and inline
code comments. The `humanizer` skill is the full reference.

- No dashes as punctuation (em, en, or a spaced hyphen). Use a period, comma, parentheses, or
  a separate sentence. Hyphenated compounds (`request-scoped`, `four-byte`) are fine.
- No clause-joining semicolons. Two short sentences read better than one long compound.
- Do not lead a route or operation block with ``` `GET /foo` — description ```. Write
  ``` `GET /foo`. Description. ``` instead.
- Sentence-case, no marketing words, cut filler.
