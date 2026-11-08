---
title: "Inbox Review"
type: system
status: active
tags: [system, dashboard, inbox]
created: 2026-11-08
updated: 2026-11-08
aliases: ["Inbox Dashboard"]
domain:
source:
related: ["[[00 System/Dashboard]]", "[[01 Inbox/README]]"]
---

# Inbox Review

Focused view of `01 Inbox`. The goal is to empty the inbox into a Literature Note, a Permanent Note, a Reference Note, or a real project/area note.

```dataview
TABLE file.ctime AS "Captured", file.mtime AS "Modified"
FROM "01 Inbox"
WHERE file.name != "README"
SORT file.mtime ASC
```

## Triage checklist

- [ ] Does this contain a reusable idea? → `20 Zettelkasten/Permanent Notes`
- [ ] Is it a summary of a source? → `20 Zettelkasten/Literature Notes`
- [ ] Is it reference material? → `20 Zettelkasten/Reference Notes`
- [ ] Is it an action for a project? → `40 Projects`
- [ ] Is it an ongoing responsibility? → `50 Areas`
- [ ] Is it obsolete but worth keeping? → `90 Archive`

## Rules

- Do not delete an inbox note just because it is old; archive it.
- Do not create a Permanent Note without a real source or a real thought.
- Link the processed note from at least one MOC.
