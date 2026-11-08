---
title: "Operating Systems - Chapter 6"
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


### **1. What is a Deadlock?**

A deadlock is a situation where a set of processes is stuck because each process is waiting for a resource that is currently held by another process in that same set. It is often compared to a traffic jam where no car can move because the road ahead is blocked by another car that is also stuck.

### **2. The Four Necessary Conditions**

A deadlock **cannot** happen unless all four of these conditions are met at the same time:

- **Mutual Exclusion:** Only one process can use a resource at a time (non-sharable mode).
    
- **Hold and Wait:** A process must be holding at least one resource while waiting for another resource that is held by someone else.
    
- **No Preemption:** Resources cannot be taken away by the OS; they can only be released voluntarily by the process.
    
- **Circular Wait:** A chain of processes exists ($P_0, P_1, ..., P_n$) where $P_0$ waits for $P_1$, $P_1$ waits for $P_2$, and $P_n$ waits for $P_0$.
    

---

### **3. Modeling with Resource-Allocation Graphs**

The system state is represented by a directed graph with two types of nodes: Processes (circles) and Resources (rectangles).

- **Request Edge ($P_i \rightarrow R_j$):** The process is waiting for an instance of a resource.
    
- **Assignment Edge ($R_j \rightarrow P_i$):** An instance of the resource has been given to the process.
    
- **Wait-for Graph:** For single-instance resources, we use this simplified graph. If it contains a **cycle**, a deadlock exists.
    

---

### **4. Advanced Management Strategies**

#### **Deadlock Prevention**

This method focuses on making it impossible for one of the four conditions to hold:

- **Eliminating Hold and Wait:** A process must request and be allocated all its resources _before_ starting, or it must release all its current resources before requesting new ones.
    
- **Eliminating Circular Wait:** Every resource type is assigned a unique number. Processes must request resources in strictly **increasing order** of these numbers.
    

#### **Deadlock Avoidance (The Banker's Algorithm)**

Avoidance works by requiring processes to declare their **Maximum Needs** upfront. The OS then checks every request to see if granting it would leave the system in a **Safe State**.

- **Safe Sequence:** A state is safe only if there is a sequence of processes such that each can finish using currently available resources plus the resources held by processes that finished before it.
    
- **Safety Algorithm:** The OS maintains vectors for **Available** resources and matrices for **Max**, **Allocation**, and **Need** ($Need = Max - Allocation$) to compute the safe sequence.
    

#### **Deadlock Detection and Recovery**

If the system does not prevent or avoid deadlocks, it must periodically run a **Detection Algorithm** to identify deadlocked processes.

- **Recovery by Termination:** The OS can either abort all deadlocked processes or abort them one by one until the cycle is broken.
    
- **Recovery by Preemption:** The OS selects a "victim," rolls back its state, and preempts its resources to give to others.
    

---

Would you like me to provide a step-by-step example of how to check for a **Safe Sequence** using the specific numbers from the Banker's Algorithm table in your lecture?