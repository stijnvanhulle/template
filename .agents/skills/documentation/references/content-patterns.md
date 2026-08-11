# Content patterns

Blog post structure, frontmatter, and component patterns for documentation.

## Default

### Default frontmatter

Every documentation file must include YAML frontmatter:

```yaml
---
layout: doc          # Always use 'doc' for documentation pages
title: Page Title     # Displayed in browser tab and page header
outline: deep        # Enables deep table of contents
---
```

## Package documentation

### Package documentation frontmatter

For packages documentation:

```yaml
---
layout: doc
title: \@scope/name  # Escape @ symbol
outline: deep
---
```

### Package documentation structure

Structure for package documentation pages:

1. Opening (1-2 paragraphs): title and one-sentence description
2. Installation
  - Use code groups (start with `::: code-group` and end with `:::`) for multiple package managers (always include `bun`, `pnpm`, `npm`, `yarn` in that order):

```shell [bun]
bun add -d @scope/name
```

3. Options (one section per option, in logical order)
  - Always include `Required:`, either `true` or `false`, never omitted
  - Always include `Default:` when a default exists. Omit the row when there is none
  - Use following pattern:

````md
### optionName

Brief one-sentence description of what this option does.

> [!TIP]
>  Additional context: when to use it, performance implications, or helpful notes

|           |             |
|----------:|:------------|
|     Type: | `string`    |
| Required: | `false`     |
|  Default: | `'default'` |

Example:

```typescript
// Show minimal usage example
```
````

4. Code examples
  - With file path labels
  - All required imports
  - Minimal but complete configuration
5. Resources: links to docs, repo if relevant

## Blog post patterns

### Blog post frontmatter

Blog specific frontmatter rules:

```yaml
---
title: Post Title
description: Brief description for SEO and previews (under 160 chars)
navigation: false
image: /assets/blog/slug.png
authors:
  - name: Author Name
    avatar:
      src: https://github.com/username.png
date: 2025-11-05T10:00:00.000Z
category: Release
---
```

Categories are `Release` for version announcements and `Article` for tutorials and guides.

### Blog post structure

1. Opening (1-2 paragraphs): announce what's new, why it matters
2. Key callout: `> [!NOTE]` with requirements and prerequisites
3. Feature sections: `## Emoji Feature Name` headers
4. Code examples: with file path labels
5. Breaking changes: if release post
6. Thank you: credit contributors
7. Resources: links to docs, repo
8. Release link: link to full changelog

## Component patterns

Use the right component for the right purpose:

| Need | Component | When |
| --- | --- | --- |
| Background info | `> [!NOTE]` | Supplementary context |
| Best practice | `> [!TIP]` | Recommendations |
| Potential issue | `> [!WARNING]` | Things that could go wrong |
| Must-know | `> [!IMPORTANT]` | Required actions |
| Danger | `> [!CAUTION]` | Destructive operations |
| Package managers | `::: code-group` and ends with `:::` | `bun`, `pnpm`, `npm`, `yarn` variants |

## Usage section

A minimal, generic snippet showing the basic syntax. Core functionality only, placeholder or
simple values, always inside `::: code-group` with input and output. This is the first example
a reader sees, so keep it simple.

## Examples section

Realistic, concrete snippets showing real scenarios: meaningful variable names, realistic data,
and more than one example when the feature is used in different ways.

## Props, options, and parameters structure

All props, options, and parameters must use this exact table format:

### propName

[One-sentence description of what this prop/option does]

|           |          |
|----------:|:---------|
|     Type: | `string` |
| Required: | `true`   |
|  Default: | `value`  |  // Only if a default exists

Table rules:

- `Type:` is always present and shows the TypeScript type
- `Required:` is always present and is `true` or `false`
- `Default:` appears only when a default value exists. Leave the row out otherwise

## Prefer the table pattern

Prefer using table pattern when listing options or multiple items:

```md
| Skill | Use for |
| --- | --- |
| [../../changelog/SKILL.md](../../changelog/SKILL.md) | Update changelogs |
```

## Including shared content

Use VitePress `@include` directive to reuse shared content:

```md
### contentType
<!--@include: ../core/contentType.md-->
```

## Code block labels

Always include file path:

Use `twoslash` annotation for TypeScript: enables type checking

````md
```ts twoslash [config.ts]
export default defineConfig({
})
```
```ts [config.ts]
export default defineConfig({
})
```

```typescript [./types.ts]
type Test = {
    name: string;
}
```

```bash
pnpm add @scope/package
```
````
