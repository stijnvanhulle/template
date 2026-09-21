---
argument-hint: [patch|minor|major]
description: Create a Changeset for the current changes with the right semver bump
---

!`git diff --stat HEAD`

Create a Changeset for the changes above, following the `changeset` skill.

1. Determine which workspace packages are affected.
2. Choose the bump type from `$ARGUMENTS`. When it is empty, or the change does not pick a bump
   on its own, follow the `changeset` skill and the `ask` skill: offer `patch`,
   `minor`, and `major`. Do not default to `patch`.
3. Write `.changeset/<slug>.md` in the skill's layout: a one-sentence summary, bullets per
   user-visible change, and a code example when a user writes something differently.

For the surrounding PR checklist, follow the `pr` skill.
