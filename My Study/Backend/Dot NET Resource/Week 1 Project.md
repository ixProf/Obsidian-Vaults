
### 📝 **Task Title:** Student Management System

### 📌 **Task Description:**

Design and implement a simple **Student Management System** that demonstrates the following programming concepts:

- **Struct**: to store student address information.
    
- **Enumeration**: to define fixed values for departments (e.g., IT, CS, IS, SE).
    
- **Classes and Objects**: to represent student entities and their behavior.
    
- **Constructor**: to initialize objects with default or specific values.
    
- **Destructor**: to handle cleanup when an object is destroyed (if supported).
    
- **Access Modifiers**: to control visibility of class members (e.g., public, private).
    
- **Encapsulation**: by using setters and getters to access and modify private fields.
    

### ✅ **Requirements:**

- Allow the user to **add**, **view**, and **delete** student records.
    
- Each student should have:
    
    - An ID
        
    - Name
        
    - Department (using Enum)
        
    - Grade
        
    - Address (as Struct)
        
- Use **arrays or collections** to store multiple student objects.
    
- Apply all the listed concepts in a practical and clear way.
---
## Sample Output :
```
--- Student Management Menu ---
1. Add Student
2. View Students
3. Delete Student
4. Exit
Enter your choice: 1

Enter ID: 101
Enter Name: Ahmed Hassan
Enter Grade: 88.5
Select Department (0=IT, 1=CS, 2=IS, 3=SE): 1
Enter Street: 15 El-Malek St
Enter City: Cairo
Enter Postal Code: 12345

Student added successfully.

--- Student Management Menu ---
1. Add Student
2. View Students
3. Delete Student
4. Exit
Enter your choice: 2

ID: 101
Name: Ahmed Hassan
Department: CS
Grade: 88.5
Address: 15 El-Malek St, Cairo, 12345

--- Student Management Menu ---
1. Add Student
2. View Students
3. Delete Student
4. Exit
Enter your choice: 3

Enter Student ID to delete: 101
Student deleted.

--- Student Management Menu ---
1. Add Student
2. View Students
3. Delete Student
4. Exit
Enter your choice: 0
Exiting program...
```


---