---
title: "Covariance and Contravariance"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages]
created: 2026-09-21
updated: 2026-10-15
source:
related: []
---


# Covariance

> تقدر تستخدم النوع المشتق (Child) بدل النوع الأساسي (Parent)

يعني الاتجاه

```
Dog  →  Animal
Derived → Base
```

## الفكرة

لو عندي حاجة بترجع **Dog**  
فأكيد ينفع أتعامل معاها على إنها بترجع **Animal**  
لأن كل Dog هو Animal.

مفيش أي خطر هنا.

---

## مثال بسيط

```csharp
class Animal { }
class Dog : Animal { }
```

لو عندي

```csharp
Dog GetDog() => new Dog();
```

وعندي Delegate كده

```csharp
delegate Animal MyDelegate();
```

ينفع أعمل:

```csharp
MyDelegate del = GetDog;  // ✔ ينفع
```

ليه؟

لأن:

- الـ delegate مستني يرجع Animal
- والميثود بترجع Dog
- وDog أصلاً Animal

ده Covariance.

---

## بتظهر فين رسميًا في C#؟

في الـ Generics اللي فيها كلمة:

```
out T
```

زي:

- `IEnumerable<out T>`
- `IEnumerator<out T>`

---

## 5️⃣ مثال Generics

```csharp
IEnumerable<Dog> dogs = new List<Dog>();
IEnumerable<Animal> animals = dogs; ينفع
```

ليه ده اشتغل؟

لأن `IEnumerable<T>` معرفة كده:

```csharp
interface IEnumerable<out T>
```

يعني T بتستخدم كـ return فقط.

Covariance آمنة فقط لما:

- T تستخدم كـ return type فقط
    
- مش ينفع تستخدمها كـ parameter
    

مثال صحيح:

```csharp
interface IProducer<out T>
{
    T Produce();
}
```

مثال غلط:

```csharp
interface IBroken<out T>
{
    void Add(T item); // ❌ غلط
}
```

ليه غلط؟

لأن لو سمحت بإدخال T  
كده هتكسر type safety.
تخيل لو ده ينفع:

```csharp
IEnumerable<Animal> animals = new List<Dog>();
```

ولو كان مسموح نضيف:

```csharp
animals.Add(new Cat()); // كارثة
```

كده List بقى فيها Cat!

علشان كده Covariance مسموح بس لما النوع "بيطلع" بيانات مش "بيستقبل".

## خلاصة Covariance

|العنصر|التفسير|
|---|---|
|الاتجاه|Derived → Base|
|الكلمة|out|
|الاستخدام|return values|
|مثال|IEnumerable|
|الاسم العملي|Producer|


---

# 🔴 ثانياً: Contravariance (التباين العكسي)

## 1️⃣ التعريف

Contravariance معناها:

> تقدر تستخدم النوع الأساسي (Parent) بدل النوع المشتق (Child)

الاتجاه:

```
Animal → Dog
Base → Derived
```

## الفكرة

لو عندي method بتستقبل Animal  
فأكيد تقدر تستقبل Dog  
لأن Dog هو Animal.

لكن العكس خطر.
## 3️⃣ مثال Delegates

```csharp
class Animal { }
class Dog : Animal { }
```

عندنا delegate:

```csharp
delegate void MyDelegate(Dog d);
```

وعندي method:

```csharp
void HandleAnimal(Animal a)
{
    Console.WriteLine("Handling Animal");
}
```

ينفع أعمل:

```csharp
MyDelegate del = HandleAnimal;  // ✔ ينفع
```

ليه؟

- الـ delegate مستني Dog
- والميثود بتقبل Animal
- وDog أصلاً Animal

ده Contravariance.
## بتظهر فين ؟

في generics اللي فيها:

```
in T
```

زي:

- `Action<in T>`
- `IComparer<in T>`
## مثال

```csharp
Action<Animal> animalAction = (a) => Console.WriteLine("Animal");

Action<Dog> dogAction = animalAction;  // ✔ ينفع
```

ليه؟

لأن `Action<T>` معرفة كده:

```csharp
delegate void Action<in T>(T obj);
```

---

Contravariance آمنة فقط لما:

- T تستخدم كـ parameter فقط
    
- مش ينفع ترجع T

مثال صحيح:

```csharp
interface IConsumer<in T>
{
    void Consume(T item);
}
```

مثال غلط:

```csharp
interface IBroken<in T>
{
    T Create(); // ❌ غلط
}
```

ليه؟

لأن لو رجعت T  
كده ممكن تكسر type safety.

## مثال يوضح الخطر

لو كان مسموح:

```csharp
IConsumer<Dog> dogs = new AnimalConsumer();
```

ولو AnimalConsumer بيرجع Animal  
يبقى هترجع نوع مش Dog  
وده يكسر الأمان.

---

## خلاصة Contravariance

|العنصر|التفسير|
|---|---|
|الاتجاه|Base → Derived|
|الكلمة|in|
|الاستخدام|parameters|
|مثال|Action|
|الاسم العملي|Consumer|


| Covariance        | Contravariance    |              |
| ----------------- | ----------------- | ------------ |
| Child مكان Parent | Parent مكان Child | بيمشي إزاي؟  |
| Return            | Parameters        | بيستخدم في؟  |
| out               | in                | كلمة المفتاح |
| Producer          | Consumer          | يمثل ايه     |

---
