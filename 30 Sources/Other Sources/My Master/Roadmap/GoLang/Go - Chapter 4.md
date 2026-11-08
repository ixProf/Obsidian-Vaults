---
title: "Go - Chapter 4"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages, masters]
created: 2026-10-15
updated: 2026-10-22
source:
related: []
---

# Blocks

الـ Block هو نطاق في الكود بنقدر نعرّف جواه Variables و Constants و Types و Functions، وبيحدد الأماكن اللي نقدر نستخدم فيها الأسماء دي.

في Go عندنا أكتر من نوع للـ Blocks:

- عندك مثلا Package Block: بيحتوي على المتغيرات والـ Constants والـ Types والـ Functions اللي متعرفة خارج أي Function.

- وكمان في File Block: أسماء الـ Packages اللي بنستوردها باستخدام import بتكون متاحة داخل الملف اللي عمل الـ Import.

- وطبعا ال Function Block: المتغيرات اللي متعرفة داخل الـ Function، بما فيها الـ Parameters، بتكون ضمن نطاق الـ Function.

- الي بيكون فيها ال Inner Blocks: أي مجموعة أقواس `{}` داخل الـ Function بتعمل Block جديد، وده بيشمل الـ Blocks الخاصة بالـ Control Structures زي if و for.

تقدر تستخدم Identifier متعرّف في Block خارجي من داخل Block داخلي، لكن لو عرّفت Identifier بنفس الاسم داخل الـ Block الداخلي، هيحصل Shadowing.

# Shadowing Variables

الـ Shadowing بيحصل لما تعرّف Variable بنفس اسم Variable موجود في Block خارجي. في الحالة دي، الـ Variable الداخلي بيخفي الخارجي طول ما أنت داخل نطاقه.

مثال:

```go
func main() {
    x := 10

    if x > 5 {
        fmt.Println(x)
        x := 5
        fmt.Println(x)
    }

    fmt.Println(x)
}
```

الـ Output:

```go
10
5
10
```

ليه ؟

- أول `fmt.Println(x)` بتستخدم المتغير الخارجي اللي قيمته 10.
- السطر `x := 5` بيعرّف Variable جديد داخل الـ if، وبيخفي المتغير الخارجي.
- تاني `fmt.Println(x)` بتطبع قيمة المتغير الداخلي، وهي 5.
- بعد انتهاء الـ if، المتغير الداخلي بيخرج من نطاقه، ونقدر نستخدم المتغير الخارجي تاني، وقيمته لسه 10.

خلي بالك إن المتغير الخارجي مبيختفيش ومش بتتغير قيمته. هو بس بيكون غير قابل للوصول بالاسم نفسه أثناء وجود الـ Variable الداخلي.

## Shadowing with Multiple Assignment

في Go، تقدر تستخدم := لتعريف وإسناد قيم لأكتر من Variable في نفس الوقت.

```go
func main() {
    x := 10

    if x > 5 {
        x, y := 5, 20
        fmt.Println(x, y)
    }

    fmt.Println(x)
}
```

الـ Output:

```go
5 20
10
```

رغم إن `x` متعرفة بالفعل في الـ Block الخارجي، فإن `x, y := 5, 20` بتعمل Shadowing للمتغير `x`، وبتعرّف `y` جديدة داخل الـ if.

السبب إن `:=` بتعيد استخدام المتغيرات الموجودة في <mark style="background:#B42318">نفس الـ Block فقط،</mark> مش المتغيرات المتعرفة في Blocks خارجية.

كمان `:=` بتكون قانونية لو فيه على الأقل Variable جديد واحد في الطرف الشمال.

علشان كده لازم تاخد بالك من استخدام `:=`، <span style="color:#1E8553">لأنها ممكن تعمل Shadowing بالخطأ بدل ما تغيّر قيمة Variable موجودة.</span>

لو هدفك تغيير قيمة Variable موجودة في نفس النطاق، استخدم = بدل `:=`.

## Shadowing Package Names

الـ Shadowing مش بيقتصر على المتغيرات، لكنه ممكن يحصل مع أسماء الـ Packages المستوردة كمان.
مثال:

```go
func main() {
    x := 10
    fmt.Println(x)

    fmt := "oops"
    fmt.Println(fmt)
}
```

الكود ده بيطلع Compilation Error:

```powershell
fmt.Println undefined (type string has no field or method Println)
```

السبب إنك عرّفت Variable اسمه `fmt`، فبقى بيخفي اسم الـ Packages الي مستوردها

بعد تعريف المتغير المحلي، الاسم `fmt` بقى بيشير إلى String، مش إلى Package `fmt`، وبالتالي مش هتقدر تستخدم `fmt.Println` من خلال الاسم ده داخل النطاق المتأثر.

علشان تتجنب المشكلة دي، تجنب استخدام أسماء الـ Packages المعروفة كأسماء للمتغيرات المحلية.

# The Universe Block

الـ Universe Block هو النطاق اللي بيحتوي على كل الـ Blocks التانية، وبيتم تعريف مجموعة من الأسماء الأساسية في Go داخله.

الأسماء دي اسمها Predeclared Identifiers، ومنها:

- Built-in Types زي `int` و `string`.
- Constants زي `true` و `false`.
- Built-in Functions زي `make` و `close`.

- القيمة `nil`.

الأسماء دي مش Keywords في اللغة، لكنها أسماء معرفة مسبقًا في الـ Universe Block.
وبما إنها موجودة في نطاق خارجي جدًا، ==فمن الممكن تعملها Shadowing داخل نطاقات أخرى.==

مثال:

```go
fmt.Println(true)

true := 10

fmt.Println(true)
```

الـ Output:

```
true
10
```

في البداية، `true` بتشير للقيمة المنطقية المعروفة في Go. بعد تعريف Variable اسمه `true`، الاسم بقى بيشير إلى المتغير المحلي اللي قيمته 10.

لكن الأفضل تتجنب إعادة تعريف أي اسم موجود في الـ Universe Block، لأن ده ممكن يسبب سلوك غير متوقع أو Compilation Errors، وممكن يصعّب اكتشاف الأخطاء.

الـ Shadowing ممكن يكون مفيد في بعض الحالات، لذلك `go vet` مش بيعتبر كل حالات الـ Shadowing أخطاء محتملة بشكل تلقائي.

# if Statement

الـ `if` بتستخدم لتنفيذ كود بناءً على شرط معين.

مثال:

```go
n := rand.Intn(10)

if n == 0 {
    fmt.Println("That's too low")
} else if n > 5 {
    fmt.Println("That's too big:", n)
} else {
    fmt.Println("That's a good number:", n)
}
```

الدالة `rand.Intn(10)` بترجع رقمًا صحيحًا عشوائيًا من 0 إلى 9.

بعد كده:

- لو `n == 0`، هيتم طباعة `That's too low`.
- لو الشرط الأول مش متحقق و `n > 5`، هيتم طباعة `That's too big` مع قيمة `n`.
- في غير كده، هيتم طباعة `That's a good number`
أهم اختلاف شكلي بين `if` في Go ولغات تانية إنك مش بتحط الشرط بين Parentheses.

يعني بتكتب:

```go
if n > 5 {
    fmt.Println(n)
}
```

مش:

```go
if (n > 5) {
    fmt.Println(n)
}
```

## Scope داخل if و else

أي Variable بتعرّفه داخل Block خاص بالـ `if` أو `else` بيكون متاح داخل النطاق ده فقط.

هنا Go كمان بتسمح لك تعرّف Variable قبل شرط الـ `if` مباشرة، بحيث يكون متاحًا في الشرط وفي فروع `if` و `else` المرتبطة به.

مثال:

```go
if n := rand.Intn(10); n == 0 {
    fmt.Println("That's too low")
} else if n > 5 {
    fmt.Println("That's too big:", n)
} else {
    fmt.Println("That's a good number:", n)
}
```

الـ `if` هنا فيها جزئين قبل بداية الـ Block:

- Initialization: `n := rand.Intn(10)`
- Condition: `n == 0`

الجزء الأول بيعرّف `n`، والجزء الثاني بيختبر قيمتها.

المتغير `n` متاح داخل الشرط وداخل فروع `if` و `else` المرتبطة بنفس السلسلة، لكنه بيخرج من نطاقه بعد انتهاء السلسلة بالكامل.

مثال على الخطأ:

```go
if n := rand.Intn(10); n == 0 {
    fmt.Println("That's too low")
} else if n > 5 {
    fmt.Println("That's too big:", n)
} else {
    fmt.Println("That's a good number:", n)
}

fmt.Println(n)
```

الكود ده مش هيعمل Compile، وهيظهر خطأ:

```
undefined: n
```

لأن `n` متعرفة داخل نطاق الـ `if` فقط، ومش متاحة بعد انتهائه.

من الناحية التقنية، تقدر تحط Simple Statement قبل شرط الـ `if`، زي استدعاء Function أو إسناد قيمة لمتغير موجود. لكن الأفضل تستخدم الجزء ده لتعريف Variables جديدة محتاجها داخل الـ `if` و `else`، علشان الكود يفضل واضح.

وخلي بالك إن تعريف Variable داخل `if` بنفس اسم Variable خارجي ممكن يعمل Shadowing،

# for Statement

في Go، الـ `for` هي الكلمة الوحيدة المستخدمة لعمل Loops.

وليها 4 صور مختلفة:

- Complete for
- Condition-only for
- Infinite for
- for-range

## The Complete for Statement

دي الصورة الكاملة للـ `for`، وهي شبيهة بالـ Loops الموجودة في C و Java و JavaScript.

مثال:

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

الـ Output بيكون الأرقام من 0 إلى 9.

الـ `for` الكاملة بتتكون من ثلاثة أجزاء، بينهم Semicolons.

### Initialization

```
i := 0
```

ده الجزء اللي بيجهز المتغيرات قبل بداية الـ Loop.

في الجزء ده لازم تستخدم `:=` لتعريف المتغيرات، ومينفعش تستخدم `var` بالشكل المعتاد داخل Initialization.

كمان ممكن يحصل Shadowing لمتغير خارجي لو استخدمت نفس اسمه.

### Condition

```
i < 10
```

ده الشرط اللي بيتفحص قبل كل Iteration.

لازم الشرط يكون Expression نتيجته Boolean.

لو الشرط `true`، جسم الـ Loop بيتنفذ. لو `false`، الـ Loop بتنتهي.

### Increment

```
i++
```

ده الجزء اللي بيتنفذ بعد كل Iteration، وقبل ما الشرط يتفحص مرة تانية.

غالبًا بتستخدم `i++` لزيادة قيمة العداد، لكن ممكن تستخدم أي Assignment مناسب حسب منطق البرنامج.

### حذف أجزاء من for

Go بتسمح لك تحذف جزء أو أكثر من الأجزاء الثلاثة حسب احتياجك.

مثال على حذف Initialization:

```go
i := 0

for ; i < 10; i++ {
    fmt.Println(i)
}
```

هنا المتغير `i` متعرّف قبل بداية الـ Loop، لذلك مش محتاجين نعرّفه داخلها.

مثال على حذف Increment:

```go
for i := 0; i < 10; {
    fmt.Println(i)

    if i%2 == 0 {
        i++
    } else {
        i += 2
    }
}
```

هنا الزيادة بتختلف حسب قيمة `i`، لذلك بننفذها داخل جسم الـ Loop بدل ما نحطها في الجزء الثالث.

لو `i` زوجي، بتزيد 1. ولو فردي، بتزيد 2.

المهم إنك تتأكد إن فيه طريقة لتغيير قيمة العداد أو الشرط، وإلا ممكن تدخل في Infinite Loop من غير قصد.

## The Condition-only for Statement

النوع ده بيستخدم لما تكون محتاج Condition فقط، من غير Initialization أو Increment داخل تعريف الـ Loop.

مثال:

```go
i := 1

for i < 100 {
    fmt.Println(i)
    i = i * 2
}
```

الـ Output:

```
1
2
4
8
16
32
64
```

في كل Iteration، البرنامج بيطبع قيمة `i` وبعدها بيضربها في 2.

لما توصل القيمة إلى 128، الشرط `i < 100` بيكون غير متحقق، فتنتهي الـ Loop.

النوع ده شبيه بالـ `while` الموجودة في لغات زي C و Java و JavaScript و Python، لكن في Go بنستخدم `for` بدل `while`.

لاحظ إننا مش بنحط Semicolons في النوع ده، لأننا حذفنا الـ Initialization والـ Increment معًا.

## The Infinite for Statement

النوع ده بيستخدم لعمل Loop مستمرة من غير Condition توقفها.

مثال:

```go
package main

import "fmt"

func main() {
    for {
        fmt.Println("Hello")
    }
}
```

الـ Output هيستمر بالشكل ده:

```
Hello
Hello
Hello
Hello
...
```

السبب إن `for` هنا مفيهاش Condition، وبالتالي مفيش شرط بيخليها تنتهي بشكل طبيعي.

النوع ده ممكن يكون مفيد في البرامج اللي محتاجة تفضل شغالة باستمرار، لكن لازم يكون عندك طريقة مناسبة للتحكم في استمرار التنفيذ لو البرنامج محتاج يتوقف.

# break Statement

الـ `break` بتستخدم علشان توقف تنفيذ الـ Loop الحالية وتخرج منها فورًا، حتى لو الشرط بتاع الـ Loop لسه متحقق.

مثال:

```go
for i := 0; i < 10; i++ {
    if i == 5 {
        break
    }

    fmt.Println(i)
}
```

الـ Output:

```
0
1
2
3
4
```

لما `i` توصل إلى 5، شرط الـ `if` بيتحقق، فيتم تنفيذ `break` والخروج من الـ Loop، وبالتالي مش هتتنفذ أي Iterations بعد كده.

تقدر تستخدم `break` داخل `for` أو `switch`، لكن خلي بالك إن `break` بتخرج من أقرب Loop أو `switch` موجودة جواها، مش بالضرورة من الـ Loop الخارجية.

## Labeled break

لو عندك Loops متداخلة، وتريد الخروج من Loop خارجية بدل الداخلية، تقدر تستخدم Label.

```go
func main() {
    for i := 0; i < 5; i++ {
        for j := 0; j < 5; j++ {
            if j == 2 {
                break
            }

            fmt.Println(i, j)
        }
    }
}
```

في المثال ده، `break` بتخرج من الـ Loop الداخلية فقط، والـ Loop الخارجية بتكمل عادي.

لكن لو كتبت:

```go
outer:
for i := 0; i < 5; i++ {
    for j := 0; j < 5; j++ {
        if j == 2 {
            break outer
        }

        fmt.Println(i, j)
    }
}
```

هنا `break outer` بتخرج من الـ Loop الخارجية المحددة بالـ Label `outer`، وبالتالي بتنتهي الـ Loops الاتنين.

# continue Statement

الـ `continue` بتستخدم لتخطي بقية الكود في الـ Iteration الحالية والانتقال إلى الـ Iteration التالية، من غير ما توقف الـ Loop بالكامل.

مثال:

```go
for i := 0; i < 10; i++ {
    if i%2 == 0 {
        continue
    }

    fmt.Println(i)
}
```

الـ Output:

```
1
3
5
7
9
```

السبب إن الأرقام الزوجية بتخلي الشرط `i%2 == 0` صحيح، وبالتالي `continue` بتتخطى `fmt.Println(i)` في الـ Iteration دي.

أما الأرقام الفردية، فالشرط مش بيتحقق، وبالتالي بتتم طباعتها.

في الـ Complete `for`، بعد تنفيذ `continue`، البرنامج بينتقل إلى جزء الـ Increment، وبعدها بيفحص الـ Condition من جديد.

## Labeled continue

لو عندك Loops متداخلة، تقدر تستخدم Label علشان تخلي `continue` تنتقل إلى الـ Iteration التالية في Loop خارجية محددة، بدل ما تكمّل الـ Loop الداخلية فقط.

```go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if j == 1 {
            continue outer
        }

        fmt.Println(i, j)
    }
}
```

الـ Output:

```
0 0
1 0
2 0
```

لما `j` توصل إلى 1، بيتم تنفيذ `continue outer`، وبالتالي البرنامج بيتخطى بقية الـ Iteration الحالية في الـ Loop الخارجية، وينتقل إلى القيمة التالية من `i`.

علشان كده مش بيطبع القيم اللي فيها `j == 1`، ومش بيكمل بقية الـ Iterations الخاصة بالـ Loop الداخلية لنفس قيمة `i`.

## الفرق بين break و continue

`break` بتوقف الـ Loop وتخرج منها بالكامل.

`continue` بتتخطى الـ Iteration الحالية فقط، والـ Loop بتكمل بعدها بشكل طبيعي.

مثال سريع:

```go
for i := 0; i < 5; i++ {
    if i == 2 {
        continue
    }
    fmt.Println(i)
}
```

الناتج هيكون 0 و1 و3 و4، لأننا تخطينا الرقم 2 فقط.

أما لو استخدمنا `break` بدل `continue`، فالـ Output هيكون 0 و1 فقط، لأن الـ Loop هتنتهي بمجرد وصول `i` إلى 2.

---

# switch Statement

الـ `switch` بتستخدم لما يكون عندك قيمة أو مجموعة شروط، وعايز تنفذ كود مختلف حسب الحالة.

مثال:

```go
for _, word := range words {
    switch size := len(word); size {
    case 1, 2, 3, 4:
        fmt.Println(word, "is a short word!")
    case 5:
        wordLen := len(word)
        fmt.Println(word, "is exactly the right length:", wordLen)
    case 6, 7, 8, 9:
    default:
        fmt.Println(word, "is a long word!")
    }
}
```

في المثال ده، بنحسب طول كل كلمة باستخدام `len(word)`، وبعدها بنحدد هننفذ أنهي `case` حسب طول الكلمة.

- لو الطول من 1 إلى 4، الكلمة قصيرة.

- لو الطول 5، بنطبع إن طولها مناسب تمامًا.

- لو الطول من 6 إلى 9، مش بيحصل أي تنفيذ لأن الـ `case` فاضية.

- لو مفيش أي حالة مطابقة، بيتنفذ `default`.

لو كانت الكلمات هي `a` و `cow` و `smile` و `anthropologist`، فالـ Output هيكون:

```
a is a short word!
cow is a short word!
smile is exactly the right length: 5
anthropologist is a long word!
```

## أهم خصائص switch

أولًا، مش بنحط Parentheses حوالين القيمة اللي بنعمل عليها المقارنة.

ثانيًا، تقدر تعرّف Variable داخل الـ `switch` نفسها، وتستخدمها في كل الـ `case`، زي `size` في المثال السابق.

ثالثًا، كل `case` بتعتبر Block مستقل، وتقدر تعرّف جواها Variables خاصة بيها. مثلًا، `wordLen` متاحة داخل `case 5` فقط.

رابعًا، في Go مش محتاج تكتب `break` في نهاية كل `case`، لأن التنفيذ مش بينتقل تلقائيًا للـ `case` اللي بعدها. ده اسمه Fallthrough، وهو مش السلوك الافتراضي في Go.

لو أكتر من قيمة محتاجة تنفذ نفس الكود، افصل القيم بفواصل داخل نفس الـ `case`:

```go
switch n {
case 1, 2, 3:
    fmt.Println("Small number")
case 4, 5:
    fmt.Println("Medium number")
default:
    fmt.Println("Other number")
}
```

لو مفيش كود داخل `case`، مش بيحصل أي شيء عند مطابقتها، ومش بينتقل التنفيذ تلقائيًا للحالة التالية.

Go بتوفر الكلمة `fallthrough` لو عايز تنقل التنفيذ للحالة التالية بشكل صريح، لكن الأفضل تتجنبها قدر الإمكان، وتحاول تنظيم الشروط من غير اعتماد الحالات على بعضها.

تقدر تستخدم `switch` مع أي نوع بيانات يمكن مقارنته باستخدام == ، باستثناء الأنواع والحالات غير القابلة للمقارنة، زي الـ Slices والـ Maps والـ Functions، والـ Structs اللي تحتوي على حقول غير قابلة للمقارنة.

## استخدام break داخل switch

رغم إن `break` مش مطلوبة في نهاية كل `case`، تقدر تستخدمها للخروج مبكرًا من الـ `switch`.

لكن لو عندك `switch` داخل `for`، وعايز تخرج من الـ `for` نفسها، لازم تفرق بين الخروج من الـ `switch` والخروج من الـ Loop.

مثال:

```go
for i := 0; i < 10; i++ {
    switch i {
    case 0, 2, 4, 6:
        fmt.Println(i, "is even")
    case 3:
        fmt.Println(i, "is divisible by 3 but not 2")
    case 7:
        fmt.Println("exit the loop!")
        break
    default:
        fmt.Println(i, "is boring")
    }
}
```

هنا الـ `break` بتخرج من الـ `switch` فقط، مش من الـ `for`. علشان كده الـ Loop بتكمل بعد الوصول إلى 7.

لو عايز تخرج من الـ Loop نفسها، استخدم Label:

```go
loop:
for i := 0; i < 10; i++ {
    switch i {
    case 7:
        fmt.Println("exit the loop!")
        break loop
    default:
        fmt.Println(i)
    }
}
```

الـ `loop:` اسم بنربطه بالـ `for`، وبعدها `break loop` بتخرج من الـ Loop المحددة بالاسم ده.

## Blank Switch

الـ Blank Switch هي `switch` من غير قيمة أساسية بنقارن بيها.

الفرق إن الـ `switch` العادية بتقارن قيمة بحالات محددة، بينما الـ Blank Switch بتسمح لك تكتب شروط Boolean مختلفة داخل كل `case`.

مثال:

```go
words := []string{"hi", "salutations", "hello"}

for _, word := range words {
    switch wordLen := len(word); {
    case wordLen < 5:
        fmt.Println(word, "is a short word!")
    case wordLen > 10:
        fmt.Println(word, "is a long word!")
    default:
        fmt.Println(word, "is exactly the right length.")
    }
}
```

الـ Output:

```
hi is a short word!
salutations is a long word!
hello is exactly the right length.
```

هنا الـ `switch` مش بتقارن `wordLen` بقيمة معينة، لكنها بتختبر شروط زي `wordLen < 5` و `wordLen > 10`.

تقدر كمان تعرّف Variable داخل الـ Blank Switch، زي `wordLen`، وتستخدمها في كل الحالات.

لكن لو كل الـ `case` بتقارن نفس المتغير بقيم ثابتة، الأفضل تستخدم `switch` عادية.

بدل:

```go
switch {
case a == 2:
    fmt.Println("a is 2")
case a == 3:
    fmt.Println("a is 3")
case a == 4:
    fmt.Println("a is 4")
default:
    fmt.Println("a is", a)
}
```

اكتب:

```go
switch a {
case 2:
    fmt.Println("a is 2")
case 3:
    fmt.Println("a is 3")
case 4:
    fmt.Println("a is 4")
default:
    fmt.Println("a is", a)
}
```

الشكل الثاني أوضح لأنه بيبين إن كل الحالات بتختبر نفس المتغير.

# Choosing Between if and switch

من ناحية الوظيفة، تقدر تستخدم سلسلة من `if` و `else if`، أو تستخدم Blank Switch لتنفيذ مجموعة من المقارنات.

الاختيار بيعتمد على وضوح الكود وطبيعة الشروط.

استخدم `if` و `else if` لما تكون الشروط مستقلة أو مختلفة عن بعضها.

استخدم `switch` لما تكون الحالات مرتبطة ببعض، وعايز توضح إنك بتتعامل مع مجموعة واحدة من الاحتمالات.

مثال على استخدام Blank Switch مع FizzBuzz:

```go
for i := 1; i <= 100; i++ {
    switch {
    case i%3 == 0 && i%5 == 0:
        fmt.Println("FizzBuzz")
    case i%3 == 0:
        fmt.Println("Fizz")
    case i%5 == 0:
        fmt.Println("Buzz")
    default:
        fmt.Println(i)
    }
}
```

الفكرة:

- لو الرقم يقبل القسمة على 3 و5، نطبع `FizzBuzz`.

- لو يقبل القسمة على 3 فقط، نطبع `Fizz`.

- لو يقبل القسمة على 5 فقط، نطبع `Buzz`.

- في غير كده، نطبع الرقم نفسه.

لاحظ إننا اختبرنا شرط القسمة على 3 و5 أولًا، لأنه الحالة الأكثر تحديدًا. لو بدأنا بشرط القسمة على 3 فقط، الأرقام اللي تقبل القسمة على 3 و5 هتدخل الحالة دي قبل ما نوصل لشرط `FizzBuzz`.

الـ Blank Switch هنا أوضح من سلسلة طويلة من `if` و `else if`، لأن كل الحالات مرتبطة بمهمة واحدة.

# goto Statement

الـ `goto` هي Control Statement بتسمح لك تنقل تنفيذ البرنامج إلى سطر محدد باستخدام Label.

رغم إنها موجودة في Go، الأفضل تتجنب استخدامها في معظم الحالات، لأنها ممكن تخلي مسار تنفيذ البرنامج أصعب في الفهم والمتابعة.

مثال على Label:

```go
func main() {
    a := 10

    goto skip

    b := 20

skip:
    c := 30
    fmt.Println(a, b, c)
}
```

المثال ده غير صحيح، لأن `goto skip` بتتخطى تعريف المتغير `b`.

Go بتمنع استخدام `goto` بطريقة تتخطى تعريف Variable، أو تنقل التنفيذ إلى داخل Block داخلي أو Block موازي.

مثلًا، مينفعش تستخدم `goto` علشان تدخل إلى داخل `if` من خارجها، لأن ده بيخالف قواعد الـ Scope وبنية البرنامج.

## إمتى ممكن نستخدم goto؟

في حالات نادرة، ممكن تساعدك `goto` في الوصول إلى جزء مشترك من الكود من أكتر من مكان، بدل تكرار نفس الكود أو استخدام Variables إضافية للتحكم في التنفيذ.

مثال:

```go
func main() {
    a := rand.Intn(10)

    for a < 100 {
        if a%5 == 0 {
            goto done
        }

        a = a*2 + 1
    }

    fmt.Println("do something when the loop completes normally")

done:
    fmt.Println("do complicated stuff no matter why we left the loop")
    fmt.Println(a)
}
```

في المثال ده، لو `a` وصلت لقيمة تقبل القسمة على 5، التنفيذ بينتقل مباشرة إلى `done`.

لو الـ Loop انتهت بشكل طبيعي، البرنامج بينفذ السطر الموجود قبل الـ Label، وبعدها بيكمل عند `done`.

المثال هدفه توضيح إن `goto` ممكن تكون مفيدة في حالات محدودة، لكن لازم تتجنبها لو فيه طريقة أوضح لتنظيم الكود.

في أغلب الحالات، استخدم `break` و `continue` مع Labels عند الحاجة للتحكم في الـ Loops المتداخلة، بدل ما تستخدم `goto`.
