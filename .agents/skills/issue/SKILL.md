---
name: issue
description: Open a GitHub issue or a Jira ticket with its sidebar filled in, so the labels, the type, and the fields are set rather than left empty. Use when filing an issue, filing a Jira ticket, turning a report into one, or triaging an issue whose fields are empty.
---

# Issue skill

An issue with an empty sidebar sits in the backlog unsorted. Set the type, the labels, and the
fields in the same pass as the title and body.

## Pick the tracker

| Tracker | When | Template |
| --- | --- | --- |
| GitHub | The repo has a GitHub remote and the branch carries no project key | `templates/github-bug.md`, `templates/github-feature.md` |
| Jira | The branch name or `CLAUDE.md` carries a project key such as `KEY-123` | `templates/jira-story.md`, `templates/jira-bug.md`, `templates/jira-epic.md` |

The rest of this skill covers GitHub. For Jira, see the section near the end.

When both trackers are possible, or neither is obvious, follow the `user-questions` rule before
writing anything: GitHub, Jira. Do not open a ticket on the wrong tracker and report it as a
guess.

## 1. Check it is not already open

```bash
gh issue list --search "<keywords>" --state all --limit 10
```

Comment on the match instead of opening a second issue.

## 2. Write it

Pick the body from `templates/`: `github-bug.md` for a defect, `github-feature.md` for new
behavior. Answer every placeholder.

Title in the imperative, under 72 characters, no period, so `fix the resolver cache miss on
nested plugins` rather than `Resolver bug`. A bug body carries the version, the steps, the
expected result, and what happened instead. A feature body leads with the problem and links the
code it is about.

## 3. Read the valid values

Never invent a label, a type, or an option name. `gh label list` covers labels. Types and fields
come from the organization, so read those with the GitHub MCP server's `list_issue_types` and
`list_issue_fields`.

## 4. Fill the sidebar

Set the type first: Bug for something that broke or contradicts its documentation, Feature for
new behavior somebody asked for, Task for work with no user-visible change, such as CI, releases,
or agent files. When the type is not obvious, follow the `user-questions` rule: Bug, Feature,
Task. Do not guess Medium/Medium and move on.

| Field | Options | Pick |
| --- | --- | --- |
| Priority | Urgent, High, Medium, Low | Urgent blocks a release or breaks the published package for everyone. High hits users today with no workaround. Medium is the default. Low is a nice-to-have |
| Effort | High, Medium, Low | Low is one file a reviewer reads in one sitting. Medium spans a few files or needs a test. High needs a design decision or touches a public API |

Stuck on Priority or Effort: follow the `user-questions` rule rather than defaulting to Medium.

## 5. Create it

`gh issue create --title "<title>" --body-file <body>.md --label bug --assignee @me` writes the
issue as whoever runs it. The fields go through the GitHub MCP server's `issue_write`, which
validates each option name before the call:

```json
{
  "method": "create", "owner": "<owner>", "repo": "<repo>",
  "title": "<title>", "body": "<body>", "type": "Bug", "labels": ["bug"],
  "issue_fields": [
    { "field_name": "Priority", "field_option_name": "High" },
    { "field_name": "Effort", "field_option_name": "Medium" }
  ]
}
```

`method: "update"` with an issue number fills in an issue that already exists. Report the URL and
the values you set.

## Jira

- Search first with `searchJiraIssuesUsingJql` and comment on a match instead of opening a
  duplicate.
- Pick the template by issue type. A story gets the persona sentence, a bug gets steps and actual
  behavior, an epic gets a goal and the stories that reach it.
- Each acceptance criterion is one behavior a reviewer can call true or false without asking. Two
  behaviors in one bullet means two bullets.
- If a story cannot be estimated or will not fit a sprint, split it. That is the S and the E in
  INVEST, and it changes what gets written, not only how.
- An epic groups stories that share a goal. A one-off fix stays a plain story.
- Create with `createJiraIssue`, update an existing ticket with `editJiraIssue`.
- Ticket references are markdown links, never bare keys.
- Payloads go in fenced blocks. Jira's editor mangles some pasted inline code, so type inline
  backticks in the editor rather than pasting them, and check the result.

## Guardrails

- One issue or ticket does one thing. Split a report carrying two problems.
- No tokens, `.env` lines, or internal hostnames in a body. Say where the value lives.
- Do not raise Priority to jump a queue.
- Run the `humanizer` skill over the title and body.

## Related skills

| Skill | Use for |
| --- | --- |
| [pr](../pr/SKILL.md) | The pull request that closes the issue |
| [humanizer](../humanizer/SKILL.md) | AI tells in the title and body |
| [conventions](../conventions/SKILL.md) | User questions for tracker and type |
