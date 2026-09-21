
---
### **🔹 Python is an object-oriented language, and classes form the basis for all data types.**

📌 بايثون هي **لغة كائنية التوجه (Object-Oriented Language)**، وده معناه إن كل حاجة في بايثون عبارة عن **كائن (Object)**، سواء كان **رقم، نص، قائمة، أو حتى دالة**.


✅ الكائن (Object) هو **وحدة بيانات تحتوي على خصائص (Attributes) وسلوكيات (Methods)**.  
✅ في بايثون، **كل البيانات هي كائنات**، حتى الأنواع البسيطة زي الأعداد الصحيحة (`int`) أو النصوص (`str`).  
✅ **الفئات (Classes)** هي القوالب اللي بنستخدمها **لإنشاء الكائنات**.

---

### **🔹 Identifiers in Python are case-sensitive.**

📌 المعرفات (Identifiers) في بايثون **حساسة لحالة الأحرف (Case-Sensitive)**، وده معناه إن `variable` و `VARIABLE` يعتبروا **متغيرين مختلفين تمامًا**.

#### **🔹 Example:**

```python
name = "Ali"
NAME = "Hassan"
print(name)  # Ali
print(NAME)  # Hassan
```

📢 **التوضيح:**

- `name` و `NAME` **مش نفس المتغير**، لأن بايثون بتفرق بين الحروف الكبيرة والصغيرة.
- ده مهم جدًا عشان لو غلطت في كتابة اسم متغير بحرف كبير أو صغير، ممكن يحصل خطأ غير متوقع.

---

### **🔹 Python is a dynamically typed language (Unlike Java, C++).**

📌 بايثون لغة **ديناميكية التحديد (Dynamically Typed)**، وده معناه إنك **مش محتاج تصرّح بنوع المتغير** قبل ما تستخدمه، وبيتم تحديد النوع **تلقائيًا حسب القيمة** اللي بتحطها فيه.

#### **🔹 Example:**

```python
x = 5      # عدد صحيح (int)
x = "Ali"  # يتحول لنص (string) تلقائيًا
print(x)
```

📢 **التوضيح:**

- في لغات زي **Java و C++** لازم تصرّح بنوع المتغير (`int x = 5;`) لكن في بايثون **مش محتاج**.
- لو غيرت قيمة `x` إلى `"Ali"`، بايثون **هيغير النوع تلقائيًا من عدد صحيح إلى نص**.
- **ده بيخلي بايثون لغة مرنة جدًا**، لكن ممكن يسبب أخطاء لو ما كنتش واخد بالك من التغييرات في النوع.

---

### **🔹 A class is immutable if each object of that class has a fixed value upon instantiation that cannot subsequently be changed.**

📌 الفئة بتكون **غير قابلة للتغيير (Immutable)** لو **كل كائن (Object) بيتعمل منها بيكون ليه قيمة ثابتة، ومتقدرش تغيّرها بعد ما يتعمل**.  
📌 يعني لو أنشأت كائن من النوع ده، **مش هتقدر تعدّل عليه**، ولو حاولت تغيّره، **بايثون هتعمل كائن جديد بدل ما تعدّل القديم**.

#### **🔹 Example:**

```python
x = 10.5  # 'x' بيشير لكائن float فيه 10.5
y = x      # 'y' بيشير لنفس الكائن اللي x بيشاور عليه

x = x + 1  # هنا بايثون هتعمل كائن جديد بقيمة 11.5 وهتربطه بـ 'x'

print(y)  # 10.5 (ما اتغيرش)
print(x)  # 11.5 (كائن جديد)
```

📢 **التوضيح:**

- لما بنحاول نغيّر قيمة `x`، بايثون **مش بتعدل على الكائن الأصلي**، لكن **بتنشئ كائن جديد بالقيمة الجديدة**.
- عشان كده، الكائنات **غير القابلة للتغيير (Immutable)** زي `float` **مش بتتغير بعد إنشائها**.
- `y` لسه بيشير للكائن القديم (`10.5`)، وده يوضح مفهوم **عدم التغيير (Immutability)**.

---

### **🔹 bool, int, float, ==tuple==, str, frozenset classes are immutable.**

📌 الأنواع دي **غير قابلة للتغيير (Immutable)**، وده معناه إنك **مش هتقدر تعدّل على القيم بعد إنشائها**، ولو حاولت، **بايثون هتنشئ كائن جديد بدل ما تعدّل القديم**.

#### **🔹 Example (Immutable String):**

```python
name = "Ali"
name = name + " Hassan"  # هنا بايثون بتعمل كائن جديد مش بتعدل على "Ali"
print(name)  # Ali Hassan
```

📢 **التوضيح:**

- `name` في الأول بيشير إلى `"Ali"`.
- لما ضفنا `" Hassan"`، بايثون **ما عدّلتش على `"Ali"`**، لكن **عملت كائن جديد بالقيمة `"Ali Hassan"` وربطت `name` بيه**.

---

### **🔹 list, set, dict classes are not immutable.**

📌 الأنواع دي **قابلة للتغيير (Mutable)**، وده معناه إنك تقدر **تعدل، تضيف، أو تحذف عناصر منها مباشرة**.

#### **🔹 Example (Mutable List):**

```python
numbers = [1, 2, 3]
numbers.append(4)  # بيضيف عنصر جديد في نفس القائمة
print(numbers)  # [1, 2, 3, 4]
```

📢 **التوضيح:**

- هنا **ما تمّش إنشاء كائن جديد**، لكن **القائمة الأصلية نفسها اتعدّلت** وأضفنا فيها الرقم `4`.
- القوائم (`list`)، المجموعات (`set`)، والقواميس (`dict`) **بتتغير مباشرة بدون إنشاء كائن جديد**.

---

تمام، هكمل بنفس الأسلوب وبأدق التفاصيل في كل الأجزاء، وهبدأ بتغطية باقي الأجزاء **بالتدريج مع أمثلة واضحة**.

---

## **📌 Creating and Using Objects (إنشاء واستخدام الكائنات)**

### **🔹 The process of creating a new instance of a class is known as instantiation.**

📌 **إنشاء كائن جديد من فئة (Class) يُعرف باسم "التجسيد" (Instantiation)**، وده معناه إننا **بنستخدم المُنشئ (Constructor) عشان ننشئ كائن جديد** من الفئة.

#### **🔹 Example:**

```python
class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

my_car = Car("Toyota", "Corolla")  # تجسيد كائن جديد من الفئة Car
print(my_car.brand)  # Toyota
print(my_car.model)  # Corolla
```

📢 **التوضيح:**

- `Car` عبارة عن **فئة (Class)** بتحتوي على **خصائص (Attributes)** زي `brand` و `model`.
- `__init__` هو **المُنشئ (Constructor)** اللي بيتم استدعاؤه **تلقائيًا عند إنشاء كائن جديد**.
- `my_car = Car("Toyota", "Corolla")` بيعمل **كائن جديد من الفئة Car**، ويخزن القيم `"Toyota"` و `"Corolla"`.

---

### **🔹 A class is immutable if each object of that class has a fixed value upon instantiation that cannot subsequently be changed.**

📌 **الفئة بتكون غير قابلة للتغيير (Immutable)** إذا كان **كل كائن يتم إنشاؤه منها بيكون له قيمة ثابتة لا يمكن تغييرها بعد الإنشاء**.

#### **🔹 Example (Immutable Class):**

```python
class ImmutableCar:
    def __init__(self, brand, model):
        self.__brand = brand  # خاصية خاصة لا يمكن تعديلها
        self.__model = model

    def get_brand(self):
        return self.__brand

    def get_model(self):
        return self.__model

car = ImmutableCar("Ford", "Mustang")
print(car.get_brand())  # Ford
```

📢 **التوضيح:**

- هنا، `__brand` و `__model` **خاصة (Private)**، وده معناه إن **محدش يقدر يغيرها بعد الإنشاء**.
- استخدمنا **دوال (Methods)** `get_brand()` و `get_model()` عشان نعرض القيم بدون تعديلها.

---

### **🔹 bool, int, float, tuple, str, frozenset classes are immutable.**

📌 الأنواع دي **غير قابلة للتغيير (Immutable)**، وده معناه إنك **مش هتقدر تعدّل على القيم بعد إنشائها**.

#### **🔹 Example (Immutable Tuple):**

```python
colors = ("red", "green", "blue")
colors[0] = "yellow"  # خطأ! لا يمكن تغيير محتوى الـ tuple
```

📢 **التوضيح:**

- لما نحاول **تغيير قيمة في الـ tuple**، هيظهر خطأ لأن **الكائنات من نوع `tuple` غير قابلة للتغيير**.

---

### **🔹 list, set, dict classes are not immutable.**

📌 الأنواع دي **قابلة للتغيير (Mutable)**، وده معناه إنك **تقدر تضيف، تحذف، أو تعدّل على القيم فيها مباشرة**.

#### **🔹 Example (Mutable List):**

```python
numbers = [1, 2, 3]
numbers.append(4)  # إضافة عنصر جديد
print(numbers)  # [1, 2, 3, 4]
```

📢 **التوضيح:**

- القوائم (`list`) **بتسمح بالتعديل المباشر**، وده معناه إننا أضفنا `4` بدون الحاجة لإنشاء كائن جديد.

---

## **📌 Collection Data Types (أنواع هياكل البيانات في بايثون)**

📌 بايثون بتوفر **أربع أنواع رئيسية** من هياكل البيانات:  
1️⃣ **List (قائمة)** – **مرتبة وقابلة للتغيير**، وتسمح بتكرار العناصر.  
2️⃣ **Tuple (صف)** – **مرتبة وغير قابلة للتغيير**، وتسمح بتكرار العناصر.  
3️⃣ **Set (مجموعة)** – **غير مرتبة وقابلة للتغيير**، **ولا تسمح بتكرار العناصر**.  
4️⃣ **Dictionary (قاموس)** – **مرتبة وقابلة للتغيير**، ولا تسمح بتكرار المفاتيح.

---

### **🔹 List (قائمة) - Ordered & Mutable**

📌 **القوائم (Lists) هي مصفوفات ديناميكية** تقدر تضيف أو تحذف منها عناصر، وهي **مرتبة وقابلة للتغيير**.

#### **🔹 Example:**

```python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")  # إضافة عنصر جديد
print(fruits)  # ['apple', 'banana', 'cherry', 'orange']
```

📢 **التوضيح:**

- القوائم **بتحافظ على ترتيب العناصر** و**يمكن التعديل عليها بسهولة** باستخدام `append()` و `remove()`.

---

### **🔹 Tuple (صف) - Ordered & Immutable**

📌 **الصفوف (Tuples) تشبه القوائم لكنها غير قابلة للتغيير**، وده معناه إنك **مش هتقدر تضيف أو تحذف عناصر بعد إنشائها**.

#### **🔹 Example:**

```python
colors = ("red", "green", "blue")
print(colors[0])  # red
# colors[0] = "yellow"  # هذا السطر سيؤدي إلى خطأ لأن الـ tuple غير قابلة للتغيير
```

📢 **التوضيح:**

- الـ `tuple` **تحافظ على ترتيب العناصر**، لكنها **ثابتة وغير قابلة للتعديل** بعد إنشائها.

---

### **🔹 Set (مجموعة) - Unordered & Mutable**

📌 **المجموعات (Sets) غير مرتبة وقابلة للتغيير، لكنها لا تسمح بتكرار العناصر**.

#### **🔹 Example:**

```python
my_set = {"apple", "banana", "cherry"}
my_set.add("orange")  # إضافة عنصر جديد
print(my_set)  # {'apple', 'banana', 'cherry', 'orange'}
```

📢 **التوضيح:**

- المجموعات **لا تحافظ على ترتيب معين**، و**لا تحتوي على عناصر مكررة**.

---

### **🔹 Dictionary (قاموس) - Ordered & Mutable**

📌 **القواميس (Dictionaries) بتخزن البيانات في شكل أزواج مفتاح-قيمة (Key-Value)**، وهي **مرتبة وقابلة للتغيير**.

#### **🔹 Example:**

```python
student = {"name": "Ali", "age": 21, "grade": "A"}
student["age"] = 22  # تعديل قيمة موجودة
print(student)  # {'name': 'Ali', 'age': 22, 'grade': 'A'}
```

📢 **التوضيح:**

- القواميس **بتسمح بالتعديل، الإضافة، والحذف**، لكنها **لا تسمح بتكرار المفاتيح**.

---
### **📌 Operations on Lists, Sets, and Dictionaries (العمليات على القوائم والمجموعات والقواميس)**

📢 دلوقتي هنتكلم عن العمليات المختلفة اللي تقدر تعملها على **القوائم (Lists)، المجموعات (Sets)، والقواميس (Dictionaries)** في بايثون، وهشرح كل حاجة بالتفصيل مع أمثلة واضحة.

---

## **🔹 List Operations (عمليات على القوائم)**

📌 **القوائم (Lists) بتدعم مجموعة كبيرة من العمليات زي الإضافة، الحذف، البحث، الترتيب، وغيرها.**

### **🔸 Adding Elements to a List (إضافة عناصر للقائمة)**

📌 **بايثون بتمكّنك من إضافة عناصر إلى القائمة باستخدام `append()`, `insert()`, و `extend()`.**

#### **🔹 Example (Using `append()`)**

```python
fruits = ["apple", "banana"]
fruits.append("cherry")  # إضافة عنصر في آخر القائمة
print(fruits)  # ['apple', 'banana', 'cherry']
```

📢 **التوضيح:**

- `append()` بتضيف العنصر **في نهاية القائمة**.

#### **🔹 Example (Using `insert()`)**

```python
fruits.insert(1, "orange")  # إدراج عنصر عند فهرس معين
print(fruits)  # ['apple', 'orange', 'banana', 'cherry']
```

📢 **التوضيح:**

- `insert(index, value)` بتضيف العنصر في **مكان معين** في القائمة.

#### **🔹 Example (Using `extend()`)**

```python
more_fruits = ["mango", "grape"]
fruits.extend(more_fruits)  # دمج قائمتين مع بعض
print(fruits)  # ['apple', 'orange', 'banana', 'cherry', 'mango', 'grape']
```

📢 **التوضيح:**

- `extend()` بتدمج قائمتين مع بعض عن طريق **إضافة كل عناصر القائمة الثانية إلى القائمة الأولى**.

---

### **🔸 Removing Elements from a List (حذف عناصر من القائمة)**

📌 **لحذف العناصر من القائمة، تقدر تستخدم `remove()`, `pop()`, أو `del`.**

#### **🔹 Example (Using `remove()`)**

```python
fruits.remove("banana")  # حذف عنصر معين بالقيمة
print(fruits)  # ['apple', 'orange', 'cherry', 'mango', 'grape']
```

📢 **التوضيح:**

- `remove(value)` بيحذف **أول ظهور للعنصر** في القائمة.

#### **🔹 Example (Using `pop()`)**

```python
last_fruit = fruits.pop()  # حذف آخر عنصر في القائمة
print(last_fruit)  # grape
print(fruits)  # ['apple', 'orange', 'cherry', 'mango']
```

📢 **التوضيح:**

- `pop()` بيحذف **آخر عنصر في القائمة** ويرجّع قيمته.
- لو حددت فهرس (`pop(index)`) هيحذف العنصر اللي في المكان ده.

#### **🔹 Example (Using `del`)**

```python
del fruits[1]  # حذف العنصر عند الفهرس 1
print(fruits)  # ['apple', 'cherry', 'mango']
```

📢 **التوضيح:**

- `del` بيحذف العنصر **باستخدام الفهرس**.

---

### **🔸 Searching for an Element in a List (البحث عن عنصر في القائمة)**

📌 **تقدر تتحقق إذا كان عنصر معين موجود في القائمة باستخدام `in`.**

#### **🔹 Example:**

```python
if "apple" in fruits:
    print("Apple is in the list!")  # Apple is in the list!
```

📢 **التوضيح:**

- `in` بترجع `True` لو العنصر موجود، و`False` لو مش موجود.

---

### **🔸 Sorting a List (ترتيب القائمة)**

📌 **تقدر ترتب قائمة العناصر باستخدام `sort()` أو `sorted()`.**

#### **🔹 Example (Using `sort()`)**

```python
numbers = [5, 2, 9, 1, 7]
numbers.sort()  # ترتيب القائمة تصاعديًا
print(numbers)  # [1, 2, 5, 7, 9]
```

📢 **التوضيح:**

- `sort()` بترتب القائمة **في مكانها (In-Place)** وبتعدل عليها مباشرة.

#### **🔹 Example (Using `sorted()`)**

```python
numbers = [5, 2, 9, 1, 7]
sorted_numbers = sorted(numbers)  # إنشاء نسخة مرتبة بدون تعديل القائمة الأصلية
print(sorted_numbers)  # [1, 2, 5, 7, 9]
print(numbers)  # [5, 2, 9, 1, 7]
```

📢 **التوضيح:**

- `sorted()` بترجع **قائمة جديدة مرتبة** بدون تغيير القائمة الأصلية.

---

## **🔹 Set Operations (عمليات على المجموعات)**

📌 **المجموعات (Sets) بتستخدم أساسًا في العمليات الحسابية مثل الاتحاد والتقاطع والفرق.**

### **🔸 Adding Elements to a Set (إضافة عناصر إلى المجموعة)**

📌 **تقدر تضيف عنصر إلى المجموعة باستخدام `add()`.**

#### **🔹 Example:**

```python
my_set = {"apple", "banana"}
my_set.add("cherry")
print(my_set)  # {'apple', 'banana', 'cherry'}
```

📢 **التوضيح:**

- `add()` بيضيف عنصر للمجموعة **إذا لم يكن موجود بالفعل**.

---

### **🔸 Removing Elements from a Set (حذف عناصر من المجموعة)**

📌 **لحذف عنصر، استخدم `remove()` أو `discard()`.**

#### **🔹 Example (Using `remove()`)**

```python
my_set.remove("banana")
print(my_set)  # {'apple', 'cherry'}
```

📢 **التوضيح:**

- `remove()` **يحذف العنصر**، لكنه **هيعمل خطأ لو العنصر مش موجود**.

#### **🔹 Example (Using `discard()`)**

```python
my_set.discard("banana")  # لا يحدث خطأ حتى لو العنصر غير موجود
```

📢 **التوضيح:**

- `discard()` زي `remove()` بس **من غير ما يسبب خطأ لو العنصر مش موجود**.

---

### **🔸 Set Operations (عمليات المجموعات)**

📌 **تقدر تعمل عمليات على المجموعات زي الاتحاد والتقاطع والفرق.**

#### **🔹 Example:**

```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print(set1 | set2)  # اتحاد المجموعتين -> {1, 2, 3, 4, 5}
print(set1 & set2)  # التقاطع (العناصر المشتركة) -> {3}
print(set1 - set2)  # الفرق (العناصر الموجودة في set1 فقط) -> {1, 2}
print(set1 ^ set2)  # الفرق المتماثل (العناصر غير المشتركة) -> {1, 2, 4, 5}
```

📢 **التوضيح:**

- `|` = اتحاد
- `&` = تقاطع
- `-` = فرق
- `^` = فرق متماثل

---
### **📌 Dictionary Operations (العمليات على القواميس في بايثون)**

📢 **القواميس (Dictionaries) هي واحدة من أهم هياكل البيانات في بايثون** لأنها بتسمح **بتخزين البيانات على شكل أزواج مفتاح-قيمة (Key-Value Pairs)**. في الجزء ده، هنشرح **إضافة، حذف، تعديل، والبحث عن البيانات داخل القاموس** بالتفصيل.

---

## **🔹 Creating a Dictionary (إنشاء قاموس)**

📌 **القواميس بتُعرّف باستخدام `{}` أو باستخدام `dict()`.**

#### **🔹 Example:**

```python
student = {"name": "Ali", "age": 21, "grade": "A"}
print(student)  # {'name': 'Ali', 'age': 21, 'grade': 'A'}
```

📢 **التوضيح:**

- القاموس بيتكون من **مفاتيح (Keys) وقيم (Values)**.
- كل مفتاح لازم يكون **فريد (Unique)**، وما ينفعش يكون متكرر.

---

### **🔹 Accessing Values in a Dictionary (الوصول إلى القيم داخل القاموس)**

📌 **تقدر تجيب قيمة أي مفتاح باستخدام `[]` أو `get()`.**

#### **🔹 Example (Using `[]`)**

```python
print(student["name"])  # Ali
```

📢 **التوضيح:**

- `student["name"]` بيرجع **القيمة المرتبطة بالمفتاح "name"**.

#### **🔹 Example (Using `get()`)**

```python
print(student.get("age"))  # 21
```

📢 **التوضيح:**

- `get()` بتشتغل زي `[]`، بس لو المفتاح مش موجود **مش هتسبب خطأ، وهترجع `None` بدل كده**.

---

### **🔹 Adding or Updating Elements in a Dictionary (إضافة أو تعديل القيم داخل القاموس)**

📌 **لو المفتاح موجود، القيمة هتتعدل، ولو مش موجود، هيتم إضافته.**

#### **🔹 Example (Updating a Value):**

```python
student["age"] = 22  # تحديث قيمة مفتاح موجود
print(student)  # {'name': 'Ali', 'age': 22, 'grade': 'A'}
```

📢 **التوضيح:**

- القيمة القديمة لعمر الطالب (`age = 21`) **تم تحديثها إلى `22`**.

#### **🔹 Example (Adding a New Key-Value Pair):**

```python
student["city"] = "Cairo"  # إضافة مفتاح جديد
print(student)  # {'name': 'Ali', 'age': 22, 'grade': 'A', 'city': 'Cairo'}
```

📢 **التوضيح:**

- تم **إضافة مفتاح جديد** `"city"` للقاموس.

---

### **🔹 Removing Elements from a Dictionary (حذف القيم من القاموس)**

📌 **بايثون بتمكّنك من حذف العناصر باستخدام `pop()`, `del`, و `clear()`.**

#### **🔹 Example (Using `pop()`)**

```python
grade = student.pop("grade")  # حذف المفتاح "grade" وإرجاع قيمته
print(grade)  # A
print(student)  # {'name': 'Ali', 'age': 22, 'city': 'Cairo'}
```

📢 **التوضيح:**

- `pop(key)` بيحذف المفتاح و**بيرجع قيمته**، ولو المفتاح مش موجود هيعمل **خطأ**.

#### **🔹 Example (Using `del`)**

```python
del student["age"]  # حذف عنصر معين
print(student)  # {'name': 'Ali', 'city': 'Cairo'}
```

📢 **التوضيح:**

- `del` بيحذف العنصر من القاموس نهائيًا.

#### **🔹 Example (Using `clear()`)**

```python
student.clear()  # حذف كل العناصر داخل القاموس
print(student)  # {}
```

📢 **التوضيح:**

- `clear()` **بيفرّغ القاموس بالكامل** لكنه بيظل موجود في الذاكرة.

---

### **🔹 Checking if a Key Exists (التحقق من وجود مفتاح داخل القاموس)**

📌 **تقدر تستخدم `in` لمعرفة إذا كان المفتاح موجود في القاموس ولا لأ.**

#### **🔹 Example:**

```python
if "name" in student:
    print("Key exists!")  # Key exists!
```

📢 **التوضيح:**

- `in` بترجع `True` لو المفتاح موجود، و `False` لو مش موجود.

---

### **🔹 Looping Through a Dictionary (التكرار على القاموس)**

📌 **تقدر تكرّر على المفاتيح والقيم باستخدام `for`.**

#### **🔹 Example (Looping Through Keys):**

```python
for key in student:
    print(key)  
```

📢 **التوضيح:**

- التكرار هنا هيطبع **المفاتيح فقط** (`name`, `city`).

#### **🔹 Example (Looping Through Values):**

```python
for value in student.values():
    print(value)  
```

📢 **التوضيح:**

- `values()` بيرجع القيم فقط (`Ali`, `Cairo`).

#### **🔹 Example (Looping Through Keys and Values):**

```python
for key, value in student.items():
    print(key, ":", value)
```

📢 **التوضيح:**

- `items()` بترجع **كل زوج مفتاح-قيمة**، وهيفيدك لما تحتاج تطبع القاموس بالكامل.

---

### **🔹 Dictionary Methods (أهم دوال القواميس)**

📌 **بايثون بتوفر مجموعة من الدوال للتعامل مع القواميس بسهولة.**

|الدالة|الوصف|
|---|---|
|`dict.keys()`|إرجاع كل المفاتيح الموجودة في القاموس|
|`dict.values()`|إرجاع كل القيم الموجودة في القاموس|
|`dict.items()`|إرجاع كل الأزواج (مفتاح-قيمة) في القاموس|
|`dict.pop(key)`|حذف عنصر باستخدام مفتاحه وإرجاع قيمته|
|`dict.update()`|تحديث القاموس بعناصر جديدة|
|`dict.clear()`|مسح كل محتويات القاموس|

---

### **📌 Control Flow in Python (التحكم في تدفق البرنامج في بايثون)**

📢 التحكم في التدفق هو جزء أساسي من أي لغة برمجة، وبيتيح لك **تنفيذ أكواد معينة بناءً على شروط معينة أو تكرار العمليات بشكل تلقائي**. في بايثون، عندنا **العبارات الشرطية (`if-elif-else`) والحلقات (`for`, `while`)**، وهشرح كل حاجة بالتفصيل مع أمثلة واضحة.

---

## **🔹 Conditional Statements (العبارات الشرطية)**

📌 **العبارات الشرطية (`if-elif-else`) بتستخدم لاتخاذ القرارات بناءً على شروط معينة**.

### **🔸 The `if` Statement (جملة `if`)**

📌 **`if` بتنّفذ الكود إذا تحقق الشرط.**

#### **🔹 Example:**

```python
age = 18
if age >= 18:
    print("You can vote!")  # You can vote!
```

📢 **التوضيح:**

- `if age >= 18:` معناها **"لو العمر 18 أو أكتر، نفّذ السطر اللي بعده"**.
- لو `age` أقل من 18، الكود مش هيشتغل.

---

### **🔸 The `if-else` Statement (`if` مع `else`)**

📌 **`else` بتتنفذ في حالة إن شرط `if` طلع False.**

#### **🔹 Example:**

```python
age = 16
if age >= 18:
    print("You can vote!")
else:
    print("You cannot vote.")  # You cannot vote.
```

📢 **التوضيح:**

- **لو الشرط بتاع `if` مش اتحقق، بايثون بتروح مباشرة لـ `else` وبتنّفذ الكود اللي فيها**.
- هنا `age = 16` أقل من 18، فتم تنفيذ `else`.

---

### **🔸 The `if-elif-else` Statement (`if` مع `elif` و `else`)**

📌 **`elif` بتستخدم لما يكون عندك أكتر من شرط وعايز تختبرهم بالتتابع.**

#### **🔹 Example:**

```python
grade = 85

if grade >= 90:
    print("Excellent")
elif grade >= 80:
    print("Very Good")  # Very Good
elif grade >= 70:
    print("Good")
else:
    print("Needs Improvement")
```

📢 **التوضيح:**

- البرنامج بيبدأ **بفحص أول شرط** (`grade >= 90`)، ولو مش متحقق، بينتقل لـ `elif`.
- بما إن `grade = 85`، الشرط الثاني (`grade >= 80`) اتحقق، فتم تنفيذ `"Very Good"`.
- **أول شرط يتحقق هو اللي بينفّذ، وبعده باقي الشروط بتتجاهل**.

---

## **🔹 Looping Statements (الحلقات التكرارية)**

📌 **الحلقات بتساعدك تكرّر نفس الكود أكتر من مرة بدل ما تكتبه بشكل يدوي.**  
📌 عندنا نوعين من الحلقات في بايثون:  
✅ `for` – بتستخدم مع **المصفوفات، القوائم، القواميس، أو أي كائن قابل للتكرار**.  
✅ `while` – بتفضل تكرّر الكود طالما الشرط متحقق.

---

### **🔸 The `for` Loop (حلقات `for`)**

📌 **`for` بتكرّر العناصر في قائمة أو مجموعة أو نص، عنصر وراء الثاني.**

#### **🔹 Example (Looping Through a List):**

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

📢 **التوضيح:**

- الحلقة **بتكرر على كل عنصر في القائمة** وتطبعه.
- الناتج:
    
    ```
    apple
    banana
    cherry
    ```
    

---

### **🔸 Looping with `range()` (`for` مع `range()`)**

📌 **`range(n)` بتنشئ سلسلة من الأرقام من `0` لـ `n-1`.**

#### **🔹 Example:**

```python
for i in range(5):
    print(i)
```

📢 **التوضيح:**

- `range(5)` بتنتج القيم `[0, 1, 2, 3, 4]`.
- الناتج:
    
    ```
    0
    1
    2
    3
    4
    ```
    

---

### **🔸 The `while` Loop (حلقات `while`)**

📌 **`while` بتكرّر الكود طالما الشرط متحقق (`True`).**

#### **🔹 Example:**

```python
x = 0
while x < 3:
    print(x)
    x += 1
```

📢 **التوضيح:**

- `while x < 3` بتخلي الحلقة تفضل شغالة **طالما `x` أقل من `3`**.
- `x += 1` بتزوّد `x` في كل تكرار لحد ما الشرط يبقى `False`.
- الناتج:
    
    ```
    0
    1
    2
    ```
    

---

## **🔹 Loop Control Statements (التحكم في الحلقات)**

📌 **بايثون بتوفر أدوات للتحكم في الحلقات زي `break`, `continue`, و `pass`.**

### **🔸 The `break` Statement (`break` لإيقاف الحلقة)**

📌 **`break` بتخرج من الحلقة فورًا، حتى لو باقي التكرارات لسه متحققة.**

#### **🔹 Example:**

```python
for num in range(10):
    if num == 5:
        break
    print(num)
```

📢 **التوضيح:**

- الحلقة بتبدأ من `0` وتفضل شغالة لحد ما `num == 5`.
- **عند `5`، `break` بتوقف الحلقة تمامًا**.
- الناتج:
    
    ```
    0
    1
    2
    3
    4
    ```
    

---

### **🔸 The `continue` Statement (`continue` لتخطي تكرار معين)**

📌 **`continue` بتتخطى التكرار الحالي وتنتقل للتكرار اللي بعده بدون تنفيذ باقي الكود.**

#### **🔹 Example:**

```python
for num in range(5):
    if num == 2:
        continue
    print(num)
```

📢 **التوضيح:**

- عند `num == 2`، `continue` بتخلي الحلقة **تتخطى الطباعة** وتنتقل للتكرار اللي بعده.
- الناتج:
    
    ```
    0
    1
    3
    4
    ```
    

---

### **🔸 The `pass` Statement (`pass` كعنصر نائب)**

📌 **`pass` بتستخدم لما تحتاج تكتب كود في المستقبل لكن مش عايز يحصل خطأ أثناء تشغيل البرنامج.**

#### **🔹 Example:**

```python
for num in range(5):
    if num == 2:
        pass  # Placeholder for future code
    print(num)
```

📢 **التوضيح:**

- `pass` مش بتعمل أي حاجة، لكنها **بتمنع حدوث خطأ** لو كان الكود ناقص.

---

### **📌 Functions in Python (الدوال في بايثون)**

📢 **الدوال (Functions) هي واحدة من أهم مفاهيم البرمجة، لأنها بتسمح لك بإعادة استخدام الكود وتوفير الوقت وتقليل الأخطاء.** في الجزء ده، هنتعلم **كيفية تعريف دالة، استدعائها، استخدام المعاملات الافتراضية، وتمرير القيم بطرق مختلفة**.

---

## **🔹 Defining a Function (تعريف دالة في بايثون)**

📌 **في بايثون، بنستخدم الكلمة المفتاحية `def` لتعريف دالة جديدة.**  
📌 **الدالة ممكن تاخد مدخلات (Parameters) وترجع ناتج باستخدام `return`، أو ممكن متكونش بترجع حاجة.**

#### **🔹 Example (Basic Function Definition):**

```python
def greet():
    print("Hello, world!")

greet()  # Hello, world!
```

📢 **التوضيح:**

- `def greet():` بتعرّف دالة اسمها `greet`.
- `print("Hello, world!")` هو الكود اللي هيتنفّذ لما نستدعي الدالة.
- `greet()` هو استدعاء الدالة، وبيطبع `"Hello, world!"`.

---

## **🔹 Function with Parameters (دالة بمدخلات)**

📌 **الدالة ممكن تستقبل بيانات كمدخلات (Parameters) وتستخدمها أثناء التنفيذ.**

#### **🔹 Example:**

```python
def greet(name):
    print("Hello,", name)

greet("Ali")  # Hello, Ali
greet("Sara")  # Hello, Sara
```

📢 **التوضيح:**

- `greet(name)` بتستقبل **معامل (Parameter)** اسمه `name`.
- لما استدعينا `greet("Ali")`، القيمة `"Ali"` اتحطت مكان `name` وتمت طباعتها.

---

## **🔹 Function with Return Value (دالة بترجع قيمة)**

📌 **الدالة ممكن ترجع قيمة باستخدام `return` بدل ما تطبعها.**

#### **🔹 Example:**

```python
def square(number):
    return number * number

result = square(4)
print(result)  # 16
```

📢 **التوضيح:**

- `square(number)` بتاخد رقم وترجع **مربع الرقم (`number * number`)**.
- `result = square(4)` بتخزن **القيمة الراجعة (`16`) في المتغير `result`**.

---

## **🔹 Function with Default Parameters (الدالة بمعاملات افتراضية)**

📌 **تقدر تعرّف معاملات افتراضية بحيث لو المستخدم ما دخلش قيمة، الدالة تستخدم القيمة الافتراضية.**

#### **🔹 Example:**

```python
def greet(name="Guest"):
    print("Hello,", name)

greet()  # Hello, Guest
greet("Ali")  # Hello, Ali
```

📢 **التوضيح:**

- `name="Guest"` معناها إن لو المستخدم **ما دخلش اسم، القيمة الافتراضية هتبقى `"Guest"`**.
- لما استدعينا `greet()` بدون مدخل، **تم استخدام `"Guest"` كقيمة افتراضية**.

---

## **🔹 Function with Multiple Parameters (دالة بأكثر من معامل)**

📌 **الدالة ممكن تستقبل أكتر من معامل وتتعامل معاهم داخلها.**

#### **🔹 Example:**

```python
def add_numbers(a, b):
    return a + b

print(add_numbers(3, 5))  # 8
print(add_numbers(10, 20))  # 30
```

📢 **التوضيح:**

- `add_numbers(a, b)` بتاخد رقمين، وبتحسب مجموعهم (`a + b`).
- عند استدعاء `add_numbers(3, 5)`, الدالة **بترجع `8`**.

---

## **🔹 Function with Arbitrary Arguments (`*args`) (دالة بعدد غير محدد من المدخلات)**

📌 **لو مش عارف عدد المعاملات اللي هيدخلها المستخدم، تقدر تستخدم `*args`.**  
📌 **`args` بتكون عبارة عن `Tuple` تحتوي كل القيم المدخلة.**

#### **🔹 Example:**

```python
def add_all(*numbers):
    total = sum(numbers)
    return total

print(add_all(1, 2, 3))  # 6
print(add_all(10, 20, 30, 40))  # 100
```

📢 **التوضيح:**

- `*numbers` بيخزن **كل القيم اللي المستخدم دخلها في `Tuple`**.
- `sum(numbers)` بتحسب **مجموع القيم المدخلة**.

---

## **🔹 Function with Keyword Arguments (`**kwargs`) (دالة تستقبل مدخلات بالكلمات المفتاحية)**

📌 **`**kwargs` بتستخدم لو عايز تمرر مجموعة غير محددة من المعاملات بالأسماء (Key-Value).**  
📌 **المدخلات بتتحول إلى `Dictionary` داخل الدالة.**

#### **🔹 Example:**

```python
def print_info(**person):
    print("Name:", person["name"])
    print("Age:", person["age"])

print_info(name="Ali", age=25)
```

📢 **التوضيح:**

- `**person` بيحوّل المدخلات لكائن `Dictionary`.
- `person["name"]` و `person["age"]` بيستخدموا **كمفاتيح للوصول إلى القيم المدخلة**.

---

## **🔹 Lambda Functions (الدوال المجهولة أو المختصرة)**

📌 **Lambda Function هي دالة صغيرة تُكتب في سطر واحد بدون `def`، وتُستخدم غالبًا في العمليات البسيطة.**

#### **🔹 Example:**

```python
square = lambda x: x * x
print(square(5))  # 25
```

📢 **التوضيح:**

- `lambda x: x * x` بتاخد `x` وترجع `x` مضروبة في نفسها.
- `square(5)` بينفذ العملية و**بيرجع `25`**.

---

## **🔹 Recursive Functions (الدوال العودية)**

📌 **الدالة العودية هي دالة بتستدعي نفسها لحل مشكلة متكررة زي حساب المضروب (`Factorial`).**

#### **🔹 Example (Factorial Function):**

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

📢 **التوضيح:**

- **`factorial(n)` بتستدعي نفسها** مع `n - 1` لحد ما `n` يبقى `0`.
- `factorial(5) = 5 * 4 * 3 * 2 * 1 = 120`.
---
### **📌 Iterators and Generators in Python (التكرارات والمولدات في بايثون)**

📢 **التكرارات (Iterators) والمولدات (Generators) أدوات قوية في بايثون، بتستخدم لتنفيذ العمليات التكرارية بكفاءة، خاصة مع البيانات الكبيرة.** في الجزء ده، هنشرح **التكرارات (`Iterators`)، كيفية إنشائها، وكيفية استخدام المولدات (`Generators`) لتوفير الذاكرة وتحسين الأداء**.

---

## **🔹 Iterators (التكرارات في بايثون)**

📌 **التكرار (Iteration) هو عملية المرور على عناصر كائن واحدًا تلو الآخر، زي القوائم أو النصوص.**  
📌 **الكائنات القابلة للتكرار (`Iterable Objects`) هي أي كائنات تقدر تكرر عليها باستخدام `for`.**

---

### **🔸 What is an Iterator? (ما هو التكرار؟)**

📌 **المكرِّر (Iterator) هو كائن بيحتوي على عناصر تقدر تتنقل بينها واحدًا تلو الآخر باستخدام `next()`.**

#### **🔹 Example (Using an Iterator):**

```python
my_list = [1, 2, 3]
iterator = iter(my_list)  # تحويل القائمة إلى Iterator

print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
# print(next(iterator))  # خطأ: StopIteration لأن العناصر انتهت
```

📢 **التوضيح:**

- `iter(my_list)` بيحول القائمة إلى **كائن مكرر (Iterator)**.
- `next(iterator)` بيرجع **العنصر التالي في الكائن**، ولما العناصر تخلص، بيحصل **`StopIteration`**.

---

### **🔸 Creating a Custom Iterator (إنشاء تكرار مخصص)**

📌 **تقدر تنشئ `Iterator` خاص بيك عن طريق تعريف كلاس بيستخدم `__iter__()` و `__next__()`.**

#### **🔹 Example (Custom Iterator to Generate Numbers):**

```python
class MyNumbers:
    def __init__(self, max):
        self.max = max
        self.current = 1

    def __iter__(self):
        return self  # لازم ترجع الكائن نفسه

    def __next__(self):
        if self.current > self.max:
            raise StopIteration  # إيقاف التكرار لما نوصل للحد الأقصى
        num = self.current
        self.current += 1
        return num

numbers = MyNumbers(5)
for num in numbers:
    print(num)
```

📢 **التوضيح:**

- `__iter__()` بيرجع الكائن نفسه.
- `__next__()` بيحدد **العنصر التالي**، ولما نوصل لأقصى قيمة (`max`) يحصل **`StopIteration`**.
- الناتج:
    
    ```
    1
    2
    3
    4
    5
    ```
    

---

## **🔹 Generators (المولدات في بايثون)**

📌 **المولد (`Generator`) هو نوع خاص من `Iterator`، لكنه بيستخدم `yield` بدل `return`، وده بيسمح له يحفظ حالته بعد كل استدعاء.**  
📌 **المولدات بتوفر الذاكرة لأنها مش بتخزن كل القيم في الذاكرة، لكنها بتولدها عند الحاجة فقط.**

---

### **🔸 Creating a Generator (إنشاء مولد بسيط)**

📌 **`yield` بيوقف تنفيذ الدالة مؤقتًا وبيحفظ حالتها، ولما نستدعي `next()` بيكمل من نفس المكان.**

#### **🔹 Example (Simple Generator):**

```python
def my_generator():
    yield 1
    yield 2
    yield 3

gen = my_generator()

print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
# print(next(gen))  # StopIteration لأن العناصر انتهت
```

📢 **التوضيح:**

- `yield` بيوقف التنفيذ **ويحفظ الحالة الحالية**.
- `next(gen)` بيستأنف التشغيل من آخر `yield`.

---

### **🔸 Generator with Loop (مولد باستخدام `for`)**

📌 **المولد بيتم التعامل معاه زي `Iterator`، وبدل `next()` تقدر تستخدم `for`.**

#### **🔹 Example:**

```python
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

for num in count_up_to(5):
    print(num)
```

📢 **التوضيح:**

- `count_up_to(5)` بينشئ مولد بيحسب الأعداد **من 1 إلى 5**.
- `yield count` بيوقف التنفيذ عند كل قيمة.
- الناتج:
    ```
    1
    2
    3
    4
    5
    ```
---
### **🔸 Generator for Fibonacci Sequence (مولد لحساب متتالية فيبوناتشي)**

📌 **مولد بيحسب سلسلة فيبوناتشي بدون تخزين كل القيم في الذاكرة.**

#### **🔹 Example:**

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
for _ in range(10):
    print(next(fib))
```

📢 **التوضيح:**

- `yield a` بيرجع أول رقم في السلسلة.
- بعد كل `yield`، القيم `a, b` بتتحدث لحساب الرقم التالي.
- الناتج:
    
    ```
    0
    1
    1
    2
    3
    5
    8
    13
    21
    34
    ```
    

---

## **🔹 Generator Expressions (التعبير عن المولدات في سطر واحد)**

📌 **بدل ما تكتب دالة `Generator` كاملة، تقدر تستخدم "التعبير عن المولدات" في سطر واحد باستخدام الأقواس `()`.**

#### **🔹 Example:**

```python
squares = (x * x for x in range(5))
print(next(squares))  # 0
print(next(squares))  # 1
print(next(squares))  # 4
```

📢 **التوضيح:**

- `squares = (x * x for x in range(5))` بينشئ مولد بيحسب **مربعات الأعداد من 0 إلى 4**.
- `next(squares)` بيحسب **العنصر التالي بدون تخزين كل القيم في الذاكرة**.
---
### **📌 Functional Programming in Python (البرمجة الوظيفية في بايثون)**

📢 **البرمجة الوظيفية (`Functional Programming`) هي نمط برمجي بيستخدم الدوال ككيانات أساسية، وبيعتمد على مفاهيم زي `map()`, `filter()`, `reduce()`, و `lambda`.**  
📢 **في بايثون، البرمجة الوظيفية بتساعد في كتابة كود أكثر كفاءة، وأقل في الأخطاء، وأسهل في الصيانة.**

---

## **🔹 Lambda Functions (الدوال المجهولة أو المختصرة)**

📌 **`Lambda` Function هي دالة مجهولة (بدون اسم) تُكتب في سطر واحد، وبتُستخدم للعمليات البسيطة.**  
📌 **بتعتمد على صيغة `lambda arguments: expression`، وترجع ناتج التعبير.**

#### **🔹 Example (Basic Lambda Function):**

```python
square = lambda x: x * x
print(square(5))  # 25
```

📢 **التوضيح:**

- `lambda x: x * x` بتاخد `x` وترجع `x` مضروبة في نفسها.
- `square(5)` بينفذ العملية و**بيرجع `25`**.

---

## **🔹 The `map()` Function (دالة `map()`)**

📌 **`map()` بتُستخدم لتطبيق دالة معينة على كل عنصر في مجموعة (مثل قائمة أو Tuple) وترجع نتيجة جديدة.**  
📌 **الصيغة العامة: `map(function, iterable)`.**

#### **🔹 Example (Using `map()` to Square Numbers):**

```python
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]
```

📢 **التوضيح:**

- `map(lambda x: x ** 2, numbers)` بتطبّق `lambda x: x ** 2` على كل عنصر في `numbers`.
- **النتيجة هي قائمة جديدة تحتوي على مربعات الأعداد.**

---

## **🔹 The `filter()` Function (دالة `filter()`)**

📌 **`filter()` بتُستخدم لاختيار العناصر اللي تحقق شرط معين من مجموعة بيانات.**  
📌 **الصيغة العامة: `filter(function, iterable)`.**

#### **🔹 Example (Filtering Even Numbers):**

```python
numbers = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6]
```

📢 **التوضيح:**

- `filter(lambda x: x % 2 == 0, numbers)` بتختار **الأعداد الزوجية فقط**.
- **الناتج هو `[2, 4, 6]` لأنهم فقط اللي بيحققوا الشرط.**

---

## **🔹 The `reduce()` Function (دالة `reduce()`)**

📌 **`reduce()` بتُستخدم لتنفيذ عملية تكرارية على كل العناصر في مجموعة، وبتُقلصها إلى قيمة واحدة.**  
📌 **الصيغة العامة: `reduce(function, iterable)`.**  
📌 **عشان تستخدم `reduce()` لازم تستوردها من `functools`.**

#### **🔹 Example (Finding the Product of a List):**

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120
```

📢 **التوضيح:**

- `reduce(lambda x, y: x * y, numbers)` بتاخد **أول عنصرين، تضربهم، ثم تضرب الناتج في العنصر اللي بعده وهكذا.**
- **الناتج هو `1 * 2 * 3 * 4 * 5 = 120`.**

---

## **🔹 Combining `map()`, `filter()`, and `reduce()` (الدمج بين `map()` و `filter()` و `reduce()`)**

📌 **تقدر تجمع بين `map()`, `filter()`, و `reduce()` لإنجاز عمليات أكثر تعقيدًا بشكل مختصر وكفاءة عالية.**

#### **🔹 Example:**

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1. فلترة الأعداد الزوجية
evens = filter(lambda x: x % 2 == 0, numbers)

# 2. تربيع كل عدد
squared_evens = map(lambda x: x ** 2, evens)

# 3. حساب المجموع الكلي
sum_of_squares = reduce(lambda x, y: x + y, squared_evens)

print(sum_of_squares)  # 220
```

📢 **التوضيح:**  
1️⃣ `filter(lambda x: x % 2 == 0, numbers)` **بتختار الأعداد الزوجية** `[2, 4, 6, 8, 10]`.  
2️⃣ `map(lambda x: x ** 2, evens)` **بتحسب مربع كل عدد** `[4, 16, 36, 64, 100]`.  
3️⃣ `reduce(lambda x, y: x + y, squared_evens)` **بيجمع كل القيم مع بعض ويدينا `220`**.

---

## **🔹 List Comprehensions (التعبيرات المختصرة للقوائم)**

📌 **التعبيرات المختصرة (`List Comprehension`) هي طريقة مختصرة لإنشاء القوائم بطريقة سهلة وبسيطة.**

#### **🔹 Example (Creating a List of Squares):**

```python
squares = [x ** 2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]
```

📢 **التوضيح:**

- بدل ما نستخدم `map()`, `List Comprehension` بيحقق نفس النتيجة بأسلوب أقصر وأوضح.

#### **🔹 Example (Filtering Even Numbers):**

```python
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]
```

📢 **التوضيح:**

- `if x % 2 == 0` بيخلي التعبير **يختار فقط الأعداد الزوجية**.

---
### **📌 Exception Handling in Python (معالجة الأخطاء في بايثون)**

📢 **معالجة الأخطاء (`Exception Handling`) هي ميزة قوية في بايثون بتساعد على التعامل مع الأخطاء اللي ممكن تحصل أثناء تشغيل البرنامج بدون ما يتوقف.**  
📢 **في الجزء ده، هنتعلم إزاي نستخدم `try-except`, `finally`, و `raise` للتعامل مع الأخطاء بطريقة احترافية.**

---

## **🔹 What is an Exception? (ما هو الاستثناء؟)**

📌 **الاستثناء (`Exception`) هو خطأ بيحصل أثناء تشغيل الكود، وبيسبب توقف البرنامج لو مش متعالج.**

#### **🔹 Example (An Unhandled Exception - خطأ غير معالج):**

```python
x = 10 / 0  # خطأ: القسمة على صفر
```

📢 **التوضيح:**

- الكود ده هيعمل خطأ `ZeroDivisionError` لأن **القسمة على صفر غير مسموحة**.
- **لو الكود مش متعالج، البرنامج هيقف فجأة.**

---

## **🔹 Handling Exceptions using `try-except` (معالجة الأخطاء باستخدام `try-except`)**

📌 **`try-except` بتسمح لك بتنفيذ كود معين، ولو حصل خطأ، يتم التعامل معاه بدون توقف البرنامج.**

#### **🔹 Example (Handling Division by Zero):**

```python
try:
    x = 10 / 0  # محاولة تنفيذ القسمة
except ZeroDivisionError:
    print("Cannot divide by zero!")  # معالجة الخطأ
```

📢 **التوضيح:**

- **الكود داخل `try` بيتم تشغيله أولًا**.
- لو حصل خطأ **`ZeroDivisionError`، `except` هتتعامل معاه بدل ما البرنامج يقف**.
- البرنامج هيطبع `"Cannot divide by zero!"` بدل ما ينهار.

---

## **🔹 Handling Multiple Exceptions (معالجة أكثر من نوع من الأخطاء)**

📌 **ممكن تضيف أكتر من `except` لمعالجة أنواع مختلفة من الأخطاء.**

#### **🔹 Example:**

```python
try:
    num = int(input("Enter a number: "))  # إدخال رقم
    result = 10 / num  # القسمة
except ZeroDivisionError:
    print("Error: Cannot divide by zero!")  
except ValueError:
    print("Error: Invalid input, please enter a number!")
```

📢 **التوضيح:**

- لو المستخدم دخل **`0`** → **`ZeroDivisionError`** هيتم التعامل معاه.
- لو المستخدم دخل **نص بدل رقم** → **`ValueError`** هيتم التعامل معاه.

---

## **🔹 Using `finally` (استخدام `finally`)**

📌 **`finally` بتتنفذ دايمًا سواء حصل خطأ أو لأ.**  
📌 **بتستخدم لإغلاق الملفات، إنهاء الاتصال بقواعد البيانات، أو أي عملية تنظيف.**

#### **🔹 Example:**

```python
try:
    file = open("data.txt", "r")  # محاولة فتح ملف
    content = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    print("Closing the file...")
    file.close()  # إغلاق الملف
```

📢 **التوضيح:**

- **لو الملف مش موجود، `except` هتعالج الخطأ، لكن `finally` هتتنفذ في كل الحالات.**

---

## **🔹 Raising Exceptions using `raise` (إطلاق الأخطاء يدويًا باستخدام `raise`)**

📌 **`raise` بتُستخدم لإنشاء استثناءات مخصصة يدويًا عند الحاجة.**

#### **🔹 Example (Manually Raising an Exception):**

```python
def check_age(age):
    if age < 18:
        raise ValueError("You must be at least 18 years old.")
    return "Access granted!"

print(check_age(20))  # Access granted!
# print(check_age(15))  # ValueError: You must be at least 18 years old.
```

📢 **التوضيح:**

- **لو `age < 18`، `raise` بتطلق `ValueError` وبتوقف البرنامج.**
- **لو العمر 18 أو أكتر، الدالة بتشتغل عادي.**

---

## **🔹 Using `try-except-else` (استخدام `else` مع `try-except`)**

📌 **`else` بتتنفذ لو مفيش خطأ حصل داخل `try`.**

#### **🔹 Example:**

```python
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError:
    print("Invalid input!")
else:
    print("Division successful:", result)  # ينفذ لو مفيش خطأ
```

📢 **التوضيح:**

- **لو مفيش أخطاء، `else` هتتنفذ وتعرض النتيجة.**
- **لو حصل خطأ، `except` هتشتغل، و `else` مش هتتنفذ.**
---
## **🔹 Creating Custom Exceptions (إنشاء استثناءات مخصصة)**

📌 **تقدر تنشئ أخطاء مخصصة عن طريق إنشاء فئة (`Class`) جديدة ترث من `Exception`.**

#### **🔹 Example:**

```python
class AgeError(Exception):
    pass  # فئة مخصصة للأخطاء

def check_age(age):
    if age < 18:
        raise AgeError("You are too young!")
    return "Access granted!"

print(check_age(20))  # Access granted!
# print(check_age(15))  # AgeError: You are too young!
```

📢 **التوضيح:**

- `AgeError` هو **نوع مخصص من الأخطاء بنستخدمه لما العمر يكون أقل من 18**.
- `raise AgeError("You are too young!")` بيطلق الخطأ لو العمر أقل من 18.

---