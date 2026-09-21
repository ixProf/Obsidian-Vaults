
### **1. The Core Philosophy: What is Automata?**

Automata Theory is the study of ==**abstract computing devices** and **formal languages**.== It asks the most fundamental question in Computer Science: _What are the theoretical limits of what a computer can do?_

- **Abstract Machine**: A model that simplifies a computer to its essential logical components (Input, Control Unit, and Storage).
    
- **Formal Language**: ==A set of strings governed by specific rules (Grammar)==. Automata are the "tools" used to recognize if a string belongs to a language.
    

---

### **2. The Hierarchy of Computation (Memory vs. Power)**

The lecture emphasizes that the =="power" of a machine== is defined by ==its **temporary memory**==. Without memory, a machine cannot "remember" what it saw in the past to make future decisions.

### Models of Computation (Types of Automata)**

Automata are classified based on their **temporary memory**:

- **Finite Automata (FA)**: Have **no temporary memory**. They have low computing power, used for simple tasks like ==vending machines.==
    
- **Pushdown Automata (PDA)**: Use a **Stack** (LIFO - Last In, First Out). They have medium power and are used in ==programming language compilers==.
    
- **Turing Machines (TM)**: Use **Random Access Memory**. They possess the highest computing power and can implement any algorithm

| **Model**                   | **Memory Type**          | **Power** | **Description**                                                                                             |
| --------------------------- | ------------------------ | --------- | ----------------------------------------------------------------------------------------------------------- |
| **Finite Automata (FA)**    | **None**                 | Lowest    | Can only remember which "state" it is currently in. It cannot count or store data.                          |
| **Pushdown Automata (PDA)** | **Stack** (LIFO)         | Medium    | Can remember items in a Last-In-First-Out (LIFO) manner. Used to parse balanced parentheses or nested code. |
| **Turing Machine (TM)**     | **Random Access (Tape)** | Highest   | Can read/write anywhere ==on an infinite tape==. This is the mathematical equivalent of a modern computer.  |

![[Pasted image 20260402152129.png]]

---

### **3. Mathematical Language & Definitions**

To build these machines, we use a specific mathematical vocabulary:

#### **A. Alphabets and Strings**

- **Alphabet ($\Sigma$):** A finite, ==non-empty set of symbols.==
    
    - _Example:_ $\Sigma = \{0, 1\}$ (Binary) or $\Sigma = \{a, b, c, ..., z\}$ (English).

- **String ($w$):** A finite sequence of symbols chosen from $\Sigma$.
    
- **Length ($|w|$):** The number of symbols in a string.
    
    - _Crucial Detail:_ The **Empty String ($\lambda$ or $\epsilon$)** has a length of 0 ($|\lambda| = 0$).
        
- **$\Sigma^*$ (Kleene Star):** The set of ==**all possible strings** over an alphabet, including the empty string $\lambda$.== It is always an infinite set.
    

#### **B. Languages**

- **Definition:** A language $L$ is a subset of $\Sigma^*$.
    
- **Empty Language ($\emptyset$):** A language with no strings. Note that $\{\lambda\} \neq \emptyset$; the first contains an empty string, the second contains nothing at all.

---

In the material for **Lecture 1**, **String Operations** 

### **1. Concatenation**

This is the process of joining two strings together to form a single, longer string.

- **Definition:** If $u = a_1a_2...a_n$ and $v = b_1b_2...b_m$, then the concatenation $uv = a_1a_2...a_nb_1b_2...b_m$.
    
- **Example:** If $u = \text{apple}$ and $v = \text{pie}$, then $uv = \text{applepie}$.
    
- **Identity Element:** The empty string $\lambda$ (or $\epsilon$) acts as the identity. $u\lambda = \lambda u = u$.
    

### **2. String Reverse ($w^R$)**

This operation flips the order of symbols in a string.

- **Definition:** If $w = a_1a_2...a_n$, then $w^R = a_na_{n-1}...a_1$.
    
- **Example:** If $w = \text{abc}$, then $w^R = \text{cba}$.
    
- **Property:** $(uv)^R = v^Ru^R$ (The reverse of a concatenated string is the reverse of the second part followed by the reverse of the first part).
    

### **3. Length of a String ($|w|$)**

This is the count of the number of symbols in the string.

- **Example:** If $w = 01101$, then $|w| = 5$.
    
- **Crucial Fact:** The length of the empty string is always zero ($|\lambda| = 0$).
    

### **4. String Power ($w^n$)**

This represents concatenating a string with itself $n$ times.

- **Definition:** $w^n = \underbrace{ww...w}_{n \text{ times}}$.
    
- **Special Cases:** * $w^0 = \lambda$ (Any string to the power of zero is the empty string).
    
    - $w^1 = w$.
        
    - $w^2 = ww$.
        

### **5. Substrings, Prefixes, and Suffixes**

These identify specific parts of a string:

- **Prefix:** A string of any number of leading symbols (e.g., for "abc", prefixes are $\lambda, a, ab, abc$).
    
- **Suffix:** A string of any number of trailing symbols (e.g., for "abc", suffixes are $\lambda, c, bc, abc$).
    
- **Substring:** Any contiguous sequence of symbols within the string.
    
 $\Sigma^*$ : the set of all possible strings from alphabet 
$\Sigma^+$ : the set of all possible strings from alphabet except $\lambda$


---

#### **C. Set Operations on Languages**

- **Set**: A collection of unique, unordered elements (e.g., $\{a, b, c\}$).
    
- **Powerset ($2^S$)**: The set of all possible subsets. If $|S| = n$, then $|2^S| = 2^n$.
    
- **Cartesian Product ($A \times B$)**: A set of all ordered pairs $(a, b)$.

Since languages are sets, we apply standard set theory:

- **Union ($L_1 \cup L_2$):** Strings in either $L_1$ or $L_2$.
    
- **Intersection ($L_1 \cap L_2$):** Strings present in both.
    
- **Complement ($\overline{L}$):** All strings in $\Sigma^*$ that are **not** in $L$.
    
- **Concatenation ($L_1L_2$):** Taking a string $x$ from $L_1$ and $y$ from $L_2$ to form $xy$.
    
![[Pasted image 20260402154531.png]]
![[Pasted image 20260402154541.png]]

![[Pasted image 20260402160056.png]]

#### **Relations and Functions**

- **Equivalence Relation**: A relation that is **Reflexive** ($xRx$), **Symmetric** ($xRy \Rightarrow yRx$), and **Transitive** ($xRy, yRz \Rightarrow xRz$).
    
- **Functions**: A mapping from a domain to a range. It is **total** if every element in the domain has a result, otherwise it is **partial**.

Automata are often visualized using Graph Theory:

- **Nodes (States):** Represent the "internal condition" of the machine.
    
- **Edges (Transitions):** Labeled arrows showing how the machine moves from one state to another when it reads a specific input symbol.
    
- **Trees:** Used primarily in logic and parsing. A tree is a functional graph where there is exactly one path from the **Root** to any other node.

#### **Graphs and Trees**

- **Walk/Path/Cycle**: A sequence of edges. A **path** repeats no edges; a **simple path** repeats no nodes. A **cycle** returns to the start node.
    
- **Trees**: Graphs with no cycles, consisting of a **root**, **parents**, **children**, and **leaves**.
- 

---

### **5. Logic and Proofs**

The lecture concludes with the two "Gold Standards" of proof in this field:

1. **Mathematical Induction**: Essential for proving that a machine works for _any_ string length $n$.
    
    - **Basis**: Prove for $n=0$ or $n=1$.
        
    - **Inductive Hypothesis**: Assume it works for $n=k$.
        
    - **Inductive Step**: Use the hypothesis to prove it works for $n=k+1$.
        
2. **Proof by Contradiction**: To prove a statement is true, you assume it is false and show that this assumption leads to a logical impossibility (like $1=0$). This is frequently used to prove a language is _not_ regular.
    

---

### **6. Applications Highlighted**

- **Vending Machines:** Simple logic based on current state (money inserted) and input (button pressed).
    
- **Compilers:** Identifying keywords and syntax in code.
    
- **Text Search:** Algorithms that find patterns in large documents (like "Find and Replace" in Word).