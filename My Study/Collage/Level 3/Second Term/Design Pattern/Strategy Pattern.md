## Definition

The Strategy Pattern:

> Defines a family of algorithms, ==encapsulates each one, and makes them interchangeable==. It allows algorithms to vary independently from the clients that use them.


![[Pasted image 20260404032006.png]]


---

# Main Problem the Pattern Solves

In many applications:

- The One Constant in Software Development is ==change==
- There are multiple ways to perform the same operation.
- Requirements change frequently.
- Using inheritance or large conditional statements makes the code rigid and hard to maintain.

---


## Encapsulate What Varies

Instead of placing changing behavior inside one class:

==Move each behavior into a separate class==.

This makes the system:

- Flexible
- Maintainable
- Extendable

- ==Separating what changes from what stays the same== 
---

## Favor Composition Over Inheritance

Instead of:

- Creating subclasses to change behavior


Use:
 Object Composition (HAS-A relationship)

The object delegates behavior to another object.

---

## Program to Interfaces, Not Implementations

The client class should depend on:
Interfaces (Abstraction) Not concrete classes.

This allows:

- Easy replacement of behaviors
- Loose coupling between classes

---

## Family of Algorithms

Strategy Pattern ==groups multiple behaviors== that solve the same problem.

Each behavior:

- Implements the same interface
- Provides a different implementation

---

##  Interchangeable Behaviors

Strategies can be changed ==At runtime== Without modifying the client class.

---

# Structure of Strategy Pattern

The pattern contains three main components: 
- Strategy Interface
	- Defines common behavior.
- Concrete Strategies
	- Different implementations of the behavior.
- Context Class
	- Uses and switches strategies.

---

# Practical Example (C#)

## Scenario: Payment System

A system supports multiple payment methods:

- Credit Card
- PayPal
- Cash

==Instead of using IF statements==, we use Strategy Pattern.

---

### Strategy Interface

```csharp
public interface IPaymentStrategy
{
    void Pay(double amount);
}
```

Defines payment behavior.

---

### Concrete Strategies

#### Credit Card Payment

```csharp
public class CreditCardPayment : IPaymentStrategy
{
    public void Pay(double amount)
    {
        Console.WriteLine($"Paid {amount} using Credit Card");
    }
}
```

#### PayPal Payment

```csharp
public class PayPalPayment : IPaymentStrategy
{
    public void Pay(double amount)
    {
        Console.WriteLine($"Paid {amount} using PayPal");
    }
}
```

#### Cash Payment

```csharp
public class CashPayment : IPaymentStrategy
{
    public void Pay(double amount)
    {
        Console.WriteLine($"Paid {amount} using Cash");
    }
}
```

---

### Context Class

```csharp
public class PaymentProcessor
{
    private IPaymentStrategy _paymentStrategy;

    public void SetPaymentStrategy(IPaymentStrategy strategy)
    {
        _paymentStrategy = strategy;
    }

    public void ProcessPayment(double amount)
    {
        _paymentStrategy.Pay(amount);
    }
}
```

---

### Program.cs (Runtime Strategy Change)

```csharp
class Program
{
    static void Main()
    {
        PaymentProcessor processor = new PaymentProcessor();

        processor.SetPaymentStrategy(new CreditCardPayment());
        processor.ProcessPayment(500);

        processor.SetPaymentStrategy(new PayPalPayment());
        processor.ProcessPayment(300);
    }
}
```

---

# What This Example Demonstrates
- Encapsulate What Varies
	- Each payment method is placed in its own class.
- Composition Over Inheritance
	- PaymentProcessor HAS-A Payment Strategy.
- Program to Interfaces
	- Processor depends on IPaymentStrategy.
- Runtime Flexibility
	- Payment method can change while the program runs.

---

# Advantages of Strategy Pattern

- Reduces conditional logic
- Improves code flexibility
- Supports extension without modifying existing code
- Encourages loose coupling
- Improves maintainability

# Disadvantages

- Increases number of classes
- Slightly more complex design

---

# When to Use Strategy Pattern


- You have multiple ways to perform an operation  
- Behavior changes dynamically  
- You want to follow SOLID principles  
- You want to avoid complex conditional logic

---