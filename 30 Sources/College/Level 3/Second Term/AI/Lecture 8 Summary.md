---
title: "Lecture 8 Summary"
aliases: []
type: source
status: active
domain: ai-machine-learning
tags: [source, ai-machine-learning, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
# Lecture 8 – Evolutionary Algorithms & Genetic Algorithms

## Artificial Intelligence – Exam Revision Notes

---

# Evolutionary Algorithms (EA)

## Definition

- Evolutionary Algorithms (EA) are ==optimization algorithms== inspired by **natural evolution**.
    
- They ==imitate Darwin's theory of **"Survival of the Fittest."**==
    
- Better ==individuals have a higher probability of surviving== and reproducing.
    
- EA searches for the ==best solution by improving a population over generations.==
    

---

## Natural Evolution Process

Evolution depends on four main operations:

### 1. Selection

- Better individuals survive.
- Poor individuals are removed.
- Strong individuals have a ==higher chance to reproduce.==
    

> **Purpose:** Improve solution quality.

---

### 2. Reproduction

Creates offspring from parents.
There are two types:

- Asexual reproduction → offspring ==identical to parent.==
- Sexual reproduction → offspring ==inherit genes from both parents.==
    

---

### 3. Recombination (Crossover)

- Exchange ==chromosomes between two parents==.
- Child receives characteristics from both parents.
- Produces ==new candidate solutions==.

**Purpose**

- Combine good features.
- Generate better offspring.
    

---

### 4. Mutation

Randomly changes genes.

Purpose:

- Increase diversity.
- Prevent ==premature convergence.==
- Escape ==local optimum.==
- Explore new search areas.
    

---

## Important Note

Population diversity is achieved by **Mutation**, **NOT Selection**.

==Population diversity== is mainly achieved by:

A) Selection
B) Crossover
C) ==Mutation== ✅
D) Evaluation

---

# Types of Evolutionary Algorithms

The four main types are:

1. Genetic Algorithms (GA)
    
2. Evolution Strategies (ES)
    
3. Evolutionary Programming (EP)
    
4. Genetic Programming (GP)
    

### Important

All of them use:

- Selection
    
- Recombination (Crossover)
    
- Mutation
    

They differ only in **technical details**.

> **True/False**
> 
> Genetic Algorithms and Evolution Strategies ==use completely different concepts.== ❌False

---

# Correspondence Between Nature and Problem Solving

| Natural Evolution | Artificial Intelligence |
| ----------------- | ----------------------- |
| ==Individual==    | ==Candidate Solution==  |
| Gene              | Variable                |
| Chromosome        | Complete Solution       |
| Population        | Set of Solutions        |
| Environment       | Optimization Problem    |
| Fitness           | Solution Quality        |
| Selection         | Choose Better Solutions |
| Crossover         | Combine Solutions       |
| Mutation          | Random Change           |
| Evolution         | Optimization Process    |

In GA, chromosome represents:

A) Variable

B) ==Complete solution== ✅

C) Population

D) Fitness

---

# General Structure of Evolutionary Algorithm

Steps:

1. Generate Initial Population.
    
2. Evaluate Fitness.
    
3. Select Parents.
    
4. Perform Crossover.
    
5. Perform Mutation.
    
6. Produce New Population.
    
7. Repeat until stopping condition.

---

# Genetic Algorithms (GA)

## Definition

Genetic Algorithm is:

- The most famous evolutionary algorithm.
- Simple to implement.
- One of the best optimization techniques.

Used to solve optimization problems.

## Advantages

- Easy implementation.
    
- Works with large search spaces.
    
- Can escape local optimum.
    
- Suitable for optimization.
    
- Finds near-optimal solutions.
    

---

## Basic Terminology

- Gene
	- Smallest unit.
	- Represents one variable.

Example

```
101100

 ^
Gene
```

- Chromosome
	- Complete solution.

Example

```
10110010
```

Entire binary string = Chromosome.

- Individual
	- Same meaning as chromosome.

- Population
	- Collection of chromosomes.

Example

```
101010

110011

001101

111000
```

- Fitness Function
	- Measures solution quality.
		- Higher Fitness = Better Solution

---

# Representation

Representation ==means encoding a solution.==

Choosing the representation is ==one of the most important steps in designing GA==.

One problem may ==have several representations==.

---

## Types of Representation

1. Binary
2. Integer
3. Floating Point
4. Permutation (Order-Based)
    

---

# Binary Representation

Most common representation.

Each ==chromosome consists of bits==.

```
10100110
```

Each bit is either

0 or 1

---

## Advantages

- Easy implementation.
- Easy crossover.
- Similar to digital computers.
- Classical GA representation.
    

---

# Integer Representation

Uses integers.

Example

```
[5 8 2 7]
```

Useful ==when variables are naturally integers.==

---

# Floating Point Representation

Uses real numbers.

Example

```
3.25

7.62

1.48
```

Useful for continuous optimization.

---

# Permutation Representation

Represents order.

Example

```
3 2 5 1 4
```

Used in:

- Scheduling
- Traveling Salesman Problem
    

---

# Binary Representation Example (Knapsack Problem)

Each bit represents one camping item.

```
10110100
```

Means

|Bit|Item|Selected|
|---|---|---|
|1|Tent|Yes|
|0|Sleeping Bag|No|
|1|Food|Yes|
|1|Stove|Yes|
|0|Water Filter|No|
|1|First Aid Kit|Yes|
|0|Camping Chair|No|
|0|Extra Clothes|No|

Weight

13 kg

Value

25

Since

13 kg ≤ Limit

Solution is Valid.

---

# Crossover (Recombination) ⭐⭐⭐

- Definition
	Exchange genes between parents to create children.
- Purpose
	- Produce better offspring.
 
There are three methods.

---

# 1) Single Point Crossover ⭐⭐⭐

Choose one crossover point.

Example

Parent A

```
111|000
```

Parent B

```
000|111
```

Children

```
111111

000000
```

Only one cut.

---

# 2) Double Point Crossover ⭐⭐⭐

Choose two crossover points.

Exchange middle section.

Example

```
11|001|10

00|111|01
```

↓

```
11|111|10
```

---

# 3) Uniform Crossover ⭐⭐⭐

==No fixed crossover point.==

Each gene chosen independently.

Usually

```
Probability = 0.5
```

Every ==bit randomly comes from Parent A or Parent B.==

Provides the highest diversity among crossover methods.

---

# Mutation

Definition

Randomly changes genes.

Applied ==after crossover.==

Usually uses a ==low mutation probability==.

---

## Binary Mutation

Bit Flip

```
0 → 1

1 → 0
```

Only one bit changes each mutation step.

---

## Why Mutation?

- Increase diversity.
- Prevent local optimum.
- Introduce new information.
    

---

# Complete Genetic Algorithm Cycle

```
Initialize Population

↓

Evaluate Fitness

↓

Selection

↓

Crossover

↓

Mutation

↓

New Population

↓

Stopping Condition?
```

Repeat until:

- Maximum generations.
    
- Required fitness reached.
    

---

# Example 1

## Maximize

```
f(x)=x²

0≤x≤31
```

---

## Step 1

Encoding Use 5 bits

Because

```
2⁵ = 32

0 → 31
```

Example

```
10110

↓

22
```

Fitness

```
22²=484
```

---

## Step 2

Generate Random Population

Examples

22

11

29

6

19

13

26

3

21

14

Each chromosome has its own fitness.

---

## Step 3

### Tournament Selection ⭐⭐⭐

Tournament Size = 3

Procedure

Randomly choose 3 individuals.

Winner = highest fitness.

Repeat until enough parents.

---

## Step 4

Single Point Crossover

Parent A

```
11101
```

Parent B

```
11010
```

Child

```
11110
```

Decimal

30

Fitness

900

---

## Step 5

Mutation

```
11110

↓

11111
```

Decimal

31

Fitness

961

Maximum solution found.

---

# Key Insights ⭐⭐⭐

- Simple problems converge quickly.
    
- Elitism preserves the best solution.
    
- Mutation changes 30 → 31.
    
- Crossover maintains diversity.
    

---

# Example 2

## Factory Optimization ⭐⭐⭐

Goal

Maximize weekly profit.

Constraint

Maximum machine time

```
40 Hours
```

---

## Production Data

|Product|Hours|Profit|Max Demand|
|---|---|---|---|
|A|2|100|10|
|B|3|150|8|
|C|1|75|15|
|D|4|200|5|
|E|2.5|120|12|

---

# Chromosome Encoding ⭐⭐⭐

Each product represented using binary.

Required bits

|Product|Bits|
|---|---|
|A|4|
|B|4|
|C|4|
|D|3|
|E|4|

Total

```
19 Bits
```

---

# Example Chromosome

```
1010

0110

1111

101

1001
```

Decoded

A = 10

B = 6

C = 15

D = 5

E = 9

Hours

95.5

Since

```
95.5 > 40
```

Invalid Solution.

---

# Penalty ⭐⭐⭐

If constraints are violated

↓

Apply Penalty

↓

==Fitness decreases.==

Penalty helps ==eliminate invalid solutions while still allowing them to participate with lower fitness.==

---

# Important Definitions ⭐⭐⭐⭐⭐

- **Evolutionary Algorithm:** Optimization inspired by natural evolution.
    
- **Genetic Algorithm:** Most common evolutionary algorithm.
    
- **Gene:** One variable.
    
- **Chromosome:** Complete solution.
    
- **Population:** Collection of chromosomes.
    
- **Fitness:** Quality of solution.
    
- **Selection:** Choose better individuals.
    
- **Crossover:** Exchange genes between parents.
    
- **Mutation:** Randomly change genes.
    
- **Representation:** Encoding method for a solution.
    
- **Binary Representation:** Solution represented using bits (0/1).
    
- **Tournament Selection:** Randomly choose a subset and select the fittest.
    
- **Penalty Function:** Reduces fitness of invalid solutions.
    
- **Elitism:** Preserving the best solution in the next generation.
    

---

# ⭐⭐⭐ Most Expected MCQ / True-False

### MCQ

- What is the most popular Evolutionary Algorithm? → **Genetic Algorithm (GA)**
    
- Which operation increases population diversity? → **Mutation**
    
- Which operation combines genes from two parents? → **Crossover**
    
- A chromosome represents a **complete solution**.
    
- A gene represents **one variable**.
    
- The quality of a solution is measured by the **Fitness Function**.
    
- Binary mutation flips **0 ↔ 1**.
    
- Tournament Selection chooses the individual with the **highest fitness** from a random subset.
    
- Binary representation uses **bits (0 and 1)**.
    
- The (x^2) example uses **5 bits** because (2^5 = 32).
    

### True / False

- Mutation is applied **after crossover**. ✅ True
- Evolutionary Algorithms are inspired by natural evolution. ✅ True
- Binary representation uses decimal numbers. ❌ False
- All Evolutionary Algorithms differ only in technical details. ✅ True
- A chromosome is made up of genes. ✅ True
- Higher fitness means a better solution. ✅ True
- Uniform crossover uses a ==single crossover point.== ❌ False
- Mutation is applied with a ==high probability. ==❌ False
- Penalty functions reduce the fitness of invalid solutions. ✅ True
- Selection removes weaker individuals and favors fitter ones. ✅ True