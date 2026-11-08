---
title: "Permanent Notes"
aliases: ["Permanent Layer", "Atomic Notes"]
type: system
status: active
tags: [system, zettelkasten, permanent]
created: 2026-11-02
updated: 2026-11-02
domain:
source:
related: ["[[20 Zettelkasten/README]]"]
---

# Permanent Notes

Durable, atomic notes: **one meaningful idea per note**, written so it can be understood without the original context.

## Admission test

Create a Permanent Note only when all of these are true:

1. The idea is independent and understandable on its own.
2. It has enough depth to preserve examples, code, reasoning, or evidence.
3. It is not a duplicate of an existing Permanent Note.
4. It can be expressed faithfully from a real source without inventing the user's understanding.
5. It has at least one real link: its source, a related note, or a domain MOC.

A term, a sentence, a paragraph, or a heading is **not** enough.

## Required frontmatter

```yaml
---
title: "Idea title"
aliases: []
type: permanent
status: evergreen
domain:
tags: []
created: 2026-11-02
updated: 2026-11-02
source: "[[30 Sources/README]]"
related: []
---
```

## Linking

- `source` points to the Literature Note or long-form source.
- `related` points to genuinely connected ideas, not synonyms.
- Link the relevant domain MOC in the body.
- Preserve the original explanation, code, diagrams, and attribution.
