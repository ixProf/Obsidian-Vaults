---
title: "Operating Systems - Chapter 4"
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
This summary covers the key concepts of **Process Synchronization** from Lecture 4 of the Operating Systems course.

---

### **1. The Core Problem: Race Conditions**

A **race condition** occurs when multiple processes access and manipulate the same data concurrently. The final outcome depends on the specific order in which access takes place, which can lead to incorrect data states.

**Example:** If a producer (incrementing a counter) and a consumer (decrementing) execute simultaneously without synchronization, the final value of the counter may be wrong (e.g., 4 instead of 5) because their register operations overlap .

### **2. The Critical-Section Problem**

Each process has a segment of code called a **critical section**, where it modifies shared variables or files. The goal is to ensure that when one process is in its critical section, no other process can enter theirs.

A valid solution must satisfy three requirements:

- **Mutual Exclusion:** Only one process at a time can be in the critical section.
    
- **Progress:** If no one is in the critical section, the choice of who enters next cannot be postponed indefinitely.
    
- **Bounded Waiting:** There must be a limit on how many times other processes can enter the critical section before a waiting process's request is granted.
    

### **3. Software and Hardware Solutions**

- **Peterson’s Solution:** A software-based solution for two processes using a `turn` variable and a `flag` array to coordinate entry.
    
- **Synchronization Hardware:** Single-processor systems can disable interrupts to prevent preemption during shared variable modification . Modern systems use atomic hardware instructions like `test_and_set` or `compare_and_swap`.
    

### **4. Synchronization Tools**

#### **Mutex Locks**

The simplest software tool, short for "mutual exclusion". A process must `acquire()` the lock before entering a critical section and `release()` it afterward .

- **Spinlocks:** A type of mutex where a process "spins" in a loop (busy waiting) until the lock is available, which wastes CPU cycles .
    

#### **Semaphores**

An integer variable `S` accessed through two atomic operations: `wait()` (or P) and `signal()` (or V) .

- **Counting Semaphore:** Value can range over an unrestricted domain.
    
- **Binary Semaphore:** Ranges only between 0 and 1; behaves like a mutex lock.
    
- **Implementation:** To avoid busy waiting, semaphores can use a waiting queue where processes are blocked and then awakened .
    

### **5. Synchronization Challenges**

- **Deadlock:** Two or more processes wait indefinitely for an event that only one of the other waiting processes can cause .
    
- **Starvation:** A process is never removed from the semaphore queue in which it is suspended.
    
- **Priority Inversion:** A higher-priority process must wait for a lower-priority process that holds a required lock .
    

---

### **6. Classic Synchronization Problems**

1. **Bounded-Buffer Problem:** Producers and consumers share a fixed-size buffer. Mutexes protect the buffer, while semaphores track empty and full slots .
    
2. **Readers–Writers Problem:** Multiple readers can access a database at once, but writers must have exclusive access .
    
3. **Dining-Philosophers Problem:** Represents the challenge of allocating multiple resources among several processes without causing deadlock .
    
    - **Remedies:** Limit the number of participants, only pick up chopsticks if both are available, or use asymmetric picking rules (odd/even) .
        

---
