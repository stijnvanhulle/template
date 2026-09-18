---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
---

The `user-questions` rule now says to always reach for the native picker (`AskUserQuestion` or
a client's equivalent) when a task is blocked on information only the user can supply, instead
of reserving it for a fixed-choice fork.

- Covers open-ended requests too: offer your best-guess options and let `Other` carry the real
  answer, rather than falling back to a plain question.
- The one carve-out is a secret or credential (an API key, a token, a password), which stays a
  plain question and is never echoed back or offered as a guessable option.
