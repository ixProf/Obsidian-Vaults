  
## Syntax :

- When you want to write a code with c# you should know this block
```csharp
using System;
namespace .....{
	class program {
		static void Main (String[] args){
			Console.WriteLine("Hello World")
		}
	}
}

```
1. using system : دا معناه انك بتستخدم مكتبة System ودي فيها الادوات الخاصة بالتعامل مع ال Console والطباعة على الشاشة
2. namespace: تنظيم الكود الخاص بيك، بإنك تحطه ف حاوية تضم الكلاسيز والnamespaces التانيين
3. class: ودا معناه فئة،وهي عبارة عن حاوية تحط فيها البيانات والدوال **كل كود c# بيتكون من كلاس**
4. static void Main: نقطة البداية للكود والي بيحصل فيها runtime
	1.  static : متصل ديما بالكلاس ومش هتحتاج تعمله Object
	2.  void: تعبر انه مش بيرجع قيمة
	3. Main: الشئ الي بيخلي الكومبايلر يعمل compile للكود
5. Console.WriteLine(): امر طباعة الكود output ويكون فيه Line يعني سطر ويسيب سطر
---
### Comments:
You Can Write a comments in c# by using `//` for a single comment or `/* */` for a multiple comments

*Example*:
```cs
// Hello This a single line comment, the comment will not be executed
static void Main{
/*
this a multiple lines of comments that you can describe your code in it
like:
this code assign the summation and substraction:
a + b
a - b
*/
int a = 6;
int b = 3

int sub = a - b;
int sum = a + b;
Console.WriteLine(sum , sub);
}
```
---
## Variables

| المتغير (Var) | الوظيفة (Do?)                                | الحجم في الذاكرة (Size in memory) | المدى (Range)                                               |
| ------------- | -------------------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| int           | بيخزن الأرقام الصحيحة                        | 4 بايت                            | من -2,147,483,648 إلى 2,147,483,647                         |
| long          | بيخزن أرقام صحيحة كبيرة                      | 8 بايت                            | من -9,223,372,036,854,775,808 إلى 9,223,372,036,854,775,807 |
| short         | بيخزن أرقام صحيحة صغيرة                      | 2 بايت                            | من -32,768 إلى 32,767                                       |
| float         | بيخزن أرقام عشرية بدقة أقل                   | 4 بايت                            | من ±1.5 × 10⁻⁴⁵ إلى ±3.4 × 10³⁸                             |
| double        | بيخزن أرقام عشرية بدقة أعلى                  | 8 بايت                            | من ±5.0 × 10⁻³²⁴ إلى ±1.7 × 10³⁰⁸                           |
| decimal       | بيخزن أرقام عشرية بدقة عالية جداً (للحسابات) | 16 بايت                           | من ±1.0 × 10⁻²⁸ إلى ±7.9 × 10²⁸                             |
| char          | بيخزن حرف واحد فقط                           | 2 بايت                            | من U+0000 إلى U+FFFF (رموز Unicode)                         |
| string        | بيخزن سلسلة من الحروف                        | 2 بايت لكل حرف                    | حسب عدد الحروف                                              |
| bool          | بيخزن القيمة صح أو غلط (true/false)          | 1 بايت                            | true أو false                                               |
| ulong         | بيخزن أرقام صحيحة موجبة وكبيرة جداً          | 8 بايت                            | من 0 إلى 18,446,744,073,709,551,615                         |
| ushort        | بيخزن أرقام صحيحة موجبة صغيرة                | 2 بايت                            | من 0 إلى 65,535                                             |
| byte          | بيخزن أرقام موجبة صغيرة                      | 1 بايت                            | من 0 إلى 255                                                |
| sbyte         | بيخزن أرقام سالبة وموجبة صغيرة               | 1 بايت                            | من -128 إلى 127                                             |

 - Declaring and initialization
	- type var_name = value;
	- دا كدا اتعمله الاتنين ديكليرشن و انشياليزيشن، وكدا تعرف تفرق بين الاتنين
	- Declare: 
		- `type var_name;` without value;
	- initialization:
		- `var_name = x;`
- الديكلير بيكون قبل الانيشياليز، عرفه الاول وبعده اديله القيمة زي ما تعوز

- Constant Values: متغير مينفعش تغير قيمته ( قيمته ثابتة)
	- `const type var_name = value;`

---
### identifier rules
✅ ما هو الـ Identifier؟

الـ **identifier** هو **اسم بتديه لحاجة في الكود** زي:

- اسم متغير
- اسم دالة (function)
- اسم كلاس
- اسم ملف

---

📏 قواعد كتابة Identifiers في C#

 - ✅ 1. لازم يبدأ بحرف أو underscore `_`
	- صح: `name`, `_total`, `value1`  
	- غلط: `1value`, `#score`
 - ✅ 2. ممكن يحتوي على أرقام بعد أول حرف
	- صح: `score1`, `data2025`
 - ✅ 3. مينفعش يكون فيه مسافات
	- غلط: `my name`
	- الصح: `myName` أو `my_name`
 - ✅ 4. مينفعش تستخدم رموز خاصة (زي !، @، # ، % ...)
	- ماعدا `_` (Underscore) مسموح
-  ✅ 5. مينفعش تسمي identifier بنفس اسم **كلمة محجوزة (keyword)** في اللغة

زي:

- `int`, `class`, `if`, `while`, `public`, `void`, ... إلخ  
    ✅ لو ضروري جدًا ممكن تستخدم `@` قبله:
    

```csharp
int @class = 5;
```

**بس ده مش مفضل.**


- ✅ 6. الـ C# case-sensitive

يعني:  
`Name`, `name`, و `NAME` → 3 أسماء مختلفة.


## 🔤 ممارسات شائعة (Best Practices)

| العنصر       | الشكل المفضل                   |
| ------------ | ------------------------------ |
| متغير        | camelCase → `studentName`      |
| دالة         | PascalCase → `GetTotalMarks()` |
| كلاس/كائن    | PascalCase → `StudentProfile`  |
| ثابت (const) | UPPER_CASE → `MAX_VALUE`       |

---

**ملاحظات**:
- ممكن تستخدم ال 10 اس رقم عن طريق E , e
- in float :
	- x = 15000 مثلا
		- `float x = 15e3f;`
		- ودا معناه x = 15000

---
### Reference Type

That Data is stored as a reference to an object in memory when a value is passed or copied, the reference is copied.

- Arrays 
- Interfaces
- Strings
- Delegates

---
## Type Casting
عملية تحويل من نوع لنوع
- Implicit Casting
	- تحويل تلقائي للداتا تايب لواحدة تانية بعد تعريف نفس المتغير للداتا تايب الجديدة
 
```cs
int a = 100;
float b = a; // هنا التحويل حصل تلقائي
```

-  Explicit Casting (التحويل الصريح)

هو تحويل **لازم تكتبه بنفسك**، لأن النوع اللي بتحول له ممكن يفقد بيانات أو التحويل مش آمن بنسبة 100%.
- 
```cs
targetType variableName = (targetType)value;
double x = 12.7;
int y = (int)x;  // الناتج هيكون 12، الكسور اتشالت
```

- ⚠️ Explicit Casting ممكن يسبب:

	- **فقدان بيانات**
	- **فقدان دقة**
	- **أخطاء وقت التشغيل (runtime)** لو كانت القيمة كبيرة أو غير قابلة للتحويل.


- Type Conversion Method "الاهم"
	- دي الطريقة الي هنستخدم إحداها في عمل كاستينج لل Console.ReadLine()
		- Convert Method

```cs
string s = "123";
int x = Convert.ToInt32(s); // 123
```

- Parse الاكثر استخداما
	- `Parse` يحول سترينج إلى نوع تاني، بس **لازم القيمة تكون صالحة 100%**، وإلا هيحصل خطأ.
```cs
string s = "45";
int x = int.Parse(s); // 45
```

- TryParse {الافضل ولكن الاقل استخداما}
	-  بيحاول يحول، ولو فشل مبيكسرش البرنامج.
	- مفيد جدًا مع البيانات اللي جايه من المستخدم.
```cs
string s = "100";
int num;
bool success = int.TryParse(s, out num);

if (success)
    Console.WriteLine("الرقم: " + num);
else
    Console.WriteLine("القيمة غير صالحة");
```

---
## User Input

- Console.ReadLine()
	- امر يستخدم لإستقبال مدخلات المستخدم **لو كانت String**
	- طب اي الحل احنا عايزين يدخل ارقام مثلا؟ او اي حاجه
		- هنستخدم ال Type Conversion Method زي مثلا Parse
		- `int x = int.Parse(Console.ReadLine())
		- `int x = Convert.ToInt32(Console.ReadLine())`

---
## Operators and Assignment
- Operators: % , / , * , -- , ++ , + , -
- ودول المعروفين فنراجعهم على السريع 
```cs
int x = 5;
int y = 6;

int sum = x + y; // summation
int sub = x - y; // substraction
x++; // increase x by 1 عند إستخدامها فعملية معينة
x--; // Decrease x by 1 ¬
int mod = x % y; // باقي القسمة للارقام
int Mulit = x*y; // Multiplication
int Div = x / y; // division
```

- Assignment += , -= , /= .....
	- ودول كمان معروفين بإن كدا بص
	- `x+=5 --> x = x + 5`
	وتستخدمه على باقي العمليات بقى.
	- إلا بعض الحالات وهي بتعبر عن ال Logical Operations
- ^= ودي تستخدم لعملية XOR 
```cs
int x = 5; // in binary : 0101
x ^= 3; // 0101 ^ 0011 = 0110 --> 6 
// XOR المتشابه 0 المختلف 1
```
- <<= 
	- عمل شيفت للقيمة بمقدار معين يسارا
```CS
int x = 2; // 0000 0010
x <<= 3; // 0010000 --> 16
```

- >>= 
	- عمل شيفت للقيمة بمقدار معين ناحية اليمين
```cs
int x = 16; // 0001 0000
x >>= 3; // 0000 0010 --> 2
```

- | = عملية OR
```cs
int x = 3; // 011
x |= 4; // 011 + 100 = 111 --> 7
```

- &= عملية AND
```CS
int x = 3; // 011
x &= 4; // 011 * 100 = 000 --> 0
```

---

## 🔹 String 
- Concept & Methods

- الـ String يعني:
	- سلسلة من **الحروف** (characters).
	- بتُكتب بين علامات اقتباس مزدوجة `"`.

```csharp
string name = "Ahmed";
```

- `string` reference type.
- **Immutable**: يعني ماينفعش تغيّر محتوى string بعد ما تتعمل، أي تعديل = نسخة جديدة.

---

-  أشهر الدوال (Methods):

| الدالة                     | الوظيفة                               |
| -------------------------- | ------------------------------------- |
| `Length`                   | عدد الحروف في السلسلة                 |
| `ToUpper()`                | تحويل كل الحروف لكابيتال              |
| `ToLower()`                | تحويل كل الحروف لسمول                 |
| `Contains("x")`            | هل تحتوي على حرف أو كلمة معينة؟       |
| `IndexOf("x")`             | يرجّع أول مكان لظهور حرف أو كلمة      |
| `Replace("a", "b")`        | يبدل حرف/كلمة بأخرى                   |
| `Substring(start, length)` | يقطع جزء من النص                      |
| `Trim()`                   | يشيل المسافات الزايدة من الأول والآخر |

---

🔹 2. Concatenation (الربط بين Strings)

-  الربط بيكون باستخدام `+` أو `+=`

```csharp
string firstName = "Ahmed";
string lastName = "Ali";

string fullName = firstName + " " + lastName; // "Ahmed Ali"
```

أو:

```csharp
fullName += " Jr";  // "Ahmed Ali Jr"
```

ملاحظة:

لو بتربط كتير جوه لوب، استخدم `StringBuilder` لأداء أحسن.

---

 
🔹 3. Interpolation (صيغة إدراج القيم جوا النص)

-  ✅ طريقة حديثة وأوضح من الـ concatenation:

```csharp
string name = "Mona";
int age = 22;

string info = $"Name: {name}, Age: {age}";
```

- بتحط المتغيرات جوا `{}` بعد ما تكتب `$` قبل ال String.
- أسهل في القراءة والتنسيق.

---


 🔹 Access on Strings (الوصول للحروف والنصوص)

 1. `index` ➜ الوصول لموقع حرف معيّن

يعني توصل لحرف معيّن من خلال رقمه في الString.

```csharp
string word = "Hello";
char first = word[0];        // 'H'
char second = word[1];       // 'e'
char last = word[word.Length - 1]; // 'o'
```

📌 ملاحظات:

- أول حرف دايمًا رقمه (index) = 0
    
- لو حاولت توصل لحرف بمكان مش موجود (مثلاً 100) ➜ ❌ هيحصل خطأ.
    


 -  2. `IndexOf()` ➜ ترجع موقع أول ظهور لحرف أو كلمة

```csharp
string word = "banana";
int index = word.IndexOf('a');    // 1
int index2 = word.IndexOf("na");  // 2
```

🔎 تفاصيل:

- بترجع رقم أول مكان للكلمة أو الحرف اللي بتدور عليه.
    
- لو مش لاقيها ➜ بيرجع `-1`.
    

📌 مثال عملي:

```csharp
string name = "Mohamed";
int i = name.IndexOf('a'); // 3
```

---

 3. `Substring(startIndex, length)` ➜ تقطيع جزء من النص

```csharp
string text = "Programming";
string part = text.Substring(3, 4);  // "gram"
```

🔍 شرح:

- `startIndex` = بداية القطع (من 0)
    
- `length` = عدد الحروف اللي هتاخدهم
    

📌 مثال تاني:

```csharp
string word = "Hello";
string sub = word.Substring(1, 3);  // "ell"
```

ولو عايز تبدأ من رقم معين لحد الآخر:

```csharp
string sub2 = word.Substring(2);  // "llo"
```

| العنصر        | الوظيفة                        | مثال                                            |
| ------------- | ------------------------------ | ----------------------------------------------- |
| `index`       | توصل لحرف معيّن حسب رقمه       | `word[0]` → أول حرف                             |
| `IndexOf()`   | ترجع رقم أول مكان لحرف أو كلمة | `word.IndexOf("lo")` → 3                        |
| `Substring()` | ترجع جزء معين من النص          | `word.Substring(1, 3)` → يجيب 3 حروف من index 1 |

---

### ❗ Strings immutable:

يعني متقدرش تغيّر `word[0] = 'J';` ➜ ❌ error  
لكن ممكن تعمل نسخة جديدة:

```csharp
word = "J" + word.Substring(1);  // "Jello"
```


---
## Conditions and if Statement
- if-statement Syntax
```cs
if(condition){
// block of code to be executed if the condition true
}
else{
// block of code to be executed if the condition false
}
```
- if-else Syntax
```cs
if(condition1){
// if condition1 is true
}
esle if (condition2){
// if condition1 is false and condition2 is true
}
```

- Short hand if....else
```cs
variable = (condition) ? // if true : if false;
string result = (time < 18) ? "Good day" : "Good Night";
```

- Switch Statement : Select one of many blocks be executed
	- Break; --> بتوقف ال switch او Condition لو صح
	- Continue --> بتعمل سكيب لل statement لو ال Condition صح
	- default --> قيمة مرجعية لو مفيش قيمة صحيحة
```cs
int day = 4;
switch(day){
	case 1 :
		Console.WriteLine("Saterday");
		break;
	case 2 :
		Console.WriteLine("Sunday");
		break;
	case 3 :
		Console.WriteLine("Monday");
		break;
	case 4 :
		Console.WriteLine("Thursday");
		break;
	default:
			Console.WriteLine("Friday");
}
```

---
## Loops


- 🔁 أنواع الـ Loops في C#

1. **for loop**
2. **while loop**
3. **do-while loop**
4. **foreach loop**


---

 1.  `for` loop
	لما تعرف عدد التكرارات مسبقًا.
	Syntax :
```csharp
for (initialization; condition; increment)
{
    // code to repeat
}
```
- Example
```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine("i = " + i);
}
```

 2. `while` loop
	لما مش معروف عدد التكرارات، وعايز تتحقق من شرط قبل ما تنفذ.
- Syntax

```csharp
while (condition)
{
    // code to repeat
}
```

-  مثال:

```csharp
int i = 0;
while (i < 5)
{
    Console.WriteLine("i = " + i);
    i++;
}
```

3. `do-while` loop
	لما عايز الكود يتنفذ على الأقل **مرة واحدة**، حتى لو الشرط غلط.

	- Syntax
```csharp
do
{
    // code to repeat
} while (condition);
```

* Example

```csharp
int i = 0;
do
{
    Console.WriteLine("i = " + i);
    i++;
} while (i < 5);
```


4.  `foreach` loop
	لما عايز تمشي على عناصر في مصفوفة (Array) أو List أو مجموعة (Collection) بسهولة.

- Syntax:
```csharp
foreach (datatype variable in collection)
{
    // code to execute
}
```

- Example:

```csharp
string[] fruits = { "apple", "banana", "orange" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```


- `break` → يخرج من اللوب فورًا.    
- `continue` → يتخطى الخطوات اللي باقيه ويروح للتكرار اللي بعده.

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 5)
        break; // يخرج من اللوب

    if (i % 2 == 0)
        continue; // يتخطى الباقي ويروح للرقم اللي بعده

    Console.WriteLine(i);
}
```

---
## Array and Array Methods 

هي **Data Structure** بتخزن مجموعة من العناصر من نفس النوع **بنفس الترتيب**، في **أماكن متجاورة في الذاكرة**.

```csharp
int[] numbers = new int[5]; // Array من 5 عناصر
```

 
-  التخزين في الميموري Stack vs Heap
	- 1. Stack

		- **مكان صغير وسريع** في الذاكرة.
		- يخزن **المتغيرات ذات الحياة القصيرة** (مثل متغير محلي داخل دالة).
		- يخزن **الـ reference** (العنوان) بتاع الـ array، مش نفسها.

	- 2. Heap
		- **مساحة كبيرة**.
		- يُخزّن فيها **الكائنات (objects)** اللي بتعيش لفترة أطول، زي الـ Arrays.
		- الـ array نفسها (العناصر) بتتخزن في الـ **heap**.

#### 📌 مثال توضيحي:

```csharp
int[] arr = new int[3];
```


- `arr` is stored on the **stack** as a reference (i.e., a pointer to the array).
    
- The actual array (the data itself) is stored on the **heap**.
---

- Array Methods and Properties (أهم الدوال)

```csharp
int[] nums = { 5, 3, 8, 1, 4 };
```

- Methods

```csharp
Array.Sort(nums);       // ترتيب تصاعدي
Array.Reverse(nums);    // يعكس الترتيب
Array.IndexOf(nums, 8); // يرجع الفهرس اللي فيه القيمة 8
Array.Clear(nums, 1, 2);// يصفر عنصرين من الفهرس 1
Array.Copy(nums, copy, 5); // ينسخ البيانات
```

 - 📘 Properties
```csharp
nums.Length; // عدد العناصر في المصفوفة
```

- Array Types
	1. ✅ **One-dimensional array**
```csharp
int[] arr = { 1, 2, 3 };
```

 2. ✅ **Multi-dimensional array (مصفوفة 2D مثلاً)**
	
```csharp
int[,] matrix = new int[2, 3]; // صفين، كل صف فيه 3 أعمدة
```

3. ✅ **Jagged Array (مصفوفة من المصفوفات)**

```csharp
int[][] jagged = new int[2][];
jagged[0] = new int[3]; // الصف الأول فيه 3 عناصر
jagged[1] = new int[5]; // الصف التاني فيه 5 عناصر
```

---

-  كيف يتم التعامل مع الـ Array داخليًا

- Example

```csharp
int[] arr = { 10, 20, 30 };
```

1. بيتم حجز مكان في الـ Heap لتخزين `[10, 20, 30]`.
2. يتم تخزين `arr` في الـ Stack كمؤشر (Reference) على أول عنوان في الـ Heap.
3. كل عنصر في الـ array بياخد مكان متتالي في الذاكرة.

---
- Value Types و Reference Types

| element    | Value Type             | Reference Type                    |
| ---------- | ---------------------- | --------------------------------- |
| Example    | `int`, `float`, `bool` | `array`, `class`, `string`        |
| Stored in? | Stack                  | المرجع في Stack، والمحتوى في Heap |
| Copy?      | يتم نسخ القيمة         | يتم نسخ المرجع (pointer)          |

```csharp
int[] a = {1, 2, 3};
int[] b = a;
b[0] = 100;
Console.WriteLine(a[0]); // 100 (لأنهم بيشيروا لنفس الـ heap)
```

---

- Performance and Constraint

- ✅ الوصول لعناصر الـ array سريع (O(1)).
- ❌ حجم الـ array **ثابت** بعد إنشائها.
- ❌ مفيش دوال ديناميكية زي `Add` أو `Remove`، بعكس `List<T>`
---
## Methods

الـ **Method** هي مجموعة أوامر (Statements) بتتجمع تحت اسم واحد علشان تعمل مهمة معينة.  
بتساعدك في **تنظيم الكود**، **إعادة الاستخدام**، وتقسيم المهام.

---

### Syntax:

```csharp
[access_modifier] [return_type] MethodName([parameters])
{
    // method body
}
```

- Example:

```csharp
public int Add(int a, int b)
{
    return a + b;
}
```

| الجزء             | الوظيفة                                               |
| ----------------- | ----------------------------------------------------- |
| `access_modifier` | زي `public`, `private`, بيحدد مين يقدر يستخدم الميثود |
| `return_type`     | نوع القيمة اللي بترجعها الميثود (`int`, `void`, ...)  |
| `MethodName`      | اسم الميثود (بحرف كبير حسب الـ convention)            |
| `parameters`      | المتغيرات اللي الميثود بتاخدها                        |

---

### Methods Types:
#### 1. **Void Method**
ما بترجعش حاجة.

```csharp
void SayHello()
{
    Console.WriteLine("Hello");
}
```

---

#### 2. **Return Method**

بترجع قيمة.

```csharp
int Square(int x)
{
    return x * x;
}
```

---

#### 3. **Static Method**

مربوطة بالكلاس نفسه، مش محتاجة object.

```csharp
class MathUtils
{
    public static int Double(int x)
    {
        return x * 2;
    }
}
```

> استخدامها: `MathUtils.Double(5);`

---

####  4. **Instance Method**

مرتبطة بكائن (object).

```csharp
class Car
{
    public void Start()
    {
        Console.WriteLine("Engine started");
    }
}
```

> لازم تعمل object علشان تستخدمها:

```csharp
Car myCar = new Car();
myCar.Start();
```

---

####  5. **Method Overloading**

نفس الاسم، لكن مع عدد أو نوع باراميتر مختلف.

```csharp
void Print(string msg)
{
    Console.WriteLine(msg);
}

void Print(int number)
{
    Console.WriteLine(number);
}
```

---

### Parameters Types

#### 1. **Value Parameter** (الافتراضي):

```csharp
void Modify(int x)
{
    x = 10;
}
```

> التغيير مش بيأثر على المتغير الأصلي.

---

#### 2. **ref Parameter**:

بيمرر المتغير كمرجع (Reference).

```csharp
void Modify(ref int x)
{
    x = 10;
}
```

> لازم تعمل `ref` في الاستدعاء كمان:

```csharp
int a = 5;
Modify(ref a);
```

---

#### 3. **out Parameter**:

عايز ترجع متغيرات او متغيرين فنفس الوقت من غير ما اعملهم return
```cs
static void sumMul(int a , int b , out in OutA , out int OutB){
	OutA = a + b;
	OutB = a - b;
}
static void main{
	int x = 5 , y = 3 , OutX , OutY;
	sumMul(x,y,out OutX,out OutY);
	Console.WriteLine(OutX); // 8
	Console.WriteLine(OutY); // 15
}
```
زي `ref` بس لازم تعيّن قيمة قبل ما تخرج من الميثود.

```csharp
void GetData(out int result)
{
    result = 100;
}
```

---

#### 4. **params Parameter**:

يسمح لك تبعت عدد غير محدود من القيم ولازم يكون اخر Parameter في ال Parameter List

```csharp
void PrintAll(params int[] numbers)
{
    foreach (int num in numbers)
        Console.WriteLine(num);
}
```

> الاستخدام:

```csharp
PrintAll(1, 2, 3, 4);
```

---

##  Methods & Memory (Stack vs Heap)

- المتغيرات اللي بتدخل method بتتخزن في الـ **stack**.
- الـ methods نفسها بيكون ليها **stack frame** لكل استدعاء.
- لو method بتتعامل مع كائنات (objects) أو arrays، فدي بتشير لـ **heap**.


 ملخص سريع:

| النوع         | شرح سريع                        |
| ------------- | ------------------------------- |
| `void`        | ما بترجعش حاجة                  |
| `return`      | بترجع قيمة                      |
| `static`      | تابعة للكلاس نفسه               |
| `instance`    | لازم تعمل object علشان تستدعيها |
| `ref` / `out` | بتمرر المتغير كـ reference      |
| `params`      | تقبل عدد متغير من الباراميترز   |

---
## Exception Handling

```cs
try
{
    // code that may throw exception
}
catch (ExceptionType ex)
{
    // code to handle the exception
}
finally
{
    // optional block, always runs
}
```

### الـ **Exception** هو:

"حدث غير طبيعي" بيحصل وقت تشغيل البرنامج (runtime) وبيوقف تنفيذ الكود بشكل طبيعي.

مثلاً:
- القسمة على صفر.
- محاولة فتح ملف مش موجود.
- الوصول لفهرس خارج حدود الـ array.

- Example:
```cs
try
{
    int x = 5;
    int y = 0;
    int result = x / y;
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Can't divide by zero: " + ex.Message);
}
finally
{
    Console.WriteLine("Cleanup code here");
}
```




### Exceptions Types

|النوع|معناها|
|---|---|
|`DivideByZeroException`|قسمة على صفر|
|`NullReferenceException`|حاولت تستخدم كائن مش مخصص (null)|
|`IndexOutOfRangeException`|خرجت برا حدود array|
|`FileNotFoundException`|ملف مش موجود|
|`FormatException`|فشل في تحويل نص لرقم مثلًا|
|`InvalidOperationException`|عملية غير صالحة للحالة الحالية|


### التعامل مع أكثر من catch

```csharp
try
{
    // some risky code
}
catch (NullReferenceException ex)
{
    Console.WriteLine("Null reference error");
}
catch (Exception ex)
{
    Console.WriteLine("General error: " + ex.Message);
}
```

✅ لازم تبدأ من **الأكثر تحديدًا** إلى **الأعم**.

---

### `finally`

- بيتم تنفيذها سواء حصل Exception أو لا.
- مفيدة لإغلاق الملفات، تحرير الموارد، إغلاق الاتصالات، إلخ.

```csharp
finally
{
    Console.WriteLine("Always runs");
}
```

---

### `throw`

#### 1. ترمي Exception جديد:

```csharp
throw new InvalidOperationException("This is custom error");
```

#### 2. تعيد نفس الـ exception:

```csharp
catch (Exception ex)
{
    // log or something
    throw; // يعيد نفس الـ exception
}
```

---

### Custom Exception

```csharp
public class MyCustomException : Exception
{
    public MyCustomException(string message) : base(message) { }
}
```

> الاستخدام:

```csharp
throw new MyCustomException("Something went wrong!");
```

---

### **important** Notes 

1. ✅ **ما تمسكش Exception عام إلا لو مضطر**:  
    دايمًا حاول تمسك أنواع محددة.
    
2. ✅ **سجّل الخطأ** (Logging):  
    استخدم `Console.WriteLine`, أو مكتبة زي `Serilog` أو `NLog`.
    
3. ✅ **ما تسيبش الكود فاضي في الـ catch**:  
    غلط شائع يخلي المشاكل تتدفن.
    
4. ✅ **استخدم `finally` لإغلاق الموارد**:  
    ملفات، اتصالات قواعد بيانات، إلخ.
    

- Example
```csharp
public int SafeDivide(int a, int b)
{
    try
    {
        return a / b;
    }
    catch (DivideByZeroException ex)
    {
        Console.WriteLine("Division error: " + ex.Message);
        return 0;
    }
    finally
    {
        Console.WriteLine("Execution complete.");
    }
}
```


| الكلمة         | وظيفتها                                |
| -------------- | -------------------------------------- |
| `try`          | كود ممكن يرمي Exception                |
| `catch`        | يتعامل مع الـ Exception                |
| `finally`      | بيتنفذ دايمًا سواء حصل Exception أو لا |
| `throw`        | يرمي Exception جديد أو يعيد الحالي     |
| `custom class` | تعريف نوع جديد من الـ Exception        |
