---
name: deslop
description: Audit a branch's diff for AI-generated code smell, both over-engineering (unneeded deps, wrappers, config) and style tells (needless comments, defensive checks, `any` casts), then apply only the findings the user confirms. Use before implementing a feature, before opening a PR, or when auditing a diff for AI slop.
---

# Deslop

Two passes over the same diff: whether the code should exist in this shape (the reuse-first
ladder), and whether it reads like a human wrote it (the AI style tells). Report every finding
before changing anything, then apply only what the user confirms.

## When to use

- Before adding a dependency, config option, or abstraction.
- After writing or generating a batch of code, before opening a PR.
- Auditing a diff, a PR, or your own output for over-engineering or AI style tells.

## 1. The reuse-first decision ladder

For each new dependency, file, wrapper, or exported symbol, work down this ladder and stop at the
first rung that fits:

1. **Does this need to exist?** Skip safeguards for inputs that can't occur and flags for cases
   nobody asked for.
2. **Already in this codebase?** Search before writing a new helper or component.
3. **Stdlib or the language?** A native method beats a utility function.
4. **A platform or framework feature?** A browser `<input type="date">` beats a hand-rolled date
   picker.
5. **An installed dependency?** Reuse before adding a package.
6. **One line?** Inline it instead of extracting a function or component.
7. **Otherwise:** write only what the task needs.

Over-engineering looks like a dependency for something the stdlib, the platform, or an existing
package already does, a wrapper with exactly one caller, a config or feature flag nobody asked
for, or a function generalized for inputs the codebase never passes it. A dependency or wrapper
serving more than one real caller today is not a violation.

## 2. AI style tells

- Comments a human would not add: restating what the code already says, or inconsistent with the
  comment density of the rest of the file.
- Defensive checks and `try/catch` blocks abnormal for the area, especially on trusted or
  already-validated code paths. The `security` rule puts validation at trust boundaries, not in
  internal code.
- Casts to `any` used only to bypass a type error. Fix the type instead.
- Deep nesting that early returns would flatten.
- Naming, import, or export style inconsistent with the file and the `code-style` rule.

Prose and user-facing markdown are out of scope for either pass. Run the `humanizer` skill over
those instead.

## 3. Report, then ask

List every finding from both passes: file, the rung or tell it violates, and the proposed fix.
Do not edit anything yet.

Follow the `user-questions` rule to confirm before applying: one `AskUserQuestion` batch in a
client that has it (apply / skip / show more, per finding or per closely related group), a
lettered list in a client that does not. Skipping here costs nothing; skipping after an edit
costs a revert.

## 4. Apply only what is confirmed

- Keep behavior unchanged unless fixing a clear bug the ladder or the tells surfaced.
- Prefer minimal, surgical edits over broad rewrites.
- Never remove a check that guards a real trust boundary or real error handling. When unsure
  whether a check is slop or load-bearing, leave it and say so.
- Do not weaken types, lint rules, or tests to make an edit pass. Fix the root cause.
- After editing, run `pnpm format && pnpm lint:fix` and let the tests pass.
- Report a 1-3 sentence summary of what changed and what was left as-is.

## Related skills

| Skill                                                         | Use for                                                                     |
| ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [humanizer](../humanizer/SKILL.md)                            | Removing AI tells from prose and user-facing markdown                       |
| [code-style rule](../conventions/rules/code-style.md)         | The house style this skill enforces on code, dependencies, and abstractions |
| [user-questions rule](../conventions/rules/user-questions.md) | How the confirm step renders per client                                     |
