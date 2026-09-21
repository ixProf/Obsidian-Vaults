# يعني إيه Function؟

الـ Function هي **دالة جاهزة** موجودة في SQL أو أنت اللي بتعملها، بتاخد Input وترجع Output.

مثلاً:

```sql
SELECT UPPER('mahmoud')
```

الناتج

```text
MAHMOUD
```

هنا:

- Input = `mahmoud`
    
- Function = `UPPER`
    
- Output = `MAHMOUD`
    

وده بالظبط نفس فكرة الدوال في C#.

مثلاً:

```csharp
Math.Sqrt(25);
```

ترجع

```text
5
```

الفكرة واحدة.

---

## ليه بنستخدم Functions؟

علشان:

- تقلل كتابة الكود.
- تعيد استخدام نفس المنطق.
- تخلي الكود أوضح.
- توفر Functions جاهزة بدل ما تعملها بنفسك.
    

---

## أنواع الـ Functions

في نوعين:

### 1) Built-in Functions

دي موجودة في SQL Server من الأساس.

زي:

- LEN
    
- SUM
    
- AVG
    
- GETDATE
    
- CAST
    

---

### 2) User Defined Functions (UDF)

دي أنت اللي بتعملها.

مثلاً تعمل Function تحسب الضريبة.

بدل ما تكتب المعادلة كل مرة.

مرة واحدة:

```sql
dbo.CalculateTax()
```

وخلاص.

---

## Built-in Functions

SQL Server مقسمها كذا نوع.

---

### أولًا: String Functions

دي بتشتغل على النصوص.

#### LEN

ترجع عدد الحروف.

```sql
SELECT LEN('Mahmoud')
```

الناتج

```text
7
```

---

#### SUBSTRING

تجيب جزء من النص.

```sql
SELECT SUBSTRING('Mahmoud',2,3)
```

يعني:

ابدأ من الحرف رقم 2

وخد 3 حروف

الناتج

```text
ahm
```

---

#### REPLACE

تستبدل كلمة بكلمة.

```sql
SELECT REPLACE('I Love SQL','SQL','C#')
```

الناتج

```text
I Love C#
```

---

#### CHARINDEX

تجيب مكان كلمة داخل النص.

```sql
SELECT CHARINDEX('SQL','I Love SQL')
```

الناتج

```text
8
```

لأن كلمة SQL بدأت عند الحرف الثامن.

---

#### LOWER

```sql
SELECT LOWER('SQL SERVER')
```

الناتج

```text
sql server
```

---

#### UPPER

```sql
SELECT UPPER('sql')
```

الناتج

```text
SQL
```

---

#### CONCAT

يجمع نصوص.

```sql
SELECT CONCAT('Mahmoud',' ','Prof')
```

الناتج

```text
Mahmoud Prof
```



---

### ثانيًا: Date Functions

دي خاصة بالتواريخ.

---

#### GETDATE()

ترجع تاريخ ووقت الجهاز الحالي.

```sql
SELECT GETDATE()
```

مثلاً

```text
2026-07-04 16:20:11
```

---

#### DATEADD

تزود أيام أو شهور أو سنين.

```sql
SELECT DATEADD(day,10,GETDATE())
```

يعني

بعد 10 أيام.

---

#### DATEDIFF

تحسب الفرق.

```sql
SELECT DATEDIFF(day,'2026-01-01','2026-01-20')
```

الناتج

```text
19
```

---

#### FORMAT

لتنسيق التاريخ.

```sql
SELECT FORMAT(GETDATE(),'dd/MM/yyyy')
```

الناتج

```text
04/07/2026
```

---

### ثالثًا: Mathematical Functions

---

#### ABS

القيمة المطلقة.

```sql
SELECT ABS(-20)
```

الناتج

```text
20
```

---

#### ROUND

تقريب.

```sql
SELECT ROUND(15.678,2)
```

الناتج

```text
15.68
```

---

#### CEILING

يقرب لفوق.

```sql
SELECT CEILING(12.1)
```

الناتج

```text
13
```

---

#### FLOOR

يقرب لتحت.

```sql
SELECT FLOOR(12.9)
```

الناتج

```text
12
```

---

#### POWER

```sql
SELECT POWER(2,5)
```

الناتج

```text
32
```

---

#### SQRT

الجذر التربيعي.

```sql
SELECT SQRT(81)
```

الناتج

```text
9
```

---

#### RAND

رقم عشوائي.

```sql
SELECT RAND()
```



---

### رابعًا: Conversion Functions

دي بتحول نوع البيانات.

---

#### CAST

```sql
SELECT CAST(15.8 AS INT)
```

الناتج

```text
15
```

---

#### CONVERT

نفس CAST لكن فيها خيارات أكتر.

---

#### TRY_CAST

لو التحويل فشل

مش هيطلع Error

هيرجع

```text
NULL
```

---

#### PARSE

بتحول النصوص لأرقام أو تواريخ.



---

### خامسًا: Aggregate Functions

ودي أكيد معروفة.

- SUM
    
- AVG
    
- COUNT
    
- MIN
    
- MAX
    

مثال

```sql
SELECT AVG(Salary)
FROM Employees
```

ترجع متوسط المرتبات.

ودي غالبًا بتستخدم مع `GROUP BY`.

---

### سادسًا: Logical Functions

دي بتنفع مع الشروط.

---

#### IIF

زي الـ if.

```sql
SELECT IIF(100>50,'True','False')
```

الناتج

```text
True
```

---

#### ISNULL

لو القيمة NULL.

```sql
SELECT ISNULL(NULL,'Unknown')
```

الناتج

```text
Unknown
```

---

#### COALESCE

ترجع أول قيمة مش NULL.

```sql
SELECT COALESCE(NULL,NULL,'Mahmoud')
```

الناتج

```text
Mahmoud
```

دي من أشهر الدوال في الشغل الحقيقي.

---

### ملخص الجزء الأول

احفظ التصنيف ده لأنه بيتسأل كتير:

|النوع|أمثلة|
|---|---|
|String|LEN - SUBSTRING - REPLACE - CONCAT|
|Date|GETDATE - DATEADD - DATEDIFF - FORMAT|
|Math|ABS - ROUND - CEILING - FLOOR - POWER|
|Conversion|CAST - CONVERT - TRY_CAST - PARSE|
|Aggregate|SUM - AVG - COUNT - MIN - MAX|
|Logical|IIF - ISNULL - COALESCE|

---

## يعني إيه UDF؟

هي Function **أنت اللي بتكتبها** داخل SQL Server بدل ما تعتمد على الـ Built-in Functions.

يعني بدل ما SQL يوفرلك:

```sql
LEN()
```

أو

```sql
GETDATE()
```

أنت تقدر تعمل Function خاصة بيك.

الفكرة زي C# بالظبط.

في C#

```csharp
int Square(int x)
{
    return x * x;
}
```

تستخدمها

```csharp
Square(5);
```

الناتج

```
25
```

في SQL نفس الفكرة.

---

### مثال 1

عايز Function ترجع مربع الرقم.

#### إنشاء الـ Function

```sql
CREATE FUNCTION SquareNumber
(
    @Num INT
)
RETURNS INT
AS
BEGIN
    RETURN @Num * @Num
END
```

شرحها

```sql
CREATE FUNCTION
```

يعني إنشاء Function.

```sql
SquareNumber
```

اسمها.

```sql
@Num INT
```

البارامتر.

```sql
RETURNS INT
```

هترجع Integer.

---

```sql
RETURN @Num * @Num
```

القيمة الراجعة.

---

#### الاستخدام

```sql
SELECT dbo.SquareNumber(6)
```

الناتج

```
36
```

---

### مثال 2

تحسب الضريبة.

نفترض الضريبة 14%.

```sql
CREATE FUNCTION CalculateTax
(
    @Price DECIMAL(10,2)
)
RETURNS DECIMAL(10,2)
AS
BEGIN

RETURN @Price * 0.14

END
```

الاستخدام

```sql
SELECT dbo.CalculateTax(1000)
```

الناتج

```
140
```

---

ولو السعر

```sql
500
```

يبقى

```
70
```

---

### مثال 3

ترجع Full Name

عندك

```
First Name

Last Name
```

وعايز تجمعهم.

```sql
CREATE FUNCTION FullName
(
    @First NVARCHAR(20),
    @Last NVARCHAR(20)
)

RETURNS NVARCHAR(50)

AS

BEGIN

RETURN @First + ' ' + @Last

END
```

الاستخدام

```sql
SELECT dbo.FullName('Mahmoud','Prof')
```

الناتج

```
Mahmoud Prof
```

---

### مثال 4

تحويل الحروف لـ Uppercase

```sql
CREATE FUNCTION MyUpper
(
    @Name NVARCHAR(50)
)

RETURNS NVARCHAR(50)

AS

BEGIN

RETURN UPPER(@Name)

END
```

الاستخدام

```sql
SELECT dbo.MyUpper('mahmoud')
```

الناتج

```
MAHMOUD
```

---

### مثال 5

ترجع إذا كان الرقم زوجي أو فردي

```sql
CREATE FUNCTION EvenOrOdd
(
    @Num INT
)

RETURNS NVARCHAR(10)

AS

BEGIN

IF @Num % 2 = 0

RETURN 'Even'

RETURN 'Odd'

END
```

الاستخدام

```sql
SELECT dbo.EvenOrOdd(7)
```

الناتج

```
Odd
```

---

```sql
SELECT dbo.EvenOrOdd(10)
```

الناتج

```
Even
```

---

### مثال 6

خصم 20%

```sql
CREATE FUNCTION Discount
(
    @Price MONEY
)

RETURNS MONEY

AS

BEGIN

RETURN @Price * 0.8

END
```

الاستخدام

```sql
SELECT dbo.Discount(500)
```

الناتج

```
400
```

---

### مثال 7

عندك جدول

|ID|Name|Salary|
|---|---|---|
|1|Ahmed|8000|
|2|Ali|12000|
|3|Sara|5000|

عايز تزود 10% Bonus.

تعمل Function.

```sql
CREATE FUNCTION Bonus
(
	@Salary MONEY
)

RETURNS MONEY

AS

BEGIN

RETURN @Salary * 1.10

END
```

بعدها

```sql
SELECT

Name,

Salary,

dbo.Bonus(Salary)

FROM Employees
```

الناتج

|Name|Salary|Bonus Salary|
|---|---|---|
|Ahmed|8000|8800|
|Ali|12000|13200|
|Sara|5000|5500|

لاحظ إنك استخدمت الـ Function على كل صف في الجدول.

---

### مثال 8

حساب العمر.

```sql
CREATE FUNCTION Age
(
@BirthDate DATE
)

RETURNS INT

AS

BEGIN

RETURN DATEDIFF(YEAR,@BirthDate,GETDATE())

END
```

الاستخدام

```sql
SELECT dbo.Age('2004-05-10')
```

الناتج

```
22
```

(حسب تاريخ اليوم).

---

### أنواع الـ UDF

#### 1- Scalar Function

بترجع **قيمة واحدة فقط**.

مثال

```sql
SquareNumber(5)
```

ترجع

```
25
```

وده النوع اللي استخدمناه في كل الأمثلة السابقة.

---

#### 2- Table-Valued Function (TVF)

بدل ما ترجع قيمة واحدة، بترجع **جدول كامل**.

مثال:

```sql
CREATE FUNCTION EmployeesInDepartment
(
    @Dept NVARCHAR(20)
)
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM Employees
    WHERE Department = @Dept
)
```

الاستخدام:

```sql
SELECT *
FROM dbo.EmployeesInDepartment('IT')
```

إذا كان جدول `Employees` يحتوي على:

|Name|Department|Salary|
|---|---|---|
|Ahmed|IT|9000|
|Ali|IT|8000|
|Sara|HR|7000|

فالناتج سيكون:

|Name|Department|Salary|
|---|---|---|
|Ahmed|IT|9000|
|Ali|IT|8000|

---

### الفرق بين Built-in Function و UDF

|Built-in Function|UDF|
|---|---|
|موجودة في SQL Server|أنت اللي بتكتبها|
|مثل `LEN()` و`SUM()`|مثل `SquareNumber()` و`CalculateTax()`|
|لا يمكن تعديلها|تقدر تعدلها أو تحذفها|
|عامة لكل المشاريع|خاصة باحتياجات مشروعك|

---

