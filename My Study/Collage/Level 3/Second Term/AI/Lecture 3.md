# 🧠 AI Lecture 3 — Solving Problems by Searching (Detailed Structured Version)

---

# 1) What does “Solving Problems by Searching” mean?

## 🔹 Definition

> The process of looking for a sequence of actions that form a path to a goal state is called search.

## 🔹 Explanation (Arabic + English)

- عندك:
    
    - Initial State (بداية)
        
    - Goal State (هدف)
        
    - Actions (حركات)
        
- بتدور على:  
    → Sequence of actions توصلك للهدف
    

## 🔹 Example

- تمشي يمين / شمال / straight / ترجع  
    → لحد ما توصل للمكان المطلوب
    

👉 نفس فكرة الـ AI Agent في حل المشاكل

---

# 2) Search Algorithm

## 🔹 Definition

> A search algorithm takes a problem as input and returns a solution as a sequence of actions.

## 🔹 Key Idea

- مش مجرد Yes / No
    
- الحل = Path / Plan
    

## 🔹 Important Note

- الهدف مش بس توصل
    
- الهدف: **تعرف إزاي توصل**
    

---

# 3) Problem Formulation (Very Important)

## 🔹 Definition

> The agent describes states, actions, goal, and cost → abstract model of the world

## 🔹 Explanation

قبل ما تحل:

- لازم تعمل Model للمشكلة يشمل:
    
    - States
        
    - Actions
        
    - Goal
        
    - Cost
        

## 🔹 Abstract Model

- ما تمثلش كل حاجة
    
- ركز على:
    

> What matters for solving the problem

## 🔹 Critical Point

> AI problem solving depends heavily on good formulation

---

# 4) Formal Definition of a Search Problem

## 4.1 Initial State

- الحالة اللي بنبدأ منها
    
- Root of search tree
    

---

## 4.2 Actions

- الأفعال الممكنة من كل state
    

### Important

> Action set may vary from state to state

---

## 4.3 Transition Model

## 🔹 Definition

> (state, action) → new state

## 🔹 Meaning

- لو أنا في state معينة
    
- وعملت action معينة  
    → هاروح state جديدة
    

## 🔹 Examples

- Vacuum:
    
    - Suck → ينضف
        
    - Right → يتحرك يمين
        
- Puzzle:
    
    - Left → swap مع البلاطة
        

---

## 4.4 Goal Test

## 🔹 Definition

> Check if current state is goal

## 🔹 Examples

- Vacuum → كل الخلايا clean
    
- Puzzle → الأرقام مرتبة
    

---

## 4.5 Path Cost Function

## 🔹 Definition

> Assigns cost to each path

## 🔹 ممكن تمثل:

- Time
    
- Distance
    
- Energy
    
- Moves
    

## 🔹 Important

> مش أي solution = optimal solution

---

## 4.6 State Space

## 🔹 Definition

> All possible states

## 🔹 Important

- كل ما يكبر:
    
    - Search أصعب
        
    - Memory ↑
        
    - Time ↑
        

---

## 4.7 Optimal Solution

## 🔹 Definition

> Solution with lowest cost

## 🔹 Example

- 10 steps
    
- 7 steps
    
- 4 steps → BEST
    

---

# 5) Search Tree & Representation

## 🔹 Structure

- Root → Initial State
    
- Nodes → States
    
- Edges → Actions
    

## 🔹 Important Concepts

- Branching happens
    
- Exploring alternatives
    
- مش خط مستقيم
    

---

# 6) Example 1: Vacuum World

## 6.1 States

- مكان الـ agent
    
- حالة كل خلية
    

### عدد الحالات:

= 2 × 2 × 2 = 8

---

## 6.2 Initial State

- أي state ممكن تبدأ منها
    

---

## 6.3 Actions

- Suck
    
- Left
    
- Right
    

---

## 6.4 Transition Model

- Suck → clean
    
- Left / Right → move
    

---

## 6.5 Goal State

- كل الخلايا clean
    
- مكان agent مش مهم
    

---

## 6.6 Cost

- كل action = 1
    

---

## 6.7 Important Insight

- State space finite وصغير  
    → مناسب للتعليم
    

---

# 7) Example 2: N-Puzzle

## 7.1 States

- ترتيب البلاطات
    

---

## 7.2 Initial State

- أي ترتيب ممكن
    

---

## 7.3 Actions

- Move blank:
    
    - Up / Down / Left / Right
        

### Important

- مش كل الحركات متاحة دايمًا
    

---

## 7.4 Transition Model

- Swap بين blank والبلاطة
    

---

## 7.5 Goal State

- الأرقام مرتبة
    

---

## 7.6 Cost

- كل حركة = 1
    

---

# 8) Search Algorithms

## 🔹 Definition

> Takes problem → returns solution

## 🔹 After defining:

- States
    
- Actions
    
- Goal
    
- Cost
    

→ نستخدم algorithm

---

# 9) Search Strategy (VERY IMPORTANT)

## 🔹 Definition

> Order of node expansion

## 🔹 Meaning

مين نوسعه الأول؟

## 🔹 Examples

- BFS → الأقدم
    
- DFS → الأعمق
    
- Cheapest
    
- Greedy
    

---

# 10) General Search Algorithm

## 🔹 Steps

1. Initialize tree with initial state
    
2. Loop:
    
    - No nodes → Failure
        
    - Choose leaf node
        
    - If goal → return solution
        
    - Else → Expand
        

---

## 🔹 Concepts

### Leaf Node

- Node لسه ما اتوسعتش
    

---

### Node Expansion

- Generate children nodes
    
- Add to tree
    

---

# 11) Node Expansion (Deep Understanding)

## 🔹 Meaning

- تطبيق كل actions
    
- توليد successor states
    

## 🔹 Examples

- Puzzle → 4 moves
    
- Vacuum → 3 moves
    

---

# 12) States vs Nodes (VERY IMPORTANT)

## 12.1 State

- Representation of situation
    

---

## 12.2 Node

- Data structure يحتوي:
    
    - state
        
    - parent
        
    - action
        
    - path cost g(n)
        
    - depth
        

---

## 12.3 Important Difference

|State|Node|
|---|---|
|وصف الحالة|كيان داخل الشجرة|
|no metadata|فيه معلومات إضافية|

---

## 🔹 Critical Point

> Same state can appear in multiple nodes

---

## 12.4 g(n)

- تكلفة الوصول للنود
    

---

## 12.5 Depth

- عدد الخطوات من البداية
    

---

## 🔹 Important

- لو cost = 1  
    → depth = g(n)
    
- غير كده → مختلفين
    

---

# 13) Visual Figures Meaning

## 🔹 Large Tree

- branching كبير
    
- احتمالات كثيرة
    

---

## 🔹 Vacuum Graph

- transitions بين states
    

---

## 🔹 Puzzle Tree

- كل state → children
    

---

## 🔹 State vs Node Diagram

- بيوضح الفرق المفاهيمي
    

---

# 14) Main Ideas (Must Understand)

## 14.1

> AI problems = Search Problems

---

## 14.2

> Good formulation is critical

---

## 14.3

> Problem ≠ Input/Output  
> → لازم:

- States
    
- Actions
    
- Goal
    
- Cost
    

---

## 14.4

> Strategy matters

---

## 14.5

> Solution ≠ Optimal

---

## 14.6

> State ≠ Node

---

# 15) Final Organized Summary

## Flow of Lecture

1. Search
    
2. Search Algorithm
    
3. Problem Formulation
    
4. Components
    
5. State Space
    
6. Examples
    
7. Search Tree
    
8. Strategy
    
9. Algorithm
    
10. Node vs State
    

---

# 🔥 طريقة الحفظ الصح

احفظ بالترتيب ده:

- Definitions
    
- Components
    
- Examples
    
- Algorithm
    
- Concepts
    

---
