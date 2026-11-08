---
title: "Literature Awaiting Synthesis"
type: system
status: active
tags: [system, dashboard, literature]
created: 2026-11-08
updated: 2026-11-08
aliases: ["Literature Synthesis Queue"]
domain:
source:
related: ["[[00 System/Dashboard]]", "[[20 Zettelkasten/README]]"]
---

# Literature Awaiting Synthesis

Literature Notes that have been captured but may not yet have a Permanent Note extracted from them. This is a queue, not a demand to atomise every source.

```dataview
TABLE source AS "Source", read_status AS "Read status", file.mtime AS "Modified"
FROM "20 Zettelkasten/Literature Notes"
WHERE type = "literature"
SORT file.mtime ASC
```

## Synthesis checklist

- [ ] Does the note contain one idea that stands on its own?
- [ ] Is there a real source section or page reference for that idea?
- [ ] Would a Permanent Note duplicate an existing note? Check first.
- [ ] If the idea needs the user's own argument, leave it as a proposal.

## Related

- [[00 System/Knowledge Extraction Proposals]]
- [[00 System/Dashboards/Orphan Notes]]
