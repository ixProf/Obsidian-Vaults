
![[Pasted image 20260622080413.png]]

- The Problem in Make initial State Final state
- Correct: > To obtain the complement of a complete DFA, keep ===the initial state unchanged ===and interchange final and non-final states. 

![[Pasted image 20260622080708.png]]

by applying this:
![[Pasted image 20260622081643.png]]

هتبقى D لان الي ممكن يتعامل مع اكتر من سترنج هو الي فيها استار فهتبقى D

---
![[Pasted image 20260622083233.png]]

- The power of Machine is defined by ==its temporary memory==
	- FA -> No temp memory
	- PushDown -> Stack and Medium power
	- Turing -> use RAM ==THE HIGHEST COMPUTING POWER==

![[Pasted image 20260622084012.png]]


ACC - R -> CCA سهلة

---

![[Pasted image 20260622091206.png]]

- الحالة الابتدائية ديما بنشاورلها بسهم، لكن النهائية عبارة عن دايرتين مزدوجتين

![[Pasted image 20260622091433.png]]

not a Regular ->  $aa^n b^n$
![[Pasted image 20260622091611.png]]

![[Pasted image 20260622094853.png]]

الحل :

![[Pasted image 20260622101633.png]]

السؤال بيقولك اي اقصى عدد من ال a يكفي علشان توصل للفاينال استيت، رسمنا الشكل من الجدول طلعلنا الشكل دا ف طبيعي اي عدد من ال a فهتبقى inf

---
![[Pasted image 20260622103015.png]]

في حالة ال NFA لازم على الاقل على الاقل يكون في مسار واحد فيه Final State فالاجابة دي غلط تبقى صح لو قال:

> An NFA accepts a string when there exists a computation that consumes the entire input and ends in a **final state**.


![[Pasted image 20260622103612.png]]

![[Pasted image 20260622103602.png]]

![[Pasted image 20260622104641.png]]

الدكتورة حسبتها هنا على انها Closure فبالتالي في ال Closure هنحسب المكان الي هو فيه والمكان الي بعدها
مثلا فحالتنا دي فهو قبل ما يتحرك كدا فنفس مكانها بعدها اتحرك للامدا ف هتروح ل q2

=={q1,q2}==

![[Pasted image 20260622120044.png]]