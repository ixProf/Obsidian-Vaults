## Extreme Programming

- User Requirements are expressed as ==scenarios or user stories==
- These are written on ==Cards== and the development team break them down into ==Implementation tasks==
- The Customer choose the stories for inclusion in the next release based on their priorities and the schedule estimates
---
- Extreme Programming has discarded the principle of ==anticipating future changes== to the software on the basis that designing for change is often wasted effort

- ==XP Approach accepts the future changes== and reorganizes the software when these changes actually occur

- Extreme Programming maintains ==good software structure== by suggesting that the software should be constantly ==refactored==
- This means that the programming teams look for possible improvements to the software and implement them immediately

- Examples of refactoring include:
	- The ==reorganization== of a class hierarchy to ==remove duplicate code==.
	- The Ordering and ==renaming of attributes== and methods.
	- The replacement of code with ==calls to methods defined in a program library==

### Testing in XP

- XP has developed an approach where the program is ==tested after every change has been made==
- XP Testing Features:
	- Test-first development.
	- Incremental test development from scenarios.
	- User involvement in test development and validation
	- The use of automated testing frameworks.

#### In Test-First development

- tests are written ==before== code for clarifying the requirements to be implemented
- Tests are ==written as programs== rather than data so that they can be executed automatically
- The test includes a check ==that it has executed correctly==
	- relies on testing framework such as Junit
- All previous and new tests are ==run automatically when new functionality is added==, thus checking that new functionality has not introduced errors.

#### In User Involvement 

- the role of the customer in the testing process is to ==help develop acceptance tests for the stories that are to be implemented in the next release== of the system

- The Customer who is part of the team ==writes tests as development proceeds==. All new code is therefore validated to ensure that it is what the customer needs.

---
### Pair Programming

- In XP, Programmers ==work in pairs==, sitting together to develop code.

- This helps develop common ownership of code and spreads knowledge across the team.

- It serves as ==an informal review process== as ==each line of code is looked at by more than 1 person==

- It ==encourages refactoring== as the ==whole team can benefit== from this.

- Measurements suggest that development productivity with ==pair programming== is ==similar to that of two people working independently==.

- In Pair Programming, programmers sit ==together at the same workstation==

- Pairs are created ==dynamically== so that ==all team members work with each other== during the development process

- The sharing of knowledge that happens during pair programming ==is very important as it reduces the overall risks to project when team members leave==

- Pair programming is not necessarily inefficient and there is evidence that ==pair working together== is ==more efficient== than ==2 programmers working separately.==

- The Advantages
	- supports the idea of collective ownership and responsibility for the system
		- individuals are not held responsible for problems with the code.
	- It acts as an ==informal review process== because ==line of code is looked at by at least 2 people.==
	- It helps support refactoring, which is a process of software improvement.

---
## Scrum Approach

### Intro
- The Principal responsibility of software project managers is to ==manage the project so that the software is delivered on time and within the planned budget for the project==
- The standard approach to project management is ==plan-driven==. Managers draw up a plan for the project showing 
	- what should be delivered
	- when it should be delivered
	- who will work on the development of the project deliverables
- Agile project management requires a different approach, which is adapted to ==incremental development and the particular strengths of agile methods==

### Scrum Approach

- Scrum approach is a ==general agile method== but focus is on ==managing iterative development rather than specific agile practices==

- There are three phases in Scrum.
	- The initial phase is an ==outline planning phase== where you establish the ==general objectives== for the project and design the software architecture.
	- This is followed by a series of ==sprint cycles==, where each cycle develops an ==increment of the system==
	- The Project closure phase ==wraps up the project==, completes required documentation such as system help frames and user manuals and assesses the lessons learned from the project.

![[Pasted image 20260530025319.png]]

- Sprints are ==fixed length==, ==normally 2-4 weeks.== They correspond to the development of a release of the system in XP.

- the starting point for planning is ==The Product Backlog==
	- Product backlog is the list of work to be done on the project
- The selection phase involves all of the project team ==who work with the customer to select the features and functionality to be developed during the sprint==
- Once these are agreed, the team organize themselves to develop the software. During this stage the team is isolated from the customer and the organization, with all communications channeled through the so-called "Scrum master"
- The role of the scrum master is ==to protect the development team from external distractions==
- At the end of sprint, the work done is ==reviewed and presented to stakeholders, the next sprint cycle the begins==.

- Scrum Master
	- who arranges daily meeting
	- tracks the backlog of the work to be done
	- records decisions
	- measures progress against the backlog
	- communicates with customers and management outside of the team
- The whole team attends ==short daily meeting==
	- where all team members share information
	- describe their progress since the last meeting
	- problems that have arisen
	- what is planned for the following day

- The Advantages of Scrum:
	- the product is broken down into a set manageable and understandable chunks
	- Unstable requirements do not hold up progress.
	- Customer see on-time delivery of ==increments  and gain feedback on how the product works.==
	- Trust between customers and developers is ==established and a positive culture is created== in which ==everyone expects the project to succeed==