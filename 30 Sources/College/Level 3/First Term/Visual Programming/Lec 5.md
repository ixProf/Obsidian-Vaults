---

## **Comprehensive Summary: Modularizing Your Code with Methods**

title: "Lec 5"
aliases: []
type: source
status: active
domain: computer-science
tags: [source, computer-science, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
## I. Introduction to Modularization

**Concept**  
Modularization is the process of breaking a complex program into smaller, manageable units called **methods**.

**Types of Methods**

- **Void Method:** Executes a set of statements without returning a value.
    
- **Value-Returning Method:** Executes a task and returns a value to the calling statement.
    

**Benefits**

- **Simplification:** Replaces long and complex event handlers with smaller, logical units.
    
- **Code Reuse:** A method can be written once and reused multiple times, reducing duplication.
    

---

## II. Anatomy of a Method

A method definition is written inside a class (e.g., `Form1`) and consists of two main parts: **Header** and **Body**.

### 1. Method Header

The header appears at the beginning of the method and includes:

- **Access Modifier:**
    
    - `private`: Method can only be accessed within the same class.
        
    - `public`: Method can be accessed from outside the class.
        
- **Return Type:**
    
    - Specifies the data type returned by the method (`int`, `double`, etc.).
        
    - Use `void` if no value is returned.
        
- **Method Name:**
    
    - A descriptive name written in **PascalCase**.
        
- **Parentheses `()`**
    
    - Always present; may contain parameters or be empty.
        
- **Important Note:**
    
    - The method header **never ends with a semicolon**.
        

### 2. Method Body

- Enclosed in curly braces `{ }`.
    
- Contains the statements executed when the method is called.
    

---

## III. Calling Methods and Passing Arguments

**Calling a Method**

- Execution branches to the method body.
    
- Syntax: method name followed by parentheses and a semicolon  
    Example: `DisplayMessage();`
    

**Arguments vs. Parameters**

- **Argument:** Actual data passed to the method during the call.
    
- **Parameter:** Variable defined in the method header that receives the argument.
    

**Argument Flexibility**  
You can pass:

- Literal values
    
- Variables
    
- Mathematical expressions (e.g., `x * 4`)
    
- Returned values from other methods (e.g., `int.Parse()`)
    

**Multiple Arguments**

- Passed by **position**.
    
- First argument → first parameter, second → second, etc.
    

---

## IV. Advanced Argument Features

### 1. Named Arguments

- Arguments can be passed using parameter names.
    
- Example:  
    `ShowName(lastName: "Smith", firstName: "Suzanne")`
    
- Removes dependency on parameter order.
    

### 2. Default Arguments

- Parameters can have default values in the header.
    
- Example: `decimal taxRate = 0.07m`
    
- If omitted in the call, the default value is used.
    
- If provided, the default is overridden.
    

---

## V. Data Passing Mechanisms

### 1. Passing by Value (Default)

- A copy of the argument is passed.
    
- Changes inside the method do **not** affect the original variable.
    

### 2. Passing by Reference (`ref`)

- The parameter references the original variable.
    
- Any modification affects the original value.
    
- **Requirement:** The argument must be initialized before being passed.
    

### 3. Output Parameters (`out`)

- Similar to `ref` with key differences:
    
    - The argument does **not** need to be initialized before the call.
        
    - The method **must** assign a value before it ends.
        

---

## VI. Value-Returning Methods

- Used like values in expressions or assignments.
    
- **Requirements:**
    
    - Must specify a return data type in the header.
        
    - Must include a `return` statement that matches the declared type.
        

**Boolean Methods**

- Return `true` or `false`.
    
- Commonly used for condition checks.  
    Example: `if (IsEven(number))`
    

---

## Lecture Defaults

- **Default Argument Passing:** By value.
    
- **Default Parameter Values:** Used when the argument is omitted.
    
- **Default Access Level:** `private` is the standard for helper methods inside a class.

---

## Common Errors and Their Causes

|Error Description|Code Example|Cause|
|---|---|---|
|Parameter List Syntax Error|`ShowMax(int num1, num2)`|Each parameter must have its own data type (`int num1, int num2`).|
|Uninitialized Reference Error|`int myVar; SetToZero(ref myVar);`|`ref` arguments must be initialized before the call.|
|Return Value Mismatch|—|Returned value must match the declared return type.|
|Missing Return Statement|—|A value-returning method must always return a value.|
|Output Parameter Logic Error|—|`out` parameters must be assigned before the method ends.|

---
