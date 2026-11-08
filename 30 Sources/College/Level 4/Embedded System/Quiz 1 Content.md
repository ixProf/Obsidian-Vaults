---
title: "Quiz 1 Content"
aliases: []
type: source
status: active
domain: computer-science
tags: [source, computer-science, course]
created: 2026-10-04
updated: 2026-10-05
source:
related: []
---

- Compiler: Takes source code and translate it  into a LL Form that can eventually be executed by the computer

- Assembler: Takes assembly language instruction and converts them into machine code

- Linker:  Combines the objecct files produced during compilation with other object files and libraries

- Loader: Prepares the executable program to run

---

Von Neumman computer architecture?

computer design where instructions and data are stored in the same memory space. This means the CPU fetches both instructions and data from the same  memory

Components
- CPU
- Memory
- I/O Devices
![[Pasted image 20261004202955.png]]


CPU is a Central Processing Unit is Responsible for executing instructions and Processing data

Contains:
- Registers: Small and Very fast storage locations inside the CPU
	- Temporarily hold data, instructions, adresses, and intermediate results during execution
	- General Purpose: Used to store temporary data and intermediate result 
	- Special Purpose: For Specific CPU Operations
		- PC (Program counter): ==Holds the address of the next instructions to be executed==
		- IR (Instruction Register): ==Holds the current instruction being executed==
		- MAR (Memory Address Register)==: Holds the address of the memory location to access==
		- MDR (Memory Data Register): ==Holds data being transferred to or from memory==
- ALU (Arithmetic Logic Unit)
	- Performs arithmetic and logical operations such as addition, subtraction, comparison, and logical operations.
- CU (Control Unit)
	- Controls and **coordinates the operations of the CPU.** 
	- It ==fetches and decodes instructions and sends control signals== to the other components.

Memory stores the instructions and data that CPU needs while running programs

The Main Memory (RAM) Provides fast access to data but loses its contents when the computer is turned off

Difference Between RAM and Registers ?

- RAM : Stores data and instructions nedded by the CPU while programs are running. Larger and slower than registers
- Registers : Very small and Extremely fast storage locations inside the CPU that hold data, instructions, addresses, or intermediate result currently being processed

---

How data intercation in Memory

1. Instructions and data that needed while program executed stored in RAM
2. Memory divided into storage location and each location has a unique address
3. Special Purpose Register (MAR , MDR) used by CPU to Communicate with RAM (How)
	1. MAR: Holds address of Memory location that CPU wants to access
	2. MDR: Holds the data being transferred from CPU to Memory
4. System Buses this is the way that CPU and Memory communicate through 
	1. Address Bus: Carries memory address from CPU to Memory
	2. Control Bus: Carries control signals such as read and write
	3. Data Bus: Carries data between the CPU and Memory in both direction <->

Read Cycle:
- CPU Places the memory address in the MAR
- CU sends a Read Signal
- Memory Sends the requested data through Data bus to MDR
- CPU transfers the data from MDR to Required Register

Write Cycle
- CPU Places the memory address in MAR
- CPU places the data in MDR
- CU sends a Write Signal
- Memory stores the data in the specific address

---
Instruction cycle spreade into 2 cycles
- Fetch 
	- Retrieving the next instruction from memory and placing it inside the cpu
	- Steps
		- PC to MAR
			- PC contains the address of the next instruction to be executed 
			- The Address copied to the MAR
		- Memory Read
			- CU sends a Read Signal to memory
			- Memory uses the address in the MAR to Find the required instruction
		- Memory to MDR
			- The instruction is transferred from memory through the data bus to MDR
		- MDR to IR
			- The instruction is copied from the MDR to the IR
			- The IR now holds the current instruction that the CPU needs to execute.
		- PC Increment
			- PC is updated to point to the next instruction 
			- The increment depends on the instruction size and the architecture 
- Execution
	- The process of interpreting and performing the instruction stored in the IR
	- Steps
		- Decode
			- CU reads the instruction stored in the IR and decodes it to determine what operation is required
		- Execute
			- CPU performs the required operation
				- ALU performs arithmetic or logical operations
				- Registers may be used to store or transfer data
				- Memory may be accrssed if the instruction requires data from memory
				- Data may be written back to a register or memory
		- Store Result
			- If the instruction produces a result, the result is stored in the required register or memory location.

IF YOU REPEATE THIS PROCESSES ?
IT CALLED ==Instruction Cycle==

---
RISC — ==Reduced Instruction Set ==Computer

Architecture that uses a ==**small and simple set of instructions**==. Each instruction is usually designed to perform a simple operation and execute quickly.

CISC — ==Complex Instruction Set Computer==

Architecture that uses a ==**large and more complex set of instructions**==. A single instruction can perform several operations, potentially reducing the number of instructions needed for a task.

|RISC|CISC|
|---|---|
|Small, simple instruction set|Large, complex instruction set|
|Instructions are usually simple|Instructions can perform complex operations|
|Usually fixed-length instructions|Often variable-length instructions|
|Easier to pipeline|More complex to pipeline|
|More instructions may be needed|Fewer instructions may be needed|
|Hardware is generally simpler|Hardware is generally more complex|
|Example: **ARM, RISC-V**|Example: **x86**|

**MIPS** is a simple processor architecture commonly used for learning computer architecture and how software interacts with hardware.

MIPS Follows the RISC architecture
- Uses a relatively small set of simple instructions
- Instructions have a simple and regular structure
- Easier to understand and study compared to complex architectures such as **Intel x86 (CISC)**.
- Useful for understanding how instructions are executed inside a processor.

---
Instruction Types
- Data Processing: for arithmetic and logical operations 
	- `add` works with registers
	- `sub`
	- `addi` uses an immediate value
- Memory Transfer: used to move data between registers and memory
	- `lw` Load word: Memory -> Register
	- `sw` Store Word: Register -> Memory
- Flow Control
	- `beq`: conditional branching that branch if two register are equal
	- `bne`: conditional branching that branch if two registers are not equal
	- `j`: Jump to another address -> Uncondtional  branching

--- 
MIPS Instruction Formats

MIPS instruction is 32 bit long and divided into different fields depending on the type of instruction

There's 3 Main Instruction formats:

1. R-Type
	- Used Mainly for operations between registers
		- `add $t0, $t1, $t2`
			- Opcode: 6 bits
			- rs t0 5bits first source register
			- rt t1 5bits second source register
			- rd t2 5bits destination register
			-  shamt: 5 bits - shift amount
			- funct: 6 bits - specifies the operation
2. I-Type (Immediate):
	- Used for:
		- Immediate Opeations such as `addi`
		- Memory Operations such as `lw` and `sw`
		- Conditional Branching `beq` and `bne`
3. J-Type 
	- Used for jumb instructions such as `j`

- `add $t0, $t1,$t2` is R-Type, Register-to-Register Arithmetic Operation
- `lw $s0, 4($t1)` I-type, Uses a register + immediate offset
- `j loop_start`  J-Type, Jump instruction using a target address
- `beq $t0,$t1, exit` I-Type, Branch instruction with an immediate/offset
- `slt $s1, $s2,$s3` , Compares two registers and stores the result in a register

---

**Question:**  
In C, you access an array `A` using `A[5]`. If the base address of array `A` is 1000, explain how Displacement Addressing (Base + Offset) is used to fetch the 5th element.

**Answer:**

Displacement Addressing calculates the **effective address** by adding the base address to the offset.

$\text{Effective Address} = \text{Base Address} + \text{Offset}$

Assuming each element occupies **4 bytes**:

$\text{Offset} = 5 \times 4 = 20 \text{ bytes}$

Therefore:

$\text{Effective Address} = 1000 + 20 = 1020$

**Answer: The address of `A[5]` is 1020.**

> **Note:** In C, `A[5]` is actually the **6th element** because array indexing starts from 0. The 5th element is `A[4]`.

---


**Question:**  
In the Von Neumann architecture, both instructions and data travel over the same bus. ==How does this “bottleneck” affect performance as CPU== speeds increase?

**Answer:**

The **Von Neumann bottleneck** occurs because ==instructions and data share the same communication bus==.

As the ==CPU becomes faster, it can process instructions faster than the memory system can provide instructions and data.== Therefore, ==the CPU may have to **wait for memory transfers**.==

This reduces the overall performance of the system and prevents the CPU from operating at its full potential.

**In short:**  
A ==faster CPU increases the demand for memory access==, but the ==shared bus limits the amount of data and instructions that can be transferred== at the same time.

---


**Question:**  
Describe the steps that transform a program written in a high-level language such as C into a representation that is directly executed by a computer processor.

**Answer:**

The main steps are:

1. **Preprocessing:**  
    Processes preprocessor directives such as `#include` and `#define`.
    
2. **Compilation:**  
    Translates the high-level source code into **assembly language**.
    
3. **Assembly:**  
    Converts the assembly code into **machine code/object code**.
    
4. **Linking:**  
    Combines the object files with required libraries to create an **executable file**.
    
5. **Loading:**  
    Loads the executable program into **main memory (RAM)** so that the CPU can execute it.
    

**Flow:**

$\text{C Source Code} \rightarrow \text{Preprocessing} \rightarrow \text{Assembly} \rightarrow \text{Object Code} \rightarrow \text{Executable} \rightarrow \text{Loading}$

---

# Q18) Frame Size and Network Transmission

**Question:**  
Assume a color display uses 8 bits for each of the primary colors (red, green, blue) per pixel, and a frame size of **1280 × 1024**.

### (a) What is the minimum size in bytes of the frame buffer to store a frame?

Each pixel has 3 colors:

- Red = 8 bits
    
- Green = 8 bits
    
- Blue = 8 bits
    

Therefore:

$8+8+8=24\text{ bits/pixel}$

Number of pixels:

$1280\times1024=1,310,720\text{ pixels}$

Total number of bits:

$1,310,720\times24=31,457,280\text{ bits}$

Convert bits to bytes:

$\frac{31,457,280}{8}=3,932,160\text{ bytes}$

**Answer:**

$\boxed{3,932,160\text{ bytes}}$

Approximately:
$\boxed{3.75\text{ MiB}}$

---

### (b) How long would it take to send the frame over a 100 Mbit/s network?

Network speed:
$100\text{ Mbit/s}=100,000,000\text{ bits/s}$

Transmission time:

$T=\frac{\text{Frame Size}}{\text{Network Speed}}$ 
$T=\frac{31,457,280}{100,000,000}$
$T=0.3145728\text{ seconds}$

Therefore:

$\boxed{T\approx0.315\text{ seconds}}$