---
title: "IQueryable vs IEnumerable"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-21
updated: 2026-09-22
source:
related: []
---


# أولًا: الفكرة العامة

## Enumerable

`Enumerable` بيشتغل على **بيانات موجودة فعلًا في الذاكرة**  
يعني in-memory data

زي:

- `Array`
    
- `List`
    
- `HashSet`
    
- `Dictionary`
    
- أي collection متخزن في الرام
    

---

## Queryable

`Queryable` بيشتغل على **مصدر بيانات خارجي**  
وغالبًا:

- Database
- Entity Framework
- LINQ to SQL

- أي provider يقدر يترجم الـ query
    

هو مش بينفذ على الداتا مباشرة من الرام في البداية  
هو بيبني ==query قابلة للترجمة==

---

# التعريف الرسمي المبسط

## Enumerable

هو static class موجود في:

```cs
System.Linq
```

وبيوفر **extension methods** تشتغل على:

```cs
IEnumerable<T>
```


## Queryable

هو أيضًا static class موجود في:

```cs
System.Linq
```

وبيوفر **extension methods** تشتغل على:

```cs
IQueryable<T>
```

---

# الفرق الجوهري في سطر واحد

- `Enumerable` = ينفذ على البيانات نفسها
    
- `Queryable` = يبني expression يترجمها provider بعدين

دي أهم جملة في الموضوع كله

---

# نبدأ من الأساس: يعني إيه IEnumerable؟

`IEnumerable<T>` interface  
معناه إن الـ object ده ينفع تمشي على عناصره واحد واحد

يعني ينفع تعمل عليه:

```cs
foreach
```

مثال:

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };
```

القائمة دي تطبق `IEnumerable<int>`

لما تستخدم `Enumerable.Where` عليها، الفلترة بتحصل على العناصر الموجودة فعلًا في الرام

---

# يعني إيه IQueryable؟

`IQueryable<T>` برضه interface  
لكن أقوى من `IEnumerable<T>`

هو مش بس sequence ينفع تمشي عليها  
لا، ده كمان بيمثل **query قابلة للفهم والترجمة** بواسطة provider

يعني لما تشتغل مع Entity Framework مثلًا:

```cs
var students = db.Students;
```

ده غالبًا نوعه:

```cs
IQueryable<Student>
```

هنا `students` مش مجرد list جاهزة في الرام  
ده شيء مرتبط بقاعدة البيانات  
وكل operations زي `Where` و `Select` غالبًا بتتبني كـ query لسه هتتترجم SQL

---

# مثال بسيط جدًا يوضح الفرق

## مثال Enumerable

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2);
```

هنا:

- `nums` موجودة في الرام
- `Where` من `Enumerable`
- الفلترة بتحصل على العناصر نفسها
    

---

## مثال Queryable

```cs
var result = db.Students.Where(s => s.Age > 20);
```

هنا:

- `db.Students` غالبًا `IQueryable<Student>`
- `Where` من `Queryable`
- الشرط ده مش بيتنفذ فورًا على objects في الرام
- بل بيتحول لحاجة شبه SQL

مثلًا:

```sql
SELECT * FROM Students WHERE Age > 20
```

---

# الفرق في نوع البراميتر

دي نقطة أكاديمية مهمة جدًا

## Enumerable.Where

شكلها تقريبًا:

```cs
public static IEnumerable<TSource> Where<TSource>(
    this IEnumerable<TSource> source,
    Func<TSource, bool> predicate)
```

### ركز هنا:

الشرط نوعه:

```cs
Func<TSource, bool>
```

يعني method حقيقية executable delegate  
يعني كود يتنفذ مباشرة على العناصر

---

## Queryable.Where

شكلها تقريبًا:

```cs
public static IQueryable<TSource> Where<TSource>(
    this IQueryable<TSource> source,
    Expression<Func<TSource, bool>> predicate)
```

### ركز هنا:

الشرط نوعه:

```cs
Expression<Func<TSource, bool>>
```

وده فرق ضخم جدًا

---

# ما الفرق بين Func و Expression ؟

## Func

ده delegate  
يعني method executable

مثال:

```cs
Func<int, bool> check = x => x > 5;
```

ده كود عادي يتنفذ

---

## Expression

ده مش مجرد كود للتنفيذ  
ده **تمثيل للكود كشجرة تعبيرات**  
يعني expression tree

مثال:

```cs
Expression<Func<int, bool>> check = x => x > 5;
```

هنا الكود بيتخزن بشكل يمكن تحليله وفهمه  
مش بس تنفيذه

وده اللي بيسمح لـ Entity Framework مثلًا إنه يبص على:

```cs
x => x > 5
```

ويقول:

- آه، دي مقارنة
- بين عمود وقيمة
- أقدر أحولها إلى SQL

---

# إذًا الفرق الحقيقي الداخلي

## Enumerable

يقول:

- اديني العناصر
- وأنا هلف عليهم
- وأنفذ الـ delegate على كل عنصر
## Queryable

يقول:

- اديني الـ expression
- وأنا هبعتها للprovider
- وهو يحولها للغة المصدر زي SQL مثلًا
- وبعدين المصدر الخارجي ينفذها


---

# مثال step by step

## مع Enumerable

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2);
```

ما الذي يحدث؟

1. `nums` موجودة في الذاكرة
    
2. `Where` تأخذ `Func<int, bool>`
    
3. تمشي على كل عنصر
    
4. تنفذ `x > 2`
    
5. ترجع العناصر المناسبة
    

---

## مع Queryable

```cs
var result = db.Students.Where(s => s.Age > 20);
```

ما الذي يحدث؟

1. `db.Students` يمثل table أو source خارجي
2. `Where` تأخذ `Expression<Func<Student, bool>>`
3. expression يتحلل
4. EF provider يترجمه إلى SQL
5. قاعدة البيانات تنفذ الشرط
6. ترجع النتائج المناسبة فقط

---

# مثال يوضح الأداء

افترض إن عندك جدول Students فيه مليون صف

## لو استخدمت Queryable بشكل صحيح

```cs
var result = db.Students.Where(s => s.Age > 20).ToList();
```

غالبًا EF هيحولها إلى:

```sql
SELECT * FROM Students WHERE Age > 20
```

يعني قاعدة البيانات هي اللي فلترت  
وهيجيب فقط النتائج المطلوبة

وده ممتاز جدًا في الأداء

---

## لكن لو حولتها لـ Enumerable بدري

```cs
var result = db.Students
    .AsEnumerable()
    .Where(s => s.Age > 20)
    .ToList();
```

هنا حصلت مصيبة مهمة

### ماذا حدث؟

- `AsEnumerable()` قالت: من هنا كفاية ترجمة SQL
    
- حول المصدر إلى `IEnumerable`
- بعد كده `Where` بقت من `Enumerable`
- الفلترة بقيت في الرام
    

وده معناه غالبًا:

- جيب بيانات كتير من الداتابيز الأول
- بعدين فلترها في التطبيق

وده أسوأ كثير لو البيانات كبيرة

---

# إذًا AsEnumerable و AsQueryable مهمين جدًا

## AsEnumerable

تحول التعامل إلى `IEnumerable`  
يعني:

- وقف ترجمة provider
- كمل execution في الذاكرة

## AsQueryable

تحول شيء إلى `IQueryable`  
لكن لازم يكون فيه provider يقدر يتعامل معاه بشكل فعلي

---

# مثال مهم جدًا

```cs
var result = db.Students
    .Where(s => s.Age > 20)
    .Select(s => s.Name);
```

هنا كله `Queryable`  
فغالبًا الترجمة تبقى:

```sql
SELECT Name FROM Students WHERE Age > 20
```

وده ممتاز

لكن لو عملت:

```cs
var result = db.Students
    .AsEnumerable()
    .Where(s => s.Age > 20)
    .Select(s => s.Name);
```

هنا غالبًا:

- هتجيب rows أكتر
- بعدين تشتغل عليها في الرام

---

# الفرق في مكان التنفيذ

## Enumerable

التنفيذ يتم:

- في التطبيق
- داخل CLR
- على البيانات الموجودة في memory

## Queryable

التنفيذ يتم:

- غالبًا خارج التطبيق
- في database engine مثل SQL Server
- أو في provider خارجي

---

# الفرق في المسؤول عن التنفيذ

## Enumerable

المسؤول هو:

- .NET runtime
- LINQ to Objects

## Queryable

المسؤول هو:

- Query Provider  
    مثل:
    
- Entity Framework Provider
- LINQ Provider
- OData Provider
- أي مزود يدعم IQueryable

---

# Query Provider يعني إيه؟

`IQueryable` لوحده مش السحر كله  
لازم يكون فيه provider يفهم الـ expression tree

يعني:

- ياخد expression
- يحللها
- يحولها لصيغة مناسبة
- ينفذها على المصدر الخارجي

في EF مثلًا:

- provider يحول LINQ إلى SQL

---

# مثال واقعي جدًا

عندك:

```cs
var students = db.Students.Where(s => s.Name.StartsWith("A"));
```

## في Queryable

EF يحاول يترجم `StartsWith("A")` إلى SQL مثل:

```sql
WHERE Name LIKE 'A%'
```

## في Enumerable

لو الداتا جت للرام، `StartsWith` تتنفذ كـ C# method عادي على كل object

---

# ليه مش كل حاجة تنفع مع Queryable؟

لأن `Queryable` محتاج يترجم التعبير  
فلو كتبت حاجة معقدة أو method مخصصة من عندك، ممكن الـ provider مايعرفش يترجمها

مثال:

```cs
bool IsGood(Student s)
{
    return s.Age > 20 && s.Name.Length > 3;
}

var result = db.Students.Where(s => IsGood(s));
```

هنا ممكن EF مايعرفش يترجم `IsGood`

لكن مع `Enumerable` عادي جدًا  
لأن execution بيحصل في الرام

---

# إذًا متى أستخدم Enumerable ومتى أستخدم Queryable؟

## استخدم Enumerable عندما:

- البيانات موجودة بالفعل في memory
- شغال على Array أو List
- مش محتاج ترجمة SQL
- عندك operations لا يمكن ترجمتها من provider
- الداتا حجمها صغير أو متحمّلة بالفعل

---

## استخدم Queryable عندما:

- شغال مع قاعدة بيانات
- عايز الفلترة والترتيب يحصلوا في المصدر الخارجي
- عايز performance أحسن
- عايز تبعت query صغيرة ومحددة بدل ما تجيب كل البيانات

---

# نقطة مهمة جدًا: الشكل واحد لكن المعنى مختلف

قدامك الكودين دول:

```cs
nums.Where(x => x > 5)
```

```cs
db.Students.Where(s => s.Age > 20)
```

الشكل شبه بعض  
لكن الداخل مختلف تمامًا

الأول:

- LINQ to Objects
- Func
- execution في memory

الثاني:

- LINQ provider
- Expression
- translation ثم execution خارجي

---

# Deferred Execution في الاثنين

الاتنين بيدعموا deferred execution غالبًا  
يعني query ما تتنفذش فورًا

لكن الفرق:

- في `Enumerable` التأجيل بيكون لتأخير iteration
- في `Queryable` التأجيل بيكون لتأخير ترجمة وإرسال query للمصدر

مثال:

```cs
var query = db.Students.Where(s => s.Age > 20);
```

هنا لسه غالبًا مفيش SQL اتبعت

لكن لما تعمل:

```cs
var list = query.ToList();
```

هنا يبدأ التنفيذ فعليًا

---

# ToList و First و Count دول بيعملوا إيه؟

دي methods غالبًا تجبر التنفيذ

مثال:

```cs
var query = db.Students.Where(s => s.Age > 20);
```

لسه query مؤجلة

لكن:

```cs
var list = query.ToList();
```

هنا التنفيذ يحصل

مع `Queryable`:

- غالبًا SQL يتبعت الآن
    

مع `Enumerable`:
- يبدأ iteration الآن
    

---

# مشكلة شائعة جدًا في المقابلات والامتحانات

## هل IQueryable يرث من IEnumerable؟

نعم

`IQueryable<T>` يمتد من `IEnumerable<T>`

يعني أي `IQueryable<T>` هو أيضًا `IEnumerable<T>`

لكن العكس ليس بالضرورة صحيحًا

وده معناه إنك ممكن تحول بسهولة من `IQueryable` إلى `IEnumerable`  
لكنك قد تخسر ميزة الترجمة

---

# مثال مهم جدًا على الخسارة

```cs
IQueryable<Student> q = db.Students;
IEnumerable<Student> e = q;
```

بعد التحويل ده، لو استخدمت operations معينة من `Enumerable`، هتشتغل كـ in-memory logic بعد نقطة معينة، حسب السياق

عشان كده لازم تبقى فاهم أنت شغال على أنهي abstraction

---

# مثال عملي قوي

عندك جدول Employees

```cs
var result = db.Employees
    .Where(e => e.Salary > 5000)
    .Select(e => new { e.Name, e.Salary });
```

## لو ده Queryable

الـ SQL قد يكون تقريبًا:

```sql
SELECT Name, Salary
FROM Employees
WHERE Salary > 5000
```

يعني:

- الفلترة في SQL
- اختيار الأعمدة في SQL
- يرجع فقط المطلوب

---

## لكن لو عملت كده

```cs
var result = db.Employees
    .AsEnumerable()
    .Where(e => e.Salary > 5000)
    .Select(e => new { e.Name, e.Salary });
```

هنا:

- التحويل لـ `AsEnumerable()` وقف الترجمة
- محتمل جدًا إن بيانات أكتر تتجاب من الداتابيز
- بعدين `Where` و `Select` يحصلوا في الرام
    

وده غالبًا أضعف

---

# طب هل Queryable دائمًا أفضل؟

لا

دي نقطة مهمة جدًا

`Queryable` أفضل فقط لو عندك source خارجي وprovider قوي يترجم query صح

لكن لو البيانات أصلاً already loaded في memory  
فـ `Enumerable` هو الطبيعي والأبسط

مثال:

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };
```

هنا مفيش معنى حقيقي إنك تروح لـ Queryable

---

# إمتى أضطر أستخدم Enumerable بعد Queryable؟

أحيانًا لأن فيه عمليات لا يقدر الـ provider يترجمها

مثلًا:

```cs
var result = db.Students
    .Where(s => s.Age > 20)
    .AsEnumerable()
    .Where(s => CustomMethod(s.Name));
```

هنا:

- أول `Where` تترجم SQL
    
- بعد `AsEnumerable` يبدأ execution in-memory
    
- بعدها تقدر تستخدم methods أو logic خاص لا يمكن ترجمته
    

وده استخدام صحيح أحيانًا، لكن لازم يكون متعمد

---

# مثال يوضح التحول

```cs
var query = db.Students
    .Where(s => s.Age > 20)     // Queryable
    .AsEnumerable()
    .Where(s => s.Name.Length > 3); // Enumerable
```

الجزء الأول:

- يترجم SQL
    

الجزء الثاني:

- يشتغل في الرام
    

يعني الكود الواحد ممكن يبدأ Queryable وبعدين يتحول Enumerable

# مقارنة مختصرة جدًا في جدول ذهني

|النقطة|Enumerable|Queryable|
|---|---|---|
|يعمل على|`IEnumerable<T>`|`IQueryable<T>`|
|نوع الشرط|`Func<T, bool>`|`Expression<Func<T, bool>>`|
|التنفيذ|في الذاكرة|في مصدر خارجي غالبًا|
|الترجمة|لا|نعم عبر provider|
|الأفضل مع|List/Array|Database/EF|
|الأداء مع DB|قد يكون سيئًا لو جلبت البيانات أولًا|أفضل غالبًا|

---

# أخطاء شائعة جدًا

## 1) استخدام AsEnumerable بدري

بيكسر الترجمة ويحول الشغل للرام

## 2) الاعتقاد أن Where واحدة بنفس المعنى دائمًا

لا، نفس الاسم لكن implementation مختلف حسب النوع

## 3) التفكير أن IQueryable يعني البيانات متجلبة

لا، أحيانًا يكون مجرد query لم تُنفذ بعد

## 4) كتابة methods مخصصة داخل Queryable ثم استغراب عدم الترجمة

لأن provider قد لا يعرف ترجمتها

---

# مثال نهائي شامل

```cs
var query = db.Products
    .Where(p => p.Price > 100)
    .OrderBy(p => p.Name)
    .Select(p => new { p.Name, p.Price });
```

ده Queryable

غالبًا يتحول لـ SQL  
ولن يتم التنفيذ إلا عند:

```cs
var result = query.ToList();
```

لكن لو كتبت:

```cs
var result = db.Products
    .AsEnumerable()
    .Where(p => p.Price > 100)
    .OrderBy(p => p.Name)
    .Select(p => new { p.Name, p.Price })
    .ToList();
```

هنا الفلترة والترتيب والاختيار أصبحوا في الذاكرة بعد جلب البيانات
