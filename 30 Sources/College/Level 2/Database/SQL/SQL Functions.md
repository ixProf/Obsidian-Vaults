---
title: "SQL Functions"
aliases: []
type: source
status: active
domain: database-systems
tags: [source, database-systems, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


## 🔹 الـ Functions (الوظايف)

### الوظايف اللي بيعملها المستخدم (User-Defined Functions)

- **Scalar Function**: بترجع قيمة واحدة بس.
- **Inline Table-Valued Function**: بترجع جدول عادي بدون ما تحدد هيكل معين.
- **Multi-Statement Table-Valued Function**: بترجع جدول، بس بتقدر تنفذ فيه أكتر من أمر.

### الوظايف الجاهزة في SQL (Built-in Functions)

- **وظايف التجميع (Aggregate Functions)** 🧮
- **وظايف الترتيب (Ranking Functions)** 📊
- **وظايف التعامل مع الـ NULL (Null Functions)** ❌
- **وظايف النصوص (String Functions)** 🔤
- **وظايف التاريخ والوقت (DateTime Functions)** ⏳
- **وظايف تحويل البيانات (Casting Functions)** 🔄
- **وظايف الرياضيات (Math Functions)** ➗
- **وظايف النظام (System Functions)** 🖥️

---

## 🔹 وظايف التجميع (Aggregate Functions) 🧮

📌 بتعمل عمليات حسابية على أكتر من صف في الجدول وترجع قيمة واحدة بس. دايماً بتستخدم مع `GROUP BY`.

**أمثلة:**

```sql
SELECT COUNT(*) FROM Employee; -- عدد كل الصفوف حتى اللي فيها NULL
SELECT COUNT(Salary) FROM Employee; -- عدد الصفوف اللي فيها مرتب بس
SELECT SUM(Salary) FROM Employee; -- مجموع المرتبات
SELECT AVG(Salary) FROM Employee; -- متوسط المرتبات
SELECT MAX(Salary) FROM Employee; -- أعلى مرتب
SELECT MIN(Salary) FROM Employee; -- أقل مرتب
```

### 📌 `GROUP BY` مع الوظايف التجميعية

- مينفعش تعمل `GROUP BY` مع `*` أو المفتاح الأساسي (PK).
- لازم تعمل التجميع على عمود ==فيه قيم مكررة.==

**مثال:**

```sql
SELECT Did, MIN(Salary) AS [Min Salary], MAX(Salary) AS [Max Salary]
FROM Employee
GROUP BY Did;
```

💡 **النتيجة:**

|Did|أقل مرتب|أعلى مرتب|
|---|---|---|
|10|2500|8000|
|20|4000|9000|
|30|3500|10000|

---

## 🔹 وظايف التعامل مع القيم الفاضية (Null Functions) ❌

بتساعدك تعوض القيم اللي مش موجودة (NULL) بقيم تانية.

**1️⃣ ISNULL**: بترجع القيمة الأولى لو مش NULL، ولو فاضية بترجع القيمة اللي انت محددها.

```sql
SELECT ISNULL(ST_Lname, 'Not Found') FROM Student;
```

**2️⃣ COALESCE**: بتجيب أول قيمة مش NULL من القيم اللي انت محددها.

```sql
SELECT COALESCE(St_Lname, St_Address, 'Not Found') FROM Student;
```

---

## 🔹 وظايف تحويل البيانات (Casting Functions) 🔄

📌 بتستخدم عشان تحول البيانات من نوع لنوع تاني.

**1️⃣ CONVERT**:

```sql
SELECT St_fname + ' ' + CONVERT(VARCHAR(2), St_Age) FROM Student;
```

**2️⃣ CONCAT**:

```sql
SELECT CONCAT(St_Fname, ' ', St_Age) FROM Student;
```

**3️⃣ CAST**:

```sql
SELECT CAST(GETDATE() AS VARCHAR(50));
```

📌 **تنسيق التاريخ عند تحويله لنص باستخدام `FORMAT`**

| التنسيق | النتيجة   |
| ------- | --------- |
| `d`     | 25        |
| `dd`    | 25        |
| `ddd`   | Wed       |
| `dddd`  | Wednesday |
| `M`     | 1         |
| `MM`    | 01        |
| `MMM`   | Jan       |
| `MMMM`  | January   |
| `yy`    | 23        |
| `yyyy`  | 2023      |

---

## 🔹 وظايف التاريخ والوقت (DateTime Functions) ⏳

📌 بتساعدك تشتغل على التواريخ والأوقات بسهولة.

**1️⃣ GETDATE()** - بيرجع التاريخ والوقت الحالي

```sql
SELECT GETDATE(); -- 2025-03-12 14:30:45.123
```

**2️⃣ DAY(date)** - بيرجع رقم اليوم من تاريخ معين

```sql
SELECT DAY('2025-03-12'); -- 12
```

**3️⃣ MONTH(date)** - بيرجع رقم الشهر

```sql
SELECT MONTH('2025-03-12'); -- 3
```

**4️⃣ YEAR(date)** - بيرجع رقم السنة

```sql
SELECT YEAR('2025-03-12'); -- 2025
```

**5️⃣ EOMONTH(date)** - بيرجع آخر يوم في الشهر

```sql
SELECT EOMONTH('2025-03-12'); -- 2025-03-31
```

**6️⃣ DATEADD(unit, value, date)** - بيضيف قيمة للوقت

```sql
SELECT DATEADD(DAY, 10, '2025-03-12'); -- 2025-03-22
```

**7️⃣ DATEDIFF(unit, start_date, end_date)** - بيحسب الفرق بين تاريخين

```sql
SELECT DATEDIFF(DAY, '2025-03-01', '2025-03-12'); -- 11
```

**8️⃣ FORMAT(date, format_pattern)** - بيحول التاريخ لشكل معين

```sql
SELECT FORMAT(GETDATE(), 'yyyy-MM-dd'); -- 2025-03-12
SELECT FORMAT(GETDATE(), 'dddd, MMMM dd yyyy'); -- Wednesday, March 12 2025
```

---

## 🔹 وظايف النصوص (String Functions) 🔤

📌 بتساعدك تعدل النصوص أو تستخرج منها بيانات.

**1️⃣ LOWER(text)** - يحول النص لحروف صغيرة

```sql
SELECT LOWER('HELLO WORLD'); -- hello world
```

**2️⃣ UPPER(text)** - يحول النص لحروف كبيرة

```sql
SELECT UPPER('hello world'); -- HELLO WORLD
```

**3️⃣ SUBSTRING(text, start, length)** - بيقص جزء من النص

```sql
SELECT SUBSTRING('Database Systems',1, 8); -- Database
```

**4️⃣ LEN(text)** - بيحسب عدد الحروف

```sql
SELECT LEN('SQL Functions'); -- 13
```

**5️⃣ CHARINDEX(search, text)** - بيشوف مكان كلمة جوه نص

```sql
SELECT CHARINDEX('base', 'Database'); -- 5
```

**6️⃣ REPLACE(text, old_value, new_value)** - بيبدل كلمة بكلمة تانية

```sql
SELECT REPLACE('Hello World', 'World', 'SQL'); -- Hello SQL
```

**7️⃣ LTRIM(text) / RTRIM(text)** - بيشيل المسافات من اليمين أو الشمال

```sql
SELECT LTRIM('   SQL'); -- 'SQL'
SELECT RTRIM('SQL   '); -- 'SQL'
```

---

## 🔹 وظايف النظام (System Functions) 🖥️

📌 وظايف بتساعدك تجيب معلومات عن قاعدة البيانات.

**1️⃣ DB_NAME()** - بيرجع اسم قاعدة البيانات

```sql
SELECT DB_NAME();
```

**2️⃣ SUSER_NAME()** - بيرجع اسم المستخدم الحالي

```sql
SELECT SUSER_NAME();
```

---