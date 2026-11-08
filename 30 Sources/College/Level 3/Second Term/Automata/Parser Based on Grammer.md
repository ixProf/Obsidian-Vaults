---
title: "Parser Based on Grammer"
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


# يعني ايه Grammar أصلاً؟

الـ Grammar هي **القواعد اللي بتحدد ازاي التوكنز تتجمع مع بعض وتعمل جمل صحيحة** في اللغة.

يعني:

الـ Scanner يقول:

- دي `IDENTIFIER`
    
- دي `NUMBER`
    
- دي `KEYWORD`
    

لكن الـ Grammar تقول:

- هل ينفع `IDENTIFIER = NUMBER` ؟
    
- هل ينفع `if x > y:` وبعدها block؟
    
- هل ينفع `push(enemy)` ؟
    

فهي ببساطة:

```text
Grammar = Rules of Syntax
```

وده متوافق مع الملف اللي عندك، لأن السلايد بيقول إن الـ CFG هي الأداة اللي "تفرض قواعد تركيب الجملة" وإن الـ Parser بيستخدمها علشان يرمي Syntax Error لو التوكنز مش ماشية حسب القواعد.

---

# علاقتها بالـ Scanner والـ Parser

عندك 3 مراحل مهمين:

## 1) Scanner

بيحوّل الكود إلى Tokens

مثال:

```text
x = 10
```

يبقى:

```text
IDENTIFIER(x), ASSIGN(=), NUMBER(10)
```

## 2) Grammar

بتقول إن الشكل ده قانوني:

```text
Assignment -> IDENTIFIER "=" Expression
```

## 3) Parser

بيمشي على التوكنز ويحاول يطبق قواعد الـ Grammar

لو نجح:

- يبني AST
    

لو فشل:

- يرمي Syntax Error
    

---

# نوع الجرامر اللي بنستخدمها

الملف بيشرح **CFG = Context-Free Grammar**.  
ودي مناسبة للغات البرمجة لأنها تقدر تمثل:

- expressions
    
- conditions
    
- nested blocks
    
- الأقواس
    
- الـ if blocks
    

والملف كمان موضح إن regex لوحدها ما تكفيش لأنها ما تعرفش تتعامل مع nesting أو counting، بينما CFG تقدر تعمل ده بالـ recursion.

---

# مكونات الـ CFG

الملف قال إن فيه 4 أركان رئيسية: terminals, non-terminals, start symbol, productions.

تعالى نربطهم بلغتك.

---

## 1) Terminals

دي الحاجات النهائية اللي جاية من الـ Scanner، يعني التوكنز نفسها.

في لغتك أمثلة عليها:

- `IDENTIFIER`
    
- `NUMBER`
    
- `BOOLEAN`
    
- `KEYWORD`
    
- `ASSIGN`
    
- `COLON`
    
- `LPAREN`
    
- `RPAREN`
    
- `COMPARISON`
    
- `INDENT`
    
- `DEDENT`
    
- `NEWLINE`
    

يعني لما تقول:

```text
if x > y:
```

فالـ terminals هنا هي:

- `KEYWORD(if)`
    
- `IDENTIFIER(x)`
    
- `COMPARISON(>)`
    
- `IDENTIFIER(y)`
    
- `COLON(:)`
    

---

## 2) Non-Terminals

دي أسماء لمفاهيم مجردة في اللغة، يعني "أنواع جمل" أو "أجزاء تركيبية".

زي:

- `<Program>`
    
- `<Statement>`
    
- `<Assignment>`
    
- `<IfStatement>`
    
- `<Expression>`
    
- `<Condition>`
    
- `<Block>`
    

دي مش توكنز حقيقية، دي مجرد أسماء لقواعد.

مثلاً:

- `<Expression>` معناها "تعبير"
    
- `<Statement>` معناها "جملة"
    
- `<Program>` معناها "البرنامج كله"
    

---

## 3) Start Symbol

ده أول rule نبدأ منه.

في لغتك احنا اخترنا:

```text
<Program>
```

وده نفس اللي السلايد نبه عليه: ابدأ من `<Program>`.

وعندك في الكود ده مترجم إلى:

```python
def parse(self):
    return self.program()
```

يعني الـ parser يبدأ من `<Program>`.

---

## 4) Productions

دي القواعد نفسها.

مثال:

```text
<Assignment> = IDENTIFIER "=" <Expression>
```

يعني:

- الـ Assignment لازم يكون
    
    - identifier
        
    - وبعده =
        
    - وبعده expression
        

---

# الجرامر اللي كتبناها للغتك

خلينا نعيدها ونشرح كل سطر فيها.

---

## 1. البرنامج

```ebnf
<Program> = { <Statement> NEWLINE } ;
```

## معناها

البرنامج عبارة عن:

- صفر أو أكثر من الـ statements
    
- وكل statement بعدها newline
    

### الرمز `{ }`

في EBNF معناه:

- يتكرر صفر أو أكثر
    

فده معناه إن البرنامج ممكن يكون:

- سطر واحد
    
- سطرين
    
- 10 أسطر
    
- أو حتى فاضي
    

### مثال

```text
x = 10
y = 5
push(enemy)
```

ده كله `<Program>` لأنه عبارة عن مجموعة statements.

### في الـ parser

ده اتحول لـ:

```python
def program(self):
    statements = []

    while self.current_token().type != TokenType.EOF:
        ...
        statements.append(self.statement())
```

يعني:

- طول ما احنا مش عند نهاية الملف
    
- هات statement وضمها للبرنامج
    

---

## 2. الجملة

```ebnf
<Statement> =
      <Assignment>
    | <IfStatement>
    | <Command>
    | <Expression> ;
```

## معناها

أي سطر في البرنامج ممكن يكون واحد من دول:

- Assignment
    
- If statement
    
- Command
    
- Expression
    

### الرمز `|`

معناه "أو"

يعني الـ statement ممكن ياخد أكتر من شكل.

### أمثلة

#### Assignment

```text
x = 10
```

#### IfStatement

```text
if x > y:
    push(enemy)
```

#### Command

```text
loot(box)
```

#### Expression

```text
x + 5
```

### في الـ parser

ده مترجم في:

```python
def statement(self):
    token = self.current_token()

    if token.type == TokenType.IDENTIFIER and self.peek().type == TokenType.ASSIGN:
        node = self.assignment()
    elif token.type == TokenType.KEYWORD and token.value == "if":
        node = self.if_statement()
    elif token.type == TokenType.KEYWORD:
        node = self.command()
    else:
        node = self.expression()
```

يعني الـ parser بيشوف شكل التوكن الحالي ويقرر أي rule يطبق.

---

## 3. Assignment

```ebnf
<Assignment> =
    IDENTIFIER "=" <Expression> ;
```

## معناها

الـ assignment لازم يكون:

- اسم متغير
    
- ثم علامة =
    
- ثم expression
    

### مثال

```text
x = 10
health = x + 5
```

### دي ليه مهمة؟

لأنها بتحدد شكل تعريف أو تحديث المتغيرات.

### في الـ parser

```python
def assignment(self):
    name = self.match(TokenType.IDENTIFIER)
    self.match(TokenType.ASSIGN)
    expr = self.expression()
    return ("Assign", name.value, expr)
```

فهو بيطابق نفس القاعدة بالضبط:

- identifier
    
- assign
    
- expression
    

---

## 4. If Statement

```ebnf
<IfStatement> =
    "if" <Condition> ":" NEWLINE INDENT <Block> DEDENT
    [ "else" ":" NEWLINE INDENT <Block> DEDENT ] ;
```

دي من أهم القواعد في اللغة.

## معناها

الـ if statement يتكون من:

- كلمة `if`
    
- condition
    
- `:`
    
- newline
    
- indent
    
- block
    
- dedent
    

وبعدها اختياريًا:

- `else`
    
- `:`
    
- newline
    
- indent
    
- block
    
- dedent
    

---

## شرح الرموز

### `[ ]`

في EBNF معناها:

- optional
    
- يعني الجزء ده ممكن يوجد أو لا
    

فـ `else` هنا اختياري.

---

## مثال بدون else

```text
if x > y:
    push(enemy)
```

---

## مثال بـ else

```text
if x > y:
    push(enemy)
else:
    fallback(base)
```

---

## ليه INDENT و DEDENT موجودين؟

لأن لغتك indentation-based، زي Python.

فبدل ما نستخدم:

```text
{
}
```

بنستخدم:

- `INDENT` = بدأ block
    
- `DEDENT` = انتهى block
    

---

## في الـ parser

```python
def if_statement(self):
    self.match(TokenType.KEYWORD)  # if
    condition = self.condition()
    self.match(TokenType.COLON)
    self.match(TokenType.NEWLINE)
    self.match(TokenType.INDENT)

    block = self.block()

    self.match(TokenType.DEDENT)

    else_block = None
    if self.current_token().type == TokenType.KEYWORD and self.current_token().value == "else":
        ...
```

ده ترجمة حرفية تقريبًا للقاعدة.

---

## 5. Block

```ebnf
<Block> = { <Statement> NEWLINE } ;
```

## معناها

الـ block عبارة عن:

- صفر أو أكثر من الـ statements
    
- كل واحدة بعدها newline
    

### مثال

```text
    push(enemy)
    loot(box)
```

ده block فيه statementين.

### في الـ parser

```python
def block(self):
    statements = []

    while self.current_token().type != TokenType.DEDENT:
        statements.append(self.statement())

    return statements
```

يعني:

- اقرا statements
    
- لحد ما توصل لـ DEDENT
    
- يبقى block خلص
    

---

## 6. Condition

```ebnf
<Condition> =
    <Expression> <RelOp> <Expression> ;
```

## معناها

الشرط لازم يكون:

- expression
    
- relational operator
    
- expression
    

### أمثلة

```text
x > y
score == 10
health <= maxhealth
```

---

## ليه استخدمنا Expression يمين وشمال؟

علشان يبقى الشرط مرن.

يعني ينفع:

```text
x + 1 > y * 2
```

مش بس:

```text
x > y
```

---

## في الـ parser

```python
def condition(self):
    left = self.expression()
    op = self.match(TokenType.COMPARISON)
    right = self.expression()
    return ("Condition", op.value, left, right)
```

---

## 7. RelOp

```ebnf
<RelOp> = "==" | ">" | "<" | ">=" | "<=" ;
```

## معناها

المقارنة لازم تكون واحدة من دول:

- ==
    

- <
    
- > =
    
- <=
    

وده متوافق مع الـ Scanner لأنه عندك `COMPARISON` regex.

---

## 8. Expression

```ebnf
<Expression> = <Term> { ("+" | "-") <Term> } ;
```

دي أهم قاعدة في التعبيرات الحسابية.

## معناها

الـ expression يتكون من:

- term واحد
    
- وبعده ممكن يتكرر:
    
    - `+ term`
        
    - أو `- term`
        

### أمثلة

```text
5
x + 3
a - b + 10
```

### الرمز `{ ... }`

يعني ممكن يتكرر صفر أو أكثر.

فـ expression ممكن يكون:

- term واحدة فقط
    
- أو أكتر من عملية جمع/طرح
    

---

## ليه ماكتبناش:

```text
Expression -> Expression + Expression
```

علشان ده **left recursion**، وده السلايد حذر منه في top-down parsing.

وهو بيعمل مشكلة للـ recursive descent parser لأنه ممكن يدخل في infinite recursion.

علشان كده استخدمنا الشكل:

```text
Expression -> Term { (+|-) Term }
```

وده مناسب جدًا للـ top-down.

---

## في الـ parser

```python
def expression(self):
    node = self.term()

    while self.current_token().type == TokenType.OPERATOR and self.current_token().value in ("+", "-"):
        op = self.match(TokenType.OPERATOR)
        right = self.term()
        node = ("BinOp", op.value, node, right)

    return node
```

يعني:

- ابدأ بـ term
    
- وكل ما تلاقي `+` أو `-`
    
- خد term تانية
    
- وابني BinOp
    

---

## 9. Term

```ebnf
<Term> = <Factor> { ("*" | "/") <Factor> } ;
```

## معناها

الـ term عبارة عن:

- factor
    
- وبعده صفر أو أكثر من:
    
    - `* factor`
        
    - `/ factor`
        

### أمثلة

```text
5 * 3
x / y
a * b / c
```

---

## ليه فصلنا Expression عن Term؟

علشان **الأولوية precedence**.

إحنا عايزين:

```text
3 + 4 * 5
```

تتفهم كده:

```text
3 + (4 * 5)
```

مش:

```text
(3 + 4) * 5
```

فبنعمل:

- `Expression` للجمع والطرح
    
- `Term` للضرب والقسمة
    

وبكده الضرب والقسمة يبقوا أقوى.

وده مرتبط بجزء ambiguity في السلايد، اللي وضح إن جملة زي `34 - 3 * 42` ممكن يبقى ليها أكتر من تفسير لو الجرامر مش منظمة.

---

## في الـ parser

```python
def term(self):
    node = self.factor()

    while self.current_token().type == TokenType.OPERATOR and self.current_token().value in ("*", "/"):
        op = self.match(TokenType.OPERATOR)
        right = self.factor()
        node = ("BinOp", op.value, node, right)

    return node
```

---

## 10. Factor

```ebnf
<Factor> =
      NUMBER
    | IDENTIFIER
    | BOOLEAN
    | "(" <Expression> ")" ;
```

## معناها

الـ factor هو أبسط وحدة في التعبير، وممكن يكون:

- رقم
    
- متغير
    
- boolean
    
- expression بين أقواس
    

### أمثلة

```text
10
x
ALIVE
(5 + 3)
```

---

## ليه الأقواس مهمة؟

علشان تقدر تغير الأولوية.

مثلًا:

```text
(3 + 4) * 5
```

هنا الجمع لازم يحصل الأول بسبب الأقواس.

وده برضه شيء الـ CFG تقدر تمثله بسهولة بالـ recursion، على عكس regex.

---

## في الـ parser

```python
def factor(self):
    token = self.current_token()

    if token.type == TokenType.NUMBER:
        return ("Number", self.match(TokenType.NUMBER).value)

    elif token.type == TokenType.IDENTIFIER:
        return ("Identifier", self.match(TokenType.IDENTIFIER).value)

    elif token.type == TokenType.BOOLEAN:
        return ("Boolean", self.match(TokenType.BOOLEAN).value)

    elif token.type == TokenType.LPAREN:
        self.match(TokenType.LPAREN)
        node = self.expression()
        self.match(TokenType.RPAREN)
        return node
```

---

## 11. Command

```ebnf
<Command> =
    KEYWORD "(" [ <Arguments> ] ")" ;
```

## معناها

الـ command عندك شكله:

- keyword
    
- `(`
    
- arguments اختيارية
    
- `)`
    

### أمثلة

```text
push(enemy)
loot(box)
fallback(base)
drop()
```

---

## ليه عملنا command بالشكل ده؟

لأن لغتك DSL، وعندك كلمات gameplay زي:

- push
    
- loot
    
- fallback
    
- drop
    

فاخترنا نعاملها كأنها function-like commands.

دي مش قاعدة ثابتة من كتب الكومبايلرز، دي **قرار تصميم لغة**.

---

## `[ <Arguments> ]`

معناها arguments اختيارية.

فممكن command يبقى:

```text
drop()
```

أو:

```text
push(enemy)
```

---

## في الـ parser

```python
def command(self):
    keyword = self.match(TokenType.KEYWORD)
    self.match(TokenType.LPAREN)

    args = []

    if self.current_token().type != TokenType.RPAREN:
        args.append(self.expression())

        while self.current_token().type == TokenType.COMMA:
            self.match(TokenType.COMMA)
            args.append(self.expression())

    self.match(TokenType.RPAREN)

    return ("Command", keyword.value, args)
```

---

## 12. Arguments

```ebnf
<Arguments> =
    <Expression> { "," <Expression> } ;
```

## معناها

الـ arguments:

- تبدأ بـ expression واحدة
    
- وبعدها ممكن يتكرر:
    
    - comma
        
    - expression
        

### أمثلة

```text
enemy
x, y
x+1, y*2, 5
```

---

# ليه الجرامر دي كويسة للـ Recursive Descent؟

الملف بيقول إن top-down parsing لازم يتجنب:

- left recursion
    
- non-determinism
    

والجرامر دي مناسبة لأنه:

## 1) مفيهاش left recursion

إحنا ماكتبناش:

```text
Expression -> Expression + Term
```

## 2) واضحة في الاختيارات

`Statement` بيتحدد بالنظر لأول token غالبًا:

- `IDENTIFIER` وبعده `=` → assignment
    
- `KEYWORD if` → if
    
- `KEYWORD` → command
    
- غير كده → expression
    

## 3) فيها precedence

Expression / Term / Factor

---

# مثال كامل على الجرامر

الكود:

```text
x = 10
y = 5

if x > y:
    push(enemy)
    loot(box)
else:
    fallback(base)
```

---

## التحليل حسب الجرامر

### `<Program>`

البرنامج كله

فيه statements:

1. `x = 10` → `<Assignment>`
    
2. `y = 5` → `<Assignment>`
    
3. `if x > y: ...` → `<IfStatement>`
    

---

## أول statement

```text
x = 10
```

يطابق:

```text
<Assignment> = IDENTIFIER "=" <Expression>
```

وـ `<Expression>` هنا:

- `<Term>`
    
- `<Factor>`
    
- `NUMBER`
    

---

## if statement

```text
if x > y:
    push(enemy)
    loot(box)
else:
    fallback(base)
```

يطابق:

```text
<IfStatement> =
    "if" <Condition> ":" NEWLINE INDENT <Block> DEDENT
    [ "else" ":" NEWLINE INDENT <Block> DEDENT ]
```

### `<Condition>`

```text
x > y
```

يعني:

- `<Expression>` = x
    
- `<RelOp>` = >
    
- `<Expression>` = y
    

### `<Block>`

```text
push(enemy)
loot(box)
```

كل واحدة `<Command>`

### else block

```text
fallback(base)
```

برضه `<Command>`

---

# الجرامر دي بتمثل ايه في الناتج؟

الناتج بتاع parser عندك AST، مثلًا:

```python
('Program', [
  ('Assign', 'x', ('Number', '10')),
  ('Assign', 'y', ('Number', '5')),
  ('If',
    ('Condition', '>', ('Identifier', 'x'), ('Identifier', 'y')),
    [
      ('Command', 'push', [('Identifier', 'enemy')]),
      ('Command', 'loot', [('Identifier', 'box')])
    ],
    [
      ('Command', 'fallback', [('Identifier', 'base')])
    ]
  )
])
```

الـ Grammar بتحدد البنية، والـ Parser يترجمها لـ AST.

---

# الفرق بين الجرامر و AST

الجرامر تقول:

```text
IfStatement = if Condition : NEWLINE INDENT Block DEDENT ...
```

لكن الـ AST ما يحتفظش بكل التفاصيل اللفظية.

يعني:

- ممكن ما يحتفظش بـ `:` نفسها
    
- ولا NEWLINE
    
- ولا أسماء وسيطة زي `<Term>` و `<Factor>`
    

وده يتفق مع السلايد اللي قال إن الـ AST أبسط من parse tree ويشيل الـ syntactic sugar.

---

# رموز EBNF اللي استخدمناها

لازم تبقى حافظ معناهم:

## `=`

تعريف rule

## `|`

أو

## `{ ... }`

تكرار صفر أو أكثر

## `[ ... ]`

اختياري

## `;`

نهاية rule

---

# ليه ممكن نكتب جرامر مختلفة لنفس اللغة؟

لأن الجرامر مش "قانون كوني"، دي طريقة لوصف اللغة.

مثلًا:  
بدل:

```text
push(enemy)
```

ممكن تصمم اللغة كده:

```text
push enemy
```

وساعتها الجرامر تتغير إلى:

```text
<Command> = KEYWORD IDENTIFIER ;
```

فممكن تكتب جرامر تانية، طالما:

- تصف اللغة اللي انت عايزها
    
- مناسبة لنوع الـ parser
    
- مفيهاش ambiguity قاتلة
    
- مفيهاش left recursion لو شغال recursive descent
    

---

# أهم 3 أهداف حققتها الجرامر بتاعتك

## 1) وصفت شكل اللغة

يعني ايه assignment، if، expression، command

## 2) سهلت كتابة parser

كل non-terminal بقى function

## 3) منعت مشاكل معروفة

زي:

- left recursion
    
- ambiguity في الأولوية
    

---

# الخلاصة النهائية

الجرامر بتاعتك هي blueprint للغة.

فيها:

- `<Program>` علشان البرنامج كله
    
- `<Statement>` علشان أنواع الجمل
    
- `<Assignment>` للمتغيرات
    
- `<IfStatement>` للتحكم
    
- `<Block>` للبلوكات
    
- `<Condition>` للشروط
    
- `<Expression>`, `<Term>`, `<Factor>` للتعبيرات الحسابية
    
- `<Command>` و `<Arguments>` لأوامر اللغة
    

والـ parser بتاعك حرفيًا مبني عليها:

- كل rule تقريبًا اتحولت لـ function
    
- وكل function بتتحقق من ترتيب معين للتوكنز
    
- ولو الترتيب مش مطابق، بيطلع Syntax Error
    

عايز بعد كده أشرحلك **الجرامر سطر سطر مع مثال لكل rule من الكود بتاعك** في صورة جدول مرتب؟