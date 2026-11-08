# Object-Oriented Programming (OOP) – Interview Preparation Guide

> [!abstract] About This Guide
> دليل شامل للتحضير لأسئلة OOP في مقابلات العمل، خصوصًا Junior Backend Developer باستخدام C# و.NET.
>
> الهدف مش حفظ التعريفات، لكن فهم المفاهيم والقدرة على شرحها وتطبيقها في مشاريع حقيقية.

## Table of Contents

- [Level 1 – Easy](#level-1--easy)
  - OOP Fundamentals
  - Classes and Objects
  - Methods and Constructors
  - Basic Inheritance
  - Basic Polymorphism
- [Level 2 – Medium](#level-2--medium)
  - Encapsulation and Access Modifiers
  - Abstraction
  - Advanced Polymorphism
  - Constructors and Object Lifecycle
  - Exception Handling
  - C# Memory Management
- [Level 3 – Hard](#level-3--hard)
  - Advanced Inheritance
  - Advanced Polymorphism
  - SOLID Principles
  - Dependency Injection
  - Design Patterns
  - Advanced C# Concepts
- [Level 4 – Scenario-Based Questions](#level-4--scenario-based-questions)
- [Common Interview Questions](#common-interview-questions)
- [Final Revision Checklist](#final-revision-checklist)

---

# Level 1 – Easy

> [!success] Beginner Level
> الهدف: فهم أساسيات OOP والقدرة على شرح كل مفهوم بمثال بسيط.

# Section 1: OOP Fundamentals

## Q1. What is Object-Oriented Programming (OOP)?

**ما هي البرمجة كائنية التوجه؟**

Object-Oriented Programming هي Programming Paradigm أو أسلوب برمجي بيعتمد على تنظيم البرنامج في صورة Objects.

كل Object بيجمع بين:

1. Data: البيانات والخصائص الخاصة بيه.
2. Behavior: الوظائف والسلوكيات اللي يقدر ينفذها.

الـ Objects بتتكون بناءً على Classes، والـ Classes بتحدد شكل الكائنات والبيانات والسلوكيات اللي هتكون موجودة فيها.

### Example

لو بنعمل نظام لإدارة بنك، ممكن يكون عندنا:

- Customer: يمثل العميل.
- BankAccount: يمثل الحساب البنكي.
- Transaction: يمثل المعاملة المالية.

كل Class بتمثل نوع معين من الكيانات داخل النظام.

```csharp
public class BankAccount
{
    public string Owner { get; set; }
    public decimal Balance { get; set; }

    public void Deposit(decimal amount)
    {
        Balance += amount;
    }
}
```

### Why do we use OOP?

- Code Reusability: إعادة استخدام الكود.
- Maintainability: تسهيل صيانة وتعديل البرامج.
- Modularity: تقسيم البرنامج إلى أجزاء منظمة.
- Encapsulation: التحكم في الوصول للبيانات.
- Flexibility: تسهيل تغيير وتطوير السلوكيات.
- Scalability: تسهيل تطوير الأنظمة الكبيرة.

**Interview Tip:** متقولش إن OOP مجرد طريقة لكتابة Classes. وضح إنها طريقة لتنظيم وتصميم البرنامج وتقسيم المسؤوليات.

## Q2. What are the Four Pillars of OOP?

ما هي الركائز الأربع للـ OOP؟

### 1. Encapsulation

تجميع البيانات والوظائف المرتبطة بيها داخل Class واحدة، مع التحكم في الوصول للبيانات.

### 2. Inheritance

السماح لـ Class إنها ترث خصائص وسلوكيات من Class أخرى.

### 3. Polymorphism

السماح باستخدام نفس الواجهة أو الاستدعاء مع تنفيذ سلوكيات مختلفة.

### 4. Abstraction

إظهار الوظائف المهمة وإخفاء تفاصيل التنفيذ الداخلية.

**Remember:**

- Encapsulation = Protecting and controlling data.
- Inheritance = Reusing and extending behavior.
- Polymorphism = Different behaviors through a common interface.
- Abstraction = Hiding implementation details.

## Q3. What is a Class?

الـ Class هي Blueprint أو Template بنستخدمها لإنشاء Objects.

بتحدد البيانات والسلوكيات اللي هتكون موجودة في الكائنات الناتجة منها.

ممكن تحتوي على:

- Fields
- Properties
- Methods
- Constructors
- Events
- Nested Types

```csharp
public class Employee
{
    public int Id { get; set; }

    public string Name { get; set; }

    public void Work()
    {
        Console.WriteLine("Employee is working");
    }
}
```

هنا Employee هي Class بتحدد شكل الموظف والوظائف الخاصة بيه.

## Q4. What is an Object?

الـ Object هو Instance تم إنشاؤه من Class.

يعني الـ Class بتحدد التصميم، والـ Object هو الكائن الفعلي اللي اتعمل بناءً على التصميم ده.

```csharp
Employee employee = new Employee();

employee.Id = 1;
employee.Name = "Ahmed";

employee.Work();
```

في المثال:

- Employee: Class.
- employee: Reference Variable.
- new Employee(): إنشاء Object جديد.
- Id وName: Properties.
- Work(): Method.

كل Object ممكن يكون له State مختلفة عن باقي Objects من نفس الـ Class.

## Q5. What is the difference between Class and Object?

| Class | Object |
|---|---|
| Blueprint أو Template | Instance من Class |
| Logical definition | Runtime entity |
| بتحدد البيانات والسلوك | بيحتوي على قيم فعلية |
| ممكن ننشئ منها Objects متعددة | كل Object له حالة مستقلة |
| تعريفها لا يعني إنشاء Instance | إنشاؤه يستهلك موارد وذاكرة |

**Example:**

Car هي Class، لكن عربية أحمد وعربية محمد هما Objects من نفس الـ Class.

## Q6. What is the difference between OOP and Procedural Programming?

| OOP | Procedural Programming |
|---|---|
| بيعتمد على Objects | بيعتمد على Procedures وFunctions |
| غالبًا Bottom-up design | غالبًا Top-down design |
| بيدعم Encapsulation | لا يوفر Encapsulation بنفس نموذج OOP |
| بيدعم Inheritance وPolymorphism | لا يوفرهما كركائز OOP |
| مناسب لتنظيم أنظمة كبيرة ومعقدة | مناسب للمهام الإجرائية والبرامج المباشرة |

ملحوظة: Procedural Programming مش معناها إن الكود غير قابل لإعادة الاستخدام أو إنه غير مناسب للأنظمة الكبيرة. المقارنة هنا بين أسلوبين في التصميم.

## Q7. What is the difference between Class and Struct in C#?

| Class | Struct |
|---|---|
| Reference Type | Value Type |
| المتغير يحتفظ بمرجع للكائن | المتغير يحتفظ بالقيمة |
| ممكن يكون Nullable | غير Nullable افتراضيًا |
| يدعم الوراثة من Class واحدة | لا يرث من Class أو Struct أخرى |
| مناسب للكيانات ذات الهوية والسلوك | مناسب غالبًا للقيم الصغيرة |

```csharp
public class Person
{
    public string Name { get; set; }
}

public struct Point
{
    public int X { get; set; }
    public int Y { get; set; }
}
```

**Important Follow-up:**

هل كل Class موجودة على Heap وكل Struct موجودة على Stack؟

لا. ده تبسيط غير دقيق.

الفرق الأساسي هو Value Type وReference Type، ومكان التخزين بيتحدد حسب سياق الاستخدام والـ Runtime.

## Q8. What are Fields, Properties, and Methods?

### Field

متغير بيخزن بيانات داخل الـ Class.

### Property

عضو بيوفر طريقة للوصول للبيانات والتحكم فيها باستخدام Get وSet.

### Method

مجموعة تعليمات بتنفيذ وظيفة معينة.

```csharp
public class Product
{
    private decimal price; // Field

    public decimal Price  // Property
    {
        get { return price; }
        set
        {
            if (value >= 0)
                price = value;
        }
    }

    public decimal CalculateTax() // Method
    {
        return Price * 0.14m;
    }
}
```

## Q9. What is the difference between a Method and a Function?

بشكل عام الاتنين عبارة عن مجموعة تعليمات قابلة للاستدعاء لتنفيذ مهمة معينة.

لكن في بعض لغات البرمجة:

- Function: ممكن تكون مستقلة عن Class.
- Method: بتكون مرتبطة بـ Class أو Object.

في C# كل الـ Methods بتكون أعضاء داخل Types.

## Q10. What is a Constructor?

الـ Constructor هو عضو خاص بيتم تنفيذه أثناء إنشاء Object، وبيستخدم لتهيئة الحالة الأولية للكائن.

خصائصه:

- اسمه نفس اسم الـ Class.
- ملوش Return Type، حتى void مش بنكتبها.
- ممكن يستقبل Parameters.
- ممكن يكون فيه أكثر من Constructor باستخدام Overloading.

```csharp
public class Student
{
    public string Name { get; set; }

    public Student(string name)
    {
        Name = name;
    }
}
```

Usage:

```csharp
Student student = new Student("Ali");
```

## Q11. What are the types of Constructors in C#?

1. Parameterless Constructor: بدون Parameters.
2. Parameterized Constructor: بيستقبل Parameters.
3. Copy Constructor: بيستخدم Object موجود لإنشاء Object جديد ونسخ بياناته.
4. Static Constructor: لتهيئة Static Members.
5. Private Constructor: للتحكم في إنشاء Instances من خارج الـ Class.

ملاحظة: C# لا توفر Copy Constructor تلقائيًا؛ بنكتبه يدويًا لو محتاجينه.

## Q12. What is a Destructor?

في C# المصطلح الأدق هو Finalizer.

هو عضو بيتم استدعاؤه بواسطة Garbage Collector عند معالجة الكائن لجمع القمامة.

بيستخدم في حالات خاصة لتنظيف الموارد غير المُدارة.

```csharp
public class Example
{
    ~Example()
    {
        // Cleanup unmanaged resources
    }
}
```

مهم:

- توقيت تنفيذ Finalizer غير مضمون.
- مش الطريقة الأساسية لإغلاق الملفات أو Database Connections.
- نستخدم IDisposable وDispose() لإدارة الموارد بشكل أفضل.

## Q13. What is Garbage Collection (GC)?

الـ Garbage Collector هو جزء من .NET Runtime مسؤول عن إدارة Managed Memory تلقائيًا.

بيبحث عن Objects لم تعد قابلة للوصول من البرنامج، ويستعيد الذاكرة الخاصة بيها.

في .NET يوجد Generations:

- Generation 0: الكائنات الجديدة وقصيرة العمر.
- Generation 1: منطقة انتقالية.
- Generation 2: الكائنات طويلة العمر.

**Follow-up:** هل GC بيحرر كل الموارد؟

لا. هو مسؤول عن Managed Memory، لكن الموارد غير المُدارة تحتاج إدارة مناسبة باستخدام Dispose وSafeHandle وغيرهما.

---

# Section 2: Inheritance – Basics

## Q14. What is Inheritance?

Inheritance هو مفهوم بيسمح لـ Class إنها ترث أعضاء من Class أخرى.

الهدف الأساسي:

- Reusability.
- تقليل تكرار الكود.
- إنشاء علاقات Is-A.
- دعم Runtime Polymorphism.

```csharp
public class Vehicle
{
    public void Start()
    {
        Console.WriteLine("Vehicle Started");
    }
}

public class Car : Vehicle
{
    public void Drive()
    {
        Console.WriteLine("Car is driving");
    }
}
```

Car ورثت Start() من Vehicle، وبقى عندها Drive() الخاصة بيها.

## Q15. What are the types of Inheritance?

### 1. Single Inheritance

Class ترث من Base Class واحدة.

### 2. Multilevel Inheritance

سلسلة من الوراثة.

Vehicle → Car → SportsCar

### 3. Hierarchical Inheritance

أكثر من Child Class ترث من نفس Parent Class.

Vehicle → Car, Bike, Bus

### 4. Multiple Inheritance

Class ترث من أكثر من Base Class.

C# لا تدعم Multiple Class Inheritance مباشرة.

### 5. Hybrid Inheritance

دمج أكثر من نوع من أنواع الوراثة.

في C# يمكن تنفيذ أشكال من Hybrid Inheritance باستخدام Class Inheritance مع Multiple Interfaces.

## Q16. What is a Base Class and Derived Class?

- Base Class: الـ Parent Class التي توفر الخصائص والسلوكيات المشتركة.
- Derived Class: الـ Child Class التي ترث من Base Class.

```csharp
public class Animal
{
}

public class Dog : Animal
{
}
```

Animal هي Base Class، وDog هي Derived Class.

## Q17. What is the difference between Multiple and Multilevel Inheritance?

| Multiple Inheritance | Multilevel Inheritance |
|---|---|
| Class ترث من أكثر من Parent | Class ترث من Class وهي بدورها ترث من أخرى |
| أكثر من Base Class | سلسلة من الوراثة |
| غير مدعوم مباشرة بين Classes في C# | مدعوم في C# |

---

# Section 3: Polymorphism – Basics

## Q18. What is Polymorphism?

Polymorphism معناها تعدد الأشكال.

يعني نقدر نتعامل مع Objects مختلفة من خلال Base Type أو Interface مشتركة، لكن كل Object ينفذ السلوك بالطريقة المناسبة ليه.

```csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Animal Sound");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Bark");
    }
}

public class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Meow");
    }
}
```

Usage:

```csharp
Animal animal1 = new Dog();
Animal animal2 = new Cat();

animal1.MakeSound(); // Bark
animal2.MakeSound(); // Meow
```

رغم إن الـ Reference Type هو Animal، التنفيذ حصل بناءً على النوع الفعلي للكائن.

## Q19. What are the types of Polymorphism?

### Compile-Time Polymorphism

بيتم تحديد الـ Method أثناء Compilation.

Example: Method Overloading.

### Runtime Polymorphism

بيتم تحديد الـ Implementation وقت Runtime.

Example: Method Overriding باستخدام Virtual Methods.

## Q20. What is Method Overloading?

إنك تعرف أكثر من Method بنفس الاسم داخل نفس النوع، لكن باختلاف Parameter Lists.

```csharp
public int Add(int a, int b)
{
    return a + b;
}

public double Add(double a, double b)
{
    return a + b;
}

public int Add(int a, int b, int c)
{
    return a + b + c;
}
```

الـ Compiler بيحدد أي Method يتم استدعاؤها بناءً على الـ Arguments.

## Q21. What is Method Overriding?

إن الـ Derived Class تعيد تعريف Method موجودة في Base Class، بشرط إن العضو الأصلي يسمح بالـ Overriding.

في C#:

- virtual في Base Class.
- override في Derived Class.

```csharp
public class Employee
{
    public virtual void Work()
    {
        Console.WriteLine("General Work");
    }
}

public class Developer : Employee
{
    public override void Work()
    {
        Console.WriteLine("Writing Code");
    }
}
```

## Q22. Differentiate between Overloading and Overriding.

| Overloading | Overriding |
|---|---|
| نفس الاسم مع Parameters مختلفة | إعادة تعريف سلوك موروث |
| ممكن داخل نفس Class | بين Base وDerived Class |
| Compile-Time Resolution | Runtime Dispatch عند استخدام Virtual Methods |
| لا يتطلب Inheritance | يتطلب علاقة وراثة |
| لا يحتاج virtual | يحتاج virtual/override في C# |

---

# Level 2 – Medium

> [!warning] Intermediate Level
> الهدف: فهم كيفية عمل المفاهيم داخليًا، والقدرة على استخدامها في تصميم البرامج.

# Section 4: Encapsulation and Access Modifiers

## Q23. What is Encapsulation?

Encapsulation هو تجميع البيانات والـ Methods المرتبطة بيها داخل وحدة واحدة، مع التحكم في الوصول إلى الحالة الداخلية للـ Object.

مثال: الحساب البنكي.

مينفعش أي جزء في البرنامج يغير الرصيد بشكل عشوائي.

```csharp
public class BankAccount
{
    private decimal balance;

    public decimal Balance => balance;

    public void Deposit(decimal amount)
    {
        if (amount <= 0)
            throw new ArgumentException("Invalid amount");

        balance += amount;
    }
}
```

هنا:

- balance مخفي باستخدام private.
- التعديل بيتم من خلال Deposit().
- فيه Validation قبل التعديل.

النتيجة: حماية Data Integrity.

## Q24. What are Access Modifiers?

هي Keywords بتحدد مين يقدر يوصل إلى Classes وأعضائها.

أهم Access Modifiers في C#:

| Modifier | Accessibility |
|---|---|
| public | متاح من أي مكان مسموح به |
| private | داخل نفس النوع |
| protected | داخل النوع والأنواع المشتقة |
| internal | داخل نفس Assembly |
| protected internal | داخل نفس Assembly أو من الأنواع المشتقة |
| private protected | داخل النوع المشتق بشرط نفس Assembly |

## Q25. Difference between Public, Private, and Protected.

| Modifier | Same Class | Derived Class | Outside |
|---|---|---|---|
| public | Yes | Yes | Yes |
| private | Yes | No | No |
| protected | Yes | Yes | No |

المقصود بـ Outside هو الوصول العادي من خارج النوع، مع مراعاة قواعد الـ Assembly في C#.

## Q26. Why do we use Private Fields instead of Public Fields?

لأن Private Fields بتسمح لنا نتحكم في البيانات ونمنع التعديلات غير الصحيحة.

```csharp
public class Product
{
    private decimal price;

    public decimal Price
    {
        get => price;
        set
        {
            if (value < 0)
                throw new ArgumentException();

            price = value;
        }
    }
}
```

لو استخدمنا Public Field، أي جزء في البرنامج ممكن يغير القيمة بدون Validation.

## Q27. Difference between Encapsulation and Data Hiding.

### Encapsulation

تجميع البيانات والسلوكيات داخل وحدة واحدة والتحكم في الوصول.

### Data Hiding

إخفاء التفاصيل الداخلية ومنع الوصول المباشر غير المصرح به.

Data Hiding من الوسائل المهمة لتحقيق Encapsulation، لكن المفهومين مش متطابقين.

---

# Section 5: Abstraction

## Q28. What is Abstraction?

Abstraction هو إظهار الوظائف المهمة للمستخدم وإخفاء تفاصيل التنفيذ الداخلية.

مثال:

لما تستخدم ماكينة ATM، أنت بتتعامل مع:

- Withdraw.
- Deposit.
- Check Balance.

لكن مش محتاج تعرف التفاصيل الداخلية لمعالجة كل عملية.

في البرمجة نقدر نحقق Abstraction باستخدام:

- Abstract Classes.
- Interfaces.
- APIs.
- Encapsulation.

## Q29. What is an Abstract Class?

هي Class بنستخدمها كقاعدة مشتركة للـ Derived Classes.

ممكن تحتوي على:

- Abstract Methods.
- Normal Methods.
- Fields.
- Properties.
- Constructors.
- Access Modifiers.

```csharp
public abstract class Shape
{
    public abstract double CalculateArea();

    public void Display()
    {
        Console.WriteLine("Shape");
    }
}
```

أي Derived Class غير Abstract لازم تنفذ الـ Abstract Members المطلوبة منها.

```csharp
public class Circle : Shape
{
    public double Radius { get; set; }

    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}
```

## Q30. Can we create an Object of an Abstract Class?

لا، مينفعش تعمل Direct Instance من Abstract Class.

```csharp
// Not allowed
// Shape shape = new Shape();
```

لكن تقدر تستخدم Reference من نوع Abstract Class يشير إلى Object من Derived Class.

```csharp
Shape shape = new Circle();
```

## Q31. What is an Interface?

Interface هو Contract بيحدد مجموعة من الأعضاء اللي الـ Class أو Struct اللي بيطبقه لازم يوفر تنفيذها، حسب قواعد اللغة.

```csharp
public interface IPayment
{
    void Pay(decimal amount);
}
```

Implementation:

```csharp
public class CreditCardPayment : IPayment
{
    public void Pay(decimal amount)
    {
        Console.WriteLine("Paid using Credit Card");
    }
}
```

استخدام Interface بيساعد على تقليل الاعتماد المباشر على Implementations محددة.

## Q32. Difference between Abstract Class and Interface.

| Abstract Class | Interface |
|---|---|
| ممكن تحتوي على State وFields | لا تحتوي على Instance Fields |
| ممكن تحتوي على Constructors | لا يمكن إنشاء Instance منها |
| ممكن تحتوي على Implementations | ممكن تحتوي على Default Implementations في C# الحديثة |
| Class ترث من Base Class واحدة | Class ممكن تطبق عدة Interfaces |
| مناسبة لمشاركة State وسلوك مشترك | مناسبة لتعريف Contract أو Capability |

### When should we use each one?

استخدم Interface لما عايز تحدد ماذا يستطيع الكائن أن يفعل.

استخدم Abstract Class لما عندك علاقة وراثة حقيقية وسلوك أو حالة مشتركة بين الأنواع.

## Q33. Difference between Abstraction and Encapsulation.

| Abstraction | Encapsulation |
|---|---|
| إخفاء تفاصيل التنفيذ وإظهار الوظائف المهمة | تجميع البيانات والسلوك والتحكم في الوصول |
| تركز على What | تركز على تنظيم وحماية الحالة |
| Interfaces وAbstract Classes | Classes وAccess Modifiers وProperties |

Example:

- Abstraction: تستدعي Pay() بدون معرفة تفاصيل الدفع.
- Encapsulation: الرصيد الداخلي للحساب غير متاح للتعديل المباشر.

---

# Section 6: Advanced Polymorphism

## Q34. What is a Virtual Method?

هي Method في Base Class بتسمح للـ Derived Class إنها تعمل Override ليها.

```csharp
public class Animal
{
    public virtual void Eat()
    {
        Console.WriteLine("Animal Eating");
    }
}
```

virtual معناها إنك بتسمح بتغيير التنفيذ في الأنواع المشتقة، مش إن التغيير إجباري.

## Q35. What is an Abstract Method?

هي Method معلنة داخل Abstract Class بدون Implementation.

```csharp
public abstract class Animal
{
    public abstract void MakeSound();
}
```

الـ Derived Class غير Abstract لازم توفر Implementation للـ Abstract Method.

## Q36. Difference between Virtual and Abstract Methods.

| Virtual | Abstract |
|---|---|
| لها Implementation | ليس لها Implementation |
| Override اختياري | Override مطلوب في Derived Class غير Abstract |
| توجد داخل Class عادية أو Abstract Class | توجد داخل Abstract Class |
| توفر Default Behavior | تفرض سلوكًا على الأنواع المشتقة |

## Q37. Difference between virtual, override, abstract, and new in C#.

| Keyword | الوظيفة |
|---|---|
| virtual | يسمح بإعادة تعريف العضو |
| override | يستبدل تنفيذ عضو Virtual أو Abstract |
| abstract | يفرض توفير Implementation |
| new | يخفي العضو الموروث بدلًا من عمل Override |

Example:

```csharp
public class Parent
{
    public void Show()
    {
        Console.WriteLine("Parent");
    }
}

public class Child : Parent
{
    public new void Show()
    {
        Console.WriteLine("Child");
    }
}
```

```csharp
Parent obj = new Child();
obj.Show();
```

Output:

```text
Parent
```

لأن new عملت Method Hiding مش Runtime Polymorphism.

## Q38. What is Operator Overloading?

هو تعريف طريقة استخدام Operator مع User-Defined Types.

```csharp
public class Money
{
    public decimal Amount { get; set; }

    public static Money operator +(Money a, Money b)
    {
        return new Money
        {
            Amount = a.Amount + b.Amount
        };
    }
}
```

Usage:

```csharp
Money m1 = new Money { Amount = 100 };
Money m2 = new Money { Amount = 200 };

Money result = m1 + m2;
```

Result = 300.

---

# Section 7: Constructors and Object Lifecycle

## Q39. What is Constructor Overloading?

إن الـ Class يكون فيها أكثر من Constructor بنفس الاسم لكن بParameter Lists مختلفة.

```csharp
public class Employee
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Employee()
    {
    }

    public Employee(string name)
    {
        Name = name;
    }

    public Employee(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```

## Q40. What is Constructor Chaining?

إن Constructor يستدعي Constructor آخر لتجنب تكرار التهيئة.

في C# بنستخدم:

- this(): يستدعي Constructor داخل نفس Class.
- base(): يستدعي Constructor في Base Class.

```csharp
public class Employee
{
    public string Name { get; set; }

    public Employee() : this("Unknown")
    {
    }

    public Employee(string name)
    {
        Name = name;
    }
}
```

## Q41. What is a Static Constructor?

Constructor بيستخدم لتهيئة Static Members.

خصائصه:

- بيتنفذ مرة واحدة لكل Type داخل الـ Runtime.
- مش بيستقبل Parameters.
- مفيش Access Modifier ليه.
- مش بنستدعيه يدويًا.

```csharp
public class Configuration
{
    public static string AppName;

    static Configuration()
    {
        AppName = "My Application";
    }
}
```

## Q42. What is a Private Constructor?

Constructor معمول بـ private، وبالتالي مفيش كود خارج الـ Class يقدر ينشئ Object باستخدامه.

استخداماته:

- بعض تطبيقات Singleton.
- Static Utility Classes.
- التحكم في إنشاء Instances.

## Q43. Difference between const, readonly, and static readonly.

| Keyword | تحديد القيمة |
|---|---|
| const | Compile Time |
| readonly | عند التعريف أو داخل Instance Constructor |
| static readonly | عند التعريف أو داخل Static Constructor |

```csharp
public class Settings
{
    public const double Pi = 3.14;

    public readonly int Id;

    public static readonly DateTime StartDate;

    public Settings(int id)
    {
        Id = id;
    }

    static Settings()
    {
        StartDate = DateTime.Now;
    }
}
```

## Q44. Difference between Shallow Copy and Deep Copy.

### Shallow Copy

نسخ القيم، لكن لو فيه Reference Types داخل الـ Object، ممكن النسختين يشتركوا في نفس الكائن الداخلي.

### Deep Copy

نسخ الكائن والبيانات الداخلية بشكل مستقل.

```csharp
public class Address
{
    public string City { get; set; }
}

public class Person
{
    public string Name { get; set; }
    public Address Address { get; set; }
}
```

لو نسخت Person بطريقة Shallow Copy، فالنسختين ممكن يشتركوا في نفس Address.

---

# Section 8: Exception Handling

## Q45. What is an Exception?

هي حالة غير طبيعية أثناء تنفيذ البرنامج بتؤدي إلى مقاطعة مسار التنفيذ الطبيعي، ويمكن التعامل معاها باستخدام Exception Handling.

Examples:

- NullReferenceException.
- DivideByZeroException.
- ArgumentException.
- InvalidOperationException.

## Q46. What is Exception Handling?

آلية لإدارة الاستثناءات بدلًا من السماح لها بإنهاء البرنامج بشكل غير متوقع.

في C# بنستخدم:

- try.
- catch.
- finally.
- throw.

## Q47. What is a Try-Catch Block?

```csharp
try
{
    int x = 10;
    int y = 0;

    int result = x / y;
}
catch (DivideByZeroException ex)
{
    Console.WriteLine(ex.Message);
}
```

- try: الكود اللي ممكن يحصل فيه Exception.
- catch: التعامل مع نوع معين من الاستثناءات.

## Q48. What is a Finally Block?

Block بيستخدم لتنفيذ عمليات التنظيف عند مغادرة Try/Catch في الظروف العادية.

```csharp
try
{
    Console.WriteLine("Executing");
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
finally
{
    Console.WriteLine("Cleanup");
}
```

في C#، ممكن استخدام using لإدارة الموارد اللي بتطبق IDisposable.

## Q49. Difference between Error and Exception.

بشكل عام:

- Error مصطلح واسع للمشكلات.
- Exception مفهوم محدد في اللغة والـ Runtime للتعامل مع الحالات الاستثنائية.

في .NET، حتى الاستثناءات الخطيرة ممكن تكون مشتقة من System.Exception، فمينفعش نقول إن كل Error غير قابل للمعالجة.

---

# Level 3 – Hard

> [!danger] Advanced Level
> الهدف: فهم تصميم الأنظمة، العلاقات بين الكائنات، الذاكرة، المبادئ الهندسية، وكيفية حل المشكلات باستخدام OOP.

# Section 9: Advanced Inheritance

## Q50. What are the Advantages and Disadvantages of Inheritance?

### Advantages

- Code Reusability.
- تقليل تكرار الكود.
- دعم Runtime Polymorphism.
- تسهيل بناء Hierarchies.

### Disadvantages

- Tight Coupling بين Parent وChild.
- التعديلات في Base Class ممكن تؤثر على Derived Classes.
- Deep Inheritance Hierarchies بتصعب فهم الكود.
- ممكن يؤدي لاستخدام وراثة غير مناسبة.

## Q51. What is Hybrid Inheritance?

هو دمج أكثر من نوع من أنواع الوراثة في تصميم واحد.

في C# يمكن تنفيذ أشكال منه باستخدام Class Inheritance مع Multiple Interfaces.

## Q52. What is Hierarchical Inheritance?

لما يكون عندنا Base Class واحدة وأكثر من Derived Class ترث منها.

```csharp
public class Vehicle
{
    public void Start() { }
}

public class Car : Vehicle { }

public class Bike : Vehicle { }

public class Bus : Vehicle { }
```

## Q53. What is the Diamond Problem?

مشكلة ممكن تظهر في اللغات اللي بتدعم Multiple Class Inheritance.

تخيل:

- Class A فيها Method اسمها Display().
- Class B ترث من A.
- Class C ترث من A.
- Class D ترث من B وC.

السؤال: لو B وC عدلوا Display()، أي Implementation المفروض D تستخدم؟

ده اسمه Diamond Problem.

في C# المشكلة دي مش موجودة بنفس الصورة لأن Class لا تستطيع أن ترث من أكثر من Base Class.

لكن ممكن يحصل تعارض عند تنفيذ أكثر من Interface فيها أعضاء متشابهة، وتقدر تتعامل معاه باستخدام Explicit Interface Implementation.

## Q54. Difference between Inheritance and Composition.

### Inheritance: Is-A Relationship

يعني نوع متخصص من نوع آخر.

Car is a Vehicle.

### Composition: Has-A Relationship

يعني كائن يحتوي أو يعتمد على كائن آخر لتنفيذ وظيفة.

Car has an Engine.

```csharp
public class Engine
{
    public void Start()
    {
        Console.WriteLine("Engine Started");
    }
}

public class Car
{
    private readonly Engine engine = new Engine();

    public void Start()
    {
        engine.Start();
    }
}
```

### When should we use each one?

- Inheritance لما تكون علاقة Is-A حقيقية.
- Composition لما تكون عايز تركب سلوكيات مختلفة أو تغير Dependencies بسهولة.

**Important Principle:**

Favor Composition over Inheritance.

مش معناها إن Composition دائمًا أفضل، لكن متستخدمش Inheritance لمجرد إعادة استخدام الكود.

---

# Section 10: Advanced Polymorphism

## Q55. What is Static Binding and Dynamic Binding?

### Static Binding

تحديد الـ Method اللي هتتنفذ أثناء Compile Time.

Example: Method Overloading.

### Dynamic Binding

تحديد الـ Implementation وقت Runtime حسب النوع الفعلي للـ Object.

Example: Virtual Method وOverriding.

## Q56. What happens if you don't use virtual and override?

لو عندك Method عادية في Base Class، وكتبت Method بنفس الاسم في Derived Class من غير override، فغالبًا هتكون بتعمل Method Hiding لو استخدمت new.

```csharp
public class Animal
{
    public void Sound()
    {
        Console.WriteLine("Animal");
    }
}

public class Dog : Animal
{
    public new void Sound()
    {
        Console.WriteLine("Dog");
    }
}
```

```csharp
Animal a = new Dog();
a.Sound();
```

Output:

```text
Animal
```

لأن Method Hiding مش Runtime Polymorphism.

## Q57. Can We Overload a Method by Changing Only the Return Type?

لا، في C# لا يمكن تعريف Method Overloads تختلف فقط في Return Type.

```csharp
// Invalid

int GetValue() { return 10; }

// double GetValue() { return 10.5; }
```

الـ Compiler مش هيقدر يميز أي Method تستدعيها بناءً على Return Type فقط.

## Q58. Can We Override a Static Method?

لا، Static Methods لا تدعم Virtual Dispatch، وبالتالي لا يمكن عمل Override لها باستخدام override.

لكن ممكن تخفي Static Method موروثة باستخدام new.

## Q59. Can We Override a Private Method?

لا، لأن Private Method غير متاحة للـ Derived Class، ومش ممكن تعمل Override لعضو غير مرئي ليها.

## Q60. What is Sealed Class and Sealed Method?

sealed بتمنع الوراثة أو تمنع استمرار Override في حالات معينة.

### Sealed Class

```csharp
public sealed class PaymentService
{
}
```

مينفعش Class تانية ترث منها.

### Sealed Override

```csharp
public class Base
{
    public virtual void Execute() { }
}

public class Child : Base
{
    public sealed override void Execute() { }
}
```

مينفعش Class مشتقة من Child تعمل Override لـ Execute() مرة أخرى.

---

# Section 11: SOLID Principles

## Q61. What is SOLID?

SOLID عبارة عن خمس مبادئ مهمة في Software Design بتساعد على كتابة كود قابل للتطوير والصيانة والاختبار.

## S – Single Responsibility Principle

كل Class يكون ليها مسؤولية واحدة واضحة، أو سبب واحد أساسي للتغيير.

مثال:

متخليش Employee Class مسؤولة عن:

- بيانات الموظف.
- حفظ البيانات في Database.
- إرسال Emails.

الأفضل فصل المسؤوليات.

## O – Open/Closed Principle

الكود يكون مفتوح للتوسعة (Extension)، ومغلق أمام التعديل غير الضروري (Modification).

مثال:

إضافة طريقة دفع جديدة من غير تعديل منطق طرق الدفع القديمة.

## L – Liskov Substitution Principle

أي Derived Class لازم تقدر تحل محل Base Class بدون ما تكسر السلوك المتوقع.

مثال:

لو Bird Class فيها Fly()، مش منطقي تخلي كل الطيور ترث منها لو فيه طيور لا تطير.

## I – Interface Segregation Principle

متجبرش Class تنفذ Methods هي مش محتاجاها.

مثال:

بدل Interface واحدة كبيرة فيها كل عمليات الأجهزة، قسمها إلى Interfaces صغيرة حسب المسؤولية.

## D – Dependency Inversion Principle

الـ High-Level Modules متعتمدش مباشرة على Low-Level Implementations، لكن الاتنين يعتمدوا على Abstractions.

مثال:

OrderService تعتمد على IPaymentService بدل ما تعتمد مباشرة على CreditCardPayment.

---

# Section 12: Dependency Injection and Design

## Q62. What is Dependency Injection (DI)?

Dependency Injection هي طريقة لتوفير Dependencies للكائن من الخارج بدل ما ينشئها بنفسه.

### Without Dependency Injection

```csharp
public class OrderService
{
    private readonly EmailService emailService =
        new EmailService();
}
```

المشكلة:

OrderService مرتبطة مباشرة بـ EmailService.

### With Dependency Injection

```csharp
public interface IEmailService
{
    void SendEmail(string message);
}

public class OrderService
{
    private readonly IEmailService emailService;

    public OrderService(IEmailService emailService)
    {
        this.emailService = emailService;
    }
}
```

دلوقتي نقدر نمرر Implementations مختلفة، وده بيسهل Testing والتطوير.

## Q63. What is the difference between Dependency Injection and Dependency Inversion?

### Dependency Inversion Principle

مبدأ من SOLID بيحدد اتجاه الاعتماد بين أجزاء النظام.

### Dependency Injection

Technique بنستخدمها لتوفير Dependencies للكائنات من الخارج.

DI ممكن تساعدنا نطبق DIP، لكن الاتنين مش نفس المفهوم.

## Q64. What is Coupling and Cohesion?

### Coupling

درجة الاعتماد بين Classes أو Components مختلفة.

- High Coupling: كل جزء معتمد بشكل كبير على أجزاء أخرى.
- Low Coupling: الأجزاء مستقلة نسبيًا.

### Cohesion

مدى ترابط المسؤوليات داخل Component واحدة.

- High Cohesion: كل الوظائف بتخدم مسؤولية واضحة.
- Low Cohesion: الـ Class بتعمل مهام غير مترابطة.

التصميم الجيد غالبًا بيستهدف:

**Low Coupling + High Cohesion.**

## Q65. What are Design Patterns?

هي حلول تصميمية متكررة لمشكلات شائعة في Software Design.

| Pattern | الاستخدام |
|---|---|
| Singleton | التحكم في إنشاء Instance واحدة |
| Factory | إنشاء Objects بدون ربط العميل بتفاصيل الإنشاء |
| Repository | فصل منطق الوصول للبيانات |
| Strategy | تبديل خوارزمية أو سلوك حسب الحاجة |
| Observer | إشعار الأطراف المهتمة عند حدوث تغيير |
| Decorator | إضافة سلوك دون تعديل النوع الأصلي |

## Q66. What is the Singleton Pattern?

Design Pattern بيضمن إن Class يكون ليها Instance واحدة متاحة من خلال نقطة وصول مشتركة.

```csharp
public sealed class AppSettings
{
    private static readonly AppSettings instance =
        new AppSettings();

    private AppSettings() { }

    public static AppSettings Instance => instance;
}
```

في التطبيقات الحقيقية لازم تراعي Thread Safety وطريقة Initialization.

وفي ASP.NET Core غالبًا بنستخدم Singleton Service Lifetime من DI Container بدل كتابة Singleton يدويًا.

## Q67. What is the Factory Pattern?

بيفصل عملية إنشاء Objects عن الكود اللي بيستخدمها.

```csharp
public interface IPayment
{
    void Pay();
}

public class CashPayment : IPayment
{
    public void Pay() { }
}

public class CardPayment : IPayment
{
    public void Pay() { }
}

public class PaymentFactory
{
    public static IPayment Create(string type)
    {
        return type switch
        {
            "Cash" => new CashPayment(),
            "Card" => new CardPayment(),
            _ => throw new ArgumentException()
        };
    }
}
```

## Q68. What is the Repository Pattern?

هو Pattern بيفصل منطق التعامل مع البيانات عن باقي Business Logic.

```csharp
public interface IProductRepository
{
    Product GetById(int id);
}
```

الـ Service تعتمد على Interface بدل تفاصيل التعامل المباشر مع Database.

ملحوظة: Repository Pattern مش ركن من أركان OOP، لكنه Design Pattern ممكن تستخدمه في تطبيقات OOP.

---

# Section 13: C# Memory and Object Behavior

## Q69. Difference between Value Types and Reference Types.

| Value Types | Reference Types |
|---|---|
| المتغير يحتوي على القيمة | المتغير يحتوي على Reference |
| النسخ غالبًا ينشئ نسخة مستقلة من القيمة | نسخ المرجع يجعل أكثر من متغير يشير لنفس الكائن |
| int, bool, struct | class, string, array |

### Value Type Example

```csharp
int a = 10;
int b = a;

b = 20;

// a = 10
```

### Reference Type Example

```csharp
public class Person
{
    public string Name { get; set; }
}

Person p1 = new Person { Name = "Ali" };
Person p2 = p1;

p2.Name = "Ahmed";

// p1.Name = "Ahmed"
```

## Q70. Difference between == and Equals().

بيعتمد على نوع البيانات والـ Operator Overloading.

- == Operator ممكن يقارن القيم أو المراجع حسب النوع.
- Equals() Method بتحدد قواعد المساواة الخاصة بالنوع.

في Classes العادية، المقارنة الافتراضية غالبًا Reference Equality، لكن أنواع مثل string بتوفر Value Equality.

## Q71. Difference between is and as operators.

### is

بيختبر هل Object من نوع معين أو قابل للتحويل إليه، ويرجع Boolean.

### as

بيحاول يعمل Reference أو Nullable Conversion، ويرجع null لو التحويل فشل بدل Invalid Cast Exception.

```csharp
if (obj is string text)
{
    Console.WriteLine(text);
}

string? result = obj as string;
```

## Q72. Difference between Dispose() and Finalizer.

| Dispose | Finalizer |
|---|---|
| تنظيف صريح للموارد | تنظيف بواسطة GC |
| توقيته يمكن التحكم فيه | توقيته غير مضمون |
| يستخدم مع IDisposable | يستخدم في حالات خاصة |
| يمكن استدعاؤه بشكل متكرر مع تصميم مناسب | يتم ضمن دورة عمل GC |

Example:

```csharp
using var file = new FileStream(
    "test.txt",
    FileMode.Open
);
```

عند الخروج من نطاق الاستخدام، يتم استدعاء Dispose() تلقائيًا.

## Q73. Difference between throw and throw ex.

```csharp
catch (Exception ex)
{
    throw;
}
```

بيحافظ على Stack Trace الأصلي.

أما:

```csharp
catch (Exception ex)
{
    throw ex;
}
```

فبيؤدي إلى إعادة تعيين جزء من معلومات Stack Trace عند إعادة رمي الاستثناء.

الأفضل استخدام throw; لو هدفك تعيد رمي نفس الاستثناء.

---

# Level 4 – Scenario-Based Questions

> [!important] Real Interview Scenarios
> هنا المطلوب منك مش تعريف المفهوم، لكن التفكير في المشكلة واختيار التصميم المناسب وشرح سبب اختيارك.

## Q74. You have a Payment System. How would you design it using OOP?

عندك 3 طرق دفع:

- Cash.
- Credit Card.
- Vodafone Cash.

**Question:** إزاي تصمم النظام بحيث تقدر تضيف طريقة دفع جديدة بدون تغيير منطق النظام بالكامل؟

### Suggested Answer

1. إنشاء IPaymentMethod.
2. كل طريقة دفع تعمل Implement للـ Interface.
3. إنشاء PaymentService يعتمد على Interface.
4. استخدام DI لاختيار Implementation المناسبة.

```csharp
public interface IPaymentMethod
{
    void Pay(decimal amount);
}

public class CashPayment : IPaymentMethod
{
    public void Pay(decimal amount)
    {
        Console.WriteLine("Cash Payment");
    }
}

public class CardPayment : IPaymentMethod
{
    public void Pay(decimal amount)
    {
        Console.WriteLine("Card Payment");
    }
}

public class PaymentService
{
    private readonly IPaymentMethod payment;

    public PaymentService(IPaymentMethod payment)
    {
        this.payment = payment;
    }

    public void Process(decimal amount)
    {
        payment.Pay(amount);
    }
}
```

### Concepts Used

- Abstraction.
- Polymorphism.
- Encapsulation.
- Dependency Injection.
- Open/Closed Principle.

## Q75. You have an Employee Class. How would you calculate salaries for different employee types?

عندك:

- Full-Time Employee.
- Part-Time Employee.
- Contract Employee.

هل تعمل Method واحدة فيها شروط كتير؟

```csharp
if (type == "FullTime")
{
    // Calculate Full-Time Salary
}
else if (type == "PartTime")
{
    // Calculate Part-Time Salary
}
```

ولا تستخدم Polymorphism؟

الأفضل في الحالة المناسبة إنك تعرف CalculateSalary() كعضو افتراضي أو Contract، وكل نوع ينفذ طريقة الحساب الخاصة بيه.

## Q76. Can a Class implement multiple Interfaces?

نعم، وده من أهم مميزات Interfaces في C#.

```csharp
public interface IPrintable
{
    void Print();
}

public interface IExportable
{
    void Export();
}

public class Report : IPrintable, IExportable
{
    public void Print() { }

    public void Export() { }
}
```

## Q77. Can an Abstract Class implement an Interface?

نعم.

والـ Abstract Class ممكن توفر تنفيذ لبعض أعضاء الـ Interface وتترك الباقي للـ Derived Class.

## Q78. Can an Interface inherit from another Interface?

نعم.

```csharp
public interface IBase
{
    void Start();
}

public interface IAdvanced : IBase
{
    void Stop();
}
```

أي Class تنفذ IAdvanced لازم توفر الأعضاء المطلوبة من الواجهتين، أو تظل Abstract.

## Q79. Can an Abstract Class have a Constructor?

نعم.

رغم إنك مش بتقدر تنشئ Instance مباشرة من Abstract Class، الـ Constructor بتاعها بيتنفذ أثناء إنشاء Object من Derived Class.

## Q80. Can a Constructor be Virtual?

لا.

Constructors في C# لا يمكن تعريفها باستخدام virtual أو override، لأن إنشاء الكائن له آلية مختلفة عن Virtual Method Dispatch.

## Q81. Can a Class have Multiple Constructors?

نعم، باستخدام Constructor Overloading، بشرط اختلاف Parameter Lists.

## Q82. Can we create an Object without using the new keyword?

نعم، حسب الحالة.

ممكن تحصل على Object من:

- Factory Method.
- Deserialization.
- Dependency Injection Container.
- Reflection.

فمش كل مرة بتتعامل مع Object لازم تكون كتبت new بنفسك.

## Q83. What happens when you assign one Object to another Object?

في حالة Reference Types، غالبًا أنت بتنسخ Reference مش بتنسخ الكائن نفسه.

```csharp
Person p1 = new Person();
Person p2 = p1;
```

الاتنين بيشيروا لنفس Object.

لكن لو عملت Clone أو Deep Copy، ممكن تحصل على Object مستقل.

---

# Section 14: Additional Interview Questions

## Q84. Can a Method be Overloaded by Changing Parameter Names?

لا، تغيير أسماء Parameters فقط لا يعتبر Overloading.

الـ Parameter List لازم تختلف في عدد أو أنواع أو ترتيب أنواع الـ Parameters وفق قواعد اللغة.

## Q85. Can We Have an Abstract Method Inside a Non-Abstract Class?

لا، الـ Class لازم تكون Abstract لو فيها Abstract Method.

## Q86. Can We Implement Two Interfaces with the Same Method Name?

نعم.

ولو محتاج تنفذ كل واحدة بطريقة مختلفة، استخدم Explicit Interface Implementation.

```csharp
interface IReader
{
    void Read();
}

interface IWriter
{
    void Read();
}

class Document : IReader, IWriter
{
    void IReader.Read()
    {
        Console.WriteLine("Reading");
    }

    void IWriter.Read()
    {
        Console.WriteLine("Writing");
    }
}
```

## Q87. Difference between is, typeof, and GetType().

- is: اختبار نوع الكائن والتوافق معه.
- typeof: الحصول على Type في Compile Time من اسم النوع.
- GetType(): الحصول على النوع الفعلي للكائن أثناء Runtime.

```csharp
object obj = "Hello";

bool result = obj is string;

Type type1 = typeof(string);

Type type2 = obj.GetType();
```

## Q88. Why should we use Interfaces in Real-World Applications?

لأنها بتسمح بفصل Contract عن Implementation.

الفوائد:

- سهولة استبدال Implementations.
- تقليل Coupling.
- تسهيل Unit Testing.
- دعم Dependency Injection.
- زيادة قابلية التوسعة.

مثال:

IProductRepository ممكن يكون ليها Implementation تستخدم SQL Server، وأخرى تستخدم PostgreSQL، والـ Service مش محتاجة تعرف تفاصيل كل واحدة.

---

# Section 15: Common Limitations of OOP

## Q89. What are the Limitations of OOP?

1. Complexity: ممكن يزيد التعقيد في البرامج الصغيرة.
2. Planning: محتاج تصميم وتقسيم مسؤوليات بشكل صحيح.
3. Memory Overhead: بعض التصميمات المعتمدة على Objects ممكن يكون ليها تكلفة إضافية.
4. Performance: بعض التجريدات والـ Indirection ممكن تضيف تكلفة في حالات معينة.
5. Overengineering: استخدام Classes وDesign Patterns بشكل مبالغ فيه ممكن يصعب النظام بدل ما يسهل تطويره.
6. Testing: التصميم السيئ والعلاقات المتشابكة ممكن تصعب الاختبار.

## Q90. Is OOP always better than Procedural Programming?

لا.

اختيار Paradigm بيعتمد على طبيعة المشكلة.

OOP مناسبة جدًا للأنظمة اللي فيها Entities وسلوكيات وعلاقات معقدة.

Procedural Programming ممكن تكون أبسط وأفضل في Scripts والمهام المباشرة وبعض البرامج الصغيرة.

المهم اختيار الأسلوب اللي يحقق أفضل تنظيم وقابلية للصيانة للمشكلة.

---

# Section 16: Interview Preparation – Company-Style Questions

الأسئلة دي تمثل موضوعات متكررة في تجارب مقابلات مطوري C# و.NET، وليست قائمة رسمية من الشركات.

## Core Questions

1. Explain the Four Pillars of OOP.
2. What is the difference between Interface and Abstract Class?
3. What is the difference between Overloading and Overriding?
4. Explain Virtual and Abstract Methods.
5. What happens when you use new instead of override?
6. Explain Value Types and Reference Types.
7. What is the difference between const and readonly?
8. What is Dependency Injection?
9. Explain SOLID Principles.
10. What is the difference between Composition and Inheritance?
11. What is the Diamond Problem?
12. How does Garbage Collection work in .NET?
13. What is the difference between Dispose and Finalizer?
14. Explain Constructor Chaining.
15. Can a Static Method be Overridden?
16. Can an Abstract Class have a Constructor?
17. Can a Class implement multiple Interfaces?
18. What is Explicit Interface Implementation?
19. What is Method Hiding?
20. What is the difference between == and Equals()?

## Practical Design Questions

1. Design a Payment System using OOP.
2. Design an Employee Salary Calculation System.
3. How would you implement different Notification Services?
4. How would you design a Booking System?
5. How can you reduce Tight Coupling?
6. How would you make your code Open for Extension?
7. How would you design a Repository?
8. When would you use Composition instead of Inheritance?
9. How would you test a Service that depends on an external API?
10. How would you replace one Implementation without changing the Business Logic?

---

# Section 17: Final Revision Checklist

استخدم الـ Checklist دي قبل أي مقابلة.

## Easy Level

- [ ] What is OOP?
- [ ] Why do we use OOP?
- [ ] Four Pillars of OOP.
- [ ] Class vs Object.
- [ ] OOP vs Procedural Programming.
- [ ] Class vs Struct.
- [ ] Fields vs Properties vs Methods.
- [ ] Constructor.
- [ ] Constructor Types.
- [ ] Inheritance.
- [ ] Polymorphism.
- [ ] Overloading vs Overriding.
- [ ] Garbage Collection.

## Medium Level

- [ ] Encapsulation.
- [ ] Data Hiding.
- [ ] Access Modifiers.
- [ ] Abstraction.
- [ ] Abstract Class.
- [ ] Interface.
- [ ] Interface vs Abstract Class.
- [ ] Virtual vs Abstract Methods.
- [ ] virtual vs override vs new.
- [ ] Constructor Overloading.
- [ ] Constructor Chaining.
- [ ] Static Constructor.
- [ ] const vs readonly.
- [ ] Shallow Copy vs Deep Copy.
- [ ] Exception Handling.

## Hard Level

- [ ] Multiple Inheritance.
- [ ] Diamond Problem.
- [ ] Composition vs Inheritance.
- [ ] Static vs Dynamic Binding.
- [ ] Sealed Class.
- [ ] SOLID Principles.
- [ ] Dependency Injection.
- [ ] Dependency Inversion.
- [ ] Coupling vs Cohesion.
- [ ] Design Patterns.
- [ ] Singleton.
- [ ] Factory.
- [ ] Repository.
- [ ] Value Types vs Reference Types.
- [ ] Dispose vs Finalizer.
- [ ] throw vs throw ex.

## Scenario-Based Questions

- [ ] Design a Payment System.
- [ ] Design an Employee System.
- [ ] Implement Multiple Interfaces.
- [ ] Design a Notification System.
- [ ] Apply SOLID in a Real Project.
- [ ] Explain Polymorphism from a Real Project.
- [ ] Reduce Coupling using Interfaces.
- [ ] Choose between Composition and Inheritance.

---

# How to Study This Guide

متذاكرش الأسئلة على إنها Definitions لازم تتحفظ.

لكل سؤال حاول تعمل الخطوات دي:

1. اقرأ السؤال وافهم المطلوب.
2. حاول تجاوب من ذاكرتك.
3. اشرح المفهوم بالعربي كأنك بتشرحه لشخص لسه بيتعلم.
4. اكتب المصطلحات الأساسية بالإنجليزي.
5. اكتب مثال C# بنفسك.
6. حاول تجاوب على Follow-up Questions.
7. اربط المفهوم بمشروع حقيقي اشتغلت عليه.

## The Interview Answer Formula

لما تتسأل عن أي Concept، حاول ترتب إجابتك بالشكل ده:

1. Definition: تعريف مختصر ودقيق.
2. Purpose: ليه بنستخدمه؟
3. Example: مثال عملي.
4. Difference: لو فيه مفهوم مشابه، وضح الفرق.
5. Real-World Usage: استخدمته فين في مشروع؟

> [!tip] Final Advice
> الهدف إنك تقدر تشرح أي مفهوم من غير ما تبص على الإجابة، وتكتب مثال عليه من الصفر، وتعرف إمتى تستخدمه وإمتى تتجنبه.
>
> لو وصلت للمرحلة دي، فأنت مش بس حافظ أسئلة OOP، أنت فاهم OOP فعلًا ومستعد تناقشها في مقابلة تقنية.