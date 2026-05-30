# Changesets workflow

This monorepo uses Changesets for version management and generates the changelog from changeset
entries.

## Creating a changeset

For every PR with code changes, create a changeset:

```bash
pnpm changeset
```

Interactive prompts:

1. Select which packages are affected.
2. Choose the version bump type (major, minor, or patch).
3. Write a concise summary of the changes.

## Version bump types

| Type             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| Major (breaking) | Changes that break existing functionality             |
| Minor (feature)  | New features that do not break existing functionality |
| Patch (fix)      | Bug fixes and minor improvements                      |
