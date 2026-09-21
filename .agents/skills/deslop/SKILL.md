---
name: deslop
description: Audit a diff for over-engineering and AI code/prose tells, then apply only confirmed fixes.
---

# Deslop

## 1. The reuse-first decision ladder

For each new dependency, file, wrapper, or export, stop at the first fit:

1. **Does this need to exist?** Skip safeguards for inputs that can't occur and flags for cases
   nobody asked for.
2. **Already in this codebase?** Search before writing a new helper or component.
3. **Stdlib or the language?** A native method beats a utility function.
4. **A platform or framework feature?** A browser `<input type="date">` beats a hand-rolled date
   picker.
5. **An installed dependency?** Reuse before adding a package.
6. **One line?** Inline it instead of extracting a function or component.
7. **Otherwise:** write only what the task needs.

Flag dependencies covered by an earlier rung, one-caller wrappers, unrequested flags, and
generality for inputs never passed. Two real callers means reuse, not a violation.

## 2. Code tells

- Comments that restate code or do not match local comment density.
- Abnormal defensive checks or `try/catch` on trusted paths. Keep trust-boundary validation.
- `any` casts that dodge a type error.
- Deep nesting that early returns would flatten.
- Naming/import/export style inconsistent with nearby code.

## 3. Prose

Run `humanizer` criteria on changed docs/comments. Skip when no prose changed.

## 4. Report, then ask

Before editing, list each finding with path, violated rung/tell, and fix. Use `ask`: apply /
skip / show more per finding or related group.

## 5. Apply only what is confirmed

- Preserve behavior unless fixing a clear bug. Make surgical edits.
- Keep trust-boundary checks and real error handling.
- Fix root causes; never weaken types, rules, or tests.
- Run format, lint, and relevant tests. Summarize changes and skipped findings.

## Related skills

| Skill                                                         | Use for                                                                     |
| ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [humanizer](../humanizer/SKILL.md)                            | The full pattern list step 3 runs, and prose review outside a code diff     |
| [code-style rule](../conventions/rules/code-style.md)         | The house style this skill enforces on code, dependencies, and abstractions |
| [ask](../ask/SKILL.md)                                         | How the confirm step renders per client                                     |
