---
name: ask
description: Ask a blocking multiple-choice question with the client's native picker, or a lettered list when none exists.
---

# Ask

When a sibling skill says to ask, inspect the available tools and use the first match:

| Available tool | Use |
| --- | --- |
| `AskUserQuestion` | Claude Code / Desktop |
| `AskQuestion` | Cursor IDE / CLI |
| Neither | Lettered options in chat; ask for the letter |

Never call an unavailable tool or guess the client.

## Question shape

- Offer 2–4 real options, likely answer first. Batch related questions.
- For an open question, offer likely answers and leave `Other` for custom input.
- Enable multiple selection only when several answers can be true.
- Cursor marks the likely label `(Recommended)`.
- A lettered fallback uses the same options and order, plus `Other`.
- Never put a secret or credential in an option. Ask for it in prose and never echo it.

Stop until the answer arrives. Do not guess now and report the guess later.
