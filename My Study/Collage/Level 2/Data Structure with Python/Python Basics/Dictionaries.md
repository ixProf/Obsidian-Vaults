# 📂 Python Dictionaries - القواميس في بايثون

## 🔹 **ما هو الـ Dictionary؟**

**Dictionary** هو نوع من **المجموعات (Collections)** في بايثون يُستخدم لتخزين البيانات في شكل **أزواج مفتاح-قيمة (Key-Value Pairs)**، حيث يمثل كل مفتاح (`Key`) قيمة (`Value`).

### ✨ **خصائص الـ Dictionary:**

- ✅ **مرتبة (Ordered)** → من Python 3.7، أصبحت الـ Dictionaries تحتفظ بترتيب الإدخال.
- ✅ **قابلة للتعديل (Mutable)** → يمكن تعديل القيم أو إضافة وحذف عناصر.
- ❌ **لا تقبل التكرار في المفاتيح (No Duplicate Keys)** → كل مفتاح يكون فريدًا، ولو أضفت مفتاحًا مكررًا، سيتم استبدال قيمته بالقيمة الجديدة.
- ✅ **تسمح بقيم مختلفة الأنواع** → يمكن أن تكون القيم (`Values`) من أي نوع بيانات مثل `int`, `str`, `list`, `tuple`, `dict`، وحتى `None`.

### 📚 **إنشاء Dictionary في بايثون:**

```python
mydict = {
    "name": "Ali",
    "age": 25,
    "city": "Cairo"
}
print(mydict)
```

يمكن أيضًا استخدام `dict()` لإنشاء قاموس:

```python
mydict = dict(name="Ali", age=25, city="Cairo")
print(mydict)
```

---

## 🔹 **الوصول إلى عناصر القاموس (Access Items)**

يمكنك الوصول إلى القيم في القاموس باستخدام المفتاح (`Key`).

### ✨ **أمثلة:**

```python
person = {
    "name": "Omar",
    "age": 30,
    "city": "Alexandria"
}

# الوصول إلى قيمة باستخدام المفتاح
print(person["name"])  # Omar
print(person.get("age"))  # 30
```

🔹 **استخدام `get()` أكثر أمانًا لأنه لا يُسبب خطأ إذا كان المفتاح غير موجود، بل يرجع `None` أو قيمة افتراضية.**

```python
print(person.get("country", "Not Found"))  # Not Found
```

🔹 **التحقق مما إذا كان مفتاح معين موجودًا:**

```python
if "city" in person:
    print("المفتاح موجود")
```

---

## 🔹 **تعديل وإضافة عناصر إلى القاموس (Modify & Add Items)**

يمكن تعديل القيم أو إضافة أزواج جديدة لمفتاح وقيمة.

```python
person["age"] = 35  # تعديل قيمة موجودة
person["country"] = "Egypt"  # إضافة مفتاح جديد
print(person)
```

🔹 **استخدام `update()` لتعديل أو إضافة عناصر متعددة دفعة واحدة:**

```python
person.update({"age": 40, "job": "Engineer"})
print(person)
```

---

## 🔹 **حذف عناصر من القاموس (Remove Items)**

- **`pop(key)`** → حذف عنصر معين باستخدام مفتاحه.
- **`popitem()`** → حذف آخر عنصر تم إدخاله (في Python 3.7+).
- **`del dictionary[key]`** → حذف عنصر معين.
- **`clear()`** → حذف جميع العناصر.

```python
person.pop("age")  # حذف مفتاح معين
print(person)

person.popitem()  # حذف آخر عنصر مضاف
print(person)

# حذف جميع العناصر
person.clear()
print(person)
```

🔹 **حذف القاموس بالكامل باستخدام `del`**:

```python
del person
# print(person)  # سيؤدي هذا إلى خطأ لأن القاموس لم يعد موجودًا
```

---

## 🔹 **التكرار عبر عناصر القاموس (Loop Through a Dictionary)**

يمكنك التكرار عبر `keys`، أو `values`، أو `key-value pairs`.

```python
mydict = {"name": "Ahmed", "age": 22, "city": "Giza"}

# التكرار عبر المفاتيح
for key in mydict:
    print(key, "->", mydict[key])

# التكرار عبر القيم فقط
for value in mydict.values():
    print(value)

# التكرار عبر المفاتيح والقيم معًا
for key, value in mydict.items():
    print(f"{key}: {value}")
```

---

## 🔹 **نسخ القاموس (Copy a Dictionary)**

🔹 لا يمكنك نسخ القاموس باستخدام `=` لأنه ==سيشير إلى نفس الكائن في الذاكرة.==

### **طرق النسخ الصحيحة:**

```python
# استخدام `copy()`
new_dict = mydict.copy()

# استخدام `dict()`
another_dict = dict(mydict)
```

---

## 🔹 **العمليات على القواميس (Dictionary Methods)**

|**الدالة**|**الوصف**|
|---|---|
|`get(key)`|إرجاع القيمة الخاصة بمفتاح معين.|
|`keys()`|إرجاع قائمة بجميع المفاتيح.|
|`values()`|إرجاع قائمة بجميع القيم.|
|`items()`|إرجاع قائمة من `key-value pairs`.|
|`update(dict)`|دمج قاموس آخر داخل القاموس الحالي.|
|`pop(key)`|حذف عنصر باستخدام المفتاح.|
|`popitem()`|حذف آخر عنصر مضاف.|
|`clear()`|حذف جميع العناصر داخل القاموس.|
|`copy()`|إنشاء نسخة من القاموس.|
|`setdefault()`|إرجاع قيمة مفتاح معين، أو إضافته لو غير موجود.|
|`fromkeys(keys, value)`|إنشاء قاموس جديد بمفاتيح محددة وقيمة افتراضية.|

🔹 **مثال على `setdefault()`:**

```python
person.setdefault("gender", "Male")
print(person)
```

🔹 **مثال على `fromkeys()`:**

```python
keys = ["name", "age", "city"]
default_value = "Unknown"
new_dict = dict.fromkeys(keys, default_value)
print(new_dict)
```

---