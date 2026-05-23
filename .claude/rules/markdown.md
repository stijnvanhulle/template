---
paths:
  - "**/*.md"
  - "**/*.mdx"
---

# Markdown and documentation

Apply this whenever you write or edit any markdown file, so generated docs read as natural and
specific rather than generic. For a thorough pass on substantial docs, use the `humanizer`
skill (`.agents/skills/humanizer/SKILL.md`). For the complete writing guide (voice, content
patterns, SEO) use the `documentation` skill.

## Always

- Use sentence case headings (`## Product features`, not Title Case)
- No emojis in prose or headings
- No inline-header bullet lists (`- **Speed**: faster load times`). Write a sentence instead
- Do not bold product names or ordinary words mid-sentence
- No dashes as sentence punctuation: avoid the em dash (`—`), en dash (`–`), and a spaced hyphen (` - `). Use a comma, parentheses, or a separate sentence. Hyphenated compounds like `spec-driven` and CLI flags are fine
- Do not join clauses with a semicolon either. Use a comma, parentheses, or a separate sentence
- Cut filler: "in order to", "it is worth noting", "has the ability to", excessive hedging
- Replace AI vocabulary: utilize and leverage become use, facilitate becomes help, and drop empty words like seamless, powerful, robust, and comprehensive (be specific instead)
- Vary sentence rhythm and add voice and concrete details, and avoid the default rule-of-three list
- Finish with an anti-AI pass: ask "what still reads as AI-generated?", then revise

## Exception

`docs/changelog.md` follows the `changelog` skill's emoji-prefixed section format
(`### ✨ Features`, `🐛 Bug Fixes`, `🚀 Breaking Changes`, `📦 Dependencies`). The no-emoji
and sentence-case heading items above do not override that format.
