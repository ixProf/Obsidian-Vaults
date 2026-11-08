---
title: "Shell Class"
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

هذا شرح شامل ومفصل لكلاس `Shell.cs` كما طلبت. سنقسم الشرح لثلاثة أجزاء: **المنطق العام (Logic)**، **شرح كل دالة (Methods)**، و**شرح الكود** سطر بسطر.

---

### **أولاً: المنطق العام للكلاس (The Logic)**

كلاس `Shell` هو **"المايسترو"** أو **"واجهة المستخدم" (Interface)**. هو الوسيط بينك وبين النظام المعقد (FAT, DirectoryManager, VirtualDisk).

1. **دوره:** لا يعرف كيف يكتب بايت واحد على الديسك. وظيفته فقط استقبال الأوامر النصية منك (مثل `mkdir`, `cd`)، وترجمتها لاستدعاءات دوال (Function Calls) في كلاس `FileSystem`.
    
2. **الذاكرة (State):** يحتفظ بمعلومة واحدة حيوية: **"أنا واقف فين دلوقتي؟"** (`currentDir`).
    
3. **دورة الحياة:** يعمل في حلقة لا نهائية (`Infinite Loop`)، يطبع السطر `H:\>` وينتظر منك أمراً، ينفذه، ثم يعيد الكرة، ولا يتوقف إلا لو كتبت `exit`.
    

---

### **ثانياً: شرح المتغيرات الأساسية**

C#

```
private FileSystem fs;          // الأداة اللي بتنفذ الشغل الحقيقي
private DirectoryManager dir;   // الأداة اللي بتبحث عن الأسماء
private FAT fat;                // عشان نحفظ التغييرات عند الخروج

private int currentDir;         // أهم متغير: رقم الكلاستر للفولدر الحالي
private Stack<int> dirStack;    // ذاكرة عشان نعرف نرجع لورا (cd ..)
```

- **`currentDir`:** يبدأ بقيمة `5` (Root Directory). لما تدخل فولدر، الرقم ده بيتغير لرقم الكلاستر بتاع الفولدر الجديد.
    
- **`dirStack`:** بما أن نظام FAT البسيط لا يسجل "من هو الأب"، نستخدم الـ Stack لتسجيل المسار. كل ما تدخل فولدر، نرمي مكانك القديم في الـ Stack.
    

---

### **ثالثاً: شرح الدوال (Methods) بالتفصيل**

#### **1. المحرك الرئيسي (`Run` & `Execute`)**

دالة Run():

هي القلب النابض للبرنامج.

- تعمل `while (true)`.
    
- تعرض `H:\>` .
    
- تقرأ السطر منك.
    
- تستخدم `try-catch` عشان لو حصل أي خطأ (مثلاً ملف مش موجود)، البرنامج ما يقفلش، بل يعرض رسالة الخطأ ويكمل.
    

دالة Execute(string input):

هي "السنترال" أو المحول.

- تنادي على `Parse` لتقطيع الكلام.
    
- تأخذ أول كلمة (مثل `ls` أو `mkdir`) وتحولها لحروف صغيرة (`ToLower`) عشان لو كتبتها `LS` تشتغل برضه.
    
- تستخدم `switch` لتوجيه الأمر للدالة المناسبة.
    

دالة Parse(string input):

وظيفتها تقطيع الجملة لكلمات.

- **الذكاء فيها:** بتتعامل مع علامات التنصيص `""`.
    
- لو كتبت `echo "Hello World" file.txt`:
    
    - الطبيعي يقطعها 4 كلمات.
        
    - لكن الدالة دي بتشوف الـ `"` فتعتبر `Hello World` كلمة واحدة. هذا ضروري جداً للأوامر اللي فيها مسافات.
        

---

#### **2. أوامر التنقل (`cd`)**

**دالة `Cd`:**

- **`cd ..`:** بتشوف الـ `dirStack`. لو فيه بيانات، بتعمل `Pop` (تسحب آخر رقم) وترجع `currentDir` للقيمة دي.
    
- **`cd FolderName`:**
    
    1. تبحث عن الاسم باستخدام `dir.FindEntry`.
        
    2. تتأكد إنه **موجود** وإنه **Directory** (`Attribute == 0x10`).
        
    3. لو تمام، تعمل `Push` للمكان الحالي في الـ Stack (عشان نعرف نرجعله).
        
    4. تحدث `currentDir` لرقم كلاستر الفولدر الجديد.
        

---

#### **3. أوامر إدارة الملفات (`mkdir`, `touch`, `rm`, `rmdir`)**

هذه الدوال عبارة عن **Wrappers** (أغلفة).

- تتأكد إنك كتبت العدد الصح من الكلمات (مثلاً `mkdir` لازم بعدها اسم).
    
- تنادي الدالة المقابلة في `FileSystem`.
    
- مثال `Touch`: تتأكد الأول إن الملف مش موجود بـ `FindEntry`، لو مش موجود تنادي `fs.CreateFile`.
    

---

#### **4. أوامر المحتوى (`cat`, `echo`)**

**دالة `Cat`:**

- تقرأ الملف كـ `byte[]` باستخدام `fs.ReadFile`.
    
- تحوله لنص `string` باستخدام `Encoding.ASCII.GetString` وتعرضه.
    

دالة Echo:

فيها منطق زيادة شوية:

- بتاخد النص وتحوله لـ `byte[]`.
    
- لو المستخدم كتب `--append`، بتقرأ محتوى الملف القديم الأول، وتدمجه مع الجديد باستخدام دالة مساعدة `Combine`.
    
- لو الملف مش موجود، بتعمله `CreateFile`.
    
- في الآخر تكتب البيانات بـ `fs.WriteFile`.
    

---

#### **5. أوامر النقل والنسخ (`cp`, `mv`)**

**دالة `Cp` (Copy):**

1. تقرأ الملف الأصلي وتحمله في الرامات (`ReadFile`).
    
2. تنشئ ملفاً جديداً بالاسم الثاني.
    
3. تكتب البيانات في الملف الجديد (`WriteFile`).
    

**دالة `Mv` (Move) - (في الكود المرفق):**

- تنفذ عملية **Copy** ثم **Delete**.
    

1. تقرأ الملف القديم.
    
2. تنشئ ملفاً جديداً وتكتب فيه البيانات.
    
3. تمسح الملف القديم (fs.DeleteFile).
    
    (ملحوظة: هذا الكود كما هو في الملف المرفق يقوم بإعادة التسمية أو النقل كملف جديد، ولا يدعم النقل الذكي للمجلدات إلا بالتعديل الذي ناقشناه سابقاً).
    

---

#### **6. أوامر النظام (`ls`, `clear`, `exit`, `help`)**

- **`Ls`:** تجلب قائمة الملفات بـ `dir.ReadDirectory` وتعرض أسمائها.
    
- **`Clear`:** تنظف الشاشة بـ `Console.Clear()`.
    
- **`Exit`:** تحفظ الـ FAT (`fat.Save`)، تغلق الديسك (`VirtualDisk.CloseDisk`)، وتغلق البرنامج تماماً.
    

---

### **رابعاً: كود مساعد (`Helpers`)**

دالة Combine(byte[] a, byte[] b):

بما إن المصفوفات في C# حجمها ثابت، الدالة دي بتعمل مصفوفة جديدة حجمها (طول أ + طول ب)، وتنسخ الاتنين فيها ورا بعض. بنستخدمها في echo --append.

---

### **الخلاصة**

كلاس `Shell` هو المدير اللي واقف على الشباك.

- يستلم الطلب.
    
- يقطعه ويفهمه.
    
- يبعت "الصنايعية" (`FileSystem`) ينفذوا الشغل.
    
- يسلمك النتيجة أو رسالة الخطأ.

---
هنا شرح تفصيلي لكلاس `Shell.cs`، ميثود ميثود، بالكود والمنطق (Logic) الخاص بكل واحدة، بناءً على الملف الذي قمت برفعه.

كلاس `Shell` هو **الوسيط (Controller)**. وظيفته استقبال الأوامر النصية من المستخدم، وتحويلها لاستدعاءات لدوال النظام (`FileSystem` و `DirectoryManager`).

---

### **1. المتغيرات والكونستركتور (Setup)**

C#

``` cs
private FileSystem fs;
private DirectoryManager dir;
private FAT fat;
private int currentDir;
private Stack<int> dirStack = new Stack<int>(); 

public Shell(FileSystem fs, DirectoryManager dir, FAT fat)
{
    this.fs = fs;
    this.dir = dir;
    this.fat = fat;
    currentDir = FSConstants.ROOT_DIR_FIRST_CLUSTER; // البداية دائماً عند 5
}
```

- **`currentDir`:** المتغير الأهم. يخزن "رقم الكلاستر" للفولدر الذي نقف فيه حالياً. يبدأ بـ `5` (الـ Root).
    
- **`dirStack`:** يستخدم لتخزين المسار عند الدخول في فولدرات عميقة، لكي نستطيع العودة للخلف (`cd ..`).
    

---

### **2. التشغيل الأساسي (`Run`)**

C#

```c#
public void Run()
{
    while (true) // 1. حلقة لا نهائية
    {
        Console.Write("H:\\> "); // 2. عرض المؤشر
        string input = Console.ReadLine(); // 3. انتظار الكتابة

        if (string.IsNullOrWhiteSpace(input)) continue;

        try
        {
            Execute(input.Trim()); // 4. محاولة التنفيذ
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message); // 5. صيد الأخطاء ومنع الكراش
        }
    }
}
```

- **الوظيفة:** تبقي البرنامج يعمل باستمرار. أهم نقطة هي `try-catch`، التي تضمن أنه لو حدث خطأ (مثل "ملف غير موجود")، البرنامج يطبع الخطأ ولا يغلق.
    

---

### **3. الموزع (`Execute`)**

C#

```cs
private void Execute(string input)
{
    List<string> args = Parse(input); // 1. تقطيع الجملة لكلمات
    if (args.Count == 0) return;

    string cmd = args[0].ToLower(); // 2. توحيد حالة الحروف (Case Insensitive)

    switch (cmd) // 3. توجيه الأمر للدالة المناسبة
    {
        case "help": Help(); break;
        case "exit": Exit(); break;
        case "ls": Ls(); break;
        case "cd": Cd(args); break;
        // ... باقي الأوامر ...
        default: Console.WriteLine("Unknown command"); break;
    }
}
```

- **الوظيفة:** هو "السنترال". يأخذ السطر، يقطعه، يفهم أول كلمة (الأمر)، وينادي الدالة المختصة.
    

---

### **4. التنقل (`Cd`)**

C#

```cs
private void Cd(List<string> args)
{
    if (args.Count < 2) throw new Exception("Usage: cd <dir>");

    // الحالة 1: الرجوع للخلف
    if (args[1] == "..") 
    {
        if (dirStack.Count > 0)
            currentDir = dirStack.Pop(); // استرجاع آخر مكان كنا فيه
        return;
    }

    // الحالة 2: الدخول لفولدر
    DirectoryEntry d = dir.FindEntry(currentDir, args[1]); // البحث عنه

    if (d == null || d.Attribute != 0x10) // التأكد أنه موجود وأنه فولدر
        throw new Exception("Directory not found");

    dirStack.Push(currentDir); // حفظ المكان الحالي في الذاكرة
    currentDir = d.FirstCluster; // الانتقال للكلاستر الجديد
}
```

- **المنطق:** يعتمد على `dirStack` لمحاكاة هيكلية الشجرة، لأن نظام FAT البسيط لا يخزن رابطاً للأب (Parent).
    

---

### **5. عرض المحتوى (`Ls`)**

C#

```cs
private void Ls()
{
    foreach (var e in dir.ReadDirectory(currentDir))
        Console.WriteLine(e.Name);
}
```

- **الوظيفة:** تطلب من `DirectoryManager` قراءة محتويات الكلاستر الحالي (`currentDir`) وتعرض الأسماء فقط.
    

---

### **6. إنشاء وحذف المجلدات (`Mkdir`, `Rmdir`)**

C#

```cs
private void Mkdir(List<string> args)
{
    if (args.Count < 2) throw new Exception("Usage: mkdir <dir>");
    fs.CreateDirectory(currentDir, args[1]);
}

private void Rmdir(List<string> args)
{
    if (args.Count < 2) throw new Exception("Usage: rmdir <dir>");
    fs.RemoveDirectory(currentDir, args[1]);
}
```

- **الوظيفة:** مجرد "تغليف" (Wrappers). تأخذ الأمر من المستخدم وتمرره لـ `FileSystem` ليقوم بالعمل الحقيقي (حجز كلاستر، إنشاء Entry، إلخ).
    

---

### **7. التعامل مع الملفات (`Touch`, `Rm`)**

C#

```cs
private void Touch(List<string> args)
{
    if (args.Count < 2) throw new Exception("Usage: touch <file>");
    
    // لو الملف مش موجود، انشئه
    if (dir.FindEntry(currentDir, args[1]) == null)
        fs.CreateFile(currentDir, args[1]);
}

private void Rm(List<string> args)
{
    if (args.Count < 2) throw new Exception("Usage: rm <file>");
    fs.DeleteFile(currentDir, args[1]);
}
```

- **`Touch`:** ينشئ ملفاً فارغاً (حجمه 0) إذا لم يكن موجوداً.
    
- **`Rm`:** يحذف الملف ويحرر الكلاسترات الخاصة به.
    

---

### **8. قراءة وكتابة المحتوى (`Cat`, `Echo`)**

C#

```cs
private void Cat(List<string> args)
{
    if (args.Count < 2) throw new Exception("Usage: cat <file>");

    byte[] data = fs.ReadFile(currentDir, args[1]); // 1. قراءة بايتس
    Console.WriteLine(Encoding.ASCII.GetString(data)); // 2. تحويل لنص وعرضه
}

private void Echo(List<string> args)
{
    // الأمر: echo "text" filename [--append]
    if (args.Count < 3) throw new Exception("Usage...");

    bool append = args.Contains("--append"); // هل نريد الإضافة؟
    string text = args[1];
    string file = args[2];

    byte[] oldData = new byte[0];
    if (append && dir.FindEntry(currentDir, file) != null)
        oldData = fs.ReadFile(currentDir, file); // قراءة القديم لو موجود

    byte[] newData = Encoding.ASCII.GetBytes(text);
    // دمج القديم مع الجديد أو استخدام الجديد فقط
    byte[] finalData = append ? Combine(oldData, newData) : newData;

    if (dir.FindEntry(currentDir, file) == null)
        fs.CreateFile(currentDir, file); // إنشاء الملف لو مش موجود

    fs.WriteFile(currentDir, file, finalData); // الحفظ
}
```

- **`Cat`:** للقراءة فقط.
    
- **`Echo`:** للكتابة. تدعم الـ Append (الإضافة على نهاية الملف) عن طريق قراءة القديم ودمجه مع الجديد ثم إعادة الكتابة.
    

---

### **9. النسخ والنقل (`Cp`, `Mv`)**

C#

```cs
private void Cp(List<string> args)
{
    if (args.Count < 3) throw new Exception("Usage: cp <src> <dst>");

    byte[] data = fs.ReadFile(currentDir, args[1]); // اقرأ المصدر
    fs.CreateFile(currentDir, args[2]);             // انشئ الهدف
    fs.WriteFile(currentDir, args[2], data);        // اكتب الداتا
}

private void Mv(List<string> args)
{
    // الكود الأصلي في الملف المرفق (نسخ + حذف)
    if (args.Count < 3) throw new Exception("Usage: mv <src> <dst>");

    byte[] data = fs.ReadFile(currentDir, args[1]); // 1. انسخ للداتا
    fs.CreateFile(currentDir, args[2]);             // 2. انشئ الجديد
    fs.WriteFile(currentDir, args[2], data);        // 3. اكتب فيه
    fs.DeleteFile(currentDir, args[1]);             // 4. امسح القديم
}
```

- **`Mv`:** في هذا الإصدار، هي عبارة عن `Cp` يتبعها `Rm`. (وهذا ما قمنا بتعديله لاحقاً لتكون أكثر ذكاءً).
    

---

### **10. الخروج والمساعدة (`Exit`, `Help`, `Clear`)**

C#

```cs
private void Exit()
{
    fat.Save(); // 1. حفظ جدول الـ FAT (مهم جداً)
    VirtualDisk.CloseDisk(); // 2. إغلاق الملف بأمان
    Environment.Exit(0); // 3. قتل البرنامج
}
```

- **`Exit`:** هي أهم دالة لضمان عدم ضياع البيانات. أمر `fat.Save()` يكتب التغييرات من الرامات إلى ملف `VirtualDisk.bin`.
    

---

### **11. المساعدات (`Parse`, `Combine`)**

C#

```cs
private List<string> Parse(string input)
{
    // منطق لتحويل: echo "hello world" file
    // إلى: ["echo", "hello world", "file"]
    // بدلاً من: ["echo", "\"hello", "world\"", "file"]
    // ... (الكود يستخدم متغير quote لتجاهل المسافات داخل علامات التنصيص)
}
```

- **`Parse`:** تحل مشكلة المسافات داخل النصوص، لكي يستطيع المستخدم كتابة جمل كاملة داخل `echo`.
    

هذا هو الهيكل الكامل لكلاس الـ Shell ومنطقه البرمجي.