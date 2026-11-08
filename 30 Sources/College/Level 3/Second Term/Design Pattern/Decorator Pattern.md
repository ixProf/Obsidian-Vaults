---
title: "Decorator Pattern"
aliases: []
type: source
status: active
domain: software-engineering
tags: [source, software-engineering, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
# Decorator Pattern Summary

![[Pasted image 20260404032100.png]]

## Definition

**The Decorator Pattern ==attaches additional responsibilities to an object dynamically==. Decorators provide a flexible alternative to subclassing for extending functionality.**

بمعنى:

- بنضيف behavior أو features للكائن وقت التشغيل (runtime)
    
- بدون تعديل الكود الأصلي
    
- وبدون عمل subclasses كتير
    

---

# Why do we use Decorator Pattern?

بنستخدمه لحل مشاكل الـ inheritance.

لو عندك object وعليه combinations كتير:

```text
Coffee
Coffee + Milk
Coffee + Milk + Mocha
Coffee + Milk + Mocha + Whip
```

لو استخدمت inheritance:

```text
CoffeeWithMilk
CoffeeWithMilkAndMocha
CoffeeWithMilkAndMochaAndWhip
...
```

المشكلة:

- عدد classes هيزيد جدًا (Class Explosion)
- صعب التعديل
- صعب الصيانة
    

Decorator حل المشكلة دي عن طريق **Composition + Wrapping**

---

# What is the Main Idea?

كل Decorator بيلف object تاني ويضيف behavior.

```text
DarkRoast
   ↓
Mocha
   ↓
Whip
```

كل layer تضيف حاجة فوق اللي قبلها.

---

# Structure

## 1) Component

```text
Beverage
```

الـ abstract/base type.

---

## 2) Concrete Component

```text
Espresso
DarkRoast
HouseBlend
```

الأشياء الأساسية.

---

## 3) Decorator Base Class

```text
CondimentDecorator
```

Abstract decorator.

---

## 4) Concrete Decorators

```text
Mocha
Milk
Soy
Whip
```

كل واحد يضيف behavior جديد.

---

# Core Principles Behind Decorator

### 1. Same Type Principle

Decorator لازم يكون نفس type للكلاس الأساسي.

```text
Decorator IS-A Beverage
```

عشان يبقوا interchangeable.

---

### 2. HAS-A Relationship

Decorator بيحتوي object جواه:

```text
Mocha HAS-A Beverage
```

---

### 3. Delegation

Decorator بينادي object اللي جواه ثم يضيف behavior:

```csharp
return beverage.Cost() + extraPrice;
```

---

# Runtime Flow Example

```csharp
Beverage drink = new DarkRoast();

drink = new Mocha(drink);

drink = new Whip(drink);
```

الـ execution:

```text
Whip.cost()
   ↓
Mocha.cost()
   ↓
DarkRoast.cost()
```

ثم ترجع القيم بالعكس:

```text
Base Price
+ Mocha
+ Whip
```

---

# When Do We Use Decorator Pattern?

استخدمه لما:

### 1) تضيف Features Dynamically

مثال:

- Coffee toppings
    
- Extra services
    
- Discounts
    
- Logging
    

---

### 2) عندك Combinations كثيرة

مثال:

```text
Notifications:
Email
SMS
Push Notification
```

بدل:

```text
EmailAndSMSNotifier
EmailSMSAndPushNotifier
...
```

---

### 3) عايز تتجنب Inheritance Explosion

لو subclasses بدأت تزيد جدًا.

---

### 4) عايز تطبق Open/Closed Principle

تضيف functionality بدون تعديل الكود القديم.

---

# Why is it Better than Inheritance?

|Inheritance|Decorator|
|---|---|
|Static|Dynamic|
|Rigid|Flexible|
|Compile Time|Runtime|
|Class Explosion|Fewer Classes|
|Hard to Extend|Easy to Extend|

---

# Advantages

### 1. Flexible

تقدر تضيف أو تشيل behaviors بسهولة.

### 2. Runtime Modification

التغيير يحصل أثناء التشغيل.

### 3. Avoids Class Explosion

مش محتاج subclasses لكل combination.

### 4. Open-Closed Principle

تضيف بدون تعديل القديم.

### 5. Reusable Decorators

نفس decorator يتكرر.

مثال:

```csharp
drink = new Mocha(drink);
drink = new Mocha(drink);
```

---

# Disadvantages

### 1. Many Small Classes

عدد classes ممكن يزيد.


### 2. More Complex Structure

الـ wrapping الكتير ممكن يبقى confusing.


### 3. Harder Debugging

تتبع execution أصعب.


### 4. Object Identity Confusion

أحيانًا تبقى مش عارف object الأصلي متغلف بكام layer.


# Important Exam Keywords

لو شفت:

- Same supertype
    
- Object wrapping object
    
- Runtime adding behavior
    
- Composition instead of inheritance
    

→ غالبًا ده **Decorator Pattern**

---

هديك مثال كامل وبسيط بـ C# على الـ **Decorator Pattern** باستخدام مثال القهوة المشهور، عشان تشوف الـ structure والـ execution flow بوضوح.

# Step 1: Component (Abstract Class)

ده الـ base type اللي كل حاجة هتورث منه.

```csharp
public abstract class Beverage
{
    public abstract string GetDescription();

    public abstract double Cost();
}
```

---

# Step 2: Concrete Component

ده الـ object الأساسي.

```csharp
public class DarkRoast : Beverage
{
    public override string GetDescription()
    {
        return "Dark Roast";
    }

    public override double Cost()
    {
        return 5.0;
    }
}
```

---

# Step 3: Decorator Base Class

لازم يرث من نفس الـ type.

```csharp
public abstract class CondimentDecorator : Beverage
{
    protected Beverage beverage;

    public CondimentDecorator(Beverage beverage)
    {
        this.beverage = beverage;
    }
}
```

---

# Step 4: Concrete Decorators

## Mocha Decorator

```csharp
public class Mocha : CondimentDecorator
{
    private const double MochaPrice = 1.5;

    public Mocha(Beverage beverage)
        : base(beverage)
    {
    }

    public override string GetDescription()
    {
        return beverage.GetDescription() + ", Mocha";
    }

    public override double Cost()
    {
        return beverage.Cost() + MochaPrice;
    }
}
```

---

## Whip Decorator

```csharp
public class Whip : CondimentDecorator
{
    private const double WhipPrice = 0.75;

    public Whip(Beverage beverage)
        : base(beverage)
    {
    }

    public override string GetDescription()
    {
        return beverage.GetDescription() + ", Whip";
    }

    public override double Cost()
    {
        return beverage.Cost() + WhipPrice;
    }
}
```

---

# Step 5: Client Code

```csharp
class Program
{
    static void Main()
    {
        Beverage drink = new DarkRoast();

        drink = new Mocha(drink);

        drink = new Whip(drink);

        Console.WriteLine(drink.GetDescription());

        Console.WriteLine(drink.Cost());
    }
}
```

---

# Output

```text
Dark Roast, Mocha, Whip
7.25
```

---

# What Happened Internally?

لما تعمل:

```csharp
drink = new DarkRoast();

drink = new Mocha(drink);

drink = new Whip(drink);
```

الـ structure بقى:

```text
Whip
  ↓
Mocha
  ↓
DarkRoast
```

ولما تنادي:

```csharp
drink.Cost();
```

يحصل:

```text
Whip.Cost()

↓ calls

Mocha.Cost()

↓ calls

DarkRoast.Cost()

returns 5

Mocha adds 1.5 → 6.5

Whip adds 0.75 → 7.25
```

---

# Why This is Decorator?

✔ Same Type

```csharp
Whip : Beverage
Mocha : Beverage
DarkRoast : Beverage
```

✔ HAS-A Relationship

```csharp
private Beverage beverage;
```

✔ Runtime Extension

```csharp
drink = new Whip(drink);
```

✔ No subclass explosion

بدل ما تعمل:

```text
DarkRoastWithMocha
DarkRoastWithMochaAndWhip
DarkRoastWith2Mocha
```

بتضيف layers وقت التشغيل.

---

# Double Mocha Example

الميزة الكبيرة:

```csharp
Beverage drink = new DarkRoast();

drink = new Mocha(drink);

drink = new Mocha(drink);

drink = new Whip(drink);

Console.WriteLine(drink.GetDescription());

Console.WriteLine(drink.Cost());
```

Output:

```text
Dark Roast, Mocha, Mocha, Whip

8.75
```

وده يوضح المرونة الكبيرة للـ Decorator Pattern.