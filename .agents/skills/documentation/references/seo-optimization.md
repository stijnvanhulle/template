# SEO optimization

SEO guidelines for documentation: titles, descriptions, structure, and FAQs.

## Frontmatter requirements

### Title (≤60 characters)

Formula: `[Component/Feature] - [What it does] [Context]`

```yaml
# Component/API pages
title: Type Component React - Generate TypeScript Types JSX

# Plugin pages
title: fs Plugin - Write Generated Files to Disk

# Guide pages
title: Creating Fabric Plugins - Extend Code Generators

# Getting started
title: Fabric - JSX Code Generator for TypeScript & Files
```

### Description (≤155 characters)

Formula: `[Action verb] [feature]. [Primary benefit]. [Secondary benefit].`

```yaml
# Be specific and benefit-focused
description: Generate TypeScript type declarations using React JSX. Component-based type generation for Fabric code generators.

description: Use the fsPlugin to write generated code files to disk with dry run mode, cleanup, and pre-write hooks in Fabric.

description: Build custom Fabric plugins to add lifecycle hooks, file transformations, and new capabilities to code generators.
```

### Template

```yaml
---
layout: doc
title: [Component] - [Action] [What] [Context]  # ≤60 chars
description: [Action verb] [feature]. [Benefit]. [Context].  # ≤155 chars
outline: deep
---
```

## Content structure

### Opening paragraph (2-3 sentences)

Answer what it is, who it is for, and when to use it.

```markdown
# [H1 Title] <Badge if applicable />

[What it is and does]. Use this [component/feature] when [scenario]. Perfect for [audience and use cases].
```

### What, why, and how sections

```markdown
## What is [Topic]?

[2-3 sentence explanation]

## Why use [Topic]?

[Two or three sentences on what it saves the reader, with numbers where you have them]

## How to use

[Minimal code example with explanation]
```

### FAQ section (3-5 questions)

Target actual search queries users would type:

```markdown
## FAQ

### When should I use X vs Y?

[Direct comparison with clear guidance]

### How do I [common task]?

[Concise answer with code example if needed]

### What's the difference between [A] and [B]?

[Key differences explained]
```

### Internal links

Minimum 2-3 per page in "See also" or "Next steps":

```markdown
## See also

- [Link to related component/feature]
- [Link to guide or tutorial]
- [Link to parent hub page]

## Next steps

- [Link to tutorial]
- [Link to API reference]
```

## Checklist

- [ ] Title ≤60 characters
- [ ] Description ≤155 characters
- [ ] Intro answers what/who/when
- [ ] FAQ section (3-5 questions)
- [ ] Headers are descriptive (not "Overview")
- [ ] Paragraphs ≤3 sentences
