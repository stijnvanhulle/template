---
name: changeset
description: Write a changeset that reads as a release note, with the right bump, a one-line summary, bullets for what changed, and a code example a user can copy. Use when adding a changeset, reviewing one, or deciding whether a change needs one.
---

# Changeset skill

A changeset is the release note for a change. Whoever reads it is upgrading a package, not
reviewing the diff.

## 1. Does the change need one

A change that reaches a published package does. Docs, CI, tests, and the agent files do not.
`tools/claude` and `tools/cursor` ship as published plugins, so they do.

## 2. Pick the bump

| Bump | For | Example |
| --- | --- | --- |
| `patch` | A fix | The resolver no longer caches a miss |
| `minor` | New behavior existing code survives | A new `unionType` option |
| `major` | A rename, a removal, or a changed default | `enumType` now defaults to `asConst` |

List only the packages you changed.

## 3. Write the file

`.changeset/<slug>.md`, named for whoever reads `git log`, so `plugin-resolver-cache.md` beats
`fix.md`.

````md
---
'@scope/core': minor
---

Add `unionType` so one type covers every variant of a discriminated schema.

- Accepts `unionType: 'asConst' | 'asLiteral'`, defaulting to `asConst`.
- Leaves output unchanged when the option is not set.

```typescript
// Before
export type PetDog = { type: 'dog'; bark: string }
export type PetCat = { type: 'cat'; meow: string }

// After
export type Pet = PetDog | PetCat
```
````

In order:

1. One sentence saying what a user gets. It becomes the changelog headline, so it has to stand
   on its own.
2. Bullets, one per user-visible change, verb first, naming the real option, export, or command.
   Five at most, and none for a one-line change.
3. A code example whenever a user writes something differently, with before and after when you
   changed existing behavior.
4. For a `major`, a closing line saying what to change to upgrade.

A patch is usually one line and no example:

```md
---
'@scope/core': patch
---

Resolve nested plugin paths on Windows, which broke on a backslash separator.
```

## Wording

- Lead with what the user gets. Cut what only a reviewer needs.
- Name real identifiers. "Various improvements" says nothing.
- Leave out file paths, PR numbers, and reviewer talk. Changesets adds the commit link.
- USA English, no emoji. Run the `humanizer` skill over the file.

## Related skills

| Skill | Use for |
| --- | --- |
| [pr](../pr/SKILL.md) | The branch and PR the changeset ships in |
| [changelog](../changelog/SKILL.md) | Turning released changesets into `docs/changelog.md` |
| [humanizer](../humanizer/SKILL.md) | AI tells in the summary |
