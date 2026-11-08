---
title: "Chapter 5 Functions"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages, masters]
created: 2026-10-22
updated: 2026-10-23
source:
related: []
---
# 1. Declaring and Calling Functions

الـ Function هي جزء من الكود بنكتبه مرة ونقدر نستدعيه أكتر من مرة، وممكن يستقبل Parameters ويرجع Values.

## Function Declaration

```go
func div(num int, denom int) int {
    if denom == 0 {
        return 0
    }

    return num / denom
}
```

أي Function Declaration بتتكون من 4 أجزاء:

- `func`: الكلمة المستخدمة لتعريف الـ Function.
- `div`: اسم الـ Function.
- `num int, denom int`: الـ Input Parameters، بنكتب اسم كل Parameter وبعده الـ Type.
- `int`: نوع القيمة اللي الـ Function بترجعها، وده اسمه Return Type.

لو عندنا أكتر من Parameter من نفس النوع، نقدر نكتب النوع مرة واحدة:

```go
func div(num, denom int) int {
    return num / denom
}
```

## Calling a Function

```go
func main() {
    result := div(5, 2)
    fmt.Println(result)
}
```

الـ `div(5, 2)` بتستدعي الـ Function، والـ Return Value بتتخزن في `result`.

الـ `main` Function مش بتستقبل Parameters ومش بترجع Values، علشان كده بنكتبها بالشكل ده:

```go
func main() {
}
```

لو الـ Function بترجع Value، لازم كل مسار تنفيذ يوصل لنهاية الـ Function يكون بيرجع قيمة مناسبة. أما لو مش بترجع حاجة، فمش محتاجين `return` في آخرها، لكن نقدر نستخدمه للخروج المبكر من الـ Function.

# 2. Simulating Named and Optional Parameters

Go مش بتدعم Named Parameters أو Optional Parameters بالطريقة الموجودة في لغات تانية.

يعني لازم تبعت الـ Parameters المطلوبة في استدعاء الـ Function، ومش بتقدر تحدد Parameter بالاسم أثناء الاستدعاء أو تسيب Parameter اختياري من غير ما توفر له قيمة.

البديل هو استخدام `struct` يجمع الإعدادات المطلوبة.

```go
type MyFuncOpts struct {
    FirstName string
    LastName  string
    Age       int
}

func MyFunc(opts MyFuncOpts) error {
    // do something here
    return nil
}
```

الاستخدام:

```go
func main() {
    MyFunc(MyFuncOpts{
        LastName: "Patel",
        Age:      50,
    })

    MyFunc(MyFuncOpts{
        FirstName: "Joe",
        LastName:  "Smith",
    })
}
```

هنا تقدر تحدد الحقول اللي محتاجها باستخدام أسمائها، وتسيب الحقول التانية على الـ Zero Values بتاعتها.

**ملحوظة:** لو الـ Function محتاجة Parameters كتير جدًا، فده ممكن يكون مؤشر إن مسؤولياتها أكبر من اللازم، ومحتاجة إعادة تصميم.

# 3. Variadic Input Parameters

الـ Variadic Parameter بتسمح للـ Function إنها تستقبل عدد متغير من القيم من نفس النوع.

بنكتب `...` قبل الـ Type، ولازم الـ Variadic Parameter تكون آخر Parameter في تعريف الـ Function.

```go
func addTo(base int, vals ...int) []int {
    out := make([]int, 0, len(vals))

    for _, v := range vals {
        out = append(out, base+v)
    }

    return out
}
```

الـ `vals ...int` بتكون متاحة داخل الـ Function على هيئة `[]int`، يعني Slice من الأعداد الصحيحة.

نقدر نستدعيها بأكتر من شكل:

```go
func main() {
    fmt.Println(addTo(3))
    fmt.Println(addTo(3, 2))
    fmt.Println(addTo(3, 2, 4, 6, 8))

    a := []int{4, 3}
    fmt.Println(addTo(3, a...))
}
```

الـ Output:

```go
[]
[5]
[5 7 9 11]
[7 6]
```

## استخدام `...` مع الـ Slice

لو عندك Slice وعايز تمرر عناصرها كـ Variadic Arguments، لازم تستخدم `...` بعد اسم الـ Slice:

```go
a := []int{4, 3}
addTo(3, a...)
```

ده بيمرر عناصر الـ Slice كقيم منفصلة للـ Variadic Parameter.

أما `addTo(3, a)` فمش صحيح، لأن `a` نوعها `[]int`، بينما الـ Function متوقعة قيم `int` منفصلة.

# 4. Multiple Return Values

من مميزات Go إن الـ Function تقدر ترجع أكتر من Value.

مثال: Function بتعمل Division وترجع ناتج القسمة والباقي، بالإضافة إلى Error لو حصلت مشكلة.

```go
func divAndRemainder(num, denom int) (int, int, error) {
    if denom == 0 {
        return 0, 0, errors.New("cannot divide by zero")
    }

    return num / denom, num % denom, nil
}
```

لما الـ Function ترجع أكتر من Value، بنكتب أنواع القيم كلها داخل أقواس، وبينهم فواصل.

وعند استخدام `return` لازم نرجع كل القيم المطلوبة، وبنفس الترتيب.

```go
return num / denom, num % denom, nil
```

الـ `errors.New()` بتنشئ Error، بينما `nil` هنا معناها إن مفيش Error حصل.

في Go، من الشائع إن الـ Error يكون آخر قيمة بترجعها الـ Function.

## التعامل مع القيم والأخطاء

```go
func main() {
    result, remainder, err := divAndRemainder(5, 2)

    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }

    fmt.Println(result, remainder)
}
```

الـ Output:

```go
2 1
```

الـ `:=` هنا بتستقبل القيم التلاتة اللي رجعتهم الـ Function، وكل قيمة بتتخزن في المتغير المقابل ليها.

بنقارن `err` مع `nil` علشان نعرف هل حصل خطأ ولا لأ.

# 5. Go Multiple Return Values vs. Python

في Python، ممكن نفهم إرجاع أكتر من قيمة على إنه إرجاع Tuple، وتقدر تخزن الـ Tuple كلها في متغير واحد أو تفكها على أكتر من متغير.

أما في Go، الـ Function بترجع قيم متعددة فعلًا، ولازم تستقبلها في متغيرات بعدد مناسب.

مثال:

```go
result, remainder, err := divAndRemainder(5, 2)
```

مينفعش تكتب:

```go
x := divAndRemainder(5, 2)
```

لأن الـ Function بترجع 3 قيم، بينما `x` متغير واحد.

# 6. Ignoring Returned Values

لو الـ Function بترجع أكتر من قيمة، وإنت مش محتاج واحدة منهم، استخدم الـ Blank Identifier `_`.

```go
result, _, err := divAndRemainder(5, 2)
```

هنا استقبلنا ناتج القسمة والـ Error، وتجاهلنا الباقي.

Go مش بتسمح بمتغيرات محلية غير مستخدمة، والـ `_` بتوضح إنك بتتجاهل القيمة عن قصد.

في المقابل، تقدر تستدعي Function وترمي كل الـ Return Values من غير ما تستقبلها:

```go
divAndRemainder(5, 2)
```

لكن لما تحتاج بعض القيم بس، استخدم `_` علشان توضح إن تجاهل باقي القيم مقصود.

# 7. Named Return Values

Go بتسمح إنك تسمي الـ Return Values في تعريف الـ Function.

```go
func divAndRemainder(num, denom int) (
    result int,
    remainder int,
    err error,
) {
    if denom == 0 {
        err = errors.New("cannot divide by zero")
        return result, remainder, err
    }

    result = num / denom
    remainder = num % denom

    return result, remainder, err
}
```

الأسماء `result` و`remainder` و`err` هنا بتعرّف متغيرات داخل الـ Function، وبتكون هي نفسها المتغيرات اللي بتُستخدم لتخزين قيم الإرجاع.

كل Named Return Value بتبدأ بالـ Zero Value الخاصة بنوعها.

تقدر تستقبل القيم دي بأسماء مختلفة خارج الـ Function:

```go
x, y, z := divAndRemainder(5, 2)
```

أسماء الـ Return Values مش بتفرض أسماء معينة على المتغيرات اللي بتستقبلها.

## عيوب Named Return Values

أحيانًا بتخلي الكود أوضح، لكن ممكن تسبب لخبطة بسبب الـ Shadowing، أو لأنك تقدر ترجع قيم مختلفة عن القيم المخزنة في المتغيرات المسماة.

مثال:

```go
func divAndRemainder(num, denom int) (
    result int,
    remainder int,
    err error,
) {
    result, remainder = 20, 30

    if denom == 0 {
        return 0, 0, errors.New("cannot divide by zero")
    }

    return num / denom, num % denom, nil
}
```

لو استدعيناها بالقيم `5, 2`، هترجع `2, 1, nil`، مش `20, 30, nil`.

السبب إن القيم الموجودة في `return` هي اللي بتتحدد كقيم الإرجاع، حتى لو كانت مختلفة عن القيم المسندة قبل كده للـ Named Return Values.

# 8. Blank Returns  حاول متستخدمهاش

لما تستخدم Named Return Values، Go بتسمح إنك تكتب `return` من غير ما تحدد القيم.

```go
func divAndRemainder(num, denom int) (
    result int,
    remainder int,
    err error,
) {
    if denom == 0 {
        err = errors.New("cannot divide by zero")
        return
    }

    result = num / denom
    remainder = num % denom

    return
}
```

الـ `return` الفاضية بترجع القيم الحالية الموجودة في المتغيرات المسماة.

في حالة القسمة على صفر، `result` و`remainder` لسه بالـ Zero Values بتاعتهم، بينما `err` فيها الخطأ.

لكن الكتاب بينصح بتجنب الـ Blank Returns؛ لأنها بتخلي القارئ محتاج يرجع لأجزاء سابقة من الكود علشان يعرف القيم اللي هترجع فعلًا.

**القاعدة:** لو الـ Function بترجع Values، الأفضل تكتب القيم صراحة في `return` علشان يكون تدفق البيانات واضح.

# 9. Functions Are Values

في Go، الـ Functions نفسها تعتبر Values، يعني تقدر تخزن Function في متغير، أو تبعتها كـ Parameter، أو ترجعها من Function تانية.

نوع الـ Function بيتحدد من أنواع الـ Parameters والـ Return Values، والمجموعة دي اسمها **Function Signature**.

مثال:

```go
func f1(a string) int {
    return len(a)
}

func f2(a string) int {
    total := 0

    for _, v := range a {
        total += int(v)
    }

    return total
}
```

الـ `f1` والـ `f2` الاتنين بياخدوا `string` وبيرجعوا `int`، وبالتالي يقدروا يتخزنوا في متغير من النوع ده:

```go
func main() {
    var myFuncVariable func(string) int

    myFuncVariable = f1
    fmt.Println(myFuncVariable("Hello"))

    myFuncVariable = f2
    fmt.Println(myFuncVariable("Hello"))
}
```

الـ Output:

```go
5
500
```

الـ `f1` بترجع عدد الـ Bytes في `"Hello"`، أما `f2` فبتجمع قيم الـ Unicode Code Points اللي بيمثلها الـ `string` في الـ Range.

## Function Variable و nil

الـ Zero Value لأي Function Variable هي `nil`.

لو حاولت تستدعي Function Variable وهي `nil`، البرنامج هيحصل فيه `panic`.

علشان كده لازم تتأكد إن المتغير متعيّن له Function صالحة قبل استدعائه.

# 10. Using Functions in a Map

بما إن الـ Functions Values، تقدر تخزنها في Map وتربط كل Function بمفتاح.

مثال Calculator:

```go
func add(i, j int) int { return i + j }
func sub(i, j int) int { return i - j }
func mul(i, j int) int { return i * j }
func div(i, j int) int { return i / j }
```

بنعرّف Map تربط كل Operator بالـ Function المناسبة:

```go
var opMap = map[string]func(int, int) int{
    "+": add,
    "-": sub,
    "*": mul,
    "/": div,
}
```

بعد كده نقدر نختار الـ Function بناءً على الـ Operator اللي المستخدم أدخله.

```go
op := "+"
opFunc, ok := opMap[op]

if !ok {
    fmt.Println("unsupported operator:", op)
    return
}

result := opFunc(2, 3)
fmt.Println(result)
```

الـ `opFunc` هنا متغير بيحتوي على الـ Function المناسبة، واستدعاؤه بيكون بنفس طريقة استدعاء أي Function عادية.

## التحقق من المدخلات

في مثال الـ Calculator الأصلي، البرنامج بيستخدم `strconv.Atoi` لتحويل الـ Strings إلى أعداد صحيحة.

```go
p1, err := strconv.Atoi("2")
if err != nil {
    fmt.Println(err)
    return
}
```

لازم تتحقق من الأخطاء قبل استخدام القيمة؛ لأن المدخل ممكن يكون غير صالح، زي `"two"` بدل `"2"`.

كمان لازم تتحقق من عدد عناصر الـ Expression، ومن إن الـ Operator مدعوم.

**الفكرة الأساسية:** التحقق من المدخلات ومعالجة الأخطاء جزء من منطق البرنامج، مش مجرد تفاصيل إضافية.

# 11. Function Type Declarations

تقدر تستخدم `type` علشان تعرّف اسم جديد لنوع Function.

```go
type opFuncType func(int, int) int
```

بعدها تقدر تستخدم النوع ده في الـ Map:

```go
var opMap = map[string]opFuncType{
    "+": add,
    "-": sub,
    "*": mul,
    "/": div,
}
```

أي Function بتاخد اتنين `int` وبترجع `int` تقدر تستخدم كقيمة من النوع ده.

الفايدة الأساسية هنا هي توضيح الكود، خصوصًا لو نوع الـ Function بيتكرر في أكتر من مكان.

# 12. Anonymous Functions

الـ Anonymous Function هي Function من غير اسم.

بدل ما تعرّف Function منفصلة، تقدر تعرّفها داخل Function تانية وتخزنها في متغير.

```go
func main() {
    f := func(j int) {
        fmt.Println("printing", j)
    }

    for i := 0; i < 5; i++ {
        f(i)
    }
}
```

الـ `func(j int)` هنا بتعرّف Function من غير اسم، وبعد كده اتخزنت في `f` واتنفذت باستخدام `f(i)`.

تقدر كمان تعرّف Anonymous Function وتستدعيها مباشرة:

```go
func main() {
    for i := 0; i < 5; i++ {
        func(j int) {
            fmt.Println("printing", j)
        }(i)
    }
}
```

لاحظ وجود `(i)` بعد قوس إغلاق جسم الـ Function؛ ده استدعاء للـ Function وتمرير `i` كـ Argument.

الاستخدام ده مش شائع لمجرد تنفيذ كود عادي، لكنه مفيد في حالات زي `defer` وتشغيل Goroutines.

## Anonymous Functions على مستوى الـ Package

ممكن تعرّف Package-Level Variables تحتوي على Anonymous Functions:

```go
var (
    add = func(i, j int) int { return i + j }
    sub = func(i, j int) int { return i - j }
)
```

وعلى عكس الـ Function العادية المعرفة باستخدام اسم ثابت في Declaration، المتغير `add` نفسه ممكن يتعيّن له Function مختلفة أثناء التشغيل.

```go
func changeAdd() {
    add = func(i, j int) int {
        return i + j + j
    }
}
```

لكن لازم الحذر من تغيير الـ Package-Level State؛ لأن تغيير معنى Function أثناء تشغيل البرنامج ممكن يصعّب فهم الكود وتتبّع البيانات.

# 13. Closures

الـ Closure هي Function داخل Function تانية، وتقدر تستخدم المتغيرات الموجودة في الـ Scope الخارجية، حتى لو المتغيرات دي مش متبعتة ليها كـ Parameters.

مثال:

```go
func main() {
    a := 20

    f := func() {
        fmt.Println(a)
        a = 30
    }

    f()
    fmt.Println(a)
}
```

الـ Output:

```
20
30
```

الـ Function الموجودة في `f` قرأت المتغير `a` وعدّلت قيمته؛ وبالتالي التغيير ظهر بعد انتهاء استدعائها.

## Shadowing داخل Closure

لو استخدمت `:=` بدل =، هتنشئ متغيرًا جديدًا داخل الـ Closure بدل تعديل المتغير الخارجي.

```go
func main() {
    a := 20

    f := func() {
        fmt.Println(a)

        a := 30
        fmt.Println(a)
    }

    f()
    fmt.Println(a)
}
```

الـ Output:

```
20
30
20
```

الـ `a := 30` أنشأت متغيرًا محليًا جديدًا داخل الـ Closure، ومأثرتش على `a` الموجودة في `main`.

الفرق هنا مهم:

- `a = 30`: تعديل المتغير الموجود بالفعل.

- `a := 30`: تعريف متغير جديد لو الاسم مش معرّف في نفس الـ Scope.

## فايدة الـ Closures

- إخفاء Functions اللي مش محتاجين نستدعيها من خارج Function معينة.

- تقليل تكرار الكود داخل نفس الـ Function.

- الاحتفاظ بمتغيرات من الـ Scope الخارجية واستخدامها بعد كده.

- تمرير سلوك مختلف للـ Functions التانية باستخدام Function Parameters.

# 14. Passing Functions as Parameters

بما إن الـ Functions Values، تقدر تمرر Function كـ Parameter إلى Function تانية.

مثال الكتاب هو `sort.Slice`، اللي بتستقبل Slice وFunction بتحدد ترتيب العناصر.

```go
type Person struct {
    FirstName string
    LastName  string
    Age       int
}

people := []Person{
    {"Pat", "Patterson", 37},
    {"Tracy", "Bobdaughter", 23},
    {"Fred", "Fredson", 18},
}
```

## Sorting by Last Name

```go
sort.Slice(people, func(i, j int) bool {
    return people[i].LastName < people[j].LastName
})
```

الـ Function اللي اتبعتت هنا بتقارن عنصرين، وبتحدد هل العنصر عند `i` المفروض ييجي قبل العنصر عند `j`.

الـ Closure بتستخدم `people` مباشرة رغم إن المتغير ده مش Parameter فيها؛ لأنها بتقدر توصل للمتغيرات الموجودة في الـ Scope الخارجية.

## Sorting by Age


```go
sort.Slice(people, func(i, j int) bool {
    return people[i].Age < people[j].Age
})
```

نفس الـ Slice، لكن المرة دي الترتيب حسب العمر بدل اسم العائلة.

الـ `sort.Slice` بتعدّل ترتيب العناصر في الـ Slice الأصلية.

**الفكرة:** تمرير Function كـ Parameter بيسمح لك باستخدام نفس العملية العامة مع تغيير السلوك حسب الـ Function اللي بتمررها.

# 15. Returning Functions from Functions

تقدر كمان ترجع Function من Function تانية. وده بيكون مفيد لما تحتاج تنشئ Functions تحتفظ بقيم معينة من وقت إنشائها.

مثال `makeMult`:

```go
func makeMult(base int) func(int) int {
    return func(factor int) int {
        return base * factor
    }
}
```

الـ `makeMult` بتاخد `base` وبترجع Function تانية بتاخد `factor` وترجع حاصل ضربهم.

الاستخدام:

```go
func main() {
    twoBase := makeMult(2)
    threeBase := makeMult(3)

    for i := 0; i < 3; i++ {
        fmt.Println(twoBase(i), threeBase(i))
    }
}
```

الـ Output:

```
0 0
2 3
4 6
```

كل Function رجعت من `makeMult` بتحتفظ بقيمة `base` الخاصة بالاستدعاء اللي أنشأها.

- `twoBase` بتستخدم `base = 2`.

- `threeBase` بتستخدم `base = 3`.

وبالتالي تقدر تستخدم كل واحدة بعد انتهاء استدعاء `makeMult` الأصلي.

## Higher-Order Functions

الـ Higher-Order Function هي Function بتستقبل Function كـ Parameter أو بترجع Function كـ Return Value.

وده مفهوم مهم في البرمجة الوظيفية، وGo بتدعمه لأن الـ Functions فيها Values.

# 16. defer

الـ `defer` بتأجل تنفيذ Function أو Method Call لحد ما الـ Function الحالية تخرج.

أهم استخدام ليها هو تنظيف الموارد، زي إغلاق الملفات أو تحرير موارد بعد الانتهاء منها.

مثال:

```go
func main() {
    f, err := os.Open("example.txt")
    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    // use the file
}
```

بعد ما الملف يفتح بنجاح، بنكتب `defer f.Close()` علشان نضمن استدعاء `Close` عند خروج `main` من مسار التنفيذ العادي.

لو فيه خطأ في فتح الملف، بنخرج قبل تسجيل الـ `defer`، لأن مفيش File Handle صالح نغلقه.

## ترتيب تنفيذ defer

لو كتبت أكتر من `defer`، هيتنفذوا بترتيب **LIFO (Last In, First Out)**، يعني آخر `defer` اتسجل هو أول واحد يتنفذ.

```go
func deferExample() int {
    a := 10

    defer func(val int) {
        fmt.Println("first:", val)
    }(a)

    a = 20

    defer func(val int) {
        fmt.Println("second:", val)
    }(a)

    a = 30
    fmt.Println("exiting:", a)

    return a
}
```

الـ Output:

```
exiting: 30
second: 20
first: 10
```

السبب:

1. أول `defer` اتسجل ومعاه قيمة `a` وقتها، وهي `10`.
2. تاني `defer` اتسجل ومعاه قيمة `a` وقتها، وهي `20`.
3. قبل الخروج، اتطبعت `30`.
4. عند الخروج، آخر `defer` اتنفذ الأول، وطبع `20`.
5. بعده الأول، وطبع `10`.

**نقطة مهمة:** الـ Arguments الخاصة بالـ Deferred Call بتتقيّم وقت تسجيل الـ `defer`، مش وقت تنفيذه.

## defer والـ Return Value

الـ `defer` بتتنفذ بعد تنفيذ الـ `return` statement وقبل اكتمال خروج الـ Function.

لو استخدمت Named Return Values، فالـ Deferred Function ممكن تقرأها وتعدّلها.

مثال مبسط:

```go
func example() (result int) {
    defer func() {
        result++
    }()

    return 5
}
```

القيمة اللي هترجع من `example` هي `6`؛ لأن `result` متغير مسمى، والـ Deferred Function عدّلت قيمته قبل ما الـ Function تخرج.

أما لو استخدمت Return Value غير مسماة، زي `func example() int`، فالـ Deferred Function مش هتقدر تعدّل القيمة المرجعة بنفس الطريقة عن طريق متغير Return Value مسمى.

وده من أهم الاستخدامات اللي الكتاب بيذكرها للـ Named Return Values.

## defer مع Database Transactions

الكتاب بيعرض Pattern لاستخدام `defer` مع Database Transaction:

- لو العمليات نجحت، يتم تنفيذ `Commit`.

- لو حصل خطأ، يتم تنفيذ `Rollback`.

الفكرة إنك تسجل منطق التنظيف مرة واحدة، بدل تكراره عند كل نقطة خروج من الـ Function.

## Function بترجع Cleanup Function

ممكن Function تفتح ملف وترجع معاه Function مسؤولة عن إغلاقه:

```go
func getFile(name string) (*os.File, func(), error) {
    file, err := os.Open(name)
    if err != nil {
        return nil, nil, err
    }

    return file, func() {
        file.Close()
    }, nil
}
```

الاستخدام:

```go
f, closer, err := getFile("example.txt")
if err != nil {
    log.Fatal(err)
}

defer closer()
```

الـ `getFile` بترجع 3 قيم: الملف، وFunction للتنظيف، وError.

الـ Pattern ده بيساعد على توضيح إن المورد اللي تم إنشاؤه محتاج Cleanup.

# 17. Go Is Call by Value

لما تبعت متغير كـ Parameter إلى Function في Go، بيتم نسخ قيمة المتغير. وده اسمه **Call by Value**.

مثال:

```go
type person struct {
    age  int
    name string
}

func modifyFails(i int, s string, p person) {
    i = i * 2
    s = "Goodbye"
    p.name = "Bob"
}

func main() {
    p := person{}
    i := 2
    s := "Hello"

    modifyFails(i, s, p)

    fmt.Println(i, s, p)
}
```

الـ Output:

```go
2 Hello {0 }
```

التعديلات اللي حصلت على `i` و`s` ونسخة الـ `person` جوه الـ Function مش بتغيّر المتغيرات الأصلية.

السبب إن الـ Function استقبلت نسخًا من القيم، مش المتغيرات الأصلية نفسها.

## طيب ليه Maps و Slices مختلفين؟

الـ Maps والـ Slices برضه بيتبعتوا بـ Call by Value، لكن القيمة اللي بتتنسخ بتحتوي على معلومات بتشير إلى البيانات الأساسية.

عشان كده، ممكن التغييرات على عناصرها تظهر خارج الـ Function.

مثال الـ Map:

```go
func modMap(m map[int]string) {
    m[2] = "hello"
    m[3] = "goodbye"
    delete(m, 1)
}
```

لو استدعيت `modMap(m)`، التعديلات على عناصر الـ Map هتظهر في الـ Map الأصلية.

أما الـ Slice:

```go
func modSlice(s []int) {
    for k, v := range s {
        s[k] = v * 2
    }

    s = append(s, 10)
}
```

لو الـ Slice الأصلية هي:

```go
s := []int{1, 2, 3}
```

بعد استدعاء `modSlice(s)`، عناصر الـ Slice الأصلية هتبقى:

```
[2 4 6]
```

لكن الـ `append` اللي حصلت على النسخة المحلية من الـ Slice مش معناها إن طول الـ Slice الأصلية هيزيد تلقائيًا؛ لأن متغير الـ Slice نفسه اتبعتت قيمته بالنسخ.

الـ Slice بتحتوي على معلومات زي Pointer للبيانات، والـ Length، والـ Capacity. تعديل العناصر ممكن يبان في الـ Slice الأصلية، لكن تغيير الـ Slice Header محليًا مش بيغيّر Header المتغير الأصلي.

**الخلاصة:** Go دائمًا Call by Value، لكن تأثير التعديل بيعتمد على نوع القيمة اللي اتبعتت.

## ليه Call by Value مفيد؟

بيخلّي تتبع البيانات أسهل؛ لأن تعديل Parameter عادي جوه Function مش بيغيّر المتغير الأصلي.

لو محتاج Function تعدّل متغيرًا أصليًا من نوع زي `int` أو Struct، هتحتاج تستخدم Pointer، وده موضوع الشابتر اللي بعده.
