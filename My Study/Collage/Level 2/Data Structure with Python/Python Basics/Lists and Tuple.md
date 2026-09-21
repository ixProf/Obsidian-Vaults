
# 📌Lists :
حاجه زي ال array في بعض لغات البرمجة تقدر تحفظ فيه قيم معينة وفي انواع تانية شبه الarray في البايثون زي Tuple , Sets , Dictionaries 
- Syntax 
```Python
var_name = [elements,....,...]`
```

**List is Ordered, Changeable, Allow Duplicates**

مرتبة و قابلة للتغير و بتسمح تكرار العناصر
## Access on Lists:


### 🔹indexed :
تقدر تتعامل معاها زي ال String نتعامل بال Index 
بحيث يبدأ ب 0 ديما
```Python
thislist = ["apple", "banana", "cherry"]  
print(thislist[1])
# Output : banana
```
---
### 🔹Negative Indexing
تقدر تتعامل من اخر عنصر لأول عنصر بحيث آخر عنصر هيكون -1 و الي قبله -2 وهكذا 
```Python
thislist =["apple", "banana", "cherry"] 
print(thislist[-1])
# Output : cherry
```
---
### و كمان نقدر نتعامل معاها بـ String Methods 
```Python
thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]  
print(thislist[2:5])
print(thislist[:4])
print(thislist[2:])
#output : cherry , orange , kiwi
#output2 : apple , banana , cherry , orange
#output3 : cherry , orange , kiwi , melon , mango

```
```Python
#check elements in lists
thislist = ["apple", "banana", "cherry"]  
if "apple" in thislist:  
  print("Yes, 'apple' is in the fruits list")
```
--- 
### 🔹Change elements in list :
نقدر نغير العناصر الي جوا ال List بأكتر من طريقة 
```python
thislist = ["apple", "banana", "cherry"]  
thislist[1] = "blackcurrant"  
print(thislist)
# Change banana to blackcurrant
```

#### Change a Range of Item Values
نغير اكتر من عنصر في نفس الوقت 
```python
thislist = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]  
thislist[1:3] = ["blackcurrant", "watermelon"]  
print(thislist)
#Change banana , cherry with blackcurrant , watermelon
```
---
### 🔹 Add List Items
في 3 طرق لإضافة العناصر للقوائم 
#### Append() : 
```python
thislist = ["apple", "banana", "cherry"]  
thislist.append("orange")  
print(thislist)
#thislist = ["apple", "banana", "cherry", "orange"]
```
هتضيف العنصر دا في اخر القائمة
#### insert() : 
```python
thislist = ["apple", "banana", "cherry"]  
thislist.insert(1, "orange")  
print(thislist)
# thislist = [apple , orange , banana , cherry]
```
لو حابب تضيف عنصر في مكان معين بنستخدم ال insert بحيث
```python
.insert(index,elements)
```

#### extend() : 
```python
thislist = ["apple", "banana", "cherry"]  
tropical = ["mango", "pineapple", "papaya"]  
thislist.extend(tropical)  
print(thislist)
#thislist = [apple,banana,cherry,mango,pineapple,papaya]
```

- تضيف اي (tuples, sets, dictionaries etc.). إلى List 
---
### 🔹Remove List Items :
لو حابب تمسح عناصرمن ال List 

#### remove() :
```python
thislist = ["apple", "banana", "cherry"]  
thislist.remove("banana")  
print(thislist)
```

هتمسح عنصر معين من List ولو عنصر متكرر بيتحذف اول عنصر 

#### pop() :
```python
thislist = ["apple", "banana", "cherry"]  
thislist.pop(1)  
thislist.pop()
#to delete last element
print(thislist)
```
لو عايز تمسح عنصر محدد او آخر عنصر

#### del :
```python
thislist = ["apple", "banana", "cherry"]  
del thislist[0]  
print(thislist)
```
لو عايز تمسح عنصر محدد من القائمة
او
```python
thislist = ["apple", "banana", "cherry"]  
del thislist
```
لو عايز تمسح القائمة بالكامل

#### clear() : 
```python
thislist = ["apple", "banana", "cherry"]  
thislist.clear()  
print(thislist)
```
لو عايز تمسح ==**عناصر القائمة**==
لكن القائمة هتفضل موجود بس فاضية

---
### 🔹List Comprehension :
طريقة تقدر تعمل قائمة من قائمة موجودة اصلا بس في سطر برمجي واحد
```python
fruits = ["apple","banana","cherry","kiwi","mango"]
# list with fruits include "a"
newlist = [x for x in fruits if "a" in x]
print(newlist)
# output : [apple, banana , mango]
```
وتقدر تتعامل  معاها بالMethods المختلفة " علشان تعمل شروط وكدا "

---
### 🔹Sort List :
default sort : alphanumerically, ascending
الترتيب الافتراضي : ابجديا ، تصاعديا
```python
thislist = ["orange", "mango", "kiwi", "pineapple", "banana"]  
thislist.sort()  
print(thislist)
```
```python
thislist = [100, 50, 65, 82, 23]  
thislist.sort()  
print(thislist)
```

---
### 🔹Sort Descending :
لو عايز ارتب تنازليا ؟ 
استخدم `reverse = True`
```python
thislist = [100, 50, 65, 82, 23]  
thislist.sort(reverse = True)  
print(thislist)
# output : [100, 82, 65, 50 , 23]
```

---

### 🔹Reverse Order :
لو حابب ارتبهم بالعكس ؟
```python
thislist = [100, 50, 65, 82, 23] 
thislist.reverse()  
print(thislist)
# [23, 82, 65, 50, 100]
```

---

### 🔹Copy a List :
تعمل نسخ لعناصر من قائمة لقائمة تانية
#### copy() :
تعمل نسخ لعناصر من قائمة لقائمة تانية بإستخدام copy
```python
thislist = ["apple", "banana", "cherry"]  
mylist = thislist.copy()  
print(mylist)
```

#### Use the list() method :
بإنك تعمل فايب
```python
thislist = ["apple", "banana", "cherry"]  
mylist = list(thislist)  
print(mylist)
```

---

### 🔹Join Lists :
لو عايز تضم ال two Lists على بعض عندك 3 حلول 
#### 🔹🔹Using extend()
زي كدا بالظبط :

```python
thislist = ["apple", "banana", "cherry"]  
tropical = ["mango", "pineapple", "papaya"]  
thislist.extend(tropical)  
print(thislist)
#thislist = [apple,banana,cherry,mango,pineapple,papaya]
```


#### 🔹🔹Using Loops (for and append()) :
زي كدا بالظبط :

```python
list1 = ["a", "b" , "c"]  
list2 = [1, 2, 3]  
  
for x in list2:  
  list1.append(x)  
  
print(list1)
```

#### 🔹🔹Using List1 + List2 :
زي كدا بالظبط :
```Python
list1 = ["a", "b", "c"]  
list2 = [1, 2, 3]  
  
list3 = list1 + list2  
print(list3)
```

---
# 📌 Tuple

**Tuple Items** :

Tuple items are ordered, ==unchangeable==, and allow duplicate values.
Tuple items are indexed, the first item has index `[0]`, the second item has index `[1]` etc.

بإختصار انها شبه ال List بس الفرق ان دي غير قابلة للتغير في عناصرها وكل العمليات الي اتشرحت فوق تقدر تطبقها على ال Tuple فأنا مش هعيدهم معاك علشان متزهقش 

---


## 🔹Syntax of Tuple :
```python
thistuple = ("apple", "banana", "cherry")  
print(thistuple)
```

 هتكتب بالاقواس العادية الي اسمها :  round brackets.
 وتنطبق عليها كل حاجه خاصة بال List ما عدا انها مبتتغيرش!
 ---
 
## How To Make A Tuple to be Changeable ? 

بص الموضوع بسيط وبديهي قد يكون متوقع، مش قولنا انها شبه ال List ؟
طب ما نحول ال Tuple ل List وبعد كدا نرجعها ل Tuple تاني، فكرة حلوة مش كدا 

ودا فعلا الي بيحصل!

```python
x = ("apple", "banana", "cherry")  
y = list(x)  
y[1] = "kiwi"  
x = tuple(y)  
  
print(x)
# هنا انا عملت تعديل على اول عنصر من ال tuple
```

لو عايز تضيف عنصر ؟

```python
thistuple = ("apple", "banana", "cherry")  
y = list(thistuple)  
y.append("orange")  

thistuple = tuple(y)
# هنا انا ضفت عنصر جديد على ال tuple
```

الحاجة الوحيدة الي ممكن تكون مسموحة ليك تعملها في ال tuple هي انك تضيف tuple على tuple
```python
thistuple = ("apple", "banana", "cherry")  
y = ("orange",)  
thistuple += y  
  
print(thistuple)
```

## ❗❗  ملحوظة مهمة وانت بتعمل tuple جديد لازم تخلي في comma بعد ما تضيف العنصر حتى لو عنصر واحد! 
```python
y = ("orange",)
```


# وبس كدا يكون خلصنا ال Tuple , Lists مع بعض، كل عام وانتم بخير بمناسبة رمضان، ومتنسوناش من دعواتكم بظاهر الغيب ❤️