
#  يعني إيه Set Operations بجد؟

في SQL عندك طريقتين للتفكير:

### 1) Row-based

بتتعامل مع جدول صف صف.

### 2) Set-based 

بتتعامل مع **نتائج Query كأنها Set**

يعني:

- كل SELECT = Set مستقل
    
- Set Operations = عمليات على المجموعات دي
    

---

# الشكل العام

أي Set Operation بيبقى كده:

```sql
SELECT ...
FROM ...
WHERE ...

SET_OPERATOR

SELECT ...
FROM ...
WHERE ...
```

---

# أهم شرط (مهم جدًا جدًا)

قبل أي Set Operation:

## لازم:

1. نفس عدد الأعمدة                                                                                                                                            
2. نفس ترتيب الأعمدة
3. Data types متوافق
    

### مثال صحيح:

```sql
SELECT Id, Name
SELECT Id, Name
```

### مثال غلط:

```sql
SELECT Id, Name
SELECT Name
```
ده هيكسر

---

# UNION — دمج بدون تكرار

SQL هنا بيعمل:

1. ينفذ أول Query
    
2. ينفذ التاني
    
3. يجمع النتائج
    
4. يعمل DISTINCT على الكل
    

---

## مثال عملي:

```sql
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers;
```

## النتيجة:

كل المدن الموجودة في الاتنين بدون تكرار.


SQL بيعمل:

- Sorting
    
- Hashing / Distinct check
    

عشان يشيل التكرار

==عشان كده UNION أبطأ==

---

# UNION ALL — دمج بدون أي معالجة

## الفكرة:

“هات كل حاجة زي ما هي وخلاص”

```sql
SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers;
```

## الفرق الجوهري:

|UNION|UNION ALL|
|---|---|
|يشيل التكرار|يحتفظ بالتكرار|
|أبطأ|أسرع|
|فيه processing|raw merge|

---

## مثال واقعي:

لو عندك:  
Customers:

- Cairo
- Alex

Suppliers:

- Cairo
- Giza

### UNION ALL:

- Cairo
    
- Alex
    
- Cairo
    
- Giza
    

### UNION:

- Cairo
    
- Alex
    
- Giza
    

---

# INTERSECT — تقاطع المجموعات

## الفكرة:

“هات اللي موجود في الاتنين”

```sql
SELECT CustomerName FROM Orders
INTERSECT
SELECT CustomerName FROM Payments;
```

## المعنى الحقيقي:

الناس اللي:

- عملت أوردر
- ودفعته فعلًا
    

---

## SQL بيعمل إيه؟

- يبني ==Hash table== للنتيجة الأولى
- ويقارن التانية عليها
    

---

## مهم:

INTERSECT = ==AND logic== على مستوى النتائج

---

# EXCEPT — الفرق (Set Difference)

## الفكرة:

“هات ==اللي في الأول== ومش في التاني”

```sql
SELECT CustomerName FROM Customers
EXCEPT
SELECT CustomerName FROM BlockedCustomers;
```

## المعنى:

كل العملاء غير المحظورين

SQL:

1. يأخذ أول set
2. يحذف منه أي عنصر موجود في الثاني

Equivalent logic:

```text
A - B
```

---

# مقارنة

|Operation|Logic|معنى رياضي|
|---|---|---|
|UNION|A ∪ B|اتحاد|
|INTERSECT|A ∩ B|تقاطع|
|EXCEPT|A - B|فرق|

---


## UNION vs JOIN

| UNION                  | JOIN                      |
| ---------------------- | ------------------------- |
| بيجمع ==rows== تحت بعض | بيجمع ==columns== جنب بعض |
| لازم نفس structure     | مش لازم                   |
| Set-based              | Relational matching       |

---

## مثال:

### UNION:

```
A:
1
2

B:
3
4

=> 1 2 3 4
```

---
### JOIN:

```
A | B
1 | X
2 | Y
```

SQL بيشتغل كده:

1. Execute first SELECT
2. Execute second SELECT
3. Apply set operation
4. Apply ORDER BY (آخر حاجة فقط)
    

---

# ORDER BY في Set Operations

```sql
SELECT Name FROM A
UNION
SELECT Name FROM B
ORDER BY Name;
```

 لازم في الآخر فقط


| Operation | Performance |
| --------- | ----------- |
| UNION     | slower      |
| UNION ALL | fastest     |
| INTERSECT | medium/slow |
| EXCEPT    | medium      |
