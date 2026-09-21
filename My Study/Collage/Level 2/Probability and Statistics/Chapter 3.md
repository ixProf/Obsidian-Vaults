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
