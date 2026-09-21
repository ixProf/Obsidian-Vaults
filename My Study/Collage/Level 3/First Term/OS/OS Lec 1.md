
# introduction

## Operating System
- **is a Program that manages a Computer's hardware**
- **Operating Systems are designed to be ==convenient and efficient==**
- Operating System is an ==intermediary== between the software and hardware
![[Pasted image 20251215214906.png]]

---
### What's the role of Operating System?
- User View:
	- the OS is designed for ease of use with some attention paid to ==Performance== and none paid to resource utilization
- System View:
	- OS is a resource allocator
		- manages all resources
		- Decides between conflicting requests for efficient and fair resource use
	- OS acts as the manager of the resources of Computer system like : CPU time, memory space , file-storage, I/O devices....
		- Controls execution of programs to prevent errors and improper use of the computer

One Program running at all times on the computer called ==Kernal==

- Kernel:
	- System Programs: Which are associated with the operating system but ==are not necessarily part of the Kernal==
	- Application Programs: Which include all programs ==not associated with the operation of the system==
---
## Computer System Organization:

- One or more CPU 
- Disk Controller
- USB Controller
- Graphic adapter
- Connected through a common bus that provides access  to shared memory
![[Pasted image 20251215221433.png]]

### Computer Startup:
- Bootstrap : program is loaded at power-up or reboot
	- Stored in ROM or EPROM (electrically erasable programmable read-only memory) -> Firmware
	- Initializes all aspects of system.
	- Loads operating system kernal and starts execution

### Interrupts:

- The occurrence of an event is usually signaled by interrupt 
- Signals that tell the CPU to stop its current Task and handle something important
- interrupt transfers control to the interrupt service routine through the ==interrupt vector== which contains the addresses of all the service routines.
- Interrupt architecture must save the address of interrupted instruction

There's two types of interrupts:
- Hardware interrupts
	- Come from Devices : data from hard disk , press a key from keyboard, click a mouse and packet arrives from network
- Software interrupts
	- Come form programs : System calls and exception
**OS is known as interrupt driven**

## Storage Structure:

- Storage systems hierarchy:
	- Speed
	- Cost
	- Volatility

![[Pasted image 20251215223333.png]]

**Fast Recap**:

- The smallest unit of computer storage is the **bit**, which can be either **0 or 1**.
    
- All data in a computer (numbers, text, images, videos, programs, etc.) is represented using ==**collections of bits**.==
    
- A **byte** equals **8 bits** and ==is the smallest practical unit of storage on most computers.==
    
- A **word** is the native data size of a computer’s architecture, made of one or more bytes (e.g., 64-bit = 8 bytes), and many operations are performed at this size.
    
- Computer storage and data handling are usually measured in **bytes**, while **network speeds** are measured in **bits**.
    
- Storage units are based on powers of 1024:
    
    - 1 KB = 1,024 bytes
    - 1 MB = 1,024² bytes
    - 1 GB = 1,024³ bytes
    - 1 TB = 1,024⁴ bytes
    - 1 PB = 1,024⁵ bytes
        
- Manufacturers often approximate these units using powers of 10 (e.g., 1 MB ≈ 1 million bytes).

## How a Modern Computer Works?

![[Pasted image 20251215224906.png]]

 الرسمة دي بتشرح إيه باختصار؟

بتشرح **إزاي الكمبيوتر بيشتغل من جوا**  
يعني:

- المعالج (CPU)
- الذاكرة (Memory)
- الأجهزة (زي الهارد والكيبورد)

بيتكلموا مع بعض إزاي علشان البرنامج يشتغل.

1. البرنامج شغال على الـ CPU
	- البرنامج عبارة عن **Thread of execution**
	- الـ CPU بينفذ أوامر واحدة واحدة

 2. الـ CPU يطلب داتا
	- البرنامج يقول:
    
	    - "هاتلي الداتا من الهارد"
        
	- الـ CPU يبعت **I/O Request** للجهاز (الهارد)

3. الجهاز يبدأ يشتغل
	- الهارد يروح يقرأ الداتا
	- الـ CPU **مش لازم يفضل واقف مستني**
    
4. نقل الداتا (طريقتين)
-  الطريقة العادية
	- الجهاز يبعت الداتا للـ CPU
	- الـ CPU ينقلها للذاكرة
	
- الطريقة السريعة (DMA)
	- الجهاز ينقل الداتا **مباشرة للذاكرة**
	- الـ CPU فاضي يكمل شغل تاني

 عشان كده السهم رايح من الجهاز للذاكرة باسم **DMA**
5. الجهاز يخلّص ويبعت Interrupt
	- الهارد يقول للـ CPU:
	    - "خلصت القراءة"
	- ده اسمه **Interrupt**

6. الـ CPU يرجع يكمل
	- الـ CPU يتعامل مع الداتا اللي اتحطت في الذاكرة
	- البرنامج يكمل شغله طبيعي
 
- طيب ليه كل ده مهم؟
	- الـ CPU ميضيعش وقته مستني
	- الأداء يبقى أسرع
	- كذا برنامج يشتغلوا مع بعض

---
## Operating-System Operations 

- Interrupt Driven
	- Hardware Interrupt by one of the devices
	- Software Interrupt (Exception)
		- Software Error (ex: division by zero)
		- Request for operating system service
- Dual-mode Operation: allows OS to protect itself and other System Components
	- User mode
	- Kernel mode (supervisor mode, system mode, or privileged mode)
- Mode Bit : this a bit added to the hardware of the computer to indicate the current mode:
- if Mode bit = 1 : you in user mode
- if Mode bit = 0 : you in Kernel mode
-  Transition from user to kernel mode
![[Pasted image 20251216014604.png]]
---
## Process Management

- Program is a passive entity
- Process is an active entity
- A program becomes a process when it is loaded into and executed

- The Operating System is responsible for:
	- Scheduling Processes and threads on the CPU (What's threads ?):
		- Threads: is a smallest unit of work inside a process
			- Single-threaded: one task at a time
			- Multi-threaded: multiple tasks at the same time
		-   Scheduling = CPU time management
			- Scheduling is the mechanism by which the operating system decides which process or thread gets CPU time and when.
	- Creating and deleting user and system processes
	- Suspending and resuming processes
	- process synchronization to avoid conflict
	- Process Communication (IPC)
---
## Memory Management

- Main Memory (RAM): is a large array of bytes
- Each byte has a unique address
- Memory is shared between the CPU and I/O Devices

- The OS is responsible for:
	- Tracking which memory parts are used and by whom
	- Deciding which processes or data move in and out of memory
	- Allocating Memory to processes
	- Deallocating Memory when no longer needed

---
## Storage Management:
- File-System Management:
	- The OS handles
		- Creating and deleting files
		- Creating and deleting directories
		- Supporting file and directory operations
		- Mapping files to secondary storage
		- Backing Up files on stable storage
- Mass-Storage Management:
	- The OS manages:
		- Free-space management
		- Storage allocation
		- Disk scheduling

---

## Caching
![[Pasted image 20251216025517.png]]

- Cache coherency means keeping all copies of the same data consistent when that data exists in multiple places in a memory hierarchy.

![[Pasted image 20251216025745.png]]

مثال بسيط (زي اللي في السؤال):

عندنا رقم صحيح **A**:

- موجود في **ملف B**
- والملف B متخزن على **الهارد**
الخطوات:


 1. من الهارد للرام
ال OS:
- ينقل الجزء اللي فيه **A** من الهارد إلى **الرام**
كده **A موجود في مكانين**:
- الهارد
- الرام

1. من الرام للكاش
علشان التنفيذ يبقى أسرع:
- البروسيسور ينقل **A** إلى **للكاش**

كده **A موجود في 3 أماكن**:
- الهارد
- الرام
- الكاش

3. من الكاش للريجيستر
قبل التنفيذ:

- **A يتنسخ في Register** جوه الـ CPU

 كده **A موجود في 4 أماكن**:
- الهارد   
- الرام
- الكاش
- الريجيستر

- زيادة قيمة A
البروسيسور:
- يزود **A + 1** في الريجيستر
المشكلة:
- القيمة الجديدة موجودة **بس في الريجيستر**
- باقي النسخ (الكاش – الرام – الهارد) لسه بالقيمة القديمة

هنا بقى المشكلة
**أنهي نسخة هي الصح؟**
لو برنامج تاني قرأ **A** من الرام أو الكاش:

- هيقرأ قيمة **قديمة**
- وده يسبب أخطاء
دي اسمها **Cache Coherency Problem**
---

## Protection and Security

- Protection– any mechanism for controlling access of processes or users to resources defined by the OS.
- Security– defense of the system against internal and external attacks

---

## Virtualization

- Is a technology that allows operating systems to run as applications within other operating systems.

- OS natively compiled for CPU, running guest OSes also natively compiled:
	- Consider VMware running WinXP guests, each running applications, all on native WinXP host OS
	- VMM (Virtual Machine Manager) Provides virtualization Services

---

## Cloud Computing

Cloud computing is a type of computing that provides **computing power, storage, and applications as services over the Internet** instead of using local machines.

Example: **Amazon EC2** offers thousands of servers, millions of virtual machines, and huge amounts of storage to users worldwide.

### Types of Cloud Computing:

- **Public Cloud**: Available to anyone on the Internet who pays for the service.
    
- **Private Cloud**: Used by a single company for its own purposes.
    
- **Hybrid Cloud**: Combines both public and private cloud services.
    

### Cloud Service Models:

- **SaaS (Software as a Service)**: Applications delivered over the Internet (e.g., word processors, spreadsheets).
    
- **PaaS (Platform as a Service)**: A ready-to-use software platform for application development (e.g., database servers).
    
- **IaaS (Infrastructure as a Service)**: Computing resources like servers or storage provided online.
    

---

## Real-Time Embedded Systems

Embedded systems are the **most common type of computers** and are found in many everyday devices such as cars, robots, DVD players, and microwave ovens.

These systems usually run **real-time operating systems (RTOS)**.

A real-time system must complete its tasks within **strict time constraints**.  
If processing does not finish within the specified time, the system **fails**.

---

## Open-Source Operating Systems

Open-source operating systems provide access to their **source code**, allowing users to view, modify, and distribute it.

- **Linux** is the most popular open-source operating system.
    
- **Microsoft Windows** is a **closed-source** operating system.
    
- **Mac OS X and iOS** follow a **hybrid model**:
    
    - They use an open-source kernel called **Darwin**
        
    - But include proprietary (closed-source) components.
        

- **Cloud Computing**: Computing resources delivered as services over the Internet.
    
- **Embedded Systems**: Computers designed for specific tasks with real-time constraints.
    
- **Open-Source OS**: Operating systems with publicly available source code.
    
