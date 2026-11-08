---
title: "Orphan Notes"
type: system
status: active
tags: [system, dashboard]
created: 2026-11-01
updated: 2026-11-08
aliases: []
domain:
source:
related: []
---

# Orphan Notes

Notes with no incoming and no outgoing links. This is a review list, not an instruction to delete.

```dataview
TABLE length(file.inlinks) AS "Inlinks", length(file.outlinks) AS "Outlinks", file.folder AS "Folder"
FROM ""
WHERE length(file.inlinks) = 0 AND length(file.outlinks) = 0
  AND !contains(file.folder, "TaskNotes")
  AND !contains(file.folder, "Tasks")
  AND !contains(file.folder, "90 Archive")
  AND !contains(file.folder, "99 Quarantine")
SORT file.folder ASC, file.name ASC
```

## Use

- Connect a note to a domain MOC if it contains useful knowledge.
- Link a source note to the Permanent Notes extracted from it.
- Move abandoned stubs to `90 Archive`; do not delete them.
- Record unclear cases in [[00 System/Review Report]].
