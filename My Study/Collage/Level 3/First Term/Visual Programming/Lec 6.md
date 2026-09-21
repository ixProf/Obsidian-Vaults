

## **Comprehensive Summary: Arrays and Lists (VisualCh6)**

---

## I. Array Fundamentals

### 1. Array Basics and Creation

**Definition**  
An **array** is a data structure that stores multiple items of the **same data type** together in memory.

**Declaration**

- Declared using square brackets:  
    `int[] numbersArray;`
    
- This creates a **reference variable** only; it does not yet contain the actual data.
    

**Initialization**

- The `new` keyword creates the array object and defines its size:  
    `numbersArray = new int[6];`
    
- The size must be a **non-negative integer**.
    
- Using **named constants** for array size is recommended for maintainability.
    

**Initialization List**

- Arrays can be created and filled at the same time:  
    `{ 10, 20, 30 }`
    
- The array size is automatically determined by the number of values provided.
    

---

## II. Processing Array Elements

**Accessing Elements**

- Elements are accessed using **indices (subscripts)**.
    
- Values can be assigned (e.g., from TextBoxes) or retrieved for output.
    

**The `Length` Property**

- Every array has a `Length` property.
    
- It returns the total number of elements and is commonly used in loops to avoid hard-coded limits.
    

**Looping Through Arrays**

- **for loop:** Uses an index variable to access elements.
    
- **foreach loop:**
    
    - Iterates automatically over all elements
        
    - No index or bounds checking required
        
    - Read-only (cannot modify the iteration variable)
        

---

## III. File Operations with Arrays

**Writing to Files**

- `StreamWriter` is used to save array elements to a text file.
    
- A loop writes each element as a separate line.
    

**Reading from Files**

- `StreamReader` is used to load file data into an array.
    
- A `while` loop with `!inputFile.EndOfStream` is commonly used.
    
- A counter ensures the array bounds are not exceeded.
    

---

## IV. Passing Arrays to Methods

**Default Behavior (Reference Passing)**

- Arrays are objects.
    
- When passed to a method, the **reference** is passed by default.
    
- Modifying an element inside the method affects the original array.
    

**Reassigning the Array Reference**

- Assigning a new array inside a method:  
    `iArray = new int[5];`
    
- This only changes the **local copy** of the reference.
    
- The original array in the calling code remains unchanged.
    

**Using the `ref` Keyword**

- To allow a method to replace the original array reference itself:
    
    - `ref` must be used in both the method header and the method call.
        

---

## V. Algorithms with Arrays

**Sequential (Linear) Search**

- Checks elements one by one from the beginning.
    
- Stops when the target value is found or the array ends.
    

**Comparing Arrays**

- The `==` operator compares **references**, not contents.
    
- To compare values, elements must be checked individually using a loop.
    

**Selection Sort**

- Sorts the array by repeatedly finding the smallest value.
    
- Swaps it with the current starting index.
    
- Repeats for the remaining portion of the array.
    

---

## VI. Multidimensional Arrays

**Two-Dimensional (2D) Arrays**

- Declared using a comma:  
    `int[,] matrix;`
    
- Rectangular structure (rows × columns).
    
- Accessed using two indices: `[row, column]`.
    

**Jagged Arrays**

- An “array of arrays”:  
    `int[][] jaggedArray;`
    
- Each row can have a different length.
    
- Initialized by:
    
    1. Creating the main array
        
    2. Creating a separate array for each row
        
- Accessed using: `[row][column]`.
    

---

## VII. List Collection

**Definition**

- `List<T>` is a dynamic data structure.
    
- Automatically resizes as items are added or removed.
    

**Common Properties and Methods**

- `Add(item)` → Adds an element to the end of the list
    
- `Count` → Returns the number of elements
    
- `RemoveAt(index)` → Removes item at a specific index
    
- `Remove(item)` → Removes a specific value
    
    - Returns `true` if found and removed
        
    - Returns `false` otherwise
        
- `IndexOf(item)` → Returns the index of the item or `-1` if not found
    
    - Overloads allow specifying start index and range
        

---

## II. Defaults Mentioned in the Lecture

1. **Array Passing Default**
    

- Arrays are passed **by reference** by default.
    
- Methods work directly on the original array in memory.
    

2. **Array Comparison Default**
    

- Using `==` checks if two array variables refer to the **same object**, not if their contents are equal.
    

3. **List Defaults**
    

- **Dynamic Capacity:** Lists resize automatically.
    
- **IndexOf:** Returns `-1` if the item is not found.
    
- **Remove:** Returns `false` if the item does not exist.
    

4. **File Writing Default**
    

- `StreamWriter` overwrites the file by default.
    
- To append data, `append: true` must be explicitly specified.
    

---

## III. Common Errors and Their Causes

|Error / Mistake|Code Example|Cause|
|---|---|---|
|Incorrect Array Comparison|`if (firstArray == secondArray)`|`==` compares references, not array contents.|
|Reassigning Array Without `ref`|`iArray = new int[5];`|Only the local reference changes; the original array is unaffected.|
|Invalid Index Exception|`nameList.IndexOf("Diane", 2);`|Start index or range is outside valid bounds.|
|Using Uninitialized Array|`int[] numbersArray;`|The array object is not created until `new` is used.|
|File Access Errors|`File.OpenText("Values.txt")`|File may not exist or an I/O exception may occur; requires `try-catch`.|

---

لو حابب:

- نسخة مختصرة للمراجعة السريعة
    
- شرح بالمصري
    
- أمثلة C# على كل جزء
    
- أسئلة امتحان (MCQ + صح وغلط)
    

قولّي 👌