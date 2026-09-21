# Asking the user a question

Whenever a task is blocked on information only the user can supply, follow the `ask` skill
(`.agents/skills/ask/SKILL.md`). That skill picks the tool this session has: `AskUserQuestion`
in Claude Code, `AskQuestion` in Cursor (IDE and CLI), a lettered list everywhere else.

Do not guess and report later. Do not ask in a plain paragraph when the `ask` skill applies. A
secret or credential never becomes an option.
