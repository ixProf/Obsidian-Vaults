
# Symbol Table

- **Symbol Table**: major inherited attribute and major data structure in a compiler

- **Principal Operations**:
	- Insert: ==Store the information== provided by name declarations when processing these declarations
	- Lookup: ==Retrieve the information== associated to a name when that name is used in the associated code
	- Delete: ==Remove the information== provided by a declaration when that declaration no longer applies.

- **Information stored**:
	- Include 
		- ==data type information==
		- ==information on region of applicability (scope)==
		- ==information on eventual location in memory==.

---

## Structure of the Symbol Table

Typical Dictionary data structure

- Linear List:
	- Provide easy and direct implementation of 3 Operations
	- Operation time is ==Linear== in the size of list
	- ==Good for a compiler implementation== in which ==speed is not a major concern==
	
- Various Search tree structures
	- ==Don't Provide best case efficiency==
	- The delete operation is ==Very Complexity==
	- **Less Useful**
	
- Hash Tables
	- All three operation can be performed in almost constant time
	- ==Best Choice==, Most frequently in practice

- Main Idea
	- An array of entries =="Buckets"== indexed by an integer range
		
	- ==Hash function== it's a function that turns the search key into an ==integer hash value== in the index range
		
	- And the item corresponding to the search key ==is stored in the bucket at this index==
		
	- The efficiency ==greatly depends on the design== of the hash function
	
- Main Problem
	- ==Collision resolution== : two keys are mapped to the ==same index== by the hash function **The Methods to deal with Collision**
	
-  Open Addressing
	- Inserting the collided new items in ==successive buckets==
	- Will cause a significant degradation in performance and make ==delete operation difficult==
	
- Separate chaining
	- Each bucket is a linear list -> collision are resolved by inserting the new item into the bucket list

- Perhaps it is the best scheme for compiler construction

---

## 6.3.2 Declarations

A **declaration** tells the compiler information about an identifier (name), such as what it represents, its type, or its value.

There are **four basic kinds of declarations**:

### 1. Constant Declarations (Value Bindings)

A constant declaration associates ==a **fixed value**== with a name.

```c
const int SIZE = 199;
```

- `SIZE` always equals `199`.
    
- Its value cannot be changed after initialization.
    
- This is called **single assignment** because the value is assigned only once.
    

#### Purpose

- Makes code easier to read.
    
- Prevents ==accidental modification==.
    
- Improves ==program safety==.
    

---

### 2. Type Declarations

A type declaration ==creates a **new type**== or gives another name (alias) to an existing type.

Example:

```c
struct Entry {
    char *name;
    int count;
    struct Entry *next;
};
```

Here, `Entry` defines a new structure type containing:

- `name` → pointer to characters
- `count` → integer
- `next` → pointer to another `Entry`
    

#### Purpose

- Organizes ==related data together==.
    
- Helps the compiler perform ==**type checking**==.
    
- Allows ==creation of user-defined data types.==
    

---

### 3. Variable Declarations

A variable ==declaration binds a name to a data type.==

Example:

```c
int a;
int b[100];
```

- `a` is an integer.
- `b` is an array of 100 integers.
    

#### Memory Allocation

Declaring a variable also determines:

- **Where memory ==is allocated**==
    
- **How long ==that memory exists== (lifetime or extent)**
    

Example:

```c
int count() {
    static int counter = 0;
    return ++counter;
}
```

`static` means:

- Memory is allocated only once.
    
- `counter` keeps its value between function calls.
    

Example:

```
count() → 1
count() → 2
count() → 3
```

Another example:

```c
extern int counter;
```

`extern` means:

- The ==variable is defined somewhere else==.
    
- This declaration only tells the compiler it exists.
    

---

### 4. Procedure/Function Declarations

==Functions can also be declared==.

Example:

```c
int sum(int a, int b);
```

This tells the compiler:

- The function exists.
- It returns an `int`.
- It accepts two integer parameters.
    

The actual implementation may appear later.

---

## Declaration vs Definition

These two concepts are different.

### Declaration

Introduces the name.

```c
extern int x;
```

The ==compiler knows `x` exists.==

### Definition

Actually ==creates storage or implementation==.

```c
int x = 5;
```

Memory ==is allocated for `x`.==

Think of it like:

- **Declaration → "==This thing exists==."**
    
- **Definition → "==Here it is==."**

### Symbol Tables

A ==**symbol table**== is a data structure used by the compiler to store information about identifiers.

It contains:

- Variable names
- Function names
- Type names
- Constants
    

Two strategies exist:

### Strategy 1

Use ==**one symbol table**== for everything.

```
Name      Kind
-----------------
x         variable
sum       function
SIZE      constant
Entry     type
```

### Strategy 2

- Use **separate symbol tables**
	- One for variables.
	- One for functions.
	- One for types.
	- One for constants.

Both approaches are valid.

---

## 6.3.3 Scope Rules and Block Structure

A **scope** determines ==where a declaration is visible== in the program.

---

### Rule 1: Declaration Before Use

A variable ==must be declared before it is used==.

Correct:

```c
int x;
x = 5;
```

Wrong:

```c
x = 5;
int x;
```

### Why?

Without this rule, the compiler would need to look ahead or make multiple passes.

With declaration-before-use, **one-pass compilation becomes possible**.

### Rule 2: Most Closely Nested Rule

If multiple declarations have the ==same name==, the compiler chooses the one in the ==**nearest enclosing block**==.

Example:

```c
int x = 10;

void f() {
    char x = 'A';

    {
        double x = 3.14;
        printf("%f", x);
    }
}
```

Inside the innermost block:

```
double x
```

is used.

After leaving that block:

```
char x
```

is used.

Outside the function:

```
int x
```

is used.

The ==**closest declaration hides the outer ones**.==

This is called **==shadowing==**.

---

## What Is a Block?

A **block** is ==any construct surrounded by braces `{}` that may contain declarations.==

Example:

```c
{
    int a;

    {
        int b;
    }
}
```

The inner block is ==nested inside the outer block==.

---

## Block-Structured Languages

A language is ==block-structured== if:

1. Blocks ==can be nested inside other blocks==.
    
2. Declarations are ==visible only inside their own block== and any blocks contained within it.
    

Languages like **C, C++, Java, and Pascal** follow this rule.

---

### Understanding Figure 6.14

Consider:

```c
int i, j;

int f(int size) {

    char i, temp;

    {
        double j;
    }

    {
        char *j;
    }
}
```

### Global scope

```
i → int
j → int
```

---

### Inside function `f`

```
i → char
temp → char
size → int
```

The local `i` hides the global `i`.

---

### First nested block

```
j → double
```

This hides the global `j`.

---

### Second nested block

```
j → char *
```

Now this declaration hides the previous `j`.

---

### After leaving the blocks

The temporary ==declarations disappear.==

Only the ==active declarations remain==.

---

## Symbol Table as a Stack

For each identifier, the ==compiler keeps declarations like a **stack**.==

Suppose:

```
Global:
i → int
```

Enter function:

```
i → char
```

Stack:

```
Top    char
       int
```

Leave function:

```
Pop char
```

Now:

```
Top    int
```

The global declaration becomes active again.

---

## Deleting Declarations

When exiting a block, the compiler usually **does not physically remove** declarations from memory.

Instead, it simply marks them as:

```
Inactive
```

This is ==faster and preserves information for later compiler phases==.

---

## Complete Quick Revision Table

|Concept|Meaning|Example|
|---|---|---|
|**Constant Declaration**|Binds a fixed value to a name|`const int SIZE = 199;`|
|**Type Declaration**|Creates or names a type|`struct Entry {...};`|
|**Variable Declaration**|Associates a variable with a type|`int a;`|
|**Function Declaration**|Describes a function|`int sum(int, int);`|
|**Declaration**|Introduces a name|`extern int x;`|
|**Definition**|Allocates memory or provides implementation|`int x = 5;`|
|**Scope**|Region where a declaration is visible|Local or global blocks|
|**Block**|Code enclosed in `{}` that may contain declarations|`{ int x; }`|
|**Declaration Before Use**|Variables must be declared before use|`int x; x = 5;`|
|**Most Closely Nested Rule**|The nearest declaration is used|Inner `x` hides outer `x`|
|**Static Variable**|Persists between function calls|`static int counter;`|
|**Extern Variable**|Declared here, defined elsewhere|`extern int counter;`|
|**Symbol Table**|Compiler structure storing identifiers|Stores variables, functions, types, etc.|


- **Declaration** = _Tell the compiler that something exists._
    
- **Definition** = _Actually create it._
    
- **Scope** = _Where you can use it._
    
- **Block** = _A region enclosed by `{}`._
    
- **Most Closely Nested Rule** = _The nearest declaration wins._
    
- **Static** = _Keeps its value between function calls._
    
- **Extern** = _Lives somewhere else, but you can use it here._
    
- **Symbol Table** = _The compiler’s dictionary of names and their meanings._

---
# Data Types and Type checking

## What is Type Checking?

**Type checking** is the process ==of verifying that operations in a program are performed on compatible data types.==

The compiler checks whether variables, constants, and expressions are being used correctly.

### Example

```c
int x = 5;
float y = 3.2;

x = x + y;
```

The compiler checks whether adding an `int` and a `float` is ==allowed and how the result should be handled.==

---

# Type Inference vs Type Checking

## 1. Type Inference

**Type inference** means ==the compiler automatically determines the type of an expression or variable== *without the programmer explicitly specifying it.*

Example:

```c
const greeting = "Hello";
```

The compiler infers that `greeting` is ==a string== (or an ==array of characters==).

---

## 2. Type Checking

**Type checking** ==verifies that operations use compatible types==.

Example:

```c
int age = 20;
char name = 'A';

age = age + name;   // Usually allowed (char converts to int)
```

But:

```c
int x = 10;
x = "Hello";        // Error
```

because an ==integer cannot store a string.==

---

## Main Purpose of Type Checking

The compiler performs type checking to:

- Detect programming errors before execution.
- Ensure operations are legal.
- Prevent invalid assignments.
- Improve program reliability.
    

---

## Types of Data Type Information

There are **three ways** a programming language handles data types.

### 1. Static Typing

Languages like:

- C
- Pascal
- Java (mostly)
- C++
    

determine types **==before the program runs==**.

Example:

```c
int x;
float y;
```

The compiler already knows:

- `x` is an integer.
- `y` is a floating-point number.
    

#### Advantages

##### ✔ Catch errors before execution

```c
int x;
x = "Hello";
```

Compiler ==immediately reports an error==.

---

##### ✔ Determine memory size

For example:

```c
int x;
```

Compiler knows:

- `int` = ==4 bytes (typically)==

So it allocates 4 bytes.

---

##### ✔ Know how ==memory should be accessed==

Different types use memory differently.

```
int      → arithmetic operations
char     → character operations
double   → floating-point operations
```

---

##### ✔ Simplify runtime

Since ==everything is already known==, fewer ==checks are needed while the program runs==.

---

### 2. Dynamic Typing

Languages like:

- LISP
- Python
- JavaScript
    

determine ==types **during execution**==.

Example (Python):

```python
x = 5
x = "Hello"
```

`x` first stores an integer, then later stores a string.

The type changes at runtime.

#### Advantages

- More flexible.
- Easier to write quick programs.
    

#### Disadvantages

- Errors may only ==appear when the program runs==.
- Runtime is ==slower== because type checking happens during execution.
    

---

### 3. ==Mixed== Typing

Some languages combine both approaches.

Examples:

- C#
- Kotlin
- Swift
- TypeScript
    

Some types are ==checked at compile time==, while ==others can be determined dynamically==.

This provides both safety and flexibility.

---

## What is a Data Type?

A **data type** is:

> **A set of ==values together with the operations that can be performed on those values==.**

Examples:

|Data Type|Values|Operations|
|---|---|---|
|`int`|1, 2, 3|+, -, *, /|
|`char`|'A', 'B'|comparison|
|`bool`|true, false|AND, OR, NOT|
|`float`|3.5, 2.7|arithmetic|

## Type Expressions

A type can be ==represented using a **type expression**==.

There are two forms.

### 1. Type Name

A simple predefined type.
Examples:

```
integer
real
char
boolean
```

Simple and directly understood by the compiler.

---

### 2. Structured Type Expression

A more ==complex type built== from simpler types.

Example:

```
array [1..10] of real
```

Meaning:

```
Index:   1 2 3 4 ... 10
Value:  real real real ...
```

An array ==containing 10 real numbers.==

Other examples:

```
pointer to int
array of char
struct Student
```

---

## Explicit vs Implicit Type Information

### Explicit Type Information

The programmer ==writes the type directly==.

Example:

```pascal
var x : array[1..10] of real;
```

The compiler immediately knows:

- `x` ==is an array==.
- Size = 10.
- Elements are `real`.
    

---

## Implicit Type Information

The compiler ==figures out the type automatically.==

Example:

```pascal
const greeting = "Hello";
```

The programmer ==never specifies the type==.

The compiler infers:

```
array[1..5] of char
```

because `"Hello"` contains 5 characters.

Another example:

```python
x = 100
```

The compiler/interpreter infers that `x` is an integer.

---

## Symbol Table and Type Information

The compiler stores ==all type information inside a **symbol table**==.

Example source code:

```c
int age;
float salary;
char grade;
```

The ==symbol table might look like==:

|Name|Type|
|---|---|
|age|int|
|salary|float|
|grade|char|

Whenever the compiler sees:

```c
age + salary
```

it looks up both ==identifiers in the symbol table.==

```
age     → int
salary  → float
```

Then it decides whether the operation is valid and what the resulting type should be.

---

## Role of the Type Checker

The **type checker** ==uses information from the symbol table to verify expressions.==

Example:

```c
int x;
char c;

x = c + 5;
```

The checker:

1. Looks up `c` → `char`
2. Looks up `5` → `int`
3. Determines whether `char + int` is allowed
4. Produces an `int` result
5. Assigns it to `x`
    

If something is illegal:

```c
int x;
x = "Hello";
```

the type ==checker reports an error==.

---
## Easy way to remember

- **Type inference** → _The compiler figures out the type._
    
- **Type checking** → _The compiler verifies that types are used correctly._
    
- **Static typing** → _Types are fixed before execution._
    
- **Dynamic typing** → _Types can change while the program runs._
    
- **Explicit type** → _You write the type yourself._
    
- **Implicit type** → _The compiler deduces it._
    
- **Symbol table** → _The compiler’s database of identifiers and their types._
    
- **Type checker** → _The compiler’s “quality inspector” that catches invalid type usage before or during execution, depending on the language._

---
## 6.4.4 Type Inference and Type Checking – Summary and Simple Explanation

### What is Type Inference and Type Checking?

When the compiler reads a program, it must answer two questions:

1. **What is the== type of each variable or expression==?** → **Type Inference**
    
2. **Are all operations ==using compatible types==?** → **Type Checking**
    

The **type checker** uses:

- A representation of data types (`int`, `bool`, `array`, etc.).
    
- A function called **`typeEqual()`** that compares two types.
    

If the types are the same, the operation is allowed. Otherwise, a **type error** is reported.

---
## Easy way to remember

Think of the **type checker as a strict teacher**:

1. **Declarations** → It writes every variable and its type in a notebook (the symbol table).
    
2. **Expressions** → It looks up the types of variables involved.
    
3. **Operations** → It checks whether the types are compatible (for example, `int + int` or `bool or bool`).
    
4. **`typeEqual()`** → It compares the expected type with the actual type.
    
5. **If they match** → The code is accepted.  
    **If they do not match** → A **type error** is reported.