---
title: "Threading"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

Executed Program
	Application starts on windows -> A Process with ID is Created
	-> CLR Creates A Single Thread to Execute Code
- Thread: is a Basic Unit to which the Operating System Allocates Processor Time
![[Pasted image 20260323080227.png]]
-----------------------------
```cs
using System;
using System.Diagnostics;

Process.GetCurrentProcess().Id
// Get the Process ID for this Executed Programming
Thread.CurrentThread.ManagedThreadId
// Get the Thread that program Executed on
```

Output:
![[Pasted image 20260323081208.png]]

هنا احنا بنتحكم فالسيستم علشان يظهر عندنا البروسيس والثريد الي بيشتغل عليهم البروجيكت

```cs
Console.WriteLine($" Processor Id: {Thread.GetCurrentProcessorId()}");
```

هنا بيظهرلك رقم البروسيسور الي شغال عليه البرنامج 

فكل مرة اقفل البرنامج وافتحه هيشغل البروجيكت على Process جديدة وعلى بروسيسور جديد


-  الثريد الواحد ممكن يشتغل على اكتر من بروسيسيس 

```cs
	Thread.Sleep(1000);
	// Method can be used to pause the execution of current thread for specific time in miliesecond
```

تقدر تستخدم الميثود دي علشان توقف تشغيل البرنامج لمدة معينة بالملي ثانية

تقدر تسمي الثريد بتاعتك زي ما انت عايز ودا بيساعدك ف عملية الDebugging , Tracing
![[Pasted image 20260323091214.png]]

زي ما هو موضح هنا

ممكن نشغل 2 ثريد فنفس الوقت بحيث يشتغلوا بشكل Parallel 
ولكن لما ثريد يخلص قبل التاني ف دا يعتمد على ال Thread Scheduler

علشان نعمل ثريد ونشغله هنعمل الآتي

```cs
Thread T1 = new Thread(wallet.RunRandomTransactions);
T1.Name = "T1";
Console.WriteLine($"After Declaration {T1.Name} State is {T1.ThreadState}");
T1.Start();
Console.WriteLine($"After Start {T1.Name} State is {T1.ThreadState}");
Thread T2 = new Thread(wallet.RunRandomTransactions);
T2.Name = "T2";
T2.Start();
```

![[Pasted image 20260323100612.png]]

Joining a Thread
	allows one thread to wait for the completion of another

بيخلي الثريد يستنى لحد ما الثريد التاني يخلص

```cs
	T1.Join();
```

![[Pasted image 20260323100756.png]]

امتى نستخدم ال join ؟

لو انت عايز النتيجة الخاصة بثريد معين علشان تستخدمها ف الثريد التانية، فدا بيسمحلك انك تشوف النتيجة الخاصة بالثريد الاولى وبعدها تخش على الثريد التانية
