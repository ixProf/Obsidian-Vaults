---
title: "Conventions"
aliases: ["Vault Conventions", "Vault Rules"]
type: system
status: active
tags: [system, conventions]
created: 2026-11-01
updated: 2026-11-01
domain:
source:
related: []
---

# Vault Conventions

These rules define how the vault is organised and how notes are written. They keep the knowledge system consistent as it grows.

## 1. Folder map

| Folder | Role | Rule |
|---|---|---|
| `00 System` | Rules, dashboards, review reports | System documentation only |
| `01 Inbox` | Capture | Unprocessed notes; empty regularly |
| `10 Maps of Content` | Navigation | One MOC per domain, plus `Home` |
| `20 Knowledge` | Atomic knowledge | One idea per note, organised by domain |
| `30 Projects` | Active and completed work | Project notes, decisions, links |
| `40 Personal` | Private life material | Health, applications, documents |
| `90 Archive` | Superseded material | Preserved, never deleted |
| `99 Quarantine` | Unresolved material | Awaiting a decision |
| `Templates` | Note templates | Core Templates plugin folder |
| `Attachment` | Current attachments | Reorganised in Stage 5 |
| `My Study` | Original course and source notes | Preserved as source material |
| `My Master` | Master's roadmap and research sources | Organised around the existing roadmap |
| `DEPI` | DevOps course sources | Preserved |
| `PDFs` | Book and paper notes | Preserved |
| `Daily Notes` | Daily journal | Uses the configured daily template |
| `TaskNotes`, `Tasks` | Protected task system | Never modified by this refactor |
| `Excalidraw`, `DataView`, `Heatmap`, `Operon` | Existing tool folders | Preserved |

## 2. Note types

Every new note gets YAML frontmatter. Existing notes are updated in Stage 3 without discarding their current fields.

| `type` | Use | Template |
|---|---|---|
| `permanent` | One durable idea | `Templates/Permanent Note` |
| `literature` | Notes from a source | `Templates/Literature Note` |
| `fleeting` | Quick capture | `Templates/Fleeting Note` |
| `moc` | Map of content | `Templates/MOC` |
| `project` | Project hub | `Templates/Project Note` |
| `paper` | Research paper | `Templates/Paper Note` |
| `daily` | Daily note | `Templates/Daily Template` |
| `source` | Original long-form note | No template; preserve as-is |
| `system` | Vault documentation | No template |

## 3. Required frontmatter

```yaml
---
title: "Note title"
aliases: []
type: permanent
status: active
domain: computer-science
tags: []
created: 2026-11-01
updated: 2026-11-01
source: 
related: []
---
```

- `status`: `inbox`, `active`, `evergreen`, `archived`, or `quarantined`.
- `domain`: matches a `20 Knowledge` folder, using the slugs below.
- `source`: wikilink to the original long-form note, when one exists.
- `related`: wikilinks to genuinely related notes; never add links to satisfy a quota.
- `aliases`: alternate names only; do not create duplicate notes for synonyms.
- `created` and `updated`: do not invent dates. Use a verifiable date from the file, git history, or the source. If only an approximate date is known, record that in the review report.

Paper notes add `authors`, `year`, `venue`, `doi`, `url`, `read_status`.
Literature notes add `author`, `year`, `read_status`.
Project notes add `started`, `target`, `repo`.

Daily notes are the exception: they use `type: daily`, `date`, and `tags`, without `title`, `status`, `created`, or `updated`.

## 4. Domain slugs

| Domain | `domain` value | Knowledge folder |
|---|---|---|
| Computer Science | `computer-science` | `20 Knowledge/Computer Science` |
| Software Engineering | `software-engineering` | `20 Knowledge/Software Engineering` |
| Backend Engineering | `backend-engineering` | `20 Knowledge/Backend Engineering` |
| Database Systems | `database-systems` | `20 Knowledge/Database Systems` |
| Distributed Systems | `distributed-systems` | `20 Knowledge/Distributed Systems` |
| System Design | `system-design` | `20 Knowledge/System Design` |
| DevOps and Infrastructure | `devops-infrastructure` | `20 Knowledge/DevOps and Infrastructure` |
| Programming Languages | `programming-languages` | `20 Knowledge/Programming Languages` |
| AI and Machine Learning | `ai-machine-learning` | `20 Knowledge/AI and Machine Learning` |
| Academic Studies | `academic-studies` | `20 Knowledge/Academic Studies` |
| Research and Master's Prep | `research-masters-prep` | `20 Knowledge/Research and Master's Prep` |
| Academic English | `academic-english` | `20 Knowledge/Academic English` |

## 5. Naming

- Atomic notes: concept name in Title Case, e.g. `Write-Ahead Logging.md`. No dates, no `Notes` suffix, no generic titles.
- MOCs: `<Domain> MOC.md`.
- Projects: `<Project Name>.md`.
- Papers: `<First Author> - <Short Title> (<Year>).md` only when the metadata is known. Otherwise use the paper's actual title.
- Daily notes: `YYYY-MM-DD.md` in `Daily Notes`.
- Source notes keep their original filenames until Stage 3 approves a rename.
- Folder names: Title Case, correct spelling, no abbreviations that are not already standard.

## 6. Linking

- Use `[[Note Name]]` when the name is unique.
- Use `[[Folder/Note Name|Display text]]` when the name is ambiguous.
- Link to a real note, not to a planned one.
- Every permanent note should link to its domain MOC and to at least one real related note.
- Use `source` for the original long-form note and `related` for conceptual neighbours.
- Do not create placeholder notes just to fix a broken link. Record the gap in [[00 System/Review Report]] instead.

## 7. Atomic notes

- One idea per note.
- Keep the original explanation, code, diagrams, and references.
- Do not shorten or rewrite technical content just to make it smaller.
- Do not split a code block, table, or diagram in the middle.
- If two sources conflict, record both and mark the conflict; do not silently choose one.
- The original long-form note remains in place and is linked from the atomic note.
- Arabic content and names are preserved exactly.

## 8. Attachments

- Attachments are reorganised in Stage 5, not before.
- Preserve filenames whenever possible.
- Update every embed after a move.
- Never delete an attachment because it looks unused. Move it to `90 Archive` or `99 Quarantine`.
- Current embeds use `![[filename]]`; path-qualified embeds are preferred after reorganisation.

## 9. Archive and quarantine

- `90 Archive`: superseded, duplicate, or obsolete material that still has value.
- `99 Quarantine`: ambiguous, broken, or unreviewed material.
- Nothing is deleted permanently.
- Every archive or quarantine action is recorded in the change log and, when ambiguous, in [[00 System/Review Report]].

## 10. Protected areas

The following are read-only for this refactor:

- `TaskNotes/`
- `Tasks/`
- all `*.base` files and Base views
- `.obsidian/` plugin data, except where a stage explicitly changes a setting

## 11. Change control

- Work proceeds in the approved stages.
- Each stage ends with a verification report.
- The external change log is at `C:\Users\mahmo\Obsidian Backups\manifests\change-log.md`.
- The pre-refactor backup is at `C:\Users\mahmo\Obsidian Backups\My Obsidian - pre-refactor - 2026-11-01`.
