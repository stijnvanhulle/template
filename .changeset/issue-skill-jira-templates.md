---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
---

The `issue` skill now files Jira tickets alongside GitHub issues, and its templates move into the
skill itself.

- Adds a story, bug, and epic template for Jira, using `createJiraIssue`, `editJiraIssue`, and
  `searchJiraIssuesUsingJql`.
- Adds a "pick the tracker" table so the skill routes GitHub issues and Jira tickets to the right
  template.
- Moves the GitHub bug and feature bodies from `.github/ISSUE_TEMPLATE/` into
  `.agents/skills/issue/templates/`, so every consuming repo gets a body shape even without its
  own issue forms.
