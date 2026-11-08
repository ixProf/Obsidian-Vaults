---
title: "Software Development - Lecture 2"
aliases: []
type: source
status: active
domain: software-engineering
tags: [source, software-engineering, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


# 1) Software Development Life Cycle (SDLC)

## Definition:

> SDLC is the structured process used to develop software from the initial idea to maintenance and evolution.

---

## Core Idea:

Software development is **not just coding**, it is a **full lifecycle** consisting of multiple phases that ensure the system is:

- correct
    
- maintainable
    
- high quality
    

---

## SDLC Phases (Very Important)

According to the lecture (page 2):

1. **Conception**
    
2. **Requirements Analysis**
    
3. **Design**
    
4. **Coding and Debugging**
    
5. **Testing**
    
6. **Release**
    
7. **Maintenance / Evolution**
    

---

## Deep Explanation of Each Phase

---

### 1) Conception

> This is where the project idea is born.

---

### What happens here:

- Identify a problem or opportunity
    
- Evaluate feasibility
    
- Determine business value
    

---

### Example:

Building an **Attendance System**

- Why do we need it?
    
- Who will use it?
    
- What value does it provide?
    

---

---

### 2) Requirements Analysis

> Define what the system should do.

---

### Types of Requirements:

#### Functional Requirements:

- What the system does  
    (e.g., "student can mark attendance")
    

#### Non-Functional Requirements:

- How the system behaves  
    (e.g., performance, security, scalability)
    

---

### Critical Insight:

> This is the most dangerous phase.

If requirements are wrong:  
→ Everything built afterward will also be wrong.

---

### Real-world Problem:

- Customers don’t fully understand what they want
    
- Requirements change frequently
    

---

---

### 3) Design

> How the system will be built.

---

### Two Levels:

#### High-Level Design:

- Architecture (MVC, layered, microservices)
    

#### Low-Level Design:

- Classes
    
- Database schema
    
- APIs
    

---

### Example:

Attendance System:

- Entities: Student, Course, Attendance
    
- Relationships between them
    

---

---

### 4) Coding and Debugging

> Implementation of the design into code.

---

### Important Insight:

Many people think this is the most important phase.

> In reality, it is only execution of previous decisions.

---

### Debugging:

- Finding and fixing errors
    

---

---

### 5) Testing

> Ensuring the system works correctly.

---

### Types:

- Unit Testing
    
- Integration Testing
    
- System Testing
    

---

### Purpose:

- Detect defects
    
- Validate requirements
    
- Ensure reliability
    

---

---

### 6) Release

> Delivering the product to users.

---

### Could be:

- Web application
    
- Mobile application
    
- API system
    

---

---

### 7) Maintenance / Evolution

> Post-release development and updates.

---

### Includes:

- Bug fixing
    
- Feature additions
    
- Performance improvements
    

---

### Key Insight:

> Most of the software lifecycle effort happens here.

---

---

# 2) Development Process Models

According to the lecture (page 3):

> Two main categories:

1. **Plan-Driven Models**
    
2. **Agile Models**
    

---

---

## Plan-Driven Models

### Concept:

> Complete each phase fully before moving to the next.

---

### Characteristics:

- Strict phases
    
- Heavy documentation
    
- Formal approvals (sign-off)
    
- Controlled process
    

---

### Works best for:

- Large systems
    
- Government projects
    
- Well-defined requirements
    

---

---

## Agile Models

### Concept:

> Iterative + Incremental development

---

### How it works:

- Develop a small part
    
- Test it
    
- Get feedback
    
- Improve
    
- Repeat
    

---

### Key Principle:

> Frequent small releases are better than large infrequent ones.

---

### Characteristics:

- Flexible
    
- Less documentation
    
- Continuous feedback
    
- Faster adaptation
    

---

---

# 3) Choosing the Right Model

> There is no single best model.

---

### Selection depends on:

- Project size
    
- Domain
    
- Team experience
    
- Timeline
    

---

### Insight:

Different projects require different approaches.

---

---

# 4) Variables of Software Development (Critical Section)

From pages 7–13

---

## The Three Core Variables

1. **Cost**
    
2. **Time**
    
3. **Scope**
    

---

## The Iron Triangle

> These three variables are interdependent.

---

### Rule:

> Fix any two → the third must change

---

### Examples:

#### Case 1:

- Time + Cost fixed  
    → Scope must decrease
    

#### Case 2:

- Scope + Time fixed  
    → Cost increases
    

#### Case 3:

- Scope + Cost fixed  
    → Time increases
    

---

### Practical Insight:

Customers usually fix:

- Budget (Cost)
    
- Deadline (Time)
    

→ Developers must adjust **Scope**

---

---

# 5) Detailed Explanation of Variables

---

## 1) Cost

> Budget and resources allocated

---

### Includes:

- Salaries
    
- Tools
    
- Infrastructure
    

---

### Important Note:

- Developers usually have **limited control**
    

---

---

## 2) Time

> Project deadline

---

### Key Issue:

- Usually imposed externally
    

---

### Problem:

If delayed:

- Reduce features
    
- Or reduce quality
    

---

---

## 3) Scope (Features)

> What the system does

---

### Most Important for Customer

---

### Major Risk:

> Scope Creep

---

### Meaning:

Continuous addition of features

---

### Result:

- Delays
    
- Over-budget
    
- System instability
    

---

---

# 6) Extended Variables (Advanced Understanding)

---

## 4) Quality

> How well the system performs

---

### Includes:

- Reliability
    
- Maintainability
    
- Performance
    

---

### Trade-off:

Higher quality:

- ↑ Cost
    
- ↑ Time
    

---

### Critical Insight:

> Sacrificing quality gives short-term gain but long-term failure

---

---

## 5) Benefit

> Value delivered to both client and provider

---

### Important Point:

- Market or user needs may change  
    → affects scope
    

---

---

## 6) Risk

> Probability of failure

---

### Examples:

- Not finishing features
    
- Exceeding budget
    
- Missing deadlines
    

---

### Key Insight:

> Managing one risk may increase another

---

### Example:

- Extending time reduces scope risk  
    → but increases cost
    

---

---

# 7) Code and Fix Model

---

## Concept:

> Write code → fix errors → repeat

---

### Process:

- Code
    
- Compile
    
- Run
    
- Fix
    
- Repeat
    

---

---

## Characteristics:

- No planning
    
- No documentation
    
- No formal testing
    
- No design
    

---

---

## Suitable for:

- Small projects
    
- One developer
    
- Quick prototypes
    

---

---

## Problem:

> Not scalable, not maintainable

---

---

# 8) Waterfall Model

---

## Concept:

> Sequential development

---

### Phases:

- Requirements
    
- Design
    
- Implementation
    
- Testing
    
- Release
    
- Maintenance
    

---

---

## Advantages:

- Clear structure
    
- Easy management
    
- Good for beginners
    
- Good for large projects
    

---

---

## Problems:

### Problem 1:

> Must complete phase before next

---

### Issue:

Requirements are rarely fully known at the beginning

---

---

### Problem 2:

> No going back

---

### Issue:

- Real-world development requires iteration
    
- Mistakes cannot be easily fixed
    

---

---

# 9) Waterfall with Feedback

---

## Improvement:

> Allows returning to previous phases

---

### Benefit:

- Fix errors
    
- Adjust design
    

---

---

## Still has problems:

- Still rigid
    
- Hard scheduling
    
- Unpredictable completion time
    

---

---

# 10) Iterative Models

---

## Concept:

> Build system in iterations (mini-projects)

---

### Each iteration includes:

- Requirements
    
- Design
    
- Coding
    
- Testing
    

---

---

## Key Idea:

> Deliver working system after each iteration

---

---

## Important Rule:

> Binary Deliverable

Either:

- Delivered and accepted  
    OR
    
- Not delivered
    

---

---

## Key Principle:

> Analyze some, design some, code some, test some every day

---

---

# 11) Evolutionary Prototyping Model

---

## Concept:

> Build system gradually using prototypes

---

### Process:

1. Initial requirements
    
2. Quick design
    
3. Build prototype
    
4. Customer evaluation
    
5. Refine
    
6. Repeat
    

---

---

## Advantages:

- Better visibility
    
- Strong customer involvement
    
- Continuous feedback
    

---

---

## Disadvantages:

- Unrealistic expectations
    
- Poor design
    
- Low maintainability
    
- Frequent rework
    

---

---

## Best suited for:

- Small experienced teams
    
- Unclear or changing requirements
    

---

---

## Important Note:

> This model evolved into Agile

---

---

# Final Key Takeaways

---

- SDLC is a structured lifecycle, not just coding
    
- No single best model
    
- Plan-driven = strict, Agile = flexible
    
- Iron Triangle controls everything
    
- Scope creep is dangerous
    
- Waterfall is unrealistic in practice
    
- Iterative development is more practical
    
- Prototyping leads to Agile

## **1. Core Category Comparison: Plan-Driven vs. Agile**

This is the fundamental division in software engineering methodologies.

|**Feature**|**Plan-Driven Models**|**Agile Models**|
|---|---|---|
|**Concept**|Complete each phase fully before moving to the next.|Iterative and Incremental development.|
|**Documentation**|Heavy and comprehensive documentation.|Minimal documentation; focus on the product.|
|**Flexibility**|Low; the process is strictly controlled.|High; designed for fast adaptation.|
|**Approvals**|Requires formal "sign-offs" at each stage.|Based on frequent small releases and feedback.|
|**Best Used For**|Large systems and government projects.|Unclear requirements or fast-moving markets.|

---

## **2. Detailed Comparison of Specific Models**

Each model has a different philosophy regarding how to handle the SDLC.

|**Model**|**Philosophy**|**Pros**|**Cons**|
|---|---|---|---|
|**Code and Fix**|Write code, then fix errors in a loop.|Fast for very small, one-developer tasks.|Not scalable, no design, and hard to maintain.|
|**Waterfall**|Linear, sequential flow (Requirements → Design → Code).|Clear structure and easy for beginners to manage.|No going back; requirements must be 100% known at start.|
|**Waterfall with Feedback**|Sequential but allows returning to the previous phase.|Allows for error correction and design adjustments.|Rigid scheduling; hard to know exactly when finished.|
|**Iterative**|Developing the system in "mini-projects" (Iterations).|Delivers a working system after every cycle.|Requires strict binary rules (Accepted or Not).|
|**Evolutionary Prototyping**|Building gradual versions based on customer evaluation.|High customer involvement and early visibility.|Can lead to poor design and unrealistic expectations.|

---

## **3. The Iron Triangle: Project Variables**

The relationship between these variables is critical. If you fix two, the third **must** change to maintain balance.

- **Scenario 1: Fixed Time + Cost** $\rightarrow$ **Scope** must decrease (fewer features).
    
- **Scenario 2: Fixed Scope + Time** $\rightarrow$ **Cost** increases (more resources needed).
    
- **Scenario 3: Fixed Scope + Cost** $\rightarrow$ **Time** increases (delivery is delayed).
    

---

## **4. Extended Variables and Risks**

Beyond the triangle, quality and risk play a major role in choosing a model.

- **Quality:** Sacrificing quality for speed creates "technical debt" and leads to long-term failure.
    
- **Scope Creep:** The continuous addition of features is the biggest risk to budget and deadlines.
    
- **Risk Management:** Choosing a model like **Prototyping** reduces "Requirement Risk" but may increase "Design Risk".
    

---

## **Final Insights**

- **No "Silver Bullet":** There is no single best model; it depends on project size and team experience.
    
- **Practicality:** While **Waterfall** is structurally simple, **Iterative** and **Agile** models are more realistic for modern software development.