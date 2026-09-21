
# A1

```SQL
SELECT TOP 15
    DisplayName,
    Reputation,
    Location
FROM Users
ORDER BY Reputation DESC;
```
![[Pasted image 20260628134653.png]]

---
# A2

```sql
SELECT TOP 10 WITH TIES
    Title,
    Score,
    ViewCount
FROM Posts
ORDER BY Score DESC;
```
![[Pasted image 20260628134936.png]]

---
# A3
```SQL
SELECT
    DisplayName,
    Reputation
FROM Users
ORDER BY Reputation DESC
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;
```
![[Pasted image 20260628140421.png]]

---
# A4

```sql
SELECT
    ROW_NUMBER() OVER (ORDER BY Score DESC) AS RowNum,
    Title,
    Score
FROM Posts
WHERE Title IS NOT NULL
ORDER BY Score DESC;
```
![[Pasted image 20260628140643.png]]

---
# A5
```SQL
SELECT
    RANK() OVER (ORDER BY Reputation DESC) AS RepRank,
    DisplayName,
    Reputation
FROM Users
ORDER BY RepRank;
```

> Note : **Ties with RANK():** هنا لو اتنين ليهم نفس القيمة هياخدوا نفس الترتيب والي بعده هياخد الرقم الي بعده يعني لو اتنين جايبين 500 ف الاتنين هيبقوا مثلا 1 فالي بعدهم هيبقى 3 مش 2

---

# A6

```sql
SELECT
    DENSE_RANK() OVER (ORDER BY Score DESC) AS DenseRank,
    Title,
    Score
FROM Posts
ORDER BY DenseRank;
```

>  الفرق بين **DENSE_RANK vs RANK:** DENSE_RANK مش بتعمل سكيب للترتيب الي بعده ال tie يعني فوق قولنا الي بعد الاتنين الاوائل هيبقى ترتيبه ال 3 لا هيبقى 2 عادي

---
# A7

```SQL
SELECT
    NTILE(5) OVER (ORDER BY Reputation DESC) AS Quintile,
    DisplayName,
    Reputation
FROM Users
ORDER BY Quintile, Reputation DESC;
```

> الـNTILE(5) : هي عبارة انها بتعمل توزيع للصفوف بشكل متساوي قدر الامكان على الرقم n عندنا هو 5 ولو العدد الاجمالي ميقبلش القسمة على 5 المجموعة الاولى هتاخد صف إضافي


---

# A8

```SQL
SELECT
    PostTypeId,
    ROW_NUMBER() OVER (
        PARTITION BY PostTypeId
        ORDER BY Score DESC
    ) AS RankWithinType,
    Title,
    Score
FROM Posts
WHERE Title IS NOT NULL
ORDER BY PostTypeId, RankWithinType;
```

> ميزة **`PARTITION BY`** بتقسم البيانات لمجموعات حسب قيمة **`PostTypeId`**. وبعد ما البيانات تتقسم، دالة **`ROW_NUMBER()`** بتبدأ العد من **1** لكل مجموعة لوحدها.
> يعني بدل ما الترقيم يبقى مستمر على كل البيانات، كل مجموعة ليها ترقيم مستقل.