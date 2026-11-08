---
title: "Recent Changes"
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

# Recent Changes

Newest notes in the vault, excluding the protected task system.

```dataview
TABLE file.folder AS "Folder", file.mtime AS "Modified"
FROM ""
WHERE !contains(file.folder, "TaskNotes")
  AND !contains(file.folder, "Tasks")
SORT file.mtime DESC
LIMIT 50
```

## Use

- Check what changed after a migration phase.
- Find notes that were edited but not yet linked.
- Confirm that new Permanent Notes were created in the right domain.
