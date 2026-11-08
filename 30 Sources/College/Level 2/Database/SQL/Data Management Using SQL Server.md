---
title: "Data Management Using SQL Server"
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


## **🟢 المقدمة**

هذا الملف يركز على مواضيع متقدمة في **SQL Server**، وهي أساسيات ضرورية لبناء قواعد بيانات احترافية وتحسين الأداء. يتناول الجوانب التالية:

1. **`SELECT INTO` و `INSERT BASED ON SELECT`**
2. **الدوال المعرفة من قبل المستخدم (User-Defined Functions - UDFs)**
3. **المشاهدات (Views) واستخداماتها في SQL**
4. **قواعد العلاقات (Relationship Rules)**
5. **الفرق بين `DELETE` و `TRUNCATE` و `DROP TABLE`**

---

## **🟢 1️⃣ `SELECT INTO` و `INSERT BASED ON SELECT`**

هذه العمليات مهمة جدًا عند نقل البيانات بين الجداول أو إنشاء جداول جديدة بناءً على استعلامات.

### **🔹 `SELECT INTO`**

- تُستخدم لإنشاء **جدول جديد** بناءً على بيانات موجودة في جدول آخر.
- **الجدول الجديد يتم إنشاؤه تلقائيًا ولا يحتاج إلى تعريفه مسبقًا**.
- **تنسخ البنية (Structure) + البيانات من الجدول الأصلي**.

**✅ مثال:**

```sql
SELECT * INTO NewStudents
FROM Students
WHERE Status = 'Active';
```

🔹 هذا الكود يقوم بإنشاء **جدول جديد اسمه `NewStudents`** يحتوي فقط على **الطلاب النشطين** من جدول `Students`.

---

### **🔹 `INSERT BASED ON SELECT`**

- تُستخدم لإدراج بيانات في **جدول موجود مسبقًا** بناءً على استعلام.
- **يجب أن يكون الجدول المستهدف موجودًا مسبقًا**.

**✅ مثال:**

```sql
INSERT INTO ArchivedStudents (ID, Name, Status)
SELECT ID, Name, 'Archived'
FROM Students
WHERE Status = 'Graduated';
```

🔹 هذا الكود يأخذ جميع الطلاب المتخرجين من `Students` ويخزنهم في `ArchivedStudents`.

---

## **🟢 2️⃣ الدوال المعرفة من قبل المستخدم (User-Defined Functions - UDFs)**

هذه الدوال تسمح للمطور بإنشاء وظائف خاصة يمكن استدعاؤها داخل الاستعلامات.

### **🔹 أنواع الدوال:**

1. **الدوال العددية (Scalar Functions)**
    - ترجع **قيمة واحدة فقط**.
    - يمكن استخدامها لحساب القيم أو تحويل البيانات.
    - تُستخدم عادةً داخل `SELECT` أو `WHERE`.

**✅ مثال:**

```sql
CREATE FUNCTION GetFullName(@FirstName NVARCHAR(50), @LastName NVARCHAR(50))
RETURNS NVARCHAR(100)
AS
BEGIN
    RETURN (@FirstName + ' ' + @LastName);
END;
```

🔹 هذه الدالة تستقبل الاسم الأول والاسم الأخير وتعيد **الاسم الكامل**.

**💡 استدعاء الدالة:**

```sql
SELECT dbo.GetFullName('Ali', 'Hassan');
```

---

2. **الدوال الجدولية المباشرة (Inline Table-Valued Functions - ITVF)**
    - تُعيد **جدولًا** بدلًا من قيمة واحدة.
    - تُستخدم للحصول على بيانات مفلترة أو منظمة بدون الحاجة إلى `BEGIN...END`.

**✅ مثال:**

```sql
CREATE FUNCTION GetActiveUsers()
RETURNS TABLE
AS
RETURN (
    SELECT ID, Name FROM Users WHERE Status = 'Active'
);
```

**💡 استدعاء الدالة:**

```sql
SELECT * FROM GetActiveUsers();
```

🔹 ستُعيد قائمة بجميع المستخدمين النشطين.

---

3. **الدوال الجدولية متعددة البيانات (Multi-Statement Table-Valued Functions - MSTVF)**
    - تُعيد جدولًا ولكن مع **معالجة بيانات متعددة المراحل**.
    - تُستخدم عند الحاجة إلى تنفيذ عمليات أكثر تعقيدًا.

**✅ مثال:**

```sql
CREATE FUNCTION GetUsersWithAge(@MinAge INT)
RETURNS @UserTable TABLE (ID INT, Name NVARCHAR(100))
AS
BEGIN
    INSERT INTO @UserTable
    SELECT ID, Name FROM Users WHERE Age >= @MinAge;
    RETURN;
END;
```

**💡 استدعاء الدالة:**

```sql
SELECT * FROM GetUsersWithAge(25);
```

🔹 ستُعيد جميع المستخدمين الذين تبلغ أعمارهم **25 سنة فأكثر**.

---

## **🟢 3️⃣ المشاهدات (Views)**

المشاهدات هي جداول افتراضية تُستخدم لعرض البيانات بطريقة منظمة دون تخزينها فعليًا.

### **🔹 أنواع المشاهدات:**

1. **المشاهدات العادية (Standard Views)**
    - تُستخدم لإنشاء **عرض مخصص** للبيانات بناءً على شروط معينة.

**✅ مثال:**

```sql
CREATE VIEW ActiveUsers AS
SELECT ID, Name FROM Users WHERE Status = 'Active';
```

**💡 استدعاء المشاهدة:**

```sql
SELECT * FROM ActiveUsers;
```

🔹 ستُعيد قائمة بجميع المستخدمين النشطين.

---

2. **المشاهدات المجزأة (Partitioned Views)**
    - تُستخدم لدمج بيانات من **جداول متعددة**.

**✅ مثال:**

```sql
CREATE VIEW AllEmployees AS
SELECT ID, Name, 'HR' AS Department FROM HREmployees
UNION ALL
SELECT ID, Name, 'IT' AS Department FROM ITEmployees;
```

🔹 ستُعرض البيانات وكأنها من **جدول واحد**، رغم أنها مأخوذة من جدولين مختلفين.

---

### **🔹 تعديل البيانات عبر المشاهدات (`Views + DML`)**

- يمكن **إضافة أو تحديث أو حذف** بيانات في المشاهدات إذا كانت هناك قيود تسمح بذلك.

**✅ مثال على قيد `CHECK` لمنع إدخال بيانات غير مطابقة:**

```sql
CREATE VIEW ActiveStudents AS
SELECT * FROM Students WHERE Status = 'Active'
WITH CHECK OPTION;
```

🔹 يمنع هذا القيد **إضافة أو تعديل طلاب** بوضع **غير نشط**.

---

## **🟢 4️⃣ الفرق بين `DELETE` و `TRUNCATE` و `DROP TABLE`**

### **🔹 مقارنة العمليات:**

|العملية|التأثير|إمكانية التراجع (`ROLLBACK`)|الأداء|
|---|---|---|---|
|`DELETE`|يحذف **بيانات** من الجدول مع إمكانية **استخدام شرط WHERE**|✅ نعم|بطيء نسبيًا|
|`TRUNCATE`|يحذف **جميع الصفوف** من الجدول بدون شرط|❌ لا|أسرع|
|`DROP TABLE`|يحذف **الجدول بالكامل** من قاعدة البيانات|❌ لا|أسرع|

### **🔹 أمثلة عملية:**

1. **حذف بيانات محددة (`DELETE`)**

```sql
DELETE FROM Users WHERE Status = 'Inactive';
```

🔹 يحذف فقط المستخدمين غير النشطين.

2. **مسح جميع البيانات (`TRUNCATE`)**

```sql
TRUNCATE TABLE Users;
```

🔹 يمسح **جميع البيانات** من الجدول دون حذف الجدول نفسه.

3. **حذف الجدول بالكامل (`DROP TABLE`)**

```sql
DROP TABLE Users;
```

🔹 يحذف الجدول **بشكل كامل** من قاعدة البيانات.

---

## **🟢 الخاتمة**

🔹 تعلمنا في هذه الجلسة:  
✅ **`SELECT INTO` و `INSERT BASED ON SELECT`** لإنشاء الجداول وإدراج البيانات.  
✅ **الدوال المعرفة من قبل المستخدم (`UDFs`)** لإنشاء وظائف مخصصة.  
✅ **المشاهدات (`Views`)** لعرض البيانات بطرق منظمة.  
✅ **الفرق بين `DELETE` و `TRUNCATE` و `DROP TABLE`**.

🚀 **إذا كنت بحاجة إلى أي توضيحات إضافية، أخبرني بذلك!** 😊