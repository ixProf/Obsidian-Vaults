

# Lecture 9 Summary

## Genetic Algorithm (Integer Representation & Selection)

---

# 1. Integer Representation

## Definition

Integer Representation is a chromosome representation where **genes are integers instead of binary values**.

Each gene can take a value from a specified integer range.

### Used for

- Discrete optimization problems
    
- Scheduling
    
- Resource allocation
    
- Traveling Salesman Problem (TSP)
    
- Design optimization
    

---

## When to Use Integer Encoding

Use Integer Encoding when:

- Variables are naturally integers.
    
- The problem contains countable values.
    
- Binary encoding would make the chromosome unnecessarily long.
    
- The solution consists of quantities or order.
    

---

## When NOT to Use Integer Encoding

Do NOT use Integer Encoding when:

- Variables are continuous (real values).
    
- Binary representation is more suitable.
    
- The problem requires floating-point precision.
    

---

# 2. Types of Integer Representation

---

## A) Value Encoding (Simple Integers)

### Definition

Each gene stores an integer value.

Example

```
Chromosome:
[45,67,12,89,33]
```

Meaning

```
Product1 = 45
Product2 = 67
Product3 = 12
...
```

### Applications

- Resource allocation
    
- Quantity assignment
    
- Scheduling
    

---

## B) Permutation Encoding (Order-Based)

### Definition

Each integer appears **exactly once**.

Used whenever the order matters.

Example

```
[3,1,4,2,7,5,8,6]
```

Meaning

Visit

```
City3
↓

City1
↓

City4
↓

...
```

### Applications

- Traveling Salesman Problem (TSP)
    
- Job Scheduling
    
- Routing Problems
    

---

## C) Multi-Parameter Encoding

### Definition

Each gene represents a different parameter.

Example

```
[3,2,1,2]
```

Meaning

- Blue car
    
- V6 Engine
    
- Alloy Wheels
    
- Automatic Transmission
    

---

# Exam Notes ⭐

Know the difference between

|Representation|Main Idea|
|---|---|
|Value Encoding|Integer values|
|Permutation Encoding|Order only (no duplicates)|
|Multi-Parameter|Different parameters|

---

# 3. Crossover for Integer Representation

Different crossover operators are used depending on encoding type.

---

# A) Single-Point Crossover

### Steps

1. Select one cut point.
    
2. Exchange tails.
    

Example

Parent1

```
45 67 12 | 89 33
```

Parent2

```
23 56 91 | 34 62
```

Child1

```
45 67 12 34 62
```

Child2

```
23 56 91 89 33
```

---

# B) Two-Point Crossover

### Steps

1. Select two cut points.
    
2. Exchange middle segment.
    

Produces children with mixed middle parts.

---

# C) Uniform Crossover

Each gene is chosen independently from Parent1 or Parent2.

Uses a binary mask.

Example

Mask

```
1 0 1 0 1
```

If Mask = 1 → take from Parent1

If Mask = 0 → take from Parent2

---

# D) Arithmetic Crossover

### Definition

Children are created using **weighted averages** of parent genes.

Formula

```
Child1 = αP1 + (1−α)P2

Child2 = (1−α)P1 + αP2
```

Types

- Simple Arithmetic
    
- Single Arithmetic
    
- Whole Arithmetic
    

---

# Exam Notes ⭐

Arithmetic crossover uses:

✔ Weighted average

NOT swapping.

---

# 4. Crossover for Permutation Encoding

Normal crossover cannot be used because it creates

- Duplicate values
    
- Missing values
    

Therefore,

Use

## PMX (Partially Mapped Crossover)

---

## PMX Steps

### Step 1

Choose two crossover points.

---

### Step 2

Copy the selected segment from Parent1.

---

### Step 3

Create mapping between Parent1 and Parent2.

Example

```
4 ↔ 1

2 ↔ 3

7 ↔ 6
```

---

### Step 4

Fill remaining positions from Parent2 using mapping.

Result

A valid permutation

No duplicates

No missing values

---

# Exam Notes ⭐

PMX is mainly used for

✔ Traveling Salesman Problem (TSP)

Reason:

Each city must appear exactly once.

---

# 5. Selection

## Definition

Selection is the process of choosing individuals from the current population to become parents for the next generation.

It drives the population toward better solutions.

---

## Selection Process

```
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
```

---

# Key Properties of Selection Methods

## 1. Selection Pressure

How strongly better individuals are favored.

---

## 2. Population Diversity

Preserving weak individuals.

Higher diversity

↓

Less chance of premature convergence.

---

## 3. Convergence Speed

How fast the population becomes similar.

---

## 4. Computational Complexity

Time required to perform selection.

---

# Exam Notes ⭐

Memorize the four properties exactly.

Very common MCQ.

---

# 6. Selection Methods

Three major categories

---

## A) Fitness-Proportionate Selection

Example

Roulette Wheel

SUS (Stochastic Universal Sampling)

---

## B) Rank-Based Selection

- Deterministic
    
- Elitism
    

---

## C) Tournament Selection

- Binary Tournament
    
- Tournament Size K
    

---

# 7. Roulette Wheel Selection

Also called

Fitness-Proportionate Selection.

---

## Definition

Probability of selection is proportional to fitness.

Higher fitness

↓

Higher probability.

---

### Advantages

- Simple
    
- Popular
    

---

### Disadvantages

If one chromosome has very high fitness,

It dominates the population.

Population diversity decreases.

---

# Exam Notes ⭐

Roulette Wheel depends on

✔ Fitness values

---

# 8. Tournament Selection

One of the most popular selection methods.

---

## Steps

### Step 1

Randomly choose K individuals.

---

### Step 2

Compare their fitness.

---

### Step 3

Select the best.

Repeat until enough parents are selected.

---

## Advantages

- Very simple
    
- No sorting required
    
- No fitness scaling
    
- Fast
    
- Maintains diversity
    
- Selection pressure controlled by tournament size
    

---

### Tournament Size

Small K

↓

More diversity

Large K

↓

Stronger selection pressure

↓

Faster convergence

---

# Exam Notes ⭐

Changing **Tournament Size (K)** changes

✔ Selection Pressure

---

# 9. Rank-Based Selection

---

## Problem

Roulette Wheel may allow one excellent chromosome to dominate.

Population diversity decreases.

---

## Solution

Ignore fitness values.

Only use ranking.

---

## Steps

### Step 1

Sort population.

---

### Step 2

Assign ranks.

Best

↓

Rank 1

Worst

↓

Rank N

---

### Step 3

Assign probabilities according to rank.

Better rank

↓

Higher probability.

---

## Advantage

Maintains diversity.

Avoids domination by one individual.

---

# Traveling Salesman Problem (TSP)

The objective is

Visit every city

Exactly once

Return to the starting city

Minimize total distance.

Usually solved using

- Permutation Encoding
    
- PMX Crossover
    

---

# Important Definitions (Very Common in MCQ)

|Term|Definition|
|---|---|
|Integer Representation|Chromosome uses integers as genes|
|Value Encoding|Each gene stores an integer value|
|Permutation Encoding|Each integer appears exactly once|
|Multi-Parameter Encoding|Different genes represent different parameters|
|Single-Point Crossover|One cut point|
|Two-Point Crossover|Two cut points|
|Uniform Crossover|Gene-by-gene selection using a mask|
|Arithmetic Crossover|Weighted average of parents|
|PMX|Crossover preserving valid permutations|
|Selection|Choosing parents for the next generation|
|Roulette Wheel|Probability based on fitness|
|Tournament Selection|Best individual from randomly selected competitors|
|Rank-Based Selection|Selection based on ranking, not fitness|

---

# ⭐ Most Important Exam Questions (MCQ / True-False)

1. **Integer Representation uses integers as genes.** ✔
    
2. **Permutation Encoding requires each integer to appear exactly once.** ✔
    
3. **PMX is designed for Permutation Encoding.** ✔
    
4. **Arithmetic Crossover uses weighted averages instead of swapping genes.** ✔
    
5. **Uniform Crossover uses a binary mask.** ✔
    
6. **Roulette Wheel Selection is fitness-proportionate.** ✔
    
7. **Tournament Selection chooses the best individual among randomly selected competitors.** ✔
    
8. **Increasing tournament size increases selection pressure.** ✔
    
9. **Rank-Based Selection depends on rank, not actual fitness values.** ✔
    
10. **Standard crossover cannot be directly used with Permutation Encoding because it may create duplicate values.** ✔
    
11. **PMX prevents duplicate and missing values in permutation chromosomes.** ✔
    
12. **Selection aims to choose parents for the next generation.** ✔
    
13. **The four key properties of selection are: Selection Pressure, Population Diversity, Convergence Speed, and Computational Complexity.** ✔
    
14. **The Traveling Salesman Problem (TSP) commonly uses Permutation Encoding with PMX crossover.** ✔
    