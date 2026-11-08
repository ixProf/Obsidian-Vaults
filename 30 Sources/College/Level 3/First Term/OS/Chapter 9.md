---
title: "Chapter 9"
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
### **1. Physical Structure of Magnetic Disks**

- **Physical Components**: Disks consist of platters logically divided into circular **tracks**, which are subdivided into **sectors**. A **cylinder** is the set of tracks at a single arm position.
    
- **Mechanism**: A drive motor spins the platters at high speeds (common speeds include 5,400 to 15,000 RPM). Read-write heads are attached to a disk arm that moves all heads as a single unit.
    
- **Performance Metrics**:
    
    - **Transfer Rate**: The speed of data flow between the drive and the computer.
        
    - **Positioning Time (Random-Access Time)**: Sum of **Seek Time** (moving the arm to the cylinder) and **Rotational Latency** (waiting for the sector to rotate to the head).
        
- **Connectivity**: Drives attach via an **I/O bus** (e.g., SATA, USB, Fiber Channel). Data transfers are managed by **controllers** located at both the host end and built into the disk drive.
    

### **2. Solid-State Disks (SSD)**

- **Technology**: SSDs use nonvolatile memory and function like hard drives but have no moving parts.
    
- **Advantages**: They are more reliable, faster (no seek time or latency), and consume less power.
    
- **Disadvantages**: They are more expensive per megabyte than traditional magnetic disks.
    

### **3. Disk Scheduling Algorithms**

The OS manages the order of I/O requests to improve access time and bandwidth.

- **FCFS (First-Come, First-Served)**: Intrinsically fair but generally slow.
    
- **SSTF (Shortest-Seek-Time-First)**: Selects the request closest to the current head position to minimize seek time. While it increases performance, it can cause starvation.
    
- **SCAN (Elevator Algorithm)**: The arm moves from one end of the disk to the other, servicing requests, then reverses direction at the end.
    
- **C-SCAN (Circular SCAN)**: Moves the head from one end to the other, but instead of reversing, it immediately returns to the beginning without servicing requests on the return trip to provide uniform wait times.
    
- **LOOK/C-LOOK**: Variants of SCAN/C-SCAN where the arm only goes as far as the last request in either direction rather than the full width of the disk.
    

### **4. RAID Structure (Redundant Array of Independent Disks)**

RAID uses multiple disks to address performance and reliability.

- **Reliability via Redundancy**: **Mirroring** duplicates every disk so data is not lost if one fails.
    
- **Performance via Parallelism**: **Data Striping** splits data across multiple disks (bit-level or block-level) to increase transfer rates.
    
- **RAID Levels**:
    
    - **Level 0**: Striping without redundancy.
        
    - **Level 1**: Disk mirroring.
        
    - **Level 2**: Memory-style error-correcting codes (ECC).
        
    - **Level 3**: Bit-interleaved parity; uses a single parity bit for error correction.
        
    - **Level 4**: Block-interleaved parity; keeps parity on a separate disk.
        
    - **Level 5**: Block-interleaved distributed parity; spreads data and parity across all disks.
        
    - **Level 6 (P + Q)**: Similar to Level 5 but stores extra redundant information to guard against multiple disk failures.
        

### **5. Practice Problem: SJF Scheduling**

Based on the image provided in your prompt, here is the step-by-step solution for **Shortest Job First (SJF)** scheduling:

1. **Order of Execution**: SJF selects the process with the smallest burst time first.
    
    - **P4** (3)
        
    - **P1** (6)
        
    - **P3** (7)
        
    - **P2** (8)
        
2. **Waiting Time Calculation**:
    
    - **P4**: Starts at 0, Waiting Time = 0.
        
    - **P1**: Starts after P4 finishes (at time 3), Waiting Time = 3.
        
    - **P3**: Starts after P1 finishes (at time 9), Waiting Time = 9.
        
    - **P2**: Starts after P3 finishes (at time 16), Waiting Time = 16.
        
3. **Average Waiting Time**: $(0 + 3 + 9 + 16) / 4 = 7$.
    

Would you like me to explain how to calculate the **Disk Bandwidth** for a specific set of I/O requests using one of the scheduling algorithms mentioned?