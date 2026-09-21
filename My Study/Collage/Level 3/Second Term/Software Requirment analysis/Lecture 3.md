# 1. Software Process Activities — Core Understanding

Every software system is built through four fundamental activities:

- Software Specification
- Software Development
- Software Validation
- Software Evolution
    

## Important Concept

These are ==not strict sequential steps.== They are:

- Always present in any system
- Interconnected
- Often repeated (iterative)
    

### Why does organization differ?

Because different systems have:

- Different ==sizes==
    
- Different ==risks==
    
- Different ==requirement stability==
    

### Example:

- Waterfall → activities are sequential
    
- Incremental → activities ==overlap and repeat==
    

---

# 2. Software Specification — The ==Most Critical Phase==

## Definition

Software specification is the process of:

- Defining ==what the system should do== (services)
    
- Defining ==constraints on system operation and development==

---

### Step 1: Feasibility Study

#### Purpose

To ==decide whether the system is worth building==.

#### Types of feasibility:

1. Technical
    
    - Do we have the ==required technology==?
2. Economic
    
    - Is it financially justified?
    
3. Operational
    
    - Will users accept and use the system?
        

#### Key Insight

If ==feasibility fails==, the project ==should not continue==.

---

### Step 2: Requirements Elicitation & Analysis

#### Elicitation (Gathering Requirements)

Requirements are ==collected ==from:

- Clients
    
- Users
    
- Stakeholders
    

---

#### Why is this step difficult?

1. Users may ==not understand their needs==
    
2. Different stakeholders ==may conflict==
    
3. Requirements ==change frequently==
    

This is one of the ==most error-prone phases in software engineering==.

---

#### Analysis (Refinement)

- Resolve ==conflicts between requirements==
    
- ==Prioritize== requirements
    
- Understand the application domain
    

---

#### Example

User says:  
“The system should be fast”

After analysis:  
“The system response time must be less than 2 seconds”

---

### Step 3: Requirements Specification

#### Purpose

To ==document requirements clearly and precisely==.

---

#### Two types of requirements:

1. User Requirements
    
    - ==High-level==
    - Written in natural language
    - ==Intended== for customers
    
2. System Requirements
    
    - ==Detailed==
    - Technical
    - Used by developers
    
---

#### Key Difference

- User requirements → ==what users understand==
    
- System requirements → what ==developers implement==
    

---

### Step 4: Requirements Validation

#### Purpose

To ==ensure that requirements are==:

- Correct
- Complete
- Consistent
- Realistic


---

#### Techniques used:

- Reviews
- Prototyping
- Test scenarios

---

#### Critical Insight

If requirements are wrong, the ==entire system will be wrong.==

---

# 3. Software Development

## Definition

The process of ==converting system specifications into an executable system==

---

## Two Main Parts

# (A) Software Design

## Purpose

To define ==how the system will be structured== before coding.

---

## Design Levels

### 1. Architectural Design

Defines:

- Overall system structure
- Components and their relationships

---

### 2. Interface Design

Defines:

- How ==components communicate==
- APIs and interactions

---

### 3. Component Design

Defines:

- Internal ==logic of each module==

---

### 4. Database Design

Defines:

- Data structures
- Relationships between data

---

## Key Insight

Design is ==like a blueprint.
Implementation is the construction.==

---

# (B) Implementation

## Definition

==Translating design into code==.

---

## Important Concept

Programming is a personal activity:

- No single correct approach
- Developers choose their own strategies

Examples:

- Start with simple components
- Start with complex components
    

---

## Testing During Development

- Developers ==test code while writing it==
    
- Errors are ==discovered and fixed==
    

Definition:  
Debugging = ==identifying and fixing defects==

---

# 4. Software Validation

## Definition

Ensuring that the system:

- Conforms to its specification
    
- Meets customer requirements
    

---

## Verification vs Validation

- Verification → Are we building ==the system correctly==?
    
- Validation → Are we building the ==correct system==?
    

---

## Levels of Testing

### 1. Component Testing

- Test ==individual units/modules==
    

---

### 2. System Testing

- Test the ==complete integrated system==
    

---

### 3. Acceptance Testing

- ==Conducted with the customer==
    

---

## Alpha vs Beta Testing

### Alpha Testing

- ==Internal== testing
- Controlled environment
    

---

### Beta Testing

- Real users
- Real environment
    

Purpose:

- Discover ==unexpected real-world issues==
    

---

# 5. Software Evolution

## Definition

Modifying ==existing software to meet new requirements==

---

## Why Evolution Happens

1. Business changes
2. Technological changes
3. Hardware/platform changes
    

---

## Evolution Process

1. Identify ==new requirements==
    
2. Analyze ==existing system==
    
3. Propose changes
    
4. Implement modifications
    

---

## Key Insight

==Most of the cost== of software occurs ==during evolution, not initial development.==

---

# 6. Coping with Change

## Key Idea

Change is ==unavoidable== in software systems.

## Impact of Change

- Causes ==rework==
- ==Increases== cost
    

## Strategies to Manage Change

### 1. Change Avoidance

- Anticipate changes early
    
- ==Design flexible systems==
    

---

### 2. Change Tolerance

- Accept that change will happen
    
- Use ==flexible development models==
    

---

# 7. Techniques to Handle Change

## 1. Software Prototyping

## Definition

An early version of a system used to:

- Demonstrate concepts
    
- Explore design options
    

---

## Uses

### In Requirements Phase

- Helps clarify user needs
    
- Reduces misunderstanding
    

---

### In Design Phase

- Helps design user interfaces
    

---

## 2. Incremental Delivery

- System is developed and delivered in parts
    

---

## 3. Spiral Model

- Combines iteration with risk analysis
