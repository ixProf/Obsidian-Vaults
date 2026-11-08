---
title: "Revision on OOP"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages]
created: 2026-09-21
updated: 2026-10-27
source:
related: []
---


# Defining Class

- OOP is s a Programming Paradigm that allows you to package together data states and functionallity

## Syntax of class

`<Class Modifier> class <Class Name> {class block}`
```cs
public class Employee 
{
	public string name {get; set;}
	public int age {get; set;}
	public decimal salary {get; set;}
}
```

---
### Class Modifiers


في C#، **معدّلات الكلاس** هي كلمات مفتاحية تُستخدم لتحديد **إمكانية الوصول** (accessibility)، **السلوك** (behavior)، أو **نطاق الاستخدام** (scope) الخاص بالكلاس.  
هذه المعدّلات تؤثر على طريقة استخدام الكلاس، وراثته، والوصول إليه.

---

#### Access Modifiers in C#'
هذه المعدّلات تتحكم في **مين يقدر يشوف أو يستخدم الكلاس**:

| المعدّل              | الشرح                                                                             |
| -------------------- | --------------------------------------------------------------------------------- |
| `public`             | الكلاس متاح للجميع، يمكن الوصول له من أي مكان.                                    |
| `internal`           | الكلاس متاح **فقط داخل نفس المشروع أو الـ assembly**.                             |
| `private`            | غير مسموح به للكلاسات العلوية (Top-level)، يُستخدم فقط مع الكلاسات المتداخلة.     |
| `protected`          | يُستخدم مع الكلاسات المتداخلة، ويسمح بالوصول من داخل الكلاس ومن الكلاسات المشتقة. |
| `protected internal` | متاح من داخل نفس المشروع أو من الكلاسات المشتقة.                                  |
| `private protected`  | متاح فقط من داخل الكلاس الأساسي أو من الكلاسات المشتقة **داخل نفس المشروع فقط**.  |

---

#### Inheritance Modifiers

تُستخدم للتحكم في **سلوك الوراثة للكلاس**:

| المعدّل    | الشرح                                                                                |
| ---------- | ------------------------------------------------------------------------------------ |
| `abstract` | كلاس مجرد (ما ينفعش نعمل منه كائن مباشر). الغرض منه إنه يتورث ويحتوي على دوال مجردة. |
| `sealed`   | كلاس مختوم، يعني ما ينفعش كلاس تاني يورثه.                                           |
| `static`   | كلاس ثابت، ما ينفعش نعمل منه كائن ولا نرثه، ويحتوي فقط على أعضاء static.             |
| `partial`  | يسمح بتقسيم تعريف الكلاس على أكتر من ملف داخل نفس المشروع.                           |

---


# Class vs Object



## 🔷 Class (الكلاس) — **التصميم**

- الكلاس هو **قالب** (template) أو **مخطط** (blueprint) لإنشاء الكائنات.
- يحتوي على **الخصائص (properties)** و**الدوال (methods)** اللي هتكون موجودة في الكائنات اللي هتتعمل منه.
- ما بياعملش أي حاجة لوحده، لازم نعمل منه كائن.


##### مثال:

```csharp
public class Car
{
    public string color;
    public void Drive()
    {
        Console.WriteLine("The car is driving.");
    }
}
```

دي كده مجرد **تعريف** لكائن اسمه `Car`، لكن لسه ما استخدمناهوش.

---

## 🔶 Object (الكائن) — **النسخة الحية من الكلاس**

- الـ object هو **نسخة حقيقية من الكلاس**.
- لما تنشئ object من class، تقدر تتعامل مع البيانات والدوال اللي جوه الكلاس.
- تقدر تعمل أكتر من object من نفس الكلاس، وكل واحد فيهم ممكن يكون ليه بيانات مختلفة.
- بيتخزن في ال Stack والداتا بتاعته بتتخزن في ال Heap

##### مثال:

```csharp
Car myCar = new Car();         // إنشاء كائن
myCar.color = "Red";           // تحديد خاصية
myCar.Drive();                 // استدعاء دالة
```

هنا:

- `Car` → الكلاس (القالب).
- `myCar` → object (كائن من الكلاس ده).
- `myCar.color` → خاصية في الكائن.
- `myCar.Drive()` → دالة من الكائن.

---
# Topics of Methods :

### Method Overloading

- كتابة اكثر من دالة بنفس الإسم بس بإختلاف
	1. عدد الباراميترز
	2. نوع الباراميترز
	3. ترتيب الباراميترز

```cs
using System;

public class Calculator
{
    // دالة أولى: تجمع عددين صحيحين
    public int Add(int a, int b)
    {
        return a + b;
    }

    // دالة تانية: تجمع 3 أعداد صحيحة
    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }

    // دالة تالتة: تجمع عدد عشري وعدد صحيح
    public double Add(double a, int b)
    {
        return a + b;
    }
}

class Program
{
    static void Main()
    {
        Calculator calc = new Calculator();

        Console.WriteLine(calc.Add(2, 3));          // ناتجها: 5
        Console.WriteLine(calc.Add(1, 2, 3));       // ناتجها: 6
        Console.WriteLine(calc.Add(2.5, 4));        // ناتجها: 6.5
    }
}
```

---

### Local Method

وهي ميثود داخل ميثود 
```cs
void print message (string name){
  string getGreeting(){
	  return "Hello, "+ name;
  }
  Console.WriteLine(getGreeting());
}
```

---



#  Constructor in C#'

الـ **constructor** هو method خاصة في الكلاس بتشتغل تلقائيًا لما تعمل object (كائن) جديد من الكلاس.

### ✅ وظيفته:

- تعيين قيم مبدئية للمتغيرات (data members) الخاصة بالكلاس.
- ممكن يكون بدون باراميترات أو ياخد باراميترات على حسب الحاجة.

---

## 🧩 أنواع الـ Constructor:

| النوع                         | الشرح                                                  |
| ----------------------------- | ------------------------------------------------------ |
| **Default Constructor**       | Constructor بدون باراميترات.                           |
| **Parameterized Constructor** | Constructor بياخد باراميترات لتحديد القيم وقت الإنشاء. |
| **Static Constructor**        | بيشتغل مرة واحدة فقط لتجهيز البيانات الـ `static`.     |
| **Copy Constructor**          | بيعمل نسخة من object تاني (ممكن تنفيذه يدويًا في C#).  |

---

## 🧪 Example:

```csharp
using System;

public class Student
{
    public string name;
    public int age;

    // Default Constructor
    public Student()
    {
        name = "Unknown";
        age = 0;
    }

    // Parameterized Constructor
    public Student(string studentName, int studentAge)
    {
        name = studentName;
        age = studentAge;
    }

    // Static Constructor
    static Student()
    {
        Console.WriteLine("Static constructor called.");
    }

    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {name}, Age: {age}");
    }
}

class Program
{
    static void Main()
    {
        Student s1 = new Student();                  // Default constructor
        s1.DisplayInfo();                            // Output: Name: Unknown, Age: 0

        Student s2 = new Student("Ali", 21);         // Parameterized constructor
        s2.DisplayInfo();                            // Output: Name: Ali, Age: 21
    }
}
```

---

## 🎯 ملاحظات:

- Constructor بيشتغل أول ما تعمل object باستخدام `new`.
- لو ما كتبتش Constructor، C# هتعمل واحد default تلقائيًا.    
- تقدر تعمل أكثر من Constructor بنفس الاسم بشرط اختلاف عدد أو نوع الباراميترات (Overloading).

---


## 📋 Copy Constructor في C#

### ✅ التعريف:

الـ **Copy Constructor** هو نوع خاص من الـ constructors بيُستخدم لعمل **نسخة من كائن (object)** موجود بالفعل.  
يعني بنعمل object جديد ونعطيه نفس بيانات object موجود.

> **ملاحظة:** C# مش فيها copy constructor بشكل مدمج زي C++، لكن تقدر تنفّذه يدويًا عن طريق تمرير object لكـ constructor.

---

## 🧪 مثال عملي:

```csharp
using System;

public class Student
{
    public string name;
    public int age;

    // Parameterized Constructor
    public Student(string studentName, int studentAge)
    {
        name = studentName;
        age = studentAge;
    }

    // Copy Constructor
    public Student(Student other)
    {
        name = other.name;
        age = other.age;
    }

    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {name}, Age: {age}");
    }
}

class Program
{
    static void Main()
    {
        // Original object
        Student s1 = new Student("Sara", 22);
        s1.DisplayInfo();  // Output: Name: Sara, Age: 22

        // Copy object using Copy Constructor
        Student s2 = new Student(s1);
        s2.DisplayInfo();  // Output: Name: Sara, Age: 22
    }
}
```

---

# Encaspulation

## 🛡️ ما هي Encapsulation في C#؟

**Encapsulation** معناها إنك **تخفي البيانات (Data Hiding)** داخل الكلاس، وتتحكم في الوصول ليها من خلال **خصائص (Properties)** أو **methods**.

يعني:

- تخلي البيانات `private` (غير قابلة للوصول مباشرة).
    
- وتوفّر طريقة آمنة للوصول أو التعديل عليها (زي `get` و `set`).
    

---

## ✅ فوائد الـ Encapsulation:

1. حماية البيانات من التغيير الخاطئ.
2. تنظيم الكود والتحكم في طريقة الوصول للبيانات.
3. تسهّل الصيانة والتوسيع في المستقبل.

---

## 🧪 مثال عملي:

```csharp
using System;

public class Person
{

    private string name;
    private int age;


    public string Name
    {
        get { return name; }
        set { name = value; }
    }


    public int Age
    {
        get { return age; }
        set
        {
            if (value >= 0)
                age = value;
            else
                Console.WriteLine("Age must be non-negative!");
        }
    }

    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {name}, Age: {age}");
    }
}
```

```csharp
class Program
{
    static void Main()
    {
        Person p = new Person();
        p.Name = "Ali";
        p.Age = 25;

        p.DisplayInfo();  

        p.Age = -5;       
    }
}
```


---

# **Destructor**

### ✅ ما هو الـ Destructor؟

الـ **Destructor** هو method خاصة بيتم تنفيذها **عند تدمير الكائن (object)** — يعني لما مفيش أي متغير بيستخدمه، ويتم تنظيفه من الذاكرة عن طريق الـ **Garbage Collector**.

### 🧠 هدفه:

تحرير الموارد مثل:

- الملفات المفتوحة
    
- الاتصال بقاعدة البيانات
    
- موارد غير مُدارة (Unmanaged resources)
    

---

### 📝 الشكل العام للـ Destructor:

```csharp
class MyClass
{
    // Destructor
    ~MyClass()
    {
        Console.WriteLine("Destructor called");
    }
}
```

---

### ⚠️ ملاحظات مهمة:

- Destructor **لا يقبل باراميترات**، ولا يمكن استدعاؤه يدويًا.
    
- بيتنادى تلقائيًا بواسطة **Garbage Collector**.
    
- لا يمكن عمل أكثر من Destructor في نفس الكلاس.
    
- يُستخدم نادرًا في C# لأن الـ .NET runtime بيهتم بإدارة الذاكرة.
    

---

### 🧪 مثال عملي:

```csharp
class Test
{
    public Test()
    {
        Console.WriteLine("Constructor called");
    }

    ~Test()
    {
        Console.WriteLine("Destructor called");
    }
}

class Program
{
    static void Main()
    {
        Test t = new Test();
    }
}
```

> ممكن ما تشوفش الـ "Destructor called" في نفس الوقت، لأنه بيحصل وقت غير محدد لما الجاربيج كولكتور يشتغل.

---


#  **Access Modifiers**:

بتتحكّم في **مين يقدر يشوف أو يستخدم** المتغيرات أو الدوال أو الكلاسات.

|Modifier|الوصف بالعربي|
|---|---|
|`public`|متاح من أي مكان (من أي كلاس أو مشروع).|
|`private`|متاح فقط داخل نفس الكلاس. (افتراضي للأعضاء).|
|`protected`|متاح داخل نفس الكلاس **أو** أي كلاس وارث منه (الوراثة).|
|`internal`|متاح داخل نفس الـ **assembly** (يعني نفس المشروع).|
|`protected internal`|متاح في نفس المشروع **أو** من كلاس وارث في مشروع تاني.|
|`private protected`|متاح في نفس الكلاس أو الكلاسات الوراثة منه **داخل نفس المشروع فقط**.|

---

##  **static**, **const**, **readonly**

### 1️⃣ `static`

- تعني إن العنصر **يتبع الكلاس نفسه** وليس لأي كائن منه.
    
- يمكن الوصول إليه مباشرة بدون إنشاء object.
    

```csharp
class MathUtil
{
    public static int Square(int x)
    {
        return x * x;
    }
}

// الاستخدام
int result = MathUtil.Square(5);  // 25
```

---

### 2️⃣ `const` (ثابت وقت الترجمة)

- قيمة **ثابتة لا يمكن تغييرها** أبدًا.
    
- **يجب تعيين القيمة وقت التعريف.**
    

```csharp
public class Constants
{
    public const double Pi = 3.14;
}
```

- يتم استبدال القيمة أثناء الترجمة (compile-time).
    

---

### 3️⃣ `readonly` (ثابت بعد التهيئة)

- يمكن تعيينه فقط في:
    
    - وقت التعريف،
        
    - أو داخل الـ **constructor**.
        
- لا يمكن تغييره بعد إنشاء الكائن.
    

```csharp
public class Circle
{
    public readonly double Radius;

    public Circle(double r)
    {
        Radius = r;  // مسموح هنا
    }

    public void TryChange()
    {
        // Radius = 10; ❌ غير مسموح
    }
}
```

---
## 💡 مثال شامل:

```csharp
public class Example
{
    public const string Type = "Fixed";          // ثابت نهائي
    public static int Counter = 0;               // ثابت للكلاس كله
    public readonly int ID;                      // ثابت بعد الإنشاء

    public Example(int id)
    {
        ID = id;
        Counter++;
    }
}
```

---

# `this` Keyword:

### ✅ 1. التمييز بين المتغيرات:

لما اسم المتغير المحلي (parameter) يكون نفس اسم متغير الكلاس، بنستخدم `this` علشان نفرّق بينهم.

```csharp
class Student
{
    private string name;

    public Student(string name)
    {
        this.name = name; // this.name يشير للمتغير الخاص بالكلاس
    }
}
```

---

### ✅ 2. استدعاء Constructor آخر داخل نفس الكلاس (Constructor Chaining)

```csharp
class Student
{
    private string name;
    private int age;

    public Student(string name) : this(name, 18)  // يستدعي constructor التاني
    {
    }

    public Student(string name, int age)
    {
        this.name = name;
        this.age = age;
    }
}
```

---

### ✅ 3. تمرير الكائن الحالي كـ parameter لدالة أو كلاس تاني

```csharp
class Person
{
    public void Introduce()
    {
        Helper.PrintPerson(this); // this هنا يعني object الحالي من Person
    }
}

class Helper
{
    public static void PrintPerson(Person p)
    {
        Console.WriteLine("Object received");
    }
}
```

---

### ✅ 4. الوصول لأعضاء الكائن (methods أو properties)

ممكن نستخدم `this` للوصول لدوال أو خصائص بنفس الكلاس:

```csharp
class Demo
{
    private int number = 5;

    public void Show()
    {
        Console.WriteLine(this.number);
        this.Display();
    }

    private void Display()
    {
        Console.WriteLine("From Display()");
    }
}
```

---

## ℹ️ ملاحظات:

|ملاحظة|شرح|
|---|---|
|`this`|نوعها هو نفس نوع الكلاس الحالي.|
|تستخدم في instance members فقط|لا تُستخدم في static methods، لأنها تخص object معين.|
|مش ضرورية دايمًا|لكن بتفيد وقت التشابه في الأسماء أو في تنظيم الكود.|

---

## 🧪 ملخص عملي:

```csharp
class Car
{
    string model;

    public Car(string model)
    {
        this.model = model;  // تمييز بين المتغير الخاص والبراميتر
    }

    public void Print()
    {
        Console.WriteLine("Model: " + this.model);
    }
}
```

---

# Inheritance

##  ما هي Inheritance؟

**الوراثة** معناها إن **كلاس يقدر يرث (يستفيد) من كلاس تاني**، وياخد كل خصائصه (Properties) ودواله (Methods)، ويقدر كمان يضيف أو يغيّر عليها.

---

## الفايدة من الوراثة:

1. **إعادة استخدام الكود (Code Reuse)**.
2. **توسيع الوظائف** بدون كتابة الكود من الصفر.
3. **تنظيم الكود** في شكل هرمي.
    

---

## 📘 كلمات مهمة:

|المصطلح|المعنى|
|---|---|
|`Base class`|الكلاس الأب – فيه الكود الأساسي.|
|`Derived class`|الكلاس الإبن – يرث من الأب ويقدر يضيف أو يغيّر.|

---

## 🧪 مثال عملي:

```csharp
// الكلاس الأب
class Animal
{
    public void Eat()
    {
        Console.WriteLine("Animal is eating");
    }
}

// الكلاس الإبن
class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Dog is barking");
    }
}

// الاستخدام
class Program
{
    static void Main()
    {
        Dog dog = new Dog();
        dog.Eat();   // ورثها من Animal
        dog.Bark();  // بتاعته هو
    }
}
```

---

## ✳️ أنواع الوراثة في C#:

|النوع|هل مدعوم؟|مثال|
|---|---|---|
|Single Inheritance|✅ نعم|`Dog : Animal`|
|Multilevel|✅ نعم|`Puppy : Dog : Animal`|
|Hierarchical|✅ نعم|`Dog : Animal`, `Cat : Animal`|
|Multiple Inheritance|❌ لا (ممنوع بين الكلاسات)|-- لكن ممكن باستخدام **Interfaces**|

---

## Method Overriding:

لو عايز تغير سلوك دالة موجودة في الأب:

```csharp
class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal sound");
    }
}

class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Dog says Woof!");
    }
}
```

---

## 🧠 ملاحظات مهمة:

- لازم تستخدم `:` علشان الوراثة (`class Child : Parent`)
- تقدر تستخدم الكلمة المفتاحية `base` علشان تستدعي دوال أو constructor من الأب.
- الدوال اللي عايز تقدر تعملها override لازم تكون `virtual` أو `abstract`.

---

# Sealed Class


## 🔒 `sealed` Class في C#

الكلمة المفتاحية `sealed` بتُستخدم علشان **تمنع أي كلاس تاني من الوراثة منها**.

يعني لو عندك كلاس عملت له `sealed`، **محدش يقدر يرث منه** خلاص.

---

### ✅ الغرض منها:

- منع التوسّع أو التعديل في الكلاس.
- زيادة الأمان في الكود.
- أحيانًا بتحسّن الأداء (الـ JIT optimizer بيعرف إنه الكلاس مش هيتغيّر).


---

## 🧪 مثال بسيط:

```csharp
sealed class Animal
{
    public void Speak()
    {
        Console.WriteLine("Animal sound");
    }
}

// ❌ محاولة الوراثة هتعمل Error
class Dog : Animal  // Error: cannot derive from sealed type
{
}
```

---

## 🧩 ممكن كمان نستخدم `sealed` مع `override` methods

لو عندك كلاس بيورّث دالة من الأب، ومش عايز حد يعدّلها بعد كده:

```csharp
class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("Animal speaks");
    }
}

class Dog : Animal
{
    public sealed override void Speak()
    {
        Console.WriteLine("Dog says Woof!");
    }
}

class Puppy : Dog
{
    // ❌ Error: cannot override sealed method
    // public override void Speak() { ... }
}
```

---

## 📌 ملاحظات:

|المعلومة|التفاصيل|
|---|---|
|`sealed class`|يمنع الوراثة من الكلاس كله.|
|`sealed override`|يمنع إعادة تعريف (override) لدالة موروثة.|
|ما ينفعش يكون `sealed` و `abstract` معًا|لأن `abstract` لازم يتورث، و`sealed` يمنع الوراثة.|

---

جميل جدًا، نبدأ بشرح مفهوم:

---

## 🧱 Abstract Class في C#

الكلاس `abstract` هو **كلاس غير مكتمل**، يعني:

- لا يمكن إنشاء **كائن (object)** منه مباشرة.
    
- الغرض منه إنه يكون **أساس لكلاسات تانية ترث منه**.
    
- ممكن يحتوي على:
    
    - دوال عادية (بكود).
        
    - ودوال مجردة (abstract methods) **بدون كود**.
        

---

### ✅ ليه نستخدم Abstract Class؟

- لما يكون عندك **كود مشترك** بين عدة كلاسات، لكن كل كلاس ليه **تفاصيل مختلفة**.
    
- بيوفر **هيكل (Structure)** للكلاسات اللي هترث منه.
    
- بيخلي الكود **منظم وقابل للتوسعة**.
    

---

## 🧪 مثال عملي:

```csharp
// كلاس مجرد (abstract)
abstract class Animal
{
    public void Eat()
    {
        Console.WriteLine("Animal is eating");
    }

    public abstract void MakeSound(); // مفيش كود، لازم الأبناء يطبقوه
}

// كلاس ابن
class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Dog says Woof!");
    }
}
```

```csharp
class Program
{
    static void Main()
    {
        // Animal a = new Animal(); ❌ Error: can't create object from abstract class

        Dog dog = new Dog();
        dog.Eat();        // من الكلاس الأب
        dog.MakeSound();  // من الكلاس الإبن
    }
}
```

---

## 📌 خصائص مهمة:

|العنصر|هل متاح؟|
|---|---|
|إنشاء object من الكلاس|❌ لا|
|احتواء دوال abstract|✅ نعم|
|احتواء دوال عادية (بكود)|✅ نعم|
|وراثته في كلاس غير مجرد|✅ لازم|
|وراثته في كلاس مجرد تاني|✅ ممكن|
|وجود دوال abstract داخل كلاس غير abstract|❌ لا يجوز|

---

## 📍 الفرق بين abstract class و interface:

|المقارنة|abstract class|interface|
|---|---|---|
|إنشاء object؟|❌ لا|❌ لا|
|يحتوي كود؟|✅ نعم (في دوال عادية)|❌ (فقط التوقيع حتى C# 7, ثم أصبح ممكن من C# 8+)|
|الوراثة من أكتر من واحد؟|❌ لا (واحد فقط)|✅ نعم|
|الهدف|مشاركة كود مشترك|تعريف مجموعة وظائف|

---

لو حابب أديك مثال واقعي (زي `Stream`, `Shape`, `Vehicle`) أو تشرحلي استخدام `abstract` مع `polymorphism`، قولي أكملك ✅
