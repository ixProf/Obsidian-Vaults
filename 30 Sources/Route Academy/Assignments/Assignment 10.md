---
title: "Assignment 10"
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
# Question 01

```sql
CREATE VIEW vw_BasicUserInfo
AS
SELECT Id AS UserId, DisplayName, Reputation, Location, CreationDate
FROM Users;
```

```sql
SELECT *
FROM vw_BasicUserInfo;
```

---
# Question 02

```sql
CREATE VIEW vw_HighScoringPosts
AS
SELECT Id AS PostId, Title, Score, ViewCount, CreationDate
FROM Posts
WHERE Score > 10;
```

```sql
SELECT *
FROM vw_HighScoringPosts;
```

---

# Question 03

```sql
CREATE VIEW vw_PostsWithAuthors
AS
SELECT P.Title, P.Score, U.DisplayName AS AuthorName, U.Reputation AS AuthorReputation
FROM Posts P
JOIN Users U
ON P.OwnerUserId = U.Id;

```

```sql
SELECT *
FROM vw_PostsWithAuthors;
```

---

# Question 04

```sql
CREATE VIEW vw_PostCommentStats
AS
SELECT PostId, COUNT(*) AS TotalComments, SUM(Score) AS TotalCommentScore, AVG(CAST(Score AS FLOAT)) AS AvgCommentScore
FROM Comments
GROUP BY PostId;
```

```sql
SELECT *
FROM vw_PostCommentStats;
```

---

# Question 05 (Indexed View)

 لازم يكون `SCHEMABINDING`.

```sql
CREATE VIEW dbo.vw_UserActivityIndexed
WITH SCHEMABINDING
AS
SELECT U.Id AS UserId, U.DisplayName, U.Reputation, COUNT_BIG(P.Id) AS TotalPosts
FROM dbo.Users U
LEFT JOIN dbo.Posts P
ON U.Id = P.OwnerUserId
GROUP BY U.Id, U.DisplayName, U.Reputation;

```

index:
```sql
CREATE UNIQUE CLUSTERED INDEX IX_vw_UserActivityIndexed
ON dbo.vw_UserActivityIndexed(UserId);
```

```sql
SELECT *
FROM dbo.vw_UserActivityIndexed;
```

---

# Question 06

```sql
CREATE VIEW vw_UsersPartitioned
AS

SELECT *
FROM Users
WHERE Reputation > 5000

UNION ALL

SELECT *
FROM Users
WHERE Reputation <= 5000;

```

```sql
SELECT *
FROM vw_UsersPartitioned;
```

---

# Question 07

```sql
CREATE VIEW vw_EditableUsers
AS
SELECT Id AS UserId, DisplayName, Location
FROM Users;
```

Test

```sql
UPDATE vw_EditableUsers
SET Location = 'Asyut'
WHERE UserId = 1;

SELECT *
FROM vw_EditableUsers
WHERE UserId = 1;
```

---

# Question 08

```sql
CREATE VIEW vw_QualityPosts
AS
SELECT Id AS PostId, Title, Score
FROM Posts
WHERE Score >= 20
WITH CHECK OPTION;

```

Test
```sql
UPDATE vw_QualityPosts
SET Score = 30
WHERE PostId = 1;
```

---

# Question 09

```sql
CREATE VIEW vw_ComprehensivePostInfo
AS
SELECT P.Id AS PostId, P.Title, P.Score, U.DisplayName AS AuthorName, U.Reputation AS AuthorReputation, COUNT(C.Id) AS CommentCount
FROM Posts P
JOIN Users U
ON P.OwnerUserId = U.Id
LEFT JOIN Comments C
ON P.Id = C.PostId
GROUP BY P.Id, P.Title, P.Score, U.DisplayName, U.Reputation;

```

```sql
SELECT *
FROM vw_ComprehensivePostInfo;
```

---

# Question 10

```sql
CREATE VIEW vw_UserBadgeStats
AS
SELECT U.Id AS UserId, U.DisplayName, U.Reputation, COUNT(B.Id) AS TotalBadges
FROM Users U
LEFT JOIN Badges B
ON U.Id = B.UserId
GROUP BY U.Id, U.DisplayName, U.Reputation;
GO
```

```sql
SELECT *
FROM vw_UserBadgeStats;
```

---

# Question 11

```sql
CREATE VIEW vw_ActiveUsers
AS
SELECT
    U.Id AS UserId,
    U.DisplayName,
    U.Reputation,
    U.LastAccessDate AS LastActivityDate
FROM Users U
WHERE
    U.LastAccessDate >= DATEADD(DAY, -365, GETDATE())
    OR U.Reputation > 1000;
GO

SELECT *
FROM vw_ActiveUsers;
```

---

# Question 12

```sql
CREATE VIEW dbo.vw_UserPostMetrics
WITH SCHEMABINDING
AS
SELECT
    U.Id AS UserId,
    COUNT_BIG(P.Id) AS TotalPosts,
    SUM(ISNULL(P.ViewCount,0)) AS TotalViews,
    SUM(ISNULL(P.Score,0)) AS TotalScore
FROM dbo.Users U
LEFT JOIN dbo.Posts P
ON U.Id = P.OwnerUserId
GROUP BY U.Id;
```

Index:

```sql
CREATE UNIQUE CLUSTERED INDEX IX_vw_UserPostMetrics
ON dbo.vw_UserPostMetrics(UserId);
```

علشان نشوف افرج ال score :

```sql
SELECT UserId, TotalPosts, TotalViews,
    CASE
        WHEN TotalPosts = 0 THEN 0
        ELSE CAST(TotalScore AS FLOAT) / TotalPosts
    END AS AvgScore
FROM dbo.vw_UserPostMetrics;
```

---

# Question 13

```sql
CREATE VIEW vw_PostsByCategory
AS
SELECT Id AS PostId, Title, Score,
    CASE
        WHEN Score >= 100 THEN 'Excellent'
        WHEN Score >= 50 THEN 'Good'
        WHEN Score >= 10 THEN 'Average'
        ELSE 'Low'
    END AS Category
FROM Posts;
```

```sql
SELECT *
FROM vw_PostsByCategory;
```

---
