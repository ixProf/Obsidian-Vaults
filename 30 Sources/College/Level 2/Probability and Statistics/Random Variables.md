---
title: "Random Variables"
aliases: []
type: source
status: active
domain: computer-science
tags: [source, computer-science, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

دالة بتربط كل نتيجة ممكنة لتجربة عشوائية (من S) بقيمة عددية حقيقية (في ℝ).
## **Types of Random Variables**
- Discrete Random Variables
	- يياخد **قيم منفصلة (معدودة)**، زي 0، 1، 2، 3... أو مجموعة صغيرة من القيم الممكنة.
		- X = {a,b,c,....}
	- has a probability mass function (PMF)
	- ال PMF دالة بترجع **احتمال كل قيمة محددة** بيأخذها **المتغير العشوائي المنفصل**.
	- شروطها ؟
		- F(x) $\geq$ 0
		- عناصر ال Random Variables / مجموعها = 1
		- Mean = Expectation = Average = Expected Value --> E(x) = $\mu$ = $\sum{xf(x)}$
		- Variance = Var(x) = $[E(x^2) - E(x)^2]$ -> $E(x)^2 = \mu^2$
		- Standard Devation $\sigma$ =$\sqrt{Var(x)}$
- Continuous Random Variable
	- متغير عشوائي بياخد **أي قيمة عددية حقيقية داخل مدى معين**، يعني عدد **غير نهائي** من القيم في صورة فترة $[1 ,-2)$
	- Haas a Probability Density Function (PDF)
		- بتمثل **كثافة الاحتمال** عند كل نقطة، للمتغيرات **المستمرة (Continuous)**.
		- شروطها؟
			$\int_{\forall x} f(x) \, dx$ = 1
			- التكامل على حدود ال random var = 1
			- E(x) = $\int_{\forall x}x f(x) \, dx$ 
			- Var(x) = $[E(x^2) - E(x)^2]$
			- Standard Devation $\sigma$ =$\sqrt{Var(x)}$
- Expectation
	- $E(ax+ b) = aE(x) + b$
	- $E(Const) = Const$
- Variance
	- $Var(ax + b) = a^2Var(x)$
	- $Var(Const) = 0$
- Moment Generating Function
	- $M(t) = E(e^{tx})$
	- $\frac{d^n}{dt^n} M(t) \bigg|_{t=0} E(x^n)$

