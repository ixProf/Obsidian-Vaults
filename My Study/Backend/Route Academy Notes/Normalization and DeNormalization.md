# أولاً: يعني إيه Database Normalization؟

تخيل إنك شغال في شركة، وكل موظف عنده ملف.

لو كل ملف مكتوب فيه:

- اسم الموظف
- اسم القسم
- مدير القسم   
- عنوان القسم
    

ولما القسم يغير اسمه، لازم تغيره في 500 موظف...

إيه المشكلة؟

- Data Redundancy (تكرار بيانات)
- ممكن تنسى تعدل Record
- يحصل Data Inconsistency
    

مثال:

```
Employee 1
IT Department

Employee 2
IT Departmant   ← غلطة إملائية

Employee 3
Information Technology
```

دلوقتي عندك 3 أسماء لنفس القسم.

وده سبب وجود **Normalization**.

---

# يعني إيه Normalization؟

هي ==مجموعة Rules بتنظم شكل الـ Database== بحيث:

- نقلل تكرار البيانات
- نحافظ على صحة البيانات
- نسهل التعديل
- نقلل الأخطاء
    

الـ Rules دي اسمها:

- 1NF
- 2NF
- 3NF
- (وفي كمان BCNF و 4NF و5NF لكن غالبًا مش هتحتاجهم)

---

# First Normal Form (1NF)

## الفكرة

كل Cell في الجدول ==لازم تحتوي على **قيمة واحدة فقط (Atomic Value)==.**

يعني:

غلط

|StudentId|Courses|
|---|---|
|1|Math, Physics|

ليه؟

==لأن العمود فيه قيمتين.==

الـ Database مش بتحب List جوه Column.

---
## ليه؟

تخيل عايز تجيب الطلبة اللي بيدرسوا Physics.

هتكتب:

```
WHERE Courses = ?
```

مش هتعرف.

هتضطر تستخدم:

```
LIKE '%Physics%'
```

وده بطيء جدًا.

---

## الصح

==نعمل كل قيمة في Row.==

|StudentId|Course|
|---|---|
|1|Math|
|1|Physics|

دلوقتي أقدر أعمل

```
WHERE Course='Physics'
```

بسهولة.

---
## مثال تاني

بدل

|Id|Phones|
|---|---|
|1|010...,011...|

نعمل

|CustomerId|Phone|
|---|---|
|1|010...|
|1|011...|

---

## يعني Atomic يعني إيه؟

Atomic يعني:

القيمة ==مينفعش تتقسم أكتر بالنسبة للنظام==.

مثلاً

اسم الشخص

```
Mahmoud
```

ده Atomic.

لكن

```
Math, Physics
```

مش Atomic.

---

# مشاكل عدم تطبيق 1NF

- صعوبة البحث
- صعوبة التعديل
- صعوبة الحذف
- صعوبة الإضافة
    

---

# Second Normal Form (2NF)

دي بتتحفظ اكتر من كونها انها تتفهم

خلينا نفهمها صح.

## الأول يعني إيه Composite Key؟

يعني الـ Primary Key مكون من أكتر من Column.

مثلاً

Enrollment

```
StudentId
CourseId
```

==الاتنين مع بعض هما المفتاح.==

---

الجدول

|StudentId|CourseId|StudentName|Grade|
|---|---|---|---|

المفتاح هو

```
(StudentId, CourseId)
```

## المشكلة

StudentName بيعتمد على مين؟

==على StudentId فقط==.

مش محتاج CourseId.

يعني

```
StudentId
↓

StudentName
```

أما Grade

بيعتمد على الاتنين.

```
StudentId + CourseId
↓

Grade
```

يبقى عندنا مشكلة اسمها

==**Partial Dependency**==

يعني الـ Attribute بيعتمد على ==جزء== من الـ Primary Key.

## الحل

نفصل الجدول.

Students

| StudentId | StudentName |
| --------- | ----------- |

Enrollments

| StudentId | CourseId | Grade |
| --------- | -------- | ----- |



دلوقتي كل حاجة بقت معتمدة على المفتاح بالكامل.

---

## ليه ده مهم؟

تخيل الطالب غير اسمه.

قبل:

==هتعدل الاسم في 10 مواد.==

بعد:

مرة واحدة.

---

# Third Normal Form (3NF)
ودي أهم واحدة.

## المشكلة

في ==Attribute بيعتمد على Attribute تاني.==
مش على الـ Primary Key.


مثال



| StudentId | DepartmentId | DepartmentName |
| --------- | ------------ | -------------- |


العلاقة
```
StudentId

↓

DepartmentId

↓

DepartmentName
```

شايف؟

DepartmentName مش بيعتمد على StudentId.

==بيعتمد على DepartmentId.==

وده اسمه

==Transitive Dependency==

## ليه دي مشكلة؟

لو غيرنا اسم القسم

```
Computer Science
```

إلى

```
CS
```

==لازم نعدل آلاف الطلبة.==

الحل

Students

| StudentId | DepartmentId |
| --------- | ------------ |

Departments

| DepartmentId | DepartmentName |
| ------------ | -------------- |

دلوقتي اسم القسم موجود مرة واحدة.

---

# ملخص الفرق بين 2NF و3NF

## 2NF

هل الـ ==Column== بيعتمد على ==كل الـ Primary Key؟ ولا جزء منه؟==

---

## 3NF

هل الـ ==Column== بيعتمد على الـ Primary Key ==مباشرة==؟

ولا ==على Column== تاني؟

---

مثال

```
StudentID

↓

DepartmentID

↓

DepartmentName
```

دي 3NF.

---

أما

```
(StudentID, CourseID)

↓

StudentName
```

دي 2NF.

---

# Denormalization

دلوقتي هنعمل العكس.

ليه؟

---

كل شوية بنقول:

قسم الجدول.

قسم الجدول.

قسم الجدول.

طيب...

لو عندي Dashboard بيعرض:

- اسم الطالب
    
- اسم القسم
    
- اسم الكلية
    
- اسم الجامعة
    

هحتاج

```
JOIN

JOIN

JOIN

JOIN
```

كل Request.

---

في بعض الأنظمة

الـ Read أهم من الـ Write.

فنقول:

خلينا نكرر البيانات.

---

يبقى الجدول

| StudentName | DepartmentName |

بدل

```
Students

JOIN

Departments
```

---

ليه؟

==عشان السرعة.==

يبقى Denormalization يعني:

==نكرر بيانات **بشكل مقصود (Intentionally)** لتحسين الأداء.==

---
## إمتى؟

- Dashboards
- Reports
- Data Warehouse
- Analytics
- BI Systems

---

## العيوب

- Data ==Redundancy==
- التحديث أصعب
- حجم الداتا أكبر

---
# Audit Columns

أي System محترم لازم يعرف:

مين عمل؟

إيه؟

وامتى؟

---

لذلك بنضيف أعمدة.

مثلاً

```
CreatedAt

CreatedBy

UpdatedAt

UpdatedBy
```

---

مثال

| Name | CreatedAt | CreatedBy |

لما تعمل Insert

```
CreatedAt

= GETDATE()
```

---

ولما تعمل Update

```
UpdatedAt

= GETDATE()
```
## ليه؟

لو العميل قال
"مين غير سعر المنتج؟"
هتعرف.

أو

"مين حذف المستخدم؟"
هتعرف.


وده مهم جدًا في:

- ERP
- HR
- Banking
- Medical Systems
    

---

# Soft Delete

بدل

```
DELETE
```

نمشي كده

```
UPDATE

IsDeleted = 1
```

---

ليه؟

تخيل العميل قال:

رجعلي العميل اللي اتحذف امبارح.

- لو DELETE: خلاص راح.
- لكن Soft Delete

```
IsDeleted=1
```

يبقى موجود.

---

لما تعرض البيانات

```
SELECT *

WHERE IsDeleted=0
```

---

لو عايز ترجعه

```
UPDATE

SET IsDeleted=0
```

خلص.

---

عادة بنضيف

```
DeletedAt

DeletedBy
```
## المميزات

- Restore
- Audit
- أمان
- History

---

## العيوب

كل Query لازم يبقى فيها

```
WHERE IsDeleted=0
```

وفي **EF Core** غالبًا بنستخدم ==**Global Query Filters**== عشان الشرط ده يتطبق تلقائيًا على كل الاستعلامات بدل ما تكتبه كل مرة.

---


# Concurrency Control

## يعني إيه Concurrency؟

الـ **Concurrency** يعني إن أكتر من User أو Process يقدروا يقرأوا أو يعدلوا نفس البيانات **في نفس الوقت**.

مثال:

- User A فتح بيانات الطالب.
    
- User B فتح نفس بيانات الطالب.
    
- الاتنين بيعدلوا في نفس اللحظة.
    

لو مفيش نظام يتحكم في التعديلات، ممكن يحصل ==فقدان أو تضارب في البيانات==.

---

# ليه Concurrency Control مهم؟

هدفه إنه يحافظ على:

- Data Consistency
- Data Integrity
- منع فقدان التعديلات
- منع تعارض المستخدمين

---

# أشهر المشاكل اللي بيحلها

### 1. Lost Update (أشهر مشكلة)

User A و User B قرأوا نفس البيانات.

السعر = 100

- User A → عدله لـ 120.
- User B → عدله لـ 90.
    

لو User B حفظ بعد User A:

السعر هيبقى 90، وتعديل User A هيضيع.

وده اسمه:

**Lost Update**

---

### 2. Dirty Read

لما User A عدل البيانات لكنه **لسه معملش ==Commit**==.

فـ User B قرأ البيانات الجديدة.

بعدها User A عمل Rollback.

يبقى User B قرأ بيانات ==عمرها ما اتخزنت فعليًا.==

---

### 3. Non-Repeatable Read

لما الـUser A قرأ نفس الـ Record مرتين داخل نفس الـ Transaction.

بين القراءتين:

فـ User B عدل الـ Record وعمل Commit.

النتيجة:

فـ User A لقى قيمتين مختلفتين لنفس البيانات.

---

### 4. Phantom Read

User A نفذ:

```sql
SELECT * FROM Students WHERE Age > 20;
```

رجع 10 Records.

قبل ما يعيد نفس الاستعلام:

فـ User B أضاف Student جديد عمره 22.

لما User A نفذ نفس الاستعلام مرة تانية:

رجع 11 Record.

الـ Record الجديد اسمه:

==**Phantom Row**==

---

# طرق حل مشاكل الـ Concurrency

## 1. Pessimistic Concurrency (القفل)

الفكرة:

"أنا هعدل البيانات، يبقى محدش يلمسها."

يتم استخدام ==Locks==.

أي User تاني:

- يستنى
- أو يحصل Timeout

### المميزات

- يمنع التعارض تمامًا

### العيوب

- الأداء أقل.
- ممكن يحصل Deadlock    
- مناسب عندما تكون الكتابة كثيرة واحتمال التعارض مرتفع.

---

## 2. Optimistic Concurrency ==(الأكثر استخدامًا)==

الفكرة:

"خلّي الكل يشتغل، ولما يجي يحفظ ==نتأكد== إن البيانات متغيرتش."

وده اللي EF Core بيستخدمه غالبًا.

بيعتمد على:

- ==RowVersion==
- Timestamp
- Version Number
    

لو النسخة اتغيرت:

==يرفض التعديل ويرمي Exception.==

### المميزات

- سريع.
- مفيش Locks.
- مناسب لمعظم تطبيقات الويب.
    

### العيوب

- لازم تتعامل مع الـ Conflict لو حصل.

---

# مقارنة سريعة

|Pessimistic|Optimistic|
|---|---|
|يستخدم Locks|لا يستخدم Locks|
|يمنع التعديل من البداية|يسمح بالتعديل ثم يتحقق عند الحفظ|
|أبطأ|أسرع|
|مناسب للتعارضات الكثيرة|مناسب للتعارضات القليلة|
|قد يسبب Deadlock|لا يسبب Deadlock بسبب الأقفال|

---

# علاقة RowVersion بالـ Concurrency

الـ **RowVersion** هو عمود خاص بيتغير تلقائيًا كل مرة الـ Row يتعدل.

مثال:

```
Student
----------------------------
Id = 1
Name = Mahmoud
RowVersion = 15
```

ساعتها User A و User B قرأوا نفس الـ Record.

الاتنين معاهم:

```
RowVersion = 15
```

فـUser A عمل Update.

أصبحت:

```
RowVersion = 16
```

فلما User B يحاول يعمل Update باستخدام:

```
RowVersion = 15
```

الـ Database ترفض العملية لأن البيانات اتغيرت بالفعل.

---

# في EF Core

```csharp
public class Student
{
    public int Id { get; set; }

    public string Name { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; }
}
```

عند استدعاء `SaveChanges()`، يقوم EF Core بإضافة `RowVersion` إلى شرط `UPDATE`. إذا لم يتم تحديث أي صف، فإنه يرمي `DbUpdateConcurrencyException`، وبكده تعرف إن حد عدّل البيانات قبلك.


- **Concurrency** = أكثر من مستخدم يتعامل مع نفس البيانات في نفس الوقت.
    
- **Concurrency Control** = مجموعة تقنيات تمنع تضارب التعديلات وتحافظ على صحة البيانات.
    
- أشهر المشاكل:
    
    - Lost Update
        
    - Dirty Read
        
    - Non-Repeatable Read
        
    - Phantom Read
        
- أشهر أساليب الحل:
    
    - **Pessimistic Concurrency** → يعتمد على **Locks** لمنع الآخرين من التعديل.
        
    - **Optimistic Concurrency** → يعتمد على **RowVersion/Timestamp** واكتشاف التعارض عند الحفظ.
        
- **EF Core** يستخدم **Optimistic Concurrency** بشكل افتراضي عند استخدام `RowVersion` أو `[Timestamp]`.
    
- في تطبيقات الويب الحديثة وASP.NET Core، **Optimistic Concurrency** هو الخيار الأكثر شيوعًا لأنه يحقق توازنًا ممتازًا بين الأداء وسلامة البيانات.

---
# ملخص يثبت الفكرة

| الموضوع             | المشكلة                                          | الحل                                                                                   |
| ------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| 1NF                 | وجود أكثر من قيمة داخل الخلية الواحدة            | كل خلية تحتوي على قيمة واحدة فقط (Atomic)                                              |
| 2NF                 | عمود يعتمد على جزء من مفتاح مركب                 | نقل البيانات إلى جدول منفصل بحيث تعتمد على المفتاح بالكامل                             |
| 3NF                 | عمود يعتمد على عمود آخر وليس على المفتاح الأساسي | فصل الكيان في جدول مستقل وإقامة علاقة بين الجداول                                      |
| Denormalization     | كثرة عمليات `JOIN` تؤثر على سرعة القراءة         | تكرار بعض البيانات عمدًا لتحسين الأداء                                                 |
| Audit Columns       | عدم معرفة من أنشأ أو عدّل البيانات ومتى          | إضافة أعمدة مثل `CreatedAt` و`UpdatedAt` و`CreatedBy` و`UpdatedBy`                     |
| Soft Delete         | الحذف النهائي يؤدي إلى فقدان البيانات            | استخدام `IsDeleted` مع أعمدة مثل `DeletedAt` و`DeletedBy`                              |
| Concurrency Control | ضياع تعديلات المستخدمين عند التعديل المتزامن     | استخدام `RowVersion` أو `Timestamp` لاكتشاف التعارض ومنع الكتابة فوق التعديلات السابقة |

## إزاي الموضوع ده بيظهر في مشاريع ASP.NET Core؟

في مشروع حقيقي باستخدام **ASP.NET Core + EF Core** غالبًا هتلاقي معظم الجداول فيها حاجة شبه كده:

```csharp
public class BaseEntity
{
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; }
    public string CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }
    public string UpdatedBy { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
    public string DeletedBy { get; set; }

    [Timestamp]
    public byte[] RowVersion { get; set; }
}
```

وبعدها كل الكيانات (`Student`, `Product`, `Order`...) ترث من `BaseEntity`، فتستفيد تلقائيًا من:

- Audit Columns لتتبع التغييرات.
- Soft Delete للحذف المنطقي.
- Concurrency Columns لمنع تعارض التعديلات.
    

أما **Normalization (1NF, 2NF, 3NF)** فهو بيتم أثناء تصميم قاعدة البيانات نفسها، و**Denormalization** بتلجأ له فقط لو عندك مشكلة أداء فعلية في القراءة، وليس من البداية.

---
# Docs Materials

# Normalization and DeNormalization

[Normalization](https://www.freecodecamp.org/news/database-normalization-1nf-2nf-3nf-table-examples/)

[Denormalization](https://www.geeksforgeeks.org/dbms/denormalization-in-databases/)

[Comparison Between Normalization and DeNormalization ](https://www.exasol.com/hub/database/normalization-vs-denormalization/)

# Audit

[How to implement Audit in a database](https://medium.com/@marlies.quaadgras/how-to-implement-audit-in-a-database-63f026717dc7)

# Soft Delete

[What Are Soft Deletes, and How Are They Implemented?](https://www.brentozar.com/archive/2020/02/what-are-soft-deletes-and-how-are-they-implemented/)

# Concurrency

[Concurrency Control](https://www.geeksforgeeks.org/dbms/concurrency-control-in-dbms/)

---