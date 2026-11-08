---
title: "University Attendance System - Project Documentation"
aliases: []
type: project
status: active
domain: software-engineering
tags: [project, software-engineering, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

## University Attendance & Coursework Management System

---

# 1. Overview

The **University Attendance & Coursework Management System** is a backend-driven web application designed to manage academic workflows including:

- Student attendance tracking (lectures and sections)
- Quiz and coursework grading
- Course and section assignment
- Administrative data management
- Real-time notifications and updates


The system is built with a layered architecture that separates responsibilities across controllers, services, and data access layers.

---

# 2. Architecture

The application follows a **clean layered architecture**:

```text
Controller → Service → DbContext → Database
```

### Controller Layer

- Handles HTTP requests and responses
- Delegates all business logic to services
- Ensures proper routing and authorization

### Service Layer

- Contains all business logic
- Validates inputs and enforces rules
- Interacts with the database via DbContext
    

### Data Layer (DbContext)

- Manages database access using Entity Framework Core
    
- Defines entity sets and relationships
    

---

# 3. Technologies

The backend is implemented using the following technologies:

- ASP.NET Core MVC
    
- Entity Framework Core
    
- SQL Server
    
- Cookie-Based Authentication
    
- Role-Based Authorization
    
- SignalR (Real-Time Communication)
    

---

# 4. Project Structure

```text
Controllers/
Services/
    Interfaces/
    Implementation/
Models/
Models/Data/
ViewModels/
Hubs/
Data/Seed/
wwwroot/js/
```

---

# 5. Business Model

## User Roles

The system supports four primary roles:

- **Admin** – Full system control (CRUD operations)
    
- **Doctor** – Manages courses and lecture attendance
    
- **Teaching Assistant (TA)** – Manages sections and quizzes
    
- **Student** – Views data and submits attendance
    

---

## Academic Structure

```text
Department
    ↓
DepartmentSection
    ↓
CourseSection
    ↓
Enrollment
    ↓
Student
```

### Key Concepts

- Departments: AI, CS, SE, IS
    
- Each department contains multiple sections
    
- Courses may be shared across departments
    
- CourseSections represent teaching units (course + section + TA)
    

---

# 6. Entities

### User

Represents all system users.

- Id, UserName, Password, Role
    

### Student

Represents a student profile.

- UniversityId, Level, DepartmentId, DepartmentSectionId
    

### Course

Represents an academic course.

- Code, Name, DoctorId
    

### CourseSection

Links course, department section, and TA.

### Enrollment

Links students to course sections.

### AttendanceSession

Represents a lecture or section session.

### AttendanceRecord

Tracks attendance status per student.

### Quiz

Represents a quiz tied to a course section.

### QuizGrade

Stores student quiz results.

### CoursePolicy

Defines grading rules.

### Notification

Stores user notifications.

---

# 7. Database Context

The `AppDbContext` defines all entity sets:

```csharp
DbSet<User>
DbSet<Student>
DbSet<Course>
DbSet<CourseSection>
DbSet<Enrollment>
DbSet<AttendanceSession>
DbSet<AttendanceRecord>
DbSet<Quiz>
DbSet<QuizGrade>
DbSet<CoursePolicy>
DbSet<Notification>
```

Relationships are configured using Entity Framework Core.

---

# 8. Services Layer

The system contains **11 services**, each responsible for a specific domain:

|Service|Responsibility|
|---|---|
|AccountService|Authentication|
|AdminService|CRUD operations|
|StudentService|Student data|
|AttendanceService|Attendance logic|
|QuizService|Quiz management|
|ReportService|Reporting|
|NotificationService|Notifications|
|GradeCalculationService|Grading logic|
|CourseService|Course management|
|SectionService|Section management|
|DashboardService|Dashboard data|

---

# 9. Controllers

The backend includes **10 controllers**:

|Controller|Purpose|
|---|---|
|AccountController|Authentication|
|AdminController|Administrative CRUD|
|StudentController|Student dashboard|
|TAController|TA section management|
|DoctorController|Course management|
|AttendanceController|Attendance operations|
|QuizController|Quiz operations|
|ReportsController|Reporting|
|NotificationsController|Notifications|
|CourseController|Course configuration|

---

# 10. Routing

Example routes:

|Route|Method|Role|
|---|---|---|
|/Student/Dashboard|GET|Student|
|/TA/Sections|GET|TA|
|/Doctor/Courses|GET|Doctor|
|/Attendance/SubmitCode|POST|Student|
|/Quiz/SaveMarks|POST|TA|
|/Reports/Course/{id}|GET|Doctor|
|/Notifications|GET|All|

---

# 11. Authentication & Authorization

### Authentication

- Cookie-based authentication


### Authorization

- Role-based access control using:


```csharp
[Authorize(Roles = "...")]
```

---

# 12. Attendance Logic

- TAs record section attendance
- Doctors record lecture attendance
- Students submit attendance via code or QR
- Duplicate attendance is prevented
- Only enrolled students can submit attendance
- Sessions can be locked after submission
    

---

# 13. Quiz Logic

- Quizzes are not taken on the platform
- TAs record student marks manually
- Missing quiz results default to zero
- Grades cannot exceed maximum marks
- Best quizzes are selected based on policy
    

---

# 14. Grade Calculation

The system calculates:

- Attendance grades
- Quiz grades
- Best N quiz selection
- Total coursework grade
- Absence limit validation
    

---

# 15. Admin Module

Admin capabilities include:

- User management
- Student management
- Doctor and TA management
- Course and section management
    

Validation includes:

- Duplicate prevention
- Referential integrity checks
    

---

# 16. Database Seeding

The system uses a seeding mechanism:

- Source: JSON files
    
- Seeder: `DbSeeder`
    
- Order:
    
    1. Departments
    2. Sections
    3. Users
    4. Students
    5. Courses
    6. Enrollments
    7. Policies
        

---

# 17. Real-Time Communication (SignalR)

## Hubs

- `NotificationHub`
- `DashboardHub`
    

## Endpoints

```text
/notificationHub
/dashboardHub
```

## Groups

```text
Student-{id}
Section-{id}
TA-{id}
Doctor-{id}
```

Used for:

- Notifications
- Real-time dashboard updates
    

---

# 18. Validation Checklist

- Build succeeds without errors
- Services are registered
- DbContext is configured
- Authentication is enabled
- Authorization is applied
- Controllers use services only
- Seeder runs successfully
- SignalR hubs are mapped
    

---

# 19. Current Limitations

- Frontend views are not fully implemented
- Some UI pages are placeholders
- Passwords are stored in plain text (development only)
- No API layer (MVC only)
    

---

# 20. Future Improvements

- Implement password hashing
- Introduce JWT authentication
- Add REST API layer
- Implement unit and integration testing
- Add logging and monitoring
- Improve SignalR security
- Enable data export (Excel/PDF)
    

---
