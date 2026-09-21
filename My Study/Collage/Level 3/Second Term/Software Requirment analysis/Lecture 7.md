# System Modeling-1

- System modeling
	- is the process of developing abstract models of a system
	- representing a system ==using some kind of graphical notation== is now almost always based on notation is UML
	- helps the analyst to understand the functionality of the system and models are used to communicate with customers

- Models of ==the existing system== are used during RE
	- They ==help clarify what the existing system does== and can be used as a ==basis for discussing its strengths and weaknesses.== These then lead to requirements for the new system
- Models of the new system are used during RE
	- to help ==explain the proposed requirements to other system stakeholders==. Engineers use these models to ==discuss design proposals and to document the system for implementation==.

---
## System Perspectives

- External perspective
	- where you model the ==context or environment== of the system
- Interaction perspective
	- where you model the ==interactions between a system and its environment==, or between the components of a system.
- Structural Perspective
	- where you model the ==organization of a system or the structure of the data== that is processed by the system.
- Behavioral Perspective
	- where you model the ==dynamic behavior of the system== and ==how it responds to events==.

---
## UML Diagram Types

- **Activity diagrams**
	- which show the ==activities involved in a process or in data processing== . 
	
- **Use case diagrams**
	- which show the ==interactions== between a ==system and its environment==. 
	- **Use cases** were developed originally ==to support requirements elicitation== *(For a revision Requirements elicitation means Gathering requirements from stakeholders)* and now ==incorporated into the UML==.
	- **Each use case represents a ==discrete task==** that involves external interaction with a system
	- Actors in a use case may be ==people or other systems==.
	- Represented diagram to provide an ==overview of the use case== and in a more detailed textual form
	![[Pasted image 20260531012437.png]]
	
- **Sequence diagrams** 
	- which show interactions between ==actors and the system and between system components==. (Actors -> System -> System Components) = Sequence
	- Sequence diagrams are ==part of the UML== and are used to model the interactions between the ==actors and the objects== within a system.
	- A sequence diagram shows the ==sequence of interactions== that take place during a particular use case or use case instance
	- The objects and actors ==involved are listed== along the top of the diagram, with a ==dotted line== drawn vertically from these.
	- Interactions between objects are ==indicated by annotated arrows==.
	![[Pasted image 20260531012505.png]]
	
- **Class diagrams**
	- which show the ==object classes in the system and the associations== between these classes. 
	- Class diagrams are used when developing an ==object oriented system== model  to show the ==classes== in a system and ==the associations== between these classes .
	- An object class can be thought of as a general definition of ==one kind of system object==.
	- An association ==is a link between classes that indicates== that there is some ==relationship between these classes==.
	- When you are developing models during the early stages of the software engineering process, ==objects represent something in the real== world, such as a patient, a prescription, doctor, etc.
	![[Pasted image 20260531013006.png]]![[Pasted image 20260531013042.png]]![[Pasted image 20260531013054.png]]
	
- **State diagrams**
	- which show how the ==system reacts== to internal and external events.

---
## Structural Models

- Structural models of software ==display the organization of a system== in terms of the components that make up that system and their relationships.
- Structural models may be ==static models==, which show ==the structure of the system design==, or ==dynamic models==, which ==show the organization of the system when it is executing==
- You create structural models of a system when you are ==discussing and designing the system architecture==.

---
## Context models

- Context models are
	- used to ==illustrate== the operational context of a system
	- they show ==what lies outside the system boundaries==
	- Social and organizational concerns may affect the decision on where to position system boundaries.
- Architectural models
	- show the ==system and its relationship== with other systems

---
## System Boundaries

- System boundaries
	- are established to define ==what is inside and what is outside the system==.
		- They show other systems that are used or depend on the system being developed. 
		
	- The position of the system boundary has a ==profound effect on the system requirements==.
		
	- Defining a system boundary is a ==political judgment==
		- There may be pressures to develop system boundaries that increase / decrease the influence or workload of different parts of an organization

---
## Process Perspective

- Context models ==simply show the other systems in the environment==, **not how the system being developed** is used in that environment.
- ==Process models== reveal ==how the system being developed is used in broader business== processes. 
- UML activity diagrams may be ==used to define business process models==

![[Pasted image 20260531010759.png]]

---
## Interaction models

- Modeling user interaction is important as==it helps to identify user requirements==.
	
- Modeling system-to-system interaction ==highlights the communication problems that may arise==.
	
- Modeling component interaction ==helps us understand if a proposed system structure== is likely to deliver the required system performance and dependability. 
	
- ==Use case diagrams and sequence diagrams may be used for interaction modelling==

### Summary:
- A model is ==an abstract view of a system== that ignores system details.
	- Complementary system models can be developed to ==show the system’s context, interactions, structure and behavior==. 
- Context models show ==how a system that is being modeled is positioned in an environment== with other systems and processes. 
- Use case diagrams and sequence diagrams are used ==to describe the interactions between users and systems== in the system being designed.
	- Use cases describe ==interactions between a system and external actors==;
- Sequence diagrams ==add more information to these by showing interactions between system objects==.
- Structural models show ==the organization and architecture== of a system.
- Class diagrams are used to ==define the static structure of classes in a system== and their associations

---
# System Modeling-2

## Generalization

- In modeling systems, it is often useful to examine the classes in a system to see if there ==is scope for generalization==. ==If changes are proposed==, then you do ==not have to look at all classes== in the system to see if they are affected by the change.
- In object-oriented languages, such as Java, generalization is ==implemented using the class inheritance mechanisms== built into the language.
- In a generalization, the attributes and operations associated with ==higher-level== classes are also==associated with the lower-level classes.==
![[Pasted image 20260531014920.png]]
- ==The lower-level classes are subclasses== **inherit** the attributes and operations from ==their superclasses==. These lower-level classes then ==add more specific attributes and operations==.
![[Pasted image 20260531014937.png]]
---
## Object class aggregation models

- An aggregation model shows ==how classes that are collections are composed of other classes.==
الـ Aggregation Model بيوضح إزاي **Class معينة تعتبر Collection أو Container** وبتحتوي Classes تانية.
عندنا Class اسمها:

```
Department
```

وجواها:

```
ProfessorStudent
```

يبقى:

```
Department  
 |   
 |---- Professors
 |   
 |---- Students
```
- ==Aggregation models are similar to the part-of relationship== in semantic data models.
Aggregation شبيهة بعلاقة اسمها **Part-of Relationship** يعني:

**"الشيء ده جزء من الشيء التاني"**

أمثلة:

### مثال:

```
Car 
├── Engine 
├── Wheels 
└── Seats
```

العلاقة هنا:

- Engine جزء من Car
- Wheels جزء من Car
- Seats جزء من Car

دي اسمها:

```
Engine PART OF Car
```

وده Aggregation.


![[Pasted image 20260531015315.png]]

---

## Behavioral Models

- Behavioral models are models of ==the dynamic behavior== of a ==system as it is executing==. They show ==what ==happens or what is ==supposed to happen== when a system responds to a stimulus from its environment (Ex: put card on ATM machine and refused).
- You can think of these stimuli as being of two types:
	- Data Some data arrives ==that has to be processed by the system==.
	- Events Some event happens that triggers system processing.
		- Events may have associated data, although this is not always the case

---

## Data-Driven Modeling

- Many business systems are data-processing systems that are primarily driven by data. They are controlled by the data input to the system, with relatively little external event processing.
	
- Data-driven models ==show the sequence of actions involved in processing input data and generating an associated output==.
	
- They are particularly useful during the analysis of requirements ==as they can be used to show end-to-end processing== in a system.
![[Pasted image 20260531023728.png]]

---
## Order Processing
![[Pasted image 20260531023754.png]]

## Event-Driven modeling

- Real-time systems are often ==event-driven==, with minimal data processing. For example, a landline phone switching system ==responds to events such as ‘receiver off hook’ by generating a dial tone.==

- Event-driven modeling shows ==how a system responds to external and internal events==.

- It is based on the assumption that a system has a ==finite number of states== and that events (stimuli) may ==cause a transition from one state to another==.

---

## State machine models

- These model the behaviour of the ==system in response to external and internal events==.

- They show the system’s ==responses to stimuli so are often used for modelling== real-time systems

- State machine models show system ==states as nodes== and ==events as arcs between these nodes.== When an event occurs, the ==system moves from one state to another==

- State charts are an integral ==part of the UML== and are used to ==represent state machine models==
![[Pasted image 20260531030830.png]]

**Summary:**

- Behavioral models describe ==how a system behaves dynamically while running==.
    
- They model behavior from either:
    
    - the **data processing perspective**, or
    
    - the **events/responses perspective**.
    
- **Activity diagrams** represent workflows or processing steps, where each activity shows a process action.
    
- **State diagrams** show how a ==system reacts to internal and external events== by changing states.
    
- **Model-Driven Engineering (MDE)** develops software using models that can be ==automatically converted into executable code==