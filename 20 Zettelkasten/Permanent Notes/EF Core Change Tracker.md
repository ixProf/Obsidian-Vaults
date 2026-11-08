---
title: "EF Core Change Tracker"
aliases: ["Change Tracker", "DbContext Change Tracking"]
type: permanent
status: evergreen
domain: backend-engineering
tags: [permanent, ef-core, csharp, change-tracking]
created: 2026-11-08
updated: 2026-11-08
source: "[[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Entity Framework Revision]]"
related: ["[[20 Zettelkasten/Permanent Notes/N+1 Query Problem]]", "[[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/IQueryable vs IEnumerable]]", "[[10 Maps of Content/Backend Engineering MOC]]"]
---

# EF Core Change Tracker

## Idea

`DbContext` keeps a tracking record for every entity it has loaded or attached. That record includes the entity's **state**, and `SaveChanges()` uses the state to decide which SQL statement to generate.

## Explanation

When EF Core materialises an entity from the database, it starts as `Unchanged`. If a property is changed, the tracker marks the entity `Modified`. `SaveChanges()` then emits an `UPDATE` for that entity.

```csharp
var product = context.Products.First();   // State = Unchanged
product.Price = 500;                      // State = Modified
context.SaveChanges();                    // UPDATE Products SET Price = 500 WHERE Id = ...
```

The five entity states are:

| State | Meaning | SQL on `SaveChanges()` |
|---|---|---|
| `Added` | New entity, not yet in the database | `INSERT` |
| `Unchanged` | Loaded and not modified | None |
| `Modified` | Existing entity with changed values | `UPDATE` |
| `Deleted` | Marked for removal | `DELETE` |
| `Detached` | Not tracked by this context | None |

Tracking is what makes the "unit of work" style possible: load, change, save. It also has a cost, which is why read-only queries often use `AsNoTracking()`.

## Why it matters

- It explains why changing a property and calling `SaveChanges()` is enough — there is no explicit `Update()` call in the normal flow.
- It explains why a long-lived context can accumulate tracked entities and produce unexpected updates.
- It is the reason `AsNoTracking()` exists for read-only queries.
- It is separate from the N+1 problem: tracking is about state and memory; N+1 is about query count.

## Related

- [[20 Zettelkasten/Permanent Notes/N+1 Query Problem]]
- [[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Entity Framework Revision]]
- [[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/IQueryable vs IEnumerable]]
- [[10 Maps of Content/Backend Engineering MOC]]

## Source

- `Entity Framework Revision.md`, §10 "Change Tracker — The Memory of DbContext" and §19 "AsNoTracking()".
- The source note remains the canonical long-form explanation, including the Arabic commentary and examples.
