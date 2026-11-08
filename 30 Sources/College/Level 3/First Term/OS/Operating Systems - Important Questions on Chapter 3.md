---
title: "Operating Systems - Important Questions on Chapter 3"
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

### **أسئلة من امتحان Final 2021**

- **السؤال:** In operating system, each process has its own
    
    - address space and global variables
        
    - open files
        
    - pending alarms, signals, and signal handlers
        
    - all of the mentioned
        
    - **الإجابة الصحيحة:** **all of the mentioned** .
        
- **السؤال:** What is interprocess communication?
    
    - communication within the process
        
    - communication between two processes
        
    - communication between two threads of same process
        
    - none of the mentioned
        
    - **الإجابة الصحيحة:** **communication between two processes** .
        
- **السؤال:** What is the degree of multiprogramming?
    
    - the number of processes in the ready queue
        
    - the number of processes in the I/O queue
        
    - the number of processes executed per unit time
        
    - the number of processes in memory
        
    - **الإجابة الصحيحة:** **the number of processes in memory** .
        
- **السؤال:** When the process issues an I/O request
    
    - It is placed in an I/O queue
        
    - It is placed in a waiting queue
        
    - It is placed in the Job queue
        
    - It is placed in the ready queue
        
    - **الإجابة الصحيحة:** **It is placed in a waiting queue** (أو **I/O queue**) .
        
- **السؤال:** What is a long-term scheduler?
    
    - It selects processes which must be brought into the ready queue
        
    - It selects processes which must be executed next and allocates CPU
        
    - It selects processes which must be removed from memory by swapping
        
    - None of the mentioned
        
    - **الإجابة الصحيحة:** **It selects processes which must be brought into the ready queue** .
        
- **السؤال:** What is a short-term scheduler?
    
    - It selects which process must be brought into the ready queue
        
    - It selects which process must be executed next and allocates CPU
        
    - It selects which process must be removed from memory by swapping
        
    - None of the mentioned
        
    - **الإجابة الصحيحة:** **It selects which process must be executed next and allocates CPU** .
        
- **السؤال:** Suppose that a process is in "Blocked" state waiting for some I/O service. When the service is completed, it goes to the
    
    - Suspended state
        
    - Terminated state
        
    - Running state
        
    - Ready state
        
    - **الإجابة الصحيحة:** **Ready state** .
        
- **السؤال:** A process is selected from the .......... queue by the .......... scheduler, to be executed
    
    - ready, long term
        
    - ready, short term
        
    - blocked, short term
        
    - wait, long term
        
    - **الإجابة الصحيحة:** **ready, short term** .
        

---

### **أسئلة من امتحان Final 2023**

- **السؤال:** Context switching is part of
    
    - Interrupt servicing
        
    - Interrupt handling
        
    - Polling
        
    - Spooling
        
    - **الإجابة الصحيحة:** **Interrupt handling** .
        
- **السؤال:** .......... executes most frequently and makes the fine-grained decision of which process to execute the next.
    
    - Long-term scheduling
        
    - Medium-term scheduling
        
    - Short-term scheduling
        
    - None of the above
        
    - **الإجابة الصحيحة:** **Short-term scheduling** .
        
- **السؤال:** The kernel keeps track of the state of each task by using a data structure called.......
    
    - process control block
        
    - user control block
        
    - memory control block
        
    - hardware control block
        
    - **الإجابة الصحيحة:** **process control block** .
        
- **السؤال:** Scheduling is done so as to
    
    - increase CPU utilization
        
    - decrease CPU utilization
        
    - keep the CPU more idle
        
    - none of the mentioned
        
    - **الإجابة الصحيحة:** **increase CPU utilization** .
        

---

### **أسئلة من امتحان Final 2025 (أهلية)**

- **السؤال:** An I/O-bound process is a process that:
    
    - Spends more time waiting for I/O operations than executing CPU instructions.
        
    - Spends more time executing CPU instructions than waiting for I/O operations.
        
    - Spends equal amounts of time on I/O and CPU operations.
        
    - Does not perform any I/O operations.
        
    - **الإجابة الصحيحة:** **Spends more time waiting for I/O operations than executing CPU instructions.** .
        
- **السؤال:** Which of the following is NOT an Interprocess Communication (IPC) mechanism?
    
    - Shared Memory
        
    - Message Passing
        
    - Threads
        
    - **الإجابة الصحيحة:** **Threads** (لأن الخيوط تكون داخل العملية الواحدة وليست آلية اتصال "بين" العمليات المستقلة) .
        

---

### **أسئلة من نموذج "Questions - Operating Systems"**

- **السؤال:** What is a short-term scheduler?
    
    - It selects which process must be brought into the ready queue
        
    - It selects which process must be executed next and allocates CPU
        
    - It selects which process must be removed from memory by swapping
        
    - None of the mentioned
        
    - **الإجابة الصحيحة:** **It selects which process must be executed next and allocates CPU** .
        
- **السؤال:** Suppose that a process is in "Blocked" state waiting for some I/O service. When the service is completed, it goes to the
    
    - Suspended state
        
    - Ready state
        
    - Terminated state
        
    - Running state
        
    - **الإجابة الصحيحة:** **Ready state** .
        

---

**ملاحظة:** بناءً على المحاضرة ، العملية هي "كيان نشط" (Active Entity) والـ PCB هو المسؤول عن حفظ حالتها، وعند انتهاء انتظارها لـ I/O تنتقل دائماً إلى طابور الجاهزية (Ready Queue) لتنتظر دورها في المعالج.