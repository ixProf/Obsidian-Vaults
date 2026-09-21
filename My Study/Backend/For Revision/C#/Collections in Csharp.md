
# Collections 
**Collections is**:
- Generic : 
- non-Generic

---
## 🟠 أولًا: قبل ما يظهر Generics (Before Generics)

### 1. ✅ **Overloading** (تعدد الدوال)

قبل ما يبقى فيه Generics، كنا نضطر نكتب نفس الدالة بأكثر من شكل لأن كل دالة بتشتغل على نوع معين.

مثال:

```csharp
public void Print(int value) {
    Console.WriteLine(value);
}

public void Print(string value) {
    Console.WriteLine(value);
}
```

- ده اسمه **overloading**، كل دالة شكل.
- مش عملي لو عندك أنواع كتير.

---

### 2. ✅ **Base class object** (`object` class)

- كنا نستخدم `object` لتخزين أي نوع.
    

```csharp
public void Print(object value) {
    Console.WriteLine(value);
}
```

- المشكلة؟
    
    - كل حاجة بتتخزن كـ `object`، ولما تسترجعها لازم تعمل **casting**:
    

```csharp
int x = (int)obj;
```

- وده بيعمل مشاكل:
    
    - Runtime errors.
    - الأداء أضعف (boxing/unboxing).

---

## 🟢 دلوقتي: What & Why Generics

### ✅ What are Generics?

- هي ميزة بتسمح لك تكتب كود عام ==reusable== يشتغل على ==**أي نوع** بدون تكرار وبدون casting.==
    

### ✅ Why Generics?

1. **Type Safety** (أمان من ناحية النوع)
    
2. **Performance** (بدون boxing/unboxing)
    
3. **Code Reusability** (كود واحد يشتغل لأنواع كتير)
    

مثال:

```csharp
public void Print<T>(T value) {
    Console.WriteLine(value);
}
```

---

## 🟢 Generic Method

### ✅ تعريفها:

- دالة تقبل نوع عام (T, U, ...).
    

```csharp
public void Swap<T>(ref T a, ref T b) {
    T temp = a;
    a = b;
    b = temp;
}
```

### ✅ الاستخدام:

```csharp
int x = 5, y = 10;
Swap<int>(ref x, ref y);  // بعد السواب: x = 10, y = 5
```

---

## 🟢 Generic Class

### ✅ تعريفها:

- كلاس بيشتغل على نوع معين، بيتحدد وقت الاستخدام.
    

```csharp
public class Box<T> {
    public T Value;
}
```

### ✅ الاستخدام:

```csharp
Box<int> intBox = new Box<int>();
intBox.Value = 123;

Box<string> strBox = new Box<string>();
strBox.Value = "Hello";
```

---

## 🟢 Generic Constraints (قيود)

### ✅ معناها:

- بتحدد نوع البيانات المسموح بيها في الـ generic.
    

### أهم القيود:

|القيد|المعنى|
|---|---|
|`where T : class`|النوع لازم يكون reference|
|`where T : struct`|النوع لازم يكون value|
|`where T : new()`|لازم يكون له constructor فاضي|
|`where T : BaseClass`|لازم يرث من كلاس معين|
|`where T : Interface`|لازم يطبق انترفيس معين|

### مثال:

```csharp
public class MyClass<T> where T : new() {
    public T Create() {
        return new T();
    }
}
```

---

## 🟢 Built-in Generics in .NET (أمثلة جاهزة)

C# فيها Collections جاهزة باستخدام Generics زي:

| الكلاس                     | الوظيفة             |
| -------------------------- | ------------------- |
| `List<T>`                  | قائمة مرنة زي array |
| `Dictionary<TKey, TValue>` | key-value pairs     |
| `Queue<T>`                 | طابور FIFO          |
| `Stack<T>`                 | مكدس LIFO           |
| `HashSet<T>`               | مجموعة بدون تكرار   |
| `SortedList<TKey, TValue>` | Dictionary بترتيب   |

### مثال:

```csharp
List<int> numbers = new List<int>();
numbers.Add(10);
numbers.Add(20);

Dictionary<string, int> ages = new Dictionary<string, int>();
ages["Ali"] = 25;
```

---

## 🟢 خلاصة سريعة:

|المفهوم|الغرض|
|---|---|
|Overloading|طريقة قديمة لتعدد الأنواع|
|object|طريقة قديمة لكن فيها مشاكل|
|Generics|طريقة حديثة آمنة وسريعة|
|Generic Method|دوال تشتغل على أي نوع|
|Generic Class|كلاس عام قابل لإعادة الاستخدام|
|Constraints|تحديد نوع الجينيريك|
|Built-in Generics|كلاصات جاهزة في .NET زي List و Dictionary|

---

## List

### ✅ 1. تعريف `List<T>` (Define a List)

`List<T>` هي:

- Collection (مجموعة) مرنة.
    
- بتخزن عناصر من **نوع واحد** بس (Generic).
    
- موجودة في `System.Collections.Generic`.
    

### مثال:

```csharp
List<int> numbers = new List<int>();
List<string> names = new List<string>();
```

---

### ✅ 2. إضافة عناصر إلى List

#### 🔹 `Add(item)`

- بيضيف عنصر واحد في آخر الليست.
    

```csharp
numbers.Add(10);
```

⏱️ **الوقت (Time Complexity):**

- **O(1)** في معظم الحالات.
    
- **O(n)** لو الليست اضطرت تكبر (هنتكلم عنها تحت في الـ capacity).
    

---

#### 🔹 `AddRange(IEnumerable<T>)`

- بيضيف مجموعة عناصر مرة واحدة.
    

```csharp
numbers.AddRange(new int[] { 20, 30, 40 });
```

⏱️ **الوقت:**

- **O(n)**، n = عدد العناصر المضافة.
    

---

#### 🔹 `Insert(index, item)`

- بيضيف عنصر في مكان معين (وبيحرك الباقي بعده).
    

```csharp
numbers.Insert(1, 15);  // يضيف 15 في مكان index = 1
```

⏱️ **الوقت:**

- **O(n)**، لأن العناصر بعد الـ index بتتحرك one step يمين.
    

---

#### 🔹 `InsertRange(index, IEnumerable<T>)`

- بيضيف مجموعة عناصر من مكان معين.
    

```csharp
numbers.InsertRange(2, new int[] { 100, 200 });
```

⏱️ **الوقت:**

- **O(n + m)**
    
    - n = عدد العناصر في الليست.
        
    - m = عدد العناصر اللي بتضيفهم.
        

---

### ✅ 3. `Count` و `Capacity`

#### 🔹 `Count`:

- عدد **العناصر الفعلية** الموجودة في الليست.
    

```csharp
Console.WriteLine(numbers.Count);  // مثلاً 5
```

#### 🔹 `Capacity`:

- عدد العناصر اللي الليست تقدر تخزنهم قبل ما تحتاج تعمل resize (تكبر نفسها داخليًا).
    

```csharp
Console.WriteLine(numbers.Capacity);
```

🧠 مثال توضيحي:

```csharp
List<int> list = new List<int>();
Console.WriteLine(list.Capacity);  // مثلاً 0 أو 4 (حسب الإصدار)
list.Add(1);
list.Add(2);
Console.WriteLine(list.Capacity);  // مثلاً 4
list.Add(3);
list.Add(4);
list.Add(5);  // هنا هتضطر تعمل resize
Console.WriteLine(list.Capacity);  // بقت 8
```

⏱️ عملية **زيادة السعة (resize)** بتاخد وقت **O(n)** لأنها بتنسخ العناصر لمصفوفة أكبر.

---

### ✅ 4. إزالة عناصر من الليست

#### 🔹 `Remove(item)`

- بيشيل أول عنصر يساوي القيمة اللي حطيتها.
    

```csharp
numbers.Remove(30);  // لو فيه 30، هيتشال أول واحد بس
```

⏱️ **الوقت:** O(n)

---

#### 🔹 `RemoveAt(index)`

- بيشيل العنصر في المكان اللي انت حددته.
    

```csharp
numbers.RemoveAt(2);
```

⏱️ **الوقت:** O(n)  
لأن العناصر اللي بعده كلها بتتحرك شمال.

---

### 🔹 `RemoveRange(index, count)`

- بيشيل مجموعة عناصر من مكان معين.
    

```csharp
numbers.RemoveRange(1, 2);  // شيل عنصرين من index 1
```

⏱️ **الوقت:** O(n)

---

## 🧠 تلخيص سريع بالجدول:

| العملية            | الدالة        | Time Complexity               |
| ------------------ | ------------- | ----------------------------- |
| إضافة عنصر واحد    | `Add`         | O(1) (أحيانًا O(n) مع Resize) |
| إضافة مجموعة       | `AddRange`    | O(n)                          |
| إدراج عنصر في مكان | `Insert`      | O(n)                          |
| إدراج مجموعة       | `InsertRange` | O(n)                          |
| حذف عنصر بقيمته    | `Remove`      | O(n)                          |
| حذف عنصر بمكانه    | `RemoveAt`    | O(n)                          |
| حذف مجموعة         | `RemoveRange` | O(n)                          |
| معرفة عدد العناصر  | `Count`       | O(1)                          |
| معرفة السعة        | `Capacity`    | O(1)                          |

---

لو حابب أعملك برنامج بسيط يطبق كل الكلام ده بالكود عشان تجربه بنفسك، قولي وهاجهزولك فورًا 💻