---
title: "Ranking Functions"
aliases: []
type: source
status: active
domain: database-systems
tags: [source, database-systems]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
# Part 6 — ROW_NUMBER()

## What is ROW_NUMBER()?

`ROW_NUMBER()` is a **window function** that assigns a ==**unique sequential number** to every row in the result set.==

Unlike an identity column, the numbers are generated ==**only when the query runs**==.

They are ==**not stored**== in the table.

## Why do we use ROW_NUMBER()?

Common uses include:

- Ranking data
- Pagination
- Finding duplicates
- Returning the Top N rows per category
- Numbering reports

---
## Syntax

```sql
ROW_NUMBER() OVER (
    ORDER BY column
)
```

## OVER Clause

Window functions always use the `OVER()` clause.

The OVER clause ==defines **how SQL processes the rows**.==

Inside OVER, we usually specify:

```sql
ORDER BY
```

or later

```sql
PARTITION BY
```

## Basic Example

Employees

| Name | Salary |
|------|-------:|
|Ahmed|9000|
|Ali|7000|
|Sara|8500|

Query

```sql
SELECT
ROW_NUMBER() OVER(ORDER BY Salary DESC) AS RowNum,
Name,
Salary
FROM Employees;
```

Output

| RowNum | Name | Salary |
|--------|------|-------:|
|1|Ahmed|9000|
|2|Sara|8500|
|3|Ali|7000|

---

## How SQL Works

Step 1

Sort

```
9000

8500

7000
```

↓

Step 2

Assign numbers

```
1

2

3
```

Each row receives a unique number.

---

## Important Rule

Every row gets a different number.

Even if values are equal.

Example

| Name | Salary |
|------|-------:|
|Ahmed|9000|
|Ali|9000|
|Sara|8500|

Query

```sql
SELECT
ROW_NUMBER() OVER(
ORDER BY Salary DESC
)
AS Ranking,
Name,
Salary
FROM Employees;
```

Output

|Ranking|Name|Salary|
|--------|----|------:|
|1|Ahmed|9000|
|2|Ali|9000|
|3|Sara|8500|

Notice

Ahmed and Ali have the same salary.

But ROW_NUMBER still gives them different numbers.

---

## Difference from Identity

Identity

```
Stored permanently.
```

ROW_NUMBER

```
Generated temporarily.
```

Every execution can generate different numbers if the ordering changes.

---

## Pagination Using ROW_NUMBER

```sql
SELECT *
FROM
(
SELECT
ROW_NUMBER() OVER(
ORDER BY ProductID
) AS RowNum,
*
FROM Products
) T
WHERE RowNum BETWEEN 11 AND 20;
```

Output

```
Rows

11

12

13

...

20
```

Before OFFSET/FETCH was introduced, this was the common pagination technique in SQL Server.

---

## Finding Duplicate Rows

Customers

| ID | Email |
|----|----------------|
|1|a@test.com|
|2|a@test.com|
|3|b@test.com|

Query

```sql
SELECT
ROW_NUMBER() OVER(
PARTITION BY Email
ORDER BY ID
) AS RN,
*
FROM Customers;
```

Output

| RN  | Email      |
| --- | ---------- |
| 1   | a@test.com |
| 2   | a@test.com |
| 1   | b@test.com |

Rows with `RN > 1` are duplicates.

---

## Top N Per Group

Suppose every department has many employees.

You want the highest-paid employee in each department.

```sql
WITH RankedEmployees AS
(
SELECT
Name,
Department,
Salary,
ROW_NUMBER() OVER(
PARTITION BY Department
ORDER BY Salary DESC
) AS RN
FROM Employees
)
SELECT *
FROM RankedEmployees
WHERE RN = 1;
```

Result

Highest-paid employee from each department.

---

## Common Mistakes

### Forgetting ORDER BY

```sql
ROW_NUMBER() OVER()
```

Invalid.

ORDER BY is required.

---

### Assuming ROW_NUMBER Handles Ties

It does not.

Equal values still receive different row numbers.

---

### Expecting Stable Numbers

If the ORDER BY changes, row numbers change.

---

## Performance

ROW_NUMBER requires sorting.

Large datasets benefit from indexes on the ORDER BY column.

---

## Comparison

| Function | Duplicate Values |
|-----------|------------------|
|ROW_NUMBER|Always unique|
|RANK|Same rank for ties|
|DENSE_RANK|Same rank, no gaps|

---

## SQL Server Notes
# Part 7 — RANK() & DENSE_RANK()

---

## Introduction

In the previous lesson, we learned about `ROW_NUMBER()`, which ==assigns a **unique sequential number** to every row.==

However, in many real-world situations, multiple rows may have the **same value**.

For example:

- Two employees have the same salary.
- Three students receive the same exam score.
- Two products have the same sales amount.

Should they receive different rankings?

Usually, **No**.

That's why SQL provides two additional ranking functions:

- `RANK()`
- `DENSE_RANK()`

These functions are called **Ranking Window Functions**.

---

## Ranking Functions Overview

SQL Server provides three common ranking functions.

| Function | Duplicate Values | Gaps in Ranking |
|-----------|------------------|-----------------|
| ROW_NUMBER() | Different numbers | No |
| RANK() | Same rank | Yes |
| DENSE_RANK() | Same rank | No |

This is one of the most common SQL interview questions.

---

## What is RANK()?

`RANK()` assigns a ==ranking to rows based on the `ORDER BY` clause.==

If ==two or more rows have the same value, they receive the **same rank**==.

The next rank **skips** numbers.

---

### Why do we use RANK()?

Use `RANK()` when equal values deserve the same position.

Examples:

- Student rankings
- Employee salaries
- Product sales
- Competition results
- Sports tournaments

---

### Syntax

```sql
RANK() OVER (
    ORDER BY column
)
```

#### Example 1

Employees

| Name | Salary |
|------|-------:|
| Ahmed | 9000 |
| Sara | 8500 |
| Ali | 8500 |
| Mona | 7000 |

Query

```sql
SELECT
Name,
Salary,
RANK() OVER(
ORDER BY Salary DESC
) AS SalaryRank
FROM Employees;
```

Output

| Name | Salary | Rank |
|------|-------:|----:|
| Ahmed |9000|1|
| Sara |8500|2|
| Ali |8500|2|
| Mona |7000|4|

Notice

```
1

2

2

4
```

Rank **3** is skipped.

---

### Why is Rank 3 Missing?

Let's see the process.

Step 1

Sort

```
9000

8500

8500

7000
```

Step 2

Assign Rank

```
1

2

2

4
```

Since two employees occupy position 2,

the next available position becomes 4.

This is exactly how sports competitions work.

---

### Real-Life Example

Running Competition

```
Ahmed finishes first.

Sara and Ali tie for second.

Who finishes after them?

Fourth place.
```

There is **no third place**.

This is exactly how `RANK()` behaves.

---

### More Example

Students

| Student | Score |
|----------|------:|
|Ahmed|100|
|Sara|95|
|Ali|95|
|Mona|90|
|Omar|85|

Query

```sql
SELECT
Student,
Score,
RANK() OVER(
ORDER BY Score DESC
) AS Rank
FROM Students;
```

Output

|Student|Score|Rank|
|--------|----:|---:|
|Ahmed|100|1|
|Sara|95|2|
|Ali|95|2|
|Mona|90|4|
|Omar|85|5|

---

## What is DENSE_RANK()?

`DENSE_RANK()` is almost identical to `RANK()`.

The only difference:

It **does not leave gaps**.

Equal values receive the same rank,

but the next rank increases by only one.

---

### Syntax

```sql
DENSE_RANK() OVER(
ORDER BY column
)
```

---

#### Example

Employees

| Name | Salary |
|------|-------:|
|Ahmed|9000|
|Sara|8500|
|Ali|8500|
|Mona|7000|

Query

```sql
SELECT
Name,
Salary,
DENSE_RANK() OVER(
ORDER BY Salary DESC
) AS SalaryRank
FROM Employees;
```

Output

| Name | Salary | Dense Rank |
|------|-------:|-----------:|
|Ahmed|9000|1|
|Sara|8500|2|
|Ali|8500|2|
|Mona|7000|3|

Notice

```
1

2

2

3
```

No gaps.

---

## Visual Comparison

### ROW_NUMBER()

```
9000

8500

8500

7000

↓

1

2

3

4
```

Every row gets a unique number.

---

### RANK()

```
9000

8500

8500

7000

↓

1

2

2

4
```

Gap exists.

---

### DENSE_RANK()

```
9000

8500

8500

7000

↓

1

2

2

3
```

No gap.

---

## Side-by-Side Example

```sql
SELECT
Name,
Salary,

ROW_NUMBER() OVER(
ORDER BY Salary DESC
) AS RowNum,

RANK() OVER(
ORDER BY Salary DESC
) AS RankNum,

DENSE_RANK() OVER(
ORDER BY Salary DESC
) AS DenseRank

FROM Employees;
```

Output

|Name|Salary|ROW_NUMBER|RANK|DENSE_RANK|
|----|------:|---------:|---:|----------:|
|Ahmed|9000|1|1|1|
|Sara|8500|2|2|2|
|Ali|8500|3|2|2|
|Mona|7000|4|4|3|

This table is extremely important.

Many SQL interviews ask you to explain it.

---

## Using PARTITION BY

Ranking functions can rank inside groups.

Example

```sql
SELECT
Name,
Department,
Salary,

RANK() OVER(
PARTITION BY Department
ORDER BY Salary DESC
) AS DeptRank

FROM Employees;
```

Each department starts ranking from **1**.

We'll study `PARTITION BY` in detail in Part 9.

---

## Real-World Example

Suppose an online store wants to display

```
Top Selling Products
```

If two products sold exactly

```
5000
```

units,

they should both appear in second place.

Use

```sql
RANK()
```

or

```sql
DENSE_RANK()
```

depending on whether skipped ranks are desired.

---

## Top N with Ranking

Highest 3 salaries

```sql
WITH EmployeeRanks AS
(
SELECT
Name,
Salary,
RANK() OVER(
ORDER BY Salary DESC
) AS SalaryRank
FROM Employees
)

SELECT *
FROM EmployeeRanks
WHERE SalaryRank <= 3;
```

Notice

More than three employees may appear if ties exist.

---

## Common Mistakes

### Confusing ROW_NUMBER with RANK

ROW_NUMBER

```
9000

9000

↓

1

2
```

RANK

```
9000

9000

↓

1

1
```

---

### Expecting DENSE_RANK to Skip Numbers

It never skips.

---

### Forgetting ORDER BY

Wrong

```sql
RANK() OVER()
```

ORDER BY is required.

---

## Performance Notes

Like other window functions,

`RANK()` and `DENSE_RANK()` require sorting.

Large datasets perform much better when the ORDER BY column is indexed.

---

## When Should I Use Each Function?

Use **ROW_NUMBER()**

- Pagination
- Unique numbering
- Removing duplicates
- Sequential numbering

---

Use **RANK()**

- Competitions
- Student rankings
- Sports
- Reports where skipped positions make sense

---

Use **DENSE_RANK()**

- Leaderboards
- Product rankings
- Salary reports
- Any ranking where consecutive numbers are preferred

---

## Interview Qu# Bestions

### Q1

What is the difference between ROW_NUMBER and RANK?

Answer

ROW_NUMBER always generates unique numbers.

RANK gives equal values the same rank.

---

### Q2

What is the difference between RANK and DENSE_RANK?

Answer

RANK leaves gaps.

DENSE_RANK does not.

---

### Q3

Can multiple rows have the same RANK?

Yes.

---

### Q4

Can multiple rows have the same ROW_NUMBER?

No.

---

### Q5

Which function should be used for competition rankings?

Usually `RANK()`, because it reflects real-world competition rules.

---
# Practice Exercises

### Exercise 1

Display all employees ranked by salary using `RANK()`.

---

### Exercise 2

Display all employees ranked by salary using `DENSE_RANK()`.

---

### Exercise 3

Show `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` in the same query.

---

### Exercise 4

Return the top 3 salaries using `RANK()`.

---

### Exercise 5

Rank employees **within each department** using `RANK()`.

(Hint: Use `PARTITION BY Department`.)

---

# Exam Notes ⭐

- `RANK()` assigns the same rank to equal values **and skips the next rank(s)**.
- `DENSE_RANK()` assigns the same rank to equal values **without skipping ranks**.
- `ROW_NUMBER()` always assigns a **unique** number, even when values are equal.
- All ranking functions require an `OVER()` clause.
- `ORDER BY` inside `OVER()` is **mandatory**.
- `PARTITION BY` restarts the ranking for each group.
- Ranking functions are **window functions** and do not modify the underlying table.