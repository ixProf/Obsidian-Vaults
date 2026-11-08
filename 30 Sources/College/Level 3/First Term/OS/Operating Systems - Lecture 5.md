---
title: "Operating Systems - Lecture 5"
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

# Scheduling

This detailed summary covers the key concepts of **CPU Scheduling** from the provided lecture materials for the course **CS321: Operating Systems**1.

---

## 1. Core Concepts of CPU Scheduling

CPU scheduling is fundamental to multi-programmed operating systems2. It involves an **alternating sequence** of **CPU bursts** (execution) and **I/O bursts** (waiting for data).

- **CPU Scheduler (Short-term Scheduler):** Selects a process from memory that is ready to execute and allocates the CPU to it.
- **Nonpreemptive vs. Preemptive:** * 
	- **Nonpreemptive:** A process keeps the CPU==until it terminates or switches to a waiting state.==
    
    - **Preemptive:** ==The OS can interrupt a running process.== This can lead to ==**race conditions** if processes share data==, as a process might be ==interrupted while data is in an inconsistent state.==

- **Dispatcher:** The specific module that ==gives control of the CPU to the selected process.== Its functions include ==switching context, switching to user mode, and jumping to the correct location== in the program to restart it.  

---

## 2. Scheduling Criteria

To evaluate scheduling algorithms, the following criteria are used:

- **Maximize:**
	* **CPU Utilization:** Keeping the CPU as ==busy as possible==.
    
    - **Throughput:** The number of processes completed per time unit.
        
- **Minimize:**
    
    - **Turnaround Time:** Total time from ==submission to completion==.
    - **Waiting Time:** Total time spent ==waiting in the ready queue==.
    - **Response Time:** Time from ==submission until the first response== is produced.
        

---

## 3. Scheduling Algorithms

#### A. First-Come, First-Served (FCFS)

- Managed with a ==**FIFO queue**==.
    
- **Pros:** Simple to implement.
    
- **Cons:** Average waiting time is often long. It suffers from the **Convoy Effect**, where small processes wait for one long process to finish.
- **Nature:** Non-preemptive.

#### B. Shortest-Job-First (SJF)

- Assigns the CPU to the process with the **smallest next CPU burst**.
    
- **Pros:** Provably optimal; provides the minimum average waiting time.
    
- **Cons:** Difficult to implement because the length of the next CPU burst is unknown.
	
- **Prediction:** The next burst is often predicted using **exponential averaging** of previous bursts.
    
- **Preemptive SJF:** Also known as **Shortest-Remaining-Time-First**.
    

### C. Priority Scheduling

- A priority is assigned to each process; the CPU goes to the highest priority (often represented by the lowest number).
    
- **Major Issue:** **Starvation** (indefinite blocking) of low-priority processes.
    
- **Solution:** **Aging**, which gradually increases the priority of processes that wait for a long time.
    

### D. Round-Robin (RR)

- Designed for **timesharing systems**.
    
- Each process gets a small unit of CPU time called a **time quantum** (10–100ms).
    
- **Nature:** Preemptive.
    
- **Behavior:** If the quantum is too large, it behaves like FCFS31. If too small, it causes excessive **context switches**.


### E. Multilevel Queue Scheduling

- Partitions the ready queue into separate queues (e.g., Foreground/Interactive vs. Background/Batch).
    
- Each queue can have its own scheduling algorithm.
    
- **Multilevel Feedback Queue:** Allows processes to **move between queues**35. It uses aging to prevent starvation and demotes processes that use too much CPU time to lower-priority queues.


---

## 4. Real-Time Scheduling

- **Soft Real-Time:** Critical processes get preference over non-critical ones but have no absolute guarantee of when they will be scheduled.
    
- **Hard Real-Time:** Stricter requirements where a task **must** be completed by its deadline; missing the deadline is considered a total system failure.
    
