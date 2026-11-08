---
title: "Lecture 1 Quiz"
aliases: []
type: source
status: active
domain: ai-machine-learning
tags: [source, ai-machine-learning, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
## Lecture 1 – Artificial Intelligence

### Multiple Choice (1–15)

**1.** If an AI system is designed to make optimal decisions given its percept history, but it does not attempt to mimic human reasoning errors, which category of AI does it belong to?
- A) Act humanly
- B) Think humanly
- C) Act rationally
- D) Think rationally

**Answer: C**

---

**2.** A self-driving car must decide whether to swerve and risk hitting a pole or stay and risk hitting a pedestrian. This type of decision-making directly relates to which component of the PEAS description?
- A) Environment
- B) Actuators
- C) Performance measure
- D) Sensors

**Answer: C**

---

**3.** Which of the following scenarios would be **impossible** for a purely lookup-table based agent?
- A) Cleaning a room it has seen before
- B) Responding correctly to a novel percept sequence not present in the table
- C) Moving left when the table says "Right"
- D) Sucking a dirty square

**Answer: B**

---

**4.** An agent's percept sequence includes all past sensor inputs. If the agent function is f: P* → A, what does P* represent?
- A) A single percept
- B) The set of all possible actions
- C) The set of all possible percept sequences of any length (including empty)
- D) The current environment state

**Answer: C**

---

**5.** Consider a vacuum agent that only knows its current location but not whether the other location is dirty. Which statement is true?
- A) The agent is omniscient
- B) The agent's percepts are incomplete relative to the environment
- C) The agent's actuators are broken
- D) The agent uses an informed search strategy

**Answer: B**

---

**6.** In the Total Turing Test, the interrogator can pass physical objects through a hatch. This addition tests the AI's ability in:
- A) Natural language processing and reasoning only
- B) Computer vision and robotics
- C) Machine learning only
- D) Knowledge representation only

**Answer: B**

---

**7.** Which statement best describes the relationship between agent function and agent program?
- A) They are identical concepts
- B) The agent function is an abstract mathematical mapping; the program implements it on architecture
- C) The agent program defines the environment; the function defines actions
- D) The agent function is hardware; the program is software

**Answer: B**

---

**8.** An agent that always chooses actions that maximize its performance measure based on its percept sequence is called:
- A) Omniscient
- B) Rational
- C) Lookup-based
- D) Cognitive

**Answer: B**

---

**9.** Which of the following is a valid criticism of the Turing test as a definition of intelligence?
- A) It requires too much computing power
- B) It tests human-like behavior, not necessarily rational or optimal behavior
- C) It cannot be performed with modern computers
- D) It does not require language understanding

**Answer: B**

---

**10.** A robotic agent in a factory has sensors that occasionally fail, giving no percept. According to the lecture, can such an agent still be rational?
- A) No, rationality requires perfect information
- B) Yes, rationality depends on expected outcomes given available percepts
- C) No, the agent must be omniscient
- D) Yes, but only if it uses a lookup table

**Answer: B**

---

**11.** Which of the following is **required** for an agent to pass the **basic** Turing test (not Total)?
- A) Ability to manipulate objects
- B) Computer vision
- C) Knowledge representation
- D) Robotics

**Answer: C**

---

**12.** The cognitive modeling approach to AI is most closely associated with which scientific field?
- A) Physics
- B) Psychology
- C) Mathematics
- D) Economics

**Answer: B**

---

**13.** In the vacuum world, suppose the agent's performance measure gives +10 for cleaning a dirty square, -1 for each move, and -100 for leaving any dirty square after 100 moves. This is an example of:
- A) Environment specification
- B) Actuator design
- C) Performance measure specification
- D) Sensor design

**Answer: C**

---

**14.** Why is omniscience impossible for a real agent?
- A) Because agents have limited memory
- B) Because the future outcomes of actions cannot be known with certainty in advance
- C) Because lookup tables are too large
- D) Because sensors are always perfect

**Answer: B**

---

**15.** An agent's architecture is defined as:
- The physical computing device that runs the agent program
- The set of possible actions
- The percept sequence history
- The performance measure

**Answer: A**

---

### True / False (16–22)

**16.** An agent that always performs the action that maximizes its performance measure based on its percept history is guaranteed to be omniscient.

**Answer: False** (Rational ≠ omniscient; omniscience requires knowing actual outcomes)

---

**17.** In the PEAS framework, the same environment can be used with different performance measures to define different tasks.

**Answer: True**

---

**18.** A software agent cannot have actuators because it has no physical body.

**Answer: False** (Actuators can be displaying on screen, writing files, sending network packets)

---

**19.** If an agent's lookup table contains an entry for every possible percept sequence, the agent will always act optimally.

**Answer: False** (The table entries must be correct; size alone doesn't guarantee optimality)

---

**20.** The main difference between the Turing test and the Total Turing test is the addition of vision and robotics requirements.

**Answer: True**

---

**21.** A rational agent must always choose the action that leads to the best possible outcome in reality, not just expected outcome.

**Answer: False** (Rationality is about expected outcome given available information)

---

**22.** Neural networks are primarily used in the "think rationally" approach to AI.

**Answer: False** (They are used in "think humanly" / cognitive modeling)

---

### Fill in the Blank (23–30)

**23.** The agent function maps from percept histories to actions, but the agent program implements this function on a specific physical -----------.

**Answer: architecture**

---

**24.** In the vacuum world, if the agent receives [A, Dirty] and then [A, Clean] after sucking, the second percept is part of the agent's -----------.

**Answer: percept sequence** (or percept history)

---

**25.** The cognitive modeling approach requires testable theories of the human mind, often combining AI with experimental techniques from -----------.

**Answer: psychology**

---

**26.** An agent that knows the actual outcome of its actions and acts accordingly is called -----------, but this is impossible in reality.

**Answer: omniscient**

---

**27.** To specify a task environment completely, the PEAS framework includes Performance measure, Environment, Actuators, and -----------.

**Answer: sensors**

---

**28.** The difference between uninformed and informed search strategies is that informed search uses problem-specific ----------- to find solutions more efficiently.

**Answer: knowledge** (or heuristics)

---

**29.** In the Total Turing test, the interrogator can pass physical objects to the computer through a hatch, requiring the computer to have ----------- and robotics capabilities.

**Answer: computer vision**

---

**30.** A software agent's actuators might include displaying information, writing files, or sending ----------- packets.

**Answer: network**

