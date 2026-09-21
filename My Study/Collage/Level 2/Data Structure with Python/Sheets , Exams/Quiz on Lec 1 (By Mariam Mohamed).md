
#### **Multiple Choice Questions (45 questions, 1 point each)** 

1. What will be the output of this Python code? 


```python
   t1 = 50.5 # first

   t2 = t1 # t2 = 50.5

   t1 = t1 + 10
   # if there's t3 = ti
   # t3 will be 60.5

   print(t2) #--> 50.5
```

   ==a) 50.5== 

   b) 60.5 

   c) Error 

   d) None 

2. Which Python type is ==immutable==? 
==*Immutable types " bool, int, float, tuple, str, frozenset "*==

   a) list 

   b) set 

   c) ==tuple== 

   d) dict 

3. What does `bool([])` return? 

   a) True 

   b) ==False== 

   c) Error 

   d) None 

4. What will be the output of this Python code? 

```python
   print(int(3.99)) 
```

   ==a) 3== 

   b) 4 

   c) 3.99 

   d) Error 

5. What will be the output of this Python code? 

   ```python
   s = """hello
   world"""

   print(s)
```

   a) "hello world" 

   b) "hello\nworld" 

   ==c) hello\nworld (with newline)== 

   d) Error 

6. What is the correct syntax for a ==single-element tuple==? 

   a) (17) 

   ==b) (17,)== 

   c) [17] 

   d) {17} 

7. What will be the output of this Python code? 

```python

   print(set("hello")) # unorderd , changable and No Dublicated
```


   a) {'h', 'e', 'l', 'l', 'o'} 

   ==b) {'h', 'e', 'l', 'o'}== 

   c) "hello" 

   d) Error 

8. What will be the output of this Python code? 

```python
   s = {"apple", "banana", "cherry", True, 1}

   print(len(s))
```

   a) 5 

   ==b) 4== 

   c) 3 

   d) Error 

9. What will be the output of this Python code? 

```python
   s1 = {"apple", "banana"}
   s2 = {"banana", "cherry"}
   
   print(s1 | s2) # A | B Union
```
   a) {"apple", "banana"} 

   ==b) {"apple", "banana", "cherry"}== 

   c) {"banana"} 

   d) Error 

10. What will be the output of this Python code? 
    ```python
    fs = frozenset([1, 2, 3]) # frozenset --> unchangable

    fs.add(4)

    print(fs)
```


    a) {1, 2, 3, 4} 

    b) {1, 2, 3} 

    ==c) Error== 

    d) None 

11. What will be the output of this Python code? 


    ```python

    d = {"a": 1, "b": 2}

    d["a"] = 3

    print(d)

```

    a) {"a": 1, "b": 2}

    ==b) {"a": 3, "b": 2}== 

    c) Error 

    d) None 

12. What will be the output of this Python code? 

    ```python

    d = {"brand": "Ford", "year": 1964, "year": 2020}

    print(d["year"]) # --> THE LASTEST

    
```

    a) 1964 

    ==b) 2020== 

    c) Error 

    d) [1964, 2020] 

13. What will be the output of this Python code? 

    ```python

    lst = ["apple", "banana"]

    lst[1] = "cherry"

    print(lst)

    ``` 
    ```

    a) `["apple", "banana"]` 

    ==b) `["apple", "cherry"]`== 

    c) Error 

    d) None 

14. What will be the output of this Python code? 

    ```python

    x = [1, 2, 3]

    y = x

    print(x is y)
    ```

    ==a) True== 

    b) False 

    c) Error 

    d) None 

15. What will be the output of this Python code? 

    ```python
    x = [1, 2, 3]

    y = [1, 2, 3]

    print(x == y)

    ```

    a) ==True== 

    b) False 

    c) Error 

    d) None 

16. What will be the output of this Python code? 

    ```python

    print(27 // 4) # int divition
 ```

    a) 6.75 

    ==b) 6== 

    c) 7 

    d) Error 

17. What will be the output of this Python code? 

    ```python
    print(10 & 4)
    ```

    ==a) 0== 

    b) 4 

    c) 10 

    d) Error 

18. What will be the output of this Python code? 

    ```python
    lst = [0, 1, 2, 3, 4]

    print(lst[1:4]) # --> 4 not assume
```

    a) [0, 1, 2] 

    ==b) [1, 2, 3]== 

    c) [1, 2, 3, 4] 

    d) Error 

19. What will be the output of this Python code? 

    ```python
    j = 0

    data = [1, 2, 3]

    while j < len(data) and data[j] != 2:

        j += 1

    print(j)
    ```

    a) 0 

    ==b) 1== 

    c) 2 

    d) Error 

20. What will be the output of this Python code? 

    ```python

    total = 0

    for val in [1, 2, 3]:

        total += val
        # val = 1 
        # total = 0 + 1 = 1
        # val = 2 
        # total = 1 + 2 = 3
        # val = 3
        # total = 3 + 3 = 6

    print(total)
    ```

    a) 1 

    b) 3 

    ==c) 6== 

    d) Error 

21. What will be the output of this Python code? 

    ```python

    def count(data, target):

        n = 0

        for item in data:

            if item == target:

                n += 1

        return n

    print(count([1, 2, 2, 3], 2))
    ```

    a) 1 

    ==b) 2== 

    c) 3 

    d) Error 

22. What will be the output of this Python code? 

    ```python

    def foo(a, b=15):

        return a + b

    print(foo(5))


    ```

    a) 5 

    b) 15 

    ==c) 20== 

    d) Error 

23. What will be the output of this Python code? 

    ```python

    def my_function(child1, child2):

        print(child2)

    my_function(child2="b", child1="a")
    ```

    a) "a" 

    ==b) "b"== 

    c) Error 

    d) None 

24. What will be the output of this Python code? 

    ```python

    print(divmod(10, 3)) # (A // B , A % B)

    ```

    ==a) (3, 1)== 

    b) (3, 3) 

    c) 3.33 

    d) Error 

25. What will be the output of this Python code (assuming `sample.txt` exists)? 

    ```python

    fp = open("sample.txt")

    print(fp.read(2))

    fp.close()

    ```

    a) ==First two bytes of file== 

    b) Entire file content 

    c) Error 

    d) None 

26. What will be the output of this Python code? 

    ```python

    try:

        print(5 / 0)

    except ZeroDivisionError:

        print("Error")

    ```

    a) 5 

    b) 0 

    ==c) Error== 

    d) Crash 

27. What will be the output of this Python code? 

    ```python

    myit = iter("abc") # ['a','b','c']

    print(next(myit))

    ```

    a) "abc"

    ==b) "a"== 

    c) Error 

    d) None 

28. What will be the output of this Python code? 

    ```python
class MyNumbers:
  def __iter__(self):
            self.a = 1
            return self
  def __next__(self):
            x = self.a
            self.a += 1
            return x
myiter = iter(MyNumbers())
print(next(myiter))

    ```

    a) 0 

    ==b) 1== 

    c) Error 

    d) None 

29. What will be the output of this Python code? 

    ```python

    def factors(n):

        for k in range(1, n+1):

            if n % k == 0:

                yield k

    print(list(factors(4)))

    ```

    ==a) [1, 2, 4]== 

    b) [1, 2, 3, 4] 

    c) Error 

    d) None 

30. What will be the output of this Python code? 

    ```python

    result = "positive" if 5 > 0 else "negative"

    print(result)

    ```

    ==a) "positive"== 

    b) "negative" 

    c) Error 

    d) None 

31. What will be the output of this Python code? 

    ```python

    squares = [k*k for k in range(1, 4)]

    print(squares)

    ```

    ==a) [1, 4, 9]== 

    b) [0, 1, 4] 

    c) Error 

    d) None 

32. What will be the output of this Python code? 

    ```python

    a, b = 1, 2

    print(a, b)

    ```

    a) 1 2 

    b) (1, 2) 

    c) Error 

    d) None 

33. What will be the output of this Python code? 

    ```python

    x, y, z = [4, 5, 6]

    print(y)

    ```

    a) 4 

    ==b) 5== 

    c) 6 

    d) Error 

34. What will be the output of this Python code? 

    ```python

    scream = print

    scream("Hi")

    ```

    a) ==Hi== 

    b) Error 

    c) "Hi" 

    d) None 

35. What will be the output of this Python code? 

    ```python

    from math import pi

    print(pi)

    ```

    a) 3.14 

    ==b) 3.14159... (full precision)== 

    c) Error 

    d) None 

36. What will be the output of this Python code with a syntax error? 

    ```python

    import math

    print(math.sqrt 4)

    ```

    a) 2.0

    b) 4 

    ==c) Error== 

    d) None 

37. Which module provides random number generation? 

    a) math 

    ==b) random== 

    c) sys 

    d) os 

38. What will be the output of this Python code (assume seeded for consistency)? 

    ```python

    import random

    random.seed(1)

    print(random.randint(1, 3))

    ```

    ==a) 1== 

    b) 2 

    c) 3 

    d) Varies 

39. What will be the output of this Python code? 

    ```python

    s = frozenset([1, 2])

    print(s | {3})

    ```

    ==a) {1, 2, 3}== 

    b) {1, 2} 

    c) Error 

    d) None 

40. What will be the output of this Python code? 

    ```python

    d = dict(a=1, b=2)

    d.pop("a")

    print(d)

    ```

    a) {"a": 1, "b": 2} 

    ==b) {"b": 2}== 

    c) Error 

    d) None 

41. What will be the output of this Python code? 

    ```python

    lst = [1, 2, 3]

    del lst[1]

    print(lst)

    ```

    a) [1, 2, 3] 

    ==b) [1, 3]== 

    c) Error 

    d) None 

42. What will be the output of this Python code? 

    ```python

    print("amp" in "example")

    ```

    ==a) True== 

    b) False 

    c) Error 

    d) None 

43. What will be the output of this Python code? 

    ```python

    for x, y in [(1, 2), (3, 4)]:

        print(x)

    ```

    ==a) 1 2== 

    b) 1 3 

    c) Error 

    d) None 

44. What will be the output of this Python code? 

    ```python

    import random

    lst = ["a", "b", "c"]

    print(random.choice(lst))

    ```

    a) "a" 

    b) "b" 

    c) "c" 

    ==d) Varies== 


45. What will be the output of this Python code? 

    ```python
    def compute_gpa(grades):

        points = {"A": 4.0, "B": 3.0}

        total = sum(points[g] for g in grades)

        return total / len(grades)

    print(compute_gpa(["A", "B"]))
```

    ==a) 3.5== 

    b) 4.0 

    c) Error 

    d) None 





---