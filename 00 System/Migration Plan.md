---
title: "Migration Plan — Zettelkasten-First Architecture"
aliases: ["Zettelkasten Migration Plan", "Phase A Plan"]
type: system
status: active
tags: [system, migration, zettelkasten]
created: 2026-11-01
updated: 2026-11-02
domain:
source:
related: ["[[00 System/Conventions]]", "[[00 System/Migration Progress]]", "[[00 System/Review Report]]"]
---

# Migration Plan — Zettelkasten-First Architecture

> Status: **APPROVED FOR EXECUTION** (2026-11-02). Resumed and revalidated **2026-11-08**. This document is the recovered and completed Phase A plan. It supersedes the earlier Hybrid/PARA plan and incorporates the Literature Note, attachment, My Study, empty-file, atomicity, and bidirectional-link refinements.

## 1. Recovery report (2026-11-02)

| Item | Verified state |
|---|---|
| Vault root | `C:\My Obsidian` |
| Stages already complete | Stage 1 (backup), Stage 2 (system architecture), Stage 3 (renames, 206 link repairs, 22 PDF link fixes, 312 frontmatter normalisations) |
| Current layers | `00 System`, `01 Inbox`, `10 Maps of Content`, `20 Knowledge` (README + 12 empty domains), `30 Projects`, `40 Personal`, `90 Archive`, `99 Quarantine` |
| Source layers | `My Study` (248 md + 305 root images + 4 protected `.base`), `My Master` (14 files), `DEPI` (26 md), `PDFs` (2 PDFs + 2 literature notes), `Route Academy` nested under `My Study/Backend/Route Academy Notes` |
| Markdown notes | 379 |
| Non-git files | 1,398 |
| Images | 657 (652 PNG, 4 JPG, 1 JPEG); 352 in `Attachment`, 305 in `My Study` root |
| Image references | 530 images referenced; 127 unreferenced; 0 basename collisions |
| Embed syntaxes | 535 local `![[image]]` embeds; 0 local Markdown image links; 0 path-qualified image embeds; 5 remote `<img>` in one Networks note; 5 TaskNotes `.base` embeds |
| Git | HEAD `a0e8000`; 391 porcelain lines (191 deleted, 128 modified, 72 untracked); no commits made |
| Backups | pre-refactor, pre-stage3, pre-metadata all intact |
| Phase A plan file | Not previously persisted; recovered from session record and revalidated against the vault |
| Attachment refinement | **Not** previously incorporated into a persisted plan; completed in this document |

### Pre-migration backup

- Location: `C:\Users\mahmo\Obsidian Backups\My Obsidian - pre-zettelkasten - 2026-11-02`
- 2,580 files / 287,498,740 bytes; source and backup byte counts match.
- SHA-256 manifest (non-git): 1,398 files, 0 mismatches → `manifests/pre-zettelkasten-manifest-2026-11-02.csv`
- Protected-file hashes: 60 files → `manifests/protected-files-2026-11-02.csv`
- Git status snapshot → `manifests/git-status-pre-zettelkasten.txt`

### Resume revalidation (2026-11-08)

| Item | Verified state |
|---|---|
| Completed phases | Stage 1–3, Phase A, pre-migration backup, Phase B, Phase C — all present and verified |
| Phase D | Was marked `IN PROGRESS`; no `Knowledge Extraction Proposals.md` existed. Resumed here. |
| Image-attachment refinement | Present in §7 and refinement items 7–9; revalidated against the live vault |
| Current non-git files | 1,439 (including `.obsidian`); 1,133 outside `.obsidian` |
| Markdown notes | 403 |
| Images | 657 (352 in `Attachment`, 305 in `My Study`) — unchanged, 0 missing, 0 hash mismatches |
| PDFs | 13 (6 in `Attachment`, 7 under `30 Sources`) |
| Embeds | 543 (538 basename-only, 5 path-qualified) — revalidated, not the earlier 541/536/5 |
| Wikilinks | 649; 1,183 of 1,192 resolve; 0 ambiguous; 9 unresolved (7 documentation examples + the 2 known gaps `Camp`, `Project Csharp`) |
| Git | HEAD `a0e8000`; 387 porcelain lines; no commits, resets, or discards performed |
| New pre-resume backup | `C:\Users\mahmo\Obsidian Backups\My Obsidian - pre-resume - 2026-11-08` — 2,621 files / 288,337,231 B |
| New manifest | `manifests/pre-resume-manifest-2026-11-08.csv` — 1,439 rows, 0 mismatches |
| Protected hashes | `manifests/protected-files-2026-11-08.csv` — 60 files |
| Existing backups | `pre-zettelkasten` manifest re-verified: 1,398 rows, 0 missing, 0 hash mismatches |

The image plan in §7 is therefore confirmed as already incorporated and valid. No image has been moved yet; Phase E remains the first stage allowed to move them.

## 2. Target architecture

```text
My Obsidian/
├── 00 System/
├── 01 Inbox/
├── 10 Maps of Content/          (Home + 14 domain MOCs)
├── 20 Zettelkasten/
│   ├── Fleeting Notes/
│   ├── Literature Notes/
│   ├── Permanent Notes/
│   └── Reference Notes/
├── 30 Sources/
│   ├── College/                 (Level / Term / Subject preserved; Senior → Level 4)
│   ├── DEPI/
│   ├── Route Academy/
│   ├── Books/
│   ├── Research Papers/
│   ├── Documentation/
│   └── Other Sources/
├── 40 Projects/
├── 50 Areas/
├── 90 Archive/
├── 99 Quarantine/
├── Attachments/                 (Phase E only)
├── Daily Notes/  Templates/  Excalidraw/  TaskNotes/  Tasks/
└── DataView/  Heatmap/  Operon/  Attachment/  My Study/ (remnants)
```

### Layer rules

- **Zettelkasten** = ideas. Fleeting → Literature → Permanent → Reference. One meaningful, independently understandable idea per Permanent Note; never one note per term, sentence, paragraph, or heading.
- **Sources** = where information came from. Never replace a source with extracted notes.
- **Projects** = active deliverables.
- **Areas** = ongoing responsibilities only (career/applications, health, Master's preparation).
- **MOCs** = navigation, not storage. Keep the existing 14 domain MOCs and `Home`; add a MOC only for real navigation value.
- **My Study** remains only as a protected technical remnant: the four `.base` files and the 305 deferred images. It is not an architectural layer.

## 3. Decisions carried forward (D1–D18) and refinements

| # | Decision |
|---|---|
| D1 | Final architecture is Zettelkasten-first (not Hybrid, not PARA). |
| D2 | Organise knowledge by ideas, not by course, book, semester, or project. |
| D3 | Keep course/source hierarchies under `30 Sources`. |
| D4 | Replace `20 Knowledge` with `20 Zettelkasten/{Fleeting,Literature,Permanent,Reference} Notes`; archive the legacy folder intact. |
| D5 | Add `30 Sources/{College,DEPI,Route Academy,Books,Research Papers,Documentation,Other Sources}` and `50 Areas`. |
| D6 | Keep the 14 domain MOCs and the ` MOC` filename suffix. |
| D7 | Preserve College Level/Term/Subject hierarchy; map `Senior` → `Level 4`; omit empty `Level 1`; do not invent term splits. |
| D8 | Do not atomise every note. Approved extraction subjects: EF Core, LINQ, Kubernetes, Distributed Systems, Research Methodology, Alex Xu, DDIA, Go. |
| D9 | Original long-form notes stay as sources; any extracted note links back with `source` and a real bidirectional link. |
| D10 | `50 Areas` is limited to ongoing responsibilities, not a PARA layer. |
| D11 | `40 Projects` holds project planning/deliverables; project-derived knowledge becomes Permanent Notes only through Phase D proposals. |
| D12 | Book reading notes → `20 Zettelkasten/Literature Notes/`; PDFs → `30 Sources/Books/`. |
| D13 | Keep the four protected `.base` files in `My Study/`; do not move or modify them. |
| D14 | Edit the seven general templates and add a Reference Note template; TaskNotes templates untouched. |
| D15 | Keep linked empty placeholders (Week 0, DEPI Session 9, `Elasticshare`, `Using Select…`); archive only verified abandoned empties. |
| D16 | Keep `My Master/Scholarships.md`; archive the byte-identical `Researches` copy. |
| D17 | `KPI and NPS Revision.md` → `30 Sources/Other Sources/Professional/`. |
| D18 | Move `Prompt.md` → `20 Zettelkasten/Reference Notes/`; ITI → `30 Sources/Other Sources/ITI`; keep `RoadMap.md` and `Roadmap 2.md` separate. |

### Refinements approved 2026-11-02

1. **Literature Notes** stay in `20 Zettelkasten/Literature Notes/`; each keeps an explicit, verifiable source connection, bibliographic details, chapter/page references, and attribution. Reading notes are never detached from their source.
2. **Attachments** are deferred to a separate Phase E; existing paths are preserved during Phases B–D; no renaming or deletion.
3. **`My Study`** remains as a protected technical remnant (four `.base` files + deferred images); documented, never treated as a layer.
4. **Empty/duplicate files**: no archive decision from size or apparent duplication alone; check references, embeds, plugin use, and workflow context; keep linked placeholders; quarantine uncertainty.
5. **Permanent Notes** require one meaningful independent idea, sufficient value, preserved depth/examples/code/reasoning/attribution, and a duplicate check before creation. No artificial fragmentation.
6. **Relationships** are bidirectional where useful (source ↔ Literature ↔ Permanent ↔ MOC ↔ Project); no fake backlinks.
7. **Attachments** are topic-based under `Attachments/` with per-topic gallery notes; one physical copy; cross-topic images referenced from multiple galleries.
8. **Image classification** is evidence-based; uncertain images go to `Uncategorized`; no empty topic folders; no over-specific categories.
9. **Image migration** is a separate controlled stage with its own mapping, rollback, and verification.

## 4. Phase B — architecture correction mapping

| Current | Target | Notes |
|---|---|---|
| `My Study/College` | `30 Sources/College` | Preserve Level/Term/Subject; `Senior` → `Level 4`; `University.md` → `README.md` |
| `My Study/College/Level 3/ITI` | `30 Sources/Other Sources/ITI` | ITI is JavaScript training, not college |
| `My Study/Backend/Route Academy Notes` | `30 Sources/Route Academy` | Preserve Assignments/Database/Sessions |
| `My Study/Backend/Dot NET Resource` | `30 Sources/Documentation/Dot NET Resource` | 177 KB resource index + roadmap |
| `My Study/Backend/For Revision`, `For Study`, `Sessions` | `30 Sources/Other Sources/Backend/...` | Preserve subfolders |
| `My Study/Backend/My Projects/{POS,واحة الدرعية}` | `40 Projects/{POS,واحة الدرعية}` | Project deliverables |
| `My Study/Backend/My Projects/{Projects Ideas,Work Flow}.md` | `40 Projects/` | Project planning |
| `My Study/Backend/My Projects/Interviews Questions.md` | `50 Areas/Career and Applications/` | Career preparation |
| `My Study/Backend/ROAD TO HIRE.md` | `50 Areas/Career and Applications/` | Study/career plan |
| `My Study/Backend/For Study/System Design/DDIA` | `20 Zettelkasten/Literature Notes/DDIA/...` | Rename with `DDIA — ` prefix |
| `My Study/KPI and NPS Revision.md` | `30 Sources/Other Sources/Professional/` | D17 |
| `My Study/{شهاداتي,للتقديمات}.md` | `50 Areas/Career and Applications/` | Personal/career records |
| `My Study/GYM` | `50 Areas/Health and Fitness/` | Ongoing responsibility |
| `My Study/202601141619.md` | `20 Zettelkasten/Reference Notes/Obsidian 1.11 Release Notes.md` | Reference material |
| `My Study/Welcome.md` | `90 Archive/Obsidian Defaults/` | Default vault text |
| Verified empty stubs | `90 Archive/Empty Notes/` | Only after reference check |
| `My Study/{4 .base files}`, root images, nested `.obsidian` | unchanged / quarantined | Protected remnant |
| `My Master` | `30 Sources/Other Sources/My Master` | Roadmap, letters, research, scholarships |
| `My Master/Researches/Scholarships.md` | `90 Archive/Duplicates/` | Byte-identical to canonical copy |
| `DEPI` | `30 Sources/DEPI` | Preserve Assignment/Study |
| `PDFs/*.pdf` | `30 Sources/Books/` | Raw sources |
| `PDFs/*.md` | `20 Zettelkasten/Literature Notes/` | Literature notes; update `book:` path |
| `20 Knowledge` | `90 Archive/Legacy/20 Knowledge` | Folder archived intact |
| `40 Personal` | `90 Archive/Legacy/40 Personal` | Folded into `50 Areas` |
| Root `Questions For Eng Ahmed Atef.md` | `01 Inbox/` | Already type `fleeting`, status `inbox` |
| Root empty notes/canvases | `90 Archive/Empty Notes` / `Empty Canvases` | Verify references first |

### Protected / untouched

`TaskNotes/`, `Tasks/`, all `*.base` files/views, `Excalidraw/`, `Templates/` (except approved edits), `.obsidian/` (except the attachment-folder setting in Phase E), `My Study` four `.base` files, root `Untitled.base`, plugin folders (`DataView`, `Heatmap`, `Operon`), `Attachment/` (until Phase E).

## 5. Phase C — metadata and link reconciliation

- Preserve existing valid frontmatter; normalise only what the taxonomy requires.
- `type`: `fleeting`, `literature`, `permanent`, `reference`, `moc`, `project`, `area`, `source`, `index`, `system`, `daily`.
- Legacy course hubs retype `moc` → `index`; `type: moc` reserved for `10 Maps of Content`.
- Rewrite every exact-path link affected by moves; basename links remain valid because basenames are unique.
- Update PDF annotation links and the Alex Xu `book:` path.
- No fake backlinks. Record unresolved links in the Review Report.
- Validate YAML with a parser; check duplicate keys and required fields.

## 6. Phase D — Zettelkasten knowledge preparation

For each approved subject (EF Core, LINQ, Kubernetes, Distributed Systems, Research Methodology, Alex Xu, DDIA, Go):

1. Inspect the source and its existing Literature Notes.
2. List meaningful concepts and relationships.
3. Detect overlap/duplicates.
4. Propose Permanent Notes with exact source sections and candidate MOC links.
5. Create a Permanent Note only when the idea is independent, sufficiently deep, and can be expressed faithfully without inventing the user's understanding.
6. Where synthesis is required, write a proposal instead of a fabricated note.

Deliverable: `00 System/Knowledge Extraction Proposals.md` plus a small number of genuinely source-grounded notes only where justified.

## 7. Phase E — attachment classification (completed analysis)

### 7.1 Evidence used

1. Every note that embeds the image (exact path and folder context).
2. The embedding note's headings and surrounding content.
3. Current location (`Attachment` vs `My Study` root).
4. Filename when meaningful.
5. Byte-identical twins of referenced images (inheritance is evidence, not guessing).

### 7.2 Topic map (all 657 images)

| Topic folder | Images | Main evidence clusters |
|---|---:|---|
| `Attachments/DevOps/` | 159 | `DEPI/Assignment/DevOps` (88), `DEPI/Study/DevOps` (53+4+1), duplicate twins |
| `Attachments/College/` | 134 | College Level 2/3/Senior courses outside Database/SE |
| `Attachments/Backend Development/` | 84 | `Backend/For Revision/Core Concept` (47), `Advanced Csharp` (10), Route Academy assignments (7), C# (5), Go chapters (4) |
| `Attachments/Database Systems/` | 80 | College Database (60), Route Academy Database (14), duplicate twins |
| `Attachments/Software Engineering/` | 44 | Level 3 SE, Software Development, Design Pattern, Requirements Analysis |
| `Attachments/Personal/` | 28 | GYM (13), certificates/applications (9), KPI/NPS (5), twin |
| `Attachments/System Design/` | 22 | Alex Xu PDF note (16), Load Balancer article (5), twin |
| `Attachments/Distributed Systems/` | 12 | DDIA chapters |
| `Attachments/Uncategorized/` | 94 | No reference and no referenced twin |
| **Total** | **657** | |

No `Networking/` or `Projects/` folder is created: all Networking images are remote Google-hosted URLs, and no local image is referenced from a project note. Empty topic folders are not created.

### 7.3 Gallery notes

One index note per non-empty topic, e.g. `Attachments/Database Systems/Database Systems Images.md`:

- lightweight frontmatter (`type: index`, `status`, `tags`, `domain`, `updated`);
- meaningful subheadings by source/course/session;
- Obsidian embeds `![[filename]]` (filenames unchanged);
- links to the related MOC and source notes;
- no image is duplicated; a cross-topic image is embedded in more than one gallery if needed (currently none cross topics).

### 7.4 Uncertain images

- 94 images remain `Uncategorized`: no reference and no referenced twin.
- Named uncertain items: `بيانات درجات المستوى الثاني.jpg` (+ duplicate `1.jpg`), `gorilla-facing-right.png`, `Untitled-2026-07-17-2304.png`.
- Probable-but-unconfirmed: several `Pasted image 20260905…` files look like Kubernetes lab captures by timestamp, but they are not referenced, so they stay `Uncategorized` until confirmed.
- `CrossJoin.png` was reclassified to Database Systems because it is byte-identical to the referenced `CrossJoin 1.png`.
- Full per-image mapping: `00 System/Manifests/attachment-classification.csv`.

### 7.5 Migration procedure (Phase E only)

1. Re-verify the manifest and image hashes against the pre-migration backup.
2. Create only the nine non-empty topic folders.
3. Move images with `Move-Item` (no rename, no re-encode). Record old → new.
4. Do **not** move the three protected files in `Attachment/` (`.base`, canvases) or the four `.base` files in `My Study/`.
5. Generate gallery notes from the embedding-note map.
6. Because all local embeds are basename-only and basenames are unique, embeds continue to resolve; verify every embed target exists.
7. Update `attachmentFolderPath` to `Attachments/Uncategorized` only after the move is verified; record the old value.
8. Never delete `Attachment/`; keep it with its protected files and a README.

### 7.6 Verification procedure

1. Count: 657 images before = 657 after; 0 missing; 0 extra.
2. SHA-256: every image hash present in the destination set.
3. Every embed target resolves to exactly one file (basename uniqueness check).
4. Open a sample of galleries and confirm embeds render (manual visual check once Obsidian is reopened).
5. Every gallery note has valid YAML and no empty topic folder.
6. Manifest + change log updated.

### 7.7 Rollback

- Images remain byte-identical in `pre-zettelkasten` backup and in the Phase E pre-move snapshot.
- Rollback = move files back using the recorded mapping; no content edits are involved.
- Gallery notes can be archived; no source note is modified by image moves.

## 8. Phase F — dashboards, templates, MOCs

- Update `Home` layer table and working loop (`20 Zettelkasten`).
- Link galleries and Literature Notes from the relevant MOCs.
- Update `Dashboard`, `Recent Changes`, `Orphan Notes`, `Metadata Gaps`, `Inbox Review`, `Literature Awaiting Synthesis`.
- Keep the four `.base` files in `My Study`.
- Update seven general templates; add `Reference Note.md`; leave TaskNotes templates untouched.
- No redundant dashboards.

## 9. Phase G — final verification

1. Original file accounting vs baseline.
2. No overwrite / no loss.
3. Internal links and embeds resolve (known 23 gaps documented, not hidden).
4. PDF annotation links resolve.
5. YAML valid.
6. Protected files unchanged (60-file hash manifest).
7. MOCs link to real notes.
8. Sources distinguishable from knowledge.
9. Permanent Notes meet atomicity (or are explicitly proposals).
10. No duplicate notes introduced.
11. Git state documented, no commits/resets.
12. Backups and rollback available.
13. Final report written.

## 10. Remaining risks / conflicts

| Risk | Handling |
|---|---|
| `Attachment` (configured) vs `Attachments` (target) | Defer to Phase E; set `attachmentFolderPath` only after verified move; keep old folder. |
| 127 unreferenced images | Preserve; 33 assigned via identical twin; 94 `Uncategorized`. |
| 40 duplicate image groups (91 files) | Never delete; keep all copies; galleries list them. |
| 23 pre-existing unresolved links | Documented in Review Report; no placeholder notes. |
| Master's Dashboard 20 missing targets | Resolve only the 5 with existing targets; leave planned topics as plain text. |
| 4 `.base` files in `My Study` | Never moved; documented as remnant. |
| 305 images in `My Study` root | Deferred to Phase E; `My Study` persists meanwhile. |
| `My Study/.obsidian` stale config | Quarantine in Phase B; verify no dependency first. |
| Exact-path links (285) | Rewrite from recorded move map; verify. |
| Old git deletions (191) | Pre-existing/uncommitted; no Git operations. |
| Arabic filenames and content | Preserve byte-for-byte; UTF-8 handling. |

## 11. Execution order

1. Phase B — architecture correction → verify.
2. Phase C — metadata and links → verify.
3. Phase D — knowledge proposals → verify.
4. Phase E — attachment migration → verify.
5. Phase F — dashboards/templates/MOCs → verify.
6. Phase G — final audit and report.

Each phase appends to `00 System/Migration Progress.md` and to the external change log.
