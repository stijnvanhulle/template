# Writing style

Sentence structure, voice, tone, and paragraph patterns for documentation.

## Guiding principle: clarity over marketing

Prefer direct, concrete, technical language over marketing phrasing. Be specific about what the code does and how to use it.

- Direct and technical: avoid marketing adjectives such as "powerful", "amazing", or "seamless".
- Concrete over abstract: prefer "Generates TypeScript types from OpenAPI schemas" over "Transforms your API into typed code".
- Short paragraphs: 1 to 3 sentences per paragraph.
- Avoid nominalizations (turning verbs into nouns like "the creation of").
- Use consistent terminology across pages: choose `plugin`, `schema`, `endpoint`, etc., and stick to it.
- Use backticks for commands, config keys, filenames, and API identifiers.

## Structure: What → Why → When → How

When describing a feature, option, or example use this short structure:

1. What: short description of the feature or option.
2. Why: the problem it solves or the primary use case (optional if obvious).
3. When: when to use it versus alternatives (optional).
4. How: a minimal, working example demonstrating usage.

## Sentence patterns

Documentation prefers short, subject-first sentences that state behavior or intent clearly. Aim for sentences under ~20 to 25 words and favor present tense and active voice.

### Subject-first declarative (60%)

Use to describe what the product, module, or plugin does. Keep the subject first and follow with a concise verb phrase.

```
The plugin generates TypeScript types from a schema.
The parser validates schema types during build.
```

### Imperative instructions (25%)

Use for step-by-step commands or quick actions. Start with a verb and keep the object direct.

```
Run `pnpm changeset` to create a changeset.
Add the plugin to the config file and configure the options.
```

### Contextual openers (15%)

Use when you need to signal a prerequisite, conditional, or sequence. Begin with words like `When`, `If`, `During`, or `After`.

```
When using authentication, configure the session handler.
After installing the module, restart the server.
```

## Voice

### Active voice (85%)

Subject performs action. Prefer this.

| Active (use)                    | Passive (avoid)                       |
|---------------------------------|---------------------------------------|
| The module creates a connection | A connection is created by the module |
| You can override defaults       | Defaults can be overridden            |
| The library handles validation  | Validation is handled by the library  |

### When passive is OK (15%)

- Actor unknown: "The file is loaded during startup."
- Object more important: "Data is cached for 5 minutes."
- System behavior: "Types are generated based on the OpenAPI spec file."

## Tense

Write instructions and behavior in the present tense, which covers about 90 percent of the text.
Future tense is for consequences ("This will create an endpoint"), and past tense belongs in
changelogs.

## Modal verbs

| Verb     | Meaning           | Example                          |
| -------- | ----------------- | -------------------------------- |
| `can`    | Optional (40%)    | "You can customize colors."      |
| `should` | Recommended (30%) | "You should validate input."     |
| `may`    | Possibility (20%) | "This may cause issues."         |
| `must`   | Required (10%)    | "You must install dependencies." |

Avoid weak modals: `might`, `could`, `would`

## Direct address

Guides and tutorials address the reader as "you", roughly 70 percent of the content. API
references stay neutral and drop the "you".

Stay consistent within sections.

## Paragraphs

Keep paragraphs to 1 to 3 sentences, topic sentence first, supporting detail after.

## Opening sentences

### Page openings

Define what it is, its purpose, key benefits:

```
The CLI offers an easy way to monitor generation progress by invoking the core `build` command and showcasing its events in real time.
```

Avoid: "This page describes...", "In this guide...", "Let's explore..."

### Section openings

Introduce topic and why it matters:

```
## Configuration

The plugin accepts several options that control its behavior.
```

## Tone by content type

| Type            | Tone                         |
| --------------- | ---------------------------- |
| Getting Started | Welcoming, encouraging       |
| Guides          | Instructional, supportive    |
| API Reference   | Precise, neutral             |
| Troubleshooting | Empathetic, solution-focused |

## Word choice

| Avoid           | Use         |
| --------------- | ----------- |
| utilize         | use         |
| implement       | add, create |
| leverage        | use         |
| in order to     | to          |
| due to the fact | because     |
| —               | (rewrite the sentence to avoid it) |

## Common mistakes

- Starting with "It" or "This" (unclear antecedent)
- Stacking prepositions ("the value of the property of the config")
- Overusing "Note that" (just state the fact)
- Burying important info at end of long sentences

## Examples

Examples must be practical and usable:

- Realistic: use actual OpenAPI or code snippets, not placeholders.
- Complete: include all required configuration so the example is runnable.
- Tested: verify examples work before committing them.
- Minimal: show only what's necessary to understand the feature.
