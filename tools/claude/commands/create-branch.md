---
argument-hint: [issue reference or what the work is]
description: Cut a Conventional Commit branch from the issue it belongs to
---

Create a branch for `$ARGUMENTS`, following the `branch` skill.

Read the source first: `gh issue view` for a GitHub issue, `clickup_get_task` for a ClickUp
task, and the key itself for Jira, since no Jira server is connected. Pick the category from the
labels, turn the title into a short kebab-case name, and cut
`<category>/<ISSUE-REF>_<branch-name>` from `origin/main`.

Report the branch name, the issue it came from, and anything you guessed.
