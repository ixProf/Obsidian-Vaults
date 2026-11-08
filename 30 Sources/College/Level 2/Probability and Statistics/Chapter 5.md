---
title: "Chapter 5"
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
Estimator
- Point Estimator (Single Value)
	- Population --> Sample
	- Pk              =     Sk
	- Pk = E(x^k)       Sk = $\frac {1}{n} \sum^{n}_{i=1} x^{k}_{i}$
	- عدد الباراميترز يكون عدد المعادلات

	- **Normal** : $\mu$  $\sigma^2$ --> 2 Equation
	- **Poisson**: $\lambda$ --> 1 Equation

- Interval Estimator (Range of Values):
	- p (L < $\theta$ < U) = 1 - $\alpha$  --> (Confidence Coefficient)
	- L is Lower Confidence Limit , U is Upper Confidence Limit
	- 90% , 99% , 95% is a confidence Level
	-  We Study the Confidence Interval for 
		1. Population Mean $\mu$
		2. Population Proportion p
		3. Population Variance $\sigma^2$
	1. how find mean?
		- $\sigma^2$ is known
			- $\text{Confidence Interval} = \bar{x} - Z_{\frac{1-\alpha}{2}} \cdot \frac{\sigma}{\sqrt{n}} <= \mu <=  \bar{x} + Z_{\frac{1-\alpha}{2}} \cdot \frac{\sigma}{\sqrt{n}}$ 
		- $\sigma^2$ is unknown
			- n >= 30
				- $\bar{x} - Z_{\frac{1-\alpha}{2}} \cdot \frac{S}{\sqrt{n}} <= \mu <=  \bar{x} + Z_{\frac{1-\alpha}{2}} \cdot \frac{S}{\sqrt{n}}$
			- n < 30
			- $\bar{x} - t_{\frac{1-\alpha}{2}} \cdot \frac{\sigma}{\sqrt{n}} <= \mu <=  \bar{x} + t_{\frac{1-\alpha}{2}} \cdot \frac{\sigma}{\sqrt{n}}$
	2. Proportion
		- $\hat{p} - Z_{\frac{1-\alpha}{2}} \cdot \sqrt{\frac{\hat{p} \hat{q}}{n}} < p < \hat{p} + Z_{\frac{1-\alpha}{2}} \cdot \sqrt{\frac{\hat{p} \hat{q}}{n}}$
		- $\hat{p}$ Proportion of sample $\hat{p} = \frac{x}{n} , \hat{q} = 1 - \hat{p}$
		- p is proportion of population (Probability of success)
	3. Variance
		- $\frac{(n-1) S^2}{X^{2}_{(\frac{\alpha}{2},n-1)}} \leq \sigma^2 \leq \frac{(n-1) S^2}{X^{2}_{(1-\frac{\alpha}{2},n-1)}}$




