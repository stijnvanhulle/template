# Changelog format

The changelog follows a specific structure in `docs/changelog.md`.

- Use `##` for version headings, not `#`.
- Use `###` for change-type sections with emoji prefixes.
- Use `####` for individual package names with links.

Change types:

| Category            | Description                            |
| ------------------- | -------------------------------------- |
| ✨ Features         | New functionality and enhancements     |
| 🐛 Bug Fixes        | Bug fixes and corrections              |
| 🚀 Breaking Changes | Changes that may require code updates   |
| 📦 Dependencies     | Package updates and dependency changes |

Example:

## 2.5.0

### ✨ Features

#### `plugin-ts`

Added support for generating union types with the new `unionType` option.

::: code-group

```typescript [Before]
// Generated separate types
export type PetDog = { type: 'dog'; bark: string }
export type PetCat = { type: 'cat'; meow: string }
```

```typescript [After]
export type Pet = PetDog | PetCat
```

:::

## Documenting bug fixes

When fixing bugs that affect user-facing behavior:

1. Update relevant documentation (fix incorrect examples, clarify ambiguous descriptions, update
   the troubleshooting guide).
2. Add to the changelog via `pnpm changeset` (explain what was broken, show correct usage, link
   to the docs).
3. Consider migration notes when the fix changes expected behavior (add before and after examples
   to the migration guide).

Example:

## Fixed incorrect enum type output

**Issue**: `enumType: 'asConst'` generated invalid TypeScript

**Fixed**: Now correctly generates:

```typescript
const petType = {
  Dog: 'dog',
  Cat: 'cat',
} as const
```
