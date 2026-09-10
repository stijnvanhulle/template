---
'@stijnvanhulle/template-claude-plugin': minor
'@stijnvanhulle/template-cursor-plugin': minor
---

Add an `issue` skill and a `changeset` skill, both reachable as slash commands.

- Adds `/issue`, which opens a GitHub issue with its type, labels, Priority, and Effort set, and says which values it guessed.
- Adds a `changeset` skill with the layout a changeset follows: frontmatter, a one-sentence summary, bullets per user-visible change, and a before and after example.
- Points `/changeset` at that layout, and moves the version-bump table out of the `changelog` skill.
