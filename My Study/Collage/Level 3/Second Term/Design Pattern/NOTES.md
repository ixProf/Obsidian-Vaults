
# Final Revision – Design Patterns (Lecture 1,2,3)

---

# أولًا: Lecture 1 (Strategy + Basics)

### 1) True / False

- Inheritance is better than Composition ❌  
    ✔ الإجابة: False
    
 الصح:

- HAS-A > IS-A
    
- Favor Composition over Inheritance
    

---

### 2) Implement ولا Extend؟

- FlyWithWings → implements FlyBehavior
    
- MallardDuck → extends Duck
    
 قاعدة مهمة:

- behavior → interface → implements
    
- main class → extends
    

---

### 3) Definitions (مهم جدًا)

#### Composition

- HAS-A relationship
    
- object contains another object
    

---

#### Strategy Pattern

> Defines a family of algorithms, encapsulates each one, and makes them interchangeable

---

### 4) سؤال مهم جدًا

**What’s the one constant in software development?**

الإجابة:

> CHANGE

---

### 5) Design Principle

> Identify what varies and separate it from what stays the same

---
# ثانيًا: Lecture 2 (Observer)

## أهم الأسئلة

---

### 1) Definition

> Observer defines a one-to-many dependency so that when one object changes, all dependents are notified automatically

---

### 2) أهم Principle

> Strive for loosely coupled designs between objects that interact

---

### 3) سؤال مهم جدًا

**WeatherData implements ولا extends؟**

 الإجابة:

- implements Subject
    

ليه؟

- Subject = interface
    

---

### 4) الفكرة الأساسية (تحفظها كدا)

- Subject عنده array / list من observers
    
- أي observer جديد → يتضاف
    
- لما يحصل change → notify الكل
    

---

### 5) ميزة مهمة

 تقدر تضيف observer جديد بدون تعديل الكود القديم

---

# ثالثًا: Lecture 3 (Decorator)

---

##  أهم الأسئلة

---

### 1) Definition (مهم جدًا جدًا)

> Decorator attaches additional responsibilities to an object dynamically

---

### 2) سؤال Diagram

 الكلاس ده تبع ايه؟  
✔ الإجابة: Decorator

📌 لو لقيت:

- نفس type
    
- فيه object جواه
    
- بيضيف behavior
    

 يبقى Decorator

---

-  أهم مشكلة (Inheritance)

Class Explosion  
 صعب التعديل



### 4) الحل

 Composition + Wrapping

---

### 5) Execution فكرة (مهم جدًا)

```text
Whip → Mocha → DarkRoast
```


### سؤال مهم جدًا

```csharp
return .20 + beverage.cost();
```

❌ 
ليه غلط؟

- Magic Number
- Hardcoded
الصح:

```csharp
const double price = 0.20;
```

#  أهم كلام الدكتور

---

#  1) Code Logic Question

## Question:

```csharp
public class Duck
{
    public void Fly()
    {
        Console.WriteLine("Flying");
    }
}

public class RubberDuck : Duck
{
}
```

Is this design correct?

A) Correct  
B) Wrong due to syntax error  
==C) Wrong due to misuse of inheritance==  
D) Correct because it is simple


## Explanation:

- Inheritance forces all ducks to fly
- RubberDuck should NOT fly
- This violates good design → should use Strategy (composition)

---

# 2) Definition Question

## Question:

Which of the following is the correct definition of the Strategy Pattern?

A) Notifies multiple objects automatically  
B) Adds behavior dynamically  
==C) Defines a family of algorithms and makes them interchangeable  ==
D) Creates objects at runtime


---

# 3) Diagram Recognition

## 1 Question:

A system has:

- A main class
- Uses an interface
- Multiple classes implement different behaviors
- Behavior can change at runtime

Which pattern is this?

A) Observer  
==B) Strategy  ==
C) Decorator  
D) Singleton

## 2 Question:

A system has:

- One object
- A list of dependent objects
- When the main object changes, all others are notified

Which pattern is this?

A) Strategy  
B) Decorator  
==C) Observer  ==
D) Factory

## 3 Question:

A system has:

- An object wrapped inside another object
- Each wrapper adds extra behavior

Which pattern is this?

A) Strategy  
B) Observer  
==C) Decorator==
D) Adapter


---

#  4) Cost Tracing Question

##  Question:

```csharp
Beverage order = new Coffee();   // 5
order = new Milk(order);         // +2
order = new Mocha(order);        // +3
```

What is the final cost?

A) 5  
B) 7  
C) 8  
==D) 10==

## Explanation:

5 + 2 + 3 = 10

---

# 5) Cost Logic (Important Trap)

## Question:

```csharp
return .20 + beverage.Cost();
```

What is wrong with this code?

A) Syntax error  
B) Wrong return type  
C) ==Magic number  ==
D) Nothing is wrong

---

# 6) Design Rule Question

## Question:

What is the best way to add a new feature?

A) Modify existing class  
B) Use multiple if statements  
==C) Create a new class==
D) Remove old code

---
# 7) Concept Question

## Question:

HAS-A relationship refers to:

A) Inheritance  
==B) Composition  ==
C) Abstraction  
D) Polymorphism

---


# 8 ) Concepts

## Question:

WeatherData implements Subject because:

A) Subject is a class  
==B) Subject is an interface  ==
C) Subject is static  
D) Subject is abstract method

---

# Final Tip (Doctor Style)

Focus on:

- Logic (not syntax)
- Recognizing patterns from structure
- Definitions exactly as written
- Cost tracing
- Never modifying existing code → always extend using new classes

---

If you want next step
I can give you:

- **Hard exam with tricky questions**
    
- OR **real case scenarios (which pattern to use and why)**

## مقارنة مهمة

|Pattern|الشكل في الدماغ|
|---|---|
|Strategy|class جواه behaviors|
|Observer|array of observers|
|Decorator|object جواه object جواه object|

---

## Patterns صح دايمًا

- Strategy
- Observer
- Decorator


 القديم (inheritance / if) → غلط

---

#  تحفظ



- CHANGE is constant
    
- HAS-A > IS-A
    
- Composition > Inheritance
    
- Strategy → behavior interchangeable
    
- Observer → notify system
    
- Decorator → add behavior dynamically
    
- Loose Coupling مهم جدًا
    
- Program to Interface
    
- Open-Closed Principle
