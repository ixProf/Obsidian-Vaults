---
title: "Query and Fluent Expression"
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

## أولًا: Query Expression (شكل SQL)

ده الشكل اللي شبه SQL جدًا، وبيكون سهل في القراءة خصوصًا للمبتدئين

```csharp
var result = from n in numbers
             where n > 50
             select n;
```

### الفكرة

- `from` → بتحدد الداتا سورس
- `where` → شرط الفلترة
- `select` → إيه اللي هترجعه

### الميزة

- سهل القراءة
- قريب من SQL
- مناسب للـ complex queries اللي فيها join و group
    

---

## ثانيًا: Fluent Expression (Method Syntax)

ده الشكل اللي بيعتمد على الميثودز (extension methods) زي `Where`, `Select`

```csharp
var result = numbers.Where(n => n > 50);
```

### الفكرة

- كل حاجة عبارة عن method
- بيستخدم Lambda Expression
    

الاتنين دول **مش مختلفين فعليًا في التنفيذ**

الـ compiler بيحوّل Query Expression لـ Fluent Expression

يعني الكود ده:

```csharp
from n in numbers
where n > 50
select n;
```

بيتحول لـ:

```csharp
numbers.Where(n => n > 50).Select(n => n);
```

---

## إمتى تستخدم كل واحد؟

### استخدم Query Expression لما:

- عندك `join`
- عندك `group by`
- عايز readability أعلى
    

مثال:

```csharp
var result = from s in students
             join d in departments
             on s.DeptId equals d.Id
             select new { s.Name, d.Name };
```

---

### استخدم Fluent Expression لما:

- شغل بسيط (filter / select)
- عايز flexibility أعلى
- بتستخدم methods كتير زي:

    - `OrderBy`
    - `ThenBy`     
    - `Skip`
    - `Take`


مثال:

```csharp
var result = numbers
            .Where(n => n > 50)
            .OrderBy(n => n)
            .Take(3);
```

---

## الفرق الحقيقي 
### 1. Query Expression محدود

مش كل الميثودز موجودة فيه

مثلاً:

- مفيش `Skip`
    
- مفيش `Take`
    
- مفيش `Aggregate`
    

### 2. Fluent أقوى

بيغطي كل LINQ methods

---

## خلاصة سريعة

|نقطة|Query Expression|Fluent Expression|
|---|---|---|
|الشكل|شبه SQL|Method chaining|
|السهولة|أسهل في القراءة|محتاج تفهم Lambda|
|القوة|محدود شوية|أقوى|
|الاستخدام|joins / grouping|كل حاجة|

---

## Using Select in Fluent Expression

 بص من الاخر، سيلكت انت هتكويري بروبيرتي معينة زي ما بتعمل في SQL يعني مثال

```sql
Select Salary
from Products
where Salary < 500;
```


فالفلونت اكسبريشن، انت ممكن ترجع الاوبجكتس كاملة طبقا للكوندشن الي بتعملها فمثلا:

```cs
public class Product: IComarable<Product>
{
	public Int64 ProductID {get; set;}
	public String ProductName {get; set;}
	public String Category {get; set;}
	public Decimal UnitPrice {get; set;}
	public Int32 UnitsInStock {get; set;}
	public int CompareTo(Product other)
	{
		return UnitPrice.CompareTo(other?.UnitPrice ?? -1);
	}
	public override string ToString()  
	{  
		return $"ProductID: {ProductID}, ProductName: {ProductName}, Category: {Category}, UnitPrice: {UnitPrice}, UnitsInStock: {UnitsInStock}";  
	}
}
```

 دا كلاس المفروض هنستخدمه علشان نعمل داتا معينة

```cs
List<Product> products = new List<Product>
{
    new Product { ProductID = 1, ProductName = "Laptop", Category = "Electronics", UnitPrice = 15000m, UnitsInStock = 10 },
    new Product { ProductID = 2, ProductName = "Mouse", Category = "Electronics", UnitPrice = 200m, UnitsInStock = 50 },
    new Product { ProductID = 3, ProductName = "Keyboard", Category = "Electronics", UnitPrice = 500m, UnitsInStock = 30 },
    new Product { ProductID = 4, ProductName = "Desk", Category = "Furniture", UnitPrice = 3000m, UnitsInStock = 5 },
    new Product { ProductID = 5, ProductName = "Chair", Category = "Furniture", UnitPrice = 1200m, UnitsInStock = 15 },
    new Product { ProductID = 6, ProductName = "Notebook", Category = "Stationery", UnitPrice = 50m, UnitsInStock = 100 },
    new Product { ProductID = 7, ProductName = "Pen", Category = "Stationery", UnitPrice = 10m, UnitsInStock = 200 },
    new Product { ProductID = 8, ProductName = "Monitor", Category = "Electronics", UnitPrice = 4000m, UnitsInStock = 8 },
    new Product { ProductID = 9, ProductName = "Headphones", Category = "Electronics", UnitPrice = 800m, UnitsInStock = 25 },
    new Product { ProductID = 10, ProductName = "Printer", Category = "Electronics", UnitPrice = 2500m, UnitsInStock = 6 }
};
```

علشان تستخدم بقى على الفلونت اكسبرشن:

```cs
var result = products.Where(p => p.UnitPrice > 1000);

foreach (var item in result)
{
    Console.WriteLine(item);
}

```

هنا في الحالة دي هو هيعرض ال Products المطبق  الكوندشن

```output
ProductID: 1, ProductName: Laptop, Category: Electronics, UnitsInStock: 10
ProductID: 4, ProductName: Desk, Category: Furniture, UnitsInStock: 5
ProductID: 5, ProductName: Chair, Category: Furniture, UnitsInStock: 15
ProductID: 8, ProductName: Monitor, Category: Electronics, UnitsInStock: 8
ProductID: 10, ProductName: Printer, Category: Electronics, UnitsInStock: 6
```


- لو انت عايز تجيب حاجة معينة وليكن عايز تجيب البرودكت نيم فهتستخدم هنا ال Select فهيبقى الشكل كدا 

```cs
var result = products.Where(p => p.UnitPrice > 1000)
.Select(p => p.ProductName);

foreach (var item in result)
{
    Console.WriteLine(item);
}

```

فالحالة دي الاوتبوت هتبقى 

```cs
Laptop
Desk
Chair
Monitor
Printer
```

فشوفت الحالة دي هتعرض اسم البرودكتس.

وتقدر انك تعمل كويري لحاجتين مع بعض عادي جدا بإنك تعمل انينموس تايب فالسيلكت

```cs
	var result = products.Where(p => p.UnitPrice > 1000)
.Select(p => new {p.ProductID, p.ProductName});
```

هنا هيجيبلك الايدي والنيم كمان

وكمان تقدر تسميه بإسم جديد بحيث انه يتعرضلك بإسم جديد عن طريق تكتب الاسم الي عايز تسميه فالأول 

وليكن انت عايز الايدي والنيم يتحطوا تحت مسمى واحد وهو ال data

```cs
var result = products.Where(p => p.UnitPrice > 1000)
.Select(p => p => new {data = p.ProductID+" "+ p.ProductName});
```

## LINQ Methods:

- OrderBy
بص دي بترتب ترتيب تصاعدي Ascending لكن لو عايز ترتب ترتيب تنازلي، هتخليها بميثود تانية 
 - OrderByDescending

وممكن كمان تعمل اوردر باي بإتنين بروبيرتي ازاي بقى؟

```cs
var result = products.Where(a => a.UnitsInStock >= 25)
.OrderBy(a => a.UnitPrice)
.ThenBy(a => a.UnitsInStock);
```

هنا هيتم الترتيب على ناحيتين
هيترتب تصاعديا بالنسبة للسعر و كمان بالنسبة لعدد البرودكتس ف الاوتبوت هيبقى بالشكل دا

```css
ProductID: 7, ProductName: Pen, Category: Stationery, UnitPrice: 10, UnitsInStock: 200
ProductID: 6, ProductName: Notebook, Category: Stationery, UnitPrice: 50, UnitsInStock: 100
ProductID: 2, ProductName: Mouse, Category: Electronics, UnitPrice: 200, UnitsInStock: 50
ProductID: 3, ProductName: Keyboard, Category: Electronics, UnitPrice: 500, UnitsInStock: 30
```


ملحوظة انا بعمل الاوتبوت كدا علشان الشكل مش اكتر ويكون مميز : css

زي ما هو موضح كدا انت شايف انها اترتبت، بناءا على ال OrderBy بس! 
طب و ThenBy ؟

- امتى تشتغل ال ThenBy: لو في اتنين ليهم نفس السعر ساعتها هيتم النظر لترتيب تاني 

ابسطهالك في الدوري الانجليزي زي ما بيحصل دلوقتي او هيحصل إن شاء الله، بيتم ترتيب الدوري بالنقاط، طب لو النقاط متساوية؟  هنبص على فرق الاهداف طب لو متساوية ؟ هنبص على الاهداف الي مسجله اكتر، لو متساوية ؟ ، هنبص على المواجهات المباشرة ، تعادلوا في الماتشين بقى، هنبص على عدد الكروت او ما يسمى بال Fair Play

ففحالتنا الي بيحصل حاليا بين ارسنال والسيتي، متساويين فالنقاط وفرق الاهداف بس السيتي جايب اهداف اكتر فعلشان كدا لو اتصدر الدوري واتسووا بالنقاط وفرق الاهداف، الدوري هيبقى للسيتي علشان جايبين اهداف اكتر!

**الترتيب الأساسي: النقاط (OrderBy)
الترتيب الثانوي: باقي المعايير (ThenBy)**

فـأنت تقدر تحط معايير للترتيب بال ThenBy براحتك ولو حاببها Descending  ففي ميثود اسمها ThenByDescending();

> ملحوظة لو عايز تستخدم ال query Expression وتطبق المثال دا؟ فمش هتحتاج انك تكتب ThenBy فليه؟ +
