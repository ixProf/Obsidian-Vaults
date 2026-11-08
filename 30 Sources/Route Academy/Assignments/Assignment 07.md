---
title: "Assignment 07"
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
**A1: UPPER + LEN**

```sql
SELECT UPPER(DisplayName) AS DisplayName_Upper, LEN(DisplayName) AS NameLength
FROM Users
ORDER BY NameLength DESC;
```

---

**A2: DATEDIFF**

```sql
SELECT Title, CreationDate, DATEDIFF(DAY, CreationDate, GETDATE()) AS DaysSinceCreated
FROM Posts
ORDER BY DaysSinceCreated DESC;
```

---

**A3: GROUP BY + COUNT**

```sql
SELECT OwnerUserId, COUNT(*) AS TotalPosts
FROM Posts
WHERE OwnerUserId IS NOT NULL
GROUP BY OwnerUserId
ORDER BY TotalPosts DESC;
```

---

**Aذ124: Subquery في WHERE**

```sql
SELECT DisplayName, Reputation
FROM Users
WHERE Reputation > (
    SELECT AVG(Reputation)
    FROM Users
)
ORDER BY Reputation DESC;
```

---

**A5: SUBSTRING + ISNULL**

```sql
SELECT ISNULL(Title, 'No Title') AS Title, SUBSTRING(ISNULL(Title, 'No Title'), 1, 50) AS ShortTitle
FROM Posts;
```

---

**A6: GROUP BY + HAVING**

```sql
SELECT PostTypeId, COUNT(*) AS PostCount, SUM(Score) AS TotalScore, AVG(CAST(Score AS FLOAT)) AS AvgScore
FROM Posts
GROUP BY PostTypeId
HAVING COUNT(*) > 100
ORDER BY PostCount DESC;
```

---

**A7: Correlated Subquery في SELECT**

```sql
SELECT
    u.DisplayName,
    (
        SELECT COUNT(*)
        FROM Badges b
        WHERE b.UserId = u.Id
    ) AS TotalBadges
FROM Users u
ORDER BY TotalBadges DESC;
```

---

**A8: CHARINDEX + FORMAT**

```sql
SELECT Title, Score, FORMAT(CreationDate, 'MMM dd, yyyy') AS FormattedDate
FROM Posts
WHERE CHARINDEX('SQL', Title) > 0
ORDER BY Score DESC;
```

---

**A9: GROUP BY على Comments**

```sql
SELECT PostId, COUNT(*) AS CommentCount, SUM(Score) AS TotalScore, AVG(CAST(Score AS FLOAT)) AS AvgScore
FROM Comments
GROUP BY PostId
HAVING COUNT(*) > 5
ORDER BY CommentCount DESC;
```

---

**A10: IIF + IS NOT NULL**

```sql
SELECT DisplayName, Location, Reputation, IIF(Reputation > 5000, 'High', 'Normal') AS ReputationLevel
FROM Users
WHERE Location IS NOT NULL
ORDER BY Reputation DESC;
```

---

**A11: Derived Table**

```sql
SELECT u.DisplayName, ps.TotalPosts, ps.AvgScore
FROM Users u
INNER JOIN (
    SELECT OwnerUserId, COUNT(*) AS TotalPosts, AVG(CAST(Score AS FLOAT)) AS AvgScore
    FROM Posts
    WHERE OwnerUserId IS NOT NULL
    GROUP BY OwnerUserId
    HAVING COUNT(*) > 3
) AS ps ON u.Id = ps.OwnerUserId
ORDER BY ps.TotalPosts DESC;
```

---

**A12: GROUP BY على Badges**

```sql
SELECT UserId, Name AS BadgeName, COUNT(*) AS TimesEarned
FROM Badges
GROUP BY UserId, Name
HAVING COUNT(*) > 1
ORDER BY TimesEarned DESC;
```

---

**A13 DATEDIFF + ROUND + ABS**

```sql
SELECT DisplayName, CreationDate,ROUND( DATEDIFF(DAY, CreationDate, GETDATE()) / 365.0, 2) AS AccountAgeYears, ABS(DownVotes) AS AbsDownVotes
FROM Users
ORDER BY AccountAgeYears DESC;
```

---

**A14: Complex Query**

```sql
SELECT
    p.Title AS PostTitle,
    COALESCE(u.DisplayName, 'Anonymous') AS AuthorName,
    u.Reputation AS AuthorReputation,
    cs.CommentCount,
    cs.TotalCommentScore
FROM Posts AS p
INNER JOIN
(
    SELECT
        PostId,
        COUNT(*) AS CommentCount,
        SUM(Score) AS TotalCommentScore
    FROM Comments
    GROUP BY PostId
) AS cs
    ON p.Id = cs.PostId
LEFT JOIN Users AS u
    ON p.OwnerUserId = u.Id
WHERE
    cs.CommentCount > 3
    AND p.Score > 10
ORDER BY
    cs.CommentCount DESC,
    cs.TotalCommentScore DESC;
```

---