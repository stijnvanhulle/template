---
name: documentation
description: Use when writing blog posts or documentation markdown files. Provides a writing style guide (active voice, present tense), content structure patterns, and SEO optimization. Overrides brevity rules for proper grammar.
---

# Documentation skill

Writing guidelines for AI coding assistants working on documentation.

## When to use

- Adding a new plugin, feature, or option
- Changing plugin behavior or API signatures
- Fixing bugs that affect code generation
- Writing or updating functionalities/component/composable documentation
- Optimizing documentation for search engines

## What it does

- Write clear, practical documentation aimed at the developer reading it
- Match the words developers search for
- Structure content so a reader can skim it and still find the answer

## Writing standard

When writing documentation, keep proper grammar and complete sentences. The "sacrifice grammar
for brevity" rule does not apply here.

Documentation must be:

- Grammatically correct
- Clear and unambiguous
- Properly punctuated
- Complete sentences (not fragments)

Brevity is still valued, but never at the cost of clarity or correctness.

## Available references

| Reference | Purpose |
| --- | --- |
| [references/writing-style.md](./references/writing-style.md) | Voice, tone, sentence structure |
| [references/content-patterns.md](./references/content-patterns.md) | Usage patterns, props structure, component patterns |
| [references/seo-optimization.md](./references/seo-optimization.md) | SEO practices, titles, descriptions, keywords, FAQs |

To remove AI writing patterns and add voice, use the [humanizer](../humanizer/SKILL.md) skill.

Load based on context:

- Writing prose → [references/writing-style.md](./references/writing-style.md)
- Props, options, usage patterns → [references/content-patterns.md](./references/content-patterns.md)
- Optimizing for search → [references/seo-optimization.md](./references/seo-optimization.md)
- Reviewing or editing finished prose → the [humanizer](../humanizer/SKILL.md) skill

## Language and tone

- Use the US spelling. For example, use license, not licence.

## Naming conventions

File names are kebab-case (`how-to-do-thing.md`) and descriptive: `multipart-form-data.md`, not
`form.md`. The file name becomes the URL path, so pick it with that in mind.

### Writing patterns

| Pattern | Example |
| --- | --- |
| Subject-first | "The `useApp` composable handles Fabric related logic." |
| Imperative | "Add the following to `config.ts`." |
| Contextual | "When relying on TypeScript, configure..." |

### Modal verbs

| Verb | Meaning |
| --- | --- |
| `can` | Optional |
| `should` | Recommended |
| `must` | Required |

### Component patterns (when to use)

| Need | Component |
| --- | --- |
| Info aside | `> [!NOTE]` |
| Suggestion | `> [!TIP]` |
| Caution | `> [!WARNING]` |
| Required | `> [!IMPORTANT]` |
| Multi-source code | `::: code-group` and ends with `:::` |

## Headings

Keep backticks out of the H1. From H2 down they are fine.

## Links and cross-references

Internal links use relative paths (`/plugins/plugin-ts/`), and anchors point at a section
(`/plugins/plugin-ts/#output-path`). External links carry the full URL and descriptive text.
Put the links section at the very end of the document.

## Images and assets

Images live in `docs/public/` and are referenced with relative paths from the markdown file.
Use `webp`, `png`, or `jpg`, keep the files small, and name them for what they show:
`plugin-react-query-example.png`.

## Checklist

- [ ] Active voice (85%+)
- [ ] Present tense
- [ ] 2-3 sentences per paragraph
- [ ] Explanation before code
- [ ] Validate frontmatter syntax
- [ ] Run humanizer pass: remove AI patterns, add voice and specific details
