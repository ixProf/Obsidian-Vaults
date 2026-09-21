
# Singleton Pattern

---

# Definition

**Singleton Pattern**

> Ensures a class has only one instance and provides a global point of access to that instance.

In simple words:

- Only **one object** can be created from the class.
    
- Everyone in the application uses the same object.
    

---

# Problem It Solves

Suppose we have:

- Database Connection Manager
    
- Logger
    
- Configuration Manager
    
- Printer Spooler
    

Creating multiple objects may cause:

- Wasted memory
    
- Data inconsistency
    
- Resource conflicts
    

Singleton prevents this.

---

# Structure of Singleton

A Singleton class always contains:

### 1. Private Static Instance

```java
private static Singleton uniqueInstance;
```

Stores the single object.

---

### 2. Private Constructor

```java
private Singleton() {
}
```

### Why private?

Prevents:

```java
Singleton s = new Singleton();
```

from outside the class.

This is the MOST IMPORTANT rule.

---

### 3. Public Static Access Method

```java
public static Singleton getInstance()
```

Used to obtain the object.

---

# Lazy Initialization Singleton

The object is created only when needed.

```java
public class Singleton {

    private static Singleton uniqueInstance;

    private Singleton() {
    }

    public static Singleton getInstance() {

        if(uniqueInstance == null) {
            uniqueInstance = new Singleton();
        }

        return uniqueInstance;
    }
}
```

---

# Constructor in Lazy Singleton

Always:

```java
private Singleton() {
}
```

No parameters are usually needed.

---

# How It Works

### First Call

```java
Singleton s1 = Singleton.getInstance();
```

Object doesn't exist.

Creates:

```java
uniqueInstance = new Singleton();
```

---

### Second Call

```java
Singleton s2 = Singleton.getInstance();
```

Object already exists.

Returns the same object.

---

# Advantages

### Memory Efficient

Object created only when needed.

### Faster Startup

Application starts without creating unnecessary objects.

### Suitable for Heavy Objects

Examples:

- Database connections
    
- Large caches
    

---

# Disadvantages

### Not Thread Safe

Two threads may execute:

```java
if(uniqueInstance == null)
```

simultaneously.

Result:

```java
Thread 1 -> creates object
Thread 2 -> creates object
```

Now two objects exist.

Singleton is broken.

---

# Thread-Safe Singleton

```java
public static synchronized Singleton getInstance() {

    if(uniqueInstance == null) {
        uniqueInstance = new Singleton();
    }

    return uniqueInstance;
}
```

---

# Advantage

✔ Safe in multithreading

---

# Disadvantage

❌ Slower

Every call must acquire a lock.

---

# Eager Initialization Singleton

Object created immediately.

```java
public class Singleton {

    private static Singleton uniqueInstance =
            new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return uniqueInstance;
    }
}
```

---

# Advantages

✔ Thread Safe

✔ Simple

✔ Fast access

---

# Disadvantages

❌ Creates object even if never used

May waste memory.

---

# Important Design Principles in Singleton

### Encapsulation

Object creation is hidden.

---

### Controlled Instantiation

Only one object can exist.

---

### Global Access Point

Everyone accesses:

```java
getInstance()
```

instead of creating objects.

---

# Common Exam Questions

### Why is the constructor private?

To prevent object creation from outside the class.

---

### Why is the instance static?

Because it belongs to the class, not an object.

---

### Difference between Lazy and Eager?

|Lazy|Eager|
|---|---|
|Created when needed|Created immediately|
|Saves memory|Simpler|
|Not thread-safe by default|Thread-safe|

---

# Adapter Pattern

---

# Definition

> The Adapter Pattern converts the interface of a class into another interface that clients expect.

In simple words:

An **Adapter acts like a translator** between two incompatible classes.

---

# Real-Life Example

Suppose:

- Laptop plug = US plug
    
- Wall socket = European socket
    

They don't match.

Adapter sits between them and converts one interface into another.

---

# Problem Adapter Solves

Suppose your system expects:

```java
Duck
```

But you only have:

```java
Turkey
```

Interfaces are different.

Without Adapter:

❌ Cannot use Turkey as Duck.

With Adapter:

✔ Turkey behaves like Duck.

---

# Example from the Lecture

## Duck Interface

```java
public interface Duck {

    void quack();

    void fly();
}
```

---

## Turkey Interface

```java
public interface Turkey {

    void gobble();

    void fly();
}
```

---

# Difference

Duck:

```java
quack()
```

Turkey:

```java
gobble()
```

Client expects:

```java
quack()
```

Turkey doesn't have it.

---

# Adapter Structure

There are four participants.

---

## 1. Client

Uses the Target interface.

Example:

```java
Duck
```

---

## 2. Target

The interface expected by the client.

Example:

```java
Duck
```

---

## 3. Adaptee

The incompatible class.

Example:

```java
Turkey
```

---

## 4. Adapter

Converts Turkey to Duck.

Example:

```java
TurkeyAdapter
```

---

# TurkeyAdapter Code

```java
public class TurkeyAdapter implements Duck {

    Turkey turkey;

    public TurkeyAdapter(Turkey turkey) {
        this.turkey = turkey;
    }

    public void quack() {
        turkey.gobble();
    }

    public void fly() {

        for(int i = 0; i < 5; i++) {
            turkey.fly();
        }
    }
}
```

---

# Constructor in Adapter Pattern

Very important.

```java
public TurkeyAdapter(Turkey turkey) {
    this.turkey = turkey;
}
```

### Why?

The Adapter needs a reference to the object being adapted.

This is called the **Adaptee**.

---

# How Adapter Works

Client calls:

```java
duck.quack();
```

Adapter receives:

```java
quack()
```

Converts it into:

```java
turkey.gobble();
```

---

Client thinks:

```java
I'm talking to a Duck
```

Reality:

```java
Turkey is doing the work
```

---

# Important Highlighted Statements

### "The client never knows there is an adapter."

This is one of the most important sentences in the lecture.

Client works only with the Target interface.

---

### "Client and Adaptee are decoupled."

The client knows nothing about Turkey.

Turkey knows nothing about Duck.

The adapter connects them.

---

### "Adapter uses composition."

Instead of:

```java
extends Turkey
```

it contains:

```java
Turkey turkey;
```

This follows the famous principle:

> Favor Composition Over Inheritance

One of the most important principles in Design Patterns.

---

# Object Adapter

Used in the lecture.

Uses composition.

```java
Turkey turkey;
```

---

### Advantages

✔ Flexible

✔ Works with subclasses

✔ Preferred in Java

---

### Constructor

```java
public TurkeyAdapter(Turkey turkey)
```

---

# Class Adapter

Uses inheritance.

Example:

```java
class Adapter extends Turkey
              implements Duck
```

Requires multiple inheritance.

Java does not support multiple inheritance of classes.

Therefore it is rarely used in Java.

---

# Object Adapter vs Class Adapter

|Object Adapter|Class Adapter|
|---|---|
|Composition|Inheritance|
|Flexible|Less Flexible|
|Works with subclasses|Fixed to one class|
|Preferred|Rare|

---

# Advantages of Adapter Pattern

### 1. Reuse Existing Code

No need to rewrite old classes.

---

### 2. Open/Closed Principle

Add compatibility without modifying existing code.

---

### 3. Decoupling

Client and Adaptee remain independent.

---

### 4. Legacy System Integration

Very useful when integrating old libraries with new systems.

---

# Disadvantages of Adapter Pattern

### 1. Additional Class

Adds another layer.

---

### 2. More Complexity

Too many adapters can make architecture harder to understand.

---

### 3. Large Interfaces Need More Work

If Target contains many methods, Adapter must implement them all.

---

# Design Principles Used in Adapter

## 1. Program to an Interface, Not an Implementation

Client uses:

```java
Duck
```

not:

```java
WildTurkey
```

---

## 2. Favor Composition Over Inheritance

Adapter contains:

```java
Turkey turkey;
```

instead of inheriting from Turkey.

---

# Singleton vs Adapter

|Singleton|Adapter|
|---|---|
|Creates only one object|Converts interfaces|
|Creational Pattern|Structural Pattern|
|Uses private constructor|Uses composition|
|Controls object creation|Enables compatibility|
|Goal = One Instance|Goal = Interface Conversion|

# What You Must Memorize for the Exam

### Singleton

- Private constructor
    
- Static instance
    
- Static getInstance()
    
- Lazy Initialization
    
- Eager Initialization
    
- Thread Safety problem
    
- Synchronization solution
    

### Adapter

- Client
    
- Target
    
- Adapter
    
- Adaptee
    
- Constructor receives adaptee object
    
- Uses composition
    
- Converts one interface to another
    
- Client never knows the adapter exists
    
- Object Adapter vs Class Adapter
    
- Favor Composition Over Inheritance
    
- Program to an Interface, Not an Implementation