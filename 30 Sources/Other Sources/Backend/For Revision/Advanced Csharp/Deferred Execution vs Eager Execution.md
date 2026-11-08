---
title: "Deferred Execution vs Eager Execution"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-21
updated: 2026-10-13
source:
related: []
---


## 1) Deferred Execution

### التعريف

يعني الكويري أو العملية **مش بتتنفذ وقت كتابة السطر**  
لكن **بتتنفذ وقت الاستخدام الفعلي**  
زي وقت `foreach` أو `ToList()` أو `First()` حسب الحالة. 

### مثال

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x % 2 == 0);

nums.Add(6);

foreach (var item in result)
{
    Console.WriteLine(item);
}
```

### الناتج

```cs
2
4
6
```

### ليه؟

لأن `Where` هنا **لسه متنفذتش** وقت ما كتبتها  
هي بس خزنت الكويري  
ولما بدأت `foreach` اتنفذت على آخر نسخة من الداتا. 

---

## 2) Eager Execution

### التعريف

يعني التنفيذ بيحصل **فورًا**  
والنتيجة بتتخزن أو تتحدد من وقتها  
مش بتستنى لحد ما تعمل iteration بعدين. 

### مثال

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x % 2 == 0).ToList();

nums.Add(6);

foreach (var item in result)
{
    Console.WriteLine(item);
}
```

### الناتج

```cs
2
4
```

### ليه؟

لأن `ToList()` أجبرت الكويري إنها تتنفذ **حالًا**  
فـ `result` بقت نسخة جاهزة  
وأي تعديل بعد كده على `nums` مش هيأثر عليها. 

---

# الفكرة في سطر

- **Deferred** = نفذ بعدين
- **Eager** = نفذ الآن


---

# الفرق بالتفصيل

## من حيث وقت التنفيذ

### Deferred

التنفيذ بيتأجل لحد أول استعمال فعلي.

### Eager

التنفيذ بيتم وقت استدعاء العملية اللي بتجبر التنفيذ، زي `ToList()` و `ToArray()`، أو وقت operator بيرجع قيمة واحدة مثل `Count()` و `Max()` لأنه لازم يحسب النتيجة فورًا.

---

## من حيث التعديل على الداتا الأصلية

### Deferred

بيشوف **آخر نسخة** من الداتا وقت التنفيذ. 

### Eager

بياخد snapshot وقت التنفيذ الفوري، وبعدها التعديلات الجديدة مش بتغير النتيجة المحسوبة.

---

## من حيث استهلاك الذاكرة

### Deferred

غالبًا أوفر في الذاكرة لأنه مش لازم يكوّن collection جديدة مباشرة، وفي أفضل الحالات يمر مرة واحدة فقط على المصدر.

### Eager

قد يستهلك ذاكرة أكثر لأنه بيعمل materialization للنتائج، مثل `ToList()` أو `ToArray()

---

## من حيث الأداء

### Deferred

مفيد جدًا لو:

- عندك سلسلة عمليات طويلة
    
- ومش محتاج كل النتائج مرة واحدة
    
- أو ممكن توقف بدري أثناء القراءة.  
    Microsoft تشير إلى أن deferred execution قد يحسن الأداء خصوصًا مع سلاسل التلاعب بالبيانات الكبيرة. 
    

### Eager

أفضل لما:

- عايز تثبت النتيجة الحالية
    
- أو تمنع إعادة الحساب كل مرة
    
- أو تحتاج collection جاهزة تتكرر عليها أكثر من مرة.  
    وبرضه بعض العمليات بطبيعتها تحتاج eager evaluation داخليًا، مثل `OrderBy` لأنه لا يقدر يحدد أول عنصر مرتب قبل ما يعرف بقية العناصر.
    

---

# نقطة مهمة جدًا

## Deferred Execution لا يعني دائمًا Lazy 100%

الـ deferred execution معناه إن التنفيذ متأجل  
لكن **طريقة التنفيذ بعد ما يبدأ** ممكن تكون:

### Lazy

يعني عنصر بعنصر  
زي `Where` و `Select` غالبًا.

### Eager داخليًا

يعني يتطلب معالجة المصدر كله أولًا  
زي `OrderBy` غالبًا، لأنه يحتاج ترتيب البيانات قبل إخراج النتائج. Microsoft تذكر هذا المثال صراحة. 

يعني:

- `Deferred` = إمتى التنفيذ يبدأ
    
- `Lazy / Eager evaluation` = إزاي التنفيذ يحصل بعد ما يبدأ
    

وده فرق مهم جدًا.

---

# أمثلة على operators

## عمليات غالبًا Deferred

```cs
Where()
Select()
Take()
Skip()
```

دي عادة ترجع `IEnumerable<T>` وتنتظر لحد ما يحصل iteration.

---

## عمليات غالبًا Eager / Immediate

```cs
ToList()
ToArray()
Count()
First()
Max()
Min()
Sum()
```

دي إما:

- بتجيب قيمة واحدة مباشرة
    
- أو بتحول النتيجة إلى collection جاهزة فورًا. 
    

---

# مثال يوضح إعادة التنفيذ

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2);

foreach (var item in result)
{
    Console.WriteLine(item);
}

Console.WriteLine("----");

nums.Add(10);

foreach (var item in result)
{
    Console.WriteLine(item);
}
```

### الناتج

```cs
3
4
5
----
3
4
5
10
```

### ليه؟

لأن `result` deferred  
فكل `foreach` ممكن تعيد تنفيذ الكويري من جديد على الداتا الحالية. هذا يتماشى مع فكرة أن التقييم يحدث عند الحاجة وليس عند تعريف الكويري. 

---

# نفس المثال مع Eager

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2).ToList();

foreach (var item in result)
{
    Console.WriteLine(item);
}

Console.WriteLine("----");

nums.Add(10);

foreach (var item in result)
{
    Console.WriteLine(item);
}
```

### الناتج

```cs
3
4
5
----
3
4
5
```

### ليه؟

لأن `ToList()` نفذت الكويري مرة واحدة فقط وقت إنشائها، وبعدها النتيجة ثبتت. 

---

مصدر للمذاكرة لو بتحب تذاكر من الدوكيومنتس
([C# Corner](https://www.c-sharpcorner.com/article/what-is-deferred-lazy-loading-and-eager-loading/?utm_source=chatgpt.com "What Is Deferred/ Lazy Loading And Eager Loading?"))

---

# جدول ذهني سريع

|النقطة|Deferred Execution|Eager Execution|
|---|---|---|
|وقت التنفيذ|عند الحاجة|فورًا|
|التغيير في المصدر|يظهر عند التنفيذ|لا يظهر بعد أخذ النتيجة|
|الذاكرة|أقل غالبًا|أكثر غالبًا|
|إعادة الحساب|ممكن يحصل كل مرة|لا، بعد materialization|
|أمثلة|`Where`, `Select`|`ToList`, `ToArray`, `Count`|

