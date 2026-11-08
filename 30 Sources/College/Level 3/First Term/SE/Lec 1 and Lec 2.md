---
title: "Lec 1 and Lec 2"
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
## المحاضرة الأولى


#### What is Software?

- is a general term that refers to all sets of instructions that tell a computer what to do.

A **program** is defined as ==executable code that serves a computational purpose==. 
However, **software** encompasses more than just the programs themselves.
A professionally developed software system includes:

1. Multiple separate programs. أكثر من برنامج
2. Configuration files used for setup and customization. ملفات إعداد وتهيئة
3. System documentation describing the system's architecture and components. توثيق النظام عبر الدوكيمنتيشن
4. User documentation explaining how to use the system. الدوكيومنتيشن الخاص باليوزر الي بيشرحله ازاي يستخدم البرنامج
5. A website for users to download updates or patches. موقع لتحميل التحديثات والدعم والكلام دا

If software is written solely for **personal use**, there is no need to worry about user guides or documenting the design.
لو السوفت وير استخدام شخصي ف مش لازم تعمله
However,  if the software will be used by other people or modified by other engineers, additional information—such as design details and usage instructions—must be provided beyond the code itself.

#### Software Products

There are two main types of software products:

1. **Generic software:** These are ==stand-alone systems==produced by a ==development organization== and sold on the ==open market== to any customer who can buy them,. 
	- Examples include
		- mobile apps 
		- word processors
		- databases. 
	
	- In this scenario, the ==**development organization controls the software specification**== and can adjust the plan if problems arise.
	- This means that if they run into development problems they can rethink what is to be developed
الشركة تطور منتج واحد وتبيعه لأي حد يشتريه
مواصفات البرنامج بيحددها فريق التطوير نفسه

1. **Customized software:** These are ==systems commissioned and developed for a particular customer.==
	- Examples include
		- air traffic control systems
		- control systems for electronic devices. 
	
	For custom products, the **specification is developed and controlled by the buying organization**, and developers must adhere to that specification.
نظام بيصمم خصيصا لشخص معين أو مؤسسة معين
هنا المواصفات الخاصة بالبرنامج بيحددها العميل و==المطور لازم يلتزم بيها==



| النوع      | المطور                                                       | العميل                                                      |
| ---------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| Generic    | يدرس السوق ويحدد المواصفات الي بتناسب أكبر عدد من المستخدمين | مجرد مشتري، مبيكتبش مواصفات، يدوبك بيختار المنتج الي يناسبه |
| Customized | يلتزم تمامًا بمواصفات العميل ويتواصل معاه لفهم المتطلبات     | صاحب المواصفات، لازم يشرح احتياجاته بدقه ويتفاعل مع الفريق  |

#### Essential Attributes of Good Software

Good software must possess the following characteristics:

1. **Acceptability:** The software must be acceptable to its intended users, meaning it should be ==**understandable, usable, and compatible**== with other systems they use.
أن يكون مفهومًا وقابلًا للاستخدام من قبل الفئة المستهدفة

2. **Dependability:** This includes ==reliability, security, and safety.== Dependable software should **not cause physical or economic damage** in the event of system failure.
تشمل الموثوقية والأمان، بحيث لا يسبب النظام ضررًا ماديًا أو اقتصاديا عند فشله

3. **Security:** The software must be secure so that hackers cannot access or damage the system.

النظام لازم يبقى امن علشان الهاكرز ميقدروش يوصلوا ليه او يدمروه

4. **Efficiency:** Software should ==not waste system resources== like memory and processor cycles.  Efficiency encompasses responsiveness, processing time, and resource utilization.
عدم إهدار موارد النظام زي الذاكرة والمعالج وسرعة الاستجابة

5. **Maintainability:** The software must be written to ==**evolve and meet the changing needs of customers**.== This is considered a ==critical attribute== because software change is an inevitable requirement of a changing business environment
القدرة على التطور لتلبيه احتياجات العمل المتغيرة

#### What is Software Engineering?

Software engineering is an **engineering discipline** focused on the ==development of software products==, spanning from the early stages of system specification through to post-deployment maintenance.
تخصصص هندسي يهتم بتطوير منتجات برمجية من أول مرحلة تحديد المواصفات لحد الصيانة بعد الاستخدام

- Software engineers use ==**systematic and well-defined scientific principles, methods, and procedures**== to produce high-quality software within the required schedule and budget,.
يستخدم مبادئ علمية، طرق منهجية، وأدوات لتطوير برمجيات بجودة عالية، وفي الوقت والميزانية المحددين

- They apply appropriate theories, methods, and tools, and are expected to discover solutions even when standard methods are unavailable.

- Covering all aspects of software production means that software engineering ==is not just concerned with the technical development processes==

#### Why Software Engineering is Important

- Software engineering is ==**essential for the functioning of government, society, and national and international businesses**.==, 
- We==can’t run the modern world without software==. National infrastructures and utilities are controlled by computer-based systems, and most electrical products include a computer and controlling software.
- Industrial manufacturing and distribution is completely computerized, as is the financial system
- Entertainment, including the music industry, computer games, and film and television, is software-intensive.
- Almost all of the world’s population have a software-controlled mobile phone and almost all of these are Internet-enabled



- **The Ariane 5 Disaster in 1996**. 
	- The rocket exploded 40 seconds after launch, resulting in a loss of about $370 million.
- What went wrong?
	- The rocket reused software from the earlier Ariane 4 rocket
	- In the software, a 64-bit floating-point number (representing horizontal velocity) was converted into a 16-bit signed integer
	- But Ariane 5 was much faster than Ariane 4 → the value was too large to fit in 16 bits. This caused an overflow error
	- The error triggered the inertial reference system (IRS) to shut down.
عبارة عن خطأ برمجي عند تحويل رقم 64 بت ل 16 بت ودا سبب ال overflow

The need for software engineering arises due to several specific factors:

1. **Rapid Change in User Requirements & Environment:** SE provides ==a **structured way to manage constant evolution**== in user needs and technology (e.g., adding voice/video support to a text-only app)==without breaking the existing system.==
2. **Large Software:** As software increases in size and complexity, SE applies engineering discipline to ==**break the system into manageable modules**== and ensure reliable construction.
3. **Scalability:** Without scientific and engineering concepts, it becomes difficult to ==scale up the system== ==(add new users, features, or data)==, often making it easier to recreate the software from scratch.
4. **Dynamic Nature:** SE ensures that software is ==**flexible and maintainable**== so it can adapt to environmental changes, such as new platforms, security standards, or financial regulations,.
5. **Cost:** By following ==systematic processes==, SE ==**reduces development costs, avoids expensive rework**==, and delivers software faster and more predictably.
6. **Quality Management:** SE applies quality assurance, ==**testing, code reviews, and documentation**== to guarantee the final product is ==reliable, secure, and user-friendly==, as quality cannot be guaranteed without a proper process.

| **#** | **Aspect / Factor**    | **Role of Software Engineering (SE)**                                                                                           |
| ----- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Rapid Change**       | Provides a **structured way** to manage constant evolution without breaking the existing system.                                |
| **2** | **Large Software**     | Applies engineering discipline to **break the system** into manageable modules.                                                 |
| **3** | **Scalability**        | Uses scientific concepts to **scale up** (add users/features) effectively, avoiding the need to recreate software from scratch. |
| **4** | **Dynamic Nature**     | Ensures software is **flexible and maintainable** to adapt to environmental changes (platforms, security, etc.).                |
| **5** | **Cost**               | Uses **systematic processes** to reduce development costs and avoid expensive rework.                                           |
| **6** | **Quality Management** | Applies **testing, code reviews, and documentation** to guarantee a reliable, secure, and user-friendly product.                |

#### Software Process Activities

The systematic approach used in SE is known as the **software process**, a sequence of activities leading to the production of a software product. The four fundamental activities common to all processes are:

1. **Software specification:** Defining the software’s functionality and operational constraints.
العميل و المهندسين هما الي بيحددوا النظام هيعمل اي وهيخلص في قد اي
2. **Software development:** Designing and programming the software to meet the specification.
تصميم هيكل النظام وكتابة الكود
3. **Software validation:** Checking the software to ensure it fulfills the customer’s requirements.
بيتأكد إن البرنامج بيعمل الي العميل عايزه وبيعمل تيستنج كمان مع مراجعة العميل
4. **Software evolution:** Modifying the software to meet changing customer needs.
تعديل النظام حسب المتطلبات الجديدة وإصلاح الأخطاء بعد النشر

#### Differences Between Disciplines

- **Computer Science vs. Software Engineering:
	- **Computer Science focuses on the ==**theories and methods**== underlying computer and software systems
	 التركيز على النظريات والاساليب التي تقوم عليها الكومبيوتر وانظمة السوفتوير 
	- Software Engineering is concerned with the ==**practical problems** of developing and producing software==. Knowledge of computer science is essential for software engineers.
	- Some knowledge of computer science is ==essential for software engineers== in the same way that some knowledge of physics is essential for electrical engineers.
	التركيز على الجانب العملي لبناء انظمة كبيرة حقيقية
	
- **Software Engineering vs. System Engineering:**
	- System Engineering ==deals with all aspects of complex system development== (including hardware, process design, and deployment).
	يهتم بكل النظام
	- **Software engineering is a part of this more general process**.
	جزء من السيستم انجيرنج ومركز على السوفت وير


#### Software Engineering Diversity and Application Types

There are ==**no universal SE methods**== ==suitable for all systems and companies==. the ==most significant factor in determining== which software engineering methods and techniques are most important is ==the type of application being developed==

Application types include:

1. **Stand-alone applications:** ==Run independently on a PC or mobile device== without _requiring a network connection_ (e.g., word processors, photo editing software),.
تشتغل على جهاز واحد، ومش محتاج لإنترنت فالأغلب
2. **Entertainment systems:** Designed for ==personal use==, often games. Their defining characteristic is the ==**quality of user interaction and visual/auditory experience**==.
للاستخدام الشخصي زي الالعاب والتركيز الاكتر على تجربة المستخدم و الجرافكس
3. **Embedded control systems:** Software designed to ==control and manage hardware devices== (e.g., software in mobile phones). These systems are among the ==most common types of software==, found in a wide range of everyday devices.
4. **Interactive transaction-based applications:**==Run on remote computers and accessed via a network== (e.g., e-commerce, cloud services). They often involve a large ==data store updated in each transaction==,.
ابلكيشنز بتكون على سيرفر زي موقع حجز او شراء او بنوك اونلاين
تعتمد على قواعد بيانات والمعاملات
5. **Batch processing systems:** These are business systems that are designed to ==process large volumes of data by processing them in batches== rather than individually, These systems take in a ==large number of inputs and create corresponding outputs in a single run==, Examples of batch systems are periodic billing systems, such as ==phone billing, and payroll systems for salary payments.==
تعالج بيانات كتير مرة واحدة زي مرتبات الموظفين او فواتير الموبايل
6. **Systems for modeling and simulation:** These are systems that are developed by scientists and engineers to ==model and analyze physical processes or complex situations==, which include many separate, interacting objects,. These systems are often computationally intensive and typically require high  performance parallel computing systems for efficient execution
لمحاكاة عملياة فيزيائية معقدة وتستخدم في العلم والهندسة
7. **Data collection and analysis systems:** ==Collect data==, often via sensors, and ==send it for processing==. They must be highly reliable, especially in hostile environments.
تجمع بيانات من السينسورز و تبعتها لأنظمة تانية للتحليل
8. **Systems of systems:** ==Large enterprise systems composed of multiple other software systems==, which may be ==generic (like ERP) or custom-built,.== Some of these may be generic software products, such as an Enterprise Resource Planning (ERP) systems, while others are custom-built to meet specific organizational needs.


#### Software Engineering Fundamentals

==Four fundamentals== apply universally to all software systems:

1. Software must be developed using a ==**well-managed and clearly understood process**.== , the specific process used ==depends on the type of software being developed.==
2. **Dependability and performance** are paramount; the software ==must be safe, secure, available, and perform efficiently without wasting resources==,.
3. **Understanding and managing the software specification and requirements** (what the software should do) is important. It is important to identify what different customers and ==users expect from the system==, and to ==manage their expectations== too ensure that a useful system can be delivered on time and within budget.
4. **Effective use of existing resources** is important, meaning developers ==should reuse existing software components== when appropriate rather than building from scratch.

#### Software Engineering Challenges

Common challenges facing software engineers include:

1. **Heterogeneity التنوع:** The increasing need for systems to operate across distributed networks involving different types of computers, mobile devices, and integration with older **legacy systems**,.
لازم البرامج الجديدة تشتغل مع القديمة
	- The key challenge is to ==develop techniques for building dependable software== that is flexible enough to cope with this diversity
2. **Scale:** Software development spans a ==huge range==, from small embedded systems (wearables) to ==Internet-scale, cloud-based systems== serving a global community,.
3. **Business and social change:** Businesses and society are ==changing incredibly quickly== as emerging economies develop and new technologies become available. They need to ==be able to change their existing software and to rapidly develop new software==. Many traditional software engineering ==techniques are time consuming, and delivery of new systems often takes longer than planned.== They need to evolve so that ==the time required for software to deliver value to its customers is reduced==
4. **Security and trust:** It is ==essential that users can trust software, especially remote systems accessed== via the web, We have to make sure that ==malicious users cannot successfully attack== our software and that information security is maintained.

#### Software Engineering Ethics

A software engineer must behave ethically and responsibly. Professional conduct is often governed by ethical duty rather than law, including:

1. **Confidentiality:** ==Respecting the confidentiality of employer or client information==, even without a formal agreement.
يجب احترام سرية العميل
2. **Competence:** Not misrepresenting one's skills or ==knowingly accepting work outside one's qualifications== or expertise,.
متقبلش بشغل مش شغلك او تحرف مهارات مش بتاعتك
3. **Intellectual property rights:** Familiarity with ==local laws and protecting the intellectual property== (patents, copyright) of employers and clients.
الالمام بالقوانين المحلية وحماية الملكية الفكرية لأصحاب العمل والعملاء
4. **Computer misuse:** Not using ==technical skills to misuse other people’s computers== (e.g., playing games on an employer’s computer).
عدم اساءة استخدام المهارات التقنية لإساءة استخدام اجهزة الكومبيوتر الخاصة بالاخرين
#### Case Studies

Four system types are used as practical examples throughout the course:

1. **An embedded system:** Software that controls a hardware device, such as a system to control an insulin pump.
2. **An information system:** Manages and provides access to a database of information, such as a medical records system,.
3. **A sensor-based data collection system:** Collects and processes data from sensors, such as a wilderness weather station.
4. **A support environment:** An integrated collection of software tools for supporting an activity, such as a digital learning environment.

---

# المحاضرة التانية


### SOFTWARE PROCESSES

#### Introduction and Definition

A **software process==** is defined as a set of related activities that leads to the production of a software system.== Because there are many types of software systems, there is no single universal software engineering method applicable to all of them, and thus, **there is no universally applicable software process**. The specific process used varies across companies, depending on the type of software being developed, customer requirements, and the skills of the development team.

#### Fundamental Software Process Activities

Although many different software processes exist, they all must include, in some form, four fundamental software engineering activities:

1. **Software specification:** Defining the ==functionality== of the software and the constraints on its operation.
2. **Software development:** ==Producing== the software that meets the defined specification.
3. **Software validation:** where the software must be validated to ensure that it does what the ==customer wants==
4. **Software evolution:** ==Modifying== the software to meet ==changing customer needs.==

These four activities are complex themselves and include sub-activities
- requirements validation
- architectural design
- unit testing
Software processes also involve additional activities
- software configuration management 
- project planning
to ensure the efficiency, organization, and successful delivery of the project.

#### Software Process Descriptions

When processes are described, the ==focus is generally on the activities involved== (e.g., _specifying a data model_, _designing a user interface_) and the _ordering of these activities._ Process descriptions must also include:

1. **Products or deliverables:** The tangible _outcomes_ of a process activity (e.g., ==a model of the software architecture resulting from the architectural design activity==).
الحاجات الي بتطلع من كل Activity
2. **Roles:** Definitions of the ==responsibilities== of the people involved in the process (e.g., project manager, configuration manager, programmer).
تحديد مسؤوليات لكل شخص
3. **Pre- and postconditions:** ==Conditions== that must be met ==before an activity starts== (_preconditions_, e.g., **customer approval of requirements**) and ==conditions that must hold after it is completed== (_postconditions_, e.g., **review completion of UML models**).
ال preconditions الحاجة لازم تكون صح قبل ما المرحلة تبدا و ال postconditions حاجة لازم تكون اتحققت بعد ما المرحلة تخلص

#### Process Classification: Plan-driven vs. Agile

Software processes can generally be classified into two main types:

1. **Plan-driven (traditional) process:** This is a ==structured== and ==sequential== approach where ==**all software process activities are planned in advance**== ==before development begins==. Progress is measured against this ==predefined== plan, and ==changes are difficult to accommodate once the plan is fixed.== Common examples include the ==Waterfall== model, V-model, and Spiral model.
كل حاجة تتخطط بالتفصيل قبل ما تبدا بالبرمجة فيه والانشطة بتاعته ماشية بشكل ثابت ومتسلسل وكمان التغيير بعد ما الخطة تتحط بيكون صعب ومكلف
2. **Agile process:** This is an ==iterative== and ==flexible== approach where planning is ==**incremental and continuous**== throughout the development lifecycle. It is easier ==to modify the process to reflect changing customer or product requirements.== Common examples include _Scrum, Kanban, and Extreme Programming (XP)._
التخطط يكون تدريجي ومقسوم على ايترشن ويكون سهل نغير الخطة مع تغير متطلبات العميل
### Software Process Models (SDLC)

A **software process model** (or Software Development Life Cycle/==SDLC== model) is a _simplified representation of a software process_. The general process models include:

1. **Waterfall model:** ==Represents the fundamental activities== (specification, development, validation, and evolution) as ==separate, sequential phases.==
مراحل منفصلة ومتتالية كل مرحلة تخلص وبعدين الي بعدها تبدأ، وهو عبارة عن الانشطة الاساسية
2. **Incremental development:** ==Interleaves== the activities of specification, development, and validation. The system is developed as a series of versions (increments), each adding functionality.
تداخل ما بين ال specification - development - validation والسيستم بيتسلم على شكل increments كل واحد يضيف شوية وظائف جديدة
3. **Integration and configuration (==Reuse-oriented==):** Focuses on ==configuring and integrating reusable components or systems== rather than developing code from scratch.
بيعتمد على مبدأ إعادة الاستخدام للمكونات الجاهزة بدلا من البدء من الصفر

#### 1. The Waterfall Model

![[Pasted image 20260108030352.png]]

The Waterfall Model is a ==sequential==, plan-driven development process where progress flows ==linearly== through distinct phases, like _water cascading down_. It is one of ==the earliest and most traditional models==. In principle, all activities **are planned and scheduled upfront**. A key characteristic is that ==**each phase must be completed before the next begins**==, with no overlap, and the result of each phase is one or more formally approved documents.

اقدم واكثر نموذج تقليدي، وعملياته خطية يعني كل مرحلة بتيجي بعد التانية زي المياه الي نازلة من الشلال، لازم كل مرحلة تخلص قبل ما تبدا المرحلة التانية، ولازم كل مرحلة بتطلع وثيقة رسمية وهي ال sign-off لازم يٌوافق عليها

**Waterfall Model Phases (Directly reflecting fundamental activities):**

1. **Requirements analysis and definition:**==System services, constraints, and objectives are gathered from stakeholders== and thoroughly _documented in an SRS_ (Software Requirements Specification).
نجمع كل الخدمات والقيود والاهداف ونطلع ال SRS
2. **System and software design:** Defining the ==overall architecture and high-level structure that satisfies the requirements==. Software design identifies and _describes key components, data structures, and interfaces._
نحدد الArchitecture العامة للنظام وبنقسم النظام لمكونات اساسية موديولز و كومبوننتس ونحدد الداتا ستراكشرز والواجهة
3. **Implementation and unit testing:** Developers ==write the source code based on design specifications==. Unit testing is performed to verify that each individual module functions correctly.
وقت كتابة الاكواد المبرمج بيكتب الكود بناءا على الديزاين الي عمله + نعمل يونت تيستنج (اختبار) لكل كلاس او مديول لوحده

4. **Integration and system testing:** ==Individual program units are combined to form a complete system==, which is then tested for defects. The system is delivered for deployment or acceptance testing.
ندمج الوحدات مع بعضعلشان نطلع السيستم الكامل ونعمله سيستم تيستنج علشان نتأكد انه شغال صح ونشوف لو في bugs ولا لا
5. **Deployment and maintenance:** ==The product is installed in the production environment==. Ongoing maintenance involves correcting errors, improving implementation, and enhancing system services as new requirements are discovered.
تبدا عملية تسليم السيستم ونعمله تسطيب في بيئة العمل بتاعته وبعد التسليم بنشوف لو في اخطاء مكتشفتش قبل كدا نصلحها و نحسن الاداء و نضيف او نغير وظائف بناءا على متطلبات جديدة

**Waterfall with Feedback Model:** 
- In practice, problems (e.g., design flaws during coding) ==are often discovered in later stages==. The traditional model ==is modified to allow **feedback between phases**==, requiring documents produced in previous stages to be updated to reflect necessary changes (e.g., changing requirements if they prove too expensive to implement).
ممكن نكتشف عيوب ومشاكل في مراحل قدام، ساعتها بيتم تعديل النموذج التقليدي علشان يسمح بأنه ياخد الملاحظات بين المراحل، مما يخليك محتاج تحدث الدوكيومنتيشن الي انت عملتها في المراحل الي فاتت علشان تظهر التغيرات الضرورية

**When to Use:** The waterfall model is appropriate only for specific system types:

- ==Large software systems that are part of broader engineering systems== developed by multiple partner companies.
- ==Embedded systems== that must interface with hardware.
- ==Safety-critical systems== requiring a very structured development process and extensive safety and security analysis and documentation before implementation.

#### 2. Incremental Development

Incremental development is a core principle of agile methods and is widely used for application systems. It involves developing an ==initial implementation==, ==receiving feedback, and **evolving the software through multiple versions (increments)** until completion==.
الفكرة اننا نعمل نسخة اولية ونعرضها ع اليوزرز وناخد منهم الفيدباك ونطوور النسخة دي ف سلسلة من الاصدارات لحد ما نوصل لسيستم كامل، المستخدم بياخد اصدارات شغالة ومش هيستنى للنهاية
The activities of ==specification, development, and validation are **interleaved**==. The earliest increments usually contain the most important features, allowing customers to evaluate the system early.

![[Pasted image 20260108030722.png]]

لو تلاحظ ان بين مرحلة والتانية سهم رايح وسهم جاي دا يدل ان في فيد باك بيحصل ومنه في فيرجن جديد ف احنا نعمل فيرجن جديد وهكذا لحد بقى ما نوصل لل فاليدشن ولو عملنا فاليديشن ووصلنا لأخر فيرجن خلاص كدا كل سنة وانت طيب مفيش رجوع تاني.

**Incremental Development Advantages (Over Waterfall):**

1. **Early delivery and deployment of useful software:** Functional parts of the system can ==be delivered and deployed earlier==, allowing customers to begin using and benefiting from the software before the entire system is completed.
بيكون فيها تسليم الاجزاء الوظيفية من النظام الي يخلي اليوزر يبدأوا بإستخدام البرنامج والاستفادة منه قبل الإنتهاء من النظام كامل
2. **Improved customer feedback:** Customers review working increments rather than abstract design documents, which improves feedback quality.
هناخد من اليوزرز الي هيستخدموا الابلكيشن ملاحظاتهم بدلا ما تعمل دوكيومنت ثابت ومجرد كدا، ودا بيحسن جودة الفيدباك
3. **Lower cost of implementing requirements changes:** If requirements change, significantly less analysis and documentation need to be redone compared to the sequential waterfall model. This model is thus more suitable for systems whose requirements are likely to change during development.
لما يحصل تغيير في المتطلبات، اعادة التحليل وكتابة الدوكيومنتشن هتقل مقارنة بنموذج ال waterfall، النموذج دا اكثر ملائمة للأنظمة الي ممكن تغير متطلباتها اثناء التطوير

**Incremental Development Problems:**

1. **Lack of process visibility:** Managers rely on regular deliverables to track progress. Since systems are developed quickly, producing documents for every version is not cost-effective, making accurate progress tracking difficult.
لما انت كل شوية هيوصلك ريفيوهات من اليوزر علشان تكمل، دا هياخد منك وقت وجهد فهتلاقي متابعة التقدم امر صعب شوية
2. **Structural degradation over time:** The system structure may deteriorate due to frequent, ad hoc changes as new features are integrated, making future additions difficult and costly. ==Agile== methods mitigate this by suggesting regular **refactoring**—improving the internal structure of the code without altering its external behavior.
ممكن يحصل تدهور هيكل السيستم من كتر التغيرات الكتير والمخصص لما تيجي تضيف فيتشرز جديدة، دا بيخليك لما تيجي تضيف تاني فالمستقبل هتلاقي الموضوع صعب ومكلف، ف في حاجة اسمها اجايل ودا بيخفف التدهور دا من خلال اعادة الهيكلة المنتظمة : تحسين البنية الداخلية للابلكيشن بدون تغيير سلوكه الخارجي

**Note on Architecture:** 
- The problems of incremental development become particularly acute for==large, complex, long-term systems== in which many ==teams working on different parts of the system== (subsystems or components).
المشاكل بتبقى اصعب لما بشكل خاص بالنسبة للانظمة الكبيرة والمعقدة وطويلة الاجل الي ببيشتغل فيها فرق كتير على اجزاء مختلفة
Large systems require a ==stable framework or architecture that defines the main components of the system==, specifies _how those components interact_, and _clearly define the responsibilities of the different teams_ working on each part of the system with respect to that architecture. This architecture _must be planned in advance_ rather than developed incrementally

الأنظمة الكبيرة دي محتاجة **هيكل أو أساس ثابت** يحدد المكونات الرئيسية للنظام وإزاي بتكلم بعضها وكمان يوضح **مسؤوليات كل فريق** شغال على جزء معين بوضوح. وأهم نقطة إن الهيكل ده **لازم يتخطط له بالكامل من الأول ومينفعش يتبني حتة حتة بشكل تدريجي (Incrementally) زي باقي التطوير. علشان كدا ال waterfall model احسن ليه
#### 3. Integration and Configuration (Reuse-Oriented)

In most software projects, developers rely on **informal ==reuse** of existing code== (from prior projects or open-source libraries) ==to save time and effort==, regardless of the development process used.

More recently, processes have shifted toward ==**formal reuse-oriented approaches**== that rely on a base of reusable software components and an ==integrating framework.==

This informal reuse occurs ==regardless== of the development process used (Waterfall, Agile, etc.), because ==it saves both time and effort.==

**Types of Reusable Software Components:**

1. **Stand-alone application systems:** ==Complete, self-contained systems== (e.g., ERP systems like SAP) that are ==configured or extended to match specific business rules and workflows.== These are reused at a high level (as entire systems).
2. **Web services:** ==Independent software services== (e.g., _Google Maps API, PayPal API_) ==accessed remotely over the internet, allowing other systems to use their functionality without having to install or maintain the code locally.==
3. **Collections of objects:** Smaller, ==modular units like libraries, classes, or frameworks== (e.g., payment processing package) designed to be integrated within a component framework ==like the .NET framework.==

**Stages in Reuse-Based Development:**

1. **Requirements specification:** ==Initial requirements are proposed==, focusing on essential and desirable features.
متطلبات مبدئية ونحدد المطلوب بشكل عام زي مثلا اي الفيتشرز المهمة
2. **Software discovery and evaluation (Component Analysis):** A ==search is conducted for existing components or systems that provide the required functionality.== Candidates are evaluated for suitability and adherence to essential requirements.
ندور على حاجات جاهزة تحقق المطلوب ونقيمها هل هي موثوقة بتناسب متطلباتنا وكدا
3. **Requirements refinement:** The system requirements are ==modified to align with the capabilities of the reusable components discovered.== If suitable components cannot be found, the process may return to the component analysis phase.
بنعدل المتطلبات بناءا على الي لقيناه من المكونات وممكن نضطر نغير الريكويرمنت علشان نمشي مع القدرات (خليك على قدك)
4. **Application system configuration:** If an off-the-shelf application system meets the requirements, it ==is configured for use.==
لو لقينا شئ جاهز نعمله كونفجريشن (إعداد) علشان يناسب العميل
5. **Component adaptation and integration:** If no off-the-shelf system is available, ==individual components are modified and integrated, and new components are developed.==
لو مفيش سيستم كامل هنضطر نعدل في شوية مكونات ونربطها مع بعض بكود جديد علشان نبني السيستم

**Reuse-Oriented Advantages:**

- ==Reduces the amount of new software to be developed==, which lowers development time, cost, and effort.
كود قليل -> وقت وتكلفة وجهد قليل
- Leads to ==faster deliver==y and deployment.
تسليم اسرع
- Improves reliability and lowers project risks, as reused components are already tested.
موثوقية اعلى لأن المكونات الجاهزة غالبة مجربة قبل كدا

**Reuse-Oriented Disadvantages:**

- **Requirements ==compromises are inevitable**==, which might result in a system that does not fully meet the real user needs.
لازم نحاول نمشي المتطلبات على المكونات الي موجودة يعني ممكن السيستم ميحققش احتياج المستخدم 100%
- There is a **loss of control over system evolution** because the process depends on new versions of reusable components being released by external parties.
فقدان السيطرة على التطور بيحصل لما المكونات دي بتتطور عند الشركة الام الي عملتها والتحديثات مش بتكون تحت سيطرتك وممكن تحديث يحصل يغير شغل السيستم بتاعك

##### الخلاصة: 

| وجه المقارنة                        | **1. الشلال (Waterfall Model)**                                                                                                            | **2. التطوير التزايدي (Incremental Development)**                                                                                                                | **3. الدمج والتهيئة (Integration & Configuration)**                                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **الفكرة الأساسية**                 | نموذج خطي متسلسل، كل مرحلة تكتمل وتُعتمد قبل التالية. التخطيط كامل مسبقاً.                                                                 | تداخل بين التحديد والتطوير والتحقق. بناء النظام كسلسلة من الإصدارات يضيف كل منها وظائف جديدة.                                                                    | الاعتماد على **إعادة استخدام** مكونات جاهزة (مثل ERP أو Web Services) وتركيز الجهد على تكييفها وربطها.                                                                      |
| **دور المطور (Developer)**          | • يلتزم بخطة صارمة ومراحل محددة.<br><br>• يكتب الكود بناءً على تصميمات ووثائق معتمدة مسبقاً.<br><br>• يركز على التوثيق الرسمي في كل مرحلة. | • يطور نسخاً أولية سريعة للحصول على Feedback.<br><br>• يقوم بدمج التحليل والبرمجة والاختبار بشكل متداخل.<br><br>• يحتاج لعمل **Refactoring** مستمر لتحسين الكود. | • يبحث عن المكونات المناسبة ويقيمها (Discovery).<br><br>• يكتب كود لربط المكونات (Integration) أو تعديل إعداداتها (Configuration) بدلاً من البرمجة من الصفر.                |
| **دور الستيكهولدرز (Stakeholders)** | • **سلبي نسبياً:** يشارك بكثافة في البداية (تحديد المتطلبات) وفي النهاية (الاستلام).<br><br>• لا يرى المنتج الفعلي إلا في المرحلة الأخيرة. | • **تفاعلي جداً:** يشارك طوال العملية.<br><br>• يجرب النسخ الأولية ويبدي رأيه (Feedback) لتوجيه التطوير في الإصدارات التالية.                                    | • **مرن:** قد يضطر لتعديل متطلباته لتتوافق مع قدرات الأنظمة الجاهزة المتوفرة.<br><br>• يجب أن يقبل بحلول وسط (Compromises) لأن النظام الجاهز قد لا يلبي 100% من رغباته.<br> |
| **المميزات**                        | • توثيق واضح وإدارة سهلة للمشروع.<br><br>• مناسب للمشاريع التي تتطلب دقة وأمان عالي.                                                       | • تسليم مبكر لأجزاء مفيدة من النظام.<br><br>• استجابة سريعة ومرنة لتغير المتطلبات.                                                                               | • توفير كبير في الوقت والتكلفة.<br><br>• موثوقية أعلى (مكونات مجربة) وتسليم أسرع.                                                                                           |
| **العيوب**                          | • صعوبة وتكلفة عالية عند تغيير المتطلبات.<br><br>• تأخر ظهور المنتج للنهاية.                                                               | • الكود قد يصبح فوضوياً (Messy) مع الوقت.<br><br>• صعوبة متابعة التقدم لقلة التوثيق الرسمي.                                                                      | • فقدان السيطرة على تطور المكونات الخارجية.<br><br>• النظام قد لا يطابق احتياجات العميل تماماً.                                                                             |

---

# References:

- Quiz on Lec 1 : https://gemini.google.com/share/95e05fe1e45f
- Quiz on Lec 2 : https://gemini.google.com/share/8ed987a34767
- Quiz on Both اسئلة صعبة بعض الشئ: https://gemini.google.com/share/80e43bbe68a2