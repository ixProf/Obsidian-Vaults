
سأشرح **OFFSET** و **FETCH** من البداية وبشكل مفصل جدًا مع أمثلة عملية.

# ما المشكلة التي يحلها OFFSET و FETCH؟

تخيل أن لديك جدول موظفين يحتوي على 100,000 سجل.

إذا كتبت:

```sql
SELECT *
FROM Employees;
```

سيتم إرجاع جميع السجلات.

هذا يسبب مشاكل مثل:

- بطء في الاستعلام.
    
- استهلاك ذاكرة أكبر.
    
- صعوبة عرض البيانات للمستخدم.
    
- غالبًا لا تريد عرض 100,000 سجل دفعة واحدة.
    

لهذا نستخدم **Pagination** (تقسيم النتائج إلى صفحات).

مثال:

- الصفحة الأولى = أول 10 سجلات.
    
- الصفحة الثانية = السجلات من 11 إلى 20.
    
- الصفحة الثالثة = السجلات من 21 إلى 30.
    

وهنا يأتي دور OFFSET و FETCH.

---

# أولاً: OFFSET

كلمة OFFSET تعني:

> "تجاوز" أو "تخطَّ"

الصيغة:

```sql
OFFSET عدد_الصفوف ROWS
```

مثال:

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 5 ROWS;
```

المعنى:

- رتّب الموظفين حسب EmployeeID.
    
- تجاهل أول 5 صفوف.
    
- أعرض الباقي.
    

---

## مثال عملي

جدول Employees:

|EmployeeID|Name|
|---|---|
|1|Ahmed|
|2|Ali|
|3|Sara|
|4|Mona|
|5|Omar|
|6|Youssef|
|7|Mariam|
|8|Nada|

الاستعلام:

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 3 ROWS;
```

SQL سيفعل الآتي:

### الخطوة 1

يرتب النتائج:

```text
1 Ahmed
2 Ali
3 Sara
4 Mona
5 Omar
6 Youssef
7 Mariam
8 Nada
```

### الخطوة 2

يتجاوز أول 3 صفوف:

```text
1 Ahmed ❌
2 Ali ❌
3 Sara ❌
```

### الخطوة 3

يعرض الباقي:

```text
4 Mona
5 Omar
6 Youssef
7 Mariam
8 Nada
```

---

# هل يمكن استخدام OFFSET وحده؟

نعم.

مثال:

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 10 ROWS;
```

المعنى:

- تجاهل أول 10 صفوف.
    
- أعرض كل ما بعد ذلك.
    

---

# ثانياً: FETCH

FETCH تعني:

> "اجلب"

الصيغة:

```sql
FETCH NEXT عدد_الصفوف ROWS ONLY
```

أو

```sql
FETCH FIRST عدد_الصفوف ROWS ONLY
```

وظيفتها:

تحديد عدد الصفوف التي تريد إرجاعها.

---

## مثال

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 0 ROWS
FETCH NEXT 5 ROWS ONLY;
```

المعنى:

- لا تتجاوز أي صف.
    
- أعرض أول 5 صفوف فقط.
    

النتيجة:

```text
1
2
3
4
5
```

---

# العلاقة بين OFFSET و FETCH

يمكنك التفكير فيهما كالتالي:

```text
OFFSET = من أين أبدأ؟
FETCH  = كم سجل أريد؟
```

مثال:

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 10 ROWS
FETCH NEXT 5 ROWS ONLY;
```

المعنى:

```text
تخطَّ أول 10 سجلات
ثم اجلب 5 سجلات فقط
```

---

# شرح خطوة بخطوة

لنفترض أن لدينا:

|ID|
|---|
|1|
|2|
|3|
|4|
|5|
|6|
|7|
|8|
|9|
|10|
|11|
|12|
|13|
|14|
|15|

الاستعلام:

```sql
SELECT *
FROM Employees
ORDER BY ID
OFFSET 5 ROWS
FETCH NEXT 4 ROWS ONLY;
```

---

## المرحلة الأولى

البيانات مرتبة:

```text
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
```

---

## المرحلة الثانية

OFFSET 5

يتم حذف أول 5 صفوف:

```text
1 ❌
2 ❌
3 ❌
4 ❌
5 ❌
```

المتبقي:

```text
6
7
8
9
10
11
12
13
14
15
```

---

## المرحلة الثالثة

FETCH NEXT 4

إرجاع أول 4 صفوف من المتبقي:

```text
6
7
8
9
```

---

# Pagination عملي

لنفترض:

```text
عدد السجلات في الصفحة = 10
```

---

## الصفحة الأولى

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 0 ROWS
FETCH NEXT 10 ROWS ONLY;
```

يعرض:

```text
1 → 10
```

---

## الصفحة الثانية

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 10 ROWS
FETCH NEXT 10 ROWS ONLY;
```

يعرض:

```text
11 → 20
```

---

## الصفحة الثالثة

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;
```

يعرض:

```text
21 → 30
```

---

# معادلة Pagination

إذا كان لدينا:

```text
PageNumber = رقم الصفحة
PageSize = عدد السجلات في الصفحة
```

فإن:

```sql
OFFSET = (PageNumber - 1) * PageSize
```

---

## مثال

الصفحة الرابعة

```text
PageNumber = 4
PageSize = 10
```

الحساب:

```text
OFFSET = (4 - 1) × 10

OFFSET = 30
```

الاستعلام:

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 30 ROWS
FETCH NEXT 10 ROWS ONLY;
```

يعرض:

```text
31 → 40
```

---

# لماذا ORDER BY إجباري؟

انظر لهذا الاستعلام:

```sql
SELECT *
FROM Employees
OFFSET 10 ROWS
FETCH NEXT 5 ROWS ONLY;
```

سيعطي خطأ في SQL Server.

السبب:

بدون ترتيب لا تعرف قاعدة البيانات ما هي "أول 10 صفوف" أصلًا.

لذلك يجب:

```sql
ORDER BY EmployeeID
```

أو أي عمود آخر.

---

# الفرق بين TOP و FETCH

## TOP

```sql
SELECT TOP 5 *
FROM Employees;
```

يعرض:

```text
أول 5 سجلات فقط
```

---

## FETCH

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 10 ROWS
FETCH NEXT 5 ROWS ONLY;
```

يعرض:

```text
السجلات 11 → 15
```

لذلك FETCH أقوى عند بناء الصفحات (Pagination).

---

# ماذا يحدث داخليًا؟

عندما تكتب:

```sql
OFFSET 1000 ROWS
FETCH NEXT 20 ROWS ONLY
```

يقوم محرك قاعدة البيانات تقريبًا بالآتي:

```text
1. يرتب البيانات.
2. يمر على أول 1000 سجل.
3. يتجاهلها.
4. يعيد 20 سجلًا بعدها.
```

لهذا إذا كان OFFSET كبيرًا جدًا (مثل مليون سجل)، قد يتأثر الأداء، وتُستخدم أحيانًا تقنيات أخرى مثل **Keyset Pagination** لتحسين السرعة.

---

# ملخص سريع

```text
OFFSET
↓
عدد الصفوف التي سيتم تخطيها

FETCH
↓
عدد الصفوف التي سيتم إرجاعها

ORDER BY
↓
إجباري مع OFFSET/FETCH
```

مثال نهائي:

```sql
SELECT *
FROM Employees
ORDER BY EmployeeID
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;
```

المعنى:

```text
تخطَّ أول 20 سجلًا
ثم اعرض 10 سجلات فقط
```

النتيجة:

```text
21
22
23
24
25
26
27
28
29
30
```