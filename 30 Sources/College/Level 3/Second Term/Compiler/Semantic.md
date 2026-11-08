---
title: "Semantic"
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
# يعني ايه Semantic Analysis أصلًا؟

الـ **Parser** كان شغله:

- يتأكد إن الكود **مكتوب صح نحويًا**
    
- يعني ماشي حسب الـ Grammar
    
- ويبني AST
    

لكن الـ **Semantic Analyzer** شغله:

- يتأكد إن الكود **معناه منطقي**
- مش بس شكله صح
    

وده بالظبط اللي السلايد قاله:

> الـ parser يهتم بالـ grammar والـ structure  
> والـ semantic analyzer يهتم بالـ meaning والـ rules

---

# الفرق بين Syntax و Semantic

## Syntax

يعني الجملة مكتوبة صح من ناحية الشكل

مثال:

```text
x = 10
```

دي syntax صح

---

## Semantic

يعني الجملة "منطقيًا" صح

مثال:

```text
x = y + 1
```

الجملة دي ممكن تكون syntax صح  
لكن semantic غلط لو `y` مش متعرف

---

# pipeline المشروع كله

المشروع عندك بقى كده:

```text
Code
→ Scanner
→ Tokens
→ Parser
→ AST
→ Semantic Analyzer
```

وده طبيعي جدًا، لأن السلايد موضح إن بعد الـ Parser والـ AST اللي "ناقص" هو semantic validation والـ symbol table

---

# طيب السيمانتيك بتشوف إيه؟

السلايد ذكر الحاجات الأساسية دي:

- Type Checking
- Scope Resolution
- Function Signature Matching
- Control Flow Validation
    

خليني أشرحهم وربطهم بلغتك.

---

# 1) Type Checking

يعني التحقق من الأنواع

## الفكرة

كل expression أو variable ليه نوع

عندنا حاليًا في لغتك نوعين أساسيين:

- `number`
    
- `bool`
    

---

## مثال صح

```text
x = 10
y = 5
z = x + y
```

هنا:

- `x` نوعه number
    
- `y` نوعه number
    
- `x + y` نوعه number
    

فكله تمام

---

## مثال غلط

```text
x = 10
y = ALIVE
z = x + y
```

هنا:

- `x` number
    
- `y` bool
    

مينفعش:

```text
number + bool
```

فده semantic error

---

## ده اتطبق في السيمانتك بتاعك إزاي؟

في `visit_BinOp`

```python
if op in ("+", "-", "*", "/"):
    if left_type != "number" or right_type != "number":
        self.error(
            f"Operator '{op}' requires number operands, got {left_type} and {right_type}"
        )
```

يعني:

- لو العملية حسابية
- لازم الطرفين يبقوا numbers


---

# 2) Scope Resolution

يعني التحقق من النطاق

السلايد ركز جدًا على **Symbol Table + Scope**  
وقال إن التطبيق العملي الأشهر هو **Stack of Maps**:

- تدخل scope جديد → push
    
- تخرج من scope → pop
    
- تدوّر على الاسم من فوق لتحت
    

---

## يعني scope إيه؟

ببساطة:  
هو المكان اللي المتغير "عايش" فيه

مثال:

```text
x = 10

if x > 5:
    y = 20
```

هنا:

- `x` موجود في الـ global scope
    
- `y` موجود جوه if block فقط
    

---

## ليه ده مهم؟

علشان مينفعش متغير يتشاف بره المكان اللي اتعرف فيه لو اللغة بتفصل scopes

---

## في السيمانتك بتاعك عملنا ده إزاي؟

عندك `SymbolTable` فيها:

```python
self.scopes = [{}]
```

يعني list من maps  
كل map تمثل scope

---

## لما ندخل if block

في `visit_If`

```python
self.symbol_table.push_scope()
for stmt in then_block:
    self.visit(stmt)
self.symbol_table.pop_scope()
```

يعني:

- افتح scope جديد
    
- حلل اللي جوه البلوك
    
- وبعدها اقفله
    

---

## lookup بيشتغل إزاي؟

```python
def lookup(self, name):
    for scope in reversed(self.scopes):
        if name in scope:
            return scope[name]
    return None
```

يعني:

- ابدأ من أقرب scope
    
- وبعدها ارجع لورا
    
- لحد الـ global
    

وده حرفيًا نفس فكرة السلايد

---

# 3) Symbol Table

دي أهم بنية في السيمانتيك

السلايد وصفها إنها:

- ledger
    
- address book
    
- بتخزن metadata عن identifiers  
    زي:
    
- name
    
- type
    
- kind
    
- scope
    

---

## عندك في السيمانتك

عملنا:

```python
@dataclass
class SymbolInfo:
    name: str
    data_type: str
    kind: str
    scope_level: int
```

دي row واحدة في الـ symbol table

---

## مثال

لو كتبت:

```text
x = 10
```

السيمانتك بتسجل:

```text
name = x
type = number
kind = variable
scope = 0
```

---

## declare

```python
def declare(self, name, data_type, kind="variable"):
```

دي لما نضيف identifier جديد

---

## lookup

```python
def lookup(self, name):
```

دي لما نحتاج نشوف identifier موجود ولا لا

---

# 4) Undeclared Identifier

السلايد ذكرها ضمن الأخطاء اللي semantic phase تكتشفها

---

## معناها

إنك استخدمت اسم قبل ما يتعرف

مثال:

```text
x = y + 1
```

لو `y` مش متعرف  
يبقى semantic error

---

## اتطبق عندك إزاي؟

في `visit_Identifier`

```python
info = self.symbol_table.lookup(name)
if info is None:
    self.error(f"Undeclared identifier '{name}'")
    return None
```

يعني أي identifier يتقري:

- لازم يبقى موجود في symbol table
    

---

# 5) Multiple Declaration in Same Scope

السلايد ذكر برضه:

- multiple declarations in the same scope
    

---

## في اللغات التقليدية

مثال:

```text
int x;
int x;
```

ده غلط

---

## في لغتك

إحنا لغتك حاليًا مفيهاش syntax صريح للـ declarations  
يعني مفيش:

```text
int x = 5
```

فإحنا عملنا design مناسب:

### أول assignment

يعتبر declaration ضمني

مثال:

```text
x = 10
```

يعني:

- لو `x` مش موجود → declare
    

### بعد كده

لو استخدمت:

```text
x = 20
```

ده update عادي

لكن لو:

```text
x = ALIVE
```

يبقى type mismatch

---

## في الكود

```python
existing = self.symbol_table.lookup(name)

if existing is None:
    self.symbol_table.declare(name, expr_type, "variable")
else:
    if existing.data_type != expr_type:
        self.error(...)
```

يعني:

- أول مرة → declare
    
- بعد كده → لازم نفس النوع
    

---

# 6) Type Mismatch

السلايد ذكر type mismatch كأول نوع من الأخطاء تقريبًا

---

## يعني إيه؟

لما نوع لا يناسب النوع المطلوب

### مثال:

```text
x = 10
x = ALIVE
```

هنا:

- `x` أخد type = number
    
- بعد كده حاولنا نحطله bool
    

فده semantic error

---

## اتطبق عندك فين؟

في `visit_Assign`

```python
if existing.data_type != expr_type:
    self.error(
        f"Type mismatch in assignment to '{name}': "
        f"expected {existing.data_type}, got {expr_type}"
    )
```

---

# 7) Condition Checking

السلايد قال إن semantic phase بتعمل type checking وcontrol flow validation  
والـ if condition جزء مهم جدًا هنا

---

## عندك في اللغة

الـ if لازم شرطها يكون منطقي

مثال صح:

```text
if x > y:
```

لأن:

- `x > y` نتيجته bool
    

---

## مثال غلط

لو الشرط طلع number بدل bool

مثال نظري:

```text
if x + y:
```

لو parser كان بيسمح بده، semantic لازم تمنعه

---

## في السيمانتك بتاعك

في `visit_If`

```python
cond_type = self.visit(condition)
if cond_type != "bool":
    self.error(f"If condition must be bool, got {cond_type}")
```

يعني:

- أي if لازم condition ترجع bool
    

---

# 8) Condition Internals

في `visit_Condition`

```python
left_type = self.visit(left)
right_type = self.visit(right)
```

السيمانتك بتجيب نوع اليمين والشمال

---

## بعدين

بتتأكد إنهم compatible

```python
if left_type != right_type:
    self.error(
        f"Incompatible types in condition '{op}': {left_type} and {right_type}"
    )
```

---

## وكمان

لو operator زي:

- `>`
    
- `<`
    
- `>=`
    
- `<=`
    

لازم الطرفين يكونوا numbers

```python
if op in (">", "<", ">=", "<=") and left_type != "number":
    self.error(
        f"Operator '{op}' requires number operands, got {left_type}"
    )
```

---

## مثال

```text
x = ALIVE
y = DEAD

if x > y:
```

ده syntax ممكن يعدي  
لكن semantic لازم يمنعه  
لأن `>` محتاج numbers

---

# 9) Command Signature Matching

السلايد ذكر "Function Signature Matching" كجزء أساسي من semantic phase

عندك في اللغة مفيش functions كاملة لسه  
لكن عندك **commands** زي:

- push
    
- loot
    
- fallback
    
- chat
    

فإحنا عاملناهم معاملة built-in commands ليهم signatures

---

## signature يعني إيه؟

يعني:

- اسم الأمر
    
- وعدد الـ arguments المطلوبة
    

---

## في السيمانتك بتاعك

```python
self.command_signatures = {
    "push": (1, 1),
    "loot": (1, 1),
    "fallback": (1, 1),
    ...
}
```

يعني:

- `push` لازم argument واحد
    
- `loot` لازم واحد
    
- `ranked` مثلًا صفر
    

---

## لما ييجي command

في `visit_Command`

```python
if command_name not in self.command_signatures:
    self.error(f"Unknown command '{command_name}'")
```

يعني اسم الأمر لازم يكون معروف

---

## وبعدها

يتأكد من عدد الـ arguments

```python
min_args, max_args = self.command_signatures[command_name]
if not (min_args <= len(args) <= max_args):
    ...
```

---

## أمثلة

### صح

```text
push(enemy)
```

### غلط

```text
push()
```

### غلط

```text
ranked(x)
```

لو `ranked` متوقع zero args

---

# 10) Control Flow Validation

السلايد ذكرها كمسؤولية مستقلة

في اللغات الكبيرة ده يشمل:

- return outside function
    
- break outside loop
    
- continue outside loop
    
- paths analysis
    

---

## في لغتك حاليًا

إحنا لسه معندناش:

- loops
    
- functions
    
- return
    
- break
    

فـ control flow validation عندك حاليًا محدود في:

- التحقق إن if condition = bool
    
- والتعامل مع scopes بتاعة blocks
    

يعني السيمانتيك عندك بدأت الجزء ده، لكن لسه مش كاملة زي لغة كبيرة  
وده طبيعي جدًا

---

# 11) ليه Semantic محتاجة AST؟

لأن السيمانتيك ما بتشتغلش على raw text  
ولا حتى على التوكنز بشكل مباشر غالبًا

هي بتشتغل على structure مفهومة

مثال:

```python
('Assign', 'x', ('BinOp', '+', ('Number', '5'), ('Number', '3')))
```

ده أسهل بكتير من إنها تفهم الكود الخام

---

## علشان كده

ما ينفعش تشغل semantic قبل parser

لازم:

- parser يبني AST
    
- semantic تمشي على الـ AST
    

---

# 12) السيمانتك بتاعك بيمشي على الـ AST إزاي؟

عن طريق **visitor pattern بشكل بسيط**

```python
def visit(self, node):
    node_type = node[0]
    method_name = f"visit_{node_type}"
    method = getattr(self, method_name, self.generic_visit)
    return method(node)
```

يعني:

- لو node نوعها `Assign` → روح `visit_Assign`
    
- لو `If` → روح `visit_If`
    
- لو `BinOp` → روح `visit_BinOp`
    

---

## ده مهم ليه؟

لأنه بيخلي كل نوع node له منطق semantic خاص بيه

---

# 13) تعال نربط ده بمثال كامل

## الكود

```text
enemy = 1
base = 2
x = 10
y = 5

if x > y:
    push(enemy)
else:
    fallback(base)
```

---

## المرحلة 1: Parser يطلع AST

تقريبًا:

```python
('Program', [
    ('Assign', 'enemy', ('Number', '1')),
    ('Assign', 'base', ('Number', '2')),
    ('Assign', 'x', ('Number', '10')),
    ('Assign', 'y', ('Number', '5')),
    ('If',
        ('Condition', '>', ('Identifier', 'x'), ('Identifier', 'y')),
        [
            ('Command', 'push', [('Identifier', 'enemy')])
        ],
        [
            ('Command', 'fallback', [('Identifier', 'base')])
        ]
    )
])
```

---

## المرحلة 2: semantic تبدأ

### `visit_Program`

تلف على كل statement

---

### statement 1

```python
('Assign', 'enemy', ('Number', '1'))
```

#### `visit_Assign`

- تزور `('Number', '1')`
    
- `visit_Number` يرجع `"number"`
    
- `enemy` مش موجود
    
- declare enemy كـ number
    

---

### statement 2

`base = 2`

- نفس الكلام
    
- يتسجل number
    

---

### statement 3 و4

`x`, `y` numbers

---

### statement 5

`If`

#### `visit_If`

يروح للـ condition

---

### condition

```python
('Condition', '>', ('Identifier', 'x'), ('Identifier', 'y'))
```

#### `visit_Condition`

- `visit_Identifier('x')` → يلاقي `x` في symbol table → number
    
- `visit_Identifier('y')` → number
    
- operator = `>`
    
- `>` محتاج numbers
    
- تمام
    
- result = bool
    

---

### then block

يفتح scope جديد

```python
push(enemy)
```

#### `visit_Command`

- `push` معروف
    
- محتاج argument واحد
    
- `enemy` موجود ونوعه number
    
- command semantic pass
    

---

### else block

يفتح scope جديد

```python
fallback(base)
```

- `fallback` معروف
    
- `base` موجود
    
- تمام
    

---

## النتيجة

Semantic passed

---

# 14) مثال فيه أخطاء سيمانتيكية

## الكود

```text
x = 10
y = ALIVE
z = x + y

if y > x:
    push()
```

---

## التحليل

### `x = 10`

- x = number
    

### `y = ALIVE`

- y = bool
    

### `z = x + y`

- `x` = number
    
- `y` = bool
    
- `+` محتاج number + number
    
- error
    

### `if y > x`

- `y` = bool
    
- `x` = number
    
- incompatible types in condition
    
- error
    
- `>` requires number operands
    
- error
    

### `push()`

- push expects 1 arg
    
- got 0
    
- error
    

---

# 15) إيه اللي ناقص في السيمانتك بتاعك لسه؟

السيمانتك الحالية كويسة جدًا كبداية، لكن لسه تقدر تتطور

مثلًا:

- تخزين line numbers في AST ثم إظهارها في errors
    
- دعم string type لو أضفته في parser
    
- دعم built-in constants
    
- دعم loops + break/continue validation
    
- دعم functions كاملة
    
- دعم shadowing بوضوح أكبر
    

لكن اللي عندك حاليًا بالفعل يحقق جوهر semantic phase اللي السلايد طلبه:

- symbol table
    
- scope handling
    
- lookup / declare
    
- type checking
    
- command signature checking
    
---