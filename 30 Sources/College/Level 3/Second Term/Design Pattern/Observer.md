---
title: "Observer"
aliases: []
type: source
status: active
domain: software-engineering
tags: [source, software-engineering, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

![[Pasted image 20260403225250.png]]
![[Pasted image 20260403225422.png]]

# Observer Pattern Summary


## 1) Definition

- The Observer Pattern Defines a one-to-many dependency between objects so that when one object changes state, all of its dependents are notified and updated automatically

يعني:

- عندك object واحد اسمه Subject
    
- وعندك objects كتير تابعين له اسمهم Observers
    
- أول ما الـ Subject يحصل فيه state change، كل الـ Observers بيتعملهم notify automatically ويتحدثوا. هذا هو التعريف الأساسي الموجود في المحاضرة.
    
---

## 2) Example used in lecture: Weather Station

المثال الأساسي في المحاضرة هو Weather Monitoring Station.

عندنا:

- WeatherData object
- CurrentConditionsDisplay
- StatisticsDisplay
- ForecastDisplay
    

الـ WeatherData هو اللي بيمسك الـ state:

- temperature
- humidity
    
- pressure
    

ولما القيم دي تتغير، المفروض كل الـ displays تتحدث. المحاضرة وضحت إن النظام لازم يكون expandable بحيث يمكن إضافة displays جديدة لاحقًا بدون تعديل كل مرة في الكود الأساسي.

---

## 3) Very important exam point: Design Principle

المبدأ اللي الدكتور ركّز عليه جدًا:

Design Principle:  
==Strive for loosely coupled designs between objects that interact.==

المقصود بـ==loosely coupled==:  
إن الكلاسات تتعامل مع بعض لكن ==بأقل معرفة ممكنة عن بعض==.

يعني الـ Subject ميعرفش تفاصيل الـ ==concrete classes الخاصة بالـ observers==، هو فقط يعرف إنهم implement interface معين. 

المحاضرة شرحت إن ده بيسمح بإضافة observers أو حذفهم أو استبدالهم وقت التشغيل ==بدون تعديل الـ subject نفسه==.

---

## 4) Why loose coupling is important?

ليه ده مهم؟

لأنك تقدر:

- add new observers at runtime
- remove observers at runtime
    
- reuse subject and observers independently
    
- change one side without breaking the other side as long as interface contract is respected
    

وده بالضبط اللي المحاضرة ذكرته تحت عنوان The power of Loose Coupling.

---

## 5) Important exam question

السؤال المهم جدًا:

WeatherData implements ولا extends Subject?

الإجابة:  
==WeatherData implements Subject==

ليه؟  
لأن Subject هنا interface، والـ ==class يعمل implements للـ interface.==  
أما ==extends فتكون مع class أو abstract class.==

وده متوافق أيضًا مع class diagram في المحاضرة، حيث WeatherData implements Subject interface.

لكن لو استخدمت Java built-in Observable فهناك WeatherData extends Observable لأن Observable class وليست interface. المحاضرة وضحت هذا الفرق أيضًا.

---

## 6) Components of the pattern

في المحاضرة الـ design اتقسم إلى 4 أجزاء أساسية:

### Subject

ده المسؤول عن إدارة الـ observers.

### بيعمل إيه؟

- يحتفظ بالـ observers
- يضيفهم
- يشيلهم
- يبلغهم لما يحصل تغيير

وده interface فيه:

- RegisterObserver: Registers a new observer to receive updates from the subject.
دي method وظيفتها تضيف observer جديد
- RemoveObserver: Registers a new observer to receive updates from the subject.
- تشيل observer من النظام
- NotifyObservers: Notifies all observers about state changes.
- تبلغ كل الـ observers

### Observer
ده أي object عايز يتابع الـ Subject.

### بيعمل إيه؟

- يستقبل التحديث (update)
- يتصرف بناءً عليه

وده interface فيه:

- Update: Called by the subject to push updated data to observers.
الـ Subject بينادي عليها عشان يبعت البيانات

### ConcreteSubject

وده هنا WeatherData  

ده التطبيق الفعلي للـ Subject.

### بيعمل:

- يخزن البيانات (temperature, humidity, pressure)
- يحتفظ بالـ observers
- يبلغهم لما البيانات تتغير


- stores the state
    
- keeps list of observers
    
- notifies them when state changes

### ConcreteObserver

زي:

- CurrentConditions
- Statistics
- Forecast

### بيعمل:

- يستقبل update
- يعرض البيانات
زي:

- CurrentConditionsDisplay
    
- StatisticsDisplay
    
- ForecastDisplay
    

وكل observer يعمل implement لـ Observer interface، وغالبًا كمان DisplayElement interface لو عنده display method. كل ده موجود في class diagram وفي implementation pages الخاصة بالمحاضرة.

---

## 7) فكرة الدكتور المبسطة

الدكتور لخّصها بشكل بسيط جدًا:

الـ observer هو class  
والـ subject class جواه ==array أو list من observers==  
ولو observer جديد عايز يدخل، ==بنضيفه في الـ collection==  
ولما يحصل change نعمل notify للكل

وده فعلًا نفس اللي موجود في implementation بتاع WeatherData في المحاضرة، حيث WeatherData يحتفظ بـ ArrayList observers ويعمل loop عليهم ويستدعي update لكل observer.

---

# The Wrong Way

# الكود الغلط قبل تطبيق Observer Pattern

ده الكود اللي فكرته غلط لأنه مش مطبق الـ Observer Pattern، وده قريب جدًا من أول محاولة في المحاضرة لما كان WeatherData بينادي مباشرة على كل display واحد واحد. المحاضرة اعتبرت ده implementation misguided لأنه يسبب coupling عالي ويحتاج تعديل كل مرة نضيف display جديد.

## Wrong C# Code

```csharp
using System;

public class CurrentConditionsDisplay
{
    public void Update(float temp, float humidity, float pressure)
    {
        Console.WriteLine($"Current Conditions: Temp={temp}, Humidity={humidity}, Pressure={pressure}");
    }
}

public class StatisticsDisplay
{
    public void Update(float temp, float humidity, float pressure)
    {
        Console.WriteLine($"Statistics: Temp={temp}, Humidity={humidity}, Pressure={pressure}");
    }
}

public class ForecastDisplay
{
    public void Update(float temp, float humidity, float pressure)
    {
        Console.WriteLine($"Forecast: Temp={temp}, Humidity={humidity}, Pressure={pressure}");
    }
}

public class WeatherData
{
    private float temperature;
    private float humidity;
    private float pressure;

    private CurrentConditionsDisplay currentConditionsDisplay;
    private StatisticsDisplay statisticsDisplay;
    private ForecastDisplay forecastDisplay;

    public WeatherData(CurrentConditionsDisplay current, StatisticsDisplay stats, ForecastDisplay forecast)
    {
        currentConditionsDisplay = current;
        statisticsDisplay = stats;
        forecastDisplay = forecast;
    }

    public void SetMeasurements(float temperature, float humidity, float pressure)
    {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;

        MeasurementsChanged();
    }

    public void MeasurementsChanged()
    {
        currentConditionsDisplay.Update(temperature, humidity, pressure);
        statisticsDisplay.Update(temperature, humidity, pressure);
        forecastDisplay.Update(temperature, humidity, pressure);
    }
}

public class Program
{
    public static void Main()
    {
        var current = new CurrentConditionsDisplay();
        var stats = new StatisticsDisplay();
        var forecast = new ForecastDisplay();

        var weatherData = new WeatherData(current, stats, forecast);

        weatherData.SetMeasurements(80, 65, 30.4f);
    }
}
```

---

## Why is this wrong?

ليه الكود ده غلط؟

### 1. Tight Coupling

WeatherData مربوط مباشرة بـ:

- CurrentConditionsDisplay
    
- StatisticsDisplay
    
- ForecastDisplay
    

يعني لو أضفت ==HeatIndexDisplay مثلًا، لازم أعدل في WeatherData نفسه.==

### 2. Violates Open/Closed style thinking

أي display جديد يتطلب تعديل في existing code.

### 3. No runtime flexibility

مافيش register/remove dynamically.

### 4. Not coding to interface

إنت بتتعامل مع concrete classes وليس interfaces.

وده يتوافق مع النقد اللي ظهر في المحاضرة لأول implementation، خصوصًا فكرة إننا coding to concrete implementations وإننا نحتاج تعديل الكود لكل display جديد.

---

# The Correct Way

# الكود الصح باستخدام Observer Pattern in Cs#

دلوقتي هنعملها صح:

- Subject interface
- Observer interface
- DisplayElement interface
- WeatherData implements ISubject
- displays implement IObserver + IDisplayElement

---

## 1) ISubject

```csharp
public interface ISubject
{
    void RegisterObserver(IObserver observer);
    void RemoveObserver(IObserver observer);
    void NotifyObservers();
}
```

---

## 2) IObserver

```csharp
public interface IObserver
{
    void Update(float temperature, float humidity, float pressure);
}
```

---

## 3) IDisplayElement

```csharp
public interface IDisplayElement
{
    void Display();
}
```

---

## 4) WeatherData implements ISubject

```csharp
using System.Collections.Generic;

public class WeatherData : ISubject
{
    private readonly List<IObserver> observers;

    private float temperature;
    private float humidity;
    private float pressure;
    
    public WeatherData()
    {
        observers = new List<IObserver>();
    }
    
    public void RegisterObserver(IObserver observer)
    {
        if (observer != null && !observers.Contains(observer))
        {
            observers.Add(observer);
        }
    }

    public void RemoveObserver(IObserver observer)
    {
        if (observer != null && observers.Contains(observer))
        {
            observers.Remove(observer);
        }
    }

    public void NotifyObservers()
    {
        foreach (IObserver observer in observers)
        {
            observer.Update(temperature, humidity, pressure);
        }
    }

    public void MeasurementsChanged()
    {
        NotifyObservers();
    }

    public void SetMeasurements(float temperature, float humidity, float pressure)
    {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        MeasurementsChanged();
    }
}
```

---

## 5) CurrentConditionsDisplay

```csharp
using System;

public class CurrentConditionsDisplay : IObserver, IDisplayElement
{
    private float temperature;
    private float humidity;
    private readonly ISubject weatherData;

    public CurrentConditionsDisplay(ISubject weatherData)
    {
        this.weatherData = weatherData;
        weatherData.RegisterObserver(this);
    }

    public void Update(float temperature, float humidity, float pressure)
    {
        this.temperature = temperature;
        this.humidity = humidity;
        Display();
    }

    public void Display()
    {
        Console.WriteLine($"Current Conditions: {temperature}F degrees and {humidity}% humidity");
    }
}
```

---

## 6) StatisticsDisplay

```csharp
using System;

public class StatisticsDisplay : IObserver, IDisplayElement
{
    private float maxTemp = float.MinValue;
    private float minTemp = float.MaxValue;
    private float tempSum = 0.0f;
    private int numReadings = 0;
    private readonly ISubject weatherData;

    public StatisticsDisplay(ISubject weatherData)
    {
        this.weatherData = weatherData;
        weatherData.RegisterObserver(this);
    }

    public void Update(float temperature, float humidity, float pressure)
    {
        tempSum += temperature;
        numReadings++;

        if (temperature > maxTemp)
            maxTemp = temperature;

        if (temperature < minTemp)
            minTemp = temperature;

        Display();
    }

    public void Display()
    {
        Console.WriteLine($"Avg/Max/Min temperature = {tempSum / numReadings}/{maxTemp}/{minTemp}");
    }
}
```

---

## 7) ForecastDisplay

```csharp
using System;

public class ForecastDisplay : IObserver, IDisplayElement
{
    private float currentPressure = 29.92f;
    private float lastPressure;
    private readonly ISubject weatherData;

    public ForecastDisplay(ISubject weatherData)
    {
        this.weatherData = weatherData;
        weatherData.RegisterObserver(this);
    }

    public void Update(float temperature, float humidity, float pressure)
    {
        lastPressure = currentPressure;
        currentPressure = pressure;
        Display();
    }

    public void Display()
    {
        Console.Write("Forecast: ");

        if (currentPressure > lastPressure)
        {
            Console.WriteLine("Improving weather on the way");
        }
        else if (currentPressure == lastPressure)
        {
            Console.WriteLine("More of the same");
        }
        else
        {
            Console.WriteLine("Watch out for cooler, rainy weather");
        }
    }
}
```

---

## 8) New Display added later without modifying WeatherData

وده أهم ميزة في الـ pattern: تقدر تضيف observer جديد من غير ما تفتح WeatherData وتعدّل فيه.

```csharp
using System;

public class HeatIndexDisplay : IObserver, IDisplayElement
{
    private float heatIndex;
    private readonly ISubject weatherData;

    public HeatIndexDisplay(ISubject weatherData)
    {
        this.weatherData = weatherData;
        weatherData.RegisterObserver(this);
    }

    public void Update(float temperature, float humidity, float pressure)
    {
        heatIndex = ComputeHeatIndex(temperature, humidity);
        Display();
    }

    public void Display()
    {
        Console.WriteLine($"Heat index is {heatIndex}");
    }

    private float ComputeHeatIndex(float t, float rh)
    {
        return (float)(
            16.923 +
            (0.185212 * t) +
            (5.37941 * rh) -
            (0.100254 * t * rh) +
            (0.00941695 * t * t) +
            (0.00728898 * rh * rh) +
            (0.000345372 * t * t * rh) -
            (0.000814971 * t * rh * rh) +
            (0.0000102102 * t * t * rh * rh) -
            (0.000038646 * t * t * t) +
            (0.0000291583 * rh * rh * rh) +
            (0.00000142721 * t * t * t * rh) +
            (0.000000197483 * t * rh * rh * rh) -
            (0.0000000218429 * t * t * t * rh * rh) +
            (0.000000000843296 * t * t * rh * rh * rh) -
            (0.0000000000481975 * t * t * t * rh * rh * rh)
        );
    }
}
```

المحاضرة نفسها أضافت HeatIndexDisplay كتطبيق على فكرة التوسّع وإضافة display جديد بسهولة.

---

## 9) Program.cs

```csharp
using System;

public class Program
{
    public static void Main()
    {
        WeatherData weatherData = new WeatherData();

        CurrentConditionsDisplay currentDisplay = new CurrentConditionsDisplay(weatherData);
        StatisticsDisplay statisticsDisplay = new StatisticsDisplay(weatherData);
        ForecastDisplay forecastDisplay = new ForecastDisplay(weatherData);
        HeatIndexDisplay heatIndexDisplay = new HeatIndexDisplay(weatherData);

        weatherData.SetMeasurements(80, 65, 30.4f);
        Console.WriteLine();

        weatherData.SetMeasurements(82, 70, 29.2f);
        Console.WriteLine();

        weatherData.SetMeasurements(78, 90, 29.2f);
        Console.WriteLine();
    }
}
```

---

# مقارنة مباشرة بين الغلط والصح

## Wrong code

في الكود الغلط:

- WeatherData بينادي على كل display بنفسه
    
- يعرف أسماءهم وأنواعهم
    
- أي display جديد = تعديل داخل WeatherData
    
- coupling عالي
    
- not flexible
    

## Correct Observer code

في الكود الصح:

- WeatherData يعرف فقط IObserver
    
- لا يهتم بنوع الـ concrete class
    
- أي display جديد فقط implements IObserver
    
- ثم register نفسه
    
- لا نعدل WeatherData
    
- ده يحقق loosely coupled design كما شرحت المحاضرة.
    

---

# Push vs Pull

نقطة مهمة في المحاضرة:

في implementation الأول في المحاضرة، الـ Subject كان بيعمل push للبيانات للـ observers عن طريق:  
`Update(temp, humidity, pressure)`

يعني القيم نفسها تتبعت للـ observer.


المحاضرة بعد ذلك ناقشت فكرة تانية وهي pull model:

- الـ subject يبلغ فقط إن فيه change
    
- والـ observer يروح يجيب البيانات المطلوبة عن طريق getters
    

المحاضرة شرحت إن push أسهل في البداية، لكن pull قد يكون أكثر flexibility في بعض الحالات لأنه يقلل تأثير تغيير شكل البيانات على جميع observers.

---

# الامتحان ممكن ييجي منه إيه؟

## 1. Define Observer Pattern

لازم تحفظ التعريف.

## 2. What is the relationship?

الإجابة:  
one-to-many relationship

## 3. What is the role of Subject?

- stores state
    
- manages observers
    
- notifies them on change
    

## 4. What is the role of Observer?

- receives updates
    
- reacts to state changes
    

## 5. Why is this design loosely coupled?

لأن الـ subject only depends on observer interface, not concrete classes.

## 6. Why is the first implementation wrong?

لأنه:

- coding to concrete implementations
    
- difficult to add/remove displays
    
- not flexible
    
- high coupling
    

وده متقال بوضوح في الجزء الذي ناقش first misguided implementation.

## 7. WeatherData implements or extends Subject?

implements Subject

## 8. If Subject is an interface, what keyword do we use?

implements

## 9. If it is an abstract class or normal class?

extends في Java، أو inheritance concept عمومًا

## 10. How do we add a fourth display?

نعمل class جديد implement IObserver + IDisplayElement  
ثم نسجله في WeatherData  
ولا نعدّل WeatherData

وده يوافق بالضبط فكرة “لو عايز تعمل واحدة رابعة” اللي الدكتور ركز عليها، وهي أصلًا واحدة من أهم advantages في الـ pattern.

---

# خلاصة للحفظ السريع

Observer Pattern = one subject, many observers

When subject changes state:  
all observers are notified automatically

WeatherData = Subject  
Displays = Observers

Subject has:

- RegisterObserver
    
- RemoveObserver
    
- NotifyObservers
    

Observer has:

- Update
    

Main principle:  

Strive for loosely coupled designs between objects that interact.

WeatherData implements Subject because Subject is an interface.

The wrong approach is calling displays directly inside WeatherData.  

The correct approach is storing observers in a collection and notifying them through the Observer interface.
