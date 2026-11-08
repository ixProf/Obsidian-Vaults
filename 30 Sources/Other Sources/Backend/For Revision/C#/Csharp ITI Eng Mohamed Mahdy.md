---
title: "Csharp ITI Eng Mohamed Mahdy"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

# Day 1:
---

## اي هو ال CLR ؟

**ال CLR وهو ما يعرف بال Common Language Runtime** وهو المحرك الي بيشغل برامج ال .NET
ومن وظائفه

| الوظيفة             | كيف تعمل                                                      |
| ------------------- | ------------------------------------------------------------- |
| بيشغل الكود         | بيشغل الكود الي تم تحويله لل CIL                              |
| الترجمة اللحظية JIT | بيحول ال CIL إلى كود native في لحظة التشغيل                   |
| إدارة الذاكرة       | بي Customize ال Memory وبيحررها بإستخدام ال Garbage Collector |
| الامان              | بيقدم وسائل آمان زي Code Access Security                      |
| التعامل مع الاخطاء  | بيعالج الاستثناءات او الاخطاء الي بتحصل في الruntime          |
| Threads             | بيتحكم في اجزاء مختلفة من البرنامج في نفس الوقت Multithreads  |

---
## اي هو ال BCL ؟

**ال bass Class Library** : هي مجموعة من الكلاسات الجاهزة الي بتوفرلك وظائف اساسية جاهزة زي التعامل مع النصوص والملفات وغيرها.

| المجال             | الكلاسات أو الوظائف المتاحة                 |
| ------------------ | ------------------------------------------- |
| التعامل مع النصوص  | `String`, `StringBuilder`                   |
| التعامل مع الملفات | `File`, `FileStream`, `Directory`           |
| الهياكل البيانية   | `List`, `Dictionary`, `Queue`, `Stack`      |
| التعامل مع الوقت   | `DateTime`, `TimeSpan`                      |
| الحوسبة الحسابية   | `Math`, `Random`                            |
| التعامل مع الأخطاء | `Exception`, `Try/Catch`                    |
| الإدخال والإخراج   | `Console.ReadLine()`, `Console.WriteLine()` |
| البرمجة الكائنية   | `Object`, `Type`, `Equals`, `ToString()`    |

---
## اي هو ال NuGet Package Manager ؟

عبارة عن ملف مضغوط يحتوي على مكتبات جاهزة او اكواد جاهزة بمعلومات عنها مثل 
Newtonsoft.json , Entityframework , Dapper , Nunit , Serilog

وهدفها توفير وقت كبير للمبرمجين بدل ما تكتب كل حاجه من الصفر

---
## Project vs Solution vs Package

##  Solution – "العَلبة الكبيرة"

هو "الحاوية الكبيرة" اللي بتجمع مجموعة من **المشاريع (Projects)** مع بعض.
هدفها تنظم شغلك لما يكون عندك أكتر من مشروع مرتبطين ببعض.

 مثال:

لو بتعمل تطبيق كبير مكوّن من:

- مشروع لواجهة المستخدم (UI)
- مشروع لقاعدة البيانات (DAL)
- مشروع للكود المشترك (Shared Lib)

كل دول هيتجمعوا في **Solution واحدة**.

---
##  **Project (المشروع)** – "الحاجه الي فيها الكود بتاعك"

هو الوحدة اللي بتحتوي على كود فعلي. ويا اما بتتحول ل dll ودي المكتبة او exe ودا الكونسول او غيره.

---

## **Package (الحزمة أو الباكيج)** – "كود جاهز خارجي"

هي مكتبة جاهزة بتكون عبارة عن كود مكتوب ومجمّع من قبل حد تاني، وانت بتستخدمه في مشروعك عشان توفّر وقت. بتيجي من **NuGet**

 أمثلة:

- `Newtonsoft.Json` ← للتعامل مع JSON
- `EntityFramework` ← للوصول لقاعدة البيانات
- `Dapper`, `AutoMapper`, إلخ.

---
## Type Safe:

**Type Safe** = "أمان النوع"

يعني إن اللغة (زي C#) **بتمنعك تتعامل مع الأنواع (types) بشكل غلط**.  
يعني:

- ماينفعش تجمع `int` مع `string` من غير تحويل.
- ماينفعش تدخل `null` في نوع مش بيدعمه.
- ماينفعش تحوّل قيمة مش مناسبة لنوع البيانات.



مثال على Type Unsafe (لو مش Type Safe):

```csharp
string age = "عشرين";
int result = int.Parse(age);  // ❌ هيكسر البرنامج وقت التشغيل (Runtime Exception)
```

- هنا `Parse()` مش قادر يحوّل "عشرين" لـ int
    
- فهيديك **Exception** → ده مش آمن!
    


إزاي `TryParse()` بيحقق Type Safety؟

`TryParse()` هي دالة موجودة في C# هدفها إنها **تحوّل string إلى نوع تاني (زي int أو double)** لكن **بطريقة آمنة**.
 الشكل العام:

```csharp
bool success = int.TryParse(string input, out int result);
```

- لو التحويل نجح → `success = true`، و `result` فيها القيمة.
- لو فشل → `success = false`، و `result = 0`.

---
## امتى تستخدم كل نوع من الـ loops:

### `for` loop – الأفضل لما تكون عارف عدد المرات:

- **أمثلة الاستخدام:** لما تحب تكرر حاجة عدد مرات محدد، زي طباعة الأرقام من 1 لـ 10.
    

    ```csharp
    for (int i = 0; i < 10; i++)
    {
        Console.WriteLine(i);
    }
    ```

---

###  `while` loop – الأفضل لما مش عارف عدد التكرار:

- **أمثلة الاستخدام:** لما التكرار يعتمد على شرط بيتغير أثناء التشغيل (runtime)، زي قراءة البيانات من ملف لحد ما يوصل للنهاية.
    
-  **مثال:**

    ```csharp
    while (input != "exit")
    {
        input = Console.ReadLine();
    }
    ```


---

###  `do...while` loop – الأفضل لما محتاج تنفذ الكود مرة واحدة على الأقل:

- **ليه؟** لأن الكود بيتنفذ أولًا، وبعدين الشرط بيتفحص.
    
- **أمثلة الاستخدام:** إدخال المستخدم لازم يتم مرة على الأقل حتى لو كتب خطأ.
    
- ✅ **مثال:**
    
    ```csharp
    string input;
    do
    {
        input = Console.ReadLine();
    } while (input != "exit");
    ```
    

---

# Day 2:

## Runtime vs Compile time
###  **Compile Time**

**وقت الترجمة**

- هو الوقت اللي فيه الكود بيتحوّل من C# (أو أي لغة) إلى IL.
- بيتم فيه اكتشاف **أخطاء اللغة (Syntax errors)**.
- بتدخل فيه أدوات زي الـ **Compiler**

مثال:  
لو نسيت تحط `;` في نهاية السطر → **خطأ وقت الترجمة**.

---
##  **Runtime**

**وقت التشغيل**

- هو الوقت اللي فيه البرنامج بيشتغل فعليًا على الجهاز.
- هنا يتم تنفيذ الكود عبر **CLR**.
- بيظهر فيه **أخطاء التشغيل (Runtime Errors)** زي القسمة على صفر أو قراءة ملف مش موجود.
 مثال:  
لو حاولت تقسم رقم على صفر → **خطأ وقت التشغيل**.

|العنصر|Compile Time|Runtime|
|---|---|---|
|المعنى|وقت ترجمة الكود|وقت تنفيذ البرنامج|
|الأدوات|Compiler|CLR / Runtime Environment|
|نوع الأخطاء|Syntax / Type Errors|Exceptions / Logic Errors|

---

## Dynamic vs Object vs Var

##  `var`

- نوع متغير **بيتم تحديده تلقائيًا** من القيمة المُسندة.
- **بيتحلل في Compile Time**.
- لا يمكن تغيير نوعه بعد التعيين الأول.
- يُستخدم **لتقليل حجم الكود** لما يكون النوع واضح.

🧠 **مثال:**

```csharp
var x = 10; // نوعه int
x = "hello"; // ❌ خطأ
```

---

##  `object`

- هو **أصل كل الأنواع في .NET** (base class).
- تقدر تخزن فيه **أي نوع بيانات**.
- علشان تستخدم القيمة الأصلية، لازم **تكاست** (Unboxing).
- بيستخدم في **التعامل العام مع الأنواع**.

🧠 **مثال:**

```csharp
object x = 5;          // Boxing
int y = (int)x;        // Unboxing
```

---

## `dynamic`

- بيقبل أي نوع من البيانات.
- النوع بيتحدد **في Runtime** (مش في Compile time).
- مناسب جدًا مع JSON, XML, COM Objects.
- مفيش فحص للنوع وقت الترجمة، فـ الأخطاء ممكن تظهر وقت التشغيل.

🧠 **مثال:**

```csharp
dynamic x = 10;
x = "Hello"; // مسموح
Console.WriteLine(x.ToUpper()); // تمام لو x string، لكن Runtime error لو مش
```

---

### Which one is type safe?

|النوع|Type Safe؟|السبب|
|---|---|---|
|`var`|✅ نعم|لأن النوع بيتحدد في وقت الترجمة (Compile Time) ومش ممكن تغييره بعد كده. أي خطأ في النوع هيظهر وقت الترجمة.|
|`object`|❌ لأ|لأنك ممكن تخزن أي نوع، ولو عملت casting غلط → Runtime error.|
|`dynamic`|❌ لأ|لأن النوع بيتحدد وقت التشغيل، ومفيش فحص نوعي وقت الترجمة. أي خطأ هيبان وقت التشغيل مش الترجمة.|

---
 أمثلة:

###  `var`:

```csharp
var x = 5;
x = "hello"; // ❌ Compile-time error → Type Safe ✅
```

###  `object`:

```csharp
object x = "hello";
int y = (int)x; // ❌ Runtime error → Not Type Safe
```

###  `dynamic`:

```csharp
dynamic x = "hello";
Console.WriteLine(x.NonExistingMethod()); // ❌ Runtime error → Not Type Safe
```

---

# Day 3: Properties


## Auto Properties
- C# بتقوم تلقائيًا بإنشاء **حقل مخفي (backing field)**.
- مناسبة لو مش محتاج تضيف منطق (logic) في `get` أو `set`.
- الكود بيكون مختصر وسهل.

 مثال

```csharp
public class Person
{
    public string Name { get; set; }
}
```



```csharp
private string _name;
public string Name
{
    get { return _name; }
    set { _name = value; }
}
```

---

## ✅ ثانيًا: Full Properties

- أنت اللي بتكتب `get` و `set` بنفسك.
- بتستخدمها لما تكون محتاج تضيف **منطق معين** أو **تحكم إضافي**.
 مثال:

```csharp
public class Person
{
    private string _name;

    public string Name
    {
        get { return _name; }
        set
        {
            if (!string.IsNullOrWhiteSpace(value))
                _name = value;
        }
    }
}
```

##  `static member` vs `static constructor`


---

### 🔹 **Static Member **

###  يعني ايه؟

- هو **متغير** أو **دالة** (method) أو **خاصية** (property) بتتبع **الكلاس نفسه** مش الكائن (object).
- مينفعش تستخدمها إلا عن طريق **اسم الكلاس مباشرة**. 
- كل الكائنات بتشارك نفس القيمة.

### مثال:

```csharp
class MathUtil
{
    public static double Pi = 3.14;

    public static double Square(double x)
    {
        return x * x;
    }
}


Console.WriteLine(MathUtil.Pi);
Console.WriteLine(MathUtil.Square(5));
```

---

## 🔹 **Static Constructor**

### 📌 يعني إيه؟

- هو **constructor خاص** بيُستخدم لتهيئة البيانات الثابتة
- بيتنفذ **مرة واحدة فقط** عند أول استخدام للكلاس.
- **ملوش  parameters**.
- **مينفعش تستدعيه بنفسك** – CLR بتنفذه تلقائي.


### مثال:

```csharp
class Logger
{
    public static string Path;


    static Logger()
    {
        Path = "log.txt";
        Console.WriteLine("Static constructor called");
    }

    public static void Log(string message)
    {

    }
}
```

لو ناديت:

```csharp
Logger.Log("Test");
```

هتلاقي إنه بيطبع:

```
Static constructor called
```

(أول مرة بس)


|العنصر|Static Member|Static Constructor|
|---|---|---|
|**بيشتغل إزاي؟**|تستخدمه مباشرة باسم الكلاس|بيتنفذ تلقائي مرة واحدة قبل أول استخدام|
|**ينفع تديله args؟**|نعم لو method|❌ لا يقبل أي arguments|
|**عدد مرات التنفيذ**|ممكن تستدعيه كتير|مرة واحدة بس طوال عمر البرنامج|
|**وظيفته**|تخزين أو تنفيذ عمليات ثابتة|تهيئة الأعضاء الثابتة|

---

# Day 4

> **`virtual` vs `override` vs `new`**

بطريقة مبسطة وسهلة وباللغة المصرية:

---

## ✅ أولًا: `virtual`

- بنستخدمها في **الكلاس الأب (base class)**.
- معناها إن **الميثود دي ممكن يتعدل سلوكها** في الكلاس اللي بيورّث منها.


### 📌 مثال:

```csharp
class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal speaks");
    }
}
```

---

## ✅ ثانيًا: `override`

- بنستخدمها في **الكلاس الإبن (derived class)**.
    
- معناها إنك **بتغيّر سلوك ميثود virtual** من الكلاس الأب.
    

### 📌 مثال:

```csharp
class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Dog barks");
    }
}
```

---

## ✅ ثالثًا: `new`

- بنستخدمها في الكلاس الإبن لما **مش عايز تغير السلوك الأصلي (virtual override)**، لكن **تخبي** ميثود الكلاس الأب وتحط واحدة جديدة بنفس الاسم.
- مش ربط ديناميكي (static hiding).
    

### 📌 مثال:

```csharp
class Cat : Animal
{
    public new void Speak()
    {
        Console.WriteLine("Cat meows");
    }
}
```

---

## 🔍 الفرق العملي

```csharp
Animal a = new Dog();
a.Speak(); // 🟢 يطبع "Dog barks" (لأنها virtual و override)

Animal a2 = new Cat();
a2.Speak(); // 🔴 يطبع "Animal speaks" (لأن new مش override)
```

---

## 🧠 خلاصة الجدول:

|الكلمة|مكانها|معناها|يدعم Polymorphism؟|
|---|---|---|---|
|`virtual`|في الكلاس الأب|بيفتح الباب إن الميثود تتعدل في الأبناء|✅ نعم|
|`override`|في الكلاس الإبن|بتعدّل سلوك `virtual` من الكلاس الأب|✅ نعم|
|`new`|في الكلاس الإبن|بتخبي ميثود الأب وتحط واحدة جديدة بنفس الاسم|❌ لأ|

---

# Day 5

## Interface vs Abstruct Class

- Interface
- حاجه بتحدد إلى انت لازم تعمله في الكلاسات ( زي عقد كدا )
- Abstruct Class
- كلاس لا يمكن إن شاء Object منه ويمكن ان يحتوي على Partial Implementation


|                                                   | Abstruct Class | Interface |
| ------------------------------------------------- | -------------- | --------- |
| هل ينفع يكون فيها Abstruct Method , Normal Method | ✅              | ✅         |
| Fields                                            | ✅              | ❎         |
| Properties                                        | ✅              | ✅         |
| Constructor                                       | ✅              | ❎         |
| Multiple Inheritance                              | ❎              | ✅         |

لو عايز تحدد سلوك فقط بدون Logic تنفيذي --> **Interface**
عايز توفر كود مشترك بين الكلاسات --> Abstruct Class

---

## Override Vs New

### override
بتستخدمها لما تحب تغير سلوك دالة موجودة في الاب وشرط اساسي ان كلاس الاب يكون فيها دالة Virtual , Abstruct
### new
لو عندك دالة في كلاس الاب، وتحب تعمل دالة جديدة بنفس الاسم في كلاس الابن بدون ما تورثها فعليا، استخدم new


| new                                               | override                     |
| ------------------------------------------------- | ---------------------------- |
| بيغير سلوك الدالة حسب نوع المتغير في Compile time | بيغير سلوك الدالة في runtime |
| بيخفي الدالة الاصلية                              | بيستبدل الدالة الاصلية       |
| بيعرف دالة جديدة كليا بنفس الإسم                  | بيغير سلوك الدالة الموروثة   |

---

# Day 6

## Lists

الـ ` <List<T` هي **هيكل بيانات ديناميكي** يُستخدم لتخزين بيانات **مرتبة بشكل تسلسلي**. يعني كل عنصر له **موقع (Index)** يبدأ من 0، وبتقدر توصل لأي عنصر باستخدام رقمه.

- Resizable array (dynamic array)
حجمها متغير غير ثابت
- Duplicates: Allowed ✅
تسمح بالتكرار
```cs
List<T> names = new List<T> {/* Content */}
```

- List Store Sequential Data.
تخزن البيانات بشكل تسلسلي (indexes)
- Frequent Addition/Removals at the end.
تقدر تضيف او تحذف زي ما تحب من الاخر عادي

### **Behind the Scene**

- internally backed by an array.
- ال List عبارة عن اراي داخلية بتخزن فيها البيانات
```cs
List<int> nums = new List<int>();
==
int[] internalArray = new int[4] // for example
```

- When the internal arrary is full?
	- لما العدد الفعلي للعناصر (Count) يوصل للحد الأقصى لسعة الـ array الداخلي (Capacity)، لازم يكبّر المساحة. ف اي الي بيحصل ؟
		- هيضاعف الحجم : يعني لو الـ array كان فيه مكان لـ 4 عناصر فقط، هيتم استبداله بـ array جديد فيه **8 عناصر**.

		- كل العناصر القديمة يتم نسخها إلى المصفوفة الجديدة والعملية دي ال time complexity بتاعها O(n) لأنه بينقل العناصر عنصر عنصر

### Methods of List

```cs
Add(item) - Adds an item to the end
Insert(index,item) - Inserts at a specific position
Remove(item) - Remove the first Occurrence
RemoveAt(index) - Removes by index
Contains(item) - Checks if the item exists
IndexOf(item) - Return index of first match
Sort() / Reverse() - Sorts or reverse the list
Count - Get the number of elements
Clear() - Removes all elements
```
#### Time Complexity of List : O(n)

---

## Dictionary <TKey,TValue>


### أولًا: ما هو الـ `Dictionary`؟

`Dictionary` هو **هيكل بيانات** بيخزن **أزواج من المفتاح والقيمة (Key-Value Pairs)**، بحيث تقدر توصل للقيمة بسرعة عن طريق المفتاح.

لكن السؤال هو: **إزاي بيوصل للقيمة بسرعة؟**  
الإجابة: باستخدام **Hash Table** داخليًا.

---

### ثانيًا: Under the Hood – كيف يعمل داخليًا؟

النقطة الأولى:

> **Backed by buckets + entries arrays**

- الـ `Dictionary` مش مجرد قائمة أو Array، لكنه بيستخدم:
    
    - **Buckets Array** → بتحدد الأماكن (المؤشرات) حسب Hash.
        
    - **Entries Array** → بتخزن كل مفتاح وقيمته وبيانات أخرى.
        

 تركيب الـ Entry:

كل Entry (عنصر في القاموس) بيتكون من:

| الحقل      | وظيفته                                              |
| ---------- | --------------------------------------------------- |
| `hashCode` | القيمة الناتجة من `key.GetHashCode()`               |
| `key`      | المفتاح                                             |
| `value`    | القيمة المرتبطة بالمفتاح                            |
| `next`     | مؤشر للعنصر التالي في نفس الـ bucket (لو حصل تصادم) |

---

 💡 النقطة الثانية:

> **Each key is a bucket**

- لما تضيف عنصر زي:
    
    ```csharp
    myDict["علي"] = 25;
    ```

- البرنامج بيعمل:
    
    ```csharp
    int hashCode = "علي".GetHashCode();
    int bucketIndex = hashCode % buckets.Length;
    ```

- الرقم الناتج (`bucketIndex`) هو مكان العنصر في المصفوفة الأولى `buckets`.
    

---

النقطة الثالثة:

> **Bucket handled via linked list chainin**

ما معنى ده؟

لو أكتر من مفتاح وقع في نفس `bucketIndex` (بسبب إنهم أعطوا نفس نتيجة الـ Hash)، لازم نخزنهم في نفس المكان.

 
 الحل:

نربطهم مع بعض باستخدام **Linked List**.

يعني:

- كل bucket ممكن يحتوي على أكتر من عنصر، لكن متسلسلين عبر `next` pointers داخل الـ `entries` array.

---

 خطوات الإضافة (Add):

1. **تحسب الهاش للمفتاح**.
2. **تحدد الباكت المناسب** باستخدام `%`.
3. **تبحث إذا فيه عنصر بنفس المفتاح موجود**:
    
    - لو موجود → Error (Duplicate key).
    - لو مش موجود → تضيف العنصر في الـ entry الجديد.
    
4. **تربط العنصر الجديد** في أول ال Linked List داخل الباكت (Linked list).


---

 مثال عملي من الداخل:

```csharp
Dictionary<string, int> dict = new Dictionary<string, int>();
dict["علي"] = 25;
dict["منى"] = 30;
dict["خالد"] = 28;
```

افترض:

- `"علي"` و `"خالد"` طلعوا لهم نفس `bucketIndex = 2`.


النتيجة في الميموري تبقى كده:

```
buckets[2] ---> Entry1 ("خالد", 28) ---> Entry2 ("علي", 25)
```

- **منى** راحت لبكت مختلف، مثلًا `buckets[4]`.


---
 ملخص كامل:

| العنصر                   | الوصف                                                      |
| ------------------------ | ---------------------------------------------------------- |
| **Bucket**               | خانة من المصفوفة تحدد أين يتم تخزين العنصر                 |
| **HashCode**             | رقم يمثل المفتاح ناتج من `GetHashCode()`                   |
| **Linked List Chaining** | طريقة لربط عدة عناصر داخل نفس الـ bucket عند التصادم       |
| **سرعة البحث**           | تقريبًا O(1) في أفضل الحالات، وO(n) في حالة كثرة التصادمات |

---
