تعالى نشغبط، من الي فهمته ان دي طريقة للتعامل مع الداتا، بصورها بقى، داتا بيز سكوال او XML او غيره، كل دا علشان اعمل الكويريز عليها بشكل ابسط واسهل في الدوت نت
فعندك مثلا انا عندي حاجه 
- الـData Souce هو الحاجه الي بتعبر عن الداتا، سواء كانت داتابيز بقى ولا داتا من السي شارب انت عاملها
- الquery defination دي هو الكويري الي انت عاملها
- الـquery execution دي نتيجة الكويري الي انت هتعرضها

عندنا طريقتين نكتب بيهم ال query

- الـQuery Expression
- الـMethod Expression

بيقولك الquery expression
- هي اقرب حاجه شبه ال sql و
- هي علشان linq بيقدر يتعامل مع مصادر مختلفة من البيانات ف الquery بتفحصهم وتحولهم علشان تتعامل معاهم
- وكمان strongly typed يعني كله عارف نوعه مهما كان يعني واي property متكنش موجودة يجيبلك الerror في الـCompile time
- لا وكمان بيقولك حاجه مهمة جدا وفي غاية الأهمية ان ال query expression هي عبارة عن Deferred Execution 

# Deferred Execution and Immediate Execution

### الـDeferred Execution

دي كويري مش بتتنفذ في وقت كتابة السطر لكن بتتنفذ في وقت الاستخدام 
يعني انت لو عايز تستخدمها هتكتب مثلا Foreach او ToList() ومن امثلتها عندك where  مثلا هنكتب كود

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6};
var result = 
	from n in nums
	where n % 2 == 0
	select n;
nums.Add(8);

foreach(var n in result){
	Console.WriteLine(n);
}

/*
2
4
6
8
*/
```

دا حصل ليه؟

لأن `Where` هنا **لسه متنفذتش** وقت ما كتبتها  
هي بس خزنت الكويري  
ولما بدأت `foreach` اتنفذت على آخر نسخة من الداتا. 

![[Pasted image 20260906032113.png]]

اي هو بشكل تفصيلي ؟

- التنفيذ بيتأجل لحد أول استعمال فعلي.
- بيشوف **آخر نسخة** من الداتا وقت التنفيذ. 
- من ناحية استهلاك الميموري غالبًا أوفر لأنه مش لازم يكوّن collection جديدة مباشرة، وفي أفضل الحالات يمر مرة واحدة فقط على المصدر.
- بالنسبة للبيرفورمنس مفيد جدا لو
	- عندك سلسلة عمليات طويلة ومش محتاج كل النتائج مرة واحدة أو ممكن توقف بدري أثناء القراءة. 
علشان كدا  مايكروسوفت قالتلك 

> أن deferred execution قد يحسن الأداء خصوصًا مع سلاسل التلاعب بالبيانات الكبيرة. 

```cs
Where()
Select()
Take()
Skip()
```

---
### immediate Execution

دا هنا التنفيذ بيحصل بشكل فوري، كأنك اديت أمر واجب التنفيذ والتنفيذ لازم يكون بسرعة
يعني التنفيذ هيتخزن ويتحدد من وقتها مش يستنى اي Iteration، ساعتها مش هينفع نعملها ب query expression بشكل مباشر إلا لو كدا
```cs
List<int> nums = new List<int> {1, 2, 3, 4, 5};
var result = (
	from n in nums
	where n % 2 == 0
	select n
).ToList();
nums.Add(6);
foreach(var i in result){
	Console.WriteLine(i);
}
/*
2
4
*/
	
```

انا هنا استخدمت ToList ساعتها هتتعمل فورا كأنك عملت حاجه ملهاش علاقة بالي قبل كدا

يعني دلوقتي 

![[Pasted image 20260906031858.png]]

لأن `ToList()` أجبرت الكويري إنها تتنفذ **حالًا**  
فـ `result` بقت نسخة جاهزة  
وأي تعديل بعد كده على `nums` مش هيأثر عليها. 

اي هو بشكل تفصيلي؟

- التنفيذ بيتم وقت استدعاء العملية اللي بتجبر التنفيذ، زي `ToList()` و `ToArray()`، أو وقت operator بيرجع قيمة واحدة مثل `Count()` و `Max()` لأنه لازم يحسب النتيجة فورًا.
- بياخد snapshot وقت التنفيذ الفوري، وبعدها التعديلات الجديدة مش بتغير النتيجة المحسوبة.
- ممكن يستهلك ذاكرة أكثر لأنه بيعمل materialization للنتائج، مثل `ToList()` أو `ToArray()
- بالنسبة للأداء
	- افضل لو عايز تثبت النتيجة في الوقت الحالي وتمنع إعادة الحساب فكل مرة
	- او تحتاج كولكشن جاهزة تكرر عليها العمليات اكتر من مرة، زي اوردر باي مثلا وعمليات العد الي هو الكاونت وكدا

العمليات الي بتتعمل عليه 
```cs
ToList()
ToArray()
Count()
First()
Max()
Min()
Sum()
```

---
# Filtering

## Where

بنستخدمها علشان نعمل فلتر لل List او للداتا بناءا على condition تحطها 

> selecting only elements that match a condition. `Where()` filters based on a **predicate** (true/false function)


```cs
// Get active users
var activeUsers = users.Where(u => u.IsActive);

// Get products in stock with price under 100
var affordable = products.Where(p => p.InStock && p.Price < 100);

// Get orders from last 30 days
var recent = orders.Where(o => o.Date >= DateTime.Now.AddDays(-30));

// String filtering
var admins = users.Where(u => u.Role.Contains("Admin"));
```

هنا الفلترة بتكون مستخدمه عملي على ارض الواقع، بطريقة بسيطة يعني

---
### Where() - Index Overloaded 

```cs
int[] numbers = {10, 20, 30, 40, 50, 60};

var evenIndexed = numbers.Where((num,index) => index % 2 == 0);
// 10, 30, 50
```

هنا احنا بنستخدم ال index كمان معانا من ضمن الfilter prameters، يعني ممكن يكون الكوندشن مبني على حاجتين فقط

```cs
int[] nums = {10, 20, 30, 40, 50, 60};

var first3BiggerThan15 = nums.Where((num,index) => num > 15 && index < 4 );

// 20 30 40 - 1 2 3 
```

---
## OfType()

هي عبارة عن اكستنشن فانكشن بتعمل filtering وفنفس الوقت casting بناءا على النوع وليكن مثلا

```cs
ArrayList mixedList = new ArrayList();
mixedList.Add(1);
mixedList.Add("Ahmed");
mixedList.Add(2);
mixedList.Add("Sara");
mixedList.Add(3.14);

var numbers = mixedList.OfType<int>();
// 1 , 2
var names = mixedList.OfType<string>();
// Ahmed, Sara
```

### OfType vs Cast vs Where + is

ببساطة عندك 3 طرق تتعامل بيهم مع العناصر حسب الـ **Type**:

|الطريقة|بتعمل إيه؟|لو النوع غلط؟|الناتج|
|---|---|---|---|
|`OfType<T>()`|**فلترة + تحويل**|بتتخطاه|`IEnumerable<T>`|
|`Cast<T>()`|**تحويل بس**|يرمي `InvalidCastException`|`IEnumerable<T>`|
|`Where(x => x is T)`|**فلترة بس**|بتتخطاه|نفس النوع الأصلي|

### مثال

```csharp
object[] items = { 1, "hello", 2, "world" };
```

**1. OfType**

```csharp
var nums = items.OfType<int>();
```

→ ياخد الـ `int` بس ويحوّلهم لـ `IEnumerable<int>`:

`1, 2`

**2. Cast**

```csharp
var nums = items.Cast<int>();
```

→ بيحاول يحوّل **كل العناصر** لـ `int`.

أول ما يقابل `"hello"` → `InvalidCastException`

**3. Where + is**

```csharp
var nums = items.Where(x => x is int);
```

→ بيعمل فلترة للـ `int` بس، لكن العناصر لسه نوعها الأصلي `object`.

---
# Projection

الـ **Projection Operations** بنستخدمها علشان نحدد **شكل الداتا اللي عايزين نرجعها** من الـ Collection.

يعني بدل ما نرجع الـ Object كامل، نقدر:

- نرجع Property معينة.
- نرجع أكتر من Property.
- نعمل حسابات وتحويلات.
- نعمل Object جديد.
- نفرد الـ Nested Collections باستخدام `SelectMany()`.


أهم العمليات هنا:

- `Select()`
- `SelectMany()`


---

## Select()

بنستخدم `Select()` علشان نعمل **Projection لكل Element** ونحوّله للشكل اللي إحنا عايزينه.

> `Select()` transforms each element into a new form.

مثلاً عندنا:

```cs
List<Product> products =
[
    new Product { Id = 1, Name = "Laptop", Price = 35000 },
    new Product { Id = 2, Name = "Mouse", Price = 800 },
    new Product { Id = 3, Name = "Keyboard", Price = 1500 }
];
```

لو عايزين أسماء المنتجات بس:

```cs
var names = products.Select(p => p.Name);
```

الناتج:

```text
Laptop
Mouse
Keyboard
```

هنا إحنا **مش بنفلتر المنتجات**، كل المنتجات لسه موجودة، لكن غيرنا **شكل الـ output** من:

```text
Product → Product
```

إلى:

```text
Product → string
```

---

### Select بأكتر من Property

ممكن نعمل Object جديد ونختار منه الـ Properties اللي محتاجينها:

```cs
var result = products.Select(p => new
{
    p.Name,
    p.Price
});
```

الناتج:

```text
Laptop    35000
Mouse       800
Keyboard   1500
```

وده مفيد جدًا لما تكون مش محتاج الـ Object كامل.

---

### Select مع Calculations

مش لازم الـ `Select` ترجع Property موجودة زي ما هي، ممكن تعمل عليها عمليات حسابية:

```cs
var result = products.Select(p => new
{
    p.Name,
    FinalPrice = p.Price * 1.14m
});
```

هنا عملنا Property جديدة اسمها `FinalPrice`.

مثلاً:

```text
Laptop      39900
Mouse         912
Keyboard     1710
```

فـ `Select()` ممكن تستخدم في:

- حساب السعر بعد الضريبة.
- حساب الإجمالي.
- تحويل Unit.
- إنشاء DTO.
- تغيير شكل الـ Data.
    

---

## Select() - Index Overload

`Select()` عندها Overload بيديك **الـ Element والـ Index**.

```cs
int[] numbers = { 10, 20, 30, 40, 50 };

var result = numbers.Select((num, index) => new
{
    Index = index,
    Number = num
});
```

الناتج:

```text
0 → 10
1 → 20
2 → 30
3 → 40
4 → 50
```

ممكن تستخدم الـ Index في الـ Projection نفسه:

```cs
var result = products.Select((p, index) => new
{
    Number = index + 1,
    p.Name,
    p.Price
});
```

الناتج:

```text
1 → Laptop → 35000
2 → Mouse → 800
3 → Keyboard → 1500
```

**الـ Index هنا بيستخدم علشان نحدد شكل الـ output، مش علشان نعمل Filtering.**

---

## SelectMany()

بنستخدم `SelectMany()` لما يكون عندنا **Collection داخل كل Element** وعايزين نعمل لها **Flattening**.

> `SelectMany()` projects each element into a collection and then flattens all the collections into one sequence.

يعني عندنا:

```text
Students
   ↓
Student
   ↓
Courses
```

وكل Student عنده أكتر من Course.

مثلاً:

```cs
List<Student> students =
[
    new Student
    {
        Name = "Ahmed",
        Courses = ["C#", "SQL"]
    },

    new Student
    {
        Name = "Sara",
        Courses = ["C#", "LINQ"]
    }
];
```

---

### باستخدام Select()

```cs
var courses = students.Select(s => s.Courses);
```

هنا الناتج هيكون:

```text
["C#", "SQL"]
["C#", "LINQ"]
```

يعني عندنا:

```text
IEnumerable<List<string>>
```

أو بشكل مبسط:

```text
Collection
   ↓
Collection
   ↓
Collection
```

---

### باستخدام SelectMany()

```cs
var courses = students.SelectMany(s => s.Courses);
```

الناتج:

```text
C#
SQL
C#
LINQ
```

بدل:

```text
["C#", "SQL"]
["C#", "LINQ"]
```

بقت:

```text
C#
SQL
C#
LINQ
```

يعني:

```text
Collection
   ↓
Elements
   ↓
Flatten
   ↓
One Collection
```

---

## Select vs SelectMany

دي أهم مقارنة:

| |`Select()`|`SelectMany()`|
|---|---|---|
|الهدف|Projection|Projection + Flattening|
|`Element →`|Element أو Collection|Collection|
|الـ Nested Collections|بتفضل Nested|بتتفرد|
|مثال|`Student → Courses`|`Students → All Courses`|

مثال:

```cs
var result1 = students.Select(s => s.Courses);
```

الناتج:

```text
["C#", "SQL"]
["C#", "LINQ"]
```

أما:

```cs
var result2 = students.SelectMany(s => s.Courses);
```

الناتج:

```text
C#
SQL
C#
LINQ
```

---

## Select + Where

غالبًا هتستخدم `Select` مع `Where` مع بعض.

```cs
var result = products
    .Where(p => p.Price > 1000)
    .Select(p => p.Name);
```

هنا:

### `Where`

بيحدد **مين اللي يعدّي**:

```text
Price > 1000
```

### `Select`

بيحدد **إيه اللي يرجع**:

```text
Name
```

الناتج:

```text
Laptop
Keyboard
```

فاحفظها:

> **Where → مين؟**  
> **Select → إيه؟**

---

## الخلاصة

### `Select()`

**Projection**

بتستخدمها لما عايز تغير شكل الـ data:

```cs
products.Select(p => p.Name);
```

أو تعمل Object جديد:

```cs
products.Select(p => new
{
    p.Name,
    p.Price
});
```

أو تعمل Calculation:

```cs
products.Select(p => new
{
    p.Name,
    FinalPrice = p.Price * 1.14m
});
```

---

### `SelectMany()`

**Projection + Flattening**

بتستخدمها لما كل Element جواه Collection وعايز تجمع كل الـ Collections في واحدة:

```cs
students.SelectMany(s => s.Courses);
```

---
# Ordering

الـ **Ordering Operations** بنستخدمها علشان نرتب العناصر الموجودة في الـ Collection بناءً على Property أو Condition معينة.

أهم العمليات:

- `OrderBy()`
- `OrderByDescending()`
- `ThenBy()`
    
- `ThenByDescending()`
    
- `Reverse()`
    

---

## OrderBy()

بنستخدمها علشان نرتب الداتا **تصاعديًا (Ascending)** بناءً على قيمة معينة.

> Sorts the elements in ascending order based on a key.

```cs
var result = products.OrderBy(p => p.Price);
```

لو الأسعار:

```text
35000
800
1500
5000
3000
100
30
```

هتبقى:

```text
30
100
800
1500
3000
5000
35000
```

ممكن ترتب بأي Property:

```cs
var result = products.OrderBy(p => p.Name);
```

هنا هيترتب حسب `Name` أبجديًا.

---

## OrderByDescending()

عكس `OrderBy()`.

بنستخدمها علشان نرتب الداتا **تنازليًا (Descending)**.

```cs
var result = products.OrderByDescending(p => p.Price);
```

الناتج:

```text
35000
5000
3000
1500
800
100
30
```


---

## ThenBy()

بنستخدم `ThenBy()` لما نكون عاملين **ترتيب أساسي** وعايزين نضيف **ترتيب تاني** للعناصر اللي عندها نفس القيمة.

> Applies a secondary ascending sort.

مثلاً عندنا:

```cs
var result = products
    .OrderBy(p => p.Category)
    .ThenBy(p => p.Price);
```

هنا:

### أولًا:

```text
Category
```

هيعمل الترتيب الأساسي حسب الـ Category.

### ثانيًا:

```text
Price
```

لو فيه أكتر من Product في نفس الـ Category، يرتبهم حسب السعر.

مثلاً:

```text
Electronics
    Mouse       800
    Keyboard   1500
    Laptop    35000

Furniture
    Chair      3000
    Desk       5000

Stationery
    Pen          30
    Notebook    100
```

---

## ThenByDescending()

نفس فكرة `ThenBy()`، لكن الترتيب الثاني بيكون **تنازليًا**.

```cs
var result = products
    .OrderBy(p => p.Category)
    .ThenByDescending(p => p.Price);
```

يعني:

```text
Category → Ascending
Price    → Descending
```

مثلاً داخل `Electronics`:

```text
Laptop     35000
Keyboard    1500
Mouse        800
```

---

## ThenBy vs OrderBy

دي نقطة مهمة في الـ LINQ.

لو عايز تعمل **Primary Sort + Secondary Sort** استخدم:

```cs
OrderBy()
ThenBy()
```

مثال:

```cs
var result = products
    .OrderBy(p => p.Category)
    .ThenBy(p => p.Price);
```

لكن لو عملت:

```cs
var result = products
    .OrderBy(p => p.Category)
    .OrderBy(p => p.Price);
```

الـ `OrderBy()` الثانية بتبدأ **Ordering جديد**، ومش بتعتبر نفسها ترتيب ثانوي للأولى.

فاحفظ:

> `OrderBy()` = أول ترتيب  
> `ThenBy()` = ترتيب إضافي لنفس الـ Ordering

---

## Reverse()

`Reverse()` مختلفة شوية عن الباقيين.

هي **مش بترتب حسب Property**، لكنها بتقلب ترتيب العناصر الحالي.

> Reverses the current sequence.

مثلاً:

```cs
int[] numbers = { 10, 20, 30, 40, 50 };

var result = numbers.Reverse();
```

الناتج:

```text
50
40
30
20
10
```

ولو عندك:

```cs
var result = products
    .OrderBy(p => p.Price)
    .Reverse();
```

هيعمل:

1. ترتيب حسب السعر تصاعديًا.
2. يقلب الـ sequence بالكامل.

الناتج هيبقى كأنه:

```text
Price Descending
```

لكن لو هدفك أصلًا ترتيب Property تنازلي، الأفضل والأوضح:

```cs
products.OrderByDescending(p => p.Price);
```

---

## مثال عملي يجمعهم

عندنا:

```cs
var result = products
    .OrderBy(p => p.Category)
    .ThenByDescending(p => p.Price);
```

معناه:

- اولا هيرتب تصاعديا حسب ال Category
- ثانيا هيرتب تنازليا في حالة ال price في حالة تساوي ال category

---
# LINQ Partitioning & Quantifiers
## Partitioning

هتقسم شئ كبير كدا لأجزاء اصغر من غير ما يعدل الشئ الاساسي

ممكن تستخدم 
- Take(n)
- هنا هناخد اول عدد معين من العناصر
- Skip(n)
- هنا هنعمل سكيب لأول عدد معين من العناصر وبنستخدمه في الباجينيشن
- TakeWhile()
- هاخد فحالة معينة لو كانت ترو
- SkipWhile()
- هسكيب فحالة معينة لو كانت ترو

---
### Take()

```cs
var numbers = new[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

var first3 = numbers.Take(3)
// 1 , 2 , 3

var first5 = numbers.Take(5)
// 1 , 2 , 3 , 4 , 5
var small = new[] {1, 2};
var take10 = small.Take(10);

// 1 , 2 (and no exception!)
```

هنا اختصار ودا شرح بسيط على استخدامه بشكل بسيط

وهنا مثال للحاجات الي بنستخدمها على ارض الواقع زي مثلا عايز 5 اعلى اوردرز سعرا
```cs
var highest5 = orders.OrderByDescending(o => o.Date)
.Take(5)
```

---
### Skip()

```cs
var numbers = new[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

var skipFirst3 = numbers.Skip(3)
// 4, 5, 6, 7, 8, 9, 10

var SkipFirst7 = numbers.Skip(7)
// 8, 9, 10
```


---

### Skip + Take = Pagination

لما نستخدم `Skip()` و `Take()` مع بعض، نقدر نقسم الداتا إلى **Pages**.

مثلاً عندك:

```text
100 Products
```

وعايز تعرض:

```text
10 Products per Page
```

### Page 1

```cs
data
    .Skip(0)
    .Take(10);
```

```text
Items 1 → 10
```

### Page 2

```cs
data
    .Skip(10)
    .Take(10);
```

```text
Items 11 → 20
```

### Page 3

```cs
data
    .Skip(20)
    .Take(10);
```

```text
Items 21 → 30
```

---

### Pagination Formula

القانون اللي تحفظه:

```cs
.Skip((pageNumber - 1) * pageSize)
.Take(pageSize)
```

مثلاً:

```cs
int pageNumber = 3;
int pageSize = 10;

var page = products
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize);
```

الحساب:

```text
(pageNumber - 1) * pageSize

(3 - 1) * 10
= 20
```

فالكود يصبح:

```cs
.Skip(20)
.Take(10)
```

يعني:

```text
21 → 30
```

---

#### ليه بنستخدم `(pageNumber - 1)`؟

لأن أول Page رقمها `1`، لكن `Skip()` محتاج عدد العناصر اللي هنعديها.

مثلاً:

|Page|Page Size|Skip|Take|
|--:|--:|--:|--:|
|1|10|0|10|
|2|10|10|10|
|3|10|20|10|
|4|10|30|10|

فـ:

```text
Page 1 → (1 - 1) × 10 = 0
Page 2 → (2 - 1) × 10 = 10
Page 3 → (3 - 1) × 10 = 20
Page 4 → (4 - 1) × 10 = 30
```

---

##### Pagination في API

مثلاً في ASP.NET Core API:

```cs
public IActionResult GetProducts(int page = 1, int pageSize = 10)
{
    var products = _context.Products
        .OrderBy(p => p.Name)
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToList();

    return Ok(products);
}
```

لو Request:

```text
?page=2&pageSize=10
```

هيجيب:

```text
Skip(10)
Take(10)
```

يعني المنتجات من **11 إلى 20**.

---

### مهم جدًا مع Entity Framework

لما تستخدم `Skip()` و `Take()` مع **Entity Framework Core** على `IQueryable`، الـ LINQ بيتترجم إلى SQL، بحيث قاعدة البيانات تنفذ الـ pagination بدل ما تجيب كل الـ rows للتطبيق ثم تعمل `Skip/Take` في الذاكرة.

وفي SQL Server بيكون المفهوم المقابل هو:

```sql
OFFSET ... FETCH
```

وده مهم جدًا في الـ APIs اللي عندها عدد كبير من records.

---

### OrderBy قبل Pagination

في الـ database queries، غالبًا هتعمل:

```cs
var products = _context.Products
    .OrderBy(p => p.Name)
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToList();
```

---
### SkipWhile() + TakeWhile()

دول برضه من **Partitioning Operations**، لكن مختلفين عن `Skip()` و`Take()`.

الفرق الأساسي إن:

- `Skip()` / `Take()` → بيعتمدوا على **عدد العناصر**.
    
- `SkipWhile()` / `TakeWhile()` → بيعتمدوا على **Condition**.
    

---

#### SkipWhile()

بنستخدم `SkipWhile()` علشان **نتخطى العناصر طالما الـ condition متحقق**.

> Skip elements while the condition is `true`, then return everything after that point.

مثال:

```cs
int[] numbers = { 2, 4, 6, 7, 8, 10 };

var result = numbers.SkipWhile(n => n % 2 == 0);
```

هيبدأ من أول عنصر:

```text
2  → even → Skip
4  → even → Skip
6  → even → Skip
7  → odd  → STOP
```

بعد ما الـ condition بقى `false`، **مش بيكمل Filtering**.

الناتج:

```text
7
8
10
```

### نقطة مهمة جدًا

`SkipWhile()` **مش معناها Skip كل العناصر اللي تحقق الشرط**.

هي معناها:

> ان **Skip من البداية طالما الشرط متحقق، وأول ما الشرط يفشل، وقف الـ Skip وكمل باقي الداتا كلها.**

مثلاً:

```cs
int[] numbers = { 2, 4, 6, 7, 8, 10 };

var result = numbers.SkipWhile(n => n % 2 == 0);
```

الناتج:

```text
7, 8, 10
```

لاحظ إن `8` even ومع ذلك رجعت، لأننا وصلنا لها ==**بعد ما الـ condition فشل عند 7**.==

---

#### TakeWhile()

عكس `SkipWhile()` تقريبًا.

بنستخدم `TakeWhile()` علشان **ناخد العناصر من البداية طالما الـ condition متحقق**.

> Take elements while the condition is `true`, and stop at the first `false`.

```cs
int[] numbers = { 2, 4, 6, 7, 8, 10 };

var result = numbers.TakeWhile(n => n % 2 == 0);
```

هيعمل:

```text
2 → even → Take
4 → even → Take
6 → even → Take
7 → odd  → STOP
```

الناتج:

```text
2
4
6
```

والـ `8` و`10` مش هيتاخدوا، حتى إنهم بيحققوا الـ condition، لأن `TakeWhile()` **بتقف عند أول عنصر يفشل الشرط**.

---

##### TakeWhile vs Where

دي أهم مقارنة.

الاتنين بيستخدموا **Condition**، لكن سلوكهم مختلف تمامًا.

###### Where()

`Where()` بتعمل **Filtering على كل الـ Collection**.

```cs
int[] numbers = { 2, 4, 6, 7, 8, 10 };

var result = numbers.Where(n => n % 2 == 0);
```

هتفحص كل العناصر:

```text
2  → Take
4  → Take
6  → Take
7  → Skip
8  → Take
10 → Take
```

الناتج:

```text
2, 4, 6, 8, 10
```

---

###### TakeWhile()

`TakeWhile()` بتاخد **من البداية فقط**، وأول ما الشرط يفشل **توقف نهائيًا**.

```cs
var result = numbers.TakeWhile(n => n % 2 == 0);
```

```text
2 → Take
4 → Take
6 → Take
7 → STOP
8 → ❌
10 → ❌
```

الناتج:

```text
2, 4, 6
```

---
عندنا:

```cs
int[] numbers = { 2, 4, 6, 7, 8, 10 };
```

|Operation|النتيجة|
|---|---|
|`Where(n => n % 2 == 0)`|`2, 4, 6, 8, 10`|
|`TakeWhile(n => n % 2 == 0)`|`2, 4, 6`|
|`SkipWhile(n => n % 2 == 0)`|`7, 8, 10`|

### احفظ الفرق كده:

**Where:**

> هاتلي **كل** العناصر اللي تحقق الشرط.

**TakeWhile:**

> هاتلي العناصر من **البداية** طالما الشرط متحقق، وأول ما يفشل **قف**.

**SkipWhile:**

> عدّي العناصر من **البداية** طالما الشرط متحقق، وأول ما يفشل **ابدأ رجّع كل الباقي**.


---

### SkipWhile + TakeWhile

ممكن تجمعهم:

```cs
var result = numbers
    .SkipWhile(n => n < 5)
    .TakeWhile(n => n < 10);
```

الفكرة:

```text
SkipWhile
اتخطى من البداية لحد ما توصل لأول عنصر >= 5

TakeWhile
ابدأ خد العناصر لحد أول عنصر >= 10
```

---
## Quantifiers

الـ **Quantifier Operations** بنستخدمها علشان نسأل الـ Collection **سؤال إجابته Yes / No**.

يعني عكس `Select` اللي بترجع Data، الـ Quantifiers بترجع **`bool`**:

```text
true / false
```

بتستخدم كتير في الـ **Validation** والـ **Conditional Logic**.

أهم 3:

- `Any()`
- `All()
- `Contains()`


---

### Any()

بنستخدمها علشان نعرف:

> **هل فيه عنصر واحد على الأقل بيحقق الشرط؟**

```cs
bool result = products.Any(p => p.Price > 10000);
```

لو فيه Product واحد على الأقل سعره أكبر من `10000`:

```text
true
```

لو مفيش:

```text
false
```

وممكن تستخدمها من غير Condition:

```cs
bool hasProducts = products.Any();
```

يعني:

> هل الـ Collection فيها أي عناصر أصلًا؟

### عمليًا

```cs
if (products.Any(p => p.Stock == 0))
{
    Console.WriteLine("There are out-of-stock products");
}
```

يعني:

> هل فيه **منتج واحد على الأقل** الـ Stock بتاعه صفر؟

---

### All()

بنستخدمها علشان نعرف:

> **هل كل العناصر بتحقق الـ condition؟**

```cs
bool result = products.All(p => p.Price > 0);
```

لو **كل** المنتجات سعرها أكبر من `0`:

```text
true
```

لو حتى Product واحد سعره `0` أو أقل:

```text
false
```

### عمليًا

```cs
if (products.All(p => p.Stock > 0))
{
    Console.WriteLine("All products are in stock");
}
```

يعني:

> هل **كل المنتجات** موجودة في الـ Stock؟

---

### Contains()

بنستخدمها علشان نعرف:

> **هل الـ Collection فيها قيمة معينة؟**

```cs
int[] numbers = { 10, 20, 30, 40 };

bool result = numbers.Contains(30);
```

الناتج:

```text
true
```

لأن `30` موجودة.

ولو:

```cs
bool result = numbers.Contains(50);
```

الناتج:

```text
false
```

---

#### Contains مع Objects

لو عندك Objects:

```cs
var result = products.Contains(product);
```

هنا `Contains()` بتعتمد على **Equality** الخاصة بالـ Object، يعني هل العنصر يعتبر مساويًا للـ Object اللي بتدور عليه.

ولو عايز تبحث بناءً على Property معينة، غالبًا تستخدم `Any()`:

```cs
bool exists = products.Any(p => p.Id == 5);
```

يعني:

> هل فيه Product الـ `Id` بتاعه `5`؟

وده شائع جدًا في الـ APIs والـ Database logic.

---

### Any vs All vs Contains

| Method       | السؤال                            | مثال                       |
| ------------ | --------------------------------- | -------------------------- |
| `Any()`      | هل **واحد على الأقل** يحقق الشرط؟ | `Any(p => p.Price > 1000)` |
| `All()`      | هل **كل العناصر** تحقق الشرط؟     | `All(p => p.Price > 0)`    |
| `Contains()` | هل **قيمة معينة** موجودة؟         | `Contains(30)`             |


---
## Short-Circuit Evaluation

الـ **Short-Circuit Evaluation** معناها إن البرنامج ==**بيوقف فحص باقي العناصر أول ما يقدر يحدد الإجابة**.==

وده مهم جدًا مع **Quantifiers** زي:

- `Any()`
    
- `All()`
    

لأنهم مش محتاجين يفحصوا الـ Collection كلها في كل الحالات.

---

### Any() + Short-Circuit

`Any()` بتدور على **أول عنصر يحقق الشرط**.

مثلاً:

```cs
int[] numbers = { 10, 20, 30, 40, 50 };

bool result = numbers.Any(n => n > 25);
```

الفحص هيكون:

```text
10 → false
20 → false
30 → true  ← STOP
```

بمجرد ما لقى `30`، عرف إن الإجابة:

```text
true
```

فمش محتاج يفحص `40` و`50`.

> `Any()` → أول `true` → **Stop**

---

### All() + Short-Circuit

`All()` عكسها.

هي بتدور على **أول عنصر يفشل في تحقيق الشرط**.

```cs
int[] numbers = { 10, 20, 30, 5, 40 };

bool result = numbers.All(n => n > 0);
```

الفحص:

```text
10 → true
20 → true
30 → true
5  → true
40 → true
```

كلهم نجحوا → `true`.

لكن لو:

```cs
int[] numbers = { 10, 20, 30, -5, 40 };

bool result = numbers.All(n => n > 0);
```

الفحص:

```text
10 → true
20 → true
30 → true
-5 → false ← STOP
```

بمجرد ما لقى عنصر واحد فشل، عرف إن **مش كل العناصر بتنجح**.

> `All()` → أول `false` → **Stop**

---

### Contains()

`Contains()` كمان بتستفيد من نفس الفكرة.

```cs
int[] numbers = { 10, 20, 30, 40, 50 };

bool result = numbers.Contains(30);
```

الفحص:

```text
10 → No
20 → No
30 → Yes ← STOP
```

بمجرد ما لقى القيمة المطلوبة، خلاص الإجابة `true`.

> `Contains()` → أول Match → **Stop**

---

### ليه ده مهم؟

لأنه بيخلي العمليات دي **أكثر كفاءة** من إنك تفحص كل العناصر بدون داعي.

مثلاً عندك مليون عنصر:

```cs
bool exists = numbers.Any(n => n == 500);
```

لو `500` موجودة في أول 100 عنصر، `Any()` مش هتحتاج تكمل للمليون.

| Method       | بيقف إمتى؟                     |
| ------------ | ------------------------------ |
| `Any()`      | أول عنصر يحقق الشرط `true`     |
| `All()`      | أول عنصر لا يحقق الشرط `false` |
| `Contains()` | أول عنصر يساوي القيمة المطلوبة |

---
# Grouping

الـ **Grouping Operations** بنستخدمها لما نكون عايزين نقسم الـ Collection إلى **Groups** بناءً على قيمة مشتركة.

أهم حاجة هنا:

- `GroupBy()`
- `IGrouping<TKey, TElement>`

---

## GroupBy()

بتجمع العناصر اللي عندها نفس القيمة في Group واحدة.

مثلاً عندنا:

```cs
var products = new[]
{
    new { Name = "Laptop", Category = "Electronics" },
    new { Name = "Mouse", Category = "Electronics" },
    new { Name = "Chair", Category = "Furniture" },
    new { Name = "Desk", Category = "Furniture" }
};
```

نعمل Grouping:

```cs
var result = products.GroupBy(p => p.Category);
```

الناتج بشكل مفاهيمي:

```text
Electronics
    Laptop
    Mouse

Furniture
    Chair
    Desk
```

يعني:

> `GroupBy()` → يقسم الـ Collection إلى Groups حسب Key مشتركة.

---

## IGrouping

لما تعمل:

```cs
var result = products.GroupBy(p => p.Category);
```

كل Group بتكون من نوع:

```cs
IGrouping<TKey, TElement>
```

وفيها حاجتين مهمين:

### 1. Key

القيمة اللي اتعمل بناءً عليها الـ Group:

```cs
group.Key
```

مثلاً:

```text
Electronics
```

### 2. Elements

العناصر الموجودة جوه الـ Group.

```cs
foreach (var product in group)
{
    Console.WriteLine(product.Name);
}
```

مثال عملي:

```cs
var result = products.GroupBy(p => p.Category);

foreach (var group in result)
{
    Console.WriteLine(group.Key);

    foreach (var product in group)
    {
        Console.WriteLine(product.Name);
    }
}
```

### GroupBy + Aggregation

ده استخدام مهم جدًا:

```cs
var result = products
    .GroupBy(p => p.Category)
    .Select(g => new
    {
        Category = g.Key,
        Count = g.Count(),
        TotalPrice = g.Sum(p => p.Price)
    });
```

يعني:

> جمّع المنتجات حسب الـ Category، وبعدها احسب عدد المنتجات وإجمالي الأسعار لكل Group.

---

# Aggregation

الـ **Aggregation Operations** بتحول مجموعة من العناصر إلى **قيمة واحدة تلخص المجموعة**.

أهم العمليات:

- `Count()`
- `Sum()`
- `Min()`
- `Max()`
- `Average()`
- `Aggregate()`


---

## Count()

بتجيب عدد العناصر.

```cs
var count = products.Count();
```

وممكن مع شرط:

```cs
var count = products.Count(p => p.Price > 1000);
```

يعني:

> عدد المنتجات اللي سعرها أكبر من 1000.

---

## Sum()

بتحسب مجموع القيم.

```cs
var totalStock = products.Sum(p => p.Stock);
```

يعني:

> إجمالي الـ Stock لكل المنتجات.

---

## Min()

بتجيب أقل قيمة.

```cs
var minPrice = products.Min(p => p.Price);
```

يعني:

> أرخص Product.

---

## Max()

بتجيب أكبر قيمة.

```cs
var maxPrice = products.Max(p => p.Price);
```

يعني:

> أغلى Product.

---

## Average()

بتجيب المتوسط الحسابي.

```cs
var averagePrice = products.Average(p => p.Price);
```

مثلاً:

```text
10 + 20 + 30 = 60

60 / 3 = 20
```

يعني المتوسط = `20`.

---

## Aggregate()

`Aggregate()` بتستخدمها لما تكون عايز تعمل **عملية تجميع مخصصة** مش مجرد `Sum` أو `Count`.

مثلاً:

```cs
int[] numbers = { 1, 2, 3, 4 };

var result = numbers.Aggregate((total, number) => total + number);
```

الفكرة:

```text
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
```

الناتج:

```text
10
```

يعني:

> `Aggregate()` بتخليك تحدد بنفسك إزاي العناصر تتجمع.

---

# Set Operations

الـ **Set Operations** بنستخدمها لما نتعامل مع **Sequences / Collections** ونحتاج نجيب:

- القيم الفريدة.
- اتحاد مجموعتين.
- العناصر المشتركة.
- الفرق بين مجموعتين.

- `Distinct()`
- `Union()`
- `Intersect()`
- `Except()`

---

## Distinct()

بتشيل الـ duplicates.

```cs
int[] numbers = { 1, 2, 2, 3, 3, 4 };

var result = numbers.Distinct();
```

الناتج:

```text
1, 2, 3, 4
```

يعني:

> `Distinct()` → خلي كل قيمة تظهر مرة واحدة.

---

## Union()

بتجمع Sequence مع Sequence تانية، **مع إزالة التكرار**.

```cs
int[] first = { 1, 2, 3 };
int[] second = { 3, 4, 5 };

var result = first.Union(second);
```

الناتج:

```text
1, 2, 3, 4, 5
```

فكر فيها:

```text
A ∪ B
```

---

## Intersect()

بتجيب العناصر الموجودة في **المجموعتين**.

```cs
int[] first = { 1, 2, 3 };
int[] second = { 2, 3, 4 };

var result = first.Intersect(second);
```

الناتج:

```text
2, 3
```

فكر فيها:

```text
A ∩ B
```

---

## Except()

بتجيب العناصر الموجودة في الـ **First** ومش موجودة في الـ **Second**.

```cs
int[] first = { 1, 2, 3 };
int[] second = { 2, 3, 4 };

var result = first.Except(second);
```

الناتج:

```text
1
```

يعني:

```text
First - Second
```

---

# Conversion

الـ **Conversion Operations** بنستخدمها علشان نحول نتيجة LINQ إلى Collection أو Data Structure معينة.

أهم العمليات:

- `ToList()`
- `ToArray()`
- `ToDictionary()`
- `ToLookup()`
- `ToHashSet()`

---

## ToList()

تحول النتيجة إلى `List<T>`.

```cs
var result = products
    .Where(p => p.Price > 1000)
    .ToList();
```

الناتج:

```text
List<Product>
```

---

## ToArray()

تحول النتيجة إلى Array.

```cs
var result = products
    .Where(p => p.Price > 1000)
    .ToArray();
```

الناتج:

```text
Product[]
```

---

## ToDictionary()

تحول الـ Collection إلى `Dictionary<TKey, TValue>`.

```cs
var result = products.ToDictionary(p => p.Id);
```

الـ Key هنا هو:

```cs
p.Id
```

وبالتالي:

```cs
var product = result[3];
```

تقدر تجيب الـ Product باستخدام الـ Key.

### مهم

الـ Key لازم يكون **Unique**، وإلا `ToDictionary()` هترمي Exception.

---

## ToLookup()

شبيهة جدًا بـ `ToDictionary`، لكن الفرق الأساسي:

ال
الـ**Dictionary عبارة ال Key واحد مرتبط بقيمة واحدة.**

الـ**Lookup ال Key ممكن يكون مرتبط بأكتر من Element.**

مثلاً:

```cs
var result = products.ToLookup(p => p.Category);
```

تقدر تعمل:

```cs
var electronics = result["Electronics"];
```

وهتجيب كل المنتجات اللي Category بتاعتها `Electronics`.

يعني:

```text
Electronics
    → Laptop
    → Mouse
    → Keyboard

Furniture
    → Chair
    → Desk
```

وده مناسب جدًا للـ **one-to-many grouping**.

---

## ToHashSet()

تحول الـ Sequence إلى `HashSet<T>`.

```cs
var categories = products
    .Select(p => p.Category)
    .ToHashSet();
```

والـ `HashSet` بيهتم بالقيم الفريدة، فمش هتلاقي duplicate categories.

---

# Element Operators

الـ **Element Operators** بنستخدمها علشان نجيب **Element معين** من الـ Sequence.

أهمهم:

- `First()`
- `FirstOrDefault()`
- `Last()`
- `LastOrDefault()`
- `Single()`
- `SingleOrDefault()`
- `ElementAt(n)`


---

## First()

بتجيب أول عنصر.

```cs
var product = products.First();
```

لو الـ Collection فاضية يديلك Exception.

وممكن تستخدم Condition:

```cs
var product = products.First(p => p.Price > 1000);
```

يعني:

> هات أول Product سعره أكبر من 1000.

---

## FirstOrDefault()

نفس `First()`، لكن لو مفيش عنصر مطابق، ترجع الـ **default value** بدل Exception.

```cs
var product = products
    .FirstOrDefault(p => p.Id == 100);
```

لو مفيش Product بالـ Id ده:

```text
null
```

وده شائع جدًا في الـ APIs.

---

## Last()

بتجيب آخر عنصر.

```cs
var product = products.Last();
```

ولو مفيش عناصر يديلك Exception.

---

## LastOrDefault()

بتجيب آخر عنصر، ولو مفيش يديلك default.

```cs
var product = products.LastOrDefault();
```

---

# Single()

`Single()` مختلفة عن `First()`.

هي بتقول:

> **أنا متوقع إن فيه عنصر واحد فقط يحقق الشرط.**

```cs
var product = products.Single(p => p.Id == 5);
```

الحالات:

```text
0 elements → Exception
1 element  → يرجعه
2+ elements → Exception
```

يعني `Single()` بتعمل **validation ضمنية إن النتيجة لازم تكون واحدة فقط**.

---

## SingleOrDefault()

نفس `Single()`، لكن:

```text
0 elements → default
1 element  → يرجعه
2+ elements → Exception
```

مثلاً:

```cs
var product = products
    .SingleOrDefault(p => p.Id == 5);
```


---

## ElementAt(n)

بتجيب العنصر باستخدام الـ Index.

```cs
var product = products.ElementAt(2);
```

الـ Index يبدأ من `0`:

```text
0 → Laptop
1 → Mouse
2 → Keyboard
```

فـ `ElementAt(2)` → `Keyboard`.

لو الـ Index خارج الـ range → Exception.

---

# Generation Operators

الـ **Generation Operators** بتستخدمها علشان **تنشئ Sequence جديدة**.

أهمهم:

- `Range()`
- `Repeat()`
- `Empty<T>()`
- `DefaultIfEmpty()`

---

## Range(Start, Count)

بتولد أرقام متتالية.

```cs
var numbers = Enumerable.Range(1, 5);
```

الناتج:

```text
1, 2, 3, 4, 5
```

الـ parameters:
الـStart يعني ابدا منين
الـCount كام رقم

مثال:

```cs
Enumerable.Range(10, 5);
```

الناتج:

```text
10, 11, 12, 13, 14
```

**مهم:** `Count` عدد العناصر، مش آخر رقم.

---

## Repeat(value, count)

بتكرر نفس القيمة عدد معين من المرات.

```cs
var result = Enumerable.Repeat("Hello", 3);
```

الناتج:

```text
Hello
Hello
Hello
```

مثال مفيد:

```cs
var result = Enumerable.Repeat(0, 5);
```

```text
0, 0, 0, 0, 0
```

---

## Empty()

بتعمل Empty Sequence من Type معين.

```cs
var products = Enumerable.Empty<Product>();
```

الناتج:

```text
[]
```

لكن نوعها:

```text
IEnumerable<Product>
```

مفيدة جدًا لما Method لازم ترجع `IEnumerable<T>` لكن مفيش Data.

---

## DefaultIfEmpty()

دي مختلفة شوية.

بتقول:

> لو الـ Sequence فاضية، حطلي عنصر Default بدل ما تفضل فاضية.

مثلاً:

```cs
int[] numbers = { };

var result = numbers.DefaultIfEmpty();
```

الناتج:

```text
0
```

لأن Default بتاع `int` هو:

```text
0
```

ولو:

```cs
string[] names = { };

var result = names.DefaultIfEmpty();
```

الـ default بتاع `string` هو:

```text
null
```

وممكن تحدد قيمة بنفسك:

```cs
var result = numbers.DefaultIfEmpty(100);
```

لو `numbers` فاضية:

```text
100
```

---

# Sequence Operations

الـ **Sequence Operations** بتتعامل مع Sequence بالنسبة لـ Sequence تانية.

أهمهم:

- `Concat()`
- `Zip()`
- `SequenceEqual()`


---

## Concat()

بتوصل Sequence بعد Sequence تانية **بالترتيب**.

```cs
int[] first = { 1, 2, 3 };
int[] second = { 4, 5, 6 };

var result = first.Concat(second);
```

الناتج:

```text
1, 2, 3, 4, 5, 6
```

### مهم

`Concat()` **مش بتشيل duplicates**.

```cs
int[] first = { 1, 2, 3 };
int[] second = { 3, 4, 5 };

var result = first.Concat(second);
```

الناتج:

```text
1, 2, 3, 3, 4, 5
```

لو عايز تشيل duplicates:

```cs
var result = first
    .Concat(second)
    .Distinct();
```

---

# Zip()

`Zip()` بتجمع **عناصر من Sequence مع عناصر من Sequence تانية حسب الـ Index**.

مثلاً:

```cs
string[] names = { "Ahmed", "Sara", "Ali" };
int[] scores = { 90, 85, 95 };
```

نعمل:

```cs
var result = names.Zip(scores);
```

مفهوميًا:

```text
Ahmed → 90
Sara  → 85
Ali   → 95
```

وممكن تعمل Object جديد:

```cs
var result = names.Zip(scores, (name, score) => new
{
    Name = name,
    Score = score
});
```

الناتج:

```text
Ahmed → 90
Sara  → 85
Ali   → 95
```

يعني:

> `Zip()` → اربط Element من الـ First مع Element من الـ Second حسب نفس الـ Index.

### لو الأطوال مختلفة؟

في الاستخدام المعتاد، الـ result بيقف عند **أقصر Sequence**.

مثلاً:

```text
Names  = Ahmed, Sara, Ali
Scores = 90, 85
```

الناتج:

```text
Ahmed → 90
Sara  → 85
```

`Ali` ملوش مقابل، فمش هيظهر.

---

# SequenceEqual()

بتستخدمها علشان تعرف:

> **هل الـ Sequence الأولى والثانية متساويتين في العناصر والترتيب؟**

```cs
int[] first = { 1, 2, 3 };
int[] second = { 1, 2, 3 };

bool result = first.SequenceEqual(second);
```

الناتج:

```text
true
```

لكن:

```cs
int[] first = { 1, 2, 3 };
int[] second = { 3, 2, 1 };
```

الناتج:

```text
false
```

لأن الترتيب مختلف.

وكمان:

```cs
int[] first = { 1, 2, 3 };
int[] second = { 1, 2 };
```

```text
false
```

# صلى الله على محمد وعلى آله وصحبه وسلم

---
