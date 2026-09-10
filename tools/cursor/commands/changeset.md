---
name: changeset
description: Create a Changeset for the current changes with the right semver bump
---

Create a Changeset for the current changes on this branch, following the `changeset` skill.

1. Review the changes (the diff against the default branch) and determine which workspace packages
   are affected.
2. Choose the bump type from `$1` (default `patch` when empty): `patch` for fixes, `minor` for
   backwards-compatible features, `major` for breaking changes.
3. Write `.changeset/<slug>.md` in the skill's layout: frontmatter, a one-sentence summary,
   bullets for each user-visible change, and a code example when a user writes something
   differently.

For the surrounding PR checklist, follow the `pr` skill.
