---
name: ponytail
description: Check new code against a reuse-first decision ladder before adding a dependency, wrapper, or abstraction. Use before implementing a feature and to audit a diff for over-engineering, such as an unneeded package, config option, or component with only one caller.
---

# Ponytail

Keep new code to what the task needs. Before writing a solution, or when auditing one already
written, work down this ladder and stop at the first rung that fits.

## When to use

- Before implementing a feature that might need a new dependency, config option, or abstraction.
- After writing code, to audit the diff for anything added beyond what the task needed.
- When reviewing a PR that adds a dependency, a wrapper, or a new layer of indirection.

## The decision ladder

1. **Does this need to exist?** Check the acceptance criteria. A safeguard for an input that
   cannot occur, or a config flag for a case nobody asked for, does not.
2. **Already in this codebase?** Search for an existing helper, component, or pattern before
   writing a new one.
3. **Stdlib or the language has it?** Prefer a native method over a utility function.
4. **A native platform or framework feature?** A browser `<input type="date">`, a CSS property,
   or a framework primitive beats a hand-rolled equivalent.
5. **An installed dependency already covers it?** Reuse before adding a new package.
6. **Is one line enough?** Inline a one-off over extracting a function or a component for it.
7. **Otherwise:** write the minimal code the task needs, and nothing past it.

## What counts as over-engineering

- A new dependency for something the stdlib, the platform, or an existing dependency already
  does.
- A wrapper component, service, or abstraction layer with exactly one caller.
- A config option or feature flag for a case nobody asked for.
- Generalizing a function to handle inputs the codebase never passes it.

This is the same bar the `code-style` rule sets ("three similar lines is better than a premature
abstraction"). Ponytail is that bar applied specifically to new dependencies, wrappers, and
config surface, at the point of writing or reviewing a diff.

## How to apply

- **Before writing**: walk the ladder for the specific piece you are about to add. Stop at the
  first rung that solves it.
- **Auditing a diff**: for each new dependency, file, or exported symbol, name which rung it
  should have stopped at and whether it did.

## Guardrails

- Never remove a check that guards a real trust boundary. The `security` rule still requires
  validating external input; this skill targets unnecessary code, not necessary safety.
- Keep behavior unchanged. Flag a rung violation; don't silently rewrite behavior to "simplify"
  it without confirming the simpler version still meets the acceptance criteria.
- A dependency, wrapper, or abstraction that serves more than one real caller today is not a
  violation, even if it looks avoidable in isolation.

## Related skills

| Skill                                                 | Use for                                                                           |
| ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| [deslop](../deslop/SKILL.md)                          | Removing AI-generated style tells (comments, defensive checks, casts) from a diff |
| [code-style rule](../conventions/rules/code-style.md) | The house style this ladder enforces at the dependency and abstraction level      |
