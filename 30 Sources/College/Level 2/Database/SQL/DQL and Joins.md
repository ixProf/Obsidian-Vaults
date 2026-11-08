---
title: "DQL and Joins"
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
# 1. Variables:
#### ليه بنستخدم المتغيرات في SQL؟
المتغيرات دي زي العلبة السحرية اللي بتحط فيها حاجة دلوقتي وتستخدمها بعدين. بمعنى أصح، هي بتساعدك تخزن حاجة (رقم، كلمة، تاريخ، أي حاجة) وترجعلها في أي وقت بدل ما تكتبها كل شوية من الأول. خليني أقولك ليه بالتفصيل:

1. **عشان نحط حاجة ونستخدمها كتير**:  
   تخيل إنك عايز تستخدم رقم معين، زي 100، في أكتر من حتة في الكود بتاعك. بدل ما تكتب 100 كل مرة وتتعب نفسك، تعمل متغير اسمه `@age` مثلاً، تحط فيه الرقم ده، وكل ما تحتاجه ترجعله بسهولة. زي ما تحط الفلوس في جيبك وتطلعها وقت ما تحتاجها.

2. **عشان نسهل على نفسنا**:  
   لو عندك حاجة معقدة، زي ناتج استعلام طويل، وهتحتاجه في أكتر من مكان، بدل ما تكتب الاستعلام ده كل مرة، تحفظ الناتج في متغير وتستخدمه على طول. زي لما تعمل طبق أكل حلو وتحطه في التلاجة، بدل ما تعمله من الصفر كل يوم.

3. **عشان الكود يبقى شيك ومفهوم**:  
   لما تكتب `@age` بدل ما تكتب 100 في كل حتة، أي حد يقرا الكود هيفهم إن دي قيمة بتمثل عمر. الكود بيبقى أوضح وألطف، مش مجرد أرقام وكلام مُركب على بعضه.

4. **عشان نلعب في الكود بذكاء**:  
   لو عايز تعمل حاجة زي حلقة (Loop) أو شرط (IF)، المتغيرات بتساعدك تتحكم في الحاجات اللي بتتغير على حسب الموقف. يعني زي لما تكون بتلعب لعبة وبتغير السلاح على حسب العدو اللي قدامك.

5. **المتغيرات العامة عشان نعرف الدنيا ماشية ازاي**:  
   في متغيرات جاهزة زي `@@Version` أو `@@Error`، دي بتديك معلومات عن السيستم نفسه. يعني زي لما تبص في العداد بتاع العربية تشوف البنزين لسه قد ايه أو لو في مشكلة في الموتور.

- **مثال بسيط**:  
  ```sql
  DECLARE @age INT = 10
  SET @age = 100
  PRINT @age
  ```
  هنا عملنا متغير اسمه `@age` وحطينا فيه 10، وبعدين غيرناه لـ 100 وطبّعناه. لو عايز تغير العمر، بتغيره في سطر واحد بس، مش هتلف تدور على كل حتة كتبته فيها.

---

#### الفرق بين المتغيرات المحلية والعامة
- **المحلية (Local Variables)**: دي اللي إنت بتعملها بنفسك بـ `DECLARE`، زي `@age`. بتستخدمها جوا الكود بتاعك بس، زي شنطة بتاعتك إنت وبس.  
  - مثال:
    ```sql
    DECLARE @age INT = 10
    SET @age = 100
    PRINT @age
    ```

- **العامة (Global Variables)**: دي جاهزة من السيستم وبتبدأ بـ `@@`، زي `@@SERVERNAME`. بتستخدمها عشان تعرف حاجات عن السيرفر أو قاعدة البيانات، زي لما تسأل حد في الشارع الدنيا ماشية ازاي.  
  - مثال:
    ```sql
    SELECT @@Version
    PRINT @@Version
    ```

---

# 2. Data Query Language (DQL) - SELECT
- **الغرض**: DQL هي جزء من SQL بتستخدمها عشان تجيب بيانات من قاعدة البيانات من غير ما تغير فيها حاجة. الأمر الرئيسي هو `SELECT`.

- **أمثلة**:
  - **Select All Data**:  
    ترجعلك كل البيانات اللي في جدول `Student`.  
    ```sql
    SELECT * 
    FROM Student
    ```

  - **Select Specific Columns**:  
    يرجعلك عمود معين في جدول معين، زي الاسم الأول والأخير بس.  
    ```sql
    SELECT St_Fname, St_Lname 
    FROM Student
    ```

  - **Concatenation**:  
    يجمعلك الداتا في عمود معين ويحطها تحت اسم معين، زي الاسم الكامل.  
    ```sql
    SELECT [Full Name] = St_Fname + ' ' + St_Lname 
    FROM Student
    ```

---

## Where:
- **Age less than 23**:  
  بتجيب كل الطلاب اللي أعمارهم أقل من 23.  
  ```sql
  SELECT * 
  FROM Student 
  WHERE St_Age < 23
  ```

---
- **Specific addresses**:  
  بتجيب الطلاب اللي ساكنين في أماكن معينة زي الإسكندرية، المنصورة، القاهرة.  
  ```sql
  SELECT * 
  FROM Student 
  WHERE St_Address IN ('Alex', 'Mansoura', 'Cairo')
  ```

- **Excluding addresses**:  
  بتجيب الطلاب اللي مش ساكنين في الإسكندرية، المنصورة، القاهرة.  
  ```sql
  SELECT * 
  FROM Student 
  WHERE St_Address NOT IN ('Alex', 'Mansoura', 'Cairo')
  ```

- **Pattern Matching with LIKE**:  
  - **Second character is 'a'**:  
    بتجيب أسماء الطلاب اللي الحرف التاني فيها 'a'.  
    ```sql
    SELECT St_Lname 
    FROM Student 
    WHERE St_Lname LIKE '_a%'
    ```
  - **Ends with '%'**:  
    بتجيب الأسماء اللي بتخلّص بـ '%'.  
    ```sql
    SELECT St_Fname 
    FROM Student 
    WHERE St_Fname LIKE '%[%]'
    ```
    ملحوظة: `_` يعني حرف واحد، `%` يعني صفر أو أكتر من الحروف.
  - Include '%' at any position
الحروف دي ممكن تكون موجودة في الاول او الاخر او النص بنستخدم % فالاول والاخر ووسطها نحط الي بنبحث عنها
```sql
SELECT * 
FROM shows 
WHERE name LIKE '%the%';
```
بيدور على اي كلمة فيها the بغض النظر الحروف دي كانت في الاخر ولا في الاول

---

## Distinct:
- **Removing Duplicates**:  
  بتحذف المتكرر من البيانات، يعني لو في أسماء متكررة هتظهر مرة واحدة بس.  
  ```sql
  SELECT DISTINCT St_Fname, St_Lname 
  FROM Student
  ```

---

## Order by:
- **Sorting**:  
  تستخدم في الترتيب، يعني بترتب الأسماء حسب الاسم الأول والأخير.  
  ```sql
  SELECT St_Fname, St_Lname 
  FROM Student 
  ORDER BY St_Fname, St_Lname
  ```
بالنسبة للأرقام فالترتيب ال Default بتاعه بيكون تصاعدي (من الأقل للاكبر) مثلا

```SQL
SELECT *
FROM Student
ORDER BY age;
```
لكن لو حابين نعملها من تنازلياً بنستخدم كلمة `DESC`
```SQL
SELECT *
FROM Student
ORDER BY age DESC;
```
---

# 3. Joins
- **الغرض**: الـ Joins بتجمع بيانات من أكتر من جدول بناءً على عمود مشترك بينهم.

- **الأنواع**:
  1. **Cross Join**:  
     بيجمع كل صف من جدول مع كل صف من جدول تاني (يعني ضرب ديكارتي).  
     ```sql
     SELECT S.St_Fname, C.Crs_Name 
     FROM Student S 
     CROSS JOIN Course C
     ```
![[CrossJoin 1.png]]


  2. **Inner Join**:  
     بيرجع الصفوف اللي بتتطابق في الجدولين بس.  
     ```sql
     SELECT S.St_Fname, D.Dept_Name 
     FROM Student S 
     INNER JOIN Department D 
     ON D.Dept_Id = S.Dept_Id
     ```

  3. **Outer Join**:
     - **Left Join**:  
       بيرجع كل الصفوف من الجدول الأيسر، ولو مفيش تطابق في الجدول الأيمن يحط `NULL`.  
       ```sql
       SELECT S.St_Fname, D.Dept_Name 
       FROM Student S 
       LEFT JOIN Department D 
       ON D.Dept_Id = S.Dept_Id
       ```
     - **Right Join**:  
       بيرجع كل الصفوف من الجدول الأيمن، ولو مفيش تطابق في الجدول الأيسر يحط `NULL`.  
       ```sql
       SELECT S.St_Fname, D.Dept_Name 
       FROM Student S 
       RIGHT JOIN Department D 
       ON D.Dept_Id = S.Dept_Id
       ```
     - **Full Join**:  
       بيرجع كل الصفوف من الجدولين، ولو مفيش تطابق يحط `NULL`.  
       ```sql
       SELECT S.St_Fname, D.Dept_Name 
       FROM Student S 
       FULL OUTER JOIN Department D 
       ON D.Dept_Id = S.Dept_Id
       ```

![[Joins.png]]

  4. **Self Join**:  
     بيرجع بيانات من نفس الجدول، زي لما تجيب الطلاب ومشرفيهم من جدول واحد.  
     ```sql
     SELECT S.St_Fname, Super.St_Fname 
     FROM Student S 
     INNER JOIN Student Super 
     ON Super.St_Id = S.St_super
     ```

![[SelefJoin.png]]
  4. **Multi-Table Join**:  
     بيرجع بيانات من أكتر من جدولين مع بعض.  
     ```sql
     SELECT S.St_Fname, C.Crs_Name, SC.Grade 
     FROM Student S 
     INNER JOIN Stud_Course SC 
     ON S.St_Id = SC.St_Id 
     INNER JOIN Course C 
     ON C.Crs_Id = SC.Crs_Id
     ```

---

# 4. Join + DML (Update)
- **Update with Join**:  
  بيعدل بيانات في جدول بناءً على شرط من جدول تاني، زي لما تزود درجات الطلاب الساكنين في القاهرة بـ 10.  
  ```sql
  UPDATE SC 
  SET Grade = Grade + 10 
  FROM Student S 
  INNER JOIN Stud_Course SC 
  ON S.St_Id = SC.St_Id 
  WHERE S.St_Address = 'Cairo'
  ```


---

## 🟦 ما هو `BETWEEN`؟

`BETWEEN` هو عامل (Operator) يُستخدم في جملة `WHERE` لتحديد **نطاق** من القيم (Range) — سواء كانت أرقام، تواريخ، أو نصوص — ويُرجع فقط الصفوف التي تقع **ضمن هذا النطاق** (بما في ذلك الحدين).

---

## ✅ حالات الاستخدام:

### 1. **القيم الرقمية (Numbers)**

#### ✅ استخدام شائع لتحديد نطاق من الأرقام.

**مثال: إرجاع المنتجات التي سعرها بين 100 و300:**

```sql
SELECT *
FROM products
WHERE price BETWEEN 100 AND 300;
```

> يشمل السعر 100 و300 أيضًا.

---

### 2. **التواريخ (Dates)**

#### ✅ تُستخدم لتصفية البيانات حسب فترة زمنية.

**مثال: إرجاع الطلبات بين 1 يناير 2024 و31 مارس 2024:**

```sql
SELECT *
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';
```

> تأكد أن التاريخ بصيغة صحيحة وداخل علامات اقتباس.

---

### 3. **النصوص (Text)**

#### ✅ يُستخدم لتحديد نطاق أبجدي.

**مثال: إرجاع العملاء الذين تبدأ أسماؤهم بحروف من A إلى D:**

```sql
SELECT *
FROM customers
WHERE name BETWEEN 'A' AND 'D';
```

🔸 ملاحظات مهمة:

- يشمل الكلمات التي تبدأ بـ 'A', 'B', 'C', و 'D' فقط **إذا كانت الكلمة تساوي 'D' فقط**.
    
- لا يشمل الكلمات التي تبدأ بـ 'D' متبوعة بحروف أخرى، مثل: `'David'`.
    

---

### 4. **مع القيم العكسية (Reversed range)**

> يمكنك كتابة `BETWEEN x AND y` فقط إذا كان `x <= y`.  
> إذا عكست القيم، فلن تُرجع النتيجة أي صف.

**خطأ شائع:**

```sql
-- هذا لا يعمل كما تتوقع
SELECT *
FROM orders
WHERE price BETWEEN 500 AND 100;  -- لا يُرجع شيء
```

---

### 5. **مع NOT BETWEEN**

#### ✅ لعكس النطاق — إرجاع الصفوف **خارج** النطاق.

**مثال: إرجاع المنتجات التي سعرها أقل من 100 أو أكثر من 300:**

```sql
SELECT *
FROM products
WHERE price NOT BETWEEN 100 AND 300;
```
 الفرق بين:

```sql
WHERE age BETWEEN 18 AND 22;
```

و

```sql
WHERE age NOT BETWEEN 18 AND 22;
```

هو أن الأول **يختار القيم داخل النطاق**، والثاني **يستبعد القيم داخل النطاق**.

---

## 🔍 الفرق بالتفصيل:

|الشرط|المعنى|
|---|---|
|`BETWEEN 18 AND 22`|✅ يُرجع الصفوف التي تكون قيمة العمر فيها من **18 إلى 22** (بما في ذلك 18 و22).|
|`NOT BETWEEN 18 AND 22`|❌ يُرجع الصفوف التي تكون قيمة العمر فيها **أقل من 18 أو أكبر من 22**.|

---

## 📊 مثال عملي:

|student_id|name|age|
|---|---|---|
|1|Ali|17|
|2|Sara|18|
|3|Ahmed|20|
|4|Laila|22|
|5|Omar|23|

---

### ✅ باستخدام:

```sql
WHERE age BETWEEN 18 AND 22;
```

🔽 النتيجة:

|student_id|name|age|
|---|---|---|
|2|Sara|18|
|3|Ahmed|20|
|4|Laila|22|

---

### ✅ باستخدام:

```sql
WHERE age NOT BETWEEN 18 AND 22;
```

🔽 النتيجة:

|student_id|name|age|
|---|---|---|
|1|Ali|17|
|5|Omar|23|

---

## 📝 ملاحظات عامة:

- `BETWEEN` يشمل القيم الحدية (Inclusive).
    
- يُمكن استخدامه مع أنواع البيانات التالية:
    
    - `INT` (أعداد صحيحة)
        
    - `FLOAT/DECIMAL` (أعداد عشرية)
        
    - `DATE/DATETIME` (تواريخ)
        
    - `VARCHAR/CHAR` (نصوص)
        

---

## 💡 نصيحة:

عند استخدام `BETWEEN` مع النصوص، وكنت تريد تضمين كلمات مثل "David"، استخدم شرطًا بديلًا مثل:

```sql
WHERE name >= 'A' AND name < 'E'
```

لأنه يشمل كل شيء من 'A' إلى قبل 'E'.

---
