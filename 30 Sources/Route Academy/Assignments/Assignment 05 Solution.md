---
title: "Assignment 05 Solution"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
#  Referential Integrity Rules

## Q1

- If a hotel is deleted from the Hotels table, what is the appropriate behavior for the rooms belonging to that hotel? Explain which foreign key rule you would choose and why And Represent Rule

- العلاقة بين Hotel - Rooms 
- كل أوضة مرتبطة بالفندق، فلو أتحذف الفندق اتحذف، الاوض مينفعش يكونوا موجودين، لأنها هتبقى داتا ملهاش ريفرنس

فالحل هنا، هنستخدم 
```sql
ON DELETE CASCADE;
```

Representation Rule
```sql
CREATE TABLE Rooms (
    RoomID INT PRIMARY KEY,
    RoomNumber VARCHAR(20),
    HotelID INT,
    
    FOREIGN KEY (HotelID) REFERENCES Hotels(HotelID)
    ON DELETE CASCADE
);
```

ليه؟
- طالما حذفنا الفندق، بالتبعية هيحذف كل الغرف تلقائيا
- يمنع وجود Rooms بدون Hotel

مثال،
 عندنا اوتيل X وفي اوضتين مسجلين لل X و هما مثلا 202 و 203

فمثلا احنا حذفنا X
```SQL
DELETE FROM Hotels
WHERE HotelID = 1;
```

فبالتالي لما الفندق يتحذف هيتحذف معاه الاوضتين 203 و 202 تلقائي

---

## Q2

- When a room is deleted from the Rooms table, what should
happen to the related records in Amenities? Which rule makes the
most sense for this relationship, and why? And Represent Rule

- العلاقة بين الاوضة و المرافق
- كل اوضة ليها مرافق بتاعتها وكل مرفق مكانه في اوضة معينة

- لو حذفنا اوضة فبالتالي المرافق بتاعتها هيبقوا لوحدهم ملهمش مكان، فمش هيكون ليهم معنى

- فزي الي فوق طالما هنحذف الغرف نشيل معاها مرافقها ف فالحالة دي بنستخدم 

```SQL
ON DELETE CASCADE;
```

```SQL
CREATE TABLE Amenities (
    AmenityID INT PRIMARY KEY,
    Name VARCHAR(50),
    RoomID INT,

    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
    ON DELETE CASCADE
);
```

ليه استخدمت `ON DELETE CASCADE`

- علشان امنع وجود اي مرفق مرتبط بغرفة مش موجودة
- هنظف البيانات بشكل تلقائي
- وهيكون أسهل من اني احذفهم بشكل يدوي

- مثال بسيط،
	- عندنا اوضة رقم 505 مثلا فيها مرافق معينة 
	- انا حابب احذف الاوضة دي
	- طالما انا عملت `ON DELETE CASCADE` فانا هحذف وانا مطمن
	- فبالتالي كل المرافق بـالأوضة دي هتتحذف بشكل تلقائي

```sql
DELETE FROM Rooms
WHERE RoomID = 5;
```

---

## Q3

- If a staff member’s ID changes, what impact should this have on
the Services they are linked to? Which update rule is most
suitable? And Represent Rule

- Staff -> Services

- كل ستاف ليه خدمات معينة يعملها
- لو غيرنا ال StaffID، الخدمات المرتبطة بيه لازم تشاور  على ال ID الجديد

- علشان نعدل بشكل امن والتعديل بتاعنا يسمع من PK لـ FK يبقى نستخدم
```SQL
ON UPDATE CASCADE;
```

- ليه نستخدم دا؟
	- علشان اي تحديث يحصل في البريمري كي ينعكس تلقائيا في الفورين كي
	- بيمنع ال Broken References
	- وكمان بيحافظ على الConsistency

Representation Rule
```SQL
CREATE TABLE Services (
    ServiceID INT PRIMARY KEY,
    ServiceName VARCHAR(100),
    StaffID INT,

    FOREIGN KEY (StaffID)
    REFERENCES Staff(StaffID)
    ON UPDATE CASCADE
);
```

مثال، انا عندي مثلا 3 سيرفس، مرتبطين ب ستاف رقم 2
انا هنا لو عدلت الايدي دا لرقم 1 مثلا هيحصل اي؟

- ولا اي حاجه طالما انا عامل `ON UPDATE CASCADE` هيتعدل الايدي رقم 2 لرقم واحد بشكل تلقائي بدون اي مشاكل
```SQL
UPDATE Staff
SET StaffID = 1
WHERE StaffID = 2;
```

---

# Joining Tables
## Q1

- Write a query to display all users along with all post types
```SQL
SELECT U.DisplayName,
       PT.Type AS PostType
FROM Users U
CROSS JOIN PostTypes PT;
```

---

## Q2

- display name and reputation. ==Only include posts that have an
owner.==

```SQL
SELECT 
    P.Title, 
    U.DisplayName, 
    U.Reputation
FROM Posts P
INNER JOIN Users U ON P.OwnerUserId = U.Id
WHERE P.PostTypeId = 1;
```

انا هنا مش عارف القصد بأنه بوست سؤال يعني ولا ايه؟

دا الحل لو قصدك سؤال

الحل دا بقى لو قصدك بوست بقى سواء كان سؤال ولا غيره

```sql
SELECT P.Title,
       U.DisplayName,
       U.Reputation
FROM Posts P
INNER JOIN Users U
ON P.OwnerUserId = U.Id;
```

---

## Q3

- Write a query to show all comments with their associated post
titles. Display the comment text, comment score, and post title.

```SQL
SELECT 
    C.Text AS Comment_Text, 
    C.Score AS Comment_Score, 
    P.Title AS Post_Title
FROM Comments C
INNER JOIN Posts P ON C.PostId = P.Id
WHERE P.Title IS NOT NULL;

```

- انا اعتبرت ان مش محتاج Null

---
## Q4

- Write a query to list all users and their badges (if any).
Include users even if they don't have badges. Show display name,
badge name, and badge date.

```SQL
SELECT 
    U.DisplayName, 
    B.Name AS Badge_Name, 
    B.Date AS Badge_Date
FROM Users U
LEFT JOIN Badges B ON U.Id = B.UserId;
```

طالما if Any خلاص سو وات 

---

## Q5

- Write a query to display all posts along with their comments ==(if
any).== Include posts that have no comments. Show post title, post
score, comment text, and comment score.

```SQL
SELECT 
    P.Title, 
    P.Score AS Post_Score, 
    C.Text AS Comment_Text, 
    C.Score AS Comment_Score
FROM Posts P
LEFT JOIN Comments C ON P.Id = C.PostId;
```

---

## Q6

- Write a query to show all votes along with their corresponding
posts. Include all votes even ==if the post information is missing.==
==Display vote type ID, creation date==, and post title.

```SQL
SELECT 
    V.VoteTypeId, 
    V.CreationDate AS Vote_Creation_Date, 
    P.Title AS Post_Title
FROM Votes V
LEFT JOIN Posts P ON V.PostId = P.Id;
```

---

## Q7

- Write a query to find all answers (posts with ParentId) along with
their parent question. Show the answer title, answer score,
question title, and question score.

```SQL
SELECT 
    A.Title AS Answer_Title,
    A.Score AS Answer_Score, 
    Q.Title AS Question_Title, 
    Q.Score AS Question_Score
FROM Posts A
INNER JOIN Posts Q ON A.ParentId = Q.Id
WHERE A.PostTypeId = 2;
```


---
# Powered By Obsidian

وصلى الله على محمد وعلى آله وصحبه وسلم.