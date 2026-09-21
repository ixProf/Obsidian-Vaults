# Online Retail System

## 1. INSERT OPERATIONS

### 1.1 Insert New Customer

```sql
INSERT INTO Customers
(FullName, PhoneNumber, Email, ShippingAddress, RegistrationDate)
VALUES
('Mahmoud Sayed', '01030664607',
'mahmoudprofessor757@gmail.com',
'Asyut, Egypt', GETDATE());
```

---

### 1.2 Insert 3 Suppliers

```sql
INSERT INTO Suppliers (SupplierName)
VALUES
('Tech Supplier'),
('Modern Furniture'),
('Elite Trading');
```

---

### 1.3 Insert 2 Categories

```sql
INSERT INTO Categories (CategoryName)
VALUES
('Living Room'),
('Bedroom');
```

---

### 1.4 Insert Product (Name + UnitPrice Only)

```sql
INSERT INTO Products (Name, UnitPrice)
VALUES
('Wooden Chair', 850);
```

---

### 1.5 Create ArchivedStock Table

```sql
CREATE TABLE ArchivedStock
(
    TranId INT,
    ProductId INT,
    QuantityChange INT,
    TranDate DATE
);
```

---

### 1.6 Insert StockTransactions Before 2023

```sql
INSERT INTO ArchivedStock
(TranId, ProductId, QuantityChange, TranDate)
SELECT
    TranId,
    ProductId,
    QuantityChange,
    TranDate
FROM StockTransactions
WHERE YEAR(TranDate) < 2023;
```

---

## 2. TEMPORARY TABLES

### 2.1 Create `#CustomerOrders

```sql
CREATE TABLE #CustomerOrders
(
    OrderId INT,
    CustomerId INT,
    TotalAmount DECIMAL(10,2)
);
```

---

#### 2.1.1 Insert Customers With Orders Above 5000

```sql
INSERT INTO #CustomerOrders
(OrderId, CustomerId, TotalAmount)
SELECT
    OrderId,
    CustomerId,
    TotalAmount
FROM Orders
WHERE TotalAmount > 5000;
```

---

### 2.2 Create ##TopRatedProducts

```sql
CREATE TABLE ##TopRatedProducts
(
    ProductId INT,
    Rating DECIMAL(2,1)
);
```

---

#### 2.2.1 Insert Products With Rating ≥ 4.5

```sql
INSERT INTO ##TopRatedProducts
(ProductId, Rating)
SELECT
    ProductId,
    Rating
FROM Reviews
WHERE Rating >= 4.5;
```

---

## 3. UPDATE OPERATIONS

### 3.1 Increase UnitPrice by 10%

#### Products Under 100 EGP

```sql
UPDATE Products
SET UnitPrice = UnitPrice * 1.10
WHERE UnitPrice < 100;
```

---

### 3.2 Update Order Status

- Premium → TotalAmount > 5000
- Standard → Otherwise

```sql
UPDATE Orders
SET Status =
CASE
    WHEN TotalAmount > 5000 THEN 'Premium'
    ELSE 'Standard'
END;
```

---

## 4. DELETE OPERATIONS

### 4.1 Delete Review by ReviewId

```sql
DELETE FROM Reviews
WHERE ReviewId = 1;
-- حسب الـ ReviewId المطلوب
```

---

### 4.2 Delete Cancelled Orders

```sql
DELETE FROM Orders
WHERE Status = 'Cancelled';
```

---

### 4.3 Delete OrderItems by OrderId

```sql
DELETE FROM OrderItems
WHERE OrderId = 5;
-- حسب الـ OrderId المطلوب
```

---

## 5. MERGE OPERATION

### 5.1 Create `#ProductsUpdate

```sql
CREATE TABLE #ProductsUpdate
(
    ProductId INT,
    Name VARCHAR(100),
    UnitPrice DECIMAL(10,2),
    StockQuantity INT
);
```

---
### 5.3 MERGE Logic

 - If Product Exists → UPDATE
 - If Product Is New → INSERT
 - If Product Exists in Main Table But Not in Update Table → DELETE

```sql
MERGE Products AS Target
USING #ProductsUpdate AS Source
ON Target.ProductId = Source.ProductId

WHEN MATCHED THEN
    UPDATE SET
        Target.Name = Source.Name,
        Target.UnitPrice = Source.UnitPrice,
        Target.StockQuantity = Source.StockQuantity

WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductId, Name, UnitPrice, StockQuantity)
    VALUES
    (
        Source.ProductId,
        Source.Name,
        Source.UnitPrice,
        Source.StockQuantity
    )

WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
```

---

# Hotel Management System

## 1. INSERT OPERATIONS

### 1.1 Insert a Guest

```sql
INSERT INTO Guests
(FullName, Nationality, PassportNumber, DateOfBirth)
VALUES
('Mahmoud Sayed', 'Egyptian', 'A12345678', '2004-07-15');
```

---

### 1.2 Insert Multiple Guests in One Statement

```sql
INSERT INTO Guests
(FullName, Nationality, PassportNumber, DateOfBirth)
VALUES
('Ahmed Ali', 'Egyptian', 'B98765432', '1999-05-20'),
('John Smith', 'American', 'US123456', '1995-11-10'),
('Sara Mohamed', 'Egyptian', 'C45678912', '2001-03-08');
```

---

## 2. UPDATE OPERATIONS

### 2.1 Increase DailyRate by 15% for All Suites

```sql
UPDATE Rooms
SET DailyRate = DailyRate * 1.15
WHERE RoomType = 'Suite';
```

---

### 2.2 Update ReservationStatus

- Completed → CheckoutDate < GETDATE()
- Upcoming → CheckinDate > GETDATE()
- Active → Otherwise

```sql
UPDATE Reservations
SET ReservationStatus =
CASE
    WHEN CheckoutDate < GETDATE() THEN 'Completed'
    WHEN CheckinDate > GETDATE() THEN 'Upcoming'
    ELSE 'Active'
END;
```

---

## 3. DELETE OPERATIONS

### 3.1 Delete Reservation_Guest for a Reservation

```sql
DELETE FROM Reservation_Guest
WHERE ReservationId = 5;
-- حسب الـ ReservationId المطلوب
```

---

## 4. MERGE OPERATION

### 4.1 Create `#StaffUpdates

```sql
CREATE TABLE #StaffUpdates
(
    StaffId INT,
    FullName VARCHAR(100),
    Position VARCHAR(100),
    Salary DECIMAL(10,2)
);
```

---

### 4.3 MERGE Logic

- Match → Update Position and Salary
- Not Matched in Hotel Database → Insert
- Not Matched in Update Table → Delete

```sql
MERGE Staff AS Target
USING #StaffUpdates AS Source
ON Target.StaffId = Source.StaffId

WHEN MATCHED THEN
    UPDATE SET
        Target.Position = Source.Position,
        Target.Salary = Source.Salary

WHEN NOT MATCHED BY TARGET THEN
    INSERT (StaffId, FullName, Position, Salary)
    VALUES
    (
        Source.StaffId,
        Source.FullName,
        Source.Position,
        Source.Salary
    )

WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
```

