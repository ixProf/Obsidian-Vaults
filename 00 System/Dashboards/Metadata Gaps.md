---
title: "Metadata Gaps"
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

# Metadata Gaps

Notes that do not yet have a `type` or `status` field. Review this list after each migration phase.

```dataview
TABLE file.folder AS "Folder", type AS "Type", status AS "Status"
FROM ""
WHERE (!type OR !status)
  AND !contains(file.folder, "TaskNotes")
  AND !contains(file.folder, "Tasks")
  AND !contains(file.folder, "Excalidraw")
  AND file.name != "README"
SORT file.folder ASC, file.name ASC
```

## Use

- Add the fields defined in [[00 System/Conventions]].
- Preserve existing frontmatter; add or standardise fields, do not replace valid content.
- Do not add metadata to TaskNotes, Tasks, or Base files.
- For source notes, use `type: source` and keep the original content intact.
