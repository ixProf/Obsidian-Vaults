---
title: "Revision on Probability and Statistics"
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
`# Chapter 1

**Random (Statistical) Experiment:** An Experiment whose outcome cannot be predicted with certainty, before the experiment is run 
- التجربة الي ممكن نعرف نتائجها الممكنة لكن منقدرش نتوقع النتيجة الي هتحدث

**Sample Space (S)**: the set of all possible outcome of a random Experiment
- مجموعة من جميع النتائج الممكنة لتجربة عشوائية

وتنقسم لنوعين 
 - **Discrete Sample Space**
	 -  ==finite== or countably infinite set of outcome
	 - عدد محدود او غير محدود لكنه قابل للعد من النتائج (Rolling a Die)
- **Continuous Sample Space**
	- An i==nfinite set== of value, typically within an ==interval==
	- عدد لا نهائي من القيم وعادة ما يكون في شكل فترة "[]"

- Events in Probability :
	- is a subset of the sample space, representing one or more possible outcome
		- بإختصار بيقولك ان دي مجموعة فرعية من فضاء العينة، تمثل نتيجة واحدة او اكثر من النتائج
		- مثلا : عايز الاعداد الزوجية الممكنة في إلقاء حجر نرد مرة واحدة دا **يعتبر Event** 
			- E = {2,4,6}

- Operations on Event 
	- Intersection (∩)
		- عملية التقاطع ومن اسمها هي الحاجات المتشابهة بين اتنين
		- A = {1,2,3,4} , B={4,5,6} 
		- A ∩ B = {4}
	- Union (∪)
		- عملية الاتحاد وهي ضم الاتنين مع بعض لكن ميضمش التكرار
			- A ∪ B = {1,2,3,4,5,6}
	- Complement (A^c)
		- الحاجة الي مش موجودة في A اصلا. فمثلا:
			- The **Complement of Event A** is : {5,6} --> Rolling Die
			-  ال A كان فيها {1,2,3,4} و ال S كاملة فيها {1,2,3,4,5,6} فكدا فاضل اي مش في A؟ بالظبط فاضل {5,6}
- Disjoin Event:
	- Two Events that have no outcomes in common 
	- اختصرها عليك، اي احتمالين تقاطعهم فاي

- Conditional Probability (P(A∣B)) : Measure the probability of event of occurring given that another event has already occurred
	- قياس احتمال حدوث حدث معين بناءا على معرفة وقوع حدثًا آخر بالفعل
	- $P(A|B) = \frac{P(A \cap B)}{P(B)}$
		-  P(A∣B): احتمال وقوع الحدث **أ** بشرط وقوع الحدث **ب** (الاحتمال الشرطي).
		- P(A∩B): احتمال وقوع الحدثين **أ و ب معًا**.
		- P(B): احتمال وقوع الحدث **ب**.​
	- Ex:
		-  A = "Student passed math"
		- B = "Student attended tutoring"
		- Suppose:
			- 70% of students attended tutoring: $P(B)=0.7$
			- 60% of students passed math and attended tutoring: $P(A \cap B) = 0.6$
		- $$P(A|B) = \frac{P(A \cap B)}{P(B)}=\frac{0.7}{0.6} ​≈0.857$$

- Several Results
1. $A \cap \emptyset = \emptyset$ (The intersection of any event with the empty set is the empty set)
2. $A \cup \emptyset = A$ (The union of any event with the empty set is the event itself)
3. $A \cap S = A$ (The intersection of any event with the sample space is the event itself)
4. $A \cup S = S$ (The union of any event with the sample space is the sample space)
5. $A \cup A = A$ (The union of an event with itself is the event)
6. $A \cap A = A$ (The intersection of an event with itself is the event)
7. $A \cup A^c = S$ (The union of an event with its complement is the sample space)
8. $A \cap A^c = \emptyset$ (The intersection of an event with its complement is the empty set)
9. $(A^c)^c = A$ (The complement of the complement is the original event)
10. $(A \cup B)^c = A^c \cap B^c$ (De Morgan’s Law #1: the complement of a union is the intersection of the complements)
11. $(A \cap B)^c = A^c \cup B^c$ (De Morgan’s Law #2: the complement of an intersection is the union of the complements)

- Probability of an Event : measure of how likely an event is to occur. it always a value between 0 (impossible) and 1(certain)
	- $$P(E) = \frac{\text{Number of favorable outcomes}}{\text{Total number of possible outcomes}}$$
	- احتمال ظهور عدد زوجي في إلقاء حجر نرد ؟
		- Event = {2,4,6} = 3
		- Sample Space = {1,2,3,4,5,6} = 6
			- $P(E) =\frac{3}{6} = \frac{1}{2}$

- Axioms of Probability:
	1. Bounded Probability
		- $0 \leq P(A) \leq 1$ (The probability of any event is always between 0 and 1, inclusive)
	2. Total Probability (Probability of the Sample Space)
		- $P(S) = 1$ (The probability of the entire sample space is 1, as some outcome must occur)
	3. Additivity Rule
		- $P(A \cup B) = P(A) + P(B)$ if $A \cap B = \emptyset$ (The probability of the union of two mutually exclusive events equals the sum of their probabilities)
	4. Complement Rule :
		- $P(A^c) = 1-P(A)$
	5. Difference Rule :
		- $P(A-B)= P(A) - P(A \cap B)$
	6. General Addition:
		- $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
	7. Probability Difference Rule
		- $P(A^c \cap B) = P(B) - P(A \cap B)$

- Total Probability Rule : is a Fundamental concept in probability that helps us determine the probability of an event occurring by considering all possible ways.
	- Multiplication Rule :
		- $$P(A \cap B) = P(A) P(B|A)$$
		- For Any Two Events
			- $$P(B) = P(A) P(B|A) + P(A^c) P(B|A^c)$$
- Independent Events : Occurrence of one of them doesn't affect the occurrence of the other
	- if A , B is Independents Events 
		- $P(A \cap B) = P(A) P(B)$

- ✅ Laws and Properties of **Independent Events**
	1. **Multiplication Rule for Independent Events**
		If A and B are independent:
			$P(A \cap B) = P(A) \cdot P(B)$
			This is the most common and basic rule.
		
	2. **Definition of Independence Using Conditional Probability**
		Two events A and B are independent **if and only if**:
			$P(B|A) = P(B) \quad \text{or} \quad P(A|B) = P(A)$
			This means the occurrence of ==one event does **not affect** the probability== of the other.
		- Notes:
			- Independent events ==**can** happen at the same time.==

		    - **Mutually exclusive events** (disjoint events) ==**cannot** happen together.==

---

# Chapter 2 : Random Variables
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

---

# Chapter 3:
## **Binomial Distribution**

is used in an experiment that has only 2 outcomes

- coin :
	- head
	- tail
- dice
	- even
	- odd
- question answer
	- correct
	- incorrect
**The Random Variable in One trial** : 
- X =
	- Success : X = 1 --> p
	- Failure : X = 0  --> q = 1-p

**Binomial Distribution is considered a "PMF" where the random Variable takes discrete values** : X = 0 or 1 or n for n trial

### Bernoulli Distribution and Binomial Distribution :

Doing an experiment has only two outcomes :
- one Trial : ==Bernoulli Distribution==
- n Trial : ==Binomial Distribution==

- PMF in
	- Binomial : 
		- $f_x(x) = b(x;n,p) = \binom{n}{x}   p^x q^{n-x}$ --> x = 0,1,2,....n$
		- E(x) = np
		- V(x) = np(1-p) = npq
		- $\sigma = \sqrt{npq}$
		- $M_x(t) = [(1-p) + p e^t]^n$
	- Bernoulli :
		- $f_x(x) = p^x q^{1-x}$ --> x = 0,1
		-  E(x) = p
		- V(x) = p(1-p) = pq
		- $\sigma = \sqrt{pq}$
		- $M_x(t) = (1-p) + p e^t$
- p is probability of success
- q ............................... failure
- n is the number of trials
- x ................................... success

---

## Poisson Distribution

**Poisson Distribution** is used in an experiment that has given times or given physical objects
$\textbf{Poisson Distribution} \hspace{1cm} X \sim \mathcal{POI}(\lambda)$

- Poisson is considered a PMF :
	- *Pmf* = $f_x(x) = \frac{\lambda^x e^{-\lambda}}{x!}$
	- Expectation $E(x) = \lambda$
	- Variance  $V(x) = \lambda$
	- Standard Deviation $\sigma = \sqrt{\lambda}$
	- Moment $M_x(t) = e^{\lambda (e^t - 1)}$

---
## Normal Distribution :

**Normal Distribution** is used when the sample size is large, and the data is symmetrically distributed around the mean. It is continuous and follows the central limit theorem.

- Normal is considered a **PDF** (Probability Density Function):
- Normal Distribution is X $\textbf{Normal distribution} \hspace{1cm} X \sim \mathcal{N}(\mu, \sigma^2)$
    
    - _Pdf_ = $f_X(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{ -\frac{(x - \mu)^2}{2\sigma^2} }$
        
    - Expectation: $E(X) = \mu$
        
    - Variance: $V(X) = \sigma^2$
        
    - Standard Deviation: $\sigma$
        
    - Moment Generating Function: $M_X(t) = e^{\mu t + \frac{1}{2} \sigma^2 t^2}$
- Convert from Normal Distribution to Standard Normal Distribution
- $Z = \frac{X-\mu}{\sigma}$
     - Pdf = $f_X(x) = \frac{1}{ \sqrt{2\pi}} e^{ -\frac{1}{2} Z^{n} }$
    
    - Expectation: $E(X) = 0$
        
    - Variance: $V(X) = 1$
        
    - Standard Deviation: $1$
        
    - Moment Generating Function: $M_X(t) = e^{\frac{1}{2}t^{2}}$

![[Pasted image 20250530184107.png]]
---
## Gamma Distribution

is Considered a PDF where the random variable 0 < x < $\infty$

- Exponential Distribution is gamma distribution at $\alpha = 1$


### Gamma vs Exponential Distributions

| Property                | **Gamma Distribution**                                                         | **Exponential Distribution**                                                                     |
| ----------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Distribution            | $X \sim \text{Gam}(\theta, \alpha)$                                            | $X \sim \text{Exp}(\theta)$                                                                      |
| PDF                     | $f_X(x) = \dfrac{1}{\Gamma(\alpha)\theta^\alpha} x^{\alpha - 1} e^{-x/\theta}$ | $f_X(x) = \dfrac{1}{\theta} e^{-x/\theta} \quad \text{or} \quad f_X(x) = \lambda e^{-\lambda x}$ |
| Domain                  | $0 < x < \infty,\ \alpha > 0,\ \theta > 0$                                     | $0 < x < \infty,\ \theta > 0$                                                                    |
| Expectation $E(X)$      | $\alpha \theta$                                                                | $\theta$                                                                                         |
| Variance $V(X)$         | $\alpha \theta^2$                                                              | $\theta^2$                                                                                       |
| Std. Deviation $\sigma$ | $\sqrt{\alpha} \theta$                                                         | $\theta$                                                                                         |
| MGF $M_X(t)$            | $\left( \dfrac{1}{1 - \theta t} \right)^\alpha,\quad t < \dfrac{1}{\theta}$    | $\dfrac{1}{1 - \theta t},\quad t < \dfrac{1}{\theta}$                                            |


تعريف دالة جاما $$ \Gamma(\alpha) = \int_{0}^{\infty} x^{\alpha-1} e^{-x} \, dx $$

 خصائص دالة جاما 
 1. $\Gamma(1) = 1 \quad \Gamma\left(\frac{1}{2}\right) = \sqrt{\pi}$
 2. $\Gamma(\alpha) = (\alpha-1) \Gamma(\alpha-1) \implies (\alpha-1)(\alpha-2) \Gamma(\alpha-2)$
 3. $\Gamma(\alpha) = (\alpha-1)! \quad \text{for} \ \alpha \in \mathbb{Z}^+ \quad \Gamma(\alpha \in \{1, 2, 3, \dots\})$

---
## Chapter 4

**Population**: is a collection of all values that may be included in a sample.

**Sample**: is a collection of certain values chosen from the population.

**Random Sample**: is randomly selected sample values from population

n is the sample size

Statics is some individual value calculated from a sample

## The Sample Mean 
- $(\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i) - or (\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i)$
مجموعهم على عددهم.

## The Sample Variance
$(s^2 = \frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})^2) - or (s^2 = \frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})^2)$
## The Sample Maximum 
Xmax = max{x1,x2,.....xn} 

## The Sample Minimum 
Xmin = min{x1,x2,.....xn} 

## The Sample Range 
$(R = x_{\text{max}} - x_{\text{min}})$


| population mean                   | $E(x) = \mu$                            |
| --------------------------------- | --------------------------------------- |
| population variance               | $V(x) = \sigma^2$                       |
| population standard deviation     | $\sigma$                                |
| sample mean                       | $\bar{x}$                               |
| sample variance                   | $S^2$                                   |
| sample standard deviation         | $S$                                     |
| Expectation of Sample mean        | $E(\bar{x})= \mu$                       |
| Variance of Sample mean           | $V(\bar{x})= \frac{\sigma^2}{\sqrt{n}}$ |
| Standard deviation of Sample mean | $\frac{\sigma}{\sqrt{n}}$               |
| the Population proportion         | p                                       |
| the sample proportion             | $\hat{p} = \frac{x}{n}$                 |
| Expectation Sample mean           | E($\bar{x}$)= $\mu$                     |
| Variance of Sample mean           | V($\bar{x}$) = $\frac{\sigma^2}{n}$     |

**Central Limit Theorem**:
if E(x) and V(x) of Population distribution is $\sigma^2$
==then== the distribution of standaraized random variance $Z = \frac{\bar{x} - \mu}{\frac{\sigma}{\sqrt{n}}}$
Where:

- $(\bar{x})$ is the sample mean,
- $(\mu)$ is the population mean,
- $(\sigma)$ is the population standard deviation,
- (n) is the sample size.



for a population $\mu$ and $n$ are known
- $\sigma^2$ is known
	- $(\bar{X} \sim N(\mu, \sigma^2))$
	- $(Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}})$
- $\sigma^2$ is unknown
	- $(n < 30)$
		- $\bar{X} \sim t(n-1)$
		- $Z = \frac{\bar{X} - \mu}{s / \sqrt{n}}$
	- $(n \geq 30)$
		- $\bar{X} \sim N(\mu, s^2)$
		- $Z = \frac{\bar{X} - \mu}{s / \sqrt{n}}$
---
## Chapter 5
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

---
## Chapter 6 
**Hypothesis Testing** lets you check an assumption about the value of population unknown parameter before applying it to your data

- The Hypothesis can be tested for the mean $\mu$ , proportion p, or variance $\sigma^2$, as well as for the differences

- Null hypothesis $H_0$ (=)
	- is a statistical hypothesis that contains a statement of equality such as $\leq ,  = ,or \geq$
- Alternative hypothesis $H_1$ ( > or < or $\neq$)
	- A statement of inequality such as $< , \neq , >$
- if $H_0$ is rejected --> $H_1$ is accepted والعكس
![[Pasted image 20250530171200.png]]
**خطوات ال Hypothesis Testing**
1. Data
2. state hypothesis ($H_0$ , $H_1$)
3. Select Test Statistic (Z , T)
4. Calculate Test Statistic
	1. Z = $\frac {\bar{x} - \mu}{\frac{\sigma}{\sqrt{n}}}$
	2. T = $\frac {\bar{x} - \mu}{\frac{S}{\sqrt{n}}}$
5. Statistical Decision
	1. Reject $H_0$ : $H_1$ is true
		- $H_1$ 
			- $\mu < \mu_0$ --> $Z < -Z_{\alpha}$
			- $\mu > \mu_0$ --> $Z >Z_{\alpha}$
			- $\mu \neq \mu_0$ --> $Z < -Z_{\frac{\alpha}{2}} or Z > Z_{\frac{\alpha}{2}}$
	2. Don't Reject $H_0$
![[Pasted image 20250530183242.png]]

