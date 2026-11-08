---
title: "Common Table Expression CTE"
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
> **A temporary named result set in SQL Server that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement.** ويُعرَّف باستخدام كلمة `WITH`، ويساعد على تنظيم الـ Queries المعقدة، ويعيش فقط أثناء تنفيذ الـ Query.

# الفكرة الأساسية

الـ CTE هو **Result Set مؤقت** بتديله اسم، وبعد كده تستخدمه كأنه جدول.

يعني بدل ما تكتب Query طويلة جدًا، تقسمها لمراحل.

تخيل عندك كود C#:

```csharp
var activeEmployees = employees.Where(e => e.IsActive);

var result = activeEmployees.Where(e => e.Salary > 10000);
```

أنت هنا خزنت نتيجة أول فلترة في متغير.

الـ CTE بيعمل نفس الفكرة في SQL.

---

# ليه SQL اخترع الـ CTE؟

تخيل عندك Query بالشكل ده:

```sql
SELECT *
FROM
(
    SELECT *
    FROM Employees
    WHERE Salary > 10000
) T
WHERE DepartmentID = 3;
```

ده اسمه **Derived Table**.

لكن لما الدنيا تكبر هيبقى شكله مرعب.

فبدل ما تعمل كده، SQL قالك:

"خد النتيجة دي، وسميها."

---

# أول Syntax

```sql
WITH EmployeeCTE AS
(
    SELECT *
    FROM Employees
)
SELECT *
FROM EmployeeCTE;
```

الجزء ده:

```sql
WITH EmployeeCTE AS
(
    SELECT *
    FROM Employees
)
```

مش بينفذ حاجة لوحده.

هو مجرد بيقول:

> "أنا عندي Query اسمها EmployeeCTE."

وبعدين:

```sql
SELECT *
FROM EmployeeCTE;
```

كأنها Table.

---

# مثال عملي

عندك جدول Employees

|ID|Name|Salary|
|---|---|---|
|1|Ali|8000|
|2|Ahmed|12000|
|3|Sara|15000|

عايز الموظفين اللي مرتبهم أكبر من 10000.

بدل:

```sql
SELECT *
FROM
(
    SELECT *
    FROM Employees
    WHERE Salary > 10000
) T;
```

تكتب:

```sql
WITH HighSalary AS
(
    SELECT *
    FROM Employees
    WHERE Salary > 10000
)

SELECT *
FROM HighSalary;
```

النتيجة

|ID|Name|Salary|
|---|---|---|
|2|Ahmed|12000|
|3|Sara|15000|

---

# طب هو أنشأ Table؟

لا.

وده أهم نقطة.

الـ CTE **مش Table**.

مش بيتخزن في Database.

مش بيتكتب على Disk.

هو ==مجرد Result Set مؤقت أثناء تنفيذ الـ Query،== وبعد انتهاء الـ Query يختفي.

---

# الفرق بين CTE و Table

لو عملت

```sql
CREATE TABLE TempEmployees
```

يبقى ==الجدول هيفضل موجود.==

لكن

```sql
WITH TempEmployees AS (...)
```

هيختفي بمجرد انتهاء الـ Query.

---

# طب هل هو View؟

برضو لا.

الـ View:

- بيتخزن في الـ Database.
- تقدر تستخدمه بكرة وبعد شهر.


أما الـ CTE:

- مؤقت.
- ==يعيش داخل Query واحدة فقط.==

---

# طب هو شبه إيه؟

شبه جدًا متغير.

في C#

```csharp
var expensiveProducts = products.Where(...);

Console.WriteLine(expensiveProducts.Count());
```

الـ expensiveProducts مش Database.

ولا Table.

ولا List جديدة بالضرورة.

==هو مجرد Reference لنتيجة.==

الـ CTE نفس الفكرة.

---

# مثال أكبر

نفترض:

Employees

|EmpID|Name|DeptID|Salary|
|---|---|---|---|
|1|Ali|1|12000|
|2|Ahmed|2|9000|
|3|Sara|1|18000|
|4|Omar|2|25000|

عايز ==أعلى الموظفين في المرتبات== وبعدها تعرض اللي مرتبهم ==أكبر من 15000==.

بدل:

```sql
SELECT *
FROM
(
    SELECT *
    FROM Employees
    WHERE Salary > 10000
) T
WHERE Salary > 15000;
```

تكتب:

```sql
WITH HighSalaryEmployees AS
(
    SELECT *
    FROM Employees
    WHERE Salary > 10000
)
SELECT *
FROM HighSalaryEmployees
WHERE Salary > 15000;
```

بقى أوضح بكتير.

---

# استخدامه مع Aggregate

```sql
WITH DepartmentSalary AS
(
    SELECT
        DepartmentID,
        AVG(Salary) AvgSalary
    FROM Employees
    GROUP BY DepartmentID
)
SELECT *
FROM DepartmentSalary
WHERE AvgSalary > 10000;
```

بدل ما تكتب Query داخل Query.

---

# استخدامه مع JOIN

```sql
WITH ActiveCustomers AS
(
    SELECT *
    FROM Customers
    WHERE IsActive = 1
)
SELECT
    O.OrderID,
    A.Name
FROM Orders O
JOIN ActiveCustomers A
ON O.CustomerID = A.CustomerID;
```

الـ Join هنا بقى أوضح.

---

# هل أقدر أعمل أكتر من CTE؟

أيوه.

```sql
WITH
HighSalary AS
(
    SELECT *
    FROM Employees
    WHERE Salary > 10000
),

ITEmployees AS
(
    SELECT *
    FROM Employees
    WHERE DepartmentID = 1
)

SELECT *
FROM HighSalary;
```

ولو احتجت تستخدم أكتر من واحد في الـ Query النهائية تقدر تعمل كده.

---

# قواعد مهمة

### 1) يبدأ بـ WITH

```sql
WITH ...
```

---

### 2) لازم بعده Query مباشرة

يعني مينفعش

```sql
WITH Test AS (...)
```

وتقف.

لازم بعدها

```sql
SELECT
```

أو

```sql
UPDATE
```

أو

```sql
DELETE
```

أو

```sql
INSERT
```

وده من النقاط اللي ذكرتها المحاضرة.

---

### 3) عمره Query واحدة

ده صح

```sql
WITH X AS (...)
SELECT * FROM X;
```


لكن ده غلط
```sql
WITH X AS (...)
SELECT * FROM X;

SELECT * FROM X;
```

الـ ==Query التانية هتدي Error==.

---

# مميزات الـ CTE

- يجعل الـ SQL مقروءة.
- يقسم الـ Query الكبيرة إلى مراحل.
- يسهل صيانة الكود.
- مناسب جدًا مع Aggregation وJOIN.
- ضروري تقريبًا في الـ Recursive Queries.
    

---

# ليه المبرمجين بيحبوه؟

بدل ما تشوف حاجة بالشكل ده:

```sql
SELECT ...
FROM
(
    SELECT ...
    FROM
    (
        SELECT ...
        FROM
        (
            SELECT ...
```

تبقى بالشكل ده:

```sql
WITH Step1 AS (...),
Step2 AS (...),
Step3 AS (...)

SELECT ...
FROM Step3;
```

بتقرأها كأنها خطوات منطقية.

---
# ملخص يحفظ الفكرة

| السؤال       | الإجابة                          |
| ------------ | -------------------------------- |
| هل هو Table؟ | لا                               |
| هل هو View؟  | لا                               |
| هل بيتخزن؟   | لا                               |
| هل هو مؤقت؟  | نعم                              |
| يبدأ بـ      | `WITH`                           |
| يعيش قد إيه؟ | Query واحدة فقط                  |
| أهم استخدام  | تنظيم وقراءة الـ Queries المعقدة |

---