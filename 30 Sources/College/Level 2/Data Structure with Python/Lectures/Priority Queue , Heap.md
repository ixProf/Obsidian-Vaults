---
title: "Priority Queue , Heap"
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

• priority queue allows ==arbitrary element insertion==, and allows the removal of the ==element that has first priority.==

When an element is added to a priority queue, the user designates its priority by ==providing an associated key==
بإستخدام ال key بيتم تحديد ال priority، بمعنى صاحب ال key الاعلى هو الاقل في الPriority وممكن وبيخرج اخر واحد من الqueue 
• The element with the ==minimum key== will be the next to be ==removed from the queue.==

- Functions of Priority Queue
	- P.add(k, v): Insert an item with key k and value v into priority queue P. 
		- اضافة العنصر و المفتاح الخاص به (k,v)
	- P.min(): Return a tuple, (k,v), representing the key and value of an item in priority queue P with minimum key (but do not remove the item); an error occurs if the priority queue is empty. 
		- يرجع القيمة الي ليها اقل key = اعلى Priority بدون ما يحذفها.
	- P.remove_min(): Remove an item with minimum key from priority queue P, and return a tuple, (k,v), representing the key and value of the removed item; an error occurs if the priority queue is empty. 
		- يقوم بحذف العنصر الي له اقل key ويرجعه
	- P.is_empty( ): Return True if priority queue P does not contain any items. 
		- بيتشك إذا كانت فاضية ولا لا
	- len(P): Return the number of items in priority queue P.
		- بيرجع طول الQueue

- Example :
	- P.add(5,A) -> {(5,A)}
	- P.add(9,C) -> {(5,A),(9,C)}
	- P.add(3,B) -> {(3,B),(5,A),(9,C)}
	- P.add(7,D) -> {(3,B),(5,A),(7,D),(9,C)}
	- P.min() -> returnValue : (3,B)
	- P.remove_min() -> (3,B) -> {(5,A),(7,D),(9,C)}
	- P.remove_min() -> (5,A) -> {(7,D),(9,C)}
	- Len(P) -> 2
	- P.remove_min() -> (7,D) -> {(9,C)}
	- P.remove_min() -> (9,C) -> { }
	- P.is_empty() -> True
	- P.remove_min() -> error
- Implementation with an Unsorted List
	- ![[Pasted image 20250516114354.png]]
	- add هتعامل معاملة ال append 
	- اما في min فأنت هتضطر تعمل search لحد ما يوصل للعنصر الاقل وكذلك ال remove_min  علشان كدا يا معلم ال runtime بتاعه بطيئ O(n)

- Implementation with a Sorted List
	- ![[Pasted image 20250516114759.png]]
		- هنا بما انها مرتبة ف الشئ الوحيد الي هيكون بطيئ هو ال append , add لكن ال min يسهل تحديده لانه اصلا مرتب

## 🔷 ما هو الـ Heap؟

**Heap** هو نوع من **شجرة ثنائية (Binary Tree)** تُستخدم عادةً لتنفيذ **Priority Queue** (قائمة الأولويات).

---

## 🔸 لماذا نستخدم الـ Heap؟

لأن الطرق التقليدية لتنفيذ قائمة الأولويات (Priority Queue) باستخدام **قائمة مرتبة** أو **غير مرتبة** فيها عيوب:

|الطريقة|وقت الإدراج|وقت إيجاد أو حذف الأصغر|
|---|---|---|
|قائمة غير مرتبة|O(1)|O(n)|
|قائمة مرتبة|O(n)|O(1)|

لكن الـ **Heap** يسمح بـ:  
✅ الإدراج (Insertion) في وقت **O(log n)**  
✅ حذف/إيجاد الأصغر (Remove min) في وقت **O(log n)**  
وهذا أفضل كثيرًا.

---

## 🔸 خصائص الـ Heap

### 1. Heap-Order Property (ترتيب القيم في الهيب)

- في الـ **Min-Heap**: كل عنصر (node) يكون مفتاحه==**أكبر أو يساوي**== مفتاح أبيه.
    
- أي أن **أصغر قيمة دائمًا  ==الجذر (root)==**.
    
- لذا، كلما نزلت من الجذر إلى الأوراق، تكون القيم ==غير متناقصة (non-decreasing).==
    

### 2. Complete Binary Tree (شجرة ثنائية كاملة)

- كل المستويات مكتملة تمامًا ==ما عدا المستوى الأخير==.
    
- في المستوى الأخير، يتم ملء العناصر من ==**اليسار إلى اليمين**.==
    
- هذا يجعل الهيب **مضغوطًا (Compact)**، وبالتالي==**قليل الارتفاع (Height = ⌊log n⌋)**.==

---

## 🔸 العمليات الأساسية في Heap

### ✔️ الإضافة (Insertion)

عند تنفيذ `add(k, v)`:

1. نضيف العنصر الجديد في **==اقصى اليمين بالمستوى الأخير** (للحفاظ على خاصية الشجرة الكاملة).==
    
2. نبدأ عملية تسمى **Up-Heap Bubbling**:
    
    - نقارن العنصر==الجديد مع أبيه.==
        
    - ==إذا كان أصغر، نقوم بتبديلهما.==
        
    - نكرر ذلك حتى يصل العنصر إلى مكانه الصحيح (أو يصل إلى الجذر).
        

### ✔️ حذف الأصغر (Remove Min)

عند تنفيذ `remove_min()`:

1. ==نحذف **الجذر== (الذي فيه أصغر قيمة)**.
    
2. نأخذ **==العنصر الأخير==** في الهيب ونضعه في الجذر مؤقتًا.
    
3. نبدأ عملية تسمى **Down-Heap Bubbling**:
    
    - نقارن هذا العنصر مع أبناءه.و
        
    - إذا كان أكبر من أحد الأبناء، نقوم بتبديله مع الأصغر منهما.
        
    - نكرر حتى يستقر في موقعه الصحيح.
        

---

## 🔸 التمثيل في الذاكرة

عادةً ما يتم تمثيل الهيب في **مصفوفة (Array)** بدلًا من شجرة حقيقية.  
في هذه الحالة، للعقدة في الموقع `i`:

- الأب = في الموقع `⌊i/2⌋`
    
- الابن الأيسر = `2i`
    
- الابن الأيمن = `2i + 1`
    

---

## 💡 ملخص سريع:

|الخاصية|Heap|
|---|---|
|النوع|شجرة ثنائية كاملة|
|الشرط|كل ابن ≥ الأب (Min-Heap)|
|أصغر عنصر|دائمًا في الجذر|
|زمن الإضافة|O(log n)|
|زمن الحذف|O(log n)|
|التمثيل|غالبًا في مصفوفة|

---

أكيد! إليك شرح **Bottom-Up Heap Construction** و**وحدة `heapq` في بايثون** و**خوارزمية Heap Sort** بشكل مبسط وواضح باللغة العربية:

---

## 🔷 بناء الهيب من الأسفل (Bottom-Up Heap Construction)

### 🟡 الطريقة العادية:

- إذا بدأت بهيب فارغ وأضفت `n` عناصر باستخدام `add()`، فكل عملية إضافة تأخذ وقت **O(log n)**.
    
- بالتالي، إضافة كل العناصر تأخذ **O(n log n)** في أسوأ الحالات.
    

### 🟢 الطريقة الأفضل: البناء من الأسفل

- إذا كانت كل العناصر موجودة مسبقًا، يمكن بناء الهيب دفعة واحدة باستخدام طريقة **من الأسفل للأعلى (bottom-up)**.
    
- هذه الطريقة تأخذ وقت **O(n)** فقط — أسرع بكثير.
    
- يتم ذلك عن طريق ترتيب العناصر في قائمة، ثم تطبيق **down-heap bubbling** من منتصف القائمة حتى الجذر.
    

✅ هذه الطريقة تُستخدم في المرحلة الأولى من **Heap Sort**.

---

## 🐍 وحدة `heapq` في بايثون

بايثون توفر مكتبة مدمجة اسمها `heapq` تسمح لك بإدارة قائمة عادية كأنها **Min-Heap**.

### 🧰 أهم الدوال:

| الدالة                   | الوصف                                                       | الزمن      |
| ------------------------ | ----------------------------------------------------------- | ---------- |
| `heappush(L, e)`         | تضيف العنصر `e` إلى القائمة `L` وتعيد ترتيب الهيب           | O(log n)   |
| `heappop(L)`             | تحذف وتُرجع أصغر عنصر من `L`                                | O(log n)   |
| `heappushpop(L, e)`      | ==تضيف العنصر `e` ثم تُرجع الأصغر==                         | O(log n)   |
| `heapreplace(L, e)`      | ==تحذف الأصغر ثم تضيف `e`== (العنصر الجديد لا يُعاد كأصغر)  | O(log n)   |
| `heapify(L)`             | تحول القائمة `L` إلى هيب منظم                               | **O(n)**   |
| `nsmallest(k, iterable)` | تُرجع أصغر `k` عناصر                                        | O(n log k) |
| `nlargest(k, iterable)`  | تُرجع أكبر `k` عناصر                                        | O(n log k) |

### 🧪 مثال عملي:

```python
import heapq

a = [3, 5, 1, 2, 6, 8, 7]
heapq.heapify(a)              # نحول القائمة إلى Min-Heap
print(a)                      # النتيجة: [1, 2, 3, 5, 6, 8, 7]
print(heapq.heappop(a))       # يُرجع: 1 (أصغر عنصر)
print(a)                      # النتيجة بعد الحذف: [2, 5, 3, 7, 6, 8]
```

---

## 📦 خوارزمية Heap Sort

### 📌 الهدف:

ترتيب عناصر مجموعة `C` تحتوي على `n` عنصر في **O(n log n)**، أسرع بكثير من خوارزميات مثل **insertion sort** (التي تأخذ O(n²)).

### ✅ كيف تعمل الخوارزمية:

#### المرحلة 1 – بناء الهيب:

- إما بإضافة كل عنصر على حدة → O(n log n)
    
- أو باستخدام ==بناء من الأسفل (heapify) → **O(n)**==
    

#### المرحلة 2 – حذف العناصر واحدة تلو الأخرى:

- في كل مرة ==نحذف أصغر عنصر (الجذر) → O(log n)==
    
- نكرر العملية ==`n` مرة== → المجموع = ==**O(n log n)**==
    

### ⏱️ الوقت الكلي:

==**O(n log n)**==

---

## 📝 ملخص:

|العملية|الزمن|
|---|---|
|إدخال `n` عناصر بالترتيب|O(n log n)|
|بناء هيب دفعة واحدة|**O(n)**|
|حذف كل العناصر|O(n log n)|
|الوقت الكلي لـ Heap Sort|**O(n log n)**|

---

هل تحب تشوف مثال عملي لخوارزمية Heap Sort كاملة بلغة بايثون؟