---
title: "NTILE"
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
# Introduction

So far, we've learned several window functions:

- `ROW_NUMBER()`
- `RANK()`
- `DENSE_RANK()`

These functions assign a number or rank to each row.

But sometimes we don't want rankings.

Instead, we want to **divide the rows into groups**.

For example:

- Divide students into 4 grade groups.
- Divide employees into salary quartiles.
- Divide customers into 10 marketing segments.
- Divide products into High / Medium / Low performance groups.

This is exactly what `NTILE()` does.

---

# What is NTILE()?

`NTILE()` is a **window function** that divides the ordered result set into a specified number of groups (called **tiles** or **buckets**).

Each row is assigned a group number.

Unlike `RANK()`, the numbers do **not** represent ranking.

Instead, they represent **which group** each row belongs to.

---

# Why do we use NTILE()?

Suppose a company has 100 employees.

Management wants to classify them into:

- Top 25%
- Second 25%
- Third 25%
- Bottom 25%

Instead of calculating percentages manually,

SQL can do it automatically using:

```sql
NTILE(4)
```

---

# Syntax

```sql
NTILE(number_of_groups)
OVER (
    ORDER BY column
)
```

Example

```sql
NTILE(4)
OVER(
ORDER BY Salary DESC
)
```

Meaning

1. Sort employees by salary.
2. Divide them into 4 equal groups.
3. Assign each employee a group number.

---

# Understanding NTILE()

Imagine 12 students.

```
Student 1

Student 2

Student 3

...

Student 12
```

We write

```sql
NTILE(4)
```

SQL divides them into four groups.

Result

```
Group 1

1

2

3

------------

Group 2

4

5

6

------------

Group 3

7

8

9

------------

Group 4

10

11

12
```

Each group contains three students.

---

# Example Table

Employees

| Name | Salary |
|------|-------:|
|Ahmed|9000|
|Sara|8500|
|Ali|8000|
|Mona|7500|
|Omar|7000|
|Noor|6500|
|Youssef|6000|
|Laila|5500|

---

# Example 1

Divide employees into four salary groups.

```sql
SELECT
Name,
Salary,
NTILE(4)
OVER(
ORDER BY Salary DESC
) AS SalaryGroup
FROM Employees;
```

Output

| Name | Salary | Group |
|------|-------:|------:|
|Ahmed|9000|1|
|Sara|8500|1|
|Ali|8000|2|
|Mona|7500|2|
|Omar|7000|3|
|Noor|6500|3|
|Youssef|6000|4|
|Laila|5500|4|

Notice

Every group contains two employees.

---

# Visual Representation

```
Highest Salary

↓

Ahmed

Sara

↓

Group 1

------------

Ali

Mona

↓

Group 2

------------

Omar

Noor

↓

Group 3

------------

Youssef

Laila

↓

Group 4

Lowest Salary
```

---

# Example 2

Students

| Student | Score |
|----------|------:|
|Ahmed|99|
|Sara|95|
|Ali|92|
|Mona|88|
|Omar|80|
|Noor|75|
|Youssef|70|
|Laila|65|

```sql
SELECT
Student,
Score,
NTILE(2)
OVER(
ORDER BY Score DESC
) AS GradeGroup
FROM Students;
```

Output

| Student | Score | Group |
|----------|------:|------:|
|Ahmed|99|1|
|Sara|95|1|
|Ali|92|1|
|Mona|88|1|
|Omar|80|2|
|Noor|75|2|
|Youssef|70|2|
|Laila|65|2|

Meaning

```
Group 1

Top 50%

--------------

Group 2

Bottom 50%
```

---

# Uneven Division

What if the rows cannot be divided equally?

Example

10 employees

```
NTILE(4)
```

SQL cannot put exactly

```
10 ÷ 4 = 2.5
```

employees in each group.

Instead,

SQL distributes the extra rows to the **earlier groups**.

Result

```
Group 1

3 Employees

------------

Group 2

3 Employees

------------

Group 3

2 Employees

------------

Group 4

2 Employees
```

Notice

The first groups receive the extra rows.

---

# Example

Employees

```
10 Rows

NTILE(3)
```

Distribution

```
Group 1

4 Rows

------------

Group 2

3 Rows

------------

Group 3

3 Rows
```

SQL always tries to keep the groups as balanced as possible.

---

# Using PARTITION BY

Suppose each department should have its own salary groups.

```sql
SELECT
Name,
Department,
Salary,

NTILE(4)
OVER(
PARTITION BY Department
ORDER BY Salary DESC
) AS SalaryQuartile

FROM Employees;
```

What happens?

Instead of dividing **all employees**,

SQL divides **each department separately**.

Example

IT Department

```
Group 1

Group 2

Group 3

Group 4
```

HR Department

```
Group 1

Group 2

Group 3

Group 4
```

The numbering restarts for every department.

---

# Real-Life Applications

## Customer Segmentation

Marketing teams often divide customers into:

```
Top 10%

Next 20%

Middle 40%

Bottom 30%
```

NTILE makes this easy.

---

## Salary Analysis

HR can divide salaries into:

- Highest salaries
- Above average
- Average
- Lowest salaries

---

## School Grades

Teachers may classify students into:

- Excellent
- Very Good
- Good
- Needs Improvement

using `NTILE(4)`.

---

## Sales Performance

Products can be grouped into:

```
Best Sellers

Good Sellers

Average Sellers

Poor Sellers
```

---

# Difference Between NTILE and RANK

Suppose

```
Salary

9000

8500

8000

7500

7000

6500

6000

5500
```

### RANK()

```
1

2

3

4

5

6

7

8
```

Each employee receives a rank.

---

### NTILE(4)

```
Group 1

Group 1

------------

Group 2

Group 2

------------

Group 3

Group 3

------------

Group 4

Group 4
```

Each employee belongs to a group.

---

# Difference Between NTILE and ROW_NUMBER

| ROW_NUMBER | NTILE |
|------------|--------|
|Numbers every row|Groups rows|
|Every row gets a unique number|Rows share the same group|
|Used for numbering|Used for classification|

---

# Common Mistakes

## Forgetting ORDER BY

Wrong

```sql
NTILE(4)
OVER()
```

ORDER BY is required.

---

## Assuming Groups Always Have Equal Size

Not always.

When the total number of rows cannot be divided evenly,

the earlier groups receive the extra rows.

---

## Confusing Group Number with Rank

Group

```
1
```

does **not** mean

```
First place.
```

It simply means

```
First bucket.
```

---

# Performance Notes

Like other window functions,

`NTILE()` must sort the data before dividing it into groups.

Performance improves significantly when the ORDER BY column is indexed.

---

# Interview Questions

## Q1

What does NTILE() do?

Answer

It divides the ordered rows into a specified number of groups.

---

## Q2

Does NTILE assign rankings?

No.

It assigns **group numbers**, not rankings.

---

## Q3

Can groups have different sizes?

Yes.

If the rows cannot be divided evenly,

the first groups receive one extra row.

---

## Q4

Does NTILE require ORDER BY?

Yes.

---

## Q5

Can NTILE be used with PARTITION BY?

Yes.

Each partition is divided independently.

---

# Best Practices

✔ Use NTILE for quartiles, deciles, and percent-based analysis.

✔ Always choose a meaningful ORDER BY column.

✔ Use PARTITION BY when each category should have its own groups.

✔ Remember that group numbers are **not rankings**.

✔ Ensure the ORDER BY column is indexed for large datasets.

---

# Summary

`NTILE()` divides rows into groups.

Example

```
NTILE(4)
```

means

```
Group 1

Group 2

Group 3

Group 4
```

The rows are distributed as evenly as possible.

---

# Comparison of Window Functions

| Function | Purpose |
|-----------|---------|
|ROW_NUMBER()|Unique numbering|
|RANK()|Ranking with gaps|
|DENSE_RANK()|Ranking without gaps|
|NTILE()|Divide rows into groups|

---

# Practice Exercises

### Exercise 1

Divide employees into four salary groups.

---

### Exercise 2

Divide students into three score groups.

---

### Exercise 3

Divide customers into five purchasing groups based on total spending.

---

### Exercise 4

Use `PARTITION BY Department` with `NTILE(4)` to divide employees into salary quartiles within each department.

---

### Exercise 5

Compare the output of:

- `ROW_NUMBER()`
- `RANK()`
- `DENSE_RANK()`
- `NTILE(4)`

using the same Employees table.

---

# Exam Notes ⭐

- `NTILE()` is a **window function**.
- It **divides rows into N groups**, not ranks.
- `ORDER BY` inside `OVER()` is **required**.
- If rows cannot be divided equally, **earlier groups receive the extra rows**.
- `PARTITION BY` divides each partition independently.
- `NTILE(4)` is commonly used to create **quartiles**.
- `NTILE(10)` is commonly used to create **deciles**.
- `NTILE(100)` can be used for **percentile-style grouping**.
- Group numbers start at **1**.