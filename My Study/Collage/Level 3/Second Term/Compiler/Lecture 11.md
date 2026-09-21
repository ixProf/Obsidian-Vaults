# Code Optimization – Complete Study Notes

## 1. What is Code Optimization?

Code optimization is the ==process of transforming a program into a more efficient version== **without changing its output or behavior**.

The optimized program should:

- Execute faster.
- Use less memory.
- Consume less power.
- Produce exactly the same results as the original program.
    

### Key Principle: Preserve Semantics

The most important rule in ==optimization is **semantic preservation**.==

This means that:

> The optimized code must ==produce exactly the same output and behavior as the original code==.

Optimization ==changes the implementation==, not ==the meaning of the program.==

---

# 2. Where Optimization Happens in a Compiler

The compiler processes source code through several stages:

```text
Source Code
     ↓
Lexical Analysis
     ↓
Syntax Analysis
     ↓
Semantic Analysis
     ↓
Intermediate Code Generation
     ↓
Code Optimization
     ↓
Target Code Generation
     ↓
Machine Code
```

### Explanation

- **Lexical Analysis:** Converts ==source code into tokens.==
    
- **Syntax Analysis:** Checks ==grammatical correctness==.
    
- **Semantic Analysis:** Checks ==meaning and type correctness==.
    
- **Intermediate Code Generation:** Produces Intermediate Representation (IR).
    
- **Code Optimization:** Improves the IR or ==generated code.==
    
- **Target Code Generation:** Produces ==machine-specific code==.
    
- **Machine Code:** Final executable instructions.
    

---

# 3. Levels of Code Optimization

There are ==two major levels== of optimization.

## A. Machine-Independent Optimization

Performed on the Intermediate Representation (IR).

Characteristics:

- Does not ==depend on a specific processor==.
- Does not use ==CPU registers.==
- Does not use ==absolute memory addresses.==
- Focuses on improving ==intermediate code==.
    

Purpose:

- Produce more ==efficient target code regardless of hardware.==
    

Examples:

- Constant Folding
- Constant Propagation
- Dead Code Elimination
- Common Subexpression Elimination
    

---

## B. Machine-Dependent Optimization

Performed after ==target code generation==.

Characteristics:

- Depends on the ==target machine architecture==.
    
- Uses ==CPU registers==.
    
- May use absolute memory references.
    
- Exploits hardware features and memory hierarchy.
    

Purpose:

- Achieve ==maximum performance on a specific processor==.
    

---

# 4. Optimization Techniques

The lecture introduces the following optimization techniques:

1. Constant Folding
    
2. Constant Propagation
    
3. Dead Code Elimination
    
4. Common Subexpression Elimination (CSE)
    
5. Compile-Time Evaluation
    
6. Function Inlining
    
7. Loop Optimization
    
8. Strength Reduction
    

---

# 5. Constant Folding

### Definition

Constant Folding ==evaluates constant expressions== during compilation instead of runtime.

### Example

Before:

```c
int x = 5 + 3 * 2;
```

After:

```c
int x = 11;
```

### Benefits

- Saves CPU cycles.
- Reduces code size.
- Improves execution speed.
    

The compiler performs ==the calculation once during compilation== rather than every time the program runs.

---

# 6. Constant Propagation

### Definition

Constant Propagation ==replaces variables with their known constant values==.

### Example

Before:

```c
int a = 10;
int b = a + 5;
```

After:

```c
int a = 10;
int b = 15;
```

### Notes

Constant propagation is often followed by:

- Copy Propagation
- Dead Code Elimination
    

### Benefits

- Simplifies expressions.
    
- Creates ==opportunities for additional optimizations.==
    

---

# 7. Dead Code Elimination

### Definition

Dead Code Elimination ==removes code== that:

- Is ==never executed==.
    
- Produces results ==that are never used==.
    

### Example

Before:

```c
int x = 10;
int y = 20; // مش هيستخدم

if(false) // البلوك دا مش هيستخدم برضو
{
    y = x + 5;
}

return x;
```

After:

```c
int x = 10;
return x;
```

### Benefits

- Smaller code size.
- Reduced memory usage.
- Faster execution.
    

---

# 8. Common Subexpression Elimination (CSE)

### Definition

CSE avoids recomputing the same expression ==multiple times==.

### Example

Before:

```c
a = b + c;
d = b + c + 5;
```

After:

```c
temp = b + c;
a = temp;
d = temp + 5;
```

### Benefits

- Eliminates redundant computations.
- Improves performance.
- Particularly useful in array indexing and loops.
    

---

# 9. Compile-Time Evaluation

### Definition

Compile-Time Evaluation computes expressions ==during compilation== rather than runtime.

### Example

Before:

```c
A = 2 * (22.0 / 7.0) * R;
```

After:

```c
A = 6.2857 * R;
```

### Benefits

- Fewer operations during execution.
    
- ==Faster runtime performance==.
    

---

# 10. Loop Optimization

Loops often execute many times, so optimizing them can ==significantly improve performance==.

### Example

Before:

```c
for(i = 0; i < N; i++)
{
    x = y * z;
    A[i] = x + i;
}
```

Notice:

```c
y * z
```

never changes.

### After

```c
x = y * z;

for(i = 0; i < N; i++)
{
    A[i] = x + i;
}
```

### Benefits

- Avoids ==repeating the same calculation.==
    
- Can improve performance by ==up to O(N).==
    

The multiplication is performed once instead of N times.

---

# 11. Function In lining

### Definition

Function In lining replaces a function call with ==the actual body of the function.==

### Analogy

Instead of calling a plumber every time you need a wrench, keep a wrench in your toolbox.

### Example

Before:

```c
int square(int x)
{
    return x * x;
}

int result =
square(a) + square(b);
```

After:

```c
int result =
(a * a) + (b * b);
```

### Benefits

- Eliminates function-call overhead.
    
- Improves execution speed.
    

### Possible Drawback

- May increase code size because function bodies are duplicated.
    

---

# 12. Strength Reduction

### Definition

Strength Reduction replaces ==expensive operations with cheaper ones.==

### Example

Before:

```c
x = y * 2;
```

After:

```c
x = y + y;
```

### Why?

Addition generally ==requires fewer resources than multiplication==.

### Benefits

- Faster execution.
    
- Reduced processor workload.
    

---

# Final Review Table

|Technique|Main Idea|
|---|---|
|Constant Folding|Compute constant expressions at compile time|
|Constant Propagation|Replace variables with known constants|
|Dead Code Elimination|Remove useless or unreachable code|
|Common Subexpression Elimination|Avoid repeated calculations|
|Compile-Time Evaluation|Evaluate expressions during compilation|
|Loop Optimization|Reduce unnecessary work inside loops|
|Function Inlining|Replace function calls with function bodies|
|Strength Reduction|Replace expensive operations with cheaper ones|

