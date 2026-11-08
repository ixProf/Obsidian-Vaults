---
title: "Software Requirements Analysis - Lecture 6"
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

# Requirement Engineering

- Requirements engineering is The Process of ==fining out, analyzing, documenting and checking these services== and constraints
- Requirements are  ==the descriptions== of the system services and constraints that are generated during the requirements engineering process

> Process -> Requirements engineering , Description -> Requirements

## Requirements Type

- User Requirements
	- Statements in a ==natural language + diagrams== of services that system provides and its operational constraints
	- Written for customers.
- System Requirements
	- A Structured Document setting out more detailed to define exactly what should be implemented, descriptions of the system's functions, services and operational constraints
	- Written for developer (who are involved in system implementation)

> User requirements may expanded into several system requirements

---

## Functional and  non-functional requirements

- Functional Requirements
	- statements of services the system should provide, ==how system should react to particular inputs and how the system should behave in particular situations==
	- also may state ==what the system should not do==
	- ==Describe functionality or system services==.
	- Depend on:
		- The type of software being developed
		- Expected users
		- The general approach taken by the organization
	- Functional user Requirements
		- may be high-level statements of what the system should do
	- Functional system requirements
		- should describe the system services in detail, that includes input and outputs
	- Functional Requirements for the MHC-PMS:
		- A user ==shall be able to search== the appointments list for all clinics
		- The ==system shall generate== each day, for each clinic, a list of patients who are expected to attend appointments that day
		- Each staff member using the system ==shall be uniquely identified== by his or her 8-digit employee number

- Requirements imprecision
	- Problems arise when ==requirements are not precisely==
	- Ambiguous requirements may be interpreted in different ways by developers and users
- Requirements completeness and consistency
	- Requirements should be both complete and consistent
	- Complete:
		- They should include descriptions of all facilities required
	- Consistent:
		- There should be no conflicts or contradictions in the descriptions of the system facilities

- Non-Functional Requirements
	- Define system ==properties== rather than specific services
	- ==Constraints== on the services or functions offered by system such as ==timing constraints, constraints on the development process==
	- Often apply to the ==system as a whole== rather than individual features or services
	- Examples:
		- **System Properties**: reliability, response time, maintainability, storage requirements.
		- Constraints: I/O device capability, data representations
		- Process Requirements: Mandating particular CASE system, Programming language
	![[Pasted image 20260530182637.png|287]]
	- Product Requirement:
		- Specify that the delivered product ==must behave in a particular way== (Performance): how ==fast systems is== and (Reliability): ==Acceptable failure rate==.
		- EX: The MHC-PMS ==shall be available to all clinics during normal working== hours. Downtime within normal working hours ==shall not exceed five seconds== in one day
	- Organizational Requirement
		- Requirements which are consequence of ==organizational policies and procedures== e.g. process requirements that ==define how the system will be used==
		- Example: Users of the MHC-PMS system shall ==authenticate== themselves using their health authority identity cards (Security Requirements)
	- External Requirement
		- Requirements which arise from factors which are external to the system and its development process e.g. 
			- **Interoperability**: ==how the system work with other system on other organization==
			- Legislative requirements -> ==Law Requirements==
		- Example: the system shall implement patient privacy provisions as set out in HStan-03-2006-priv.
	- Non-Functional Requirements implementation
		- Non-functional Requirements may ==affect the overall architecture of a system rather than the individual components.
		- A single non-functional requirement, such as a security requirement, my generate a number of  related functional requirements that ==define system services that are required==
	- common problem with non-functional requirement is that user express them as a general goal.
		- Goals: ==general intention of the user such as **ease of use**==
		- Verifiable Non-Functional Requirement:
			- statements using some measures that can be objectively tested.
		- Goals are helpful to developers as they convey the intentions of the system users.
		![[Pasted image 20260530191106.png]]
	- Metrics for specifying non-functional requirements
		![[Pasted image 20260530192018.png]]
	
- Domain Requirements
	- Constraints on the system from the ==domain of operation==

---

## Software Requirements Specification (SRS)

- Representing requirements using SRS Document:
	- The SRS is ==the official statement of what is required of the system developer==
		- Should include both
			- a definition of user requirements
			- a specification of the system requirements
		- It is not a design document
		- It should set ==WHAT== the system should do ==rather than== ==HOW it should do it==

## Agile Method and requirements:

- Many agile methods argue that producing a requirements document is a ==waste of time== as requirements change so quickly  (يعني مبيعملش كدا)
- Methods such as XP use incremental requirements engineering as express requirements as 'User Stories'
- This is practical for business systems but problematic for systems that require a lot of pre-delivery analysis or systems developed by several teams.

### Users of a Requirements document

- System Customers
	- specify the requirements and read them to check that they meet their needs. ==Customers specify changes to the requirements.==
- Managers
	-  ==plan a bid for the system== and to ==plan the system development process==
- System engineers
	- Use the requirements to ==understand what system is to be developed==
- System Test Engineers
	- develop validation tests for the system
- System Maintenance Engineers
	- understand the system and the relationships between it parts

### The Structure of requirements document

- Preface: 
	- define ==the expected readership of the document and describe its version history==, including a rationale for the creation of a new version and summary of the changes made in each version
- Introduction:
	- describe ==the need for the system== , ==system's functions== and explain ==how it will work with other systems==, also describe ==how the system fits into the overall business== or strategic objectives of the organization commissioning the software
- Glossary
	- define the technical terms used in the document. ==You should not make assumptions about the experience or expertise of the reader==
- User Requirements definition
	- Describe the services provided for the user. ==The non-functional requirements should also be described in this section==. this description may use ==natural  language, diagrams, or other notations that are understandable to customer==. Product and process standards that must be followed should be specified
- System Architecture
	- should present a high-level overview of the anticipated system architecture, showing the distribution of functions across system modules. Architectural components that are reused should be highlighted
- System models
	- This might include ==graphical system models== showing the relationships between the system components, the system, and its environment
	- Examples
		- Object models
		- data-flow models
		- semantic data models
- System evolution
	- describe ==the fundamental assumptions on which the system is based==, and any ==anticipated changes due to hardware evolution==, changing user needs, and so on. this is useful for 

### Ways of Writing a System Requirements Specification (SRS)

1. **Natural Language Sentences**
    
    - Requirements are ==written as numbered statements using everyday language==.
        
    - Each ==sentence== represents a ==single requirement==.
        
    - Simple to write but may ==cause ambiguity==.
        
2. **==Structured== Natural Language**
    
    - Uses ==predefined templates== or forms to organize requirements.
        
    - Each section ==focuses on a specific aspect of the requirement.==
        
    - Reduces ==confusion and improves consistency==.
        
3. ==**Design Description== Languages**
    
    - Uses==programming-like or formal languages== to describe system ==behavior and operations==.
        
    - Helpful for ==technical specifications==, especially interfaces.
        
    - ==Less commonly used== due to ==complexity==.
        
4. **Graphical Notations**
    
    - Uses ==diagrams and models (such as UML diagrams)== with ==text annotations==.
        
    - Helps visualize system functionality and interactions.
        
    - ==Commonly used== for use cases and sequence diagrams.
        
5. **Mathematical Specifications**
    
    - Uses ==mathematical concepts== (e.g., sets, finite-state machines) for precise requirements.
        
    - ==Minimizes ambiguity **but is difficult for customers==** to understand and validate.
        

### Guidelines for writing requirements

- Invent a standard format and ==use it for all requirements==
- Use language ==in an consistent way==. Use shall for mandatory requirements, should for desirable requirements
- Use text highlighting ==to identify key parts of the requirements==
- ==Avoid use of computer jargon==
- Include an explanation of why a requirement is necessary

### Problems with natural language

- Lack of Clarity
- Requirement confusion
- Requirement amalgamation
	- Several different requirement may be expressed together.

### 4.4 Requirements Engineering (RE) Processes

- **Requirements Engineering processes vary** depending on:
    
    - Application domain
    - People involved
    - Organization developing the requirements
    
- Despite differences, all RE processes generally include four core activities:
    
    1. **Requirements Elicitation** → Gathering requirements from ==stakeholders.==
        
    2. **Requirements Analysis** → Studying, refining, and ==understanding requirements==.
        
    3. **Requirements Validation** → ==Checking that requirements are correct==, complete, and feasible.
        
    4. **Requirements Management** → ==Handling changes and maintaining requirements throughout development==.
        
- **Important:** RE is **iterative**, meaning these activities often overlap and repeat during development rather than happening once.
### Requirements Elicitation and Analysis

Software engineers collaborate with stakeholders to understand:

- Application domain
- Required services/features
- Performance expectations
- Hardware limitations
- Interactions with other systems


#### Main Stages:

1. **Requirements Discovery**
    
    - ==Collect requirements from stakeholders== and sources.
    
2. **Requirements Classification & Organization**
    
    - Group and structure requirements logically.
    
3. **Requirements Prioritization & Negotiation**
    
    - Rank requirements by importance and resolve conflicts.
    
4. **Requirements Specification**
    
    - Document requirements clearly and formally.

![[Pasted image 20260530204241.png]]

---

### Interviewing

- Type of Interview
	- ==Closed== interviews based on ==pre-determined list of questions==
	- Open interviews where various issues are explored with stakeholders
- Effective interviewing
	- Be open-minded, avoid pre-conceived ideas about the requirements and are willing to listen to stakeholders.
	- Prompt the interviewee to get discussion going using springboard question, a requirements proposal, or by working together on prototype system.

### Scenarios

- Scenarios are real-life examples of how a system can be used
- They should include
	- Description of the starting situation
		
	- Description of the normal flow of events
		
	- Description of the what can go wrong
		
	- Information about other concurrent activities
		
	- Description of the state when the scenario finishes.

### Use Cases

- Use-cases are a scenario ==based technique in the UML== which ==identify the actors==in an interaction and which describe the interaction itself.

- A set of use cases should describe all possible interactions with the system

- A High-level graphical model supplemented by more derailed tabular description

- Sequence diagrams may be ==used to add detail to use-cases by showing the sequence of event processing== in the system

![[Pasted image 20260530205656.png]]

---

### 4.6 Requirements Validation

- **Requirements Validation** ensures that the documented requirements ==truly represent **what the customer wants and needs**.==
    
- Validation is critical because ==**requirement errors are expensive to fix**.==
    
- A requirement mistake discovered **after delivery can==cost up to 100×== more** than fixing an implementation error earlier.
    

---

### Requirements Checking Criteria

1. **Validity**
    
    - Checks whether the system functions ==actually support customer needs==.
        
    - Question: _Are we building the right system?_
        
2. **Consistency**
    
    - Ensures there are ==**no conflicts or contradictions** between requirements.==
        
    - Question: _Do requirements agree with each other?_
        
3. **Completeness**
    
    - Verifies that ==**all required functions and features are included**.==
        
    - Question: _Is anything missing?_
        
4. **Realism (Feasibility)**
    
    - Determines whether requirements can ==realistically be implemented== using available:
        
        - Budget
        - Technology
        - Resources
            
    - Question: _Can this actually be built?_
        
5. **Verifiability**
    
    - Confirms requirements ==can be **tested or measured**==.
        
    - Question: _Can we prove the requirement is satisfied?_
