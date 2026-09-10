---
name: changeset
description: Write a changeset that reads as a release note, with the right bump, a one-line summary, bullets for what changed, and a code example a user can copy. Use when adding a changeset, reviewing one, or deciding whether a change needs one.
---

# Changeset skill

A changeset is the release note for a change. Whoever reads it is upgrading a package, not
reviewing the diff, so write for them.

## When to use

- Adding a changeset for a branch, by hand or through `/changeset`.
- Judging whether a change needs one.
- Rewriting a changeset that only restates the commit message.

## 1. Decide whether the change needs one

A change that reaches a published package needs a changeset. A change confined to docs, CI,
tests, or the agent files does not.

Both plugin manifests are versioned through Changesets, so a change under `tools/claude` or
`tools/cursor` needs one for `@stijnvanhulle/template-claude-plugin` or
`@stijnvanhulle/template-cursor-plugin`.

## 2. Pick the bump

| Bump | Use for | Example |
| --- | --- | --- |
| `patch` | A fix, or behavior that already matched its documentation | The resolver no longer caches a miss |
| `minor` | New behavior that existing code keeps working without | A new `unionType` option |
| `major` | A rename, a removal, or a changed default | `enumType` defaults to `asConst` |

Every `@stijnvanhulle/template-*` package is in one fixed group, so they release together. List
only the packages you actually changed.

## 3. Write the file

One file per logical change, at `.changeset/<two-or-three-word-slug>.md`. The slug is for humans
reading `git log`, so `plugin-resolver-cache.md` beats `fix.md`.

````md
---
'@stijnvanhulle/template-core': minor
---

Add `unionType` so one type covers every variant of a discriminated schema.

- Generates a single union instead of one type per variant.
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

The layout, in order:

1. One sentence, present tense, saying what a user gets. It becomes the changelog headline, so it
   has to stand on its own.
2. Bullets, one per user-visible change, each starting with a verb and naming the real option,
   export, or command. Cap them at five, and skip them for a one-line change.
3. A code example whenever a user writes something new or writes something differently. Show
   before and after when you changed existing behavior.
4. For a `major`, a closing line saying what a user has to change.

## Examples

A patch needs no bullets and no example:

```md
---
'@stijnvanhulle/template-core': patch
---

Resolve nested plugin paths on Windows, which failed on a backslash separator.
```

A major carries the migration:

````md
---
'@stijnvanhulle/template-core': major
---

Rename `transformers` to `transforms` on the plugin options.

- Renames the option on every plugin that takes it.
- Removes the `transformers` alias, which warned since 2.4.0.

```typescript
// Before
definePlugin({ transformers: [stripNulls] })

// After
definePlugin({ transforms: [stripNulls] })
```

To upgrade, rename the option. Nothing else about the transform changes.
````

## Wording

- Lead with what the user gets, then why. Cut anything a reviewer needs and a user does not.
- Name real identifiers. "Various improvements" and "better error handling" say nothing.
- Leave out file paths, PR numbers, and reviewer talk. Changesets adds the commit link itself.
- Say what breaks in the same sentence as the fix, so nobody has to read two entries to find out.
- USA English, no emoji, no marketing words. Run the `humanizer` skill over the file.

## Checklist

- [ ] Frontmatter lists only the packages this branch changed, each with its own bump
- [ ] The first sentence reads as a changelog headline on its own
- [ ] Each bullet names an option, an export, or a command
- [ ] A code example is there for anything a user writes differently
- [ ] A `major` says what to change to upgrade

## Related skills

| Skill | Use for |
| --- | --- |
| [pr](../pr/SKILL.md) | The branch, the commits, and the PR the changeset ships in |
| [changelog](../changelog/SKILL.md) | Turning released changesets into `docs/changelog.md` |
| [humanizer](../humanizer/SKILL.md) | Stripping AI tells from the summary |
