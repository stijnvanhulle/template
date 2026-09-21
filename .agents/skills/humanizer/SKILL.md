---
name: humanizer
description: Remove AI writing patterns to make documentation sound natural, specific, and human. Covers content patterns, language patterns, style patterns, and communication patterns.
---

# Humanizer

Identifies and removes AI-generated text patterns so writing sounds natural and specific
instead of generic and hollow.

## Process

1. Read the input text.
2. Identify AI patterns using the references below.
3. List every tell: file or passage, the pattern it matches, and the proposed rewrite. Do not
   edit anything yet.
4. Follow the `ask` skill to confirm before applying: apply / skip / show more, per rewrite or
   per closely related group.
5. Apply only what is confirmed. Then do a final anti-AI pass on the accepted rewrites: ask
   "what makes this obviously AI generated?", name remaining tells, and fix those too.

Ensure the result sounds natural read aloud, varies sentence structure, uses specific details,
and keeps the right tone.

## Adding voice

Removing patterns is only half the job. Sterile, voiceless writing is just as obvious. Have
opinions and react to facts instead of only reporting them. Vary sentence rhythm: short punchy
sentences, then longer ones that take their time. Acknowledge complexity ("it works, but it
also feels like a workaround"), use specific details, and let natural asides appear.

## Pattern references

Load the category you need:

| Reference | Covers |
| --- | --- |
| [content-patterns.md](references/content-patterns.md) | Undue significance, empty credibility signals, -ing-participle filler, marketing language, vague attributions, generic filler sections |
| [language-patterns.md](references/language-patterns.md) | AI vocabulary, copula avoidance, negative parallelisms, rule-of-three, elegant variation, false ranges, filler and hedging, words to cut |
| [style-patterns.md](references/style-patterns.md) | Dashes and semicolons as punctuation, unnecessary bold, inline-header lists, title-case headings, emojis |
| [communication-patterns.md](references/communication-patterns.md) | Chatbot artifacts, sycophantic openers |

## Related skills

| Skill | Use for |
| --- | --- |
| [deslop](../deslop/SKILL.md) | The same confirm step, for code and mixed diffs |
| [ask](../ask/SKILL.md) | How the confirm step renders per client |
