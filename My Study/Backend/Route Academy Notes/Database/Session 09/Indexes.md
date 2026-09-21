
- بيتم تخزين الداتا على شكل صفحات كل صفحة فيهم قيمتها 8KB 
- كل جروب مكون من 8 صفحات عبارة عن حاجه اسمها Extend
- تقسيمة ال Page 
	- الـHeader والي بيكون فيه PageId, PageType, Free Space
	- والـData الطبيعية ديما
	- والـOffset دا حاجه زي الفهرس الداخلي الي بيعرفك الحاجات بتكون فين بالظبط

![[Pasted image 20260709221649.png]]

بص بالشكل دا كدا.

ف بإختصار لو احنا عملنا كويري زي كدا مثلا
```sql
SELECT *
FROM Users
Where Salary > 10000
```

هيروح يقرأ Pages من ال Hard Disk حتى لو الحاجه الي هيرجعها عبارة عن Row واحد

ويبعتها لل Buffer Pool ودا عبارة عن حاجه اشبه بالكاش كدا فالداتا بيز علشان لو عملت نفس الكويري بعدين، هيروح يجيبها على طول من الBuffer Pool
![[Pasted image 20260709222257.png]]
 

# Heap Table

الصفحات غير مرتبة، يعني ممكن في صفحة تلاقي ID = 1 والتانية تلاقي ID = 20 وهكذا

ودا مخلي عملية الاضافة سريعة جدا -> لانه اول ما يلاقي حاجه فاضية هيحط فيها وخلاص
لكن عملية الاسترجاع هتكون بطيئة جدا ؟
ليه ؟ لأنه هيضطر انه يعمل حاجه معروفة بإسم Full Table Scan
هيعمل عملية قراءة كاملة لكل الصفحات علشان يطلع الID الي انت بتدور عليه

الجدول الي ملوش اي ترتيب يسمى -> Heap Table 

![[Pasted image 20260709223716.png]]

طب ودا حلها هيكون ازاي؟
طبيعي حلها انه يكون عملية ترتيب للبيجز كدا:
يعني عبارة عن انه يرتبها بناءا على عمود معين والعمود دا هو الي هيكون الـ Index ساعتها هيكون اسمه Cluster Table

ساعتها لو كتبنا مثلا كويري زي كدا
```sql
SELECT *
FROM USERS
WHERE ID = 2;
```

هو عارف اي Page هيروح يدور فيها وهيروح يدور في اي Column
فهيروح للصفحة دي وهيسأل ال Offset وال Offset يدله

![[Pasted image 20260709224923.png]]

---

# Index Type:

في نوعين من ال Indexes وهما 
- Cluster Index
- Non-Cluster Index

## Cluster Index

دا بيعمل عملية الترتيب للجدول، يعني ال Heap Table هو عبارة عن Table من غير Cluster Index 

يعني ايه Index بشكل فعلي؟

كلنا عارفين اي هي ال Binary Search Tree هي عبارة عن Tree بيكون فيها كل Node ليها 2 Child عبارة عن Left - Right بحيث ان ال Left ليه قيمة اقل من ال Parent وال Right ليها قيمة اعلى من ال Parent

![[Pasted image 20260709230226.png]]

Binary Search Tree
- At Least 2 Child
- Left smaller than Parent
- Right Bigger than Parent

هل الاندكس بيستخدمها؟
- لا علشان في مشكلة
	- انها مش Balance ليه؟
		- انت لو حاولت تضيف ارقام مرتبة (1و2و3و4و5) هيفضلوا ديما الناحية اليمين ليه لأن كل رقم اكبر من الي قبله فهيروح على ناحية اليمين على طول فهيبقى شكلها زي كدا

![[Pasted image 20260710202949.png]]

ساعتها هيكون في مشكلة كبيرة فال Time Complexity O(n) ودا بطئ مقارنة ب Log(n)

---

# B- Tree (Balance Tree)

- هي عبارة عن نود فيها اكتر من Key انت بتحدده يعني مش زي العادية لا هيبقى شكلها زي كدا مثلا
![[Pasted image 20260710203601.png]]

انت بتحدد عدد ال Keys بيكون عبارة عن Children - 1 
يعني عندك مثلا فالشكل دا 4 Leaf وهما على نفس ال Level ف ال Maximum Keys هيكون عبارة عن 4-1 = 3 زي ما هو موضح

لما تحط داتا ف الداتا يا اما هتكون في انترنال نود او يا اما Leaf 
فهل دا بيستخدمه الاندكس ؟
لا، ليه علشان ال Range Query بيكون في مشكلة فيها
- هتضطر تنزل وتطلع وتنزل وتطلع فدا هياخد وقت كبير
![[Pasted image 20260710213016.png]]

هيتنقل من الليفز للانترنال وهكذا

---

# B+ Tree

ما نخلي الداتا في ال Leafs بس ؟
دا الي بيقدمله ال B+Tree


ساعتها مش هيفرق معاك الترتيب بص كدا 
![[Pasted image 20260710220722.png]]

---

الـCluster Index is Unique لو حطيته على Primary Key
في حالة لو محطيتهوش على Primary Key لو في اتنين بنفس القيمة ف بيعمل حاجه داخلية كدا Column Identity مش بتشوفها وبيدي قيمة افتراضية لكل واحد يعتمد عليها ودا علشان يمنع التكرار 


---

## Select into

دي هتعمل جدول افتراضي مؤقت تقدر تستخدمه وقت ما انت عايز
والجدول دا مش هياخد اي Keys يعني ال Id مش هيبقى Primary Key

```sql
Select *
Into Users_ProgrammingTeacher
From Users
```


---

## Execution Plan 

لو كتبنا مثلا الكويري دي 

```sql
SELECT *
FROM Users_ProgrammingTeacher
WHERE Id = 4;
```

الخطوات الي هيستخدمها ال Engine في تنفيذ الكويري بتاعته
(مش ظاهرة عندي علشان انا شغال على Container على VS Code )
![[Pasted image 20260716210431.png]]

تتقرأ من اليمين للشمال.

ملاحظين ان اكتر حاجه اخدت cost هو ال Table Scan وزي ما قولنا قبل كدا ان دا معاناها انه Heap Table -> No Cluster index

علشان تعمل كلاستر اندكس 

```sql
CREATE UNIQUE CLUSTERED INDEX CX_Users_ProgrammingTeacher ON Users_ProgrammingTeacher(Id)
```

فلو جربنا نفس الكويري تاني وفتحنا ال Execution Plan هتلاقي شكلها بقى كدا

![[Pasted image 20260716211447.png]]

ال Index seek دي معناها انا عملت Read لل Page بتاعتي 
هو الطبيعي انه يكون قرأ اكتر من Pages علشان هي ماشية بشكل ال B+Tree فبدل يعني ما يخش على كل الصفحات لا هو اختصرها وقرأ عدد صغير من الصفحات بس في الاخر هو قرأ كام ROW ؟

قرأ Row واحد بس 

تعالى نشوف الفرق

### قبل ال Cluster Index

![[Pasted image 20260716221222.png]]

### بعد ما عملنا Clustered Index

![[Pasted image 20260716222400.png]]

ملاحظين الفرق، قبلها قراء ال Rows كلها
لكن لما عملنا ف هو قرأ Row واحدة بس

ال Estimation لو اختلف عن ال Actual يبقى في مشكلة في ال SQL Server
![[Pasted image 20260716222957.png]]

---

## Non-Clustered Index

