
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


