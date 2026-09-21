

# **Context-Free Grammars & Parsing**

---

## **1. What is Parsing? | يعني ايه Parsing؟**

Parsing هو **عملية Syntax Analysis** في الـ Compiler.

- بعد ما الـ **Scanner** يطلع Tokens
    
- بييجي دور الـ **Parser** يفهم Structure الجملة
    

### الفكرة الأساسية:

- مش بيبص على الحروف → ده شغل Scanner
    
- بيبص على **شكل الجملة (Structure)**
    

### Example:

```
x = 5 + 3;
```

- Scanner → `ID = NUM + NUM`
    
- Parser → يفهم إنها:
    
    - Assignment statement
        
    - فيها Expression صحيح
        

---

## **2. Syntax & Context-Free Grammar (CFG)**

الـ Syntax بيتحدد عن طريق **Context-Free Grammar (CFG)**

### يعني ايه CFG؟

مجموعة Rules بتحدد شكل الجمل في اللغة

### Example:

```
exp → exp + exp
```

### Important Notes:

- الـ Rules دي **Recursive**
    
- يعني ممكن القاعدة تستخدم نفسها
    

### ليه ده مهم؟

- يسمح بإننا نكتب Expressions لا نهائية:
    

```
3 + 4 + 5 + 6 ...
```

---

## **3. Parse Tree (Syntax Tree)**

ده أهم Data Structure في الـ Parsing

### الفكرة:

بدل ما نخزن الكود كنص → نحوله لشجرة

### Example:

```
3 + 4
```

```
   +
  / \
 3   4
```

### الهدف:

- تمثيل Structure الكود بشكل واضح
    
- يسهل باقي مراحل الكومبايلر
    

---

## **4. Function of the Parser**

### المدخلات والمخرجات:

- Input → Tokens
    
- Output → Syntax Tree
    

### Compiler Flow:

```
Source Code → Scanner → Tokens → Parser → Syntax Tree
```

### أهم سطر:

```
SyntaxTree = parse()
```

يعني:

- كل عملية Parsing = استدعاء function واحدة بس
    

---

## **5. Parser & Scanner Interaction**

الـ Parser مش بياخد Tokens مرة واحدة

### بيشتغل ازاي؟

بياخدهم واحدة واحدة باستخدام:

```
token = getToken()
```

### السيناريو:

1. Parser يبدأ
    
2. ينادي getToken()
    
3. Scanner يرجع Token
    
4. Parser يعالجها
    
5. يطلب اللي بعدها
    

### تشبيه:

زي الأكل → **لقمة لقمة مش مرة واحدة**

---

## **6. Parsing Approaches**

---

### **A) Single-Pass Compiler**

### يعني ايه؟

البرنامج بيتقري **مرة واحدة بس**

### اللي بيحصل:

الـ Parser بيعمل كل حاجة:

- Syntax Analysis
    
- Semantic Analysis
    
- Code Generation
    

### Important:

- ❌ مفيش Syntax Tree صريحة
    
- ✔ الشجرة موجودة بشكل **Implicit**
    

### Example:

```
parseExp() {
   parseTerm();
   match('+');
   parseTerm();
}
```

### الفكرة:

- Function calls = الشجرة نفسها
    

---

### **B) Multi-Pass Compiler**

### يعني ايه؟

البرنامج بيتقري **أكتر من مرة**

### المراحل:

1. Scanner → Tokens
    
2. Parser → Syntax Tree
    
3. Semantic → يستخدم Tree
    
4. Code Generation → يستخدم Tree
    

### Important:

- Syntax Tree مهمة جدًا
- تعتبر وسيلة تواصل بين المراحل

---

## **7. Syntax Tree Details**

### Important Points:

- شكل الشجرة بيعتمد على اللغة
    
    - C فيها pointers
        
    - Python لأ
        
- الشجرة:
    
    - **Dynamic Data Structure**
        
    - بتتعمل وقت التشغيل
        

### Node Structure:

كل Node فيها:

- Operation (مثلا PLUS)
    
- Left / Right child
    
- Data type
    
- Attributes تانية
    

### Example:

```
5 + 3
```

Node:

- Type → PLUS
    
- Left → 5
    
- Right → 3
    
- DataType → int
    

---

## **8. Parsing Issues – Errors**

---

### **A) Scanner Errors (سهل)**

- بيتعامل مع Characters
    
- لو حاجة غلط → يعمل:
    
    - Error Token
        
    - ويتجاهلها
        

### Example:

```
x = 5 @ 3;
```

---

### **B) Parser Errors (صعب)**

- بيتعامل مع Structure
    
- الخطأ ممكن يبوظ الجملة كلها
    

### Example:

```
x = 5 + ;
```

---

## **9. Error Handling in Parser**

الـ Parser لازم يعمل 3 حاجات:

### 1) Error Reporting

- يطلع رسالة واضحة
    

### 2) Error Recovery

- يكمل parsing بعد الخطأ
    

### 3) Error Repair

- يصلح الخطأ أحيانًا
    

---

### Example:

```
if (x > 5
   y = 3;
```

المشكلة:

- Missing `)`
    

الحل:

- يقول error
    
- يكمل parsing
    

---

### ليه Recovery مهم؟

لو وقف عند أول error:

- المستخدم مش هيشوف باقي الأخطاء ❌
    

### الصح:

- يكمّل ويطلع كل الأخطاء ✔
    

---

## **10. Summary (الخلاصة)**

### Parsing:

- تحويل Tokens → Syntax Tree
    

### CFG:

- قواعد بتحدد شكل اللغة
    
- Recursive
    

### Parser:

- بياخد Tokens واحدة واحدة
    
- يستخدم getToken()
    

### Single-pass:

- كل حاجة مرة واحدة
    
- No explicit tree
    

### Multi-pass:

- مراحل منفصلة
    
- Tree مهمة جدًا
    

### Errors:

- Scanner → بسيطة
    
- Parser → معقدة
    

### الهدف النهائي:

- فهم Structure الكود
    
- واكتشاف أكبر عدد من الأخطاء

---

# **3.5 Extended Notations (EBNF & Syntax Diagrams)**

---

## **1. المشكلة في BNF**

الـ BNF:

- طويلة
    
- repetitive
    
- صعب تقرأها
    

### Example:

```text
A → a A | a
```

---

## **2. الحل → EBNF (Extended BNF)**

EBNF بتضيف shortcuts:

---

## **3. أهم الرموز في EBNF**

|الرمز|المعنى|
|---|---|
|`*`|repetition (0 أو أكتر)|
|`+`|repetition (1 أو أكتر)|
|`?`|optional|
|`( )`|grouping|

---

## **4. Examples**

### BNF:

```text
A → a A | ε
```

### EBNF:

```text
A → a*
```

---

### Example 2:

```text
stmt-seq → stmt { ; stmt }
```

يعني:

- stmt واحدة أو أكتر
    
- بينهم semicolon
    

---

## **5. Syntax Diagrams**

دي طريقة رسم بديلة للـ Grammar

### الفكرة:

- كل Rule → رسمه ك graph
    
- تمشي عليه زي flowchart
    

---

### Example:

```text
exp → number + number
```

تتحول لرسم:

- Start → number → + → number → End
    

---

## **6. ليه مهمين؟**

- EBNF → أسهل في الكتابة
    
- Syntax diagrams → أسهل في الفهم
    

---

# **3.6 Formal Properties of CFG**

---

## **1. CFG vs Regular Languages**

### Regular Languages:

- بسيطة
    
- تستخدم DFA/NFA
    

### CFG:

- أقوى
    
- تدعم recursion
    

---

## **2. Why CFG is stronger?**

لأنها تقدر تمثل:

- nested structures
    
- balanced parentheses
    
- if داخل if
    

---

### Example:

Regular ❌:

```text
a^n b^n
```

CFG ✔:

```text
S → a S b | ε
```

---

## **3. Closure Properties**

يعني: لو عندك لغتين → نقدر نعمل عمليات عليهم

### CFG supports:

- Union ✔
    
- Concatenation ✔
    
- Kleene star ✔
    

---

## **4. What CFG cannot do easily**

- ambiguity removal automatically ❌
    
- deterministic parsing دايماً ❌
    

---

## **5. Decidability**

بعض الأسئلة نقدر نجاوبها:

- هل string تنتمي للغة؟
    
- هل grammar ambiguous؟  (صعب جدًا)
    

---

## **6. Important Idea**

> CFG powerful but complex

---

# **3.7 Syntax of the TINY Language**

---

## **1. يعني ايه TINY؟**

لغة بسيطة للتعليم  
(زي mini programming language)

---

## **2. Tokens في TINY**

```text
if, then, else, end
repeat, until
read, write
identifier, number
+, -, *, /, <, =
( ), ; , :=
```

---

## **3. Sample Grammar**

---

### Program:

```text
program → stmt-sequence
```

---

### Statements:

```text
stmt-sequence → stmt ; stmt-sequence | stmt
```

---

### Statement:

```text
stmt → if-stmt | repeat-stmt | assign-stmt | read-stmt | write-stmt
```

---

## **4. If Statement**

```text
if-stmt → if exp then stmt-sequence end
        | if exp then stmt-sequence else stmt-sequence end
```

---

## **5. Repeat Statement**

```text
repeat-stmt → repeat stmt-sequence until exp
```

---

## **6. Assignment**

```text
assign-stmt → identifier := exp
```

---

## **7. Read / Write**

```text
read-stmt → read identifier
write-stmt → write exp
```

---

## **8. Expressions**

```text
exp → simple-exp [comparison-op simple-exp]
```

---

### Simple Expression:

```text
simple-exp → term { addop term }
```

---

### Term:

```text
term → factor { mulop factor }
```

---

### Factor:

```text
factor → ( exp ) | number | identifier
```

---

## **9. Example Program**

```text
read x;
if x < 10 then
   write x
else
   write 0
end
```

---

## **10. ليه مهم؟**

- بيجمع كل اللي فات:
    
    - CFG
        
    - Parsing
        
    - AST
        

---

# ** Final Full Lecture Summary**

---

## أنت كده فهمت:

### Parsing:

- Tokens → Structure
    

### CFG:

- Rules تحدد اللغة
    

### Derivation:

- بناء الجملة
    

### Trees:

- Parse Tree → detailed
    
- AST → simplified
    

### Ambiguity:

- مشكلة كبيرة
    
- تتحل بـ precedence أو grammar
    

### EBNF:

- shortcut للـ grammar
    

### CFG Power:

- تقدر تمثل nested structures
    

### TINY:

- تطبيق عملي لكل الكلام
    

---

# ** أهم نقاط امتحان (ركز هنا جدًا)**

- الفرق بين:
    
    - Parse Tree vs AST
        
    - Scanner vs Parser
        
    - CFG vs Regular
        
- Derivation (leftmost / rightmost)
    
- Ambiguity + Dangling else
    
- Precedence & associativity
    
- EBNF symbols

---
