---
title: "Assignment 08"
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

# Q1

```SQL
Select u.Id, u.DisplayName, u.Reputation
From Users u
Where u.Reputation > 8000

UNION

SELECT u.Id, u.DisplayName, u.Reputation
From Users u
JOIN (
	SELECT OwnerUserId, Count(*) AS PostCount
	FROM Posts
	GROUP BY OwnerUserId
) AS P
on P.OwnerUserId = u.Id
Where P.PostCount > 15
```

# Q2

```SQL
SELECT u.Id AS UserId, u.DisplayName, u.Reputation
FROM Users u
JOIN (
	SELECT UserId, COUNT(*) AS BadgeCount
	FROM Badges
	GROUP BY UserId
) b ON b.UserId = u.Id
WHERE u.Reputation > 3000 AND b.BadgeCount >= 5;
```


# Q3

```SQL
Select p.Id as PostId, p.Title, p.Score
From Posts p
Where p.Score > 20
And Not Exists (
Select 1
From Comments c
Where c.PostId = p.Id
)
```

# Q4

```SQL
SELECT
	Id,
	Title,
	Score,
	ViewCount,
	CreationDate,
	OwnerUserId
INTO Posts_Backup
FROM Posts
WHERE Score > 10;

Select *
FROM Posts_Backup
```

# Q5

```SQL
SELECT
	u.Id AS UserId,
	u.DisplayName,
	u.Reputation,
	u.Location,
	Count(p.Id) AS PostCount
INTO ActiveUsers
From Users u
Join Posts p On u.Id = p.OwnerUserId
Where u.Reputation > 1000
Group By u.Id, u.DisplayName, u.Reputation, u.Location
Having Count(p.Id) >= 1;
```

# Q6

```SQL
SELECT *
INTO Comments_Template
FROM Comments
WHERE 1 = 0;
```


# Q7

```sql
SELECT
	p.Id AS PostId,
	p.Title,
	p.Score,
	p.ViewCount,
	p.CreationDate,
	u.DisplayName AS OwnerDisplayName,
	u.Reputation AS OwnerReputation,
	COUNT(c.Id) AS CommentCount
INTO PostEngagementSummary
FROM Posts p
JOIN Users u ON u.Id = p.OwnerUserId
LEFT JOIN Comments c ON c.PostId = p.Id
WHERE COUNT(c.Id) >= 3
GROUP BY p.Id, p.Title, p.Score, p.ViewCount, p.CreationDate, u.DisplayName, u.Reputation
```

# Q8

```SQL
CREATE FUNCTION dbo.fn_GetPostAgeDays (@CreationDate DATETIME)
RETURNS INT
	AS
	BEGIN
		RETURN DATEDIFF(DAY, @CreationDate, GETDATE());
	END;

-- نجرب؟ يلا نجرب
SELECT
Id AS PostId,
Title,
CreationDate,
dbo.fn_GetPostAgeDays(CreationDate) AS AgeInDays
FROM Posts;
```

# Q9

```SQL
CREATE FUNCTION dbo.fn_GetBadgeLevel
(
	@Reputation INT,
	@PostCount INT
)
RETURNS VARCHAR(10)
AS
BEGIN
	DECLARE @Badge VARCHAR(10);
	IF @Reputation > 10000 AND @PostCount > 50
		SET @Badge = 'Gold';
	ELSE IF @Reputation > 5000 AND @PostCount > 20
		SET @Badge = 'Silver';
	ELSE IF @Reputation > 1000 AND @PostCount > 5
		SET @Badge = 'Bronze';
	ELSE
		SET @Badge = 'None';
	RETURN @Badge;
END;
```

# Q10

```SQL
CREATE PROCEDURE dbo.usp_GetRecentPosts
@DaysBack INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		Id AS PostId,
		Title,
		Score,
		ViewCount,
		CreationDate
	FROM Posts
	WHERE CreationDate >= DATEADD(DAY, -@DaysBack, GETDATE());
END;
```

# Q11

```SQL
CREATE PROCEDURE dbo.usp_GetTopUsersByLocation @MinReputation INT, @Location VARCHAR(200) = NULL
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		Id AS UserId,
		DisplayName,
		Reputation,
		Location,
		CreationDate
	FROM Users
	WHERE Reputation >= @MinReputation
	AND (@Location IS NULL OR Location = @Location);
END;
```

# Q12

```SQL
WITH RankedPosts AS (
	SELECT
		PostTypeId,
		Id AS PostId,
		Title,
		Score,
		ROW_NUMBER() OVER (PARTITION BY PostTypeId ORDER BY Score DESC) AS Rnk
	FROM Posts
)
SELECT PostTypeId, PostId, Title, Score, Rnk
FROM RankedPosts
WHERE Rnk <= 3
ORDER BY PostTypeId, Rnk;
```

# Q13

```SQL
WITH AvgRep AS (
	SELECT
		AVG(CAST(Reputation AS FLOAT)) AS AvgReputation
	FROM Users
)
SELECT
	u.DisplayName,
	u.Reputation,
	a.AvgReputation
FROM Users u
CROSS JOIN AvgRep a
WHERE u.Reputation > a.AvgReputation;
```

# Q14

```sql
WITH UserPostStats AS (
	SELECT
		OwnerUserId,
		COUNT(*) AS TotalPosts,
		AVG(CAST(Score AS FLOAT)) AS AvgScore
	FROM Posts
	GROUP BY OwnerUserId
)
SELECT
	u.DisplayName,
	u.Reputation,
	ups.TotalPosts,
	ups.AvgScore
FROM Users u
JOIN UserPostStats ups ON ups.OwnerUserId = u.Id
WHERE ups.TotalPosts > 5;
```

# Q15

```SQL
WITH PostCounts AS (
	SELECT OwnerUserId, COUNT(*) AS PostCount
	FROM Posts
	GROUP BY OwnerUserId
),
BadgeCounts AS (
	SELECT UserId, COUNT(*) AS BadgeCount
	FROM Badges
	GROUP BY UserId
)

SELECT
	u.DisplayName,
	u.Reputation,
	ISNULL(pc.PostCount, 0) AS PostCount,
	ISNULL(bc.BadgeCount, 0) AS BadgeCount
FROM Users u
LEFT JOIN PostCounts pc ON pc.OwnerUserId = u.Id
LEFT JOIN BadgeCounts bc ON bc.UserId = u.Id;
```

# Q16

```SQL
WITH Numbers AS (
	SELECT 1 AS Num
	UNION ALL
	SELECT Num + 1
	FROM Numbers
	WHERE Num < 20
)
SELECT Num
FROM Numbers
OPTION (MAXRECURSION 20);
```