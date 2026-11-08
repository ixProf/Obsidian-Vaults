---
title: "Knowledge Extraction Proposals"
aliases: ["Phase D Proposals", "Zettelkasten Extraction Plan"]
type: system
status: active
tags: [system, zettelkasten, phase-d, proposals]
created: 2026-11-08
updated: 2026-11-08
domain:
source:
related: ["[[00 System/Migration Plan]]", "[[00 System/Migration Progress]]", "[[20 Zettelkasten/README]]"]
---

# Knowledge Extraction Proposals — Phase D

> This document is the Phase D deliverable. It records what the existing sources contain, which ideas are genuinely atomic, and which notes were created. It deliberately does **not** turn every heading into a note.

## 1. Method and guardrails

1. Each approved subject was inspected at its current source location under `30 Sources`.
2. Existing Literature Notes were checked before proposing anything, to avoid duplicating them.
3. A Permanent Note was created only when the source already contained enough explanation, example, or reasoning to support an independent note without inventing the user's understanding.
4. Notes that would require substantial personal synthesis remain **proposals**.
5. Every created note keeps a link to the original source, a section reference, and at least one real related note or MOC.
6. Arabic source text, code, tables, and examples were not rewritten or translated into a new claim.

## 2. Summary

| Subject | Primary source | Existing Literature Note | Permanent Notes created | Remaining proposal work |
|---|---|---|---|---|
| EF Core | `Entity Framework Revision.md` | — | `EF Core Change Tracker`, `N+1 Query Problem` | Migrations lifecycle, relationships, concurrency, raw SQL safety, performance/indexing |
| LINQ | `LINQ Revision.md` | — | `Deferred Execution in LINQ` | Projection, grouping, set operations, element operators |
| Kubernetes | `Kubernetes Day 1.md`, `Kubernetes D1 Refactoring.md`, `Kubernetes From Official Documentation.md` | — | `Kubernetes Cluster Architecture`, `Kubernetes Labels and Selectors` | Objects/manifests, namespaces, finalizers, storage versions |
| Distributed Systems | `What's Distributed System.md` (0 bytes) | DDIA chapters | — | Blocked on real source content; DDIA notes already exist |
| Research Methodology | `What's Research Paper.md` (0 bytes), roadmap references | — | — | Proposal only; no source note exists |
| Alex Xu / System Design Interview | `System Design Interview by Alex Xu.md` | The same note | `Load Balancing in Scalable Systems` | Caching, CDN, sharding, queues, stateless tier |
| DDIA | DDIA Chapter 1 and 2 Literature Notes | Three DDIA notes | — | Synthesis proposals only; no fabricated permanent notes |
| Go | `Chapter 1 & 2…`, `Go - Chapter 3`, `Go - Chapter 4` | `Learning Go…` (PDF annotation index) | `Go Modules`, `Variable Shadowing in Go` | Arrays/slices, maps, functions, methods, interfaces |

## 3. EF Core

### Sources inspected

- `30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Entity Framework Revision.md` (6,162 lines).
- Supporting: `IQueryable vs IEnumerable.md`, `Deferred Execution vs Eager Execution.md`, `LINQ Revision.md`.

### Meaningful concepts present

| Concept | Source section | Independent idea? | Decision |
|---|---|---|---|
| ORM purpose and EF Core approaches | §1–2 | Yes, but broad | Proposal: `ORM and EF Core Approaches` |
| DbContext and its lifetime | §4, §8, §29 | Yes | Proposal: `DbContext Lifetime and Unit of Work` |
| Change Tracker and entity states | §10 | Yes, concrete, example-rich | **Created** |
| Entity configuration (conventions, annotations, Fluent API) | §11 | Yes, but comparative | Proposal: `Configuring EF Core Entities` |
| Migration lifecycle and commands | §12–15, §23 | Yes, but workflow-heavy | Proposal: `EF Core Migration Lifecycle` |
| Keys and relationships | §16–17 | Yes, multiple independent ideas | Proposals: `EF Core Keys`, `EF Core Relationship Mapping` |
| Loading related data | §18 | Yes | Proposal: `Eager, Explicit, and Lazy Loading` |
| N+1 query problem | §18.4 | Yes, concrete, example-rich | **Created** |
| AsNoTracking and tracking behaviour | §19 | Yes | Proposal: `EF Core Tracking vs No Tracking` |
| IQueryable vs IEnumerable | §21 | Already covered by a dedicated source note | Do not duplicate; link to it |
| Transactions and concurrency | §24 | Yes, multiple ideas | Proposals: `ACID in EF Core`, `Optimistic vs Pessimistic Concurrency` |
| Raw SQL and SQL injection | §25–26 | Yes | Proposal: `Safe Raw SQL in EF Core` |
| Performance and indexes | §27 | Yes, large topic | Proposals: `EF Core Performance Checklist`, `Index Selectivity and Covering Indexes` |
| Advanced mapping | §28 | Yes, but specialised | Proposal only |
| Architecture and best practices | §29 | Yes, but opinionated | Proposal only |

### Overlap and duplicates

- EF Core overlaps with `LINQ Revision` on `IQueryable`, deferred execution, projection, and filtering. The source notes are complementary, not duplicates. Permanent notes should link across rather than repeat.
- EF Core overlaps with `Database Systems MOC` on indexes and transactions. The EF Core note should link to the database concept note when one is created; do not create two notes with the same idea.
- `AsNoTracking` and the N+1 note both concern performance but are distinct ideas (tracking cost vs query count). They are separate.

### Created

- [[20 Zettelkasten/Permanent Notes/EF Core Change Tracker|EF Core Change Tracker]]
- [[20 Zettelkasten/Permanent Notes/N+1 Query Problem|N+1 Query Problem]]

### Candidate MOC connections

`Backend Engineering MOC` (primary), `Database Systems MOC` (data access and performance), `Computer Science MOC` (not primary).

## 4. LINQ

### Sources inspected

- `30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/LINQ Revision.md` (2,672 lines).
- Supporting: `Deferred Execution vs Eager Execution.md`, `IQueryable vs IEnumerable.md`, `Enumerable.md`.

### Meaningful concepts present

| Concept | Source section | Independent idea? | Decision |
|---|---|---|---|
| Deferred vs immediate execution | Opening section | Yes, concrete, example-rich | **Created** |
| Filtering (`Where`, `OfType`) | Filtering | Yes | Proposal: `LINQ Filtering` |
| Projection (`Select`, `SelectMany`) | Projection | Yes, but two related ideas | Proposals: `LINQ Select`, `LINQ SelectMany` |
| Ordering (`OrderBy`, `ThenBy`, `Reverse`) | Ordering | Yes | Proposal: `LINQ Ordering` |
| Partitioning and pagination | Partitioning | Yes | Proposal: `LINQ Pagination` |
| Quantifiers and short-circuiting | Quantifiers | Yes | Proposal: `LINQ Quantifiers` |
| Grouping | Grouping | Yes | Proposal: `LINQ GroupBy` |
| Aggregation | Aggregation | Yes | Proposal: `LINQ Aggregation` |
| Set operations | Set Operations | Yes | Proposal: `LINQ Set Operations` |
| Conversion and materialisation | Conversion | Yes, but overlaps deferred execution | Proposal only; link to created note |
| Element and generation operators | Element / Generation | Yes, but reference-like | Reference Note candidates, not Permanent Notes |
| Sequence operations | Sequence Operations | Yes | Proposal: `LINQ Sequence Operations` |

### Overlap and duplicates

- `Deferred Execution in LINQ` overlaps with the existing `Deferred Execution vs Eager Execution` source note. The permanent note distils the mechanism; the source note remains the canonical long-form explanation. The two link to each other.
- `ToList`, `ToArray`, `Count`, `First`, `Max` are materialisation points; they belong in the deferred-execution note or a Reference Note, not in many tiny notes.

### Created

- [[20 Zettelkasten/Permanent Notes/Deferred Execution in LINQ|Deferred Execution in LINQ]]

### Candidate MOC connections

`Backend Engineering MOC` (primary), `Programming Languages MOC` (C# language features), `Database Systems MOC` (IQueryable and EF Core).

## 5. Kubernetes

### Sources inspected

- `30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes Day 1.md` (3,700 lines).
- `30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes D1 Refactoring.md` (1,124 lines).
- `30 Sources/DEPI/Study/DevOps/Kubernetes/Kubernetes From Official Documentation.md` (328 lines, roadmap).
- Supporting: DEPI DevOps summaries and assignments.

### Meaningful concepts present

| Concept | Source section | Independent idea? | Decision |
|---|---|---|---|
| Why Kubernetes / deployment eras | D1 Refactoring §1–2 | Yes, contextual | Proposal: `From Traditional Deployment to Kubernetes` |
| Cluster, control plane, nodes | D1 Refactoring §3 | Yes, concrete | **Created** |
| Objects, spec and status, manifests | §4–5 | Yes | Proposal: `Kubernetes Objects and Manifests` |
| Object names, UIDs, generateName | §6 | Yes, reference-like | Reference Note candidate |
| Labels, selectors, annotations | §7, §9 | Yes, concrete | **Created** (`Kubernetes Labels and Selectors`) |
| Namespaces | §8 | Yes | Proposal: `Kubernetes Namespaces` |
| Field selectors | §10 | Yes, but narrow | Reference Note candidate |
| Finalizers and owner references | §11–12 | Yes | Proposal: `Kubernetes Finalizers and Ownership` |
| Recommended labels | §13 | Yes, convention-heavy | Reference Note candidate |
| Storage versions | §14 | Yes, advanced | Proposal only |
| Workloads, Services, Ingress, ConfigMaps, probes, scheduling, storage, security | Official documentation roadmap | Not yet written in source | Do not invent; roadmap only |

### Overlap and duplicates

- `Kubernetes Day 1.md` and `Kubernetes D1 Refactoring.md` overlap heavily. The refactored note is the clearer structure; the original contains extra detail. Keep both; do not merge without a line-by-line review (Review Report item 2).
- Kubernetes concepts belong in `DevOps and Infrastructure MOC`, not `Backend Engineering MOC`.

### Created

- [[20 Zettelkasten/Permanent Notes/Kubernetes Cluster Architecture|Kubernetes Cluster Architecture]]
- [[20 Zettelkasten/Permanent Notes/Kubernetes Labels and Selectors|Kubernetes Labels and Selectors]]

### Candidate MOC connections

`DevOps and Infrastructure MOC` (primary), `System Design MOC` (operational architecture), `Computer Science MOC` (not primary).

## 6. Distributed Systems

### Sources inspected

- `30 Sources/Other Sources/My Master/Roadmap/Week 0/What's Distributed System.md` — **0 bytes**, a linked placeholder.
- `30 Sources/Other Sources/My Master/Researches/RoadMap.md` — roadmap references only.
- DDIA Literature Notes: `DDIA — Reliability`, `DDIA — Scalability and Maintainability`, `DDIA — SQL vs NoSQL`.

### Finding

There is no written source note for the distributed-systems introduction. The DDIA Literature Notes are real and already belong to the Zettelkasten. Creating Permanent Notes such as `Consensus`, `Replication`, or `Consistency Models` would fabricate knowledge that the vault does not contain.

### Decision

- Do **not** create distributed-systems Permanent Notes yet.
- Keep the linked placeholder `What's Distributed System.md` (decision D15).
- Record the gap in the Review Report and the MOC.
- When the source note is written, extract: definition, fallacies, why distribution is hard, failure models, and the link to reliability/scalability.

### Existing knowledge to connect

- [[20 Zettelkasten/Literature Notes/DDIA/Chapter 1/DDIA — Reliability|DDIA — Reliability]]
- [[20 Zettelkasten/Literature Notes/DDIA/Chapter 1/DDIA — Scalability and Maintainability|DDIA — Scalability and Maintainability]]
- [[20 Zettelkasten/Literature Notes/DDIA/Chapter 2/DDIA — SQL vs NoSQL|DDIA — SQL vs NoSQL]]

## 7. Research Methodology

### Sources inspected

- `30 Sources/Other Sources/My Master/Roadmap/Week 0/What's Research Paper.md` — **0 bytes**, a linked placeholder.
- `30 Sources/Other Sources/My Master/Researches/RoadMap.md` — mentions research methodology as a later phase.
- `30 Sources/Other Sources/My Master/Dashboard.md` — roadmap references.

### Finding

No research-methodology source note exists. The roadmap names the topic but does not teach it. A Permanent Note would be invented.

### Decision

- Proposal only: when the source exists, extract `What Makes a Research Paper`, `Literature Review Process`, `Research Questions and Hypotheses`, `Citation and Attribution`, and `Reading Papers in Three Passes`.
- Do not create placeholder notes. Keep the roadmap link as the source of intent.
- Track the missing source in [[00 System/Review Report]].

## 8. Alex Xu / System Design Interview

### Sources inspected

- `20 Zettelkasten/Literature Notes/System Design Interview by Alex Xu.md` (1,619 lines, Chapter 1).
- `30 Sources/Other Sources/My Master/Roadmap/Load Balancer in Web Applications.md`.

### Meaningful concepts present

| Concept | Source section | Independent idea? | Decision |
|---|---|---|---|
| Scaling journey and single-server limits | §1–3 | Yes, narrative | Proposal: `Scaling From a Single Server` |
| SQL vs NoSQL choice | §4 | Yes, overlaps DDIA Chapter 2 | Do not duplicate; link to DDIA note |
| Vertical vs horizontal scaling | §5 | Yes | Proposal: `Vertical vs Horizontal Scaling` |
| Load balancer | §6 | Yes, concrete | **Created** |
| Database replication | §7 | Yes, overlaps DDIA | Proposal only; link to DDIA |
| Cache | §8 | Yes | Proposal: `Caching in System Design` |
| CDN | §9 | Yes | Proposal: `Content Delivery Networks` |
| Stateless web tier | §10 | Yes | Proposal: `Stateless Web Tier` |
| Multiple data centres | §11 | Yes | Proposal only |
| Message queue | §12 | Yes | Proposal: `Message Queues and Decoupling` |
| Logging, metrics, automation | §13 | Yes, operational | Proposal only |
| Database sharding | §14 | Yes | Proposal: `Database Sharding` |
| Replication vs sharding | §15 | Yes, comparative | Proposal only |

### Overlap and duplicates

- SQL vs NoSQL is covered by DDIA Chapter 2 and Alex Xu §4. Keep the DDIA Literature Note as the deeper treatment; the Alex Xu note is the interview-oriented source. A Permanent Note should compare, not repeat.
- Replication appears in both Alex Xu §7 and DDIA. No duplicate permanent note yet.
- Load balancing also appears in the standalone `Load Balancer in Web Applications` note; the created note links to both.

### Created

- [[20 Zettelkasten/Permanent Notes/Load Balancing in Scalable Systems|Load Balancing in Scalable Systems]]

### Candidate MOC connections

`System Design MOC` (primary), `Distributed Systems MOC` (reliability and scaling), `Backend Engineering MOC` (applied architecture).

## 9. DDIA

### Sources inspected

- `20 Zettelkasten/Literature Notes/DDIA/Chapter 1/DDIA — Reliability.md`.
- `20 Zettelkasten/Literature Notes/DDIA/Chapter 1/DDIA — Scalability and Maintainability.md`.
- `20 Zettelkasten/Literature Notes/DDIA/Chapter 2/DDIA — SQL vs NoSQL.md`.

### Finding

These are substantial Literature Notes in Arabic with examples and diagrams. They are already in the correct layer. The material supports several independent ideas, but turning them into Permanent Notes requires the user's own synthesis and, in places, completion of the chapter.

### Proposals (not created)

| Candidate Permanent Note | Source basis | Why not created now |
|---|---|---|
| `Reliability, Scalability, and Maintainability` | Chapter 1 | The three properties are described, but a good permanent note needs a single unifying argument and the user's own framing. |
| `Describing Load and Performance` | Chapter 1 (Twitter example, latency vs response time) | Requires selecting and reconciling several definitions. |
| `Data Models and the Relational/Document Divide` | Chapter 2 | Overlaps Alex Xu §4; needs a comparison decision. |
| `Schema-on-Write vs Schema-on-Read` | Chapter 2 | Present but not fully developed in the source. |
| `Normalisation, Denormalisation, and Locality` | Chapter 2 | Requires synthesis across DDIA and database-course notes. |

### Existing knowledge to connect

- Keep the three Literature Notes linked from `Distributed Systems MOC`, `System Design MOC`, and `Database Systems MOC`.
- No duplicate note should be created for SQL vs NoSQL; link the Alex Xu note to the DDIA note.

## 10. Go

### Sources inspected

- `30 Sources/Other Sources/My Master/Roadmap/GoLang/Chapter 1 & 2 From Learning Go (Jon Bonder).md`.
- `30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 3.md`.
- `30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 4.md`.
- `20 Zettelkasten/Literature Notes/Learning Go An Idiomatic Approach to Real-world Go Programming, 2nd Edition (Jon Bodner) (Z-Library).md` — a PDF-annotation index, not a chapter summary.

### Meaningful concepts present

| Concept | Source section | Independent idea? | Decision |
|---|---|---|---|
| Go toolchain commands | Chapter 1 | Yes, reference-like | Reference Note candidate |
| Modules and `go.mod` | Chapter 1–2 | Yes, concrete | **Created** |
| Packages, `main`, imports | Chapter 1–2 | Yes | Proposal: `Go Packages and the main Package` |
| Arrays and slices | Chapter 3 | Yes | Proposal: `Go Arrays and Slices` |
| Multidimensional arrays | Chapter 3 | Yes, narrow | Fold into arrays proposal |
| Blocks and scope | Chapter 4 | Yes | Proposal: `Blocks and Scope in Go` |
| Variable shadowing | Chapter 4 | Yes, concrete | **Created** |
| Multiple assignment and shadowing | Chapter 4 | Yes, narrow | Fold into shadowing note |
| Functions, methods, interfaces | Chapter 5 (linked, may not exist) | Not yet inspected | Do not invent |

### Overlap and duplicates

- The `Learning Go` Literature Note is only a PDF annotation stub; it is not a duplicate of the chapter source notes. It should remain the bibliographic link to the PDF.
- Go language concepts belong in `Programming Languages MOC`, not `Backend Engineering MOC` (which is .NET-focused).

### Created

- [[20 Zettelkasten/Permanent Notes/Go Modules|Go Modules]]
- [[20 Zettelkasten/Permanent Notes/Variable Shadowing in Go|Variable Shadowing in Go]]

### Candidate MOC connections

`Programming Languages MOC` (primary), `Research and Master's Prep MOC` (Go learning track).

## 11. Cross-subject overlap register

| Overlapping idea | Notes involved | Resolution |
|---|---|---|
| `IQueryable`, deferred execution | `LINQ Revision`, `Deferred Execution vs Eager Execution`, `IQueryable vs IEnumerable`, EF Core §20–21 | One Permanent Note on deferred execution; link to the existing source notes; no duplicate. |
| SQL vs NoSQL | DDIA Chapter 2, Alex Xu §4, Database MOC | DDIA is the deep source; Alex Xu is the interview source; no Permanent Note until a comparison is written. |
| Replication | Alex Xu §7, DDIA Chapter 1/5 (future) | Proposal only; one note later. |
| Indexing | EF Core §27, Route Academy `Indexes`, Database MOC | Proposal only; do not create three notes. |
| Kubernetes Day 1 | `Kubernetes Day 1`, `Kubernetes D1 Refactoring` | Keep both; extract only concepts that are stable across both. |
| Tracking vs no tracking | EF Core §19, `AsNoTracking` | Proposal; one note later. |

## 12. Phase D verification

| Check | Result |
|---|---|
| Every created note has a real source link | Pass |
| Every created note has at least one real related note or MOC | Pass |
| Every created note expresses one idea | Pass |
| No note created for a 0-byte or non-existent source | Pass |
| No source note replaced or shortened | Pass |
| No duplicate of an existing Literature Note | Pass |
| YAML frontmatter valid | Pass (checked 2026-11-08) |
| Links resolve | Pass (checked 2026-11-08) |
| Uncertain synthesis recorded as a proposal | Pass |

## 13. Next actions for Phase D follow-up

1. Write the missing `What's Distributed System` source note before creating distributed-systems Permanent Notes.
2. Write the missing research-methodology source note before creating research notes.
3. When DDIA Chapter 1 is fully processed, write one synthesis note on reliability/scalability/maintainability rather than three fragments.
4. Keep the proposal list as the backlog; do not mass-create notes.
