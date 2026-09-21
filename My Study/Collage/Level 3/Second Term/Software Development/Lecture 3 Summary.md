## 1. Agile Development Methodologies

### Why Agile?

Traditional models focus on:

- Documentation
    
- Processes
    
- Planning
    
- Controls
    

Agile focuses on:

- Working software
    
- Fast delivery
    
- Customer collaboration
    
- Responding to change
    

### Agile Characteristics

- Lightweight methodology
    
- Less documentation
    
- Fewer process controls
    
- Suitable for small & medium projects
    
- Works well with small teams
    
- Adapts quickly to changing requirements
    
- Delivers software faster
    

### Agile Principles

- Developers spend more time coding than documenting.
    
- Deliver working software continuously.
    
- Customers participate actively.
    
- Common code ownership.
    
- Continuous refactoring.
    

### Agile Myths

❌ Agile only works for small projects.  
✅ Works for small and medium projects.

❌ Agile requires no discipline.  
✅ Requires strong discipline in planning, testing, and collaboration.

---

# 2. Extreme Programming (XP)

### Definition

XP is a:

- Lightweight
    
- Flexible
    
- Efficient
    
- Predictable
    
- Low-risk
    
- High-quality Agile methodology
    

### Goal

Reduce development risks while delivering high-quality software quickly.

---

# 3. XP Fundamental Ideas

### 1. Heavy Customer Involvement

Customer:

- Works with the team
    
- Stays on-site
    
- Helps define iterations
    
- Creates acceptance tests
    
- Evaluates releases
    

**Benefit:** Immediate feedback and requirement clarification.

---

### 2. Test-Driven Development (TDD)

Process:

1. Write Test
    
2. Write Code
    
3. Run Tests
    
4. If all tests pass → Feature Complete ✅
    

Benefits:

- Clear success criteria
    
- Better design
    
- Fewer bugs
    

---

### 3. Pair Programming ⭐ (Important)

Two developers work together on one computer.

#### Roles

**Driver**

- Writes code
    

**Navigator**

- Reviews code
    
- Finds mistakes
    
- Suggests improvements
    
- Thinks about architecture
    

#### Role Switching

- Every ~30 minutes
    
- Or whenever needed
    

Benefits:

- Better quality
    
- Fewer defects
    
- Better design
    
- Knowledge sharing
    
- Encourages refactoring
    

---

### 4. Short Iterations & Frequent Releases

- Release every few months
    
- Iterations last 4–6 weeks
    

Benefits:

- Fast feedback
    
- Early problem detection
    
- Requirement validation
    

---

### Continuous Integration (CI)

When a feature is finished:

1. Run unit tests
    
2. Integrate code
    
3. Build system
    
4. Run all tests again
    

If something breaks → Fix immediately.

**Result:** Integration may happen several times per day.

---

# 4. XP and Risk Management

### Common Risks

- Schedule delays
    
- Project cancellation
    
- High defect rates
    
- Requirement misunderstandings
    
- Unwanted features
    
- Employee turnover
    

### Four Variables

1. Cost
    
2. Time
    
3. Scope ⭐ (Most Important)
    
4. Quality
    

**Why Scope?**  
Controlling scope greatly reduces project risk.

---

# 5. XP Four Basic Activities

### 1. Coding

- Most important activity
    
- Main deliverable
    
- Can act as documentation
    

### 2. Testing

- Tests before code
    
- Feature complete only when all tests pass
    
- Automated testing through CI/CD
    

### 3. Listening

Two knowledge types:

**Domain Knowledge**

- Business
    
- Industry
    
- Requirements
    

**Technical Knowledge**

- Programming
    
- Tools
    
- Technologies
    

Customers know business.  
Developers know technology.  
Both must communicate continuously.

### 4. Designing

Good design:

- Reduces coupling
    
- Simplifies maintenance
    
- Makes changes easier
    

Goals:

- One responsibility per place
    
- Easy modification
    
- Easy extension
    

---

# 6. XP Four Core Values

### 1. Communication

Supported by:

- Pair programming
    
- Collective ownership
    

### 2. Simplicity

- Do the simplest thing that works.
    
- Improve later using refactoring.
    

### 3. Feedback

Sources:

- Unit tests
    
- Acceptance tests
    

### 4. Courage

Developers should be willing to:

- Change design
    
- Rewrite code
    
- Remove bad solutions
    
- Discard failed code
    

---

# 7. XP 15 Principles (Most Important)

1. Rapid Feedback
    
2. Assume Simplicity
    
3. Incremental Change
    
4. Quality Work
    
5. Embrace Change
    
6. Teach Learning
    
7. Small Initial Investment
    
8. Work with People's Instincts
    
9. Open Honest Communication
    
10. Travel Light (avoid unnecessary docs/code)
    
11. Concrete Experiments (Spike)
    
12. Accepted Responsibility
    
13. Play to Win
    
14. Local Adaptation
    
15. Honest Measurement
    

### Spike

A quick proof-of-concept used to test ideas before major investment.

---

# 8. XP 12 Practices (Very Important for Exams)

### 1. Small Releases

- Every 1–2 months
    
- Faster feedback
    

### 2. On-Site Customer

- Works with team
    
- Writes & executes functional tests
    
- Clarifies requirements
    

### 3. Collective Ownership

- Anyone can modify any code
    
- Knowledge spreads across team
    

### 4. Simple Design

Design must:

- Pass all tests
    
- Have no duplicate code
    
- Clearly express intent
    
- Use minimum classes and methods
    

### 5. Testing

- Developers write unit tests
    
- Customers write functional tests
    

**Rule:** No Test = No Feature

### 6. Refactoring

Improve code without changing behavior.

Goals:

- Remove redundancy
    
- Simplify code
    
- Improve readability
    
- Improve maintainability
    
- Improve flexibility
    

### 7. Pair Programming

Benefits:

- Knowledge sharing
    
- Better quality
    
- Prevents **Beer Truck Problem**  
    (project suffers if the only expert leaves)
    

### 8. Coding Standards

Common coding guidelines improve:

- Readability
    
- Maintenance
    
- Refactoring
    

### 9. Continuous Integration

- Integrate after every completed task
    
- Problems detected quickly
    

### 10. 40-Hour Week

Avoid overtime because it causes:

- Fatigue
    
- More bugs
    
- Lower productivity
    

### 11. Planning Game

Customer:

- Defines priorities
    

Developers:

- Define tasks
    
- Estimate effort
    

### 12. Metaphor

A simple shared story explaining how the system works.

Benefits:

- Better communication
    
- Better understanding
    
- Better naming of classes and methods
    

---
