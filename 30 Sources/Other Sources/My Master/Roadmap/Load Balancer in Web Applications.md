---
title: "Load Balancer in Web Applications"
aliases: []
type: source
status: active
domain: system-design
tags: [source, system-design, masters]
created: 2026-10-25
updated: 2026-10-25
source:
related: []
---

## 1. What is a Load Balancer?

الـ **Load Balancer** هو مكوّن بيستقبل الـ Incoming Requests أو Connections، ويوزّعها على مجموعة من الـ Backend Servers أو Application Instances.

الهدف الأساسي منه:

-  اولا **Load Distribution:** توزيع الحمل بدل ما سيرفر واحد يتحمل كل الطلبات.
    
- ثانيا **Scalability:** تسهيل إضافة Instances جديدة لاستيعاب Traffic أكبر.
    
- ثالثا **High Availability:** استمرار الخدمة لو إحدى الـ Instances تعطلت، بشرط وجود بدائل سليمة.
    
- رابعا **Health Checks:** اكتشاف الـ Instances غير السليمة واستبعادها من استقبال الطلبات.
    
- خامسا **Routing:** توجيه الطلبات لخدمات مختلفة حسب الـ URL أو الـ Host، لو الـ Load Balancer بيدعم ده.
    
- سادسا **TLS Termination:** التعامل مع HTTPS عند نقطة الدخول بدلًا من إنهاء التشفير داخل كل Backend، حسب التصميم.

### Basic Architecture
![[Pasted image 20261020040633.png]]
مثال: عندك ASP.NET Core Web API، وشغّلت منه 3 Instances. الـ Load Balancer بيختار أي Instance تستقبل كل Request بدل ما كل الطلبات تروح لنسخة واحدة.

**مهم:** الـ Load Balancer مش بيقوّي السيرفر نفسه، لكنه بيساعدك تستفيد من عدة Instances. ومش بيضمن إن الـ Database أو باقي مكونات السيستم هتتحمل الحمل.

---

## 2. Types of Load Balancers

### A. Based on Network Layer

#### Layer 4 Load Balancer

بيشتغل على مستوى Transport Layer، وبيعتمد على معلومات زي:

- Source IP Address.
- Destination IP Address.
- TCP/UDP Port.

مش محتاج يفهم محتوى الـ HTTP Request أو الـ URL عشان يوجّه الاتصال.

مثال: توزيع اتصالات TCP الواردة على Port 443 على عدة Backend Servers.

#### Layer 7 Load Balancer

بيشتغل على مستوى Application Layer، وبيفهم بروتوكولات زي HTTP/HTTPS.

يقدر يوجّه الطلبات بناءً على:

- URL Path.
- Hostname.
- HTTP Headers.
- خصائص أخرى يدعمها المنتج.

مثال:

```
/api/products  -> Product Service
/api/orders    -> Order Service
/api/users     -> User Service
```

**الفرق الأساسي:** Layer 4 بيوجّه الاتصالات اعتمادًا على معلومات الشبكة والنقل، بينما Layer 7 يقدر يتخذ قرارات Routing اعتمادًا على معلومات التطبيق.

### B. Based on Implementation

1. **Hardware Load Balancer:** جهاز مخصص لتوزيع الحمل، يُستخدم في بعض بيئات المؤسسات ومراكز البيانات.
    
2. **Software Load Balancer:** برنامج زي NGINX أو HAProxy بيشتغل على سيرفر أو Container.
    
3. **Cloud Load Balancer:** خدمة مُدارة زي AWS Application Load Balancer أو Azure Application Gateway.
    
4. في **DNS Load Balancing:** استخدام DNS لإرجاع عناوين IP مختلفة. مش بديلًا كاملًا عن HTTP Reverse Proxy؛ لأن الـ DNS Caching وآلية اكتشاف الأعطال بيأثروا على النتيجة.
---

## 3. Load Balancing Algorithms

الـ Algorithm هو الطريقة اللي بيستخدمها الـ Load Balancer عشان يختار الـ Backend اللي هيتعامل مع الطلب.

هنفترض إن عندنا 3 Servers: A وB وC.

### 3.1 Round Robin

بيوزّع الطلبات بالتتابع على السيرفرات.

```
Request 1 -> A
Request 2 -> B
Request 3 -> C
Request 4 -> A
Request 5 -> B
Request 6 -> C
```

**طريقة العمل:**

- بيحتفظ بترتيب الوجهات.
- كل Request جديدة تنتقل للوجهة التالية.
- بعد آخر وجهة، يرجع لأول وجهة.

**المميزات:**

- بسيط وسهل التنفيذ.
- توزيع متقارب في عدد الطلبات.
- مناسب لما تكون السيرفرات متقاربة في القدرة، والطلبات متقاربة في التكلفة.

**العيوب:**

- عدد الطلبات المتساوي مش معناه حمل متساوي. يعني هو بيوزع الريكوستس بدون ما يبص ناحية هل دا هيأثر على السيرفر ولا لا، هو يدوبك اديني وانا اوزع
- Request ممكن تنتهي في 10 ms، وRequest تانية تحتاج 5 ثوانٍ.
    
- مش بيأخذ في الاعتبار قدرة السيرفر أو الحمل الحالي في صورته الأساسية.
    

**مثال:** لو A وB وC عندهم قدرات مختلفة، Round Robin العادي ممكن يدي كل واحد نفس عدد الطلبات رغم إن A أضعف من B.

**متى أستخدمه؟** لما تكون الـ Instances متشابهة، ومفيش اختلاف كبير في تكلفة الطلبات.

![[Pasted image 20261020042210.png]]

### 3.2 Weighted Round Robin

هي نسخة من Round Robin بتسمحلك تحدد إن بعض الـ Servers تستقبل Requests أكتر من غيرها، عن طريق إعطاء كل Server وزن (Weight) يعبّر عن حصته النسبية من الطلبات.

#### ليه بنستخدم Weights؟

تخيل إن عندك 3 Servers بيشغّلوا نفس الـ Application، لكن إمكانياتهم مختلفة:

- Server A: عنده 8 CPU Cores و16 GB RAM.
- Server B: عنده 4 CPU Cores و8 GB RAM.
- Server C: عنده 2 CPU Cores و4 GB RAM.

لو استخدمت Round Robin العادي، كل Server هياخد تقريبًا نفس عدد الـ Requests، رغم إن قدراتهم على معالجة الطلبات ممكن تكون مختلفة.

هنا بنستخدم Weighted Round Robin علشان نوزّع الطلبات بنسب تتناسب مع القدرة المتوقعة لكل Server، بدل ما نوزّعها بالتساوي.

#### على أي أساس بحدد الـ Weight؟

الأوزان مش بتتحط عشوائيًا، لكن بنحددها بناءً على عوامل زي:

1. مثلا **Server Resources:** عدد الـ CPU Cores وحجم الـ RAM، كعوامل مبدئية لتقدير القدرة.
    
2.  وكمان على**Processing Capacity:** عدد الـ Requests اللي السيرفر يقدر يعالجها في الثانية مع الحفاظ على أداء مقبول.
    
3.وال **Load Testing:** بنختبر كل Server ونقيس الـ Throughput والـ Response Time واستهلاك الموارد تحت الحمل.
    
1. والاهم هي **Workload Type:** طبيعة الطلبات نفسها؛ لأن طلب بيستهلك CPU بكثافة مختلف عن طلب بيعتمد على Database أو Network.
    

عمليًا، الأفضل الاعتماد على اختبارات الأداء الفعلية، مش على مواصفات الهاردوير وحدها.

#### مثال عملي

افترض إنك اختبرت الـ Servers ووجدت إن قدرتها المستدامة على معالجة نفس نوع الـ Workload كالتالي:

| Server | القدرة المقاسة  | Weight |
| ------ | --------------- | ------ |
| A      | 50 Requests/sec | 5      |
| B      | 30 Requests/sec | 3      |
| C      | 20 Requests/sec | 2      |

إجمالي الأوزان = 5 + 3 + 2 = 10.

نسبة كل Server من إجمالي الأوزان:

- Server A: 5 / 10 = 50%.
    
- Server B: 3 / 10 = 30%.
    
- Server C: 2 / 10 = 20%.
    

بالتالي، لو عندنا 100 Request، فالتوزيع المتوقع على المدى المناسب هيكون تقريبًا:

- A يستقبل 50 Request.
    
- B يستقبل 30 Request.
    
- C يستقبل 20 Request.
    

**ملحوظة:** الأوزان ممكن تكون 5 و3 و2 أو 50 و30 و20؛ لأن المهم هو النسبة بين الأوزان، مش قيمتها المطلقة.

كمان، لو Server A عنده ضعف موارد Server B، ده مش معناه تلقائيًا إنه يستحق ضعف الـ Weight؛ لأن القدرة الفعلية بتعتمد على عوامل تانية، زي نوع المعالج وطبيعة الطلبات والـ Dependencies.

#### هل الـ Weight بيتغير حسب الحمل الحالي؟

في الـ Weighted Round Robin التقليدي، الأوزان بتكون محددة مسبقًا، ومش بتتغير تلقائيًا حسب الـ CPU أو الـ RAM أو الـ Response Time الحالي.

يعني لو Server C اتعرض فجأة لضغط كبير، ممكن يفضل يستقبل حصته المعتادة من الطلبات رغم إن أداءه اتراجع.

لو محتاج توزيع يتفاعل مع حالة السيرفر الحالية، ممكن تستخدم خوارزميات أو آليات تانية بتراعي الحمل أو الاتصالات النشطة، حسب الـ Load Balancer المستخدم.

#### المميزات

- بيسمح بتوزيع Requests أكتر على السيرفرات الأقوى.
- مناسب لما تكون الـ Instances مختلفة في الموارد أو القدرة على معالجة الطلبات.
- بيديك تحكمًا في النسبة المتوقعة من الطلبات اللي كل Server يستقبلها.

#### العيوب

- الـ Weight الثابت مش مقياس للحمل اللحظي.
- اختيار أوزان غير مناسبة ممكن يؤدي إلى توزيع غير متوازن.
- محتاج اختبارات وقياسات فعلية لتحديد الأوزان المناسبة.

#### متى أستخدمه؟

لما تكون عندك Servers أو Instances بقدرات مختلفة، وعايز توزّع الـ Requests بنسب تناسب قدرتها المتوقعة على المعالجة.

- Round Robin: بيوزّع الطلبات بالتناوب بحصص متقاربة.
- Weighted Round Robin: بيوزّع الطلبات بنسب مختلفة بناءً على الأوزان المحددة لكل Server.


### 3.3 Least Connections

بيختار السيرفر اللي عنده أقل عدد من الاتصالات النشطة في اللحظة اللي بيتخذ فيها القرار.

مثال:

```
Server A: 20 active connections
Server B: 8 active connections
Server C: 14 active connections

Next Request -> Server B
```

الفكرة إن السيرفر اللي عنده اتصالات أقل ممكن يكون عنده قدرة أكبر على استقبال اتصال جديد.

**المميزات:**

- مناسب لما مدة الاتصالات بتختلف.
- ممكن يكون أفضل من Round Robin لما بعض الطلبات أو الاتصالات بتستمر لفترة طويلة.
    

**العيوب:**

- عدد الاتصالات مش دايمًا بيعكس الحمل الحقيقي.
- اتصال واحد ممكن يكون خفيف، واتصال آخر ممكن يكون مكلف جدًا.
- طريقة احتساب الاتصالات بتختلف حسب المنتج ونوع الـ Protocol.

**مثال:** لو B عنده 5 اتصالات، لكن كل اتصال بيشغّل استعلامات ثقيلة جدًا، مش شرط يكون أفضل اختيار من A اللي عنده 10 اتصالات خفيفة.

**متى أستخدمه؟** لما مدة الاتصالات متفاوتة، والاتصالات النشطة تكون مؤشرًا مفيدًا للحمل.

### 3.4 Weighted Least Connections

بيجمع بين عدد الاتصالات النشطة والـ Weight الخاص بكل Server.

فكرته إنه يراعي إن بعض السيرفرات تقدر تتعامل مع اتصالات أكتر من غيرها.

للتوضيح، ممكن تستخدم مقارنة تقريبية بين:

```
Active Connections / Weight
```
وتفضّل السيرفر اللي عنده النسبة الأقل.
مثال:

```
Server A:
Connections = 20
Weight = 2
Ratio = 10

Server B:
Connections = 12
Weight = 3
Ratio = 4

Server C:
Connections = 10
Weight = 1
Ratio = 10
```

في النموذج المبسط ده، B هو الاختيار المفضّل.

**ملاحظة:** دي طريقة توضيحية لفهم الفكرة؛ الخوارزمية الدقيقة بتختلف حسب الـ Load Balancer.

**المميزات:**

- بتراعي اختلاف قدرة السيرفرات.
- ممكن تكون أفضل من Least Connections لما الـ Backends غير متساوية.

**العيوب:**

- أكثر تعقيدًا في الضبط.
- لسه عدد الاتصالات مش مقياسًا كاملًا للـ CPU أو Response Time.
- محتاجة Weights مناسبة ومراقبة مستمرة.
    

### 3.5 Least Response Time

بتفضّل السيرفرات اللي بتقدّم Response Times أقل، وفقًا لمقاييس وطريقة الحساب اللي المنتج بيدعمها.

مثلًا:

```
Server A: Average Response Time = 120 ms
Server B: Average Response Time = 40 ms
Server C: Average Response Time = 90 ms

Preferred Server -> B
```

ده مثال مبسط؛ القرار الحقيقي ممكن يعتمد على قياسات أحدث، أو متوسطات، أو الاتصالات النشطة كمان.

**المميزات:**

- بتستفيد من معلومات الأداء الفعلي.
- ممكن تساعد في تجنب السيرفرات البطيئة.
    

**العيوب:**

- الـ Response Time بيتغير باستمرار.
- الطلبات المختلفة مش بالضرورة قابلة للمقارنة.
- لازم تتجنب الاعتماد على قياسات قديمة أو متقلبة.

**متى أستخدمها؟** لما المنتج يدعمها، وتكون قياسات زمن الاستجابة ممثلة فعلًا للأداء اللي يهم المستخدم.

### 3.6 Random

بيختار Server عشوائيًا من المجموعة المتاحة.

لو السيرفرات متساوية الاحتمالات، فكل واحد عنده نفس فرصة الاختيار في كل عملية مستقلة.

**المميزات:**

- بسيطة.
    
- مش محتاجة ترتيبًا دوريًا.
    

**العيوب:**

- ممكن يحصل تفاوت مؤقت في عدد الطلبات.
    
- الاختيار مش مبني على الحمل الفعلي.
    
- لو السيرفرات مختلفة في القدرة، التوزيع العشوائي البسيط ممكن يكون غير مناسب.
    

**متى أستخدمها؟** حسب طبيعة النظام والتنفيذ، خصوصًا لما يكون الاختيار العشوائي كافيًا أو جزءًا من خوارزمية أكثر تقدمًا.

### 3.7 IP Hash

بتستخدم Hash مبنيًا على IP العميل لتحديد الـ Backend.

```
Hash(Client IP) -> Backend Selection
```

الفكرة إن الطلبات القادمة من نفس IP ممكن تروح لنفس السيرفر طالما مجموعة الوجهات والإعدادات لم تتغير.

**المميزات:**

- ممكن تحافظ على توجيه متكرر لنفس العميل.
    
- مفيدة في بعض الأنظمة اللي محتاجة قدرًا من ثبات الوجهة.
    

**العيوب:**

- مستخدمون كتير ممكن يشاركوا نفس الـ Public IP بسبب NAT.
    
- تغيير مجموعة السيرفرات ممكن يغيّر توزيع العملاء.
    
- مش بديلًا مضمونًا عن Shared Session State.
    
- ممكن ينتج عنها توزيع غير متوازن لو عناوين العملاء مش موزعة بشكل جيد.
    

**متى أستخدمها؟** لما يكون توجيه العميل المتكرر مفيدًا، مع إدراك إنها مش ضمانًا لتخزين الجلسة في نفس المكان.

### 3.8 Consistent Hashing

نوع من الـ Hash-based Routing بيهدف إلى تقليل عدد المفاتيح اللي يتغير مكانها لما تضيف أو تشيل Server.

ممكن تستخدمه لتوزيع Cache Keys أو بيانات مرتبطة بمفتاح محدد.

**المميزات:**

- يقلل إعادة توزيع المفاتيح مقارنةً ببعض طرق الـ Hash البسيطة.
- مفيد في بعض الأنظمة الموزعة والـ Caching.
    

**العيوب:**

- محتاج تصميمًا مناسبًا للـ Hash Ring أو آلية التوزيع المستخدمة.
    
- مش بيضمن توازنًا مثاليًا من غير تحسينات مناسبة.
    
- مش بديلًا عن Replication أو Failover.
    

**مهم:** Consistent Hashing مش بالضرورة Algorithm متاحًا كخيار جاهز في كل HTTP Load Balancer.

### مقارنة سريعة بين الخوارزميات

|Algorithm|يعتمد على|أهم نقطة ضعف|
|---|---|---|
|Round Robin|ترتيب الطلبات|يتجاهل الحمل الفعلي|
|Weighted Round Robin|الأوزان|الأوزان مش مقياس لحظي للحمل|
|Least Connections|الاتصالات النشطة|الاتصالات لا تساوي الحمل بالضرورة|
|Weighted Least Connections|الاتصالات والأوزان|يحتاج ضبطًا مناسبًا|
|Least Response Time|زمن الاستجابة|القياسات متغيرة|
|Random|الاختيار العشوائي|تفاوت مؤقت في التوزيع|
|IP Hash|عنوان IP|مشاركة IP أو تغيّر الوجهات|
|Consistent Hashing|Hash للمفتاح|يحتاج تصميمًا مناسبًا لإعادة التوزيع|

**مفيش Algorithm أفضل في كل الحالات.** الاختيار بيتحدد بناءً على طبيعة الطلبات، والـ Backends، وطريقة قياس الحمل، والمنتج المستخدم.

---

## 4. Health Checks

الـ Health Check وسيلة لمعرفة هل الـ Backend جاهز لاستقبال الطلبات ولا لأ.

مثال:

![[Pasted image 20261020043829.png]]
لو B غير سليم، الـ Load Balancer ممكن يستبعده مؤقتًا ويوجّه الطلبات إلى A وC.
![[Pasted image 20261020043956.png]]
### في ASP.NET Core

```
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHealthChecks();

var app = builder.Build();

app.MapHealthChecks("/health");

app.Run();
```

ده مثال أساسي فقط. لو عايز تفحص Database أو Dependencies أخرى، لازم تضيف فحوصات مناسبة لها.

- **Liveness:** هل التطبيق شغال؟
    
- **Readiness:** هل التطبيق جاهز لاستقبال Traffic؟
    

وجود Endpoint اسمه `/health` لوحده مش معناه إن الـ Load Balancer بيستخدمه تلقائيًا؛ لازم تضبط الـ Health Check Integration في البنية المستخدمة.

---

## 5. Implementing a Load Balancer with NGINX

NGINX ممكن يعمل Reverse Proxy ويوزع الـ HTTP Requests على أكثر من ASP.NET Core Instance.

### Architecture
![[Pasted image 20261020044154.png]]
### Example Configuration

```
http {
    upstream aspnet_backend {
        least_conn;

        server 127.0.0.1:5001;
        server 127.0.0.1:5002;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://aspnet_backend;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For
                             $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### شرح الإعداد

- `upstream`: تعريف مجموعة الـ Backends.
- `least_conn`: اختيار الـ Backend وفقًا لعدد الاتصالات النشطة.
- `proxy_pass`: تمرير الطلب إلى المجموعة.
- `X-Forwarded-For`: نقل معلومات عن عنوان العميل الأصلي.
- `X-Forwarded-Proto`: نقل البروتوكول الأصلي للطلب.

في Production، لازم تراجع إعدادات HTTPS والـ Forwarded Headers والـ Timeouts والـ Logging. كمان لازم تعرف إن NGINX Open Source بيوفر آليات معينة لاكتشاف الأعطال، بينما بعض الـ Active Health Checks المتقدمة متاحة في NGINX Plus.

---

## 6. Implementing a Load Balancer with YARP in ASP.NET Core

هنا YARP اختصار لـ Yet Another Reverse Proxy، وهي مكتبة من Microsoft لبناء Reverse Proxy باستخدام .NET.

### Step 1: Create the Project

```
dotnet new web -n LoadBalancer
cd LoadBalancer
dotnet add package Yarp.ReverseProxy
```

### Step 2: Configure `appsettings.json`

```
{
  "ReverseProxy": {
    "Routes": {
      "demoRoute": {
        "ClusterId": "demoCluster",
        "Match": {
          "Path": "/{**catch-all}"
        }
      }
    },
    "Clusters": {
      "demoCluster": {
        "LoadBalancingPolicy": "RoundRobin",
        "Destinations": {
          "instance1": {
            "Address": "http://localhost:5001/"
          },
          "instance2": {
            "Address": "http://localhost:5002/"
          }
        }
      }
    }
  }
}
```

### Step 3: Configure `Program.cs`

```
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddReverseProxy()
    .LoadFromConfig(
        builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy();

app.Run();
```

### Step 4: Run the Backends

شغّل نسختين من الـ Backend على منفذين مختلفين:

```
dotnet run --urls http://localhost:5001
```

وفي Terminal آخر:

```
dotnet run --urls http://localhost:5002
```

بعدها شغّل الـ Proxy على منفذ ثالث:

```
dotnet run --urls http://localhost:5000
```

جرّب تفتح:

```
http://localhost:5000/
```

الطلبات هتدخل من الـ Proxy، وهو هيوجّهها للـ Destinations حسب الـ Configuration.

**مهم:** تشغيل نسختين من التطبيق مش معناه إن عندك Load Balancer تلقائيًا؛ الـ Proxy هو اللي بيوزع الطلبات هنا. كذلك المثال لا يضيف تلقائيًا Health Checks متقدمة أو High Availability للـ Proxy نفسه.

---

## 7. Limitations and Solutions

### A. Single Point of Failure (SPOF)

**المشكلة:** لو عندك Load Balancer واحد وتعطل، ممكن المستخدمون يفقدوا الوصول إلى كل الـ Backends.

**الحل:** استخدم خدمة عالية التوافر، أو أكثر من Proxy Instance مع Failover مناسب، ووزّع المكونات على نقاط فشل مستقلة.

### B. Stateful Applications

**المشكلة:** لو الـ Session أو بيانات المستخدم محفوظة في Memory محلية داخل Instance، ممكن الطلب التالي يروح لنسخة أخرى وميلقاش البيانات.

**الحل:**

- استخدام Distributed Cache عند الحاجة.
- مشاركة مفاتيح ASP.NET Core Data Protection بين النسخ عند استخدام Cookies محمية.
- تجنب الاعتماد غير المقصود على In-Memory State.
- استخدام Sticky Sessions فقط عند وجود مبرر واضح.
    

### C. Database Bottleneck

**المشكلة:** زيادة عدد الـ Application Instances ممكن تزود عدد الاتصالات والضغط على الـ Database.

**الحل:**

- تحسين الـ Queries والـ Indexes.
- ضبط Connection Pooling.
- استخدام Caching عند ملاءمته.
- مراقبة الـ CPU والاتصالات وزمن الاستعلامات.
- دراسة Read Replicas أو حلول التوسع المناسبة لمحرك قاعدة البيانات.
    

### D. Uneven Workloads

**المشكلة:** عدد الطلبات مش دايمًا بيعكس مقدار الشغل اللي كل طلب بيعمله.

**الحل:** اختبر الخوارزميات على Traffic حقيقي أو ممثل للواقع، وراقب الـ Latency والـ CPU والـ Error Rates.

### E. Retries and Timeouts

**المشكلة:** إعادة المحاولة بشكل مفرط ممكن تزود الضغط وقت الأعطال، والـ Timeout مش معناه بالضرورة إن العملية الأصلية لم تُنفّذ.

**الحل:**

- وضع حدود لإعادة المحاولة.
- استخدام Backoff مع Jitter.
- استخدام Idempotency Keys للعمليات الحساسة.
- ضبط Timeouts بصورة مناسبة.

### F. Configuration and Security

**المشكلة:** إعدادات الـ Proxy غير الصحيحة ممكن تكشف معلومات غير موثوقة عن العميل أو تفتح مسارات غير مقصودة.

**الحل:**

- الوثوق في Forwarded Headers القادمة من Proxies معروفة فقط.
    
- ضبط HTTPS وسياسات الوصول.
    
- عدم اعتبار الـ Load Balancer بديلًا عن Authentication وAuthorization.
    
- تأمين مسارات الإدارة والـ Health Checks حسب الحاجة.
    

---

## 8. Load Balancer vs Auto Scaling

|Load Balancer|Auto Scaling|
|---|---|
|يوزّع الـ Requests على الـ Instances المتاحة|يضيف أو يزيل Instances|
|يتعامل مع اختيار الـ Backend|يتعامل مع عدد الـ Backends|
|ممكن يستبعد Instance غير سليمة|ممكن يتكامل مع Health Checks وسياسات التوسع|

---

## 9. Choosing the Right Solution

|السيناريو|الاختيار المحتمل|
|---|---|
|تطبيق صغير على سيرفر واحد|استضافة مباشرة إذا لم تكن هناك حاجة للتوزيع|
|عدة Instances على Linux أو VPS|NGINX أو HAProxy|
|Reverse Proxy مبني على .NET|YARP|
|تطبيق على Cloud|Managed Load Balancer مناسب للمنصة|
|زيادة الحمل تلقائيًا|Load Balancer مع Auto Scaling|
|متطلبات High Availability|تكرار الـ Instances والبنية التحتية ومكونات الاعتماد المهمة|

## 10. Key Takeaways

- الـ Load Balancer بيوزّع الحمل على عدة Backends.
    
- Layer 4 بيعتمد على معلومات الشبكة والنقل، بينما Layer 7 يفهم بروتوكولات التطبيق زي HTTP.
    
- Round Robin مناسب للبساطة، وWeighted Round Robin بيراعي اختلاف القدرات، وLeast Connections بيراعي الاتصالات النشطة.
    
- مفيش Algorithm أفضل في كل الحالات.
    
- تشغيل عدة Instances لا يضمن وحده High Availability.
    
- لازم تهتم بالـ Health Checks والـ Shared State والـ Database والـ Failover.
    
- في ASP.NET Core، تقدر تستخدم NGINX كـ Reverse Proxy أو تبني Proxy باستخدام YARP.
    
- لو الـ Load Balancer نفسه نقطة فشل وحيدة، ممكن يفضل هو الـ SPOF حتى لو عندك عشرات الـ Application Servers.
    

### References

- [NGINX — HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
    
- [Microsoft — YARP Reverse Proxy](https://learn.microsoft.com/aspnet/core/fundamentals/servers/yarp/middleware?view=aspnetcore-10.0)
    
- [Microsoft — Distributed Caching in ASP.NET Core](https://learn.microsoft.com/aspnet/core/performance/caching/distributed?view=aspnetcore-10.0)
    
- [Microsoft — ASP.NET Core Health Checks](https://learn.microsoft.com/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-10.0)
> so it does not support failover and redundancy [[System Design Interview by Alex Xu.pdf#page=11&selection=0,0,0,46&markId=73a7aae593a710ac|↗]]

> Database replication is a common techniqueto address those problems. [[System Design Interview by Alex Xu.pdf#page=11&selection=0,48,1,26&markId=723d9c524ce15855|↗]]