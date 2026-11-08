---
title: "DirectoryManager Class"
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

هذا شرح شامل وتفصيلي لكلاس `DirectoryManager.cs` بنفس الأسلوب.

---

### **أولاً: المنطق العام (The Logic)**

كلاس `DirectoryManager` هو **"أمين المكتبة"** أو **"مسؤول السجلات"**.
بينما `FileSystem` يهتم ببيانات الملف (محتواه)، `DirectoryManager` يهتم بـ **بيانات التعريف (Metadata)**.

1. **القاعدة الذهبية (32-Byte Rule):**
* في نظام FAT، "المجلد" هو عبارة عن ملف، لكن محتواه ليس نصاً أو صورة، بل قائمة من "بطاقات التعريف".
* كل بطاقة (Entry) حجمها ثابت: **32 بايت**.
* تحتوي البطاقة على: الاسم (11 بايت)، النوع (1 بايت)، مكان البداية (4 بايت)، الحجم (4 بايت).


2. **تنسيق الأسماء (8.3 Format):**
* النظام القديم لا يخزن الاسم كـ `"file.txt"`.
* بل يقسمه: 8 حروف للاسم + 3 للامتداد.
* يخزنه كـ `"FILE    TXT"`. الـ `DirectoryManager` هو المسؤول عن هذا التنسيق.



---

### **ثانياً: شرح المتغيرات**

```csharp
private FAT fat; // عشان نعرف نمشي وراء سلاسل الكلاسترات

public DirectoryManager(FAT fat)
{
    this.fat = fat;
}

```

* يعتمد فقط على `FAT` لمعرفة "أين تكملة الفولدر؟" لو كان الفولدر كبيراً ويحتوي على ملفات كثيرة.

---

### **ثالثاً: شرح الدوال (Methods) بالتفصيل**

#### **1. تنسيق الأسماء (`Format83`)**

* **الوظيفة:** تحويل الاسم البشري (`file.txt`) لاسم النظام (`FILE    TXT`).
* **اللوجيك:**
* تحويل الكل لـ `Upper Case`.
* لو فيه نقطة (`.`): خذ ما قبلها (بحد أقصى 8) وكمل مسافات، وخذ ما بعدها (بحد أقصى 3) وكمل مسافات.
* لو مفيش نقطة: خذ الاسم كله (بحد أقصى 11).



#### **2. القراءة والبحث (`ReadDirectory`, `FindEntry`)**

**أ. دالة `ReadDirectory` (المسح الضوئي)**

* **الوظيفة:** تحويل البايتات الموجودة في الكلاستر إلى قائمة كائنات `DirectoryEntry`.
* **الخطوات:**
1. تبدأ من الكلاستر المحدد (`start`).
2. تقرأ 1024 بايت.
3. تمشي حلقة تكرار (`Loop`) كل 32 خطوة.
4. تأخذ كل 32 بايت تحولهم لـ `DirectoryEntry`.
5. لو الكلاستر خلص وفي تكملة في الـ FAT، تروح للكلاستر اللي بعده وتكمل قراءة.



**ب. دالة `FindEntry` (البحث)**

* **الوظيفة:** البحث عن ملف معين بالاسم.
* **الخطوات:**
1. تنسق الاسم اللي بتدور عليه بـ `Format83`.
2. تنادي `ReadDirectory` عشان تجيب كل الموجود.
3. تقارن الأسماء واحد واحد. لو لقيته ترجعه، لو خلصت وما لقيتش ترجع `null`.



#### **3. الإضافة (`AddEntry`) - الدالة الأصعب**

* **الوظيفة:** حشر ملف جديد في القائمة.
* **السيناريو:**
1. تنسق الاسم وتتأكد إنه مش مكرر.
2. تمشي في كلاسترات الفولدر وتدور على "كرسي فاضي".
3. **الكرسي الفاضي:** هو أي 32 بايت، البايت الأول فيهم بـ `0x00`.
4. لو لقيت مكان فاضي: اكتب البيانات فيه (`WriteEntry`) واحفظ الكلاستر.
5. **لو الفولدر مليان؟** (كل الكراسي محجوزة):
* تطلب من الـ FAT كلاستر جديد (`AllocateChain`).
* تربط الكلاستر القديم بالجديد.
* تكتب الملف في أول مكان في الكلاستر الجديد.





#### **4. الحذف (`RemoveEntry`)**

* **الوظيفة:** وضع علامة "محذوف".
* **اللوجيك:**
1. تبحث عن الملف.
2. لو لقيته:
* تحرر سلسلة الكلاسترات بتاعته في الـ FAT (عشان نفضي مساحة الديسك).
* تروح لمكانه في الفولدر، وتخلي أول بايت `0x00`.


3. كده `ReadDirectory` المرة الجاية هتفكر المكان ده فاضي وتتجاهله.



---

### **رابعاً: شرح الكود سطراً بسطر (`Code Walkthrough`)**

سنركز على الدالتين الرئيسيتين: القراءة والإضافة.

#### **كود `ReadDirectory**`

```csharp
public List<DirectoryEntry> ReadDirectory(int start)
{
    List<DirectoryEntry> list = new List<DirectoryEntry>();
    int cur = start;

    // 1. حلقة للمشي وراء سلسلة الكلاسترات (لو الفولدر كبير)
    while (cur != -1 && cur != 0)
    {
        byte[] data = VirtualDisk.ReadCluster(cur); // اقرأ 1024 بايت

        // 2. حلقة لتقطيع الكلاستر لـ 32 قطعة
        for (int i = 0; i < FSConstants.CLUSTER_SIZE; i += 32)
        {
            // لو أول بايت 0، يبقى المكان ده فاضي، فوته
            if (data[i] == 0x00) continue;

            // 3. استخراج البيانات
            byte[] nameBytes = new byte[11];
            Array.Copy(data, i, nameBytes, 0, 11); // خد الاسم

            // تحويل البايتات لـ Object
            DirectoryEntry entry = new DirectoryEntry
            {
                Name = Converter.BytesToString(nameBytes),
                Attribute = data[i + 11], // النوع في البايت رقم 11
                FirstCluster = BitConverter.ToInt32(data, i + 12), // الكلاستر في 12
                FileSize = BitConverter.ToInt32(data, i + 16)      // الحجم في 16
            };

            list.Add(entry);
        }

        // 4. هات الكلاستر اللي عليه الدور من الـ FAT
        cur = fat.GetFatEntry(cur);
    }

    return list;
}

```

---

#### **كود `AddEntry**`

```csharp
public void AddEntry(int dir, DirectoryEntry entry)
{
    entry.Name = Format83(entry.Name); // تنسيق الاسم

    // ممنوع التكرار
    if (FindEntry(dir, entry.Name) != null)
        throw new Exception("Entry already exists");

    int cur = dir;

    // حلقة البحث عن مكان فاضي
    while (true)
    {
        byte[] data = VirtualDisk.ReadCluster(cur);

        for (int i = 0; i < FSConstants.CLUSTER_SIZE; i += 32)
        {
            if (data[i] == 0x00) // لقينا مكان فاضي!
            {
                WriteEntry(data, i, entry); // اكتب البيانات في المصفوفة
                VirtualDisk.WriteCluster(cur, data); // احفظ الكلاستر ع الديسك
                return; // خلصنا، اخرج
            }
        }

        // لو الكلاستر ده مفيهوش مكان، شوف اللي بعده
        int next = fat.GetFatEntry(cur);
        
        // لو مفيش بعده (وصلنا للنهاية والملف لسه ماتكتبش)
        if (next == -1) break; 
        
        cur = next;
    }

    // === وصلنا هنا يعني كل الكلاسترات مليانة ===
    
    // 1. احجز كلاستر جديد
    int newCluster = fat.AllocateChain(1);
    
    // 2. اربط الكلاستر الحالي بالجديد في الـ FAT
    fat.SetFatEntry(cur, newCluster);
    fat.SetFatEntry(newCluster, -1); // الجديد هو النهاية

    // 3. جهز الكلاستر الجديد واكتب الملف في أول خانة فيه
    byte[] newData = new byte[FSConstants.CLUSTER_SIZE];
    WriteEntry(newData, 0, entry);
    VirtualDisk.WriteCluster(newCluster, newData);
}

```

---

#### **كود `WriteEntry` (مساعد)**

```csharp
private void WriteEntry(byte[] data, int offset, DirectoryEntry e)
{
    // تحويل الاسم لبايتس
    byte[] nameBytes = Converter.StringToBytes(e.Name, 11);

    // الرص (Packing): حط كل حاجة في مكانها بالظبط حسب الـ Offset
    Array.Copy(nameBytes, 0, data, offset, 11); // الاسم (0-10)
    data[offset + 11] = e.Attribute;            // النوع (11)
    
    // تحويل الأرقام ونسخها
    Array.Copy(BitConverter.GetBytes(e.FirstCluster), 0, data, offset + 12, 4);
    Array.Copy(BitConverter.GetBytes(e.FileSize), 0, data, offset + 16, 4);
}

```

### **الخلاصة**

كلاس `DirectoryManager` هو المسؤول عن تحويل **"فوضى البايتات"** إلى **"نظام ملفات منظم"** ومفهوم. هو الذي يجعل جهاز الكمبيوتر يفهم أن هذه الـ 32 بايت تعني "ملف نصي اسمه Hello ومكانه في الكلاستر 50".