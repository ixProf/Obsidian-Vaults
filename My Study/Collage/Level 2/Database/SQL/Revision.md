بالطبع! إليك أمثلة عملية على أوامر **DDL** و **DML** لتوضيح كيفية استخدامها:

---

## 🔷 أولًا: أمثلة على أوامر **DDL** (تعريف البيانات)

### 1. **إنشاء جدول (CREATE)**

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);
```

### 2. **تعديل جدول (ALTER)**

#### ➤ إضافة عمود:

```sql
ALTER TABLE employees ADD hire_date DATE;
```

#### ➤ تعديل نوع عمود:

```sql
ALTER TABLE employees MODIFY salary DECIMAL(12,2);
```

#### ➤ حذف عمود:

```sql
ALTER TABLE employees DROP COLUMN hire_date;
```

### 3. **حذف جدول (DROP)**

```sql
DROP TABLE employees;
```

### 4. **تفريغ جدول مع الاحتفاظ به (TRUNCATE)**

```sql
TRUNCATE TABLE employees;
```

---

## 🔷 ثانيًا: أمثلة على أوامر **DML** (التعامل مع البيانات)

### 1. **إدخال بيانات (INSERT)**

```sql
INSERT INTO employees (id, name, salary)
VALUES (1, 'Ali', 5000.00);
```

### 2. **تحديث بيانات (UPDATE)**

```sql
UPDATE employees
SET salary = 5500.00
WHERE id = 1;
```

### 3. **حذف بيانات (DELETE)**

```sql
DELETE FROM employees
WHERE id = 1;
```

### 4. **استرجاع بيانات (SELECT)**

```sql
SELECT * FROM employees;
```

---

هل تود أمثلة أكثر تعقيدًا تشمل العلاقات بين الجداول أو استخدام القيود مثل `FOREIGN KEY` و `UNIQUE`؟

ممتاز! إليك تلخيصًا لأوامر **DCL** و **TCL** في SQL:

---

## 🔷 ثالثًا: أوامر **DCL** (Data Control Language)

تُستخدم للتحكم في صلاحيات الوصول إلى البيانات داخل قاعدة البيانات.

|الأمر|الاستخدام|
|---|---|
|`GRANT`|إعطاء صلاحيات لمستخدم معين على قاعدة البيانات أو الجداول|
|`REVOKE`|سحب صلاحيات تم منحها مسبقًا من مستخدم|

### ✅ أمثلة:

#### ➤ إعطاء صلاحيات:

```sql
GRANT SELECT, INSERT ON employees TO 'ahmed';
```

#### ➤ سحب صلاحيات:

```sql
REVOKE INSERT ON employees FROM 'ahmed';
```

---

## 🔷 رابعًا: أوامر **TCL** (Transaction Control Language)

تُستخدم للتحكم في المعاملات (Transactions) داخل قاعدة البيانات، مثل التأكيد أو التراجع عن العمليات.

|الأمر|الاستخدام|
|---|---|
|`COMMIT`|حفظ التغييرات التي تمت في المعاملة بشكل دائم|
|`ROLLBACK`|التراجع عن التغييرات التي لم تُؤكد بعد|
|`SAVEPOINT`|إنشاء نقطة حفظ يمكن الرجوع إليها لاحقًا|
|`SET TRANSACTION`|تعيين خصائص معينة للمعاملة|

### ✅ أمثلة:

#### ➤ حفظ التغييرات:

```sql
COMMIT;
```

#### ➤ التراجع عن التغييرات:

```sql
ROLLBACK;
```

#### ➤ استخدام نقطة حفظ:

```sql
SAVEPOINT sp1;
-- تحديث أو حذف بيانات هنا
ROLLBACK TO sp1;
```

---

هل تود أن أجهز لك ملف PDF أو جدول شامل لكل هذه الأوامر والملخصات؟