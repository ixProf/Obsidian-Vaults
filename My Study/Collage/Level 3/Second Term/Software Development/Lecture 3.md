# 1. Agile Development Methodologies

Agile methodologies appeared as an alternative to **heavyweight plan-driven models**.

## Why Agile?

Traditional models focus heavily on:

- Documentation
- Processes
- Planning
- Controls

Agile focuses on:

- Working software
- Fast delivery
- Customer collaboration
- Responding to change

### Main Characteristics

Agile is:

- Lightweight
- Requires less documentation
- Requires fewer process controls
- Suitable for small and medium-sized projects
- Suitable for small development teams
- Adapts quickly to changing requirements
- Delivers software faster than traditional models
    

### Core Agile Philosophy

The main goal of software development is:

> ==Deliver Working Software==

Therefore:

- Developers should spend most of their time writing code.
- Less time should be spent creating documents.
    

---

# Characteristics of Lightweight Methodologies

Agile methodologies emphasize:

1. Test Before Code:
	- Developers write tests first.
2. Frequent Releases
	- Software is released continuously.
3. Customer Involvement
	- Customers actively participate during development.
4. Common Code Ownership
	- Any developer can modify any code when needed.
5. Refactoring
	- Code is continuously improved and simplified.

---

# Common Myths About Agile

- Agile only works for very small projects. (False)
	- Reality
		- It has been successfully used in:
			- Small projects
			- Medium-sized projects
    
- Agile requires no discipline.
	- Reality
		- Agile still requires strong discipline, especially during:
			- Requirement definition
			- Iteration planning
    
---

# Examples of Agile Methodologies

- XP (Extreme Programming)
- Scrum
- Kanban
    

---

# 2. Extreme Programming (XP)

XP is:

- Lightweight
- Efficient
- Low-risk
- Flexible
- Predictable
- Scientific
- Fun
    

XP aims to ==reduce software development risks== while delivering ==high-quality software rapidly==.

---
# XP Fundamental Ideas (4 Ideas)

1. Heavy Customer Involvement
	- Customer participation is mandatory.
	- Customer Responsibilities
		- Works as part of the team
		- Is ==present on-site==
		- Helps define iteration contents
		- Creates ==acceptance tests==
		- Evaluates releases
		
	- Benefit
		- Immediate clarification of ==requirements and faster feedback.==
		
2. Test-Driven Development (TDD)
	- Process
		- Write test first
	    -  Write code
	    -  Run tests
	    
    - If all tests pass: Feature is complete ✅
    - Benefits
		- Clear success criteria
		- Fewer bugs
		- Better design
    
3. Pair Programming
	- All code is written by two developers together.
	- **Roles** ==جه عليه سؤال فالميد==
		- Driver
			- Writes code
		- Navigator
			- Reviews code
		    - Finds mistakes
		    - Suggests improvements
		    - Thinks about architecture
		    
	- Role Switching
		- Partners switch frequently:
			- Every ~30 minutes
			- Or whenever needed
			
	- Advantages
		- Although pair programming may produce fewer lines of code per hour::
			- Better quality
			- Fewer defects
			- Better design
			- Better knowledge sharing
			
	- Refactoring Opportunity
		- Pair programming naturally encourages: Refactoring
		- Which means:
			- Simplifying code
			- Improving maintainability
			- Keeping requirements satisfied
    
4. Short Iterations & Frequent Releases
	- Release Cycle
	- Typically:
		- Few months per release
    - Each release contains:
	    - Iterations of ==4–6 weeks==
	    
	- Benefits
		- Fast customer feedback
		- Early discovery of problems
		- Early validation of requirements
	    
	- Continuous Integration
		- Whenever a feature is completed:
			1. Run unit tests
			2. Integrate feature
			3. Build system
			4. Run all tests again
			If something breaks:  Fix immediately
		
	- Result
		- Integrations may happen several times daily.
	- Benefits:
		- Daily project status visibility
		- Faster bug detection
		- Constant working software
    

---

# XP and Risk Management

XP considers risk the biggest software problem.


## Forms of Risk

- Schedule delays
- Project cancellation
- High defect rates
- Misunderstanding requirements
- ==Unwanted features== "حسبي الله"
- Employee turnover
    

---

## XP Solution

Control the four development variables:

1. Cost
	- Money spent
2. Time
	- Schedule
3. Scope
	- Features included
4. Quality
	- Software quality

The most important variable:

> Scope

Because controlling scope ==reduces project risk significantly==.

---
# XP Four Basic Activities

These activities form the foundation of XP.
1. Coding
	- The most important activity.
	- Agile View
		- Code is:
			- The primary deliverable
			- The most important artifact
	    - ==Good code== can also ==act as documentation==.
	
2. Testing
	- XP heavily depends on testing.
	-  Rule
		- Write tests before code.
	- Feature Completion Rule
		- A feature is complete only when:✅ All tests pass
	- Automated Testing
		- All tests ==should run automatically== whenever code changes are integrated. (CI/CD)
	
3. Listening
	- Listening is essential.
		- Two knowledge types exist:
			- Domain Knowledge
				- Knowledge of:
					- Business
					- Industry
					- Requirements
				- Usually owned by: ==Customer==
			- Technical Knowledge
				- Knowledge of:
					- Programming
					- Tools
					- Technologies
				- Usually owned by: Developers
		- Why Listening Matters
			- Customers know business.
			- Developers know technology.
			- Both must communicate continuously.
	
4. Designing
	- Design organizes system logic.
	- Good design:
		- Reduces coupling
		- Simplifies maintenance
		- Makes changes easier
	- Goals
		- One responsibility in one place
		- Easy modification
		- Easy extension
    

---
# XP Four Values

These values make XP work.

1. Communication
	- Knowledge must be shared across the team.
	- Supported By
		- Pair programming
		- Collective ownership
		- Small teams
    - Result: Everyone understands the system.
    
2. Simplicity
	- Do the simplest thing that works today.
	- Philosophy
		- Better to:
			- Build simple now
			- Improve later
		- Than:
			- Build unnecessary complexity
    - Refactoring
	    - Developers are encouraged to simplify code continuously.
	
3. Feedback
	- XP relies on continuous feedback.
	- Sources
		- Developers: Through unit tests
		- Customers: Through acceptance tests
	- Benefit
		- Immediate awareness of problems.
	
4. Courage
	- Developers must be brave enough to:
		- Change design
		- Rewrite code
		- Remove bad solutions
		- Throw away failed code
    

---
# XP 15 Principles

1. Rapid Feedback
	- Get feedback quickly.
	- Process:
		- Feedback → Understand → Improve
	
2. Assume Simplicity
	- Always choose the simplest solution.
	- Use refactoring continuously.
	
3. Incremental Change
	- Integrate code frequently.
	- Usually:
		- Daily
		- Whenever a task finishes
    - Benefits:
		- Early error detection
		- Constant progress visibility
    
4. Quality Work
	- Aim for:
		- Defect-Free Code
	- Supported by:
		- Pair programming
		- TDD
    
5. Embrace Change
	- Change is inevitable.
	- XP welcomes change rather than resisting it.
	
6. Teach Learning
	- Understand practices rather than blindly following rules.
	- Focus on:
		- Why testing matters
		- Why refactoring matters
		- Why standards matter
    
7. Small Initial Investment
	- Start with:
		- Limited budget
		- Limited resources
	- Benefits:
		- Simplicity
		- Less waste
		- Less complexity
    
8. Work with People's Instincts
	- People naturally like:
		- Winning
		- Teamwork
		- Trust
		- Seeing success
	- XP builds around these instincts.
	
9. Open Honest Communication
	- Encourage:
		- Positive feedback
		- Negative feedback
		- Constructive criticism
	- Goal:
		- Improve code quality.
	
10. Travel Light
	- ==Avoid unnecessary==:
		- Code
		- Design
		- Documents
		- Complexity
	- Keep only valuable artifacts.
	![[Pasted image 20260614113043.png]]
- 11. Concrete Experiments
	- Don't rely on assumptions.
	- Use:
		- Spike: A quick proof-of-concept implementation.
	- Purpose:
		- Test ideas before investing heavily.
	
12. Accepted Responsibility
	- The entire team owns the project.
	- Characteristics
		- Self-organizing team
		- Tasks are chosen, not assigned
		- Shared responsibility
	- Possible roles:
		- Coach
		- Project Manager (administrative)
    
13. Play to Win
	- ==Reduce stress.==
	- ==Avoid== constant deadline ==pressure==.
	- Benefits:
		- Better focus
		- Better productivity
		- Better code quality
    
14. Local Adaptation
	- XP can be customized according to project needs.
	- Changes are ==approved by team consensus==.
	
15. Honest Measurement
	- Measure real progress using:
		- Working software
		- Customer satisfaction
		- Productivity
		- Defect counts
		- Software quality
	- Purpose:
		- Better decisions
		- Continuous improvement
		- Accurate tracking
    

---
# XP 12 Practices

1. Small Releases
	- Release quickly and frequently.
	- Recommended Duration
		- 1–2 months
    - Avoid:
	    - 6–12 month releases
	- Benefits:
		- Easier estimation
		- Faster feedback
    
2. On-Site Customer
	- Customer:
		- Works with team
		- Writes functional tests
		- Executes tests
		- Clarifies requirements
		
	- Benefit: ==Immediate feedback.==
	
3. Collective Ownership
	- Everyone owns all code.
	- Any developer can:
		- Modify any file
		- Fix any issue
    - Benefit: Knowledge ==spread across team==.
    
4. Simple Design
	- Design should:
		1. Pass all unit tests
		2. Contain no duplicated code
		3. Express story intent clearly
		4. Use minimum necessary classes and methods
	
5. Testing
	- Developers
		- Write unit tests
	- Customers
		- Write functional tests
	- Rule
		- No test = No feature
		- All tests ==must pass== before integration.
	
6. ==Refactoring==
	- Improve structure without changing behavior.
	- Goals:
		- Remove redundancy
		- Simplify code
		- Improve readability
		- Improve maintainability
		- Improve flexibility
	- Relationship:
		- ==Enabled by Collective Ownership==
		- ==Required by Simple Design==
	
7. Pair Programming
	- Two programmers work on one machine.
	- Benefits:
		- Knowledge sharing
		- Better quality
		- Collective ownership support
	- Beer Truck Problem
		- If the only expert leaves unexpectedly:
			- Project suffers.
		- Pair programming prevents this.
	
8. Coding Standards
	- Team follows common coding guidelines.
	- Benefits:
		- Easier reading
		- Easier maintenance
		- Easier refactoring
    
9. Continuous Integration
	- Integrate code whenever a task finishes.
	- May happen:
		- Multiple times per day
	- Benefit:
		- Problems are isolated and detected quickly.
	
10. 40-Hour Week
	- XP discourages overtime.
	-  Why?
		- Working too many hours causes:
			- Fatigue
			- More bugs
			- Lower productivity
    - Balanced work improves:
		- Focus
		- Productivity
	    - Quality
    
11. Planning Game
	- Customer + Developers decide:
		- Stories
		- Priorities
		- Release contents
	- Responsibilities
		- Customer
			- Defines: Business priorities
	    - Developers
		    - Define:
			    - Tasks
				- Estimates
    
12. Metaphor
	- A simple shared story describing how the system works.
	- Purpose
		- Create a common language between:
			- Customer
			- Developers
	- Benefits
		- Easier communication 
		- Easier understanding
		- Better naming of classes and methods
    

---