---
name: issue
description: Open a GitHub issue with its sidebar filled in, so the labels, the type, and the Priority, Effort, Start date, and Target date fields are set rather than left empty. Use when filing an issue, turning a report into one, or triaging an issue whose fields are empty.
---

# Issue skill

An issue with an empty sidebar sits in the backlog unsorted. Set the type, the labels, and the
fields in the same pass as the title and body.

## 1. Check it is not already open

```bash
gh issue list --search "<keywords>" --state all --limit 10
```

Comment on the match instead of opening a second issue.

## 2. Write it

Pick the form in `.github/ISSUE_TEMPLATE/`: `bug.yml` for a defect, `docs.yml` for
documentation, blank for the rest. Answer every required field.

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
or agent files.

| Field | Options | Pick |
| --- | --- | --- |
| Priority | Urgent, High, Medium, Low | Urgent blocks a release or breaks the published package for everyone. High hits users today with no workaround. Medium is the default. Low is a nice-to-have |
| Effort | High, Medium, Low | Low is one file a reviewer reads in one sitting. Medium spans a few files or needs a test. High needs a design decision or touches a public API |
| Start date | `YYYY-MM-DD` | Only when work starts now, or somebody scheduled it |
| Target date | `YYYY-MM-DD` | Only when a release or a promise fixes the date. An invented deadline is worse than none |

Stuck on one: Priority `Medium`, Effort `Medium`, no dates, and say which values you guessed.

## 5. Create it

`gh issue create --title "<title>" --body-file <body>.md --label bug --assignee @me` writes the
issue as whoever runs it. The four fields go through the GitHub MCP server's `issue_write`, which
validates each option name before the call:

```json
{
  "method": "create", "owner": "stijnvanhulle", "repo": "template",
  "title": "<title>", "body": "<body>", "type": "Bug", "labels": ["bug"],
  "issue_fields": [
    { "field_name": "Priority", "field_option_name": "High" },
    { "field_name": "Effort", "field_option_name": "Medium" }
  ]
}
```

`method: "update"` with an issue number fills in an issue that already exists. Report the URL and
the values you set.

## Guardrails

- One issue does one thing. Split a report carrying two problems.
- No tokens, `.env` lines, or internal hostnames in a body. Say where the value lives.
- Do not raise Priority to jump a queue, or set a date nobody agreed to.
- Run the `humanizer` skill over the title and body.

## Related skills

| Skill | Use for |
| --- | --- |
| [pr](../pr/SKILL.md) | The pull request that closes the issue |
| [humanizer](../humanizer/SKILL.md) | AI tells in the title and body |
