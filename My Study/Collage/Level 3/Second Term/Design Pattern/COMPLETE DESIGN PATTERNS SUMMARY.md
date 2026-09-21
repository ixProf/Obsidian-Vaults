# COMPLETE DESIGN PATTERNS SUMMARY

# Part I — Object-Oriented Design Principles

These principles are the reason design patterns exist.

---

## 1. Encapsulate What Varies

### Definition

Identify the parts of a system that change frequently and separate them from the parts that remain stable.

### Why?

Changes should affect only one place.

### Benefits

- Easier maintenance
    
- Higher flexibility
    
- Reduced bugs
    

### Used In

- Strategy
    
- Factory Method
    
- Abstract Factory
    

---

## 2. Program to Interfaces, Not Implementations

### Definition

Depend on abstractions rather than concrete classes.

### Example

```java
FlyBehavior flyBehavior;
```

instead of

```java
FlyWithWings flyBehavior;
```

### Benefits

- Loose coupling
    
- Easier replacement of implementations
    

---

## 3. Favor Composition Over Inheritance

### Definition

Reuse behavior by combining objects rather than inheriting classes.

### Example

```java
Duck HAS-A FlyBehavior
```

instead of

```java
FlyingDuck extends Duck
```

### Benefits

- Runtime flexibility
    
- Better reuse
    

---

## 4. Strive for Loosely Coupled Designs

### Definition

Objects should know as little as possible about other objects.

### Used In

- Observer
    
- Factory
    
- Singleton
    

### Benefits

- Easier modification
    
- Independent components
    

---

## 5. Open-Closed Principle (OCP)

### Definition

Software entities should be:

- Open for Extension
    
- Closed for Modification
    

### Meaning

Add new functionality without changing existing code.

### Used In

Almost all patterns.

---

## 6. Dependency Inversion Principle (DIP)

### Definition

Depend upon abstractions, not concrete classes.

### Rules

1. No variable should hold a concrete class reference.
    
2. No class should derive from a concrete class.
    
3. No method should override an implemented method from a concrete class.
    

### Used In

- Factory Method
    
- Abstract Factory
    

---

# 1. Strategy Pattern

## Definition

Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

---

## Problem Solved

Different objects need different behaviors.

Example:

- MallardDuck flies
    
- RubberDuck doesn't fly
    

Inheritance causes duplicated code.

---

## Structure (Participants)

### Context

```java
Duck
```

### Strategy Interface

```java
FlyBehavior
QuackBehavior
```

### Concrete Strategies

```java
FlyWithWings
FlyNoWay
Quack
Squeak
MuteQuack
```

---

## Constructor Diagram

```text
Duck
 |
 +---- FlyBehavior
 |
 +---- QuackBehavior
```

---

## Why Used?

To change behavior independently from the object.

Runtime change:

```java
duck.setFlyBehavior(new FlyRocketPowered());
```

---

## Advantages

✔ Runtime flexibility

✔ Reusable algorithms

✔ Eliminates duplicated code

✔ OCP compliant

---

## Disadvantages

✘ Many classes

✘ Slight complexity

✘ More objects created

---

## Real Example

SimUDuck

---

# 2. Observer Pattern

## Definition

Defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified automatically.

---

## Problem Solved

Need automatic updates.

Example:

Weather station displays.

---

## Participants

### Subject

```java
WeatherData
```

### Observer Interface

```java
Observer
```

### Concrete Observers

```java
CurrentConditionsDisplay
ForecastDisplay
StatisticsDisplay
```

---

## Constructor Diagram

```text
Subject
 |
 +---- Observer1
 |
 +---- Observer2
 |
 +---- Observer3
```

---

## Why Used?

Need:

- Notifications
    
- Dynamic subscriptions
    
- Loose coupling
    

---

## Advantages

✔ Loose coupling

✔ Dynamic registration

✔ OCP compliant

✔ Easy expansion

---

## Disadvantages

✘ Too many notifications

✘ Performance overhead

✘ Hard debugging

---

## Real Example

Weather Station

---

# 3. Decorator Pattern

## Definition

Attach additional responsibilities to an object dynamically.

Alternative to subclassing.

---

## Problem Solved

Class explosion.

Example:

```java
DarkRoastWithMocha
DarkRoastWithSoy
DarkRoastWithMilk
```

Too many combinations.

---

## Participants

### Component

```java
Beverage
```

### Concrete Components

```java
Espresso
DarkRoast
HouseBlend
Decaf
```

### Decorator

```java
CondimentDecorator
```

### Concrete Decorators

```java
Mocha
Soy
Whip
Milk
```

---

## Constructor Diagram

```text
Beverage
    ^
    |
Decorator
    ^
    |
Mocha
Soy
Milk
Whip
```

---

## Why Used?

Add features dynamically.

---

## Advantages

✔ Runtime extension

✔ Flexible combinations

✔ Avoid subclass explosion

✔ OCP compliant

---

## Disadvantages

✘ Many small objects

✘ Complex object chains

✘ Hard debugging

---

## Real Example

Starbuzz Coffee

---

# 4. Factory Method Pattern

## Definition

Define an interface for creating objects, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

---

## Problem Solved

Using:

```java
new ConcreteClass()
```

creates tight coupling.

Every new product requires code modification.

---

## Participants

### Creator

```java
PizzaStore
```

### Factory Method

```java
createPizza()
```

### Concrete Creators

```java
NYPizzaStore
ChicagoPizzaStore
```

### Product

```java
Pizza
```

### Concrete Products

```java
NYStyleCheesePizza
ChicagoStyleCheesePizza
```

---

## Constructor Diagram

```text
PizzaStore
   |
   +-- createPizza()

NYPizzaStore
ChicagoPizzaStore

Product -> Pizza

Concrete Products
```

---

## Why Used?

To encapsulate object creation.

Creator doesn't know exact product type.

---

## Advantages

✔ Loose coupling

✔ OCP compliant

✔ Centralized creation

✔ Easier extension

---

## Disadvantages

✘ More subclasses

✘ Complex hierarchy

---

## Real Example

Pizza Store Franchise

---

# 5. Abstract Factory Pattern

## Definition

Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

---

## Problem Solved

Need multiple related products together.

Example:

New York Ingredients:

```java
NYDough
NYSauce
NYCheese
```

Chicago Ingredients:

```java
ChicagoDough
ChicagoSauce
ChicagoCheese
```

Must create matching families.

---

## Participants

### Abstract Factory

```java
PizzaIngredientFactory
```

### Concrete Factories

```java
NYPizzaIngredientFactory
ChicagoPizzaIngredientFactory
```

### Abstract Products

```java
Dough
Sauce
Cheese
```

### Concrete Products

```java
ThinCrustDough
MarinaraSauce
```

---

## Why Used?

Ensure product consistency.

---

## Advantages

✔ Product family consistency

✔ Loose coupling

✔ Easy replacement of product families

✔ OCP compliant

---

## Disadvantages

✘ Difficult to add new product types

✘ Many interfaces/classes

---

## Real Example

Pizza Ingredient Factories

---

# 6. Singleton Pattern

## Definition

Ensure a class has only one instance and provide a global point of access to it.

---

## Problem Solved

Need exactly one object.

Examples:

- Printer manager
    
- Thread pool
    
- Database connection manager
    
- Logger
    
- Configuration manager
    

---

## Participants

### Singleton Class

```java
Singleton
```

### Static Instance

```java
private static Singleton uniqueInstance;
```

### Access Method

```java
getInstance()
```

---

## Constructor

```java
private Singleton()
```

---

## Classic Implementation

```java
public class Singleton {

 private static Singleton uniqueInstance;

 private Singleton() {}

 public static Singleton getInstance() {

   if(uniqueInstance == null)
      uniqueInstance = new Singleton();

   return uniqueInstance;
 }
}
```

---

## Why Used?

Need:

- One object only
    
- Global access point
    
- Controlled creation
    

---

## Advantages

✔ Single instance

✔ Global access

✔ Saves resources

✔ Lazy creation possible

---

## Disadvantages

✘ Difficult testing

✘ Global state issues

✘ Thread-safety complications

✘ Violates Single Responsibility Principle

---

## Real Example

Chocolate Boiler

---

# MEGA COMPARISON TABLE (ALL 6 PATTERNS)

|Pattern|Main Goal|Problem Solved|Key Idea|Relationship|Runtime Change|Main Advantage|Main Disadvantage|
|---|---|---|---|---|---|---|---|
|Strategy|Change algorithms|Multiple behaviors|Encapsulate algorithms|HAS-A|Yes|Flexible behavior|Many classes|
|Observer|Automatic updates|Synchronization between objects|Publish/Subscribe|One-to-Many|Yes|Loose coupling|Notification overhead|
|Decorator|Add features|Class explosion|Wrap objects|Wrapper HAS-A|Yes|Dynamic functionality|Many objects|
|Factory Method|Create objects|Tight coupling with `new`|Subclass decides creation|Inheritance|No|Decouples creation|Many subclasses|
|Abstract Factory|Create related families|Product consistency|Family factories|Composition|No|Consistent products|Difficult expansion|
|Singleton|One instance|Multiple copies of same object|Controlled instantiation|Single Object|No|Resource saving|Global-state issues|

---

# Quick Exam Sheet (Very Important)

### Strategy

**Problem:** Multiple interchangeable algorithms

**Keyword:** Family of Algorithms

---

### Observer

**Problem:** Automatic notifications

**Keyword:** One-to-Many Dependency

---

### Decorator

**Problem:** Class Explosion

**Keyword:** Add Responsibilities Dynamically

---

### Factory Method

**Problem:** Tight Coupling with `new`

**Keyword:** Let Subclasses Decide

---

### Abstract Factory

**Problem:** Related Product Families

**Keyword:** Families of Objects

---

### Singleton

**Problem:** Multiple Instances

**Keyword:** One and Only One Instance

This version is much closer to what instructors expect for a **full exam/revision document**, because it includes the **6 OO principles, all 6 patterns, participants (constructors), problem solved, why used, advantages, disadvantages, and a complete comparison among all patterns**.

---

# وصلى الله على محمد وعلى آله وصحبه وسلم