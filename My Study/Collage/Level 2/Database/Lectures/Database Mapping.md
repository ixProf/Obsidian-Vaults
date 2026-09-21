## What's Database Mapping? 

**Database Mapping** is the process of converting a **logical data model** (such as an **Entity-Relationship (ER) Model**) into a **relational schema** that can be implemented in a relational database.
هي عملية تحويل ERD لجداول مفهومة اكتر
## **Importance of Database Mapping**

- **📌Transforms conceptual models into actual database structures**.
📌 بيحول **التصميم النظري** للبيانات لهيكل حقيقي جوه قاعدة البيانات.
- **📌Ensures data integrity** so that information is neither lost nor duplicated.
📌 بيضمن **تكامل البيانات (Data Integrity)**، يعني يمنع فقدان أو تكرار المعلومات.
- **📌Optimizes query performance** by organizing data logically.
📌 بيحسن أداء الاستعلامات (Queries) وبيخلي استرجاع البيانات أسرع.
- **📌Facilitates data input and retrieval** efficiently.
📌 بيخلّي إدخال وتعديل البيانات أسهل وأنظم.

## Steps of Database Mapping

بسم الله نبدأ نوريكم ازاي نعمل Mapping لقاعدة البيانات بتاعتنا
بص يا صحبي هي 7 خطوات
🔹 Step 1: Mapping of Regular (Strong) Entity Types 
🔹 Step 2: Mapping of Weak Entity Types 
🔹 Step 3: Mapping of Binary 1:1 Relation Types 
🔹 Step 4: Mapping of Binary 1:N Relationship Types. 
🔹 Step 5: Mapping of Binary M:N Relationship Types. 
🔹 Step 6: Mapping of N-ary Relationship Types. 
🔹 Step 7: Mapping of Unary Relationship.

---
## 1️⃣**Step 1 : Mapping of Strong Entity**

### 🔹Mapping Simple Attribute :
هناخد مثال وهو ال Employee وهنطبق ال Mapping على attributes بتاعته 
![[Pasted image 20250225013944.png]]

ودي حاجه بسيطة جدا انت يدوبك هتكتب الاتربيوت ف مستطيلات وتشد خط على ال Primary Key
كدا انت خلصت Mapping لل Simple Attribute ودا تطبيق لل ERD بعد ما اتعملها Mapping

![[Pasted image 20250225014214.png]]

---

### 🔹Mapping composite attribute :
![[Pasted image 20250225014921.png]]

بص انت هنا هتنسي إن في Attribute الي اسمه Name وهتمسك في ال composite ف انت هتكتب ال {FName, MName, LName} وبس يصحبي فهيبقى الشكل زي كد 

![[Pasted image 20250225015202.png]]

---

### 🔹Mapping Multi-Valued attribute

في اختلاف بسيط بقى، بص بصة كدا على ال ERD
![[Pasted image 20250225020054.png]]
بص كدا عملنا ايه :
![[Pasted image 20250225020122.png]]

عملنا جدول منفصل لل Skills ليه ؟
لأن كل موظف ممكن يكون عنده **أكتر من مهارة** (Multi-Valued Attribute)، ولو حطينا المهارات جوه جدول الموظف، هنواجه مشاكل زي:
❌ **تكرار البيانات (Redundancy)** → لو الموظف عنده أكتر من مهارة، هنكرر اسمه وعمره لكل مهارة، فمش هينفع اننا نعمل كدا واحنا فالجدول الاصلي واننا بنستعمل Primary Key 
❌ **صعوبة البحث والتعديل** → لو حبينا نضيف مهارة جديدة أو نحذف واحدة، هيبقى الموضوع معقد

 **الخط المنقط تحت "EmpID" في جدول المهارات (Employee_Skills)** :

🔹 الخط المنقط ده غالبًا بيعني إن العمود **EmpID** هو **(Foreign Key)**، وده معناه إنه بيشير إلى العمود **ID** في جدول **الموظفين (Employee)**.  
🔹 الForeign Key بيساعد في **ربط الجداول** وضمان تكامل البيانات، بحيث إن أي قيمة في **EmpID** لازم تكون موجودة أصلًا في **جدول الموظفين**، يعني مفيش مهارة هتتسجل لموظف مش موجود.

متنساش التصميم دا

---

### 🔹Mapping Complex Attribute:

![[Pasted image 20250225021505.png]]
مشابه شوية لل Multi-value بس في فرق بسيط تع نشوف
![[Pasted image 20250225021628.png]]

ليه تحت ال city خط برضو و country مش تحتها حاجه ؟
#### 1️⃣ **EmpID تحتها خط منقط**

🔹 ده معناه إن **EmpID هو مفتاح أجنبي (Foreign Key)** بيشير إلى **ID في جدول Employees**.  
🔹 المفتاح الأجنبي ده بيربط جدول **Employee_Address** بجدول **Employees**، بحيث نضمن إن كل عنوان مرتبط بموظف موجود أصلًا في قاعدة البيانات.

---

#### 2️⃣ **City تحتها خط عادي**

🔹 ده غالبًا معناه إن **City جزء من المفتاح الأساسي (Primary Key)** للجدول **Employee_Address**.  
🔹 وده ممكن يكون لأن ==**كل موظف ممكن يكون عنده أكتر من عنوان**== في **مدن مختلفة**، فبالتالي، لازم نميز كل عنوان خاص بالموظف.  
🔹 في الحالة دي، المفتاح الأساسي للجدول هيكون **(EmpID, City)** ==كمفتاح مركب (Composite Key)==، لأنه لازم يكون فريد لكل صف.

---

#### 3️⃣ **ليه Country مفيش تحتها خط؟**

🔹 السبب ممكن يكون إن **Country مش مفتاح أساسي أو مفتاح أجنبي**، لكنها مجرد **صفة (Attribute)** تابعة للعنوان.  
🔹 يعني طالما عندنا **City**، فالدولة مش هتفرق في تحديد المفتاح الأساسي، لكنها تضاف كمعلومة إضافية.

#### **يعني إيه Composite Key؟**

**Composite Key**
أو **المفتاح المركب** هو مفتاح أساسي (Primary Key) ==بيتكون من **أكتر من عمود (أكثر من Attribute)**== بدل ما يكون عمود واحد بس، وده ==بيتم استخدامه لما **ما ينفعش تمييز كل صف في الجدول باستخدام عمود واحد فقط**.==

---

###### **🔹 إمتى بنستخدم Composite Key؟**

بنعمل **Composite Key** لما يكون أي **عمود لوحده مش فريد كفاية** لتمييز الصفوف، لكن الجمع بين أكتر من عمود يخلي كل سجل فريد.

---

###### **✅ مثال عملي:**

###### **📌 جدول Employee_Address**

فيه بيانات الموظفين وعناوينهم. وكل موظف ممكن يكون عنده أكتر من عنوان في مدن مختلفة.

| **EmpID** | **City** | **Country** |
| --------- | -------- | ----------- |
| 1         | Cairo    | Egypt       |
| 1         | Giza     | Egypt       |
| 2         | Dubai    | UAE         |

- **هل EmpID لوحده ينفع مفتاح أساسي؟** ❌ لا، لأن الموظف الواحد ممكن يكون عنده أكتر من عنوان.
- **هل City لوحدها تنفع مفتاح أساسي؟** ❌ لا، لأن ممكن يكون فيه موظفين مختلفين عايشين في نفس المدينة.
- **الحل؟** نستخدم **(EmpID, City) كمفتاح أساسي مركب (Composite Key)**، لأنه بيضمن إن كل صف فريد.


### 🔹Mapping Derived Attribute: دي مش بيتعملها Mapping ف اكثر الحالات
---

## 2️⃣**Step 2: Mapping of Weak Entity Types** :
![[Pasted image 20250225022711.png]]
![[Pasted image 20250225022726.png]]
هنا يعتبر مشابه شوية للي فوق بس استخدمنا فيه ال composite primary key 
ليه؟
العلاقة تم تمثيلها باستخدام مفتاح مركب (**Composite Primary Key**) في جدول **Dependant** ==لضمان عدم تكرار نفس التابع لنفس الموظف.==

---
## 3️⃣**Step 3: Mapping of Binary 1:1 Relation Types**

هنعتمد هنا على 3 حالات ولكل حالة طريقة

1- Both sides are Mandatory
يعني الناحيتين مشتركين في العلاقة 
2- Mandatory - Optional 
ناحية اه وناحية اختياري يعني مش تحت شرط تشترك
3- Both sides are Optional
الناحيتين مش تحت شرط يشتركوا

---

### 🔹Both sides are Mandatory

قبل ما تعمل اي حاجه لازم تسأل نفسك سؤالين 
       **Null and Redundancy ??**
       يعني هل هيكون في تكرار؟ و هل هيكون في خانة null ؟
ملحوظة:
no Repeat in one 
يعني كدا انتهينا من حتة ال redundancy 
فكدا هنتأكد من ناحية ال null 

فبالنسبة لل Mandatory مش هينفع يكون في null ليه ؟
علشان كل شخص له عربية دا إجباري زي ما ممثل في العلاقة دي 
![[Pasted image 20250225135452.png]]
فكدا احنا هنكون متطمنين واحنا بنحط ال CID في الجدول xy ان مش هيكون في Null
![[Pasted image 20250225135608.png]]
 ممكن نخلي primary key بتاع اي حد 
 ممكن بتاع ال emp او car
 لان مش هيكون في تكرار ولا هيكون في null

---
### 🔹Mandatory - Optional

زي ما اتفقنا ان مفيش تكرار في one 
هنا في الشكل بيقول ان العربية لازم يكون ليها مالك ( موظف ) بس مش كل موظف لازم يكون معاه عربية 
![[Pasted image 20250225140311.png]]
+ معلومة كل عربية ليها مالك واحد بس وكل مالك ليه عربية واحدة بسس فكدا مش هيكون في تكرار فكدا هنحط ال EID في جدول ال Car
![[Pasted image 20250225140344.png]]
![[Pasted image 20250225141621.png]]

---
### 🔹Both Sides are Optional:
مش شرط كل emp يكون عنده car
مش شرط كل car يكون ليها emp
![[Pasted image 20250225144442.png]]
ممكن يكون في null من الناحيتين لو بقيت في table واحد

ف هنعمل table تالت بحيث يكون في Foreign Key و Primary Key و ال Primary ممكن يكون car , emp
![[Pasted image 20250225144430.png]]

----
## 4️⃣**Step 4: Mapping of Binary 1:N Relationship Types**

في حالتين كدا 
1- M-Side Mandatory
الي ناحية M بتكون Mandatory 
2- M-Side Optional
الي ناحية M بتكون Optional

هنا هيبدا يتحقق ال Redundancy و Null 

---

### 🔹M-Side Mandatory

![[Pasted image 20250225150757.png]]
كل قسم بيشتغل فيه اكثر من emp
وكل emp بيشتغل في قسم واحد

هيكون في تكرار لو اتعمل في Table واحد
![[Pasted image 20250225151255.png]]
هنا هو حط ال DID في ال EID، ليه بقى ؟

لأن هنا بيقولك ان ال Dep الواحد بيشتغل فيه اكتر من emp

فانت ممكن تلاقي dep هيتكرر بسبب ان في اكتر من emp ممكن يشتغلوا فيه
وكمان مش شرط ان كل dep يشتغل فيه emp

---
### 🔹M-Side Optional:
مش شرط ومش شرط
![[Pasted image 20250225152618.png]]
لو اتحطوا في جدول واحد هيحصل اي ؟


- هتلاقي null من الناحيتين 
	- هتلاقي خانة Project مش شغال فيها employee
	- هتلاقي employees مش شغالين ف Project
- بالنسبة للتكرار ؟
	- هتلاقي التكرار في إن ممكن ال Project الواحد ممكن يشتغل فيه كذا employee

فعلشان كدا هنعملها على 3 tables 
![[Pasted image 20250225152635.png]]
علشان نشيل ال null الي هيحصل من ناحية ال project
ونشيل ال redundancy الي هيحصل من ناحية ال employee
PK بتاع الجدول  = PK بتاع جدول ال Many
لأن ال EMP مش هيتكرر بس الي هيتكرر PID علشان ممكن يشتغل فيه اكتر من EMP وعلشان كدا انا عملته Foreign Key

---

## 5️⃣**Step 5 : Mapping of Binary M:N Relationship Types:**

ملهاش غير Case واحدة وانها هنعملها في 3 tables 
![[Pasted image 20250225154514.png]]

لو حد استخدم الاكسيز قبل كدا هيعرف ان لما تكون العلاقة many-to-many بنعمل جدول تالت ودا بنسميه ال junction or Bridge table
ودا بيكون فيه ال id بتاع الجدولين والاتنين معملوهم PK
![[Pasted image 20250225154614.png]]

---
## 6️⃣**Step 6 : Mapping of N-ary Relationship Types:
 ![[Pasted image 20250225155038.png]]

3 entities ليهم علاقة ببعض
هتعمل 3 جداول بشكل طبيعي 
وبعد كدا هتعمل جدول رابع للعلاقة، تحط فيه ال Primary keys بتاعت الجداول في الجدول الرابع دا على شكل foreign keys

وال Primary key هو عبارة عن 
composit key

اخترنا فالجدول دا 3 PK 
![[Pasted image 20250225155331.png]]

PK = DocID , PID, Date
- **كل دكتور (DocID) ممكن يكشف على أكتر من مريض (PID).**
- **كل مريض (PID) ممكن يزور أكتر من دكتور.**
- **الدكتور ممكن يكتب للمريض أكتر من دواء في مواعيد مختلفة.**
- **التاريخ (Date) هو اللي بيميز الكشف أو الروشتة، لإن نفس الدكتور ممكن يكشف على نفس المريض أكتر من مرة في أيام مختلفة، والمريض ميقدرش يروح عند نفس الدكتور في نفس اليوم.**
---
## 7️⃣**Step 7 : Mapping Unary Relationship

يدوبك هو جدول واحد هتعمل عليه الريليشن بحيث ان هيكون في PK , FK ال FK منشق من ال PK

والحالة دي هتكون اسمها Recursive FK 
![[Pasted image 20250225155856.png]]

---