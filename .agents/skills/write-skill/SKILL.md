---
name: write-skill
description: "Author a new skill in .agents/skills/. Use when the user asks to add, create, or write a new skill, or when a recurring workflow keeps showing up and deserves to be captured."
---

# Write a skill

Skills live in `.agents/skills/<name>/SKILL.md` and are cross-provider. The `name` and `description` in the frontmatter are the only things an agent sees when deciding whether to load the skill - they do the heavy lifting.

## File layout

```
.agents/skills/<name>/
├── SKILL.md           # required, the entry point
├── references/        # optional, longer reference docs split out
└── examples/          # optional, concrete examples
```

Keep `SKILL.md` under ~100 lines. Split deeper material into `references/*.md` and link to them.

## Frontmatter

```yaml
---
name: <kebab-case-name>
description: "<one or two sentences: what it does + when to use it>"
---
```

The description is a selection signal. Always state **when to use it** explicitly - phrases like "Use when...", "Use after...", or "Use before..." so the agent can route correctly. Avoid time-sensitive language ("the new X") and avoid restating the name.

## Body structure

1. **One-line summary** restating the purpose in the body's voice.
2. **When to use** - bullets of concrete triggers, including the inverse ("skip this for trivial changes").
3. **How it works** - the steps, rules, or checklist that make the skill executable.
4. **Checklist** (optional) - copy-pasteable Done criteria.
5. **Related skills** - a small table pointing at sibling skills the agent should consider instead or after.

## Quality bar

- Concrete over abstract. One worked example beats three paragraphs of theory.
- Imperative voice ("Do X", not "You should do X").
- Match the repo's tone: short, no fluff, no filler.
- Run `pnpm format` after writing so markdown wraps cleanly.

## After writing

- Add the skill to the `<skills>` block in `AGENTS.md` so it shows up in the index.
- Open the file in `.claude/skills/` (a symlink to `.agents/skills/`) to confirm it loads.
- If the skill replaces or overlaps with an existing one, link the two in the Related skills tables.
