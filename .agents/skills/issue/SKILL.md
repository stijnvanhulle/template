---
name: issue
description: Open a GitHub issue with its sidebar filled in, so the labels, the type, and the Priority, Start date, Target date, and Effort fields are set rather than left empty. Use when asked to file an issue, turn a bug report into one, or triage an issue that has no fields.
---

# Issue skill

An issue with an empty sidebar sits in the backlog unsorted. Write the title and body, then set
the type, the labels, and the fields in the same pass.

## When to use

- Filing a new issue, or turning a chat report into one.
- Triaging an existing issue whose type, labels, or fields are empty.

## 1. Check it is not already open

```bash
gh issue list --search "<keywords>" --state all --limit 10
```

Comment on the existing issue instead of opening a second one.

## 2. Pick the template

`.github/ISSUE_TEMPLATE/` holds the forms this repo uses. `bug.yml` covers a defect and applies
the `bug` label. `docs.yml` covers missing or wrong documentation and applies the `docs` label.
Anything else starts from a blank issue.

Answer every required field of the form you pick. Leave a field out only when you do not have the
answer, and say so in that field.

## 3. Write the title and body

One line for the title, in the imperative, under 72 characters, no trailing period. It reads like
a commit: `fix the resolver cache miss on nested plugins`, not `Resolver bug`.

For a bug, the body carries the version, the steps to reproduce, the expected result, and the
actual result. For a feature, it carries the problem first and the proposal second. Link the
reproduction or the code you are talking about.

## 4. Read the valid values before you set anything

Never invent a label, a type, or an option name.

```bash
gh label list
```

Types and fields come from the organization, so read them with the GitHub MCP server:
`list_issue_types` and `list_issue_fields` for this owner and repo.

## 5. Fill the sidebar

Set the type first, because it decides what the rest of the sidebar means.

| Type | Use for |
| --- | --- |
| Bug | Something that used to work, or that works differently from its documentation |
| Feature | New behavior somebody has asked for |
| Task | Work with no user-visible behavior, such as CI, releases, or agent files |

Then set the fields. Every value below is one of the options the field defines, so pick one
rather than writing your own.

| Field | Options | How to pick |
| --- | --- | --- |
| Priority | Urgent, High, Medium, Low | Urgent means a release is blocked or the published package is broken for everyone. High means it hits users today and has no workaround. Medium is the default for real work with a workaround. Low is a nice-to-have |
| Effort | High, Medium, Low | Low is a change in one file that a reviewer reads in one sitting. Medium spans a few files or needs a test. High needs a design decision, touches a public API, or spans packages |
| Start date | A date, `YYYY-MM-DD` | Set it only when work starts now or somebody scheduled it. Leave it empty for a backlog item |
| Target date | A date, `YYYY-MM-DD` | Set it only when a release, an event, or a promise fixes the date. An invented deadline is worse than none |

When you cannot judge one, use Priority `Medium` and Effort `Medium`, leave both dates empty, and
say in your reply which values you guessed so the author can correct them.

## 6. Create it

`gh` writes the issue as whoever runs it, which is what you want for the title, the body, the
labels, and the assignee:

```bash
gh issue create \
  --title "<title>" \
  --body-file <body>.md \
  --label bug \
  --assignee @me
```

The four fields are set with the GitHub MCP server's `issue_write` tool, which validates each
option name before it calls the API. Use `method: "create"` to open the issue and fill the
sidebar in one call, or `method: "update"` with the issue number to fill in an issue that already
exists:

```json
{
  "method": "create",
  "owner": "stijnvanhulle",
  "repo": "template",
  "title": "fix the resolver cache miss on nested plugins",
  "body": "<body>",
  "type": "Bug",
  "labels": ["bug"],
  "issue_fields": [
    { "field_name": "Priority", "field_option_name": "High" },
    { "field_name": "Effort", "field_option_name": "Medium" },
    { "field_name": "Target date", "value": "2026-10-01" }
  ]
}
```

Report the issue URL and the values you set.

## Guardrails

- One issue does one thing. Split a report that carries two unrelated problems.
- Do not paste a token, a `.env` line, or an internal hostname into an issue body. Say where the
  value lives instead.
- Do not set a date nobody committed to, and do not raise Priority to move something up a queue.
- Run the `humanizer` skill over the title and the body before you open the issue.

## Related skills

| Skill | Use for |
| --- | --- |
| [pr](../pr/SKILL.md) | The pull request that closes the issue |
| [humanizer](../humanizer/SKILL.md) | Stripping AI tells from the title and body |
| [conventions](../conventions/SKILL.md) | Markdown structure, plain language, security |
