
# Semantic Analysis 

> بعد ما الـ Parser يتأكد إن البرنامج مكتوب Syntax صح، إيه اللي بيحصل بعد كده؟

الإجابة هي:

**Semantic Analysis (التحليل الدلالي)**

---

# أولاً: ما هو Semantic Analysis ؟

الـ Parser بيتأكد إن الجملة مكتوبة صح نحوياً (Syntax).

مثال:

```c
int x;
x = 5 + 3;
```

الجملة دي Syntax صحيح.

لكن لو كتبت:

```c
int x;
x = "Hello";
```

الجملة Syntax صحيحة برضو.

لكن هل ينفع نحط String داخل Integer ؟

لا.

هنا يظهر دور:

**Semantic Analysis**

اللي بيتحقق من معنى البرنامج وليس شكله فقط.

---

# وظائف Semantic Analysis

يقوم بـ:

### 1) Symbol Table Construction

بناء جدول الرموز.

مثال:

```c
int x;
float y;
```

يحفظ:

|Name|Type|
|---|---|
|x|int|
|y|float|

---

### 2) Type Checking

يتأكد أن الأنواع متوافقة.

مثال:

```c
int x;
x = 5;
```

صحيح.

أما:

```c
int x;
x = "abc";
```

خطأ.

---

### 3) Type Inference

استنتاج الأنواع.

مثال:

```c
var x = 10;
```

الكمبايلر يستنتج أن x من نوع int.

---

# أنواع Semantic Analysis

يوجد نوعان:

## Static Semantic Analysis

يتم أثناء Compilation.

مثال:

```c
int x;
x = 10;
```

فحص النوع.

---

## Dynamic Semantic Analysis

يتم أثناء Execution.

مثل لغة:

- Lisp
- Python
    

لأن الأنواع قد تتغير أثناء التشغيل.

---

# Attribute

## ما هو Attribute ؟

أي خاصية مرتبطة بعنصر في اللغة.

مثل:

```c
int x;
```

للـ x عدة Attributes:

- Type
- Memory Location
- Scope
    

---

# Binding

## ما هو Binding ؟

ربط قيمة الـ Attribute بالعنصر.

مثال:

```c
int x;
```

ربط:

```text
x.type = int
```

---

# Binding Time

يعني:

**متى يتم تحديد قيمة الـ Attribute؟**

---

## Static Attribute

يتحدد ==قبل التشغيل==.

مثل:

```c
int x;
```

نوع x معروف أثناء Compilation.

---

## Dynamic Attribute

يتحدد أثناء التشغيل.

مثال:

```python
x = 10
x = "hello"
```

نوع x يتغير أثناء التنفيذ.

---

# أمثلة مهمة جداً

## Data Type

في C

```c
int x;
```

النوع معروف أثناء الترجمة.

إذن:

Static Attribute

---

## Expression Value

```c
a + b
```

القيمة لا تعرف إلا أثناء التشغيل.

إذن:

Dynamic Attribute

---
## Constant Folding

أحياناً يمكن حساب القيمة أثناء Compilation.

مثال:

```c
5 + 3
```

الكمبايلر يحولها إلى:

```c
8
```

مباشرة.

---

## Variable Allocation

تخصيص الذاكرة.
قد يكون:

- Static
- Dynamic
    
حسب اللغة.

---

# Attribute Grammars


## الفكرة

بدلاً من كتابة:

Grammar فقط

نضيف:

Attributes + Rules

فتصبح:

Attribute Grammar

---

الصيغة:

```text
X.a
```

تعني:

Attribute a الخاصة بالرمز X

مثال:

```text
digit.val
```

قيمة الرقم.

---

# Syntax Directed Semantics

المعنى يعتمد على قواعد الـ Grammar.

مثال:

```text
E → E + T
```

إذن:

```text
E.val = E.val + T.val
```

---

# Example 1 : Number Value

Grammar:

```text
Number → Number Digit
Number → Digit
```

---
نريد حساب:

```text
345
```

القواعد:

```text
Number1 → Number2 Digit

Number1.val =
Number2.val * 10 + Digit.val
```

---
مثال:

## أولا

```text
3
```

```text
val = 3
```
## ثم

```text
34
```

```text
3 * 10 + 4
= 34
```

---

## ثم

```text
345
```

```text
34 * 10 + 5
= 345
```

---

# Example 2 : Arithmetic Expressions

Grammar:

```text
Exp → Exp + Term
Exp → Exp - Term
Exp → Term

Term → Term * Factor
Term → Factor

Factor → (Exp)
Factor → Number
```

---

Attribute:

```text
val
```

---

القواعد:

جمع:

```text
Exp1.val =
Exp2.val + Term.val
```

طرح:

```text
Exp1.val =
Exp2.val - Term.val
```

---

ضرب:

```text
Term1.val =
Term2.val * Factor.val
```

---

# مثال

```text
(34-3)*42
```

---

أولاً:

```text
34-3 = 31
```

ثم:

```text
31 * 42 = 1302
```

إذن:

```text
Exp.val = 1302
```

---

# Example 3 : Variable Declarations

Grammar:

```text
Decl → Type VarList

Type → int
Type → float

VarList → id , VarList
VarList → id
```

---

نفترض:

```c
float x,y;
```

---

نريد نقل النوع:

```text
float
```

إلى:

```text
x
y
```

---

القواعد:

```text
Type.dtype = real
```

```text
VarList.dtype =
Type.dtype
```

```text
Id.dtype =
VarList.dtype
```
النتيجة:
```text
x.dtype = real
y.dtype = real
```

---
# Example 4 : Octal and Decimal Numbers

لدينا:

```text
345o
```

o تعني Octal

أو:

```text
345d
```

Decimal

---

هنا احتجنا Attribute إضافي:

```text
base
```
إذا:

```text
o
```

فـ

```text
base = 8
```

---

إذا:

```text
d
```

فـ

```text
base = 10
```

القيمة تحسب كالآتي:

```text
345o

3*8² + 4*8 + 5
=
192 + 32 + 5
=
229
```

إذن:

```text
345o = 229
```

---
# Simplifications

بدلاً من:
Parse Tree

يمكن استخدام:

Abstract Syntax Tree (AST)

لأن الـ AST يحذف الأشياء غير المهمة مثل:

```text
(
)
;
```
ويحتفظ فقط بالعناصر المهمة.

---

مثال:

```text
(34-3)*42
```

AST تصبح:

```text
       *
      / \
     -   42
    / \
  34   3
```
أسهل وأسرع.

---

# بناء AST باستخدام Attribute Grammar

Attribute جديد:

```text
tree
```


مثال:

```text
E → E + T
```

ننشئ Node:

```text
mkOpNode(+)
```

مثال:

```text
42
```

ننشئ:

```text
mkNumNode(42)
```

---

# Algorithms for Attribute Computation

السؤال الآن:

كيف نحسب Attributes ؟

---

# Dependency Graph

فكر فيها كأنها:
Graph 
يوضح من يعتمد على من.

---

مثال:

```text
Number1.val =
Number2.val *10 + Digit.val
```

إذن:

```text
Number1.val
```

يعتمد على:

```text
Number2.val
Digit.val
```

---

الرسم:

```text
Number2.val ----\
                 > Number1.val
Digit.val -------/
```

---

لا يمكن حساب:

```text
Number1.val
```

قبل حساب:

```text
Number2.val
```

و

```text
Digit.val
```

---

# Topological Sort

ترتيب الحسابات بحيث:
كل Attribute تحسب بعد المتغيرات التي تعتمد عليها.

مثال:

```text
A -> B -> C
```

الترتيب:

```text
A
B
C
```

---

# DAG

Dependency Graph يجب أن يكون:

```text
Directed Acyclic Graph
```

أي:

لا يحتوي Cycles.

لو يوجد Cycle:

```text
A يعتمد على B
B يعتمد على A
```

لن نستطيع الحساب.

---

# Synthesized Attributes

أهم سؤال في الامتحان.

التعريف:

Attribute 
تنتقل من الأبناء إلى الأب.

مثال:

```text
E → E + T
```

```text
E.val =
E.val + T.val
```

القيم تأتي من الأطفال للأب.

---

الرسم:

```text
child -> parent
```

---

## S-Attributed Grammar

إذا كانت كل Attributes من النوع Synthesized

نسميها:

```text
S-Attributed Grammar
```

---

# حسابها

نستخدم:

Post-order Traversal

أي:

1. احسب الأبناء
2. ثم الأب
    

مثال:

```text
      *
     / \
    5   3
```

نحسب:

```text
5
3
```

ثم:

```text
5*3
```

---

# Inherited Attributes

النوع الثاني.

التعريف:

Attribute تأتي من:

- Parent
- أو Sibling
    

---

مثال:

```text
float x,y
```

النوع:

```text
float
```

ينتقل من:

```text
Type
```

إلى:

```text
x
y
```

---

الرسم:

```text
Parent
  ↓
Child
```

أو:

```text
Sibling → Sibling
```

---

# حسابها

عادة باستخدام:

```text
Preorder Traversal
```

أي:

1. احسب الأب
2. ثم الأبناء
    

---

# الفرق النهائي بين Synthesized و Inherited

|Synthesized|Inherited|
|---|---|
|Child → Parent|Parent → Child|
|Bottom-Up|Top-Down|
|Postorder Traversal|Preorder Traversal|
|أسهل في التنفيذ|أصعب قليلاً|

---
