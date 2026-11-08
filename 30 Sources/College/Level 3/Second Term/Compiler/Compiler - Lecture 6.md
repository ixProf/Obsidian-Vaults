---
title: "Compiler - Lecture 6"
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



المحاضرة دي بتكمل موضوع **Top-Down Parsing**، وتركز على 3 أجزاء كبار:

1. **LL(1) Parsing**
    
2. **Left Recursion Removal + Left Factoring**
    
3. **First Sets و Follow Sets**
    
4. وبعدهم: **Constructing LL(1) Parsing Table**
    

يعني المحاضرة كلها ماشية بالشكل ده:

**Grammar**  
→ نعدلها لو فيها مشاكل  
→ نحسب First  
→ نحسب Follow  
→ نبني LL(1) Table  
→ نستخدم الجدول في الـ parsing

---

# 1) LL(1) Parsing

## يعني إيه LL(1)؟

- أول **L** = قراءة الـ input من **Left to right**
    
- تاني **L** = بناء **Leftmost derivation**
    
- **1** = استخدام **one lookahead token**
    

يعني الـ parser:

- يقرأ من الشمال لليمين
    
- كل مرة يحاول يختار الـ production الصحيحة
    
- بالاعتماد على **token واحدة فقط**
    

---

## الفكرة الأساسية

في **Recursive Descent** كنا بنستخدم functions  
لكن في **LL(1)** بنستخدم **explicit stack**

يعني بدل ما أكتب:

- `exp()`
    
- `term()`
    
- `factor()`
    

هنا عندي:

- stack
    
- input
    
- table
    

والـ parser يشتغل عليهم step by step

---

## العمليات الأساسية في LL(1)

فيه عمليتين فقط:

### 1. Match

لما يكون أعلى الـ stack terminal، ويكون نفس الـ ==current input token==

مثال:

- top of stack = `if`
    
- current input = `if`
    

نعمل:

- pop from stack
    
- move input forward
    

---

### 2. Generate

لما يكون أعلى الـ stack non-terminal

مثال:

- top of stack = `Statement`
- input token = `if`

نروح نبص في الجدول:

```text
M[Statement, if]
```

لو لقينا:

```text
Statement → if-stmt
```

نعمل:

- pop لـ Statement
- push للـ RHS بالعكس

---

## القبول Accept

الـ parsing ينجح لو:

- stack يوصل لـ `$`
- input كمان يوصل لـ `$`

يعني:

```text
Stack = $
Input = $
```

---

# 2) LL(1) Parsing Table

## الجدول ده وظيفته إيه؟

هو اللي بيقول للـ parser:

"لو الـ non-terminal ده فوق الـ stack  
والـ lookahead token دي موجودة  
أستخدم أنهي production؟"

---

## شكل الجدول

الجدول اسمه:

```text
M[N, T]
```

- `N` = Non-terminals
    
- `T` = Terminals
    

يعني:

- الصفوف = non-terminals
    
- الأعمدة = terminals
    
- كل خانة = production rule
    

---

## مثال بسيط

لو عندي:

```text
S → (S)S | ε
```

فمثلاً:

- لو فوق stack `S`
    
- والـ input الحالية `(`
    

إذن نستخدم:

```text
S → (S)S
```

لكن لو الـ input الحالية `)` أو `$`  
إذن نستخدم:

```text
S → ε
```

![[Pasted image 20260406023708.png]]

---

# 3) مشاكل تمنع الـ Grammar إنها تبقى LL(1)

مش أي grammar ينفع لها LL(1).  
لازم تبقى مناسبة.

أهم مشكلتين:

## أ) Left Recursion

زي:

```text
exp → exp + term | term
```

المشكلة هنا إن `exp` بدأت بنفسها  
وده يعمل مشكلة للـ top-down parser

---

## ب) Common Prefix

زي:

```text
if (exp) stmt
if (exp) stmt else stmt
```

الاتنين بيبدأوا بنفس البداية  
فالـ parser مش هيعرف يختار من أول token واحدة

---

# 4) Left Recursion Removal

## يعني إيه Left Recursion؟

لما non-terminal تبدأ بنفسها على الشمال

مثال:

```text
A → Aα | β
```

هنا `A` بدأت بـ `A`

---

## ليه دي مشكلة؟

لأن الـ top-down parser هيعمل:

- A
    
- then A
    
- then A
    
- then A
    

ويفضل داخل في recursion بلا نهاية

---

## التحويل القياسي

لو عندي:

```text
A → Aα | β
```

نحوّلها إلى:

```text
A → βA’
A’ → αA’ | ε
```

---

## مثال

```text
exp → exp + term | term
```

تصبح:

```text
exp → term exp’
exp’ → + term exp’ | ε
```

---

## معنى التحويل

بدل ما كنت بقول:

- expression ممكن تكون expression + term
    

بقيت بقول:

- expression تبدأ بـ term
    
- وبعد كده عندك exp’ تكمل باقي الإضافات لو موجودة
    

---

## مهم جدًا

إزالة الـ left recursion:

- **لا تغيّر اللغة**
    
- لكنها **تغيّر شكل الـ parse tree**
    

وده مهم لأنك ممكن تشوف parse tree مختلف بعد التحويل، لكن اللغة نفسها لم تتغير

---

# 5) Left Factoring

## يعني إيه Left Factoring؟

لما يكون عندي أكثر من production لهم نفس البداية

مثال:

```text
A → αβ | αγ
```

هنا البداية المشتركة هي `α`

---

## ليه دي مشكلة؟

لأن الـ parser عنده lookahead واحدة فقط  
فلما يشوف `α` مش هيعرف:

- يكمل بـ `β`
    
- ولا يكمل بـ `γ`
    

---

## الحل

نفصل الجزء المشترك:

```text
A → αA’
A’ → β | γ
```

---

## مثال مشهور

```text
If-stmt → if (exp) statement
        | if (exp) statement else statement
```

بعد factoring:

```text
If-stmt → if (exp) statement else-part
Else-part → else statement | ε
```

---

# 6) الآن نبدأ أهم جزء: First Set

وده أهم جزء فعلًا في المحاضرة.

---

## يعني إيه First؟

**First(X)** = مجموعة الـ terminals التي يمكن أن تبدأ بها السلسلة المشتقة من X

بمعنى أبسط:

لو قلت لك:

```text
X ⇒ ...
```

أول token ممكن تظهر في البداية هي إيه؟

دي هي الـ First

---

## أولًا: First للـ terminal

لو:

```text
X = if
```

إذن:

```text
First(if) = { if }
```

ولو:

```text
X = number
```

إذن:

```text
First(number) = { number }
```

لأن terminal هو نفسه أول حاجة

---

## ثانيًا: First للـ ε

```text
First(ε) = { ε }
```

---

## ثالثًا: First للـ non-terminal

لو عندي:

```text
A → X1 X2 X3 ... Xn
```

لحساب `First(A)`:

1. أضيف `First(X1)` بدون ε
    
2. لو `X1` ممكن يشتق ε، أبص على `X2`
    
3. لو `X2` كمان nullable، أبص على `X3`
    
4. وهكذا
    
5. لو كلهم يقدروا يشتقوا ε، إذن أضيف ε إلى `First(A)`
    

---

## معنى nullable

بنقول إن non-terminal **nullable** لو يقدر يشتق ε

مثال:

```text
Else-part → else statement | ε
```

إذن:

```text
Else-part is nullable
```

---

## مثال بسيط جدًا

لو عندي:

```text
A → aB | c
```

إذن:

```text
First(A) = { a, c }
```

لأن A يمكن أن تبدأ بـ `a` أو `c`

---

## مثال فيه ε

لو:

```text
A → BC
B → ε | b
C → c
```

نحسب:

### First(B)

```text
First(B) = { b, ε }
```

### First(C)

```text
First(C) = { c }
```

### First(A)

لأن:

```text
A → BC
```

- نأخذ `First(B) - {ε}` = `{b}`
    
- وبما أن B فيها ε، ننظر إلى C
    
- فنضيف `First(C)` = `{c}`
    

إذن:

```text
First(A) = { b, c }
```

ولم نضف ε لأن C لا تشتق ε

---

## مثال آخر فيه ε بالكامل

لو:

```text
A → BC
B → ε
C → ε
```

إذن:

```text
First(A) = { ε }
```

لأن B و C كلهم ممكن يختفوا

---

# 7) First of a String

مش بس First للـ non-terminal  
كمان ممكن نحسب **First(α)** حيث α سلسلة كاملة

مثال:

```text
First(X1X2X3)
```

بنفس المنطق:

- ابدأ بـ X1
    
- لو فيه ε انتقل لـ X2
    
- وهكذا
    

وده مهم جدًا في بناء الـ LL(1) table

---

# 8) Algorithm of First

الطريقة العملية:

1. نبدأ كل `First(A)` فاضية
    
2. نكرر على كل productions
    
3. نضيف العناصر الممكنة
    
4. نكرر لحد ما ميبقاش فيه أي تغيير
    

---

## مثال المحاضرة: Expression Grammar

```text
exp → exp addop term | term
addop → + | -
term → term mulop factor | factor
mulop → *
factor → (exp) | number
```

---

## نحسب First

### First(addop)

واضحة:

```text
First(addop) = { +, - }
```

### First(mulop)

```text
First(mulop) = { * }
```

### First(factor)

لأن:

```text
factor → (exp) | number
```

إذن:

```text
First(factor) = { (, number }
```

### First(term)

لأن:

```text
term → factor
```

و factor تبدأ بـ `(` أو `number`

إذن:

```text
First(term) = { (, number }
```

### First(exp)

لأن:

```text
exp → term
```

إذن:

```text
First(exp) = { (, number }
```

وده مطابق لما في المحاضرة

---

# 9) الآن Follow Set

وده الجزء اللي بيحصل فيه لخبطة عند ناس كتير، فخليني أبسطه جدًا.

## يعني إيه Follow(A)؟

**Follow(A)** = مجموعة الـ terminals التي يمكن أن تأتي مباشرة بعد A في بعض sentential form

بمعنى أبسط:

"بعد ما أخلص A، إيه التوكن اللي ممكن يجي بعدها؟"

---

## مثال بسيط

لو:

```text
S → A b
```

يبقى:

```text
Follow(A) = { b }
```

لأن `b` تأتي بعد A مباشرة

---

## القواعد الأساسية لـ Follow

## Rule 1: Start Symbol

لو A هو start symbol  
إذن:

```text
$ ∈ Follow(A)
```

لأن نهاية الإدخال ممكن تأتي بعده

---

## Rule 2

لو عندي:

```text
B → α A γ
```

إذن نضيف:

```text
First(γ) - { ε } إلى Follow(A)
```

يعني بص على اللي بعد A، وخد الـ first بتاعه

---

## Rule 3

لو عندي:

```text
B → α A γ
```

و `γ` ممكن تشتق ε  
يبقى نضيف:

```text
Follow(B) إلى Follow(A)
```

لأن لو γ اختفت، يبقى اللي بعد B نفسه هو اللي بعد A

---

## Rule 4

لو A في آخر الإنتاج:

```text
B → α A
```

إذن:

```text
Follow(B) ⊆ Follow(A)
```

لأن A في الآخر، فكل ما يتبع B يمكن أن يتبع A

---

# 10) فكرة Follow بشكل intuitive

## First يسأل:

"السلسلة تبدأ بإيه؟"

## Follow يسأل:

"بعد الـ non-terminal ده ييجي إيه؟"

دي أفضل طريقة تفرق بينهم

---

# 11) Example واضح على Follow

لو عندي:

```text
S → A B
A → a
B → b
```

### Follow(S)

لأنه start symbol:

```text
Follow(S) = { $ }
```

### Follow(A)

لأن A بعدها B:

```text
Follow(A) = First(B) = { b }
```

### Follow(B)

لأن B في آخر S:

```text
Follow(B) = Follow(S) = { $ }
```

---

# 12) Example فيه ε في Follow

لو:

```text
S → A B
A → a
B → b | ε
```

### Follow(A)

بما أن B تأتي بعد A:

- نضيف `First(B) - {ε}` = `{b}`
    
- ولأن B قد تشتق ε
    
- نضيف `Follow(S)` = `{$}`
    

إذن:

```text
Follow(A) = { b, $ }
```

---

# 13) Example المحاضرة: Expression Grammar

من المحاضرة، الـ Follow sets كانت كالتالي:

```text
Follow(exp) = { $, +, -, ) }
Follow(addop) = { (, number }
Follow(term) = { $, +, -, *, ) }
Follow(mulop) = { (, number }
Follow(factor) = { $, +, -, *, ) }
```

خليني أوضح ليه.

---

## لماذا Follow(exp) فيها `$` و `)` ؟

### أولًا:

`exp` هي start symbol  
إذن:

```text
$ ∈ Follow(exp)
```

### ثانيًا:

في:

```text
factor → (exp)
```

إذن بعد `exp` مباشرة يوجد `)`  
فبالتالي:

```text
) ∈ Follow(exp)
```

### ثالثًا:

في:

```text
exp → exp addop term
```

بعد أول `exp` يوجد `addop`  
و:

```text
First(addop) = { +, - }
```

إذن:

```text
+, - ∈ Follow(exp)
```

لذلك:

```text
Follow(exp) = { $, +, -, ) }
```

---

## لماذا Follow(term) فيها `*` و `+` و `-` و `)` و `$` ؟

### من:

```text
exp → exp addop term
```

term في آخر الإنتاج  
إذن:

```text
Follow(exp) ⊆ Follow(term)
```

فندخل:

```text
{ $, +, -, ) }
```

### ومن:

```text
term → term mulop factor
```

بعد أول term يوجد mulop  
و:

```text
First(mulop) = { * }
```

إذن:

```text
* ∈ Follow(term)
```

فتصبح:

```text
Follow(term) = { $, +, -, *, ) }
```

---

## لماذا Follow(factor) مثل Follow(term) تقريبًا؟

لأن في:

```text
term → factor
```

factor جاءت في آخر rule  
إذن:

```text
Follow(term) ⊆ Follow(factor)
```

وكذلك في:

```text
term → term mulop factor
```

factor في الآخر أيضًا  
فتأخذ ما يتبع term

إذن:

```text
Follow(factor) = { $, +, -, *, ) }
```

---

# 14) Example المحاضرة: If Statement

الجرامر:

```text
Statement → if-stmt | other
If-stmt → if (exp) statement else-part
Else-part → else statement | ε
Exp → 0 | 1
```

المحاضرة أعطت:

```text
First(statement) = { if, other }
First(if-stmt) = { if }
First(else-part) = { else, ε }
First(exp) = { 0, 1 }
```

و Follow:

```text
Follow(statement) = { $, else }
Follow(if-stmt) = { $, else }
Follow(else-part) = { $, else }
Follow(exp) = { ) }
```

---

## تفسير مهم

### Follow(exp) = { ) }

لأن:

```text
if (exp)
```

الـ exp بعدها مباشرة `)`

---

### Follow(statement) فيها else

لأن في:

```text
If-stmt → if (exp) statement else-part
```

بعد statement توجد else-part  
و:

```text
First(else-part) = { else, ε }
```

إذن:

- نضيف `else`
    
- وبما أن else-part فيها ε
    
- نضيف Follow(If-stmt)
    

لذلك يظهر `else` داخل Follow(statement)

وده هو سبب مشكلة **dangling else**

---

# 15) الفرق الجوهري بين First و Follow

## First

يهتم بما يمكن أن **يبدأ** به non-terminal أو string

مثال:

```text
First(expr)
```

يعني أول token ممكن تظهر لو بدأت أشتق expr

---

## Follow

يهتم بما يمكن أن ==**يأتي بعد** non-terminal==

مثال:

```text
Follow(expr)
```

يعني بعد ما expr تخلص، إيه اللي ممكن ييجي بعدها

---

## جملة تحفظها

- **First = what can start**
    
- **Follow = what can come after**
    

---

# 16) كيف نستخدم First و Follow في بناء LL(1) Table؟

لو عندي production:

```text
A → α
```

## الحالة الأولى

لكل terminal `a` في:

```text
First(α)
```

نضيف:

```text
A → α
```

في:

```text
M[A, a]
```

---

## الحالة الثانية

لو:

```text
ε ∈ First(α)
```

إذن لكل `b` في:

```text
Follow(A)
```

نضيف:

```text
A → α
```

في:

```text
M[A, b]
```

---

## مثال مهم

لو:

```text
Else-part → else statement | ε
```

### First(else statement) = { else }

إذن:

```text
M[Else-part, else] = Else-part → else statement
```

### ولأن ε موجودة في production الثانية

نضع:

```text
Else-part → ε
```

في الأعمدة الموجودة في:

```text
Follow(Else-part)
```

وده بالضبط سبب وجود ε-production في بعض أعمدة الجدول

---

# 17) ليه First و Follow مهمين جدًا؟

لأنهم يستخدموا في:

1. **اختيار production الصحيحة**
    
2. **بناء LL(1) parsing table**
    
3. **معرفة هل الـ grammar LL(1) أم لا**
    
4. **التعامل مع ε-productions**
    
5. **كشف conflicts**
    

---

# 18) كيف أعرف أن الـ Grammar ليست LL(1)؟

لو أثناء بناء الجدول:

- نفس الخانة أخذت أكثر من production
    

إذن grammar ليست LL(1)

وده يحصل غالبًا بسبب:

- ambiguity
    
- left recursion
    
- common prefixes
    
- أو conflict بين First و Follow
    

---

# 19) ملخص سريع جدًا للجزء كله

## قبل ما تعمل LL(1):

لازم:

1. تشيل left recursion
    
2. تعمل left factoring
    

## ثم:

3. تحسب First
    
4. تحسب Follow
    
5. تبني الـ table
    
6. تستخدم الـ stack parser
    

---

# 20) أهم نقطة عملية تحفظها

## لما تحسب First:

ابص من **الشمال**

- أول حاجة ممكن تبدأ بيها السلسلة
    

## لما تحسب Follow:

ابص على **اللي على يمين الـ non-terminal**

- إيه اللي بعده
    
- ولو الباقي يختفي، خد Follow بتاع اللي فوقه
    

---

# 21) خلاصة First و Follow بطريقة بسيطة جدًا

## First

"لو بدأت من non-terminal ده، أول token ممكن أشوفها إيه؟"

## Follow

"بعد ما non-terminal ده يخلص، إيه token ممكن تيجي بعده؟"

---

# 22) أهم القواعد التي تتحفظ

## First

- `First(a) = {a}`
    
- `First(ε) = {ε}`
    
- `First(A → X1X2...)`
    
    - خذ First(X1)
        
    - ولو X1 فيها ε، كمل على X2
        
    - ولو الكل فيهم ε، أضف ε
        

## Follow

- start symbol يأخذ `$`
    
- إذا `A → αBγ`  
    أضف `First(γ) - {ε}` إلى `Follow(B)`
    
- إذا `γ` يمكن أن تشتق ε  
    أضف `Follow(A)` إلى `Follow(B)`
    
- إذا `B` في آخر production  
    أضف `Follow(A)` إلى `Follow(B)`
    

---
