---
title: "Python Revision"
aliases: []
type: source
status: active
domain: computer-science
tags: [source, computer-science, course]
created: 2026-10-07
updated: 2026-10-07
source:
related: []
---
أيوه. الملف ده بيغطي **أساسيات Python من البداية لحد مستوى كويس جدًا في الـ Functions والـ Collections والـ Scope**، فهجمعهولك كـ **cheat sheet شاملة** بنفس ترتيب الملف، مع التركيز على الحاجات اللي لازم تكون فاهمها وتحفظ شكل استخدامها.

# Python Basics — كل الأساسيات

## 1. Variables

### إنشاء Variable

في Python مش محتاج تحدد الـ type:

```python
name = "Mahmoud"
age = 22
salary = 5000.5
is_student = True
```

Python بتستنتج النوع تلقائيًا.

تقدر تعرف النوع باستخدام:

```python
type(age)
# <class 'int'>
```

### قواعد تسمية المتغيرات

صح:

```python
name = "Mahmoud"
_age = 22
student_1 = True
```

غلط:

```python
9name = "Mahmoud"
$age = 22
```

والـ names **case-sensitive**:

```python
age = 20
Age = 30

# دول متغيرين مختلفين
```

---

## 2. Multiple Assignment

تقدر تعمل:

```python
a, b, c = 1, 2, 3
```

أو:

```python
a = b = c = 10
```

وفي الحالة الثانية الثلاثة references لنفس الـ object.

```python
a = b = c = 1

b = 2

print(a)  # 1
print(b)  # 2
print(c)  # 1
```

---

# 3. Data Types

أهم الـ built-in types في الملف:

```text
bool
int
float
complex
str
list
tuple
set
dict
```

## Boolean

```python
True
False
```

المميز إن:

```python
True == 1
False == 0
```

وعشان كده:

```python
True + False
# 1

True * True
# 1
```

---

# 4. Numbers

### int

```python
x = 10
```

### float

```python
x = 10.5
```

### complex

```python
x = 100 + 10j
```

---

# 5. Strings

String ممكن تستخدم single أو double quotes:

```python
name = "Mahmoud"
name = 'Mahmoud'
```

String **immutable**، يعني مش بتغير نفس الـ string object.

وتقدر تستخدم indexing:

```python
text = "Hello"

text[0]
# H
```

و slicing:

```python
text[0:3]
# Hel
```

---

# 6. List

الـ list:

- Ordered
    
- Mutable
    
- ممكن تحتوي أنواع مختلفة
    

```python
numbers = [1, 2, 3, 4]

mixed = ["Mahmoud", 22, True, 3.5]
```

تقدر تغير عنصر:

```python
numbers[0] = 100
```

---

# 7. Tuple

الـ tuple:

- Ordered
    
- Immutable
    

```python
numbers = (1, 2, 3)
```

مش هينفع:

```python
numbers[0] = 100
```

لأن الـ tuple immutable.

### أهم فرق

```text
List  → mutable
Tuple → immutable
```

---

# 8. Set

الـ set:

- Unordered
    
- Unique values
    
- Mutable
    

```python
numbers = {1, 2, 3, 3, 4}

print(numbers)
# {1, 2, 3, 4}
```

التكرار بيتشال تلقائيًا.

إضافة:

```python
numbers.add(5)
```

---

# 9. Dictionary

الـ dictionary بيخزن:

```text
key → value
```

مثال:

```python
student = {
    "name": "Mahmoud",
    "age": 22
}
```

الوصول:

```python
student["name"]
# Mahmoud
```

الـ keys لازم تكون hashable.

ولو كررت نفس الـ key، آخر value هي اللي بتفضل:

```python
data = {
    "name": "Ali",
    "name": "Mahmoud"
}

# Mahmoud
```

---

# 10. Mutable vs Immutable

دي من أهم الحاجات.

### Mutable

ممكن تتغير بعد إنشائها:

```text
list
set
dict
bytearray
```

### Immutable

مينفعش تغير الـ object نفسه:

```text
int
float
complex
str
bytes
tuple
frozenset
```

احفظها كده:

```text
List  → Mutable
Set   → Mutable
Dict  → Mutable

String → Immutable
Tuple  → Immutable
Number → Immutable
```

---

# 11. Type Casting

تحويل النوع:

```python
x = "123"

int(x)
float(x)
```

مثال:

```python
x = "123.456"

float(x)
# 123.456
```

لكن:

```python
int("123.456")
```

تعمل:

```text
ValueError
```

أما:

```python
int(123.456)
```

فتصبح:

```text
123
```

كمان:

```python
list("hello")
```

تطلع:

```python
['h', 'e', 'l', 'l', 'o']
```

---

# 12. Input

`input()` دائمًا بترجع **string**.

```python
name = input("Enter your name: ")
```

حتى لو المستخدم كتب:

```text
10
```

فالـ Python تستقبلها كـ:

```python
"10"
```

لو عايز رقم:

```python
age = int(input("Enter age: "))
```

أو:

```python
salary = float(input("Enter salary: "))
```

---

# 13. Operators

## Arithmetic

```python
+
-
*
/
%
//
**
```

معانيهم:

```text
+   Addition
-   Subtraction
*   Multiplication
/   Division
%   Remainder
//  Floor Division
**  Power
```

مثال:

```python
10 / 3
# 3.333...

10 // 3
# 3

10 % 3
# 1

2 ** 3
# 8
```

---

# 14. Operator Precedence

Python بتمشي بترتيب الأولوية:

```text
()
**
* / // %
+ -
```

مثال:

```python
2 + 3 * 4
```

الناتج:

```text
14
```

مش:

```text
20
```

ولو عايز تغير الأولوية:

```python
(2 + 3) * 4
# 20
```

---

# 15. Comparison Operators

بتطلع `True` أو `False`:

```python
>
<
==
!=
>=
<=
```

مثال:

```python
10 > 5
# True

10 == 10
# True

10 != 5
# True
```

---

# 16. Logical Operators

```python
and
or
not
```

### and

لازم الشرطين True:

```python
age > 18 and age < 30
```

### or

يكفي شرط واحد:

```python
age < 18 or age > 60
```

### not

بيعكس القيمة:

```python
not True
# False
```

---

# 17. `is` vs `==`

دي مهمة جدًا.

### `==`

بيقارن **القيمة**:

```python
[1, 2] == [1, 2]
# True
```

### `is`

بيقارن هل الاتنين **نفس object**:

```python
x = [1, 2]
y = [1, 2]

x is y
# False
```

لأنهم objectين مختلفين رغم إن محتواهم متساوي.

---

# 18. `in` و `not in`

للـ membership:

```python
numbers = [1, 2, 3]

2 in numbers
# True

5 in numbers
# False
```

مع dictionary:

```python
data = {
    1: "a",
    2: "b"
}

1 in data
# True
```

الـ `in` في dictionary بتبحث في **keys**.

---

# 19. Comments

Single line:

```python
# This is a comment
```

Inline:

```python
x = 10  # age
```

Multi-line:

```python
"""
This is
a multiline text
"""
```

---

# 20. Docstrings

الـ docstring بتوثق function/class/module:

```python
def greet():
    """Print a greeting."""
    print("Hello")
```

وتقدر توصل لها:

```python
print(greet.__doc__)
```

الفرق الأساسي:

```text
Comment → للمبرمج
Docstring → documentation ممكن الوصول لها programmatically
```

---

# 21. if / elif / else

```python
age = 20

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")
```

مهم جدًا:

Python بتستخدم **indentation** بدل `{}`.

والـ block بيبدأ بـ `:`.

يفضل:

```python
if condition:
    statement
```

بـ 4 spaces.

---

# 22. for Loop

```python
for i in range(5):
    print(i)
```

الناتج:

```text
0
1
2
3
4
```

`range(5)` لا تشمل 5.

تقدر تعمل loop على list:

```python
names = ["Ali", "Omar", "Mahmoud"]

for name in names:
    print(name)
```

أو string:

```python
for char in "Hello":
    print(char)
```

---

# 23. `break`

بتخرج من الـ loop فورًا:

```python
for i in range(10):
    if i == 5:
        break

    print(i)
```

الناتج:

```text
0
1
2
3
4
```

---

# 24. `continue`

بتتخطى iteration الحالية وتكمل:

```python
for i in range(5):
    if i == 2:
        continue

    print(i)
```

الناتج:

```text
0
1
3
4
```

---

# 25. Nested Loops

Loop داخل loop:

```python
for i in range(3):
    for j in range(3):
        print(i, j)
```

مهم:

`break` بيكسر **الـ loop اللي موجود جواه فقط**.

لو عايز تخرج من function بالكامل، `return` بيخرج من الـ function.

---

# 26. Loop `else`

Python عندها حاجة مميزة:

```python
for i in range(3):
    print(i)
else:
    print("Done")
```

الـ `else` بتشتغل لو الـ loop خلصت **طبيعي**.

لكن لو:

```python
break
```

حصل، الـ `else` مش بتشتغل.

---

# 27. List Methods

أهم methods:

```python
append()
extend()
index()
insert()
pop()
remove()
reverse()
sort()
count()
len()
clear()
```

مثال:

```python
numbers = [1, 2, 3]

numbers.append(4)
# [1, 2, 3, 4]
```

```python
numbers.pop()
```

يشيل ويرجع آخر عنصر.

```python
numbers.remove(2)
```

يشيل أول occurrence للقيمة 2.

```python
numbers.sort()
```

يرتب الـ list.

---

# 28. Indexing

```python
numbers = [10, 20, 30, 40]
```

```python
numbers[0]
# 10

numbers[1]
# 20
```

Negative indexing:

```python
numbers[-1]
# 40

numbers[-2]
# 30
```

---

# 29. Slicing

الصيغة:

```python
[start:end:step]
```

مثال:

```python
numbers = [1, 2, 3, 4, 5]
```

```python
numbers[1:4]
# [2, 3, 4]
```

```python
numbers[:3]
# [1, 2, 3]
```

```python
numbers[2:]
# [3, 4, 5]
```

كل العناصر:

```python
numbers[:]
```

كل عنصرين:

```python
numbers[::2]
```

عكس الـ list:

```python
numbers[::-1]
```

---

# 30. List Comprehension

طريقة مختصرة لإنشاء list.

بدل:

```python
squares = []

for x in range(5):
    squares.append(x * x)
```

تكتب:

```python
squares = [x * x for x in range(5)]
```

الناتج:

```python
[0, 1, 4, 9, 16]
```

وتقدر تحط condition:

```python
even = [x for x in range(10) if x % 2 == 0]
```

---

# 31. Set Operations

لو:

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
```

### Intersection

العناصر المشتركة:

```python
a & b
```

أو:

```python
a.intersection(b)
```

الناتج:

```text
{3, 4}
```

### Union

كل العناصر:

```python
a | b
```

أو:

```python
a.union(b)
```

### Symmetric Difference

العناصر الموجودة في واحد فقط:

```python
a ^ b
```

---

# 32. Set Membership

```python
s = {1, 2, 3}

2 in s
# True
```

Methods:

```python
add()
discard()
remove()
```

الفرق المهم:

```python
s.discard(5)
```

لو 5 مش موجودة → عادي.

لكن:

```python
s.remove(5)
```

لو مش موجودة → `KeyError`.

---

# 33. Dictionary Methods

```python
student = {
    "name": "Mahmoud",
    "age": 22
}
```

### keys

```python
student.keys()
```

### values

```python
student.values()
```

### items

```python
student.items()
```

والـ items بتدي:

```text
key, value
```

---

# 34. Dictionary Comprehension

زي الـ list comprehension لكن dictionary:

```python
numbers = {
    x: x * 2
    for x in range(5)
}
```

الناتج:

```python
{
    0: 0,
    1: 2,
    2: 4,
    3: 6,
    4: 8
}
```

ممكن condition:

```python
squares = {
    x: x ** 2
    for x in range(10)
    if x % 2 == 0
}
```

---

# 35. Functions

تعريف function:

```python
def greet():
    print("Hello")
```

استدعاء:

```python
greet()
```

Function parameters:

```python
def greet(name):
    print("Hello", name)

greet("Mahmoud")
```

Default parameter:

```python
def greet(name="Mahmoud"):
    print("Hello", name)
```

لو مديتش argument:

```python
greet()
```

هيستخدم `"Mahmoud"`.

---

# 36. `return`

`return` بترجع قيمة وبتنهي الـ function فورًا.

```python
def add(a, b):
    return a + b
```

```python
result = add(3, 5)

print(result)
# 8
```

لو function مفيهاش `return`:

```python
def hello():
    print("Hello")
```

فالـ return value ضمنيًا:

```python
None
```

---

# 37. Returning Multiple Values

تقدر تعمل:

```python
def get_numbers():
    return 10, 20
```

Python فعليًا بترجع tuple:

```python
a, b = get_numbers()
```

---

# 38. `*args`

لما مش عارف عدد الـ positional arguments:

```python
def add(*args):
    print(args)
```

استدعاء:

```python
add(1, 2, 3, 4)
```

`args` عبارة عن tuple:

```python
(1, 2, 3, 4)
```

---

# 39. `**kwargs`

للـ keyword arguments:

```python
def show(**kwargs):
    print(kwargs)
```

```python
show(
    name="Mahmoud",
    age=22
)
```

الـ `kwargs` عبارة عن dictionary:

```python
{
    "name": "Mahmoud",
    "age": 22
}
```

احفظ:

```text
*args    → tuple
**kwargs → dictionary
```

---

# 40. Inner Functions

ممكن تعرف function داخل function:

```python
def outer():
    
    def inner():
        print("Hello")

    inner()
```

والـ inner function ممكن توصل للـ variables الموجودة في الـ outer function.

---

# 41. Closure

مثال:

```python
def outer(name):

    def inner():
        print(name)

    return inner
```

بعد كده:

```python
my_function = outer("Mahmoud")

my_function()
```

هتطبع:

```text
Mahmoud
```

حتى بعد ما `outer()` خلصت.

السبب إن الـ inner function احتفظت بالـ variable من الـ enclosing scope.

---

# 42. Lambda

Lambda هي function صغيرة anonymous:

```python
lambda arguments: expression
```

مثال:

```python
square = lambda x: x * x

square(5)
# 25
```

مثال:

```python
upper = lambda s: s.upper()
```

---

# 43. `map()`

بتطبق function على كل عنصر:

```python
numbers = [1, 2, 3]

result = map(
    lambda x: x * 2,
    numbers
)

print(list(result))
```

الناتج:

```text
[2, 4, 6]
```

---

# 44. `filter()`

بتحتفظ بالعناصر اللي الشرط عليها `True`:

```python
numbers = [1, 2, 3, 4, 5]

result = filter(
    lambda x: x > 3,
    numbers
)

print(list(result))
```

الناتج:

```text
[4, 5]
```

---

# 45. `reduce()`

بتجمع العناصر في قيمة واحدة.

محتاج:

```python
from functools import reduce
```

مثال:

```python
numbers = [1, 2, 3, 4]

total = reduce(
    lambda a, x: a + x,
    numbers
)
```

الناتج:

```text
10
```

---

# 46. `sorted()` + Lambda

ممكن تحدد طريقة الترتيب:

```python
numbers = [3, -4, -2, 5, 1]

sorted(
    numbers,
    key=lambda x: abs(x)
)
```

يعني رتب بناءً على الـ absolute value.

---

# 47. Variable Scope

دي مهمة جدًا.

## Local Variable

```python
def foo():
    x = 5
```

`x` موجودة داخل function فقط.

```python
foo()

print(x)
```

هيحصل:

```text
NameError
```

---

# 48. Global Variable

```python
x = "Hi"

def test():
    print(x)
```

هنا function تقدر تقرأ الـ global variable.

لكن لو عملت assignment داخل function:

```python
x = "Hi"

def test():
    x = "Bye"
```

دي `x` جديدة local، ومش بتغير الـ global.

---

# 49. `global`

لو عايز تغير الـ global variable:

```python
x = "Hi"

def change():
    global x
    x = "Bye"
```

بعد:

```python
change()

print(x)
```

الناتج:

```text
Bye
```

---

# 50. `nonlocal`

بتستخدم داخل nested functions.

```python
def counter():

    num = 0

    def increment():
        nonlocal num
        num += 1
        return num

    return increment
```

ثم:

```python
c = counter()

c()
# 1

c()
# 2
```

`nonlocal` معناها إن `num` موجودة في الـ enclosing function.

---

# 51. Scope Rules

الـ Python بتدور على الـ variable تقريبًا بالترتيب:

```text
Local
Enclosing
Global
Built-in
```

ولو شفت:

```python
global x
```

فـ `x` global.

ولو:

```python
nonlocal x
```

فـ `x` من enclosing function.

ولو:

```python
x = 5
```

داخل function فهي local افتراضيًا.

---

# 52. `del`

تقدر تحذف name:

```python
x = 5

del x
```

بعدها:

```python
print(x)
```

هيطلع:

```text
NameError
```

---