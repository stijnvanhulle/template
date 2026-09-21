---
argument-hint: [patch|minor|major]
description: Create a Changeset for the current changes with the right semver bump
---

!`git diff --stat HEAD`

Create a Changeset for the changes above, following the `changeset` skill.
Use `$ARGUMENTS` as the bump when present. Otherwise follow the skill's `ask` stop.
