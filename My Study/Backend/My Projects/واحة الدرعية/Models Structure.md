

## 1. Users

للأدمنز والأونر.

```txt
Users
- Id
- FullName
- UserName
- PasswordHash
- Role
- IsActive
- CreatedAt
```

Role ممكن تكون:

```txt
Owner
Admin
```

---

## 2. Bookings

ده أهم جدول، كل حجز بيتسجل هنا.

```txt
Bookings
- Id
- CustomerName
- PhoneNumber
- BookingDate
- DayName
- BookingType
- TotalPrice
- PaidAmount
- RemainingAmount
- Status
- Notes
- CreatedByUserId
- CreatedAt
- UpdatedAt
```

`RemainingAmount` ممكن يتحسب كده:

```txt
RemainingAmount = TotalPrice - PaidAmount
```

---

## 3. Expenses

للمخرجات أو المصاريف.

```txt
Expenses
- Id
- Title
- Amount
- ExpenseDate
- Category
- Notes
- CreatedByUserId
- CreatedAt
```

Capital


---

## 4. Capital

لرأس المال اللي هيبدأ منه الحساب.

```txt
Capital
- Id
- Amount
- StartDate
- Notes
- CreatedByUserId
- CreatedAt
```

ممكن تخليه جدول واحد فيه آخر رأس مال متسجل، أو تسمح بكذا إدخال لو رأس المال بيتغير.

---

## 5. MonthlyReports

لو عايز تحفظ ملخص كل تقرير شهري اتولد.

```txt
MonthlyReports
- Id
- Month
- Year
- TotalRevenue
- TotalExpenses
- NetProfitOrLoss
- ProfitLossPercentage
- PdfFilePath
- GeneratedByUserId
- GeneratedAt
```

---

## Optional بس مفيد

لو عندك أنواع حجز ثابتة أو باقات:

```txt
BookingPackages
- Id
- Name
- DefaultPrice
- Description
- IsActive
```

بس بما إنك قلت هو هيكتب الباقة والسعر يدوي، ممكن تستغنى عنه دلوقتي.

---

ابدأ بـ 5 جداول أساسية:

```txt
Users
Bookings
Expenses
Capital
MonthlyReports
```

ودول كفاية جدًا لأول Version.