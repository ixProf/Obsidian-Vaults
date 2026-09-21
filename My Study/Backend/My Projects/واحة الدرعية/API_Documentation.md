

---

# 🔐 Authentication

Protected endpoints require JWT Bearer Token.

Authorization: Bearer YOUR_TOKEN_HERE

Flow

Init Owner → Login → Copy Token → Use Token


---

👥 Roles

Owner:
- Manage Users
- View Audit Logs
- View Finance & Reports
- Manage Capital

Admin:
- Manage Bookings
- Manage Expenses
- View limited finance data


---

🔑 Auth APIs

Login

POST /auth/login

Request

{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}

Response

{
  "token": "jwt_token_here",
  "expiresAt": "2026-05-01T12:00:00Z",
  "userId": 1,
  "fullName": "Admin User",
  "email": "admin@gmail.com",
  "role": "Admin"
}


---

Forgot Password

POST /auth/forgot-password

Rules

- Sends reset code to email
- Expires after 10 minutes
- Stored as hash
- Rate limited


---

Reset Password

POST /auth/reset-password


---

👤 Users APIs (Owner Only)

Init Owner (First time only)

POST /users/init-owner

⚠️ Used once only


---

Get All Users

GET /users


---

Create User (Admin)

POST /users


---

Update User

PUT /users/{id}


---

Toggle Status

PATCH /users/{id}/toggle-status


---

Delete User

DELETE /users/{id}


---

📅 Bookings APIs (Owner + Admin)

Get All Bookings

GET /bookings


---

Filter Bookings

GET /bookings/filter?from=2026-05-01&to=2026-05-10&status=Booked


---

Search Bookings

GET /bookings/search?keyword=mahmoud


---

Create Booking

POST /bookings

Rules

- No duplicate date
- PaidAmount ≤ TotalPrice
- Remaining calculated automatically


---

Update Booking

PUT /bookings/{id}


---

Delete Booking

DELETE /bookings/{id}


---

Booked Dates

GET /bookings/booked-dates


---

💰 Expenses APIs (Owner + Admin)

Get All

GET /expenses


---

Filter Expenses

GET /expenses/filter?keyword=food&category=Maintenance&minAmount=100&maxAmount=500


---

Pagination

GET /expenses/paged?pageNumber=1&pageSize=10


---

Create Expense

POST /expenses


---

Update

PUT /expenses/{id}


---

Delete

DELETE /expenses/{id}


---

Totals

GET /expenses/total
GET /expenses/total-by-month?month=5&year=2026


---

Other

GET /expenses/recent
GET /expenses/top
GET /expenses/categories
GET /expenses/by-user/{userId}


---

🏦 Capital APIs (Owner Only)

Get All

GET /capitals


---

Create Capital

POST /capitals


---

Update

PUT /capitals/{id}


---

Delete

DELETE /capitals/{id}


---

Get Total Capital

GET /capitals/total


---

Latest Capital

GET /capitals/latest


---

📊 Finance APIs (Owner Only)

Overall Summary

GET /finance/summary

Includes

- Total Capital
- Total Revenue
- Total Expenses
- Final Balance
- Profit/Loss


---

Monthly Summary

GET /finance/summary-by-month?month=5&year=2026


---

📄 Monthly Reports APIs (Owner Only)

Generate Report

POST /monthly-reports/generate?month=5&year=2026


---

Get All Reports

GET /monthly-reports


---

Get Report By Id

GET /monthly-reports/{id}


---

Get Summary

GET /monthly-reports/summary?month=5&year=2026


---

Delete Report

DELETE /monthly-reports/{id}


---

📊 Business Logic

Revenue

Revenue = Sum of PaidAmount from Bookings


---

Capital Flow

UpdatedCapital = Capital + Revenue
FinalBalance = UpdatedCapital - Expenses


---

Profit

NetProfit = Revenue - Expenses


---

Booking

RemainingAmount = TotalPrice - PaidAmount


---

❌ Errors

400

{ "message": "This date is already booked" }


---

401

Unauthorized


---

404

{ "message": "Not found" }


---

📌 Status Codes

200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Server Error


---

🔥 كدا انت عملت

✔ Full Backend System
✔ Clean Architecture
✔ Role-based Authorization
✔ Financial System
✔ Reports + PDF
✔ Filtering + Pagination
✔ Authentication System


---

لو عايز أعملك:

🔥 Postman Collection
🔥 Swagger Pro Documentation
🔥 Frontend Integration Plan
🔥 ERD Diagram احترافي

قولّي وهنطلع البروجيكت Level تاني خالص 😎