---
argument-hint: [tracker] [what the issue is about]
description: Open a GitHub issue or Jira ticket with the type, labels, and fields filled in
---

Open an issue or ticket for `$ARGUMENTS`, following the `issue` skill.

Search the open and closed issues or tickets first, and comment on a match instead of opening a
duplicate. Use the matching body from `.agents/skills/issue/templates/`. For GitHub, read the
valid values with `gh label list`, `list_issue_types`, and `list_issue_fields`, then set the
type, the labels, and the Priority and Effort fields. For Jira, pick the story, bug, or epic
template and fill the acceptance criteria.

Report the issue or ticket URL, and which field values you guessed.
