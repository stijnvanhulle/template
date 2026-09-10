---
argument-hint: [source] [count]
description: Work through the latest open issues, one worktree and subagent per issue
---

Work through the backlog from `$ARGUMENTS`, following the `backlog` skill.

Read the source as the first word (`github`, `clickup`, or `jira`) and the count as the second,
defaulting to 10. List that many latest open issues, ask one `AskUserQuestion` batch covering
all of them (implement, skip, or needs more detail), then for each confirmed issue cut a
worktree and branch and spawn a dedicated subagent to implement it and open the PR.

Report one line per issue: implemented and pushed, skipped and why, or waiting on a follow-up.
