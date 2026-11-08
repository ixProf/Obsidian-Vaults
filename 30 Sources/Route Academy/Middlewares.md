---
title: "Middlewares"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-10-13
updated: 2026-10-27
source:
related: []
---

# 1. Middleware

## يعني إيه Middleware؟

الـ Middleware عبارة عن ==جزء من الكود بيشتغل أثناء معالجة الـ HTTP Request جوه التطبيق==.

لما الـ Client يبعت Request للسيرفر، الطلب بيعدي على مجموعة Middleware بالترتيب اللي إحنا مسجلينها بيه. كل واحدة بتنفذ مسؤولية معينة، وبعد كده يا إما تكمل للـ Middleware اللي بعدها، يا إما توقف الـ Pipeline وترد على الطلب بنفسها.

أمثلة لحاجات ممكن نعملها باستخدام Middleware:

- تسجيل تفاصيل الـ Requests في الـ Logs.
- التعامل مع الـ Exceptions.
- تحويل الـ HTTP إلى HTTPS.
- التأكد من هوية المستخدم.
- التحقق من صلاحيات المستخدم.
- ==تطبيق CORS Policies.==
- تقديم الـ Static Files.
- قياس وقت تنفيذ الـ Request.

يعني بدل ما نحط كل المسؤوليات دي جوه كل Controller، بنقدر نفصلها في Middleware وتشتغل على الطلبات حسب ترتيبها وإعداداتها.

## شكل الـ Request Pipeline

خلينا نفترض إن عندنا الـ Middleware دي:

![[Pasted image 20261017190258.png]]

الـ Request بيمشي من أول الـ Pipeline لحد ما يوصل للـ Endpoint المناسب، وبعدها الـ Response بيرجع في الاتجاه العكسي من خلال الـ Middleware اللي كانت مستنية نتيجة التنفيذ.

وده معناه إن الـ Middleware مش بتشتغل وقت دخول الطلب بس؛ ممكن كمان تنفذ كود بعد ما باقي الـ Pipeline يخلص.

## الـ Pipeline بتشتغل في اتجاهين

بص على المثال ده:

```cs
app.Use(async (context, next) =>
{
    Console.WriteLine("Before");

    await next(context);

    Console.WriteLine("After");
});
```

هنا التنفيذ بيحصل بالترتيب ده:

1. يطبع `Before`.
2. ينفذ باقي الـ Middleware والـ Endpoint.
3. بعد ما التنفيذ يرجع، يطبع `After`.

السبب هو السطر ده:

```cs
await next(context);
```

ده ==معناه إن الـ Middleware بتسمح لباقي الـ Pipeline إنها تكمل، وبتستنى لحد ما التنفيذ اللي بعدها== يخلص.

ودي من أهم مميزات الـ Middleware؛ ==لأنك تقدر تبدأ عملية قبل تنفيذ الـ Request،== وبعدها تكملها لما الـ Response يرجع.

مثلًا، لو عايز تقيس وقت تنفيذ الطلب، تبدأ الـ Stopwatch قبل `next` وتوقفها بعده.

---

## 1.1 الفرق بين Use و Run و Map

دول 3 Methods مهمين جدًا في تسجيل الـ Middleware، وكل واحدة ليها استخدام مختلف.

### Use()

بنستخدم `Use()` ==لما نحتاج ننفذ كود ونسمح للـ Request إنه يكمل للـ Middleware اللي بعدها==.

```cs
app.Use(async (context, next) =>
{
    context.Response.Headers.Append(
        "X-Request-Id",
        Guid.NewGuid().ToString());

    await next(context);

    Console.WriteLine(
        $"Response: {context.Response.StatusCode}");
});
```

في المثال ده:

- بنضيف Header اسمه `X-Request-Id`.
- بنسمح لباقي الـ Pipeline إنها تكمل.
- بعد رجوع الـ Response، بنطبع الـ Status Code.
    

خلي بالك إن `Use()` نفسها مش شرط تكمل التنفيذ؛ لو ما استدعتش `next`، تقدر توقف الـ Pipeline عندها.

### Run()

دي بنستخدمها لما نكون عايزين ==ننهي الـ Pipeline عند نقطة معينة==.

```cs
app.Run(async context =>
{
    await context.Response.WriteAsync(
        "Hello from ASP.NET Core");
});
```

الـ `Run()` مش بتستقبل `next`، وبالتالي مش هتقدر تمرر التنفيذ للـ Middleware اللي بعدها من خلالها.

مثلًا:

```cs
app.Run(async context =>
{
    await context.Response.WriteAsync("Hello");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("This will not run");

    await next(context);
});
```

الـ Middleware التانية مش هتتنفذ للطلبات اللي وصلت للـ `Run()` الأولى.

**الخلاصة:** أي Middleware محتاجها تشتغل على الطلبات دي ==لازم تسجلها قبل الـ `Run()` اللي بتنهي الـ Pipeline.==

### Map()

دي ==بتعمل فرع منفصل من الـ Pipeline بناءً على جزء من الـ URL.==

```cs
app.Map("/health", healthApp =>
{
    healthApp.Run(async context =>
    {
        await context.Response.WriteAsync("Healthy");
    });
});
```

لو الـ Request بدأ بـ `/health`، هيدخل الفرع ده.

مثلًا:

```
/health
/health/live
```

جوه فرع `Map("/health")`، الـ Prefix اللي عملنا عليه المطابقة بيتشال من `Request.Path`. يعني `/health/live` بتبقى `/live` داخل الفرع.

الفرع ده مش بيرجع تلقائيًا للـ Pipeline الرئيسية.

### MapWhen()

دي بتعمل فرع بناءً على شرط، ومش لازم يكون الشرط متعلق بالـ URL.

```cs
app.MapWhen(
    context => context.Request.Query.ContainsKey("debug"),
    debugApp =>
    {
        debugApp.Run(async context =>
        {
            await context.Response.WriteAsync("Debug mode");
        });
    });
```

لو الـ Request فيه Query Parameter اسمه `debug`، الطلب هيدخل الفرع ده.

مثال:

```
/products?debug=true
```

### UseWhen()

دي برضه بتعمل فرع بناءً على شرط، لكن الفرع يقدر يرجع يكمل في الـ Pipeline الرئيسية لو ما أنهَاش الطلب.

```cs
app.UseWhen(
    context => context.Request.Path.StartsWithSegments("/api"),
    apiApp =>
    {
        apiApp.Use(async (context, next) =>
        {
            context.Response.Headers.Append(
                "X-Api",
                "true");

            await next(context);
        });
    });
```

هنا أي Request مساره بيبدأ بـ `/api` هيتضاف له Header، وبعدها يكمل باقي الـ Pipeline.

### مقارنة سريعة

|Method|بتعمل إيه؟|
|---|---|
|`Use()`|تنفذ كود وتقدر تكمل للـ Middleware اللي بعدها|
|`Run()`|بتنهي الـ Pipeline|
|`Map()`|بتعمل فرع بناءً على URL Prefix|
|`MapWhen()`|بتعمل فرع بناءً على شرط|
|`UseWhen()`|بتعمل فرع شرطي يقدر يرجع للـ Pipeline الرئيسية|

---

# 2. ترتيب الـ Middleware

ترتيب الـ Middleware مش عشوائي. كل واحدة لازم تكون في المكان المناسب، لأن فيه Middleware بتعتمد على إن حاجات معينة تكون حصلت قبلها.

لو الترتيب غلط، ممكن يحصل مشاكل زي:

- الـ Authorization يشتغل قبل ما هوية المستخدم تتحدد.
- الـ Exception Handler ما يقدرش يمسك بعض الأخطاء.
- الـ CORS Headers ما تظهرش بالشكل المطلوب.
- ملفات الـ Static Files تتقدم قبل ما Middleware تانية تنفذ.
    

## الترتيب المقترح

```cs
var app = builder.Build();

// 1. Exception Handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/error");
}

// 2. HSTS
app.UseHsts();

// 3. HTTPS
app.UseHttpsRedirection();

// 4. Static Files
app.UseStaticFiles();

// 5. Routing
app.UseRouting();

// 6. CORS
app.UseCors();

// 7. Authentication
app.UseAuthentication();

// 8. Authorization
app.UseAuthorization();

// 9. Custom Middleware
app.UseMiddleware<AuditMiddleware>();

// 10. Endpoints
app.MapControllers();

app.Run();
```

ده ترتيب عام للتوضيح، والترتيب الفعلي ممكن يختلف حسب إعدادات التطبيق والـ Middleware اللي محتاجها.

## وظيفة كل واحدة

| Middleware                    | وظيفتها                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `UseDeveloperExceptionPage()` | بتعرض تفاصيل الأخطاء أثناء التطوير                          |
| `UseExceptionHandler()`       | بتتعامل مع الأخطاء غير المعالجة                             |
| `UseHsts()`                   | بتضيف HSTS Header للـ Response                              |
| `UseHttpsRedirection()`       | بتحول الطلب من HTTP إلى HTTPS                               |
| `UseStaticFiles()`            | بتقدم الملفات الثابتة الي هي زي css و html و js والحاجات دي |
| `UseRouting()`                | بتحدد الـ Endpoint المناسب للطلب                            |
| `UseCors()`                   | بتطبق قواعد السماح بالطلبات من Origins مختلفة               |
| `UseAuthentication()`         | بتحدد هوية المستخدم                                         |
| `UseAuthorization()`          | بتتحقق من صلاحيات المستخدم                                  |
| `UseMiddleware<T>()`          | بتسجل Middleware إحنا عاملينها                              |
| `MapControllers()`            | بتسجل الـ Endpoints الخاصة بالـ Controllers                 |

### Authentication و Authorization

الاتنين مرتبطين ببعض، لكن مش نفس الحاجة.
**Authentication:** مين المستخدم؟
يعني التطبيق بيتأكد من هوية المستخدم، مثلًا عن طريق Token صالح.

**Authorization:** المستخدم مسموح له يعمل إيه؟

بعد ما التطبيق يعرف هوية المستخدم، بيتحقق هل عنده الصلاحية المطلوبة ولا لأ.

عشان كده الترتيب المعتاد هو:

```
app.UseAuthentication();
app.UseAuthorization();
```

مينفعش نعكس الترتيب ونتوقع إن الـ Authorization يلاقي هوية المستخدم اتحددت بالفعل.

### ليه الـ Exception Handler بييجي في الأول؟

عشان يقدر ==يتعامل مع الـ Exceptions اللي بتحصل في الـ Middleware اللي بعده==.

مثلًا، لو سجلنا `UseExceptionHandler()` بعد Middleware ممكن ترمي Exception، فالـ Handler مش هيقدر يمسك الخطأ اللي حصل قبل ما التنفيذ يوصل له.

### ليه CORS ليها ترتيب معين؟

في الترتيب المعروض في المحاضرة، بنحط CORS بعد Routing وقبل Authentication وAuthorization.

```
app.UseRouting();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

ده بيسمح بتطبيق سياسة الـ CORS في المكان المناسب، بما فيها التعامل مع طلبات الـ Preflight.

### ملاحظة عن Routing و MapControllers

خد بالك `UseRouting()` و`MapControllers()` مش نفس الوظيفة.

- هنا `UseRouting()` بتعمل <mark style="background:#B42318">Matching للطلب وبتحدد الـ Endpoint المناسب.</mark>
- اما  `MapControllers()` بتسجل <mark style="background:#B42318">الـ Controller Endpoints علشان نظام الـ Routing يقدر يوصل لها</mark>.

وفي الإصدارات الحديثة، `WebApplication` ممكن تضيف Routing Middleware تلقائيًا حسب إعدادات التطبيق، لكن فهم الفرق بين الاتنين مهم.

---

# 3. Built-in Middleware

الـ ASP.NET Core فيها Middleware جاهزة بنستخدمها بدل ما نكتب كل حاجة من الصفر.

|Middleware|الاستخدام|
|---|---|
|`UseExceptionHandler()`|التعامل مع الأخطاء|
|`UseDeveloperExceptionPage()`|عرض تفاصيل الأخطاء أثناء التطوير|
|`UseHsts()`|إضافة HSTS|
|`UseHttpsRedirection()`|تحويل HTTP إلى HTTPS|
|`UseAuthentication()`|تحديد هوية المستخدم|
|`UseAuthorization()`|التحقق من الصلاحيات|
|`UseStaticFiles()`|تقديم الملفات الثابتة|
|`MapStaticAssets()`|تسجيل Static Assets باستخدام Endpoint Routing|
|`UseResponseCaching()`|تفعيل Response Caching Middleware|
|`UseResponseCompression()`|ضغط الـ Responses المناسبة|
|`UseRouting()`|مطابقة الـ Request مع Endpoint|
|`UseCors()`|تطبيق سياسات CORS|
|`UseForwardedHeaders()`|معالجة الـ Headers القادمة من Reverse Proxy موثوق|
|`UseRateLimiter()`|تطبيق قواعد تحديد معدل الطلبات|

مش معنى إن Middleware موجودة في الجدول إننا لازم نستخدمها كلها في كل مشروع. بنختار اللي يناسب احتياجات التطبيق، وبنراعي ترتيبها وإعداداتها.

---

# 4. كتابة Middleware بنفسنا

ممكن نكتب Middleware مباشرة في `Program.cs`، وممكن نعملها في Class مستقلة.

## 4.1 Inline Middleware

دي مناسبة لما يكون الكود صغير ومش محتاج يتعاد استخدامه في أماكن كتير.

### مثال: قياس وقت الـ Request

```cs
using System.Diagnostics;

app.Use(async (context, next) =>
{
    var stopwatch = Stopwatch.StartNew();

    await next(context);

    stopwatch.Stop();

    context.Response.Headers.Append(
        "X-Response-Time-Ms",
        stopwatch.ElapsedMilliseconds.ToString());
});
```

اللي بيحصل:

1. بنبدأ الـ Stopwatch.
2. بنسمح لباقي الـ Pipeline إنها تنفذ.
3. بنوقف الـ Stopwatch بعد رجوع التنفيذ.
4. بنضيف الوقت في Response Header.

الوقت هنا بيشمل تنفيذ الـ Middleware اللي بعدنا والـ Endpoint اللي اتنفذ.

### مثال: منع IP معين

```cs
app.Use(async (context, next) =>
{
    var ip = context.Connection.RemoteIpAddress?.ToString();

    var blockedIps = new[]
    {
        "192.168.1.100",
        "10.0.0.5"
    };

    if (blockedIps.Contains(ip))
    {
        context.Response.StatusCode =
            StatusCodes.Status403Forbidden;

        await context.Response.WriteAsync("Forbidden");
        return;
    }

    await next(context);
});
```

لو عنوان الـ IP موجود في القائمة، بنرجع `403 Forbidden` وبنوقف التنفيذ باستخدام `return`.

لو مش موجود، الطلب بيكمل للـ Middleware اللي بعدها.

المثال للتوضيح؛ في التطبيقات اللي شغالة وراء Proxy لازم إعدادات الـ Forwarded Headers تكون مضبوطة قبل الاعتماد على عنوان الـ IP الظاهر.

### مثال: Correlation ID

الـ Correlation ID بيساعدنا نربط الـ Logs والأحداث اللي حصلت أثناء معالجة نفس الـ Request.

```csharp
app.Use(async (context, next) =>
{
    var correlationId =
        context.Request.Headers["X-Correlation-Id"]
            .FirstOrDefault()
        ?? Guid.NewGuid().ToString();

    context.Items["CorrelationId"] = correlationId;

    context.Response.Headers.Append(
        "X-Correlation-Id",
        correlationId);

    await next(context);
});
```

الـ Middleware دي بتعمل الآتي:

- بتحاول تقرأ الـ Correlation ID من الـ Request.
- لو مش موجود، بتنشئ واحد جديد.
- بتخزنه في `HttpContext.Items`.
- بتضيفه للـ Response Headers.
- بتكمل تنفيذ باقي الـ Pipeline.

وبكده تقدر تستخدم نفس المعرف في الـ Logging علشان تربط الأحداث الخاصة بالطلب ببعض.

---

## 4.2 Class-Based Middleware

لما الـ Middleware تكبر أو نحتاج نستخدمها أكتر من مرة، الأفضل نفصلها في Class مستقلة.

ده بيخلي الكود أوضح وأسهل في الصيانة والاختبار.

### مثال

```csharp
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(
        RequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(
        HttpContext context,
        ICurrentUserService currentUser)
    {
        _logger.LogInformation(
            "{Method} {Path} - User: {User}",
            context.Request.Method,
            context.Request.Path,
            currentUser.UserId ?? "anonymous");

        var stopwatch = Stopwatch.StartNew();

        await _next(context);

        stopwatch.Stop();

        _logger.LogInformation(
            "{Method} {Path} -> {StatusCode} in {Ms}ms",
            context.Request.Method,
            context.Request.Path,
            context.Response.StatusCode,
            stopwatch.ElapsedMilliseconds);
    }
}
```

### نفهم أجزاء الكود

**`RequestDelegate _next`**

ده بيمثل الـ Middleware اللي بعدها في الـ Pipeline.

**الـ Constructor**

بيستقبل الـ `next` والـ Logger عن طريق Dependency Injection.

**`InvokeAsync()`**

دي الـ Method اللي الـ Framework بتستخدمها لتنفيذ الـ Middleware على الـ Request.

**`HttpContext`**

بيحتوي على معلومات الطلب الحالي والـ Response المرتبط بيه.

**`await _next(context)`**

السطر ده بيسمح لباقي الـ Pipeline إنها تنفذ، وبعد ما ترجع نقدر نسجل الـ Status Code ووقت التنفيذ.

### تسجيل الـ Middleware

بعد ما نكتب الـ Class، بنسجلها بالشكل ده:

```
app.UseMiddleware<RequestLoggingMiddleware>();
```

وممكن نعمل Extension Method علشان التسجيل يبقى أوضح.

```csharp
public static class RequestLoggingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestLogging(
        this IApplicationBuilder app)
    {
        return app.UseMiddleware<RequestLoggingMiddleware>();
    }
}
```

وبدل ما نكتب:

```
app.UseMiddleware<RequestLoggingMiddleware>();
```

نقدر نكتب:

```
app.UseRequestLogging();
```

وده بيخلي `Program.cs` أنضف، وبيوضح وظيفة الـ Middleware من اسم الـ Method.

### Dependency Injection والـ Service Lifetimes

في الـ Conventional Middleware، الـ Instance بتكون طويلة العمر مقارنة بالـ Request الواحد.

عشان كده لازم ناخد بالنا من الـ Scoped Services.

لو عندنا Service عمرها `Scoped`، زي Service بتتعامل مع بيانات خاصة بالـ Request الحالي، فالأفضل في النمط ده نمررها كـ Parameter للـ `InvokeAsync()`.

```
public async Task InvokeAsync(
    HttpContext context,
    ICurrentUserService currentUser)
{
    // Use the service for this request.

    await _next(context);
}
```

كده الـ Service بتتجاب في نطاق الـ Request المناسب، بدل ما نخزنها في Middleware Instance طويلة العمر.

وفيه كمان أسلوب اسمه `IMiddleware`، وده بيسمح باستخدام Dependency Injection في إنشاء الـ Middleware، وبيكون مناسب في حالات محتاجة تحكم أكبر في الـ Activation والـ Lifetimes.

---

# 5. Static Files

## يعني إيه Static Files؟

الـ Static Files هي ملفات السيرفر بيقدمها للـ Client زي ما هي، من غير ما يحتاج ينفذ Controller أو Business Logic علشان يولد محتواها.

أمثلة:

- CSS.
    
- JavaScript.
    
- الصور.
    
- الخطوط.
    
- ملفات PDF العامة.
    
- الأيقونات.
    

بدل ما كل Request لملف CSS يروح لـ Controller، ممكن السيرفر يقدمه مباشرة من مكانه على القرص.

## 5.1 مجلد wwwroot

في ASP.NET Core، المجلد الافتراضي للملفات العامة هو `wwwroot`.

شكل المشروع ممكن يكون كده:

```
MyApp/
│
├── wwwroot/
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   └── app.js
│   ├── images/
│   │   └── logo.png
│   └── favicon.ico
│
├── Controllers/
├── Models/
├── appsettings.json
└── Program.cs
```

الـ URLs المقابلة للملفات بتكون:

|مكان الملف|الـ URL|
|---|---|
|`wwwroot/css/site.css`|`/css/site.css`|
|`wwwroot/js/app.js`|`/js/app.js`|
|`wwwroot/images/logo.png`|`/images/logo.png`|
|`wwwroot/favicon.ico`|`/favicon.ico`|

خلي بالك إن اسم `wwwroot` نفسه مش بيظهر في الـ URL.

كمان وجود ملف في المشروع مش معناه إنه بقى Public. الملفات اللي خارج الـ Web Root مش بتتقدم تلقائيًا عن طريق الإعداد الافتراضي للـ Static Files.

## 5.2 استخدام UseStaticFiles()

الطريقة التقليدية لتقديم الـ Static Files هي:

```csharp
var app = builder.Build();

app.UseStaticFiles();

app.UseRouting();

app.MapControllers();

app.Run();
```

لما ييجي Request بالشكل ده:

```
GET /css/site.css
```

الـ Middleware بتدور على الملف المقابل داخل `wwwroot`.

لو الملف موجود واتقدم بنجاح، الطلب بيتعامل معاه مباشرة ومش بيكمل لباقي الـ Pipeline.

أما لو مفيش ملف مطابق، فالطلب ممكن يكمل للـ Middleware اللي بعدها.

## 5.3 إيه اللي UseStaticFiles() بتعمله تلقائيًا؟

### Content-Type

الـ Response بيكون فيه `Content-Type` مناسب لنوع الملف، زي:

|امتداد الملف|Content-Type|
|---|---|
|`.css`|`text/css`|
|`.js`|`application/javascript`|
|`.png`|`image/png`|
|`.html`|`text/html`|
|`.pdf`|`application/pdf`|

ده بيساعد المتصفح يعرف يتعامل مع المحتوى إزاي.

### Caching

فيه Headers بتساعد المتصفح يعرف إذا كان الملف اللي عنده في الـCache لسه صالح ولا اتغير.

أهم مثالين:

- عندك `ETag`: قيمة بتستخدم كـ Validator للملف.
- و `Last-Modified`: بتوضح آخر وقت تعديل للملف.
    

### Conditional Requests

المتصفح ممكن يبعت Header زي:

```
If-None-Match: "abc123"
```

أو:

```
If-Modified-Since: Sat, 18 Apr 2026 10:00:00 GMT
```

لو الملف لسه مطابق للنسخة الموجودة في الـ Cache، السيرفر ممكن يرجع:

```
304 Not Modified
```

المعنى إن المتصفح يقدر يستخدم النسخة اللي عنده بدل ما يحمل الملف كامل مرة تانية.

### Range Requests

أحيانًا الـ Client بيحتاج جزء من الملف بس، مش الملف كله.

مثلًا:

```
Range: bytes=0-1023
```

لو السيرفر قدر ينفذ الطلب الجزئي بنجاح، ممكن يرجع:

```
206 Partial Content
```

وده مفيد في بعض حالات تحميل الملفات الكبيرة والوسائط.

### HEAD Request

الـ `HEAD` بيطلب الـ Headers من غير ما يطلب الـ Response Body.

ده بيسمح للـ Client يعرف معلومات عن الملف من غير ما ينزل محتواه كامل.

## 5.4 نقطة مهمة جدًا في الأمان

بص على الترتيب ده:

```
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();
```

لو فيه ملف Public مطابق للطلب، ممكن `UseStaticFiles()` تقدمه قبل ما الطلب يوصل للـ Authentication والـ Authorization.

يعني لو حطيت ملف حساس في `wwwroot`، مش هتحميه لمجرد إنك عامل `[Authorize]` على Controller تاني.

**أي ملف بتحطه في مسار Public لازم تعتبره قابلًا للوصول العام من خلال الـ URL المناسب.**

---

# 6. MapStaticAssets في .NET 9+

في .NET 9 والإصدارات الأحدث، فيه طريقة اسمها `MapStaticAssets()` ==لتسجيل الـ Static Assets عن طريق Endpoint Routing.==

```
app.MapStaticAssets();
```

دي بتوفر تحسينات للملفات المعروفة أثناء الـ Build، ومنها:

- يعمل Compression للملفات أثناء الـ Build.
- و ETags مبنية على محتوى الملفات.
- Asset Fingerprinting.

## 6.1 يعني إيه Build-Time Compression؟

بدل ما السيرفر يحتاج يضغط الملف في كل مرة أثناء الـ Request، ==ممكن يتم تجهيز نسخ مضغوطة أثناء عملية الـ Build أو النشر==.

من صيغ الضغط اللي بتتعامل معاها المنظومة: gzip وBrotli.

الهدف إن حجم البيانات اللي بتتنقل للـ Client يقل، وده ممكن يحسن سرعة تحميل الملفات.

## 6.2 يعني إيه Fingerprinting؟

الفكرة إن الـ URL بتاع الملف ممكن يحتوي على بصمة مرتبطة بمحتواه.

بدل:

```
site.css
```

ممكن يكون:

```
site.abc123.css
```

لو محتوى الملف اتغير، البصمة والـ URL ممكن يتغيروا.

ده بيساعد المتصفح يفرق بين النسخة القديمة والجديدة، وبيقلل مشاكل الـ Cache لما الملفات تتحدث.

## 6.3 ShortCircuit

المحاضرة بتعرض كمان:

```
app.MapStaticAssets().ShortCircuit();
```

ده بيخلي الـ Endpoints الخاصة بالـ Static Assets توقف تنفيذ الـ Middleware اللي بعدها عند مطابقة الطلب.

لازم نراعي إن أي Middleware محتاجينها تشتغل على الطلبات دي تكون متوافقة مع طريقة التسجيل دي.

## 6.4 الفرق بين MapStaticAssets و UseStaticFiles

| المقارنة                  | UseStaticFiles                  | MapStaticAssets                           |
| ------------------------- | ------------------------------- | ----------------------------------------- |
| طريقة العمل               | Middleware                      | Endpoint-based                            |
| الاستخدام المعتاد         | تقديم الملفات من File Providers | تسجيل الـ Assets المعروفة أثناء الـ Build |
| التحسينات أثناء الـ Build | مش دي الميزة الأساسية           | بتدعم Compression وFingerprinting         |
| Custom File Provider      | مناسب                           | مش بديل عام لكل مصادر الملفات             |
| ملفات بتظهر وقت التشغيل   | مناسب حسب إعدادات الـ Provider  | مش الاستخدام الأساسي                      |
| الإصدارات                 | متاحة في الإصدارات الأقدم       | متاحة بداية من .NET 9                     |

### أستخدم أنهي واحدة؟

استخدم `MapStaticAssets()` لما تكون بتتعامل مع الـ Static Assets العادية الخاصة بالتطبيق، وعايز تستفيد من التحسينات المتاحة في .NET 9+.

استخدم `UseStaticFiles()` لما تحتاج تقدم ملفات من مجلدات مخصصة أو تستخدم `PhysicalFileProvider` أو تتعامل مع ملفات مش معروفة أثناء الـ Build.

وممكن تستخدم الاتنين في نفس التطبيق لو عندك احتياج للنوعين.

---

# 7. تقديم ملفات من خارج wwwroot

أحيانًا الملفات اللي محتاجين نقدمها بتكون موجودة في مجلد مختلف عن `wwwroot`.

مثلًا:

```
MyApp/
├── wwwroot/
├── uploads/
├── reports/
└── Program.cs
```

في الحالة دي ممكن نستخدم `PhysicalFileProvider` مع `StaticFileOptions`.

## 7.1 PhysicalFileProvider

```
using Microsoft.Extensions.FileProviders;

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(
            builder.Environment.ContentRootPath,
            "uploads")),

    RequestPath = "/uploads"
});
```

الكود ده بيربط المجلد الفعلي `uploads` بالمسار `/uploads`.

مثلًا:

```
مكان الملف:
{ContentRoot}/uploads/report.pdf

الـ URL:
/uploads/report.pdf
```

هنا `ContentRootPath` هو مسار الـ Content Root بتاع التطبيق، أما `WebRootPath` فهو مسار الـ Web Root، واللي بيكون غالبًا `wwwroot`.

## 7.2 تقديم أكتر من مجلد

ممكن نسجل أكتر من Static File Provider:

```
app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(
            builder.Environment.ContentRootPath,
            "uploads")),

    RequestPath = "/uploads"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(
            builder.Environment.ContentRootPath,
            "reports")),

    RequestPath = "/reports"
});
```

كده كل مجلد ليه URL Prefix مختلف.

بس لازم ناخد بالنا إن المجلدات دي ممكن تبقى Public، فمينفعش نربط مسار عام بمجلد فيه أسرار أو ملفات Configuration أو Source Code.

## 7.3 UseDefaultFiles()

الـ `UseDefaultFiles()` بتتعامل مع الـ URL اللي بيمثل مجلد، <mark style="background:#0B6BCB">وبتحاول تحول المسار لملف افتراضي زي `index.html`.</mark>

مثلًا:

```
Request: /
Rewritten path: /index.html
```

لكن خد بالك: `UseDefaultFiles()` مش هي اللي بتقدم الملف؛ ==هي بس بتعدل المسار==. علشان الملف يتقدم فعلًا، لازم يكون فيه Static File Middleware بعدها.

الترتيب الصحيح:

```
app.UseDefaultFiles();
app.UseStaticFiles();
```

لو عندك `wwwroot/index.html`، فالطلب على `/` ممكن يوصل للملف ده.

## 7.4 UseDirectoryBrowser()

دي بتسمح بعرض قائمة بالملفات الموجودة في مجلد معين.

مثال:

```
builder.Services.AddDirectoryBrowser();

app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(
            builder.Environment.WebRootPath,
            "images")),

    RequestPath = "/images"
});
```

لما Directory Browsing تكون مفعلة ومضبوطة، الطلب على `/images` ممكن يعرض قائمة بالملفات الموجودة في المجلد.

لكن الميزة دي مش مفعلة افتراضيًا، ومش الأفضل تفتحها من غير داعٍ؛ لأنها ممكن تكشف أسماء الملفات ومحتويات المجلدات.

## 7.5 UseFileServer()

دي بتجمع كذا وظيفة في إعداد واحد:

- Static File Serving.
- Default File Handling.
- Directory Browsing لو فعلتها.

مثال:

```
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(
            builder.Environment.ContentRootPath,
            "uploads")),

    RequestPath = "/uploads",

    EnableDirectoryBrowsing = true
});
```

استخدمها لما تكون محتاج الوظائف دي مع بعض، وخلي تفعيل Directory Browsing قرار مقصود.

## 7.6 Custom MIME Types

لو عندك امتداد ملف مش بيتحدد له الـ Content-Type المناسب، تقدر تستخدم `FileExtensionContentTypeProvider` وتضيف Mapping للامتداد ده.

ده بيسمح للتطبيق يربط امتداد معين بنوع المحتوى الصحيح بدل الاعتماد على الـ Mapping الافتراضي بس.

## 7.7 إزاي نحمي الملفات الخاصة؟

لو الملف محتاج Authentication أو Authorization، ما تحطوش في مجلد بيتقدم بشكل عام.

خزنه في مجلد خاص، وقدم الوصول ليه عن طريق Controller Action بتتحقق من صلاحيات المستخدم.

مثال توضيحي:

```csharp
[Authorize]
[HttpGet("files/{name}")]
public IActionResult Download(string name)
{
    var path = Path.Combine(
        _env.ContentRootPath,
        "secure-files",
        name);

    return PhysicalFile(
        path,
        "application/octet-stream",
        name);
}
```

المثال بيوضح الفكرة العامة، لكن في التطبيق الحقيقي لازم تتحقق من اسم الملف، وتمنع Path Traversal، وتتأكد إن المستخدم مسموح له بالوصول للملف المطلوب.

### ملخص Static Files

|المطلوب|الحل|
|---|---|
|تقديم ملفات من wwwroot|`UseStaticFiles()` أو `MapStaticAssets()` حسب الحالة|
|جعل `/` يفتح index.html|`UseDefaultFiles()` قبل `UseStaticFiles()`|
|تقديم ملفات من مجلد مخصص|`PhysicalFileProvider`|
|عرض قائمة الملفات|`UseDirectoryBrowser()`|
|جمع وظائف الملفات الافتراضية والثابتة|`UseFileServer()`|
|حماية الملفات الخاصة|Controller مع Authorization|
|تعديل MIME Types|`FileExtensionContentTypeProvider`|
|ضبط Headers للـ Caching|`StaticFileOptions.OnPrepareResponse`|

---

# 8. Routing

## يعني إيه Routing؟

الـ Routing هو الجزء المسؤول عن تحديد الـ Endpoint اللي المفروض يستقبل الـ HTTP Request.

الـ Endpoint ممكن يكون:

- Controller Action.
- Razor Page.
- Minimal API Handler.
    
- نوع تاني من الـ Endpoints اللي بيدعمها ASP.NET Core.
    

الفكرة إن التطبيق بيستقبل Request، والـ Routing بيشوف المسار والـ HTTP Method وباقي المعلومات المتعلقة بالطلب، وبعدها بيحدد الـ Endpoint المناسب حسب الـ Routes المسجلة.

## 8.1 الفرق بين UseRouting و MapControllers

الاتنين مش بيعملوا نفس الحاجة.

**UseRouting()**

بتعمل Matching للـ Request علشان تحدد الـ Endpoint المناسب.

**MapControllers()**

بتسجل الـ Controller Endpoints علشان الـ Routing يقدر يلاقيها ويوصل لها.

الشكل العام:

```
HTTP Request
     |
     v
UseRouting()
     |
     v
CORS / Authentication / Authorization
     |
     v
Matched Endpoint
     |
     v
Controller Action
```

فهم النقطة دي مهم لأن فيه Middleware زي Authorization بتحتاج تعرف الـ Endpoint اللي الطلب رايح له علشان تطبق قواعد الوصول المناسبة.

---

# 9. Conventional Routing

## يعني إيه Conventional Routing؟

ده أسلوب بنحدد فيه الـ Route Patterns بشكل مركزي، غالبًا في `Program.cs`.

الـ Framework بتستخدم الـ Pattern علشان تحدد الـ Controller والـ Action والـ Route Values اللي هتستخدمها مع الطلب.

الأسلوب ده شائع في تطبيقات MVC اللي بتستخدم Controllers وViews، خصوصًا لما تكون الـ URLs ماشية على شكل متكرر.

## 9.1 تعريف Route

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

خلينا نفهم الـ Pattern:

| الجزء               | معناه                            |
| ------------------- | -------------------------------- |
| `{controller=Home}` | الـ Controller الافتراضي هو Home |
| `{action=Index}`    | الـ Action الافتراضي هو Index    |
| `{id?}`             | الـ ID اختياري                   |

أمثلة:

|URL|الوجهة المقصودة|
|---|---|
|`/`|`HomeController.Index()`|
|`/Products`|`ProductsController.Index()`|
|`/Products/Edit`|`ProductsController.Edit()`|
|`/Products/Edit/5`|`ProductsController.Edit(id: 5)`|

طبعًا ده بافتراض إن الـ Controllers والـ Actions دي موجودة.

## 9.2 تسجيل أكتر من Conventional Route

ممكن نسجل أكتر من Route Pattern:

```
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

الأول مناسب للـ Areas، والتاني هو الـ Default Route.

الترتيب ممكن يفرق لما يكون فيه أكتر من Route ينفع يطابق نفس الـ Request.

## 9.3 MapDefaultControllerRoute()

لو محتاج الـ Default Conventional Route المعتاد، تقدر تستخدم:

```
app.MapDefaultControllerRoute();
```

وده اختصار لتسجيل الـ Pattern الافتراضي:

```
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

## 9.4 مثال Controller

```
public class ProductsController : Controller
{
    public IActionResult Index() => View();

    public IActionResult Details(int id) => View();

    public IActionResult Edit(int id) => View();
}
```

مع الـ Default Route، تقدر توصل للـ Actions دي عن طريق:

```
/Products
/Products/Details/5
/Products/Edit/5
```

مش محتاج تكتب Route Attribute على كل Action علشان الـ Pattern التقليدي يشتغل.

---

# 10. Attribute Routing

## يعني إيه Attribute Routing؟

بدل ما نحدد كل الـ Routes في مكان مركزي، بنقدر نحدد الـ Route مباشرة على الـ Controller أو الـ Action باستخدام Attributes.

الأسلوب ده منتشر جدًا في الـ Web APIs، لأنه بيدينا تحكم مباشر وواضح في شكل الـ URLs.

## 10.1 Route على مستوى الـ Controller والـ Action

```
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok();
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        return Ok(id);
    }

    [HttpPost]
    public IActionResult Create(Product product)
    {
        return CreatedAtAction(
            nameof(GetById),
            new { id = product.Id },
            product);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, Product product)
    {
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        return NoContent();
    }
}
```

المثال توضيحي، وبافتراض إن الـ Model والبيانات المطلوبة موجودة.

عندنا Route على مستوى الـ Controller:

```
[Route("api/[controller]")]
```

وبما إن اسم الـ Class هو `ProductsController`، فالـ `[controller]` بتتحول إلى `products`.

يعني الـ Prefix الأساسي هو:

```
/api/products
```

وبعدها الـ Route الخاص بكل Action بيتضاف عليه.

|HTTP Method|URL|الوظيفة|
|---|---|---|
|`GET`|`/api/products`|جلب المنتجات|
|`GET`|`/api/products/5`|جلب منتج محدد|
|`POST`|`/api/products`|إنشاء منتج|
|`PUT`|`/api/products/5`|تعديل منتج|
|`DELETE`|`/api/products/5`|حذف منتج|

## 10.2 HTTP Method Attributes

أهم الـ Attributes المستخدمة:

- `[HttpGet]`
- `[HttpPost]`
- `[HttpPut]`
- `[HttpDelete]`

كل واحدة بتحدد الـ HTTP Method اللي الـ Action بتتعامل معاه، وممكن كمان تحدد Route Template.

مثلًا:

```
[HttpGet("{id:int}")]
```

يعني إن الـ Action دي بتتعامل مع GET Request فيه Route Parameter اسمه `id`، والـ Parameter لازم يطابق شرط `int`.

## 10.3 Route Tokens

الـ Routing بيدعم Tokens بتتحول لقيم معينة:

|Token|معناها|
|---|---|
|`[controller]`|اسم الـ Controller من غير كلمة Controller|
|`[action]`|اسم الـ Action|
|`[area]`|اسم الـ Area|

مثال:

```
[Route("api/[controller]/[action]")]
```

لو الـ Controller اسمه `ProductsController` والـ Action اسمها `GetAll`، فالـ URL الناتج ممكن يكون:

```
/api/products/getall
```

استخدام `[controller]` بيساعد إن الـ Route يفضل مرتبط باسم الـ Controller. لكن لو عندك Public API ولازم الـ URL يفضل ثابت حتى لو غيرت اسم الـ Class، ممكن تحدد اسم المسار صراحةً.

## 10.4 أكتر من Route لنفس الـ Action

ممكن الـ Action يكون ليها أكتر من Route:

```
[HttpGet("all")]
[HttpGet("")]
public IActionResult GetAll()
{
    return Ok();
}
```

ومع Prefix `/api/products`، الاتنين هيشتغلوا:

```
GET /api/products
GET /api/products/all
```

## 10.5 Absolute Routes

لو كتبت الـ Route Template بادئ بـ `/` أو `~/`، تقدر تتجاوز الـ Prefix الموجود على الـ Controller.

```
[HttpGet("/health")]
public IActionResult Health()
{
    return Ok("healthy");
}
```

هنا الـ URL هو:

```
GET /health
```

مش:

```
GET /api/products/health
```

## 10.6 هل ينفع أخلط Conventional Routing وAttribute Routing؟

بنصح إنك تختار أسلوب واضح لكل Controller، ومتخلطش الأسلوبين على نفس الـ Controller من غير داعٍ.

الـ Controllers اللي عليها Attribute Routes مش بتتعامل مع الـ Conventional Controller Route بنفس طريقة الـ Controllers اللي معتمدة على الـ Conventional Routing.

في الـ Web APIs، الـ Attribute Routing غالبًا أوضح؛ لأنك بتشوف الـ URL جنب الـ Action اللي بتنفذها.

---

# 11. Route Templates والـ Parameters

الـ Route Template هو الشكل اللي بنحدده للـ URL. ممكن يحتوي على أجزاء ثابتة، أو Parameters، أو قيم افتراضية، أو Parameters اختيارية، أو Catch-all.

## 11.1 Literal Route

```
[HttpGet("api/products")]
```

ده بيطابق المسار:

```
/api/products
```

## 11.2 Route Parameter

```
[HttpGet("api/products/{id}")]
```

هنا `{id}` بتاخد قيمة من جزء في الـ URL.

أمثلة:

```
/api/products/5
/api/products/abc
```

من غير Constraint، الجزء ده ممكن يحتوي على قيمة نصية زي `5` أو `abc`. لو الـ Action بتستقبل `int`، فالـ Model Binding لازم يقدر يحول القيمة لنوع `int`.

## 11.3 Default Values

في الـ Pattern ده:

```
{controller=Home}/{action=Index}
```

لو جزء من الـ URL مش موجود، الـ Routing يقدر يستخدم القيمة الافتراضية.

|URL|Controller|Action|
|---|---|---|
|`/`|`Home`|`Index`|
|`/Products`|`Products`|`Index`|

## 11.4 Optional Parameters

علامة `?` معناها إن الـ Parameter ممكن تكون مش موجودة.

```
[HttpGet("api/products/{id?}")]
```

أمثلة:

```
/api/products
/api/products/5
```

في أول حالة الـ `id` مش موجودة، وفي التانية قيمتها `5`.

## 11.5 الفرق بين Optional وDefault

عندنا شكلين:

```
{id?}
{id=0}
```

الأول معناه إن الـ Parameter اختيارية وممكن تكون غائبة.

التاني معناه إن فيه قيمة افتراضية هي `0` لما الـ Parameter ما تتبعتش.

يعني الاتنين مش نفس المعنى.

## 11.6 Catch-All Parameters

الـ Catch-all بتسمح للـ Parameter إنها تمسك باقي الـ Path، حتى لو فيه أكتر من جزء مفصول بـ `/`.

```
[HttpGet("files/{**path}")]
```

لو الطلب هو:

```
/files/docs/2026/report.pdf
```

فالقيمة اللي ممكن تتجمع في `path` هي:

```
docs/2026/report.pdf
```

ده مفيد لما يكون باقي المسار غير معروف مسبقًا.

## 11.7 أكتر من Parameter في Route واحد

```
[HttpGet("api/{version}/products/{id:int}")]
public IActionResult Get(string version, int id)
{
    return Ok();
}
```

لو الطلب:

```
GET /api/v2/products/42
```

القيم هتكون:

```
version = "v2"
id = 42
```

الـ `version` اتاخدت من أول Parameter، والـ `id` اتاخدت من الجزء الأخير مع تطبيق شرط `int`.

## 11.8 الوصول للـ Route Values

في العادة، الـ Model Binding بتربط الـ Parameters بأسماء القيم الموجودة في الـ Route.

```
[HttpGet("api/products/{id:int}")]
public IActionResult Get(int id)
{
    return Ok(id);
}
```

وممكن تحدد مصدر البيانات بشكل صريح:

```
public IActionResult Get(
    [FromRoute] int id,
    [FromQuery] string? filter)
{
    return Ok();
}
```

وممكن كمان تقرأ القيمة من `RouteData`:

```
var id = int.Parse(
    RouteData.Values["id"]!.ToString()!);
```

لكن الطريقة دي محتاجة تتعامل بحذر مع حالة إن القيمة مش موجودة أو غير صالحة. غالبًا الـ Model Binding أبسط وأنسب.

---

# 12. Route Constraints

## يعني إيه Route Constraint؟

الـ Constraint هو ==شرط بنضيفه للـ Route Parameter علشان نحدد القيم اللي ينفع الـ Route يطابقها==.

الشكل العام:

```
{parameter:constraint}
```

مثال:

```
[HttpGet("{id:int}")]
```

هنا الـ Route لازم يطابق قيمة مناسبة لـ `int`. قيمة زي `abc` مش هتطابق الـ Route ده.

الـ Constraints مفيدة جدًا لما يكون عندك أكتر من Route ممكن يتشابهوا، وعايز تفرق بينهم.

## 12.1 أشهر الـ Constraints

|Constraint|مثال|الاستخدام|
|---|---|---|
|`int`|`{id:int}`|قيمة متوافقة مع Integer|
|`long`|`{id:long}`|قيمة متوافقة مع Long|
|`guid`|`{id:guid}`|قيمة GUID|
|`bool`|`{flag:bool}`|قيمة Boolean|
|`datetime`|`{date:datetime}`|قيمة تاريخ ووقت|
|`decimal`|`{price:decimal}`|قيمة Decimal|
|`min(n)`|`{id:min(1)}`|القيمة أكبر من أو تساوي حدًا أدنى|
|`range(min,max)`|`{age:range(1,120)}`|القيمة داخل مدى معين|
|`minlength(n)`|`{slug:minlength(3)}`|أقل طول للنص|
|`maxlength(n)`|`{name:maxlength(50)}`|أقصى طول للنص|
|`length(n)`|`{zip:length(5)}`|طول محدد للنص|
|`alpha`|`{name:alpha}`|أحرف أبجدية|
|`regex(expr)`|`{value:regex(...)}`|مطابقة Regular Expression|

## 12.2 دمج أكتر من Constraint

ممكن تحط أكتر من شرط على نفس الـ Parameter:

```
[HttpGet("{id:int:min(1)}")]
```

ده معناه إن `id` لازم:

1. تكون قيمة متوافقة مع `int`.
    
2. تكون أكبر من أو تساوي `1`.
    

ومثال تاني:

```
[HttpGet("{slug:alpha:minlength(3)}")]
```

هنا القيمة لازم تحقق شرط الأحرف الأبجدية، وكمان يكون طولها 3 أحرف على الأقل.

## 12.3 استخدام Constraints للتمييز بين Routes

```
[HttpGet("{id:int}")]
public IActionResult GetById(int id)
{
    return Ok();
}

[HttpGet("{slug:alpha}")]
public IActionResult GetBySlug(string slug)
{
    return Ok();
}
```

في الحالة دي:

```
/products/42
```

يناسب الـ Route اللي فيه `int`.

أما:

```
/products/sale
```

فيناسب الـ Route اللي فيه `alpha`.

فالـ Constraints بتساعد الـ Routing يختار الـ Route المناسب حسب القيمة.

## 12.4 Custom Route Constraint

ممكن نعمل Constraint خاصة بينا عن طريق تنفيذ `IRouteConstraint`.

المثال ده بيعمل Constraint بتقبل الأرقام الزوجية فقط:

```
public class EvenNumberConstraint : IRouteConstraint
{
    public bool Match(
        HttpContext? httpContext,
        IRouter? route,
        string routeKey,
        RouteValueDictionary values,
        RouteDirection routeDirection)
    {
        return int.TryParse(
                   values[routeKey]?.ToString(),
                   out var number)
               && number % 2 == 0;
    }
}
```

بعد كده بنسجلها في الـ Route Options:

```
builder.Services.Configure<RouteOptions>(options =>
{
    options.ConstraintMap.Add(
        "even",
        typeof(EvenNumberConstraint));
});
```

وبنستخدمها في الـ Route:

```
[HttpGet("{id:even}")]
public IActionResult GetEven(int id)
{
    return Ok(id);
}
```

كده `/products/2` تطابق الـ Route، لكن `/products/3` مش هتطابقه.

## 12.5 أهم نقطة: Constraint مش Validation

دي من أهم النقاط في المحاضرة.

الـ Route Constraint وظيفتها تحدد هل الـ Route ينفع يطابق الطلب ولا لأ. مش وظيفتها الأساسية التحقق من صحة بيانات المستخدم حسب قواعد التطبيق.

مثلًا:

```
[HttpGet("{id:int:min(1)}")]
```

لو المستخدم طلب:

```
/products/0
```

القيمة `0` رقم صحيح، لكنها بتفشل شرط `min(1)`.

لو مفيش Route تانية تطابق الطلب، فالنتيجة غالبًا هتكون:

```
404 Not Found
```

ليه؟ لأن الـ Routing مش لاقي Endpoint مناسب للطلب.

أما الـ Validation، فدي بتتعامل مع البيانات بعد ما الطلب يوصل للـ Endpoint المناسب. ومع `[ApiController]`، أخطاء الـ Model Validation ممكن تؤدي تلقائيًا إلى:

```
400 Bad Request
```

استخدم Data Annotations أو FluentValidation لما تحتاج تتحقق من قواعد البيانات المدخلة، بدل ما تعتمد على الـ Route Constraints.

## 12.6 Regular Expressions داخل الـ Routes

الـ Route Templates والـ Regular Expressions بيستخدموا بعض الرموز الخاصة، زي الأقواس المعقوفة والـ Backslash.

مثلًا، الـ Regex:

```
^\d{3}$
```

ممكن يحتاج كتابة مختلفة داخل الـ Route Template:

```
^\\d{{3}}$
```

وده بسبب طريقة تفسير الرموز الخاصة في الـ Route Template مقارنة بالـ Regular Expression نفسها.

---

# 13. Route Parameters vs Query Parameters

الاتنين بيستخدموا لنقل بيانات من الـ Client للـ Action، لكن كل واحد ليه استخدام أنسب.

## 13.1 Route Parameters

الـ Route Parameters بتستخدم غالبًا علشان تحدد إحنا بنتعامل مع أنهي Resource.

أمثلة:

```
GET /api/products/42
GET /api/customers/42/orders
GET /api/customers/42/orders/7
DELETE /api/products/99
```

في الأمثلة دي، القيم جزء من هوية الـ Resource اللي بنتعامل معاه.

مثال:

```
[HttpGet(
    "api/customers/{customerId:int}/orders/{orderId:int}")]
public IActionResult GetOrder(
    int customerId,
    int orderId)
{
    return Ok();
}
```

هنا الـ `customerId` والـ `orderId` بيحددوا العميل والطلب المطلوب.

## 13.2 Query Parameters

الـ Query Parameters بتستخدم غالبًا لما نكون عايزين نتحكم في طريقة جلب البيانات، زي الفلترة أو البحث أو الترتيب أو الـ Pagination.

مثال:

```
GET /api/products?category=electronics
```

وممكن نزود أكتر من Parameter:

```
GET /api/products?category=electronics&minPrice=100&sort=price&page=2
```

مثال تاني:

```
GET /api/users?search=john&active=true&pageSize=20
```

الـ Parameters دي بتغير النتائج اللي راجعة، لكنها مش بالضرورة بتحدد Resource مختلفة.

### مثال Controller

```
[HttpGet]
public IActionResult GetAll(
    string? category = null,
    decimal? minPrice = null,
    decimal? maxPrice = null,
    string sort = "name",
    int page = 1,
    int pageSize = 20)
{
    return Ok();
}
```

هنا الـ Parameters ممكن تستخدم في:

- فلترة المنتجات حسب `category`.
    
- تحديد أقل وأعلى سعر.
    
- ترتيب النتائج باستخدام `sort`.
    
- تحديد الصفحة المطلوبة باستخدام `page`.
    
- تحديد عدد العناصر في الصفحة باستخدام `pageSize`.
    

القيم الافتراضية بتخلي الـ Parameters اختيارية لما يكون ده مناسبًا للتصميم.

## 13.3 FromRoute و FromQuery

لو عايز تحدد مصدر القيمة بشكل صريح:

```
public IActionResult Get(
    [FromRoute] int id,
    [FromQuery] string? filter)
{
    return Ok();
}
```

- `[FromRoute]` بتجيب القيمة من الـ Route.
    
- `[FromQuery]` بتجيب القيمة من الـ Query String.
    

ومع `[ApiController]`، فيه قواعد للـ Model Binding بتساعد الـ Framework تحدد مصدر البيانات. بشكل عام، الـ Simple Types ممكن تتربط من الـ Route أو Query حسب تعريف الـ Endpoint، والـ Complex DTOs غالبًا بتتربط من الـ Request Body.

## 13.4 أختار أنهي واحدة؟

خلينا نقول إن عندنا:

```
/api/products/42
```

ده بيحدد منتج معين.

لكن:

```
/api/products?sort=price
```

ده لسه بيتعامل مع مجموعة المنتجات، لكن بترتيب مختلف.

فكر فيها كده:

**استخدم Route Parameter لما القيمة بتحدد الـ Resource نفسها، واستخدم Query Parameter لما القيمة بتغير طريقة عرض أو استرجاع النتائج.**

الـ Route Parameters مناسبة كمان للعلاقات الهرمية، زي:

```
/api/customers/42/orders/7
```

أما الـ Query Parameters فمناسبة للفلترة والبحث والترتيب والـ Pagination، زي:

```
/api/products?category=electronics&sort=price&page=2
```

---

# 14. تصميم Routes للـ REST APIs

المحاضرة بتأكد على إن تصميم الـ URLs يكون واضح ومنظم، ويمثل الـ Resources بدل ما يكون مجرد أسماء Actions.

مثال:

```
GET    /api/products
GET    /api/products/42
POST   /api/products
PUT    /api/products/42
DELETE /api/products/42
```

هنا اسم الـ Resource هو `products`، والـ HTTP Method بتوضح العملية المطلوبة.

ولو عندنا علاقة بين Resources:

```
/api/customers/42/orders/7/items
```

المسار بيوضح العلاقة بين العميل والطلب والعناصر التابعة له.

ومن الأفضل كمان إنك تستخدم `nameof()` و`CreatedAtAction()` بدل ما تكتب اسم الـ Action كنص ثابت.

مثال:

```
return CreatedAtAction(
    nameof(GetById),
    new { id = product.Id },
    product);
```

هنا `nameof(GetById)` بتربط اسم الـ Action بالكود نفسه، و`CreatedAtAction()` بتساعدك ترجع Response يشير للـ Resource اللي اتعملت.

---

# 15. أخطاء مهمة لازم تاخد بالك منها

## الخطأ الأول: عكس Authentication وAuthorization

غلط:

```
app.UseAuthorization();
app.UseAuthentication();
```

الصح:

```
app.UseAuthentication();
app.UseAuthorization();
```

لأن الـ Authorization بتعتمد على هوية المستخدم اللي اتحددت عن طريق الـ Authentication.

## الخطأ التاني: تسجيل Exception Handler متأخر

الـ Exception Handler لازم يكون في مكان يسمح له بالتعامل مع الأخطاء اللي بتحصل في الـ Middleware اللي بعده.

## الخطأ التالت: تسجيل Middleware بعد Run()

الـ `Run()` بتنهي الـ Pipeline، فلو فيه Middleware بعدها مش هتتنفذ للطلبات اللي وصلت لها.

## الخطأ الرابع: الاعتقاد إن Authorize بتحمي ملفات wwwroot

لو الملف بيتقدم عن طريق Static File Middleware، ممكن يوصل للـ Client من غير ما يدخل على Controller عليه `[Authorize]`.

الملفات الخاصة لازم تتخزن في مكان مش Public، ويتم تقديمها عن طريق Endpoint بيتحقق من الصلاحيات.

## الخطأ الخامس: نسيان UseDefaultFiles()

لو عندك `index.html` وعايز `/` يفتح الملف ده، مجرد تسجيل `UseStaticFiles()` مش كفاية في الحالة التقليدية.

استخدم:

```
app.UseDefaultFiles();
app.UseStaticFiles();
```

## الخطأ السادس: تكرار الـ Route Prefix

بص على المثال:

```
[Route("api/products")]
public class ProductsController : ControllerBase
{
    [HttpGet("api/products/{id}")]
    public IActionResult Get(int id)
    {
        return Ok(id);
    }
}
```

الـ Action Route هنا Relative، فبيتضاف على الـ Prefix بتاع الـ Controller.

المسار الناتج ممكن يكون:

```
/api/products/api/products/{id}
```

الأفضل:

```
[HttpGet("{id}")]
```

وده ينتج:

```
/api/products/{id}
```

ولو عايز تتجاوز الـ Prefix تمامًا، استخدم Absolute Route بشكل مقصود.

## الخطأ السابع: استخدام Constraints بدل Validation

الـ Constraint بتحدد إذا كان الـ Route يطابق الطلب، مش إذا كانت البيانات صحيحة حسب قواعد التطبيق.

قيمة غير مطابقة ممكن تؤدي إلى `404` بدل `400`.

---
