---
title: "Compiler - Lecture 7"
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


تخيل إن عندك جملة زي:

```text
((a))
```

والمطلوب إنك تتأكد إنها مكتوبة صح حسب قواعد معينة (Grammar).  
الـ **LR(0) Parser** بيعمل ده عن طريق إنه يبدأ من الجملة نفسها ويرجعها خطوة بخطوة لغاية ما يوصل للرمز الأساسي (Start Symbol).

---

# أولا: يعني إيه Bottom-Up Parsing؟

فيه نوعين مشهورين من الـ Parsing:

- **Top-Down**: يبدأ من الـ Start Symbol ويحاول يولد الجملة.
- **Bottom-Up**: يبدأ من الجملة نفسها ويحاول يرجعها للـ Start Symbol.
    

إحنا هنا بنتكلم عن **Bottom-Up**.

مثلاً لو عندنا الـ Grammar:

```text
A → (A)
A → a
```

والـ Input:

```text
((a))
```

هيشتغل كده:

```text
((a))
   ↓
((A))
   ↓
(A)
   ↓
A
```

يعني كل شوية يلاقي جزء يطابق Rule ويستبدله بالـ ==Non-Terminal== المناسب.

وده اسمه **Reduction**.

---

# ثانياً: يعني إيه LR؟

الاسم LR بيتقسم كده:

- **L = Left to Right** → بيقرأ الـ Input من الشمال لليمين.
    
- **R = ==Rightmost Derivation== in Reverse** → بيبني الـ Parse Tree بالعكس.
    
- **0 = Zero Lookahead** → مش بيبص على الرمز اللي بعده خالص.
    

يعني الـ LR(0) بياخد القرار من غير ما يشوف الـ Token الجاية.

---

# ثالثاً: يعني إيه LR(0) Item؟

الـ Item هو نفس الـ Rule لكن بنضيف نقطة **(.)** علشان نعرف وصلنا لفين.

مثلاً عندنا:

```text
A → (A)
```

يبقى الـ Items بتاعته:

```text
A → ·(A)
A → (·A)
A → (A·)
A → (A)·
```

النقطة بتتحرك كل ما الـ ==Parser يقرأ Symbol== جديد.

---

# معنى النقطة

## 1. في الأول

```text
A → ·a
```

يعني لسه مقريناش أي حاجة.

متوقع نقرأ:

```text
a
```

---

## 2. بعد a

```text
A → a·
```

يبقى قرينا `a` بالكامل.

دلوقتي نقدر نعمل:

```text
Reduce A → a
```

---

## 3. بعد (

```text
A → (·A)
```

يعني قرينا `(` ومستنيين `A`.

---

## 4. بعد (A

```text
A → (A·)
```

يعني ناقص `)`.

---

## 5. في الآخر

```text
A → (A)·
```

يعني الـ Rule اكتملت.

ونعمل Reduce.

---

# رابعاً: ليه بنضيف A' ؟

بنزود Rule جديدة:

```text
A' → A
```

دي اسمها ==**Augmented Grammar**.==

هدفها إن الـ Parser يعرف إمتى يخلص.

لما يوصل:

```text
A' → A·
```

يبقى الـ Parsing نجح ويعمل **Accept**.

---

# خامساً: الـ DFA

الـ LR(0) بيبني **DFA (Deterministic Finite Automaton)**.

كل State فيها مجموعة من الـ Items.

## State 0

```text
A' → ·A
A  → ·(A)
A  → ·a
```

يعني في البداية ممكن:

- نقرأ (
    
- أو نقرأ a
    
- أو نوصل لـ A
    

الانتقالات:

```text
(  → State 3

a  → State 2

A  → State 1
```

---

## State 1

```text
A' → A·
```

يعني خلصنا.

لو الـ Input انتهى نعمل:

```text
Accept
```

---

## State 2

```text
A → a·
```

نعمل:

```text
Reduce A → a
```

---

## State 3

```text
A → (·A)
A → ·(A)
A → ·a
```

يعني قرينا `(` ولسه مستنيين A.

---

## State 4

```text
A → (A·)
```

مستنيين `)`.

---

## State 5

```text
A → (A)·
```

نعمل:

```text
Reduce A → (A)
```

---

# سادساً: يعني إيه Shift؟

الـ Shift يعني:

> خد الـ Token اللي جاية وحطها في الـ Stack.

مثال

قبل:

```text
Stack:
$ 0

Input:
(a)$
```

بعد Shift:

```text
Stack:
$ 0 ( 3
```

قرأنا `(` وروحنا للحالة 3.

---

# سابعاً: يعني إيه Reduce؟

لما يلاقي إن اللي فوق الـ Stack يطابق Rule.

مثلاً:

```text
$ 0 ( 3 a 2
```

بما إن:

```text
A → a
```

يبقى يشيل `a` ويحط `A`.

يبقى:

```text
$ 0 ( 3 A 4
```

---

# ثامناً: مثال كامل على ((a))

الـ Input:

```text
((a))$
```

| Stack                 | Input    | Action         |
| --------------------- | -------- | -------------- |
| `$ 0`                 | `((a))$` | Shift `(`      |
| `$ 0 ( 3`             | `(a))$`  | Shift `(`      |
| `$ 0 ( 3 ( 3`         | `a))$`   | Shift `a`      |
| `$ 0 ( 3 ( 3 a 2`     | `))$`    | Reduce `A→a`   |
| `$ 0 ( 3 ( 3 A 4`     | `))$`    | Shift `)`      |
| `$ 0 ( 3 ( 3 A 4 ) 5` | `)$`     | Reduce `A→(A)` |
| `$ 0 ( 3 A 4`         | `)$`     | Shift `)`      |
| `$ 0 ( 3 A 4 ) 5`     | `$`      | Reduce `A→(A)` |
| `$ 0 A 1`             | `$`      | Accept         |

---

# تاسعاً: الـ Parsing Table

الجدول بيقول للـ Parser يعمل إيه في كل State.

## Action

بيحدد:

- Shift
    
- Reduce
    
- Accept
    
- Error
    

مثلاً:

```text
State 0 + (  → Shift 3

State 0 + a → Shift 2
```

---

## Goto

بعد الـ Reduce نروح State معينة.

مثلاً:

```text
State 0 + A → 1
```

---

# عاشراً: ليه LR(0) ضعيف شوية؟

لأنه **مش بيبص على الـ Token اللي جاية**.

مثلاً أول ما يوصل لـ:

```text
A → a·
```

هيعمل Reduce فوراً حتى لو ده قرار غلط.

وده ممكن يعمل مشاكل اسمها **Shift/Reduce Conflict**.

---