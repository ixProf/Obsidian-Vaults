---
title: "Singleton"
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

# 1. Definition

**Singleton Pattern ==ensures that a class has only one instance== and provides a global access point to that instance.**

Meaning:

- Only one object allowed
- Everyone uses the same object
- Object creation is controlled internally


---

# 2. Why Do We Use Singleton Pattern?

We use ==Singleton when having multiple objects would cause problems or waste resources.==

---

## A) Ensure Only One Instance Exists

Example:

```text
Application Configuration
Database Connection Manager
Logger
Cache Manager
```

You usually need one shared object.

---

## B) Shared Resource Access

Without Singleton:

```csharp
Logger log1 = new Logger();
Logger log2 = new Logger();
Logger log3 = new Logger();
```

Now you have multiple loggers.

With Singleton:

```csharp
Logger logger = Logger.Instance;
```

Everyone uses the same one.

---

## C) Save Memory / Resources

Creating heavy objects repeatedly:

```text
Database connections
File managers
Configuration loaders
Thread pools
```

can be expensive.

Singleton avoids repeated creation.

---

## D) Global Access Point

Instead of passing object references everywhere:

```csharp
DoSomething(config);
DoAnother(config);
```

Use:

```csharp
Config.Instance
```

---

# 3. When Do We Use Singleton Pattern?

Use Singleton when:

---

## Scenario 1: Logging Systems

Example:

```text
Application Logger
```

One logger writes all logs.

---

## Scenario 2: Configuration Manager

Example:

```text
App Settings
API Keys
Connection Strings
```

Shared globally.

---

## Scenario 3: Database Management

Example:

```text
Connection Manager
Database Provider
```

One manager controls connections.

---

## Scenario 4: Caching System

Example:

```text
Memory Cache
Application Cache
```

Single shared cache.

---

## Scenario 5: Device Controllers

Example:

```text
Printer Queue
GPU Manager
Hardware Driver
```

Multiple instances may conflict.

---

# 4. Structure of Singleton Pattern

Main rules:

### Private Constructor

==Prevents==:

```csharp
new Singleton();
```

---

### Static Instance Variable

Stores the single object.

---

### Public Access Method / Property

Allows access.

Structure:

```text
Client
   |
   v
Singleton.Instance
   |
   v
Single Object
```

---

# 5. Basic Singleton Example in C\#

```csharp
class Logger
{
    private static Logger instance;

    private Logger()
    {
    }

    public static Logger Instance
    {
        get
        {
            if(instance == null)
            {
                instance = new Logger();
            }

            return instance;
        }
    }

    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}
```

Usage:

```csharp
Logger logger1 = Logger.Instance;
Logger logger2 = Logger.Instance;

Console.WriteLine(
ReferenceEquals(logger1, logger2)
);
```

Output:

```text
True
```

Because both references point to the same object.

---

# 6. Thread-Safe Singleton (Important)

The previous version has a problem.

If two threads execute:

```csharp
if(instance == null)
```

simultaneously,

two objects may be created.

Use locking:

```csharp
class Logger
{
    private static Logger instance;

    private static readonly object lockObj =
        new object();

    private Logger(){}

    public static Logger Instance
    {
        get
        {
            lock(lockObj)
            {
                if(instance == null)
                {
                    instance =
                        new Logger();
                }

                return instance;
            }
        }
    }
}
```

This is safer.

---

# 7. Modern C# Singleton (Recommended)

```csharp
class Logger
{
    private static readonly Logger instance =
        new Logger();

    private Logger(){}

    public static Logger Instance
        => instance;
}
```

Advantages:

- Thread safe
- Simple
- Fast
- Easy
    

---

# 8. Advantages (Pros)

## 1) Only One Instance
Prevents duplication.
## 2) Saves Resources
Heavy objects created once.
## 3) Global Access
Easy usage from anywhere.
## 4) Consistent Shared State
Everyone uses same data.
## 5) Controlled Object Creation
No accidental objects.
## 6) Lazy Initialization Possible
Create only when needed.

---

# 9. Disadvantages (Cons)

## 1) Global State Problems
Any code can access it.
This can create hidden dependencies.

---
## 2) Harder Unit Testing
Testing becomes difficult.

Example:

```text
Singleton shared across tests
```
Can affect test results.

---

## 3) Violates Single Responsibility Principle Sometimes
Singleton often manages:

```text
Object Creation
+
Business Logic
```

Two responsibilities.

---
## 4) Tight Coupling
Code becomes dependent on:

```csharp
Logger.Instance
```

instead of interfaces.

---

## 5) Concurrency Problems
Bad implementations break in multithreading.

---

## 6) Hidden Dependencies
Method signature:

```csharp
Process()
```

But internally:

```csharp
Logger.Instance
Config.Instance
```

Dependencies become invisible.

# 10. Singleton vs Factory

|Feature|Singleton|Factory|
|---|---|---|
|Purpose|One instance only|Create objects|
|Focus|Object uniqueness|Object creation|
|Number of objects|One|Many|
|Global access|Yes|Usually no|
|Main goal|Shared object|Flexible creation|

---

# 11. Common Mistakes

## Mistake 1

```csharp
public Singleton()
```

Wrong.

Constructor should be:

```csharp
private Singleton()
```

---

## Mistake 2

Creating object manually:

```csharp
new Logger();
```

Should not happen.

---

## Mistake 3

Using Singleton everywhere.

Not everything needs Singleton.

---

Common exam sentence:

> **Singleton Pattern guarantees a single instance of a class and provides a global access point to that instance while controlling object creation internally.**