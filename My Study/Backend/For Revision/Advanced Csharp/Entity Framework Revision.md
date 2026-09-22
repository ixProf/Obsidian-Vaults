> يلا بينا نشغبط

هنتكلم النهاردة عن اهمية ال ORM فحياة الديفيلوبر الفقير الي زي حالتي وحالتك كدا
اول حاجه 
# 1. يعني ايه ORM ؟

بص يا صحبي كلمة ORM هي اختصار لكلمة Object-Relational Mapping، وهي طريقة بنستخدمها للتعامل مع الداتابيز بإستخدام ال Objects ، بدل ما اكتب كود SQL، ال ORM بيحول الكود الي بكتبه ل SQLDF
قبل ال ORM

```CS
var sql = "SELECT Id, Name, Email FROM Users WHERE Id =@id";
using var cmd = new SqlCommand(sql, connection);
cmd.Parameters.AddWithValue("@id", userId);

using var reader = cmd.ExecuteReader();
if(reader.Read()){
	var user = new User
	{
		Id = reader.GetInt32(0);
		Name = reader.GetString(1);
		Email = reader.GetString(2);
	};
}
```

بالـORM بقى ؟

```CS
var user = await _context.Users.FindAsync(userId);

var user = await _context.Users
	.Where(u => u.Id == userId)
	.FirstOrDefaultAsync();
```

الامر يتحل بتلات سطور بس!!!

وتعالى نشوف مع بعض التيبول العادي الي في الداتابيز بيكافئه اي في ال /#C 

![[Pasted image 20260922044758.png]]

```cs
public class User
{
	public int Id {get; set;}
	public string Name {get; set;}
	public string Email {get; set;}
	public int DepartmentId {get; set;}
	
	public Department Department {get; set;} // Navigation Property
}
```

فوائد ال ORM ؟

- من ==ناحية الانتاجية== فهي هتوفر عليك كتابة الكود وهتكتب كود قليل، وهتركز على ال Business Logic

- اما بقى من ناحية الType Safety فعندك هيكون الchecking في ال Compile Time

- من ناحية ال Maintainability فهيكون سهل في التعديل والتطوير

- الـDatabase Independence بانت بتعمل switch لل database مع عدد قليل من تغييرات الكود

- الـ**Change Tracking تتبع التغييرات**
    
    - الـ ORM بيتابع الـ entities اللي جبتها من الـ DB.
    - لو عدّلت property فيها، EF Core يعرف إن الـ object اتغير.
    - ولما تعمل `SaveChanges()` بيولّد `UPDATE` تلقائيًا.
    
    ```cs
    var student = db.Students.First();
    student.Name = "Ahmed";
    
    db.SaveChanges(); // EF generates UPDATE
    ```
    
- الـ**LINQ Integration — التكامل مع LINQ**
    
    - تقدر تتعامل مع الـ Database باستخدام C# وLINQ بدل ما تكتب SQL بنفسك.
    
    ```cs
    var students = db.Students
        .Where(s => s.Age > 20)
        .OrderBy(s => s.Name)
        .ToList();
    ```
    
    والـ EF Core بيحوّل الـ LINQ دي إلى SQL ويرسلها للـ Database.

عيوب ال ORM ؟

- الـ**Performance Overhead**
    - فيه abstraction layer بين الكود والـ Database.
    - الـ ORM بيعمل حاجات إضافية زي tracking وquery translation.
    - علشان كدا في بعض الحالات ممكن يكون أبطأ من SQL مكتوب ومضبوط يدويًا.
    
- احتياجك لتعلم المفاهيم الإضافية
    - مش كفاية تعرف C# وSQL.
    - لازم تفهم حاجات زي:
        - الـChange Tracking
        - الـ`Include`
        - الـLazy/Eager Loading
        - الـ`AsNoTracking`
        - الـN+1 Problem
        - الـLINQ → SQL translation
- الكويريز المعقدة
    - أحيانًا Query معقدة جدًا يكون التعامل معاها بـ LINQ أصعب أو أقل كفاءة.
    - ساعتها ممكن تستخدم **Raw SQL** بدل ما تحاول تجبر الـ ORM يعمل كل حاجة

---
# 2. الـ Entity Framework Core Approaches

عندك طريقتين أساسيين لتطوير الـ **Data Models** والتعامل مع الـ Database باستخدام **EF Core**:

## 1. الـ Database First

هنا **الـ Database هي نقطة البداية**.
يعني بتكون عندك Database موجودة بالفعل، فيها:

- Tables
- Columns
- Relationships
- Constraints

وبتخلي **EF Core يعمل Generate للـ C# Models والـ DbContext** بناءً على الـ Database الموجودة.

### الشكل ببساطة:

```text
Existing Database
       ↓
   EF Core
       ↓
C# Models + DbContext
```

مثلاً عندك Database فيها:

```text
Students
----------------
Id
Name
Age
```

تقدر تعمل Scaffold، وEF Core يولد لك Model:

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
}
```

وكمان يولد `DbContext`.

### إمتى تستخدم Database First؟

مناسب لما:

- الـ Database **موجودة بالفعل**.
- بتشتغل على **Legacy Database**.
- الـ Database معمولة بواسطة **Database Administrator** أو فريق تاني.
- الـ Database هي الـ **Source of Truth** ومش إنت اللي بتصممها.


### أهم نقطة

في Database First:

> **Database → Code**

يعني الـ Database هي الأساس، والكود بيتولد بناءً عليها.

---

## 2. الـ Code First

هنا العكس تمامًا.
**الكود هو نقطة البداية**.
إنت بتعمل الـ C# Models بنفسك:

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
}
```

وبتعمل `DbContext`:

```csharp
public class AppDbContext : DbContext
{
    public DbSet<Student> Students { get; set; }
}
```

وبعد كده EF Core بيستخدم الـ Models والـ Configurations عشان **ينشئ الـ Database والـ Tables**.

### الشكل:

```text
C# Models
    ↓
EF Core
    ↓
Database
```

مثلاً:

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

EF Core يقدر ينشئ Table زي:

```text
Students
----------------
Id
Name
```

ولو عدلت الـ Model بعد كده، تقدر تستخدم **Migrations** لتطبيق التغييرات على الـ Database.

```text
Model Changes
      ↓
Migration
      ↓
Database Update
```

مثلاً تضيف:

```csharp
public string Email { get; set; }
```

وتعمل Migration:

```bash
dotnet ef migrations add AddStudentEmail
```

وبعدين:

```bash
dotnet ef database update
```

فيتضاف `Email` للـ Table.

### إمتى تستخدم Code First؟

مناسب لما:

- بتبدأ **Project جديد**.
- إنت اللي بتصمم الـ Domain Models والـ Database.
- عايز تتحكم في الـ Database من خلال الكود.
- بتستخدم **Migrations** لإدارة تغييرات الـ Database

### أهم نقطة

في Code First:

> **Code → Database**

يعني الـ C# Models هي الأساس، والـ Database بتتبني بناءً عليها.

---

## الفرق بينهم بسرعة

|Database First|Code First|
|---|---|
|تبدأ من Database|تبدأ من C# Code|
|Database موجودة بالفعل|Database غالبًا جديدة|
|EF يولد Models|إنت بتكتب Models|
|`Database → Code`|`Code → Database`|
|مناسب للـ Legacy DB|مناسب للمشاريع الجديدة|
|يعتمد على Scaffolding|يعتمد على Migrations|

---
# 3. Entity Framwork Architecture

![[Pasted image 20260922053546.png]]

هنا ال EF بتعتبر انها جسر ما بين ال Application بتاعك وال Database 
فهي بإختصار بتحول ال LINQ ل SQL

## ازاي ال Entity Framework بتشتغل على الQuery

عندك مثال زي كدا:
```CS
var users = await _context.Users
	.Where(u => u.IsActive && u.Age > 18)
	.OrderBy(u => u.Name)
	.ToListAsync();
```

اي الخطوات الي بتحصل ؟

1. بدأ يحلل الـ **LINQ Expression Tree**
2. بيترجم الـ **LINQ لـ SQL** بواسطة الـ **Database Provider**
3. بينفذ الـ **SQL** على الـ **Database**
4. بياخد الـ **Results** وبيحوّلها لـ **C# Objects**
5. بيعمل **Change Tracking** للـ Entities لو الـ Tracking مفعّل

فلما بيحول بقى

```sql
-- EF Core generates this SQL:
SELECT [u].[Id], [u].[Name], [u].[Email], [u].[Age], [u].[IsActive]
FROM [Users] AS [u]
WHERE [u].[IsActive] = 1 AND [u].[Age] > 18
ORDER BY [u].[Name]
```

---

# 4. DbContext

الـ **DbContext** هو الـ **Central Class** في EF Core، وبيمثل **Session / Connection** بين الـ Application والـ Database.

ومن خلاله بتقدر:
- تعمل **Query** على الـ Database.
- تعمل **Insert / Update / Delete** للـ Entities.
- تعمل **Save Changes** على الـ Database.
- تعمل **Configuration** للـ Entities والـ Database.

ابسط Structure لل DbContext

```cs
public class ApplicationDbContext : DbContext
{
	// Constructor — receives options from DI
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
	{
		
	}
	
	// DbSet - Each represents a database table
	public DbSet<User> Users {get; set;}
	public DbSet<Product> Products {get; set;}
	public DbSet<Order> Orders {get; set;}
	public DbSet<Category> Categories {get; set;}
	
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		// Configure entity mappings
		modelBuilder.ApplyConfigurationsFromAssembly(
			Assembly.GetExecutingAssembly()
		);
	}
}
```

Entity Classes
```cs
public class User
{
    public int Id { get; set; }           // Primary Key (by convention)
    public string Name { get; set; }
    public string Email { get; set; }
    public bool IsActive { get; set; }
    
    // Navigation Properties
    public ICollection<Order> Orders { get; set; }
}
```

متيجي نشرح ال Structure ؟

الـ **DbContext Structure** تقدر تفهمه كده:

```csharp
public class ApplicationDbContext : DbContext
```

- بتعمل Class اسمه `ApplicationDbContext`.
- وبتعمل له **Inheritance من `DbContext`**.
- وده اللي بيديك كل الـ APIs الخاصة بـ EF Core للتعامل مع الـ Database.

 1. Constructor

```csharp
public ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options)
    : base(options)
{
}
```

- الـ **Constructor** بيستقبل الـ `DbContextOptions`.
- الـ Options دي بتحتوي على إعدادات الـ DbContext، زي:
    
    - Database Provider
    - Connection String
    - وغيرها من الإعدادات.
- الـ`: base(options)` بيبعت الـ Options للـ **DbContext الأساسي**.

وغالبًا الـ `DbContext` بيتم إنشاؤه عن طريق **Dependency Injection (DI)**.

2. DbSets

```csharp
public DbSet<User> Users { get; set; }
public DbSet<Product> Products { get; set; }
public DbSet<Order> Orders { get; set; }
public DbSet<Category> Categories { get; set; }
```

- كل `DbSet<T>` بيمثل **Entity Set** في EF Core.
- وغالبًا بيكون مرتبط بـ **Table** في الـ Database.
- ومن خلاله تقدر تعمل Queries وعمليات **CRUD**.

مثلاً:

```csharp
context.Products
```

تقدر تستخدمها عشان تعمل Query على الـ `Products`.

> مش شرط اسم الـ `DbSet` يكون هو اسم الـ Table حرفيًا؛ ممكن تحدد اسم الـ Table باستخدام الـ Configuration.
3. OnModelCreating

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
```

دي Method بيستخدمها EF Core أثناء **بناء الـ Model**.
ومن خلالها تقدر تعمل **Configuration** للـ Entities باستخدام **Fluent API**.

مثلاً:

```csharp
modelBuilder.Entity<Product>()
    .Property(p => p.Name)
    .IsRequired();
```

يعني بتحدد قواعد الـ Entity والـ Relationships والـ Constraints وغيرها.

4. ApplyConfigurationsFromAssembly

```csharp
modelBuilder.ApplyConfigurationsFromAssembly(
    Assembly.GetExecutingAssembly());
```

دي بتخلي EF Core يدور تلقائيًا على كل الـ Classes اللي فيها **Entity Configurations** داخل الـ Assembly الحالي ويطبقها.

بدل ما تعمل:

```csharp
modelBuilder.ApplyConfiguration(new UserConfiguration());
modelBuilder.ApplyConfiguration(new ProductConfiguration());
modelBuilder.ApplyConfiguration(new OrderConfiguration());
```

ممكن تستخدم:

```csharp
modelBuilder.ApplyConfigurationsFromAssembly(
    Assembly.GetExecutingAssembly());
```

وهو يكتشفهم تلقائيًا.

---
# 5. Provider Model — Speaking SQL Dialects

الـ **Provider** في EF Core هو المسؤول عن **التعامل مع نوع الـ Database اللي إنت مستخدمها**.

يعني EF Core بيخليك تكتب نفس الـ **LINQ Query**، والـ Provider هو اللي بيترجمها للـ **SQL Dialect** المناسب للـ Database.

مثلاً:

```csharp
context.Products.Where(p => p.Price > 100)
```

الـ LINQ نفسها ممكن تكون واحدة، لكن الـ Provider هو اللي يحدد **إزاي تتترجم للـ Database**.

|Database|NuGet Package|Use Case|
|---|---|---|
|**SQL Server**|`Microsoft.EntityFrameworkCore.SqlServer`|Enterprise, Azure|
|**PostgreSQL**|`Npgsql.EntityFrameworkCore.PostgreSQL`|Open source, JSON support|
|**SQLite**|`Microsoft.EntityFrameworkCore.Sqlite`|Mobile, Testing, Embedded|
|**MySQL**|`Pomelo.EntityFrameworkCore.MySql`|Web Hosting, LAMP Stack|
|**In-Memory**|`Microsoft.EntityFrameworkCore.InMemory`|Unit Testing|
|**Cosmos DB**|`Microsoft.EntityFrameworkCore.Cosmos`|NoSQL, Azure|

```cs
// Your C# code (same for all databases)
var users = await _context.Users
    .Where(u => u.Name.Contains("Ahmed"))
    .Take(10)
    .ToListAsync();
```

```sql
-- SQL Server
SELECT TOP(10) [u].[Id], [u].[Name], [u].[Email]
FROM [Users] AS [u]
WHERE [u].[Name] LIKE N'%Ahmed%'

-- PostgreSQL
SELECT u."Id", u."Name", u."Email"
FROM "Users" AS u
WHERE u."Name" LIKE '%Ahmed%'
LIMIT 10

-- MySQL
SELECT `u`.`Id`, `u`.`Name`, `u`.`Email`
FROM `Users` AS `u`
WHERE `u`.`Name` LIKE '%Ahmed%'
LIMIT 10
```

---
# 6. Initial Setup — NuGet Packages

قبل ما تستخدم **Entity Framework Core**، لازم تضيف الـ Packages المناسبة للمشروع.

لو شغال مع **SQL Server**، أهم Package هي:

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

دي بتضيف الـ **SQL Server Provider**، وده المسؤول عن إن EF Core يعرف يتعامل مع SQL Server ويترجم الـ LINQ إلى SQL مناسب ليه.

ولو هتستخدم **Migrations** وأدوات التصميم:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Design
```

ولو هتستخدم أوامر EF Core من الـ Terminal:

```bash
dotnet tool install --global dotnet-ef
```

### يعني كل Package مسؤولة عن إيه؟

```text
Microsoft.EntityFrameworkCore => Core functionality

Microsoft.EntityFrameworkCore.SqlServer => SQL Server Provider

Microsoft.EntityFrameworkCore.Design => Design-time features مثل Migrations

dotnet-ef => EF Core CLI Commands
```

> الـ Packages اللي تحتاجها بتختلف حسب الـ Database والـ Project Type، لكن الفكرة الأساسية إنك بتضيف الـ Provider الخاص بالـ Database اللي بتستخدمها.

---

# 7. Console App — Configuration Approaches

في ASP.NET Core، الـ `DbContext` غالبًا بيتعمله Configuration من خلال **Dependency Injection**.

لكن في **Console Application** مفيش الـ ASP.NET Core infrastructure بنفس الشكل، فمحتاج تحدد بنفسك:

- الـ Database Provider
- الـ Connection String
- إعدادات الـ DbContext
    

وعندك طريقتين شائعتين.

---

## Approach 1 — `OnConfiguring()`

هنا بتحط إعدادات الـ Database **جوا الـ DbContext نفسه**.

```csharp
public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(
        DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=.;Database=ShopDb;Trusted_Connection=True;");
    }
}
```

 إيه اللي حصل؟
الـ:
```csharp
DbContextOptionsBuilder
```

بيستخدم عشان تحدد إعدادات الـ Context.
وبتقول له:

```csharp
optionsBuilder.UseSqlServer(...)
```

يعني:

> استخدم SQL Server كـ Database Provider. وبتديله الـ Connection String.

### مميزات الطريقة

- بسيطة جدًا.
- مناسبة للتجارب والمشاريع الصغيرة.
- مش محتاج تعمل Configuration بره الـ Context.

### عيب مهم

الـ Connection String موجود جوه الـ `DbContext` نفسه، وده مش أفضل اختيار في المشاريع الكبيرة.

---

## Approach 2 — `DbContextOptionsBuilder`

هنا بتفصل الـ **Configuration عن الـ DbContext**.

الـ Context نفسه:

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}
```

وبعدين في الـ `Program` مثلًا:

```csharp
var options =
    new DbContextOptionsBuilder<ApplicationDbContext>()
        .UseSqlServer(connectionString)
        .Options;

using var context =
    new ApplicationDbContext(options);
```

### اللي حصل هنا

أولًا عملنا:
```csharp
DbContextOptionsBuilder<ApplicationDbContext>
```

وده مسؤول عن بناء الـ Options الخاصة بالـ `ApplicationDbContext`.

بعد كده:
```csharp
.UseSqlServer(connectionString)
```

حددنا الـ Provider والـ Connection String.

وبعدين:
```csharp
.Options
```

أخذنا الـ Options النهائية.

وأخيرًا مررناها للـ Context:
```csharp
new ApplicationDbContext(options)
```

### ليه الطريقة دي مهمة؟

لأن الـ `DbContext` نفسه مش محتاج يعرف:

- Connection String إيه.
- هتستخدم SQL Server ولا PostgreSQL.
- Configuration جاية منين.

هو فقط يستقبل الـ Options الجاهزة.

==وده قريب جدًا من الطريقة اللي بنستخدمها مع **Dependency Injection** في ASP.NET Core.==

---

# 8. DbContext Lifetime in Console App

الـ `DbContext` مش المفروض يبقى Object عايش طول عمر البرنامج بدون سبب.

هو بيمثل **Session قصيرة** مع الـ Database.

مثلاً:

```csharp
using var context = new ApplicationDbContext(options);

var products = context.Products.ToList();
```

هنا:

```text
Create Context
Query Database
Work with Entities
Save Changes
Dispose Context
```

لما الـ `using` يخلص، الـ Context بيتعمله:

```csharp
Dispose()
```

### ليه الـ Lifetime مهم؟

لأن الـ `DbContext` بيحتفظ بحاجات في الذاكرة، أهمها:

- Entities اللي بيتابعها.
- Change Tracking information.
- Internal state.
- Database-related resources.

فلو خليت Context واحد يعيش لفترة طويلة جدًا، ممكن الـ Change Tracker يتضخم وتبدأ تظهر مشاكل في الأداء وإدارة الـ State.

### القاعدة البسيطة

> **استخدم DbContext لفترة قصيرة نسبيًا، اعمل الـ Operations المطلوبة، وبعدها تخلص منه.**

---

# 9. `DbSet<T>`

الـ `DbSet<T>` بيمثل **مجموعة من Entities من نوع معين** داخل الـ `DbContext`.

مثلاً:
```csharp
public DbSet<Product> Products { get; set; }
```

هنا:
```text
Product => DbSet<Product> => Products
```

ومن خلاله تقدر تتعامل مع الـ `Product` Entities.
 Query
```csharp
var products = context.Products.ToList();
```
 Insert
```csharp
context.Products.Add(product);
```
Update
```csharp
product.Price = 500;
```

لو الـ Entity متتبعة بواسطة الـ Context.
Delete
```csharp
context.Products.Remove(product);
```

وبعدين:
```csharp
context.SaveChanges();
```

عشان التغييرات تتكتب فعليًا في الـ Database.

الـ `DbSet<T>` مش معناه بالضرورة إن اسم الـ Table في الـ Database لازم يكون:
```text
Products
```

ممكن تحدد اسم مختلف باستخدام Configuration.

---

# 10. Change Tracker — The Memory of DbContext

من أهم الأفكار في EF Core.

الـ **Change Tracker** ==مسؤول عن متابعة الـ Entities اللي الـ `DbContext` بيتعامل معاها، ومعرفة الـ State الخاصة بكل Entity.==

مثلاً:

```csharp
var product = context.Products.First();
```
EF Core جاب الـ Product من الـ Database وبدأ يتتبعه.

في البداية:
```text
State = Unchanged
```
لو عملت:
```csharp
product.Price = 500;
```
هنا الـEF Core يكتشف إن الـ Entity اتغيرت:

```text
State = Modified
```
وبعدين:
```csharp
context.SaveChanges();
```
هنا EF Core يعرف إن فيه تعديل حصل، فيولد SQL مناسب مثل:

```sql
UPDATE Products
SET Price = 500
WHERE Id = 1;
```

### الـ Entity States
أهم الحالات:

|State|معناها|
|---|---|
|`Added`|Entity جديدة وهتعمل `INSERT`|
|`Unchanged`|مفيش تغييرات|
|`Modified`|حصل تعديل وهتعمل `UPDATE`|
|`Deleted`|Entity هتتمسح|
|`Detached`|الـ Context مش بيتتبع الـ Entity|

### مثال كامل
```csharp
var product = new Product
{
    Name = "Laptop",
    Price = 30000
};

context.Products.Add(product);
```
الـ State:
```text
Added
```
ثم:
```csharp
context.SaveChanges();
```
EF Core يعمل:
```sql
INSERT INTO Products ...
```

---
# 11. Ways to Configure Entities

عندك 3 طرق أساسية تقول بيهم لـ EF Core إزاي الـ Entity المفروض تتعامل مع الـ Database.

```text
1. Conventions
2. Data Annotations
3. Fluent API
```

---
## الـ6.1 Conventions

دي القواعد اللي EF Core بيطبقها **تلقائيًا** بناءً على شكل الـ Entity.

مثلاً:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

EF Core غالبًا يفهم إن:

```text
Id => Primary Key
Product => Entity
```

وكمان بيستنتج حاجات معينة من أسماء الـ Properties والـ Types.
### الميزة
مش محتاج تكتب Configuration لكل حاجة.
يعني:

> الـ**EF Core يفهم القواعد الشائعة تلقائيًا.**

---

## الـ6.2 Data Annotations

هنا بتستخدم **Attributes** على الـ Entity أو الـ Properties.

مثلاً:
```csharp
public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
}
```

هنا قلنا: ان الاسم مطلوب وكمان ميتعداش طوله ال 100
ومن أشهر الـ Attributes:

```csharp
[Key]
[Required]
[MaxLength(100)]
[Column("ProductName")]
[Table("Products")]
```
### الميزة
سهلة وسريعة.
### العيب
الـ Configuration بتبقى **داخل الـ Entity نفسها**، ومع المشاريع الكبيرة ممكن الـ Models تبدأ تحتوي على Configuration كتير.

---

## الـ6.3 Fluent API الاهم والاكثر شيوعا

هنا بتعمل Configuration باستخدام `ModelBuilder`.

مثلاً:

```csharp
protected override void OnModelCreating(
    ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>()
        .Property(p => p.Name)
        .IsRequired()
        .HasMaxLength(100);
}
```

بدل ما تحط Attributes داخل الـ Entity، بتخلي الـ Configuration في الـ `DbContext`.

وفي المشاريع الكبيرة ممكن تفصلها:

```csharp
public class ProductConfiguration
    : IEntityTypeConfiguration<Product>
{
    public void Configure(
        EntityTypeBuilder<Product> builder)
    {
        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);
    }
}
```

وبعدين:

```csharp
modelBuilder.ApplyConfigurationsFromAssembly(
    Assembly.GetExecutingAssembly());
```

### ليه Fluent API مهمة؟

لأنها بتديك تحكم كبير في:

- Relationships
- Primary Keys
- Foreign Keys
- Constraints
- Indexes
- Table names
- Column names
- Default values
- Precision
- وغيرها

 مقارنة طرق الـ Configuration

| الطريقة              | الفكرة                                    |
| -------------------- | ----------------------------------------- |
| **Conventions**      | EF Core يستنتج الـ Configuration تلقائيًا |
| **Data Annotations** | Configuration باستخدام Attributes         |
| **Fluent API**       | Configuration باستخدام C# Code            |

### إمتى نستخدم الـ Fluent API؟

الـ **Fluent API** بنستخدمه لما نحتاج نحدد للـ EF Core بشكل واضح إزاي الـ **Entities** بتاعتنا مرتبطة ببعض وإزاي هتتخزن في الـ Database.

الـ Conventions ممكن تفهم العلاقات البسيطة تلقائيًا، لكن بنحتاج Fluent API خصوصًا لما يكون عندنا:

- لو Relationship معقدة أو مش واضحة للـ EF Core.
- أكتر من **Foreign Key** بين نفس الـ Entities.
- تحديد هل الـ Relationship **Required أو Optional**.
- تحديد مكان الـ **Foreign Key**.
- تحديد سلوك الحذف `DeleteBehavior`.
- **Composite Keys**.
- **Many-to-Many** مع Join Entity.
- **Many-to-Many مع Payload**.
- **Self-Referencing Relationships**.

وغالبًا بنكتب الـ Configuration داخل:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
}
```

أو الأفضل في المشاريع الكبيرة نستخدم:

```csharp
IEntityTypeConfiguration<T>
```
دي هتتفصل في كلاس لوحده 

---

# 12. The Migration Lifecycle

الـ **Migration** هي طريقة EF Core في تسجيل التغييرات اللي بتحصل في الـ Model وتحويلها لتغييرات على الـ Database Schema.

مثلاً بدأت بـ:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

وعملت Migration:

```bash
dotnet ef migrations add InitialCreate
```

هنا الـEF Core ينشئ Migration تحتوي على العمليات المطلوبة علشان تعمل الـ Database Schema.

بعد كده لو أضفت:

```csharp
public decimal Price { get; set; }
```

الـ Model اتغير.

فتعمل Migration جديدة:

```bash
dotnet ef migrations add AddProductPrice
```

وبعدين تطبقها:

```bash
dotnet ef database update
```

---

# 13. Migration Lifecycle بالترتيب

احفظ الـ Flow ده:

```text
1. Change Model
2. Add Migration
3. Migration File
4. Update Database
5. Database Schema Changes
```

### مثال

```text
Product
Id
Name
```

تضيف:

```text
Price
```

ثم:

```bash
dotnet ef migrations add AddProductPrice
```

ثم:

```bash
dotnet ef database update
```

فتتغير الـ Database:

```text
Products
----------------
Id
Name
Price
```

---

# 14. Migration Commands: CLI vs PMC

فيه طريقتين أساسيتين لتشغيل EF Core Commands.

## .NET CLI

من الـ Terminal:

```bash
dotnet ef migrations add InitialCreate
```

```bash
dotnet ef database update
```

```bash
dotnet ef migrations remove
```

```bash
dotnet ef migrations list
```

---

## Package Manager Console — PMC

داخل Visual Studio:

```powershell
Add-Migration InitialCreate
```

```powershell
Update-Database
```

```powershell
Remove-Migration
```

```powershell
Get-Migration
```

نفس العمليات، لكن الـ Interface والـ Commands مختلفين.

|العملية|CLI|PMC|
|---|---|---|
|Add Migration|`dotnet ef migrations add`|`Add-Migration`|
|Update Database|`dotnet ef database update`|`Update-Database`|
|Remove Migration|`dotnet ef migrations remove`|`Remove-Migration`|
|List Migrations|`dotnet ef migrations list`|`Get-Migration`|

---

# 15. Migration History Table

لما تعمل:

```bash
dotnet ef database update
```

الـEF Core محتاج يعرف:

> إيه الـ Migrations اللي اتطبقت بالفعل على الـ Database؟

عشان كده بيعمل Table خاصة بتتبع الـ Migrations، واسمها الافتراضي:

```text
__EFMigrationsHistory
```

مثلاً ممكن تحتوي على:

|MigrationId|ProductVersion|
|---|---|
|`202609220500_InitialCreate`|`9.x.x`|
|`202609220510_AddProductPrice`|`9.x.x`|

### ليه الجدول دي مهمة؟

لما تعمل:
```bash
dotnet ef database update
```
الـEF Core يبص على:
```text
__EFMigrationsHistory
```

ويعرف الـ Migrations اللي اتطبقت بالفعل.
لو عندك:

```text
Migration 1 → Applied
Migration 2 → Applied
Migration 3 → Not Applied
```

هيطبق الـ Migration المطلوبة ويحدث الـ History Table.

---
# 16. Key Mapping

الـ **Key** هو اللي بيحدد إزاي الـ Entity هتتعرف بشكل Unique داخل الـ Database.
عندنا أهم أنواع الـ Keys:
- Primary Key
- GUID
- Composite Key
- Foreign Key

## 1. Primary Key

الـ **Primary Key** هو الـ Column اللي بيميز كل Record عن التاني.

مثلاً:

```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

هنا EF Core غالبًا هيعتبر `Id` تلقائيًا **Primary Key** بسبب الـ Convention.

لكن باستخدام Fluent API نقدر نحددها بشكل صريح:

```csharp
builder.HasKey(s => s.Id);
```

### الفكرة

```text
Student
----------------
Id       => PK
Name
Age
```

كل Student لازم يكون عنده `Id` مختلف.

### ليه نستخدم Fluent API هنا؟

لو اسم الـ Primary Key مش مطابق للـ Conventions، أو عايزين نكون explicit في الـ Configuration.

---

## 2. GUID as Primary Key

ممكن بدل `int` نستخدم `Guid`.

```csharp
public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
```

ونحدد الـ Primary Key:

```csharp
builder.HasKey(u => u.Id);
```

الـ GUID بيكون قيمة Unique جدًا، مثل:

```text
3f2504e0-4f89-41d3-9a0c-0305e82c3301
```

### إمتى ممكن نستخدم GUID؟
مفيد لما:

- محتاج IDs صعب تخمينها.
- عندك Distributed Systems.
- الـ IDs ممكن تتولد من أكتر من Service.

لكن مش معنى كده إن GUID أفضل دائمًا من `int`؛ كل واحد له استخداماته واعتباراته.

---

## 3. Composite Key

الـ **Composite Key** هو Primary Key مكون من أكتر من Column.

مثلاً عندنا:

```text
Student
Course
StudentCourse
```

الـ `StudentCourse` بتربط Student بـ Course.

ممكن نعتبر:

```text
StudentId + CourseId
```

هما مع بعض الـ Primary Key.

```csharp
public class StudentCourse
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }

    public Student Student { get; set; }
    public Course Course { get; set; }
}
```

الـ Fluent API:

```csharp
builder.HasKey(sc => new
{
    sc.StudentId,
    sc.CourseId
});
```
هنا:
```text
StudentId + CourseId = Primary Key
```

يعني مينفعش يكون عندنا نفس الـ Student مسجل في نفس الـ Course مرتين لو الـ Composite Key هي القيد الوحيد.

---

## 4. Foreign Key

الـ **Foreign Key** هو Column بيربط Entity بـ Entity تانية.

مثلاً:

```csharp
public class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public Customer Customer { get; set; }
}
```
باستخدام **Fluent API**:
```cs
builder.HasOne(o => o.Customer)
    .WithMany(c => c.Orders)
    .HasForeignKey(o => o.CustomerId);
```
### نفهمها:
```cs
.HasOne(o => o.Customer)
```
الـ `Order` مرتبط بـ **Customer واحد**.
```cs
.WithMany(c => c.Orders)
```
والـ `Customer` ممكن يكون عنده **Orders كتير**.
```cs
.HasForeignKey(o => o.CustomerId)
```

هنا بنقول للـ EF Core:

> الـ Foreign Key الخاص بالعلاقة دي هو `CustomerId`.
---

# 17. Relationships

الـ Relationships بتحدد إزاي الـ Entities مرتبطة ببعض.

أهم أنواعها:

- One-to-One
- One-to-Many
- Many-to-Many
- Self-Referencing

---

## 1. One-to-One

معناها:
> إن Entity واحدة مرتبطة بـ Entity واحدة فقط.

مثال:

```text
User  1 ───── 1  Profile
```

كل User عنده Profile واحد، وكل Profile تابع لـ User واحد.

### Entities

```csharp
public class User
{
    public int Id { get; set; }

    public Profile Profile { get; set; }
}
```

```csharp
public class Profile
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public User User { get; set; }
}
```
### Fluent API
```csharp
builder.HasOne(u => u.Profile)
    .WithOne(p => p.User)
    .HasForeignKey<Profile>(p => p.UserId);
```

نفهمها خطوة خطوة:
```csharp
HasOne(u => u.Profile)
```
الـ User عنده **Profile واحد**.
```csharp
.WithOne(p => p.User)
```
والـ Profile مرتبط بـ **User واحد**.
```csharp
.HasForeignKey<Profile>(p => p.UserId)
```

الـ Foreign Key موجود في `Profile`.

يعني:

```text
User
 Id
 ↓
Profile
 UserId => FK
```

---

## 2. One-to-Many

دي من أكتر العلاقات استخدامًا.
معناها:
> إن Entity واحدة مرتبطة بعدد كبير من Entity تانية.

مثلاً:

```text
Customer 1 ─────── * Orders
```

عندك Customer واحد ممكن يعمل Orders كتير.

لكن كل Order تابع لـ Customer واحد.

### Customer

```csharp
public class Customer
{
    public int Id { get; set; }

    public ICollection<Order> Orders { get; set; }
}
```

### Order

```csharp
public class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public Customer Customer { get; set; }
}
```

### Fluent API

```csharp
builder.HasOne(o => o.Customer)
    .WithMany(c => c.Orders)
    .HasForeignKey(o => o.CustomerId);
```

نقرأها:

```csharp
HasOne(o => o.Customer)
```
الـ Order عنده Customer واحد.
```csharp
.WithMany(c => c.Orders)
```
الـ Customer عنده Orders كتير.
```csharp
.HasForeignKey(o => o.CustomerId)
```
الـ Foreign Key موجود في `Order`.

---

## 3. Many-to-Many

معناها:

> كل Entity ممكن ترتبط بأكتر من Entity من الناحية التانية.

مثال Students و Courses:

```text
Student * ───── * Course
```

الـ Student ممكن يدخل Courses كتير.

والـ Course ممكن يكون فيه Students كتير.
### Many-to-Many بالطريقة القديمة / Explicit Join Entity

بننشئ Entity في النص اسمها مثلًا:

```text
StudentCourse
```


### Student

```csharp
public class Student
{
    public int Id { get; set; }

    public ICollection<StudentCourse> StudentCourses { get; set; }
}
```

### Course

```csharp
public class Course
{
    public int Id { get; set; }

    public ICollection<StudentCourse> StudentCourses { get; set; }
}
```

### StudentCourse

```csharp
public class StudentCourse
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }

    public Student Student { get; set; }
    public Course Course { get; set; }
}
```

### Fluent API

أول حاجة الـ Composite Key:

```csharp
builder.HasKey(sc => new
{
    sc.StudentId,
    sc.CourseId
});
```

بعد كده العلاقة مع Student:

```csharp
builder.HasOne(sc => sc.Student)
    .WithMany(s => s.StudentCourses)
    .HasForeignKey(sc => sc.StudentId);
```

والعلاقة مع Course:

```csharp
builder.HasOne(sc => sc.Course)
    .WithMany(c => c.StudentCourses)
    .HasForeignKey(sc => sc.CourseId);
```

فتبقى:
![[Pasted image 20260922074900.png]]

---

## 4. Many-to-Many بالطريقة الجديدة

في EF Core نقدر نعمل Many-to-Many من غير ما نعمل Join Entity بشكل صريح في الـ C#.

مثلاً:

```csharp
public class Student
{
    public int Id { get; set; }

    public ICollection<Course> Courses { get; set; }
}
```

```csharp
public class Course
{
    public int Id { get; set; }

    public ICollection<Student> Students { get; set; }
}
```

والـ Fluent API:

```csharp
builder.HasMany(s => s.Courses)
    .WithMany(c => c.Students);
```

هنا EF Core هيعمل **Join Table** في الـ Database تلقائيًا.

يعني إحنا مش محتاجين نعمل:

```csharp
StudentCourse
```

كـ Entity في الـ C# لو مش محتاجين نتعامل معاها مباشرة.

### الشكل في الـ Database
![[Pasted image 20260922075017.png]]

---

## 5. Many-to-Many with Payload

هنا بنستخدم **Join Entity** بشكل صريح، لكن الفرق إن الـ Join Entity مش مجرد ربط.

عندنا بيانات إضافية مرتبطة بالـ Relationship نفسها.
مثلاً:

```text
Student ←→ Course
```
وعايزين نخزن:
- EnrollmentDate
- Grade   
- Status
فهتبقى:
![[Pasted image 20260922075752.png]]

فنعمل:

```csharp
public class StudentCourse
{
    public int StudentId { get; set; }
    public int CourseId { get; set; }

    public DateTime EnrollmentDate { get; set; }
    public decimal Grade { get; set; }

    public Student Student { get; set; }
    public Course Course { get; set; }
}
```

هنا `EnrollmentDate` و `Grade` مش بيانات تخص Student لوحده ولا Course لوحده.
دي بيانات تخص **العلاقة بينهم**.

مثلاً:

```text
Mahmoud
   ↓
C# Course
   ↓
EnrollmentDate = 2026-09-01
Grade = 95
```

### Fluent API

```csharp
builder.HasKey(sc => new
{
    sc.StudentId,
    sc.CourseId
});
```

```csharp
builder.HasOne(sc => sc.Student)
    .WithMany(s => s.StudentCourses)
    .HasForeignKey(sc => sc.StudentId);
```

```csharp
builder.HasOne(sc => sc.Course)
    .WithMany(c => c.StudentCourses)
    .HasForeignKey(sc => sc.CourseId);
```

### الفرق المهم

**Many-to-Many العادية:**

```text
Student ←→ Course
```

وممكن EF Core يعمل Join Table تلقائيًا.

أما:

**Many-to-Many with Payload:**

```text
Student
   ↓
StudentCourse
   ↓
Course
```

وفي `StudentCourse` عندنا بيانات إضافية.

---

## Self-Referencing Relationship

دي Relationship الـ Entity فيها بتعمل Reference لنفسها. (Unary Relationship)
يعني Entity واحدة بتتعامل مع Entity من **نفس النوع**.

مثال مشهور جدًا:

```text
Employee
```

كل Employee ممكن يكون له Manager، والـ Manager نفسه Employee.

يعني:![[Pasted image 20260922080300.png]]
مثال:

```text
Ahmed
  ↓
Manager = Mahmoud

Mahmoud
  ↓
Manager = NULL
```

لأن Mahmoud ممكن يكون أعلى واحد في الـ hierarchy.

---

### Entity

```csharp
public class Employee
{
    public int Id { get; set; }

    public int? ManagerId { get; set; }

    public Employee Manager { get; set; }

    public ICollection<Employee> Employees { get; set; }
}
```

عندنا هنا:

```csharp
ManagerId
```

ده Foreign Key بيرجع لنفس الجدول.

يعني:

```text
Employee
----------------
Id
ManagerId  → Employee.Id
```

---

### Self-Referencing Configuration

نستخدم Fluent API عشان نوضح للـ EF Core العلاقة بشكل صريح:

```csharp
builder.HasOne(e => e.Manager)
    .WithMany(e => e.Employees)
    .HasForeignKey(e => e.ManagerId);
```

نقرأها:

```csharp
HasOne(e => e.Manager)
```

كل Employee عنده **Manager واحد**.

```csharp
.WithMany(e => e.Employees)
```

لكن الـ Manager الواحد ممكن يكون عنده **Employees كتير**.

```csharp
.HasForeignKey(e => e.ManagerId)
```

والـ Foreign Key هو:

```text
ManagerId
```

---

#### ليه `ManagerId` Nullable؟

```csharp
public int? ManagerId { get; set; }
```
لأن ممكن يكون عندنا Employee ملوش Manager.
مثلاً أعلى شخص في الـ hierarchy:

```text
CEO
ManagerId = NULL
```

---
## Delete Behavior في Relationships

من الحاجات المهمة جدًا في الـ Relationships هي تحديد إيه اللي يحصل لما نحذف الـ Principal Entity.

مثلاً:
```text
Manager
   |
   └── Employees
```

لو حذفنا Manager، هل نحذف Employees بتوعه؟
هنا نقدر نحدد السلوك باستخدام:

```csharp
.OnDelete(DeleteBehavior.Restrict);
```

مثلاً:

```csharp
builder.HasOne(e => e.Manager)
    .WithMany(e => e.Employees)
    .HasForeignKey(e => e.ManagerId)
    .OnDelete(DeleteBehavior.Restrict);
```

الـ`Restrict` معناها:

> مينفعش تحذف الـ Manager لو الحذف هيعمل مشكلة بسبب الـ Employees المرتبطين بيه.

وده مهم جدًا في العلاقات اللي ممكن يحصل فيها **Cascade Delete** غير مرغوب فيه.

---
## إزاي تقرأ أي Relationship؟

لما تشوف:

```csharp
builder.HasOne(o => o.Customer)
    .WithMany(c => c.Orders)
    .HasForeignKey(o => o.CustomerId);
```

اقرأها كده:

> إن **Order عنده Customer واحد، والـ Customer عنده Orders كتير، والـ Foreign Key موجود في Order واسمه CustomerId.**

ولما تشوف:

```csharp
builder.HasOne(u => u.Profile)
    .WithOne(p => p.User)
    .HasForeignKey<Profile>(p => p.UserId);
```

اقرأها:

> إن **User عنده Profile واحد، والـ Profile عنده User واحد، والـ FK موجود في Profile.**

```text
HasOne  + WithOne  = One-to-One
HasOne  + WithMany = Many-to-One أو One-to-Many من الطرف الآخر
HasMany + WithMany = Many-to-Many
```

---
# 18. Loading Related Data

لما يكون عندنا **Relationships** بين الـ Entities، أحيانًا بنحتاج نجيب الـ Entity ومعاها الـ Related Data.

مثلاً:

```text
Customer
   |
   └── Orders
```

لو جبت الـ Customer:

```csharp
var customer = await context.Customers
    .FirstOrDefaultAsync(c => c.Id == 1);
```

ده هيجيب الـ Customer فقط.
لكن لو عايز تجيب الـ Orders بتاعته كمان، عندك أكتر من طريقة.
أشهر طرق الـ Loading:

```text
1. Eager Loading
2. Explicit Loading
3. Lazy Loading
```

---
## 18.1 Eager Loading

الـ **Eager Loading** معناها:

> أنا عايز أجيب الـ Entity والـ Related Data بتاعتها **في نفس الـ Query**.
وده بنعمله باستخدام:
```csharp
Include()
```
مثلاً:
```csharp
var customer = await context.Customers
    .Include(c => c.Orders)
    .FirstOrDefaultAsync(c => c.Id == 1);
```

هنا EF Core هيجيب:
```text
Customer
   +
Orders
```
في Query واحدة غالبًا.

---
### `ThenInclude()`

لو عندك Relationship أعمق:

```text
Customer
   ↓
Orders
   ↓
OrderItems
```

وعايز تجيبهم كلهم:

```csharp
var customer = await context.Customers
    .Include(c => c.Orders)
        .ThenInclude(o => o.OrderItems)
    .FirstOrDefaultAsync(c => c.Id == 1);
```

يعني:

```text
Include
  ↓
Customer → Orders

ThenInclude
  ↓
Orders → OrderItems
```
 مثال تاني
```text
Order
 ↓
Customer
 ↓
Address
```
ممكن تعمل:

```csharp
var order = await context.Orders
    .Include(o => o.Customer)
        .ThenInclude(c => c.Address)
    .FirstOrDefaultAsync(o => o.Id == 1);
```
### Multiple Includes
لو محتاج تجيب أكتر من Navigation Property:
```text
Order
 ├── Customer
 ├── OrderItems
 └── Payment
```
ممكن:
```csharp
var order = await context.Orders
    .Include(o => o.Customer)
    .Include(o => o.OrderItems)
    .Include(o => o.Payment)
    .FirstOrDefaultAsync(o => o.Id == orderId);
```

---

## 18.2 Explicit Loading

الـ **Explicit Loading** معناها:

> أنا مش هجيب الـ Related Data من البداية، لكن هطلبها بنفسي بعد ما أجيب الـ Entity.

مثلاً:

```csharp
var customer = await context.Customers
    .FirstAsync(c => c.Id == 1);
```

بعد كده:

```csharp
await context.Entry(customer)
    .Collection(c => c.Orders)
    .LoadAsync();
```

هنا حصل:

```text
Query 1
Customer

       ↓

Query 2
Orders
```

---

### Reference vs Collection

لو Navigation Property عبارة عن **Collection**:

```csharp
.Collection(c => c.Orders)
```

لو Navigation Property عبارة عن **Reference**:

```csharp
.Reference(o => o.Customer)
```

مثلاً:

```csharp
await context.Entry(order)
    .Reference(o => o.Customer)
    .LoadAsync();
```

---

## 18.3 Lazy Loading

الـ **Lazy Loading** معناها:

> الـ Related Data تتجاب تلقائيًا **لما تحاول تستخدم الـ Navigation Property**.

مثلاً:

```csharp
var customer = await context.Customers
    .FirstAsync(c => c.Id == 1);
```

لسه الـ Orders متجابتش.

لكن لما تعمل:

```csharp
var orders = customer.Orders;
```

EF Core ممكن يروح يعمل Query تلقائيًا عشان يجيب الـ Orders.

يعني:

```text
Get Customer
      ↓
Use customer.Orders
      ↓
EF sends another query
      ↓
Get Orders
```

وده شكله مريح جدًا، لكن ممكن يعمل مشاكل Performance لو مش واخد بالك.

بص، خلينا ناخد **مثال واحد كامل** ونطبق عليه الـ 3 أنواع Loading عشان الفرق يثبت.

هنفترض عندنا:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<Order> Orders { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public decimal Total { get; set; }

    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
}
```

العلاقة:

```text
Customer 1 ───────── * Orders
```

1. Eager Loading — `Include()`

لو عايز تجيب الـ Customer ومعاه الـ Orders **من البداية**:

```csharp
var customer = await context.Customers
    .Include(c => c.Orders)
    .FirstOrDefaultAsync(c => c.Id == 1);
```

دلوقتي:

```text
Customer
├── Id
├── Name
└── Orders
    ├── Order 1
    ├── Order 2
    └── Order 3
```

يعني أنت بتقول لـ EF:

> هاتلي الـ Customer، وهات معاه الـ Orders بتاعته.

`ThenInclude()`

لو عندنا:

```text
Customer
   ↓
Orders
   ↓
Product
```

مثلاً الـ Order فيه Product:

```csharp
var customer = await context.Customers
    .Include(c => c.Orders)
        .ThenInclude(o => o.Product)
    .FirstOrDefaultAsync(c => c.Id == 1);
```

هنا:

```text
Customer
   ↓
Orders
   ↓
Product
```

`Include()` بيجيب الـ Navigation الأولى، و`ThenInclude()` بيكمل Navigation أعمق.

2. Explicit Loading

هنا الأول تجيب الـ Customer **لوحده**:

```csharp
var customer = await context.Customers
    .FirstOrDefaultAsync(c => c.Id == 1);
```

وبعدين تقول للـ EF:

> دلوقتي هاتلي الـ Orders بتاعته.

```csharp
await context.Entry(customer)
    .Collection(c => c.Orders)
    .LoadAsync();
```

فاللي حصل:

```text
Query 1
Customer
    ↓
Query 2
Orders
```

الميزة هنا إنك **إنت اللي بتتحكم في إمتى تجيب الـ Related Data**.

3. Lazy Loading

هنا إنت تجيب الـ Customer بس:

```csharp
var customer = await context.Customers
    .FirstOrDefaultAsync(c => c.Id == 1);
```

وبعدين لما تعمل:

```csharp
var orders = customer.Orders;
```

لو Lazy Loading متفعل، EF Core هيقول:

> آه، الـ Orders لسه مش Loaded، خليني أروح أجيبهم.

فيعمل Query تلقائيًا.

```text
Get Customer
customer.Orders
EF Core automatically queries Orders
```

يعني إنت **مطلبتش Query للـ Orders بشكل صريح**.

---
### Eager vs Explicit vs Lazy

|الطريقة|Related Data إمتى تتجاب؟|
|---|---|
|**Eager Loading**|مع الـ Query الأساسية|
|**Explicit Loading**|إنت بتطلبها يدويًا بعدين|
|**Lazy Loading**|تلقائيًا عند الوصول للـ Navigation Property|


---

## 18.4 N+1 Query Problem

دي من أهم مشاكل الـ Loading.

افترض عندك:

```text
100 Customers
```

وعايز تعرض Orders لكل Customer.

لو استخدمت Lazy Loading بشكل غير محسوب:

```csharp
var customers = await context.Customers
    .ToListAsync();

foreach (var customer in customers)
{
    var orders = customer.Orders;
}
```

ممكن يحصل:

```text
1 Query → Get Customers

+

100 Queries → Get Orders for each Customer
```

يعني:

```text
1 + 100 = 101 Queries
```

وده اسمه:

> **N+1 Query Problem**

---

### الحل؟

لو أنت محتاج البيانات فعلًا، استخدم Eager Loading:

```csharp
var customers = await context.Customers
    .Include(c => c.Orders)
    .ToListAsync();
```

أو الأفضل أحيانًا تستخدم **Projection** لو محتاج بيانات محددة فقط:

```csharp
var customers = await context.Customers
    .Select(c => new
    {
        c.Id,
        c.Name,
        OrdersCount = c.Orders.Count()
    })
    .ToListAsync();
```

وده بيخلّي الـ Database تعمل الحساب بدل ما تجيب كل الـ Orders للـ Application.

---

# 19. `AsNoTracking()`

نرجع تاني للـ **Change Tracker**.

لما تعمل:

```csharp
var products = await context.Products
    .ToListAsync();
```

هنا الـEF Core افتراضيًا بيعمل **Tracking** للـ Entities اللي رجعها.

يعني:

```text
Database
   ↓
Product
   ↓
Change Tracker
```

وده مفيد لو ناوي تعدل الـ Entity.

مثلاً:

```csharp
var product = await context.Products
    .FirstAsync(p => p.Id == 1);

product.Price = 500;

await context.SaveChangesAsync();
```
فـEF Core يعرف إن `product` اتغيرت.

---

## طب لو أنا بجيب Data للعرض فقط؟

مثلاً:

```text
GET /api/products
```

وإنت هترجع المنتجات للـ Client ومش هتعدل عليها.

مش محتاج Change Tracking.

ساعتها:

```csharp
var products = await context.Products
    .AsNoTracking()
    .ToListAsync();
```

هنا EF Core:

> يرجع الـ Entities بدون ما يضيفها للـ Change Tracker.

---
## ليه `AsNoTracking()` ممكن تكون أسرع؟
لأن EF Core مش محتاج:

- يحتفظ بالـ Entity في Change Tracker.
- يراقب التغييرات.
- يعمل Tracking للـ State.
فده يقلل الـ overhead، خصوصًا في Queries القراءة الكتيرة.

لو:

```text
Read Only
```

فغالبًا:

```csharp
AsNoTracking()
```

مفيد.

لو:

```text
Read → Modify → Save
```

خليك على Tracking الطبيعي غالبًا.

---

## 19.1 Tracking vs No Tracking

|Tracking|`AsNoTracking()`|
|---|---|
|Entity يتم تتبعها|لا يتم تتبعها|
|مناسبة للتعديل|مناسبة للقراءة|
|فيها Change Tracking overhead|Overhead أقل|
|`SaveChanges()` يقدر يكتشف التعديلات|لازم تتعامل مع التعديل بشكل مختلف|

مثلاً:

### Tracking

```csharp
var product = await context.Products
    .FirstAsync();

product.Price = 500;

await context.SaveChangesAsync();
```

### No Tracking

```csharp
var product = await context.Products
    .AsNoTracking()
    .FirstAsync();
```

لو عدلت:

```csharp
product.Price = 500;
```

الـ Context مش بيتابع التعديل ده تلقائيًا.

---

## 19.2 `AsNoTrackingWithIdentityResolution()`

دي حالة متقدمة شوية.

```csharp
AsNoTrackingWithIdentityResolution()
```

بتقول:

> أنا مش عايز Change Tracking، لكن عايز EF Core يتعامل مع الـ duplicated references لنفس الـ Entity أثناء نتيجة الـ Query.

مفيدة خصوصًا في Queries فيها علاقات كثيرة ونتائج ممكن تحتوي على نفس الـ Entity أكتر من مرة.

لكن في الاستخدام اليومي:

```text
Tracking
AsNoTracking()
```

هما اللي هتستخدمهم أغلب الوقت.

---

# 20. LINQ & Querying مع EF Core

أنت اكيد مذاكر ال LINQ، بس
> **إيه اللي بيحصل لما تستخدم LINQ مع EF Core؟**

مثلاً:

```csharp
var products = await context.Products
    .Where(p => p.Price > 1000)
    .OrderBy(p => p.Name)
    .Select(p => new
    {
        p.Id,
        p.Name,
        p.Price
    })
    .ToListAsync();
```

EF Core بيحاول يترجم الـ Query دي إلى SQL.

---

## `IQueryable`

لما تعمل:

```csharp
context.Products
```

بتتعامل غالبًا مع:

```csharp
IQueryable<Product>
```

الـ `IQueryable` بيمثل Query لسه **ما اتنفذتش**.

مثلاً:

```csharp
var query = context.Products
    .Where(p => p.Price > 1000);
```

لسه مفيش Query اتنفذت على الـ Database.

بعدها:

```csharp
query = query.OrderBy(p => p.Name);
```

لسه.

بعدها:

```csharp
var products = await query.ToListAsync();
```

هنا حصل التنفيذ.

---

## Deferred Execution

دي معناها:

> الـ Query مش بتتنفذ لحظة ما تكتبها، لكن عند الوصول لعملية بتطلب النتيجة.

مثلاً:

```csharp
var query = context.Products
    .Where(p => p.Price > 1000);
```

لسه مفيش Database call.

لكن:

```csharp
var products = await query.ToListAsync();
```

هنا:

```text
Build Query
    ↓
Execute Query
    ↓
Database
```

ومن الـ Terminal Operators المشهورة:

```csharp
ToList()
ToListAsync()
First()
FirstAsync()
Single()
Count()
Any()
Sum()
```

---


## Projection

بدل ما تجيب الـ Entity كاملة:

```csharp
var products = await context.Products
    .ToListAsync();
```

ممكن تجيب الـ Properties اللي محتاجها فقط:

```csharp
var products = await context.Products
    .Select(p => new
    {
        p.Id,
        p.Name,
        p.Price
    })
    .ToListAsync();
```

وده اسمه:

> **Projection**

والـ SQL ممكن يبقى:

```sql
SELECT Id, Name, Price
FROM Products;
```

بدل ما يجيب كل الأعمدة.

---

## Filtering

```csharp
var products = await context.Products
    .Where(p => p.Price > 1000)
    .ToListAsync();
```

يتحول لفكرة:

```sql
SELECT ...
FROM Products
WHERE Price > 1000;
```

---

## Sorting

```csharp
var products = await context.Products
    .OrderBy(p => p.Name)
    .ThenByDescending(p => p.Price)
    .ToListAsync();
```

---

## Pagination

الـ Pagination غالبًا بتستخدم:

```text
OrderBy
Skip
Take
```

مثلاً:

```csharp
int page = 2;
int pageSize = 10;

var products = await context.Products
    .OrderBy(p => p.Id)
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

يعني:

```text
Page 1 → Skip 0  → Take 10
Page 2 → Skip 10 → Take 10
Page 3 → Skip 20 → Take 10
```

والـ مهم هنا:

> **Pagination لازم تتعمل قبل `ToList()`** عشان الـ Database هي اللي ترجع الجزء المطلوب فقط.

---
# 21. IQueryable vs IEnumerable

## Enumerable


هو static class موجود في:

```cs
System.Linq
```

وبيوفر **extension methods** تشتغل على:

```cs
IEnumerable<T>
```

الـ`Enumerable` بيشتغل على **بيانات موجودة فعلًا في الذاكرة**  
يعني in-memory data

زي:

- `Array`
- `List`
- `HashSet`
- `Dictionary`
- أي collection متخزن في الرام

## Queryable


هو أيضًا static class موجود في:

```cs
System.Linq
```

وبيوفر **extension methods** تشتغل على:

```cs
IQueryable<T>
```

`Queryable` بيشتغل على **مصدر بيانات خارجي**  
وغالبًا:

- Database
- Entity Framework
- LINQ to SQL

- أي provider يقدر يترجم الـ query
    

هو مش بينفذ على الداتا مباشرة من الرام في البداية  
هو بيبني ==query قابلة للترجمة==

 الفرق الجوهري في سطر واحد

- الـ`Enumerable` = ينفذ على البيانات نفسها
- الـ`Queryable` = يبني expression يترجمها provider بعدين

دي أهم جملة في الموضوع كله

## نبدأ من الأساس: يعني إيه IEnumerable؟

الـ`IEnumerable<T>` عبارة عن interface  
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

## يعني إيه IQueryable؟

الـ`IQueryable<T>` برضه interface  
لكن أقوى من `IEnumerable<T>`

هو مش بس sequence ينفع تمشي عليها  
لا، ده كمان ==بيمثل **query قابلة للفهم والترجمة** بواسطة provider==
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


مثال Enumerable

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2);
```

هنا:

- الـ`nums` موجودة في الرام
- و `Where` من `Enumerable`
- الفلترة بتحصل على العناصر نفسها

مثال Queryable

```cs
var result = db.Students.Where(s => s.Age > 20);
```

هنا:

- الـ`db.Students` غالبًا `IQueryable<Student>`
- فـ`Where` من `Queryable`
- الشرط ده مش بيتنفذ فورًا على objects في الرام
- بل بيتحول لحاجة شبه SQL

مثلًا:

```sql
SELECT * FROM Students WHERE Age > 20
```

 الفرق في نوع البراميتر

دي نقطة أكاديمية مهمة جدًا

 Enumerable.Where

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

 Queryable.Where

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

وده فرق كبير جدًا

 ما الفرق بين Func و Expression ؟
Func

ده delegate  
يعني method executable

مثال:

```cs
Func<int, bool> check = x => x > 5;
```

ده كود عادي يتنفذ

Expression

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

 إذًا الفرق الحقيقي الداخلي

- الـEnumerable يقولك:
	- اديني العناصر
	- وأنا هلف عليهم
	- وأنفذ الـ delegate على كل عنصر

- اما الـQueryable بيقولك:
	- اديني الـ expression
	- وأنا هبعتها للprovider
	- وهو يحولها للغة المصدر زي SQL مثلًا
	- وبعدين المصدر الخارجي ينفذها

### مع Enumerable

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };

var result = nums.Where(x => x > 2);
```

اي الي بيحصل؟

1. الـ`nums` موجودة في الذاكرة
2. فـ `Where` تأخذ `Func<int, bool>`
3. تمشي على كل عنصر
4. تنفذ `x > 2`
5. ترجع العناصر المناسبة

### مع Queryable

```cs
var result = db.Students.Where(s => s.Age > 20);
```

اي الي بيحصل؟

1. الـ`db.Students` يمثل table أو source خارجي
2. فـ`Where` تأخذ `Expression<Func<Student, bool>>`
3. فالـexpression يتحلل
4. وEF provider يترجمه إلى SQL
5. قاعدة البيانات تنفذ الشرط
6. ترجع النتائج المناسبة فقط

---

### مثال يوضح الأداء

افترض إن عندك جدول Students فيه مليون صف
#### لو استخدمت Queryable بشكل صحيح
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

 لكن لو حولتها لـ Enumerable بدري

```cs
var result = db.Students
    .AsEnumerable()
    .Where(s => s.Age > 20)
    .ToList();
```

هنا حصلت مصيبة مهمة

اي الي حصل؟

- هنا `AsEnumerable()` قالت: من هنا كفاية ترجمة SQL
- حول المصدر إلى `IEnumerable`
- بعد كده `Where` بقت من `Enumerable`
- الفلترة بقيت في الرام


وده معناه غالبًا:
- جيب بيانات كتير من الداتابيز الأول
- بعدين فلترها في التطبيق

وده أسوأ كثير لو البيانات كبيرة

#### AsEnumerable

تحول التعامل إلى `IEnumerable`  
يعني:

- وقف ترجمة provider
- كمل execution في الذاكرة

#### AsQueryable

تحول شيء إلى `IQueryable`  
لكن لازم يكون فيه provider يقدر يتعامل معاه بشكل فعلي

 مثال مهم جدًا

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

 - الفرق في مكان التنفيذ
	 - التنفيذ في Enumerable بيتم في:
		- في التطبيق
		- داخل CLR
		- على البيانات الموجودة في memory
		
	- التنفيذ في Queryable بيتم:
		- غالبًا خارج التطبيق
		- في database engine مثل SQL Server
		- أو في provider خارجي

- الفرق في المسؤول عن التنفيذ
	- في الEnumerable المسؤول هو:
		- الـ.NET runtime
		- الـLINQ to Objects
		
	- اما Queryable فالمسؤول هو:
		- الـQuery Provider  
		    مثل:
		    - الـEntity Framework Provider
			- الـLINQ Provider
			- الـOData Provider
			- أي مزود يدعم IQueryable

طب Query Provider يعني إيه؟

الـ`IQueryable` لوحده مش السحر كله  
لازم يكون فيه provider يفهم الـ expression tree

يعني:

- ياخد expression
- يحللها
- يحولها لصيغة مناسبة
- ينفذها على المصدر الخارجي

في EF مثلًا:
- عندك provider يحول LINQ إلى SQL


مثال واقعي جدًا

عندك:
```cs
var students = db.Students.Where(s => s.Name.StartsWith("A"));
```
 في Queryable

الـ EF يحاول يترجم `StartsWith("A")` إلى SQL مثل:

```sql
WHERE Name LIKE 'A%'
```

 في Enumerable
لو الداتا جت للرام، `StartsWith` تتنفذ كـ C# method عادي على كل object

طب ليه مش كل حاجة تنفع مع Queryable؟

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

طب امتى أستخدم Enumerable وامتى أستخدم Queryable؟

 - استخدم Enumerable لما:
	- البيانات موجودة بالفعل في memory
	- شغال على Array أو List
	- مش محتاج ترجمة SQL
	- عندك operations لا يمكن ترجمتها من provider
	- الداتا حجمها صغير أو متحمّلة بالفعل

 - واستخدم Queryable عندما:
	- شغال مع قاعدة بيانات
	- عايز الفلترة والترتيب يحصلوا في المصدر الخارجي
	- عايز performance أحسن
	- عايز تبعت query صغيرة ومحددة بدل ما تجيب كل البيانات

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

في Deferred Execution في الاثنين

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

طب ToList و First و Count دول بيعملوا إيه؟

دي methods غالبًا تجبر التنفيذ (Eager Execution)

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
    

طب هل Queryable دائمًا أفضل؟ لا

دي نقطة مهمة جدًا

`Queryable` أفضل فقط لو عندك source خارجي وprovider قوي يترجم query صح

لكن لو البيانات أصلاً already loaded في memory  
فـ `Enumerable` هو الطبيعي والأبسط

مثال:

```cs
List<int> nums = new List<int> { 1, 2, 3, 4, 5 };
```

هنا مفيش معنى حقيقي إنك تروح لـ Queryable

طب إمتى أضطر أستخدم Enumerable بعد Queryable؟

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

|النقطة|Enumerable|Queryable|
|---|---|---|
|يعمل على|`IEnumerable<T>`|`IQueryable<T>`|
|نوع الشرط|`Func<T, bool>`|`Expression<Func<T, bool>>`|
|التنفيذ|في الذاكرة|في مصدر خارجي غالبًا|
|الترجمة|لا|نعم عبر provider|
|الأفضل مع|List/Array|Database/EF|
|الأداء مع DB|قد يكون سيئًا لو جلبت البيانات أولًا|أفضل غالبًا|

- بعض الاخطاء الشائعة
	- استخدام AsEnumerable بدري
		- بيكسر الترجمة ويحول الشغل للرام
	- الاعتقاد أن Where واحدة بنفس المعنى دائمًا
		- لا، نفس الاسم لكن implementation مختلف حسب النوع 
	- التفكير أن IQueryable يعني البيانات متجلبة
		- لا، أحيانًا يكون مجرد query لم تُنفذ بعد
	- كتابة methods مخصصة داخل Queryable ثم استغراب عدم الترجمة
		- لأن provider قد لا يعرف ترجمتها

---




# 22. CRUD Operations

الـ CRUD:

```text
Create
Read
Update
Delete
```

---

## Create

عندك Entity جديدة:
```csharp
var product = new Product
{
    Name = "Laptop",
    Price = 30000
};
```
تضيفها:
```csharp
context.Products.Add(product);
```
وبعدين:
```csharp
await context.SaveChangesAsync();
```
الـ EF Core يولد:
```sql
INSERT INTO Products ...
```

## AddRange

لو عندك أكتر من Entity:

```csharp
context.Products.AddRange(
    product1,
    product2,
    product3
);

await context.SaveChangesAsync();
```

## Read

مثلاً:
```csharp
var products = await context.Products
    .ToListAsync();
```
أو:
```csharp
var product = await context.Products
    .FirstOrDefaultAsync(p => p.Id == id);
```
ولو Primary Key:
```csharp
var product = await context.Products
    .FindAsync(id);
```
### `FindAsync()` نقطة مهمة

هنا `FindAsync()` بيبحث بالـ **Primary Key**.
وممكن لو الـ Entity موجودة بالفعل في الـ Change Tracker يرجعها مباشرة بدون إرسال Query جديدة للـ Database.

---

## Update

لو الـ Entity متتبعة:
```csharp
var product = await context.Products
    .FirstAsync(p => p.Id == id);

product.Price = 50000;

await context.SaveChangesAsync();
```
مش محتاج غالبًا تعمل:
```csharp
context.Products.Update(product);
```

لأن الـ Context بالفعل بيتتبع الـ Entity ويعرف إنها:
```text
Unchanged
    ↓
Modified
```
وبعدين:
```csharp
SaveChangesAsync()
```
يعمل:
```sql
UPDATE Products
SET Price = 50000
WHERE Id = ...
```

### `Update()`

ممكن تستخدم:

```csharp
context.Products.Update(product);
```

وده بيطلب من EF Core اعتبار الـ Entity modified، لكن لازم تكون فاهم إن استخدامه على Entity كاملة ممكن يخلي EF Core يتعامل مع Properties كـ modified حتى لو بعض القيم لم تتغير.

عشان كده في الـ typical tracked scenario:
```csharp
var product = await context.Products.FindAsync(id);

product.Price = 50000;

await context.SaveChangesAsync();
```
غالبًا هو الأسهل والأوضح.

---

## Delete

تجيب الـ Entity:

```csharp
var product = await context.Products
    .FindAsync(id);
```

وبعدين:

```csharp
context.Products.Remove(product);

await context.SaveChangesAsync();
```

EF Core يولد:

```sql
DELETE FROM Products
WHERE Id = ...;
```

 CRUD Flow

- Create
	- Add()
		- SaveChanges()

- Read
	- LINQ Query
		- Execute

- Update
	- Load Entity
		- Modify Property
			- SaveChanges()

- Delete
	- Remove()
		- SaveChanges()


---
# 23. Advanced Migrations

إحنا اتكلمنا عن أساسيات الـ Migrations، دلوقتي نشوف استخدامها بشكل عملي أكتر.

الـ Migration عبارة عن **History of Schema Changes**.

مثلاً:

```text
InitialCreate
	AddProductPrice
		AddProductCategory
			AddProductIndex
```

كل Migration بتوصف التغيير اللي حصل في الـ Model.


## Remove Migration

لو عملت Migration:

```bash
dotnet ef migrations add AddProductPrice
```

وبعدين اكتشفت إنك لسه عايز تعدل الـ Model قبل ما تطبق الـ Migration:

```bash
dotnet ef migrations remove
```

دي بتشيل **آخر Migration** من المشروع.

### مهم

خد بالك `migrations remove` مش معناها:

> امسح التغيير من الـ Database.

هي بتشيل ==آخر Migration من الـ codebase **إذا كانت غير مطبقة/يمكن إزالتها بأمان حسب الحالة**.==

## Rollback Database

لو عندك:

```text
InitialCreate
AddProductPrice
AddProductCategory
```

والـ Database حاليًا عند:

```text
AddProductCategory
```

وعايز ترجعها إلى:

```text
AddProductPrice
```

ممكن:

```bash
dotnet ef database update AddProductPrice
```

فيعمل EF Core rollback للـ Database إلى الـ Migration دي.

الشكل:

```text
AddProductCategory
        ↓ rollback
AddProductPrice
```

## Update to Latest

لو عايز تطبق كل الـ Migrations الموجودة:

```bash
dotnet ef database update
```

يعني:

```text
Current DB
	Find unapplied migrations
		Apply them
			Latest Migration
```

## List Migrations

عشان تشوف الـ Migrations:

```bash
dotnet ef migrations list
```

مثلاً:

```text
202609220500_InitialCreate
202609220510_AddProductPrice
202609220520_AddCategory
```

---

## Migration Scripts

في بعض الـ Production Environments مش أفضل ممارسة إنك تعتمد على:

```bash
dotnet ef database update
```

مباشرة من جهاز Developer.

ممكن تولد SQL Script:

```bash
dotnet ef migrations script
```

EF Core يولد:

```sql
CREATE TABLE ...
ALTER TABLE ...
CREATE INDEX ...
```

وتقدر الـ DBA أو Deployment Pipeline يراجع ويطبق الـ Script حسب سياسة المشروع.

---

## Idempotent Migration Script

ممكن تعمل:

```bash
dotnet ef migrations script --idempotent
```

وده يولد Script يقدر يتعامل مع قواعد بيانات ممكن تكون عند **Migration levels مختلفة**، بحيث يتحقق من الـ Migration History قبل تطبيق التغييرات.

الفكرة:

```text
Database A
Migration 1

Database B
Migration 2

Database C
Migration 3
```

نفس الـ idempotent script يقدر يحدد إيه اللي محتاج يتطبق بناءً على الـ History.

---

## Production Migration Workflow

في بيئة Production، Flow شائع يكون:


Developer
	Change Model
		Add Migration
			Review Migration
			Generate SQL Script
				Review / Test
					Apply to Production


بدل ما تعتبر الـ Migration مجرد:
"أعمل update وخلاص"


لأن تغييرات الـ Schema في Production محتاجة تخطيط، خصوصًا لو فيها:

- حذف Columns
- تغيير Data Types
- Rename
- Large Tables
- Indexes
- Data Migration

---

### نقطة مهمة جدًا: Rename vs Drop + Add

مثلاً عندك:

```csharp
public string Name { get; set; }
```

وغيرتها إلى:

```csharp
public string FullName { get; set; }
```

لو EF Core مش قادر يستنتج إن ده **Rename**، ممكن الـ Migration تتعامل مع التغيير كأنه:

```text
Drop Name
Add FullName
```

وده ممكن يؤدي إلى فقدان البيانات.

فلازم تراجع الـ Migration generated code.

الفكرة المهمة:

> **ما تثقش في الـ Migration generated code بشكل أعمى، خصوصًا في Production.**

---
# 24. Transactions & Concurrency

## Transactions

الـ **Transaction** بتخلي مجموعة من العمليات تتنفذ كوحدة واحدة:

- يا إما **كل العمليات تنجح => Commit**
- يا إما **أي عملية تفشل => Rollback**

مثال: تحويل فلوس من Account لـ Account تاني:

```csharp
using var transaction = await context.Database.BeginTransactionAsync();

try
{
    sender.Balance -= 100;
    receiver.Balance += 100;

    await context.SaveChangesAsync();

    await transaction.CommitAsync();
}
catch
{
    await transaction.RollbackAsync();
}
```

لو حصل Exception بعد تعديل الـ sender وقبل تعديل الـ receiver، الـ Transaction تقدر تمنع إن العملية تفضل في حالة نص نص.

### `SaveChanges()`

مهم تعرف إن:

```csharp
await context.SaveChangesAsync();
```

==نفسها بتنفذ التغييرات داخل Transaction في حالات معينة بحيث التغييرات المرتبطة بنفس عملية الحفظ تكون Atomic.==

لكن لو عندك **أكثر من `SaveChanges()`** وعايزهم كلهم ==ينجحوا أو يفشلوا مع بعض==، ممكن تستخدم Transaction صريحة.

---
## Concurrency

المشكلة بتحصل لما ==**أكتر من User يعدل نفس الـ record في نفس الوقت**.==

مثال:
User A يقرأ:
```text
Product Price = 100
```
User B يقرأ:
```text
Product Price = 100
```
A يعدلها إلى:
```text
120
```
B يعدلها إلى:
```text
150
```

آخر Update ممكن يمسح تعديل الأول.

ده اسمه:

> **Concurrency Conflict**

### Optimistic Concurrency

الـEF Core بيدعم **Optimistic Concurrency** باستخدام Concurrency Token.

مثال باستخدام `RowVersion`:

```csharp
public class Product
{
    public int Id { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }

    public byte[] RowVersion { get; set; }
}
```
وبـ Fluent API:
```csharp
builder.Property(p => p.RowVersion)
    .IsRowVersion();
```
لو حد عدل الـ record بعد ما أنت قرأته، EF Core ممكن يرمي:
```csharp
DbUpdateConcurrencyException
```
وتقدر تتعامل معها وتقرر تعمل إيه.


- الـ**Transaction**  بتحمي مجموعة عمليات من إنها تتنفذ جزئيًا.
    
- الـ**Concurrency**  بتتعامل مع تعديلات متزامنة على نفس البيانات.
    
- الـ**Optimistic Concurrency**  بنفترض إن التعارض نادر، ونكتشفه وقت الـ update.
    

---

# 25. Raw SQL

رغم إن EF Core بيوفر LINQ، أحيانًا تحتاج تكتب SQL بنفسك.

ممكن تستخدم Raw SQL لما:

- Query معقد جدًا.
- محتاج SQL specific للـ Database.

- Performance-critical query.
- Stored Procedure.
- Query موجودة بالفعل في النظام.

### `FromSql`

لما عايز ترجع Entities:

```csharp
var products = await context.Products
    .FromSqlRaw("SELECT * FROM Products")
    .ToListAsync();
```

ممكن تستخدم Parameters بشكل آمن:

```csharp
var products = await context.Products
    .FromSqlInterpolated(
        $"SELECT * FROM Products WHERE Price > {100}"
    )
    .ToListAsync();
```

---

### Execute SQL

لو عايز تعمل:

```sql
UPDATE
DELETE
```

من غير ما ترجع Entities:

```csharp
await context.Database.ExecuteSqlRawAsync(
    "DELETE FROM Products WHERE Price < 10"
);
```

### مهم جدًا

متعملش SQL بالشكل ده لو القيمة جاية من User:

```csharp
var sql = $"SELECT * FROM Products WHERE Name = '{name}'";
```

لأن ده ممكن يؤدي إلى **SQL Injection**.

استخدم parameterized queries أو:

```csharp
FromSqlInterpolated()
```

أو parameters صريحة.

### الخلاصة

- `FromSql...` → Query وترجع Entities.
    
- `ExecuteSql...` → Execute SQL بدون materializing Entities.
    
- Raw SQL مش بديل كامل لـ LINQ؛ هو أداة تستخدمها لما تحتاجها.
    

---

# 26. SQL Injection

ما نتكلم شوية عن ال SQL Injection؟

بص الـ**SQL Injection مش مشكلة في SQL Server نفسه؛ هي مشكلة بتحصل لما Application يحط Input من الـ User جوه SQL Query بشكل غير آمن.**

يعني الـ User بدل ما الـ input بتاعه يبقى **Data**، يقدر يخليه يتفسر كأنه **SQL Code**.

افترض عندك Login:

```text
Username: mahmoud
Password: 123456
```

والـ Application بيبني Query بالشكل ده:

```sql
SELECT *
FROM Users
WHERE Username = 'mahmoud'
AND Password = '123456';
```

ده طبيعي.

لكن لو الـ Application بيحط الـ input مباشرة في الـ SQL، المهاجم ممكن يدخل قيمة زي:

```text
' OR '1'='1
```

فيبقى الـ Query:

```sql
SELECT *
FROM Users
WHERE Username = '' OR '1'='1' --
AND Password = '';
```

هنا الجزء:

```sql
'1'='1'
```

دايمًا `TRUE`.

فالـ attacker قدر يغير **منطق الـ Query نفسه**.

### المشكلة فين؟

المشكلة مش إن الـ User كتب `'`.

المشكلة إن الـ Application عمل:

```text
User Input + SQL Code
```

بدل ما يعامل الـ input على إنه:

```text
Data فقط
```

---

## 2. أخطر مثال: DELETE

تخيل عندك:

```sql
DELETE FROM Users
WHERE Username = 'mahmoud';
```

والـ application بيعمل:

```csharp
var sql = "DELETE FROM Users WHERE Username = '" + username + "'";
```

لو الـ User دخل:

```text
mahmoud' OR '1'='1
```

ممكن الـ SQL يبقى:

```sql
DELETE FROM Users
WHERE Username = 'mahmoud' OR '1'='1';
```

وده ممكن يمسح **عدد ضخم من الـ records**.

عشان كده SQL Injection مش مجرد مشكلة Login.

ممكن تؤثر على:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`

حسب طريقة بناء الـ Query والـ DB permissions.

---

## 3. الحماية في SQL: Parameterized Queries

الحل الأساسي:

**Parameterized Queries**

بدل:

```sql
SELECT *
FROM Users
WHERE Username = 'mahmoud';
```

تستخدم Parameter:

```sql
SELECT *
FROM Users
WHERE Username = @Username;
```

وبعدين تبعت:

```text
@Username = "mahmoud"
```

لو الـ User دخل:

```text
' OR '1'='1
```

الـ Database تتعامل معها كـ **قيمة نصية**، مش كـ SQL Code.

يعني:

```text
Input → Parameter → Data
```

مش:

```text
Input → SQL String → Code
```

وده أهم مبدأ في الحماية من SQL Injection.

---

## 4. SQL Injection مع EF Core

هنا الموضوع مهم جدًا.
لو أنت بتستخدم LINQ بالشكل الطبيعي:

```csharp
var users = await context.Users
    .Where(u => u.Username == username)
    .ToListAsync();
```

فـ **أنت مش بتعمل SQL String Concatenation**.
هنا EF Core بيترجم الـ LINQ إلى SQL ويستخدم Parameters.
تقريبًا النتيجة بتكون:

```sql
SELECT ...
FROM Users
WHERE Username = @__username
```

فالـ input:
```text
' OR '1'='1
```

بيتعامل كـ **Value** وليس SQL.
### إذن:
```csharp
.Where(u => u.Username == username)
```

==آمن من SQL Injection في الحالة الطبيعية.==

---
## 5. المشكلة لما تستخدم Raw SQL

الـEF Core بيدعم Raw SQL.
مثلًا:

```csharp
var users = await context.Users
    .FromSqlRaw(
        $"SELECT * FROM Users WHERE Username = '{username}'"
    )
    .ToListAsync();
```

ده **خطر**.
لأنك عملت String Interpolation داخل SQL.
لو:

```text
username = ' OR '1'='1
```
فالـ SQL ممكن يتحول إلى:
```sql
SELECT *
FROM Users
WHERE Username = '' OR '1'='1'
```
وهنا رجعنا لنفس مشكلة SQL Injection.

---

## 6. ال`FromSqlRaw` مش معناه إنه Unsafe

ودي نقطة مهمة جدًا.

اسم:

```csharp
FromSqlRaw()
```

مش معناه إن SQL Injection هيحصل تلقائيًا.

المشكلة في **طريقة استخدامه**.

ممكن تستخدم Parameters:

```csharp
var users = await context.Users
    .FromSqlRaw(
        "SELECT * FROM Users WHERE Username = {0}",
        username
    )
    .ToListAsync();
```

هنا EF Core يتعامل مع `username` كـ Parameter.

---

## 7. `FromSqlInterpolated`

وده من الطرق الآمنة مع القيم:
```csharp
var users = await context.Users
    .FromSqlInterpolated(
        $"SELECT * FROM Users WHERE Username = {username}"
    )
    .ToListAsync();
```
رغم إنك شايف:
```csharp
$"{username}"
```

لكن EF Core بيحوّلها إلى Parameter بدل ما يعمل String Concatenation.
يعني:

```text
username
   ↓
Parameter
   ↓
SQL
```

وليس:
```text
username
   ↓
String Concatenation
   ↓
SQL Code
```

---

## 8. الفرق المهم جدًا

### Unsafe

```csharp
var sql = $"SELECT * FROM Users WHERE Username = '{username}'";

context.Users.FromSqlRaw(sql);
```

هنا أنت بنيت SQL String بنفسك.

### Safe

```csharp
context.Users.FromSqlInterpolated(
    $"SELECT * FROM Users WHERE Username = {username}"
);
```

أو:

```csharp
context.Users.FromSqlRaw(
    "SELECT * FROM Users WHERE Username = {0}",
    username
);
```

---

## 9. `ExecuteSqlRaw`

نفس الموضوع.

ده خطر:

```csharp
await context.Database.ExecuteSqlRawAsync(
    $"DELETE FROM Users WHERE Username = '{username}'"
);
```

لأنك عملت SQL باستخدام Input.

الأفضل:

```csharp
await context.Database.ExecuteSqlRawAsync(
    "DELETE FROM Users WHERE Username = {0}",
    username
);
```

أو تستخدم طريقة parameterized بشكل صريح.

---

## 10. طب والـ Stored Procedures؟

الـ Stored Procedure **مش معناها تلقائيًا إنها آمنة**.

مثلاً لو الـ Stored Procedure نفسها بتعمل:

```sql
DECLARE @sql NVARCHAR(MAX);

SET @sql = 'SELECT * FROM Users WHERE Username = ''' 
           + @Username + '''';

EXEC(@sql);
```

فأنت لسه ممكن تعمل SQL Injection.

يعني القاعدة:

> **Parameterized input هو الأساس، مش مجرد استخدام Stored Procedure.**

---

## 11. طب هل LINQ كله آمن؟

الـ LINQ الطبيعي:

```csharp
context.Users
    .Where(u => u.Username == username)
```

آمن من SQL Injection لأن EF Core بيعمل parameterization.

لكن المشكلة ممكن تظهر لما تبدأ **تبني SQL بنفسك**.

خصوصًا:

```csharp
FromSqlRaw()
ExecuteSqlRaw()
```

لو استخدمتهم بطريقة غير صحيحة.

## 12. طب إيه أنواع الـ Input اللي لازم نخاف منها؟

مش بس:
```text
Username
Password
Email
```

أي User Input ممكن يكون attack surface، مثل:
```text
Search
Filter
Sort
Pagination
IDs
Query parameters
Headers
Cookies
JSON body
Form data
File names
```

لكن **مش كل Input ممكن يعمل SQL Injection**؛ الخطر يظهر عندما يصل Input إلى SQL أو Interpreter آخر بطريقة غير آمنة.

مثلاً عندك:

```csharp
var sql = $"SELECT * FROM Products WHERE Name LIKE '%{search}%'";
```

ده خطر.

الأفضل تخلي EF Core parameterize القيمة:

```csharp
var products = await context.Products
    .Where(p => p.Name.Contains(search))
    .ToListAsync();
```

أو لو محتاج Raw SQL، تستخدم parameterized query.

---

## 13. المشكلة اللي ناس كتير بتقع فيها: ORDER BY

دي حالة مهمة جدًا.

مثلًا User بيبعت:
```text
sortBy=Name
```

وتعمل:

```csharp
var sql = $"SELECT * FROM Products ORDER BY {sortBy}";
```

هنا الـ Parameterization العادي مش هيحل المشكلة بنفس الطريقة؛ لأن **اسم الـ Column نفسه جزء من SQL syntax** وليس value.

الحل هنا:
### Whitelist
مثلاً:
```csharp
if (sortBy == "name")
{
    query = query.OrderBy(p => p.Name);
}
else if (sortBy == "price")
{
    query = query.OrderBy(p => p.Price);
}
```

يعني User لا يحدد SQL syntax بحرية.

## 14. إذن عندنا نوعين مهمين من الـ Input

### Values
مثل:
Name
Email
Price
Id
نستخدم:
**Parameters**
### SQL Identifiers / Syntax

مثل:
Column Name
Table Name
ASC / DESC
غالبًا نستخدم:
**Whitelist / Mapping**

مثلاً:
```text
"name"  → p.Name
"price" → p.Price
```

بدل ما نسمح للـ User يكتب SQL expression بنفسه.

---

## 15. هل الـ Validation تحمينا من SQL Injection؟

طبعا **Validation مفيدة، لكنها مش خط الدفاع الأساسي ضد SQL Injection.**

مثلاً:

```csharp
if (username.Length > 50)
{
    return BadRequest();
}
```

ده كويس.

لكن ماينفعش تقول:

> أنا عامل Validation إذن SQL Injection مستحيل.

الحماية الأساسية:

```text
Parameterized Queries
	Safe ORM/LINQ Usage
		Input Validation
			Least Privilege
```

## 16. Least Privilege

حتى لو حصل SQL Injection، لازم نقلل الضرر قدر الإمكان.

مثلاً Application مش المفروض يتصل بالـ Database بحساب عنده:

```text
DROP DATABASE
CREATE LOGIN
ALTER SERVER
```

لو التطبيق محتاج:

```text
SELECT
INSERT
UPDATE
DELETE
```

اديه الصلاحيات المطلوبة فقط.

ده اسمه:

**Principle of Least Privilege**

فلو حصل Attack، الـ attacker مش هيبقى عنده صلاحيات غير محدودة.

---
# 27. Performance

أهم جزء هنا إنك تعرف إن مشاكل EF Core غالبًا مش بسبب EF نفسه، لكن بسبب **طريقة كتابة الـ Query**.

## 1. Projection
بدل:
```csharp
var products = await context.Products
    .ToListAsync();
```
وبعدين تستخدم:
```text
Id
Name
Price
```

تقدر تستخدم كدا من غير البلاوي دي كلها:
```csharp
var products = await context.Products
    .Select(p => new
    {
        p.Id,
        p.Name,
        p.Price
    })
    .ToListAsync();
```
كده Database هترجع الأعمدة اللي محتاجها فقط.

---
## 2. `AsNoTracking()`
لو Read Only:
```csharp
var products = await context.Products
    .AsNoTracking()
    .ToListAsync();
```
ده يقلل overhead بتاع Change Tracking.

---

## 3. Avoid N+1
ممكن اغلبنا يقع في المشكلة دي كدا:
```csharp
var customers = await context.Customers.ToListAsync();

foreach (var customer in customers)
{
    var orders = await context.Orders
        .Where(o => o.CustomerId == customer.Id)
        .ToListAsync();
}
```
لو عندك 100 Customer ممكن تعمل:
```text
1 query + 100 queries
= 101 queries
```

بدل كده ممكن تستخدم:
```csharp
var customers = await context.Customers
    .Include(c => c.Orders)
    .ToListAsync();
```
أو تستخدم Projection حسب الـ data اللي محتاجها.

---
## 4. Filtering Before Materialization

بدل ما تجيب الداتا من الداتابيز وتفلترها في الميموري زي كدا

```csharp
var products = await context.Products
    .ToListAsync();

var expensive = products
    .Where(p => p.Price > 1000)
    .ToList();
```
الأفضل انك تخلي كل حاجه تحصل في الداتابيز وتديلك الحاجه النهائية
```csharp
var expensive = await context.Products
    .Where(p => p.Price > 1000)
    .ToListAsync();
```

---
## 5. Pagination
متجيبش 100,000 record مرة واحدة.
استخدم:

```csharp
var products = await context.Products
    .OrderBy(p => p.Id)
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

## 6. Indexes

لو بتعمل Search أو Filtering كتير على column معين، ممكن تحتاج Index.

مثال:
```csharp
builder.HasIndex(p => p.Name);
```

لكن متعملش Index على كل Column بشكل عشوائي؛ الـ indexes بتحسن القراءة لكن لها تكلفة في الكتابة والتخزين.

يعم انا حلتيته يعني ايه indexes ؟

بص يا معلم، الـ **Index** من أهم الحاجات في SQL وEF Core، تعالى نتكلم عنه من الاول، وبعدها نشوفه في EF Core.

### يعني إيه Index؟

تخيل عندك جدول `Products` فيه **مليون Product**:
وعملت:

```sql
SELECT *
FROM Products
WHERE Name = 'Laptop';
```

لو مفيش Index على `Name`، الـ Database ممكن تضطر تعمل **Table Scan**، يعني تبحث في عدد كبير جدًا من الصفوف عشان تلاقي الـ matching rows.

لكن لو عندك Index على `Name`، الـ Database تقدر تستخدمه للوصول للصفوف المطلوبة بشكل أكثر كفاءة.


###  فالIndex شبه فهرس الكتاب

وده أفضل تشبيه.

تخيل كتاب 1000 صفحة وعايز تعرف:

> كلمة "Database" موجودة فين؟

بدون Index:

```text
صفحة 1
	صفحة 2
		صفحة 3
			...
				صفحة 1000
```

لكن لو عندك Index في آخر الكتاب:

```text
Database → 245, 380, 721
```

تروح مباشرة للأماكن المطلوبة بدل ما تقرأ الكتاب كله.

الـ Database Index بيعمل فكرة مشابهة.

---

### طب الـ Index بيخزن إيه؟

مهم جدًا تفهم إن الـ Index **مش مجرد نسخة من الـ Column**.

مثلاً عندك:

```text
Products
--------------------------------
Id | Name
--------------------------------
1  | Mouse
2  | Laptop
3  | Keyboard
4  | Monitor
```

لو عملت Index على:

```text
Name
```

الـ Database بتبني structure مخصوص يساعدها في البحث والترتيب والوصول للـ rows.

في SQL Server، الـ Indexes غالبًا مبنية باستخدام **B-Tree structure**، وبشكل أدق أنواع الـ rowstore indexes تعتمد على B+ tree structure.


> بدل ما تدور على القيمة في كل الـ rows، عندك structure منظم يساعد الـ Database توصل للمكان المطلوب بسرعة.

### إيه اللي يحصل من غير Index؟

عندك:
```sql
SELECT *
FROM Users
WHERE Email = 'mahmoud@gmail.com';
```

والجدول فيه:
```text
5,000,000 Users
```

بدون Index على `Email`، ممكن يحصل:
```text
User 1       ❌
User 2       ❌
User 3       ❌
...
User 4,823,512   ✅
...
```

يعني Database محتاجة تعمل Scan على عدد كبير من الصفوف
وده يسمى غالبًا:

**Table Scan**

### لكن مع الIndex

لو عملنا:

```sql
CREATE INDEX IX_Users_Email
ON Users(Email);
```
الـ Database عندها Index على `Email`.

فبدل:
```text
Scan millions of rows
```

ممكن تعمل:

```text
Search Index
	Find Email
		Locate Row
```

وده ممكن يكون أسرع جدًا.

لكن مهم:

> وجود Index لا يضمن أن SQL Server سيستخدمه دائمًا. الـ Query Optimizer هو اللي بيقرر الـ Execution Plan المناسب.

### إمتى نعمل Index؟
غالبًا تفكر في Index لما Column بتستخدمه كثير في:

#### `WHERE`

```sql
SELECT *
FROM Users
WHERE Email = '...';
```
هنا:
```text
Email → Index candidate
```
#### `JOIN`

مثلاً:
```sql
SELECT *
FROM Orders o
JOIN Customers c
    ON o.CustomerId = c.Id;
```

الـ Foreign Key columns ممكن تكون مرشحة للـ Index حسب الـ workload والـ execution plans.
#### `ORDER BY`
```sql
SELECT *
FROM Products
ORDER BY Price;
```
الIndex مناسب على `Price` ممكن يساعد في بعض الحالات.
#### `GROUP BY`
```sql
SELECT CategoryId, COUNT(*)
FROM Products
GROUP BY CategoryId;
```
الـIndex على `CategoryId` ممكن يساعد حسب الـ query والـ data distribution.
#### Search

مثلاً:
```sql
WHERE Email = ...
WHERE NationalId = ...
WHERE OrderNumber = ...
```
دي أمثلة Columns غالبًا بنعمل عليها Indexes.

---
### Index في EF Core

بما إننا بنتكلم عن EF Core، ممكن تعمل:
```csharp
builder.HasIndex(p => p.Name);
```

فـEF Core هيترجم الـ Model Configuration دي إلى Index في الـ Database عن طريق Migration.
مثلاً:
```csharp
public class ProductConfiguration 
    : IEntityTypeConfiguration<Product>
{
    public void Configure(
        EntityTypeBuilder<Product> builder)
    {
        builder.HasIndex(p => p.Name);
    }
}
```
وبعدين:
```bash
dotnet ef migrations add AddProductNameIndex
```
ثم:
```bash
dotnet ef database update
```
في النهاية الـ Database هيكون عندها Index على `Name`.

### Unique Index

ودي مهمة جدًا.

ممكن تعمل:

```csharp
builder.HasIndex(u => u.Email)
    .IsUnique();
```
ده معناه:
> مش مسموح يكون عندي أكتر من User بنفس الـ Email.

يعني:

```text
mahmoud@gmail.com
```
مرة واحدة فقط.

لو حاولت تضيف:
```text
mahmoud@gmail.com
```
مرة ثانية، الـ Database هترفض العملية بسبب الـ unique constraint/index.

##### مثال

```csharp
public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
}
```

Configuration:

```csharp
builder.HasIndex(u => u.Email)
    .IsUnique();
```

وده أفضل من إنك تعتمد فقط على:

```csharp
if (emailExists)
{
    // ...
}
```
لأن ممكن يحصل **Race Condition** بين Request وRequest.
الـ Database نفسها لازم تفرض الـ uniqueness.

### Composite Index

مش لازم الـ Index يكون على Column واحدة.
ممكن تعمل Index على أكثر من Column:

```csharp
builder.HasIndex(o => new
{
    o.CustomerId,
    o.CreatedAt
});
```

ده اسمه: **Composite Index**

يعني Index على:

```text
(CustomerId, CreatedAt)
```

مثلاً عندك Query:

```csharp
var orders = await context.Orders
    .Where(o => o.CustomerId == customerId)
    .OrderByDescending(o => o.CreatedAt)
    .ToListAsync();
```

وجود Index مناسب على:

```text
CustomerId + CreatedAt
```

قد يساعد جدًا في هذا النوع من الاستعلامات.

#### ترتيب الـ Composite Index مهم جدًا

لو عندك:
```text
(CustomerId, CreatedAt)
```

فده **مش نفس**:
```text
(CreatedAt, CustomerId)
```

لأن ترتيب الأعمدة داخل الـ Index له تأثير على الـ Queries التي يستطيع الـ Index مساعدتها بكفاءة.
مثلاً:
```text
(CustomerId, CreatedAt)
```
مفيد جدًا لاستعلامات تبدأ بـ:
```sql
WHERE CustomerId = ...
```
لكن لو Query بتبحث فقط بـ:
```sql
WHERE CreatedAt = ...
```
فالـ Index ده مش بالضرورة يكون الاختيار المثالي.

دي نقطة مهمة جدًا في الـ Composite Indexes.

---
###  Index على Foreign Key

مثلاً:
```csharp
public class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public Customer Customer { get; set; }
}
```

ممكن يكون عندك:

```csharp
builder.HasIndex(o => o.CustomerId);
```

ليه؟

لأنك ممكن تعمل:

```csharp
var orders = await context.Orders
    .Where(o => o.CustomerId == customerId)
    .ToListAsync();
```

فالـ Index على:
```text
CustomerId
```

ممكن يساعد في الوصول للـ Orders الخاصة بالـ Customer.

**لكن ==مش قاعدة إن كل FK لازم تعمل عليه Index يدويًا.** EF Core/مزود قاعدة البيانات قد ينشئ Indexes في بعض الحالات وفقًا للعلاقة والإعدادات==، ويجب أن تراجع الـ migration والـ DB provider المستخدم.

### طيب ليه ما نعملش Index لكل حاجة؟

ودا الجزء المهم.

الـ Index ممتاز في **القراءة**، لكنه له تكلفة.

افترض:

```text
Products
```
وعندك:
```text
1,000,000 rows
```
وعملت Index على:
```text
Name
Price
Stock
CategoryId
CreatedAt
UpdatedAt
Description
...
```

أنت كده عملت عدد كبير جدًا من الـ Indexes.

المشكلة:

#### 1. مساحة تخزين

كل Index يحتاج مساحة.

```text
Table
+
Index 1
+
Index 2
+
Index 3
...
```

#### 2. الINSERT هيبقى مكلف اكتر

لما تعمل:
```sql
INSERT INTO Products ...
```

الـ Database مش هتضيف الـ Row للـ Table فقط.
لازم تحدث الـ Indexes المرتبطة بالـ Row كمان.

#### 3. الـUPDATE كمان هيبقى مكلف
لو عندك:

```sql
UPDATE Products
SET Price = 5000
WHERE Id = 10;
```

ولو `Price` داخل Index، لازم الـ Database تحدث الـ Index.
#### 4. كمان DELETE هيكون مكلف

لما تمسح Row، الـ Database لازم تحدث الـ Indexes وتشيل الـ entry المرتبط به.


### Selectivity مهمة

تخيل عندك Column:

```text
Gender
```

وفي Database فيها:

```text
Male
Female
```

فقط.

هل Index عليه هيكون مفيد دائمًا؟

مش بالضرورة.

لأن الـ Column عنده عدد قليل جدًا من القيم المختلفة.

لكن عندك:

```text
Email
```

مثلًا:

```text
1,000,000 users
999,000 different emails
```

هنا الـ Index غالبًا أكثر فائدة للبحث عن Email معين.

الفكرة دي مرتبطة بـ:

**Selectivity / Cardinality**

كل ما الـ values تكون أكثر تميزًا، غالبًا يكون الـ Index أكثر فائدة لعمليات equality filtering، لكن القرار النهائي يعتمد على الـ workload والـ execution plan.


### Clustered vs Non-Clustered

دي من أهم أنواع Indexes في SQL Server.

#### Clustered Index

الـ Clustered Index بيحدد طريقة تنظيم بيانات الـ rows نفسها في الـ table.

في SQL Server:

> الجدول يمكن أن يكون له **Clustered Index واحد فقط**.

لأن البيانات نفسها لا يمكن أن تكون مرتبة فعليًا بأكثر من طريقة في نفس الوقت.

==غالبًا الـ Primary Key بيكون Clustered بشكل افتراضي في SQL Server، **لكن ده convention/default behavior وليس قاعدة عامة لكل تصميم**.==

#### Non-Clustered Index

ده Index منفصل عن ترتيب البيانات الأساسي.

مثلاً:

```text
Table:
Products
```

وعندك:

```text
Clustered Index → Id
```

وممكن تعمل:

```text
Non-Clustered Index → Name
Non-Clustered Index → Price
Non-Clustered Index → CategoryId
```

فممكن يكون عندك عدة Non-Clustered Indexes.


### Covering Index

دي حاجة Advanced شوية لكنها مهمة.

افترض Query:
```sql
SELECT Name, Price
FROM Products
WHERE CategoryId = 5;
```
وعندك Index:
```text
CategoryId
```
الـ Database ممكن تستخدم الـ Index عشان تلاقي الـ rows، وبعدها تحتاج ترجع للـ Table عشان تجيب:
```text
Name
Price
```
ممكن في بعض الحالات تعمل Index فيه:
```text
CategoryId
```
كـ key، ومعاه:
```text
Name
Price
```
كـ included columns.
في EF Core:

```csharp
builder.HasIndex(p => p.CategoryId)
    .IncludeProperties(p => new
    {
        p.Name,
        p.Price
    });
```

==وده ممكن يخلي الـ Index نفسه يحتوي البيانات المطلوبة للـ Query==، فيقلل الحاجة للوصول للـ base table.

وده اسمه:

**Covering Index**

> دعم `IncludeProperties` يعتمد على الـ database provider؛ المثال هنا مناسب لـ SQL Server.

### Index مش سحر

ممكن تعمل:

```csharp
builder.HasIndex(p => p.Name);
```

وتلاقي Query لسه بطيئة.

ليه؟

لأن SQL Server عنده **Query Optimizer** بيقرر هل استخدام الـ Index أصلًا مفيد ولا لأ.

ممكن يقرر:

```text
Table Scan
```

أفضل من:

```text
Index Seek
```

مثلاً لو Query هترجع نسبة كبيرة جدًا من الجدول، استخدام Index قد لا يكون أفضل اختيار.

عشان كده في الـ Performance Optimization:

```text
Don't guess
		Inspect the Query
			Check Execution Plan
				Add/modify Index
					Measure again
```

### Index Seek vs Index Scan

مهم جدًا تعرف المصطلحين دول.

#### Index Seek

الـ Database بتستخدم الـ Index للوصول إلى جزء محدد من البيانات.

مثلاً:

```text
Email = specific email
```

فهي تدور على القيمة المطلوبة في الـ Index.
#### Index Scan

الـ Database بتمر على جزء كبير أو كل الـ Index.

وده ممكن يحصل لما الـ Query مش قادرة تحدد نطاق صغير بشكل فعال.

فمش معنى:
```text
Index Scan
```

إنه دائمًا سيئ.

ومش معنى:
```text
Index Seek
```
إنه دائمًا أفضل في كل حالة.

المهم هو **Execution Plan + Cost + actual workload**.

---

### مثال كامل في EF Core

عندك:

```csharp
public class Order
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public DateTime CreatedAt { get; set; }

    public string OrderNumber { get; set; }

    public decimal Total { get; set; }
}
```

Configuration:

```csharp
public class OrderConfiguration 
    : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(o => o.Id);

        builder.HasIndex(o => o.OrderNumber)
            .IsUnique();

        builder.HasIndex(o => new
        {
            o.CustomerId,
            o.CreatedAt
        });
    }
}
```

عندك هنا:

```text
Id
	Primary Key

OrderNumber
	Unique Index

CustomerId + CreatedAt
	Composite Index
```

وده منطقي لو الـ application عنده Queries متكررة بالشكل ده:

```csharp
var order = await context.Orders
    .FirstOrDefaultAsync(o =>
        o.OrderNumber == orderNumber);
```

أو:

```csharp
var orders = await context.Orders
    .Where(o => o.CustomerId == customerId)
    .OrderByDescending(o => o.CreatedAt)
    .ToListAsync();
```

---
## Performance Checklist

لما تكتب EF Core Query اسأل نفسك:

- هل محتاج كل الأعمدة؟
	- هروح على طول على Select

- طب هل البيانات Read Only؟
	- وانا مغمض اروح لـAsNoTracking

- هل ممكن يحصل N+1؟
	- هروح للInclude / Projection

- طب هل ممكن اجيب Data كتير؟
	- على طول هعمل Pagination

- هل Filtering بيحصل في DB؟
- على طول اخلي ال Where قبل ToList

- هل Search على Column بشكل متكرر؟
	- اعمل عليه Index واريح بالي


---

# 28. Advanced Mapping

## Owned Types

ممكن يكون عندك Object جوه Entity لكنك مش عايزه كـ Table مستقل.

مثال:

```csharp
public class Customer
{
    public int Id { get; set; }

    public string Name { get; set; }

    public Address Address { get; set; }
}
```

```csharp
public class Address
{
    public string City { get; set; }

    public string Street { get; set; }
}
```

ممكن تعمل:

```csharp
builder.OwnsOne(c => c.Address);
```

فـ `Address` مش لازم يبقى له Table مستقل، وبيتم تخزين بياناته مع `Customer`.

---

## Value Conversions

أحيانًا الـ C# type اللي عندك مختلف عن طريقة تخزينه في Database.

مثال:

```csharp
public enum OrderStatus
{
    Pending,
    Paid,
    Cancelled
}
```

ممكن تخليه يتخزن كـ String:

```csharp
builder.Property(o => o.Status)
    .HasConversion<string>();
```

فتبقى Database مثلًا:

```text
Pending
Paid
Cancelled
```

بدل:

```text
0
1
2
```

---

## Enum Mapping

ممكن تحدد طريقة تخزين الـ Enum باستخدام Fluent API:

```csharp
builder.Property(o => o.Status)
    .HasConversion<string>();
```

وده مفيد لو عايز الـ database تكون أكثر وضوحًا.

---

## Table Splitting

أكتر من Entity ممكن يستخدموا نفس الـ Table في حالات معينة.

مثال:

```text
Customer
CustomerDetails
```

ممكن بياناتهم تتخزن في نفس الـ Table.

ده اسمه:

**Table Splitting**

وهو Advanced scenario ومش هتستخدمه في كل Project.

---

## Inheritance Mapping

لو عندك:

```csharp
public abstract class Payment
{
    public int Id { get; set; }
}

public class CashPayment : Payment
{
}

public class CardPayment : Payment
{
}
```

EF Core يقدر يمثل الـ inheritance في Database بأكثر من Strategy.

أشهرها:

### TPH

**Table Per Hierarchy**

كل الـ types في Table واحدة:

```text
Payments
----------------
Id
Amount
Discriminator
```

والـ `Discriminator` يحدد:

```text
CashPayment
CardPayment
```

### TPT

**Table Per Type**

كل Type له Table.

```text
Payments
CashPayments
CardPayments
```

خلاصة الموضوع، Advanced Mapping بيديك تحكم في إزاي الـ Object Model بتاع C# يتحول إلى Database Model.

---

# 29. EF Core Architecture & Best Practices

هنا بنجمع الصورة كلها.

### الشكل الأساسي

```text
Controller
	Service
		DbContext
			EF Core
				Database Provider
					Database
```

مثال:

```text
GET /products
	ProductsController
		ProductService
			ApplicationDbContext
				EF Core
					SQL Server
```

---

## DbContext = Unit of Work

الـ `DbContext` بيجمع مجموعة من التغييرات وبيطبقها باستخدام:

```csharp
SaveChangesAsync();
```

مثال:

```csharp
product.Price = 100;
product.Stock = 20;

await context.SaveChangesAsync();
```

EF Core يعرف التغييرات ويولد SQL المناسب.

---

## Repository Pattern

ممكن تعمل:

```csharp
IProductRepository
ProductRepository
```

وتحط فيه عمليات الـ Database.

لكن مهم تعرف إن:

الـ**DbSet + DbContext أصلًا بيوفروا Repository/Unit of Work-like behavior.**

فمش معنى إنك بتستخدم EF Core إن لازم تعمل Repository لكل Entity.

خصوصًا إن Repository إضافي ممكن يبقى مجرد abstraction فوق abstraction من غير قيمة حقيقية.

---

## Service Layer

الـ Service غالبًا مكان مناسب للـ Business Logic.

مثال:

```text
Controller
	ProductService
		DbContext
```

Controller:

```csharp
[HttpPost]
public async Task<IActionResult> Create(ProductDto dto)
{
    var product = await service.CreateAsync(dto);

    return Ok(product);
}
```

Service:

```csharp
public async Task<Product> CreateAsync(ProductDto dto)
{
    var product = new Product
    {
        Name = dto.Name,
        Price = dto.Price
    };

    context.Products.Add(product);

    await context.SaveChangesAsync();

    return product;
}
```

الفكرة إن الـ Controller مش يبقى مليان Database + Business Logic.

---

## Don't Return Entities Blindly

في APIs غالبًا ==الأفضل تستخدم DTOs بدل ما ترجع الـ Entity مباشرة==:

```csharp
public class ProductDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }
}
```

وتعمل Projection:

```csharp
var products = await context.Products
    .Select(p => new ProductDto
    {
        Id = p.Id,
        Name = p.Name,
        Price = p.Price
    })
    .ToListAsync();
```

وده بيساعد في:

- تحديد الـ data اللي هترجع.
    
- تقليل الأعمدة المطلوبة من DB.
    
- منع تسريب Properties مش المفروض تظهر.
    
- فصل API Contract عن Database Entity.
    

---

## DbContext Lifetime

في ASP.NET Core غالبًا:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>();
```

وده بيخلي الـ DbContext غالبًا **Scoped**.

يعني Context لكل HTTP Request تقريبًا.

==ومتفضلش تستخدم نفس الـ DbContext لفترة طويلة جدًا؛ لأنه بيحتفظ بـ tracked entities وقد يزيد استهلاك الذاكرة ويعقد إدارة الـ state.==

# وصلى الله على محمد وعلى آله وصحبه وسلم