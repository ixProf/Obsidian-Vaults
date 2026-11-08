---
title: "Lecture 4 (3.5.1)"
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


# **3.5.1 EBNF Notation – Complete Summary**

---

## **1. Motivation (المشكلة الأساسية)**

في BNF:

- التكرار يتم باستخدام **recursion**:
    

```text
A → A α | β   (left recursion)
A → α A | β   (right recursion)
```

- حيث:
    
    - α و β سلاسل من terminals و non-terminals
        
    - β لا تحتوي على A في البداية (left) أو النهاية (right)
        

### المشكلة:

- القواعد طويلة
    
- معقدة
    
- صعبة القراءة
    

---

# **2. Recursion (الأساس)**

---

## **2.1 Left Recursion**

```text
A → A α | β
```

### المعنى:

- A بتنادي نفسها في البداية
    

### الشكل الناتج:

```text
β
β α
β α α
β α α α
...
```

### الاستخدام:

- يمثل **Left Associativity**
    

---

## **2.2 Right Recursion**

```text
A → α A | β
```

### المعنى:

- A بتنادي نفسها في النهاية
    

### الشكل الناتج:

```text
β
α β
α α β
α α α β
...
```

### الاستخدام:

- يمثل **Right Associativity**
    

---

# **3. Repetition (التكرار)**

---

## **في Regular Expressions**

```text
α*
```

→ تكرار α (0 أو أكثر)

---

## **في EBNF**

```text
A → β { α }
A → { α } β
```

---

## **معنى `{ }`**

```text
{ α }
```

→ α تتكرر 0 أو أكثر

---

## **ملاحظة مهمة**

- `{}` تختصر recursion
    
- لكنها لا توضح شكل الـ Parse Tree
    

---

# **4. تحويل BNF → EBNF (مهم جدًا)**

---

## **Rule أساسي**

```text
A → A α | β   ⟶   A → β { α }
```

---

## **أمثلة**

---

### Example 1: Statement Sequence

#### BNF:

```text
stmt-sequence → stmt ; stmt-sequence | stmt
```

#### EBNF:

```text
stmt-sequence → stmt { ; stmt }
```

---

### Example 2: Expressions

#### BNF:

```text
exp → exp addop term | term
```

#### EBNF:

```text
exp → term { addop term }
```

---

## **ملحوظة**

- recursion اتشالت
    
- واستبدلت بـ `{}`
    

---

# **5. Associativity (مهم جدًا)**

---

## **Left Associative**

```text
exp → term { addop term }
```

```text
a - b - c = (a - b) - c
```

---

## **Right Associative**

```text
exp → { term addop } term
```

```text
a - b - c = a - (b - c)
```

---

## **مهم**

شكل الـ EBNF rule هو اللي بيحدد associativity

---

# **6. Optional Constructs (الاختياري)**

---

## **Syntax**

```text
[ α ]
```

---

## **المعنى**

```text
α ممكن تظهر أو لا
```

---

## **Example: If Statement**

---

### BNF:

```text
if-stmt → if (exp) statement
        | if (exp) statement else statement
```

---

### EBNF:

```text
if-stmt → if (exp) statement [ else statement ]
```

---

## **Example: Statement Sequence**

```text
stmt-sequence → stmt [ ; stmt-sequence ]
```

---

# **7. Key Takeaways**

---

## BNF:

- تعتمد على recursion
    
- معقدة
    

---

## EBNF:

- `{}` → repetition
    
- `[ ]` → optional
    
- أسهل وأوضح
    

---

## Recursion:

- Left → associativity شمال
- Right → associativity يمين

---

## أهم تحويل تحفظه:

```text
A → A α | β   ⟶   A → β { α }
```

---
