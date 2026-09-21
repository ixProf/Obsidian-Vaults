### **Types of Relationships, Attributes, and Entities in the Smart Library System**

#### **1. Types of Relationships (Diamond Shapes)**

|Relationship|Entities Involved|Type (Cardinality)|
|---|---|---|
|**Supervises**|Staff → Level|1-to-1 (One staff supervises one level)|
|**Registers**|Staff → Visitor|1-to-Many (One staff can register multiple visitors)|
|**Borrows**|Visitor → Book (via Borrow_Record)|Many-to-Many (A visitor can borrow multiple books, and a book can be borrowed by multiple visitors)|
|**Written by**|Book → Writer|Many-to-Many (A book can have multiple writers, and a writer can have multiple books)|
|**Categorized under**|Book → Genre|1-to-Many (One book belongs to one genre, but a genre can have multiple books)|
|**Distributed by**|Book → Distributor|1-to-Many (One book is supplied by one distributor, but a distributor supplies many books)|
|**Stored in**|Book → Rack|1-to-Many (One book is stored in one rack, but a rack can hold multiple books)|
|**Placed on**|Rack → Level|1-to-Many (One rack is placed on one level, but a level contains multiple racks)|

---

#### **2. Types of Attributes (Ovals)**

| Attribute          | Type                                                     | Entity                              |
| ------------------ | -------------------------------------------------------- | ----------------------------------- |
| **Staff_ID**       | Primary Key                                              | Staff                               |
| **Full_Name**      | Composite (First_Name, Last_Name)                        | Staff, Visitor, Writer, Distributor |
| **Contact_Email**  | Simple                                                   | Staff                               |
| **Monthly_Salary** | Simple                                                   | Staff                               |
| **Birth_Date**     | Simple                                                   | Staff                               |
| **Incentive**      | Simple                                                   | Staff                               |
| **Home_Address**   | Composite (Street, City, Zip)                            | Staff                               |
| **Mobile_Number**  | Multivalued (Multiple contacts)                          | Staff, Visitor                      |
| **Team_Leader**    | Recursive Relationship (Reports to another staff member) | Staff                               |
| **National_ID**    | Primary Key                                              | Visitor                             |
| **Personal_Email** | Simple                                                   | Visitor                             |
| **Phone_Contacts** | Multivalued                                              | Visitor                             |
| **Book_Code**      | Primary Key                                              | Book                                |
| **Book_Title**     | Simple                                                   | Book                                |
| **Genre_ID**       | Foreign Key                                              | Book                                |
| **Distributor_ID** | Foreign Key                                              | Book                                |
| **Rack_Code**      | Foreign Key                                              | Book                                |
| **Writer_ID**      | Primary Key                                              | Writer                              |
| **Distributor_ID** | Primary Key                                              | Distributor                         |
| **Genre_Name**     | Simple                                                   | Genre                               |
| **Rack_Code**      | Primary Key                                              | Rack                                |
| **Level_ID**       | Foreign Key                                              | Rack                                |
| **Borrow_ID**      | Primary Key                                              | Borrow_Record                       |
| **Borrow_Date**    | Simple                                                   | Borrow_Record                       |
| **Return_Date**    | Simple                                                   | Borrow_Record                       |
| **Fee_Paid**       | Simple                                                   | Borrow_Record                       |

---

#### **3. Types of Entities (Rectangles)**

|Entity|Type|
|---|---|
|**Staff**|Strong Entity (Has a primary key: Staff_ID)|
|**Level**|Strong Entity (Has a primary key: Level_ID)|
|**Visitor**|Strong Entity (Has a primary key: National_ID)|
|**Book**|Strong Entity (Has a primary key: Book_Code)|
|**Writer**|Strong Entity (Has a primary key: Writer_ID)|
|**Distributor**|Strong Entity (Has a primary key: Distributor_ID)|
|**Genre**|Strong Entity (Has a primary key: Genre_ID)|
|**Rack**|Strong Entity (Has a primary key: Rack_Code)|
|**Borrow_Record**|Weak Entity (Depends on Staff and Visitor; Borrow_ID as primary key)|

---
### **1. Staff**

**Attributes:**

- **Staff_ID** _(Primary Key)_
- **Full_Name** (Composite: First_Name, Last_Name)
- **Contact_Email**
- **Monthly_Salary**
- **Birth_Date**
- **Incentive**
- **Home_Address** (Composite: Street, City, Zip)
- **Mobile_Number** _(Multivalued)_
- **Team_Leader** _(Recursive Relationship: Reports to another staff member)_

---

### **2. Level**

**Attributes:**

- **Level_ID** _(Primary Key)_
- **Total_Sections**
- **Supervisor_ID** _(Foreign Key: Staff_ID)_
- **Start_Date**

---

### **3. Visitor**

**Attributes:**

- **National_ID** _(Primary Key)_
- **Full_Name** (Composite: First_Name, Last_Name)
- **Personal_Email**
- **Phone_Contacts** _(Multivalued)_
- **Registered_By** _(Foreign Key: Staff_ID)_

---

### **4. Book**

**Attributes:**

- **Book_Code** _(Primary Key)_
- **Book_Title**
- **Genre_ID** _(Foreign Key: Genre_ID)_
- **Distributor_ID** _(Foreign Key: Distributor_ID)_
- **Rack_Code** _(Foreign Key: Rack_Code)_

---

### **5. Writer**

**Attributes:**

- **Writer_ID** _(Primary Key)_
- **Full_Name**

---

### **6. Distributor**

**Attributes:**

- **Distributor_ID** _(Primary Key)_
- **Full_Name**

---

### **7. Genre**

**Attributes:**

- **Genre_ID** _(Primary Key)_
- **Genre_Name**

---

### **8. Rack**

**Attributes:**

- **Rack_Code** _(Primary Key)_
- **Level_ID** _(Foreign Key: Level_ID)_

---

### **9. Borrow_Record** _(Weak Entity: Depends on Visitor & Staff)_

**Attributes:**

- **Borrow_ID** _(Primary Key)_
- **Staff_ID** _(Foreign Key: Staff_ID)_
- **Visitor_ID** _(Foreign Key: National_ID)_
- **Book_Code** _(Foreign Key: Book_Code)_
- **Borrow_Date**
- **Return_Date**
- **Fee_Paid**

---
