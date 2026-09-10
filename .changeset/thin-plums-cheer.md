---
"@stijnvanhulle/template-claude-plugin": minor
"@stijnvanhulle/template-cursor-plugin": minor
---

Add the `issue-batch` skill and a GitLab-style branch naming option

`issue-batch` works through the latest open issues one by one: it loads the 10 most recent
GitHub or Jira issues, asks a clarifying question per issue before touching code, then
implements each confirmed issue in its own git worktree with its own subagent.

The `branch` skill also documents an alternate naming shape for repos that enforce GitLab's
convention (`feature/ABC-123_branch-name`, uppercase issue reference, underscore separator)
instead of this template's default `<type>/<id>-<slug>`.
