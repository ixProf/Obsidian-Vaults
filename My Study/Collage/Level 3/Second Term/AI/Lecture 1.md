
###  Part I: Intelligent Agents

**Objective:**  
To introduce ==the fundamental concept== of an intelligent agent.

This part focuses on:

- What an ==AI agent== is.
- How to ==design a **rational agent**==.

- How agents choose the “right action” based on:
    
    - Their goals.
    - The nature of the environment.


This is the foundation of the entire AI field.

---

### Part II: Problem Solving

**Objective:**  
To study how an agent decides what action to take when multiple steps are required to reach a goal (e.g., chess, path navigation).

It includes different search techniques:

- **Uninformed Search (Blind Search)**
    
    - Breadth-First Search (BFS) بالعرض
    - Depth-First Search (DFS) بالعمق
    
- **Informed (Heuristic) Search**
    
    - A* Search  
        Uses problem-specific knowledge to find solutions more efficiently.
- **Adversarial Search**
    - Used when an agent competes against an opponent (e.g., game playing).


---

### Part III: Machine Learning

**Objective:**  
To describe agents that improve their performance by:

- Learning from past experiences.
- Making predictions about the future.


This part introduces adaptive and learning systems.

---

# What is Artificial Intelligence?

Artificial Intelligence (AI) is:

> The study and construction of intelligent entities ==that can compute how to act effectively and safely== in a wide variety of novel situations.

The ==ultimate goal== of AI is to ==build machines that can mimic or exceed human mental capabilities==, such as:

- Reasoning الاستدلال
- Understanding الفهم
- Imagination التخيل
- Recognition التعرف
- Creativity الإبداع
- Emotions المشاعر

Humans call themselves _Homo sapiens_ (“man the wise”) because intelligence defines our species.

---


![[Pasted image 20260620201330.png]]

## Think Humanly

### Cognitive Modeling Approach

- How Human Thinks?
	- An interdisciplinary field of Cognitive Science
	- Bring together models from AI and Experimental Techniques from Psychology
	- Tries to come up with precise and testable theories of ==how human mind works== Ex ==Neural Networks==

## Think Rationally
### Laws of Though Approach

- Uses Logic to reach a decision given some facts via Logical Interfaces
- ==Aristotle== was the ==first to try to codify the way of thinking==
	- His deductive reasoning always gave correct conclusions when given correct premises
	- Ex: ==All Cats are Pets; Bob is a Cat; therefore, Bob is a Pet==
## Act Humanly
### The Turing Test
- To Pass Turing Test, Computer Needs:
	- Natural Language Processing
	- Knowledge Representation
	- Automated Reasoning
	- Machine Learning
- Total Turing Test: Interrogator can pass physical object to the computer
- To Pass total Turing test, computer needs:
	- Computer Vision
	- Robotics

## Act Rationally
### Rational Agent Approach
-  Perceive the environment, and act so as to achieve one's goal.
- Not necessary to do the best action:
	- There isn't always an absolutely best Action
	- There isn't always time to find the best action
	- An action that's good enough can be ==acceptable==
- Example: Game Playing
- Sample Approach: Tree-Searching Strategies
- Problem: Choosing what to do given the constraints.

---

#  What is an Agent?

### Definition:

An **agent** is anything that:

- Perceives its environment through **sensors**.
- Acts upon that environment through **actuators**.

---

## Examples of Agents

###  Human Agent

- Sensors: eyes, ears, skin, etc.
- Actuators: hands, legs, vocal tract.

###  Robotic Agent

- Sensors: cameras, infrared sensors.
- Actuators: motors.


### Software Agent

- Sensors:
    
    - File contents
    - Network packets
    - Keyboard/mouse input
    
- Actuators:
    
    - Writing files
    - Sending network packets
    - Displaying information
    

---

# Key Concepts

## Percept الإدراك

A **percept** is the ==input that an agent receives from its sensors== at a particular instant.

---

## Percept Sequence

The **complete history** of everything the agent has perceived since it started.

Agents make decisions based on the entire percept sequence.

---

## Agent Function

The agent function defines:

> A ==mapping from percept sequence== → action.

Mathematically:

Agent Function:  
Percept Sequence → Action

This means that the agent ==chooses an action based on everything== it has perceived so far.

---

# Example: Robot Vacuum Cleaner

![Image](https://i.sstatic.net/Q5l4t.png)

This is a classical AI example.

### Environment:

- Two rooms (A and B)
- Each ==room may be Dirty or Clean==

### Percepts:

- Current location
- Whether the current square is dirty

### Actions:

- Move Left
- Move Right
- Suck
- NoOp

This example illustrates how:

- The agent observes.
- Chooses an action.
- Aims to maximize cleanliness (performance).

---

# Rational Agent

A **rational agent** is one that:

> Selects the action that maximizes its expected performance measure, given:

- The percept sequence.
- The knowledge it has about the environment.


Important:

- Rational ≠ Omniscient
- Rational ≠ Always correct

A rational agent ==makes the **best possible decision based on available information**==.

---

#  Omniscience vs Rationality

## Omniscient Agent

- Knows the ==actual outcome of every action.==
- Can always ==choose perfectly.==
- Impossible in real-world systems.

## Rational Agent

- Chooses the best action according to:
    - Available information
    - Probabilities
    - Performance measure

AI focuses on ==rationality==, not omniscience.



---

#  Learning and Autonomy

Agents may vary in autonomy:

###  Non-Learning Agent

- Behavior is fixed.
- Does not improve over time.

###  Learning Agent

- Improves performance through experience.
- Updates its internal knowledge.
- Modifies its behavior over time.

Learning increases autonomy because the agent becomes less dependent on the designer.

---

#  Ways to Implement Agent Function

There are multiple architectures:

1. Table-Driven Agent (impractical)
2. Simple Reflex Agent
3. Model-Based Agent
4. Goal-Based Agent
5. Utility-Based Agent
6. Learning Agent

These architectures differ in:

- How much memory they use.
- Whether they use goals.
- Whether they use utility.
- Whether they can learn.

---

# Final Core Idea of the Lecture

The entire field of AI is built around the concept of the **agent**.

Every AI system must:

1. Perceive the environment.
2. Process information.
3. Choose an action.
4. Aim to behave rationally.
5. Possibly learn from experience.

Understanding intelligent agents is the foundation for:

- Search algorithms
- Game playing
- Machine learning
- Robotics
- Natural language processing

---
