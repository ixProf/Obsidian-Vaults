---
title: "SOLID Principles"
aliases: []
type: source
status: active
domain: software-engineering
tags: [source, software-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
مبادئ **SOLID** هي خمس مبادئ أساسية في **برمجة الكائنات (Object-Oriented Programming)**، وهدفها إن الكود يكون:

- سهل القراءة
- سهل التعديل والصيانة
- قابل للتوسيع من غير ما نكسر حاجات شغالة

كلمة **SOLID** هي اختصار لخمس مبادئ:

![[Pasted image 20250613124616.png]]

---

### 1. **S: مبدأ المسؤولية الواحدة (Single Responsibility Principle - SRP)**
: Each Class Should Be Responsible for only one part or functionality of the system

يعني:

> _"كل كلاس (class) يكون مسؤول عن شيء واحد بس في البرنامج."_

✅ لو حصل تعديل، يبقى له سبب واحد بس، ناتج عن تغيير في الوظيفة الوحيدة اللي بيعملها الكلاس.    



### 2. **O: مبدأ الفتح/الإغلاق (Open/Closed Principle - OCP)** :
**Software Components should be open for extension but closed for modification**

يعني:

> _"الكود يكون مفتوح للإضافة، لكن مغلق للتعديل."_

✅ تقدر تزود عليه وظائف جديدة من غير ما تعدل الكود الأصلي.


### 3. **L: مبدأ الاستبدال (Liskov Substitution Principle - LSP)**:
**Object of all super class should be replaceable with the objects of its subclasses without breaking the system**

يعني:

> _"أي كلاس فرعي لازم يقدر يحل محل الكلاس الأب من غير ما يكسر الكود."_


### 4. **I: مبدأ تقسيم الواجهات (Interface Segregation Principle - ISP)**:
**Make the fine-grained interfaces the are client specific**

يعني:

> _"ماينفعش الكلاسات تكون مجبورة تنفذ دوال مش بتستخدمها."_

✅ لازم تكون ال Interfaces متخصصة مش عامة.

مثال:  
ما تعملش interface فيه `اطبع()` و`امسح()` و`صور()` مع بعض. اعمل `IPrintable` و`IScannable` كل واحد لوحده، والكلاسات تستخدم اللي تحتاجه بس.


### 5. **D: مبدأ عكس الاعتماديات (Dependency Inversion Principle - DIP)**:
**Ensure the high-level modules are not dependent on low-level modules**

> _"اعتمد على الواجهات (interfaces) مش على الكلاسات المباشرة."_

✅ خليك تفصل بين الكود العالي المستوى والكود المنخفض المستوى، وتخليهم يتعاملوا من خلال abstraction (واجهة).

---

## Single Responsibility Principle (SRP):
![[Pasted image 20250613124656.png]]

**لازم كل كلاس يكون ينفع لحاجة معينة مينفعش يعمل حاجات كتيرة مع بعض**
ودا بيقلل تعقيد الكلاس وبيقلل من ظهور ال Bugs

- Bad Code Violates SRP ❌
```CS
public class Invoice
{
    public string CustomerName { get; set; }
    public double Amount { get; set; }

    public double CalculateTotalWithTax()
    {
        return Amount * 1.15;
    }

    public void PrintInvoice()
    {
        Console.WriteLine($"Customer: {CustomerName}, Total: {CalculateTotalWithTax()}");
    }

    public void SaveToDatabase()
    {
        Console.WriteLine("Saving invoice to database...");

    }
}
```

هنا كل Method تعتبر Responsible مسؤولية فالكود دا كاتب كلاس جامع فيها كل المسؤوليات دي
الصح ايه؟
اننا نعمل كلاس لكل Responsible بالشكل دا

- Good Code that **follows SRP** ✅:
```cs
// 1
public class Invoice
{
    public string CustomerName { get; set; }
    public double Amount { get; set; }

    public double CalculateTotalWithTax() 
    {
        return Amount * 1.15;
    }
}

//2
public class InvoicePrinter
{
    public void Print(Invoice invoice)
    {
        Console.WriteLine($"Customer: {invoice.CustomerName}, Total: {invoice.CalculateTotalWithTax()}");
    }
}

// 3
public class InvoiceRepository
{
    public void Save(Invoice invoice)
    {
        Console.WriteLine("Saving invoice to database...");
    }
}
```

## ✅ الفائدة:

- لو عايز تغير طريقة الطباعة → عدل `InvoicePrinter` بس.
- لو غيرت طريقة الحساب → عدل `Invoice` فقط.
- لو عايز تخزن في ملف بدل قاعدة بيانات → عدل `InvoiceRepository` بس.

---

## Open-Closed Principle (OCP):

![[Pasted image 20250613125823.png]]

### ✅ أولًا: يعني إيه **Open/Closed Principle**؟

> الكلاس أو الموديول يكون **مفتوح للإضافة (extension)**، لكن **مغلق للتعديل (modification)**.

يعني إيه؟  
يعني لما تحب تضيف سلوك جديد، **تزود كود جديد** بدل ما **تعدّل الكود القديم**.

---

### 🧨 مثال بيكسر OCP:

نفترض إن عندك كلاس بيحسب الأسعار بناءً على نوع الخصم:

```csharp
public class Invoice
{
    public double GetDiscount(string customerType)
    {
        if (customerType == "Regular")
            return 0.1;
        else if (customerType == "Premium")
            return 0.2;
        else if (customerType == "VIP")
            return 0.3;
        else
            return 0;
    }
}
```

كل مرة تضيف نوع عميل جديد (مثلاً "Platinum")، لازم **تعدّل الكود** نفسه → وده ضد OCP ❌

---

### ✅ الحل باستخدام OCP:

نعمل abstraction (واجهة Interface)، وكل نوع خصم يبقى في كلاس خاص بيه.

#### 1. Interface:

```csharp
public interface IDiscountStrategy
{
    double GetDiscount();
}
```

#### 2. Implementations:

```csharp
public class RegularCustomerDiscount : IDiscountStrategy
{
    public double GetDiscount() => 0.1;
}

public class PremiumCustomerDiscount : IDiscountStrategy
{
    public double GetDiscount() => 0.2;
}

public class VIPCustomerDiscount : IDiscountStrategy
{
    public double GetDiscount() => 0.3;
}
```

#### 3. الكلاس الرئيسي:

```csharp
public class Invoice
{
    private readonly IDiscountStrategy _discountStrategy;

    public Invoice(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }

    public double GetFinalAmount(double totalAmount)
    {
        double discount = _discountStrategy.GetDiscount();
        return totalAmount - (totalAmount * discount);
    }
}
```

---

### ✅ نكمل في `Main`:

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        double total = 1000;

        // Regular Customer
        Invoice invoice1 = new Invoice(new RegularCustomerDiscount());
        Console.WriteLine("Regular Customer Final Amount: " + invoice1.GetFinalAmount(total));

        // Premium Customer
        Invoice invoice2 = new Invoice(new PremiumCustomerDiscount());
        Console.WriteLine("Premium Customer Final Amount: " + invoice2.GetFinalAmount(total));

        // VIP Customer
        Invoice invoice3 = new Invoice(new VIPCustomerDiscount());
        Console.WriteLine("VIP Customer Final Amount: " + invoice3.GetFinalAmount(total));
    }
}
```

---

### ✅ الناتج:

```
Regular Customer Final Amount: 900
Premium Customer Final Amount: 800
VIP Customer Final Amount: 700
```

---

### ✅ ولو حبيت تضيف نوع جديد:

مثلاً `PlatinumCustomerDiscount`:

```csharp
public class PlatinumCustomerDiscount : IDiscountStrategy
{
    public double GetDiscount() => 0.4;
}
```

من غير ما تعدّل ولا حرف في الكلاس `Invoice` 💯

---

### 💡 خلاصة OCP:

- **مفتوح للإضافة**: تقدر تضيف أنواع جديدة من الخصومات.
    
- **مغلق للتعديل**: مش محتاج تلمس الكود القديم أو تعمل `if/else`.
    

---

## **Liskov Substitution Principle (LSP)**

![[Pasted image 20250622175758.png]]

### ✅ أولًا: ما هو **Liskov Substitution Principle (LSP)**؟

LSP بيقول ببساطة:

> "أي كلاس فرعي (subclass) لازم يقدر يتبدل محل الكلاس الأب (base class) من غير ما يبوّظ سلوك البرنامج."

بمعنى تاني: لو عندك كود بيتعامل مع `Base` class، تقدر تحط فيه أي `Derived` class من غير ما الكود يعطل أو يعمل سلوك مش متوقع.

---

### 🧨 مثال على كسر مبدأ LSP:

نفترض إن عندنا الكلاس ده:

```csharp
public class Rectangle
{
    public virtual int Width { get; set; }
    public virtual int Height { get; set; }

    public int GetArea()
    {
        return Width * Height;
    }
}
```

وبعدين حد قال:

> "أنا هعمل كلاس اسمه `Square` يرث من `Rectangle`، لأن المربع هو مستطيل أضلاعه متساوية."

فكتب الكود ده:

```csharp
public class Square : Rectangle
{
    public override int Width
    {
        set
        {
            base.Width = value;
            base.Height = value;
        }
    }

    public override int Height
    {
        set
        {
            base.Width = value;
            base.Height = value;
        }
    }
}
```

تمام… المشكلة بتحصل هنا:

```csharp
public static void PrintArea(Rectangle r)
{
    r.Width = 5;
    r.Height = 10;
    Console.WriteLine(r.GetArea());
}
```

لو نديت `PrintArea(new Rectangle())` → هتطبع `50` ✅  
لكن لو نديت `PrintArea(new Square())` → هتطبع `100` ❌

ليه؟ لأنك لما بتكتب `r.Width = 5;` في `Square` بيخلي `Height = 5` كمان! وبالتالي السلوك اختلف.

---

### 💥 المشكلة هنا:

- `Square` **ورث** من `Rectangle`، لكن **غير السلوك المتوقع**.
    
- البرنامج كان متوقع إن يقدر يغيّر `Width` و `Height` بحرية… لكن `Square` كسر ده.
    

ده بالضبط كسر مبدأ LSP.

---

### ✅ الحل:

الحل الأفضل إنك **متورّثش Square من Rectangle**، لإن العلاقة دي غير صح، حتى لو رياضيًا شكلها منطقي.

الحل إنك تعمل abstraction أعلى، زي:

```csharp
public abstract class Shape
{
    public abstract int GetArea();
}
```

وبعدين:

```csharp
public class Rectangle : Shape
{
    public int Width { get; set; }
    public int Height { get; set; }

    public override int GetArea()
    {
        return Width * Height;
    }
}

public class Square : Shape
{
    public int SideLength { get; set; }

    public override int GetArea()
    {
        return SideLength * SideLength;
    }
}
```

وبكده كل كلاس عنده سلوكه الخاص، ومفيش كسر لـ LSP.

---
## **Interface Segregation Principle (ISP)**

![[Pasted image 20250622180223.png]]


## ✅ يعني إيه **Interface Segregation Principle (ISP)**؟

> "الـ client (يعني أي كلاس أو موديول بيستخدم interface) ماينفعش يُجبَر على إنه يعتمد على حاجات مش بيستخدمها."

يعني ببساطة:  
**ما تعملش interface كبيرة فيها حاجات كتير مش ضرورية لكل الكلاسات.**  
قسّم الـ interface لواجهات صغيرة مخصوصة، وكل كلاس ياخد اللي يخصه بس.

---

## 🧨 مثال بيكسر ISP:

نفترض إنك بتصمم نظام طابعات (Printers):

```csharp
public interface IPrinter
{
    void Print();
    void Scan();
    void Fax();
}
```

وعندك طابعة حديثة، فبتنفذ كل الوظائف:

```csharp
public class ModernPrinter : IPrinter
{
    public void Print() => Console.WriteLine("Printing...");
    public void Scan() => Console.WriteLine("Scanning...");
    public void Fax() => Console.WriteLine("Faxing...");
}
```

تمام… لكن لما تيجي تضيف طابعة قديمة (OldPrinter) مش بتعمل مسح ضوئي ولا فاكس:

```csharp
public class OldPrinter : IPrinter
{
    public void Print() => Console.WriteLine("Printing...");
    public void Scan() => throw new NotImplementedException();
    public void Fax() => throw new NotImplementedException();
}
```

### ❌ المشكلة:

- `OldPrinter` **مضطر** ينفّذ حاجات مش بيستخدمها → كده كسرنا مبدأ ISP.
    

---

## ✅ الحل الصحيح حسب ISP:

نقسّم الـ interface لعدة واجهات صغيرة:

```csharp
public interface IPrintable
{
    void Print();
}

public interface IScannable
{
    void Scan();
}

public interface IFaxable
{
    void Fax();
}
```

وبعد كده:

```csharp
public class ModernPrinter : IPrintable, IScannable, IFaxable
{
    public void Print() => Console.WriteLine("Printing...");
    public void Scan() => Console.WriteLine("Scanning...");
    public void Fax() => Console.WriteLine("Faxing...");
}
```

وطابعة قديمة:

```csharp
public class OldPrinter : IPrintable
{
    public void Print() => Console.WriteLine("Printing...");
}
```

---

## ✅ كود `Main`:

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        IPrintable modernPrint = new ModernPrinter();
        IScannable modernScan = new ModernPrinter();
        IFaxable modernFax = new ModernPrinter();

        modernPrint.Print();
        modernScan.Scan();
        modernFax.Fax();

        Console.WriteLine("---");

        IPrintable oldPrinter = new OldPrinter();
        oldPrinter.Print();
    }
}
```

---

## ✅ الناتج:

```
Printing...
Scanning...
Faxing...
---
Printing...
```

---
## **Dependency Inversion Principle(DIP)**

![[Pasted image 20250622181055.png]]


### ✅ يعني إيه **Dependency Inversion Principle (DIP)**؟

> الكود العالي المستوى (high-level modules) **مايعتمدش مباشرة** على الكود المنخفض المستوى (low-level modules)،  
> الاتنين لازم يعتمدوا على abstraction (يعني interface أو abstract class).

وكمان:

> الـ abstraction مايعتمدش على التفاصيل، التفاصيل هي اللي تعتمد على الـ abstraction.

ببساطة:  
✅ الـ high-level logic (زي `OrderService`) **مايعرفش مين بالضبط بينفذ** التفاصيل (زي `MySQLRepository` أو `FileLogger`).  
هو بس يتعامل مع **واجهة** (interface)، والباقي يتغير بحرية.

---
## مثال 

أنت بتصمم روبوت بيقطع بيتزا، اسمه `PizzaCutterRobot`.  
في البداية، الروبوت بيستخدم ذراع معين اسمه `PizzaCutterArm` علشان يقطع البيتزا.

لكن انت لاحظت إنك **مش دايمًا هتستخدم نفس نوع الذراع**.  
ممكن مرة تانية تستخدم **سكين عادية** بدل الذراع.

هنا يظهر دور **DIP – Dependency Inversion Principle**.

---

## 🧨 الكود اللي بيكسر DIP (اعتماد مباشر على التفاصيل):

```csharp
public class PizzaCutterRobot
{
    private readonly PizzaCutterArm _pizzaCutter = new PizzaCutterArm();

    public void CutPizza()
    {
        _pizzaCutter.Cut();
    }
}

public class PizzaCutterArm
{
    public void Cut()
    {
        Console.WriteLine("Cutting pizza with pizza cutter arm");
    }
}
```

### ❌ المشكلة:

- `PizzaCutterRobot` بيعتمد على `PizzaCutterArm` بشكل مباشر.
    
- لو حبيت تستخدم أداة تانية (زي `Knife`) لازم تروح تعدّل الكلاس `PizzaCutterRobot` نفسه!
    
- كده انت **كسرت مبدأ DIP** لأن الكود العالي المستوى (الروبوت) بيعتمد على كود منخفض المستوى (ذراع التقطيع).
    

---

## ✅ الحل باستخدام DIP:

### 1. نبدأ بتعريف abstraction (واجهة):

```csharp
public interface ICuttingTool
{
    void Cut();
}
```

---

### 2. نعمل implement للواجهة في أدوات مختلفة:

```csharp
public class PizzaCutterArm : ICuttingTool
{
    public void Cut()
    {
        Console.WriteLine("Cutting pizza with pizza cutter arm");
    }
}

public class Knife : ICuttingTool
{
    public void Cut()
    {
        Console.WriteLine("Cutting pizza with knife");
    }
}
```

---

### 3. نخلي `PizzaCutterRobot` يعتمد على `ICuttingTool` بدل أداة معينة:

```csharp
public class PizzaCutterRobot
{
    private readonly ICuttingTool _tool;

    public PizzaCutterRobot(ICuttingTool tool)
    {
        _tool = tool;
    }

    public void CutPizza()
    {
        _tool.Cut();
    }
}
```

---

## ✅ كود الـ `Main`:

```csharp
var robot1 = new PizzaCutterRobot(new PizzaCutterArm());
robot1.CutPizza();  // النتيجة: Cutting pizza with pizza cutter arm

var robot2 = new PizzaCutterRobot(new Knife());
robot2.CutPizza();  // النتيجة: Cutting pizza with knife
```

---

# وكدا يبقى انتهينا من ال SOLID Principles ودا تلخيص بسيط من كورس بشمهندس محمد تامر [UDEMY](https://www.udemy.com/course/master-solid-principles-arabic/?couponCode=KEEPLEARNING) لو حد حابب يشترك فيه. 

# My Linkedin : [Mahmoud Sayed Mohamd](https://www.linkedin.com/in/mahmoud-sayed-mohamed/)

![[Pasted image 20250622183945.png]]
