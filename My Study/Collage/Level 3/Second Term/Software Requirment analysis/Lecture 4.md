# Agile Software Development

## Agile Methods

- Agile methods are proposed in respond to achieving ==rapid development and delivery==
### Agile Method Factor
- 5 Factors
	- Specification and Development phases are ==Inter-leaved==
	- System is developed as a ==series of versions== with stakeholders
	- Focus on ==code== rather than design
	- Are intended to deliver working software **Quickly** and evolve this quickly to meet changing requirements
	- User interface using an IDE and Graphical Toolset
- The aim of agile method is ==to reduce overheads in software process==
---
### Five Principles of Agile Methods

- Customer Involvement
	- Customer Should be closely involved throughout the dev process
	- Their role is ==to provide and prioritize new system requirements== and to evaluate the iterations of the system
- Incremental Delivery
	- ==The Software is developed in increments with the customer specifying the requirements== included in each increment
- People not process
	- The Skills of the developed team should be recognized and exploited
	- Team members should be left to develop their own ways of working without prescriptive processes
- Embrace challenge
	- Expect the system requirements to change and so design the system to accommodate these changes
- Maintain simplicity
	- Focus on simplicity in both the software being developed and in the development process

---
### When to use agile methods?

- For small or medium-sized products.

- Development team is included in only physical place.

- Customer is involved in the development process and there aren a lot of external rules and regulations that affect the software.

### What are the problems with agile methods?

- Contracts that include the deliver of whole system.

- It can be difficult to keep the interest of customers who are involved in the process.

- Prioritizing changes can be difficult where there are multiple stakeholders.

- Maintaining simplicity requires extra work.

---

## Plan-Driven and Agile Development

### Plan-Driven Development
- It is based on ==Planning and determining the outputs of each stage in advance.==
- Iteration occurs ==withing activities==.
![[Pasted image 20260529165331.png]]

### Agile Development

- Specification, development, and testing are ==inter-leaved== and the outputs from the development process are decide through a process of negotiation during the software development process.
![[Pasted image 20260529165343.png]]

---

### Plan-Driven and Agile Processes

![[Pasted image 20260529204231.png]]
![[Pasted image 20260529204240.png]]


---

#### 1. Need for Detailed Requirements and Design

The first consideration is whether the project requires a **very detailed specification and design before implementation begins**.

- If requirements are stable and must be fully understood before coding, a **Plan-Driven approach** is preferred.
    
- Plan-Driven development emphasizes extensive planning, analysis, and documentation before implementation.
    
- Agile assumes that requirements may change and therefore allows planning and design to evolve throughout development.
    

---

#### 2. Incremental Delivery and Customer Feedback

Organizations should consider whether software can be delivered in small increments and whether customers can provide feedback regularly.

- If frequent releases and rapid customer feedback are possible, **Agile methods** are a good choice.
    
- Agile uses short development cycles and continuous customer involvement.
    
- Feedback helps developers quickly identify problems and adjust requirements.
    
- If incremental delivery is impractical, a Plan-Driven approach may be more effective.
    

---

#### 3. Size of the System and Development Team

The size of the project is a major factor.

- Agile methods are most effective for **small systems** developed by **small co-located teams**.
    
- Team members can **communicate informally**, meaning they can discuss issues directly through conversations, chats, quick meetings, or face-to-face interactions without relying heavily on formal documents.
    
- Informal communication speeds up decision-making and problem-solving.
    

However:

- Large systems often require multiple teams and many developers.
    
- Informal communication becomes difficult as team size grows.
    
- More documentation, planning, and coordination are needed.
    
- Therefore, large projects often require a **Plan-Driven approach**.
    

---

#### 4. Type of System Being Developed

Some systems require significant analysis before coding begins.

Examples include:

- Real-time systems
    
- Safety-critical systems
    
- Embedded systems
    
- Systems with strict timing requirements
    

These systems cannot easily tolerate errors or unexpected behavior.

As a result:

- Extensive analysis and design are needed.
    
- Formal verification and documentation become important.
    
- Plan-Driven methods are often more suitable.
    

---

#### 5. Expected Lifetime of the System

The expected lifespan of the software also affects the choice of development method.

### Long-Lifetime Systems

Systems expected to operate for many years require:

- Detailed documentation
    
- Design records
    
- Maintenance guides
    

This documentation helps:

- Future developers understand the original design decisions.
    
- Maintenance teams support and update the system.
    
- Knowledge transfer when original developers leave.
    

Because of this, long-lived systems often favor a Plan-Driven approach.

---

#### 6. Available Technologies and Development Tools

The technologies available to the development team influence the success of Agile methods.

Agile relies heavily on tools for:

- Version control
    
- Continuous integration
    
- Automated testing
    
- Issue tracking
    
- Collaboration
    

Good tools help developers manage an evolving design and frequent changes.

Without appropriate tools, Agile development becomes much more difficult.

---

#### 7. Team Organization

The way the development team is organized is another important factor.

### Agile Works Best When:

- Teams work closely together.
    
- Communication is frequent.
    
- Team members can quickly discuss problems and decisions.
    

#### Plan-Driven May Be Better When:

- Teams are geographically distributed.
    
- Part of the development is outsourced.
    
- Multiple organizations are involved.
    

In these situations:

- Informal communication is harder.
    
- Design documents become necessary for coordination.
    
- Formal documentation helps teams communicate effectively.
    

---

#### 8. Organizational and Cultural Factors

An organization's culture can strongly influence the choice of methodology.

### Traditional Engineering Organizations

==Often prefer==:

- Detailed plans
    
- Formal documentation
    
- Structured processes
    

These characteristics align with Plan-Driven development.

#### Flexible and Innovative Organizations

Often value:

- Adaptability
    
- Fast response to change
    
- Continuous improvement
    

These characteristics align with Agile development.

---

#### 9. Skills of Developers and Designers

The experience and skill level of the development team should also be considered.

Agile methods often require:

- Highly skilled developers
    
- Strong problem-solving abilities
    
- Independent decision-making
    
- Continuous collaboration
    

Developers in Agile environments often make design decisions as development progresses.

By contrast:

- Plan-Driven methods provide more detailed guidance.
    
- Developers may mainly implement predefined designs.
    

Therefore, Agile is often considered more demanding in terms of developer expertise.

---

#### 10. External Regulations and Compliance Requirements

Some systems must satisfy strict regulatory requirements.

Examples include:

- Aviation software
    
- Medical systems
    
- Defense applications
    
- Financial systems
    

These systems may require approval from external regulators.

For example:

- Aviation software may require approval from regulatory authorities before deployment.
    
- Detailed evidence must be provided to demonstrate safety and correctness.
    

As a result, organizations usually need:

- Extensive documentation
    
- Formal processes
    
- Traceability of requirements
    
- Safety reports
    

These requirements strongly favor a Plan-Driven approach.

---

#### Comparison Between Plan-Driven and Agile Development

|Plan-Driven Development|Agile Development|
|---|---|
|Extensive planning before coding|Planning evolves during development|
|Heavy documentation|Minimal documentation|
|Formal communication|Informal communication|
|Best for large and complex projects|Best for small and medium projects|
|Suitable for distributed teams|Suitable for co-located teams|
|Easier regulatory compliance|Faster adaptation to change|
|Requirements are relatively stable|Requirements may change frequently|
|Strong emphasis on design upfront|Strong emphasis on customer feedback|

---

#### Final Conclusion

There is **no single best development method for all projects**.

Choose **Plan-Driven Development** when:

- Requirements are stable.
    
- Detailed documentation is required.
    
- The project is large or complex.
    
- Safety, reliability, and regulatory compliance are critical.
    
- Teams are distributed or outsourced.
    

Choose **Agile Development** when:

- Requirements change frequently.
    
- Rapid delivery is important.
    
- Customer feedback is available.
    
- Teams are small, skilled, and can communicate informally.
    
- Flexibility and adaptation are priorities.
    

**In practice, most successful software projects combine elements of both approaches to achieve the right balance between control, documentation, flexibility, and speed.**

- The System ==must have a detailed specification and design== before moving to implementation

- The System ==will be delivered to customers as increments and you will get a feedback from customer== for each increment.

- The System is a large system that will be developed by a ==set of developers at different physical places==.

- The System will be developed by high skills designers and programmers. They will use different tools to facilitate their work.

- The System is a ==very critical system that must be approved by an external regulator==

---

## Extreme Programming

the ==best-known and most widely used== agile method

- Extreme Programming (XP) Takes an 'extreme' approach to iterative development.
	- New versions may be built ==several times per day==
	- Increments are delivered to customers ==every 2 weeks==
	- ==All tests must be run for every build== and the build is only accepted if ==tests run successfully==

![[Pasted image 20260529204843.png]]

- The Practices of XP are:
	- Incremental Planning
		- ==Requirements are recorded on story cards== and developers break ==these stories into development== 'Task'.
	- Small releases
		- the minimal useful set of functionality is developed first
	- Simple Design
		- Enough design is carried out to meet the current requirements and no more
	- Test-First Development
		- An automated ==unit test framework is used to write tests for a new piece of functionality== before that functionality itself is implemented.
	- Refactoring
		- All Developers are expected ==to refactor the code continuously as soon as possible code improvements are found==. This keeps the code simple, readable, and maintainable
	- Pair Programming
		- ==Developers work in pairs==, checking each other's work and providing the support to always do a good job.
	- Collective Ownership
		- The pairs of developers work ==on all areas of the system== and all the developers take responsibility for all the code. ==Anyone can change anything==
	- Continuous Integration
		- ==As soon as the work on a task is complete, it is integrated into the whole system==. After any such integration, all the ==unit tests in the system must pass==.
	- Sustainable pace
		- Large amounts of overtime are ==not considered ==acceptable
	- On-Site Customer
		- ==The Customer is a member of the development team==and is responsible for bringing system requirements to the team for implementation.

---

### XP Follows the Principles of Agile

- Incremental Development ==is supported through small, frequent system releases==.
- Customer involvement ==means full-time customer engagement with the team==
- People ==not process through pair programming==, collective ownership and process ==that avoids long working hours==.
- Embrace Challenge supported through regular system releases.
- Maintaining simplicity through constant refactoring of code

![[Pasted image 20260529210307.png]]



