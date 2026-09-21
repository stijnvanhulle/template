---
name: ask
description: Ask the user a multiple-choice question through the native picker for this client. Claude Code and Claude Desktop use AskUserQuestion, Cursor IDE and Cursor CLI (`agent`) use AskQuestion, Codex and other terminals use a lettered list. Use whenever a task is blocked on information only the user can supply, instead of guessing or asking in prose.
---

# Ask skill

Stop and ask through the picker this client actually has. Do not guess and report later. Do not
ask in a plain paragraph when a picker or a lettered list would do.

## 1. Pick the tool this session has

Look at the tools in this session, then stop at the first match:

| If this tool exists | Client | Call |
| --- | --- | --- |
| `AskUserQuestion` | Claude Code, Claude Desktop | `AskUserQuestion` |
| `AskQuestion` | Cursor IDE, Cursor CLI (`agent`) | `AskQuestion` |
| neither | Codex, a plain terminal, anything else | a lettered list in the reply |

Never call a tool that is not in this session. Never invent a client by name if the tool list
already tells you.

`Other` is always available on the Claude and Cursor pickers. For a lettered list, add an extra
letter for a custom answer.

## 2. Shape of the question

- One to four real options. Likely answer first. Do not pad the list.
- Batch related questions in one call, not one question per round trip.
- Open-ended asks still get two or three guessed options. `Other` (or the extra letter) carries
  the real answer.
- A secret or credential (an API key, a token, a password) never becomes an option. Ask for
  those in plain prose and never echo the value back.

## 3. How to call it

### `AskUserQuestion` (Claude Code)

```text
AskUserQuestion
  questions:
    - question: Which tracker?
      header: Tracker
      options:
        - label: GitHub
          description: Issues on this repo
        - label: ClickUp
          description: Tasks in the connected list
        - label: Jira
          description: A project key you will pass next
      multiSelect: false
```

`header` stays short (about 12 characters). `multiSelect: true` only when more than one option
can be true at once.

### `AskQuestion` (Cursor IDE and Cursor CLI)

```text
AskQuestion
  title: Backlog source
  questions:
    - id: source
      prompt: Which tracker?
      options:
        - id: github
          label: GitHub (Recommended)
        - id: clickup
          label: ClickUp
        - id: jira
          label: Jira
      allow_multiple: false
```

Put `(Recommended)` on the likely option's label. `allow_multiple: true` only when more than one
option can be true at once.

### Lettered list (Codex and anything else)

```text
Which tracker?

A) GitHub (issues on this repo)
B) ClickUp
C) Jira
```

Ask the user to reply with the letter. Same options, same order, as the picker would have used.

## 4. Skills that stop here

Sibling skills name their own stops. When they say "follow the `ask` skill", run this file
before continuing:

| Skill | Stop |
| --- | --- |
| `backlog` | Tracker when none was given. Then implement / skip / needs more detail per issue |
| `branch` | `feat` vs `fix` when the type is torn. Carry vs stash when the working tree is dirty |
| `changeset` | `patch` / `minor` / `major` when the bump is not obvious or no bump was passed |
| `issue` | GitHub vs Jira when the tracker is not obvious. Bug / Feature / Task when the type is not obvious |
| `humanizer` | Apply / skip / show more per rewrite, after listing the tells |
| `deslop` | Apply / skip / show more per finding, after listing them |
| `pr` | How to test, when the steps cannot be derived from the diff |

## Related skills

| Skill | Use for |
| --- | --- |
| [conventions](../conventions/SKILL.md) | The always-on rule that points here |
| [backlog](../backlog/SKILL.md) | The per-issue confirm this skill's shape is taken from |
