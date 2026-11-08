---
title: "Routing in DotNet"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


# 1) الصورة الكبيرة: المقال ده عايز يقولك إيه أصلًا؟

المقال بيقول إن **Routing** في ASP.NET Core وظيفته الأساسية هي:

- يستقبل الـ HTTP request
    
- يبص على الـ URL والـ HTTP Method
    
- يقرر مين الـ endpoint المناسب
    
- وبعد كده يوجه التنفيذ له
    

يعني Routing هو "موظف الاستقبال" بتاع التطبيق. أي request داخل، لازم حد يطابقه مع جزء من الكود، والجزء ده اسمه **Endpoint**. كمان الـ Routing مش بس بيعمل matching، لا، ده كمان يقدر يساعدك **تولد URL** يوصل لنفس الـ endpoint بعدين. يعني عنده شغل في الاتجاهين:

- Incoming request → Endpoint
    
- Route values / endpoint info → Generated URL
    

---

# 2) يعني إيه Endpoint؟

المقال بيقول إن الـ endpoint هو **unit of executable request-handling code**.  
يعني "وحدة كود قابلة للتنفيذ" لما request معين يطابقها. مثال:

```csharp
app.MapGet("/", () => "Hello World!");
```

هنا عندك endpoint.  
ليه؟

لأن السطر ده عرّف:

- المسار `/`
    
- نوع الطلب `GET`
    
- والكود اللي يتنفذ لو حصل match وهو `() => "Hello World!"`
    

فـ endpoint مش هو الـ URL بس، ومش هو الـ method بس، ومش هو الكود بس.  
هو **التلاتة مع بعض ككيان واحد**:

- طريقة الوصول له
    
- شروط مطابقته
    
- والكود اللي ينفذه
    

والمقال عرّف الـ endpoint من أربع زوايا:

- **Executable**: عنده `RequestDelegate`
    
- **Extensible**: عليه metadata
    
- **Selectable**: ممكن يبقى له routing info
    
- **Enumerable**: تقدر تعدّي على كل الـ endpoints من خلال `EndpointDataSource`
    

### نفك الأربع كلمات:

## Executable

يعني قابل للتنفيذ.  
لما يحصل match، فيه delegate يتشغل.

## Extensible

يعني تقدر تلزق عليه بيانات زيادة.  
زي Authorization policy أو custom metadata.

## Selectable

يعني ممكن الـ routing system يختاره بناءً على path / method / constraints.

## Enumerable

يعني ممكن تستعرض كل الـ endpoints المسجلة في التطبيق.

---

# 3) أول مثال في المقال: ليه بسيط لكنه مهم؟

المقال بدأ بالمثال ده:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

اللي بيحصل هنا:

- التطبيق اشتغل
    
- اتسجل endpoint واحد
    
- لو جه request نوعه GET على `/`
    
    - الـ delegate يتنفذ
        
    - وترجع `"Hello World!"`
        
- لو request method مختلف أو path مختلف → مفيش match → 404
    

### النقطة المهمة

المثال الصغير ده بيعلمك إن الـ routing مش magic.  
هو ببساطة:

1. شوف request جاي على إيه
2. هل عندي endpoint ينطبق عليه؟
3. آه؟ نفّذه
4. لا؟ رجع Not Found

---

# 4) UseRouting و UseEndpoints: دول بيعملوا إيه بالضبط؟

المقال قال إن الـ routing بيشتغل من خلال زوج middleware:

- `UseRouting`
    
- `UseEndpoints`
    

وده من أهم أجزاء المقال.

## أولًا: UseRouting

ده middleware مسؤوليته:

- يبص على كل الـ endpoints المسجلة
- يطابق الـ request الحالي
- ==ويختار أفضل endpoint==
- ويحطه جوه `HttpContext`

يعني هو **مرحلة الاختيار**.

## ثانيًا: UseEndpoints

ده middleware مسؤوليته:

- ياخد الـ endpoint اللي اتحدد
- وينفذه

يعني هو **مرحلة التنفيذ**.

### باختصار شديد

- `UseRouting` = مين المناسب؟
    
- `UseEndpoints` = نفّذ المناسب
    

---

# 5) طيب ليه غالبًا مش بنكتبهم يدوي؟

ال `WebApplicationBuilder` غالبًا بيظبط pipeline وفيه `UseRouting` و `UseEndpoints` من غير ما تكتبهم بنفسك. لكن لو أنت عايز تتحكم في الترتيب بنفسك، تقدر تستدعيهم صراحة.

وده مهم لأن **الترتيب** في middleware pipeline مهم جدًا.

مثال:

```csharp
app.Use(async (context, next) =>
{
    // ...
    await next(context);
});

app.UseRouting();

app.MapGet("/", () => "Hello World!");
```

المعنى:

- الـ custom middleware ده هيشتغل الأول
- بعده يحصل route matching
- بعد كده endpoint يتنفذ
    

### الفكرة العقلية هنا

في ASP.NET Core، الطلب بيعدي في "خط سير".  
الـ routing مجرد محطة في الخط ده.

---

# 6) إيه الفرق بين "قبل UseRouting" و"بين UseRouting و UseEndpoints" و"بعد UseEndpoints"؟

المقال جاب مثال رائع باستخدام `context.GetEndpoint()` يوريك الـ endpoint امتى بيبقى موجود. الفكرة كانت كده:

- قبل `UseRouting`: `GetEndpoint()` بيرجع `null`
    
- بعد `UseRouting` لو فيه match: بقى عندك endpoint
    
- بعد `UseEndpoints`: غالبًا لو endpoint اتنفذ خلاص، ==اللي بعده مش هيشتغل إلا لو مفيش match==
    

ودي من أهم الحاجات اللي لازم تفهمها.

## قبل UseRouting

لسه محدش اختار endpoint  
فـ `context.GetEndpoint()` = `null`

## بين UseRouting و UseEndpoints

تم الاختيار، ولسه التنفيذ ما حصلش  
فـ تقدر:

- تعرف endpoint المختار
- تقرأ الـ metadata
- تطبق authorization
- تطبق CORS
- تعمل audit
- تمنع التنفيذ لو لازم

## بعد UseEndpoints

لو فيه match، فالـ endpoint اتنفذ، وغالبًا الـ request خلص  
فالميدل وير اللي بعده ==بيشتغل فقط لما مفيش endpoint اتنفذ==

### معنى الجملة:

> The UseEndpoints middleware is terminal when a match is found.

يعني لما يلاقي endpoint مناسب، ==هو يعتبر نهاية السكة==.  
ينفذ ويرجع، مش يكمّل لباقي pipeline.

---

# 7) يعني إيه Metadata؟ وليه المقال مركز عليها؟

المقال قال إن الـ endpoints ممكن يتلصق عليها بيانات إضافية اسمها ==**endpoint metadata**==، وإن middleware الواعي بالـ routing يقدر يقرأها ويتصرف بناءً عليها. والمثال اللي اتقال كان authorization على health check endpoint.

مثال:

```csharp
app.MapHealthChecks("/healthz").RequireAuthorization();
```

هنا `RequireAuthorization()` أضاف metadata على الـ endpoint.

### معنى metadata عمليًا

تخيل كل endpoint معاه "ورقة تعليمات":

- هل محتاج authorization؟
- هل عليه CORS policy؟
- هل endpoint حساس؟
- هل يتعمله audit؟
- هل له host معين؟
- هل له tags؟

فالـ routing مش بيختار endpoint فقط، بل كمان بيخلي باقي الـ middleware يعرف **قواعد التعامل معاه**.

---

# 8) المقال بيقول Middleware ممكن "يؤثر" على Routing أو "يتفاعل" معاه، يعني إيه؟

المقال شرح حاجتين مهمين جدًا:

## أ) Middleware قبل UseRouting

يقدر يغير بيانات الـ request نفسها قبل ما يحصل matching.

مثال:

- `UseHttpMethodOverride`
- `UseRewriter`
- `UsePathBase`
    

يعني بدل ما الـ routing يشتغل على الطلب الأصلي، يشتغل على نسخة معدلة.

## ب) Middleware بين UseRouting و UseEndpoints

يقرأ نتيجة الـ matching.

مثال المقال كان middleware بيشوف لو الـ endpoint عليه `RequiresAuditAttribute` يعمل logging.

### المعنى العقلي

فيه middleware:

- بيغيّر المدخلات قبل الاختيار  
    وفيه middleware:
- يقرأ نتيجة الاختيار قبل التنفيذ
    

وده سبب إن مكان middleware في pipeline مهم جدًا.

---

# 9) ليه المقال قارن بين Routing و Terminal Middleware؟

لأن أحيانًا حد يكتب middleware بالشكل ده:

```csharp
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        await context.Response.WriteAsync("Terminal Middleware.");
        return;
    }

    await next(context);
});
```

ده اسمه **terminal middleware** لأنه:

- عمل matching بنفسه
- نفذ response
- ووقف السلسلة، ما ناداش `next()`
    

المقال بيقول:  
أيوه، ده ينفع  
لكن الـ routing غالبًا أفضل، لأن:

- أسهل
- أوضح
- بيتكامل مع Authorization و CORS
- بيدعم metadata
- أقل في الوجع لو المشروع كبر
    

### الفرق الفكري

## Terminal middleware

أنت بنفسك بتعمل matching + execution

## Routing

الإطار نفسه بيعمل matching لك، وأنت بتركز على endpoint logic

---

# 10) URL Matching: المطابقة بتحصل إزاي؟

المقال قال إن URL matching هو العملية اللي فيها الـ routing بيطابق request مع endpoint. وبيعتمد على:

- الـ URL path
- headers
- وممكن يتوسع لأشياء أخرى في request

بعد ما `UseRouting` يشتغل، بيحط:

- الـ endpoint داخل `HttpContext`
    
- والـ route values داخل `HttpRequest.RouteValues`
    

## يعني إيه RouteValues؟

هي القيم المستخرجة من الـ URL.

مثال:

```csharp
app.MapGet("/hello/{name:alpha}", (string name) => $"Hello {name}!");
```

لو request جه على:  
`/hello/Mahmoud`

يبقى:

- `name = "Mahmoud"`

والمقال قال القيمة دي بتتخزن في `HttpRequest.RouteValues`.

---

# 11) مراحل الـ Matching جوه الـ Routing System

المقال قال إن المطابقة مش بتحصل مرة واحدة بشكل ساذج، لكن على مراحل:

1. يطابق path على كل route templates ويجمع الـ candidates
2. يشيل اللي فشلوا في الـ constraints
3. يشيل اللي فشلوا في `MatcherPolicy`
4. `EndpointSelector` يختار أفضل واحد في الآخر

### معنى الكلام ده

مش أول endpoint يطابق وخلاص.  
لا، النظام ممكن يلاقي أكتر من candidate، وبعد كده يبدأ يصفّيهم.

---

# 12) يعني إيه Route Template Precedence؟

دي من أهم الحتت اللي ناس كتير بتعديها وهي مش فاهماها.

المقال قال إن فيه نظام يدي لكل route template "درجة أولوية" حسب مدى خصوصيته.  
مثال:

- `/Products/List`
- `/Products/{id}`
    

الاتنين ممكن يطابقوا `/Products/List`  
لكن ==الأول أكتر تحديدًا، فله precedence أعلى.==

## القاعدة العامة:

- template اللي فيه segments أكتر → غالبًا أخص
- literal segment أخص من parameter
- parameter constrained أخص من parameter غير constrained
- catch-all هو الأقل specificity
    

### مثال يثبت الفكرة

`/hello`  
أخص من  
`/{message}`

لأن `/hello` literal واضح، لكن `/{message}` عام جدًا.

---

# 13) طيب لو عندي route templates بنفس الدرجة؟

المقال جاب مثال:

- `/{message:alpha}`
    
- `/{message:int}`
    

الاتنين عندهم نفس الـ precedence تقريبًا، لكن عمليًا مفيش ambiguity لأن:

- واحد يطابق حروف فقط
- واحد يطابق أرقام فقط
    

فمش لازم يحصل error عند startup. الخطأ يحصل فقط لو في طلب فعلي ==يسبب ambiguity حقيقية بين endpoints لهم نفس الأولوية==

---

# 14) المقال قال "Endpoint routing doesn't have the concept of routes"

دي جملة تقيلة، معناها إيه؟

المقصود إن النظام الجديد بيفكر بمنطق **endpoints** مش "route objects" بالمعنى القديم.  
يعني الوحدة الأساسية لم تعد route تقليدية، بل endpoint يحمل:

- pattern
- metadata
- delegate
- policies

فبدل ما تفكر "أنا عندي route"  
فكر:  
"أنا عندي endpoint يمكن اختياره وتنفيذه"

---

# 15) Route Templates: نفكها كلمة كلمة

المقال قال:  
الـ tokens اللي بين `{}` هي route parameters.  
ودي بتتربط بقيم من الـ URL لو حصل match.

مثال:

```csharp
{controller}/{action}/{id?}
```

معناه:

- أول segment = controller
    
- الثاني = action
    
- الثالث = id وهو optional
    

لو URL:  
`/Products/Details/123`

يبقى:

- controller = Products
- action = Details
- id = 123
    

---

# 16) ليه `{controller=Home}{action=Index}` غلط؟

المقال قال ده invalid route  
لأن مفيش literal فاصل بين parameter وparameter. لازم يكون في بينهم نص ثابت أو slash.

يعني:

```csharp
{controller}/{action}
```

صح

لكن:

```csharp
{controller}{action}
```

غلط  
لأن النظام مش هيعرف يفصل القيم إزاي.

---

# 17) Literal text يعني إيه؟

literal text = نص ثابت لازم يطابق حرفيًا.

مثال:

```csharp
/hello/{name}
```

- `hello` ده literal
- `{name}` ده parameter
    

فـ `/hello/mahmoud` ينفع  
لكن `/hi/mahmoud` لا

والمقال قال إن المطابقة في النصوص case-insensitive.

---

# 18) Default Value vs Optional Parameter

المقال فرق بين:

- `{controller=Home}`
- `{id?}`
    

وده مهم جدًا.

## Default value

```csharp
{controller=Home}
```

يعني لو القيمة مش موجودة في الـ URL، النظام يفترض `Home`.

القيمة هنا **دائمًا لها value** حتى لو المستخدم ما كتبهاش.

## Optional parameter

```csharp
{id?}
```

يعني ممكن القيمة تكون موجودة أو لا.  
ولو مش موجودة، فقد لا يكون فيه value أصلًا.

### الفرق العقلي

- default = النظام يملأ القيمة
- optional = النظام يتسامح مع غيابها

---

# 19) Constraints: يعني إيه بالراحة؟

المقال قال إن route constraints بتشتغل **بعد** ما يبقى فيه match مبدئي، وتفحص القيمة المرتبطة بالـ parameter وتشوف هل مقبولة أم لا.

مثال:

```csharp
{name:alpha}
```

يعني:

- فيه parameter اسمه `name`
- لازم قيمته تبقى حروف فقط

فـ:

- `/hello/Mahmoud` ينفع
    
- `/hello/123` لا
    

---

# 20) أهم تحذير في constraints

المقال قال:  
==**ما تستخدمش constraints كوسيلة input validation**.==

ليه؟

لأن لو constraint فشل:

- غالبًا هترجع 404

لكن لو المدخلات نفسها غلط منطقيًا، الصح غالبًا:

- 400 Bad Request مع رسالة واضحة

### يعني إيه؟

لو عندك route:

```csharp
{id:int}
```

وده هدفه يفرق بين routes المتشابهة، تمام.

لكن لو أنت عايز تقول للمستخدم:

- العمر لازم يكون بين 18 و 60
- أو الاسم لازم يتبع business rule

فده validation business logic، مش routing concern.

---

# 21) أشهر Constraints في المقال

المقال عدّد constraints كتير، وأهمهم:

| constraint          | Example                                     | Example Matches                        | Notes                                                                                                                          |
| ------------------- | ------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `int`               | `{id:int}`                                  | `123456789`, `-123456789`              | Matches any integer                                                                                                            |
| `bool`              | `{active:bool}`                             | `true`, `FALSE`                        | Matches `true` or `false`. Case-insensitive                                                                                    |
| `datetime`          | `{dob:datetime}`                            | `2016-12-31`, `2016-12-31 7:32pm`      | Matches a valid `DateTime` value in the invariant culture. See preceding warning                                               |
| `decimal`           | `{price:decimal}`                           | `49.99`, `-1,000.01`                   | Matches a valid `decimal` value in the invariant culture. See preceding warning                                                |
| `double`            | `{weight:double}`                           | `1.234`, `-1,001.01e8`                 | Matches a valid `double` value in the invariant culture. See preceding warning                                                 |
| `float`             | `{weight:float}`                            | `1.234`, `-1,001.01e8`                 | Matches a valid `float` value in the invariant culture. See preceding warning                                                  |
| `guid`              | `{id:guid}`                                 | `CD2C1638-1638-72D5-1638-DEADBEEF1638` | Matches a valid `Guid` value                                                                                                   |
| `long`              | `{ticks:long}`                              | `123456789`, `-123456789`              | Matches a valid `long` value                                                                                                   |
| `minlength(value)`  | `{username:minlength(4)}`                   | `Rick`                                 | String must be at least 4 characters                                                                                           |
| `maxlength(value)`  | `{filename:maxlength(8)}`                   | `MyFile`                               | String must be no more than 8 characters                                                                                       |
| `length(length)`    | `{filename:length(12)}`                     | `somefile.txt`                         | String must be exactly 12 characters long                                                                                      |
| `length(min,max)`   | `{filename:length(8,16)}`                   | `somefile.txt`                         | String must be at least 8 and no more than 16 characters long                                                                  |
| `min(value)`        | `{age:min(18)}`                             | `19`                                   | Integer value must be at least 18                                                                                              |
| `max(value)`        | `{age:max(120)}`                            | `91`                                   | Integer value must be no more than 120                                                                                         |
| `range(min,max)`    | `{age:range(18,120)}`                       | `91`                                   | Integer value must be at least 18 but no more than 120                                                                         |
| `alpha`             | `{name:alpha}`                              | `Rick`                                 | String must consist of one or more alphabetical characters, `a`-`z` and case-insensitive                                       |
| `regex(expression)` | `{ssn:regex(^\\d{{3}}-\\d{{2}}-\\d{{4}}$)}` | `123-45-6789`                          | String must match the regular expression. See tips about defining a regular expression                                         |
| `required`          | `{name:required}`                           | `Rick`                                 | Enforces that an explicit value (not an ambient value) is present during URL generation.                                       |
| `file`              | `{filename:file}`                           | `myfile.txt`                           | String can contain path segments, but its last segment must have a dot (`.`) and be followed by one or more non-dot characters |
| `nonfile`           | `{page:nonfile}`                            | `PageName`                             | String must not have a dot in its last path segment that is followed by one or more non-dot (`.`) characters                   |
    

### أمثلة ذهنية سريعة

```csharp
{id:int}
```

لازم id يبقى integer

```csharp
{name:alpha}
```

لازم name حروف فقط

```csharp
{age:range(18,120)}
```

لازم age في الرينج ده

```csharp
{ssn:regex(^\\d{{3}}-\\d{{2}}-\\d{{4}}$)}
```

لازم الشكل يطابق الـ regex المطلوب

---

# 22) ليه المقال قال إن route values تفضل strings؟

حتى لو constraint زي `int` نجح، المقال وضح إن القيمة المخزنة في route values تفضل string.  
التحويل لـ int بيُستخدم فقط للتحقق من صحة المطابقة، لكن الـ stored route value نفسها ليست necessarily int object.

ودي نقطة ناس كتير ما بتاخدش بالها منها.

---

# 23) Regex Constraints: ليه المقال وقف عندها كتير؟

## قوية

لأنك تقدر تحدد pattern دقيق جدًا

## خطرة

لأن:

- escaping مزعج
- ممكن تعمل regex بطيء
- ومع input غير موثوق ممكن يحصل Denial-of-Service لو regex سيئ ومافيش timeout

والمقال كرر التحذير ده أكتر من مرة.

### ليه `^` و `$` مهمين؟

لأن من غيرهم، regex ممكن يطابق substring فقط.

مثلًا:

```regex
[a-z]{2}
```

هيطابق "ab" داخل `"123abc456"`

لكن:

```regex
^[a-z]{2}$
```

معناها لازم **السلسلة كلها** تكون حرفين بالضبط.

---

# 24) Custom Route Constraints: إمتى أعمل واحدة؟

المقال قال إنها **rarely needed**  
يعني نادرًا ما تحتاجها فعلًا. ولو احتجتها:

- تعمل class implements `IRouteConstraint`
- تسجلها في `ConstraintMap`
- وتستخدمها في الـ route pattern
    

لكن المقال كمان قال:  
قبل ما تعمل custom constraint، فكّر في ==alternatives زي model binding أو فحص القيمة داخل action== نفسها. بل وذكر مثال إن منع الصفر داخل id ممكن يتعمل أوضح جوه action بدل custom constraint.

### الدرس هنا

مش كل حاجة ينفع تتزق في الـ routing.

---

# 25) Parameter Transformers: دي مختلفة عن Constraints

المقال فرّق بوضوح بين الاتنين.

## Constraint

بيسأل:  
"هل القيمة دي مقبولة عشان يحصل match؟"

## Transformer

بيسأل:  
"أنا لما أطلع URL، أحوّل الشكل إزاي؟"

مثال `slugify`:

```csharp
blog/{article:slugify}
```

لو عندك:  
`MyTestArticle`

يبقى الـ URL:  
`my-test-article`

### النقطة المهمة

الـ transformer بيغيّر شكل النص في الـ URI، مش منطق التحقق نفسه.

---

# 26) Catch-all Parameters: `*` و `**`

المقال قال إنهم يمسكوا "باقي الـ URI".  
مثال:

```csharp
blog/{**slug}
```

ده معناه:

- أي حاجة تبدأ بـ `/blog/`
    
- والباقي كله يتحط في `slug`
    

### الفرق بين `*` و `**`

- `*` لما يولد URL بيعمل escape للـ `/`بال
    
- `**` يسمح بالـ `/` عادي جوه القيمة عند التوليد
    

مثال المقال:

- `foo/{*path}` مع `"my/path"` → `foo/my%2Fpath`
    
- `foo/{**path}` مع `"my/path"` → `foo/my/path`
    

ودي نقطة دقيقة جدًا ولازم تتفهم، خصوصًا لو بتتعامل مع nested paths.

---

# 27) Optional File Extension Pattern

المقال جاب المثال ده:

```csharp
files/{filename}.{ext?}
```

وده معناه:

- ممكن `filename` فقط
    
- أو `filename + ext`
    

فالـ routes دي تطابق:

- `/files/myFile.txt`
    
- `/files/myFile`
    

### ليه؟

لأن النقطة `.` مع الامتداد أصبحت مرتبطة بباراميتر اختياري.

---

# 28) Complex Segments: من أصعب أجزاء المقال

المثال:

```csharp
/a{b}c{d}
```

المقال شرح إن المطابقة هنا بتحصل من اليمين لليسار وبشكل non-greedy.

### معنى non-greedy

يعني النظام يحاول ياخد **أقل قدر ممكن** من النص في كل خطوة.

مثال `/abcd`:

- يلاقي `c`
    
- اللي بعد `c` يبقى `d`
    
- يرجع يدور على `a`
    
- اللي بين `a` و `c` يبقى `b`
    

فينتج:

- `b = b`
    
- `d = d`
    

### ليه الحتة دي حساسة؟

لأن لو الـ delimiter نفسه ظهر داخل القيمة، الدنيا بتبوظ.  
عشان كده المقال قال إن الـ complex segments شغلها محدود، وفي الحالات المعقدة regex غالبًا أوضح وأأمن.

---

# 29) Special Characters: ليه `%2F` و `+` ممكن يعملوا لخبطة؟

المقال حذر إن route parameters مش دائمًا يتم URL decoding لها بالشكل اللي تتوقعه، وده ممكن يعمل نتائج غير متوقعة مع رموز زي:

- `/` encoded as `%2F`
    
- `+`
    

يعني لو انت متوقع إن قيمة route parameter تتفك دائمًا بنفس منطق query string أو حسب توقعك الشخصي، ممكن تتفاجئ.

### الدرس

لو القيم عندك ممكن تحتوي special characters حساسة، لازم تختبر behavior فعليًا، وما تعتمدش على التخمين.

---

# 30) URL Generation: المقال ليه خصصلها جزء كبير؟

لأن الـ routing مش بس بيستقبل URL، ده كمان يقدر **يطلع URL**.

يعني بدل ما تكتب:

```csharp
"/Products/Details/5"
```

يدويًا، تقدر تقول:

- هات لي path لده action أو الصفحة دي بالقيم دي
    

وده بيقلل hardcoded URLs ويخلّي التطبيق مرن أكتر.

---

# 31) LinkGenerator: ده إيه؟

المقال قال:  
`LinkGenerator` هو API موجود في DI كـ singleton  
وبيستخدم لتوليد روابط URLs بناءً على endpoint info أو route values.  
وكمان `IUrlHelper` في MVC بيعتمد عليه داخليًا في السيناريوهات الحديثة.

### أهم methods

- `GetPathByAction`
- `GetUriByAction`
- `GetPathByPage`
- `GetUriByPage`
- `GetPathByAddress`
- `GetUriByAddress`
    

### الفرق بين Path و Uri

- `Path` → absolute path فقط  
    مثال: `/Products/List`
    
- `Uri` → ==عنوان كامل مع scheme + host== 
    مثال: `https://example.com/Products/List`
    

---

# 32) المقال قال إن LinkGenerator بيشتغل بخطوتين

1. ياخد **address**
2. يربطه بمجموعة endpoints candidates
3. يجرب route patterns لحد ما يلاقي واحد صالح
4. يرجع أول نتيجة ناجحة
    

### معنى Address هنا

مش لازم URL جاهز.  
ممكن يكون:

- endpoint name
    
- route values
    
- action/page info
    

---

# 33) Address Schemes: دي معناها إيه؟

المقال قال فيه افتراضيًا نوعين مهمين من addresses:

## 1) Endpoint name

يعني endpoint له اسم، وتولّد link بالاسم ده

## 2) Route values address

وده المنطق المشهور في MVC لما تقول Action/Controller/values

### ليه المقال قال إن route values address معقد؟

لأن مطابقة route values على endpoints وحساب أفضل match عملية فيها منطق أكتر من مجرد dictionary lookup. عشان كده أحيانًا URL generation تحسه "بيتصرف تصرفات غريبة" لو أنت مش فاهم ambient values و invalidation.

---

# 34) Ambient Values vs Explicit Values: من أهم وأصعب أجزاء المقال

دي فعلاً حتة لازم تتفهم بهدوء.

## Ambient values

هي route values الموجودة في الـ current request الحالي.  
يعني الصفحة/الأكشن اللي أنت واقف فيها دلوقتي.

## Explicit values

هي القيم اللي أنت مررتها بنفسك لما طلبت توليد URL جديد.

### مثال

أنت داخل على:  
`/Widget/Index`

فالـ ambient values غالبًا:

- controller = Widget
    
- action = Index
    

لو طلبت:

```csharp
_linkGenerator.GetPathByAction(HttpContext, values: new { id = 17 })
```

النظام يستخدم:

- ambient: Widget / Index
    
- explicit: id = 17
    

فينتج:  
`/Widget/Index/17`

---

# 35) ليه Ambient Values مفيدة؟

المقال قال إنها بتحاول "توفر عليك كتابة".  
يعني لو أنت بالفعل داخل Controller معين، وعايز ==link لأكشن تاني في نفس الـ controller، مش لازم كل مرة تعيد كتابة اسم الـ controller.==

---

# 36) Route Value Invalidation: دي أخطر نقطة في URL Generation

المقال شرحها بالتفصيل، وهي ببساطة:  
عند توليد URL جديد، النظام لازم يقرر:

- أي ambient values ياخدها
    
- وأيها يرميها
    

وده اسمه **route value invalidation**.

### الفكرة الرئيسية

النظام يفترض إن الـ URL فيه hierarchy من الشمال لليمين.

في template:

```csharp
{controller}/{action}/{id?}
```

- `controller` أعلى مستوى
- بعده `action`
- بعده `id`

فلو غيرت controller، يبقى القيم اللي على يمينه غالبًا ما ينفعش تتورث تلقائيًا.

### مثال

لو عندك ambient:

- controller = Home
- action = Index
    
- id = 7
    

وجيت تولّد URL وقلت:

- controller = Order
    
- action = About
    

يبقى id القديم غالبًا مش منطقي يتاخد تلقائيًا.  
==لأن تغيير `controller` بيكسر السياق اللي بعده.==

---

# 37) القاعدة العملية في invalidation

المقال ذكر أمثلة مهمة:

- لو explicit فيه `id` → الـ ambient `id` يتجاهل
- لو explicit فيه `action` → ambient action يتراجع، وقد يؤثر على id
    
- لو explicit فيه `controller` → ambient controller يتراجع، وغالبًا action و id اللي بعده كمان يتأثروا
    

### المعنى

كل ما تغيّر قيمة "أقدم" في الهيكل، القيم اللي بعدها ما يبقاش مضمون إنها ما زالت صالحة.

---

# 38) Optional Route Parameter Order

المقال قال:  
الـ optional parameters لازم تيجي ==**بعد** required parameters== والـ literals.

مثال صح:

```csharp
{color}/{id:int?}/{name?}
```

ليه؟  
لأن:

- `color` مطلوب
- `id` اختياري
- `name` اختياري
    

لكن لو خلطت optional قبل required، التفسير هيبقى ambiguous.

---

# 39) LinkParser: ده عكس LinkGenerator تقريبًا

المقال شرح `LinkParser` على إنه أداة:

- تاخد path
- وتحلله
- وتطلع route values  
    بناءً على endpoint معروف بالاسم.
    

### المثال

لو endpoint اسمه `GetProduct` ونمطه:  
`api/Products/{id}`

ومعاك path:  
`/api/Products/1`

`LinkParser` يقدر يطلع:

- id = 1

### يعني ليه ده مفيد؟

لما العميل يبعت لك URL وعايز أنت تستخرج منه route values من غير ما تعيد كتابة parsing logic يدويًا.

---

# 40) RequireHost: يعني Endpoint مربوط بهوست معيّن

المقال شرح إنك تقدر تربط endpoint بـ host معيّن:

```csharp
app.MapGet("/", () => "Contoso").RequireHost("contoso.com");
```

يعني endpoint ده يشتغل فقط لو الـ request جاي بالـ host ده.  
ويدعم:

- host محدد
    
- wildcard host
    
- port
    
- host + port
    

لكن المقال حذّر من spoofing على Host header، وقال لازم تتعامل بحذر، وتستخدم host filtering أو فحص local port لو السيناريو يتطلب.

---

# 41) Route Groups: دي معمولة ليه؟

`MapGroup` معمولة عشان:

- تجمع endpoints ليهم prefix مشترك
    
- تقلل التكرار
    
- تطبق metadata/filters/auth على المجموعة كلها دفعة واحدة
    

مثال المقال:

- `/public/todos`
    
- `/private/todos`
    

والتانية عليها:

- tags
    
- filter
    
- authorization
    

### الفكرة

بدل ما كل endpoint تكرر:

- `/private/todos/...`
    
- `.RequireAuthorization()`
    
- `.WithMetadata(...)`
    

اعمل group مرة واحدة.

---

# 42) Route Groups Nested

المقال قال إن route groups ينفع تتعشّق جوا بعض، مثل:

- group فاضي
    
- جواه `{org}`
    
- جواه `{user}`
    

وفي الآخر endpoint يقدر يقرأ القيمتين معًا.

وده مفيد جدًا في APIs الكبيرة متعددة المستويات.

---
