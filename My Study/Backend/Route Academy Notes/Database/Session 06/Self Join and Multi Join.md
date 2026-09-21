
# Part 1 — Self Join
## What is a Self Join?

A **Self Join** is a join where a table is joined with **itself**.

Although it sounds strange at first, SQL treats each copy of the table as if it were a completely different table by using **aliases**.

In other words:

> We use the same table twice in one query.

---

## Why do we need Self Join?

Sometimes a table stores relationships between rows inside itself.

Examples:

- Employees and their Managers
- Categories and Parent Categories
- Students and their Mentors
- Friends
- Family Trees
- Product Recommendations

Instead of having two different tables, one table references itself.

---

## Example Table

## Employees

| EmployeeID | EmployeeName | ManagerID |
|------------|--------------|-----------|
| 1 | Ahmed | NULL |
| 2 | Mohamed | 1 |
| 3 | Ali | 1 |
| 4 | Sara | 2 |
| 5 | Mona | 2 |

Notice:

Ahmed is the manager.

Mohamed's manager is Ahmed.

Sara's manager is Mohamed.

The ManagerID points to another EmployeeID inside the same table.

---

## Without Self Join

If we write

```sql
SELECT *
FROM Employees;
```

Result:

|Employee|ManagerID|
|---------|----------|
|Ahmed|NULL|
|Mohamed|1|
|Ali|1|
|Sara|2|

We only know the ManagerID.

We don't know the manager's name.

---

## Solution: Self Join

```sql
SELECT
    E.EmployeeName,
    M.EmployeeName AS Manager
FROM Employees E
LEFT JOIN Employees M
ON E.ManagerID = M.EmployeeID;
```

---

## Explanation

We created two copies of Employees.

```
Employees
    ↓
Employees E
Employees M
```

E = Employee

M = Manager

SQL thinks they are two different tables.

---

## Step-by-Step

First copy

```
Employees E
```

Contains

Ahmed

Mohamed

Ali

Sara

---

Second copy

```
Employees M
```

Contains exactly the same rows.

Now SQL compares

```
E.ManagerID

=

M.EmployeeID
```

Example

Employee

```
Sara
```

ManagerID

```
2
```

Find EmployeeID = 2

↓

Mohamed

Result

```
Sara -> Mohamed
```

---

## Output

|Employee|Manager|
|---------|--------|
|Ahmed|NULL|
|Mohamed|Ahmed|
|Ali|Ahmed|
|Sara|Mohamed|
|Mona|Mohamed|

---

## Visual Representation

```
Employees

Ahmed
 ↑
 │
Mohamed
 ↑
 │
Sara
```

Self Join allows SQL to retrieve the manager's name.

---

## Alias

Aliases are required.

Wrong

```sql
SELECT *
FROM Employees
JOIN Employees
ON ...
```

SQL won't know which table you're referring to.

Correct

```sql
Employees E
Employees M
```

---

## INNER SELF JOIN

```sql
SELECT
E.EmployeeName,
M.EmployeeName
FROM Employees E
INNER JOIN Employees M
ON E.ManagerID=M.EmployeeID;
```

Removes employees without managers.

Ahmed disappears because ManagerID is NULL.

---

## LEFT SELF JOIN

```sql
SELECT
E.EmployeeName,
M.EmployeeName
FROM Employees E
LEFT JOIN Employees M
ON E.ManagerID=M.EmployeeID;
```

Keeps everyone.

Employees without managers show NULL.

---

## Example 2 — Categories

Categories

|ID|Category|ParentID|
|--|---------|---------|
|1|Electronics|NULL|
|2|Phones|1|
|3|Laptops|1|
|4|Android|2|

Query

```sql
SELECT
C.Category,
P.Category AS ParentCategory
FROM Categories C
LEFT JOIN Categories P
ON C.ParentID=P.ID;
```

Output

|Category|Parent|
|----------|-------|
|Phones|Electronics|
|Android|Phones|

---

## Example 3 — Students & Mentors

Students

|ID|Name|MentorID|
|--|----|---------|
|1|Ali|NULL|
|2|Sara|1|
|3|Mona|2|

Query

```sql
SELECT
S.Name,
M.Name AS Mentor
FROM Students S
LEFT JOIN Students M
ON S.MentorID=M.ID;
```

---


# Part 2 — Multi-table Join

---

## What is a Multi-table Join?

A Multi-table Join means joining **three or more tables** in the same query.

Instead of combining only two tables, SQL combines multiple related tables into one result.

---

## Why do we use Multi-table Joins?

Real-world databases are normalized.

Instead of storing everything in one table, data is divided into multiple tables.

Example:

Customer

↓

Order

↓

Order Details

↓

Products

To get the complete information, we join all tables.

---

## Example Database

### Customers

|CustomerID|Name|
|-----------|----|
|1|Ahmed|
|2|Sara|

---

### Orders

|OrderID|CustomerID|
|---------|-----------|
|101|1|
|102|2|

---

### OrderDetails

|OrderID|ProductID|Quantity|
|---------|----------|--------|
|101|1|2|
|101|2|1|
|102|3|4|

---

### Products

|ProductID|ProductName|Price|
|----------|------------|------|
|1|Laptop|1200|
|2|Mouse|20|
|3|Keyboard|40|

---

### Relationship

```
Customers

↓

Orders

↓

OrderDetails

↓

Products
```

---

### Query

```sql
SELECT
C.Name,
O.OrderID,
P.ProductName,
OD.Quantity,
P.Price
FROM Customers C
JOIN Orders O
ON C.CustomerID=O.CustomerID
JOIN OrderDetails OD
ON O.OrderID=OD.OrderID
JOIN Products P
ON OD.ProductID=P.ProductID;
```

---

#### Explanation

Step 1

Customers

↓

Orders

Now every order has the customer's name.

---

Step 2

Orders

↓

OrderDetails

Now every order contains products.

---

Step 3

OrderDetails

↓

Products

Now ProductID becomes ProductName.

---

### Output

|Customer|Order|Product|Qty|Price|
|----------|------|--------|---|------|
|Ahmed|101|Laptop|2|1200|
|Ahmed|101|Mouse|1|20|
|Sara|102|Keyboard|4|40|

---

## SQL Execution Order

Even if we write

```sql
SELECT

FROM

JOIN

WHERE

ORDER BY
```

SQL processes roughly as:

```
FROM

↓

JOIN

↓

ON

↓

WHERE

↓

GROUP BY

↓

HAVING

↓

SELECT

↓

ORDER BY
```

Understanding this order helps explain why aliases and filtering behave the way they do.

## Performance Tips

- Index foreign keys.
- Select only needed columns.
- Avoid `SELECT *` in production.
- Apply filters early with `WHERE`.
- Join only the tables you actually need.

---

