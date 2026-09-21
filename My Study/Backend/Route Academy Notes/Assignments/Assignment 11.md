Q1

```sql
CREATE PROCEDURE dbo.sp_GetRecentBadges
    @DaysBack INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT b.Id AS BadgeId, b.UserId, u.DisplayName, b.Name AS BadgeName, b.Date AS DateEarned
    FROM Badges b
    JOIN Users u ON u.Id = b.UserId
    WHERE b.Date >= DATEADD(DAY, -@DaysBack, GETDATE())
    ORDER BY b.Date DESC;
END

```

 Test
 
```sql
EXEC dbo.sp_GetRecentBadges @DaysBack = 7;
EXEC dbo.sp_GetRecentBadges @DaysBack = 30;
EXEC dbo.sp_GetRecentBadges @DaysBack = 365;
```

---

Q2

```sql
CREATE PROCEDURE dbo.sp_GetUserSummary
    @UserId       INT,
    @TotalPosts   INT   OUTPUT,
    @TotalBadges  INT   OUTPUT,
    @AvgScore     FLOAT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT @TotalPosts = COUNT(*)
    FROM Posts
    WHERE OwnerUserId = @UserId;
    
    SELECT @TotalBadges = COUNT(*)
    FROM Badges
    WHERE UserId = @UserId;
    
    SELECT @AvgScore = AVG(CAST(Score AS FLOAT))
    FROM Posts
    WHERE OwnerUserId = @UserId;
    
    SET @TotalPosts  = ISNULL(@TotalPosts, 0);
    SET @TotalBadges = ISNULL(@TotalBadges, 0);
    SET @AvgScore    = ISNULL(@AvgScore, 0);
END

```

TEST:

```sql
DECLARE @Posts INT, @Badges INT, @Avg FLOAT;
EXEC dbo.sp_GetUserSummary
    @UserId      = 22656,
    @TotalPosts  = @Posts  OUTPUT,
    @TotalBadges = @Badges OUTPUT,
    @AvgScore    = @Avg    OUTPUT;
SELECT @Posts AS TotalPosts, @Badges AS TotalBadges, @Avg AS AvgScore;
```
---
Q3 (search posts)

```sql
CREATE PROCEDURE dbo.sp_SearchPosts
    @Keyword  VARCHAR(200),
    @MinScore INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id AS PostId, Title, Score, ViewCount, CreationDate
    FROM Posts
    WHERE Title LIKE '%' + @Keyword + '%'
      AND Score >= @MinScore
    ORDER BY Score DESC;
END
```

TEST
```SQL
EXEC dbo.sp_SearchPosts @Keyword = 'SQL';
EXEC dbo.sp_SearchPosts @Keyword = 'SQL', @MinScore = 25;
```

Q3 (get user or error)

```sql
CREATE PROCEDURE dbo.sp_GetUserOrError @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Users WHERE Id = @UserId)
        BEGIN
            RAISERROR('User with ID %d does not exist.', 16, 1, @UserId);
            RETURN;
        END
        
        SELECT Id AS UserId, DisplayName, Reputation, Location, CreationDate
        FROM Users
        WHERE Id = @UserId;
        
    END TRY
    BEGIN CATCH
        SELECT ERROR_NUMBER()  AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END

```

TEST:

```SQL
EXEC dbo.sp_GetUserOrError @UserId = 22656;
EXEC dbo.sp_GetUserOrError @UserId = -999999;
```
---
Q4

```sql
CREATE PROCEDURE dbo.sp_AnalyzeUserActivity
    @UserId        INT,
    @ActivityScore INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Reputation INT, @PostCount INT;
    SELECT @Reputation = Reputation FROM Users WHERE Id = @UserId;
    SELECT @PostCount  = COUNT(*)   FROM Posts WHERE OwnerUserId = @UserId;
    SET @ActivityScore = ISNULL(@Reputation, 0) + (ISNULL(@PostCount, 0) * 10);
    
    SELECT TOP 5 Id AS PostId, Title, Score
    FROM Posts
    WHERE OwnerUserId = @UserId
    ORDER BY Score DESC;
END
```

TEST

```SQL
DECLARE @Score INT;
EXEC dbo.sp_AnalyzeUserActivity @UserId = 22656, @ActivityScore = @Score OUTPUT;
SELECT @Score AS ActivityScore;
```

---

Q5

```sql
CREATE PROCEDURE dbo.sp_GetReputationInOut
    @UserIdOrReputation INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Reputation INT;
    
    SELECT @Reputation = Reputation
    FROM Users
    WHERE Id = @UserIdOrReputation;
    
    SET @UserIdOrReputation = ISNULL(@Reputation, -1);
END
```

TEST

```SQL
DECLARE @Param INT = 22656;
EXEC dbo.sp_GetReputationInOut @UserIdOrReputation = @Param OUTPUT;
SELECT @Param AS Reputation;
```

---

Q6

```sql
CREATE PROCEDURE dbo.sp_UpdatePostScore
    @PostId   INT,
    @NewScore INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Posts WHERE Id = @PostId)
        BEGIN
            RAISERROR('Post with ID %d does not exist.', 16, 1, @PostId);
            RETURN;
        END
        
        BEGIN TRANSACTION;
            UPDATE Posts
            SET Score = @NewScore
            WHERE Id = @PostId;
        COMMIT TRANSACTION;
        
        SELECT Id AS PostId, Title, Score
        FROM Posts
        WHERE Id = @PostId;
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION;

        SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END

```

TEST:

```SQL
EXEC dbo.sp_UpdatePostScore @PostId = 100, @NewScore = 42;
EXEC dbo.sp_UpdatePostScore @PostId = -1,  @NewScore = 42;
```

---
Q7

```sql
CREATE PROCEDURE dbo.sp_GetTopUsersByReputation
    @TopN          INT,
    @MinReputation INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT TOP (@TopN) Id AS UserId, DisplayName, Reputation, Location
    FROM Users
    WHERE Reputation >= @MinReputation
    ORDER BY Reputation DESC;
END
```

TEST:

```SQL
CREATE TABLE TopUsersArchive (
    UserId       INT,
    DisplayName  NVARCHAR(200),
    Reputation   INT,
    Location     NVARCHAR(200),
    ArchivedDate DATETIME DEFAULT GETDATE()
);


INSERT INTO TopUsersArchive (UserId, DisplayName, Reputation, Location)
EXEC dbo.sp_GetTopUsersByReputation @TopN = 10, @MinReputation = 5000;

SELECT * FROM TopUsersArchive;
```

---

Q8

```sql
CREATE TABLE UserLog (
    LogId   INT IDENTITY(1,1) PRIMARY KEY,
    UserId  INT,
    Action  VARCHAR(100),
    Details VARCHAR(500),
    LogDate DATETIME DEFAULT GETDATE()
);
GO

CREATE PROCEDURE dbo.sp_InsertUserLog
    @UserId  INT,
    @Action  VARCHAR(100),
    @Details VARCHAR(500),
    @LogId   INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO UserLog (UserId, Action, Details)
    VALUES (@UserId, @Action, @Details);

    SET @LogId = SCOPE_IDENTITY();
END
GO

-- Test:
DECLARE @NewLogId INT;
EXEC dbo.sp_InsertUserLog
    @UserId  = 22656,
    @Action  = 'REPUTATION_UPDATE',
    @Details = 'Reputation manually adjusted by admin',
    @LogId   = @NewLogId OUTPUT;

SELECT @NewLogId AS NewLogId;
```

Q9

```sql
CREATE PROCEDURE dbo.sp_UpdateUserReputation
    @UserId        INT,
    @NewReputation INT,
    @RowsAffected  INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET @RowsAffected = 0;

    BEGIN TRY
        IF @NewReputation < 0
        BEGIN
            RAISERROR('Reputation cannot be negative.', 16, 1);
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Users WHERE Id = @UserId)
        BEGIN
            RAISERROR('User with ID %d does not exist.', 16, 1, @UserId);
            RETURN;
        END

        UPDATE Users
        SET Reputation = @NewReputation
        WHERE Id = @UserId;

        SET @RowsAffected = @@ROWCOUNT;
    END TRY
    BEGIN CATCH
        SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO

-- Test:
DECLARE @Rows INT;
EXEC dbo.sp_UpdateUserReputation @UserId = 22656, @NewReputation = 12000, @RowsAffected = @Rows OUTPUT;
SELECT @Rows AS RowsAffected;
```

Q10

```sql
CREATE PROCEDURE dbo.sp_DeleteLowScorePosts
    @MaxScore     INT,
    @DeletedCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET @DeletedCount = 0;

    BEGIN TRY
        BEGIN TRANSACTION;
            DELETE FROM Posts
            WHERE Score <= @MaxScore;

            SET @DeletedCount = @@ROWCOUNT;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION;

        SET @DeletedCount = 0;
        SELECT ERROR_NUMBER() AS ErrorNumber, ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO

-- Test:
DECLARE @Deleted INT;
EXEC dbo.sp_DeleteLowScorePosts @MaxScore = 0, @DeletedCount = @Deleted OUTPUT;
SELECT @Deleted AS DeletedCount;
```

Q11

```sql
CREATE PROCEDURE dbo.sp_BulkInsertBadges
    @UserId     INT,
    @BadgeCount INT
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH Numbers AS (
        SELECT 1 AS N
        UNION ALL
        SELECT N + 1 FROM Numbers WHERE N < @BadgeCount
    )
    INSERT INTO Badges (UserId, Name, Date)
    SELECT
        @UserId,
        'Auto-Generated Badge ' + CAST(N AS VARCHAR(10)),
        GETDATE()
    FROM Numbers
    OPTION (MAXRECURSION 1000);
END
GO

-- Test:
EXEC dbo.sp_BulkInsertBadges @UserId = 22656, @BadgeCount = 5;
SELECT * FROM Badges WHERE UserId = 22656 ORDER BY Date DESC;
```

Q12

```sql
IF OBJECT_ID('dbo.fn_GetBadgeLevel', 'FN') IS NULL
BEGIN
    EXEC('
    CREATE FUNCTION dbo.fn_GetBadgeLevel (@Reputation INT, @PostCount INT)
    RETURNS VARCHAR(10)
    AS
    BEGIN
        DECLARE @Badge VARCHAR(10);
        IF @Reputation > 10000 AND @PostCount > 50
            SET @Badge = ''Gold'';
        ELSE IF @Reputation > 5000 AND @PostCount > 20
            SET @Badge = ''Silver'';
        ELSE IF @Reputation > 1000 AND @PostCount > 5
            SET @Badge = ''Bronze'';
        ELSE
            SET @Badge = ''None'';
        RETURN @Badge;
    END');
END
GO

CREATE PROCEDURE dbo.sp_GenerateUserReport
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalPosts INT, @TotalBadges INT, @AvgScore FLOAT;

    EXEC dbo.sp_GetUserSummary
        @UserId      = @UserId,
        @TotalPosts  = @TotalPosts  OUTPUT,
        @TotalBadges = @TotalBadges OUTPUT,
        @AvgScore    = @AvgScore    OUTPUT;

    SELECT
        u.Id AS UserId,
        u.DisplayName,
        u.Reputation,
        u.Location,
        @TotalPosts  AS TotalPosts,
        @TotalBadges AS TotalBadges,
        @AvgScore    AS AvgPostScore,
        dbo.fn_GetBadgeLevel(u.Reputation, @TotalPosts) AS UserLevel
    FROM Users u
    WHERE u.Id = @UserId;
END
GO

-- Test:
EXEC dbo.sp_GenerateUserReport @UserId = 22656;
```