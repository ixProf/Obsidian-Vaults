---
title: "DEPI - DevOps - Session 7 - Summary"
aliases: []
type: source
status: active
domain: devops-infrastructure
tags: [source, devops-infrastructure, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

# المشكلة اللي بيحلها Virtualization و Containerization

تخيل عندك **Server واحد** بالمواصفات دي:

- CPU: 16 Cores
- RAM: 32 GB
- Storage: 1 TB
وعايز تشغل عليه أكتر من Application.

زمان كان ممكن تعمل كده:

```text
Physical Server
│
├── Application 1
├── Application 2
├── Application 3
└── Application 4
```

لكن هنا ظهرت مشاكل:

### 1. التطبيقات ممكن تأثر على بعض
لو Application 1 استهلك CPU أو RAM بشكل كبير، باقي التطبيقات ممكن تتأثر.

### 2. اختلاف الـDependencies
ممكن تطبيق يحتاج:

```text
.NET 8
```
وتطبيق تاني يحتاج:

```text
.NET 10
```

أو تطبيق يحتاج إصدار معين من Library.

### 3. لو Application وقع ممكن يأثر على النظام

مفيش Isolation كافي بين التطبيقات.
هنا ظهر مفهوم **Isolation** أو العزل.
والحلول المشهورة للعزل كانت:

- **Virtualization**
- **Containerization**
    

لكن كل واحد منهم بيعمل العزل بطريقة مختلفة.

---

## 1. Virtualization

## يعني إيه Virtualization؟

الـ**Virtualization** معناها إنك ==بتاخد جهاز Physical واحد وبتقسم موارده إلى أجهزة افتراضية.==
![[Pasted image 20260815100959.png]]

كل واحدة من دول تعتبر **Virtual Machine**.

والـVM بالنسبة للـApplication اللي جواها بتتصرف تقريبًا كأنها جهاز حقيقي مستقل.

---
### Hypervisor

وظيفتها إنها تقسم وتدير موارد الجهاز الحقيقي.

الشكل:
![[Pasted image 20260815101011.png]]

الـHypervisor مسؤول عن حاجات زي:

- تخصيص CPU لكل VM
- تخصيص RAM
- إدارة الـStorage
- إدارة الـNetwork
- عزل الـVMs عن بعض

---
### تركيب الـVirtual Machine

كل VM بيكون عندها Stack كامل تقريبًا:

![[Pasted image 20260815105620.png]]
مثال:

```text
VM 1
│
├── ASP.NET Application
├── .NET Runtime
└── Ubuntu
```
وفي نفس الوقت:
```text
VM 2
│
├── Java Application
├── JDK
└── CentOS
```
وفي نفس الوقت:
```text
VM 3
│
├── SQL Server
└── Windows Server
```

كل واحدة عندها **Operating System خاص بها**.
ودي أهم نقطة في الـVirtualization.

وده مفيد لأنك تقدر تشغل على نفس الـPhysical Server:

```text
Ubuntu
Windows
CentOS
```

كل واحد في VM منفصلة.
وكل VM معزولة بشكل قوي عن الثانية.
لو VM فيها مشكلة، مش بالضرورة تأثر على باقي الـVMs.

---

## 2. Containerization

الـContainerization اتجهت لفكرة مختلفة.
بدل ما نقول:

> كل Application يحتاج جهاز افتراضي + Operating System كامل
قالوا:
> ليه كل Application يحتاج OS كامل أصلًا؟
التطبيق في الأساس محتاج:
- Code
- Runtime
- Libraries
- Dependencies
- Configuration

إذن ممكن نحط الحاجات دي مع بعض في **Container**.

---
### يعني إيه Container؟

الـContainer عبارة عن ==بيئة معزولة لتشغيل Application.==

مثال:

عندك ASP.NET Application يحتاج:

```text
.NET Runtime
Application DLLs
Libraries
Configuration
```

بدل ما تثبت كل ده يدويًا على كل Server، بتجهزه في صورة Container.

```text
Container
│
├── ASP.NET Application
├── .NET Runtime
├── Libraries
└── Dependencies
```

وبعدين تقدر تشغله على أي Server متوافق مع بيئة التشغيل المطلوبة.

---
### طب الـContainer بيشتغل فوق إيه؟

هنا أهم فرق بينه وبين الـVM.

![[Pasted image 20260815110116.png]]

الـContainers **مش بيكون لكل واحد فيها Guest OS كامل**.

بدل كده، الـContainers على نفس الـHost ==بتشارك الـ**Kernel** الخاص بالـHost Operating System.==

---
### يعني إيه Kernel هنا؟

بشكل مبسط، الـKernel هو الجزء الأساسي من نظام التشغيل المسؤول عن التواصل مع الـHardware وإدارة الموارد، مثل:

- CP
- Memory
- Processe
- Filesystems
- Networking
يعني التطبيق داخل الـContainer لا يتعامل مباشرة مع الـHardware.
بصورة مبسطة:

```text
Application
    ↓
Container Environment
    ↓
Host OS Kernel
    ↓
Hardware
```
وده سبب إن الـContainers تكون أخف من الـVMs.

 Virtualization

![[Pasted image 20260815110347.png]]

كل VM لديها:

> App + Dependencies + Operating System


 Containerization

![[Pasted image 20260815110407.png]]

كل Container يحتوي على:
> App + Dependencies
والـContainers تشارك الـHost OS Kernel.

---

# طيب إيه هو Docker في الموضوع؟

الـ**Docker** هو من أشهر الأدوات المستخدمة لإنشاء وإدارة وتشغيل الـContainers.

في Docker عندنا مفهومين مهمين:

### Docker Image

دي تعتبر ==الـTemplate أو الـBlueprint.==

مثلاً:

```text
ASP.NET App
+
.NET Runtime
+
Dependencies
```

يتجمعوا في:

```text
Docker Image
```

---

### Docker Container

لما تشغل الـImage، ينتج Container.

بشكل مبسط:

![[Pasted image 20260815110639.png]]

ممكن تعمل من نفس الـImage أكتر من Container:

![[Pasted image 20260815110607.png]]

---
## العزل Isolation

### في Virtualization

كل VM معزولة ولها OS وموارد خاصة بها.
```text
VM 1 ≠ VM 2
```
العزل قوي جدًا لأن كل واحدة عبارة عن نظام تشغيل مستقل.

---
### في Containerization
كل Container له Process Isolation عن الـContainers الأخرى، لكنه بيشارك نفس الـKernel مع الـHost.

```text
Container 1
     │
Container 2
     │
Shared Kernel
```
فالعزل موجود، لكنه مختلف عن عزل الـVM الكامل.

---
# Containerization under the hood

الـContainer مش مجرد VM صغيرة، ومفيش Kernel جديد بيتعمل لكل Container.

بدل كده، الـContainer بيستخدم نفس الـLinux Kernel، والـKernel بيوفر Features تخلي كل Container:

1. **يشوف بيئة معزولة عن غيره** → Namespaces
2. **يتم التحكم في الموارد اللي يستهلكها** → cgroups
    

بشكل مبسط:

```text
                    Linux Kernel
                         │
            ┌────────────┴────────────┐
            │                         │
       Namespaces                  cgroups
            │                         │
         Isolation             Resource Control
```

---

## 1. Namespace

فكرة الـ**Namespace** هي فعلًا زي ما أنت قلت:

> مساحة مستقلة بذاتها، يعني المساحة بتاعتي ملهاش علاقة بمساحة شخص تاني.

لكن في Linux، المقصود بالـNamespace بشكل أدق هو:

> آلية بتخلي مجموعة من الـProcesses تشوف جزءًا معينًا من موارد النظام كأنها البيئة الوحيدة الموجودة.

يعني الـProcess الموجودة داخل Container ممكن تشوف نفسها كأنها موجودة في System مستقل، رغم إنها في الحقيقة بتشتغل على نفس الـHost مع Containers وProcesses تانية.

## مثال بسيط

عندنا Host عليه 3 Containers:

```text
Host Machine
│
├── Container A
├── Container B
└── Container C
```

كل الـContainers دي بتشتغل على نفس الـHost والـKernel.

لكن باستخدام Namespaces:

```text
Container A
يشوف:
- Processes الخاصة به
- Network الخاصة به
- Filesystem الخاص به
```

وفي نفس الوقت:

```text
Container B
يشوف:
- Processes الخاصة به
- Network الخاصة به
- Filesystem الخاص به
```

فـContainer A مش بيشوف Processes الخاصة بـContainer B كأنها جزء من بيئته.

وده اسمه **Isolation**.

---
### أشهر أنواع الـNamespaces

في Linux فيه أنواع مختلفة، وكل نوع مسؤول عن جزء معين من العزل.

#### PID Namespace

بيعزل الـProcesses.

```text
Container A
├── PID 1 → App A
└── PID 20 → Process A
```

```text
Container B
├── PID 1 → App B
└── PID 15 → Process B
```

الاتنين ممكن يكون عندهم Process اسمها `PID 1` لأن كل واحد موجود في ==Namespace مختلفة.==

---
#### Network Namespace

بيعزل الـNetwork.
كل Container ممكن يكون له:

- Network Interfaces
- IP Address
- Routing Table
- Ports
مثلًا:

```text
Container A
IP: 172.17.0.2
Port: 80
```

```text
Container B
IP: 172.17.0.3
Port: 80
```

الاتنين ممكن يشغلوا Application على Port `80` داخل بيئتهم لأن كل واحد عنده Network Namespace منفصلة.

---
#### User Namespace

بيعزل الـUsers والـUser IDs.

يعني User زي `root` داخل Container مش بالضرورة يكون له نفس الصلاحيات أو الـUID في نفس سياق الـHost.

وده مهم جدًا من ناحية العزل والأمان.

---

### إذن الـNamespace وظيفتها الأساسية؟

احفظها بالشكل ده:

> **Namespace = What the Container Can See**

يعني بتحدد **إيه اللي الـContainer يقدر يشوفه من موارد النظام**.

مثلًا:

```text
Namespace
│
├── Which Processes?
├── Which Network?
├── Which Filesystem?
├── Which Hostname?
└── Which Users?
```

---

## 2. Cgroups - Control Groups

> "إنت مسموح لك تستخدم قد إيه؟"
يعني مسؤولة عن **Resource Management**.
تخيل عندك 3 Containers:

```text
Host Server
RAM: 16 GB
CPU: 8 Cores

├── Container A
├── Container B
└── Container C
```

لو مفيش Resource Limits، ممكن Container A يحصل فيه مشكلة ويبدأ يستهلك:

```text
CPU → 100%
RAM → كمية ضخمة
```

وده ممكن يأثر على باقي الـContainers.

هنا دور الـcgroups.
### باستخدام cgroups

تقدر تحدد لكل Container موارد معينة.

مثلاً:

```text
Container A
CPU: Max 2 Cores
Memory: Max 2 GB
```

```text
Container B
CPU: Max 4 Cores
Memory: Max 4 GB
```

```text
Container C
CPU: Max 1 Core
Memory: Max 1 GB
```

فالـKernel يراقب استهلاك الـResources ويطبق القيود دي.

---
## الفرق بين Namespace و Cgroups


|                        | Namespace    | cgroup            |
| ---------------------- | ------------ | ----------------- |
| الوظيفة                | Isolation    | Resource Control  |
| السؤال الي بتجاوب عليه | انا شايف ايه | انا استخدم قد ايه |
| Processes              | أعزلها       | -                 |
| Network                | أعزله        |                   |
| CPU                    | -            | احدد استهلاكه     |
| Memory                 | -            | احدد استهلاكه     |

---
# Docker

![[Pasted image 20260815121131.png]]

- الـDocker Client 
	- عبارة عن commadns docker الي بتستخدمها في الكتابة 
- الـDocker Engine 
	- دا الي بيستقبل ال Request وبيبدأ يظبطه ليك

![[Pasted image 20260815121327.png]]

الDocker daemon عبارة عن APIs وشوية فيتشر وتكلمه عن طريق ال Commands ويدريكتها لل Containerd

> اي حاجه اسمها daemon معاناها انه شغال فالخلفية 

الـContainer-d دا بيعمل حاجه شبه شغل ال Hypervisor في ال Virtualization ودا عبارة عن ال Supervisor بتاع ال Contatiners يعمل ويمسح وكل حاجه

---

علشان يبدا يشغل ال container فهو هيبدأ يكريت حاجتين 
- الـshim ودي الي هتفضل موجودة 
	- ودي فكرتها انها عبارة عن Process بتشغل ال daemonless containers

الي بيحصل: ال Container-d يبدا يشغل ال shim وال shim يبدا يشغل ال runc وال runc دا بيكريت ال Container بعد ما ينسق دا مع ال Kernal وياخد منه ال resouces بعد كدا ال runc بيوقف 

فيفضل الموجودين هما ال shim - container ولما ال container-d يحب يعمل حاجه ف ال container يعملها عن طريق ال shim

---
## ما هو OCI؟

**OCI = Open Container Initiative**

هي **مجموعة Standards أو Specifications** خاصة بالـContainers.

يعني OCI مبتشغلش Container بنفسها، لكنها بتقول:

> لو هتعمل Container Image أو Container Runtime، فيه مواصفات وقواعد معينة لازم تتبعها.

بشكل بسيط:

```text
OCI = Rules / Standards 
```

ومن أهم الـSpecifications:

### 1. Image Specification

بتحدد شكل الـContainer Image.

يعني الـImage تتكون إزاي، والـLayers والـConfiguration والـMetadata يكونوا منظمين إزاي.

### 2. Runtime Specification

بتحدد **إزاي الـContainer المفروض يتشغل**.

وهنا تبدأ علاقتها بـ **runc**.

---

### طيب ما هو runc؟

**runc** هو:

> Low-level Container Runtime

وظيفته الأساسية هي **إنشاء وتشغيل الـContainers**.

لكن إزاي يعمل Container؟

هنا بيستخدم Features موجودة في الـLinux Kernel، مثل:

- Namespaces → للعزل
    
- cgroups → للتحكم في الموارد
    

يعني بصورة مبسطة:

```text
runc
 │
 ├── Creates Namespaces
 │      ├── PID Namespace
 │      ├── Network Namespace
 │      ├── Mount Namespace
 │      └── وغيرها
 │
 └── Configures cgroups
        ├── CPU Limits
        ├── Memory Limits
        └── Resource Control
```

ثم يشغّل الـProcess الخاصة بالـApplication داخل البيئة المعزولة دي.

---

## العلاقة الأساسية بين OCI و runc

هنا النقطة المهمة جدًا:

> **الـOCI وضعت الـRuntime Specification، وrunc هو Implementation للـSpecification دي.**


---
## طب Docker فين من كل ده؟

ناس كتير بتفتكر إن:

```text
Docker → يشغل الـContainer مباشرة
```

لكن الصورة الداخلية الحديثة بشكل مبسط أقرب إلى:

```text
Docker
   │
   ▼
containerd
   │
   ▼
runc
   │
   ▼
Linux Kernel
   │
   ├── Namespaces
   ├── cgroups
   └── Other Kernel Features
```

خلينا نفهم دور كل واحد:

### Docker

بيوفر لك الـواجهة والأوامر:

```bash
docker run nginx
```

أنت بتتعامل مع Docker.

---

### containerd

مسؤول عن إدارة Lifecycle بتاع الـContainer بشكل أوسع، مثل التعامل مع:

- Images
- Containers
- Storage
- Container lifecycle
    

ثم يستخدم Runtime مناسب للتشغيل.

---

### runc

هو الـLow-Level Runtime اللي بينزل لمستوى أقرب للـKernel ويشغّل الـContainer فعليًا.

بصورة مبسطة:

```text
docker run nginx
       │
       ▼
Docker Engine
       │
       ▼
containerd
       │
       ▼
runc
       │
       ▼
Linux Kernel Features
       │
       ├── Namespaces
       │     → Isolation
       │
       └── cgroups
             → Resource Control
       │
       ▼
 nginx Process Running
```

وده مهم جدًا: **في النهاية الـContainer مش Magic ولا هو VM**.

هو في الأساس **Process أو مجموعة Processes** تم إعدادها لتعمل داخل بيئة معزولة، مع التحكم في الموارد التي تستخدمها.

| **OCI**              | يضع الـStandards والمواصفات                             |
| -------------------- | ------------------------------------------------------- |
| **OCI Runtime Spec** | تحدد كيفية وصف وتشغيل الـContainer                      |
| **runc**             | Implementation للـOCI Runtime Spec                      |
| **containerd**       | يدير Lifecycle والـContainers ويستخدم Runtime للتشغيل   |
| **Docker**           | منصة وواجهة لإدارة وبناء وتشغيل الـContainers           |
| **Namespaces**       | تعزل بيئة الـContainer                                  |
| **cgroups**          | تتحكم في استهلاك الموارد                                |
| **Linux Kernel**     | يوفر الـFeatures الأساسية التي يعتمد عليها الـContainer |

---

الرحلة بشكل عام:

```text
Dockerfile
    │
    │ docker build
    ▼
Docker Image
    │
    │ docker run
    ▼
Docker Container
```

يعني عندنا 3 عناصر أساسيين:

1. **Dockerfile** → Instructions
2. **Docker Image** → Template جاهز
3. **Docker Container** → النسخة التي تعمل فعليًا
    

---

## 1. Docker Image

الـ**Docker Image** هي عبارة عن **Template أو Blueprint** بنستخدمه لإنشاء الـContainers.

مثلًا لما يكون عندك:

```text
ubuntu.iso
```

تقدر تستخدمه لتثبيت أو إنشاء نظام Ubuntu على جهاز أو Virtual Machine.
وبعد ما تستخدم نفس الـISO أكثر من مرة، ممكن تعمل أكتر من جهاز:

```text
Ubuntu ISO
    │
    ├── VM 1
    ├── VM 2
    └── VM 3
```

بنفس الفكرة تقريبًا:

```text
Docker Image
    │
    ├── Container 1
    ├── Container 2
    └── Container 3
```

إذن التشبيه الأساسي:

> **ISO : Virtual Machine تقريبًا مثل Image : Container**

---
### الـImage بتحتوي على إيه؟

مثلًا عندك تطبيق ASP.NET.

التطبيق يحتاج:

- Linux Filesystem
- .NET Runtime
- Application Files
- Libraries
- Dependencies
    

ممكن يكون شكل الـImage كالتالي:

```text
ASP.NET Docker Image
│
├── Base Image
│   └── Linux Filesystem
│
├── .NET Runtime
│
├── Application Files
│
├── Libraries
│
└── Dependencies
```

فالـImage بتكون جاهزة، ولما تحتاج تشغل التطبيق، تنشئ منها Container.

---

## 2. الـDockerfile

الـDockerfile هو ملف يحتوي على **Instructions** أو تعليمات بتقول لـDocker:

> ابنِ لي الـImage بالشكل ده.

مثلًا:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY . .

ENTRYPOINT ["dotnet", "MyApp.dll"]
```

بشكل مبسط، Docker يقرأ التعليمات:

```text
Dockerfile
    │
    │ Instructions
    ▼
Docker
    │
    │ docker build
    ▼
Docker Image
```

يعني:

> **Dockerfile = Recipe / Instructions**

و:

> **Docker Image = الناتج الجاهز من تنفيذ الـInstructions**

---
## 3. الـContainer

الـ**Container** هو الـInstance التي يتم إنشاؤها من الـImage.
يعني لو عندك:

```text
nginx Image
```
وعملت:
```bash
docker run nginx
```

بيتم إنشاء Container وتشغيله.
بشكل مبسط:

```text
nginx Image
     │
     │ docker run
     ▼
nginx Container
     │
     ▼
nginx Process Running
```

وممكن تستخدم نفس الـImage لإنشاء عدة Containers:

```text
              nginx Image
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
    Container 1 Container 2 Container 3
```
كل Container مستقل في:
- Processes
- Network
- Filesystem state
- Configuration
- Resource limits
لكنهم جميعًا بدأوا من نفس الـImage.

---
## الفرق المهم بين Image و Container

### الـImage

الـImage تعتبر **Static Template**.

بشكل عام هي:

- جاهزة للبناء
    
- تستخدم لإنشاء Containers
    
- لا تعتبر Application شغال بنفسها
    

```text
Image
│
└── Template جاهز
```

---
### الـContainer

الـContainer هو:

> نسخة Runtime من الـImage.

يعني Application فعليًا شغال.

```text
Container
│
├── Running Process
├── Runtime Configuration
└── Writable State
```

مثال:

```bash
docker run nginx
```

بعد الأمر:

```text
Image: nginx
        │
        ▼
Container: Created
        │
        ▼
nginx: Running
```

---
## Image Layers

الـDocker Image نفسها غالبًا مكونة من Layers.

مثلًا:

```text
Docker Image
│
├── Layer 1 → Base OS
├── Layer 2 → Install .NET
├── Layer 3 → Install Dependencies
└── Layer 4 → Copy Application
```

وده بيحصل أثناء الـBuild.

لو عندك Dockerfile:

```dockerfile
FROM ubuntu

RUN apt update
RUN apt install -y curl

COPY . /app
```

بشكل مبسط:

```text
FROM ubuntu
      │
      ▼
Layer 1
      │
RUN apt update
      │
      ▼
Layer 2
      │
RUN install curl
      │
      ▼
Layer 3
      │
COPY /app
      │
      ▼
Layer 4
```

وفي النهاية:

```text
Final Docker Image
```

---
### ليه الـLayers مهمة؟
لأنها تساعد في
#### 1. إعادة الاستخدام
لو عندك Image:

```text
Ubuntu
+
.NET Runtime
+
App A
```
وImage أخرى:

```text
Ubuntu
+
.NET Runtime
+
App B
```
الـLayers المشتركة ممكن يعاد استخدامها بدل تحميل أو تخزين كل شيء من البداية.

---
#### 2. سرعة الـBuild

لو عدلت في Application فقط:

```text
App Code Changed
```

مش لازم تعيد بناء كل الـLayers السابقة لو لم تتغير.

Docker ممكن يستفيد من الـBuild Cache.

بشكل مبسط:

```text
Layer 1 → Cached
Layer 2 → Cached
Layer 3 → Cached
Layer 4 → Rebuild
```

---
# Self-Healing Containers

في عالم الـContainers، لو عندك Application شغال داخل Container وحصلت مشكلة، السؤال هو:

> **إيه اللي هيحصل لو الـContainer وقف؟**

بدون أي آلية Self-Healing:

```text
Application Running
       │
       ▼
Application Crashes
       │
       ▼
Container Stops
       │
       ▼
Service Down
       │
       ▼
Admin يتدخل يدويًا
       │
       ▼
docker start container
```

وده معناه إن الخدمة هتفضل واقعة لحد ما شخص يلاحظ المشكلة ويشغلها.

---
## إزاي Docker بيساعد في Self-Healing؟
Docker بيوفر حاجة اسمها:
### Restart Policy

دي Policy بتحدد لـDocker:

> لو الـContainer وقف، أعمل إيه؟

أنت بتحددها عند إنشاء الـContainer:

```bash
docker run --restart=<policy> image-name
```

مثال:

```bash
docker run -d \
  --name webapp \
  --restart=always \
  nginx
```

هنا أنت بتقول لـDocker:

> راقب حالة الـContainer، ولو توقف، حاول تشغله مرة تانية.

---
## الحالات المختلفة للـSelf-Healing في Docker

### 1. الـContainer يقع بسبب Error

### 2. الـContainer يتوقف لأي سبب

---

## ماذا لو الـDocker نفسه وقع؟

تخيل:

```text
Server
└── Docker
    └── Container
        └── Application
```

والـDocker daemon حصل له:

```text
Docker daemon Stops
```

أو الـServer اتعمله Restart.

بعد ما النظام وDocker يرجعوا:

```text
Server Restart
      │
      ▼
Operating System Starts
      │
      ▼
Docker Starts
      │
      ▼
Docker checks Restart Policy
      │
      ▼
Start Containers Again
```

مثلًا مع:

```bash
--restart=always
```

الخدمة تقدر ترجع تشتغل تلقائيًا.

وده مهم جدًا في الـProduction.

---
## للـ4 Restart Policies

### `no` -> ال Default

```bash
--restart=no
```

معناها:

> لا تعمل Restart تلقائي.

```text
Container Crashes
       ↓
Stopped
```

وأنت تشغله بنفسك.

---

### `on-failure`

```bash
--restart=on-failure
```

معناها:

> أعد تشغيل الـContainer إذا انتهى ==بسبب Failure،== عادةً بخروج الـProcess الرئيسي بكود غير صفر.

```text
App Crashes
Exit Code ≠ 0
       ↓
Restart 
```

ويمكن تحديد عدد المحاولات:

```bash
--restart=on-failure:5
```

يعني يحاول حتى 5 مرات.

---

### `always`

```bash
--restart=always
```

معناها:

> أعد تشغيل الـContainer تلقائيًا عند توقفه، واستعد تشغيله عند عودة Docker بعد إعادة تشغيل الـDaemon أو الـHost وفق سلوك الـPolicy.

```text
Container Stops
       ↓
Restart 
```

---

### `unless-stopped`

```bash
--restart=unless-stopped
```

معناها:

> أعد تشغيله تلقائيًا، ==إلا إذا أنا أوقفته يدويًا.==

```text
Container Crashes
       ↓
Restart 🔄
```

لكن لو:

```bash
docker stop webapp
```

ثم الـHost عمل Restart، يظل متوقفًا.

---
# 1. تثبيت Docker على CentOS

## إزالة أي نسخ قديمة

```bash
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

## تثبيت المتطلبات

```bash
sudo yum install -y yum-utils
```

## إضافة Docker Repository

```bash
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

## تثبيت Docker

```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

## تشغيل Docker

```bash
sudo systemctl start docker
```

## التأكد من حاله
أو:

```bash
docker --version
```

---
# 2. بعض أهم Docker Options

## تشغيل Container

```bash
docker run IMAGE
```

مثال:

```bash
docker run nginx
```

---

## تشغيل في الخلفية `-d`

```bash
docker run -d nginx
```

`-d` = Detached Mode

يعني الـContainer يشتغل في الخلفية.

---

## إعطاء Container اسم `--name`

```bash
docker run --name webserver nginx
```

بدل ما Docker يولد اسم عشوائي.

---

## تشغيل Interactive باستخدام `-it`

```bash
docker run -it ubuntu bash
```

- `-i` → Interactive
    
- `-t` → Terminal
    

مفيدة لو عايز تدخل على الـContainer وتتفاعل معها.

---

## عمل Port Mapping باستخدام `-p`

```bash
docker run -p 8080:80 nginx
```

الصيغة:

```text
HOST_PORT:CONTAINER_PORT
```

يعني:

```text
Host:8080
    │
    ▼
Container:80
```

---

## تحديد Restart Policy

```bash
docker run --restart=always nginx
```

أهم الحالات:

```text
no
always
unless-stopped
on-failure
```

---

# 3. عرض الـContainers

## عرض الـRunning Containers فقط

```bash
docker ps
```

## عرض كل الـContainers

بما فيها المتوقفة:

```bash
docker ps -a
```

---

# 4. إيقاف Container

```bash
docker stop CONTAINER_NAME
```

مثال:

```bash
docker stop webserver
```

---

# 5. تشغيل Container متوقفة

```bash
docker start CONTAINER_NAME
```

مثال:

```bash
docker start webserver
```

---

# 6. حذف Container

لازم غالبًا توقف الـContainer الأول:

```bash
docker stop webserver
```

ثم:

```bash
docker rm webserver
```

أو تحذفها مباشرة باستخدام Force:

```bash
docker rm -f webserver
```

---

# 7. حذف أكثر من Container

لو عندك Containers:

```text
webapp
database
redis
```

ممكن:

```bash
docker rm webapp database redis
```

أو باستخدام IDs:

```bash
docker rm ID1 ID2 ID3
```

## حذف كل الـContainers المتوقفة

```bash
docker container prune
```

## حذف كل الـContainers

```bash
docker rm -f $(docker ps -aq)
```

الأمر:

```bash
docker ps -aq
```

بيجيب IDs لكل الـContainers، وبعدها `docker rm -f` يحذفهم.

---

# 8. عرض الـImages

```bash
docker images
```

أو:

```bash
docker image ls
```

---

# 9. حذف Image

```bash
docker rmi IMAGE_NAME
```

مثال:

```bash
docker rmi nginx
```

أو باستخدام الـImage ID:

```bash
docker rmi IMAGE_ID
```

مثال:

```bash
docker rmi abc123
```

---

# 10. حذف أكثر من Image

```bash
docker rmi nginx ubuntu redis
```

أو:

```bash
docker rmi IMAGE_ID1 IMAGE_ID2 IMAGE_ID3
```

---

# 11. حذف كل الـUnused Images

```bash
docker image prune
```

ولو عايز تحذف كل الـImages غير المستخدمة بواسطة أي Container:

```bash
docker image prune -a
```

---

# 12. حذف كل الـImages

لو مفيش Containers بتستخدمها:

```bash
docker rmi $(docker images -q)
```

ولو فيه Containers مرتبطة بالـImages، احذف الـContainers الأول:

```bash
docker rm -f $(docker ps -aq)
```

ثم:

```bash
docker rmi $(docker images -q)
```

---