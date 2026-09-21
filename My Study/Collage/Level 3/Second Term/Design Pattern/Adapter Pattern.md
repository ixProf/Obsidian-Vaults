
## Definition (التعريف)

**Adapter Pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces.**

بمعنى أبسط:

- عندك كلاس شغال بالفعل
    
- لكن الـ Interface بتاعه مختلف عن اللي السيستم محتاجه
    
- بدل ما تعدل الكلاس القديم → تعمل Adapter يترجم بين الاتنين
    

---

# Why do we use Adapter Pattern? (ليه بنستخدمه؟)

بنستخدمه لما:

### 1) عندك كود قديم (Legacy Code)

عندك سيستم قديم شغال ومش عايز تكسره.

### 2) Third-party libraries

استخدمت Library خارجية لكن الـ methods بتاعتها مختلفة عن مشروعك.

### 3) Integrating different systems

لو بتربط API أو Service جديدة مع سيستم موجود.

### 4) Reuse existing code

بدل ما تعيد كتابة كود موجود بالفعل.

---

# Problem Without Adapter

تخيل عندك:

```csharp
public interface IPaymentProcessor
{
    void Pay(decimal amount);
}
```

السيستم كله متوقع أي Payment Class يكون عنده:

```csharp
Pay()
```

لكن شركة الدفع الخارجية عاملة Class بالشكل ده:

```csharp
public class OldPaymentGateway
{
    public void MakePayment(decimal money)
    {
        Console.WriteLine($"Paid {money}");
    }
}
```

المشكلة:

```csharp
OldPaymentGateway old = new OldPaymentGateway();

old.Pay(100); // ERROR
```

لأن:

```text
Pay() != MakePayment()
```

هنا نستخدم Adapter.

---

# Adapter Pattern Structure

```text
Client
   ↓
Target Interface
   ↓
Adapter
   ↓
Adaptee (Old Class)
```

- **Client** → الكود اللي بيستخدم الخدمة
    
- **Target** → الـ interface المتوقع
    
- **Adaptee** → الكلاس القديم
    
- **Adapter** → المترجم بينهم
    

---

# C# Example

## Step 1: Target Interface

```csharp
public interface IPaymentProcessor
{
    void Pay(decimal amount);
}
```

---

## Step 2: Existing Class (Adaptee)

```csharp
public class OldPaymentGateway
{
    public void MakePayment(decimal money)
    {
        Console.WriteLine($"Payment Done: {money}");
    }
}
```

---

## Step 3: Create Adapter

```csharp
public class PaymentAdapter : IPaymentProcessor
{
    private OldPaymentGateway oldGateway;

    public PaymentAdapter(OldPaymentGateway oldGateway)
    {
        this.oldGateway = oldGateway;
    }

    public void Pay(decimal amount)
    {
        oldGateway.MakePayment(amount);
    }
}
```

---

## Step 4: Client Code

```csharp
class Program
{
    static void Main()
    {
        IPaymentProcessor payment =
            new PaymentAdapter(
                new OldPaymentGateway());

        payment.Pay(500);
    }
}
```

Output:

```text
Payment Done: 500
```

---

# How It Works Internally

لما تعمل:

```csharp
payment.Pay(500);
```

الذي يحدث:

```text
Client
 ↓
Adapter.Pay()
 ↓
OldGateway.MakePayment()
 ↓
Result
```

الـ Adapter هنا عمل **translation between interfaces**.

---

# Pros (Advantages)

## 1) Reuse Existing Code

مش محتاج تعيد كتابة الكود القديم.

---

## 2) Open/Closed Principle Friendly

تضيف Adapter جديد بدل تعديل الكود القديم.

---

## 3) Decouples Client From Old Code

الـ Client يتعامل مع Interface موحد.

---

## 4) Easier Integration

سهل تربط APIs أو Libraries مختلفة.

---

## 5) Legacy Support

يحافظ على الأنظمة القديمة.

---

# Cons (Disadvantages)

## 1) More Classes

هتضيف Adapter Classes زيادة.

---

## 2) More Complexity

طبقة إضافية = تعقيد أكتر.

---

## 3) Harder Debugging Sometimes

لأن الـ Call Chain بقت:

```text
Client
 ↓
Adapter
 ↓
Real Object
```

فممكن تتوه وأنت بتتبع الـ execution.

---

## 4) Performance Overhead (Small)

فيه Layer إضافية.

غالبًا negligible لكن موجودة.

---

# When Do We Use It?

استخدم Adapter لما:

### Existing code cannot change

```text
Old System + New System
```

---

### Third-party library incompatible

```text
Your Interface != Library Interface
```

---

### Migrating old systems

```text
Legacy -> Modern
```

---

### External APIs

لو كل API ليها شكل مختلف.

---

# Difference Between Adapter and Decorator

|Adapter|Decorator|
|---|---|
|Changes interface|Keeps same interface|
|Makes incompatible classes work together|Adds new behavior|
|Focus on compatibility|Focus on enhancement|

---

# Quick Summary

```text
Purpose:
Convert one interface into another

Why:
Reuse old code + integrate incompatible systems

Use when:
Interfaces don't match

Main Benefit:
Compatibility without modifying existing code

Main Drawback:
Extra layer and complexity
```

الجملة اللي غالبًا تتقال في الامتحانات:

**"Adapter Pattern acts as a bridge between incompatible interfaces."**