---
title: "Deferred Execution in LINQ"
aliases: ["LINQ Deferred Execution", "Deferred Execution"]
type: permanent
status: evergreen
domain: backend-engineering
tags: [permanent, linq, csharp, deferred-execution]
created: 2026-11-08
updated: 2026-11-08
source: "[[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/LINQ Revision]]"
related: ["[[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Deferred Execution vs Eager Execution]]", "[[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/IQueryable vs IEnumerable]]", "[[10 Maps of Content/Backend Engineering MOC]]"]
---

# Deferred Execution in LINQ

## Idea

Most LINQ query operators do not execute when the query is declared. They build a query definition that runs when the sequence is enumerated or materialised.

## Explanation

```csharp
var nums = new List<int> { 1, 2, 3, 4, 5, 6 };

var result =
    from n in nums
    where n % 2 == 0
    select n;

nums.Add(8);

foreach (var n in result)
{
    Console.WriteLine(n);
}

// 2
// 4
// 6
// 8
```

The query was written before `8` was added, but `8` appears in the output because `Where` had not run yet. Execution happened at `foreach`.

Operators such as `Where`, `Select`, `Take`, and `Skip` are deferred. Operators such as `ToList`, `ToArray`, `Count`, `First`, `Max`, `Min`, and `Sum` force execution immediately.

```csharp
var snapshot = (
    from n in nums
    where n % 2 == 0
    select n
).ToList();
```

`ToList()` executes the query once and stores the result. Later changes to `nums` do not affect `snapshot`.

## Why it matters

- The data source is read at enumeration time, not at declaration time.
- Enumerating the same deferred query twice can run the query twice.
- Materialising into a list creates a stable snapshot, which is often what callers expect.
- In EF Core, deferred execution is what allows the provider to translate the whole query into SQL before it runs.

## Related

- [[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/Deferred Execution vs Eager Execution]]
- [[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/IQueryable vs IEnumerable]]
- [[30 Sources/Other Sources/Backend/For Revision/Advanced Csharp/LINQ Revision]]
- [[10 Maps of Content/Backend Engineering MOC]]

## Source

- `LINQ Revision.md`, opening section "Deferred Execution and Immediate Execution", including the `nums.Add(8)` example and the list of deferred/immediate operators.
- The source note remains the canonical long-form explanation.
