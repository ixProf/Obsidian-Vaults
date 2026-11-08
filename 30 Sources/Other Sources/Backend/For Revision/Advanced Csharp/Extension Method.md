---
title: "Extension Method"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages]
created: 2026-09-21
updated: 2026-09-22
source:
related: []
---
تمام، هكمل بنفس طريقتك ومن غير تغيير في التلخيص:

---

- اني اقدر انادي الميثود زي الاوبجيكت ميمبر مثال
    

```cs
class MyMath
{
	public static int add (int x , int y)
	{
		return x + y;
	}
}

int x = 10;
int y = 20;

Console.WriteLine(MyMath.Add(x,y)); // Normal Call

Console.WriteLine(x.Add(y)); // ERROR
// Trying to call as a Extension Method
```

في الحالة التانية هو مش هيشتغل

> Struct لا يرث ولا يورث

كيف احل المشكلة دي واخليها تنفع ك إكستنشن ميسود اكسيسأبل ؟

```cs
public static class MyMath
{
	public static int add (this int x , int y)
	{
		return x + y;
	}
}

int x = 10;
int y = 20;

Console.WriteLine(MyMath.Add(x,y)); // Normal Call

Console.WriteLine(x.Add(y)); // Correct
```

- انا اعمل this للبراميتر الاول الي انا هبعته المفروض ك فاريبل فيها ميبمر مثلا دا هيخليني قادر استخدم الفاريبل ك بيز وليها فانكشنز تابعة ليها (اكستنشن ميثود)
    
- لازم الكلاس يكون ستاتك علشان الاكستنشن ميثود لازم تكون Static member in static class
    

---

- تعريف الـ Extension Method

هي Static Method  
لكن بنضيف `this` قبل أول parameter  
وده بيخليها تتنادي كأنها method من نفس الكلاس

يعني:  
Extension Method = طريقة تضيف بيها method لكلاس موجود بدون ما تعدل عليه

---

- الفرق بين Static Method و Extension Method

Static Method:

- بتتنادي باستخدام اسم الكلاس
```cs
MyMath.Add(x,y);
```

- مش مرتبطة بأي object
- مجرد function عادية

Extension Method:

- بتتنادي باستخدام object نفسه

```cs
x.Add(y);
```

- بتخلي الـ object كأنه عنده method
- لازم أول parameter يكون قبله `this`

---

- أهم فرق سريع
    

Static → Class.Method()  
Extension → object.Method()

---

- نقطة مهمة

Extension Method مش بتعدل الكلاس فعليًا  
هي مجرد طريقة كتابة (syntax sugar)

يعني:

```cs
x.Add(y)
```

بتتنفذ داخليًا كدا:

```cs
MyMath.Add(x, y)
```

---

- ليه اشتغلت مع int رغم إنه Struct؟
	- لأن Extension Method مش inheritance
	- هي مجرد static method بتتعامل مع value
	- فمش محتاج يرث أو يتورث أصلاً

---