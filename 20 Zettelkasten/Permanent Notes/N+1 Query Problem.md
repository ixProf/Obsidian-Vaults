---
title: "N+1 Query Problem"
aliases: ["N+1", "N plus one queries"]
type: permanent
status: evergreen
domain: database-systems
tags: [permanent, ef-core, performance, queries]
created: 2026-11-08
updated: 2026-11-08
source: "[[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Entity Framework Revision]]"
related: ["[[20 Zettelkasten/Permanent Notes/EF Core Change Tracker]]", "[[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Entity Framework Revision]]", "[[10 Maps of Content/Database Systems MOC]]"]
---

# N+1 Query Problem

## Idea

The N+1 problem happens when an application loads a list of parents with one query, then loads a related collection for each parent with an additional query. One query becomes **1 + N** queries.

## Explanation

With lazy loading, this code looks harmless:

```csharp
var customers = await context.Customers.ToListAsync();

foreach (var customer in customers)
{
    var orders = customer.Orders; // triggers a query per customer
}
```

For 100 customers the database receives:

```text
1 query   → get all customers
100 queries → get orders for each customer
= 101 queries
```

The fix is to load the related data in the same query, or to project only what is needed:

```csharp
var customers = await context.Customers
    .Include(c => c.Orders)
    .ToListAsync();
```

```csharp
var customers = await context.Customers
    .Select(c => new
    {
        c.Id,
        c.Name,
        OrdersCount = c.Orders.Count()
    })
    .ToListAsync();
```

The projection is often better when the full child collection is not needed, because it avoids transferring and tracking unnecessary rows.

## Why it matters

- It turns a small page load into hundreds of database round-trips.
- It gets worse as the parent list grows, so it often appears only in production-sized data.
- It is easy to miss because the code reads naturally.
- It is distinct from tracking: eager loading fixes query count, while `AsNoTracking()` reduces tracking overhead.

## Related

- [[20 Zettelkasten/Permanent Notes/EF Core Change Tracker]]
- [[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Entity Framework Revision]]
- [[10 Maps of Content/Database Systems MOC]]
- [[10 Maps of Content/Backend Engineering MOC]]

## Source

- `Entity Framework Revision.md`, §18.4 "N+1 Query Problem", including the lazy-loading example and the `Include`/projection fixes.
- The source note remains the canonical explanation with the original examples.
