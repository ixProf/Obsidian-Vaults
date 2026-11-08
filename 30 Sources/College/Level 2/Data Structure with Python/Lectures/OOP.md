---
title: "OOP"
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
## **البرمجة الكائنية التوجه (OOP) في بايثون**

البرمجة الكائنية (Object-Oriented Programming – OOP) هي **نموذج برمجي** يعتمد على **الكائنات (Objects)** لتنظيم الكود بطريقة تجعل تطوير التطبيقات أسهل وأفضل من حيث **إعادة الاستخدام، التنظيم، والتوسعة**.

### **1. ما هي البرمجة الكائنية (OOP)؟**

هي طريقة لكتابة البرامج تعتمد على **الكائنات (Objects)**، بحيث يتم **جمع البيانات والوظائف المتعلقة بها داخل كائن واحد** بدلاً من نشرها في كل مكان في الكود.

#### **أهم المفاهيم الأساسية في OOP:**

1. **الكلاس (Class):**
    
    - هو **قالب (Blueprint)** لإنشاء الكائنات.
        
    - يحدد **البيانات (Attributes)** والوظائف (Methods) الخاصة بالكائن.
        
2. **الكائن (Object):**
    
    - هو **نسخة (Instance)** من الكلاس.
        
    - يحتوي على البيانات والوظائف المحددة داخل الكلاس.
        
3. **التغليف (Encapsulation):**
    
    - هو إخفاء التفاصيل الداخلية للكود، بحيث لا يمكن الوصول إلى البيانات مباشرة، بل من خلال وظائف مخصصة.
        
4. **الوراثة (Inheritance):**
    
    - هي **إمكانية كلاس جديد أن يرث الخصائص والوظائف من كلاس موجود**.
        
    - تجعل الكود أكثر **إعادة استخدام** وتنظيمًا.
        
5. **تعدد الأشكال (Polymorphism):**
    
    - يسمح **بتعريف دوال بنفس الاسم في كائنات مختلفة** بحيث تعمل بشكل مختلف بناءً على السياق.
        
6. **التجريد (Abstraction):**
    
    - هو **إخفاء التفاصيل غير المهمة** وإظهار فقط ما يحتاجه المستخدم النهائي.
        

---

### **2. إنشاء كلاس وكائن في بايثون**

**إنشاء كلاس (`Class`) بسيط:**

```python
class Car:
    def __init__(self, brand, model, year):  # Constructor
        self.brand = brand
        self.model = model
        self.year = year

    def display_info(self):
        print(f"Car: {self.brand} {self.model} - {self.year}")

# إنشاء كائن (Object) من الكلاس
car1 = Car("Toyota", "Corolla", 2022)
car1.display_info()  # Car: Toyota Corolla - 2022
```

- `Car`: اسم الكلاس.
    
- `__init__`: **المُنشئ (Constructor)** – وظيفة خاصة يتم تنفيذها عند إنشاء كائن جديد.
    
- `self.brand, self.model, self.year`: **خصائص (Attributes)** تخزن البيانات الخاصة بالكائن.
    
- `display_info()`: **دالة (Method)** تعرض معلومات السيارة.
    

---

### **3. الكونستراكتور (Constructor)**

**ما هو الـ `__init__`؟**

- هو **دالة خاصة (Special Method)** في بايثون، يتم تنفيذها تلقائيًا عند إنشاء كائن جديد.
    
- يستخدم **لتهيئة (Initialize) الكائن ببياناته**.
    

**مثال عملي:**

```python
class Person:
    def __init__(self, name, age):  # المُنشئ
        self.name = name
        self.age = age

    def introduce(self):
        print(f"Hi, my name is {self.name} and I am {self.age} years old.")

# إنشاء كائن من الكلاس
p1 = Person("Ali", 25)
p1.introduce()  # Hi, my name is Ali and I am 25 years old.
```

**كيف يعمل؟**

- `__init__` يتم استدعاؤه **تلقائيًا** عند إنشاء كائن `Person("Ali", 25)`.
    
- يتم تخزين القيم في `self.name` و `self.age` ليتم استخدامها داخل الكلاس.
    

---

### **4. التغليف (Encapsulation)**

التغليف هو **إخفاء البيانات وجعل الوصول إليها ممكنًا فقط عبر وظائف خاصة**.

#### **المستويات في بايثون:**

1. **عامة (Public):** يمكن الوصول إليها من أي مكان.
    
2. **محمية (Protected `_var`):** يُفضل عدم تعديلها خارج الكلاس.
    
3. **خاصة (Private `__var`):** لا يمكن الوصول إليها إلا من داخل الكلاس.
    

**مثال:**

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner        # Public
        self._balance = balance   # Protected
        self.__pin = "1234"       # Private

    def deposit(self, amount):
        self._balance += amount
        print(f"{self.owner} deposited {amount}. New balance: {self._balance}")

    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
            print(f"{self.owner} withdrew {amount}. Remaining balance: {self._balance}")
        else:
            print("Insufficient balance!")

# إنشاء كائن
account = BankAccount("Ahmed", 1000)
account.deposit(500)  # Ahmed deposited 500. New balance: 1500
account.withdraw(700) # Ahmed withdrew 700. Remaining balance: 800
```

- `self.owner`: **متغير عام (Public)**.
    
- `self._balance`: **متغير محمي (Protected)**.
    
- `self.__pin`: **متغير خاص (Private)** لا يمكن الوصول إليه مباشرة.
    

---

### **5. الوراثة (Inheritance)**

الوراثة تسمح لكلاس جديد **بوراثة خصائص ودوال كلاس موجود**.

**مثال:**

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def make_sound(self):
        print("Some generic sound...")

# الكلاس الجديد يرث من الكلاس القديم
class Dog(Animal):
    def make_sound(self):
        print(f"{self.name} says: Woof!")

# إنشاء كائنات
animal = Animal("Unknown")
animal.make_sound()  # Some generic sound...

dog = Dog("Buddy")
dog.make_sound()  # Buddy says: Woof!
```

- `Dog` ورث `__init__` من `Animal`.
    
- قام `Dog` **بتخصيص (Override)** الدالة `make_sound()`.
    

---

### **6. تعدد الأشكال (Polymorphism)**

يعني إمكانية **استخدام نفس الدالة لكن بسلوك مختلف حسب الكلاس**.

**مثال:**

```python
class Bird:
    def fly(self):
        print("Bird is flying...")

class Penguin(Bird):
    def fly(self):
        print("Penguins can't fly, but they can swim!")

# إنشاء كائنات
sparrow = Bird()
penguin = Penguin()

# استدعاء نفس الدالة لكن بنتائج مختلفة
sparrow.fly()  # Bird is flying...
penguin.fly()  # Penguins can't fly, but they can swim!
```

- نفس الدالة `fly()` لكن **كل كلاس يطبقها بطريقته**.
    

---

### **7. التجريد (Abstraction)**

هو **إخفاء التفاصيل الداخلية وإظهار فقط ما يحتاجه المستخدم**.

**في بايثون نستخدم `ABC` لإنشاء كلاس مجرد (Abstract Class):**

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self):
        pass  # دالة مجردة

class Car(Vehicle):
    def start(self):
        print("Car engine started!")

# car = Vehicle()  # خطأ: لا يمكن إنشاء كائن من كلاس مجرد
car = Car()
car.start()  # Car engine started!
```

- `@abstractmethod` تجعل **الدالة إلزامية** في الكلاسات الفرعية.
    
- لا يمكن إنشاء كائن من كلاس مجرد.
    

---

### **ملخص OOP في بايثون**

✔ **كلاس (Class) وكائنات (Objects).**  
✔ **الكونستراكتور (`__init__`).**  
✔ **التغليف (Encapsulation).**  
✔ **الوراثة (Inheritance).**  
✔ **تعدد الأشكال (Polymorphism).**  
✔ **التجريد (Abstraction).**

---

## 🔹 الفرق بين **Shallow Copy** و **Deep Copy**

### ✅ أولًا: يعني إيه **Shallow Copy (نسخ سطحي)**؟

النسخ السطحي بيعمل **نسخة جديدة من الكائن الأساسي، لكن المصفوفات أو القوائم أو الكائنات الداخلية بتفضل تشير لنفس البيانات الأصلية**، يعني أي تعديل عليهم بيتطبق على الاتنين.

🔍 **مثال عملي:**

```python
import copy

list1 = [[1, 2], [3, 4]]
list2 = copy.copy(list1)  # نسخ سطحي

list1[0][0] = 100  # تعديل على القائمة الأصلية
print(list2)  # النتيجة: [[100, 2], [3, 4]] ← اتغيرت مع الأصل
```

- `copy.copy(list1)` **عمل نسخة جديدة، لكن القوائم الداخلية فضلت بنفس العنوان في الذاكرة**.
    
- لما غيرنا `list1[0][0]`، التغيير حصل في `list2` كمان لأنهم بيشاركوا نفس القوائم الداخلية.
    

---

### ✅ ثانيًا: يعني إيه **Deep Copy (نسخ عميق)**؟

النسخ العميق بيعمل ==**نسخة مستقلة تمامًا من الكائن وجميع الكائنات الداخلية جواه**==، وده معناه إن التعديلات على الأصل مش هتأثر في النسخة الجديدة.

🔍 **مثال عملي:**

```python
list1 = [[1, 2], [3, 4]]
list3 = copy.deepcopy(list1)  # نسخ عميق

list1[0][0] = 100  # تعديل القائمة الأصلية
print(list3)  # النتيجة: [[1, 2], [3, 4]] ← مفيش تغيير
```

- `copy.deepcopy(list1)` **عمل نسخة جديدة ومستقلة بالكامل**.
    
- أي تعديل على `list1` **مش هيأثر في `list3`** لإن كل حاجة جديدة ومستقلة.
    

---

## 🔥 الفرق الرئيسي بين Deep Copy , Shallow Copy

| **الميزة**                     | **Shallow Copy (سطحي)**           | **Deep Copy (عميق)**           |
| ------------------------------ | --------------------------------- | ------------------------------ |
| **البيانات الأصلية**           | **بيتشارك نفس الكائنات الداخلية** | **كل حاجة جديدة مستقلة**       |
| **التعديل على الكائن الداخلي** | **يأثر على النسخة الأصلية**       | **لا يأثر على النسخة الأصلية** |
| **الأداء**                     | أسرع لأنه بس بيعمل مرجع           | أبطأ لأنه بينسخ كل حاجة جديدة  |

---

## 📌 امتى تستخدم **Shallow Copy** وامتى تستخدم **Deep Copy**؟

✅ **استخدم Shallow Copy لما تكون عايز تحتفظ بمرجع للكائنات الداخلية** علشان أي تعديل يظهر في الأصل والنسخة.  
✅ **استخدم Deep Copy لو كنت عايز نسخة مستقلة تمامًا** علشان أي تعديل في الأصل **ميأثرش** على النسخة الجديدة.