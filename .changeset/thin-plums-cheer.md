---
"@stijnvanhulle/template-claude-plugin": minor
"@stijnvanhulle/template-cursor-plugin": minor
---

Add the `backlog` skill and a new branch naming shape

`backlog` works through the latest open issues one by one: run `/backlog github 10` or
`/backlog jira` to load that many latest issues, confirm scope per issue, then implement each
confirmed issue in its own git worktree with its own subagent.

The `branch` and `pr` skills now name every branch `<category>/<ISSUE-REF>_<branch-name>`
(`feature/DEV-2048_add-dark-mode-toggle`): category in lowercase, issue reference in uppercase,
branch name in kebab-case, joined by an underscore. This replaces the previous
`<type>/<id>-<slug>` shape.
