---
title: "Normalization"
aliases: []
type: source
status: active
domain: database-systems
tags: [source, database-systems]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


# 1NF






---

# 2NF: Removes Partial Dependency-all non-key attributes must depend on the entire primary key

- Applies to: Tables with composite primary key
- Goal: Ensure every attribute depends on the full key, not part of it

## Ex:

### CourseEnrollment Table
(StudentId, CourseId, Grade, StudentName)

After 2NF:

- (StudentId, StudentName)
- (StudentId, CourseId, Grade)

---

# 3NF

Eliminates Indirect Dependencies

لما يكون في حاجة مش بتعتمد على حاجه معينة بشكل دايركت كدا 


---

