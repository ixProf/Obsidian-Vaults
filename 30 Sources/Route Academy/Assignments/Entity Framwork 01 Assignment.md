---
title: "Entity Framwork 01 Assignment"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-23
updated: 2026-09-23
source:
related: []
---
تمام. خلينا نتعامل مع الـCase Study دي كأنها **Requirements Analysis + EF Core Database Design task**، وأنا هشرحلك المطلوب بحيث تقدر تبدأ وتحل بنفسك، **من غير ما أديك الـsolution أو الـentities الجاهزة**.

---

# 1. الأول: إيه المطلوب منك أصلًا؟

الـCase Study بتوصف نظام اسمه **EventHub**.

أنت مطلوب منك تقرأ الـrequirements وتحوّلها غالبًا إلى:

- Entities
    
- Properties
    
- Relationships
    
- Cardinality
    
- Primary Keys
    
- Foreign Keys
    
- Required / Optional properties
    
- One-to-One / One-to-Many / Many-to-Many
    
- Self-Referencing Relationship
    
- Owned/Complex type أو تقسيم مناسب للـAddress
    
- Constraints
    
- Fluent API configuration
    

يعني قبل ما تكتب أي C#، لازم تعمل **Database Modeling** في دماغك.

---

# 2. استخرج الـEntities من الـCase

اقرأ النص واسأل نفسك:

> "إيه الحاجات اللي النظام محتاج يخزنها كـ records مستقلة؟"

عندك في النص أشخاص وأشياء واضحة جدًا.

### حاول تستخرج بنفسك:

- Organizer
    
- Organizer Profile
    
- Event
    
- Attendee
    
- Badge
    
- Registration
    
- Address
    

لكن خلي بالك: **مش معنى إن كل اسم ظهر في الـstory يبقى لازم يكون Entity مستقلة.**

مثلًا الـAddress محتاجة منك تفكير:

> هل هي Entity مستقلة؟  
> ولا جزء من Attendee؟

وده جزء مهم في الـtask.

---

# 3. Organizer

الـOrganizer هو الشخص أو الشركة اللي بتنظم Events.

الـrequirements بتقول:

> person or company decides to host events

والـOrganizer بيقدم:

- Name
    
- Company Name — لو applicable
    
- Verified Status
    

إذن اسأل نفسك:

### Properties محتاجة تكون إيه؟

فكر في:

```text
Id
Name
CompanyName
IsVerified
```

لكن **متاخدش دول كـsolution حرفيًا**؛ دي مجرد طريقة استخراج الـrequirements.

### مهم جدًا

"if applicable"

معناها إن Company Name **Optional**.

يعني لازم في تصميمك تفرق بين:

```text
Required
```

و

```text
Optional
```

---

# 4. Organizer Profile

دي نقطة مهمة جدًا في الـcase.

النص بيقول:

> every organizer maintains a public-facing profile page

والـProfile فيه:

- Short biography
    
- Personal/company website
    
- Logo
    

وأهم جملة:

> This profile page is directly tied to the organizer’s account and cannot exist without it.

دي بتقول لك بشكل واضح إن فيه relationship قوية بين:

**Organizer ↔ OrganizerProfile**

واسأل نفسك:

### هل دي:

- One-to-One؟
    
- One-to-Many؟
    

كل Organizer عنده profile واحد، والـProfile تابع لـOrganizer واحد.

إذن relationship من نوع:

```text
Organizer 1 ---- 1 OrganizerProfile
```

لكن لسه فيه سؤال مهم:

### مين الـPrincipal ومين الـDependent؟

الجملة:

> cannot exist without it

معناها إن الـProfile هو الـDependent.

فكر إزاي هتمثل ده في EF Core.

---

# 5. Event

كل Organizer يقدر يعمل Events.

الـEvent عنده:

- Title
    
- Description
    
- Start Date
    
- End Date — Optional
    
- Maximum Attendees
    

إذن اسأل نفسك:

### Relationship:

Organizer يعمل كام Event؟

وEvent يتبع كام Organizer؟

فكر في:

```text
Organizer 1 ---- ? Event
```

و:

```text
Event ? ---- 1 Organizer
```

النص:

> an organizer can publish events

معناه إن Organizer ممكن يعمل عدد من الـEvents.

والـEvent منشور بواسطة Organizer واحد.

---

# 6. Optional End Date

دي من الحاجات اللي لازم تاخد بالك منها.

النص:

> an optional end date

يعني:

```text
StartDate → Required
EndDate   → Optional
```

وده لازم ينعكس في الـC# model.

مثلاً، بشكل عام:

```csharp
DateTime
```

مختلف عن:

```csharp
DateTime?
```

فأنت بنفسك حدد النوع المناسب.

---

# 7. Event داخل Event

دي من أهم أجزاء الـtask.

النص بيقول:

> Large-scale events ... may also contain smaller ... sessions

مثال:

```text
Technology Conference
    ├── Workshop A
    ├── Workshop B
    └── Workshop C
```

والـrequirements بتقول:

> Sessions can only belong to one parent event

و:

> a parent event can have any number of sessions.

هنا عندك **Self-Referencing Relationship**.

يعني الـEvent نفسه مرتبط بـEvent آخر.

مش:

```text
Event → Session Entity
```

بالضرورة.

لكن:

```text
Event
  ↓
Parent Event
```

والـSession نفسها Event.

---

# 8. ارسمها قبل ما تكتب Code

جرب ترسم:

```text
             ┌──────────────┐
             │    Event     │
             └──────────────┘
                    │
             Parent / Child
                    │
                    ▼
             ┌──────────────┐
             │    Event     │
             └──────────────┘
```

واسأل نفسك:

### Event ممكن يكون:

- Parent فقط؟
    
- Session فقط؟
    
- الاتنين؟
    
- ولا لازم واحد منهم؟
    

الـCase لا يقول إن الـEvent لا يمكن أن يكون Session وفي نفس الوقت Parent.

فما تضيفش business rules من عندك.

---

# 9. Attendee

الـAttendee بيسجل عشان يحضر Events.

بيقدم:

- Full Name
    
- Email
    
- Home Address
    

والـAddress يحتوي:

- Street
    
- City
    
- Country
    
- Postal Code
    

إذن عندك سؤال مهم جدًا:

### هل Address Entity مستقلة؟

أنت محتاج تقرر.

بما إن الـAddress هنا مجرد مجموعة بيانات تخص الـAttendee، ومفيش في الـcase أي كلام عن:

- Address ID
    
- مشاركة Address بين أكتر من شخص
    
- إدارة العناوين independently
    

فكر في مفهوم:

### Owned / Complex Data

خصوصًا لو الـtask خاص بـEF Core.

---

# 10. Badge

بعد ما الـAttendee يسجل في **at least one event**، النظام يصدر له Badge.

الـBadge يحتوي:

- Unique Number
    
- Issue Date
    
- Tier
    

والـTier إما:

```text
Standard
VIP
```

العلاقة:

> A badge belongs to one attendee

و:

> each attendee can have at most one badge.

إذن فكر في:

```text
Attendee 1 ---- 0..1 Badge
```

وليس:

```text
1 ---- 1
```

ليه؟

لأن الـAttendee ممكن يكون لسه مسجلش أي Event.

والـcase بتقول إن الـBadge بيصدر **بعد** التسجيل في event.

---

# 11. Badge Tier

الـTier له قيم محددة:

```text
Standard
VIP
```

هنا فكر:

### هل تستخدم:

```csharp
string
```

ولا:

```csharp
enum
```

وده غالبًا جزء مقصود في الـtask.

فأنت محتاج تعمل representation مناسب لقيم محددة.

---

# 12. Attendee ↔ Event

دي أهم Relationship تقريبًا.

النص:

> An attendee can register for multiple events

وفي نفس الوقت:

> any given event will naturally have many attendees

إذن:

```text
Attendee
   ↕
Registration
   ↕
Event
```

وده:

# Many-to-Many

لأن:

```text
Attendee → Many Events
Event    → Many Attendees
```

لكن عندك مشكلة:

الـRegistration نفسها فيها Data.

---

# 13. Registration

النص بيقول إن لما الشخص يسجل:

> may optionally leave a short note

يعني:

```text
Note → Optional
```

وكمان:

> platform automatically records the exact date and time

يعني عندك:

```text
RegisteredAt
```

وده **مش مجرد relationship**.

دي Data تخص عملية التسجيل نفسها.

لذلك الـRegistration لازم تكون لها representation في الـmodel.

فكر فيها كـ:

```text
Attendee
    │
    │
Registration
    │
    │
Event
```

---

# 14. ليه مش Many-to-Many عادي؟

دي نقطة مهمة جدًا.

لو عندك:

```text
Attendee ↔ Event
```

فـ EF Core يقدر يعمل Many-to-Many.

لكن هنا الـrelationship نفسها عندها بيانات:

```text
Note
RegisteredAt
```

يعني العلاقة نفسها أصبحت لها attributes.

فأنت محتاج تفكر في مفهوم:

> **Join Entity**

يعني بدل ما العلاقة تكون hidden بالكامل، يكون عندك Entity تمثل عملية التسجيل.

---

# 15. Registration Cardinality

ارسمها:

```text
Attendee 1 ───── * Registration * ───── 1 Event
```

يعني:

### Attendee

ممكن عنده registrations كتير.

### Event

ممكن عنده registrations كتير.

### Registration

تنتمي إلى:

- Attendee واحد
    
- Event واحد
    

وده يحقق الـMany-to-Many بشكل صريح.

---

# 16. الـNote

النص:

> optionally leave a short note

إذن:

```text
Note = Optional
```

لكن كلمة **short** مهمة.

هل لازم تعمل validation؟

ممكن يكون المقصود إنك تحدد maximum length.

مثلاً تفكر في:

```text
MaxLength
```

لكن الـcase لم يعطك رقمًا.

**ماتخترعش رقم من عندك إلا لو الـtask instructor طالب منك تعمل assumptions.**

---

# 17. Registration DateTime

النص يقول:

> automatically records the exact date and time

ده معناه إن:

```text
RegisteredAt
```

يجب أن يمثل **date + time**، مش Date فقط.

فكر في نوع مناسب لذلك.

وكمان اسأل نفسك:

> مين المسؤول عن تعيين القيمة؟

مش بالضرورة الـAttendee نفسه.

دي قيمة الـsystem بيسجلها أثناء Registration.

---

# 18. CreatedAt / UpdatedAt في Event

آخر paragraph مقصود جدًا:

> system silently tracks when each event record was first created ... and when it was last modified

يعني فيه:

```text
CreatedAt
UpdatedAt
```

لكن بعد كده بيقول:

> never displayed on the public event page

و:

> nor are they part of the event’s data model as visible fields.

دي محتاجة تفكير.

المقصود إن دي **internal/auditing metadata** وليست من الـpublic business data الخاصة بالـEvent.

فما تتعاملش معاها كـproperties عادية تظهر في الـAPI response أو public event model.

---

# 19. ركز في الفرق ده

عندك:

### Business Data

مثلاً:

```text
Title
Description
StartDate
EndDate
MaxAttendees
```

دي بيانات الـEvent نفسها.

لكن:

### Internal Metadata

```text
CreatedAt
UpdatedAt
```

دي الـplatform بتستخدمها internally.

فلو الـassignment بيطلب منك EF Core configuration، غالبًا فيه نقطة مقصودة هنا بخصوص **shadow properties**.

فكر في:

> EF Core Shadow Properties

دي حاجة مهمة جدًا تراجعها قبل ما تبدأ الجزء الخاص بالـEvent.

---

# 20. اعمل ERD الأول

قبل Visual Studio/Rider، اعمل ورقة فيها entities.

حاول أنت توصل لشكل قريب من:

```text
Organizer
    │
    ├──────── OrganizerProfile
    │
    └──────── Event
                  │
                  └────── Event
                         (Parent / Session)


Attendee
    │
    ├──────── Badge
    │
    └──────── Registration ─────── Event
```

وفيه:

```text
Attendee
   │
   └── Address
```

حسب اختيارك في modeling.

---

# 21. جدول Requirements لنفسك

قبل الكود، اعمل جدول بالشكل ده:

|Entity|Property|Required?|Type|Notes|
|---|---|--:|---|---|
|Organizer|?|?|?|Organizer identity|
|Organizer|?|?|?|Optional company|
|Organizer|?|?|?|Verification|
|Profile|?|?|?|Bio|
|Profile|?|?|?|Website|
|Event|?|?|?||
|Event|?|?|?|Optional end|
|Attendee|?|?|?||
|Badge|?|?|?||
|Registration|?|?|?|Optional note|
|Registration|?|?|?|Auto timestamp|

**املأه أنت من الـcase.**

---

# 22. العلاقات اللي لازم تحددها

اعمل جدول ثاني:

|Relationship|Type|FK কোথ?|
|---|---|---|
|Organizer ↔ Profile|?|?|
|Organizer ↔ Event|?|?|
|Event ↔ Event|?|?|
|Attendee ↔ Badge|?|?|
|Attendee ↔ Event|?|?|
|Attendee ↔ Address|?|?|

ومتكتبش الكود قبل ما الجدول ده يخلص.

---

# 23. الـChecklist اللي تمشي عليه

لما تبدأ الحل، امشِ بالترتيب ده:

### Step 1 — Entities

استخرج كل الـentities.

### Step 2 — Properties

لكل Entity حدد:

- PK
    
- Required properties
    
- Optional properties
    
- Data types
    

### Step 3 — Relationships

حدد:

- 1:1
    
- 1:N
    
- N:N
    
- Self-referencing
    

### Step 4 — Foreign Keys

حدد كل FK ومين الـPrincipal ومين الـDependent.

### Step 5 — Special Cases

راجع:

- Optional CompanyName
    
- Optional EndDate
    
- Optional Registration Note
    
- Address
    
- Badge 0..1
    
- Parent/Session
    
- Badge Tier
    

### Step 6 — EF Core

بعد ما تخلص الـmodel:

- Fluent API
    
- Keys
    
- Relationships
    
- Delete behaviors
    
- Max lengths
    
- Required/optional
    
- Enum mapping
    
- Shadow properties
    
- Owned/Complex type لو اخترته
    

### Step 7 — Migration

بعدها فقط:

```text
Add Migration
Update Database
```

وتراجع الـdatabase الناتجة.

---

# 24. أسئلة لازم تجاوب عليها قبل ما تبدأ

لو عرفت تجاوب دول، أنت جاهز تبدأ:

1. كام Entity عندك؟
    
2. هل `OrganizerProfile` Entity مستقلة؟
    
3. علاقة Organizer بـProfile إيه؟
    
4. مين الـPrincipal ومين الـDependent؟
    
5. علاقة Organizer بـEvent إيه؟
    
6. إزاي تمثل Event → Parent Event؟
    
7. هل Session Entity مستقلة؟
    
8. علاقة Attendee بـBadge إيه؟
    
9. ليه Badge مش Required عند إنشاء Attendee؟
    
10. علاقة Attendee بـEvent إيه؟
    
11. ليه محتاج Registration Entity؟
    
12. إيه الـproperties الموجودة في Registration؟
    
13. أنهي properties Optional؟
    
14. الـAddress هتمثلها إزاي؟
    
15. الـTier هتمثله إزاي؟
    
16. `CreatedAt` و`UpdatedAt` هتمثلهم إزاي بدون ما يكونوا visible properties في Event model؟
    

**لو قدرت تجاوب الـ16 دول على ورقة، متبدأش بالكود؛ أنت كده خلصت أصعب جزء من الـtask، والكود هيبقى تحويل للـdesign اللي عملته.**