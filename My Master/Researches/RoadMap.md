# Distributed Systems — Master's Preparation Roadmap

> **Goal:** Build the theoretical, practical, research, and academic English skills required to pursue a Master's degree and eventually conduct research in Distributed Systems.

---

# 0. Final Goal

By the end of this roadmap, I should be able to:

- Understand Operating Systems and Networking deeply.
- Explain core Distributed Systems concepts mathematically and intuitively.
- Implement distributed systems rather than only using them.
- Read and understand academic research papers.
- Critically evaluate research papers.
- Search for research gaps and open problems.
- Design experiments and evaluate systems.
- Read papers from top systems conferences.
- Write technical and academic English clearly.
- Communicate technical ideas in English.
- Build a serious Distributed Systems portfolio.
- Identify potential Master's research areas.
- Approach potential supervisors with evidence of preparation.
- Produce at least one serious research-oriented project.

---

# 1. The Overall Roadmap

```text
Phase 0
Research Setup & English Foundation
        
Phase 1
Computer Science Foundations
        
Phase 2
Operating Systems
        
Phase 3
Computer Networking
        
Phase 4
Systems Programming
        
Phase 5
Distributed Systems Fundamentals
        
Phase 6
MIT 6.5840 + Distributed Systems Labs
        
Phase 7
Distributed Data Systems + DDIA
        
Phase 8
Advanced Distributed Systems
        
Phase 9
Research Papers & Literature Review
        
Phase 10
Research Direction Exploration
        
Phase 11
Research Project
        
Phase 12
Master's Application Preparation
```

---

# 2. The Five Parallel Tracks

Do NOT study everything sequentially.

I will maintain five tracks in parallel:

```text
                    Master's Preparation
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   CS / Systems        Distributed        Research
        │                Systems              │
        │                  │                  │
        └──────────────┬───┴──────────────┬───┘
                       │                  │
                   Projects           Academic
                       │               English
                       │                  │
                       └────────┬─────────┘
                                │
                         Research Profile
```

## Track A — Systems Knowledge

- Algorithms
- Operating Systems
- Networking
- Concurrency
- Database
- Distributed Systems


## Track B — Distributed Systems

- RPC
- Time and Ordering
- Failure Models
- Replication
- Consistency
- Consensus
- Transactions
- Sharding
- Distributed Storage
- Distributed Databases
- Fault Tolerance
- Byzantine Fault Tolerance

## Track C — Research

- Paper reading
- Literature search
- Literature review
- Research methodology
- Research questions
- Experimental design
- Benchmarking
- Reproducibility
- Academic writing

## Track D — Projects

- Systems implementations
- Distributed KV store
- MapReduce
- Raft
- Replicated services
- Sharded services
- Research prototype

## Track E — English

- Technical vocabulary
- Technical reading
- Paper reading
- Academic writing
- Listening
- Speaking
- Technical discussion
- Research presentation


---

# 3. Phase 0 — Research Setup

## Objectives

Build the environment that will be used throughout the entire preparation period.

### Tools

- Obsidian
- Zotero
- Google Scholar
- Semantic Scholar
- arXiv
- ACM Digital Library
- IEEE Xplore
- USENIX
- GitHub
    

### Obsidian Structure

```text
Distributed-Systems/
│
├── 00 Dashboard/
│   ├── Roadmap.md
│   ├── Progress.md
│   ├── Weekly Review.md
│   └── Research Goals.md
│
├── 01 Foundations/
│   ├── Algorithms/
│   ├── Operating Systems/
│   ├── Networking/
│   ├── Databases/
│   └── Concurrency/
│
├── 02 Distributed Systems/
│   ├── Fundamentals/
│   ├── Time & Ordering/
│   ├── Replication/
│   ├── Consistency/
│   ├── Consensus/
│   ├── Transactions/
│   ├── Sharding/
│   ├── Distributed Storage/
│   └── Fault Tolerance/
│
├── 03 Research/
│   ├── Papers/
│   ├── Literature Reviews/
│   ├── Research Ideas/
│   ├── Open Problems/
│   └── Potential Topics/
│
├── 04 Projects/
│   ├── MapReduce/
│   ├── Raft/
│   ├── KV Store/
│   └── Research Project/
│
├── 05 English/
│   ├── Vocabulary/
│   ├── Expressions/
│   ├── Writing/
│   ├── Speaking/
│   └── Paper Summaries/
│
└── 06 Master's/
    ├── Universities/
    ├── Supervisors/
    ├── Requirements/
    ├── Research Groups/
    └── Applications/
```

---

# 4. Phase 1 — Computer Science Foundations

## Duration

Approximately 4–6 weeks.

## Algorithms & Data Structures

### Learn

- Big-O
- Arrays
- Linked Lists
- Stacks
- Queues
- Hash Tables
- Trees
- Binary Search Trees
- Heaps
- Graphs
- BFS
- DFS
- Shortest Paths
- Sorting
- Searching
- Recursion
- Dynamic Programming
- Greedy Algorithms

### Distributed Systems relevance

Pay special attention to:

- Hashing
- Graphs
- Heaps
- Queues
- Trees
- Concurrent data structures

Later topics will include:

```text
Consistent Hashing
Distributed Hash Tables
Leader Election
Scheduling
Partitioning
Quorums
```

---

# 5. Phase 2 — Operating Systems

## Duration

Approximately 5–7 weeks.

Operating Systems is a prerequisite for understanding systems research.

### Processes

Learn:

- Process
- Thread
- Process lifecycle
- Context switching
- IPC
- System calls
- User mode
- Kernel mode

### Concurrency

Learn:

- Critical sections
- Race conditions
- Mutexes
- Semaphores
- Monitors
- Condition variables
- Atomic operations
- Deadlocks
- Starvation
- Livelock
- Lock-free programming


### Memory

Learn:

- Stack
- Heap
- Virtual memory
- Paging
- Page tables
- TLB
- Page faults
- Memory allocation
- Memory-mapped files

### Storage

Learn:

- Disk I/O
- File systems
- Caching
- RAID
- Journaling
- Log-structured storage

### OS Research Questions

Train yourself to ask:

```text
Why was this design chosen?

What problem does it solve?

What is the bottleneck?

What happens under failure?

What is the trade-off?

What happens at scale?
```

---

# 6. Phase 3 — Computer Networking

## Duration

Approximately 4–5 weeks.

### Core Topics

- OSI Model
- TCP/IP
- Ethernet
- IP
- ARP
- DNS
- DHCP
- TCP
- UDP
- HTTP
- HTTP/2
- HTTP/3
- TLS
- NAT
- Routing
- Congestion control
- Flow control

### Deep TCP Understanding

You should understand:

- Three-way handshake
- Connection establishment
- Reliability
- Ordering
- Retransmission
- Timeouts
- Flow control
- Congestion control
- Connection termination

### Application-Level Distributed Communication

Learn:

- Sockets
- RPC
- REST
- gRPC
- Serialization
- Message queues
- Pub/Sub

---

# 7. Phase 4 — Systems Programming

## Primary Language: Go

Keep C# for backend engineering.

Use Go for systems work.

```text
C#
↓
Production Backend

Go
↓
Systems Programming
↓
Distributed Systems
↓
Research Prototypes
```

### Go Topics

Learn:

- Goroutines
- Channels
- Mutex
- RWMutex
- WaitGroups
- Context
- Atomic operations
- Networking
- TCP
- RPC
- gRPC
- Testing
- Race detector
- Profiling
- Benchmarking


Do not aim to become a Go web developer.

Aim to become comfortable writing:

```text
Concurrent Programs
Network Services
RPC Systems
Storage Systems
Distributed Services
```

---

# 8. Phase 5 — Distributed Systems Fundamentals

## Duration

Approximately 6–8 weeks.

This is the beginning of the core specialization.

---

## 8.1 What Is a Distributed System?

Understand:

```text
Multiple Independent Machines
        ↓
Communication Network
        ↓
Coordinated Computation
        ↓
One Logical System
```

Understand the difference between:

- Centralized systems
- Distributed systems
- Parallel systems
- Cluster computing
- Cloud systems


---

# 9. Failure Models

Study:

- Crash failures
- Omission failures
- Message loss
- Message duplication
- Message delay
- Network partitions
- Byzantine failures


Always ask:

```text
What can fail?

What can be delayed?

What can be duplicated?

What assumptions does the algorithm make?
```

---

# 10. Time & Ordering

Study:

- Physical clocks
- Clock synchronization
- Logical clocks
- Lamport clocks
- Happened-before relation
- Vector clocks
- Causality
- Event ordering

Key question:

> How can independent machines reason about the order of events?

---

# 11. Replication

Study:

- Primary/Backup
- Leader/Follower
- Active replication
- Passive replication
- State Machine Replication
- Quorum replication
    

Understand:

```text
Replication
    ↓
Availability
    +
Fault Tolerance
    +
Performance
    -
Consistency Complexity
```

---

# 12. Consistency

Study deeply:

- Strong consistency
- Eventual consistency
- Sequential consistency
- Causal consistency
- Linearizability
- Read-your-writes
- Monotonic reads

You should eventually be able to answer:

> What does it mean for a distributed system to behave as if operations happened atomically?

---

# 13. Consensus

Study:

```text
Consensus
   ↓
Paxos
   ↓
Raft
   ↓
Byzantine Consensus
```

Understand:

- Leader election
- Log replication
- Safety
- Liveness
- Majority
- Quorum
- Terms/epochs
- Commit index
- State machine replication
    

---

# 14. Phase 6 — MIT 6.5840

## Duration

Approximately 10–14 weeks.

This becomes the main practical Distributed Systems course.

The 2026 schedule covers MapReduce, RPC/Threads, GFS, Paxos, Raft, consistency/linearizability, ZooKeeper, distributed transactions, Spanner, Chain Replication, FaRM, verification, Memcached, serverless/container loading, Ray, Bitcoin, and Byzantine Fault Tolerance. ([MIT CSAIL PDOS Group](https://pdos.csail.mit.edu/6.5840/schedule.html "6.5840 Schedule: Spring 2026"))

### Study Sequence

```text
1. MapReduce
2. RPC & Threads
3. GFS
4. Paxos
5. Raft
6. Fault Tolerance
7. Linearizability
8. ZooKeeper
9. Distributed Transactions
10. Spanner
11. Chain Replication
12. Optimistic Concurrency Control
13. Verification
14. Cache Consistency
15. Serverless Systems
16. Distributed Computing
17. P2P Systems
18. Byzantine Fault Tolerance
```

### Labs

Complete as many labs as possible.

Priority:

```text
Lab 1
MapReduce
        
Lab 2
Key/Value Server
        
Lab 3
Raft
        
Lab 4
Fault-Tolerant KV Store
        
Lab 5
Sharded KV Store
```

Do not simply finish the labs.

For every lab, write:

```text
Problem
Architecture
Important Design Decisions
Concurrency Model
Failure Model
Testing Strategy
Performance
Lessons Learned
```

---

# 15. Phase 7 — Designing Data-Intensive Applications

Use DDIA as a continuous reference rather than treating it as a one-time textbook.

The book explicitly focuses on reliability, scalability, maintainability, replication, partitioning, consistency, and the trade-offs between different system designs. ([Data Intensive](https://dataintensive.net/ "Designing Data-Intensive Applications (DDIA) — an O’Reilly book by Martin Kleppmann (The Wild Boar Book)"))

## Chapters / Topics to prioritize

### Foundations

- Reliability
- Scalability
- Maintainability

### Data Models

- Relational
- Document
- Graph
- Network

### Storage

- Storage engines
- LSM Trees
- B-Trees

### Encoding

- JSON
- XML
- Binary protocols
- Schema evolution
### Replication

- Leader-based replication
- Multi-leader replication
- Leaderless replication

### Partitioning

- Partitioning strategies
- Rebalancing
- Request routing

### Transactions

- ACID
- Isolation
- Serializability
- Distributed transactions

### Distributed Systems

- Consistency
- Consensus
- Batch processing
- Stream processing

---

# 16. Phase 8 — Advanced Distributed Systems

After the foundations are solid, explore:

## Distributed Databases

- Distributed SQL
- NoSQL
- Distributed transactions
- MVCC
- Serializable transactions
- Replication
- Sharding

## Distributed Storage

- Distributed file systems
- Object storage
- Key-value stores
- Distributed block storage

## Fault Tolerance

- Crash fault tolerance
- Byzantine fault tolerance
- Recovery
- Checkpointing
- Replication

## Cloud Systems

- Container orchestration
- Scheduling
- Serverless
- Autoscaling
- Multi-region systems
- Geo-distributed systems

## Modern Topics

- Edge computing
- Serverless computing
- Distributed ML
- Stream processing
- Event-driven systems
- Distributed caching
- Distributed observability

---

# 17. Research Conference Map

Start following research venues.

### Core Systems

- SOSP
- OSDI
- NSDI
- EuroSys
- USENIX ATC

### Storage

- FAST


### Databases

- SIGMOD
- VLDB
- CIDR

### Networking

- SIGCOMM
- NSDI

### Security

- USENIX Security
- IEEE S&P
- ACM CCS

OSDI focuses on systems software design, implementation, and research evaluation, while NSDI focuses specifically on networked and distributed systems and their practical evaluation. ([USENIX](https://www.usenix.org/conference/osdi26?utm_source=chatgpt.com "OSDI '26 | USENIX"))

USENIX also provides open access to its conference research, making it especially useful when building a paper-reading habit. ([USENIX](https://www.usenix.org/?utm_source=chatgpt.com "USENIX Home | USENIX"))

---

# 18. Research Paper Roadmap

Do NOT start by reading random recent papers.

Follow this progression.

## Level 1 — Classic Systems Papers

Read:

1. MapReduce
2. The Google File System
3. Bigtable
4. Dynamo
5. Time, Clocks, and the Ordering of Events
6. Paxos Made Simple
    

---

## Level 2 — Consensus & Coordination

7. Raft
8. ZooKeeper
9. Chain Replication

---

## Level 3 — Distributed Databases

10. Spanner
11. FaRM
12. FoundationDB-related work
13. Modern distributed SQL systems

---

## Level 4 — Advanced Systems

14. Distributed verification
15. Byzantine Fault Tolerance
16. Distributed caching
17. Serverless systems
18. Distributed computing frameworks
19. Edge systems
20. Modern cloud infrastructure

---

# 19. How to Read a Research Paper

Never read a paper passively.

Use this workflow.

## Pass 1 — 10 Minutes

Read only:

- Title
- Abstract
- Introduction
- Figures
- Conclusion

Answer:

```text
What problem are they solving?

Why does the problem matter?

What is their main idea?

What is their contribution?
```

---

## Pass 2 — Technical Reading

Read:

- Architecture
- Algorithm
- Design
- Evaluation
- Limitations

Write down:

```text
Problem:
Existing Solutions:
Main Idea:
Key Contribution:
Assumptions:
Architecture:
Algorithm:
Evaluation:
Results:
Limitations:
```

---

## Pass 3 — Critical Reading

Ask:

```text
What assumptions are being made?

Are the assumptions realistic?

What could fail?

What is the bottleneck?

What trade-offs were made?

What would happen at 10x scale?

What would happen under failure?

What would I change?

What problem remains unsolved?
```

---

# 20. Paper Note Template

Create this Obsidian template:

````markdown
# {{Paper Title}}

## Metadata

- Authors:
- Year:
- Conference:
- Topic:
- URL:
- DOI:
- Related Papers:

---

## 1. Problem

What problem does this paper solve?

---

## 2. Motivation

Why is this problem important?

---

## 3. Existing Solutions

What approaches existed before this paper?

---

## 4. Main Idea

What is the core idea?

---

## 5. Contributions

1.
2.
3.

---

## 6. System Architecture

---

## 7. Key Algorithms

---

## 8. Assumptions

---

## 9. Failure Model

---

## 10. Evaluation

### Dataset

### Hardware

### Workload

### Metrics

### Results

---

## 11. Strengths

---

## 12. Limitations

---

## 13. Questions

---

## 14. Research Opportunities

---

## 15. Related Papers

---

## 16. My Understanding

Explain the paper in my own words.

---

## 17. English Vocabulary

---

## 18. One-Sentence Summary

````

---

# 21. Research Search Strategy

Do not search:

```text
distributed systems papers
````

Instead search by:

```text
Topic
+
Problem
+
System
+
Limitation
```

Examples:

```text
"distributed systems" "fault tolerance"

"distributed database" "consistency"

"distributed systems" "tail latency"

"distributed storage" "replication"

"distributed database" "cross-region"

"Raft" "performance"

"distributed transactions" "optimization"

"distributed systems" "resource scheduling"
```

Then progressively add:

```text
survey
review
benchmark
evaluation
limitations
open problems
```

---

# 22. Finding Research Gaps

This is one of the most important skills.

For every paper, collect:

```text
Problem

Current Solution

Limitation

Unsolved Problem

Potential Improvement
```

Example:

```text
Existing System
       
Works well under normal load
       
Performance degrades under skewed workload
       
Possible research question
       
Can adaptive partitioning reduce the degradation?
```

Do NOT immediately assume that a limitation is a research gap.

Verify it against newer papers.

---

# 23. Literature Review System

For every topic:

```text
Topic
 ↓
Classic Papers
 ↓
Survey Papers
 ↓
Recent Papers
 ↓
Competing Approaches
 ↓
Unsolved Problems
 ↓
Research Gap
```

Create a table:

|Paper|Year|Problem|Approach|Result|Limitation|Related Work|
|---|--:|---|---|---|---|---|
|Paper A|2019|...|...|...|...|...|
|Paper B|2021|...|...|...|...|...|
|Paper C|2024|...|...|...|...|...|

The goal is eventually to see the evolution of a research area.

---

# 24. Research Topic Exploration

Do NOT choose a thesis topic immediately.

Explore at least 4–6 areas first.

Possible areas:

```text
Distributed Databases
Distributed Storage
Fault Tolerance
Consensus
Distributed Caching
Cloud Systems
Edge Computing
Serverless Systems
Distributed Scheduling
Distributed Security
Distributed ML
Geo-distributed Systems
```

For each area:

```text
Read 5–10 papers
        ↓
Write a mini literature review
        ↓
List common problems
        ↓
List limitations
        ↓
List open questions
        ↓
Compare your interest
```

---

# 25. Researcher Notebook

Create:

```text
Research Ideas/
```

Every time you think:

> "Could this be done differently?"

write it down.

Template:

```markdown
# Research Idea

## Problem

What problem am I noticing?

## Existing Approach

How do current systems solve it?

## Limitation

What appears inefficient or insufficient?

## Hypothesis

I think that...

## Possible Solution

Maybe we can...

## Evaluation

How could I test this?

## Related Papers

- 

## Status

Idea / Exploring / Rejected / Prototype / Experiment
```

Most ideas will be rejected.

That is normal.

The goal is to train your research intuition.

---

# 26. Projects Roadmap

Projects are mandatory.

## Project 1 — Concurrent Server

Implement:

```text
TCP Server
+
Multiple Clients
+
Concurrency
+
Synchronization
```

---

## Project 2 — RPC Framework

Build a simple:

```text
Client
   ↓
RPC
   ↓
Server
```

Include:

- Serialization
    
- Request ID
    
- Timeout
    
- Error handling
    

---

## Project 3 — MapReduce

Implement:

```text
Coordinator
     ↓
Workers
     ↓
Map
     ↓
Shuffle
     ↓
Reduce
```

Handle worker failures.

---

## Project 4 — Raft

Implement:

```text
Leader Election
Log Replication
Persistence
Snapshots
Fault Handling
```

---

## Project 5 — Distributed KV Store

Build:

```text
Client
   ↓
Raft Cluster
   ↓
KV Store
```

Test:

- Node failure
    
- Network delay
    
- Network partition
    
- Leader failure
    
- Concurrent requests
    

---

## Project 6 — Sharded KV Store

Build:

```text
              Client
                 |
          Shard Controller
          /      |      \
       Shard 1 Shard 2 Shard 3
          |       |       |
        Raft    Raft    Raft
```

---

# 27. Research Project

Eventually build ONE serious project.

It should contain:

```text
Research Question
        ↓
Hypothesis
        ↓
System Design
        ↓
Implementation
        ↓
Experimental Setup
        ↓
Benchmark
        ↓
Results
        ↓
Analysis
        ↓
Limitations
        ↓
Future Work
```

Write it as a research paper.

Not a GitHub README.

---

# 28. Academic English Roadmap

English is NOT a separate subject.

English should be integrated into the Distributed Systems study.

## Daily

### 20–30 minutes

Read technical English.

Sources:

- Research papers
- Documentation
- Technical blogs
- Conference talks
- Lecture notes
    

---

# 29. Technical Vocabulary System

Create:

```text
English/
└── Vocabulary/
```

For every new word:

```markdown
# Replication

## Meaning

The process of maintaining multiple copies of data or state.

## Context

Replication improves fault tolerance and availability.

## Related

- replica
- replicated
- replication factor

## My Sentence

The system uses synchronous replication to improve durability.
```

Do NOT memorize isolated vocabulary.

Learn words inside technical contexts.

---

# 30. Paper English Practice

For every paper:

### Step 1

Read the abstract.

### Step 2

Underline unfamiliar expressions.

### Step 3

Rewrite the abstract in simple English.

### Step 4

Write a 5-sentence summary.

### Step 5

Explain the paper verbally for 3–5 minutes.

This gives you:

```text
Reading
+
Vocabulary
+
Writing
+
Speaking
+
Technical Understanding
```

at the same time.

---

# 31. Academic Writing Practice

Every week write one short technical piece.

Examples:

```text
Explain Linearizability.

Compare Paxos and Raft.

Explain why replication improves availability.

Explain the CAP theorem.

Describe a distributed KV store.

Explain the difference between consistency and availability.
```

Start:

```text
100 words
```

Then:

```text
200 words
```

Then:

```text
500 words
```

Eventually:

```text
1000+ words
```

---

# 32. Speaking Practice

Every week choose one Distributed Systems topic.

Speak for 5 minutes.

Example:

```text
Week 1:
What is a Distributed System?

Week 2:
What is a Race Condition?

Week 3:
How does TCP work?

Week 4:
What is Replication?

Week 5:
What is Linearizability?

Week 6:
How does Raft work?
```

Record yourself.

Then evaluate:

```text
Grammar
Pronunciation
Vocabulary
Clarity
Technical Accuracy
Fluency
```

---

# 33. Technical English Shadowing

Use conference talks and technical lectures.

Process:

```text
Listen
 ↓
Pause
 ↓
Repeat
 ↓
Record
 ↓
Compare
```

Do not try to copy the accent.

Focus on:

- Pronunciation
    
- Sentence rhythm
    
- Technical phrasing
    
- Speaking confidence
    

---

# 34. English Phrase Bank

Create:

```text
English/
└── Academic Expressions.md
```

Collect phrases such as:

```text
This paper proposes...

The main contribution of this work is...

The authors evaluate...

The results indicate that...

A key limitation is...

The proposed approach relies on...

Compared with previous approaches...

This suggests that...

An important trade-off is...

The system achieves...

Under high load...

In the presence of failures...
```

Eventually these become natural.

---

# 35. Weekly Study System

A sustainable week should look like:

```text
Monday
───────
Systems Theory
+ English Reading

Tuesday
────────
Distributed Systems
+ Coding

Wednesday
──────────
Paper Reading
+ English

Thursday
─────────
Systems Programming
+ Project

Friday
──────
Distributed Systems
+ Paper

Saturday
────────
Deep Work
+ Project
+ Research

Sunday
──────
Review
+ Weekly Planning
+ Light English
```

---

# 36. Weekly Time Allocation

If I have approximately 15 hours/week:

```text
Distributed Systems     4h
OS / Networking         2h
Programming             3h
Research Papers         2h
English                 2h
Review                  1h
Research Ideas          1h
```

If I have 20 hours:

```text
Distributed Systems     5h
OS / Networking         3h
Programming             4h
Research Papers         3h
English                 2h
Research                2h
Review                  1h
```

Consistency is more important than maximum hours.

---

# 37. Weekly Review

Every Sunday answer:

```markdown
# Weekly Review

## What did I learn?

-

## What did I implement?

-

## What paper did I read?

-

## What did I understand better?

-

## What confused me?

-

## What English vocabulary did I learn?

-

## What technical English did I write?

-

## What research questions appeared?

-

## What should I improve next week?

-

## Overall Progress

Theory: /10
Programming: /10
Research: /10
English: /10
Consistency: /10
```

---

# 38. Monthly Review

At the end of every month:

```text
What concepts can I explain without notes?

What systems can I implement?

How many papers did I read?

How many papers can I explain?

What research areas interest me?

What research questions did I collect?

How is my English improving?

What should I stop doing?

What should I continue?

What should I start?
```

---

# 39. Paper Reading Target

Do NOT chase paper counts.

Start:

```text
Month 1
2 papers

Month 2
3 papers

Month 3
4 papers

Month 4+
4–6 papers/month
```

Quality > quantity.

Eventually:

```text
1 paper/week
```

should become normal.

---

# 40. Research Paper Pipeline

Every paper should move through:

```text
FOUND
 ↓
SCREENED
 ↓
READ
 ↓
NOTED
 ↓
UNDERSTOOD
 ↓
CONNECTED
 ↓
CRITICIZED
 ↓
RESEARCH IDEA
```

Use statuses in Obsidian:

```text
#paper/discovered
#paper/to-read
#paper/reading
#paper/read
#paper/important
#paper/research-relevant
```

---

# 41. Research Graph

Connect papers.

Example:

```text
MapReduce
   ↓
Big Data Processing
   ↓
Distributed Data Processing
   ↓
Ray
```

Another:

```text
Paxos
   ↓
Raft
   ↓
ZooKeeper
   ↓
Distributed Coordination
```

Another:

```text
Replication
   ↓
Consistency
   ↓
Linearizability
   ↓
Distributed Transactions
   ↓
Spanner
```

The goal is to build a mental map of the field.

---

# 42. Master's Preparation

Start researching universities only after I have built enough technical understanding.

Create:

```text
06 Master's/
│
├── Universities/
├── Supervisors/
├── Research Groups/
├── Requirements/
├── Scholarships/
└── Applications/
```

For each university:

```markdown
# University

## Program

## Country

## Admission Requirements

## Distributed Systems Faculty

## Relevant Research Groups

## Research Areas

## Tuition

## Funding

## Scholarships

## English Requirements

## Application Deadline

## Notes
```

---

# 43. Supervisor Research

Do not choose a supervisor only because the university is famous.

Look for:

```text
Professor
   ↓
Research Group
   ↓
Recent Papers
   ↓
Research Topic
   ↓
Your Interests
```

For each potential supervisor:

```markdown
# Professor Name

## University

## Research Area

## Recent Papers

1.
2.
3.
4.

## Current Research

## Research Group

## Why Relevant To Me

## Possible Research Direction

## Contacted?

## Response
```

---

# 44. The 3-Paper Rule

Before contacting a potential supervisor:

Read at least 3 relevant papers from them or their research group.

You should be able to say:

```text
I read your work on X.

I found Y particularly interesting.

I noticed that...

I am currently exploring...
```

This is much stronger than:

> "I am interested in Distributed Systems. Can you supervise me?"

---

# 45. Final Research Profile

Before applying, aim to have:

```text
Strong CS Foundations
        +
Distributed Systems Knowledge
        +
Systems Programming
        +
3–6 Serious Projects
        +
20–40 Well-Read Papers
        +
Research Notes
        +
Research Ideas
        +
1 Serious Research Project
        +
Technical English
```

The exact numbers are targets, not admission requirements.

---

# 46. Final Milestones

## Milestone 1

I can explain:

- Process
    
- Thread
    
- Mutex
    
- TCP
    
- RPC
    
- Memory
    
- File systems
    

---

## Milestone 2

I can explain:

- Replication
    
- Consistency
    
- Linearizability
    
- Consensus
    
- Paxos
    
- Raft
    

---

## Milestone 3

I can implement:

- Concurrent server
    
- RPC service
    
- MapReduce
    
- Raft
    
- Distributed KV store
    

---

## Milestone 4

I can read:

- GFS
    
- MapReduce
    
- Dynamo
    
- Raft
    
- Spanner
    
- ZooKeeper
    

and explain their contributions.

---

## Milestone 5

I can critically analyze a recent paper.

---

## Milestone 6

I can identify:

```text
Problem
+
Existing Solutions
+
Limitations
+
Potential Research Question
```

---

## Milestone 7

I can design and evaluate a research prototype.

---

## Milestone 8

I can discuss my research interests with a professor in English.

---

# 47. The Golden Rules

## Rule 1

Do not study Distributed Systems only theoretically.

```text
Learn
↓
Implement
↓
Break
↓
Debug
↓
Measure
↓
Understand
```

---

## Rule 2

Do not read papers passively.

```text
Read
↓
Question
↓
Criticize
↓
Connect
↓
Extend
```

---

## Rule 3

Do not memorize technologies.

Understand:

```text
Problem
→
Constraint
→
Design
→
Trade-off
→
Result
```

---

## Rule 4

Every major concept should have:

```text
Definition
+
Example
+
Failure Case
+
Implementation
+
Research Paper
```

---

## Rule 5

English should be integrated into the technical study.

Do not study:

```text
English
```

separately from:

```text
Distributed Systems
```

Study:

```text
Distributed Systems in English.
```

---

# 48. The Final Learning Loop

This is the loop I want to follow throughout the entire journey:

```text
                 ┌───────────────┐
                 │    THEORY     │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │  IMPLEMENT    │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │   EXPERIMENT  │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ READ PAPERS   │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │    QUESTION   │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │    RESEARCH   │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ WRITE / SPEAK │
                 └───────┬───────┘
                         │
                         └──────────→ Back to THEORY
```

---

# 49. My Definition of "Ready for Master's"

I am ready when I can do more than say:

> "I know Distributed Systems."

I should be able to say:

> "I understand the fundamental problems in distributed systems, I can implement and evaluate distributed systems, I can read and critique research papers, I can identify open problems, and I can communicate technical ideas clearly in English."

That is the target.

---

# 50. Progress Dashboard

```markdown
# Distributed Systems Master's Preparation

## Foundations

- [ ] Algorithms
- [ ] Data Structures
- [ ] Operating Systems
- [ ] Concurrency
- [ ] Networking
- [ ] Databases

## Systems Programming

- [ ] Go
- [ ] Goroutines
- [ ] Channels
- [ ] RPC
- [ ] Networking
- [ ] Benchmarking
- [ ] Profiling

## Distributed Systems

- [ ] Failure Models
- [ ] Time & Ordering
- [ ] Replication
- [ ] Consistency
- [ ] Linearizability
- [ ] Consensus
- [ ] Paxos
- [ ] Raft
- [ ] Transactions
- [ ] Sharding
- [ ] Distributed Storage
- [ ] Distributed Databases
- [ ] Fault Tolerance
- [ ] BFT

## MIT 6.5840

- [ ] MapReduce
- [ ] RPC
- [ ] GFS
- [ ] Paxos
- [ ] Raft
- [ ] Linearizability
- [ ] ZooKeeper
- [ ] Distributed Transactions
- [ ] Spanner
- [ ] Chain Replication
- [ ] FaRM
- [ ] Verification
- [ ] Sharded KV
- [ ] BFT

## Research

- [ ] Learn paper reading
- [ ] Read classic papers
- [ ] Read survey papers
- [ ] Read recent papers
- [ ] Build literature map
- [ ] Track open problems
- [ ] Generate research ideas
- [ ] Conduct experiments
- [ ] Write research report
- [ ] Build research prototype

## English

- [ ] Technical vocabulary
- [ ] Paper summaries
- [ ] Academic writing
- [ ] Technical speaking
- [ ] Conference talks
- [ ] Research presentation
- [ ] Supervisor communication

## Master's

- [ ] Identify countries
- [ ] Identify universities
- [ ] Identify research groups
- [ ] Identify supervisors
- [ ] Compare requirements
- [ ] Prepare CV
- [ ] Prepare Statement of Purpose
- [ ] Prepare research statement
- [ ] Prepare recommendation strategy
- [ ] Prepare English test
- [ ] Apply
```

---

# 51. The Most Important Principle

I am not preparing just to **get accepted into a Master's**.

I am preparing to become someone who can eventually **do research in Distributed Systems**.

Therefore:

```text
Courses → Knowledge
Projects → Engineering Ability
Papers → Research Understanding
Experiments → Scientific Thinking
English → Communication
Obsidian → Knowledge Management
Research Project → Evidence
```

Together:

```text
Knowledge
+
Engineering
+
Research
+
Communication
=
Master's-Level Preparation
```

### A few important notes

- **MIT 6.5840** should be your main practical spine, not one resource among 20. Its current structure already gives you a very strong progression from MapReduce/RPC/GFS through Raft, consistency, transactions, Spanner, sharding, and BFT. ([MIT CSAIL PDOS Group](https://pdos.csail.mit.edu/6.5840/schedule.html "6.5840 Schedule: Spring 2026"))
    
- **DDIA** should stay open beside you throughout the journey rather than being treated as a course you "finish." Its main value is understanding design trade-offs, not memorizing technologies. ([Data Intensive](https://dataintensive.net/ "Designing Data-Intensive Applications (DDIA) — an O’Reilly book by Martin Kleppmann (The Wild Boar Book)"))
    
- When you reach the research stage, follow **OSDI / NSDI / SOSP / EuroSys / FAST / SIGMOD / VLDB** rather than searching Google randomly. OSDI and NSDI in particular are directly aligned with systems and distributed-systems research. ([USENIX](https://www.usenix.org/conference/osdi26?utm_source=chatgpt.com "OSDI '26 | USENIX"))
    
- Don't set a deadline like "I must finish this in 6 months." This is a **long-term preparation system**. Your university workload and your backend/DevOps track can coexist with it.
    

**والخطوة اللي بعدها عندي أهم من الـroadmap نفسها:** نحول الكلام ده إلى **Obsidian vault فعلي**: `Dashboard → 12 Phases → weekly checklists → Paper Template → Book/Resource Tracker → Research Ideas → English Tracker → Master's Universities/Supervisors`. كده كل يوم هتفتح Obsidian وتعرف بالضبط **تذاكر إيه، تقرأ إيه، تعمل إيه، وإيه اللي خلصته** بدل ما الـroadmap تفضل مجرد قائمة كبيرة.

---

# Distributed Systems Master's Preparation

## Timeline: 03 October 2026 → 30 June 2027

### The 9-Month Journey

```text
OCT 2026
Foundations + Research Setup
        ↓
NOV 2026
Operating Systems + Concurrency
        ↓
DEC 2026
Networking + RPC
        ↓
JAN 2027
Distributed Systems Fundamentals
        ↓
FEB 2027
Consensus + Replication + MIT 6.5840
        ↓
MAR 2027
Raft + Distributed KV Store
        ↓
APR 2027
DDIA + Distributed Databases
        ↓
MAY 2027
Research Papers + Research Direction
        ↓
JUN 2027
Research Project + Master's Preparation
```

---

# PHASE 0 — Setup

## Week 0

### 03 Oct → 09 Oct 2026

### Goals

Set up the entire research environment.

### Study

- What is Distributed Systems?
- What is Systems Research?
- What is a Research Paper?
- How academic research works
- Basic Git/GitHub research workflow
- Basic Go setup

### Setup

Create your Obsidian structure:

```text
Distributed Systems Master's/
│
├── 00 Dashboard
├── 01 Foundations
├── 02 Operating Systems
├── 03 Networking
├── 04 Distributed Systems
├── 05 MIT 6.5840
├── 06 DDIA
├── 07 Research Papers
├── 08 Research Ideas
├── 09 Projects
├── 10 English
└── 11 Master's
```

### Research

Read:

- 1 introductory Distributed Systems article
- 1 research paper introduction/abstract

### English

Daily:

**20 minutes technical English**

Start vocabulary notes.

### Deliverable

```text
✓ Obsidian Vault
✓ Zotero
✓ Google Scholar profile
✓ GitHub research repository
✓ Go installed
✓ First paper note
```

---

# PHASE 1 — Computer Science Foundations

## 10 Oct → 30 Oct 2026

### Week 1

**10–16 Oct**

Algorithms

- Big O
- Arrays
- Linked Lists
- Stack
- Queue
- Hash Tables

### Week 2

**17–23 Oct**

Algorithms

- Trees
- Heaps
- Graphs
- BFS
- DFS
- Sorting
- Searching

### Week 3

**24–30 Oct**

Concurrency foundations

- Process
- Thread
- Race Condition
- Critical Section
- Mutex
- Semaphore
- Deadlock
- Atomic Operations

### Coding

Use **Go**.

Build:

```text
Concurrent Counter
Thread-safe Queue
Worker Pool
```

### English

Every week:

```text
1 technical summary
1 five-minute explanation
20–30 new technical expressions
```

### Research

Read:

**Time, Clocks, and the Ordering of Events**

Don't try to fully master it yet.

Focus on:

```text
Event
↓
Happened-before
↓
Logical Clock
```

### Deliverable

You should be comfortable with basic algorithms + concurrency.

---

# PHASE 2 — Operating Systems

## 31 Oct → 27 Nov 2026

### Week 4

**31 Oct – 6 Nov**

Processes & Threads

- Process
    
- Thread
    
- Context Switching
    
- System Calls
    
- User Mode
    
- Kernel Mode
    
- IPC
    

---

### Week 5

**7–13 Nov**

Memory

- Stack
    
- Heap
    
- Virtual Memory
    
- Paging
    
- Page Tables
    
- TLB
    
- Page Faults
    

---

### Week 6

**14–20 Nov**

Concurrency

- Mutex
    
- Semaphore
    
- Condition Variables
    
- Deadlock
    
- Starvation
    
- Lock-free concepts
    
- Atomic operations
    

---

### Week 7

**21–27 Nov**

Storage + OS review

- File Systems
    
- Disk I/O
    
- Caching
    
- Buffering
    
- Journaling
    
- RAID
    

### Project

Build:

```text
Mini Concurrent Task Scheduler
```

Features:

```text
Tasks
Workers
Queue
Synchronization
Graceful Shutdown
```

### Research

Read:

**The Google File System**

Focus on:

```text
Failure
Replication
Chunks
Master
Workers
```

### English

Write:

> "How Operating Systems Handle Concurrency"

500 words.

---

# PHASE 3 — Networking

## 28 Nov → 25 Dec 2026

### Week 8

**28 Nov – 4 Dec**

Networking fundamentals:

- OSI
    
- TCP/IP
    
- IP
    
- MAC
    
- ARP
    
- DNS
    
- DHCP
    

---

### Week 9

**5–11 Dec**

TCP:

- Handshake
    
- Reliability
    
- Ordering
    
- Retransmission
    
- Timeout
    
- Flow Control
    
- Congestion Control
    

---

### Week 10

**12–18 Dec**

Application protocols:

- HTTP
    
- HTTPS
    
- HTTP/2
    
- HTTP/3
    
- TLS
    
- WebSockets
    

---

### Week 11

**19–25 Dec**

Distributed communication:

- Sockets
    
- Serialization
    
- RPC
    
- gRPC
    
- Message Queues
    
- Pub/Sub
    

### Project

Build:

```text
TCP Chat Server
```

Then:

```text
Client
   ↓
TCP
   ↓
Server
   ↓
Multiple Clients
```

### Research

Read:

**MapReduce**

Understand:

```text
Client
 ↓
Coordinator
 ↓
Workers
 ↓
Map
 ↓
Shuffle
 ↓
Reduce
```

### English

Explain MapReduce in English for 5 minutes.

---

# PHASE 4 — Distributed Systems Fundamentals

## 26 Dec 2026 → 29 Jan 2027

This is where the real specialization begins.

---

## Week 12

**26 Dec – 1 Jan**

Distributed Systems concepts:

- Definition
    
- Distributed vs Parallel
    
- Scalability
    
- Availability
    
- Reliability
    
- Fault Tolerance
    

### Research

Read:

**MapReduce**

again, but this time critically.

---

## Week 13

**2–8 Jan**

Failure Models:

- Crash Failure
    
- Message Loss
    
- Message Delay
    
- Duplication
    
- Network Partition
    
- Byzantine Failure
    

---

## Week 14

**9–15 Jan**

Time & Ordering:

- Physical clocks
    
- Logical clocks
    
- Lamport clocks
    
- Happened-before
    
- Vector clocks
    
- Causality
    

Read:

**Time, Clocks, and the Ordering of Events**

---

## Week 15

**16–22 Jan**

Replication:

- Primary/Backup
    
- Leader/Follower
    
- State Machine Replication
    
- Quorum
    
- Majority
    

Paper:

**Chain Replication**

---

## Week 16

**23–29 Jan**

Consistency:

- Strong Consistency
    
- Eventual Consistency
    
- Sequential Consistency
    
- Causal Consistency
    
- Linearizability
    

### Important

You should now be able to explain:

> What does Linearizability actually mean?

without memorizing a definition.

---

# PHASE 5 — Consensus + MIT 6.5840

## 30 Jan → 26 Feb 2027

This month is VERY important.

---

## Week 17

**30 Jan – 5 Feb**

Consensus

- What is Consensus?
    
- Why do we need it?
    
- Safety
    
- Liveness
    
- Quorum
    

Read:

**Paxos Made Simple**

Don't get frustrated if Paxos feels difficult.

That's normal.

---

## Week 18

**6–12 Feb**

Raft:

- Leader Election
    
- Terms
    
- Log Replication
    
- Commit
    
- Safety
    

Read:

**In Search of an Understandable Consensus Algorithm**

---

## Week 19

**13–19 Feb**

Implement Raft basics:

```text
Follower
Candidate
Leader
```

Implement:

```text
Leader Election
Heartbeats
Term
Vote
```

---

## Week 20

**20–26 Feb**

Raft:

```text
Log Replication
Commit Index
Persistence
Snapshots
Failure Handling
```

### Deliverable

A working Raft implementation.

Not perfect.

But yours.

---

# PHASE 6 — MIT Labs + Distributed KV Store

## 27 Feb → 31 Mar 2027

Now we turn theory into actual distributed systems.

---

## Week 21

**27 Feb – 5 Mar**

MIT 6.5840:

### MapReduce Lab

Implement:

```text
Coordinator
Workers
Map
Reduce
Failure Handling
```

---

## Week 22

**6–12 Mar**

RPC + Key/Value service.

Build:

```text
Client
 ↓
RPC
 ↓
KV Server
```

---

## Week 23

**13–19 Mar**

Raft + KV:

```text
Client
 ↓
Raft Cluster
 ↓
Replicated KV Store
```

Test:

- Leader failure
    
- Network delay
    
- Concurrent requests
    

---

## Week 24

**20–26 Mar**

Sharding:

```text
Shard 1
Shard 2
Shard 3
```

Study:

- Partitioning
    
- Consistent Hashing
    
- Rebalancing
    
- Hot Partitions
    

---

## Week 25

**27–31 Mar**

Integration + Benchmarking.

Measure:

```text
Latency
Throughput
Failure Recovery
CPU
Memory
```

### Deliverable

## Distributed KV Store

This should become one of your strongest portfolio/research projects.

---

# PHASE 7 — DDIA + Distributed Databases

## 1 Apr → 30 Apr 2027

Now start reading **Designing Data-Intensive Applications** seriously.

---

## Week 26

**1–7 Apr**

DDIA:

- Reliability
    
- Scalability
    
- Maintainability
    
- Data Models
    

---

## Week 27

**8–14 Apr**

Storage:

- B-Trees
    
- LSM Trees
    
- SSTables
    
- Write-Ahead Logs
    

---

## Week 28

**15–21 Apr**

Replication:

- Leader-based
    
- Multi-leader
    
- Leaderless
    
- Quorum
    

---

## Week 29

**22–30 Apr**

Partitioning + Transactions:

- Sharding
    
- Rebalancing
    
- ACID
    
- Isolation
    
- Serializability
    
- MVCC
    
- Distributed Transactions
    

### Papers

Read:

**Dynamo**

**Spanner**

**Bigtable**

---

# PHASE 8 — Advanced Distributed Systems

## 1 May → 21 May 2027

Now stop following one course.

Start exploring the field.

---

## Week 30

**1–7 May**

Distributed Databases

Research:

```text
Distributed SQL
NoSQL
Distributed Transactions
Geo-distribution
Consistency
```

Papers:

```text
Spanner
CockroachDB-related research
FoundationDB-related research
```

---

## Week 31

**8–14 May**

Fault Tolerance:

```text
Crash Fault Tolerance
Recovery
Checkpointing
Replication
BFT
```

Read:

```text
Byzantine Fault Tolerance papers
```

---

## Week 32

**15–21 May**

Modern systems:

Choose **3**:

```text
Serverless
Edge Computing
Distributed ML
Distributed Caching
Cloud Scheduling
Stream Processing
Geo-distributed Systems
Distributed Security
```

Don't study all of them.

Explore them.

---

# PHASE 9 — Research Month

## 22 May → 18 June 2027

This is where the objective changes.

Until now:

> **Learn Distributed Systems**

From here:

> **Learn how to do research in Distributed Systems.**

---

# Week 33

## 22–28 May

### Research Methodology

Learn:

- Research Question
    
- Hypothesis
    
- Literature Review
    
- Baseline
    
- Experiment
    
- Benchmark
    
- Evaluation
    
- Reproducibility
    

Read:

```text
3 Survey Papers
+
3 Recent Papers
```

Choose ONE topic.

---

# Week 34

## 29 May – 4 Jun

Literature Review.

Read:

```text
5–7 papers
```

Build:

```text
Paper
 ↓
Problem
 ↓
Solution
 ↓
Limitation
 ↓
Open Problem
```

Create your first:

# Literature Map

---

# Week 35

## 5–11 Jun

Read another:

```text
5–7 papers
```

Now compare:

```text
Paper A
Paper B
Paper C
Paper D
Paper E
```

Look for:

```text
Common Problem
Different Solutions
Different Trade-offs
Remaining Limitations
```

Create:

# Research Ideas

---

# Week 36

## 12–18 Jun

Pick **2–3 potential research questions**.

For each:

```text
Problem
Existing Work
Gap
Research Question
Hypothesis
Potential Solution
Evaluation Method
Expected Contribution
```

Do NOT worry about finding a revolutionary idea.

Your objective is to learn how to formulate a research problem.

---

# PHASE 10 — Research Project

## 19–30 June 2027

Now build one small research-oriented prototype.

---

## Week 37

**19–25 Jun**

### Research Prototype

```text
Research Question
       ↓
Baseline
       ↓
Your Approach
       ↓
Implementation
       ↓
Experiment
```

Run experiments.

---

## Week 38

**26–30 Jun**

Write the report.

Structure:

```text
1. Abstract
2. Introduction
3. Background
4. Related Work
5. Problem
6. Proposed Approach
7. Implementation
8. Experimental Setup
9. Results
10. Discussion
11. Limitations
12. Future Work
13. Conclusion
```

---

# 30 JUNE 2027 — FINAL CHECKPOINT

At this point you should have:

## Computer Science

```text
✓ Algorithms
✓ OS
✓ Concurrency
✓ Networking
✓ Databases
```

## Distributed Systems

```text
✓ Failure Models
✓ Replication
✓ Consistency
✓ Linearizability
✓ Consensus
✓ Paxos
✓ Raft
✓ Transactions
✓ Sharding
✓ Distributed Storage
✓ Fault Tolerance
```

## Practical

```text
✓ Go
✓ RPC
✓ MapReduce
✓ Raft
✓ Distributed KV Store
✓ Sharding
✓ Benchmarking
```

## Research

```text
✓ Paper Reading
✓ Literature Review
✓ Research Questions
✓ Research Ideas
✓ Experimental Design
✓ Research Prototype
✓ Research Report
```

## English

```text
✓ Technical Reading
✓ Technical Writing
✓ Paper Summaries
✓ Technical Speaking
✓ Academic Vocabulary
```

---

# Your Paper Timeline

مهم جدًا إن الـPapers تكون ماشية بالتوازي، مش تيجي كلها في الآخر.

```text
OCT
Time, Clocks...

NOV
GFS

DEC
MapReduce

JAN
Chain Replication
+
Consistency papers

FEB
Paxos
+
Raft

MAR
ZooKeeper
+
Raft-related papers

APR
Dynamo
+
Bigtable
+
Spanner

MAY
Recent papers
+
Survey papers

JUN
Research-topic papers
```

والقاعدة من يناير:

```text
Minimum:
1 Paper / Week

Target:
1–2 Papers / Week
```

---

# English Timeline

مش هنعمل English course منفصل.

هنعمل:

```text
OCT
Technical Vocabulary

NOV
Technical Reading

DEC
Paper Summaries

JAN
Technical Speaking

FEB
Explain Algorithms in English

MAR
Explain Your Projects

APR
Academic Writing

MAY
Research Discussions

JUN
Research Presentation
```

### Every Week

```text
Reading
20–30 min/day

Vocabulary
10–15 min/day

Writing
1 technical paragraph/week

Speaking
1 × 5–10 min/week

Paper
1/week
```

---

# The Weekly Template You Actually Follow

كل أسبوع عندك 5 حاجات فقط:

```text
┌─────────────────────────────┐
│ 1. THEORY                   │
│ Learn the concept           │
├─────────────────────────────┤
│ 2. CODE                     │
│ Implement something         │
├─────────────────────────────┤
│ 3. PAPER                    │
│ Read + analyze              │
├─────────────────────────────┤
│ 4. ENGLISH                  │
│ Read + write + speak        │
├─────────────────────────────┤
│ 5. REVIEW                   │
│ What did I actually learn? │
└─────────────────────────────┘
```

---

# Your Master Timeline

```text
03 OCT 2026
      │
      ▼
┌──────────────────────┐
│ FOUNDATIONS          │
│ Algorithms           │
│ Concurrency          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ OPERATING SYSTEMS    │
│ Processes            │
│ Memory               │
│ Concurrency          │
│ Storage              │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ NETWORKING           │
│ TCP/IP               │
│ Sockets              │
│ RPC                  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ DISTRIBUTED SYSTEMS  │
│ Failures             │
│ Time                 │
│ Replication          │
│ Consistency          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ CONSENSUS            │
│ Paxos                │
│ Raft                 │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ MIT 6.5840           │
│ Labs                 │
│ MapReduce            │
│ Raft                 │
│ KV Store             │
│ Sharding             │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ DDIA                 │
│ Databases            │
│ Replication          │
│ Transactions         │
│ Partitioning         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ ADVANCED SYSTEMS     │
│ BFT                  │
│ Cloud                │
│ Distributed DB       │
│ Modern Systems       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ RESEARCH             │
│ Literature Review    │
│ Research Questions   │
│ Research Gap         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ RESEARCH PROJECT     │
│ Prototype            │
│ Experiments          │
│ Paper                │
└──────────┬───────────┘
           │
           ▼
     30 JUNE 2027
           │
           ▼
    MASTER'S READY
```

## One important adjustment

**ما تعتبرش 30 يونيو 2027 "نهاية التعلم".** دي نهاية **المرحلة الأولى من التجهيز**. من يوليو 2027 المفروض تدخل في مرحلة مختلفة تمامًا:

```text
July 2027+
     ↓
Choose Research Area
     ↓
Deep Literature Review
     ↓
Find Supervisors
     ↓
Contact Researchers
     ↓
Research Collaboration
     ↓
Master's Applications
     ↓
Thesis Direction
```

يعني الـ9 شهور دول هدفهم إنك توصل من **Backend Developer عنده اهتمام بـDistributed Systems** إلى شخص عنده **Systems foundation + Distributed Systems knowledge + projects + paper-reading ability + بداية Research Profile**. ده فرق كبير جدًا في موقفك لما تبدأ تكلم دكاترة أو تقدم على برامج ماجستير.