# Introduction

Throughout the previous lessons, you've seen `PARTITION BY` used with:

- `ROW_NUMBER()`
- `RANK()`
- `DENSE_RANK()`
- `NTILE()`

But what exactly does it do?

Many beginners think `PARTITION BY` works like `GROUP BY`.

**It does NOT.**

This is one of the most common SQL misconceptions.

---

# What is PARTITION BY?

`PARTITION BY` is used inside **Window Functions** to divide the result set into **logical groups (partitions)**.

Each partition is processed **independently**, while **all rows remain visible**.

Unlike `GROUP BY`, it **does not combine rows**.

---

# Simple Definition

Imagine you have one large table.

`PARTITION BY` says:

> "Temporarily split this table into smaller groups, perform a calculation inside each group, then put all the rows back together."

---

# Why Do We Use PARTITION BY?

Without `PARTITION BY`, window functions work on the **entire table**.

With `PARTITION BY`, they work **inside each group**.

Examples:

- Rank employees inside each department.
- Number students inside each class.
- Calculate average salary per department.
- Find highest-selling product in each category.

---

# Syntax

```sql
WindowFunction()
OVER (
    PARTITION BY column
    ORDER BY column
)
```

Example

```sql
ROW_NUMBER()
OVER(
PARTITION BY Department
ORDER BY Salary DESC
)
```

---

# Example Table

Employees

| Employee | Department | Salary |
|----------|------------|-------:|
|Ahmed|IT|9000|
|Ali|IT|8000|
|Sara|HR|7000|
|Mona|HR|6500|
|Omar|Sales|6000|
|Noor|Sales|5500|

---

# Without PARTITION BY

```sql
SELECT
Name,
Department,
Salary,

ROW_NUMBER()
OVER(
ORDER BY Salary DESC
) AS RowNum

FROM Employees;
```

Output

| Name | Department | Salary | RowNum |
|------|------------|-------:|-------:|
|Ahmed|IT|9000|1|
|Ali|IT|8000|2|
|Sara|HR|7000|3|
|Mona|HR|6500|4|
|Omar|Sales|6000|5|
|Noor|Sales|5500|6|

Everything is treated as **one big table**.

---

# With PARTITION BY

```sql
SELECT
Name,
Department,
Salary,

ROW_NUMBER()
OVER(
PARTITION BY Department
ORDER BY Salary DESC
) AS RowNum

FROM Employees;
```

Output

| Name | Department | Salary | RowNum |
|------|------------|-------:|-------:|
|Ahmed|IT|9000|1|
|Ali|IT|8000|2|
|Sara|HR|7000|1|
|Mona|HR|6500|2|
|Omar|Sales|6000|1|
|Noor|Sales|5500|2|

Notice something important.

The numbering restarts.

---

# Visual Representation

Without PARTITION BY

```
Entire Table

Ahmed

Ali

Sara

Mona

Omar

Noor

↓

1

2

3

4

5

6
```

---

With PARTITION BY

```
IT

Ahmed

Ali

↓

1

2

----------------

HR

Sara

Mona

↓

1

2

----------------

Sales

Omar

Noor

↓

1

2
```

Each department starts from **1**.

---

# How SQL Processes PARTITION BY

Step 1

Split rows

```
IT

HR

Sales
```

↓

Step 2

Apply ORDER BY inside each partition.

↓

Step 3

Run the window function.

↓

Step 4

Merge everything back together.

---

# PARTITION BY with RANK()

```sql
SELECT
Name,
Department,
Salary,

RANK()
OVER(
PARTITION BY Department
ORDER BY Salary DESC
) AS DepartmentRank

FROM Employees;
```

Output

| Department | Name | Salary | Rank |
|------------|------|-------:|----:|
|IT|Ahmed|9000|1|
|IT|Ali|8000|2|
|HR|Sara|7000|1|
|HR|Mona|6500|2|
|Sales|Omar|6000|1|
|Sales|Noor|5500|2|

Each department has its own ranking.

---

# PARTITION BY with DENSE_RANK()

```sql
SELECT
Name,
Department,
Salary,

DENSE_RANK()
OVER(
PARTITION BY Department
ORDER BY Salary DESC
) AS DenseRank

FROM Employees;
```

If two employees in the same department have the same salary,

they receive the same rank.

The next rank has **no gap**.

---

# PARTITION BY with NTILE()

```sql
SELECT
Name,
Department,
Salary,

NTILE(2)
OVER(
PARTITION BY Department
ORDER BY Salary DESC
) AS SalaryGroup

FROM Employees;
```

Each department is divided independently into two salary groups.

---

# PARTITION BY with Aggregate Functions

This is where `PARTITION BY` becomes extremely powerful.

Window functions also work with aggregate functions such as:

- `SUM()`
- `AVG()`
- `COUNT()`
- `MIN()`
- `MAX()`

---

# Average Salary Per Department

```sql
SELECT
Name,
Department,
Salary,

AVG(Salary)
OVER(
PARTITION BY Department
) AS AverageDepartmentSalary

FROM Employees;
```

Output

| Name | Department | Salary | Department Average |
|------|------------|-------:|-------------------:|
|Ahmed|IT|9000|8500|
|Ali|IT|8000|8500|
|Sara|HR|7000|6750|
|Mona|HR|6500|6750|

Notice

Every employee remains visible,

while the department average appears beside each employee.

---

# Compare with GROUP BY

GROUP BY

```sql
SELECT
Department,
AVG(Salary)
FROM Employees
GROUP BY Department;
```

Output

| Department | Average |
|------------|--------:|
|IT|8500|
|HR|6750|

Employees disappear.

---

PARTITION BY

```sql
SELECT
Name,
Department,
Salary,

AVG(Salary)
OVER(
PARTITION BY Department
)

FROM Employees;
```

Output

|Employee|Salary|Average|
|---------|-----:|------:|
|Ahmed|9000|8500|
|Ali|8000|8500|
|Sara|7000|6750|
|Mona|6500|6750|

Rows remain.

---

# GROUP BY vs PARTITION BY

| GROUP BY | PARTITION BY |
|-----------|--------------|
|Combines rows|Keeps all rows|
|Returns one row per group|Returns every row|
|Used with aggregate functions|Used with window functions|
|Rows disappear|Rows stay visible|

This is one of the most important comparisons in SQL.

---

# Running Total

Another common use.

Sales

| Month | Sales |
|-------|------:|
|Jan|100|
|Feb|200|
|Mar|150|
|Apr|300|

```sql
SELECT
Month,
Sales,

SUM(Sales)
OVER(
ORDER BY Month
) AS RunningTotal

FROM Sales;
```

Output

|Month|Sales|Running Total|
|-----|-----:|------------:|
|Jan|100|100|
|Feb|200|300|
|Mar|150|450|
|Apr|300|750|

Now add `PARTITION BY Year`

Each year gets its own running total.

---

# Multiple PARTITION Columns

You can partition by more than one column.

```sql
ROW_NUMBER()
OVER(
PARTITION BY Department, JobTitle
ORDER BY Salary DESC
)
```

Meaning

Create partitions based on the combination of:

- Department
- Job Title

Example

```
IT + Developer

↓

Own numbering

----------------

IT + Manager

↓

Own numbering

----------------

HR + Recruiter

↓

Own numbering
```

---

# Real-World Example

Company Database

Goal

Display

- Employee
- Department
- Salary
- Highest salary inside department

```sql
SELECT
Name,
Department,
Salary,

MAX(Salary)
OVER(
PARTITION BY Department
) AS HighestDepartmentSalary

FROM Employees;
```

Output

|Employee|Salary|Highest Salary|
|---------|-----:|-------------:|
|Ahmed|9000|9000|
|Ali|8000|9000|
|Sara|7000|7000|
|Mona|6500|7000|

---

# Finding Employees Above Department Average

```sql
WITH EmployeeData AS
(
SELECT
Name,
Department,
Salary,

AVG(Salary)
OVER(
PARTITION BY Department
) AS AvgSalary

FROM Employees
)

SELECT *
FROM EmployeeData
WHERE Salary > AvgSalary;
```

Very common interview question.

---

# Common Mistakes

## Confusing GROUP BY with PARTITION BY

Wrong idea

```
They do the same thing.
```

Reality

They are completely different.

---

## Forgetting ORDER BY

Functions like

- ROW_NUMBER
- RANK
- DENSE_RANK
- NTILE

still require ORDER BY.

---

## Expecting PARTITION BY to Reduce Rows

It never removes rows.

Every row remains visible.

---

# Performance Notes

Window functions usually require sorting.

Performance improves when:

- Partition columns are indexed.
- ORDER BY columns are indexed.
- Only required columns are selected.

---

# Interview Questions

## Q1

What is the difference between GROUP BY and PARTITION BY?

Answer

GROUP BY collapses rows into groups.

PARTITION BY keeps all rows and performs calculations inside logical groups.

---

## Q2

Can PARTITION BY be used without ORDER BY?

Yes,

when using aggregate window functions such as

```sql
SUM()

AVG()

COUNT()

MIN()

MAX()
```

Example

```sql
AVG(Salary)
OVER(
PARTITION BY Department
)
```

---

## Q3

Which functions require ORDER BY?

- ROW_NUMBER()
- RANK()
- DENSE_RANK()
- NTILE()

---

## Q4

Can PARTITION BY have multiple columns?

Yes.

Example

```sql
PARTITION BY Department, JobTitle
```

---

## Q5

Does PARTITION BY change table data?

No.

It only affects the query result.

---

# Best Practices

✔ Use PARTITION BY whenever calculations should restart for each category.

✔ Use meaningful ORDER BY columns.

✔ Don't confuse PARTITION BY with GROUP BY.

✔ Combine PARTITION BY with ranking functions for department-level reports.

✔ Combine PARTITION BY with aggregate window functions for advanced analytics.

---

# Summary

Imagine this table.

```
IT

Ahmed

Ali

--------------

HR

Sara

Mona

--------------

Sales

Omar

Noor
```

`PARTITION BY Department`

means

```
Treat every department as its own mini table.

↓

Perform the calculation.

↓

Combine all rows again.
```

Every row stays in the final result.

---

# Window Functions Cheat Sheet

| Function | Purpose |
|-----------|---------|
|ROW_NUMBER()|Unique numbering|
|RANK()|Ranking with gaps|
|DENSE_RANK()|Ranking without gaps|
|NTILE()|Split rows into groups|
|SUM() OVER()|Running or grouped totals|
|AVG() OVER()|Average without removing rows|
|COUNT() OVER()|Count rows while keeping all rows|
|MIN() OVER()|Minimum value per partition|
|MAX() OVER()|Maximum value per partition|

---

# Complete Comparison

| Feature | GROUP BY | PARTITION BY |
|----------|----------|--------------|
|Keeps all rows|❌|✔|
|Returns one row per group|✔|❌|
|Works with window functions|❌|✔|
|Works with aggregate functions|✔|✔ (using `OVER()`)|
|Can calculate rankings|❌|✔|
|Can calculate running totals|❌|✔|
|Used for summaries|✔|Analytics & Reporting|

---

# Practice Exercises

### Exercise 1

Number employees within each department using `ROW_NUMBER()`.

---

### Exercise 2

Rank employees within each department using `RANK()`.

---

### Exercise 3

Divide employees into salary quartiles **within each department** using `NTILE(4)`.

---

### Exercise 4

Display the average salary for each department while keeping every employee in the result.

---

### Exercise 5

Display the highest salary in each department beside every employee.

---

### Exercise 6

Find employees whose salary is greater than their department's average salary.

---

### Exercise 7

Use two partition columns:

```sql
PARTITION BY Department, JobTitle
```

and assign row numbers by salary.

---

# Exam Notes ⭐

- `PARTITION BY` creates **logical partitions**, not physical tables.
- It **does not reduce the number of rows**.
- It is used **inside the `OVER()` clause**.
- Ranking functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`) usually require both `PARTITION BY` (optional) and `ORDER BY` (required).
- Aggregate window functions (`SUM`, `AVG`, `COUNT`, `MIN`, `MAX`) can use `PARTITION BY` with or without `ORDER BY`, depending on the calculation.
- `GROUP BY` summarizes data; `PARTITION BY` performs calculations while preserving every row.
- `PARTITION BY` is one of the most important concepts for SQL analytics, reporting, dashboards, and technical interviews.

---

# Final Window Functions Overview

| Function | Unique Numbers | Handles Ties | Leaves Gaps | Groups Rows | Keeps All Rows |
|-----------|----------------|--------------|-------------|-------------|----------------|
|ROW_NUMBER()|✔|❌|❌|❌|✔|
|RANK()|❌|✔|✔|❌|✔|
|DENSE_RANK()|❌|✔|❌|❌|✔|
|NTILE()|❌|❌|❌|✔|✔|
|PARTITION BY|N/A|N/A|N/A|Logical Partitions|✔|

---

# Final Tip ⭐

If you remember these three ideas, you'll understand most SQL window function questions:

- **`ORDER BY`** determines **the order** of processing.
- **`PARTITION BY`** determines **the group** in which processing occurs.
- **The window function** (`ROW_NUMBER`, `RANK`, `SUM`, etc.) determines **the calculation** performed on each partition.