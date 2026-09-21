# أولًا: يعني إيه Memory أصلاً؟

أي برنامج بيشتغل بيتحجزله مساحة في الرام.  
المساحة دي بتتقسم لأجزاء، أهمهم:

- Stack
- Heap

الاتنين موجودين جوه **Process Memory**، بس كل واحد ليه طريقة إدارة مختلفة تمامًا.

---

# أولًا: Stack

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AiFsZC_GQ229Sz8jPveAAUg.png)



![Image](https://miro.medium.com/1%2ArLV0q6if8Drx1PbrncybXw.png)

![Image](https://phaariz.wordpress.com/files/2009/10/stack-operations-push-and-pop.jpg)

## تعريفه

الـ Stack هو جزء من الذاكرة بيخزن:

- Local variables
- Parameters
- Return addresses
- Method calls (Stack Frames)


---

## بيتدار إزاي؟

الـ Stack شغال بمبدأ:

> LIFO → Last In First Out

زي رصة أطباق 🍽️  
آخر طبق تحطه هو أول طبق تشيله.

---

## مثال عملي

```csharp
void Main()
{
    int x = 5;
    int y = 10;
    Add(x, y);
}

void Add(int a, int b)
{
    int result = a + b;
}
```

### اللي بيحصل في الذاكرة:

1. Main تتحط في Stack Frame
2. x و y يتحطوا
3. لما Add تتنادي → يتحجز Stack Frame جديد
4. a و b و result يتحطوا
5. لما Add تخلص → Stack Frame يتمسح بالكامل

كل ده بيحصل بسرعة جدًا

---

## خصائص الـ Stack

|خاصية|التفسير|
|---|---|
|سريع جدًا|allocation سريع جدًا|
|حجمه محدود|لو كبر يحصل StackOverflow|
|بيتمسح تلقائيًا|أول ما الميثود تخلص|
|Thread-specific|كل Thread ليه Stack خاص|

---

# ثانيًا: Heap

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AiFsZC_GQ229Sz8jPveAAUg.png)

## تعريفه

الـ Heap هو المكان اللي بيتخزن فيه:

- Objects
- Arrays
- Reference types
    

أي حاجة بتتعمل بـ `new` غالبًا بتتحط في Heap.

---

## مثال

```csharp
Person p = new Person();
```

### اللي بيحصل:

- المتغير p نفسه بيتحط في Stack
- الـ object Person بيتحط في Heap
- p بيشاور على مكان الobject في Heap

يعني:

```
Stack → p → 0x01A3 (address)
Heap  → Person Object
```

---

## خصائص الـ Heap

|خاصية|التفسير|
|---|---|
|أبطأ من Stack|لأنه ديناميك|
|حجمه أكبر|مفيش limit صغير زيه|
|بيتدار بـ Garbage Collector|GC هو اللي بيمسح|
|Shared بين Threads|مش خاص بـ Thread واحد|

---

# الفرق الجوهري بينهم

|مقارنة|Stack|Heap|
|---|---|---|
|نوع البيانات|Value Types|Reference Types|
|السرعة|أسرع|أبطأ|
|إدارة الذاكرة|تلقائية|Garbage Collector|
|الحجم|صغير|كبير|
|Lifetime|مرتبط بالMethod|مرتبط بالReference|

---

# مثال مهم جدًا (Value vs Reference)

```csharp
int a = 10;
int b = a;
b = 20;
```

✔ ده Stack  
✔ كل واحد له نسخة مستقلة

---

```csharp
Person p1 = new Person();
Person p2 = p1;
p2.Name = "Ali";
```

✔ ده Heap  
✔ الاتنين بيشاوروا على نفس المكان  
✔ التعديل يظهر على الاثنين

---

# نقطة Advanced جدًا

## Value Types ممكن تتحط في Heap؟

أيوه

لو كانت:

- جزء من Object
- أو حصل لها Boxing

مثال:

```csharp
object obj = 5; // Boxing
```

هنا:

- 5 كانت في Stack
- اتحولت لـ Object
- اتحطت في Heap

---

# Stack Overflow بيحصل إزاي؟

لو عملت Recursion مالوش نهاية:

```csharp
void Test()
{
    Test();
}
```

كل مرة Stack Frame جديد يتحجز  
لحد ما الذاكرة تخلص

---

# Garbage Collector بيشتغل إزاي؟

الـ GC بيعدي على Heap ويشوف:

- هل في Object مفيش حد بيشاور عليه؟
- لو لأ → يتم مسحه

وده بيحصل في Generations:

- Gen 0
- Gen 1
- Gen 2

---

# تشبيه واقعي يخليك عمرك ما تنسى

## Stack = مكتب الشغل

تحط الورق اللي شغال عليه دلوقتي  
تخلص → ترميه فورًا

## Heap = مخزن الشركة

تحط فيه الحاجات الكبيرة  
وتيجي شركة النظافة (GC) تنظف

---

# أهم نقطة لازم تحفظها كمبرمج .NET

> Stack سريع لكنه محدود  
> Heap أكبر لكنه أبطأ  
> Value Types غالبًا Stack  
> Reference Types غالبًا Heap


---

- Stack Frames بالتفصيل
- Memory Layout في CLR
- How GC Actually Works Internally
- Boxing/Unboxing بالـ IL
- Performance optimization

