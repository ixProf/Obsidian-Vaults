
# Lec 2

- User Interface can take several forms:
	- Command-Line-Interface (CLI): Which uses text commands
	- Batch Interface: in which commands and directives to control those commands are entered into files, and those files are executed
	- Graphical User Interface (GUI) is most commonly used
- System calls: Provide and interface to services made available by an Operating System. System calls can be grouped roughly into six major categories:
	- Process Control
		- end, abort 
		- load, execute 
		- create process, terminate process
		- get process attributes, set process attributes
		- wait for time 
		- wait event, signal event
		- allocate and free memory
	- File Management:
		- create file, delete file
		- open, close
		- read, write, reposition
		- get file attributes, set file attributes
	- Device Management:
		- request device, release device
		- read, write, reposition
		- get device attributes, set device attributes
		- logically attach or detach devices
	- Information Maintenance:
		- get time or date, set time or date
		- get system data, set system data
		- get process, file, or device attributes
		- set process, file, or device attributes
	- Communications:
		- create, delete communication connection 
		- send, receive messages
		- transfer status information 
		- attach or detach remote devices

---
# Lecture 3

## Process Management

- Process is a ==program in execution==. A process will need certain resources (CPU time, memory, file, I/O Devices) to accomplish its task.
- System consist of a collection of processes
- A process contained only a single thread of control as it ran, most modern operating systems now support processes that have multiple threads

### Process in Memory
![[Pasted image 20260119043929.png]]

## Process state
- New. -> the process is being created
- Running. -> Instructions are being executed
- Waiting. -> The process is waiting for some event to occur (I/O Completion or reception of a signal)
- Ready. -> The process is waiting to be assigned to processor
- Terminated. -> The process has finished execution

![[Pasted image 20260119044352.png]]

### Process Control Block (PCB)

مثال في السريع

تخيل إنك موظف حسابات قاعد على مكتبك، وماسك في إيدك "تقرير الميزانية" وشغال فيه الله ينور. فجأة، التليفون رن.. زبون عايز يسأل على حاجة تانية خالص. عشان لما تخلص المكالمة مترجعش تهرش في دماغك وتقول أنا كنت واقف فين؟، هتعمل الآتي:
1. **حالة المهمة (Process State):** هتكتب في النوتة إن التقرير ده "مركون على جنبه" (**Waiting**) لحد ما تخلص المكالمة.
2. **رقم المهمة (Process Number):** التقرير ده ليه رقم مسلسل، وليكن **"طلب رقم 55"**، عشان ميتلخبطش مع تقارير تانية.
3. **مكان التوقف (Program Counter):** دي أهم حتة، هتحط علامة بالقلم الهايليتر إنك واقف عند **"السطر العاشر"**. ده العنوان اللي هتبدأ منه أول ما ترجع.
4. **المعلومات اللي في دماغك (Registers):** وأنت شغال، كنت لسه جامع (500 + 300) والـ **800** لسه في ذاكرتك "اللحظية". هتقوم كاتب الـ 800 دي في هامش الورقة عشان متطيرش من دماغك وأنت بتكلم الزبون.
5. **الأوراق اللي على المكتب (Memory Limits):** إنت مخصص **"النص اليمين من المكتب"** لورق التقرير ده بس، وممنوع أي ورق تاني يدخل في المساحة دي عشان الدنيا متبوظش.
6. **الأدوات المفتوحة (List of Open Files):** إنت فاتح **"الآلة الحاسبة"** وماسك في إيدك **"الهاليتر"**. دي الأدوات اللي كنت بتستخدمها في اللحظة دي.

الخلاصة **PCB** هو العقل المدبر اللي بيخلي نظام التشغيل (OS) يقدر يعمل **Multitasking** (يشغل كذا برنامج في نفس الوقت) من غير ما الدنيا تخش في بعضها.

من وجهة نظر الOperating System، الPCB هو الـ داتاستراكشر اللي بتمثل العملية (Process).

![[Pasted image 20260119045414.png]]

الـ **PCB** ده هو **"الذاكرة الاحتياطية"** لنظام التشغيل.

- **وظيفته الأساسية:** إنه بيعمل **Freeze لأي برنامج شغال عشان الـ CPU يروح يعمل حاجة تانية.
    
- **لحظة الـ Save:** الـ OS بياخد كل تفاصيل البرنامج (هو واقف فين، معاه داتا إيه، حاجز مكان فين في الرامات) ويرصهم في الـ PCB ده.
    
- **لحظة الـ Load:** لما البرنامج ييجي عليه الدور يشتغل تاني، الـ OS بياخد البيانات من الـ PCB ويرميها في الـ CPU، فالبرنامج "يفوق" ويكمل من غير ما يحس إنه كان واقف أصلاً.

والصورة دي هتوضح الكلام دا

![[Pasted image 20260119045643.png]]

هنا ف ال P0 هتشتغل لحد ما يحصل انتربت لبروسيس تانية P1 مثلا
ف انت هتحفظ حالة ال P0 في PCB بتاعها ف هتوقف تشغيلها مؤقتا وتبدا تحمل حالة ال P1 من ال PCB الخاص بيه ف لما تخلصه وحابب ترجع للبروسيس الاولى هتحفظه في ال PCB بتاعه وتستدعي ال PCB بتاع البروسيس الاولى

---

## Threads

- Threads: is a smallest unit of work inside a process
	- Single-threaded: one task at a time
	- Multi-threaded: multiple tasks at the same time

![[Pasted image 20260119050139.png]]

---

- **Memory Layout**: A process in memory consists of several sections:
    
    - **Text**: The executable code.
    - **Data**: Global variables.
    - **Heap**: Memory ==dynamically== allocated during run time.
    - **Stack**: ==Temporary data== such as function parameters and local variables.
    
- **Process Control Block (PCB)**: The OS represents ==each process using a PCB==, which ==contains the process state, program counter, CPU registers, memory limits, and a list of open files==
---
## Schedulers

Scheduling is the mechanism by which the operating system decides which process or thread gets CPU time and when.

-The OS manages processes using various queues to maximize CPU utilization:

- **Ready Queue**: Processes residing in main memory that are ready and waiting to execute.

- **I/O Queues**: Processes waiting for specific I/O devices.

- **Schedulers**:
    
    - **Short-term (CPU scheduler)**: Selects which ==ready process should execute next==; runs very frequently (==milliseconds==).
		
    - **Long-term (Job scheduler)**: Selects ==processes from a pool to load into memory==; controls the degree of multiprogramming.
        
    - **Medium-term**: Can temporarily remove processes from memory (**swapping**) to ==improve the process mix==.
		- I/O bound process: is one that ==spends more of its time doing I/O== than ==it spend doing computations==
		- CPU-bound process: in contrast, generates I/O requests infrequently, using more its time doing computation
		- Long-term scheduler select a good process mix of I/O bound and CPU bound
		

---
## Operations and Communication

**Creation**: ==Processes can create separate sub-processes==

**Inter-process Communication (IPC)**: Processes ==cooperate to share information and speed up computation==. There are two main models:



- **Shared Memory**: Processes==share a region of memory to exchange data.==

- **Message Passing**: Processes ==communicate by sending and receiving messages through the kernel==
	- Synchronization: Communication between processes ==takes place through calls to send() and receive()== ==primitives==
		- Blocking (Synchronous)
		- Non-blocking (Asynchronous)

- Cooperating processes require an IPC mechanism to allow them to exchange data and information. There are several reasons for providing an environment that allows process cooperation:
	- **Information Sharing**: Since multiple users may be interested in the same piece of information (such as a shared file), the system must provide an environment for concurrent access
		
	- **Computation Speedup**: To make a task run faster, it can be broken into subtasks that execute in parallel. This speedup is only achievable on computers with multiple processing cores
		
	- **Modularity**: Systems can be constructed in a modular fashion by ==dividing functions into separate processes or threads==
		
	- **Convenience**: Individual users often work on many tasks ==simultaneously==, such as editing text, listening to music, and compiling code in parallel.

---




