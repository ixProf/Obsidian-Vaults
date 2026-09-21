

# 1) Top-Down Parsing

## التعريف

Top-Down Parsing هو أسلوب parsing يبدأ من **Start Symbol** ويحاول توليد الـ input string.

## الفكرة الأساسية

- يعتمد على **Leftmost Derivation**
    
- يتم بناء **Parse Tree من root إلى leaves**
    
- الترتيب يشبه **Preorder Traversal**
    

## مثال

```text
exp ⇒ exp op exp ⇒ number + number
```

---

# 2) أنواع Top-Down Parsers

## Predictive Parser

- يعتمد على **lookahead (غالبًا 1 token)**
    
- لا يستخدم backtracking
    
- سريع وعملي
    

## Backtracking Parser

- يجرب أكثر من احتمال
    
- يرجع للخلف عند الفشل
    
- بطيء وغير مناسب للـ compilers
    

---

# 3) خوارزميات Top-Down Parsing

## Recursive Descent Parsing

### الفكرة

كل **Non-terminal → function**

### مثال

Grammar:

```text
factor → (exp) | number
```

Implementation:

```pseudo
factor():
  if token == '(':
    match('(')
    exp()
    match(')')
  else if token == number:
    match(number)
  else:
    error
```

---

## LL(1) Parsing

### معنى LL(1)

- L: Left to right input
    
- L: Leftmost derivation
    
- 1: one lookahead token
    

### الفكرة

- استخدام **stack بدل recursion**
    
- parser بيقرر باستخدام token واحد فقط
    

---

# 4) Match Function

## التعريف

دالة تتحقق من التوكن الحالي وتتحرك للأمام

```pseudo
match(expected):
  if token == expected:
     getToken()
  else:
     error
```

## ملاحظات

- يجب تهيئة token قبل parsing
    
- أي mismatch يؤدي إلى error فورًا
    

---

# 5) مشكلة BNF

## المشاكل

- تحتوي على recursion معقد
    
- صعبة في التنفيذ المباشر
    

---

# 6) EBNF (الحل)

## الرموز

|Symbol|Meaning|
|---|---|
|{}|repetition|
|[]|optional|

---

## تحويل مهم

### BNF:

```text
exp → exp + term | term
```

### EBNF:

```text
exp → term { + term }
```

## الفكرة

تحويل recursion إلى loop

---

# 7) تحويل EBNF إلى Code

## {} → while loop

```pseudo
while token == '+' or '-':
   match(token)
   term()
```

## [] → if condition

```pseudo
if token == else:
   match(else)
   statement()
```

---

# 8) Arithmetic Expression Parsing

## Grammar (EBNF)

```text
exp → term { addop term }
term → factor { mulop factor }
factor → (exp) | number
```

---

## التنفيذ

```pseudo
exp():
  temp = term()
  while token == '+' or '-':
     match(token)
     temp = temp op term()
  return temp
```

---

## Left Associativity

```text
3 + 4 + 5 ⇒ (3 + 4) + 5
```

السبب:

- استخدام loop بدل recursion
    

---

# 9) Syntax Tree Construction

## الفكرة

بناء tree أثناء parsing

## مثال

```text
3 + 4 + 5
```

```text
      +
     / \
    +   5
   / \
  3   4
```

---

## التنفيذ

```pseudo
newNode = makeOpNode(token)
leftChild = previous result
rightChild = term()
```

---

# 10) if-statement Parsing

## Grammar

```text
if (exp) stmt | if (exp) stmt else stmt
```

## المشكلة

- كلا الاختيارين يبدأ بـ if
    
- لا يمكن التمييز مبكرًا
    

## الحل

تأجيل القرار

---

## EBNF

```text
if (exp) stmt [else stmt]
```

---

## التنفيذ

```pseudo
if token == else:
   match(else)
   statement()
```

---

# 11) Decision Problems

## المشكلة

```text
A → α | β
```

إذا بدأوا بنفس التوكن → conflict

---

## الحل

### First Set

- التوكنات الممكن تبدأ بها production
    

### Follow Set

- التوكنات الممكن تأتي بعد non-terminal
    

---

# 12) First & Follow

## First(A)

مجموعة التوكنات التي يمكن أن تبدأ بـ A

## Follow(A)

مجموعة التوكنات التي يمكن أن تأتي بعد A

---

## الاستخدام

- اختيار production الصحيح
    
- كشف الأخطاء مبكرًا
    

---

# 13) LL(1) Parsing بالتفصيل

## الفكرة

استخدام stack بدل recursion

---

## البداية

```text
Stack = $ StartSymbol
Input = string $
```

---

## الشرط النهائي

```text
Stack = $
Input = $
```

---

## العمليات

### Match

إذا كان top of stack = input

### Generate

إذا كان top = non-terminal  
→ استبداله باستخدام rule

---

## مثال

```text
S → (S)S | ε
Input: ()
```

يتم:

- توسيع S
    
- مطابقة الأقواس
    
- إنهاء parsing بنجاح
    

---

# 14) خصائص LL(1)

- deterministic
    
- لا يستخدم backtracking
    
- يعتمد على First و Follow
    
- سريع
    

---

# 15) الفرق بين Recursive Descent و LL(1)

|Feature|Recursive Descent|LL(1)|
|---|---|---|
|التنفيذ|functions|stack|
|السهولة|أسهل|أعقد|
|الأداء|جيد|أفضل|
|التحكم|يدوي|جدول|

---

# 16) مشاكل مهمة

## Left Recursion

تسبب infinite recursion

## Ambiguity

أكثر من parse tree

## Decision Conflicts

عدم القدرة على اختيار rule

---

# 17) الخلاصة

- Top-Down Parsing يعتمد على التوقع من البداية
    
- Recursive Descent = implementation مباشر
    
- LL(1) = implementation باستخدام stack
    
- EBNF تسهل التحويل للكود
    
- First و Follow أساس اتخاذ القرار
    
- الهدف النهائي: parsing صحيح وسريع بدون backtracking
    

---