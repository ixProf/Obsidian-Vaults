---
title: "AI - Lecture 4"
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
# 🧠 AI Lecture 4 — Search Algorithms (Detailed Structured Version)

---

# 1) Search Problem (Revision)

## 🔹 Definition

> A search problem can be defined formally by a set of components including initial state, actions, transition model, goal test, and path cost.

## 🔹 الشرح

المشكلة في الـ AI بتتكتب بشكل formal علشان نقدر نطبق عليها algorithm.

لازم تحدد:

- البداية (Initial State)
    
- الحركات (Actions)
    
- النظام اللي بيغير الحالة (Transition Model)
    
- الهدف (Goal)
    
- التكلفة (Cost)
    

---

# 2) Performance Measures of Search Algorithms

## 🔹 Definition

> The performance of a search algorithm can be evaluated using completeness, optimality, time complexity, and space complexity.

## 🔹 الشرح

بنقيم أي algorithm على 4 حاجات:

---

### 🔸 Completeness

> Is the algorithm guaranteed to find a solution if one exists?

🟢 الشرح:  
هل لو فيه حل، الـ algorithm أكيد هيلاقيه؟

---

### 🔸 Optimality

> Does the algorithm find the lowest-cost solution?

🟢 الشرح:  
هل بيطلع أفضل حل ولا أي حل وخلاص؟

---

### 🔸 Time Complexity

> How long does the algorithm take to find a solution?

🟢 الشرح:  
عدد الخطوات أو الزمن اللي بيستهلكه

---

### 🔸 Space Complexity

> How much memory does the algorithm use?

🟢 الشرح:  
قد إيه محتاج RAM

---

## 🔹 Important Symbols

- b → branching factor
    
- d → depth of optimal solution
    
- m → maximum depth
    

---

# 3) Types of Search Algorithms

## 🔹 Definition

> Search algorithms are classified into uninformed and informed search.

## 🔹 الشرح

عندنا نوعين:

---

### 🔸 Uninformed Search

> Uses only the information provided in the problem definition.

🟢 الشرح:  
بيعتمد بس على:

- initial state
    
- actions
    
- goal
    

👉 معندوش أي فكرة عن الهدف فين

---

### 🔸 Informed Search

> Uses additional information (heuristics) to guide the search.

🟢 الشرح:  
عنده معلومات إضافية تساعده:

- يختار الطريق الأفضل
    
- يقرب للهدف أسرع
    

---

# 4) Uninformed Search Algorithms

## 🔹 Definition

> Uninformed search strategies explore the search space without any additional knowledge.

## 🔹 الشرح

بيمشي بشكل أعمى (Blind Search)

---

## 🔹 Types

- BFS
    
- UCS
    
- DFS
    
- DLS
    
- IDS
    
- Bidirectional
    

---

# 5) Breadth-First Search (BFS)

---

## 🔹 Definition

> Breadth-first search expands the shallowest unexpanded node first.

## 🔹 الشرح

يعني:

- يمشي level by level
    
- يبدأ من أقرب nodes
    

---

## 🔹 Data Structure

> BFS uses a FIFO queue.

## 🔹 الشرح

Queue = أول واحد يدخل يخرج الأول

---

## 🔹 Core Idea

> Nodes are expanded in order of increasing depth.

## 🔹 الشرح

بيزور:

- Level 0
    
- Level 1
    
- Level 2
    

---

# 6) BFS Algorithm Steps

## 🔹 Definition

> BFS uses a queue to systematically explore nodes level by level.

## 🔹 الشرح (Step by Step)

1. نحط البداية في queue
    
2. نطلع node
    
3. نوسعها
    
4. نضيف الأطفال في الآخر
    
5. نكرر
    

---

# 7) BFS Pseudocode

## 🔹 Definition

> BFS algorithm uses a frontier (queue) and a reached set to avoid revisiting nodes.

## 🔹 الشرح

```id="6l6fls"
frontier = queue(initial state)
reached = {initial state}

while frontier not empty:
    node = remove from queue
    if node is goal:
        return solution
    expand node
    add children to queue
```

---

# 8) BFS Properties (Important جدًا)

---

## 🔹 Completeness

> BFS is complete if the branching factor is finite.

🟢 الشرح:  
لو عدد الفروع محدود → هيلاقي الحل أكيد

---

## 🔹 Optimality

> BFS is optimal if all step costs are equal.

🟢 الشرح:  
لو كل خطوة = نفس التكلفة → يطلع أقصر طريق

---

## 🔹 Time Complexity

> Time complexity = O(b^d)

🟢 الشرح:

- b = branching
    
- d = depth
    

👉 بيكبر بشكل exponential

---

## 🔹 Space Complexity

> Space complexity = O(b^d)

🟢 الشرح:  
بياخد memory كبيرة جدًا لأنه بيخزن كل level

---

# 9) BFS Characteristics

## 🔹 Definition

> BFS explores nodes level by level using a queue.

## 🔹 الشرح

- Level-order traversal
    
- مناسب لأقصر طريق
    
- memory عالي
    

---

# 10) BFS Applications

## 🔹 Definition

> BFS is widely used in shortest path problems and graph traversal.

## 🔹 الشرح

### 🔸 أهم الاستخدامات:

- Shortest Path (unweighted graph)
    
- Web Crawlers
    
- Social Networks (friends of friends)
    
- GPS navigation
    
- Broadcasting in networks
    
- Garbage Collection
    

---
