---
title: "Factory Pattern"
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
# Factory Pattern Summary

## 1. What is the Problem?

Using `new` directly creates dependencies on concrete classes.

Example:

```csharp
Duck duck = new MallardDuck();
```

When requirements change or new classes are added, code using concrete classes usually needs modification. This creates:

* Tight coupling
* Hard maintenance
* Poor scalability
* Violations of OCP

**Important Idea:**

> When ==you see `new`, think **concrete dependency**==. 

---

# 2. Why Use Factory Pattern?

Factory patterns exist to **encapsulate object creation**.

Instead of:

```csharp
Pizza pizza = new CheesePizza();
```

Use:

```csharp
Pizza pizza = createPizza(type);
```

Benefits:

* Separate ==changing code from stable code==
* Reduce dependencies on concrete classes
* Centralize object creation
* Support flexibility and extension
* Follow abstraction-based design

The lecture repeatedly focuses on:

> **==Identify what varies and encapsulate it==.** Object creation is what varies. 

---

# 3. Simple Factory (Important)

## Definition

**Simple Factory ==is NOT actually a Design Pattern.== It is a programming idiom used to centralize object creation.** 

Structure:

```text
Client
   ↓
Simple Factory
   ↓
Concrete Products
```

Example:

```csharp
pizza = factory.createPizza(type);
```

### Why Use Simple Factory?

* Moves creation code into one place
* Removes duplicated instantiation logic
* Multiple clients can reuse same creation logic
* Client no longer creates objects directly

### Limitation

Simple Factory still often ==requires editing factory code when new products are added==.

---

# 4. Factory Method Definition

**Factory Method d==efines an interface for creating an object==, but ==lets subclasses decide which class to instantiate==. Factory Method lets a class defer instantiation to subclasses.** 

---

# 5. Core Idea of Factory Method

Move object creation responsibility from client code into subclasses.

```text
PizzaStore
   |
createPizza()  ← Factory Method
   |
Subclasses decide product type
```

Example:

```csharp
abstract class PizzaStore
{
    public Pizza OrderPizza(string type)
    {
        Pizza pizza = CreatePizza(type);

        pizza.Prepare();
        pizza.Bake();
        pizza.Cut();

        return pizza;
    }

    protected abstract Pizza CreatePizza(string type);
}
```

Key point:

* `orderPizza()` stays unchanged
* subclasses customize creation
* superclass works only with abstractions

---

# 6. How Subclasses “Decide”

Subclasses do not magically make runtime decisions.

The decision happens because ==**you choose which subclass to instantiate.**==

Example:

```csharp
PizzaStore store = new NYPizzaStore();
```

Now:

```csharp
store.OrderPizza("cheese");
```

will call:

```csharp
NYPizzaStore.CreatePizza()
```

So:

> The subclass determines what gets created because the selected subclass provides the implementation. 

---

# 7. Dependency Inversion Principle (Very Important)

Lecture emphasis:

> ==**Depend upon abstractions==. Do not depend upon concrete classes.** 

Before Factory:

```text
PizzaStore
   ↓
CheesePizza
VeggiePizza
ClamPizza
```

After Factory Method:

```text
PizzaStore
    ↓
   Pizza (Abstraction)
    ↑
Concrete Pizzas
```

Result:

* High-level modules depend on abstractions
* Low-level modules depend on abstractions
* Reduced coupling

---

# 8. Guidelines from DIP

Try to avoid:

### 1. Holding ==references to concrete classes==

Bad:

```csharp
CheesePizza pizza;
```

Better:

```csharp
Pizza pizza;
```

### 2. Extending concrete classes

Prefer:

```csharp
abstract class Pizza
```

instead of:

```csharp
class MyPizza : CheesePizza
```

### 3. Depending heavily on `new`

Factories help reduce direct instantiation. 

---

# 9. Factory Method Advantages

* Encapsulates object creation
* Reduces coupling
* Supports OCP
* Easier maintenance
* Supports DIP
* Superclass stays independent of concrete products
* Easier extension

---

# 10. Factory Method Disadvantages

* More classes
* More abstraction layers
* Can increase complexity
* More subclasses required
* Sometimes excessive for simple projects

---

# 11. Factory Method vs Simple Factory

| Simple Factory                   | Factory Method                   |
| -------------------------------- | -------------------------------- |
| Not a real design pattern        | Real design pattern              |
| Uses separate factory object     | Uses ==inheritance==             |
| ==Centralizes== creation         | Delegates creation to subclasses |
| Less flexible                    | More extensible                  |
| Factory may require modification | New subclasses extend behavior   |

---

# 12. Abstract Factory Definition

**Abstract Factory provides an interface for creating families of related or dependent objects ==without specifying their concrete classes.==** 

---

# Quick Exam Summary

**Factory Method encapsulates object creation and delegates object instantiation to subclasses, reducing coupling by depending on abstractions instead of concrete classes.**
