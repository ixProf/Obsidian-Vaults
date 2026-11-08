---
title: "Lecture 10"
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
# Lecture 10: Code Generation (Part 1)

## What is Code Generation?

When you write a program in a language like C, Java, or TINY, the computer cannot directly execute it.

The compiler translates the program through several stages:

```
Source Code
    ↓
Lexical Analysis
    ↓
Parsing
    ↓
Semantic Analysis
    ↓
Intermediate Code
    ↓
Code Generation
    ↓
Machine Code
```

### Definition

**Code Generation** is the compiler phase that ==produces executable machine instructions from the internal representation of the program.==

The generated code must:

1. Perform ==exactly the same operations== as the original program.
    
2. ==Run correctly== on the target machine.
    
3. Be as ==efficient as possible.==
    

---

## Why Does Code Generation Depend on the Machine?

Different computers have different:

- CPUs
    
- Registers
    
- Memory organization
    
- Operating systems
    

For example:

A multiplication instruction on one CPU may be:

```
MUL R1,R2
```

while another processor may use:

```
MULT A,B
```

Therefore the compiler must know:

- Source language rules
- Target machine architecture
- Runtime environment
- Operating system
    

before generating final code.

---

# 8.1 Intermediate Code and Data Structures

---

## What is an ==Intermediate Representation== (IR)?

During compilation, the compiler usually ==does not directly generate machine code.==

Instead, it ==creates a temporary form== called:

### Intermediate Representation (IR)

Think of it as:

```
Source Language
      ↓
 Intermediate Language
      ↓
 Machine Language
```

Example:

```
a = b + c
```

might become:

```
temp = b + c
a = temp
```

This intermediate form is easier for the compiler to manipulate.

---

## Why Use Intermediate Code?

### Reason 1: Easier Optimization

The compiler can ==improve performance before generating machine code.==

Example:

```
2 + 3
```

can immediately become:

```
5
```

instead of generating addition instructions.

---

### Reason 2: Retargeting

Suppose we have:

- Windows machine
    
- Linux machine
    
- ARM processor
    
- Intel processor
    

Instead of writing a completely new compiler each time:

```
Source Code
      ↓
 Intermediate Code
      ↓
 Machine A

or

      ↓
 Machine B
```

Only the ==last stage changes.==

This ==saves huge development== effort.

---

# Three-Address Code

One of the most popular intermediate representations.

---

## Why is it called Three-Address?

Because most ==instructions contain==:

```
Result = Operand1 Operator Operand2
```

Example:

```
x = y + z
```

Three addresses:

- x
    
- y
    
- z
    

---

## General Form

```
x = y op z
```

where:

- x = destination
    
- y = first operand
    
- z = second operand
    
- op = operator (+,-,*,/)
    

---

# Example 1

Expression:

```
2*a + (b-3)
```

---

## Step 1: Break into small operations

The compiler ==cannot evaluate everything== at once.

It ==creates temporary variables==.

### First operation

```
T1 = 2 * a
```

---

### Second operation

```
T2 = b - 3
```

---

### Third operation

```
T3 = T1 + T2
```

Now ==the expression is completely evaluated.==

---

## Why Temporary Variables?

Because computers execute simple operations.

Instead of:

```
2*a+(b-3)
```

the compiler creates:

```
T1
T2
T3
```

and solves the expression step by step.

---

# Example 2: TINY Factorial Program

The original program:

```tiny
read x

if x > 0 then

fact := 1

repeat
   fact := fact * x
   x := x - 1
until x = 0

write fact

end
```

Purpose:

Compute:

```
x!
```

Example:

```
5! = 5×4×3×2×1
```

---

## Step-by-Step Translation

### Read Input

```
read x
```

Take a number from user.

---

### Check Condition

```
t1 = x > 0
```

Compiler stores result in temporary variable.

If:

```
x = 5
```

then:

```
t1 = true
```

If:

```
x = -2
```

then:

```
t1 = false
```

---

### Conditional Jump

```
if_false t1 goto L1
```

Meaning:

```
If condition is false,
jump to label L1
```

So factorial computation is skipped.

---

### Initialize Factorial

```
fact = 1
```

Because factorial multiplication starts from 1.

---

### Label

```
label L2
```

A label is simply a marker.

Think:

```
L2:
```

The compiler can jump back to it.

---

### Multiplication

```
t2 = fact * x
fact = t2
```

Example:

```
fact=1
x=5

t2=5

fact=5
```

---

### Decrement

```
t3 = x - 1
x = t3
```

Reduce x by one.

Example:

```
5 → 4
```

---

### Loop Condition

```
t4 = x == 0
```

Checks whether loop should stop.

---

### Repeat

```
if_false t4 goto L2
```

If x is not zero:

go back to beginning of loop.

---

### Output

```
write fact
```

Print factorial result.

---

### End Program

```
halt
```

Stop execution.

---

# Labels

A label acts like a bookmark.

Example:

```
L2:
   statements

goto L2
```

The compiler jumps back to that location.

Labels are heavily used for:

- loops
    
- if statements
- repeat-until statements
    

---

# 8.1.2 Data Structures for Three-Address Code

Now the compiler must store those instructions somewhere.

---

## Quadruples

A ==quadruple has four fields==.

Structure:

|Operation|Arg1|Arg2|Result|
|---|---|---|---|
|+|a|b|t1|

Meaning:

```
t1 = a + b
```

---

Example:

```
t2 = fact * x
```

Stored as:

|op|arg1|arg2|result|
|---|---|---|---|
|mul|fact|x|t2|

---

### Why Quadruples?

Easy to:

- store
- modify
- optimize
    

because everything is explicit.

---

# Triples

Another storage method.

Instead of ==storing temporary names==:

```
t1
t2
t3
```

we refer directly to instruction numbers.

---

Example

Instruction:

```
(4) fact * x
```

Later:

```
(5) assign result of instruction 4 to fact
```

Instead of:

```
t2 = fact*x
fact=t2
```

---

## Advantage of Triples

Less memory.

No ==need for many temporary variable names==.

---

## Disadvantage

Harder to read and optimize.

Because references use instruction numbers.

---

# 8.2 Basic Code Generation Techniques

Now we ==know how to represent code==.

Next question:

### How do we generate it automatically?

Answer:

Using ==grammar rules and syntax trees.==

---

## Synthesized Attributes

An ==attribute is information attached to grammar symbols==.

Example:

```
a + b
```

The ==parser builds a syntax tree==.

Each node can store:

- generated code
- temporary variable name
- type information
    

These are attributes.

---

### Synthesized Attribute

Information flows:

```
children
   ↑
 parent
```

The parent computes its value from its children.

---

Example

For:

```
a + b
```

Node:

```
      +
     / \
    a   b
```

The "+" node generates:

```
t1 = a + b
```

using information from:

```
a
b
```

---

# Three-Address Code Generation Example

Expression:

```
(x = x + 3) + 4
```

---

## First Evaluate

```
x + 3
```

Generate:

```
t1 = x + 3
```

---

## Assignment

```
x = t1
```

Store result back into x.

---

## Add 4

```
t2 = t1 + 4
```

Final result.

---

So generated code becomes:

```
t1 = x + 3
x = t1
t2 = t1 + 4
```

---

# Important Exam Concepts

### Intermediate Representation (IR)

A temporary program representation used between source code and machine code.

---

### Three-Address Code

Intermediate code where instructions usually have the form:

```
x = y op z
```

---

### Temporary Variables

Variables such as:

```
t1
t2
t3
```

used to store intermediate results.

---

### Label

A marker used as a jump target.

Example:

```
L1:
```

---

### Quadruple

Stores an instruction in four fields:

```
(op, arg1, arg2, result)
```

---

### Triple

Stores instructions and refers to previous instruction numbers instead of temporary variables.

---

### Goal of Code Generation

Convert intermediate representation into executable machine instructions while preserving the program's meaning.

---

### Easy Way to Remember the Whole Section

Think of the compiler as a translator:

```
Program
   ↓
Break complex expressions into small steps
   ↓
Store them as Three-Address Code
   ↓
Represent them using Quadruples or Triples
   ↓
Generate final machine code
```

That is the core idea of Sections **8.1 and 8.2**.