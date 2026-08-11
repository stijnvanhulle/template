---
argument-hint: [path]
description: Remove AI writing patterns from the prose changed on the current branch
---

!`git diff --stat HEAD`

Rewrite the user-facing prose on this branch so it reads as human.

1. Review the branch's prose changes: the diff against the default branch, narrowed to
   `$ARGUMENTS` when a path or glob is given. READMEs, docs, and changesets count, code does not.
2. Strip the AI tells: dashes and semicolons used as punctuation, title-case headings, emoji,
   marketing words, rule-of-three lists, inline-header bullets, hedging, and filler openers.
3. Put voice back: vary sentence rhythm, keep the specific detail, and react to the facts
   instead of only listing them.
4. Keep the meaning and the structure. Do not invent facts, and leave code samples and quoted
   upstream text as they are.
5. Report a 1-3 sentence summary of the tells you fixed.

Follow the `humanizer` skill for the full pattern list. For code, use the `deslop` skill instead.
