---
title: "Software Development - Lecture 4"
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
# Scrum

Scrum is ==project management methodology==, it *dosen't define many of the detailed development practices* (Pair Programming, Test-Driven)

The idea in the agile scrum methodology is that a
- ==small team is unified around a single goal== and gets together for sprints of development that move them towards that goal.

- Scrum emphasizes the efficiency of ==small teams <= 10 developers== 
- Scrum teams use many of the XP Practices
	- Code ownership
	- Pair programming
	- Small releases
	- Simple design
	- Test-driven development
	- Continuous integration
	- Coding standards
---
## Scrum Sprints

- Scrum is Characterized by the ==**sprint**==
	- is an iteration with a predetermined duration of commonly ==1-4 weeks==
	- Sprints are ==time-boxed== in that they are of a ==fixed duration== and the output of a sprint is ==what work the team can accomplish during the sprint==
	- The delivery date for the sprint ==does not move out==
		- This means that sometimes a sprint ==can be terminated== early ==if all work planned for the sprint has been completed==
		- and sometimes a sprint will finish with ==less functionality than was proposed==.
		- A sprint ==always== delivers a **usable product.**
---
## Scrum Artifacts

- There's 2 Backlogs:
	- **Product Backlog**: is the prioritized list of ==all the requirements for the project==
		- **Product owner** ==creates== and ==prioritizes== the product backlog composed of user stories, ==based on a desired Product Goal.==
		- The development team breaks the ==high-priority user stories into tasks ==and estimates them 
			- This List of tasks becomes the ==sprint backlog==
		
	- **Sprint Backlog**: is the prioritized list of ==user stories== for the ==current sprint.==
		- Once the sprint starts, only the **development team** can add tasks to the sprint backlog

---
## Scrum Roles

Scrum explicitly defines 3 roles 

1. Product Owner (D&P , O , E)
	- ==**defining**== and **==prioritizing==** the product requirements.
		
	- ==**orders** the backlog items according to business value==
		
	- **==ensures==** that the Development Team ==clearly understands the requirements behind each user story==.
	
2. Scrum Master (2 HELP , 2 ENSURE, 1 PROTECT , 1 RECORD)
	- is an ==expert in Scrum== who facilitates Scrum projects
		
	- ==**helps**== the team **understand and apply Scrum values, principles, and practices.**
		
	- ==**protects**== the team from ==external interruptions== during the sprint.
		
	- **==ensures==** that everyone ==makes progress== by *removing impediments that hinder the team’s progress*
		
	- ==**ensures**== that the Daily ==Scrum meetings and other Scrum events are held==
		
	- **==helps==** keep Daily Scrum ==meetings short and focused==.
		
	- **==records==** the decisions ==made at the meeting and tracks action items.==
	
3. Development Team
	- is ==self-organizing==; the developers decide among themselves who will work on which user stories and tasks, and what the development process they will employ during the sprint.
		
	- ==consists== of all professionals doing the work to deliver a potentially releasable increment (Developers, Designers, Testers)
		
	- **==Reviews==** the ==user stories generated and prioritized== by the Product Owner
		
	- ==**Breaks**== them ==into tasks to plan== how the features will be implemented
		
	- **==Selects==** a ==subset of stories and tasks that can be completed== within the given sprint duration.
		
	- collectively ==owns all code and the project== and shares the goal of delivering a potentially releasable product increment at the end of each sprint

---
## Scrum Meetings:

1. Sprint planning meeting (التخطيط المبدئي)
	- is ==held at the beginning of each sprint== to define the work that will be performed during the upcoming sprint
		
	- Product Owners: ==Presents the highest-priority items== from the product Backlog.
		
	- The Developers ==estimate the product backlog items==, using story points
		
		- review these items and select the ones they believe they can complete during the sprint, based on their ==historical velocity== (the total story points completed in previous sprints) and their ==current capacity==.
			
		- The selected items move ==from the Product Backlog to the Sprint Backlog==.
			
		- then ==breaks these items into tasks and estimates those tasks in hours== to ensure that the total planned work does not exceed the team’s available capacity.
			
		- Sprint Goal is established to provide a shared objective and focus for the sprint
			
		- tasks in a sprint be small enough (no ==longer than one day of effort==) to improve tracking and transparency.
			
			- If a task is estimated to take more than day of effort, ==it is often divided into 2 or more tasks==.
			
	-  sprint begins immediately ==after Sprint Planning==
		
	- After each sprint, a ==new Sprint Planning Meeting== is held where the Product Owner and the team ==re-prioritize the product backlog== and create a backlog for the next sprint
		
	- This ==planning meeting== is also where the ==organization can decide whether the project is finished==, or whether to finish the project at all.
	
	
2. Daily Scrum Meeting (بنتابع التقدم بتاعنا كل يوم)
	- The Daily Scrum is held every day of the Sprint ==often at the beginning of the day==. It is a stand-up meeting of ==15–30 minutes duration== and is conducted by the developers.
	- Each team member talks about:
		- What tasks have been finished yesterday.
		- What is planned to be done today.
		- What impediments blocking their progress
	- Allows the team to ==share information and track sprint progress==
	- ==Reinforces team spirit== by sharing progress
	- ==Highlights problems== so that any delays in the schedule or any implementation issues are immediately obvious and can be addressed by the team at once
	
3. Sprint Retrospective Meeting (لما السبرنت تخلص بنراجع الدنيا)
	- to ponder the just completed sprint and ==analyze whether or not it has been successful== and understand what made it like that.
		
	- Once the sprint is over, the current version of the product ==is released to the Product Owner==, **who may perform acceptance testing on it.**
		
	- The team discuss
		- What went well during the sprint
			
		- What problems were encountered during the sprint
			
		- What can be done to avoid these problems and improve performance in the sprint
	- The Scrum Master calculates the team's velocity and analyzes the burndown chart
		
	- should end with several action points.
		- These points must be visible to everyone, have a responsible person assigned, and ideally a deadline.
	- In next retrospective, the team will analyze the progress on the action points from the previous retrospective meeting.
	
- Backlog Refinement Meeting (صنايعية ال Backlog)
	- is held periodically throughout the sprint (such as once a week) to ==refine backlog items and make the backlog clean==, ensuring they are ready for future sprint planning.
		
	- The Product Owner can ==add items== to the backlog and ==re-prioritize some items== and ==move them== to the top of the backlog.
		
	- The team ==ensures that the stories are clear== and the ==acceptance criteria is achievable.==
		
	- Developers ==breaks down high priority== stories into ==tasks.==
		
	- Each task ==is carefully analyzed and redefined== if needed
		
	- The ==tasks can also be broken into several subtasks==, depending on the size and the needs.

---
### Burndown Chart

![[Pasted image 20260613030303.png]]

تعالى نلخصه بشكل احسن انا هركز على الحاجات شبه الي جت فالميد فخلي بالك معايا

A **Burndown Chart** is a Scrum tool used to track how much work is left during a sprint.

هنقسمها الاكسيز بقى المحور السيني والصادي
#### Axes

- **X-axis (Horizontal)** → **Time (Days of Sprint)** 
    
- **Y-axis (Vertical)** → ==Remaining work== (usually **Story Points** or Tasks)
    

---

### Lines in the Chart
في سؤال جه في الامتحان 
If the actual line ends the burn down chart is above the ideal line, it means the team is

الحاجات دي اهي
#### 1. Ideal Line (Green Line)

Represents the perfect scenario:

الحاجة الي مش بتحصل غير فخيالي وخيالك

- Work ==decreases steadily every day==.
    
- ==All planned work is finished== by the end of the sprint.
    

Think of it ==as the **target path**.==

#### 2. Actual Line (Red Line)

Represents what ==actually happened== during the sprint.

بمقارنة الخط الاحمر والاخضر هنقدر نعرف التيم هبب اي بالظبط

بص نمشي بمثال
انت مثلا عندك sprint فيه 40 story point


| اليوم        | الي بوينت المتبقية         |
| ------------ | -------------------------- |
| اليوم الاول  | 40 (انت لسه مبدأتش)        |
| اليوم الرابع | 30 (المفروض تكون خلصت 10)  |
| اليوم السابع | 20 (يعني يكون خلصت 20)     |
| اليوم العاشر | 10 ( يعني يكون خلصت 30)    |
| اليوم ال 14  | 0 (المفروض يكون خلصت خالص) |

#### Red Line = Green Line
![[Pasted image 20260613031951.png]]

التيم ماشي بالظبط على الخط الي احنا متوقعينه

- Sprint is going as planned.
    
- ==Team is on track==.
    

#### Red ==Line== Below Green Line

![[Pasted image 20260613031940.png]]

- بص في الحالة دي لو افترضنا عندك في اليوم السابع انت تكون المفروض باقيلك 20 نقطة
- بس انت في الحقيقة خلصت شغل اكبر من المتوقع وباقيلك 15 بس
- ساعتها انت عملت شغل اكبر من المتوقع

- More work ==has been completed than expected==.
    
- ==Team is **ahead of schedule**.==
    

#### Red Line ==Above== Green Line

- نفس مثال اليوم السابع انت المفروض يكون ==متبقيلك 20== بس انت بشوية علوقية (مماطلة يعم متزعلش نفسك) كسل منك وخلصت 15 بس فا ==باقيلك 25==
- فـأنت هنا خلصت شغل اقل من المطلوب ف انت متأخر 

- More work ==remains than expected==.
    
- Team is ==**behind schedule**.==
    

**Exam Question:**

> If the actual line ==ends above the ideal line==, it means the team is: ==Behind Schedule==

---

### Example from the Slide

- Days 1–2: Almost no work completed.
    
- Day 3: Big drop → Team became very productive.
    
- Days 4–6: Steady progress.
    
- Day 8: Remaining work increased.
    
    - This usually means **new tasks were added to the sprint** (which is generally not ideal).
        
- End of sprint:
    
    - Some work still remained.
        
    - Sprint goal was not fully completed.
        

---

### Velocity

**Velocity** = ==Amount of work completed in a sprint==.

Usually measured in:

- Story Points
    
- User Stories completed
    

> Not the number of hours developers worked.

**Exam Trap:**

> In Scrum velocity represents number of hours worked by developer during Sprint.

 ==**False**==

Correct:

> Velocity = Amount of work completed (Story Points) during a Sprint.

---

### Important Exam Notes

### Remember

|Concept|Answer|
|---|---|
|X-axis|Time|
|Y-axis|Remaining Work (Story Points/Tasks)|
|Green Line|Ideal Progress|
|Red Line|Actual Progress|
|Red Above Green|Behind Schedule|
|Red Below Green|Ahead of Schedule|
|Velocity|Completed Story Points|
|Velocity = Hours Worked|False|

### Very Common MCQs

1. **What does the X-axis represent?**
    
    - Time
        
2. **What does the Y-axis represent?**
    
    - Remaining Work
        
3. **If Actual Line is above Ideal Line?**
    
    - Behind Schedule
        
4. **If Actual Line is below Ideal Line?**
    
    - Ahead of Schedule
        
5. **What does Velocity measure?**
    
    - Amount of completed work (Story Points)
        
6. **Does Velocity measure developer working hours?**
    
    - False
        

---
## Scrum Board

![[Pasted image 20260613034552.png]]


### What is a Scrum Board?

A **Scrum Board** is a ==visual tool used to track the progress== of work during a Sprint.

It shows:

- What work has not started.
- What work is currently being developed.
- What work has been completed.
    

The Sprint Backlog is usually displayed on a Scrum Board.

---
### Basic Scrum Board Columns

- To Do Tasks 
	- that have not been started yet.
	
- In Progress
	- Tasks currently being worked on.
- Done
	- Tasks that are completed according to the team's Definition of Done.

---

### Task Flow

Tasks move through the board as follows:

```
To Do → In Progress → Done
```

---
### Definition of Done (DoD)

A task is ==considered Done== when it satisfies the team's Definition of Done.

Different teams may define it differently:

- Some teams: code completed.
- Some teams: tests passed.
- Best practice: code completed, tested, integrated, and deployed.
    

---
### Additional Columns

A Scrum Board is customizable.
Extra columns may include:

- Review
- Testing
- Ready to Deploy
    

Example:

```
To Do
↓
In Progress
↓
Review
↓
Testing
↓
Ready to Deploy
↓
Done
```

---

### Product Backlog vs Sprint Backlog

- Product Backlog
	- Contains all project requirements ordered by priority.
- Sprint Backlog
	- Contains selected Product Backlog items for the current Sprint.

During Sprint Planning:

```
Product Backlog
        ↓
Sprint Backlog
```

---

### Decomposition of Work

Selected Product Backlog Items are broken into smaller tasks.

User Story:
```
Create Login Feature
```

Tasks:
```
Design UI
Create API
Validation
Testing
```

These tasks become To Do items.

---

### Velocity and Sprint Planning

==The amount of work== ==selected for a Sprint== depends on:

- Team Capacity
- Historical Velocity
    

- Important Rule
	- The total estimation of Sprint tasks ==should NOT exceed the team's average Velocity.==

Example:

```
Average Velocity = 40 Story Points
```

The team should ==not commit to more than 40== Story Points.

---

### Adding Tasks During Sprint

Normally:

❌ No one can add tasks during the Sprint.

Why?

- Affects Velocity.
- Makes planning inaccurate.
- May cause Sprint failure.
    

### Exception

A task can be added if another task with ==the same estimation is removed==.

==Dark arrows== *indicate the movement of items during spring planning* 

==Light arrows== *indicate the movement of items during the sprint*

---
#### Important Exam Questions

- What is the purpose of a Scrum Board?
	- A. Store source code  
	- B. ==Track Sprint progress== 
	- C. Calculate velocity  
	- D. Manage budget
	
- Which columns are the minimum required on a Scrum Board?
	- A. Product Backlog, Sprint Backlog  
	- B. Review, Testing, Done  
	- C. ==To Do, In Progress, Done==  
	- D. Planning, Coding, Testing
	
- Tasks move through a Scrum Board in which order?
	- A. Done → To Do → In Progress  
	- B. ==To Do → In Progress → Done==  
	- C. Sprint Backlog → Product Backlog → Done  
	- D. Review → To Do → Testing
	
- What does the Product Backlog contain?
	- A. Completed tasks only  
	- B. Sprint tasks only  
	- C. ==Prioritized project requirements==  
	- D. Testing reports
	
- What happens during Sprint Planning?
	- A. Tasks move from Sprint Backlog to Product Backlog  
	- B. ==Team selects high-priority items from Product Backlog to Sprint Backlog==  
	- C. Sprint ends  
	- D. Velocity is reset
	
- The amount of work selected for a Sprint depends on:
	- A. ==Team capacity and historical velocity==  
	- B. Project budget only  
	- C. Product Owner only  
	- D. Number of developers only
	
- The sum of Sprint task estimations should:
	- A. Be greater than velocity  
	- B. Equal project budget  
	- C. ==Not exceed average velocity==  
	- D. Double the velocity
	
- Can tasks be added during a Sprint?
	- A. Always 
	- B. Never 
	- C. ==Usually no, except if equivalent work is removed== 
	- D. Only by Product Owner
	
- Which of the following may appear between In Progress and Done?
	- A. Review  
	- B. Testing  
	- C. Ready to Deploy  
	- D. ==All of the above==
	
- Velocity represents:
	- A. Hours worked by developers  
	- B. Number of meetings  
	- C. ==Amount of completed work (Story Points)==  
	- D. Sprint duration

---

ركز في اهم الاسئلة الي ممكن الدكتورة رشا تجيبهم

❌ Velocity = Hours Worked

✅ Velocity = Completed Story Points

❌ Product Backlog = Current Sprint Work

✅ Product Backlog = All Prioritized Requirements

❌ Sprint Backlog = Entire Project

✅ Sprint Backlog = Selected Work for Current Sprint

❌ Tasks can freely be added during Sprint

✅ Normally tasks cannot be added after Sprint starts

❌ Done = Code Written Only

✅ Done = According to Definition of Done (often tested, integrated, and deployable)

---

## Scrum Velocity

- **Velocity** is the amount of work completed during a single Sprint.

It is usually measured in:

- Story Points
- Completed User Stories
    

Velocity helps the team decide how much work they can commit to in future sprints.

مثال يعمنا
- Sprint 1
	- Completed: 30 Story Points
	
- Sprint 2
	- Completed: 35 Story Points
	
- Sprint 3
	- Completed: 40 Story Points
	
- Average Velocity:
	- (30 + 35 + 40) ÷ 3 = 35 Story Points

The team can safely plan around **35 Story Points** in the next Sprint.

---
### Why is Velocity Important?

Velocity helps:

- Predict future Sprint capacity.
- Improve Sprint Planning.
- Avoid overcommitting work.
- Estimate project completion dates.
    

---
### Acceleration

As the project progresses:

- Team members gain experience.
- Estimation becomes more accurate.
- Collaboration improves.
- Productivity increases.
    

This improvement is called: Acceleration

### Why Does Velocity Increase?

Because the team becomes better at:

- Breaking down tasks.
- Estimating work.
- Assigning tasks.
- Collaborating with each other.

As a result:

```text
Velocity ↑
Productivity ↑
```

لو زادت الVelocity هتزيد الانتاجية (علاقة طردية)

---
## Scrum End of Project

- What Happens After the Last Development Sprint?
	- Sometimes a special final Sprint is performed.
	- This Sprint is often called: Closure Sprint
		- Its purpose is to prepare the product for release.
- What Does This Final Sprint Do?
	- Fix Bugs: Any remaining bugs are fixed.
- Complete Documentation
	- Documents and manuals are finalized.
- Productize the Code
	- The product is prepared for production release.
- Final Testing
	- Final verification and quality checks are completed.
	
- What Does NOT Happen?
	- No new functionality is added.
		- The final Sprint is for finishing and releasing the product, not for adding features.
-  What Happens to Remaining Requirements?
	- If some Product Backlog items are not completed:
	- They are moved to:
		- Next Release: instead of being implemented in the final Sprint.

### شوية اسئلة من الي قلبك يحبها
 - Velocity is:
	 - A. Number of developers
	 - B. ==Amount of work completed in a Sprint==
	 - C. Sprint duration
	 - D. Number of meeting
	 
- Velocity is commonly measured using:
	- A. Dollars
	- B. Hours worked
	- C. ==Story Points==
	- D. Bugs
	
- Velocity helps the team:
	- A. Hire developers
	- B. ==Decide how many Product Backlog items to include in a Sprint==
	- C. Create documentation
	- D. Deploy software
	
- As estimation accuracy improves over time, Scrum calls this:
	- A. Refactoring
	- B. Scaling
	- C. ==Acceleration==
	- D. Optimization
	
- Velocity may increase because:
	- A. Team collaboration improves
	- B. Estimation becomes more accurate
	- C. Team gains experience
	- ==D. All of the above==
	
- The final Sprint typically:
	- A. Adds new features
	- B. Removes Product Backlog
	- C. ==Prepares the product for release==
	- D. Starts a new project
	
- During the final Sprint:
	- A. New functionality is implemented
	- ==B. Bugs are fixed==
	- C. New Product Backlog items are added
	- D. Sprint Planning is skipped
	
- Which statement is TRUE?
	- A. Final Sprint adds new features
	- ==B. Final Sprint fixes bugs and completes documentation==
	- C. Velocity means working hours
	- D. Product Backlog disappears after Sprint 1
	
- Unfinished Product Backlog items are:
	- A. Deleted
	- B. Added to Done
	- ==C. Transferred to the next release==
	- D. Ignored

