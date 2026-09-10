---
name: branch
description: Cut a Conventional Commit branch from the issue it belongs to
---

Create a branch for `$1`, following the `branch` skill.

Read the source first: `gh issue view` for a GitHub issue, `clickup_get_task` for a ClickUp
task, and the key itself for Jira, since no Jira server is connected. Pick the type from the
labels, turn the title into a short slug, and cut `<type>/<id>-<slug>` from `origin/main`.

Report the branch name, the issue it came from, and anything you guessed.
