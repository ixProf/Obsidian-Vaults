---
title: "Assignment 09"
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

احنا محتاجين نحسن  الكويري دي 

```sql
SELECT Id, Title, Score
FROM Posts
WHERE OwnerUserId = 5
AND Score > 50
ORDER BY Score DESC;
```

ف احنا بنعمل كوندشن على اتنين ال id , score فالحل هيبقى Composite Index
```sql
CREATE NONCLUSTERED INDEX IX_Posts_OwnerUserId_Score
ON Posts (OwnerUserId, Score DESC)
INCLUDE (Id, Title);
```

الاندكس بيشمل
```txt
OwnerUserId
Score
Id
Title
```

Key Columns -> دي الي عملنا عليها الاندكس

```txt
OwnerUserId
Score
```

متضمن بيهم
```TXT
Id
Title
```

فعلشان نعمل تيست مثلا هتلاقي في حاجه اسمها Index Seek بس انا شغال على ليندكس مش عارف اجيبها منين صراحة

وعلشان نعمل verfiy ف نكتب ال
```sql
EXEC sp_helpindex 'Posts';
```

- فيظهر كدا :

![[Pasted image 20260711023017.png]]

---
# Q2
عايزين نحسن الكويري دي 

```SQL
WHERE Score > 100
AND Title IS NOT NULL
```

فاحنا نستخدم ال Filtered Index

استخدمنا **Filtered Index** لأن السؤال نفسه بيقول:

> **Queries always filter for posts with `Score > 100` and `Title IS NOT NULL`.**

كلمة **always** هي المفتاح هنا.

لو عملنا **Non-clustered Index** عادي، هيتعمل index **لكل صفوف جدول Posts**، حتى المنشورات اللي Score بتاعها أقل من 100 أو Title بتاعها NULL، مع إن ال Queries عمرها ما هتستخدمها

```sql
CREATE NONCLUSTERED INDEX IX_Posts_HighScore
ON Posts (Score DESC)
INCLUDE (Id, Title, OwnerUserId)
WHERE Score > 100
AND Title IS NOT NULL;
```

فدا الحل الي يطور ال Performance ويخليها احسن.

الـQuery بتحتاج
```txt
Id
Title
OwnerUserId
Score
```

فأحنـا حطينا Key على `Score` وهيكون معانا برضو
```txt
Id
Title
OwnerUserId
```

test:
```sql
SELECT Id, Title, Score, OwnerUserId
FROM Posts
WHERE Score > 100
AND Title IS NOT NULL
ORDER BY Score DESC;
```

اي مميزات ال Filtered Index ؟

- بيحتوي بس على الRows التي تحقق الشرط (`Score > 100` و `Title IS NOT NULL`).

- حجمه أصغر من الـ Non-clustered Index العادي.

- يحتاج مساحة تخزين أقل.

- يقلل cost عمليات القراءة (I/O).

- أسرع في عمليات search لأنه يحتوي على عدد أقل من rows.

-  تكلفة تحديث الـ Index بتكون أقل، لأن SQL Server بيحدث الـindex فقط للrows اللي تحقق الشرط (`Score > 100` و`Title IS NOT NULL`)، أما باقي الrows فمش بتدخل الindex من الأساس، وبالتالي مش بتحتاج أي تحديث