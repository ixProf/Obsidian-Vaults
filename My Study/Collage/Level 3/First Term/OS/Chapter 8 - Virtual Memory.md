
**Virtual memory is a technique that allows the execution of processes that are not completely in memory. One major advantage of this scheme is that programs can be larger than physical memory**

- **the entire program is not needed.**

- **Virtual memory involves the separation of logical memory as perceived by users from physical memory.
	- This separation allows an extremely large virtual memory to be provided for programmers when only a smaller physical memory is available.**
	- Only part of the program needs to be in memory for execution
	- Logical address space can therefore be much larger than physical address space
	- Allows address spaces to be shared by several processes
	- Allows for more efficient process creation
	- More programs running concurrently
	- Less I/O needed to load or swap processes
- Virtual address space - Logical view of how process is stored in memory
	- usually start from 0 -> contiguous addresses until end of space
	- physical memory organized in page frames
	- MMU must map logical to physical
- Virtual Memory implemented via:
	- Demand paging
	- Demand Segmentation

---
## Demand Paging

- How to load executable program into memory
- Could entire process into memory at load time
- Or bring a page into memory only when it is needed -> Swap in
	- Less I/O needed
	- Less memory needed
	- Faster response
	- More users -> concurrency
- Similar to paging system with swapping
- Page is needed -> reference to it
	- invalid reference -> abort
	- not-in-memory -> bring to memory
- Lazy swapper -> never swaps page into memory unless page will be needed
	- swapper that deals with pages is a ==pager==

---
## Page Fault

if there's a reference to a page, first reference to that page will trap to operating system -> page fault

1. Operating system looks at another table in PCB to decide:
	- Invalid reference -> about
	- just not in memory
2. Find free frame
3. Swap page into frame via scheduled disk operation
4. Reset tables to indicate page now in memory set validation bit = v
5. Restart the instruction that caused the page fault
--- 
### Aspects of Demand Paging

- Extreme case - start process with no pages in memory
	- OS sets instruction pointer to first instruction of process, non-memory-resident -> page fault
	- For every other process pages on first access 
That called
- Pure demand paging: never bring a page into memory until it is required.

- Actually, a given instruction could access multiple pages -> multiple page fault
- Programs tend to have ==locality of reference.==

- The hardware to support demand paging is the same as the hardware for paging and swapping:
	- **Page table**: This table has the ability to mark an entry invalid through a valid–invalid bit or a special value of protection bits.
		
	- **Secondary memory**: This memory holds those pages that are not present in main memory. The secondary memory is usually a high-speed disk. It is known as the swap device, and the section of disk used for this purpose is known as swap space.**
	- Instruction restart

---

## Performance of demand paging

- Page Fault Rate 0 <= p <= 1
	- p = 0 -> no page faults
	- p = 1 -> every reference is a fault -> pure demand
- Effective access time -> EAT
	- (1-p) x memory access + p (page fault overhead + swap page out + swap page in)

---

## Page Replacement

- operating system determines that desired page is residing on the disk (invalid) but finds that there are no free frames
- modify page-fault service routing to include page
- use modify bit (dirty bit) to reduce overhead of page transfers - only modified pages are written back to disk
- Page replacement completes separation between logical memory and physical memory - large virtual memory can be provided on smaller physical memory

### Basic page Replacement:

1. Find the location of the desired page on disk
2. Find a free frame:
	- If there's a free frame, use it
	- if there's no free frame, use a page replacement algorithm to select a victim frame
		- Write victim frame to disk if dirty
3. Bring the desired page into the (newly) free frame
4. Continue the process by restarting the instruction that caused the trap
---
### Page and frame replacement algorithms

- Frame-allocation algorithm
	- How many frames to give each process
- Page-replacement algorithm
	- Which frames to replace
	- want lowest page-fault rate on both first access and re-access
- Evaluate algorithm y running it on a particular string of memory reference and computing the number of page faults on that string
	- String is just page numbers, not full address
	- repeated access to the same page doesn't   
	- Results depend on number of frames available

==Graph of page faults versus number of frames== there's inverse relationship between them

 ---
#### FIFO (FIRST-IN-FIRST-OUT)

7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1

 - When i replacement i will replacement the first added 
![[Pasted image 20260121004353.png]]

number of changes = number of page faults = 15 page faults


 **Notice that** the number of faults for four frames (ten) is greater than the number of faults for three frames (nine)! This most unexpected result is known as ==Belady’s anomaly==: for some page-replacement algorithms, the page-fault rate may increase as the number of allocated frames increases.
![[Pasted image 20260121004604.png]]

---

#### Optimal Algorithm (Best case)

- Replace page that will not be used for longest period of time

7   0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1
(7)
 
شرح عربي : هنختار الاقل ظهورا في المستقبل بعد الرقم الي هيتم إضافته ولو اتنين ظهورهم متاسوي نختار اقدمهم

![[Pasted image 20260121010527.png]]

هنا موضحة شوية

---
#### Least Recently Used (LRU) Algorithm

- Use past knowledge rather than future
- Replace page that has not been used in most amount of time
- Associate time of last use with each page
- Generally good algorithm and frequently used

![[Pasted image 20260121014043.png]]

**How to Implementation LRU?**

- Counter implementation
	- Every page entry has counter
		- every time page is referenced through this entry, copy the clock into the counter
	- when a page needs to be change, look at the counters to find smallest value
		- search through table needed
- Stack implementation
	- Keep a stack of page numbers in a double link form:
		- page referenced
			- move it to the top
			- requires 6 pointers to be changed
	- but each update more expensive
	- no search for replacement, LRU page is in tail of the list

LRU and OPT are cases of stack algorithms that don't have Belady's anamoly

##### LRU Approximation Algorithms

- LRU needs special hardware and still slow

- Reference bit
	- with each page associate a bit, initially = 0;
	- when page is referenced bit set to 1
	- Replace any with reference bit = 0 (if one exists)
		- we don't know the order
- Second-chance algorithm
	- Generally FIFO, plus hardware-provided reference bit
	- Clock replacement
	- If page to be replaced has
		- Reference bit = 0 -> replace it
		- reference bit = 1 then:
			- set reference bit 0, leave page in memory
			- replace next page, subject to same rules

---
## Allocation of Frames

- Each process needs minimum number of frames
- when page fault occurs before an executing instruction is complete, the instruction must restart
	- must have enough frames to hold all different pages that any single instruction can reference
- Maximum is total frames in the system
- Allocation Schemes:
	- Equal Allocation
	- Proportional Allocation
	- Priority Allocation

### Equal Allocation

Allocate frames and partition it on process equality

100 frame and 5 process -> each process has 20 frames

*Keep some as free frame buffer pool*

### Proportional Allocation
 
Allocate according to the size of process
- Dynamic as degree of multiprogramming, process sizes change

	- Si = size of process Pi
	- S = ${\sum}si$
	-  m = total number of frames
	- ai = allocation for pi = $\frac{S{i}}{S} \times m$

m - 62
s1 - 10
s2 - 127
a1? = 10/137 x 62 = 4
a2 = 127/137 x 62 = 57

---

## Global Replacement vs Local Replacement

- Global replacement: allows a process to select a replacement frame from the set of all frames, even if that frame is currently allocated to some other process
	
- Local replacement: each process selects from only its own set of allocated frames
	- possibly underutilized memory

---

## Trashing

A process is thrashing if it is spending more time paging than executing (process that does not have “enough” frames).

Why demand paging work?
- Locality model
	- process migrates from one locality to another
	- localities may overlap
- Why thrashing occur?
	- Summation of size of locality > total memory size
		- limit effects by using local or priority page replacement - thrashing cannot steal frames from other processes, causing them to thrash

---

## Working-Set Model

$\triangle$ = working set window = Fixed number of page references

WWS = total number of pages referenced in the most recent $\triangle$

if
- $\triangle$ too small -> will not encompass entire locality
- $\triangle$ too large will encompass serval localities
- $\triangle$ = infinite -> will encompass entire program

- D = $\sum{WSS{i}}$ = total demand frames
	- if D > m -> trashing

---

## Page-fault frequency

More direct approach than WSS

- Page-Fault-Frequency (PFF) rate and use local replacement policy
	- if actual rate too low -> process loses frame
	- if actual rate too high -> process gains frame

![[Pasted image 20260122041626.png]]

![[Pasted image 20260122041606.png]]