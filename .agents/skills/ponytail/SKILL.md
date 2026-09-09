---
name: ponytail
description: Check new code against a reuse-first decision ladder before adding a dependency, wrapper, or abstraction. Use before implementing a feature and to audit a diff for over-engineering, such as an unneeded package, config option, or component with only one caller.
---

# Ponytail

Before writing new code, or when auditing a diff, work down this ladder and stop at the first
rung that fits.

## When to use

- Before adding a dependency, config option, or abstraction.
- Auditing a diff, a PR, or your own output for anything added beyond what the task needed.

## The decision ladder

1. **Does this need to exist?** Skip safeguards for inputs that can't occur and flags for cases
   nobody asked for.
2. **Already in this codebase?** Search before writing a new helper or component.
3. **Stdlib or the language?** A native method beats a utility function.
4. **A platform or framework feature?** A browser `<input type="date">` beats a hand-rolled date
   picker.
5. **An installed dependency?** Reuse before adding a package.
6. **One line?** Inline it instead of extracting a function or component.
7. **Otherwise:** write only what the task needs.

## Over-engineering looks like

- A dependency for something the stdlib, the platform, or an existing package already does.
- A wrapper with exactly one caller.
- A config or feature flag nobody asked for.
- A function generalized for inputs the codebase never passes it.

Same bar as the `code-style` rule ("three similar lines is better than a premature abstraction"),
applied to dependencies, wrappers, and config at write or review time.

## Guardrails

- Don't strip a check that guards a real trust boundary (see the `security` rule).
- Keep behavior unchanged, unless the ladder shows the simpler version still meets the
  acceptance criteria.
- A dependency or wrapper serving more than one real caller today is not a violation.

## Related skills

| Skill | Use for |
| --- | --- |
| [deslop](../deslop/SKILL.md) | Removing AI style tells (comments, defensive checks, casts) |
| [code-style rule](../conventions/rules/code-style.md) | The house style this ladder enforces on dependencies and abstractions |
