---
title: "ERD (Lectures)"
aliases: []
type: source
status: active
domain: database-systems
tags: [source, database-systems, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
# **(ERD)**

## **🔹 Introduction to ERD**

- An **Entity-Relationship Diagram (ERD)** is a ==**graphical representation**== of a database structure. 📊
- It **defines entities, their attributes, and relationships** between them.
- ERDs help in the **conceptual design** of databases before implementation in a relational model. 🏗️
- The primary components of an ERD are:
    - **Entities** (represented as ==rectangles==) 🟥
    - **Attributes** (represented as ==ovals==) 🟠
    - **Relationships** (represented as ==diamonds==) ♦️
    - **Cardinalities** (depicted with lines and symbols) 🔀

---

## **🔹 Types of Keys in Databases**

### **1️⃣ Primary Key (PK) 🔑**

- A unique identifier for each record in a table.
- **Cannot ==contain duplicate values== or NULL values.**
- Example:
    - In a **Student** table, `Student_ID` is a primary key because each student has a unique ID.

### **2️⃣ Foreign Key (FK) 🔗**

- A field in one table that ==**references** the primary key in another table.==
- Used to **establish relationships between tables**.
- Example:
    - In an **Enrollment** table, `Student_ID` is a **foreign key** that links to the `Student_ID` in the **Student** table.

### **3️⃣ Candidate Key 🎯**

- Any column that could be used as a **primary key**.
- A table may have ==multiple candidate keys==, but only one is chosen as the **primary key**.
- Example:
    - In an **Employee** table, `Emp_ID`, `Email`, and `Phone` could all be **candidate keys**.

### **4️⃣ Composite Key 🏗️**

- A key composed of **multiple attributes** that uniquely identify a record.
- Example:
    - In a **Work_Hours** table, a combination of `(Emp_ID, Proj_ID)` serves as a **composite key** since an employee can work on multiple projects.

### **5️⃣ Super Key 💡**

- A **set of attributes** that uniquely identify a row.
- Any **super key** containing unnecessary attributes is **not minimal** (hence, not a primary key).

---

## **🔹 Types of Relationships in ERD**

### **1️⃣ Binary Relationship ⚡**

- A relationship ==between **two entities**==, such as **Student - Course**.
- Represented by a **diamond** connecting the two entities.

### **2️⃣ N-ary Relationship 🔄**

- A relationship involving ==**more than two entities**==.
- Example: **(Employee - Project - Department)**

### **3️⃣ Unary ( Recursive ) Relationship 🔁**

- A relationship where an entity **relates to itself**.
- Example:
    - **"Employee supervises another Employee"** (One employee is the supervisor, another is the subordinate).
---

## 📘 Relationship Cardinality

**Relationship cardinality** defines how **many times an entity from one entity set can be associated** with entities from another set through a relationship.

It's crucial in **Entity-Relationship (ER) modeling** in database design.

---

## 🧩 Types of Cardinality:

### 1️⃣ **One-to-One (1:1)**

Each entity in **Entity Set A** is related to **only one** entity in **Entity Set B**, and vice versa.

#### Example:

- A **Person** has **one National ID**, and each National ID belongs to only one person.
    

```
Person (1) ←→ (1) NationalID
```

---

### 2️⃣ **One-to-Many (1:N)**

An entity in **Set A** can be related to **many entities** in **Set B**,  
but each entity in **Set B** is related to **only one** entity in **Set A**.

#### Example:

- A **Manager** supervises **many Employees**,  
    but each **Employee** has only **one Manager**.
    

```
Manager (1) ←→ (N) Employee
```

---

### 3️⃣ **Many-to-One (N:1)**

Each entity in **Set A** is related to **one entity** in **Set B**,  
but each entity in **Set B** can be related to **many entities** in **Set A**.

#### Example:

- An **Employee** belongs to **one Department**,  
    but a **Department** has **many Employees**.
    

```
Employee (N) ←→ (1) Department
```

---

### 4️⃣ **Many-to-Many (M:N)**

Entities in **both sets** can be associated with **many entities** in the other.

#### Example:

- A **Student** can enroll in **many Courses**,  
    and each **Course** can have **many Students**.
    

```
Student (M) ←→ (N) Course
```

---

## 💡 Notes:

- Cardinality plays a key role when converting an ER model to a **relational schema**.
    
- In **Many-to-Many** relationships, we usually need a **bridge table** (associative entity) to represent the relationship.
    

---

## 📝 Summary Table:

|Type|Example|Notation|
|---|---|---|
|One-to-One|Person ↔ NationalID|1 : 1|
|One-to-Many|Manager ↔ Employees|1 : N|
|Many-to-One|Employee ↔ Department|N : 1|
|Many-to-Many|Student ↔ Course|M : N|

---

## **🔹 Relationship Constraints**

1. **Total Participation (✅)**
    
    - Every entity in the set ==**must** participate== in the relationship.
    - Example: Every **employee** must belong to a **department**.
2. **Partial Participation (⚠️)**
    
    - Some entities ==**may or may not** participate== in the relationship.
    - Example: Some **students** may not be **enrolled** in any course.

---

## **🔹 ERD Notations**

- **Crow’s Foot Notation 🦶**: Used to visually represent **relationships** and **cardinalities** between tables.
![[Pasted image 20250314212941.png]]
- **Chen Notation 📝**: More detailed representation, including attributes in **ellipses**.
![[Pasted image 20250314213034.png]]

الخطين هنا = Mandatory 
الخط هنا = Optional
