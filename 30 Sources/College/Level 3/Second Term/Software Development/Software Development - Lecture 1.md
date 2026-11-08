---
title: "Software Development - Lecture 1"
aliases: []
type: source
status: active
domain: software-engineering
tags: [source, software-engineering, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
# 1) What is Software Development?

### التعريف:

**Software Development** هو:

> Process of taking requirements → analyzing → designing → implementing solution

### شرح بالعربي:

يعني ببساطة:

1. العميل يقولك المشكلة (requirements)
    
2. انت تفهم وتحلل المشكلة (analysis)
    
3. تصمم حل (design)
    
4. تكتب كود ينفذ الحل (implementation)
    

---

### نقطة مهمة جدًا:

**Programming ≠ Software Development**

- Programming = جزء من الـ development (الكود بس)
    
- Software Development = الصورة الكبيرة كلها
    

---

### كمان:

**Software Engineering أوسع من الاتنين**

يشمل:

- Project management
    
- Scheduling
    
- Managing team
    
- Configuration management
    

---

### الخلاصة:

```
Programming ⊂ Software Development ⊂ Software Engineering
```

---

# 2) الفرق الحقيقي (مهم جدًا في الامتحان)

### Programming:

- كتابة الكود
    

### Software Development:

- Analysis + Design + Implementation
    

### Software Engineering:

- كل اللي فوق + Management + Process
    

---

# 3) Why Software Development is Hard?

المحاضرة قالت:

> Developing software is hard

### ليه؟

- مشاكل كبيرة ومعقدة
    
- requirements بتتغير
    
- لازم تعمل system شغال بكفاءة
    
- لازم يكون maintainable
    

---

# 4) Ways to Learn Software Development

المحاضرة قسمت التعلم لـ 3 طرق أساسية:

---

## (1) Reading Code & Designs

### الفكرة:

اقرأ كود ناس محترفة

### هتتعلم:

- Naming conventions
    
- Code structure
    
- Design thinking
    
- Problem breakdown
    

### مثال:

تشوف مشروع ASP.NET كبير → تفهم ازاي معمول layers

---

## (2) Writing Code

### الفكرة:

اكتب كود كتير

### هتستفيد:

- تجرب حلول مختلفة
    
- تغلط وتتعلم
    
- تبقى fluent
    

---

## (3) Thinking (Deep Thinking)

### الفكرة:

تفكر انت بتصمم الحل ازاي

### ده بيساعدك:

- تبني style خاص بيك
    
- تفهم patterns
    
- تطور طريقة التفكير
    

---

# 5) How to Develop Software Properly

المحاضرة دخلت في أهم جزء:

**ازاي تطور software صح**

---

## (1) Small, Well-Integrated Team

### الفكرة:

فريق صغير ومتناغم

### ليه؟

- communication أسهل
    
- كل واحد عارف دور التاني
    
- إنتاجية أعلى
    

### نقطة مهمة:

- الفريق اللي اشتغل مع بعض قبل كده → أفضل
    

---

## (2) Good Communication Inside Team

### مهم جدًا:

> Communication is critical

### ليه؟

- يمنع الأخطاء
    
- يخلي الشغل سريع
    
- يحل المشاكل بسرعة
    

### مقارنة:

- Team في نفس المكان → أفضل
    
- Team remote → communication أقل
    

---

## (3) Communication with Customer

### دي نقطة قوية جدًا:

- العميل لازم يكون قريب
    
- feedback سريع
    
- يشارك في testing
    

### ليه؟

- تتحكم في requirements
    
- تتجنب misunderstandings
    

---

## (4) A Process Everyone Buys Into

### يعني ايه؟

كل مشروع لازم يبقى ليه process

---

### نوعين:

#### 1. Plan-Driven (Large Projects)

- Documentation كتير
    
- قواعد صارمة
    
- control عالي
    

#### 2. Agile (Small Projects)

- مرونة
    
- Documentation أقل
    
- سرعة في التغيير
    

---

### فكرة مهمة:

مش معنى Agile = no process  
لا → فيه process بس أخف

---

## (5) Flexibility

### أهم جملة:

> No project goes as planned

### يعني:

- requirements هتتغير
    
- tools ممكن تفشل
    
- team ممكن يتغير
    

---

### الحل:

- Risk management
    
- Contingency plan
    

---

## (6) A Clear Plan

### لازم يبقى عندك plan

### بيشمل:

- Process
    
- Risks
    
- Tools
    
- Schedule
    
- Resources
    

---

### أهم نقطة:

> Everyone must agree on the plan

لو مش متفقين → المشروع هيفشل

---

## (7) Know Your Status

### يعني:

تعرف انت واقف فين في المشروع

---

### ازاي؟

- meetings
    
- stand-up daily (Agile)
    

---

### فايدة:

- كل الفريق synchronized
    
- المشاكل تظهر بدري
    

---

## (8) Be Honest About Delays

### نقطة مهمة جدًا:

> Developers are optimistic

يعني دايمًا يقول:

- "هخلص بكرة"
    
- "سهلة"
    

---

### الواقع:

بتتأخر

---

### الحل:

- قول بدري إنك متأخر
    
- بلغ الـ manager
    

---

### ليه؟

عشان يبقى عندك options:

- تمد الوقت
    
- تقلل features
    
- تزود ناس
    

---

## (9) Choose the Right Tools

### اختيار الأدوات بيعتمد على:

1. نوع المشروع
    
2. Target platform
    
3. Development platform
    
4. خبرة الفريق
    

---

### مثال:

- Web → ASP.NET / Node
    
- Mobile → Flutter / Android
    

---

### نقطة مهمة:

لو الفريق junior → خد tools بسيطة

---

## (10) You Don’t Know Everything

### فكرة قوية جدًا:

> You will discover new requirements

---

### ده اسمه:

**Requirements Churn**

---

### معناه:

- requirements بتتغير طول الوقت
    
- أولويات بتتبدل
    

---

### لازم تعمل:

- manage changes
    
- تبقى flexible
    

---

# الخلاصة النهائية للمحاضرة

المحاضرة كلها بتقول:

### Software Development مش كود بس

هو:

- Thinking
    
- Design
    
- Communication
    
- Teamwork
    
- Planning
    
- Flexibility
    

---

# أهم جمل تحفظها للامتحان

- Software Development = Analysis + Design + Implementation
    
- Programming is جزء من Software Development
    
- Communication is critical
    
- No project goes as planned
    
- Requirements change (Churn)
    
- Small teams are more productive
    
- Everyone must buy into the plan
    