 ## Systems development life cycle

![[Pasted image 20250324092706.png]]

Project Management --> Planning
System Design and Analysis --> (==Design== and Analysis)
Software Enginnering --> (Maintenance , Implementation and ==Design==)
الشئ المشترك بين System Design and analysis , Software Enginnering --> Design

- What's the First Step in Software Enginnering?
	- Technical Requirements
	- Limits and Exclusions
*THAT IN PROJECT SCOPE*

- What's Software Products?
	- Software products are ==generic== software systems that provide functionality that is useful to a range of customers.
- Examples of Types of Products
	- Business Systems Like (MS EXCEL)
	- Personal Products (Evernote)
	- Simple Phone apps and games (Suduko)

---
## Project-based software engineering
![[Pasted image 20250324094055.png]]
- Project-based software : Software development ==starts with client-defined requirements== for business support.
- A software company (contractor) designs and builds the system to ==meet these needs.==
- Client can change requirements due to business shifts, and contractor must adapt the software.
- Custom software has a long lifespan (10+ years) and requires ongoing support.
---
## Product software engineering
![[Pasted image 20250324094431.png]]
- Product development begins with a ==business opportunity== identified by individuals or a company.
- They create a software product to capitalize ==on this opportunity== and sell it to customers.
- The company designs and implements software features to address the opportunity and benefit customers.
- The software development company controls the development timeline, feature selection, and product updates.
- ==Rapid delivery is critical to secure== the market for that product type.

- **Software product lines and platforms**
	- *Software Product Line*
		- A set of software products that share a common core.
		 -  Each product includes customer-specific adaptations and additional features.
		- Product lines can be ==tailored== to create custom systems for clients with ==unique needs== unmet by generic products.
	- *Platforms*
		- A platform is a software (or software + hardware) product designed to support ==building new applications.==
		- Example: Facebook, which offers extensive functionality and tools to create "Facebook apps."
		- These apps add new features for businesses or interest groups on the platform.

- **Software execution models**

	- **Stand-alone** The software ==executes entirely ==on the customer’s computers.
	- **Hybrid** ==Part of the software’s functionality== is implemented on the customer’s computer but some features are implemented on the product developer’s servers. 
	- **Software service**  ==All of the product’s features are implemented on the developer’s servers== and the customer accesses these through a browser or a mobile app.

![[Pasted image 20250325084344.png]]
- What's the Key feature of product development?
	- The key feature of ==product development== is that there ==is no external customer== that generates requirements and pays for the software.
- Examples :
	- **Student Projects:** Students (individually or in groups) create software as ==part of their coursework==, deciding on the features based on the assignment.
    - **Research Software:** Researchers develop software to ==support their studies== and answer research-related questions.
    - **Internal Tool Development:** Developers==create internal tools== to aid their work, but these tools are not meant for public release.
---
## **Product Vision:**

- **What is the==starting point== for ==software product development==?**
    - The **product vision**.
- **What is a product vision?**
    - A simple statement ==defining the essence== of the product.
- **What key questions should the product vision answer?**
    1. ==**What**== is the product to be developed?
    2. ==**Who**== are the target customers and users?
    3. ==**Why**== should customers buy this product?
---
### Moore's Vision 
![[Pasted image 20250325085615.png]]
- Example of Moore's Vision
	- **FOR** mid-sized companies' marketing and sales departments  --> target
	- **WHO** need basic CRM functionality   --> statment
	- **THE** CRM-Innovator **IS A** web-based service   --> product name and category
	- **THAT** provides sales tracking, lead generation, and sales support to improve customer relationships  --> Benefit
	- **UNLIKE** other services or package software  --> primary competitive
	- **OUR PRODUCT** offers highly capable services at a moderate cost. --> primary differentiation
---
#### **Information Sources for Developing a Product Vision**

- **Domain Experience:** ==Developers with expertise in a specific field== (e.g., marketing & sales) identify software needs and areas for improvement.
- **Product Experience:** ==Users of existing software propose better==, simpler alternatives, leveraging new technologies.
- **Customer Experience:** Developers ==engage with potential customers== to understand their problems, constraints, and essential software features.
- **Prototyping & Experimentation:** Developers ==build prototypes to explore ideas==, refine concepts, and test variations before full development.
---
#### **Vision Statement for the iLearn System**
- **FOR** teachers and educators **WHO** need a way to help students use web-based learning resources.
- **THE** iLearn system **IS AN** open learning environment.
- **THAT** allows teachers to configure resources for students and classes easily.
- **UNLIKE** Virtual Learning Environments (e.g., Moodle), iLearn focuses on the learning process rather than administrative tasks.
- **OUR PRODUCT** enables teachers to create subject and age-specific environments using various web-based resources.
- **TARGET CUSTOMERS:** Schools and universities.
- **BENEFITS:** Improves student learning at low cost, provides learner analytics, and reduces progress tracking and reporting costs.
---
## **Software Product Management**

- **Definition:** A business activity focused on managing software products developed and sold by a company.
- **Role of Product Managers (PMs):**
    - Oversee planning, development, and marketing.
    - Act as a link between the organization, customers, and development team.
    - Involved in all product stages, from conception to market withdrawal.
![[Pasted image 20250325090406.png]]

### **Product Management Concerns (Detailed Summary)**

1. **Business Needs:**
    - Product Managers (PMs) ==ensure that the software being developed aligns== with the company's strategic goals.
    - They focus on profitability, market competitiveness, and long-term sustainability.
    - They balance innovation with financial and operational constraints.

2. **Technology Constraints:**
    - PMs ==must ensure developers understand key technology-related challenges== and requirements.
    - They address factors such as system compatibility, security, scalability, and performance.
    - They stay updated on emerging technologies to guide product improvements.

3. **Customer Experience:**
    - PMs ==engage with customers and potential users to gather insights on their expectations==, pain points, and preferences.
    - They analyze different user backgrounds to tailor the product to various skill levels and needs.
    - They ensure the product is intuitive, functional, and meets user demands efficiently.
---

![[Pasted image 20250325090641.png]]
### **Technical Interactions of Product Managers
1. **Product Vision Management:**
    - Help develop and manage the product vision.
    - Evaluate proposed changes to prevent "vision drift" (deviation from the original vision).

2. **Product Roadmap Development:**
    - Lead the planning of software development, release, and marketing.
    - Make final decisions on roadmap changes.

3. **User Story & Scenario Development:**
    - Define product features using user stories and scenarios.
    - Use customer insights to refine the vision and ensure alignment with user needs.

4. **Product Backlog Creation & Management:**
    - Maintain and prioritize the product backlog (a list of tasks and features).
    - Decide which features should be developed first based on business and user needs.
5. **Acceptance Testing:**
    - Verify that the software meets the goals outlined in the roadmap.
    - Develop tests that reflect real customer usage to ensure efficiency and reliability.

6. **Customer Testing:**
    - Select customers for testing and gather feedback on product features and usability.
    - Work closely with customers to refine the product based on real-world input.

7. **User Interface (UI) Design:**
    - Act as a representative user to ensure intuitive UI design.
    - Evaluate UI features to prevent unnecessary complexity or unnatural workflows
---
## **Product Prototyping

- **Definition:**
    - Developing an early version of a product to test ideas and demonstrate market potential.

- **Purpose:**
    - Validate the product vision with users and funders.
    - Gather feedback on features, usability, and improvements.
    - Identify key software components and test technology.

- **Best Practice:**
    - The first step in software product development should be building a **working prototype**.
    - The prototype should be discarded after testing, and the final version should address security, reliability, and scalability.
---
### **Two-Stage Prototyping**

1. **Feasibility Demonstration:**
    - Create an **executable system** to test new ideas.
    - Prove that the concept works and highlight key features.
    - Showcase the product's competitive advantages to funders and management.

2. **Customer Demonstration:**
    - Extend the feasibility prototype with **customer-specific features**.
    - Conduct user studies to refine the design based on real use cases.
    - Ensure the prototype aligns with potential user needs and usage scenarios.
---
## **Data Flow Diagramming Mechanics**
1. **Data Store:**
    - Represents ==stored data,== which can take various physical forms.
    - Depicted as ==two parallel lines or a rectangle with one open side.==
2. **Process:**
    - Represents ==actions performed on data,== such as transformation, storage, or distribution.
    - Shown as ==an oval== (DeMarco and Yourdon notation) or a ==rectangle with a curved top (Gane and Sarson notation).==
3. **Source/Sink (External Entity):**
    - Represents the ==origin or destination== of data.
    - Depicted as a ==rectangle==.
4. **Data Flow:**
    - Represents ==the movement== of data between components.
    - Shown as ==arrows indicating direction==.
![[Pasted image 20250325091501.png]]
---
### **Rules Governing Data Flow Diagramming**

 - **Process Rules:**
	- A process ==must have both inputs and outputs==; it cannot have only one.
	- A process is labeled with a==**verb phrase**.==
- **Data Store Rules:**
	- Data cannot flow directly between two data stores; a process must move it.
	- Data ==cannot== flow directly ==from an external source== to a data store or from a data store to an external sink; a process must handle it.
	- A data store is labeled with a **noun phrase**.

- **Source/Sink Rules:**
	- Data ==cannot move directly== between a source and a sink;==a process must facilitate it.==
	- A source/sink is labeled with a **noun phrase**.

- **Data Flow Rules:**
	- Data flows in ==one direction== between symbols.
	- A fork in data flow means ==identical data is sent to multiple destinations.==
	- A join in data flow means identical data ==comes from multiple sources.==
	- Data ==cannot return to the same process it left== without ==passing through another process.==
	- A data flow ==to== a data store means **==update== (delete or change)**.
	- A data flow from a data store means **==retrieve== or use**.
	- A data flow is labeled with a **noun phrase**.
![[Pasted image 20250325091854.png]]
---
## **Business Process Modelling (Summary)**

Business Process Modelling (BPM) is ==a method for representing business workflows== and processes using standardized symbols.

- **Elements of BPM :**
	- **Event:** A trigger that starts a process (represented as a circle).
	- **Activity:** An action that must take place for a process to be completed (represented as a rectangle).
	- **Gateway:** A decision point where the process can take different paths (represented as a diamond).
	- **Flow:** Shows the sequence of actions in a process (represented as an arrow).
![[Pasted image 20250325092130.png]]
---
## Chapter 3:

Software Products are not developed to meet the requirements of a specific client

Product Development is incremental and agile, so you can use less formal ways of defining your product

![[Pasted image 20250526201732.png]]

A feature is something that the user needs or wants you can write a user story

![[Pasted image 20250526201903.png]]

Features are the fundamental of an agile method called Feature Driven Development (FDD) 
![[Pasted image 20250526202044.png]]
Create the container for documents

Persona : Who are the target users for my product?
Persona about "imagined users."
![[Pasted image 20250526202229.png]]
Personas should be relatively short and easy to read

![[Pasted image 20250526202428.png]]

A scenario is a narrative that describes a situation in which a user is using your product's features to do something that they want to do.
![[Pasted image 20250526202547.png]]

Scenario should always be written from the user's perspective and should be based on identified personas or real users.

Writing scenarios in a general way that dosen't make assumptions about implementation can potentially confusing for both users and developers

Sometimes there way be a specific requirement to include a particular feature in the system because that ==feature is widely used==

Scenario writing is not a systematic process and different teams approach it in different ways.

user stories:

![[Pasted image 20250526203334.png]]

![[Pasted image 20250527020626.png]]
