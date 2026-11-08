---
title: "OrderBy and TOP"
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

# What is ORDER BY?

`ORDER BY` is used ==to sort the result set returned by a query==.

By default, SQL does **not guarantee** the order of rows unless you explicitly specify an `ORDER BY` clause.

Without `ORDER BY`, the database engine can return rows ==in any order.==

---
## Basic Syntax

```sql
SELECT column1, column2
FROM TableName
ORDER BY column;
```

### Example

Products

| ProductID | ProductName | Price |
|------------|-------------|------:|
| 1 | Laptop | 1200 |
| 2 | Mouse | 20 |
| 3 | Keyboard | 40 |
| 4 | Monitor | 300 |

Query

```sql
SELECT *
FROM Products
ORDER BY Price;
```

Output

| Product | Price |
|----------|------:|
| Mouse | 20 |
| Keyboard | 40 |
| Monitor | 300 |
| Laptop | 1200 |

Notice that SQL sorted the rows from the **smallest** price to the **largest**.
### ASC (Ascending)

Ascending order ==is the default.==

```sql
SELECT *
FROM Products
ORDER BY Price ASC;
```

Result

```
20
40
300
1200
```

### DESC (Descending)

Descending order sorts from largest to smallest.

```sql
SELECT *
FROM Products
ORDER BY Price DESC;
```

Output

```
1200
300
40
20
```

---

## ORDER BY Multiple Columns

You can sort using more than one column.

Example

Employees

| Name | Department | Salary |
|------|------------|-------:|
| Ahmed | IT | 9000 |
| Ali | IT | 8000 |
| Sara | HR | 7000 |
| Mona | HR | 6500 |

Query

```sql
SELECT *
FROM Employees
ORDER BY Department ASC,
         Salary DESC;
```

SQL works like this:

1. Sort by ==Department.==
2. ==Inside== each Department, sort by Salary.

Output

| Department | Name  | Salary |
| ---------- | ----- | -----: |
| HR         | Sara  |   7000 |
| HR         | Mona  |   6500 |
| IT         | Ahmed |   9000 |
| IT         | Ali   |   8000 |

---

## ORDER BY Text

```sql
SELECT *
FROM Customers
ORDER BY CustomerName;
```

Result

```
Ahmed
Ali
Mohamed
Sara
```

==Alphabetical order.==

---

## ORDER BY Date

Orders

| OrderID | OrderDate |
|---------|------------|
|101|2025-01-10|
|102|2025-03-05|
|103|2024-12-20|

```sql
SELECT *
FROM Orders
ORDER BY OrderDate DESC;
```

==Newest orders== appear first.

---

## ORDER BY Alias

```sql
SELECT
Name,
Salary * 12 AS AnnualSalary
FROM Employees
ORDER BY AnnualSalary DESC;
```

You can sort using an alias created in the SELECT clause.

---

## ORDER BY Column Number

```sql
SELECT
Name, --1
Salary, --2
Department --3
FROM Employees
ORDER BY 2 DESC;
```

Meaning:

```
Column 2 = Salary
```

Although valid, this is **not recommended** because changing the SELECT list can break the query.

---

# What is TOP?

`TOP` ==limits the number of rows== returned.

Instead of returning every row, SQL ==only returns the first N rows==.

---
## Syntax

```sql
SELECT TOP (N)
*
FROM Table;
```

### Example

```sql
SELECT TOP (3)
*
FROM Products;
```

Only the first three rows are returned.

---

## Why should TOP almost always be used with ORDER BY?

Consider:

```sql
SELECT TOP (3)
*
FROM Products;
```

Which three products?

SQL doesn't know.

The database simply returns whichever rows happen to come first.

The result is ==**not guaranteed**.==

Correct:

```sql
SELECT TOP (3)
*
FROM Products
ORDER BY Price DESC;
```

Now SQL returns t==he three most expensive products==.

---

## TOP 1

Get the highest salary.

```sql
SELECT TOP (1)
*
FROM Employees
ORDER BY Salary DESC;
```

---

## TOP Percentage

Instead of a fixed number:

```sql
SELECT TOP (20) PERCENT
*
FROM Employees;
```

Returns ==the first 20%== of rows.

Example

100 rows -> 20 rows returned.

---

## Combining WHERE and TOP

```sql
SELECT TOP (5)
*
FROM Products
WHERE Price > 100
ORDER BY Price DESC;
```

Execution

```
FROM
↓
WHERE
↓
ORDER BY
↓
TOP
↓
SELECT
```

SQL ==filters first==, ==sorts the filtered rows==, then returns the top five.

---
## Real-Life Examples

Top 10 highest-paid employees

```sql
SELECT TOP (10)
Name,
Salary
FROM Employees
ORDER BY Salary DESC;
```

---

Newest five orders

```sql
SELECT TOP (5)
*
FROM Orders
ORDER BY OrderDate DESC;
```

---

Cheapest product

```sql
SELECT TOP (1)
*
FROM Products
ORDER BY Price ASC;
```

---
## What is TOP WITH TIES?

Normally,

```sql
TOP (N)
```

returns exactly **N rows**.

However, if multiple rows have the **same value** as the last selected row, SQL usually ignores them.

`WITH TIES` tells SQL:

> "If other rows have the same ORDER BY value as the last selected row, include them too."

---

## Why do we need WITH TIES?

Imagine ranking students.

Scores

| Student | Score |
|----------|------:|
| Ahmed | 100 |
| Sara | 98 |
| Ali | 98 |
| Mona | 95 |

Suppose we ask for:

```sql
TOP (2)
```

SQL returns

| Student | Score |
|----------|------:|
| Ahmed |100|
|Sara|98|

Ali also scored 98.

Is it fair to exclude him?

No.

WITH ==TIES== solves this problem.

---
## Syntax

```sql
SELECT TOP (N) WITH TIES
*
FROM Table
ORDER BY Column;
```
### Example

Products

| Product | Price |
|----------|------:|
| Laptop |1200|
| TV |1200|
| Monitor |900|
| Mouse |20|

Query

```sql
SELECT TOP (1) WITH TIES
*
FROM Products
ORDER BY Price DESC;
```

Output

| Product | Price |
|----------|------:|
| Laptop |1200|
| TV |1200|

Although TOP(1) was requested, SQL ==returned two rows== because both share the highest price.

## Another Example

Employees

| Name | Salary |
|------|-------:|
|Ahmed|9000|
|Ali|8500|
|Sara|8500|
|Mona|8000|

Query

```sql
SELECT TOP (2) WITH TIES
*
FROM Employees
ORDER BY Salary DESC;
```

Normal TOP

| Name |
|------|
|Ahmed|
|Ali|

WITH TIES

| Name |
|------|
|Ahmed|
|Ali|
|Sara|

Sara has ==the same salary== as Ali.

---
## Requirement

`WITH TIES` **requires** an `ORDER BY` clause.

Wrong

```sql
SELECT TOP (5) WITH TIES
*
FROM Employees;
```

SQL Server returns an error because ==it doesn't know what values should be compared==.

Correct

```sql
SELECT TOP (5) WITH TIES
*
FROM Employees
ORDER BY Salary DESC;
```

---