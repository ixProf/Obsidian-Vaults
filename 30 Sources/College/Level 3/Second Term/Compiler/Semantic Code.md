---
title: "Semantic Code"
aliases: []
type: source
status: active
domain: computer-science
tags: [source, computer-science, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


```text
Scanner → Parser → Semantic Analyzer
```

- **Scanner**: بيقسم الكود لـ tokens
    
- **Parser**: بيتأكد من الـ syntax ويبني AST
    
- **Semantic Analyzer**: بيتأكد إن **المعنى** صح
    

يعني مثلًا:

```text
x = 10
```

دي:

- Scanner: يشوفها توكنز
    
- Parser: يقول آه دي Assignment
    
- Semantic: يقول تمام، `x` نوعها number
    

لكن مثلًا:

```text
x = y + 1
```

لو `y` مش متعرفة:

- الـ Parser غالبًا هيعديها عادي
    
- **Semantic** هيقول: لا، فيه مشكلة، `y` undeclared
    

---

# أول سطر

```python
from dataclasses import dataclass
```

## ده معناه إيه؟

إحنا بنستورد `dataclass` من بايثون.

## ليه؟

علشان نعمل class بسيطة تخزن بيانات من غير ما نكتب constructor طويل.

يعني بدل ما نكتب:

```python
class SymbolInfo:
    def __init__(self, name, data_type, kind, scope_level):
        self.name = name
        self.data_type = data_type
        self.kind = kind
        self.scope_level = scope_level
```

نستخدم `@dataclass` وتعمل ده تلقائي.

---

# الجزء ده

```python
class SemanticError(Exception):
    pass
```

## يعني إيه؟

إحنا عملنا نوع Error خاص بينا اسمه `SemanticError`.

## ليه؟

علشان لو حصلت مشكلة semantic زي:

- متغير اتعرف مرتين
    
- redeclaration
    

يبقى عندنا Exception مخصوص للسيمانتيك.

## ليه مش استخدمنا Exception العادي؟

ينفع، لكن وجود `SemanticError` بيخلّي:

- الكود أوضح
    
- لما المعيد يسألك تقول: أنا عامل Custom Exception مخصوص لأخطاء السيمانتيك
    

---

# الجزء ده

```python
@dataclass
class SymbolInfo:
    name: str
    data_type: str
    kind: str
    scope_level: int
```

## ده إيه؟

ده **كلاس بيمثل صف واحد في الـ Symbol Table**

يعني كل متغير أو رمز عندي، بحفظ عنه بيانات.

## يعني إيه Symbol أصلًا؟

Symbol يعني identifier، يعني اسم له معنى في البرنامج، زي:

- variable name
    
- function name
    
- constant name
    

في لغتك حاليًا أغلبها variables

---

## الحقول دي معناها إيه؟

### `name`

اسم الرمز نفسه

مثال:

```text
x
enemy
score
```

---

### `data_type`

نوعه

مثال:

- `number`
    
- `bool`
    
- `string`
    

---

### `kind`

ده بيقول الرمز ده إيه بالظبط

مثال:

- variable
    
- function
    
- parameter
    

في كودك أنت حاليًا غالبًا كله `variable`

---

### `scope_level`

الرمز ده موجود في أنهي scope

مثال:

- global scope = 0
    
- داخل if = 1
    
- داخل block جوه block = 2
    

---

## يعني لو عندي:

```text
x = 10
```

ممكن SymbolInfo تبقى كده:

```text
name = x
data_type = number
kind = variable
scope_level = 0
```

---

# ندخل على `SymbolTable`

```python
class SymbolTable:
```

## دي إيه؟

دي الكلاس المسؤولة عن تخزين كل الرموز في البرنامج.

السلايد كانت بتقول إن Symbol Table هي زي:

- address book
- ledger
- metadata store
    

وده بالظبط اللي الكلاس دي بتعمله.

---

# `__init__`

```python
def __init__(self):
    self.table = {}          # name → stack of SymbolInfo
    self.scope_stack = []    # variables per scope
```

## أول متغير: `self.table`

ده الـ **main storage**

هو dictionary

### شكله عامل إزاي؟

المفتاح = اسم المتغير  
القيمة = stack من `SymbolInfo`

يعني مثلًا ممكن يبقى:

```python
{
    "x": [SymbolInfo(...), SymbolInfo(...)],
    "y": [SymbolInfo(...)]
}
```

---

## ليه `stack of SymbolInfo` لكل اسم؟

علشان لو نفس الاسم اتكرر في scope مختلف

مثال:

```text
x = 10
if condition:
    x = 20
```

هنا فيه احتمال يبقى عندك `x` قديمة و `x` جديدة

فبدل ما نخزن واحدة فقط، نخزن stack:

- القديمة تحت
- الجديدة فوق

ولما نطلع من الـ scope، نشيل اللي فوق

وده بيساعد في فكرة اسمها **shadowing**

---

## ثاني متغير: `self.scope_stack`

ده stack بيمثل الـ scopes نفسها

كل عنصر فيه عبارة عن list بأسماء المتغيرات اللي اتعرفت في الـ scope دي

مثال:

```python
[
    ["x", "y"],   # global scope
    ["z"]         # if scope
]
```

---

## ليه عندنا بنيتين؟

سؤال مهم جدًا والمعيد ممكن يسأله

### `table`

علشان الـ lookup يبقى سريع

### `scope_stack`

علشان لما نخرج من scope نعرف نشيل مين

يعني:

- `table` = للوصول السريع
- `scope_stack` = لإدارة الدخول والخروج من الـ scope


---

# `push_scope`

```python
def push_scope(self):
    self.scope_stack.append([])
```

## معناها إيه؟

لما ندخل scope جديد، نضيف list فاضية

## يعني إيه scope؟

scope = النطاق اللي المتغير يبقى فيه visible

مثال:

```text
if x > 5:
    y = 10
```

هنا:

- `y` المفروض تبقى مرئية جوه الـ if بس
    

---

## لما نعمل `push_scope()`

إحنا بنقول:

- بدأنا block جديد
    
- أي متغير هيتعرف من اللحظة دي، يبقى تابع للـ scope الجديدة
    

---

## مثال

قبل:

```python
scope_stack = [
    ["x", "y"]
]
```

بعد `push_scope()`:

```python
scope_stack = [
    ["x", "y"],
    []
]
```

يعني دخلنا scope جديدة

---

# `pop_scope`

```python
def pop_scope(self):
    if not self.scope_stack:
        return
```

## السطر ده معناه إيه؟

لو مفيش scopes أصلًا، متعملش حاجة

---

## بعد كده

```python
for name in self.scope_stack.pop():
    self.table[name].pop()
    if not self.table[name]:
        del self.table[name]
```

## نشرحها واحدة واحدة

### `self.scope_stack.pop()`

بتشيل **آخر scope** دخلناها

يعني لو كان عندك:

```python
[
    ["x", "y"],
    ["z", "w"]
]
```

بعد `pop()`:

- ترجع `["z", "w"]`
    
- ويبقى stack:
    

```python
[
    ["x", "y"]
]
```

---

### `for name in ...`

إحنا بنمشي على كل اسم اتعرف في الـ scope اللي خرجنا منها

مثلًا:

- `z`
    
- `w`
    

---

### `self.table[name].pop()`

بنمسح **آخر تعريف** للاسم ده من الـ table

مثلًا لو:

```python
"x": [global_x, local_x]
```

لما نخرج من الـ local scope:

- نشيل `local_x`
    
- فيفضل:
    

```python
"x": [global_x]
```

---

### `if not self.table[name]: del self.table[name]`

لو بعد المسح ما بقاش فيه أي تعريف للاسم ده، نحذفه خالص من الـ table

مثال:

```python
"z": [local_z]
```

بعد `pop()`:

```python
"z": []
```

فنشيل `"z"` من القاموس كله

---

## الخلاصة

`pop_scope()` معناها:

- أنا خرجت من block
    
- إذًا أي variables اتعرفت فيه لازم تختفي
    

---

# `declare`

```python
def declare(self, name, data_type, kind="variable"):
```

## دي بتعمل إيه؟

بتعلن عن identifier جديد

يعني:

- تضيفه للـ symbol table
    
- وتربطه بالنوع بتاعه
    

---

## أول جزء

```python
if name not in self.table:
    self.table[name] = []
```

## معناه

لو الاسم ده أول مرة يظهر، اعمله stack فاضية

مثال:  
لو `x` أول مرة تظهر:

```python
self.table["x"] = []
```

---

## بعد كده

```python
if self.scope_stack:
    if name in self.scope_stack[-1]:
        raise SemanticError(f"Multiple declaration of '{name}'")
```

## دي نقطة مهمة جدًا

### `self.scope_stack[-1]`

ده آخر scope، يعني الـ current scope

### `if name in self.scope_stack[-1]`

يعني: هل الاسم ده already declared في نفس الـ scope؟

لو آه → Error

---

## ليه؟

علشان تمنع redeclaration في نفس scope

مثال:

```text
x = 10
x = 20
```

في design بعض اللغات ده update عادي، لكن هنا لو أنت بتعامل أول assignment كـ declaration فالسلوك لازم يبقى واضح.

في كودك الحالي، **الـ declare** نفسها تمنع التكرار لو اتطلب منها تعلن عن نفس الاسم في نفس الـ scope.

---

## بعد كده

```python
info = SymbolInfo(name, data_type, kind, len(self.scope_stack) - 1)
```

## معناها

إحنا بنبني object جديد فيه معلومات الرمز

### `len(self.scope_stack) - 1`

ده scope level الحالي

مثال:

- لو عندك scope واحدة بس → level = 0
    
- لو دخلت scope جديدة → level = 1
    

---

## بعد كده

```python
self.table[name].append(info)
```

بنضيف التعريف الجديد على stack الخاصة بالاسم ده

يعني:

- أحدث تعريف يبقى فوق
    

---

## بعد كده

```python
if self.scope_stack:
    self.scope_stack[-1].append(name)
```

ده معناه:

- سجّل إن الاسم ده اتعرف في الـ current scope
    

علشان لما نطلع من scope نعرف نمسحه

---

## في الآخر

```python
return info
```

بيرجع الـ metadata اللي أنشأناها

---

## إذًا `declare` مسؤولة عن:

1. إنشاء مكان للاسم لو أول مرة
    
2. منع التكرار في نفس الـ scope
    
3. إنشاء SymbolInfo
    
4. إضافته للـ table
    
5. ربطه بالـ current scope
    

---

# `lookup`

```python
def lookup(self, name):
    if name in self.table and self.table[name]:
        return self.table[name][-1]
    return None
```

وده من أهم الأجزاء اللي سألت عليه.

## يعني إيه lookup؟

`lookup` يعني:  
**أدوّر على اسم وأجيب أحدث تعريف صالح ليه**

يعني لو عندي اسم زي `x`، أنا مش عايز أي `x` وخلاص  
أنا عايز الـ `x` اللي visible دلوقتي

---

## ليه أحدث تعريف؟

علشان لو فيه shadowing

مثال:

```text
x = 10
if condition:
    x = 20
```

جوه الـ if:

- الـ `x` الصح هي الجديدة (`20`)
    
- مش القديمة
    

فإحنا مخزنين stack، وآخر عنصر فيها هو اللي visible حاليًا

---

## `self.table[name][-1]`

دي معناها:  
هات آخر عنصر من stack الاسم ده

وده بيخلي الـ lookup سريع جدًا: **O(1)**

---

## ليه O(1) مهمة؟

السلايد أصلًا نبهت إن الـ symbol table لازم تبقى سريعة جدًا.

لأن الـ compiler كل شوية بيحتاج يدور على identifiers، فلو الـ lookup بطيئة المشروع كله هيبقى أبطأ.

---

## لو الاسم مش موجود

ترجع `None`

وده معناه:

- undeclared identifier
    

---

## مثال عملي

لو:

```python
self.table = {
    "x": [info_global_x, info_local_x],
    "y": [info_y]
}
```

### `lookup("x")`

ترجع `info_local_x`

### `lookup("y")`

ترجع `info_y`

### `lookup("z")`

ترجع `None`

---

# `exists_in_current_scope`

```python
def exists_in_current_scope(self, name):
    if not self.scope_stack:
        return False
    return name in self.scope_stack[-1]
```

## دي بتعمل إيه؟

بتقولك:  
هل الاسم موجود **في الـ scope الحالية فقط**؟

---

## الفرق بينها وبين `lookup`

### `lookup`

تدور في كل scopes المتاحة حاليًا

### `exists_in_current_scope`

تبص في scope الحالية بس

---

## ليه ده مهم؟

علشان تفرق بين:

- الاسم موجود من قبل في أي scope
    
- ولا موجود بالفعل في نفس المكان اللي أنا واقف فيه
    

وده مهم في اكتشاف redeclaration

---

# `dump`

```python
def dump(self):
    result = []
    for name, stack in self.table.items():
        for info in stack:
            result.append({
                "name": info.name,
                "type": info.data_type,
                "kind": info.kind,
                "scope": info.scope_level
            })
    return result
```

## دي بتعمل إيه؟

بتحول الـ symbol table لصيغة سهلة للطباعة أو العرض

يعني بدل ما يكون عندك objects معقدة، ترجعهالك كـ list of dictionaries

---

## ليه بنحتاجها؟

علشان:

- تطبع الـ symbol table في الآخر
- تعرضها في `main.py`
- أو تحفظها في ملف
    

---

# ندخل على `SemanticAnalyzer`

```python
class SemanticAnalyzer:
```

دي الكلاس الأساسية اللي بتمشي على الـ AST وتعمل التحقق السيمانتيكي

---

# `__init__`

```python
def __init__(self):
    self.symbol_table = SymbolTable()
    self.symbol_table.push_scope()  # global scope
    self.errors = []
```

## أول حاجة

أنشأنا symbol table

---

## ثاني حاجة

عملنا:

```python
self.symbol_table.push_scope()
```

يعني:

- من أول ما البرنامج يبدأ، عندنا global scope
    

وده منطقي، لأن أي برنامج بيبدأ غالبًا بنطاق عام

---

## ثالث حاجة

`self.errors = []`

دي list نجمع فيها كل الأخطاء السيمانتيكية

بدل ما أول ما نلاقي error نوقف  
إحنا بنسجل errors ونكمل

وده بيخلي الناتج أحسن للمستخدم

---

# `command_signatures`

```python
self.command_signatures = {
    "drop": (0, 1),
    "ranked": (0, 0),
    ...
}
```

## دي إيه؟

دي rules للأوامر built-in في لغتك

كل command مرتبطة بـ tuple:

```python
(min_args, max_args)
```

---

## مثال

```python
"drop": (0, 1)
```

يعني:

- `drop()` صح
    
- `drop(x)` صح
    
- `drop(x, y)` غلط
    

---

## مثال

```python
"ranked": (0, 0)
```

يعني لازم من غير أي arguments

---

## ليه محتاجينها؟

علشان الـ semantic phase تتحقق من:

- هل اسم الأمر معروف؟
    
- وهل عدد الـ arguments صح؟
    

وده بديل مناسب لفكرة **function signature matching** اللي السلايد ذكرتها.

---

# `analyze`

```python
def analyze(self, ast):
    self.visit(ast)
    return {
        "success": len(self.errors) == 0,
        "errors": self.errors,
        "symbols": self.symbol_table.dump()
    }
```

## دي نقطة البداية

الـ `main.py` بينادي:

```python
semantic.analyze(ast)
```

## بتعمل إيه؟

1. تزور الـ AST كلها
2. تجمع الأخطاء
3. ترجع نتيجة نهائية
    

---

## `success`

لو مفيش أخطاء → `True`

## `errors`

list بالأخطاء

## `symbols`

نسخة من symbol table

---

# `error`

```python
def error(self, message):
    self.errors.append(message)
```

## بسيطة جدًا

بتضيف رسالة خطأ للـ list

---

## ليه عملنا function؟

بدل ما كل شوية نكتب:

```python
self.errors.append(...)
```

خلاص نعمل wrapper صغيرة

وكمان لاحقًا لو حبيت تضيف line number أو formatting هتغير في مكان واحد

---

# `visit`

```python
def visit(self, node):
    if node is None:
        return None
```

## لو node فاضية

مترجعش خطأ، بس رجّع `None`

---

```python
if not isinstance(node, tuple):
    self.error(f"Invalid AST node: {node}")
    return None
```

## ليه؟

لأن تصميم الـ AST عندك مبني على tuples

مثال:

```python
("Assign", "x", expr)
("Number", "10")
```

فلو وصلت حاجة مش tuple، غالبًا الـ AST فيها مشكلة

---

## بعد كده

```python
node_type = node[0]
```

أول عنصر في الـ tuple هو نوع الـ node

مثال:

```python
("Assign", "x", ...)
```

يبقى `node_type = "Assign"`

---

## بعد كده

```python
method_name = f"visit_{node_type}"
method = getattr(self, method_name, self.generic_visit)
return method(node)
```

## دي فكرة مهمة جدًا

إحنا بنعمل **dynamic dispatch**

يعني:

- لو node نوعها `Assign`
    
- يروح يشوف: هل فيه method اسمها `visit_Assign`؟
    
- لو موجودة، يناديها
    
- لو مش موجودة، ينادي `generic_visit`
    

---

## ليه عملنا كده؟

علشان كل نوع node يبقى له logic مختلف

مثلًا:

- `Assign` ليها logic
    
- `If` ليها logic
    
- `BinOp` ليها logic
    

---

# `visit_String`

```python
def visit_String(self, node):
    return "string"
```

## دي بتعمل إيه؟

لو الـ AST فيها literal string، نوعها يبقى `string`

مثال:

```python
("String", "hello")
```

يرجع:

```text
string
```

---

# `generic_visit`

```python
def generic_visit(self, node):
    self.error(f"No semantic handler for node type '{node[0]}'")
    return None
```

## معناها

لو في node نوعها مش متغطية في السيمانتيك  
نسجل error

---

## ليه ده مفيد؟

علشان لو بعدين أضفت في الـ parser node جديدة، ونسيّت تضيف semantic handler ليها، تعرف فورًا

---

# `visit_Program`

```python
def visit_Program(self, node):
    _, statements = node
    for stmt in statements:
        self.visit(stmt)
```

## شكل الـ Program node

غالبًا كده:

```python
("Program", [stmt1, stmt2, stmt3])
```

---

## السطر ده

```python
_, statements = node
```

يعني:

- تجاهل أول عنصر (`"Program"`)
    
- وخد الـ statements list
    

---

## بعد كده

يمشي على كل statement ويحللها

---

## معناها المنطقي

البرنامج كله عبارة عن مجموعة statements  
فأنا كـ semantic analyzer لازم أراجعهم واحد واحد

---

# `visit_Assign`

```python
def visit_Assign(self, node):
    _, name, expr = node
```

## شكل الـ Assign node

مثال:

```python
("Assign", "x", ("Number", "10"))
```

---

## أول حاجة

```python
expr_type = self.visit(expr)
```

إحنا بنسأل:  
نوع الـ expression اللي على اليمين إيه؟

### مثال

لو:

```python
("Number", "10")
```

هيبقى النوع:

```text
number
```

لو:

```python
("Boolean", "ALIVE")
```

هيبقى:

```text
bool
```

---

## بعد كده

```python
if expr_type is None:
    return None
```

لو التعبير نفسه فيه مشكلة، خلاص متكملش

مثال:  
لو expression فيها identifier مش متعرف، النوع هيرجع `None`

---

## بعد كده

```python
existing = self.symbol_table.lookup(name)
```

### هنا بنعمل إيه؟

بندور: هل المتغير ده متعرف قبل كده؟

وده بالظبط معنى `lookup`

---

## لو `existing is None`

```python
if existing is None:
    self.symbol_table.declare(name, expr_type, "variable")
```

يعني:

- أول مرة أشوف الاسم ده
    
- إذًا أعلنه كمتغير جديد
    

---

## لو موجود قبل كده

```python
else:
    if existing.data_type != expr_type:
        self.error(...)
```

يعني:

- الاسم متعرف بالفعل
    
- إذًا أنا بعمل assignment لمتغير موجود
    
- لازم أتأكد إن النوع الجديد نفس النوع القديم
    

---

## مثال

```text
x = 10
x = 20
```

صح  
لأن:

- number = number
    

---

## مثال

```text
x = 10
x = ALIVE
```

غلط  
لأن:

- x أصلًا number
    
- الجديد bool
    

---

## في الآخر

```python
return expr_type
```

ليه؟  
علشان الـ assignment نفسها ممكن تعتبر expression أو على الأقل نرجع النوع للاستفادة

---

# `visit_If`

```python
def visit_If(self, node):
    _, condition, then_block, else_block = node
```

## شكل الـ If node

غالبًا:

```python
("If", condition, then_block, else_block)
```

---

## أول خطوة

```python
cond_type = self.visit(condition)
```

نحلل الشرط ونشوف نوعه

---

## بعد كده

```python
if cond_type != "bool":
    self.error(f"If condition must be bool, got {cond_type}")
```

## دي مهمة جدًا

الشرط في `if` لازم يكون منطقي  
يعني لازم نتيجته `bool`

---

## مثال صح

```text
if x > y:
```

لأن `x > y` نتيجته bool

---

## مثال غلط منطقيًا

لو parser كان يسمح بحاجة زي:

```text
if 5 + 3:
```

النتيجة number  
فـ semantic تقول: لا، الشرط لازم يبقى bool

---

## بعد كده

```python
for stmt in then_block:
    self.visit(stmt)
```

يحلل كل statement داخل then block

---

## ثم

```python
if else_block is not None:
    for stmt in else_block:
        self.visit(stmt)
```

لو فيه else block يحللها برضه

---

## ملاحظة مهمة جدًا

في الكود ده **إنت مش بتعمل push_scope/pop_scope جوه if**

يعني المتغيرات اللي تتعرف جوه then/else مش هتكون isolated

وده شيء ممكن المعيد يسألك فيه كـ نقطة تطوير:

- هل الـ if عندك بتفتح scope جديدة؟
    
- لو لأ، ليه؟ وهل ده مقصود ولا ناقص؟
    

---

# `visit_Condition`

```python
def visit_Condition(self, node):
    _, op, left, right = node
```

## شكل الـ condition

مثلًا:

```python
("Condition", ">", ("Identifier", "x"), ("Identifier", "y"))
```

---

## أول حاجة

```python
left_type = self.visit(left)
right_type = self.visit(right)
```

نجيب نوع الطرف الشمال واليمين

---

## بعد كده

```python
if left_type is None or right_type is None:
    return None
```

لو واحد منهم فيه error أصلًا، متكملش

---

## بعد كده

```python
if left_type != right_type:
    self.error(
        f"Incompatible types in condition '{op}': {left_type} and {right_type}"
    )
    return "bool"
```

## معناها

لو نوع الشمال غير نوع اليمين:

- ده mismatch
    
- نسجل error
    

لكن ليه رجعنا `"bool"`؟  
لأن comparison expression في الآخر شكلها المنطقي bool  
وده بيخلي بقية التحليل يكمل بدل ما كل حاجة تقع

---

## بعد كده

```python
if op in ("==", ">", "<", ">=", "<="):
```

إحنا بنعترف بالمقارنات دي

---

## جوه الجزء ده

```python
if op in (">", "<", ">=", "<=") and left_type != "number":
    self.error(
        f"Operator '{op}' requires number operands, got {left_type}"
    )
```

## معناها

عمليات الترتيب:

- `>`
    
- `<`
    
- `>=`
    
- `<=`
    

لازم تشتغل على numbers

---

## ليه خصصناها؟

لأن:

- `==` ممكن منطقيًا تستخدمها بين أنواع متشابهة
    
- لكن `>` غالبًا عايزة numbers
    

---

## في الآخر

```python
return "bool"
```

لأن أي condition نتيجتها النهائية bool

---

# `visit_Command`

```python
def visit_Command(self, node):
    _, command_name, args = node
```

## شكل الـ node

مثلًا:

```python
("Command", "push", [("Identifier", "enemy")])
```

---

## أول حاجة

```python
if command_name not in self.command_signatures:
    self.error(f"Unknown command '{command_name}'")
    return None
```

## معناها

نتأكد إن الأمر موجود أصلًا في لغتنا

---

## ليه؟

لأن parser ممكن يسمح بأي KEYWORD كـ command لو grammar وسكانر شافوها كده، لكن semantic لازم تتأكد إن دي command مدعومة فعلاً

---

## بعد كده

```python
min_args, max_args = self.command_signatures[command_name]
```

نجيب القاعدة الخاصة بعدد الـ arguments

---

## بعد كده

```python
if not (min_args <= len(args) <= max_args):
```

نتأكد إن عدد الـ arguments اللي المستخدم كتبها صحيح

---

## أمثلة

لو:

```python
"ranked": (0, 0)
```

فـ:

```text
ranked()
```

صح

```text
ranked(x)
```

غلط

---

## بعد كده

```python
for arg in args:
    self.visit(arg)
```

## ليه؟

علشان حتى الـ arguments نفسها لازم تتحلل semantic

مثال:

```text
push(enemy)
```

لازم أشوف:

- هل `enemy` متعرفة؟
    
- نوعها إيه؟
    

---

## في الآخر

```python
return "void"
```

لأن الـ command هنا مش بترجع قيمة تستخدم في تعبير حسابي  
فبنعتبرها void

---

# `visit_BinOp`

```python
def visit_BinOp(self, node):
    _, op, left, right = node
```

## شكل الـ node

مثال:

```python
("BinOp", "+", ("Identifier", "x"), ("Number", "5"))
```

---

## أول حاجة

نجيب نوع الشمال واليمين

```python
left_type = self.visit(left)
right_type = self.visit(right)
```

---

## بعد كده

لو واحد منهم فيه مشكلة:

```python
if left_type is None or right_type is None:
    return None
```

---

## بعد كده

```python
if op in ("+", "-", "*", "/"):
```

إحنا بندعم العمليات الحسابية دي

---

## جوهها

```python
if left_type != "number" or right_type != "number":
    self.error(
        f"Operator '{op}' requires number operands, got {left_type} and {right_type}"
    )
    return None
```

## معناها

أي عملية حسابية لازم الطرفين يكونوا numbers

---

## مثال صح

```text
x = 10 + 5
```

---

## مثال غلط

```text
x = 10 + ALIVE
```

---

## لو صح

```python
return "number"
```

لأن ناتج العملية الحسابية number

---

## ولو operator مش معروف

```python
self.error(f"Unknown binary operator '{op}'")
return None
```

---

# `visit_Number`

```python
def visit_Number(self, node):
    return "number"
```

## معناها

أي literal number نوعه number

مثل:

```python
("Number", "10")
```

---

# `visit_Boolean`

```python
def visit_Boolean(self, node):
    return "bool"
```

## معناها

أي boolean literal نوعه bool

مثل:

```python
("Boolean", "ALIVE")
```

---

# `visit_Identifier`

```python
def visit_Identifier(self, node):
    _, name = node
```

## شكل الـ node

مثل:

```python
("Identifier", "x")
```

---

## بعد كده

```python
info = self.symbol_table.lookup(name)
```

هنا بنسأل:

- الاسم ده متعرف؟
    
- ولو متعرف، نوعه إيه؟
    

---

## لو مش متعرف

```python
if info is None:
    self.error(f"Undeclared identifier '{name}'")
    return None
```

يعني:

- استخدمت متغير قبل تعريفه
    

---

## مثال

```text
x = y + 1
```

لو `y` مش declared  
هيظهر error هنا

---

## لو موجود

```python
return info.data_type
```

يعني رجّع نوعه  
علشان الـ parent node تستخدم النوع ده

مثال:

- `visit_BinOp` تعتمد على نوع الـ identifiers
    
- `visit_Condition` تعتمد عليه برضه
    

---

# نربط كل ده بمثال كامل

افرض الـ AST دي:

```python
("Program", [
    ("Assign", "x", ("Number", "10")),
    ("Assign", "y", ("Boolean", "ALIVE")),
    ("Assign", "z", ("BinOp", "+", ("Identifier", "x"), ("Identifier", "y")))
])
```

---

## الخطوة 1

`visit_Program`

- هيلف على statements
    

---

## statement 1

`("Assign", "x", ("Number", "10"))`

### `visit_Assign`

- يزور `Number` → يرجع `number`
    
- يعمل `lookup("x")` → مش موجود
    
- يعمل `declare("x", "number")`
    

---

## statement 2

`("Assign", "y", ("Boolean", "ALIVE"))`

- `visit_Boolean` → `bool`
    
- `lookup("y")` → مش موجود
    
- `declare("y", "bool")`
    

---

## statement 3

`("Assign", "z", ("BinOp", "+", ("Identifier", "x"), ("Identifier", "y")))`

### `visit_Assign`

- يزور الـ `BinOp`
    

### `visit_BinOp`

- يزور `Identifier("x")` → lookup → `number`
    
- يزور `Identifier("y")` → lookup → `bool`
    
- يشوف `+` → لازم number + number
    
- يلاقي mismatch
    
- يسجل error
    

---

# أهم المصطلحات اللي لازم تبقى فاهمها وتعرف تقولها

## 1) Symbol Table

هي data structure بتخزن معلومات عن identifiers

---

## 2) Scope

هو النطاق اللي الاسم يبقى فيه visible

---

## 3) Declare

معناها: إضافة identifier جديد للـ symbol table

---

## 4) Lookup

معناها: البحث عن identifier وإرجاع التعريف الفعال الحالي له

---

## 5) Type Checking

معناها: التأكد إن العمليات بتحصل على أنواع مناسبة

---

## 6) Undeclared Identifier

اسم تم استخدامه بدون تعريف سابق

---

## 7) Redeclaration

تعريف نفس الاسم مرة تانية في نفس الـ scope

---

## 8) Shadowing

إن اسم في scope داخلية يغطي اسم أقدم في scope خارجية

---

# أسئلة المعيد المتوقعة جدًا

## ما هي وظيفة الـ Symbol Table؟

تخزين معلومات identifiers مثل الاسم والنوع والنطاق والنوع المنطقي للرمز، وتستخدم في lookup أثناء الـ semantic analysis.

---

## ما معنى lookup؟

هي عملية البحث عن identifier في الـ symbol table لإيجاد التعريف النشط الحالي له، وغالبًا نرجع أحدث نسخة مرئية في current scope.

---

## لماذا استخدمت stack لكل اسم؟

لدعم shadowing وإرجاع أحدث تعريف فعال بسرعة.

---

## لماذا يوجد scope_stack بجانب table؟

لأن:

- `table` لتسريع الوصول
    
- `scope_stack` لمعرفة ماذا نحذف عند الخروج من scope
    

---

## ما الفرق بين declare و lookup؟

- `declare`: يضيف اسمًا جديدًا
    
- `lookup`: يبحث عن اسم موجود
    

---

## لماذا تبدأ بـ global scope؟

لأن البرنامج يحتاج نطاقًا عامًا منذ البداية لأي متغيرات تُعرف على مستوى البرنامج.

---

## ما وظيفة visit؟

Dispatcher يوجّه كل AST node إلى الدالة المناسبة مثل `visit_Assign` أو `visit_If`.

---

## لماذا semantic بعد parser؟

لأن semantic تعتمد على الـ AST الناتجة من parser، وليس على النص الخام مباشرة.

---

## ما الأخطاء التي يكتشفها الكود؟

- undeclared identifier
    
- type mismatch
    
- unknown command
    
- wrong number of arguments
    
- invalid condition types
    
- redeclaration في نفس الـ scope
    

---

## هل الـ if في كودك تفتح scope؟

في النسخة الحالية لا، لأن `visit_If` لا تستدعي `push_scope()` و`pop_scope()`، ودي نقطة تحسين ممكن تتقال بصراحة لو اتسألت.

---

# ملاحظات مهمة جدًا في كودك الحالي

فيه نقطتين لازم تبقى واخد بالك منهم لو المعيد دخل معاك في التفاصيل:

## 1) الـ `visit_If` لا تعمل scope جديدة

المفروض غالبًا:

- تدخل scope للـ then
    
- scope للـ else
    

لكن كودك الحالي بيزور statements مباشرة فقط

---

## 2) بعض command signatures مختلفة عن اللي كنا افترضناه قبل كده

مثلًا:

```python
"fallback": (0, 0),
"push": (0, 0),
```

يعني في النسخة الحالية:

- `push()` بدون args
    
- `fallback()` بدون args
    

فلو المعيد سألك:  
قول إن **دي قرارات تصميم لغة** وليست قاعدة ثابتة، حسب كيف عرّفت الـ built-in commands في semantic rules.

---

# الخلاصة اللي تقولها للمعيد

الكود ده بيعمل Semantic Analysis عن طريق:

- إنشاء Symbol Table
    
- إضافة identifiers باستخدام `declare`
    
- البحث عن identifiers باستخدام `lookup`
    
- تتبع الـ scopes باستخدام `scope_stack`
    
- المرور على الـ AST باستخدام `visit`
    
- فحص التعيين، الشروط، الأوامر، والعمليات الحسابية
    
- تجميع الأخطاء السيمانتيكية بدل إيقاف البرنامج من أول خطأ
    

---

لو تحب، أعملهولك بعد كده **على هيئة أسئلة وأجوبة شفوي** كأن المعيد بيسألك وانت بترد.