---
title: "Go - Chapter 3"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages, masters]
created: 2026-10-06
updated: 2026-10-23
source:
related: []
---
## Arrays

### one-dimensional

زي ما اللغات فيها Array ف Go فيها Arrays برضو بس انت مش هتستخدمها كتير 

```go
var x [3]int
```

انت هنا عملت initialize لل array وحددتلها Size وكمان data type ، وطالما انت محددتش values ليها ف هتبقى بأصفار 
```go
// [0, 0, 0]
```

وعلشان تحطلها قيمة فهتعمل كدا 
```go
var x = [3]int{10, 20, 30}
```

وعندك برضو فكرة sparse array ودي عبارة انك تقدر تحدد  المكان الي هتحط فيه العنصر

```go 
var x = [12]int{1, 5: 4, 6, 10: 100, 15}
```

![[Pasted image 20261006181212.png]]

الرقم الي قبل ال : بيمثل ال index الي هيتحط فيه الرقم الي بعد ال index

لو عايز تعمل array من غير size ف انت تقدر تكتبها بالشكل دا 
```go
var x = [...]int{1, 2, 3}
```


### 2. Multidimensional Arrays

في Go مفيش نوع منفصل اسمه "Matrix".

لكن تقدر تعمل **Array من Arrays**.

مثلاً:

```go
var x [2][3]int
```

اقرأها من اليمين للشمال:

\[2] → عدد الـ arrays الداخلية
\[3] → عدد العناصر داخل كل array
int → نوع العناصر


يعني عندنا Array فيها **2 عناصر**، وكل عنصر من الاتنين عبارة عن Array فيها **3 ints**.

ممكن تتخيلها كـ 2 صفوف و3 أعمدة:

![[Pasted image 20261006183000.png]]

والـ `x` شكلها:

```go
x = [2][3]int{
    {0, 0, 0},
    {0, 0, 0},
}
```

### الوصول للعناصر

عشان توصل لعنصر معين، بتستخدم index لكل dimension:

```go
x[0][1] = 10
```

معناها:

x\[0]    → الـ array الأولى
x\[0]\[1] → العنصر الثاني داخلها


فتصبح:

![[Pasted image 20261006183121.png]]
وممكن تقرأها:

```go
fmt.Println(x[0][1])
```

والنتيجة:

```text
10
```

#### ممكن تعمل أكثر من Dimension

مثلاً:

```go
var x [2][3][4]int
```

هنا عندك:

```text
2 × 3 × 4
```

يعني Array من 2، وكل واحدة فيها Array من 3، وكل واحدة من دول فيها Array من 4 `int`.
زي أغلب اللغات، بتستخدم `[]` عشان تقرأ أو تكتب في Array.

```go
var x [3]int
```
لو عايز تكتب في الاراي او تدخل قيم بنفسك:
```go
x[0] = 10
x[1] = 20
x[2] = 30
```
وتقدر تقرأ:
```go
fmt.Println(x[2]) // 30
```

بالنسبة للـ multidimensional:

```go
x[0][1] = 50
```

هنا استخدمت index للـ array الأولى، وبعدها index للـ array الداخلية.

وكمان في قواعد للاراي زي ما احنا عايزين إن لازم الـ index يكون داخل حدود الـ Array.

لو عندك:

```go
var x [3]int
```

فالـ indexes المتاحة:

```text
0
1
2
```

مينفعش:

```go
x[3]
```

لأن مفيش عنصر في index `3`.

وبرضو مينفعش:

```go
x[-1]
```

لأن Go لا تسمح بـ negative indexes.

 علشان تجيب طول الاراي ف انت تقدر تستخدم `len()` مع Arrays

في Go عندك built-in function اسمها:
```go
len()
```
بتجيب **طول الـ Array**.

مثلاً:
```go
x := [3]int{10, 20, 30}

fmt.Println(len(x)) // 3
```
خد بالك إن `len` بتجيب **عدد العناصر**، مش آخر index.
يعني:
```text
Length = 3

Indexes:
0
1
2
```
آخر index دائمًا:
```text
len(x) - 1
```
لازم تاخد بالك ان ال size جزء من ال type وغن دي من أهم الحاجات في Arrays في Go.
في Go:

```go
[3]int
```

و:

```go
[4]int
```

دول **نوعين مختلفين**.

يعني:

```go
[3]int
```

نوع مختلف عن:

```go
[4]int
```

حتى لو الاتنين بيخزنوا `int`.

مثلاً:

```go
var x [3]int
var y [4]int
```

الـ type بتاع `x` هو:

```text
[3]int
```

والـ type بتاع `y` هو:

```text
[4]int
```

وده مهم جدًا لأن **حجم الـ Array جزء من الـ type نفسه**.

 مينفعش تستخدم Variable كـ Array Size
في بعض اللغات ممكن تعمل حاجة زي:

```text
size = 10
array[size]
```
لكن في Go مينفعش تستخدم variable لتحديد حجم الـ Array.

```go
size := 3
var x [size]int // invalid
```

ليه؟
لأن Go لازم تعرف الـ type وحجمه وقت الـ **compile time**.
والـ `size` هنا قيمة ممكن تتحدد وقت الـ runtime.
لو عايز size ديناميكي، غالبًا هتستخدم **Slice** بدل Array.
وده أحد الأسباب الأساسية إن الـ Arrays مش بتستخدم كتير في Go.

---
ال Arrays الي بأحجام مختلفة مينفعش تتحول لبعض

بما إن:

```go
[3]int
```

نوع مختلف عن:

```go
[4]int
```

فمينفعش تعمل:

```go
var x [3]int
var y [4]int

y = x
```

ده هيعمل error.

لأنك بتحاول تحط:

```text
[3]int
```

في مكان مستني:

```text
[4]int
```

والـ types مختلفة.

مسألتش نفسك قبل كدا طيب ليه Go عندها Arrays أصلًا؟
الـ Array نفسها مش من أكتر الحاجات اللي هتستخدمها في Go.
السبب الأساسي لوجودها هو إنها بتوفر **backing storage للـ Slices**.
يعني الـ Slice اللي هتتعامل معاها كتير في Go مبنية في الأساس فوق Array.
![[Pasted image 20261006194520.png]]

فالـ Array هي المكان الفعلي اللي البيانات متخزنة فيه، والـ Slice بتديك طريقة أكثر مرونة للتعامل مع البيانات دي.

---
## Slices

لما كنا بنتكلم عن ال Array كنا بنقول ان مينفعش نقارن او نساوي نوعين من الاراي زي \[3]int مثلا بواحدة \[4]int لانهم نوعين مختلفين ف انت قولي هتعمل اي لما تيجي تستخدم الفانكشن وهتحتاج تكتب اراي باي سايز بقى؟
هنا جت ال Slice علشان تحل المشكلة دي ف انت تقدر تكتب Slice باي سايز وانت مرتاح لان السايز ملوش علاقة بالنوع

```go
var x = []int{10,20,30}
```
بس خد بالك من الفرق دا
لو انت استخدمت `[...]int` ف انت كدا بتعبر عن Array ف انت شايف الفرق ال Slice مكتوبة ازاي ؟ من غير النقط دي

علشان مخشش فالموضوع ونكرر الكلام تاني Slice فيها حاجات كتير شبه ال Array وليعتبر نفس الحاجة بس الفرق 
إن Slice not comparable يعني مينفعش تقارن بينها وبين بعض بعلامة == او =!
الشئ الوحيد الي ممكن تقارن بيه ال Slice بإستخدام == هو ال nil دا معناها Slice مفيهوش عناصر بشكل مختصر يعني

علشان تقارن 2 Slices مع بعض ف في ال slices package وهما 
- الاولى: `slices.Equal(x,y)` ودي بتاخد الاتنين اسلايس ولو نفس ال size والايليمنت متساويين يرجعلك True
- التاني `slices.EqualFunc` 

متيجي نتعرف على ال Built-in Functions الي موجودة لل Slices ؟


### Built-in Functions
#### 1. `len()`

اول حاجة عندك `len()` ودي ببساطة بتجيبلك عدد العناصر الموجودين حاليا في الـ Slice.

```go
x := []int{10, 20, 30}

fmt.Println(len(x)) // 3
```

ولو الـ Slice كانت `nil`:

```go
var x []int

fmt.Println(len(x)) // 0
```

يعني حتى لو الـ Slice مفيهاش عناصر، `len()` شغالة عادي وبتديك `0`.

---

#### 2. `append()`

بعد كدا عندك `append()` ودي من اهم الـ Built-in Functions في الـ Slices، وبتستخدمها لما تكون عايز تزود عناصر للـ Slice.

مثلا:

```go
var x []int

x = append(x, 10)
```

خد بالك من حاجة مهمة هنا:

لازم تاخد الـ Slice اللي `append()` رجعتها وتحطها تاني في `x`.

يعني متعملش:

```go
append(x, 10)
```

وتفتكر إن `x` اتغيرت.

الـ `append()` بترجعلك Slice محدثة، وعلشان كدا بنكتب:

```go
x = append(x, 10)
```

ولو عندك Slice فيها عناصر بالفعل:

```go
x := []int{1, 2, 3}

x = append(x, 4)
```

فتبقى:

```text
[1 2 3 4]
```

وتقدر تضيف اكتر من عنصر مرة واحدة:

```go
x = append(x, 5, 6, 7)
```

فتبقى:

```text
[1 2 3 4 5 6 7]
```

---

#### 3. إضافة Slice على Slice تانية

طيب لو عندك Slice وعايز تضيف كل عناصر Slice تانية عليها؟

مثلا:

```go
x := []int{1, 2, 3}
y := []int{20, 30, 40}
```

هنا تستخدم:

```go
x = append(x, y...)
```

الـ `...` هنا معناها إنك بتفك عناصر `y` وتبعتها لـ `append` كعناصر منفصلة.

يعني كأنك بتقول:

```go
x = append(x, 20, 30, 40)
```

فالنتيجة:

```text
[1 2 3 20 30 40]
```

---

#### 4. `cap()` Capacity

هنا بقى لازم نفرق بين حاجتين:

```text
len
cap
```

الـ `len` بتقولك عندك كام عنصر موجود فعلا في الـ Slice.

أما الـ `cap` فبتقولك عندك مساحة محجوزة قد إيه للـ Slice قبل ما تحتاج Go تعمل allocation جديد.

مثلا:

```go
x := make([]int, 0, 10)
```

هنا:

```text
len = 0
cap = 10
```

يعني مفيش عناصر موجودة حاليا، لكن فيه مساحة محجوزة تكفي لـ 10 عناصر قبل ما تحتاج الـ Slice تكبر وتعمل backing array جديدة.

وتقدر تعرف الـ capacity باستخدام:

```go
fmt.Println(cap(x))
```

الـ `cap()` مش هتستخدمها في كل Slice بتعملها، لكن بتبقى مهمة لما تكون مهتم بالـ memory أو عايز تعرف الـ Slice عندها مساحة كفاية قد إيه قبل ما تحتاج تكبر.

---

#### 5. ايه اللي بيحصل لما الـ `cap` تخلص؟

دي نقطة مهمة علشان تفهم الـ Slice بتشتغل ازاي.

تخيل:

```go
x := make([]int, 0, 2)
```

دلوقتي:

```text
len = 0
cap = 2
```

نضيف أول عنصر:

```go
x = append(x, 10)
```

تبقى:

```text
len = 1
cap = 2
```

نضيف عنصر تاني:

```go
x = append(x, 20)
```

تبقى:

```text
len = 2
cap = 2
```

كدا الـ capacity خلصت.

لو عملت:

```go
x = append(x, 30)
```

Go محتاجة مكان جديد علشان تضيف العنصر.

فالـ runtime ممكن يعمل حاجة بالشكل ده:

```text
Old backing array
[10 20]

        ↓

New backing array
[10 20 30 ...]
```

يعني بيعمل backing array جديدة بسعة اكبر، وينقل البيانات القديمة ليها، وبعد كدا يضيف العنصر الجديد.

وعلشان كدا الـ `append()` مش مجرد إنها بتحط العنصر وخلاص، ساعات ممكن ينتج عنها **allocation وcopy للبيانات**.

---

#### 6. `make()`

طيب ايه بقى `make()`؟

دي بتستخدمها لما تكون عايز تعمل Slice وانت محدد من البداية الـ `length` والـ `capacity`.

مثلا:

```go
x := make([]int, 5)
```

ده معناه:

```text
type     = []int
length   = 5
capacity = 5
```

يعني الـ Slice فيها 5 عناصر بالفعل، وكلهم واخدين الـ zero value بتاعت `int` وهي `0`.

فتبقى:

```text
[0 0 0 0 0]
```

وبالتالي تقدر تعمل:

```go
x[0] = 10
```

لان `x[0]` موجود بالفعل.

---

#### 7. خد بالك من الغلطة دي مع `make()`

ناس كتير بتعمل:

```go
x := make([]int, 5)

x = append(x, 10)
```

وتفتكر إن `make([]int, 5)` معناها:

> جهزلي مكان لـ 5 عناصر عشان أضيفهم بعدين.

لكن ده مش اللي حصل.

أنت هنا عملت Slice طولها 5 من البداية:

```text
[0 0 0 0 0]
```

وبعدين `append()` بتضيف في نهاية الـ Slice، فتبقى:

```text
[0 0 0 0 0 10]
```

لان `append()` دايما بتزود الـ `length`.

---

#### 8. الفرق بين `length` و `capacity`

دي من اهم الحاجات في الـ Slices.

لو كتبت:

```go
x := make([]int, 5, 10)
```

ده معناه:

```text
length   = 5
capacity = 10
```

يعني عندك حاليا 5 عناصر:

```text
[0 0 0 0 0]
```

لكن فيه مساحة محجوزة تكفي لحد 10 عناصر قبل ما الـ Slice تحتاج تكبر.

أما لو كتبت:

```go
x := make([]int, 0, 10)
```

فهنا:

```text
length   = 0
capacity = 10
```

يعني مفيش عناصر موجودة حاليا، لكن فيه مساحة محجوزة تكفي لـ 10 عناصر.

وده مناسب جدا لو أنت عارف إنك هتضيف العناصر باستخدام:

```go
x = append(x, ...)
```

---

#### 9. `clear()`

من Go 1.21 بقى عندك `clear()`.

ودي بتستخدمها لما تكون عايز ترجع كل عناصر الـ Slice للـ zero value بتاع نوعها.

مثلا:

```go
x := []string{"first", "second", "third"}

clear(x)
```

فتبقى:

```text
["" "" ""]
```

لكن خد بالك من حاجة مهمة:

الـ `length` مش بتتغير.

يعني لو:

```text
len(x) = 3
```

بعد `clear()` هتفضل:

```text
len(x) = 3
```

اللي اتغير هو قيم العناصر بس، رجعت للـ zero value.

---

#### 10. `nil Slice`

ممكن تعمل Slice من غير ما تديها أي قيمة:

```go
var x []int
```

هنا `x` بتكون `nil`.

يعني مفيش Slice فيها عناصر، وتقدر تتأكد بكدا:

```go
fmt.Println(x == nil)
```

فتطلع:

```text
true
```

وخد بالك إنك تقدر تعمل `append()` على الـ `nil Slice` عادي جدا:

```go
var x []int

x = append(x, 10)
```

فتبقى:

```text
[10]
```

يعني الـ `nil Slice` مش معناها إنك ممنوع تستخدمها، هي بس Slice مفيش لها قيمة حاليا.

---

#### نقطة مهمة: `nil` مش زي `[]int{}`

الاتنين مفيهمش عناصر، لكن مش نفس الحاجة.

الأولى:

```go
var x []int
```

دي `nil Slice`.

يعني:

```go
x == nil // true
```

أما دي:

```go
var y = []int{}
```

فدي Slice موجودة بالفعل، لكنها فاضية.

يعني:

```go
y == nil // false
```

لكن الاتنين:

```go
len(x) // 0
len(y) // 0
```

فمن ناحية عدد العناصر الاتنين زي بعض، لكن من ناحية إن الـ Slice نفسها `nil` ولا لأ، مختلفين.

والكتاب بيفضل استخدام الـ `nil Slice` في الحالات العادية لو أنت مش محتاج Slice فاضية لسبب معين.

---
### Slicing Slices

طيب دلوقتي عرفنا إن الـ Slice نفسها عبارة عن مجموعة عناصر، لكن تقدر تاخد جزء من الـ Slice وتعمل منه Slice تانية.

وده اسمه **Slicing a Slice**.

الـ syntax بتاعته:

```go
x[start:end]
```

الـ `start` هو المكان اللي هتبدأ منه، وده **داخل** في الـ Slice الجديدة.

أما `end` فهو المكان اللي هتقف عنده، وده **مش داخل** في الـ Slice.

يعني:

```go
x[1:3]
```

هتجيب العنصرين اللي عند index `1` و `2`.

مثلا:

```go
x := []string{"a", "b", "c", "d"}

y := x[:2]
z := x[1:]
d := x[1:3]
e := x[:]
```

النتيجة:

```go
x = [a b c d]

y = [a b]
z = [b c d]
d = [b c]
e = [a b c d]
```

ولو سبت الـ `start` فـ Go بتفترض إنه `0`.

يعني:

```go
x[:2]
```

نفس:

```go
x[0:2]
```

ولو سبت الـ `end` فـ Go بتعتبره آخر الـ Slice.

يعني:

```go
x[1:]
```

معناها:

```go
x[1:len(x)]
```

الـ Slice الجديدة مش Copy

دي من أهم الحاجات في الموضوع.

لما تعمل Slice من Slice تانية، Go **مش بتعمل نسخة جديدة من البيانات**.

يعني:

```go
x := []string{"a", "b", "c", "d"}

y := x[:2]
z := x[1:]
```

الـ `x` و `y` و `z` بيشاركوا نفس الـ underlying array.

يعني لو غيرت عنصر موجود في أكتر من Slice، التغيير هيظهر في كل الـ Slices اللي بتشارك نفس المكان في الـ memory.

مثلا:

```go
x[1] = "y"
y[0] = "x"
z[1] = "z"
```

النتيجة:

```text
x = [x y z d]
y = [x y]
z = [y z d]
```

ليه؟

لأن `y[0]` و `x[0]` مش نفس المكان، لكن `y[1]` و `x[1]` نفس المكان.

ونفس الكلام بالنسبة لـ `z`.

يعني خد بالك:

> لما تعمل Slice من Slice تانية، أنت مش بتعمل Copy للبيانات، أنت بتعمل Slice جديدة بتشير لنفس الـ memory.

---

#### المشكلة مع `append()`

هنا الموضوع بيبدأ يبقى tricky شوية.

بما إن الـ Slice الجديدة بتشارك نفس الـ underlying array مع الـ Slice الأصلية، فالـ `append()` ممكن يأثر على الـ Slice الأصلية.

مثلا:

```go
x := []string{"a", "b", "c", "d"}

y := x[:2]

y = append(y, "z")
```

ممكن تتوقع إن:

```text
x = [a b c d]
y = [a b z]
```

لكن اللي حصل فعلا:

```text
x = [a b z d]
y = [a b z]
```

ليه؟

لأن `y` مش Slice مستقلة.

لما عملنا:

```go
y := x[:2]
```

الـ `len` بتاع `y` بقى `2`.

لكن الـ `cap` بتاعها لسه يسمح لها تستخدم المساحة الموجودة بعد العنصرين دول.

يعني `y` عندها مساحة تكمل في نفس الـ underlying array.

فلما عملنا:

```go
y = append(y, "z")
```

العنصر الجديد اتحط في المكان اللي بعد `b` مباشرة، وده أصلا المكان اللي `x` بتستخدمه للعنصر `c`.

فـ `c` اتغيرت لـ `z`.

---

#### طب الـ capacity بتاعت الـ Slice الجديدة بتتحسب ازاي؟

لما تعمل Slice من Slice تانية، الـ `cap` بتاعت الـ Slice الجديدة بتبدأ من الـ position اللي بدأت منه في الـ Slice الأصلية.

يعني لو عندك:

```go
x := []string{"a", "b", "c", "d"}
```

وعملت:

```go
y := x[:2]
```

الـ `len` بتاعت `y`:

```text
2
```

لكن الـ `cap`:

```text
4
```

لأن `y` تقدر تستخدم باقي المساحة الموجودة في ==🟢الـ underlying array.==

وعشان كدا `append()` عليها ممكن يكتب في الأماكن اللي بعدها في `x`.

---

#### Full Slice Expression

طيب نحل المشكلة دي ازاي؟

هنا عندك حاجة اسمها **Full Slice Expression**.

بدل ما تكتب:

```go
x[:2]
```

تقدر تكتب:

```go
x[:2:2]
```

الجزء التالت هنا بيحدد الـ **capacity** اللي الـ Slice الجديدة مسموح لها تستخدمها.

يعني:

```go
y := x[:2:2]
```

هنا:

```text
len = 2
cap = 2
```

فلو عملت:

```go
y = append(y, "z")
```

الـ `cap` خلاص خلصت، وبالتالي Go هتضطر تعمل backing array جديدة.

وبالتالي `append()` مش هتعدل الـ underlying array بتاعت `x`.

مثلا:

```go
x := make([]string, 0, 5)

x = append(x, "a", "b", "c", "d")

y := x[:2:2]
z := x[2:4:4]
```

هنا `y` و `z` كل واحدة عندها `cap` مساوية للـ `len`.

فلو عملت:

```go
y = append(y, "i", "j", "k")
```

مش هتبوظ `x`.

ونفس الكلام مع `z`.

الفكرة كلها إنك بتقول لـ Go:

> الـ Slice الجديدة دي متستخدمش المساحة اللي بعد الجزء اللي أنا خدته.

وعشان كدا الكتاب بينصح إنك تاخد بالك جدا لما تعمل Slice من Slice، خصوصا لو هتستخدم `append()` عليها.

---

#### `copy()`

طيب لو أنا عايز Slice جديدة **مستقلة تماما** عن الـ Slice الأصلية؟

هنا تستخدم `copy()`.

مثلا:

```go
x := []int{1, 2, 3, 4}
y := make([]int, 4)
num := copy(y, x)
```

هنا `copy()` بتاخد حاجتين:

```go
copy(destination, source)
```

يعني:

```text
y = destination
x = source
```

والنتيجة:

```text
y = [1 2 3 4]
num = 4
```

الـ `num` هنا هو عدد العناصر اللي اتعملها copy.

---

##### `copy()` بتنسخ على قد أصغر Slice

لو الـ destination أصغر من الـ source، هتنسخ لحد ما الـ destination تخلص.

مثلا:

```go
x := []int{1, 2, 3, 4}

y := make([]int, 2)

num := copy(y, x)
```

النتيجة:

```text
y = [1 2]
num = 2
```

يعني `copy()` مش مهتمة بالـ `cap` هنا، المهم هو الـ `len`.

---

##### تقدر تعمل Copy لجزء معين

مثلا:

```go
x := []int{1, 2, 3, 4}

y := make([]int, 2)

copy(y, x[2:])
```

هنا `x[2:]` معناها:

```text
[3 4]
```

فـ `y` هتبقى:

```text
[3 4]
```

ولو مش محتاج تعرف عدد العناصر اللي اتعملها copy، مش لازم تخزن القيمة اللي `copy()` بترجعها.

يعني عادي:

```go
copy(y, x)
```

---

##### `copy()` مع Slices بتشارك نفس الـ memory

الـ `copy()` نفسها ممكن تشتغل حتى لو الـ source والـ destination أجزاء من نفس الـ Slice.

مثلا:

```go
x := []int{1, 2, 3, 4}

num := copy(x[:3], x[1:])
```

هنا بننسخ:

```text
[2 3 4]
```

فوق:

```text
[1 2 3]
```

فتبقى:

```text
x = [2 3 4 4]
num = 3
```

---

##### استخدام `copy()` مع Array

مش لازم `copy()` تشتغل مع Slices بس.

تقدر تستخدم Array عن طريق إنك تحولها لـ Slice باستخدام `[:]`.

مثلا:

```go
x := []int{1, 2, 3, 4}

d := [4]int{5, 6, 7, 8}

y := make([]int, 2)

copy(y, d[:])
```

هنا أخدنا عناصر الـ Array وحطيناهم في الـ Slice.

فتبقى:

```text
y = [5 6]
```

وتقدر تعمل العكس:

```go
copy(d[:], x)
```

فتبقى الـ Array:

```text
[1 2 3 4]
```

---

### Converting Arrays to Slices

طيب لو عندك Array وعايز تبعتها لفانكشن بتاخد Slice؟

تقدر تحول الـ Array لـ Slice باستخدام `[:]`.

مثلا:

```go
xArray := [4]int{5, 6, 7, 8}

xSlice := xArray[:]
```

دلوقتي `xSlice` عبارة عن Slice بتشير لنفس الـ Array.

وتقدر تاخد جزء منها كمان:

```go
x := [4]int{5, 6, 7, 8}

y := x[:2]
z := x[2:]
```

فتبقى:

```text
y = [5 6]
z = [7 8]
```

---

#### خد بالك: Array و Slice هنا بيشاركوا نفس الـ memory

لما تحول Array لـ Slice باستخدام `[:]`، أنت مش بتعمل Copy.

يعني:

```go
x := [4]int{5, 6, 7, 8}

y := x[:2]
z := x[2:]

x[0] = 10
```

النتيجة:

```text
x = [10 6 7 8]
y = [10 6]
z = [7 8]
```

لأن `y` بتشير لنفس الـ memory بتاعت الـ Array `x`.

---

### Converting Slices to Arrays

العكس بقى، لو عندك Slice وعايز تحولها لـ Array، بتستخدم **Type Conversion**.

مثلا:

```go
xSlice := []int{1, 2, 3, 4}

xArray := [4]int(xSlice)
smallArray := [2]int(xSlice)
```

هنا حصلت حاجة مهمة:

لما بتحول الـ Slice لـ Array، البيانات بتتعملها **Copy** في memory جديدة.

يعني الـ Array الجديدة مستقلة عن الـ Slice.

مثلا:

```go
xSlice[0] = 10
```

مش هتأثر على `xArray`.

فتبقى:

```text
xSlice    = [10 2 3 4]
xArray    = [1 2 3 4]
smallArray = [1 2]
```

يعني عكس حالة Array → Slice.

---

#### حجم الـ Array لازم يكون معروف

لما تحول Slice لـ Array، حجم الـ Array لازم يكون معروف وقت الـ compile.

يعني مينفعش تستخدم `...` في التحويل.

وكمان تقدر تحول الـ Slice لـ Array أصغر:

```go
xArray := [2]int(xSlice)
```

لكن مينفعش تعمل Array أكبر من الـ `len` بتاعت الـ Slice.

مثلا لو:

```go
xSlice := []int{1, 2, 3, 4}
```

مينفعش:

```go
panicArray := [5]int(xSlice)
```

لأن الـ Slice طولها `4`، وأنت طالب Array طولها `5`.

ودي مش هتطلع Compile Error، لكنها هتعمل **panic وقت الـ runtime**.

وخد بالك إن اللي بيتحسب هنا هو الـ `len` مش الـ `cap`.

---

### Slice to Pointer to Array

فيه كمان طريقة تانية، وهي إنك تحول الـ Slice لـ **Pointer to Array**.

مثلا:

```go
xSlice := []int{1, 2, 3, 4}

xArrayPointer := (*[4]int)(xSlice) // '*'
```

هنا الـ Pointer والـ Slice بيشاركوا نفس الـ storage.

يعني لو غيرت في الـ Slice:

```go
xSlice[0] = 10
```

التغيير هيظهر في الـ Array Pointer.

ولو غيرت في الـ Pointer:

```go
xArrayPointer[1] = 20
```

التغيير هيظهر في الـ Slice.

فتبقى:

```text
xSlice = [10 20 3 4]
```

والـ Pointer بيشير لنفس البيانات.

الكتاب بيقول إن موضوع الـ Pointers نفسه هيتشرح بالتفصيل في Chapter 6.

---

### آخر نقطة مهمة

فاكر لما اتكلمنا إن الـ Array مش مناسبة كـ function parameter لو الـ size ممكن يتغير؟

لو الـ Function المفروض تستقبل بيانات بأحجام مختلفة، الأفضل من البداية تخلي الـ Function تستقبل **Slice** بدل Array.

يعني بدل ما تعمل API بالشكل ده:

```go
func process(data [4]int)
```

لو الحجم ممكن يتغير، الأفضل:

```go
func process(data []int)
```

وده أصلا واحد من الأسباب المهمة اللي خلت الـ Slice هي الطريقة الأساسية للتعامل مع sequences في Go.

---

## The Go Runtime

طيب قبل ما ندخل في الـ Runtime، يعني ايه Runtime أصلا؟

ببساطة أي High-Level Programming Language بتحتاج مجموعة من الخدمات والمكتبات علشان البرنامج اللي كتبته يقدر يشتغل، وGo مش استثناء.

المجموعة دي في Go بنسميها **Go Runtime**.
الـ Runtime مسؤول عن حاجات مهمة بتحصل أثناء تشغيل البرنامج، زي:

- الـ**Memory Allocation** يعني حجز وإدارة الـ Memory.
    
- الـ**Garbage Collection** يعني التخلص من الـ Memory اللي البرنامج مبقاش محتاجها.
    
- الـ**Concurrency Support** يعني دعم تشغيل الـ Goroutines والـ Concurrency.
    
- الـ**Networking** يعني توفير حاجات متعلقة بالـ Network.
    
- وتنفيذ بعض الـ **Built-in Types and Functions** الموجودة في Go.
    

يعني باختصار:

> الـ Go Runtime هو الجزء اللي بيوفر للبرنامج الخدمات الأساسية اللي محتاجها أثناء الـ Runtime علشان يقدر يشتغل.

---

### طيب الـ Runtime بيكون فين؟

هنا بقى نقطة مهمة.

الـ Go Runtime بيتعمله **Compile مع برنامجك ويدخل جوه الـ Go Binary نفسه**.

يعني لما تعمل:

```bash
go build
```

وتطلع الـ executable بتاع برنامجك، الـ Runtime بيكون موجود جواه.

وده مختلف عن بعض اللغات اللي بتستخدم **Virtual Machine**.

في الحالة دي، الـ Virtual Machine بتكون حاجة منفصلة لازم تكون موجودة على الجهاز علشان البرنامج يشتغل.

لكن في Go:

```text
Go Program
    +
Go Runtime
    ↓
Go Binary
```

يعني البرنامج والـ Runtime بيكونوا موجودين مع بعض في الـ Binary.

---

### ايه فايدة إن الـ Runtime يكون جوه الـ Binary؟

ده بيخلي توزيع برامج Go أسهل.

يعني لما تبني برنامج Go، مش محتاج تقلق إن الجهاز اللي هتشغل عليه البرنامج لازم يكون عليه Runtime معين ومتوافق مع نسخة البرنامج.

فالـ Binary بيكون معاه الـ Runtime اللي محتاجه.

وده بيقلل مشاكل الـ **Compatibility** بين البرنامج والـ Runtime.

---

### طب هل في عيب؟

أيوه.

بما إن الـ Runtime بيتحط جوه كل Go Binary، حتى لو البرنامج نفسه بسيط جدا، الـ Binary هيكون له حجم معين بسبب وجود الـ Runtime.

والكتاب بيذكر إن حتى أبسط Go program ممكن ينتج Binary حجمه حوالي:

```text
2 MB
```

يعني حجم الـ Binary مش كله بسبب الكود اللي أنت كتبته، جزء منه جاي من الـ Runtime اللي موجود جواه.

---

## String and Runes and Bytes

زي ما كنا بنعمل في ال array وال slice
احنا نقدر نتعامل مع ال string بنفس المنطق دا
الي هو ان احنا نتعامل معاه ب index expression او slice notation ليه؟
علشان جو معتبرة الاسترنج هي عبارة عن مجموعة من البايتس واغلب المكاتب الخاصة ب جو بتعتبر او تفترض ان السترنج عبارة عن سلسلة او تسلسل من ال UTF-8-encoded code points

```go
var s string = "Hello World"
var b byte = s[6] // 87 in ASCII Code
println(b) // 87
println(string(b)) // W
```

اهو احنا كدا استخدمنا ال index expression
طب نجرب نستخدم ال slice expression notation:

```go
var s string = "Hello There"
var s2 string = s[4:7] // 4 -> 7 [o T] last index is not included (last -1) is included
var s3 string = s[:5] // 0 -> 5 Hello
var s4 string = s[6:] // 6 -> end There
```

إحنا عرفنا إن الـ String في Go عبارة عن sequence of bytes، وإن الـ indexing والـ slicing بيتعاملوا مع الـ byte positions.
طب إيه المشكلة؟
إن مش كل الحروف بتحتاج `byte` واحدة علشان تتمثّل في UTF-8. فيه حروف بتحتاج من 1 إلى 4 bytes، زي بعض الحروف العربية والـ emojis.
فمثلا يعني

```go
var s string = "Hello ☀️"

var s2 string = s[4:7]
var s3 string = s[:5]
var s4 string = s[6:]
```
- هنا `s3` هتكون `"Hello"`؛ لأن الحروف دي كل واحد منها بيمثّل بـ byte واحدة، والـ slicing وقف قبل الـ index رقم 5.
- وعندك `s4` بتبدأ من الـ index رقم 6، وده بداية الـ emoji في المثال.
- لكن `s2` مش بالضرورة تحتوي على حرف كامل من الـ emoji؛ لأنها ممكن تاخد جزء من الـ bytes اللي بتكوّنه.
ليه الـ s2 ممكن تطلع نتيجة غريبة؟ وليكن مثلا عندنا مثال زي دا 

```go
var s string = "Hello 🌞"
var s2 string = s[4:7]
```

الـ string متخزنة كـ bytes، والـ emoji `🌞` محتاجة 4 bytes في UTF-8.
لما نكتب `s[4:7]`، إحنا بنطلب الـ bytes الموجودة عند الـ indexes:
`4, 5, 6`

لكن الـ index رقم 4 هو حرف `o`، والـ indexes رقم 6 وما بعده جزء من الـ bytes الخاصة بالـ emoji.
بالتالي، إحنا أخدنا جزء من الـ emoji، مش الـ emoji كاملة. وده ممكن ينتج عنه invalid UTF-8 sequence.
ف Go مش هتمنعك من عمل الـ slicing ده؛ لأن الـ string ممكن تحتوي على bytes مش بتمثّل UTF-8 صالحًا.

ولو سألت نفسك سؤال، هل الـ String immutable ليها علاقة بالمشكلة دي؟

كدا كدا ان ال string في go  عبارة عن immutable  وده معناه إنك مش بتقدر تعدّل على byte موجودة فيها مباشرةً.

لكن المشكلة اللي بنتكلم عنها هنا مختلفة:
- الـ Immutability بتحمينا من تعديل محتوى الـ string نفسها.
- الـ Slicing ممكن يخلينا ناخد جزء من bytes بيفصل حرف Unicode إلى أجزاء غير مكتملة.
يعني حتى لو الـstring الأصلية سليمة، الـ substring اللي أخدناها ممكن تحتوي على UTF-8 غير صالح.

طب لو عملنا len هتطلع كام ؟ تعالى نجرب:

```go
package main

import "fmt"

func main() {
    var s string = "Hello 🌞"

    fmt.Println(len(s))
}
```
```
10
```

ليه `10` مش `7`؟

|الجزء|عدد الـ bytes|
|---|---|
|`Hello`|5|
|المسافة|1|
|`🌞`|4|
|الإجمالي|10|

إحنا شايفين 7 وحدات ظاهرة لو حسبنا الحروف والمسافة والـ emoji كرمز واحد، لكن `len()` بتحسب عدد الـ bytes، مش عدد الـ Unicode code points ولا عدد الرموز اللي بتظهر على الشاشة.

دلوقتي ممكن تواجه مشكلة وانت بتحول من int ل string ليه ؟

لان `go vet` منع ان يتم تحويل ال int لل string مهما كان

فلو حاولت انك انت تحول مثلا `A` ل int ف مش هيطلعلك الرقم الي انت متوقعه الي هو مثلا `65` وهيطلع نفس ال `A`

بس انت تقدر تحول من سترنج ل rune او byte وهيشتغل معاك بشكل 
طبيعي

مثلا يعني متيجي نحول ونشوف

```go
var s string = "Hello, 🌞"
var bs []byte = []byte(s)
var rs []rune = []rune(s)

fmt.Println(bs) // [72 101 108 108 111 44 32 240 159 140 158]
fmt.Println(rs) // [72 101 108 108 111 44 32 127774]
```

هل مهتم تعرف اي هو UTF-8?

### UTF-8
#### 1. What is Unicode?

الـ Unicode هو معيار بيدي لكل character أو symbol رقم مميز اسمه **Code Point**.

|Character|Unicode Code Point|
|---|---|
|`A`|`U+0041`|
|`B`|`U+0042`|
|`ش`|`U+0634`|
|`🌞`|`U+1F31E`|

يعني الـ Unicode بيحدد الرقم الخاص بكل character، لكن لسه محتاجين طريقة نحول بيها الرقم ده إلى bytes علشان نخزّنه في الذاكرة أو ننقله بين الأنظمة.

وهنا بييجي دور الـ UTF-8.

#### 2. What is UTF-8?

الـ UTF-8 اختصار لـ Unicode Transformation Format – 8-bit، وده أحد أشهر طرق تمثيل الـ Unicode code points باستخدام bytes.
الـ UTF-8 بيستخدم عددًا متغيرًا من الـ bytes، من 1 إلى 4 bytes، حسب قيمة الـ code point.
يعني مش كل character لازم ياخد نفس المساحة في الذاكرة.

|UTF-8 Bytes|نطاق الـ Code Point|
|---|---|
|1 byte|`U+0000` إلى `U+007F`|
|2 bytes|`U+0080` إلى `U+07FF`|
|3 bytes|`U+0800` إلى `U+FFFF`، مع استثناء الـ surrogates|
|4 bytes|`U+10000` إلى `U+10FFFF`|

خلينا ناخد أمثلة:

- الحرف `A` بيحتاج byte واحدة في UTF-8.
- الحرف العربي `ش` بيحتاج 2 bytes.
- الـ emoji `🌞` بيحتاج 4 bytes.

وده معناه إن UTF-8 بيستخدم مساحة أقل مع الحروف الشائعة في الإنجليزي، وفي نفس الوقت بيدعم لغات العالم المختلفة والـ emojis.

#### 3. Why not use UTF-32 or UTF-16?

فيه طرق تانية لتمثيل الـ Unicode، زي UTF-32 وUTF-16.

- مثلا **UTF-32:** بيستخدم 4 bytes لكل code point، وده بسيط في التعامل لكنه ممكن يستهلك مساحة أكبر.
- وعندك **UTF-16:** بيستخدم وحدتين من 16 bit؛ يعني code point ممكن يحتاج 2 bytes أو 4 bytes.
-  وبتاعتنا **UTF-8:** بيستخدم من 1 إلى 4 bytes، وبالتالي بيوفر مساحة مع النصوص اللي فيها حروف ASCII كتير.

ومن مميزات UTF-8 كمان إنه ملوش مشكلة الـ ==Endianness== بالشكل الموجود في UTF-16 وUTF-32؛ لأن ترتيب الـ bytes في UTF-8 محدد بوضوح.

#### 4. How does UTF-8 help identify character boundaries?

الـ UTF-8 مصمم بطريقة بتخلينا نقدر نميّز إذا كانت الـ byte هي بداية character أو جزء من character بدأ قبلها.

وده مهم لأن الـ character ممكن يكون مكوّنًا من عدة bytes.
لكن خلي بالك: رغم إننا نقدر نميّز بداية الـ UTF-8 sequence، ده مش معناه إننا نقدر نعرف عدد الـ characters اللي قبل الـ byte دي بمجرد النظر إليها.
علشان نعرف ترتيب الـ character داخل النص، غالبًا محتاجين نبدأ من الأول ونعدّي على الـ sequences.
وده أحد أسباب إن الـ String indexing في Go بيكون بالـ byte positions، مش بالـ character positions.

#### 5. UTF-8 in Go

ف Go بتتعامل مع الـ strings كسلسلة من الـ bytes، وبتستخدم UTF-8 بشكل واسع لتمثيل النصوص.

خلينا نجرب المثال ده:

```go
package main

import "fmt"

func main() {
    var s string = "Aش🌞"

    fmt.Println(len(s))

    var bs []byte = []byte(s)
    var rs []rune = []rune(s)

    fmt.Println(bs)
    fmt.Println(rs)
}
```
```text
7
[65 216 180 240 159 140 158]
[65 1588 127774]
```

تعالى نفهم النتيجة:

- مثلا `A` بتحتاج byte واحدة: `65`.
- `ش` بتحتاج 2  بايت `216 180`.
- `🌞` بتحتاج 4 بايت : `240 159 140 158`.

إجمالي الـ bytes هو 1+2+4=71 + 2 + 4 = 7، وعلشان كده `len(s)` بترجع `7`.
لكن لما حولنا الـ string إلى `[]rune`، لقينا 3 قيم؛ لأن كل rune بتمثّل Unicode code point واحدة.
لاحظ إن قيم الـ `rune` هنا بتكون أرقام الـ Unicode code points نفسها:

- `A` قيمتها `65`.
- `ش` قيمتها `1588`.
- `🌞` قيمتها `127774`.

وده بيوضح الفرق بين الـ bytes المستخدمة في UTF-8 والـ code points اللي بتمثلها الـ runes.

#### 6. Important Note: Converting int to string

لو حاولت تحوّل `int` إلى `string` في Go، لازم تفهم إن التحويل مش بيحوّل الرقم إلى نص رقمي.

```go
var n int = 65

fmt.Println(string(n)) // "A"
```

النتيجة `"A"`، مش `"65"`، لأن `string(n)` في Go بتحوّل القيمة إلى string تحتوي على الـ Unicode code point المقابلة للرقم، بشرط إن القيمة تمثل code point صالحة.

أما لو إنت عايز تحول الرقم `65` إلى النص `"65"`، استخدم:

```go
fmt.Println(strconv.Itoa(n)) // "65"
```

ومتنساش إن `go vet` ممكن يحذّرك من التحويل المباشر من integer إلى string؛ لأن غالبًا بيكون فيه التباس بين تحويل الرقم نفسه وتحويله إلى تمثيل نصي.

أما التحويل بين `string` و`[]byte` أو `[]rune`، فكل واحد ليه استخدام مختلف:

- `[]byte(s)`: بيحوّل الـ string إلى bytes.
- `[]rune(s)`: بيحوّل الـ string إلى Unicode code points.

---
## Maps

طبعا كلنا عارفين الـ Dictionary في باقي اللغات، اللي بنستخدمه لما نحتاج نربط قيمة بقيمة تانية عن طريق الـ Key والـ Value.

نفس الفكرة موجودة في Go، لكن اسم الـ Data Structure هنا هو **Map**.

بدل ما أخزّن البيانات في Slice وأوصل لكل عنصر عن طريق الـ Index بتاعه، أقدر أخزّن البيانات باستخدام Key من النوع اللي أنا محتاجه.

مثلا لو عايز أخزّن عدد مرات الفوز لكل فريق:

```go
totalWins := map[string]int{
    "Orcas": 1,
    "Lions": 2,
}
```

هنا عندي:

- الـ Key هو اسم الفريق، ونوعه `string`.
- الـ Value هي عدد مرات الفوز، ونوعها `int`.

يعني `"Orcas"` هو الـ Key، والرقم `1` هو الـ Value المرتبطة بيه.

### 1. Declaring Maps

في Go عندنا أكتر من طريقة نعمل بيها Declaration للـ Map.

#### الطريقة الأولى: باستخدام var

```go
var nilMap map[string]int
```

هنا إحنا عرّفنا Map اسمها `nilMap`، الـ Keys بتاعتها من نوع `string` والـ Values من نوع `int`.

لكن خد بالك إن الـ Zero Value للـ Map هي `nil`.

يعني الـ Map دي لسه مش مهيأة علشان نكتب فيها بيانات.

```go
fmt.Println(nilMap)       // map[]
fmt.Println(len(nilMap))  // 0
fmt.Println(nilMap["Go"]) // 0
```

ليه آخر سطر رجّع `0`؟

لأن الـ Value Type هنا هو `int`، والـ Zero Value بتاعة `int` هي `0`.

**Important:** تقدر تقرأ من الـ Nil Map عادي، لكن لو حاولت تضيف أو تعدّل فيها Key هتحصل على `panic`.

```go
var m map[string]int

m["Go"] = 10 // panic
```

#### الطريقة الثانية: باستخدام Map Literal

```go
totalWins := map[string]int{}
```

هنا عملنا Map فاضية، لكن فيه فرق مهم بينها وبين الـ Nil Map.

الـ Map دي اتعملها initialization بالفعل، وبالتالي تقدر تقرأ وتكتب فيها.

```go
totalWins["Orcas"] = 1
totalWins["Lions"] = 2

fmt.Println(totalWins)
```

خلي بالك إن الاتنين ممكن يكون عندهم `len` تساوي `0` في البداية، لكن مش نفس الحاجة:

- `var m map[string]int`: الـ Map قيمتها `nil`.
    
- `m := map[string]int{}`: الـ Map موجودة وفاضية، وتقدر تكتب فيها.
    

### 2. Non-empty Map Literal

طب لو عايز أعمل Map وأحط فيها بيانات من البداية؟

نقدر نستخدم الـ Map Literal بالشكل ده:

```go
teams := map[string][]string{
    "Orcas":   []string{"Fred", "Ralph", "Bijou"},
    "Lions":   []string{"Sarah", "Peter", "Billie"},
    "Kittens": []string{"Waldo", "Raul", "Ze"},
}
```

الـ Syntax بتاع الـ Map Literal بيكون بالشكل ده:

```go
map[keyType]valueType{
    key: value,
}
```

هنا الـ Key Type هو `string`، لكن الـ Value Type هو `[]string`.

يعني كل فريق مربوط بـ Slice فيها أسماء اللاعبين بتوعه.

ومش شرط إن الـ Value تكون `int` أو `string`؛ ممكن تكون Slice أو Struct أو أي Type مناسب.

ملحوظة: لازم نحط فاصلة `,` بعد كل Key-Value Pair داخل الـ Map Literal، حتى آخر عنصر.

### 3. Creating Maps Using make

طب لو أنا عارف إن عندي عدد كبير من الـ Key-Value Pairs، لكن لسه مش عارف القيم نفسها؟

ممكن أستخدم `make`:

```go
ages := make(map[int][]string, 10)
```

هنا:

- الـ Key Type هو `int`.
    
- الـ Value Type هو `[]string`.
    
- الرقم `10` هو الحجم الابتدائي المطلوب استخدامه في تجهيز الـ Map.
    

لكن خد بالك: الرقم `10` مش معناه إن عندي 10 عناصر بالفعل.

```go
fmt.Println(len(ages)) // 0
```

الـ Map لسه فاضية، وتقدر تضيف فيها أكتر من 10 عناصر عادي؛ لأنها بتكبر تلقائيًا مع إضافة عناصر جديدة.

### 4. Properties of Maps

الـ Maps بتشترك مع الـ Slices في بعض الخصائص:

1. **Automatic Growth:** بتكبر تلقائيًا لما تضيف Key-Value Pairs جديدة.
2. **Initial Size:** تقدر تستخدم `make` لو عايز تحدد حجم ابتدائي مناسب.
3. **Length:** بتستخدم `len(m)` علشان تعرف عدد الـ Key-Value Pairs الموجودة.
4. **Zero Value:** الـ Zero Value بتاعتها هي `nil`.
5. **Not Comparable:** مينفعش تقارن Map بMap تانية باستخدام == أو != علشان تتأكد إن المحتوى متساوي. لكن تقدر تقارنها بـ `nil`.
    

مثال:

```go
var m map[string]int

fmt.Println(m == nil) // true
```

لكن الكود ده غير مسموح:

```go
m1 := map[string]int{"Go": 1}
m2 := map[string]int{"Go": 1}

// fmt.Println(m1 == m2) // compile error
```

كمان مينفعش تستخدم `Slice` أو `Map` كـ Key داخل Map تانية؛ لأن الـ Keys لازم تكون من أنواع قابلة للمقارنة (Comparable Types).

مثلًا `string` و`int` ينفعوا Keys، لكن `[]int` مينفعش.

### 5. When to Use Maps vs Slices?

طب إمتى أستخدم Map وإمتى أستخدم Slice؟

استخدم الـ Slice لما تكون بتتعامل مع قائمة من البيانات، ويكون ترتيب العناصر مهم أو محتاج تتعامل معاها بالتتابع.

أما الـ Map فاستخدمها لما تحتاج تربط كل قيمة بـ Key معين بدل ما تعتمد على Index رقمي متزايد.

مثال:

```go
// Slice
students := []string{"Ahmed", "Ali", "Omar"}

// Map
studentGrades := map[string]int{
    "Ahmed": 90,
    "Ali":   85,
    "Omar":  95,
}
```

في الـ Slice، علشان توصل لعنصر معين، بتستخدم الـ Index.

أما في الـ Map، فتقدر توصل لدرجة الطالب باستخدام اسمه كـ Key.

### 6. What Is a Hash Map?

الـ Map الموجودة في Go مبنية باستخدام Data Structure اسمها **Hash Map** أو **Hash Table**.

الفكرة ببساطة إن فيه Hash Function بتساعد في تحديد المكان المناسب لتخزين البيانات أو البحث عنها اعتمادًا على الـ Key.

وده بيسمح بالوصول للعناصر بكفاءة في المتوسط، بدل ما نحتاج  نمر على كل العناصر واحدًا واحد زي البحث الخطي في Slice.

ف Go بتوفّر الـ Hash Map جاهزة داخل الـ Runtime، وإنت مش محتاج تكتب الـ Hash Function بنفسك أو تحدد طريقة المقارنة بين الـ Keys.

ومهم تعرف إن سرعة الوصول للـ Map مش ضمان إنها هتكون ثابتة في كل الحالات؛ ==الأداء بيعتمد على عوامل زي حجم البيانات والتصادمات== (Hash Collisions).

### 7. Reading and Writing a Map

تعالى نشوف إزاي نضيف بيانات ونقرأها من الـ Map.

```go
totalWins := map[string]int{}

totalWins["Orcas"] = 1
totalWins["Lions"] = 2

fmt.Println(totalWins["Orcas"])
fmt.Println(totalWins["Kittens"])

totalWins["Kittens"]++

totalWins["Lions"] = 3

fmt.Println(totalWins["Kittens"])
fmt.Println(totalWins["Lions"])
```

الـ Output:

```text
1
0
1
3
```

خلينا نفهم اللي حصل.

**أولًا: إضافة قيمة**

```go
totalWins["Orcas"] = 1
```

بنستخدم الـ Key داخل `[]`، وبعدها = لتحديد القيمة المرتبطة بيه.
**ثانيًا: قراءة قيمة**

```go
fmt.Println(totalWins["Orcas"])
```

هنا قرأنا القيمة المرتبطة بالـ Key `"Orcas"`، والنتيجة `1`.

**ثالثًا: قراءة Key مش موجودة**

```go
fmt.Println(totalWins["Kittens"])
```

النتيجة `0`؛ لأن الـ Key مش موجودة، والـ Zero Value للـ `int` هي `0`.

**رابعًا: استخدام ++**

```go
totalWins["Kittens"]++
```

هنا القيمة الافتراضية كانت `0`، وبعد الـ Increment بقت `1`.
ودي ميزة مفيدة جدًا لو بتستخدم الـ Map كـ Counter.

**Important:** مينفعش تستخدم `:=` لإسناد قيمة إلى Key داخل Map.

```go
totalWins["Orcas"] = 5 // صح

// totalWins["Orcas"] := 5 // غلط
```

الـ `:=` بتُستخدم في تعريف متغيرات جديدة، مش في تحديث قيم الـ Map.

### 8. The Comma OK Idiom

إحنا شفنا إن لو حاولنا نقرأ Key مش موجودة، الـ Map بترجع الـ Zero Value الخاصة بالـ Value Type.
طب إيه المشكلة؟

طب لو تخيل كدا ان في قيمة ب صفر، قيمة بصفر فعلا ف انت مش هتعرف تفرق هل دي موجودة ولا لا، فعلشان كده Go بتوفّر طريقة اسمها **Comma OK Idiom**. هنا هتديلك True او False لو مش موجودة وتديلك القيمة بتاعتها كمان

```go
m := map[string]int{
    "hello": 5,
    "world": 0,
}

v, ok := m["hello"]
fmt.Println(v, ok)

v, ok = m["world"]
fmt.Println(v, ok)

v, ok = m["goodbye"]
fmt.Println(v, ok)
```

الـ Output:

```text
5 true
0 true
0 false
```

إحنا هنا بنستقبل نتيجتين من عملية القراءة:

- `v`: القيمة المرتبطة بالـ Key، أو الـ Zero Value لو مش موجودة.
- `ok`: قيمة من النوع `bool` بتحدد هل الـ Key موجودة فعلًا أم لا.

يعني:

- `"hello"` موجودة وقيمتها `5`، فالناتج `5 true`.
- `"world"` موجودة وقيمتها `0`، فالناتج `0 true`.
- `"goodbye"` مش موجودة، فالناتج `0 false`.

**Important:**
عندك Comma OK Idiom مفيدة لما تحتاج تفرّق بين قيمة افتراضية وبين Key مش موجودة.

### 9. Deleting from Maps

لو عايز تحذف Key ومعاها الـ Value المرتبطة بيها، استخدم الـ Built-in Function اسمها `delete`.

```go
m := map[string]int{
    "hello": 5,
    "world": 10,
}

delete(m, "hello")

fmt.Println(m) // map[world:10]
```

الـ `delete` بتاخد وسيطين:

1. الـ Map اللي عايز تحذف منها.
2. الـ Key اللي عايز تحذفها.

خلي بالك من نقطتين:

- لو الـ Key مش موجودة، مش هيحصل أي تغيير.
- لو الـ Map نفسها `nil`، استدعاء `delete` مش هيعمل `panic`.

كمان `delete` مش بترجع قيمة.

### 10. Emptying a Map Using clear

إحنا شفنا قبل كده الـ `clear` مع الـ Slices، وهي موجودة للـ Maps برضه.

```go
m := map[string]int{
    "hello": 5,
    "world": 10,
}

fmt.Println(m, len(m))

clear(m)

fmt.Println(m, len(m))
```

الـ Output:

```text
map[hello:5 world:10] 2
map[] 0
```

الـ `clear(m)` بتحذف كل الـ Key-Value Pairs الموجودة في الـ Map، وبالتالي طولها بيبقى صفر.

وخلي بالك إن الـ Map نفسها بتفضل موجودة وجاهزة للاستخدام بعد الـ `clear`؛ مش بتتحول إلى `nil`.

### 11. Comparing Maps

بما إننا عرفنا إن مينفعش نقارن محتوى الـ Maps مباشرة باستخدام ==  فإزاي نعرف إذا كانت Map مساوية لـ Map تانية؟

من Go 1.21، فيه Package في الـ Standard Library اسمها `maps` بتوفّر Functions للمقارنة.

أهم اتنين هنا:

- `maps.Equal`
- `maps.EqualFunc`
خلينا نشوف `maps.Equal`:

```go
package main

import (
    "fmt"
    "maps"
)

func main() {
    m := map[string]int{
        "hello": 5,
        "world": 10,
    }

    n := map[string]int{
        "world": 10,
        "hello": 5,
    }

    fmt.Println(maps.Equal(m, n)) // true
}
```

رغم إن ترتيب كتابة العناصر مختلف، النتيجة `true`؛ لأن الـ Keys والـ Values متطابقة.

الـ `maps.Equal` بتقارن المحتوى، ومش بتهتم بترتيب العناصر.

أما `maps.EqualFunc`، فبتسمحلك تحدد بنفسك طريقة مقارنة الـ Values، وده مفيد لو محتاج مقارنة مخصصة بدل المقارنة الافتراضية.

### 12. Using Maps as Sets

فيه Data Structure اسمها **Set**، وهي مجموعة من العناصر الفريدة (Unique Values)، يعني مفيش فيها تكرار، ومش بتضمن ترتيبًا معينًا للعناصر.

Go مش بتوفّر Built-in Set Type بالشكل الموجود في بعض اللغات، لكن نقدر نستخدم الـ Map علشان نحاكي نفس الفكرة.

خلينا نستخدم `map[int]bool`:

```go
intSet := map[int]bool{}

vals := []int{5, 10, 2, 5, 8, 7, 3, 9, 1, 2, 10}

for _, v := range vals {
    intSet[v] = true
}

fmt.Println(len(vals), len(intSet))
fmt.Println(intSet[5])
fmt.Println(intSet[500])
```

الـ Output:

```text
11 8
true
false
```
تعالى نفهم المثال.

إحنا عندنا Slice فيها 11 عنصر، لكن فيها أرقام متكررة.
لما ضفنا الأرقام للـ Map، كل رقم اتخزّن كـ Key مرة واحدة فقط؛ لأن الـ Map مش بتسمح بوجود أكتر من عنصر بنفس الـ Key.

علشان كده:

- `len(vals)` بتساوي `11`.
- `len(intSet)` بتساوي `8`؛ لأن فيه 8 أرقام مختلفة.
- `intSet[5]` بترجع `true`؛ لأن الرقم `5` موجود كـ Key.
- `intSet[500]` بترجع `false`؛ لأن الـ Key مش موجودة، والـ Zero Value للـ `bool` هي `false`.

وده بيخلينا نستخدم الـ Map كأنها Set علشان نختبر وجود عنصر بسرعة في المتوسط.

#### استخدام struct{} بدل bool

فيه طريقة تانية لتنفيذ الـ Set باستخدام `map[int]struct{}`.

```go
intSet := map[int]struct{}{}

vals := []int{5, 10, 2, 5, 8, 7, 3, 9, 1, 2, 10}

for _, v := range vals {
    intSet[v] = struct{}{}
}

if _, ok := intSet[5]; ok {
    fmt.Println("5 is in the set")
}
```

ليه نستخدم `struct{}` بدل `bool`؟

لأن الـ Empty Struct حجمها صفر bytes، وإحنا هنا مش محتاجين نخزّن قيمة فعلية؛ إحنا محتاجين نعرف بس إذا كانت الـ Key موجودة.

لكن في المقابل، استخدام `bool` أبسط في القراءة:

```go
if intSet[5] {
    fmt.Println("5 is in the set")
}
```

أما مع `struct{}`، فبنحتاج غالبًا نستخدم الـ Comma OK Idiom علشان نعرف إذا كانت الـ Key موجودة.

وفي معظم الحالات العادية، الفرق في استهلاك الذاكرة مش هيكون مهم كفاية علشان تتنازل عن بساطة الـ `bool`.

---

## Struct

### 1. يعني إيه Struct؟

طبعا إحنا اتكلمنا عن الـ `Maps` وإنها بتخزن البيانات على شكل `Key-Value`، لكن عندها شوية limitations:

- كل الـ values لازم تكون من نفس الـ type.
- مفيش طريقة نحدد بيها إن الـ map تسمح بمجموعة معينة من الـ keys بس.
- مش أفضل اختيار لما نكون عايزين نجمع بيانات مرتبطة ببعض ونبعتها من function لـ function.

علشان كده عندنا الـ **Struct**، ودي طريقة بنجمع بيها مجموعة من البيانات المرتبطة ببعض، حتى لو كل قيمة من نوع مختلف.
مثلا لو عندنا شخص، فممكن نحتاج نخزن اسمه وسنه ونوع الحيوان الأليف بتاعه.

```go
type person struct {
    name string
    age  int
    pet  string
}
```

الـ **Fields** هي البيانات اللي الـ struct بيحتفظ بيها.
خد بالك هنا إننا مش بنحط commas بين الـ fields في تعريف الـ struct.

### 2. هل الـ Structs زي الـ Classes؟

لو انت جاي من خلفية دوت نت زي حالتي وعارف لغة C#، ممكن تسأل: إيه الفرق بين الـ `struct` في Go والـ `class` في C#؟

هنا Go معندهاش Classes أو Inheritance بالشكل الموجود في لغات زي C# وJava، لكن عندها features بتدعم الـ Object-Oriented Programming بطريقة مختلفة، زي الـ Methods والـ Interfaces، ودي هنتكلم عنها بعدين.

### 3. إنشاء Variables من نوع Struct

بعد ما نعرّف الـ struct، نقدر نعمل variables من النوع ده.

```go
type person struct {
    name string
    age  int
    pet  string
}

var fred person

fmt.Println(fred)
```

بما إننا استخدمنا `var` من غير ما ندي `fred` قيمة، فالـ struct كله بياخد الـ **Zero Values** بتاعة الـ fields بتاعته.

يعني:

- `name` هتبقى `""`.
- `age` هتبقى `0`.
- `pet` هتبقى `""`.

كل الـ fields بتاخد الـ zero value المناسبة للـ type بتاعها.

### 4. Struct Literals

ممكن ننشئ struct وندي له قيم مباشرة باستخدام الـ **Struct Literal**.

#### الطريقة الأولى: من غير أسماء الـ Fields

```go
Prof := person{
    "Prof",
    21,
    "cat",
}

fmt.Println(Prof)
```

هنا القيم بتتوزع على الـ fields حسب ترتيب تعريفها:

| <span class="ptb" data-w="85">Field</span> | Value    |
| ------ | -------- |
| `name` | `"Prof"` |
| `age`  | `21`     |
| `pet`  | `"cat"`  |

في الطريقة دي لازم تكتب قيمة لكل field، وبنفس ترتيب تعريفهم بالضبط.

#### الطريقة الثانية: باستخدام أسماء الـ Fields

```go
beth := person{
    age:  30,
    name: "Beth",
}

fmt.Println(beth)
```

هنا حددنا كل قيمة باسم الـ field اللي هتتحط فيه.

لاحظ إننا كتبنا `age` قبل `name`، وده عادي؛ لأن ترتيب القيم مش مهم لما نستخدم أسماء الـ fields.

كمان مش لازم نكتب كل الـ fields، فأي field مش بنحدد له قيمة بياخد الـ zero value بتاعته. بالتالي `pet` هنا هتبقى `""`.

**أنهي طريقة أفضل؟**

- لو الـ struct صغير وكل الـ fields بتتاخد قيمها، ممكن تستخدم الطريقة الأولى.
- في أغلب الحالات، خصوصا لو الـ struct فيه fields كتير، الأفضل تستخدم أسماء الـ fields؛ ==علشان الكود يبقى أوضح وأسهل في الصيانة.==

وفي نقطة مهمة: مينفعش تخلط الطريقتين في نفس الـ struct literal. يا إما تحدد كل القيم من غير أسماء، يا إما تستخدم أسماء الـ fields.

### 5. التعامل مع الـ Fields

بنستخدم الـ **Dot Notation** علشان نقرأ أو نعدّل قيمة أي field. دي متعودين عليها ف سي شارب بشكل طبيعي يعني.

```go
bob := person{
    name: "Bob",
    age:  25,
    pet:  "dog",
}

fmt.Println(bob.name)

bob.age = 26

fmt.Println(bob.age)
```
الـ output:
```text
Bob
26
```

الفرق بين الـ Map والـ Struct في الوصول للبيانات:

```go
// Map
ages["Bob"] = 26

// Struct
bob.age = 26
```

الـ Map بنستخدم معاها `[]`، لكن الـ Struct بنستخدم معاه `.`.

### 6. Anonymous Structs

لحد دلوقتي كنا بنعرف نوع الـ struct الأول باستخدام `type`، وبعدها بننشئ variable منه.
لكن Go بتسمح لنا نستخدم struct من غير ما نعرّف له اسم type مستقل، وده اسمه **Anonymous Struct**.
اممممم جالك احساس بانه شبه ال Generic في ال C# يا لئيم


```go
var person struct {
    name string
    age  int
    pet  string
}

person.name = "Bob"
person.age = 50
person.pet = "dog"

fmt.Println(person)
```

هنا إحنا أنشأنا variable اسمها `person`، والـ type بتاعها struct مجهول الاسم.
نقدر نتعامل مع الـ fields بنفس الطريقة المعتادة باستخدام الـ dot notation.

وممكن كمان نستخدم struct literal مباشرة:
```go
pet := struct {
    name string
    kind string
}{
    name: "Fido",
    kind: "dog",
}

fmt.Println(pet)
```

خلي بالك من شكل الكود: إحنا عرّفنا الـ struct type وكتبنا قيمه في نفس التعبير.

#### إمتى نستخدم Anonymous Structs؟

فيه استخدامين مشهورين:

1. **التعامل مع البيانات الخارجية:** زي تحويل بيانات JSON إلى struct أو تحويل struct إلى JSON. العملية الأولى اسمها `Unmarshaling`، والتانية اسمها `Marshaling`. شبه ال Serialization و Deserialization تقريبا
2. **الاختبارات:** بنستخدمها أحيانا في `Table-Driven Tests`، بحيث نعرّف مجموعة من حالات الاختبار داخل slice من الـ structs.

لو الـ type مش محتاجينه غير في مكان محدود، فالـ anonymous struct ممكن يكون اختيار مناسب.

### 7. Comparing Structs

هل ينفع نقارن اتنين structs باستخدام == أو !=؟

الإجابة: **على حسب الـ fields الموجودة جواهم.**

لو كل الـ fields أنواعها قابلة للمقارنة `Comparable`، فالـ struct نفسه بيكون قابل للمقارنة.

مثال:

```go
type person struct {
    name string
    age  int
}

p1 := person{
    name: "Bob",
    age:  25,
}

p2 := person{
    name: "Bob",
    age:  25,
}

fmt.Println(p1 == p2)
```

الـ output:

```text
true
```

لأن كل الـ fields قابلة للمقارنة، وقيمها متساوية.

لكن لو الـ struct فيه field من نوع `slice` أو `map`، مش هينفع نقارن الـ struct باستخدام == ؛ لأن الـ slices والـ maps نفسها مش قابلة للمقارنة بالطريقة دي.

```go
type person struct {
    name string
    hobbies []string
}
```

الـ struct ده مش comparable بسبب الـ `hobbies`.

ونفس الفكرة تنطبق على الـ fields من نوع `function` أو `channel`؛ وجودها بيمنع مقارنة الـ struct باستخدام == .

لو محتاج تقارن structs غير قابلة للمقارنة، تقدر تكتب function خاصة بيك وتقارن البيانات بالطريقة المناسبة.

### 8. Comparing Different Struct Types

في Go، مش كفاية إن اتنين structs عندهم نفس الـ fields علشان نعتبرهم نفس الـ type.
مثلا:
```go
type firstPerson struct {
    name string
    age  int
}

type secondPerson struct {
    name string
    age  int
}
```

رغم إن الـ fields متطابقة، `firstPerson` و`secondPerson` نوعان مختلفان.
علشان كده مينفعش تعمل المقارنة دي مباشرة:

```go
// f := firstPerson{name: "Bob", age: 50}
// s := secondPerson{name: "Bob", age: 50}

// fmt.Println(f == s) // Compile error
```

لكن ينفع تعمل **Type Conversion** بين النوعين، بشرط إن تعريفات الـ fields تكون متطابقة في الأسماء والترتيب والأنواع.

```go
f := firstPerson{
    name: "Bob",
    age:  50,
}

s := secondPerson(f)

fmt.Println(s)
```

التحويل هنا مسموح لأن الـ fields متطابقة.

#### إمتى التحويل مش هيكون مسموح؟

**أولا: اختلاف ترتيب الـ fields**

```go
type thirdPerson struct {
    age  int
    name string
}
```

مينفعش تحوّل `firstPerson` إلى `thirdPerson`؛ لأن ترتيب الـ fields مختلف.

**ثانيا: اختلاف أسماء الـ fields**

```go
type fourthPerson struct {
    firstName string
    age       int
}
```

مينفعش تحوّل `firstPerson` إلى `fourthPerson`؛ لأن `name` و`firstName` مش نفس الاسم.

**ثالثا: وجود Fields زيادة**

```go
type fifthPerson struct {
    name          string
    age           int
    favoriteColor string
}
```

مينفعش تحوّل `firstPerson` إلى `fifthPerson`؛ لأن فيه field إضافية في النوع التاني.

إذن، حسب القاعدة اللي بندرسها هنا، لازم أسماء الـ fields وترتيبها وأنواعها تكون متطابقة علشان نعمل التحويل.

### 9. Anonymous Structs مع Named Structs

فيه استثناء مهم مرتبط بالـ anonymous structs.

لو عندنا named struct وanonymous struct، وكان عندهم نفس أسماء الـ fields وترتيبها وأنواعها، ينفع نعمل بينهم assignment أو comparison مباشرة.

```go
type firstPerson struct {
    name string
    age  int
}

f := firstPerson{
    name: "Bob",
    age:  50,
}

var g struct {
    name string
    age  int
}

g = f

fmt.Println(f == g)
```
الـ output:
```text
true
```
ليه ده اشتغل؟
لأن الـ anonymous struct والـ named struct عندهم نفس أسماء الـ fields ونفس ترتيبها ونفس أنواعها.
**الخلاصة:** مش كل structين عندهم نفس البيانات ينفع نقارنهم مباشرة، لكن الـ anonymous structs ليها مرونة إضافية لما تكون مواصفاتها متطابقة.