---
title: "Software Requirements Analysis - Lecture 2"
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
# 1. Case Study: Mental Health Care System

## System Overview

A medical information system that:

- Stores patient information
- Tracks treatments
- Supports doctors in decision-making

Patients typically attend clinics regularly rather than staying in hospitals.

---

## Functional Requirements (What the system does)

These describe system services and behavior:

1. Patient Management

	- Create patient records
	- Edit patient records
	- View patient records
2. Data Processing
	- Provide summaries of patient data
3. Monitoring
	- Monitor patients under treatment
	- Detect abnormal conditions
4. Alerts
	- Generate warnings if problems are detected
5. Reporting
	- Generate monthly management reports including:
    
    - Number of patients treated
    - Patients entering/leaving the system
    - Prescribed drugs and costs

---

## Non-Functional Requirements (System constraints)

These define system quality attributes:

1. Privacy
	- Patient data must remain confidential
	- Only authorized users can access it
2. Safety
	- The system must detect potentially dangerous patients
	- Must alert medical staff
3. Availability
	- The system must always be operational
	- Failure may lead to serious consequences

- Functional → What ==the system does==
- Non-functional → ==How the system behaves==

![[Pasted image 20260402032708.png]]

---

# 2. Case Study: Wilderness Weather Station

## System Overview

A system that:

- Collects environmental data
- Performs initial processing
- Sends data to a central system

---

## Data Collected

- Temperature
- Pressure
- Rainfall
- Sunshine
- Wind speed
- Wind direction

---

## Functional Requirements

1. Monitoring
	- Monitor ==instruments== and ==communication== hardware
	- Detect and report faults
2. Power Management
	- Manage battery charging
	- Shut down generators in dangerous conditions
3. Reconfiguration
	- Replace failed components dynamically
	- Switch to backup systems during failures

![[Pasted image 20260402032810.png]]

---

## System Architecture (important concept)

From the diagram (page 5):

- Multiple local systems connect to a central server
- Server communicates with a database

This shows a **distributed system architecture**

---

# 3. Software Process

## Definition

A structured ==set of activities== required to develop a software system

---

## Main Activities

### 1. Specification
What ==services are required== and the constraints on the system’s operation and development.

Defines:
- System services
- Constraints

Output: ==Requirements document==

![[Pasted image 20260402034536.png]]

---

### 2. Software Development

 The ==process of converting the system specification into an executable== system

#### Design
- Define ==system structure== (architecture, components)
![[Pasted image 20260402035255.png]]

#### Implementation
- ==Translate this structure into an executable== program
---
### 3. Validation
==Ensures==:
- The system ==meets user requirements==
Includes:
- Testing
- Verification

### 4. Evolution

- ==Modify the system after deployment==
- Handle:
    - New requirements
    - Bug fixes
    - Improvements

Important note:

- Most ==software cost occurs during evolution==

---

# 4. Software Process Types

## Plan-Driven Processes
Characteristics:

- All activities ==are planned in advance==
- Requirements ==are fixed==
- ==Heavy== documentation

Advantages:

- Predictability
- ==Suitable== for large, critical systems

Disadvantages:
- Difficult to handle changes

## Agile Processes

Characteristics:

- ==Flexible== and adaptive
- Requirements evolve over time
- ==Frequent== customer ==feedback==

Advantages:

- Handles ==change well==
- ==Faster delivery==

Disadvantages:

- Less predictability
---------
# 5. Software Process Models

## 1. Waterfall Model

Structure:

- Sequential phases:
    1. Requirements
    2. Design
    3. Implementation
    4. Testing

Characteristics:

- Each phase ==must finish before== the next

Advantages:

- Simple and structured

Disadvantages:

- Inflexible
- Changes ==are difficult==

![[Pasted image 20260402033824.png]]


---

## 2. Incremental Development

Structure:

- System is ==developed in parts== (increments)

Characteristics:

- Each increment delivers part of the system

Advantages:

- ==Early delivery== -> releases
- Easier to adapt to change

Disadvantages:

- Requires good planning and design

![[Pasted image 20260402033752.png]]


---

## 3. ==Reuse-Oriented== Software Engineering

Concept:
- Build systems ==using existing components==

Advantages:
- Reduces ==development time==
- ==Reduces== cost
- ==Reduces== the amount of software to be developed

Disadvantages:
- Requirements are modified and this may lead to a system that doesn't meet the real needs of users

- Control over the system evolution is lost as new versions of the reusable components are not under the control of organization using them

![[Pasted image 20260402033911.png]]

---

# 6. Coping with Change

Techniques ==used to handle changing== requirements:

## 1. Prototyping
- Build an early version of the system
- Helps clarify requirements

## 2. Incremental Delivery
- Deliver system in stages

## 3. Spiral Model

- Combines:
    - Iteration
    - Risk analysis

---

# 7. Software Development Details

## Programming

- No universal method
- Developers may:
    - Start with simple parts
    - Or start with complex parts

---
## Testing and Debugging

- Testing is ==done during development==
- Errors are ==identified and fixed==

Definition:
- Debugging = ==finding and fixing defects==