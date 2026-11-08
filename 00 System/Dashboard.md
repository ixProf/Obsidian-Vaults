---
title: "Dashboard"
aliases: ["Vault Dashboard"]
type: system
status: active
tags: [system, dashboard]
created: 2026-11-01
updated: 2026-11-08
domain:
source:
related: []
---

# 🏠 Vault Dashboard

Operational entry point for the vault. Use [[10 Maps of Content/Home]] for the knowledge map.

## Start here

| Need | Go to |
|---|---|
| Navigate knowledge | [[10 Maps of Content/Home]] |
| Capture a thought | [[01 Inbox/README]] |
| Triage the inbox | [[00 System/Dashboards/Inbox Review]] |
| Follow the Master's plan | [[30 Sources/Other Sources/My Master/Dashboard]] |
| Work on a project | [[Projects MOC]] |
| Review unresolved items | [[00 System/Review Report]] |
| Check vault rules | [[00 System/Conventions]] |

## Domain maps

| Domain | Map |
|---|---|
| Computer Science | [[Computer Science MOC]] |
| Software Engineering | [[Software Engineering MOC]] |
| Backend Engineering | [[Backend Engineering MOC]] |
| Database Systems | [[Database Systems MOC]] |
| Distributed Systems | [[Distributed Systems MOC]] |
| System Design | [[System Design MOC]] |
| DevOps and Infrastructure | [[DevOps and Infrastructure MOC]] |
| Programming Languages | [[Programming Languages MOC]] |
| AI and Machine Learning | [[AI and Machine Learning MOC]] |
| Academic Studies | [[Academic Studies MOC]] |
| Research and Master's Prep | [[Research and Master's Prep MOC]] |
| Academic English | [[Academic English MOC]] |
| Projects | [[Projects MOC]] |
| Learning, Career and Personal | [[Learning, Career and Personal MOC]] |

## Inbox

```dataview
LIST
FROM "01 Inbox"
WHERE file.name != "README"
SORT file.mtime DESC
```

## Recent changes

```dataview
TABLE file.folder AS "Folder", file.mtime AS "Modified"
FROM ""
WHERE !contains(file.folder, "TaskNotes")
  AND !contains(file.folder, "Tasks")
  AND file.name != "Dashboard"
SORT file.mtime DESC
LIMIT 12
```

## Maintenance

- [[00 System/Dashboards/Recent Changes]]
- [[00 System/Dashboards/Orphan Notes]]
- [[00 System/Dashboards/Metadata Gaps]]
- [[00 System/Dashboards/Inbox Review]]
- [[00 System/Dashboards/Literature Awaiting Synthesis]]

## Current focus

The Master's preparation plan is in [[30 Sources/Other Sources/My Master/Dashboard]]. Phase 0 covers the research environment, Go basics, Distributed Systems introduction, and the first paper. This dashboard does not duplicate that plan; it links to it.
