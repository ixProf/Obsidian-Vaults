تمام، قسمه في Notion كده:

# Project Tasks

## 1. Project Setup

اعمل ASP.NET Core Web API project، ظبط SQL Server connection string، نزّل EF Core packages، وافتح Swagger للتجربة.

**ذاكر:** Web API basics، Swagger، appsettings، Dependency Injection.

---

## 2. Database Design

اعمل الـ Entities الأساسية:

```txt
User
Booking
Expense
Capital
MonthlyReport
```

وممكن تضيف:

```txt
BookingPackage
AuditLog
```

**ذاكر:** EF Core، Relationships، Migrations، Data Annotations، Fluent API.

---
### User's Property

```
Users
- Id
- FullName
- UserName
- PasswordHash
- Role
- IsActive
- CreatedAt
```



---
## 3. Authentication & Authorization

اعمل Login للأدمن/الأونر، و JWT Token، و Role-based authorization.

**Roles:**

```txt
Owner
Admin
```

**ذاكر:** JWT، Claims، Authorization Policies، Password Hashing.

---

## 4. Users Management

الأونر يقدر يضيف Admin أو Owner تاني، ويعمل تفعيل/تعطيل للحسابات.

**Endpoints:**

```txt
GET /api/users
POST /api/users
PUT /api/users/{id}
PATCH /api/users/{id}/toggle-status
DELETE /api/users/{id}
```

**ذاكر:** CRUD API، DTOs، Validation.

---

## 5. Bookings CRUD

الأدمن يضيف حجز، يعدله، يحذفه، ويعرض كل الحجوزات.

**Endpoints:**

```txt
GET /api/bookings
GET /api/bookings/{id}
POST /api/bookings
PUT /api/bookings/{id}
DELETE /api/bookings/{id}
```

المهم هنا:

```txt
RemainingAmount = TotalPrice - PaidAmount
PaidAmount = Revenue
```

**ذاكر:** CRUD، DTO Mapping، ModelState Validation.

---

## 6. Prevent Double Booking

لو التاريخ أو المعاد محجوز، السيستم يرجع error.

لو الحجز باليوم فقط:

```txt
Cannot book the same date twice
```

لو بالوقت:

```txt
Prevent overlapping StartTime / EndTime
```

**ذاكر:** LINQ Any، DateTime، TimeOnly، Business Validation.

---

## 7. Booked Dates API

اعمل Endpoint يرجع الأيام المحجوزة علشان الفرونت يلونها أحمر.

```txt
GET /api/bookings/booked-dates
```

يرجع:

```json
[
  "2026-05-01",
  "2026-05-05"
]
```

**ذاكر:** API Response Shape، Date Formatting.

---

## 8. Expenses CRUD

الأدمن يضيف المصاريف والمخرجات.

**Endpoints:**

```txt
GET /api/expenses
POST /api/expenses
PUT /api/expenses/{id}
DELETE /api/expenses/{id}
```

**ذاكر:** CRUD، Filtering by date/month.

---

## 9. Capital Management

الأدمن أو الأونر يدخل رأس المال.

**Endpoints:**

```txt
GET /api/capital
POST /api/capital
PUT /api/capital/{id}
```

**ذاكر:** Financial calculations، decimal precision.

---

## 10. Financial Summary

اعمل Endpoint يحسب الملخص المالي:

```txt
TotalRevenue
TotalExpenses
RemainingBalances
NetProfitOrLoss
ProfitLossPercentage
```

Endpoint:

```txt
GET /api/finance/summary?month=5&year=2026
```

**ذاكر:** LINQ Sum، GroupBy، Query Parameters.

---

## 11. Monthly PDF Report

اعمل Report شهري PDF فيه الحجوزات، الإيرادات، المصاريف، الربح والخسارة.

Endpoint:

```txt
GET /api/reports/monthly?month=5&year=2026
```

**ذاكر:** PDF generation في .NET زي QuestPDF أو iTextSharp، FileResult.

---

## 12. Audit Logging

سجل مين عمل إيه:

```txt
Created booking
Updated expense
Deleted booking
Generated report
```

**ذاكر:** Middleware أو Service-based logging، CreatedByUserId.

---

## 13. Error Handling

اعمل شكل موحد للأخطاء بدل كل مرة رسالة مختلفة.

مثال:

```json
{
  "message": "This date is already booked",
  "statusCode": 400
}
```

**ذاكر:** Global Exception Middleware، Status Codes.

---

## 14. Filtering & Search

اعمل فلترة للحجوزات والمصاريف حسب الشهر والتاريخ والحالة واسم العميل.

```txt
GET /api/bookings?month=5&year=2026&status=Booked
```

**ذاكر:** IQueryable، Dynamic filtering، Pagination.

---

## 15. Testing With Swagger/Postman

جرب كل Endpoint وتأكد الحسابات صح.

**ذاكر:** HTTP Methods، Status Codes، Request Body، Bearer Token.

---

# Order تمشي عليه

```txt
1. Setup
2. Entities + DbContext
3. Migrations
4. Bookings CRUD
5. Double Booking Validation
6. Expenses CRUD
7. Capital
8. Financial Summary
9. Auth + Roles
10. Users Management
11. PDF Reports
12. Audit Logs
13. Error Handling
14. Filtering
15. Final Testing
```

# أهم حاجات تذاكرها وانت شغال

```txt
ASP.NET Core Web API
RESTful API
Entity Framework Core
SQL Server
DTOs
Repository/Service Pattern
JWT Authentication
Role-based Authorization
LINQ
DateTime / TimeOnly
Decimal Precision
Global Exception Handling
PDF Generation
Swagger / Postman
```

ابدأ بـ **Bookings CRUD** الأول، لأنه قلب السيستم كله.