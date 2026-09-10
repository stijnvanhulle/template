---
"@stijnvanhulle/template-claude-plugin": minor
"@stijnvanhulle/template-cursor-plugin": minor
---

Add the `issue-batch` skill and switch branch naming to the GitLab shape

`issue-batch` works through the latest open issues one by one: it loads the 10 most recent
GitHub or Jira issues, asks a clarifying question per issue before touching code, then
implements each confirmed issue in its own git worktree with its own subagent.

The `branch` and `pr` skills now name every branch `<category>/<ISSUE-REF>_<branch-name>`
(`feature/ABC-123_branch-name`), GitLab's convention: category in lowercase, issue reference in
uppercase, branch name in kebab-case, joined by an underscore. This replaces the previous
`<type>/<id>-<slug>` shape.
