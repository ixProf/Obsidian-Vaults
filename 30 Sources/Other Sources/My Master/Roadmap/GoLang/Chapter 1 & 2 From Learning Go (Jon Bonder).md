---
title: "Chapter 1 & 2 From Learning Go (Jon Bonder)"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages, masters]
created: 2026-10-05
updated: 2026-10-06
source:
related: []
---

# Chapter 1: Setting Up Environments

علشان تثبت اللغة بشكل كويس 
اول حاجة تعرف نظام جهازك فلو كان MacOs

انت هتنزل Go بإستخدام Homebrew مع الكومند `brew install go` 

ولو كنت ويندوز ف انت هتنزله بشكل طبيعي من الموقع بتاعه بدون اي مشاكل وعلشان تتأكد إنه نزل؟
`go version`

في لغة Go بعض الكومند الي ممكن تستخدمها في ال CMD غير `go version` مهمين زي

- اول حاجه 
`go build` ودا عبارة عن Compiler بحيث انه يعملك build للأبلكيشن بتاعك
- تاني حاجه
   `go fmt` ودا بيستخدم لتنسيق الكود بتاعك بشكل تلقائي حسب الـ Go formatting conventions

- تالت حاجه
   `go mod` ودا مسؤول عن إدارة الـ dependencies والـ modules بتوع المشروع

- رابع حاجه
   `go test` ودا بيستخدم لتشغيل الـ tests والتأكد إن الكود شغال بالشكل المطلوب

- خامس حاجه
   `go vet` ودا بيعمل فحص للكود وبيحاول يكتشف بعض الأخطاء والمشاكل الشائعة اللي ممكن تحصل

- سادس حاجه
   `go run` ودا بيشغل برنامج Go مباشرة من غير ما تحتاج تعمل build بشكل منفصل

- سابع حاجه
   `go get` ودا بيستخدم لإضافة أو تحديث dependencies في المشروع

- ثامن حاجه
   `go install` ودا بيستخدم لتثبيت Go tools أو packages كـ executable تقدر تستخدمه من الـ command line

الفكرة إن أغلب الـ tools اللي هحتاجها أثناء شغلي في Go موجودة تحت أمر `go`، وكل command ليه وظيفة معينة بتساعدني في بناء المشروع وتشغيله واختباره وتنظيم الـ dependencies.

## Making First Go Program

لما نيجي نعمل أول برنامج باستخدام Go، في حاجة لازم نعملها الأول وهي الـModule.

طيب يعني إيه Module وليه بنعمله؟

الـ Module هو المشروع نفسه في Go، وبيحتوي على الـ source code بتاع المشروع وكمان بيحدد الـ dependencies اللي المشروع بيعتمد عليها.

يعني بدل ما يكون عندي مجرد ملفات Go، بيكون عندي Project منظم وليه معلومات واضحة عن:
- اسم المشروع
- إصدار Go المستخدم
- الـ dependencies اللي المشروع محتاجها

علشان نعمل Module جديد، الأول بنعمل directory للمشروع وندخل جواه:

`mkdir ch1`
`cd ch1`

بعد كدا بنعمل الـ Module باستخدام:

`go mod init hello_world`

الأمر دا بيعمل ملف اسمه:

`go.mod`

والملف دا بيكون موجود في الـ root directory بتاع المشروع.

ممكن يكون محتواه بالشكل دا:

`module hello_world`
`go 1.20`

السطر الأول بيحدد اسم الـ Module، والسطر التاني بيحدد إصدار Go المطلوب للمشروع.

الـ `go.mod` كمان بيحتوي على الـ dependencies بتاعة المشروع، ودا بيخليه شبيه بفكرة `requirements.txt` في Python.

بالتالي ببساطة:

Module = Project + معلوماته + Dependencies

ومش المفروض نعدل ملف `go.mod` يدويًا، لكن نستخدم أوامر Go زي:

`go get`

و

`go mod tidy`

علشان ندير الـ dependencies ونحافظ على الملف منظم.

### go build

وهي بداية كتابة اول كود بإستخدام go lang
```go
package main
import "fmt"

func main(){
	fmt.Println("Hello, World");
}
```

أول سطر هو عبارة عن تعريف للـ Package.

وفي خلال الـGo Module الكود بيكون منظم جوا Package أو أكتر.

الـ `main` package في الـ Go Module بتحتوي على الكود اللي هيبدأ بيه برنامج الـ Go.

بعد كدا عندنا الـ import declaration، ودي بنستخدمها علشان نحدد الـ packages اللي الملف محتاج يستخدمها.

في المثال بتاعنا بنستخدم `fmt`، وهي Package موجودة في الـGo Standard Library

وعلشان نستخدمها بنكتب:
`import "fmt"`
وبعد كدا عندنا الـ **main function**:
`func main()`

ودي أهم Function في برنامج Go، لأن تنفيذ البرنامج بيبدأ منها لما تكون موجودة داخل الـ `main` package.

جوا الـ `main function` بنستخدم:

`fmt.Println("Hello, world!")`

ودي بتستدعي الـ `Println` function الموجودة في `fmt` package علشان تطبع النص على الـ terminal.

بعد ما نخلص كتابة البرنامج ونحفظ الملف، نقدر نعمل له build باستخدام:

`go build`

الأمر دا بيعمل **executable file** من برنامج Go.

على Windows هيكون غالبًا اسمه:

`hello_world.exe`

وعلى Linux أو macOS:

`hello_world`

وبعد كدا نقدر نشغل الـ executable ونشوف:
`go run hello.go`
`Hello, world!`

بالتالي شكل البرنامج الأساسي في Go بيكون تقريبًا:

Package declaration  
Import packages  
Main function  
Code execution

---

### go fmt 

دي عبارة عن كومند بتظبطلك ال formation بتاع الكود بتاعك على ال standard format الي حطاه جو ليها، ودا هيوفر عليك المشاكل الي ممكن تلاقيها في ال syntax error الخاصة بال indentation ولا غيره فعلشان كدا يستحسن قبل ما ترن الكود تديها واحدة `go fmt` وترن يمعلم علشان ميحصلش مشاكل

---

#### Semicolon insertion rule
زي أي لغة مثلا C أو Java، Go بتحتاج للـ **semicolon** في نهاية كل **statement**، بس الفرق هنا إيه؟
إن مبرمجين Go عمرهم ما بيحطوا الـ `semicolon` بنفسهم.
الـ **Go Compiler** بيضيفها تلقائيًا حسب مكان الـ newline في الكود، ودا اسمه **Semicolon Insertion**.

بمعنى إنك لما تكتب:
`fmt.Println("Hello, world!")`
الـ compiler بيعتبرها كأنها:
`fmt.Println("Hello, world!");`

من غير ما تحتاج تكتب الـ `;` بنفسك.
والـ compiler بيضيف الـ semicolon تلقائيًا لو آخر حاجة قبل الـ newline كانت حاجات معينة، زي:

- **Identifier** زي `x` أو `int`
- **Literal** زي رقم أو String
- `return`
- `break`
- `continue`
- `++
- `--`
- `)`
- `}`

وعلشان كدا في Go لازم نخلي الـ `{` في نفس السطر مع الـ statement اللي قبلها.

يعني الصح:
`func main() {`

لكن لو كتبت:
`func main()`  
`{`
الـ compiler هيعتبر إن الـ `)` في نهاية السطر معناها إن الـ statement خلصت، فيضيف semicolon تلقائيًا:

`func main();`
وبالتالي الكود هيطلع **syntax error**.

فـ **Semicolon Insertion** مش بس بتخلينا مش محتاجين نكتب `;`، لكنها كمان بتفرض طريقة معينة لكتابة الكود، وخصوصًا مكان الـ `{`.

---
### go vet

في Go ممكن أكتب كود يكون **Syntax بتاعه صحيح** والـcompiler يقبله عادي، لكن الكود نفسه يكون فيه **Bug أو حاجة غالبًا غلط**.

علشان كدا Go عندها command اسمه:
`go vet`

وده بيعمل **scan للكود** وبيحاول يكتشف بعض الأخطاء والمشاكل الشائعة اللي الـ compiler مش بيقدر يكتشفها.
مثلاً لو كتبت:
`fmt.Printf("Hello, %s!\n")`

الـ `%s` هنا عبارة عن **placeholder**، والمفروض أديها value بعد الـ template.
لكن أنا ما اديتش أي value.
الكود ده ممكن يعمل **compile وrun**، لكن فيه مشكلة.

لما أشغل:

`go vet ./...`

هيكتشف المشكلة ويقول إن الـ `%s` محتاجة argument، لكن مفيش argument موجود.

والحل إننا نضيف القيمة:

`fmt.Printf("Hello, %s!\n", "world")`

فتقدر تعتبر إن:

الـ`go fmt` بيظبط **formatting** بتاع الكود.

ال`go vet` بيفحص الكود ويدور على **possible bugs** حتى لو الكود valid وبيعمل compile.

بس مهم تعرف إن `go vet` مش بيقدر يكتشف كل أنواع الأخطاء، لكنه بيغطي مجموعة من الأخطاء الشائعة.

---

### Makefiles

الـ IDE بيسهل علينا كتابة وتشغيل الكود، لكن المشكلة إنه صعب نعتمد عليه في **automation**.

في الـ software development مهم إن عملية الـ build تكون **repeatable وautomatable**، يعني أي developer يقدر يعمل نفس خطوات الـ build في أي وقت ومن أي جهاز.

علشان كدا Go developers ممكن يستخدموا حاجة اسمها **Makefile**.

الـ Makefile هو ملف بنحدد فيه مجموعة من الـ operations اللي محتاجين نعملها في المشروع، والـ order اللي لازم تتنفذ بيه.

مثلاً:
ال`fmt`  يعمل formatting للكود

ال`vet` يفحص الكود بحثًا عن possible bugs

ال`build` يعمل build للبرنامج

والـ Makefile ممكن يخلي الـ build process كله يحصل بأمر واحد:

`make`

مثلاً:

`make`

ينفذ:

`go fmt ./...`  
`go vet ./...`  
`go build`

يعني بدل ما كل مرة أفتكر وأكتب كل command لوحده، أمر واحد ينفذ كل الخطوات بالترتيب.

### أهم مفاهيم الـ Makefile

كل operation في الـ Makefile اسمها **Target**.

مثلاً:

`fmt:`

ده Target اسمه `fmt`.

والأوامر اللي تحته هي الـ tasks اللي هتتنفذ لما أطلب الـ target.

ولو كتبت:

`build: vet`

ده معناه إن `vet` لازم يتنفذ الأول قبل `build`.

أما:

`.DEFAULT_GOAL := build`

فده معناه إن لما أكتب `make` من غير ما أحدد target، هيتم تشغيل `build`.

و:

`.PHONY: fmt vet build`

بتقول لـ `make` إن دول targets مش files حقيقية، علشان مايحصلش confusion لو كان عندي file أو directory بنفس الاسم.

مهم جدًا: الـ commands الموجودة تحت الـ target لازم تبدأ بـ **Tab** مش spaces، لأن Makefiles حساسة جدًا للـ indentation.

على Windows، `make` مش بيكون موجود بشكل افتراضي، فلازم تثبته بشكل منفصل.
 ```yaml
.DEFAULT_GOAL := build  
.PHONY:fmt vet build  
fmt:  
go fmt ./...  
vet: fmt  
go vet ./...  
build: vet  
go build
 ```

### Go Compatibility Promise

من أهم مميزات Go إن الـ Go Team مهتمة جدًا بـ **Backward Compatibility**.

يعني لما ينزل إصدار جديد من Go، المفروض إن الكود المكتوب بإصدار أقدم يفضل شغال بدون ما يحتاج تغييرات كبيرة.

الـ **Go Compatibility Promise** بتقول إن Go مش هتعمل breaking changes في الـ language أو الـ standard library في الإصدارات اللي بتبدأ بـ `1`، إلا لو التغيير ضروري لإصلاح **Bug أو Security Issue**.

وده معناه إن Go بتحاول تخلي تحديثات اللغة **incremental** بدل ما كل إصدار جديد يكسر الكود القديم.

لكن في نقطة مهمة:

الـ compatibility guarantee دي مش بتنطبق بشكل كامل على **go commands** نفسها.

يعني ممكن يحصل تغيير في الـ flags أو functionality الخاصة بأوامر زي:

`go build`  
`go get`  
`go mod`

فـ لازم ناخد النقطة دي في الاعتبار.

### Updating Go

برامج Go بتتحول إلى **standalone native binaries**، وبالتالي البرنامج اللي عملته بـ Go مش محتاج Go يكون مثبت على الجهاز اللي هيشغله.

وكمان تقدر يكون عندك programs مبنية بإصدارات مختلفة من Go وتشتغل في نفس الوقت على نفس الجهاز.

ولما تحتاج تحدث Go، الطريقة بتختلف حسب الـ operating system، لكن لو ثبت Go باستخدام package manager زي Homebrew أو Chocolatey، تقدر تستخدمه لتحديث Go بسهولة.

---

# Chapter 2: Predeclared Types and Declarations

الشابتر ده بيبدأ يدخلنا في الـGo language نفسها بعد ما خلصنا إعداد الـdevelopment environment.

الفكرة الأساسية اللي الكتاب بيأكد عليها من البداية هي إننا لما نكتب Go code، مش بس المهم إن الكود يشتغل، لكن الأهم إن **الكود يوضح الـintent بتاعنا**.

يعني لما حد يقرأ الكود يعرف بسهولة:

- المتغير ده نوعه إيه؟
- ليه اتعمل؟
- هل المفروض يتغير؟
- هل القيمة دي ثابتة؟
- هل الـconversion مقصود؟
- هل الـzero value مقصودة؟


وده سبب إن Go أحيانًا بتكون أكثر explicit من لغات تانية.

---

## 1. The Predeclared Types

الـGo فيها مجموعة من الـtypes موجودة أصلًا في اللغة، ودي اسمها:

**Predeclared Types**
ومن أمثلتها:
- Boolean
- Integer
- Floating-point
- Complex
- String
    

الأنواع دي موجودة في اللغة نفسها، ==وبالتالي مش محتاجين نعمل package أو import علشان نستخدمها.==

الفكرة المهمة هنا إن Go عندها types أكتر من بعض اللغات، وده ممكن يكون مختلف لو جاي من لغة زي JavaScript مثلًا.

لكن وجود الأنواع دي مش معناه إننا نستخدم أي type وخلاص.
الكتاب بيركز إن اختيار الـtype لازم يكون واضح ومناسب للـuse case.

---

## 2. The Zero Value

من أهم أفكار Go إن أي variable نعمله declaration من غير ما نديه value، Go بتديله قيمة افتراضية اسمها:

**Zero Value**

مثال:
```go
var flag bool
```

هنا `flag` اتعمله declaration لكن إحنا ماحطيناش value.

Go هتخليه:
```go
false
```

والـzero value بتختلف حسب الـtype.
أمثلة:

```text
bool       → false
integer    → 0
float      → 0
string     → ""
```

الفكرة إن Go بتخلي الـvariable في حالة واضحة بدل ما يكون عنده قيمة غير معروفة.
وده بيساعد على تقليل بعض أنواع الـbugs اللي ممكن تظهر في لغات زي C وC++ لما يكون عندك variable اتعمله declaration لكن مااتحددش له value.

يعني لما تشوف:

```go
var count int
```

تقدر مباشرة تعرف إن:

```text
count = 0
```

من غير ما تحتاج تدور في الكود على initialization تاني.

---

## 3. Literals

الـliteral هو value إحنا بنكتبها بشكل مباشر في الـcode.

مثلًا:

```go
10
3.14
'a'
"Hello"
true
```

دي كلها literals.

وGo عندها عدة أنواع من الـliterals، وأهمهم:

- Integer literals
- Floating-point literals
- Rune literals
- String literals

وفي نوع إضافي هنشوفه مع الـcomplex numbers وهو imaginary literals.

---

## 4. Integer Literals

الـinteger literal هو sequence من الأرقام بيمثل عدد صحيح.

مثلًا:

```go
10
100
500
1234
```

بشكل افتراضي، الأرقام دي بتكون **base 10**.

لكن Go بتسمح لنا نكتب أرقام باستخدام bases مختلفة.

### Binary

الـbinary بيستخدم prefix:

```text
0b
```

مثال:

```go
0b1010
```

وده رقم مكتوب بالـbase 2.

### Octal

الـoctal بيستخدم:

```text
0o
```

مثال:

```go
0o777
```

والكتاب بيذكر إن وجود `0` لوحدها في بداية الرقم ممكن يمثل octal برضه، لكن ماينصحش باستخدام الطريقة دي لأنها ممكن تكون confusing.

الأفضل:

```go
0o777
```

بدل:

```go
0777
```

### Hexadecimal

الـhexadecimal بيستخدم:

```text
0x
```

مثال:

```go
0xFF
```

وممكن تستخدم uppercase أو lowercase في الـprefix.

---

## 5. Underscores in Numbers

عندك Go بتسمـح إننا نحط `_` داخل الـnumeric literals علشان نخلي الأرقام الطويلة أسهل في القراءة.

مثال:

```go
1_234_567
```

بدل:

```go
1234567
```

الـunderscore مش بيغير قيمة الرقم.

يعني:

```go
1_000_000
```

نفس:

```go
1000000
```

لكن الأول أسهل في القراءة.

فيه قواعد لاستخدام `_`:

مينفعش يكون في بداية الرقم:

```text
_123
```

ومينفعش يكون في نهاية الرقم:

```text
123_
```

ومينفعش يكونوا جنب بعض:

```text
1__000
```

نقدر technically نحط underscore بين كل رقم:

```go
1_2_3_4
```

لكن الكتاب بينصح إننا مانعملش كده، لأن الهدف من `_` هو تحسين readability مش العكس.

مثلًا في decimal:

```go
1_234_567
```

وفي binary أو hexadecimal ممكن نستخدمه لتقسيم الـbits بشكل منطقي.

---

## 6. Floating-Point Literals
الـfloating-point literal هو رقم فيه fractional portion.
مثل:

```go
3.14
10.5
0.25
```
وممكن كمان نستخدم exponent.

مثال:

```go
6.03e23
```

الـ`e` هنا بتستخدم للتعبير عن الـexponent.

الGo بتسمح كمان بكتابة floating-point numbers بالـhexadecimal باستخدام:

```text
0x
```

مع `p` للـexponent.

مثال:

```go
0x12.34p5
```

والكتاب بيذكر إن الرقم ده بيساوي:

```text
582.5
```

بالـdecimal.

وزي الـinteger literals، نقدر نستخدم `_` في الـfloating-point literals لتحسين القراءة.

---

## 7. Rune Literals

الـrune literal بيمثل ==character واحد.==

وفي Go بنكتب الـrune باستخدام:

```go
'a'
```

يعني الـsingle quotes للـrune.
وده مهم جدًا لأن single quotes وdouble quotes في Go مش interchangeable
مثلًا:
```go
'a'
```
ده rune.
لكن:

```go
"a"
```

ده string.

الـrune ممكن يتكتب بأكثر من شكل.

مثال character عادي:

```go
'a'
```

أو باستخدام octal:

```go
'\141'
```

أو hexadecimal:

```go
'\x61'
```

أو Unicode:

```go
'\u0061'
```

أو:

```go
'\U00000061'
```

وفيه كمان escape sequences مهمة:

```text
'\n'   newline
'\t'   tab
'\''   single quote
'\\'   backslash
```

لكن عمليًا، الكتاب بينصح إننا نستخدم الشكل الواضح للـcharacter بدل numeric escapes إلا لو الـnumeric representation نفسها بتخلي الكود أوضح.

---

## 8. String Literals

في Go عندنا طريقتين أساسيتين لكتابة الـstrings.

### Interpreted String Literal

وده النوع اللي بنكتبه باستخدام double quotes:

```go
"Greetings and Salutations"
```

الـstring هنا اسمه **interpreted** لأن Go بتفسر الـescape sequences الموجودة داخله.

مثلًا:

```go
"Greetings and\n\"Salutations\""
```

هنا:

```text
\n
```

بتتحول إلى newline.

و:

```text
\"
```

بتخلي double quote تظهر داخل الـstring.

في الـinterpreted string، فيه characters مينفعش تظهر بشكل مباشر من غير escaping:

- unescaped backslash
- unescaped newline
- unescaped double quote

---
## 9. Raw String Literals
لو إحنا محتاجين نكتب strings فيها:

- backslashes
- double quotes
- newlines

فالـraw string literal بيكون أسهل.

الـraw string بيتكتب باستخدام backquotes:

```go
`Greetings and
"Salutations"`
```

هنا الـcharacters بتتكتب زي ما هي تقريبًا.

مفيش escape character في الـraw string.

يعني لو كتبت:

```go
`Hello\nWorld`
```

الـ`\n` مش هيتحول إلى newline.

هيفضل:

```text
Hello\nWorld
```

الـraw string يقدر يحتوي على أي character تقريبًا، ماعدا الـbackquote نفسها.

---
## 10. Literals Are Untyped
من الأفكار المهمة جدًا في Go:
Literals are untyped.
يعني لما نكتب:
```go
10
```
فالـliteral نفسها مش مرتبطة بشكل نهائي بـtype معين بمجرد إننا كتبناها.
لو الـcontext محتاج يحدد type، Go بتستخدم الـdefault type المناسب.
وده هنشوف تأثيره بشكل أوضح لما نتكلم عن:

```go
var
:=
```

لأن في الحالات اللي الـtype مش مكتوب فيها بشكل explicit، Go محتاجة تحدد type للـliteral.

مثال:

```go
var x = 10
```

هنا `10` integer literal، والـdefault type بتاعه هو:

```go
int
```

---

## 11. Booleans

الـ`bool` type بيمثل Boolean values.

وعنده قيمتين فقط:

```go
true
false
```

مثال:

```go
var flag bool
```

بما إن مفيش value اتحددت، فالـzero value بتاعة `bool` هي:

```go
false
```

مثال تاني:

```go
var isAwesome = true
```

هنا variable اسمه `isAwesome` وقيمته `true`.

---

## 12. Numeric Types

Go عندها عدد كبير نسبيًا من الـnumeric types.

الكتاب بيقسمهم إلى 3 مجموعات:

1. Integer
2. Floating-point
3. Complex

وده ممكن يكون كتير لو جاي من لغة زي JavaScript اللي عندها numeric type واحد بشكل أساسي.
لكن مش كل الأنواع دي بنستخدمها بنفس المعدل.
فيه أنواع أساسية بنستخدمها كثير، وفيه أنواع استخدامها أكثر تخصصًا.

---

## 13. Integer Types

Go بتوفر:

- signed integers
- unsigned integers

وبأحجام مختلفة من 1 byte إلى 8 bytes.

## Signed Integers

```text
int8
int16
int32
int64
```

الـsigned integer يقدر يمثل أرقام موجبة وسالبة.

|Type|Range|
|---|---|
|`int8`|-128 → 127|
|`int16`|-32768 → 32767|
|`int32`|-2147483648 → 2147483647|
|`int64`|-9223372036854775808 → 9223372036854775807|

## Unsigned Integers

```text
uint8
uint16
uint32
uint64
```

الـunsigned integers مش بتخزن أرقام سالبة.

|Type|Range|
|---|---|
|`uint8`|0 → 255|
|`uint16`|0 → 65535|
|`uint32`|0 → 4294967295|
|`uint64`|0 → 18446744073709551615|

والـzero value لكل الـinteger types هي:

```text
0
```

---

## 14. Special Integer Types

Go عندها أسماء خاصة لأنواع integer معينة.

## byte

الـ`byte` هو alias لـ:

```go
uint8
```

يعني:

```go
byte
```

و:

```go
uint8
```

بيشيروا لنفس الـtype.

علشان كده ممكن تعمل operations بينهم.

لكن في Go code عادةً هنشوف:

```go
byte
```

أكتر من:

```go
uint8
```

لأن `byte` أوضح لما بنتعامل مع bytes.

---

## 15. int

الـ`int` مختلف شوية.

على 32-bit CPU:

```text
int = 32-bit signed integer
```

وعلى معظم 64-bit CPUs:

```text
int = 64-bit signed integer
```

يعني حجم `int` بيعتمد على الـplatform.

وده معناه إن `int` مش مضمون يكون نفس الحجم على كل جهاز.

مثلًا مينفعش تعمل مباشرة:

```go
var x int = 10
var y int32 = 20

x + y
```

لازم تعمل explicit type conversion.

لأن Go مش بتعمل automatic type promotion بين الأنواع.

كمان الـinteger literals بشكل افتراضي بتاخد:

```go
int
```

---

## 16. uint

الـ`uint` مشابه لـ`int` في موضوع الحجم، لكن الفرق إنه:

**unsigned**

يعني القيم بتاعته دايمًا:

```text
0 أو أكبر
```

وحجمه بيعتمد على الـplatform بنفس فكرة `int`.

---

## 17. rune و uintptr

فيه اسمين إضافيين لأنواع integers:

```text
rune
uintptr
```

الـ`rune` هنرجع له بالتفصيل لما نتكلم عن strings والـUnicode.

أما `uintptr` فهنشوفه في جزء متقدم من الكتاب متعلق بالـpointers.

---

## 18. Choosing Which Integer to Use

مع كل الاختيارات دي، السؤال الطبيعي:

**أستخدم أنهي integer؟**

الكتاب بيدي 3 قواعد بسيطة.

### Rule 1

لو بتتعامل مع binary file format أو network protocol بيحدد integer بحجم أو sign معين، استخدم الـtype المطابق.

مثلًا لو الـprotocol محتاج 32-bit unsigned integer، استخدم:

```go
uint32
```

مش `int`.

### Rule 2

لو بتكتب library function المفروض تشتغل مع أي integer type، استخدم Go generics علشان تمثل أنواع الـintegers المختلفة.

وده موضوع هنشوفه لاحقًا في الـgenerics.

### Rule 3

في كل الحالات الأخرى:

**استخدم `int`.**

يعني غالبًا لما بتعمل application عادي ومفيش سبب محدد لاستخدام `int32` أو `uint64` أو غيره، استخدم:

```go
int
```

الكتاب كمان بيشير إلى وجود legacy code فيه functions مختلفة لـ`int64` و`uint64`، وده كان أكثر شيوعًا قبل إضافة generics إلى Go.

---

## 19. Integer Operators

الـintegers بتدعم العمليات الحسابية المعتادة:

```text
+
-
*
/
%
```

الـ`%` هو modulus، وبيجيب باقي القسمة.

مثال:

```go
10 % 3
```

الناتج:

```text
1
```

### Integer Division

لما تعمل division بين integers، الناتج بيكون integer.

مثال:

```go
10 / 3
```

الناتج:

```text
3
```

مش:

```text
3.333...
```

لو عايز نتيجة floating-point، لازم تحول القيم إلى floating-point type.

وكمان القسمة على zero بالنسبة للـinteger بتسبب:

```text
panic
```

الـinteger division في Go بتعمل truncation toward zero.

---

## 20. Assignment Operators

ممكن ندمج arithmetic operator مع =

مثال:

```go
var x int = 10
x *= 2
```

بعد السطر ده:

```text
x = 20
```

والأنواع المتاحة:

+=
-=
\*=
/=
%=


---

## 21. Integer Comparisons

ممكن نقارن integers باستخدام:

==
!=
\>
\>=
<
<=


مثال:

```go
x == y
x != y
x > y
```

والنتيجة بتكون `bool`.

---

## 22. Bitwise Operators

Go كمان بتوفر operators للتعامل مع الـbits.

## Shift

```text
<<
>>
```

للـleft shift والـright shift.

## Bitwise Operations

```text
&
|
^
&^
```

حيث:

```text
&  → AND
|  → OR
^  → XOR
&^ → AND NOT
```

وممكن نستخدم assignment versions منها:

&=
|=
^=
&^=
<<=
\>>=

الـoperators دي مهمة خصوصًا في التعامل مع الـbits والـbit masks وبعض التطبيقات منخفضة المستوى.

---

## 23. Floating-Point Types

Go عندها نوعين للـfloating-point:

```text
float32
float64
```

الـ`float32` بيستخدم 32 bits.

والـ`float64` بيستخدم 64 bits.

الـ`float64` عنده range أكبر وprecision أعلى.

والـzero value للاتنين:

```text
0
```

الكتاب بيوصي بشكل واضح:

**استخدم `float64` إلا لو عندك سبب محدد لاستخدام `float32`.**

من الأسباب الممكنة إنك تكون محتاج compatibility مع format موجود بالفعل.

كمان floating-point literals default type بتاعها:

```go
float64
```

فـ`float64` غالبًا أبسط اختيار.

---

## 24. Floating-Point Precision

الـfloating-point numbers بتستخدم IEEE 754.

وده بيديها range كبير جدًا، لكن في المقابل عندها **limited precision**.

يعني الـfloat مش قادر يمثل كل قيمة ممكنة بشكل exact.

هو بيخزن أقرب approximation للقيمة.

وده معناه إن:

```text
floating-point value ≠ always exact decimal value
```

وده سبب مهم جدًا إننا **ما نستخدمش floating-point لتمثيل money** أو أي value لازم تكون exact decimal representation.

الـfloats مناسبة أكثر لحاجات زي:

- graphics
- statistics
- scientific operations
    

لما تكون approximation مقبولة.

---

## 25. IEEE 754

Go بتستخدم IEEE 754 لتخزين floating-point numbers.

التفاصيل الرياضية للـspecification مش محور الشابتر، لكن المهم نفهم إن الـfloating-point له قواعد خاصة في التمثيل والدقة.

ومن نتائج ده:

لو قسمت floating-point nonzero value على zero، ممكن تحصل على:

```text
+Inf
```

أو:

```text
-Inf
```

حسب إشارة الرقم.

أما:

```text
0.0 / 0.0
```

فبتدي:

```text
NaN
```

يعني
**Not a Number**

---

## 26. Comparing Floating-Point Numbers

رغم إن Go بتسمح باستخدام:
\==
!=


مع floats، الكتاب بينصح إنك متعملهاش
السبب إن floating-point numbers ==مش exact.==

ممكن تكون عندك قيمتين المفروض رياضيًا يكونوا متساويين، لكن بسبب طريقة تخزين الـfloat يكون فيه فرق صغير جدًا.

الحل هو إنك تحدد maximum allowed variance، أو ما يسمى أحيانًا:

```text
epsilon
```

وبعدين تشوف هل الفرق بين القيمتين أصغر من الـallowed variance ولا لأ.

قيمة الـepsilon بتعتمد على الـaccuracy المطلوبة.

---

## 27. Complex Types

Go عندها support مباشر للـcomplex numbers.

وده feature غالبًا مش هتستخدمه في معظم الـbackend applications.

عندنا نوعين:

```text
complex64
complex128
```

`complex64` بيستخدم `float32` للـreal والـimaginary parts.

أما `complex128` بيستخدم `float64`.

ممكن نعمل complex number باستخدام:

```go
complex(20.3, 10.2)
```
الرقم الأول هو الـreal portion.
والثاني هو الـimaginary portion.

---

## 28. Complex Type Inference

نوع الـcomplex value اللي بترجعه `complex()` بيعتمد على types الخاصة بالـarguments.

بشكل مبسط:

لو الاتنين untyped constants/literals، الناتج بيكون untyped complex literal وdefault type بتاعه:

```text
complex128
```

لو الاتنين `float32`:

```text
complex64
```

ولو واحد `float32` والثاني untyped value ينفع يمثلها `float32`:

```text
complex64
```

في الحالات الأخرى:

```text
complex128
```

---

## 29. Complex Operations

الـcomplex numbers بتدعم الـfloating-point arithmetic operators.

يعني:

```text
+
-
*
/
```

وممكن نقارن باستخدام:
\==
!=

لكن نفس مشكلة precision الخاصة بالـfloating-point موجودة هنا.

ممكن نجيب الـreal part باستخدام:

```go
real(x)
```

والـimaginary part باستخدام:

```go
imag(x)
```

وفيه package اسمها:

```go
math/cmplx
```

فيها functions إضافية للتعامل مع `complex128`.

الـzero value للـcomplex types معناها:

```text
real = 0
imaginary = 0
```

---

## 30. Complex Number Example

مثلًا:

```go
x := complex(2.5, 3.1)
y := complex(10.2, 2)

fmt.Println(x + y)
fmt.Println(x - y)
fmt.Println(x * y)
fmt.Println(x / y)
fmt.Println(real(x))
fmt.Println(imag(x))
```

وممكن تستخدم:

```go
cmplx.Abs(x)
```

علشان تحسب الـabsolute value.

والـbook بيستخدم المثال علشان يوضح إن floating-point imprecision بتظهر مع complex numbers برضه.

---

## 31. Imaginary Literals

فيه نوع خامس من الـprimitive literals وهو:

**Imaginary literal**

شكله مشابه للـfloating-point literal، لكن في آخره:

```text
i
```

مثال:

```go
2.5i
```

وده بيمثل imaginary portion من complex number.

---

## 32. Strings and Runes

الـstring هو type built-in في Go.

والـzero value بتاعه:

```go
""
```

يعني empty string.

وهنا Go بتدعم Unicode، وبالتالي ممكن string تحتوي على Unicode characters. زي اللغة العربية مثلا يعني

مثال:

```go
"مرحبا"
```

أو:

```go
"Hello"
```

الـstrings ممكن نقارنها باستخدام:
\==
!=
\>
\>=
<
<=


وكمان نقدر نعمل concatenation باستخدام:

```text
+
```

مثلًا:

```go
"Hello " + "World"
```

والناتج:

```text
Hello World
```

---

## 33. Strings Are Immutable

من النقاط المهمة:

**Strings in Go are immutable.**

يعني بعد ما تعمل string، مش ممكن تعدل character معين داخلها مباشرة.
الـstring نفسها value ثابتة من ناحية المحتوى.
ولو محتاج تعمل تغيير، بتعمل string جديدة بدل ما تعدل القديمة.

---

## 34. Rune

الـrune هو اسم خاص في Go لـ:

```go
int32
```

والهدف منه تمثيل Unicode code point.

يعني لما نحتاج نتعامل مع character Unicode، الـrune هو النوع المناسب.

وفي نفس الوقت:

```go
byte
```

هو alias لـ:

```go
uint8
```

فالاتنين بيمثلوا مفاهيم مختلفة:

```text
byte → 8-bit value
rune → Unicode code point
```

والكتاب بيشير إن موضوع strings والـrunes بالتفصيل هيتم التوسع فيه في chapter التالي.

---

## 35. Explicit Type Conversion

دي واحدة من أهم خصائص Go.

في لغات تانية، ممكن يحصل:

**Automatic Type Promotion**

يعني اللغة تلقائيًا تحول type إلى type تاني علشان العملية تشتغل.

بس Go مبتعملش دا بين variables.

لو عندك:

```go
var x int = 10
var y float64 = 30.2
```

مينفعش تعمل:

```go
x + y
```

لازم تحدد بنفسك الـconversion.

مثال:

```go
var sum1 float64 = float64(x) + y
```

هنا حولنا `x` من:

```text
int
```

إلى:

```text
float64
```

وممكن العكس:

```go
var sum2 int = x + int(y)
```

هنا `y` اتحول إلى `int`.

والناتج هيكون:

```text
40.2 40
```

لاحظ إن تحويل `30.2` إلى `int` بيؤدي لفقدان الجزء العشري.

---

## 36. Different Integer Types

نفس الفكرة بتحصل مع integers المختلفة.

مثلًا:

```go
var x int = 10
var b byte = 100
```

مينفعش تجمعهم مباشرة كأنهم نفس النوع.

لازم تعمل conversion:

```go
var sum3 int = x + int(b)
```

أو:

```go
var sum4 byte = byte(x) + b
```

Go بتجبرك تكتب الـconversion بشكل explicit.

والسبب إن ده بيخلي الـintent واضح بدل ما اللغة تعمل conversion من نفسها بقواعد ممكن تكون confusing.

---

## 37. No Truthiness in Go

الـstrict typing في Go ليها نتيجة مهمة جدًا:

**مفيش truthiness.**

في لغات تانية ممكن مثلًا:

```text
0
""
null
```

يتعاملوا كـ`false`.

لكن Go لا تسمح إنك تستخدم type تاني مكان `bool`.

يعني مينفعش تعمل حاجة زي:

```go
if x {
}
```

لو `x` مش `bool`.

وكمان مفيش conversion من number أو string إلى bool.

لو عايز تعرف هل `x` يساوي zero:

```go
x == 0
```

ولو عايز تعرف هل string فاضية:

```go
s == ""
```

يعني لازم تستخدم comparison operator علشان تحول السؤال إلى Boolean expression.

وده جزء من فلسفة Go:

**Clarity over conciseness.**

---

## 38. Literals Are Untyped

رغم إن Go strict جدًا مع variables والـtypes، الـliterals نفسها مرنة.

مثلًا:

```go
var x float64 = 10
```

ده valid.

رغم إن `10` integer literal، Go تقدر تستخدمه هنا لأن الـliteral untyped.

مثال:

```go
var y float64 = 200.3 * 5
```

وده valid برضه.

الفكرة إن الـliteral مش بتفرض type معين من نفسها، والـcontext بيحدد النوع المناسب.

لكن المرونة دي ليها حدود.

مينفعش مثلًا:

```go
var x int = "hello"
```

أو:

```go
var s string = 10
```

ومينفعش تحط float literal في `int` لو القيمة نفسها floating-point.

كمان فيه حدود للحجم.

مثلًا:

```go
var b byte = 1000
```

ده compile-time error لأن `byte` مش قادر يمثل القيمة دي.

---

## 39. var Versus :=

Go عندها أكثر من طريقة لتعريف variables.

وده مش مجرد syntax variations، لأن كل طريقة بتوصل intent مختلف.

أكثر شكل verbose:

```go
var x int = 10
```

هنا حددنا:

- variable اسمه `x`
- type هو `int`
- value هي `10`

لكن لو الـtype واضح من الـright-hand side، ممكن نشيله:

```go
var x = 10
```

Go تستنتج إن `x` من نوع:

```go
int
```

لأن `10` default type بتاعه `int`.

ولو إحنا عايزين الـzero value:

```go
var x int
```

هنا `x = 0`.

---

## 40. Multiple Variables with var

ممكن نعلن عن أكثر من variable:

```go
var x, y int = 10, 20
```

أو:

```go
var x, y int
```

في الحالة دي الاتنين ياخدوا zero value.

وممكن types مختلفة:

```go
var x, y = 10, "hello"
```

هنا:

```text
x → int
y → string
```

---

## 41. Declaration List

لو عندك مجموعة variables مرتبطة ببعض، ممكن تستخدم:

```go
var (
    x int
    y = 20
    z int = 30
    d, e = 40, "hello"
    f, g string
)
```

وده بيخلي مجموعة declarations منظمة في block واحد.

---

## 42. Short Declaration: :=

داخل function، Go بتوفر طريقة مختصرة:

```go
x := 10
```

وده equivalent لـ:

```go
var x = 10
```

الـ`:=` بيعمل declaration + assignment في نفس الوقت.

وممكن تستخدمه مع أكثر من variable:

```go
x, y := 10, "hello"
```

---

### 43. حاجة مهمة في :=

الـ`:=` عنده behavior مش موجود بنفس الشكل مع `var`.

ممكن تستخدمه مع variable موجود بالفعل بشرط إن **على الأقل variable واحد جديد** يكون موجود على الـleft side.

مثال:

```go
x := 10
x, y := 30, "hello"
```

هنا:

```text
x موجود بالفعل
y جديد
```

فـ`:=` مسموح.

لكن لو مفيش أي variable جديد، مش هينفع تستخدم `:=`.

---

### 44. := Only Inside Functions

فيه قاعدة مهمة:

`:=` لا يمكن استخدامه على package level.

يعني داخل function:

```go
func main() {
    x := 10
}
```

valid.

لكن خارج function:

```go
x := 10
```

غير مسموح.

على package level لازم تستخدم:

```go
var
```

---

### 45. إمتى أستخدم var وإمتى :=؟

الكتاب بيوصي إن داخل functions، الشكل الأكثر شيوعًا هو:

```go
:=
```

لأنه مختصر وواضح.

لكن فيه حالات الأفضل تستخدم فيها `var`.

#### لو عايز Zero Value

بدل:

```go
x := 0
```

اكتب:

```go
var x int
```

لأن الشكل ده بيوضح إنك **قاصد تبدأ بالـzero value**.

#### لو عايز Type معين

لو عندك literal والـdefault type بتاعه مش النوع اللي أنت عايزه، استخدم:

```go
var x byte = 20
```

بدل ما تعمل:

```go
x := byte(20)
```

الاثنين ممكن، لكن الأول أوضح وأidiomatic حسب الكتاب.

#### لو := ممكن يعمل variable جديد بالغلط

بسبب إن `:=` يسمح بوجود variables قديمة وجديدة مع بعض، أحيانًا ممكن تفتكر إنك بتعيد استخدام variable موجود بينما أنت في الحقيقة عملت variable جديد.

في الحالات دي استخدام `var` و = بيخلي intent أوضح.

---

## 46. Multiple Variables on One Line

رغم إن `var` و`:=` يسمحوا بكتابة أكثر من variable في نفس السطر، ==الكتاب بينصح بعدم استخدام الأسلوب ده بشكل عشوائي.==

استخدمه بشكل أساسي لما بتتعامل مع:

- multiple values returned from a function
- comma-ok idiom

---

## 47. Package-Level Variables

الكتاب بينصح إننا **نادرًا ما نعمل ديلكيرشن ل variables خارج functions**.

الـpackage-level variable اللي قيمته بتتغير ممكن يعمل مشاكل في فهم الـdata flow.

مثلًا لو variable موجود خارج functions، ممكن functions مختلفة تعدل فيه، وساعتها لما يحصل bug، هيبقى أصعب تعرف:
مين غير القيمة؟
إمتى اتغيرت؟
ليه اتغيرت؟
وده ممكن يؤدي إلى subtle bugs.

فالقاعدة العامة:

**Avoid mutable package-level variables.**

ولو عندك حاجة خارج function، الأفضل تكون effectively immutable.

---

## 48. const
Go عندها keyword اسمه:

```go
const
```

وبيستخدم علشان ندي اسم لـvalue مش هيتغير

مثال:

```go
const x int64 = 10
```

وممكن نعمل مجموعة constants:

```go
const (
    idKey = "id"
    nameKey = "name"
)
```

وممكن constant تكون نتيجة expression بيتحسب وقت الـcompile:

```go
const z = 20 * 10
```

ولو حاولت تغير constant:

```go
x = x + 1
```

هيحصل compile-time error.

نفس الكلام:

```go
y = "bye"
```

لو `y` كانت const.

---

### 49. Limitations of const

الـ`const` في Go مختلفة شوية عن مفهوم ==immutability== الكامل الموجود في بعض اللغات.

في Go، الـconstants أساسًا هي:

**Names given to literals.**

يعني الـconstant لازم تكون قيمة compiler يقدر يحسبها وقت الـcompile.

ممكن تكون:

- Numeric literals
- `true`
- `false`
- Strings
- Runes
- و values من بعض built-in functions
- او expressions مكونة من قيم مسموحة وoperators

من الـbuilt-in functions المذكورة:

```text
complex
real
imag
len
cap
```

---

### 50. Runtime Values Cannot Be const

لو القيمة محتاجة تتحسب وقت الـruntime، مش هينفع تكون constant.

مثلًا:

```go
x := 5
y := 10

const z = x + y
```

ده مش هيشتغل.

لأن `x` و`y` variables، وقيمتهم مش constants compile-time.
فالـ`const` مش معناها:

> أي variable أنا مش عايزه يتغير.

لكن معناها:

> قيمة compiler يقدر يعرفها ويحسبها وقت الـcompile.

وده فرق مهم جدًا.

---

### 51. Go Doesn't Have Immutable Variables

الكتاب بيوضح نقطة مهمة:

عندنا في Go مفيش طريقة عامة تقول:

> ال variable ده mutable ولا immutable.

مثلا `const` مش بديل كامل للـimmutable variables.
هي فقط طريقة لتسمية قيم compile-time.

ومفيش مثلًا طريقة تعمل:

```text
immutable array
immutable slice
immutable map
immutable struct
```

بالشكل المباشر.

---

### 52. Typed and Untyped Constants

الـconstants ممكن تكون:

```text
typed
```

أو:

```text
untyped
```

#### Untyped Constant

مثال:

```go
const x = 10
```

هنا `x` untyped constant.

وده بيديها مرونة أكبر.

ممكن تعمل:

```go
var y int = x
var z float64 = x
var d byte = x
```

لأن `10` ممكن تمثلها الأنواع دي.

### Typed Constant

مثال:

```go
const typedX int = 10
```

هنا الـconstant type بتاعها هو:

```text
int
```

وبالتالي تقدر تسندها مباشرة لـ`int`.

لكن مينفعش تسندها مباشرة إلى:

```go
float64
```

من غير conversion.

---

### 53. إمتى أستخدم Typed أو Untyped Constant؟

لو أنت بتسمي mathematical constant وممكن تستخدمه مع أنواع numeric مختلفة، الأفضل غالبًا تخليه:

```text
untyped
```

لأن ده بيديك flexibility أكبر.
أما لو أنت عايز الـconstant تفرض type معين، استخدم typed constant.
الكتاب هيستخدم typed constants في سياقات معينة لاحقًا، خصوصًا مع enumerations و`iota`.

---

## 54. Unused Variables

لغة Go عندها rule مهمة جدًا:

**كل local variable لازم يتم قراءة قيمته.**

يعني لو عملت:

```go
func main() {
    x := 10
}
```

ومستخدمتش `x`، الـcompiler ==هيعتبر ده compile-time error.==

وده جزء من فلسفة Go في مساعدة الفرق الكبيرة إنها تحافظ على code واضح ومنظم.

لكن الـcompiler مش بيعمل exhaustive analysis لكل assignment.

مثلًا:

```go
func main() {
    x := 10
    x = 20
    fmt.Println(x)
    x = 30
}
```

ده valid.

لأن `x` اتقريت مرة على الأقل.

لكن الـassignment بتاع:

```go
x = 10
```

والـassignment الأخير:

```go
x = 30
```

مش بالضرورة تكون قيمهم اتقريت بعد assignment.

فيه third-party tools ممكن تكتشف النوع ده من المشاكل.

---

## 55. Unused Package-Level Variables

الـcompiler مش هيمنعك بنفس الطريقة من إنشاء package-level variable مش مستخدم.

وده سبب إضافي يخليك ==تتجنب== package-level variables قدر الإمكان.

---

## 56. Unused Constants

الغريب شوية إن Go بتسمح إنك تعمل constant مش مستخدمة.

مثلًا:

```go
const x = 10
```

ومحدش يستخدم `x`.

ليه؟
لأن الـconstants بتتحسب وقت الـcompile ومفيش side effects مرتبطة بيها.
فلو مش مستخدمة، ممكن ببساطة compiler يتخلص منها وماتدخلش في الـcompiled binary.

---

## 57. Naming Variables and Constants

Go عندها rules للـidentifier names.

الاسم لازم يبدأ بـ:

- letter
- underscore

وممكن يحتوي على:

- letters
- numbers
- underscores

وGo بتسمح بمجموعة واسعة من Unicode characters كـletters وdigits.

فـtechnically حاجات زي دي ممكن تكون valid:

```go
π := 3
```

أو:

```go
ａ := "hello"
```

لكن كون الحاجة valid في اللغة **مش معناه إنها idiomatic**.

---

### 58. Don't Use Weird Unicode Names

الكتاب بيحذر من استخدام أسماء غريبة أو صعبة في الكتابة.

خصوصًا الـlook-alike Unicode characters.

ممكن يبقى عندك حرفين شكلهم متشابه جدًا، لكن هما فعليًا characters مختلفة.

مثال:

```go
ａ := "hello"
a := "goodbye"
```

الاتنين شكلهم قريب جدًا، لكن الأول Unicode character مختلف عن الـ`a` العادية.

وده ممكن يخلي الكود confusing جدًا.

فالقاعدة:

**استخدم أسماء بسيطة وواضحة.**

---

### 59. Don't Use snake_case

رغم إن `_` مسموح في identifiers، Go idiomatic code عادةً **مش بيستخدم snake_case**.

يعني بدل:

```text
index_counter
number_tries
```

استخدم:

```text
indexCounter
numberTries
```

وده اسمه:

**camelCase**

---

### 60. Constants Don't Use ALL_CAPS

في لغات تانية ممكن تلاقي constants بالشكل:

```text
INDEX_COUNTER
NUMBER_TRIES
```

لكن Go مش بتتبع الأسلوب ده.

السبب مرتبط بنظام الـvisibility في Go، اللي بيعتمد على capitalization لأول حرف في package-level declarations.

فـGo code بيستخدم نفس naming style تقريبًا بدل ما يعمل convention منفصل للـconstants.

---

### 61. Short Variable Names

داخل function، الكتاب بينصح باستخدام أسماء قصيرة للـvariables، خصوصًا لما الـscope صغير.

مثلًا في loops من الشائع استخدام:

```text
i
j
```

للـindexes.

وفي range loops ممكن تشوف:

```text
k
v
```

للـkey والـvalue.

الفكرة إن كل ما الـscope صغير، كل ما ممكن يكون الاسم أقصر.

لكن ده مش معناه إننا نخلي كل حاجة حرف واحد.

لو variable محتاج اسم أوضح، استخدم اسم أوضح.

---

### 62. Don't Put the Type in the Variable Name

بما إن Go strongly typed، مش محتاج تعمل أسماء زي:

```text
intCount
floatValue
stringName
```

علشان تعرف الـtype.

الـtype موجود في declaration نفسه.

فالأفضل تركز في الاسم على **معنى القيمة**، مش نوعها.

---

### 63. Short Names Can Show Complexity

الأسماء القصيرة ليها فائدة إضافية.

لو عندك function صغيرة وفيها:

```go
i
j
k
```

ده ممكن يكون طبيعي.

لكن لو لقيت نفسك مش قادر تتابع مين `i` ومين `j` ومين `k`، فالمشكلة ممكن تكون مش في الأسماء، لكن إن الـblock نفسه بيعمل حاجات كثيرة.

يعني short variable names ممكن تكون indicator على إن الكود بقى complicated زيادة عن اللازم.

---

### 64. Package-Level Names

عكس الـlocal variables، الـpackage-level variables محتاجة أسماء أكثر وضوحًا.

لأن الـscope بتاعها أكبر.

فبدل اسم مختصر جدًا، استخدم descriptive name يوضح القيمة بتمثل إيه.

وبرضه:

**متضيفش type في الاسم.**

يعني الاسم يشرح المعنى، والـtype يوضح نوع البيانات.

---