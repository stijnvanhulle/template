---
name: backlog
description: Work through the latest open issues, one worktree and subagent per issue
---

Work through the backlog from `$1` and `$2`, following the `backlog` skill.

Read the source as `$1` (`github`, `clickup`, or `jira`) and the count as `$2`, defaulting to
10. List that many latest open issues, ask one batch of questions covering all of them
(implement, skip, or needs more detail), then for each confirmed issue cut a worktree and
branch and spawn a dedicated subagent to implement it and open the PR.

Report one line per issue: implemented and pushed, skipped and why, or waiting on a follow-up.
