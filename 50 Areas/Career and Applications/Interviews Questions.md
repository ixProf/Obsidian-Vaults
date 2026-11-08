---
title: "Interviews Questions"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
#### **1. Explain the difference between** `abstract` **classes and** `interfaces` **in C#.**

**Answer**:

- **Abstract Classes**:
    
    - Can have method implementations and abstract methods.
        
    - Support fields, constructors, and access modifiers for members.
        
    - A class can inherit only one abstract class (single inheritance).
        
- **Interfaces**:
    
    - Cannot have method implementations (except default methods introduced in later versions).
        
    - Only define methods, properties, events, and indexers.
        
    - A class can implement multiple interfaces (multiple inheritance).
        
          
        

#### **2. What is the difference between** `const`, `readonly`, and `static` **in C#?**

**Answer**:

- `const`:
    
    - Compile-time constant.
        
    - Must be initialized at declaration.
        
    - Value cannot be changed.
        
- `readonly`:
    
    - Runtime constant.
        
    - Can be initialized at declaration or in a constructor.
        
    - Value cannot be changed after initialization.
        
- `static`:
    
    - Belongs to the class, not an instance.
        
    - Shared across all instances of the class.
        
          
        

#### **3. Explain garbage collection in C#. How does it work?**

**Answer**:  
Garbage collection (GC) is an automatic memory management feature in C#. It:

- Frees up memory occupied by objects that are no longer referenced.
    
- Works in generations:
    
    - **Gen 0**: Newly allocated objects.
        
    - **Gen 1**: Surviving objects from Gen 0.
        
    - **Gen 2**: Long-lived objects.
        
- Uses the **mark-and-sweep** algorithm to identify and remove unused objects.
    

  

#### **4. What is the difference between** `Array` **and** `List` **in C#?**

**Answer**:

- **Array**:
    
    - Fixed size.
        
    - Cannot grow or shrink after initialization.
        
    - Provides better performance for indexing operations.
        
- **List**:
    
    - Dynamic size.
        
    - Can grow or shrink dynamically.
        
    - Provides various methods like `Add`, `Remove`, `Sort`.
        
          
        

#### **5. What is the purpose of the** `is` **and** `as` **keywords in C#?**

**Answer**:

- `is`: Checks if an object is of a specific type.
    
```cs
    1. if (obj is string) {
    2.     Console.WriteLine("It is a string!");
    3. }
```
    
- `as`: Attempts to cast an object to a specific type. If the cast fails, it returns `null`.
    
```cs
    1. string str = obj as string;
    2. if (str != null) {
    3.     Console.WriteLine("Casted to string!");
    4. }
```
    

  

#### **6. Explain the difference between** `**stack**` **and** `**heap**` **memory in C#.**

**Answer**:

- **Stack**:
    
    - Stores value types and method call information.
        
    - Memory is automatically allocated and deallocated.
        
    - Faster access.
        
- **Heap**:
    
    - Stores reference types and dynamic memory.
        
    - Memory is managed by garbage collection.
        
    - Slower access.
        

#### **7. How can you handle exceptions in C#? Provide a code example.**

**Answer**:  
Exceptions are handled using `try-catch-finally`.  

```cs
1. try {
2.     int result = 10 / 0;
3. } catch (DivideByZeroException ex) {
4.     Console.WriteLine("Cannot divide by zero!");
5. } finally {
6.     Console.WriteLine("This block always executes.");
7. }
```


  

#### **8.Explain the difference between** `String` **and** `StringBuilder` **in C#.**

**Answer**:

- `String`: Immutable, creating a new object with every modification.
    
- `StringBuilder`: Mutable, efficient for frequent string manipulations.  
    Example:
    

1. StringBuilder sb = new StringBuilder("Hello");
2. sb.Append(" World"); // Modifies the same object.

  

#### **9.What are value types and reference types in C#?**

**Answer**:

- **Value Types**: Store data directly in memory. Example: `int`, `double`.
    
- **Reference Types**: Store a reference to the data in memory. Example: `class`, `string`
    
      
    

#### **10.What is the purpose of the** `yield` **keyword in C#?**

**Answer**:  
The `yield` keyword is used to create an iterator method, enabling lazy evaluation.  
Example:

```cs
1. IEnumerable<int> GetNumbers() {
2.     for (int i = 0; i < 5; i++) {
3.         yield return i;
4.     }
5. }
```

#### **11. What is the difference between** `break`, `continue`, and `return`**?**

**Answer**:

- `break`: Exits a loop or switch statement.
    
- `continue`: Skips the current iteration and proceeds to the next.
    
- `return`: Exits the current method and optionally returns a value.
    

  

#### **12.What are extension methods in C#?**

**Answer**:  
Extension methods add functionality to existing types without modifying them.  
Example:

```cs
1. public static class StringExtensions {
2.     public static bool IsNullOrEmpty(this string str) {
3.         return string.IsNullOrEmpty(str);
4.     }
5. }
```

  

#### **13. What is the difference between** `Dispose()` **and** `Finalize()` **in C#?**

**Answer**:

- `Dispose()`: Explicitly releases unmanaged resources. Called by the programmer.
    
- `Finalize()`: Implicitly called by the garbage collector to clean up unmanaged resources.
    
      
    

#### **14. How does** `partial` **work in C#?**

**Answer**:  
The `partial` keyword allows splitting a class, struct, or interface into multiple files.  
  
File 1:

`partial class Demo { public void MethodA() { } }

File 2:

`partial class Demo { public void MethodB() { } }`

  

#### **15.What is a delegate in C#?**

**Answer**:  
A delegate is a type-safe function pointer that holds a reference to a method.  

```cs
1. delegate void Print(string message);
2. Print print = Console.WriteLine;
3. print("Hello, Delegate!");
```

  

#### **16. What are tuples in C#?**

**Answer**:  
Tuples are data structures that can hold multiple values of different types.  

```cs
1. var tuple = (Name: "Alice", Age: 30);
2. Console.WriteLine(tuple.Name);
```

  

#### **17. What are** `events` **in C#?**

**Answer**:  
Events are mechanisms for communication between objects, typically used in event-driven programming.  

`public event EventHandler OnClick;`

  

#### **18. What is covariance and contravariance in C#?**

**Answer**:

- **Covariance**: Allows assignment of a derived type to a base type.
    
- **Contravariance**: Allows assignment of a base type to a derived type.
    

#### **19. What are generics in C#?**

**Answer**:  
Generics allow creating type-safe data structures without specifying a concrete type.

  

#### **20. What is the difference between** `IEnumerable` **and** `IQueryable`?

**Answer**:

- `IEnumerable`: Executes queries in memory (deferred execution).
    
- `IQueryable`: Executes queries on the data source.

#### **21. Explain the difference between** `List<T>` **and** `LinkedList<T>` **in C#.**

**Answer**:

- `List<T>`:
    
    - Implements a dynamic array.
        
    - Provides fast random access using indexing (`O(1)` for reads).
        
    - Adding/removing at the end is fast (`O(1)`), but inserting or removing in the middle is slower (`O(n)`).
        
- `LinkedList<T>`:
    
    - Implements a doubly linked list.
        
    - Provides slower sequential access (`O(n)` for reads).
        
    - Efficient for inserting and removing nodes anywhere in the list (`O(1)` if you have a reference to the node).
        

#### **22. What is a** `Dictionary<TKey, TValue>` **in C#? How is it implemented internally?**

**Answer**:  
A `Dictionary` is a key-value data structure:

- **Implementation**: Internally uses a hash table for fast lookups.
    
- **Time Complexity**: Lookup, insertion, and deletion are `O(1)` on average
    
      
    

#### **23. Explain the difference between a** `Queue<T>` **and a** `Stack<T>` **in C#.**

**Answer**:

- `Queue<T>`: FIFO (First In, First Out).
    
    - Example: Ticket counters.
        
    - Operations: `Enqueue()` to add, `Dequeue()` to remove.
        
- `Stack<T>`: LIFO (Last In, First Out).
    
    - Example: Browser back button.
        
    - Operations: `Push()` to add, `Pop()` to remove.
        
          
        

#### **24. How does the** `HashSet<T>` **differ from a** `List<T>` **in terms of performance and functionality?**

**Answer**:

- `HashSet<T>`:
    
    - Ensures uniqueness of elements.
        
    - Uses a hash table internally.
        
    - `O(1)` for insertion and lookup on average.
        
- `List<T>`:
    
    - Allows duplicates.
        
    - Maintains insertion order.
        
    - `O(n)` for lookup and insertion at arbitrary positions.
        
          
        

#### **25. What is the difference between a** `SortedSet<T>` **and a** `SortedDictionary<TKey, TValue>`?

**Answer**:

- `SortedSet<T>`:
    
    - Stores unique elements in sorted order.
        
- `SortedDictionary<TKey, TValue>`:
    
    - Stores key-value pairs sorted by keys.
        
          
        

#### **26. What is the difference between a single-dimensional and a multi-dimensional array in C#?**

**Answer**:

- **Single-dimensional array**:
    
    `int[] array = { 1, 2, 3 };`
    
- **Multi-dimensional array**:
    
    `int[,] matrix = { { 1, 2 }, { 3, 4 } };
    
    Multi-dimensional arrays are accessed using multiple indices, e.g., `matrix[0,1]`.
    

#### **27. How do jagged arrays differ from multi-dimensional arrays?**

**Answer**:

- **Jagged Array**:
    
    - An array of arrays.
        
    - Each sub-array can have a different length.
        
    
```CS
    1. int[][] jagged = new int[2][];
    2. jagged[0] = new int[] { 1, 2 };
    3. jagged[1] = new int[] { 3 };
```
    
- **Multi-dimensional Array**:
    
    - Fixed rows and columns.
        
    - All sub-arrays must have the same size.
        

#### **28. What are static classes in C#, and how are they used?**

**Answer**:  
A `static` class:

- Cannot be instantiated.
    
- Contains only static members.
    
- Example: `Math` class in .NET.
    

#### **29. What is the difference between** `throw` **and** `throw ex`**?**

**Answer**:

- `throw`: Preserves the original exception stack trace.
    
- `throw ex`: Resets the stack trace.
    

#### **30. Explain the difference between shallow copy and deep copy in C#.**

**Answer**:

- **Shallow Copy**: Copies only references for reference types.
    
- **Deep Copy**: Creates new instances of reference types.

#### **31. Explain boxing and unboxing in C#.**

**Answer**:

- **Boxing**: Converting a value type to an object type.
    
- **Unboxing**: Extracting the value type from an object.
    
      
    

#### **32. How do** `virtual` **and** `abstract` **methods differ?**

**Answer**:

- **Virtual**: Has a default implementation but can be overridden.
    
- **Abstract**: No implementation, must be overridden.
    
      
    

#### **33. What is the difference between** `protected` **and** `internal` **access modifiers?**

**Answer**:

- `protected`: Accessible in the same class and derived classes.
    
- `internal`: Accessible within the same assembly.
    
      
    

#### **34. What is abstraction in C#?**

**Answer**:  
Hiding implementation details and exposing only essential functionality using abstract classes or interfaces.

  

#### **35. How does** `ref` **differ from** `out` **in parameter passing?**

**Answer**:

- `ref`: The variable must be initialized before passing.
    
- `out`: The variable can be uninitialized but must be assigned inside the method.
    
      
    

#### **36. What is the difference between** `IEnumerable`**,** `ICollection`**, and** `IList`**?**

**Answer**:

- `IEnumerable`: Read-only iteration.
    
- `ICollection`: Adds `Count`, `Add`, and `Remove`.
    
- `IList`: Adds indexing capabilities.
    
      
    

#### **37. What is polymorphism in C#?**

**Answer**:

- **Compile-time**: Method overloading.
    
- **Run-time**: Method overriding via `virtual` and `override`.
    

  

#### **38. What are generics in C#, and why are they important?**

**Answer**:  
Generics allow type-safe operations without specifying a concrete type at compile time.  
Example:

`List<int> numbers = new List()<int>; // Strongly-typed`

  

#### **39.What is an indexer in C#?**

**Answer**:  
An indexer allows objects to be indexed like arrays.  

```cs
1. class Sample {
2.     private int[] numbers = new int[5];
3.     public int this[int index] {
4.         get { return numbers[index]; }
5.         set { numbers[index] = value; }
6.     }
7. }
```

  

#### **40. What is the purpose of the** `async` **and** `await` **keywords? Explain their internal working.**

**Answer**:

- **Purpose**:
    
    - `async`: Marks a method as asynchronous.
        
    - `await`: Pauses the method execution until the awaited task is completed.
        
- **Internal Working**:
    
    - The compiler generates a **state machine** for `async` methods, managing the asynchronous execution flow.
        
    - `await` doesn't block the thread but registers a continuation, ensuring efficient resource usage.