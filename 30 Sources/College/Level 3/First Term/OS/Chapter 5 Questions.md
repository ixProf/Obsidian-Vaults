---
title: "Chapter 5 Questions"
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

- **ل:** If a process must loop repeatedly, keeping the CPU occupied, to wait for a condition, that is called...
    
    - starvation
        
    - deadlock
        
    - **busy waiting**
        
    - mutual exclusion
        
    - **الإجابة الصحيحة:** **busy waiting** .
        
- **السؤال:** What would be the initial value of semaphore "S" when it is used for Mutual Exclusion:
    
    - 0
        
    - -1
        
    - **1**
        
    - 2
        
    - **الإجابة الصحيحة:** **1** .
        
- **السؤال:** What would be the initial value of semaphore "S" when it is used for resource allocation for five resources:
    
    - 1
        
    - **5**
        
    - 0
        
    - -1
        
    - **الإجابة الصحيحة:** **5** .
        
- **السؤال:** In the Readers & Writers problem... what are the initial values of mutex, wrt, and readCount?
    
    - **mutex = 1, wrt = 1, readCount = 0**
        
    - mutex = 1, wrt = 0, readCount = 0
        
    - mutex = 1, wrt = 1, readCount = 1
        
    - **الإجابة الصحيحة:** **mutex = 1, wrt = 1, readCount = 0** .
        
- **السؤال:** In the readers/writers problem we want to allow multiple readers to be in their critical sections for the shared data at the same time.
    
    - **True**
        
    - False
        
    - **الإجابة الصحيحة:** **True** .
        
- **السؤال:** In the readers/writers problem, we want to allow a reader and a writer to be in their critical sections for the shared data at the same time.
    
    - True
        
    - **False**
        
    - **الإجابة الصحيحة:** **False** .
        
- **السؤال:** Critical section is a part of a program where two or more processes assess a shared resource.
    
    - **True**
        
    - False
        
    - **الإجابة الصحيحة:** **True** .
        

---

### **2. من امتحان Final 2021**

- **السؤال:** When several processes access the same data concurrently and the outcome... depends on the order... is called:
    
    - **race condition**
        
    - critical condition
        
    - **الإجابة الصحيحة:** **race condition** .
        
- **السؤال:** If a process is executing in its critical section, then no other processes can be executing in their critical section. What is this condition called?
    
    - **mutual exclusion**
        
    - critical exclusion
        
    - **الإجابة الصحيحة:** **mutual exclusion** .
        
- **السؤال:** Which one of the following is a synchronization tool?
    
    - **semaphore**
        
    - thread / pipe / socket
        
    - **الإجابة الصحيحة:** **semaphore** .
        
- **السؤال:** Which of the following conditions must be satisfied to solve the critical section problem?
    
    - Mutual Exclusion / Progress / Bounded Waiting
        
    - **All of the mentioned**
        
    - **الإجابة الصحيحة:** **All of the mentioned** .
        
- **السؤال:** When high priority task is indirectly preempted by medium priority task... effectively inverting the relative priority... the scenario is called:
    
    - **priority inversion**
        
    - priority exchange
        
    - **الإجابة الصحيحة:** **priority inversion** .
        

---

### **3. من امتحان Final 2025 (الفصل الثاني)**

- **السؤال:** What is the primary purpose of the Test and Set instruction?
    
    - **To provide a hardware-based solution for mutual exclusion.**
        
    - To schedule processes.
        
    - **الإجابة الصحيحة:** **To provide a hardware-based solution for mutual exclusion.** .
        
- **السؤال:** In the Dining-Philosophers Problem, what do the "philosophers" represent?
    
    - **Processes.**
        
    - Shared resources.
        
    - **الإجابة الصحيحة:** **Processes.** .
        
- **السؤال:** In the Dining-Philosophers Problem, what do the "chopsticks" represent?
    
    - **Shared resources.**
        
    - Process states.
        
    - **الإجابة الصحيحة:** **Shared resources.** .
        
- **السؤال:** What is the main challenge in the Dining-Philosophers Problem?
    
    - **Preventing deadlock and starvation.**
        
    - Maximizing CPU utilization.
        
    - **الإجابة الصحيحة:** **Preventing deadlock and starvation.** .
        
- **السؤال:** What is the main constraint in the Readers-Writers Problem?
    
    - **Multiple readers can access... but writers must have exclusive access.**
        
    - Only one process can access at any time.
        
    - **الإجابة الصحيحة:** **Multiple readers can access the resource simultaneously, but writers must have exclusive access.** .
        
- **السؤال:** What is a "spin lock"?
    
    - **A lock that causes a process to repeatedly check a variable until it becomes available.**
        
    - A lock that puts a process to sleep.
        
    - **الإجابة الصحيحة:** **A lock that causes a process to repeatedly check a variable until it becomes available.** .
        
- **السؤال:** What are the two primary operations performed on semaphores?
    
    - **P (wait/acquire) and V (signal/release).**
        
    - Allocate and deallocate.
        
    - **الإجابة الصحيحة:** **P (wait/acquire) and V (signal/release).** .
        

---

### **4. من امتحان Final 2025 (أهلية)**

- **السؤال:** Peterson's solution guarantees:
    
    - Mutual exclusion / Progress / Bounded waiting
        
    - **All of the above**
        
    - **الإجابة الصحيحة:** **All of the above** .
        
- **السؤال:** Peterson's solution is limited to:
    
    - **Two processes**
        
    - Any number of processes
        
    - **الإجابة الصحيحة:** **Two processes** .
        
- **السؤال:** The Producer-Consumer Problem involves:
    
    - **Multiple producers and multiple consumers** (بشكل عام)
        
    - A single producer and a single consumer
        
    - **الإجابة الصحيحة:** **Multiple producers and multiple consumers** .