 # 📂 Python Sets - المجموعات في بايثون

## 🔹 **ما هي الـ Set؟**

**Set** هي نوع من **المجموعات (Collections)** في بايثون، تُستخدم لتخزين **عدة عناصر في متغير واحد**.

### ✨ **خصائص الـ Set:**

- ❌ **غير مرتبة (Unordered)** → لا يمكن التنبؤ بترتيب العناصر.
- ✅ **قابلة للتعديل بعد الإنشاء (Changeable)** → لكن يمكن حذف العناصر وإضافة أخرى.
- ❌ **لا تقبل التكرار (No Duplicates)** → العناصر المكررة يتم تجاهلها تلقائيًا.

### 📚 **إنشاء Set في بايثون:**

```python
myset = {"apple", "banana", "cherry"}
print(myset)
```

---

## 🔹 **الوصول إلى عناصر الـ Set (Access Items)**

**لا يمكنك الوصول إلى العناصر باستخدام الفهرس (index)، لكن يمكنك:**

1. **التكرار (Looping) عبر العناصر باستخدام `for`**
2. **التحقق مما إذا كان عنصر معين موجودًا باستخدام `in`**

### ✨ **أمثلة:**

```python
thisset = {"apple", "banana", "cherry"}

# التكرار عبر العناصر
for x in thisset:
  print(x)

# التحقق من وجود عنصر معين
print("banana" in thisset)  # True
print("grape" not in thisset)  # True
```

---

## 🔹 **تعديل الـ Set (Modifying a Set)**

### ✨ **إضافة عناصر إلى Set:**

- **`add()`** لإضافة عنصر واحد.
- **`update()`** لإضافة مجموعة عناصر من Set آخر أو من أي كائن قابل للتكرار (List, Tuple, Dictionary).

```python
thisset = {"apple", "banana", "cherry"}
thisset.add("orange")
print(thisset)  # {'apple', 'banana', 'cherry', 'orange'}

# إضافة مجموعة عناصر
tropical = {"pineapple", "mango", "papaya"}
thisset.update(tropical)
print(thisset)

# إضافة عناصر من List
mylist = ["kiwi", "grape"]
thisset.update(mylist)
print(thisset)
```

### ✨ **حذف عناصر من Set:**

- **`remove()`** ❌ تحذف العنصر **لكنها تعطي خطأ لو العنصر غير موجود**.
- **`discard()`** ❌ تحذف العنصر **بدون خطأ إذا لم يكن موجودًا**.
- **`pop()`** ❌ تحذف **عنصرًا عشوائيًا**.
- **`clear()`** ❌ تمسح كل العناصر.
- **`del`** ❌ تحذف الـ Set بالكامل.

```python
thisset = {"apple", "banana", "cherry"}
thisset.remove("banana")  # يحذف العنصر ويعطي خطأ لو مش موجود
thisset.discard("banana")  # يحذف العنصر بدون خطأ لو مش موجود
x = thisset.pop()  # حذف عنصر عشوائي
print(thisset)

thisset.clear()  # مسح كل العناصر
print(thisset)  # set()

del thisset  # حذف الـ Set بالكامل
# هذا السطر سيؤدي إلى خطأ لأن المتغير سيُحذف
```

---

## 🔹 **العمليات على الـ Sets (Operations on Sets)**

### ✨ **دمج الـ Sets (Joining Sets):**

- **`union()`** → تنشئ Set جديدة تحتوي على جميع العناصر بدون تكرار.
	- A | B
- **`update()`** → تضيف عناصر من Set آخر إلى الـ Set الحالية.

```python
set1 = {"a", "b", "c"}
set2 = {1, 2, 3}
set3 = set1.union(set2)
print(set3)  # {'a', 'b', 'c', 1, 2, 3}

set1.update(set2)
print(set1)  # {'a', 'b', 'c', 1, 2, 3}
```

### ✨ **التقاطع (Intersection) - إبقاء العناصر المشتركة:**

- **`intersection()`** → تُنشئ Set جديدة بالعناصر المشتركة فقط.
- **`intersection_update()`** → تحتفظ بالعناصر المشتركة داخل الـ Set الأصلية.

```python
set1 = {"apple", "banana", "cherry"}
set2 = {"google", "microsoft", "apple"}
set3 = set1.intersection(set2)
print(set3)  # {'apple'}

set1.intersection_update(set2)
print(set1)  # {'apple'}
```

### ✨ **الفرق (Difference) - الاحتفاظ بالعناصر غير المشتركة:**

- **`difference()`** → تُنشئ Set جديدة بالعناصر التي ليست في الـ Set الأخرى.
- **`difference_update()`** → تحذف العناصر المشتركة من الـ Set الأصلية.

```python
set1 = {"apple", "banana", "cherry"}
set2 = {"google", "microsoft", "apple"}
set3 = set1.difference(set2)
print(set3)  # {'banana', 'cherry'}

set1.difference_update(set2)
print(set1)  # {'banana', 'cherry'}
```

### ✨ **الفرق المتماثل (Symmetric Difference) - إزالة العناصر المشتركة:**

- **`symmetric_difference()`** → تُنشئ Set جديدة تحتوي على العناصر غير المشتركة فقط.
- **`symmetric_difference_update()`** → تحذف العناصر المشتركة من الـ Set الأصلية.

```python
set1 = {"apple", "banana", "cherry"}
set2 = {"google", "microsoft", "apple"}
set3 = set1.symmetric_difference(set2)
print(set3)  # {'banana', 'cherry', 'google', 'microsoft'}

set1.symmetric_difference_update(set2)
print(set1)  # {'banana', 'cherry', 'google', 'microsoft'}
```

---

## 🔹 **ملخص دوال الـ Set في بايثون**

|**الدالة**|**الوصف**|
|---|---|
|`add()`|إضافة عنصر إلى الـ Set.|
|`remove()`|حذف عنصر (خطأ لو مش موجود).|
|`discard()`|حذف عنصر بدون خطأ لو مش موجود.|
|`pop()`|حذف عنصر عشوائي.|
|`clear()`|مسح كل العناصر.|
|`union()`|دمج الـ Sets بدون تكرار.|
|`update()`|إضافة عناصر Set أخرى.|
|`intersection()`|إبقاء العناصر المشتركة.|
|`difference()`|إبقاء العناصر غير المشتركة.|
|`symmetric_difference()`|حذف العناصر المشتركة فقط.|

---

