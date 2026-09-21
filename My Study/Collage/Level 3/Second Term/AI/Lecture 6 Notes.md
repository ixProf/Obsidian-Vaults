
# 1) Uninformed (Blind) Search

### Definition

Algorithms search **==without any knowledge==** about how close a state is to the goal.

They only know:

- Initial state
- Goal state
- Available actions
- Goal test
    

They **do not know** which node is better than another.

### Examples

- BFS
    
- DFS
    
- Uniform Cost Search (UCS)
    
- Iterative Deepening DFS
    

### Characteristics

- Explores many ==unnecessary nodes.==
- Usually slower.
- Consumes more memory.
    

Example:  
Finding a restaurant by walking through every street until you find it.

---

# 2) Informed (Heuristic) Search

Instead of searching blindly, we ==use **extra knowledge==** called a **heuristic**.

## Heuristic Function

$h(n)=\text{Estimated cost from node }n\text{ to the goal}$

It is ==only an **estimate**, not the real distance==.

The better the heuristic,

- the fewer nodes expanded,
- the faster the search.
    

Examples:

- Greedy Best First Search
- A*
    
- Hill Climbing
- Beam Search
    

Example:  
Using Google Maps to estimate how close you are to your destination.

---

# 3) Route Finding Example

Cities are nodes.

Road lengths are actual costs.

The heuristic:

$h(n)=\text{Straight-line distance (SLD)}$

Example:

Arad → Bucharest

==Straight-line distance is an estimate== because roads are not perfectly straight.

---

# 4) Heuristics for the 8-Puzzle

## First heuristic

Misplaced Tiles

 $h(n)=\text{Number of misplaced tiles}$

Ignore the blank.

Example

Goal

```
1 2 3
8   4
7 6 5
```

Current

```
1 2
5 4 3
8 6
```

Suppose 8 tiles are misplaced

Then

[  
h(n)=8  
]

---

## Second heuristic

Manhattan Distance

For every tile

Calculate

[  
|x_1-x_2|+|y_1-y_2|  
]

Then sum all distances.

Example

```
Tile1 =1
Tile2 =3
Tile3 =1
...

Total =18
```

Advantages

More accurate than misplaced tiles.

---

# 5) Best First Search

General idea

Always expand the node that looks **best** according to an evaluation function.

Evaluation function

f(n) 

Different algorithms define (f(n)) differently.

---

# 6) Greedy Best First Search

## Evaluation Function

$f(n)=h(n)$  


It completely ==ignores the path already travelled==.

Only asks

> "Which node seems closest to the goal?"

Algorithm

1. Compute heuristic for every frontier node.
    
2. Pick smallest heuristic.
    
3. Expand it.
    
4. Repeat.
    

---

## Advantages

- Very fast.
- Often reaches goal quickly.
- Good heuristic makes it efficient.

## Disadvantages

Can make terrible decisions.

It may choose a node that looks ==close but leads to a very expensive path==.

It is

- not optimal
- can waste time
- may get trapped by bad heuristic choices
    

---

## Complexity

- Complete? 
	- Usually yes (if repeated states handled)
- Time
	- Exponential
- Space
	- Exponential
- Optimal?
	- No

---

# 7) A* Search

Idea

Greedy ignores the path cost.

A* combines

- actual cost
- estimated remaining cost

Evaluation function

$f(n)=g(n)+h(n)$

where $g(n)=\text{actual path cost from start}$ and $h(n)=\text{estimated cost to goal}$

---

Example

Suppose

Current node

```
g=120
h=80
```

Then

```
f=200
```

A* chooses the smallest **total estimated cost**.

---

# Why A* is Better

Imagine

Node A

```
g=50
h=100
f=150
```

Node B

```
g=10
h=160
f=170
```

Greedy chooses

```
A
```

because

```
100<160
```

A*

compares

```
150
170
```

Sometimes A* ==avoids expensive mistakes== because ==it considers the cost already paid.==

---

# 8) Properties of A*

- Complete?
	- Yes
- Optimal?
	- Yes (with admissible heuristic)
- Time
	- Exponential
    
- Memory
	- Very large
    
- Main weakness
	- Consumes ==lots of memory== because it stores many generated nodes.

---

# 9) Admissible Heuristic

Definition

A heuristic is **admissible** if it **never overestimates** the true cost.

Mathematically

$h(n)\le h^*(n)$

where

$h^*(n)$

is the ==actual shortest distance==.

Example

Real distance

```
20
```

Good heuristic

```
15
18
20
```

Bad heuristic

```
25
```

because it overestimates.

Admissible heuristics guarantee A* finds the optimal solution.

---

# 11) Consistent (Monotonic) Heuristic

A stronger condition than admissibility.

Must satisfy

$h(n)\le c(n,a,n')+h(n')$

Meaning

Estimated distance ==should never decrease by more than the cost== of moving.

Benefits

- A* never needs to reopen nodes.
    
- More efficient implementation.
    

---

# Difference Between Greedy Best-First Search and A*

| Feature                       | Greedy Best-First Search        | A* Search                             |
| ----------------------------- | ------------------------------- | ------------------------------------- |
| Evaluation function           | **f(n)=h(n)**                   | **f(n)=g(n)+h(n)**                    |
| Uses actual path cost (g(n))? | ❌ No                            | ✅ Yes                                 |
| Uses heuristic (h(n))?        | ✅ Yes                           | ✅ Yes                                 |
| Decision based on             | Closest-looking node            | Lowest total estimated cost           |
| Speed                         | Usually faster                  | Usually slower                        |
| Memory usage                  | Lower                           | Higher                                |
| Complete                      | Usually yes (with graph search) | Yes                                   |
| Optimal                       | ❌ No                            | ✅ Yes (if heuristic is admissible)    |
| Risk                          | Can choose a bad shortcut       | Much less likely to make poor choices |
| Best use                      | Fast approximate answers        | Finding the shortest/optimal path     |

---