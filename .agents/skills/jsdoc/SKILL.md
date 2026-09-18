---
name: jsdoc
description: Full JSDoc format guide for TypeScript, covering @example formats, tag usage (@default, @deprecated, what to avoid), documentation patterns, and tag order.
---

# JSDoc

The detailed JSDoc format guide. The essentials live in the `jsdoc` rule; reach here for the
full reference, including every `@example` format and documentation pattern in
[references/examples.md](references/examples.md).

## `@example` format, in brief

- Short value: label on the `@example` line, code as inline backtick on the next line.
- Multi-line code: a fenced ` ```ts ``` ` block immediately after `@example`, never bare lines.
- Multiple variants: separate `@example` blocks, one concern each, never one example for every
  case.

See [references/examples.md](references/examples.md) for a worked example of each, plus the
property, enum, nested-property, and function documentation patterns.

## Tags

### Use frequently

| Tag           | Purpose            | Notes                                                       |
| ------------- | ------------------ | ----------------------------------------------------------- |
| `@default`    | Default value      | Only when the default is non-obvious (omit for `undefined`) |
| `@example`    | Usage example      | Prefer for complex or multi-variant APIs                    |
| `@note`       | Important caveat   | Version info, breaking changes                              |
| `@deprecated` | Mark as deprecated | Include a migration path                                    |

### Use sparingly

| Tag         | Purpose                 |
| ----------- | ----------------------- |
| `@see`      | Reference external docs |
| `@internal` | Internal API            |
| `@beta`     | Experimental            |

### Avoid (TypeScript already provides these)

`@param`, `@returns`, `@type`, and `@typedef` duplicate the TypeScript signature; use the type,
return type, or a `type`/`interface` instead. Skip `@default undefined` too, since an optional
(`?`) property already implies it.

## Guidelines

Do:

- Document what the property does, not its TypeScript type.
- Give every exported type, property, and function a JSDoc comment, always multi-line, with
  concrete, full-sentence descriptions.
- Include `@default` only when the default is non-obvious.
- Use multiple `@example` blocks for different variants, with short, descriptive labels.

Do not:

- Write single-line `/** description */` or `@default undefined`.
- Put code directly on the `@example` line, or use `@param`/`@returns`.
- Over-document trivial, self-explanatory properties.

## Tag order

1. Description (required)
2. Bullet list of variants or behaviors (if applicable)
3. `@default` (if non-obvious)
4. `@example` (one or more)
5. `@note` (if needed)
6. `@deprecated` (if applicable)
7. `@see` (if providing references)
