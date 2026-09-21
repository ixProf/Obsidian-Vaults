

# 1) يعني إيه Middleware أصلًا؟

الـ **Middleware** هي جزء من أجزاء تطبيق ASP.NET Core، وظيفته إنه يقف في **النص** بين الـ request اللي جاي من الـ client وبين المكان اللي هيتم فيه تنفيذ المعالجة الفعلية للطلب، زي الـ controller أو الـ endpoint.

يعني ببساطة:

- اليوزر أو الـ client بيبعت request
- الـ request ده ما بيروحش مباشرة للـ controller
    
- لكن بيعدي الأول على مجموعة من الـ middleware
    
- كل middleware تقدر تعمل حاجة معينة على الـ request
    
- وبعد كده إما:
    
    - تسمحله يكمل
        
    - أو توقفه
        
    - أو تعدل فيه
        
    - أو تجهز response وترجعه فورًا
        

فهي تعتبر **Component وسيط** جوه التطبيق.

---

## تعريف أبسط جدًا

تخيل إن عندك شركة، وكل واحد داخل الشركة لازم يعدي على:

- بواب
- بعده موظف أمن
- بعده موظف استقبال
- بعده الشخص المسؤول

كل واحد فيهم يقدر:

- يسمحله يعدي
- يمنعه
- يسأله
- يسجل بياناته
- يوجهه لمكان معين


هذا بالضبط هو دور الـ Middleware.

---

# 2) ليه اسمها Middleware؟

الكلمة نفسها متقسمة كده:

- **Middle** = في المنتصف
- **Ware** = مكون برمجي / software component

فهي حرفيًا حاجة واقفة **في النص** بين:

- الـ incoming request
    
- والـ outgoing response
    
- والـ endpoint اللي هينفذ المنطق
    

---

# 3) هي واقفة بين إيه وإيه؟

الـ Middleware بتقف بين 3 حاجات مهمين:

## أولًا: الـ Client

زي:

- Browser
    
- Mobile App
    
- Postman
    
- Frontend App
    

هو اللي بيبعت الطلب

---

## ثانيًا: الـ Server Application

وده تطبيق ASP.NET Core نفسه

---

## ثالثًا: الـ Endpoint

زي:

- Controller Action
    
- Minimal API endpoint
    
- Razor page
    
- Static file response
    

---

## الصورة الذهنية

```text
Client → Middleware Pipeline → Endpoint
Client ← Middleware Pipeline ← Response
```

يعني الـ request وهو داخل بيعدي على middleware، والـ response وهو خارج برضه بيعدي عليهم.

---

# 4) الفكرة الكبيرة: Middleware Pipeline

أهم كلمة لازم تفهمها هنا هي:

## Pipeline

يعني **خط معالجة** أو **سلسلة تنفيذ**

كل request بيعدي على سلسلة من الـ middleware واحدة واحدة.

مثال:

```text
Request
   ↓
Middleware 1
   ↓
Middleware 2
   ↓
Middleware 3
   ↓
Controller / Endpoint
   ↑
Middleware 3
   ↑
Middleware 2
   ↑
Middleware 1
   ↑
Response
```

---

## معنى الرسم ده

### أثناء دخول الـ request:

بيمشي من فوق لتحت

### أثناء رجوع الـ response:

بيرجع من تحت لفوق

---

## دي نقطة في منتهى الأهمية

الـ Middleware مش بس بتشتغل "قبل" الوصول للـ controller

لا، دي ممكن تشتغل:

- **قبل** الـ next
    
- و**بعد** الـ next
    

وده معناه إنها ممكن تشتغل في الاتجاهين:

- Direction 1: معالجة الـ request
    
- Direction 2: معالجة الـ response
    

---

# 5) يعني إيه "قبل" و"بعد"؟

بص على الشكل ده:

```cs
app.Use(async (context, next) =>
{
    Console.WriteLine("Before");

    await next();

    Console.WriteLine("After");
});
```

## هنا اللي حصل:

- السطر الأول اشتغل قبل ما الريكوست يكمل
    
- `await next()` خلت التنفيذ يروح للـ middleware اللي بعدها
    
- بعد ما التنفيذ يرجع، السطر اللي بعد `await next()` يشتغل
    

---

## فبالتالي middleware واحدة تقدر تعمل:

### قبل التنفيذ:

- check
- validation
- logging
- authentication

### بعد التنفيذ:

- response logging
- measuring time
- modifying response headers

---

# 6) ليه الـ Middleware مهمة؟

من غير Middleware، كنت هتحط حاجات كتير في كل controller، زي:

- التحقق من هوية المستخدم
- كتابة logs
- معالجة الأخطاء
- قياس الأداء
- منع بعض الطلبات
- إضافة headers
    

وده معناه:

- تكرار كبير جدًا في الكود
- controllers تبقى مليانة حاجات ملهاش علاقة بالـ business logic
- صعوبة صيانة
    

---

## مع الـ Middleware

كل وظيفة عامة تعملها مرة واحدة وتطبقها على كل التطبيق أو على جزء كبير منه

مثال:

- Middleware للـ logging
    
- Middleware للـ exception handling
    
- Middleware للـ rate limiting
    

---

## النتيجة

- تنظيم
    
- إعادة استخدام
    
- فصل مسؤوليات
    
- سهولة صيانة
    
- وضوح أكتر في المعمارية
    

---

# 7) أمثلة على حاجات شائعة جدًا تتعمل بـ Middleware

## 1. Logging

تسجل:

- request path
    
- method
    
- response status code
    
- execution time
    

## 2. Authentication

تحدد مين المستخدم

## 3. Authorization

تقرر هل المستخدم ده مسموح له يكمل ولا لا

## 4. Exception Handling

لو حصل error، middleware تمسكه وترجع response محترم بدل crash

## 5. Rate Limiting

تحدد عدد requests في وقت معين

## 6. Response Headers

تضيف headers للـ response

## 7. Static Files

تخدم ملفات زي:

- css
    
- js
    
- images
    

## 8. Routing

تحدد أي endpoint المفروض يستقبل الـ request

---

# 8) ترتيب الـ Middleware مهم جدًا

الـ Middleware مش شغالة عشوائي، لا  
**الترتيب اللي تكتبها بيه في Program.cs مهم جدًا**

مثال:

```cs
app.UseAuthentication();
app.UseAuthorization();
```

الترتيب ده صحيح

ليه؟

لأن:

- الأول لازم تعرف مين المستخدم
    
- بعدين تقرر هل له صلاحية ولا لا
    

---

## لو عكستهم

```cs
app.UseAuthorization();
app.UseAuthentication();
```

ده منطقيًا غلط

لأنك بتحاول تفوض user أنت لسه ما عرفتش هو مين

---

## إذًا:

**Order matters**

وده من أهم الحاجات في middleware

---

# 9) إزاي الـ Middleware بتتسجل؟

في ASP.NET Core عندك كذا طريقة:

## 1. `app.Use(...)`

الأكثر استخدامًا

## 2. `app.Run(...)`

terminal middleware

## 3. `app.Map(...)`

branching

## 4. `app.UseMiddleware<T>()`

لتسجيل custom middleware class

---

# 10) الفرق بين app.Use و app.Run و app.Map

---

## أولًا: app.Use

دي أشهر واحدة

بتستخدم لما تكون عايز middleware:

- تعمل logic
    
- وبعدين غالبًا تكمل للبعدها
    

مثال:

```cs
app.Use(async (context, next) =>
{
    Console.WriteLine("Before next");

    await next();

    Console.WriteLine("After next");
});
```

### مميزاتها:

- تقدر تعمل قبل وبعد
    
- تقدر توقف أو تكمل
    
- flexible جدًا
    

---

## ثانيًا: app.Run

دي تعتبر **Terminal Middleware**

يعني إيه Terminal؟  
يعني:

- هي آخر محطة
    
- لما request يوصل لها غالبًا مش هيكمل بعدها
    

مثال:

```cs
app.Run(async context =>
{
    await context.Response.WriteAsync("Hello");
});
```

### معناها:

- هنا مفيش `next`
    
- يعني خلاص انتهى التنفيذ عندها
    

---

## ثالثًا: app.Map

دي بتستخدم لو عايز تعمل **branch** أو تفريع في الـ pipeline

مثال:

```cs
app.Map("/admin", adminApp =>
{
    adminApp.Run(async context =>
    {
        await context.Response.WriteAsync("Admin Area");
    });
});
```

### معناها:

لو الـ path بدأ بـ `/admin`  
يبقى خليه يدخل في branch مخصوص

---

# 11) يعني إيه Branching؟

بدل ما كل الطلبات تمشي في نفس الخط، ممكن تعمل تفريعات حسب شرط معين

مثال:

- `/admin` → يمشي في pipeline معينة
- `/api` → يمشي في pipeline تانية
    

فـ `app.Map` بتساعدك تقسم السيرفر لمسارات تنفيذ مختلفة.

---

# 12) شكل كتابة Middleware بسيط

فيه طريقتين مشهورين:

## 1. Inline Middleware
يعني تكتبها مباشرة في Program.cs

```cs
app.Use(async (context, next) =>
{
    await next();
});
```

دي كويسة للحاجات الصغيرة

---

## 2. Class-based Middleware

يعني تعمل class مخصوص
دي أنضف وأفضل لو الـ logic كبيرة

---

# 13) كتابة Custom Middleware Class

الشكل العام:

```cs
public class MyMiddleware
{
    private readonly RequestDelegate _next;

    public MyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        await _next(context);
    }
}
```

وبعدين تسجلها:

```cs
app.UseMiddleware<MyMiddleware>();
```

---

# 14) نشرح الكود ده سطر سطر

## السطر ده:

```cs
private readonly RequestDelegate _next;
```

ده متغير بيشيل reference للميديلوير اللي بعدها

### معنى RequestDelegate

هو delegate بيمثل الخطوة التالية في الـ pipeline

يعني:

- أنا middleware حالية
    
- ولما أقول `_next(context)`
    
- يبقى أنا بقول: كمّل التنفيذ عند اللي بعدي
    

---

## الـ constructor

```cs
public MyMiddleware(RequestDelegate next)
{
    _next = next;
}
```

ASP.NET Core بنفسها بتبني الـ pipeline  
ولما تيجي تنشئ الـ middleware بتمررلها الـ next middleware

---

## الميثود المهمة

```cs
public async Task Invoke(HttpContext context)
```

دي الميثود اللي framework بتناديها وقت تنفيذ request

### شروطها:

- اسمها يكون `Invoke` أو `InvokeAsync`
    
- تستقبل `HttpContext`
    
- غالبًا ترجع `Task`
    

---

# 15) يعني إيه HttpContext؟

ده من أهم Objects في ASP.NET Core كله

هو object شايل **كل معلومات الـ HTTP request والـ response الحالية**

---

## جواه إيه؟

### 1. Request

بيمثل الطلب الداخل

مثال:

```cs
context.Request.Path
context.Request.Method
context.Request.Headers
context.Request.Query
```

---

### 2. Response

بيمثل الرد الخارج

مثال:

```cs
context.Response.StatusCode
context.Response.Headers
context.Response.WriteAsync("Hello")
```

---

### 3. User

لو فيه authentication

```cs
context.User
```

---

### 4. Items

دي storage مؤقت للـ request الحالي فقط

```cs
context.Items["StartTime"] = DateTime.Now;
```

وتقدر middleware تانية تقراه

---

### 5. Connection

فيها معلومات زي IP address

```cs
context.Connection.RemoteIpAddress
```

---

## معنى مهم جدًا

`HttpContext` هو الحقيبة اللي شايلة كل حاجة تخص الـ request الحالية

---

# 16) execution flow بالتفصيل

بص على المثال ده:

```cs
app.Use(async (context, next) =>
{
    Console.WriteLine("M1 Before");
    await next();
    Console.WriteLine("M1 After");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("M2 Before");
    await next();
    Console.WriteLine("M2 After");
});

app.Run(async context =>
{
    Console.WriteLine("Endpoint");
    await context.Response.WriteAsync("Done");
});
```

## الناتج:

```text
M1 Before
M2 Before
Endpoint
M2 After
M1 After
```

---

## ليه الترتيب ده حصل؟

لأن التنفيذ بيشتغل كده:

1. يدخل M1
    
2. M1 تستدعي next
    
3. يدخل M2
    
4. M2 تستدعي next
    
5. يوصل للـ endpoint
    
6. يخلص endpoint
    
7. يرجع لـ M2
    
8. يخلص after logic بتاعها
    
9. يرجع لـ M1
    
10. يخلص after logic بتاعها
    

---

## إذًا:

الـ Middleware بتتصرف كأنها nested layers

زي:

```text
M1(
   M2(
      Endpoint
   )
)
```

---

# 17) معنى `await _next(context)` بعمق

الجملة دي أهم سطر في middleware تقريبًا

```cs
await _next(context);
```

### معناها:

- مرر الـ request للـ component اللي بعدها
    
- واستنى لما ترجع
    
- وبعدين كمل اللي بعد السطر ده
    

---

## لو شلتها

لو ما ناديتش `_next(context)`:

- يبقى الـ request هيتوقف عند middleware الحالية
    
- ومش هيوصل للـ controller أو اللي بعدها
    

وده اسمه:

## Short-circuiting the pipeline

---

# 18) يعني إيه short-circuit؟

يعني middleware تقرر:

- أنا مش هكمل للبعدي
    
- وأنا اللي هرد
    

مثال:

```cs
app.Use(async (context, next) =>
{
    if (!context.Request.Headers.ContainsKey("X-API-KEY"))
    {
        context.Response.StatusCode = 401;
        await context.Response.WriteAsync("Unauthorized");
        return;
    }

    await next();
});
```

---

## هنا حصل إيه؟

لو الـ header مش موجود:

- middleware رجعت response فورًا
    
- وما كملتش
    

وده استخدام مهم جدًا في:

- auth
    
- validation
    
- blocking requests
    

---

# 19) Before logic و After logic

الـ middleware ممكن تعمل نوعين من الـ logic:

## Before Logic

قبل ما الـ request يكمل

مثال:

- check headers
    
- start timer
    
- authentication
    
- request logging
    

## After Logic

بعد ما التنفيذ يرجع من اللي بعدها

مثال:

- measure elapsed time
    
- response logging
    
- add headers
    
- cleanup
    

---

# 20) مثال profiling middleware بتفصيل

الكود:

```cs
public class ProfilingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ProfilingMiddleware> _logger;

    public ProfilingMiddleware(RequestDelegate next, ILogger<ProfilingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        var stopwatch = new Stopwatch();
        stopwatch.Start();

        await _next(context);

        stopwatch.Stop();

        _logger.LogInformation(
            $"Request '{context.Request.Path}' took '{stopwatch.ElapsedMilliseconds} ms'"
        );
    }
}
```

---

## نشرحها:

### `_next`

علشان يكمل للي بعدها

### `_logger`

علشان يكتب log في output أو console أو provider تاني

### `Stopwatch`

علشان نقيس الزمن

---

## خطوات التنفيذ:

1. يبدأ stopwatch
    
2. يمرر request للبعده
    
3. لما التنفيذ يرجع
    
4. يوقف stopwatch
    
5. يسجل الزمن
    

---

## فايدة middleware دي

تعرف:

- أي request بطيئة
    
- أي endpoint بتاخد وقت
    
- تراقب الأداء
    

---

# 21) شرح ILogger

`ILogger<T>` ده abstraction للـ logging system في .NET

تقدر تستخدمه علشان:

- `LogInformation`
    
- `LogWarning`
    
- `LogError`
    
- `LogCritical`
    

مثال:

```cs
_logger.LogInformation("Request started");
```

---

## استخدامه في middleware مفيد في:

- tracing
    
- diagnostics
    
- performance analysis
    

---

# 22) مثال Rate Limiting Middleware

الفكرة:  
لو client بعت requests كتير جدًا في وقت قليل  
ممكن نوقفه

---

## ليه؟

- حماية من spam
    
- تقليل الضغط
    
- تقليل abuse
    
- مقاومة بعض أشكال الـ DDoS
    

---

## الفكرة المنطقية:

- نعد عدد الطلبات
    
- خلال مدة معينة
    
- لو زادوا عن limit معين
    
- نرفض الطلبات الجديدة
    

---

## المثال البسيط اللي عندك

بيعتمد على:

- counter
    
- last request time
    

وده كويس للفهم، لكن مش قوي للإنتاج

---

# 23) مشاكل Rate Limiting البسيطة

الكود اللي بيستخدم:

```cs
private static int _counter = 0;
private static DateTime _lastRequestDate = DateTime.Now;
```

فيه مشاكل مهمة:

## 1. static shared state

يعني كل الناس بتشارك نفس العدّاد  
فده مش per user ولا per IP

## 2. مش thread-safe

لو requests كتير دخلت مع بعض  
ممكن الـ counter يحصل فيه race condition

## 3. inaccurate logic

ممكن التوقيت يبقى مش مضبوط قوي

## 4. مش scalable

لو التطبيق شغال على أكتر من server  
كل server هيبقى عنده counter لوحده

---

## إذًا في production الأفضل تستخدم:

- built-in rate limiting
    
- MemoryCache
    
- Redis / distributed cache
    

---

# 24) response status code 429

في rate limiting غالبًا بنستخدم:

```cs
context.Response.StatusCode = 429;
```

وده معناه:

**Too Many Requests**

وده status code رسمي لما client يبعت requests أكتر من الحد المسموح.

---

# 25) middleware ممكن تعمل إيه غير التوقيف؟

middleware تقدر:

## 1. تعدل request

مثال:

- تضيف data في `Items`
    
- تفحص headers
    
- تقرأ query string
    

## 2. تعدل response

مثال:

- تضيف header
    
- تغير status code
    
- تكتب body
    

## 3. تعمل logging

## 4. تعمل checks

## 5. تعمل branching

## 6. توقف الـ pipeline

---

# 26) built-in middleware مشهورة في ASP.NET Core

فيه middleware جاهزة كتير جدًا

## `UseDeveloperExceptionPage`

تعرض errors بشكل مناسب أثناء التطوير

## `UseExceptionHandler`

تمسك الاستثناءات في production

## `UseStaticFiles`

تخدم static files

## `UseRouting`

تحدد endpoint المناسب

## `UseAuthentication`

تعمل authenticate للمستخدم

## `UseAuthorization`

تتحقق من الصلاحيات

## `UseHttpsRedirection`

تحول من HTTP إلى HTTPS

## `UseCors`

تتعامل مع cross-origin requests

---

# 27) ترتيب middleware الشائع في Program.cs

غالبًا هتلاقي شكل قريب من ده:

```cs
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
```

---

## ليه الترتيب ده؟

### `UseHttpsRedirection`

بدري علشان يحول الطلب بدري

### `UseStaticFiles`

لو فيه ملف static، يخلص بدري من غير ما يدخل باقي pipeline

### `UseRouting`

علشان يعرف endpoint

### `UseAuthentication`

يعرف user

### `UseAuthorization`

يحدد هل user مسموح

### `MapControllers`

يشغل الـ endpoint

---

# 28) الفرق بين Middleware و Controller

## Middleware

- شغالة على مستوى التطبيق كله
    
- Global
    
- بتشتغل قبل الوصول للـ controller
    
- ممكن تمنع الوصول أصلًا
    

## Controller

- مسؤول عن business logic
    
- بيعالج request بعد ما تعدي من pipeline
    

---

## إذًا:

- Middleware = infrastructure / cross-cutting concerns
    
- Controller = actual business logic
    

---

# 29) الفرق بين Middleware و Filters

دي نقطة مهمة جدًا

## Middleware

- بتشتغل على كل request
    
- على مستوى ASP.NET Core pipeline كله
    
- قبل MVC غالبًا
    

## Filters

- بتشتغل جوه MVC pipeline
    
- مرتبطة بالـ controllers/actions
    

---

## مثال

لو عايز تعمل logic على كل التطبيق:

- استخدم middleware
    

لو عايز logic على أكشنات معينة:

- استخدم filter
    

---

# 30) الفرق بين app.Use و app.UseMiddleware()

## `app.Use(...)`

بتكتب inline delegate

مثال:

```cs
app.Use(async (context, next) =>
{
    await next();
});
```

## `app.UseMiddleware<MyMiddleware>()`

بتسجل class جاهزة

مثال:

```cs
app.UseMiddleware<MyMiddleware>();
```

---

## امتى أستخدم كل واحدة؟

- حاجة صغيرة جدًا → `app.Use`
    
- logic محترمة ومنظمة → class middleware
    

---

# 31) ليه method لازم اسمها Invoke أو InvokeAsync؟

لأن ASP.NET Core لما تيجي تشغل middleware class  
بتدور على method اسمها:

- `Invoke`
    
- أو `InvokeAsync`
    

علشان تعتبرها entry point للتنفيذ

---

# 32) هل لازم تكون async؟

مش لازم 100% في كل الحالات  
لكن الأفضل جدًا تكون async

ليه؟

لأن:

- معظم الشغل في web apps asynchronous
    
- IO operations زي DB أو network أو file handling غالبًا async
    
- وده أفضل للأداء
    

---

# 33) ليه لازم أعمل await؟

لو عندك:

```cs
await _next(context);
```

لازم الـ await هنا لأنك:

- عايز تستنى الخطوة اللي بعدها تخلص
    
- وبعدها تكمل
    

---

## لو كتبت:

```cs
_next(context);
```

من غير await  
فأنت فتحت task وما استنيتهاش  
وده ممكن يسبب:

- لخبطة في الترتيب
    
- after logic تشتغل بدري
    
- bugs صعبة
    

---

# 34) Thread Safety في middleware

لو middleware بتستخدم shared state  
زي:

```cs
static int _counter;
```

لازم تبقى حذر جدًا

لأن web server بيستقبل requests كتير مع بعض  
فممكن أكتر من thread يوصل لنفس المتغير في نفس الوقت

وده يسبب:

- race conditions
    
- قيم غلط
    
- bugs متقطعة
    

---

## الحل:

- تجنب shared mutable state
    
- استخدم locking لو لازم
    
- أو استخدم cache/provider مناسب
    

---

# 35) Dependency Injection في middleware

middleware classes تقدر تاخد dependencies

مثال:

- logger
    
- service
    
- configuration
    

زي:

```cs
public ProfilingMiddleware(RequestDelegate next, ILogger<ProfilingMiddleware> logger)
```

ASP.NET Core هتحقنهالك من الـ DI container

---

## فايدة ده

middleware تبقى قابلة للتوسيع والتنظيم  
وتستخدم الخدمات الجاهزة

---

# 36) middleware execution كأنها layers

تقدر تتخيلها زي onion layers

طبقات فوق بعض

كل request:

- يدخل جوه الطبقات
    
- يوصل للمركز
    
- وبعدين يخرج منها تاني
    

---

## الشكل:

```text
Layer 1
  Layer 2
    Layer 3
      Endpoint
    Layer 3
  Layer 2
Layer 1
```

وده بيفسر ليه:

- before logic بتشتغل بترتيب
    
- after logic بترجع بالعكس
    

---

# 37) أخطاء شائعة جدًا

## الخطأ الأول: نسيان `_next(context)`

لو ما ناديتش next:

- الـ pipeline هتقف
    

إلا لو ده مقصود

---

## الخطأ الثاني: نسيان await

```cs
_next(context); // غلط غالبًا
```

لازم:

```cs
await _next(context);
```

---

## الخطأ الثالث: ترتيب middleware غلط

وده من أكتر الأسباب اللي بتطلع bugs غريبة

---

## الخطأ الرابع: كتابة response بعد ما تكون اتبعت

لو response بدأت تتكتب فعلًا  
بعض التعديلات بعد كده ممكن تفشل

---

## الخطأ الخامس: استخدام state مشتركة من غير thread safety

خصوصًا في counters

---

# 38) middleware terminal و non-terminal

## Non-terminal Middleware

دي middleware بتكمل للي بعدها غالبًا

```cs
await _next(context);
```

## Terminal Middleware

دي بتعتبر آخر محطة  
زي `app.Run`

أو middleware فيها `return` من غير next

---

# 39) مثال ذهني على Request حقيقي

نفترض إن عندك pipeline فيها:

1. Logging middleware
    
2. Authentication middleware
    
3. Authorization middleware
    
4. Controller
    

والـ request جاي كده:

```text
GET /api/orders
```

## التنفيذ:

- Logging تسجل البداية
    
- Authentication تحدد المستخدم
    
- Authorization تحدد هل مسموحله
    
- Controller ينفذ ويرجع data
    
- Authorization تخلص
    
- Authentication تخلص
    
- Logging تسجل النهاية
    

---

# 40) جملة مهمة جدًا تتحفظ

> Middleware هي سلسلة من المكونات البرمجية التي تعالج الـ request والـ response داخل ASP.NET Core pipeline.

---

# 41) مصادر تسمعها علشان تفهمها اكتر

## محتوى عربي

- [Pipeline & Middleware](https://youtu.be/jD0F-_CoqMc?si=jxFjXrSDMAY40F3W)

- [ASP.NET Core for Beginners: 05- Middlewares](https://www.youtube.com/watch?v=WG_wlBkeAWA&pp=ygUPbWlkZGxld2FyZSAubmV0 "ASP.NET Core for Beginners: 05- Middlewares")

- [Middleware in ASP.NET Core MVC شرح بالعربي](https://www.youtube.com/watch?v=BsEovTij5rA&t=630s&pp=ygUPbWlkZGxld2FyZSAubmV0 "7.MiddleWare in ASP.NET Core MVC شرح بالعربي")



## محتوى انجليزي

[Middleware in ASP.NET Core – Everything You Need to Know in 5 Minutes](https://youtu.be/UIkV-sLdEuE?si=E1gEoLcv4AaOAeI0)

[Coding Shorts: ASP.NET Core Middleware Explained](https://www.youtube.com/watch?v=TqCshF0o0nE&pp=ygUPbWlkZGxld2FyZSAubmV0 "Coding Shorts: ASP.NET Core Middleware Explained")



