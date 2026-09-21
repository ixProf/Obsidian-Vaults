لالا
## او ما يعرف بالتفويض : وهو Method Pointer بنستعمله علشان يكون معايا Reference ل Method معينة اقدر اناديها في اي وقت بدون ما اعرف اي هي او فين، ==ولازم يكون نفس ال Signature بالظبط==

## Syntax

`delegate <DataType> <NameOfDelegate>(Parameters)`

### مثال توضيحي
```CS
using System;

namespace Delegates
{
    public class Program
    {
        static void Main(string[] args)
        {
            int n1 = 10;
            int n2 = 5;
            calculate(n1, n2,'+');
            calculate(n1, n2,'-');
            calculate(n1, n2,'*');
            calculate(n1, n2,'/');
        }

        static void calculate(int x , int y, char op )
        {
            int result = 0;
            if (op == '+')
	            return x + y;
	        if else (op == '-')
		        return x - y;
		    if else (op == '*')
			    return x * y;
			if else (op == '/')
				return x / y;
			else{
				Console.WriteLine($"Result = {result}");
			}
            Console.WriteLine($"Result = {result}");
        }

        static int add(int x, int y)
        {
            return x + y;
        }
        static int substract(int x, int y)
        {
            return x - y;
        }
        static int Multiply(int x, int y)
        {
            return x * y;
        }
        static int Divide(int x, int y)
        {
            return x / y;
        }
    }
}
```

ركز كدا على ال Calculate Method هتلاقي في استعمال لل if else بشكل كتير ودا بيخالف مبادئ ال Clean Code وكمان بيخالف اول مبدأ في ال SOLID وهو Single Responsability (لو مش عارف ال SOLID مش مشكلة هيكون في تلخيص ليها)
ف ال Delegates بتحل المشاكل دي وتخلي الكود اكتر فهما ووضوحا

### المثال بعد التصحيح
```cs
using System;

namespace Delegates
{
    public class Program
    {
        delegate int CalculateDelegate(int x, int y);
        static void Main(string[] args)
        {
            int n1 = 10;
            int n2 = 5;
            calculate(n1, n2,add);
            calculate(n1, n2,substract);
            calculate(n1, n2,Multiply);
            calculate(n1, n2,Divide);
        }

        static void calculate(int x , int y, CalculateDelegate dlg )
        {
            int result = dlg(x, y);
            Console.WriteLine($"Result = {result}");
        }

        static int add(int x, int y)
        {
            return x + y;
        }
        static int substract(int x, int y)
        {
            return x - y;
        }
        static int Multiply(int x, int y)
        {
            return x * y;
        }
        static int Divide(int x, int y)
        {
            return x / y;
        }
    }
}
```

هنا عملنا  `CalculateDelegate`  Delegate واتفقنا انها تكون بنفس ال Signature الخاصة بالميثودس التانية وهي ان يكون ليها نفس نوع الريتيرن تايب ونفس عدد الباراميترز ونوعهم وترتيبهم 
يعني مينفعش اعمل كدا 
```cs
delegate int CalcDelegate(int x , int y);

static double Add (double x , double y){
	return x + y;
}
```

لا الشكل دا مينفعش لان السيجنتشر مختلف تماما وهيبقى صح لو عملنا كدا
```cs
delegate int CalcDelegate (int x , int y);
static int Add (int x , int y){
	return x + y;
}
```

هنا 
- نفس نوع الباراميترز
- نفس عدد الباراميترز
- نفس ال return type

ودا كان تعريف بال Delegate بشكل عام

---
## Declaration a Delegate

ممكن تعرف ال Delegate بالشكل دا **اعتمادا على المثال السابق**
```cs
CalculateDelegate Dlg = new CalculateDelegate(/*name of method*/);

or
CalculateDelegate Dlg = /*Name Of Method*/

CalculateDelegate dlg = new CalculateDelegate(add);
CalculateDelegate dlg2 = substract; 
```

---
## Lambda Expression `=>` :
وهي تطور لل Delegate اي صيغة كتابة اخرى ليها وبتوفر عليك كتابة كتير وشكلها ابسط مثال

```CS
// Anonymous Delegate
CalculateDelegate(x , y , delegate (int x , int y) {return x / y});
// Lambda Expresson
CalculateDelegate(x,y, (x,y) => return x / y);
```

---
## Multi-casting

اخلي ال Delegate الواحد ينادي على اكثر من Method وال output بيكون لأخر Method في ال Delegate
```cs
using System;

namespace Delegates
{
    public class Program
    {
        delegate int CalculateDelegate(int x, int y);
        static void Main(string[] args)
        {
        
            int n1 = 10;
            int n2 = 5;
            CalculateDelegate dlg = Add;
            dlg += subtract;
            dlg += Multiply;
            dlg += Divide;
			CalculateDelegate(num1 , num2 , dlg);
        }

        static void calculate(int x , int y, CalculateDelegate dlg )
        {
            int result = dlg(x, y);
            Console.WriteLine($"Result = {result}");
        }

        static int add(int x, int y)
        {
            Console.WriteLine("Add");
            return x + y;
        }
        static int substract(int x, int y)
        {
	        Console.WriteLine("Substrcat");
            return x - y;
        }
        static int Multiply(int x, int y)
        {
           Console.WriteLine("Multiply");
            return x * y;
        }
        static int Divide(int x, int y)
        {
           Console.WriteLine("Divide");
            return x / y;
        }
    }
}
```

output :
```cs
Add
Substract
Multiply
Divide
2
```

لو عايز اشيل Method من الي ضفتهم ؟
استخدم `-=` بالشكل دا
```cs
using System;

namespace Delegates
{
    public class Program
    {
        delegate int CalculateDelegate(int x, int y);
        static void Main(string[] args)
        {
        
            int n1 = 10;
            int n2 = 5;
            CalculateDelegate dlg = Add;
            dlg += subtract;
            dlg += Multiply;
            dlg += Divide;
			CalculateDelegate(num1 , num2 , dlg);
			Console.WriteLine("---------------");
			dlg -= Multiply;
			CalculateDelegate(num1 , num2 , dlg);
        }

        static void calculate(int x , int y, CalculateDelegate dlg )
        {
            int result = dlg(x, y);
            Console.WriteLine($"Result = {result}");
        }

        static int add(int x, int y)
        {
            Console.WriteLine("Add");
            return x + y;
        }
        static int substract(int x, int y)
        {
	        Console.WriteLine("Substrcat");
            return x - y;
        }
        static int Multiply(int x, int y)
        {
           Console.WriteLine("Multiply");
            return x * y;
        }
        static int Divide(int x, int y)
        {
           Console.WriteLine("Divide");
            return x / y;
        }
    }
}
```

output :
```cs
Add
Substract
Multiply
Divide
2
------------
Add
Substract
Divide
2
```

--- 
# مثال عملي وتطبيقي

## لو عندك مثلا 100 موظف ليهم مرتبات معينة طبعا بالحوافز والخصومات وعايز اطبع الموظفين الي مرتباتهم اقصاها 2000 هتعمل اي ؟

- Code1:
## الكود الصحيح بإستخدام ال Delegate

```cs
using System;
using System.Collections.Generic;

namespace Delegates
{
    public class Program
    {
        delegate bool ShortCalculate(Employee employee); // دي Delegate بترجع True , false
        public class Employee
        {
            public string Name { get; set; }
            public int BasicSalary { get; set; }
            public int Deductions { get; set; }
            public int Bouns { get; set; }
        }

        public static void Main(string[] args)
        {
            Random random = new Random();

            List<Employee> employees = new();
            for (int i = 0; i < 101; i++)
            {
                employees.Add(new Employee
                {
                    Name = $"Employee{i}",
                    BasicSalary = random.Next(1000, 5001),
                    Deductions = random.Next(0, 501),
                    Bouns = random.Next(0, 1001)
                });
            }
            calculateSalaries(employees, e => e.BasicSalary <= 2000); // هنا استخدمنا لمدا اكسبرشن علشان نقدر نلعب براحتنا فالكوندشن لو اتطلب مننا اي حاجه نقدر نستخدمها فالكوندشن دي
        }

        private static void calculateSalaries(List<Employee> employees, ShortCalculate predicate) // معلومة اضافية ال default name لل Boolean Delegate Parameters = Predicate
        {
            foreach (var employee in employees)
            {
                if(predicate(employee)) // لو صح نفذ لو غلط اخرج
                {
                var salary = employee.BasicSalary + employee.Bouns - employee.Deductions;
                Console.WriteLine($"Employee: {employee.Name}, Salary: {salary}");
                }
            }
            
        }
    }
}
```

دا الحل الصح بإستخدام ال Delegate والي هينعرض الفرق بينه وبين الكود الي كلنا هنكتبه لو اتطلب مننا الطلب دا

- Code2:

```cs
using System;
using System.Collections.Generic;

namespace Delegates
{
    public class Program
    {
        public class Employee // كلاس ال employee
        {
            public string Name { get; set; }
            public int BasicSalary { get; set; }
            public int Deductions { get; set; }
            public int Bouns { get; set; }
        }

        public static void Main(string[] args)
        {
            Random random = new Random(); // علشان احط ارقام عشوائية

            List<Employee> employees = new();
            for (int i = 0; i < 100; i++)
            {
                employees.Add(new Employee
                {
                    Name = $"Employee{i}",
                    BasicSalary = random.Next(1000, 5001), // ارقام عشوائية لل مرتبات
                    Deductions = random.Next(0, 501), // خصومات عشوائية
                    Bouns = random.Next(0, 1001) // بونص عشوائي
                });
            }


            calculateSalaries(employees,2000);
        }

        private static void calculateSalaries(List<Employee> employees, int maxSalary) // لحساب المرتب
        {
            foreach (var employee in employees)
            {
	            if (employee.BasicsSalary <= maxSalary)
	            {
	                var salary = employee.BasicSalary + employee.Bouns - employee.Deductions; // المرتب = المرتب الاساسي + الحوافز - الخصم او الضريبة او او 
	                Console.WriteLine($"Employee: {employee.Name}, Salary: {salary}");
	            }
            }
        }
    }
}

```


انت شايف الحل دا صح ؟ ايوة هيطلع اوتبوت بس مخالف لقواعد ال clean code و لل SOLID ولو طلبت منك مثلا اي كوندشن تانية انك تحسب مثلا الي فمحافظة معينة هتضطر تعمل باراميتر وووووو 
الموضوع هيكون اصعب وهيكلفك وقت وممكن الكود يضرب منك

---

# تحليل شات للكودين

الفرق بين الكود الأول والثاني بيتمحور حوالين **مبدأ من مبادئ SOLID** وتحديدًا:

> ✅ **OCP: Open/Closed Principle**  
> _“Software entities should be open for extension, but closed for modification.”_

---

## ✅ **تحليل الكود الأول (المبني على Delegates + Lambda):**

```csharp
calculateSalaries(employees, e => e.BasicSalary <= 2000);
```

### ✅ المميزات:

1. **مبدأ OCP مطبّق بوضوح:**
    
    - الميثود `calculateSalaries` مش محتاجة تتعدّل لما يتغير الشرط.
        
    - تقدر تمرّر أي شرط (filter) من برّه باستخدام `delegate` أو `lambda expression`.
        
2. **قابلية التوسّع (Extensibility):**
    
    - ممكن تغيّر الشرط بسهولة، زي:
        
        ```csharp
        e => e.Bouns > 500 && e.Deductions < 100
        ```
        
    - بدون ما تلمس الكود الأصلي.
        
3. **مرونة أعلى باستخدام Delegate:**
    
    - reusable logic.
        
    - أسلوب عملي جدًا في برامج حقيقية لما يكون فيه أكتر من فلتر.
        
4. **نظافة الكود (Clean Code):**
    
    - الفصل بين الحساب (salary calculation) والمنطق الشرطي (filter logic).
        

---

## **تحليل الكود الثاني:**

```csharp
calculateSalaries(employees, 2000);
```

### العيوب:

1. **غير مطبق لمبدأ OCP:**
    
    - لو عايز تغيّر الشرط، لازم تعدّل في `calculateSalaries` نفسها.
        
    - يعني الكود مش مقفول على التعديلات.
        
2. **قابلية التعديل أقل:**
    
    - الشرط متشفر (hardcoded logic).
        
    - لو طلبوا منك لاحقًا تغيّر الفلتر لـ `Bouns > 500` أو `Deductions < 200`، لازم تغير الدالة نفسها.
        
3. **أقل مرونة:**
    
    - الدالة محدودة بفلتر ثابت.
        

---

## من الأفضل؟

| المقارنة                 | الكود الأول                  | ❌ الكود الثاني |
| ------------------------ | ---------------------------- | -------------- |
| **تطبيق OCP**            | ✅ نعم                        | ❌ لا           |
| **مرونة الفلترة**        | ✅ عالية                      | ❌ محدودة       |
| **قابلية التوسّع**       | ✅ سهلة                       | ❌ صعبة         |
| **Clean Code**           | ✅ واضح ومنفصل                | ❌ شرط داخلي    |
| **اختبار (Testability)** | ✅ سهل تعويض delegate في test | ❌ صعب          |

---

## الاستنتاج:

**الكود الأول أفضل** من ناحية:

- التصميم (Design).
    
- النظافة (Clean Code).
    
- احترام مبدأ OCP من مبادئ SOLID.
    
- القابلية للتوسعة والصيانة مستقبلًا.

---
## C# Func, Action & Predicate

### Action 
عبارة عن Built-in Delegate بياخد Parameters بس بيرجع void

```cs
using System;  
class Program  {  
	static void Main()  {  
		Action<string> greet = SayHello;
		greet("Mahmoud");
		// with lambda expression
		Action<string> greet = name =>  {  
			Console.WriteLine("Hello " + name);
		};
	}  
	static void SayHello(string name)  {  
		Console.WriteLine("Hello " + name);  
	}  
}
```

#### امتى نستخدم ال Action
- تعمل Print
- تعمل Log
- تعمل Save
- تعمل أي Process مش محتاج يرجع قيمة
---
### Func <T Parameter, T Parameter, T Return type>

## يعني ايه Func ؟

هو Delegate جاهز:
- بياخد Parameters
- **ويرجع قيمة**

مهم جدًا:  
آخر Generic Type هو الـ Return Type

```cs
Func<TResult>
Func<T, TResult>
Func<T1, T2, TResult>
```

Ex
```cs
using System;
class Program
{
    static void Main()
    {
        Func<int, int, int> add = Sum;
        int result = add(5, 3);
        Console.WriteLine(result);
        Func<int, int, int> add = (x, y) => x + y; // Lambda Expression
    }
    static int Sum(int x, int y)
    {
        return x + y;
    }
}
```

- int → باراميتر أول
- int → باراميتر تاني
- int → Return Type

## نستخدم Func امتى؟

- تحسب قيمة
- تعمل Filter
- تعمل Convert
- تستخدم LINQ
---

### Predicate<'Parameter'>

## يعني ايه Predicate ؟

هو Delegate خاص:

- بياخد Parameter واحد بس
- بيرجع bool بس

يعني:

> سؤال إجابته true أو false

```cs
	Predicate<T> = Func<T, bool>
```

```cs
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

        Predicate<int> isEven = x => x % 2 == 0;

        var result = numbers.FindAll(isEven);

        foreach (var n in result)
            Console.WriteLine(n);
    }
}
```
## نستخدم Predicate امتى؟

- فلترة List
- Search
- Check condition
- Validation

---

### مقارنة بين التلاتة

|النوع|بيرجع ايه|بياخد كام باراميتر| نستخدمه امتى     |
|---|---|---|---|
|Action|void|أي عدد| تنفيذ بدون نتيجة |
|Func|قيمة|أي عدد| حساب/إرجاع قيمة  |
|Predicate|bool|واحد| شرط/فلترة        

### مثال يجمعهم مع بعض

```cs
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

// Predicate
Predicate<int> isEven = x => x % 2 == 0;

// Func
Func<int, int> square = x => x * x;

// Action
Action<int> print = x => Console.WriteLine(x);

var evenNumbers = numbers.FindAll(isEven);

foreach (var num in evenNumbers)
{
    int result = square(num);
    print(result);
}
```

---
