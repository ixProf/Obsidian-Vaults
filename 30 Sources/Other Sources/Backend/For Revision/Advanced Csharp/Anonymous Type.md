---
title: "Anonymous Type"
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

- في السي شارب انا لازم ادي كل متغير النوع بتاعه

- الانونيموس تايب هو هيديلك تايب ملوش اسم تقدر تستخدمه

```cs
var e2 = new { id = 2, name = "Ali" };
```

هنا عملك تايب اوبجيكت كدا بتتضمن فاريبل ليها بروبيرتي 

تحت كلاس اساسي هو الانونيموس كلاس
![[Pasted image 20260416184042.png]]

هنا لما سألته على التايب بتاع الفاريبل طلعلي دي متضمن كمان 
0 دا رقم الانونيموس تايب وهو اول واحد ف علشان كدا الاندكس 0
2 دا عدد البروبيرتي الي يتضمنها التايب دا 
وما بين البراكتس هو الداتا تايب للبروبيرتيز

ونقدر نأكسيز البروبيرتي كأننا عاملين اوبجكت من كلاس عادي

```cs
var e2 = new { Id = 2, Name = "Ali" };
Console.WriteLine(e2.Id);
Console.WriteLine(e2.Name); 
```

- لو حبينا نعمل فاريبل جديد وانينموس تايب كمان بس هيكون نفس البروبيرتي بتاعت اول انينموس ف هيبقى نفس الكلاس كأننا عملنا 2 اوبجيكت من كلاس واحد ==طالما نفس البروبيرتي==

```cs
var e2 = new {Id = 1 , Name = "Prof"}
var e3 = {Id = 2, Name = "Mahmoud" }

Console.WriteLine(e2.GetType().Name);
Console.WriteLine(e3.GetType().Name);
```
output:
![[Pasted image 20260416190130.png]]

- متقدرش تدي قيمة للبروبيرتي الي انت عاملها في الانونيموس تايب غير لما تعدلها بنفسك لأن الكلاس مفيهوش Setter كل الي فيه getter
- الاوبجيكت الي اتنشأ هو Immutable Object ودا اوبجكت انا مقدرش اغير فيه حاجة 

الانونيموس تايب عامل اوفرريد لكل من
- Equals
- GetHashCode
- ToString
