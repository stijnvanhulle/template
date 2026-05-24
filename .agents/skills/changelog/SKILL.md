---
name: changelog
description: Creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes.
---

# Changelog and versioning

Turn technical git commits into polished, user-facing changelog entries. This monorepo uses
Changesets for versioning and builds the changelog from changeset entries.

## When to use

- Preparing release notes for a new version
- Documenting changes for the website or docs pages
- Keeping a consistent writing style across release notes

## How it works

1. Scan git history for the relevant range.
2. Categorize commits (features, improvements, bug fixes, breaking changes) and filter noise
   (refactor, test, chore).
3. Translate developer commits into customer-facing language.
4. Format entries per the repo conventions.

## References

| Reference | Covers |
| --- | --- |
| [changesets.md](references/changesets.md) | Creating a changeset and the version-bump types |
| [format.md](references/format.md) | `docs/changelog.md` structure, change-type sections, and examples |

## Related skills

| Skill | Use for |
| --- | --- |
| [documentation](../documentation/SKILL.md) | Documentation style for changelog entries |

## Checklist

- [ ] Code changes have matching documentation updates
- [ ] Changeset added via `pnpm changeset` for code changes
- [ ] Changelog updated in `docs/changelog.md`

## Resources

- Changesets: https://github.com/changesets/changesets
- VitePress markdown extensions: https://vitepress.dev/guide/markdown
