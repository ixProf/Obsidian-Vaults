---
title: "Manager Responsibility"
aliases: []
type: project
status: active
domain: backend-engineering
tags: [project, backend-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
# 1. Dashboard

أول ما يفتح السيستم يشوف Dashboard فيها:

- عدد الأوردرات النهاردة.
- إجمالي المبيعات.
- عدد الترابيزات المشغولة.
- عدد الأوردرات اللي لسه في المطبخ.
- عدد الأوردرات المكتملة.
- أكثر الأصناف مبيعًا.
- أقل الأصناف مبيعًا.
- المنتجات الناقصة في المخزون.

مثلاً:

```
Today's Sales
EGP 18,500

Orders
145

Occupied Tables
18 / 25

Preparing Orders
7

Ready Orders
4

Completed Orders
132
```

---

# 2. إدارة الموظفين

المانجر يقدر:

- إضافة موظف.
- تعديل بياناته. 
- تغيير الـ Role.
- Reset Password.
- مشاهدة النشاط.

مثلاً:

```
Ahmed
Role: Waiter

Status: Active

Last Login:
11:42 AM
```

---

# 3. إدارة المنيو

بدل ما كل مرة تدخل SQL.

المانجر يقدر:

- إضافة صنف جديد.
- تعديل السعر.
- تعديل الصورة.
- تعديل الوصف.
- إيقاف صنف.
- إظهار صنف.

مثلاً:

```
Burger

Price
170

Available
Yes
```

---

# 4. إدارة Categories

مثلاً

```
Burgers

Pizza

Drinks

Desserts
```

يقدر يضيف أو يحذف أو يعدل.

---

# 5. إدارة الترابيزات

يقدر:

- إضافة ترابيزة.  
- حذف ترابيزة.
- تغيير رقمها.
- تغيير عدد الكراسي.
- تعطيل ترابيزة للصيانة.

مثلاً:

```
Table 12

Seats
6

Status

Out Of Service
```

---

# 6. متابعة الطلبات

المانجر يقدر يشوف كل الأوردرات.

ويفلتر حسب:

- اليوم.
- الشهر.
- الويتر.
- الكاشير.
- الشيف.
- الحالة.

---

# 7. التقارير

ودي أهم حاجة.

مثلاً

## Daily Sales

```
Date

Orders

Revenue

Profit
```

---

## Monthly Sales

```
January

420,000 EGP

February

390,000 EGP
```

---

## Best Selling Items

```
Chicken Burger

540 Sold

Pizza

420 Sold

Pasta

315 Sold
```

---

## Worst Selling

يعرف الأصناف اللي محدش بيطلبها.

---

## Peak Hours

مثلاً

```
12 PM

50 Orders

1 PM

73 Orders

2 PM

90 Orders
```

فيعرف المطعم بيزحم إمتى.

---

# 8. Inventory

لو هتعمل Inventory Module.

المانجر يشوف:

```
Tomato

12 KG

Low

Cheese

3 KG

Critical

Bread

120

Good
```

---

# 9. Purchase Requests

لو حاجة قربت تخلص.

السيستم يقول

```
Low Stock

Cheese

Current

2 KG

Minimum

10 KG
```

---

# 10. Discounts

المانجر يقدر يعمل

```
10%

Weekend

20%

Student Discount

15%

Happy Hour
```

---

# 11. Taxes

مثلاً

```
VAT

14%
```

---

# 12. Receipt Settings

يغير

- اسم المطعم.
    
- اللوجو.
    
- العنوان.
    
- رقم التليفون.
    

---

# 13. Notifications

مثلاً

```
Low Stock

Order Delayed

Table Reserved

Employee Login
```

---

# 14. Activity Logs

يشوف مين عمل إيه.

مثلاً

```
Ali

Deleted Menu Item

Yesterday

Ahmed

Updated Price

Today

Mohamed

Closed Order

11:52 AM
```

---

# 15. Analytics

Charts مثل:

- Sales by Month
    
- Sales by Category
    
- Orders by Hour
    
- Revenue Growth
    
- Best Waiter
    
- Best Seller
    
- Inventory Usage
    

---

# لو عايز المشروع يبقى قوي في الـ Portfolio

أنصحك تضيف Dashboard للمانجر فيها:

- KPIs (إجمالي المبيعات، عدد الطلبات، متوسط قيمة الطلب).
    
- Charts للمبيعات حسب اليوم والشهر.
    
- أكثر الأصناف مبيعًا وأقلها.
    
- نسبة إشغال الترابيزات.
    
- تنبيهات المخزون المنخفض.
    
- أحدث الطلبات وحالتها.
    

دي بتخلي المشروع يبان كنظام إدارة متكامل، مش مجرد CRUD.

---

## صلاحيات كل Role باختصار

|Role|أهم مسؤولياته|
|---|---|
|Waiter|فتح الترابيزات، إنشاء وتعديل الطلبات، متابعة حالة الطلب، تقديم الطعام.|
|Chef|استقبال الطلبات، تغيير حالتها إلى **Preparing** ثم **Ready**.|
|Cashier|مراجعة الطلب، اختيار طريقة الدفع، استلام المبلغ، طباعة الفاتورة.|
|Inventory Manager|إدارة المكونات، متابعة الكميات، مراجعة النواقص، تحديث المخزون.|
|Manager|إدارة النظام بالكامل، التقارير، الموظفين، المنيو، الأسعار، الخصومات، ومراقبة الأداء.|

باختصار، **المانجر لا يدير الطلبات بنفسه**، لكنه يمتلك صلاحيات إشرافية وإدارية تمكنه من مراقبة كل ما يحدث داخل المطعم واتخاذ القرارات بناءً على البيانات والتقارير.