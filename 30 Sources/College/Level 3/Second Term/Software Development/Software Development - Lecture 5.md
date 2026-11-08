---
title: "Software Development - Lecture 5"
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
- Project Management is the discipline of planning, organizing, and controlling a project to achieve specific goals within defined constraints such as scope, time, cost, and quality


- Project management subset of tasks:
	- Project planning
	- Project reviews and presentations
	- Project post-mortem

---

# Project Planning

- Project plans are great tool for 
	- Defining the intended work
	- outlining how it will be done
	- describing how the project will be executed

- Project planning is ==Forever==:
	- **it continues throughout the entire duration of the project**

- in plan-driven process models
	- The Project plan ==is a formal document that is written by **the project manager**== , and that is approved and
	- and that is approved and signed off on by the **development team** and by **upper management** The plan serves as a contract that
		- **Outlines**: what the team is ==going to do and how they are going to do it== 
		- **Describes**: how the project ==will be managed==
		- **States**: how and when the plan itself ==will be modified==

- A project plan consists of the following parts.
	- ==Plan-driven projects typically include all of these parts==
	- **agile projects** may include only a *subset, often* summarized on a single page

--- 
## Project Organization

- this section include:
	- WHAT process model the project will be using
	- HOW you are going to organize the team
	- HOW will the project be run a day-to-day basis
- this section is particularly important for ==brand-new projects and inexperienced teams==

---

## Risk Analysis

The **Risk Analysis** section focuses on ==identifying potential problems that may affect the project== and ==planning how to deal with them==.

Questions to consider:

- What can possibly go wrong with this project?
- What is the worst that could happen?
- What will we do if it happens?


Common project risks include:

- Schedule Slips
- Excessive Defect Rate
- Requirements Misunderstood
- Requirements Churn
- Turnover
    

---

### Schedule Slips

A **schedule slip** occurs when a ==task takes much longer than expected==.

Example:

- A task estimated to take **3 days** ends up taking **3 weeks**.

In a **plan-driven project**, this can become a serious problem ==if there are no regular status meetings==. Informing management about delays early is always better than waiting until the delay becomes significant.

In an **agile project**, schedule slips are usually ==detected quickly== because ==teams hold **daily status meetings**==. This allows corrective actions to be taken immediately.

---

### Excessive Defect Rate

This happens when testing discovers a ==large number of bugs==.

The main question becomes:

اكمل اضيف فيتشرز على الخرا الي هببته ولا اقف وانضف الاول ؟

- Should the team continue adding new features?
- Or stop and fix the bugs first?
    

Problems are more noticeable in projects where ==integration happens on a fixed schedule== (e.g., once per week).

Projects that ==integrate changes==:

- Every day, or
    
- Whenever a new feature is added
    

can handle defects more effectively.

If ==defect rates become high==, the best approach is:

لو المشكلة الي انت وقعت فيها عويصة، ف من المستحيل انك هتكمل ع المشكلة دي، بالعقل كدا  انت هتوقف انك تضيف حاجة تانية، وتمسك أُس المشكلة وتحلها قبل ما تكمل

1. Stop adding new functionality.
    
2. ==Investigate the root cause== of the defects.
    
3. Fix the ==underlying problem before continuing development.==
    

Although this can be difficult from a project management perspective, it prevents larger issues later.

---

### Requirements Misunderstood

بإختصار هنا المشكلة تقع في (سوء التفاهم) انت فهمت العميل بشكل خطأ، فعملتله بالتالي حاجه هو مش عايزها

العميل بيركز على احتياجه، وعلى توقعات المستخدمين، ويفهم ازاي المستخدم عايز المنتج يكون ازاي

اما بالنسبة للمطور
بيفكر تفكير تيكنكال شوية، والي هو ازاي هيعمل الحاجه دي

فالحل انك تحاول تدمج العميل فالشغل بتاعك على قد ما تقدر، وتحاول تبعتله فيرجنز من المشروع و تعمل معاه ميتينجز كتير علشان تناقشه في المشروع

This risk occurs when the ==delivered product is **not what the customer actually wanted**==.

Why does it happen?

Because customers and developers operate in different worlds:

**Customer Perspective**

- Focuses on ==business needs and user expectations.==
    
- Understands what ==users want the product to do.==
    

**Developer Perspective**

- Focuses on ==technical implementation==.
    
- Understands ==how the product will work.==
    

Misunderstandings arise when these perspectives do not align.

Best ways to avoid this problem:

- Keep the customer involved as much as possible.
    
- Deliver working product increments frequently.
    
- Maintain continuous communication between customers and developers.
    

---

### Requirements Churn

Requirements churn occurs when the customer continues changing requirements while development is already in progress.

العميل الي مش ثابت على حال، كل شوية يغيرلك في الريكوايرمنتس، ضيفلي حاجه عدلي حاجه شيلي حاجه، هينقطك قبل ما يديلك فلوس الشغل (حسبي الله ونعم الوكيل فكل عميل ب.ان) ودا بيسببلك ف تأخر في تسليم المشروع + بيسببلك ضغط في الشغل ممكن يخليك تطلع باجز جديدة، 

Examples:

- New features added
    
- Existing features modified
    
- Features removed
    

Consequences:

#### 1. Missed Delivery Dates

- Deadlines become difficult to achieve.
    

#### 2. Rework Overload

- Coding, testing, and integration must be repeated.
    

#### 3. High Defect Rates

- Rework often introduces new bugs.
    

#### In Agile Projects

Requirements are managed through a ==prioritized list called the **Product Backlog**== (in Scrum).

Changes are reviewed only at specific points:

- After ==iterations in XP==
    
- During ==Backlog Refinement meetings== in Scrum
    

This helps control continuous requirement changes.

#### In Plan-Driven Projects

Requirements are usually managed by a ==**Change Control Board (CCB)**.==

The CCB:

1. Reviews new requirements.
    
2. Decides whether they should be added.
    

A ==risk exists== because the CCB may ==approve new features without fully understanding==:

- Schedule impacts
- Required effort
- Development consequences
    

---

### Turnover

Turnover occurs when team members leave the project.

واحد من التيم طفش وساب التيم، بتحصل عادي، انت مش عايز حد يسيب التيم، تعمل اي؟

- حمسهم يا جدع، الي هيشتغل هنجوزه مثلا
- اعمل بيئة عمل كويسة، سالكة لبعضها كدا، اعملوا حجز كورة فكل نهاية increment مثلا
- ادي ليهم التحكم الكامل في جداولهم، متلزمهمش بمواعيد

خلاص اختار انه يسيب الشغل، لازم تكون مجهز سناريو لكدا، زي تنمي المعرفة على التيم كله
وتخلي عندهم تحكم كامل بالكود، وكمان تطبق ال pair programming

Example:

- The most experienced developer leaves three weeks before product delivery.
    

Ways to reduce turnover:

1. Give developers interesting work.
    
2. Provide a pleasant work environment.
    
3. Allow control over their schedules.
    

#### Important Note

Money is ==not usually the primary motivator== for software developers.

> كدب انا عايز فلوس

While developers want fair compensation, simply paying more money does not always:

- Increase productivity.
    
- Prevent employees from leaving.
    

If a key developer leaves despite all efforts, the project should continue. It is a challenge, but not the end of the project.

#### Reducing the Impact of Turnover

The best strategy is to ==spread knowledge across the entire team==.

Useful practices include:

- Common Code Ownership
    
- Pair Programming
    

These practices:

- Increase team involvement.
    
- Prevent knowledge from being concentrated in one person.
    
- Ensure the whole team understands the codebase.
    

---
### Risk Avoidance and Mitigation

كيف تخفف المشكلة او تبعد عنها؟ 

ابعد عن المشكلة، انك توقعها، كيف اننا نتوقعها؟
يعني مثلا لو حصلت المشكلة دي، كيف نتخطاها؟

طب تخفف المشكلة، انك تفكر في اسوء سناريو ممكن يحصل، أوسخ حاجه، كيف تتصرف فالوقت دا مثلا؟

After identifying project risks, each risk should be addressed from two perspectives:

#### 1. Avoidance

تبعد المشكلة انها تحصل

Ask:

**"How can we prevent this risk from happening?"**

Examples:

- Add buffer time (slack) to schedules.
- Perform continuous code reviews.
- Freeze requirements early.
- Release software frequently.
- Use pair programming.
- Share knowledge among team members.
    

The goal is to reduce the chance that the risk occurs.

---

#### 2. Mitigation

تخفف من وقوع المشكلة، المشكلة وقعت بالفعل، نقلل ضررها ازاي

Ask:

**"What will we do if the worst-case scenario actually happens?"**

Examples:

- Remove features from the current release.
- Pause new development and focus on fixing bugs.
- Move new features to a future release.
- Adjust schedules and resources.
    

The goal is to ==reduce the damage after the risk becomes== reality.

Planning mitigation actions in advance is much better than reacting without preparation.

---

### Continuous Risk Management

After defining avoidance and mitigation strategies, you will have a plan for handling the risks you can identify.

However:

- Some risks will always be missed.
    
- Unexpected problems will still appear.
    

The experience gained from ==managing known risks== helps teams ==respond more effectively to new risks== when they arise.

#### In Iterative Development

It is recommended to ==review risks after every iteration==:

1. Check which risks have changed.
    
2. Identify new risks.
    
3. Remove risks that are no longer possible.

---
## Resource Requirements

**Resource Requirements** are ==all the resources needed to successfully develop, test, and deploy a project==. These resources are divided into three main categories:

- **Human Resources** (People)
    
- **Hardware Resources** (Computers and Devices)
    
- **Software Resources** (Tools and Development Environment)
    

#### Human Resources

- How many people are required for the project?
    
- Should all team members start at the same time?
    
- Can team members join gradually as different project phases begin?
    

#### Hardware Resources

- How many computers are needed?
    
- Are any special hardware devices required?
    

#### Software Resources

- What development environment is needed?
    
    - Software
        
    - Tools
        
    - Configurations
        
- Are all team members trained to use this environment?
    

#### Support Resources

Additional supporting resources are required, including:

- **Configuration Management System**
    
    - Used to ==manage source code versions and project changes==.
        
- ==**Stand-Alone Build== Machine**
    
    - A dedicated machine for ==building and testing the project.==
        
    - Often implemented as a **==Virtual Machine (VM)==** on a cloud server.
        

---

### Factors Affecting Resource Requirements

#### 1. Target Platform

The platform on which the application will run strongly influences required resources.

Examples:

- Web Application
- Mobile Application
- Desktop Application
- Cloud Application
    

### 2. Application Domain

The ==business domain== also affects resource needs.

Examples:

- Banking
    
- Healthcare
    
- E-Commerce
    
- Education
    

The target platform and application domain answer many of the resource-related questions.

---

### Resource Planning is Iterative

Some resource decisions cannot be ==finalized at the beginning of the project==, such as:

- Team Size
- Project Phases
- Project Start Dates
    

These details usually become clear only after:

1. Effort Estimation
2. Project Scheduling

---

## Task Estimation

**Task Estimation** is the ==process of determining how much work needs to be done== and ==how much time and effort each task will require==.

The first step toward creating a **project schedule** is understanding:

- What tasks need to be completed.
- How long each task is expected to take.


---

### Why Large Estimates Are Unreliable

Statements like:

> "This feature will take six months."

should not be trusted as accurate estimates.

Why?

Because large features contain many ==unknown details and cannot be estimated reliably== as a single unit.

A more reasonable statement would be:

> "I worked on a similar feature before, and it took six months."

Even then, it is only a ==rough reference.==

Accurate estimation becomes possible only after breaking large features or user stories into smaller, detailed tasks.

---

### Estimation Process

To estimate a project:

- Step 1: Select a ==small set of high-priority== requirements.

- Step 2: ==Design a solution== for those requirements.

- Step 3: Break ==down the features into detailed==, implementable tasks.

- Step 4: ==Estimate the effort required== for that iteration.

Only after completing these steps can a realistic schedule be created.

---
### Break Work into Small Tasks

Tasks should be:

- No longer than ==one week==.
- ==Ideally== ==one or two days.==
- Estimated using ==**person-hours** whenever possible.==
    

Instead of:

- Build Authentication System (2 weeks)
    

Break it into:

- Create User Table (3 hours)
- Implement Registration API (5 hours)
- Implement Login API (4 hours)
- Write Unit Tests (2 hours)
    

---

### Benefits of Breaking Tasks Down

- Better Accuracy
	- Smaller tasks are ==easier to estimate correctly==.
- Better Understanding
	- The team is forced to ==think carefully about how the work will actually be completed==.
- Reduced Context Switching
	- Tasks that can be completed in one sitting ==reduce mental overhead and productivity loss.==
- Easier Progress Tracking
	- Small completed tasks provide clear visibility into project progress.

---
### Estimation Sequence

A fundamental rule of estimation is:

1. Estimate Size
2. Estimate Effort
3. Create Schedule

This order should ==never be reversed==.

You cannot determine how long something will take until you know how large the work is.

In other words:

> First understand ==the amount of work==, then estimate the effort, and finally create the schedule.

---
### Size Estimation

Size can be measured using different metrics, such as:

- Number of Functional Modules
- Number of Classes
- Number of Methods
- Function Points
- Object Points
    

These measurements help determine the overall amount of work involved.

---
### Effort Estimation

After estimating size, the next step is to estimate effort.

Effort should be measured in:

- Person-Hours
	- Examples:
		- 2 hours
		- 5 hours
		- 10 hours
- Rather than vague estimates such as:
	- Small
	- Medium
	- Large
    

---
### Delphi Estimation Method

The **Delphi Method** is a ==simple and effective technique for estimating project effort.==

- Step 1: Select Experts
	- Choose ==three experienced senior developers==.
		- These developers are selected because their experience allows them to make more reliable estimates.
		
- Step 2: Provide the Task Breakdown
	- Give the experts the detailed list of tasks.
	
	- Ideally, they should review the tasks independently.
	
- Step 3: Collect Three Estimates for Each Task
	- For every task, ask each developer to provide:
		- Optimistic Estimate
			- The ==shortest== possible ==completion time==.
		- Pessimistic Estimate
			- The ==longest== possible ==completion time==.
		- Most Likely Estimate
			- The ==normal== expected ==completion time==.
	- All estimates ==should be provided in **person-hours**==.
- Step 4: Calculate Averages
	- Compute:
		- Average Optimistic Time
		- Average Pessimistic Time
		- Average Most Likely Time
    
- Step 5: Choose the Official Estimate
	- Select one of the calculated values as the official effort estimate for each task.
	
	- These estimates are then used to build the project schedule.

---
### Role of Managers in Estimation

- Managers should ==**not perform development estimates**==.

Why?

Because accurate estimation requires detailed knowledge of:

- Design
- Architecture
- Implementation details
- Technical challenges
    

Even if a manager was previously a developer, ==they should not estimate development work== unless they are ==actively involved in the technical implementation==.

The people who should ==estimate development tasks== are the ==developers who will actually perform the work.==

---

## Project Schedule

After determining:

- Task Size
    
- Effort Estimates (Person-Hours)
    

the next step is creating the **Project Schedule**.

A project schedule defines:

- When tasks will start.
- When tasks will finish.
- Who will perform each task.
- The expected delivery date of the project.
    

Several important factors must be considered when building a schedule.

---

### Factors Affecting the Project Schedule

#### 1. Task Dependencies

Tasks are often ==related to one another==.

Some tasks:

دكتورة رشا ممكن تجيب امثلة وتقولك هل دي من الي بيشتغلوا بشكل باراليل ولا منفصلين ولا شغالين جزئيا
- Can Run in Parallel
	- Multiple tasks can start at the same time.
- Require Previous Tasks to Finish
	- Some tasks ==cannot begin== until other tasks are completed.
- Can Start Partially
	- Sometimes a task can start when another task is partially completed.
- Why Dependencies Matter
	- Task dependencies directly affect:
		- Project Duration
		- Delivery Date
		- Critical Path
    - If one dependent task is delayed, all tasks that depend on it may also be delayed.

---

#### 2. Developer Availability

Developers are not available every working day.

The schedule must account for:

- Weekends
- Public Holidays
- Vacations
- Sick Leave
- Training Sessions
- Buffer Time
    
---

#### 3. Development Duty Cycle

A common mistake is assuming:

> 8 working hours = 8 development hours

This is rarely true.

Developers spend time on many ==non-coding activities==:

- Reading Emails
- Meetings
- Code Reviews
- Documentation
- Discussions
- Breaks

The percentage of time spent doing actual development work is called the:

**Development Duty Cycle**

Example:

| Work Day | Development Time | Duty Cycle |
| -------- | ---------------- | ---------- |
| 8 Hours  | 8 Hours          | 100%       |
| 8 Hours  | 6 Hours          | 75%        |
| 8 Hours  | 4 Hours          | 50%        |

In practice, the duty cycle ==can be as low as **50%**.==

---
#### 4. Developer Workload Management

A developer should not be assigned to ==multiple tasks simultaneously==.

Result:

- Constant context switching.
    
- Lower productivity.
    
- Delays.
    

---

##### Good Example

Developer Ahmed:

1. Finish Task A.
    
2. Start Task B.
    
3. Start Task C.
    

This produces:

- Better focus.
    
- Better quality.
    
- More accurate scheduling.
    

---

##### Why This Rule Is Important

Managers may be tempted to overload developers to meet deadlines.

However:

- Unrealistic schedules usually fail.
    
- Deadlines get missed.
    
- Schedules require constant revisions.
    

Therefore, developers should focus on one task at a time whenever possible.

---

### Scheduling Tools

After considering all scheduling factors, the schedule should be created using project management tools.

#### Plan-Driven Project Tools

Examples:

- Fast Track Scheduling
- Basecamp
- Merlin
    

#### Agile Project Tools

Examples:

- Jira
- Pivotal Tracker
- Trello
    

These tools help manage:

- Tasks
- Progress
- Sprints
- Deadlines
    

---

### Spreadsheet-Based Scheduling

For small projects, a spreadsheet may be sufficient.

A famous approach is:

#### Spolsky's Painless Schedule
![[Pasted image 20260613103741.png]]

The schedule contains the following columns:

|Column|Description|
|---|---|
|Feature Name|Name of the feature|
|Tasks|Tasks within the feature|
|Priority|Importance of the task|
|Original Estimate|Initial estimated effort (person-hours)|
|Current Estimate|Updated estimate (person-hours)|
|Elapsed Time|Time already spent (person-hours)|
|Remaining Time|Time still required (person-hours)|
|Developer|Assigned developer|
|Velocity|Estimation accuracy metric|

---

##### Using the Schedule

- When a Task Is Added

Initially:

Original Estimate = Current Estimate

Example:

|Original|Current|
|---|---|
|10 Hours|10 Hours|

During Development

If the task takes ==longer or shorter than expected==:

Update:

- Current Estimate

Example:

|Original|Current|
|---|---|
|10 Hours|14 Hours|

This helps improve future estimates.

When the Task Is Completed
At completion:

Current Estimate = Elapsed Time

and

Remaining Time = 0

Example:

|Current|Elapsed|Remaining|
|---|---|---|
|12 Hours|12 Hours|0|

---

##### Why Is It Called "Painless"?

Because:

- Updating the ==schedule takes== only a few minutes daily.
    
- No complicated calculations are required.
    
- Easy for both developers and managers.
    

The schedule ==should be updated every day.==

---

##### Velocity in Spolsky's Schedule

To improve estimation accuracy, a ninth column is added:

- Velocity
	 $Velocity = \frac{Original\ Estimate}{Elapsed\ Time}$

- Case 1: Velocity > 1.0
	- Example:
		- Original Estimate = 10 Hours
		- Elapsed Time = 8 Hours
		- Velocity = 1.25
		- Meaning:
			- The task was ==**overestimated**.==
			- It ==took less time than expected==.

- Case 2: Velocity < 1.0
	- Example:
		- Original Estimate = 10 Hours
		- Elapsed Time = 15 Hours
		- Velocity = 0.67
		- Meaning:
			- The task was ==**underestimated**.==
			- It took ==longer than expected==.
- Case 3: Velocity = 1.0
	- Example:
	- Original Estimate = 10 Hours
	- Elapsed Time = 10 Hours
	- Velocity = 1.0
	- Meaning:
		- The estimate was ==perfectly accurate==.
		- This is the ideal situation.
	
Velocity helps:

- Developers
	- Measure estimation accuracy.
	- Improve future estimates.
    

- Project Managers
	- Understand which estimates can be trusted.
	- Build more realistic schedules.

 - Good Estimation
	 - As developers gain experience, their velocity should move closer to: **1.0**
	 - ==A practical acceptable range is: **0.85 – 1.15**==
- Poor Estimation
	- Large fluctuations indicate inconsistent estimation skills
	- Ex:
		- 0.6
		- 1.8
		- 1.2

Within this range, estimates are considered reasonably accurate.

---

## Defect Management

**Defect Management** is the process of identifying, tracking, and fixing software defects (bugs) during development.

### Key Points

- Defects are unavoidable in any software project.
    
- The project plan should include:
    
    - Continuous testing activities.
        
    - Buffer time for fixing defects.
        

#### Main Objectives

1. Introduce as few defects as possible while writing code.
    
2. Find and fix as many defects as possible before release.


Since some defects may still remain after release, the goal is to:

- Release software with the fewest possible defects.
    
- Ensure remaining defects have minimal impact on functionality and performance.
    

---

### Defect Severity Levels

1. Fatal
	- Causes system crash, freeze, or data loss.
		
	- Highest severity.
    
2. Severe
	- Important functionality does not work.
		
	- No workaround exists.
    
3. Serious
	- Functionality does not work correctly.
		
	- A workaround is available.
    
4. Annoying (Trivial)
	- Minor bug or documentation issue.
	    
	- Does not affect system functionality.
    
5. Feature Request
	
	- Not a defect.
	    
	- A request for additional functionality in future releases.
    

---

### Defect Tracking System

Organizations use a **Defect Tracking System** to:

- Record defects.
- Assign severity levels.
- Monitor project quality.
- Track the number and status of defects.
    

Whenever a defect is found, a defect report should be created and logged in the system.

---

### Fixing Priorities

Developers fix defects from the highest severity to the lowest:

1. Fatal
    
2. Severe
    
3. Serious
    
4. Annoying
    
5. Feature Requests
    

---
### Release Policy

Most organizations ==do **not** allow software releases== with:

- Fatal defects (Level 1)
    
- Severe defects (Level 2)
    

They also ==try to remove== all Serious defects (Level 3) before release.

---
## Project Oversight

**Project Oversight** is the process of monitoring and guiding a project to ensure it stays on track regarding **time, cost, scope, and quality**.

### Main Activities

- **Monitoring Progress:** Track completed tasks and review schedules and deadlines.
    
- **Managing Developers:** Maintain communication, remove blockers, and balance workloads.
    
- **Managing the Process:** Ensure the team follows the agreed process and improve it when necessary.
    
- **Reporting:** Communicate project status to managers and stakeholders.
    

---
### Status Reviews and Presentations

Status reviews help the team and management understand the current state of the project.

#### Status Reports Should Answer:

- What has been completed since the last review?
    
- What planned work was not completed?
    
- What are the next steps?
    

#### Reporting Guidelines

- Be honest and transparent.
    
- Do not exaggerate progress.
    
- Do not hide problems or make excuses.
    
- Report both achievements and challenges.
    
- Communicate bad news early so the team can find solutions quickly.
    

---
### Presentation Best Practices

When giving a presentation:

- Know your audience.
    
- Match the presentation to their knowledge level.
    
- Keep the objective clear.
    
- Keep slides short and focused.
    
- Avoid overcrowding slides with bullet points.
    
- Use bullet points as keywords, not full sentences.
    
- Expand verbally on each point instead of reading from slides.
    

---

### Project Post-Mortem (Retrospective)

A **Post-Mortem** is a review conducted after a project (or iteration) to identify lessons learned and improvements for future work.

#### Key Questions

- Were the project goals achieved?
    
- What went well and what did not?
    
- Did the team follow the process effectively?
    
- Were deadlines met?
    
- Were all customer requirements implemented?
    
- What would the team do differently next time?
    
- Why did defects or delays occur?
    
- What improvements are needed in the process, work habits, or environment?
    
- Who is responsible for implementing those improvements?
    

#### Important Note

The development team should own and improve the process, not management alone.

#### When Is It Conducted?

- **Plan-Driven Projects:** After the product release.
    
- **Agile Projects:** After every iteration (e.g., after every Sprint in Scrum).
    

---
### Quick Summary

|Topic|Main Purpose|
|---|---|
|**Project Oversight**|Monitor progress, manage people and process, and report status.|
|**Status Reviews**|Communicate achievements, issues, and next steps.|
|**Presentations**|Deliver clear, concise information to the audience.|
|**Project Post-Mortem**|Analyze lessons learned and improve future projects.|

---
