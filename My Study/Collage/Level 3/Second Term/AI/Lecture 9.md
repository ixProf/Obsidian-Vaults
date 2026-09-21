# Artificial Intelligence – Lecture 9

# Part 1 (Pages 1–10)
## Introduction

This lecture introduces **Integer Representation** in Genetic Algorithms (GA). Unlike Binary Representation, chromosomes are represented using **integers**. The lecture also explains the different types of integer encoding and the crossover operators used with them.

---

## Learning Objectives

After studying this part, you should be able to:

- Understand Integer Representation.
    
- Know when Integer Encoding should be used.
    
- Distinguish between different Integer Representation types.
    
- Understand different crossover operators for integer chromosomes.
    
- Compare crossover methods.
    
- Solve simple crossover examples.
    

⭐ **Exam Focus:** Learning objectives themselves usually do not come directly in exams, but every topic listed here is important.

---

## Integer Representation

### Definition

Integer Representation is a chromosome representation in which **each gene is stored as an integer rather than a binary digit**.

Each position (gene) can take a value from a predefined range of integers.

Instead of storing:

```
101011001011
```

we store something like:

```
[45, 67, 12, 89, 33]
```

Each number represents one gene.

---

### Why Integer Representation?

Binary Encoding is not always efficient.

Some optimization problems naturally deal with numbers such as:

- Quantity
    
- Number of workers
    
- Machine number
    
- City number
    
- Job number
    

Using binary for these problems makes chromosomes longer and more complicated.

Integer Representation makes the chromosome:

- Shorter
    
- Easier to understand
    
- Easier to manipulate
    

⭐ **Exam Focus**

**True or False**

> Integer Representation stores genes as binary digits.

❌ False

---

## When to Use Integer Encoding?

Use Integer Encoding when the variables are naturally integers.

Examples:

### Resource Allocation

Assigning the number of resources.

Example:

```
Machine A = 6 workers
Machine B = 10 workers
```

---

### Scheduling

Assigning jobs to machines.

---

### Traveling Salesman Problem (TSP)

Each city is represented by an integer.

---

### Assignment Problems

Assigning workers to tasks.

---

### Production Planning

Determining production quantities.

---

### Inventory Management

Representing stock quantities.

---

⭐ **Exam Focus**

Possible MCQ

Integer Representation is suitable for:

A) Image Compression

B) Continuous Optimization

C) Traveling Salesman Problem

D) Neural Networks

✔ Correct Answer:

C

---

## When NOT to Use Integer Encoding?

Integer Representation is not suitable when:

- Variables are continuous.
    

Example:

```
3.14159
```

- High precision decimal values are required.
    
- Binary Encoding is naturally better.
    

Examples include:

- Floating-point optimization
    
- Neural network weights
    
- Scientific calculations requiring decimal precision
    

---

⭐ **Exam Focus**

Continuous variables

↓

Use Real Representation

NOT Integer Representation.

---

## Advantages of Integer Representation

Compared with Binary Encoding:

### 1. Simpler Representation

The chromosome is easier to read.

Example

Instead of

```
110010101001
```

Use

```
25
```

---

### 2. Shorter Chromosome

Less memory.

Faster processing.

---

### 3. More Natural

Many real-world problems already use integers.

---

### 4. Easier Genetic Operations

Mutation and crossover become easier.

---

## Disadvantages

### 1. Some operators cannot be used directly.

---

### 2. Special crossover methods are required for some problems.

Especially

Permutation Encoding.

---

### 3. Constraint handling is more difficult.

Some integer values may become invalid.

---

⭐ **Exam Focus**

Question:

Why can't normal crossover always be used?

Answer:

Because it may produce invalid integer solutions (especially in permutation encoding).

---

## Types of Integer Representation

The lecture explains three main types.

---

### 1. Value Encoding (Simple Integer Encoding)

#### Definition

Each gene stores an independent integer value.

Each gene can take any integer within a specified range.

Example

Problem:

Assign quantities to five products.

Range

```
0–100
```

Chromosome

```
[45,67,12,89,33]
```

Meaning

```
Product1 = 45

Product2 = 67

Product3 = 12

Product4 = 89

Product5 = 33
```

Notice

Each value is independent.

Changing Product 2 does not affect Product 4.

---

Applications

- Quantity assignment
    
- Production planning
    
- Resource allocation
    
- Budget allocation
    

---

⭐ **Exam Focus**

Key point

Genes may repeat.

Duplicates are allowed.

Example

```
[20,20,15,20]
```

This is completely valid.

---

### 2. Permutation Encoding

#### Definition

Each integer appears **exactly once**.

Order is important.

Duplicates are NOT allowed.

Example

Problem

Traveling Salesman Problem

Chromosome

```
[3,1,4,2,7,5,8,6]
```

Meaning

Visit

```
City 3

↓

City 1

↓

City 4

↓

City 2

↓

City 7

↓

City 5

↓

City 8

↓

City 6
```

Notice

Every city appears once.

No repetitions.

No missing city.

---

Applications

- Traveling Salesman Problem (TSP)
    
- Job Scheduling
    
- Routing
    
- Sequencing Problems
    

---

⭐ **Exam Focus**

Difference

Value Encoding

✔ Duplicates allowed

Permutation Encoding

❌ Duplicates NOT allowed

---

### 3. Multi-Parameter Encoding

#### Definition

Each gene represents a different characteristic (parameter).

Example

Car Design

Domains

Color

```
1–6
```

Engine

```
1–4
```

Wheels

```
1–3
```

Transmission

```
1–2
```

Chromosome

```
[3,2,1,2]
```

Meaning

```
Color = Blue

Engine = V6

Wheels = Alloy

Transmission = Automatic
```

Notice

Each position has a different meaning.

Unlike Value Encoding, the genes do not all represent the same type of information.

---

⭐ **Exam Focus**

Possible MCQ

Which encoding allows every gene to represent a different property?

✔ Multi-Parameter Encoding

---

## Comparison Between Integer Representation Types

|Feature|Value Encoding|Permutation Encoding|Multi-Parameter|
|---|---|---|---|
|Duplicates|Allowed|Not Allowed|Depends on parameter|
|Order Important|No|Yes|Usually No|
|Gene Meaning|Same|Sequence|Different Parameters|
|Common Applications|Quantity Assignment|TSP|Product Design|

⭐ **This table is very important for MCQs.**

---

## Crossover for Integer Representation

The lecture explains that crossover depends on the type of integer encoding.

For **Value Encoding**, traditional crossover operators can still be used.

---

### 1. Single-Point Crossover

#### Definition

A single crossover point is selected.

Everything after that point is exchanged between the parents.

Example

Parent 1

```
[45,67,12 | 89,33,21,54,78]
```

Parent 2

```
[23,56,91 | 34,62,85,47,19]
```

Cut Point

After gene 3.

Children

Child 1

```
[45,67,12,34,62,85,47,19]
```

Child 2

```
[23,56,91,89,33,21,54,78]
```

---

Advantages

- Very simple.
    
- Fast.
    
- Easy to implement.
    

Disadvantages

- May not preserve good gene combinations.
    

---

⭐ **Exam Focus**

Single-Point Crossover uses:

✔ One crossover point.

---

### 2. Two-Point Crossover
#### Definition

Instead of one cut, choose two crossover points.

Swap the segment between them.

Example

Parent 1

```
[45,67 | 12,89,33 | 21,54,78]
```

Parent 2

```
[23,56 | 91,34,62 | 85,47,19]
```

Children

Child 1

```
[45,67,91,34,62,21,54,78]
```

Child 2

```
[23,56,12,89,33,85,47,19]
```

---

Advantages

- Preserves more genetic material.
    
- Produces more variation than Single-Point.
    

---

⭐ **Exam Focus (Part 1 Quick Revision)**

احفظ دول كويس لأنهم أكتر حاجات بييجي منهم أسئلة:

- ✔ Definition of Integer Representation.
    
- ✔ When to Use Integer Encoding.
    
- ✔ When NOT to Use Integer Encoding.
    
- ✔ Advantages vs Disadvantages.
    
- ✔ Value Encoding.
    
- ✔ Permutation Encoding.
    
- ✔ Multi-Parameter Encoding.
    
- ✔ Comparison between the three encoding types.
    
- ✔ Single-Point Crossover (definition + example).
    
- ✔ Two-Point Crossover (definition + example).

---
# Part 2 (Pages 10–20)
## 3. Uniform Crossover

### Definition

Uniform Crossover is a crossover operator in which **each gene is independently selected from one of the two parents**.

Unlike Single-Point and Two-Point crossover, there are **no fixed crossover points**.

Instead, a **binary mask** determines the source of each gene.

---

### How It Works

Each position in the chromosome has a corresponding value in the mask.

Rules:

- Mask = **1** → Take the gene from Parent 1.
    
- Mask = **0** → Take the gene from Parent 2.
    

---

### Example

Parent 1

```text
[45, 67, 12, 89, 33, 21, 54, 78]
```

Parent 2

```text
[23, 56, 91, 34, 62, 85, 47, 19]
```

Mask

```text
[1, 0, 1, 0, 1, 0, 1, 0]
```

Child 1

```text
[45, 56, 12, 34, 33, 85, 54, 19]
```

Child 2

```text
[23, 67, 91, 89, 62, 21, 47, 78]
```

---

### Advantages

- Produces high genetic diversity.
    
- Every gene has an equal chance of coming from either parent.
    
- Avoids bias toward one chromosome section.
    

---

### Disadvantages

- Good gene combinations may be broken.
    
- May produce unstable offspring.
    

---

⭐ **Exam Focus**

Difference:

|Single-Point|Uniform|
|---|---|
|One cut point|No cut points|
|Exchanges chromosome sections|Exchanges genes individually|
|Simpler|More random|

---

⭐ **True / False**

Uniform Crossover uses a binary mask.

✔ True

---

## 4. Arithmetic Crossover

### Definition

Arithmetic Crossover creates offspring by performing **mathematical operations** on the parent genes.

Instead of exchanging genes, it calculates **weighted averages**.

---

### Formula

Child 1

```text
Child1 = αP1 + (1−α)P2
```

Child 2

```text
Child2 = (1−α)P1 + αP2
```

where

- α (Alpha) is between 0 and 1.
    

---

#### Example

Parent 1

```text
[10,20,30,40,50]
```

Parent 2

```text
[90,80,70,60,50]
```

Alpha

```text
0.3
```

### Position 0

Child1

```text
0.3×10 + 0.7×90

=3+63

=66
```

Child2

```text
0.7×10 + 0.3×90

=7+27

=34
```

Position 1

Child1

```text
0.3×20 + 0.7×80

=62
```

Child2

```text
38
```

The same calculation is repeated for all remaining genes.

---

### Types of Arithmetic Crossover

The lecture mentions **three types**.

---

#### 1. Simple Arithmetic Crossover

Only **one selected gene** is replaced using the arithmetic formula.

All remaining genes stay unchanged.

---

#### 2. Single Arithmetic Crossover

Arithmetic crossover begins at one crossover point.

Genes after this point are computed using arithmetic operations.

Genes before the point remain unchanged.

---

#### 3. Whole Arithmetic Crossover

Arithmetic operations are applied to **every gene** in the chromosome.

Every position becomes a weighted average.

---

⭐ **Exam Focus**

Know these three names:

- Simple Arithmetic
    
- Single Arithmetic
    
- Whole Arithmetic
    

---

⭐ **MCQ**

Arithmetic crossover creates children using

A) Random numbers

B) Binary operators

C) Weighted averages

D) Mutation

✔ Answer:

C

---

⭐ **True / False**

Arithmetic crossover exchanges chromosome segments.

❌ False

It calculates weighted averages.

---

### Crossover for Permutation Encoding

Unlike Value Encoding,

Permutation Encoding requires every number to appear exactly once.

Therefore,

ordinary crossover cannot be used.

---

### Why Can't Standard Crossover Be Used?

Example

Parent 1

```text
[1 2 3 4 5]
```

Parent 2

```text
[5 4 3 2 1]
```

Applying ordinary crossover may produce

```text
[1 2 3 2 1]
```

Problems

- Duplicate values
    
- Missing values
    

This chromosome is invalid.

---

⭐ **Exam Focus**

Standard crossover produces invalid permutations.

Therefore,

Special crossover operators are required.

---

## Partially Mapped Crossover (PMX)
### Definition

PMX is a crossover operator specially designed for **Permutation Encoding**.

It preserves

- Valid permutations
    
- No duplicates
    
- No missing values
    

PMX is one of the most common crossover methods for

- Traveling Salesman Problem (TSP)
    

---
### PMX Algorithm

---

#### Step 1

Select two crossover points.

Example

Parent 1

```text
[3,1 | 4,2,7 | 5,8,6]
```

Parent 2

```text
[2,4 | 1,3,6 | 8,5,7]
```

Selected segment

```text
4 2 7
```

---

#### Step 2

Copy the selected segment from Parent 1 into the child.

Child

```text
[-,- | 4,2,7 | -,-,-]
```

---

#### Step 3

Create Mapping

Compare the copied genes.

Position

2

```text
4 ↔ 1
```

Position

3

```text
2 ↔ 3
```

Position

4

```text
7 ↔ 6
```

Mapping

```text
4→1

2→3

7→6
```

---

#### Step 4

Fill Remaining Positions

Look at Parent 2.

If a value already exists,

use the mapping.

Otherwise,

copy it directly.

Position 0

Parent2

```text
2
```

2 exists in mapping

↓

Replace with

```text
3
```

Child

```text
3
```

---

Position 1

Parent2

```text
4
```

Mapping

```text
4→1
```

Child

```text
1
```

---

Position 5

Parent2

```text
8
```

Not mapped.

Copy directly.

---

Position 6

Parent2

```text
5
```

Copy directly.

---

Position 7

Parent2

```text
7
```

Mapped to

```text
6
```

---

Final Child

```text
[3,1,4,2,7,8,5,6]
```

---

⭐ **Exam Focus**

PMX always guarantees

✔ No duplicate numbers

✔ No missing numbers

---

⭐ **MCQ**

PMX is mainly used for

A) Binary Encoding

B) Value Encoding

C) Permutation Encoding

D) Floating-point Encoding

✔ Answer

C

---

⭐ **True / False**

PMX is suitable for the Traveling Salesman Problem.

✔ True

---

## Selection

After generating offspring,

Genetic Algorithms must decide

**Who survives?**

This process is called
 Selection

---
### Definition

Selection is the process of choosing individuals from the current population to become parents for the next generation.

It is the driving force that improves the quality of the population over generations.

---

### GA Cycle

```text
Population

↓

Selection

↓

Mating Pool

↓

Crossover

↓

Mutation

↓

New Population

↓

Replacement

↓

Repeat
```

---

⭐ **Exam Focus**

Definition of Selection is one of the most repeated exam questions.

---

### Role of Selection

Selection

- Increases average fitness.
    
- Guides evolution.
    
- Produces better solutions.
    
- Removes weaker individuals gradually.
    

Without Selection

↓

The Genetic Algorithm behaves almost randomly.

---

### Key Properties of Selection Methods

The lecture lists **four important properties**.

---

#### 1. Selection Pressure

Definition

How strongly the better individuals are favored.

High Selection Pressure

↓

Best individuals selected frequently.

Low Selection Pressure

↓

More diversity.

---

#### 2. Population Diversity

Definition

Ability to preserve weaker individuals.

Higher diversity

↓

Less chance of premature convergence.

---

#### 3. Convergence Speed

Definition

How quickly the population becomes similar.

Fast convergence

↓

Quick solution

BUT

Risk of local optimum.

---

#### 4. Computational Complexity

Definition

Time required to perform selection.

Efficient algorithms require less computation.

---

⭐ **Exam Focus**

**احفظ الأربع خواص بالترتيب**:

1. Selection Pressure
    
2. Population Diversity
    
3. Convergence Speed
    
4. Computational Complexity
    

دي من أكتر الحاجات اللي بتيجي **MCQ** و**صح وغلط**.

---

## Quick Revision (Part 2)

### Definitions

✔ Uniform Crossover

✔ Arithmetic Crossover

✔ PMX

✔ Selection

---

### Important Differences

|Operator|Main Idea|
|---|---|
|Single Point|One cut|
|Two Point|Two cuts|
|Uniform|Binary Mask|
|Arithmetic|Weighted Average|
|PMX|Mapping (Permutation Only)|

---

### Very Important MCQ Points ⭐⭐⭐⭐⭐

- Uniform Crossover uses a **binary mask**.
    
- Arithmetic Crossover uses **weighted averages**.
    
- PMX is used with **Permutation Encoding**.
    
- PMX prevents **duplicates and missing values**.
    
- Selection chooses **parents for the next generation**.
    
- The four properties of selection are:
    
    - Selection Pressure
        
    - Population Diversity
        
    - Convergence Speed
        
    - Computational Complexity
        

---
# Part 3 (Pages 21–33)

---

## Selection Methods (Continued)

بعد ما عرفنا إن **Selection** هي عملية اختيار أفضل الأفراد ليكونوا آباء (Parents) للجيل الجديد، نبدأ نتعرف على أشهر طرق الاختيار.

---

### Classification of Selection Methods

تنقسم طرق الاختيار إلى **3 Categories**:

```text
Selection Methods
│
├── Fitness-Proportionate Selection
│      ├── Roulette Wheel
│      └── SUS (Stochastic Universal Sampling)
│
├── Tournament Selection
│      ├── Binary Tournament
│      └── Tournament of Size K
│
└── Rank-Based Selection
       ├── Deterministic
       └── Stochastic (Elitism mentioned in classification)
```

⭐ **Exam Focus**

احفظ أسماء الثلاثة الرئيسيين:

- Fitness-Proportionate
    
- Tournament
    
- Rank-Based
    

---

### Tournament Selection

#### Definition

Tournament Selection is one of the most widely used selection methods.

Instead of calculating probabilities, a **small group of individuals competes**, and the **best individual wins**.

The winner becomes one of the parents.

---

#### Why is it called "Tournament"?

Because it works like a sports competition.

Several individuals compete.

Only the strongest survives.

---

##### Algorithm

The lecture explains Tournament Selection in **three simple steps**.

---

#### Step 1

Randomly choose **K individuals** from the population.

Example

Population

```text
A  B  C  D  E
```

Choose randomly

```text
B  D  E
```

---

##### Step 2

Compare their fitness values.

Suppose

```text
B = 20

D = 35

E = 18
```

Best fitness

↓

D

---

##### Step 3

Select the winner.

Winner

```text
D
```

Repeat until enough parents are selected.

---

⭐ **Exam Focus**

Tournament Selection **does NOT require sorting**.

---

#### Example

Population

|Individual|Fitness|
|---|---|
|A|15|
|B|42|
|C|18|
|D|31|
|E|25|

Tournament Size

```text
K=3
```

Random selection

```text
A

D

E
```

Fitness

```text
15

31

25
```

Winner

```text
D
```

D becomes a parent.

---

#### Tournament Size

Tournament Size is represented by

```text
K
```

This parameter controls the strength of selection.

---

#### Small Tournament

Example

```text
K=2
```

Advantages

- More diversity.
    
- Weak individuals may survive.
    

Disadvantage

Slower improvement.

---

#### Large Tournament

Example

```text
K=10
```

Advantages

Best individuals almost always win.

Faster convergence.

Disadvantages

Population diversity decreases.

Risk of premature convergence.

---

⭐ **Exam Focus**

Increasing Tournament Size

↓

Increases Selection Pressure.

---

#### Advantages of Tournament Selection

The lecture lists several advantages.

---

##### 1. Simple Implementation

Very easy to implement.

Only random selection and comparison are needed.

No complicated calculations.

---

##### 2. No Sorting Needed

Unlike Rank Selection,

No sorting is required.

This makes it faster.

---

##### 3. No Fitness Scaling

Works with

- Positive fitness
    
- Negative fitness
    
- Zero fitness
    

No normalization is required.

---

##### 4. Computationally Efficient

Very fast.

Suitable for large populations.

---

##### 5. Maintains Diversity

Weak individuals still have a chance to win.

Especially when competing against weaker individuals.

---

⭐ **MCQ**

Tournament Selection

✔ Does not require sorting.

✔ Does not require scaling.

---

#### Disadvantages of Tournament Selection

Although very popular,

It has some disadvantages.

---

#### Large Tournament Size

Produces

High Selection Pressure.

Population becomes similar quickly.

---

#### Small Tournament Size

Produces

Weak Selection Pressure.

Population improves slowly.

---

#### Randomness

Different tournaments may produce different parents.

---

⭐ **True / False**

Tournament Selection always selects the global best individual.

❌ False

Only the best individual **inside the selected tournament** wins.

---

### Rank-Based Selection

---

#### The Problem

Roulette Wheel uses actual fitness values.

If one chromosome is much better,

it dominates the population.

Result

Loss of diversity.

---

#### The Solution

Ignore the fitness values.

Use only the ranking.

---

#### Definition

Rank-Based Selection assigns selection probabilities according to the **rank** of individuals rather than their actual fitness values.

---

#### Steps

---

##### Step 1

Sort individuals from

Best

↓

Worst

---

##### Step 2

Assign ranks.

Example

|Individual|Rank|
|---|---|
|Best|1|
|Second|2|
|Third|3|
|Worst|N|

---

##### Step 3

Assign probabilities.

Better rank

↓

Higher probability.

---

Notice

Difference in fitness values does not matter.

Only the order matters.

---

⭐ **Exam Focus**

Rank Selection depends on

✔ Rank

NOT

Fitness value.

---

#### Advantages

- Prevents domination.
    
- Preserves diversity.
    
- Stable selection pressure.
    

---

#### Disadvantages

- Requires sorting.
    
- Slightly slower than Tournament Selection.
    

---

⭐ **True / False**

Rank-Based Selection depends on actual fitness values.

❌ False

---

### Roulette Wheel Selection (Review)

Also called

Fitness-Proportionate Selection.

---

#### Definition

Selection probability is proportional to fitness.

Higher fitness

↓

Higher probability.

---

Imagine a roulette wheel.

Large fitness

↓

Large wheel sector.

Higher chance of being selected.

---

#### Advantages

- Simple.
    
- Easy to understand.
    
- Uses actual fitness.
    

---

#### Disadvantages

One excellent chromosome may dominate.

Population diversity decreases.

---

⭐ **Exam Focus**

Roulette Wheel

↓

Uses Fitness.

Rank Selection

↓

Uses Rank.

Tournament

↓

Uses Competition.

---

### Comparison Between Selection Methods

|Feature|Roulette Wheel|Tournament|Rank-Based|
|---|---|---|---|
|Uses Fitness Values|✔ Yes|✔ Compare Fitness|✘ No|
|Uses Rank|✘ No|✘ No|✔ Yes|
|Requires Sorting|✘ No|✘ No|✔ Yes|
|Maintains Diversity|Medium|High|High|
|Speed|Medium|Fast|Slower|
|Selection Pressure|Depends on Fitness|Controlled by K|Stable|

⭐ **احفظ الجدول ده كويس جدًا** لأنه من أكتر الجداول اللي بيتحول لـ MCQ.

---

## Traveling Salesman Problem (TSP)

### Definition

The Traveling Salesman Problem is a classic optimization problem.

A salesman must:

- Visit every city exactly once.
    
- Return to the starting city.
    
- Minimize the total travel distance.
    

---

### Why is TSP Important?

Because it demonstrates why **Permutation Encoding** is necessary.

Cities cannot be repeated.

Cities cannot be omitted.

---

### Representation Used

✔ Permutation Encoding.

---

### Crossover Used

✔ PMX (Partially Mapped Crossover).

---

⭐ **Exam Focus**

TSP

↓

Permutation Encoding

↓

PMX

---

# Most Important Comparisons

### Encoding Types

|Type|Duplicates|Order Important|
|---|---|---|
|Value|✔ Yes|✘ No|
|Permutation|✘ No|✔ Yes|
|Multi-Parameter|Depends|Usually No|

---

### Crossover Operators

|Operator|Main Idea|
|---|---|
|Single Point|One cut|
|Two Point|Two cuts|
|Uniform|Binary Mask|
|Arithmetic|Weighted Average|
|PMX|Mapping|

---

### Selection Methods

|Method|Based On|
|---|---|
|Roulette Wheel|Fitness|
|Tournament|Competition|
|Rank|Rank|

---

# ⭐⭐⭐ Top Exam Questions (Very Important)

1. Define Integer Representation.
    
2. When should Integer Encoding be used?
    
3. Compare Value Encoding and Permutation Encoding.
    
4. Why can't ordinary crossover be used with Permutation Encoding?
    
5. Explain PMX.
    
6. What is Uniform Crossover?
    
7. What is Arithmetic Crossover?
    
8. Explain the steps of Tournament Selection.
    
9. What happens when Tournament Size increases?
    
10. Compare Roulette Wheel, Tournament, and Rank Selection.
    
11. Why was Rank Selection introduced?
    
12. List the four properties of Selection.
    
13. Why is PMX used in TSP?
    
14. Which crossover uses a binary mask?
    
15. Which crossover uses weighted averages?
    

---

# ⭐ Final Exam Cheat Sheet (احفظها قبل الامتحان)

- **Integer Representation** → Genes are integers.
    
- **Value Encoding** → Duplicates allowed.
    
- **Permutation Encoding** → No duplicates, order matters.
    
- **Multi-Parameter** → Each gene represents a different parameter.
    
- **Single-Point** → One cut.
    
- **Two-Point** → Two cuts.
    
- **Uniform** → Binary mask.
    
- **Arithmetic** → Weighted average.
    
- **PMX** → Mapping + no duplicates.
    
- **Selection** → Chooses parents.
    
- **Roulette Wheel** → Based on fitness.
    
- **Tournament** → Best among K random individuals.
    
- **Rank Selection** → Based on rank, not fitness.
    
- **Increasing K** → Higher selection pressure.
    
- **TSP** → Permutation Encoding + PMX.
    

---
