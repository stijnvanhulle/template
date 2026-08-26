---
name: conventions
description: Always-on conventions for TypeScript monorepos. Use when writing or reviewing TypeScript, markdown, or tests, when handling secrets, env vars, or input at trust boundaries, or any time you would otherwise reach for a project style guide. Bundles code style, JSDoc, markdown structure, plain language, security, testing, and USA English rules.
---

# Conventions

This skill ships the rules the template repo keeps in
`.agents/skills/conventions/rules/`. When the plugin is installed in another
project, the same files load on demand from here instead.

`plain-language`, `security`, and `usa-english` apply to every request. The rest
carry `paths:` frontmatter and load when you open a matching file.

Read the file that matches what you are doing:

- [`rules/code-style.md`](./rules/code-style.md) for ESM conventions, naming, imports, and exports.
- [`rules/jsdoc.md`](./rules/jsdoc.md) for the JSDoc essentials. The full reference
  lives in the separate `jsdoc` skill.
- [`rules/markdown.md`](./rules/markdown.md) for markdown structure. The `documentation` and
  `humanizer` skills cover writing voice and SEO.
- [`rules/plain-language.md`](./rules/plain-language.md) for the ISO 24495-1 plain language
  standard that agent responses and other user-facing output follow.
- [`rules/security.md`](./rules/security.md) for secrets, input validation at trust
  boundaries, and safe shell use.
- [`rules/testing.md`](./rules/testing.md) for Vitest patterns and what to test.
- [`rules/usa-english.md`](./rules/usa-english.md) for the USA English spelling
  convention used across code, comments, and docs.

If a rule conflicts with a project-specific instruction in `AGENTS.md` or
`CLAUDE.md`, the project instruction wins.
