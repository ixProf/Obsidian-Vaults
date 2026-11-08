---
title: "Quiz Lec 3 (Mariam Mohamed)"
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

---

#### **Multiple Choice Questions (45 questions, 1 point each)** 

1. What will be the output type of this Python code? 

   ```python

   from time import time

   start = time()

   x = 5

   end = time()

   print(end - start)

   ```

   a) Integer 

   ==b) Float== 

   c) String 

   d) Error 

2. Why might the elapsed time from `time()` vary across runs? 

   a) CPU clock speed changes 

   b) Other processes share the CPU 

   c) Python interpreter slows down 

   d) Input size changes 

3. Which is a limitation of experimental analysis? 

   a) Independent of hardware 

   b) Requires full implementation 

   c) Considers all inputs 

   d) Measures primitive operations 

4. What is counted to measure an algorithm’s running time beyond experimental analysis? 

   a) CPU cycles 

   b) Wall clock time 

   c) Primitive operations 

   d) Memory usage 

5. Which case is typically used to characterize running time unless specified? 

   a) Best-case 

   b) Average-case 

   c) Worst-case 

   d) Random-case 

6. What is the value of `log₂ 8`? 

   a) 2 

   b) 3 

   c) 4 

   d) 8 

7. Simplify `log₂ (4n)` using logarithm rules. 

   a) `2 + log₂ n` 

   b) `log₂ n - 2` 

   c) `4 log₂ n` 

   d) `log₂ n + 4` 

8. What is `log₄ 16` equal to? 

   a) 1 

   b) 2 

   c) 4 

   d) 16 

9. What is the running time of an algorithm with a single loop over `n` items? 

   a) O(1) 

   b) O(n) 

   c) O(n²) 

   d) O(n log n) 

10. What is the value of `n log n` when `n = 8` (assume base-2 log)? 

    a) 24 

    b) 64 

    c) 8 

    d) 16 

11. What will be the output of this Python code? 

    ```python

    n = 4

    total = 0

    for i in range(n):

        for j in range(n):

            total += 1

    print(total)
```

    a) 4 

    b) 8 

    c) 12 

    d) 16 

12. What is the sum `1 + 2 + 3 + 4` using the formula `n(n+1)/2`? 

    a) 6 

    b) 10 

    c) 15 

    d) 20 

13. What is the degree of the polynomial `3n³ + 2n² + n + 5`? 

    a) 1 

    b) 2 

    c) 3 

    d) 4 

14. Simplify `2⁴ * 2³` using exponent rules. 

    a) 2⁷ 

    b) 2¹² 

    c) 2⁴ 

    d) 2¹ 

15. What is the sum of the geometric series `1 + 2 + 4 + 8` (up to 2³)? 

    a) 10 

    b) 15 

    c) 20 

    d) 25 

16. Which function grows fastest as `n` increases? 

    a) n log n 

    b) n² 

    c) 2ⁿ 

    d) log n 

17. What is the value of `n²` when `n = 16`? 

    a) 64 

    b) 128 

    c) 256 

    d) 512 

18. What will be the output of this Python code? 

    ```python

    def find_max(data):

        biggest = data[0]

        for val in data:

            if val > biggest:

                biggest = val

        return biggest

    print(find_max([3, 1, 4]))

    ```

    a) 1 

    b) 3 

    c) 4 

    d) Error 

19. What is the Big-Oh running time of `find_max` for a list of size `n`? 

    a) O(1) 

    b) O(n) 

    c) O(n²) 

    d) O(log n) 

20. For `f(n) = 5n + 3`, what is a valid `c` and `n₀` to show it is O(n)? 

    a) c = 5, n₀ = 1 

    b) c = 8, n₀ = 1 

    c) c = 3, n₀ = 5 

    d) c = 10, n₀ = 0 

21. What is the simplest Big-Oh notation for `7n² + 4n + 1`? 

    a) O(n) 

    b) O(n²) 

    c) O(n³) 

    d) O(n log n) 

22. Is `3n log n + 2n` O(n log n)? 

    a) Yes 

    b) No 

    c) Only for n < 2 

    d) Depends on log base 

23. What will be the output of this Python code with a syntax error? 

    ```python

    def test(n):

        for i in range(n:

            print(i)

    print(test(3))

    ```

    a) 0 1 2 

    b) Error 

    c) None 

    d) 3 

24. Is `4n + 5 log n` O(n)? 

    a) Yes 

    b) No 

    c) Only for n > 10 

    d) Depends on log base 

25. What is the Big-Oh notation for `2ⁿ + n²`? 

    a) O(n²) 

    b) O(2ⁿ) 

    c) O(n log n) 

    d) O(n) 

26. Is `5n² + 3n` Ω(n²)? 

    a) Yes 

    b) No 

    c) Only for n < 5 

    d) Depends on constants 

27. What is a valid `c` and `n₀` to show `2n log n` is Ω(n log n)? 

    a) c = 1, n₀ = 1 

    b) c = 2, n₀ = 2 

    c) c = 3, n₀ = 0 

    d) c = 0.5, n₀ = 1 

28. Is `6n log n + 4n` Θ(n log n)? 

    a) Yes 

    b) No 

    c) Only for n > 4 

    d) Depends on log base 

29. Which algorithm is asymptotically faster? 

    a) O(n²) 

    b) O(n log n) 

    c) O(2ⁿ) 

    d) O(n³) 

30. What is the maximum `n` for an O(n²) algorithm running in 1 second if each operation takes 2 μs? 

    a) 500 

    b) 707 

    c) 1000 

    d) 1414 

31. What is the Big-Oh time of `len(data)` for a Python list? 

    a) O(1) 

    b) O(n) 

    c) O(n²) 

    d) O(log n) 

32. What will be the output of this Python code? 

    ```python

    def prefix_average1(S):

        n = len(S)

        A = [0] * n

        for j in range(n):

            total = 0

            for i in range(j + 1):

                total += S[i]

            A[j] = total / (j + 1)

        return A

    print(prefix_average1([1, 2, 3])[1])

    ```

    a) 1 

    b) 1.5 

    c) 2 

    d) Error 

33. What is the Big-Oh running time of `prefix_average1` for a list of size `n`? 

    a) O(n) 

    b) O(n²) 

    c) O(n log n) 

    d) O(2ⁿ) 

34. What will be the output of this Python code? 

    ```python

    def prefix_average3(S):

        n = len(S)

        A = [0] * n

        total = 0

        for j in range(n):

            total += S[j]

            A[j] = total / (j + 1)

        return A

    print(prefix_average3([2, 4])[1])

    ```

    a) 2 

    b) 3 

    c) 4 

    d) Error 

35. What is the Big-Oh running time of `prefix_average3`? 

    a) O(1) 

    b) O(n) 

    c) O(n²) 

    d) O(n log n) 

36. What will be the output of this Python code? 

    ```python

    def disjoint1(A, B, C):

        for a in A:

            for b in B:

                for c in C:

                    if a == b == c:

                        return False

        return True

    print(disjoint1([1, 2], [2, 3], [4, 5]))

    ```

    a) True 

    b) False 

    c) Error 

    d) None 

37. What is the worst-case Big-Oh time of `disjoint1` for lists of size `n`? 

    a) O(n) 

    b) O(n²) 

    c) O(n³) 

    d) O(2ⁿ) 

38. What will be the output of this Python code? 

    ```python

    def disjoint2(A, B, C):

        for a in A:

            for b in B:

                if a == b:

                    for c in C:

                        if a == c:

                            return False

        return True

    print(disjoint2([1, 2], [3, 4], [5, 6]))

    ```

    a) True 

    b) False 

    c) Error 

    d) None 

39. What is the worst-case Big-Oh time of `disjoint2` for lists of size `n`? 

    a) O(n) 

    b) O(n²) 

    c) O(n³) 

    d) O(n log n) 

40. Which problem is NP-complete? 

    a) Finding the maximum of a list 

    b) Boolean Satisfiability (SAT) 

    c) Prefix averages 

    d) Three-way disjointness 

41. What does it mean if a problem is NP-complete? 

    a) It has no solution 

    b) It is in NP and every NP problem reduces to it 

    c) It runs in O(n) time 

    d) It is undecidable 

42. Which is an NP-complete problem? 

    a) Set Partition 

    b) Finding the minimum element 

    c) Linear search 

    d) Constant-time lookup 

43. What is true about the Halting Problem? 

    a) It is NP-complete 

    b) It is decidable 

    c) It is undecidable 

    d) It runs in O(n) time 

44. What happens in the Halting Problem proof if `HM(CM, CM)` predicts halt? 

    a) CM halts 

    b) CM loops forever 

    c) HM crashes 

    d) No contradiction 

45. What will be the output of this Python code with an infinite loop? 

    ```python

    def loop_test(n):

        while n > 0:

            n += 1

        return n

    print(loop_test(1))

    ```

    a) 1 

    b) 0 

    c) Error 

    d) No output (infinite loop) 

---

### **Answer Key** 

1. b) Float 

2. b) Other processes share the CPU 

3. b) Requires full implementation 

4. c) Primitive operations 

5. c) Worst-case 

6. b) 3 

7. a) `2 + log₂ n` 

8. b) 2 

9. b) O(n) 

10. a) 24 

11. d) 16 

12. b) 10 

13. c) 3 

14. a) 2⁷ 

15. b) 15 

16. c) 2ⁿ 

17. c) 256 

18. c) 4 

19. b) O(n) 

20. b) c = 8, n₀ = 1 

21. b) O(n²) 

22. a) Yes 

23. b) Error (missing closing parenthesis) 

24. a) Yes 

25. b) O(2ⁿ) 

26. a) Yes 

27. b) c = 2, n₀ = 2 

28. a) Yes 

29. b) O(n log n) 

30. b) 707 

31. a) O(1) 

32. b) 1.5 

33. b) O(n²) 

34. b) 3 

35. b) O(n) 

36. a) True 

37. c) O(n³) 

38. a) True 

39. b) O(n²) 

40. b) Boolean Satisfiability (SAT) 

41. b) It is in NP and every NP problem reduces to it 

42. a) Set Partition 

43. c) It is undecidable 

44. b) CM loops forever 

45. d) No output (infinite loop) 

---