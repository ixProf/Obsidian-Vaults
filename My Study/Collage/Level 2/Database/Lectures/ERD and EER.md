# Entity-Relationship (ER) Model
![[Pasted image 20250220002740.png]]

 - **Database Design Process**
    
    - Involves **conceptual schema design** using the ER model.
    - Application design focuses on programs and interfaces that interact with the database.
- **What is an ER Diagram?**
    
    - It models **real-world objects** (entities) and their relationships.
    - Helps visualize database structure before implementation.
    - هو **رسم تخطيطي** بيوضح تنظيم البيانات في قاعدة البيانات ERD،  بيساعد في تصميم قواعد البيانات قبل ما يتم تنفيذها، و بيسهل فهم العلاقات بين الكيانات زي **الطلاب والكورسات في جامعة**.


- **Why Use ER Diagrams?**
    
    - Helps in **logical visualization** of data.
    - Requires ==no technical knowledge.==
    - Easy to convert into **relational tables**.
    -  **سهل الفهم** حتى لغير المبرمجين، و بيحول **الكيانات للعلاقات** بسهولة وكمان بيساعد في **تصميم قواعد بيانات منظمة** من غير أخطاء.
- **Basic ER Model Concepts**
    
    - **Entities**: ==Real-world objects== like students, teachers, departments.
    - الحاجات الي بتكون ع ارض الواقع
    - **Attributes**: ==Properties== of entities (e.g., a student has a name and age).
    - خصائص الحاجات دي
    - **Relationships**: ==Connections== between entities (e.g., a student **enrolls in** a course).
    - الشئ المتعلق بالحاجة والتانية، لازم يكون بينهم علاقة تربطهم


![[Pasted image 20250220003213.png]]


- **Entity Types**
    
    - **Strong Entity**: ==Has a primary key== and exists ==independently==.
    - ميعتمدش على شئ تاني، مستقل
    - **Weak Entity**: ==Depends on another entity== (e.g., an employee's dependent).
    - يعتمد على شئ تاني

![[Pasted image 20250220004220.png]]
![[Pasted image 20250220003637.png]]


- **Attributes in ER Model**
    
    - **Key Attribute**: Uniquely identifies an entity (e.g., student ID).
    - بتحدد الكيان ==بشكل فريد==
    - **Composite Attribute**: Contains multiple sub-attributes (e.g., address → street, city).
    - مكونة من ==عدة صفات فرعية== (**مثال: العنوان → شارع، مدينة**)
    - **Multivalued Attribute**: Can have multiple values (e.g., phone numbers).
    - ممكن يكون ليها أكتر من قيمة لنفس الكيان (**مثال: أرقام التليفون**).
    - **Derived Attribute**: Can be computed (e.g., age from birthdate).
    - ==بتتحسب من صفات تانية== (**مثال: العمر بيتم حسابه من تاريخ الميلاد**).


![[Pasted image 20250220003833.png]]


- **Relationships in ER Model**
    
    - **Unary Relationship**: ==Same entity== participates in different roles (e.g., an employee supervises another employee).
    - نفس الكيان بيشارك في العلاقة بأدوار مختلفة (**مثال: الموظف بيشرف على موظف آخر**).


![[Pasted image 20250220004954.png]]

- **Binary Relationship**: Two ==different== entities are involved (e.g., a student enrolls in a course).
- كيانين مختلفين مشتركين ( زي الطالب ودخوله في الكورسات )
![[Pasted image 20250220005149.png]]

- **n-ary Relationship**: ==More than two== entities participate.
- اكتر من كائنين مشتركين
![[Pasted image 20250220005239.png]]
- **Relationship Cardinality**
    
    - **One-to-One** (1:1) → ==One entity== is related to ==only one other entity.==
    - كل **مدير** يقود **قسمًا واحدًا فقط**، وكل **قسم** يكون له **مدير واحد فقط**.
    - ![[Pasted image 20250220005542.png]]
    - **One-to-Many** (1:N) → ==One entity== is related to ==multiple entities.==
    - كل موظف شغال في قسم واحد، لكن القسم فيه أكتر من موظف
    - ![[Pasted image 20250220005552.png]]
    - **Many-to-Many** (M:N) → Many entities relate to many others.
    - الطالب ممكن يسجل في كذا كورس، والكورس الواحد فيه كذا طالب.
    - ![[Pasted image 20250220005609.png]]![[Pasted image 20250220005631.png]]
- **Participation Constraints**
    
    - **Total Participation**: Every entity in a set ==must be part== of a relationship.
    - كل كيان لازم **يكون مشارك في العلاقة**.
    - ![[Pasted image 20250220010148.png]]
    - **Partial Participation**: Some entities ==may not participate.==
    - مش كل الكيانات لازم **تشارك في العلاقة**.
    - ![[Pasted image 20250220010305.png]]
- **Drawing ER Diagrams**
	- Identify **entities and relationships**.
	- Use ==**rectangles**== for ==**entities**==
	- **==diamonds==** for **==relationships==** 
	- **==Oval==** for ==**attributes.**==
	- Ensure **proper connections** between components.
	- مستطيلات ← كائنات
	- معين ← علاقات
	- شكل بيضاوي ← التفاصيل الخاصة بالكيانات

---