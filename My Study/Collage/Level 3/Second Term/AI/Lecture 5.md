
# Breadth-First Search (BFS) – Summary

## Definition

- **Breadth-First Search (BFS)** is an **uninformed (blind) search algorithm**.
    
- It explores the search tree **level by level**.
    
- It expands **all nodes at the current depth** before moving to the next level.
    
- It is suitable for finding the **shortest path** when all edge costs are equal.
    

---

## Core Idea

- Start from the initial node.
    
- Expand all neighboring nodes first.
    
- Continue expanding nodes level by level until the goal is found.
    

Example:

```
        A
      / | \
     B  C  D
    / \     \
   E   F     G
```

Expansion Order:

```
A → B → C → D → E → F → G
```

---

## Data Structure

- **Queue (FIFO – First In, First Out)**
    

Example:

```
Insert: A B C

Queue:
Front → A B C ← Rear

Remove:
A (first inserted)
```

---

## Algorithm Steps

1. Insert the start node into the queue.
    
2. Remove the front node.
    
3. Check if it is the goal.
    
4. If not, expand its children.
    
5. Add unvisited children to the queue.
    
6. Repeat until the goal is found or the queue becomes empty.
    

---

## Evaluation Method

- Expands the **shallowest node first**.
    
- Does **not** consider path cost.
    

---

## Properties

|Property|Value|
|---|---|
|Type|Uninformed (Blind) Search|
|Data Structure|Queue (FIFO)|
|Complete|✅ Yes|
|Optimal|✅ Yes (if all edge costs are equal)|
|Time Complexity|**O(bᵈ)**|
|Space Complexity|**O(bᵈ)**|

Where:

- **b** = Branching factor
    
- **d** = Depth of the shallowest goal
    

---

## Advantages

- Guaranteed to find a solution if one exists.
    
- Finds the shortest path when all step costs are equal.
    
- Simple to understand and implement.
    

---

## Disadvantages

- Requires a large amount of memory.
    
- Slow for very deep search trees.
    
- Explores many unnecessary nodes.
    

---

## When to Use BFS

- Finding the shortest path in an **unweighted graph**.
    
- Searching for the nearest solution.
    
- Problems with small or moderate search depth.
    

---

# Depth-First Search (DFS) – Summary

## Definition

- **Depth-First Search (DFS)** is an **uninformed (blind) search algorithm**.
    
- It explores **one branch as deeply as possible** before backtracking.
    
- When it reaches a dead end, it returns to the previous node and explores another branch.
    

---

## Core Idea

- Go deep first.
    
- If no more children exist, backtrack.
    
- Repeat until the goal is found.
    

Example:

```
        A
      /   \
     B     C
    / \
   D   E
```

Expansion Order:

```
A → B → D → E → C
```

---

## Data Structure

- **Stack (LIFO – Last In, First Out)**
    

Example:

```
Push:
A
B
D

Stack:
Top
D
B
A

Pop:
D
```

---

## Algorithm Steps

1. Push the start node onto the stack.
    
2. Pop the top node.
    
3. Check if it is the goal.
    
4. If not, push its unvisited children.
    
5. Continue until the stack is empty or the goal is found.
    

---

## Evaluation Method

- Always expands the **deepest node** available.
    

---

## Properties

|Property|Value|
|---|---|
|Type|Uninformed (Blind) Search|
|Data Structure|Stack (LIFO)|
|Complete|✅ Yes (finite graphs), ❌ No (infinite graphs without a depth limit)|
|Optimal|❌ No|
|Time Complexity|**O(bᵐ)**|
|Space Complexity|**O(bm)** (or **O(m)** with recursive implementation)|

Where:

- **b** = Branching factor
    
- **m** = Maximum depth of the search tree
    

---

## Advantages

- Requires much less memory than BFS.
    
- Simple recursive implementation.
    
- Can quickly find deep solutions.
    

---

## Disadvantages

- Does not guarantee the shortest path.
    
- Can get stuck exploring an infinite branch.
    
- May miss a shallow goal while exploring a deep path.
    

---

## When to Use DFS

- Memory is limited.
    
- Solutions are expected to be deep.
    
- Finding **any** solution is more important than finding the optimal one.
    

---

# BFS vs DFS

| Feature             | BFS                          | DFS                           |
| ------------------- | ---------------------------- | ----------------------------- |
| Search Strategy     | Level by level               | Deepest branch first          |
| Data Structure      | Queue (FIFO)                 | Stack (LIFO)                  |
| Complete            | ✅ Yes                        | ✅ Finite graphs only          |
| Optimal             | ✅ Yes (equal costs)          | ❌ No                          |
| Time Complexity     | O(bᵈ)                        | O(bᵐ)                         |
| Space Complexity    | O(bᵈ)                        | O(bm)                         |
| Memory Usage        | High                         | Low                           |
| Finds Shortest Path | ✅ Yes (equal costs)          | ❌ No                          |
| Best For            | Shallow goals, shortest path | Deep searches, limited memory |