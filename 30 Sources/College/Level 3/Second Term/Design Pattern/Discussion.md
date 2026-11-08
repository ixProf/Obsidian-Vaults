---
title: "Discussion"
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

# Design Patterns Tracing and Explanation


## 1. Factory Pattern (Static Factory Method)
**Location:** `Fawry.factory.ProductFactory`

### Explanation
The Factory pattern abstracts the process of object creation. Instead of the client (e.g., `Main.java`) directly calling `new Cheese(...)` or `new TV(...)`, it calls ==a central factory class== that handles the instantiation.

### Usage Trace
1. In `Main.java`, products are==created using the factory==:
   ```java
   Product cheese = ProductFactory.createCheese("Cheese 400g", 100, 10, 0.4);
   ```
2. The `ProductFactory` takes the parameters and ==instantiates the specific concrete class== (`Cheese`, `Biscuits`, `TV`, `ScratchCard`), returning it typed ==as the abstract `Product` base class.==

### Impact
- **Centralization:** All product creation logic lives in one place. If the initialization logic for a `Cheese` object changes, you only update ==the factory, not every place in the codebase that creates a `Cheese`==.
- **Decoupling:** `Main.java` doesn't need to depend heavily on the concrete implementations of products, ==promoting looser coupling.==

---

## 2. Strategy Pattern
**Location:** `Fawry.strategy.*` (Interface: `ShippingStrategy`, Concrete: `FlatRateShippingStrategy`, `WeightBasedShippingStrategy`)

### Explanation
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. This lets the algorithm vary independently from the clients that use it.

### Usage Trace
1. `Cart.java` has a reference to a `ShippingStrategy`. By default, it initializes with a `FlatRateShippingStrategy`.
2. When `calculateShipping()` is called on the `Cart`, it delegates the calculation to the injected strategy:
   ```java
   public double calculateShipping() {
       return shippingStrategy.calculateShipping(this);
   }
   ```
3. In `Main.java`, Mohamed's cart dynamically swaps out the strategy right before checkout using the `setShippingStrategy` method:
   ```java
   cart2.setShippingStrategy(new WeightBasedShippingStrategy());
   ```

### Impact
- **Flexibility:** Shipping calculations can be changed at runtime (e.g., changing from flat rate to weight-based if a customer selects a different delivery tier).
- **Open/Closed Principle:** To add a new shipping rule (like "Free Shipping for VIPs"), you simply create a new strategy class. You do not need to modify the `Cart` class at all.

---

## 3. Singleton Pattern
**Location:** `Fawry.singleton.CheckoutService`

### Explanation
The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.

### Usage Trace
1. `CheckoutService` has a private constructor to prevent external instantiation.
2. It holds a `private static final` instance of itself (Eager Initialization).
3. `Main.java` accesses the service via the static getter:
   ```java
   CheckoutService.getInstance().checkout(customer, cart);
   ```

### Impact
- **Resource Management:** Prevents the accidental creation of multiple checkout managers, which could theoretically lead to race conditions or duplicate processing in a more complex system.
- **Global Access:** Makes the checkout service easily accessible from anywhere in the application without needing to pass the service instance around as an argument.

---

## 4. Observer Pattern
**Location:** `Fawry.observer.*` (Interface: `CartObserver`, Concrete: `ConsoleLogger`, `AnalyticsObserver`)

### Explanation
The Observer pattern defines a one-to-many dependency between objects so that when one object (the Subject) changes state, all its dependents (Observers) are notified and updated automatically.

### Usage Trace
1. `Cart.java` acts as the Subject. It holds a list of `CartObserver` instances.
2. In `Main.java`, multiple observers are registered to Ali's cart:
   ```java
   cart.addObserver(new ConsoleLogger(true));
   cart.addObserver(new AnalyticsObserver());
   ```
3. When `cart.add()` is called, the cart iterates through its observers and triggers `onProductAdded` or `onAddFailed`. 
4. The `ConsoleLogger` prints a formatted receipt log, while the `AnalyticsObserver` independently tallies up total successful/failed item additions.

### Impact
- **Decoupling:** The `Cart` class does not know *what* happens when a product is added; it only knows *that* it was added. It doesn't contain any logging or analytics code.
- **Scalability:** You can add email notifications or database logging in the future simply by creating a new observer class and attaching it, without modifying the `Cart`.

---

## 5. Decorator Pattern
**Location:** `Fawry.decorator.*` (Abstract: `ProductDecorator`, Concrete: `DiscountedProduct`)

### Explanation
The Decorator pattern attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

### Usage Trace
1. `Main.java` checks if a customer is premium. If so, it wraps the original `Product` inside a `DiscountedProduct` decorator:
   ```java
   if (customer.isPremium()) {
       return new DiscountedProduct(product, 10);
   }
   ```
2. The `DiscountedProduct` intercepts calls to `getPrice()`, applying a 10% discount to the price returned by the inner wrapped product.
3. It also conditionally intercepts `getWeight()` to ensure that shippable products retain their weight properties.

### Impact
- **Dynamic Behavior:** Discounts are applied at runtime only for specific items/customers.
- **Class Explosion Prevention:** Instead of creating subclasses like `DiscountedCheese`, `DiscountedTV`, etc., the decorator wraps *any* product, keeping the class hierarchy small and manageable.

---

## 6. Adapter Pattern
**Location:** `Fawry.adapter.*` (Interface: `ExternalShippingItem`, Adapter: `ShippingItemAdapter`, Target System: `ExternalShippingService`)

### Explanation
The Adapter pattern acts as a bridge between two incompatible interfaces. It allows classes to work together that couldn't otherwise because of mismatched interfaces.

### Usage Trace
1. The project simulates a 3rd-party API: `ExternalShippingService`. This service requires items to be in the shape of the `ExternalShippingItem` interface.
2. Our system's `Product` and `CartItem` classes do not implement this interface.
3. During checkout in `CheckoutService.java`, the system iterates through the cart and wraps shippable products in the `ShippingItemAdapter`:
   ```java
   externalShippingItems.add(new ShippingItemAdapter(item.getProduct(), item.getQuantity()));
   ```
4. The adapter translates calls from the external service (`getItemName()`, `getItemWeight()`) into methods our system understands (`getName()`, `getWeight()`).

### Impact
- **Integration:** Allows the seamless integration of external services without forcing our domain models (like `Product` or `Cheese`) to implement 3rd-party interfaces.
- **Separation of Concerns:** Data translation logic is cleanly isolated inside the Adapter class.
