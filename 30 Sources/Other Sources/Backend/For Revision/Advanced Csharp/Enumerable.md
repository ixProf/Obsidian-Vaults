---
title: "Enumerable"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


# Enumerable Class

## أولًا: يعني إيه Enumerable أصلًا؟

`Enumerable` هو **كلاس static** موجود في `System.Linq`

```cs
using System.Linq;
```

وده الكلاس اللي جواه أغلب دوال LINQ اللي بتستخدمها كل يوم، زي:

```cs
Where()
Select()
Count()
First()
OrderBy()
Sum()
Any()
All()
```

يعني لما تكتب:

```cs
var result = nums.Where(x => x > 5);
```

فأنت شكلك كأنك بتنادي method من `nums` نفسها  
لكن في الحقيقة `Where` مش جوه الـ array أصلًا  
هي method موجودة جوه الكلاس `Enumerable`

---

# الفكرة الأساسية

## Enumerable عبارة عن إيه؟

هو كلاس مجمعلك مجموعة ==methods جاهزة للتعامل مع أي data sequence==  
طالما الـ sequence دي بتطبق `IEnumerable`

يعني أي collection تقدر تمشي عليها عنصر عنصر، غالبًا هتقدر تستخدم معها `Enumerable`

أمثلة:

- Array
- List
- Dictionary
- Queue
- Stack
- HashSet

كل دول غالبًا يقدروا يشتغلوا مع `Enumerable`

---

# طب ليه اسمه Enumerable؟

الاسم جاي من كلمة **enumerate**  
يعني "يمر على العناصر واحد واحد"

وده لأن الكلاس ده أساس شغله إنه يتعامل مع collections على إنها sequence من العناصر

يعني بدل ما أنت تقعد تعمل `for` أو `foreach` كل مرة  
هو بيديك methods جاهزة تمشي على العناصر وتعمل المطلوب

---

# أهم نقطة: Enumerable نفسه مش هو البيانات

ناس كتير بتتلخبط هنا

`Enumerable` **مش collection**  
و**مش interface**  
و**مش object بيمثل البيانات**

هو فقط:

- static class
- جواه static extension methods
- methods دي بتشتغل على collections

يعني:

```cs
int[] nums = { 1, 2, 3, 4, 5 };
```

البيانات هنا هي `nums`

لكن `Enumerable` هو اللي بيوفر methods زي:

```cs
nums.Where(x => x > 2)
nums.Count()
nums.Select(x => x * 10)
```

---

# العلاقة بين Enumerable و Extension Methods

دي أهم نقطة في الموضوع كله

## methods بتاعة Enumerable معمولة كـ Extension Methods

يعني مثلًا `Where` متعرفة تقريبًا بالشكل ده:

```cs
public static IEnumerable<TSource> Where<TSource>(
    this IEnumerable<TSource> source,
    Func<TSource, bool> predicate)
```

خلينا نفكها:

### `public static`

يعني method static

### `IEnumerable<TSource>`

يعني بترجع sequence من نفس النوع

### `this IEnumerable<TSource> source`

دي أهم حتة  
معناها إن دي **Extension Method**

يعني أي object نوعه `IEnumerable<TSource>` يقدر ينادي `Where()` كأنها method بتاعته

### `Func<TSource, bool> predicate`

ده الشرط اللي هيتطبق على كل عنصر

---

# يعني إيه ده عمليًا؟

لما تكتب:

```cs
int[] nums = { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2);
```

أنت شايفها كده:

```cs
nums.Where(...)
```

لكن المترجم بيفهمها كده:

```cs
Enumerable.Where(nums, x => x > 2);
```

يعني `Where` في الحقيقة method static جوه `Enumerable`  
لكن بسبب الـ extension method قدرت تناديها كأنها method من `nums`

وده نفس الفرق اللي كنا بنتكلم فيه بين static method و extension method

---

# طب إيه هو IEnumerable؟

علشان تفهم Enumerable صح، لازم تفهم `IEnumerable`

## `IEnumerable` هو Interface

ده interface بيمثل إن object معين ينفع نمشي على عناصره واحد واحد

يعني ينفع نعمل عليه:

```cs
foreach
```

مثال:

```cs
int[] nums = { 1, 2, 3 };
foreach (var item in nums)
{
    Console.WriteLine(item);
}
```

طالما ينفع أعمل `foreach` غالبًا هو بيطبق `IEnumerable`

---

# ليه Enumerable بيشتغل على IEnumerable بالذات؟

لأن أي عملية زي:

- فلترة
    
- ترتيب
    
- اختيار أعمدة
    
- عد
    
- تجميع
    

كلها محتاجة تمر على العناصر

و`IEnumerable` هو أقل requirement يضمن إنك تقدر تمشي على العناصر دي

يعني `Enumerable` مش محتاج يعرف إذا كانت البيانات Array ولا List ولا Queue  
هو بس محتاج حاجة ينفع يتعمل عليها iteration

---

# أمثلة على أشهر methods جوه Enumerable

## 1) Where

بتفلتر العناصر على حسب شرط

```cs
int[] nums = { 1, 2, 3, 4, 5, 6 };

var evens = nums.Where(x => x % 2 == 0);
```

### المعنى

هاتلي العناصر اللي تحقق الشرط

### النتيجة

`2, 4, 6`

---

## 2) Select

بتحوّل كل عنصر لشكل تاني

```cs
int[] nums = { 1, 2, 3 };

var squares = nums.Select(x => x * x);
```

### المعنى

بدل كل عنصر بناتج معين

### النتيجة

`1, 4, 9`

---

## 3) Count

بتعد العناصر

```cs
int[] nums = { 1, 2, 3, 4 };

int count = nums.Count();
```

### النتيجة

`4`

وتقدر كمان بشرط:

```cs
int count = nums.Count(x => x > 2);
```

### النتيجة

`2`

---

## 4) OrderBy

بيرتب العناصر

```cs
int[] nums = { 5, 1, 4, 2, 3 };

var sorted = nums.OrderBy(x => x);
```

### النتيجة

`1, 2, 3, 4, 5`

---

## 5) First / FirstOrDefault

بيرجع أول عنصر

```cs
int[] nums = { 10, 20, 30 };

var first = nums.First();
```

### النتيجة

`10`

ومع شرط:

```cs
var first = nums.First(x => x > 15);
```

### النتيجة

`20`

---

## 6) Any

بيسألك: هل يوجد عنصر واحد على الأقل يحقق الشرط؟

```cs
bool exists = nums.Any(x => x > 25);
```

لو فيه عنصر يحقق الشرط → `true`

---

## 7) All

بيسألك: هل كل العناصر تحقق الشرط؟

```cs
bool allPositive = nums.All(x => x > 0);
```

---

## 8) Sum / Min / Max / Average

عمليات تجميعية

```cs
int[] nums = { 1, 2, 3, 4 };

var sum = nums.Sum();
var max = nums.Max();
var min = nums.Min();
var avg = nums.Average();
```

---

# حاجة مهمة جدًا: Deferred Execution

دي من أهم الحاجات في `Enumerable`

بعض methods زي:

- Where
    
- Select
    
- OrderBy
    

غالبًا بتشتغل بمفهوم اسمه **Deferred Execution**

يعني إيه؟

يعني العملية مش بتتنفذ فورًا وقت ما تكتب السطر  
لكن بتتأجل لحد ما تبدأ فعلًا تستخدم النتيجة

مثال:

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2);
```

هنا الفلترة لسه غالبًا متنفذتش فعليًا

لكن لما تعمل:

```cs
foreach (var item in result)
{
    Console.WriteLine(item);
}
```

هنا التنفيذ يبدأ

---

## ليه ده مهم؟

لأن ده بيخلي LINQ:

- efficient أحيانًا
    
- flexible
    
- يسمح بتركيب أكتر من operation فوق بعض
    

مثال:

```cs
var result = nums
    .Where(x => x > 2)
    .Select(x => x * 10)
    .OrderBy(x => x);
```

أنت كده بنيت pipeline  
والتنفيذ الحقيقي يحصل غالبًا وقت القراءة

---

# Chaining

من أجمل حاجات Enumerable إن methods بتاعته بتسمح بـ chaining

يعني:

```cs
var result = nums
    .Where(x => x > 2)
    .Select(x => x * 2)
    .OrderBy(x => x);
```

## ده معناه إيه؟

1. فلتر العناصر اللي أكبر من 2
    
2. اضرب كل عنصر في 2
    
3. رتب الناتج
    

وده بيدي شكل readable جدًا بدل loops كتير

---

# مثال كامل

```cs
using System;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] nums = { 5, 1, 8, 2, 10, 3 };

        var result = nums
            .Where(x => x > 2)
            .Select(x => x * 10)
            .OrderBy(x => x);

        foreach (var item in result)
        {
            Console.WriteLine(item);
        }
    }
}
```

## نمشي عليها step by step

الأرقام الأصلية:  
`5, 1, 8, 2, 10, 3`

### بعد `Where(x > 2)`

`5, 8, 10, 3`

### بعد `Select(x * 10)`

`50, 80, 100, 30`

### بعد `OrderBy(x => x)`

`30, 50, 80, 100`

---

# الفرق بين Enumerable و List methods

سؤال مهم

## هل كل method بستخدمها على List تبقى من Enumerable؟

لا

مثلًا `List<T>` عندها methods خاصة بيها زي:

- Add
    
- Remove
    
- Sort
    

ودي methods جوه `List` نفسها

لكن methods زي:

- Where
    
- Select
    
- Count
    
- Any
    

دي غالبًا من `Enumerable`

مثال:

```cs
List<int> nums = new List<int>();
nums.Add(10);
```

`Add` دي من `List`

لكن:

```cs
nums.Where(x => x > 5);
```

`Where` دي من `Enumerable`


---

# ليه الدكتور أو الامتحان ممكن يركز عليه؟

لأن `Enumerable` بيلم كذا فكرة مهمة في نفس الوقت:

- static class
    
- static methods
    
- extension methods
    
- interfaces
    
- IEnumerable
    
- LINQ
    
- deferred execution
    
- chaining
    
- functional style
    
