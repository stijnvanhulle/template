# Asking the user a question

When a task needs the user to pick between a few known paths, ask it as a short question with
concrete options rather than an open paragraph. The reader should be able to answer with one
tap or one character.

- In a client with a native multiple-choice tool (Claude Code and Claude Desktop's
  `AskUserQuestion`, or the equivalent in another host), use it. It renders as a picker, and the
  user can still type a free-form answer if none of the options fit.
- In a client with no such tool (Codex, a plain terminal, a chat surface without picker
  support), write the options as a lettered or numbered list in the reply text, and ask the
  user to answer with the letter or number. `A) ... B) ... C) ...` reads the same whether it
  renders as a widget or as plain text.
- Keep each option a real, distinct choice, three or four at most, with the likely answer
  first. Do not pad a list to hit a count.
- Reserve this for a genuine fork, such as which of two approaches, which package, or whether
  to proceed. A request for missing information with no fixed set of answers, such as an API
  key or a file path, stays a plain question.

## Where this applies

Every skill that stops to ask the user something follows this shape, in every agent this
template ships for: Claude Code, Claude Desktop, Cursor, Codex, Gemini CLI, and OpenCode. The
`backlog` skill's per-issue confirmation is the reference example.
