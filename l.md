# Kubernetes — أجندة اليوم

- **Overview**
  - Kubernetes Components
  - Objects in Kubernetes
    - Kubernetes Object Management
    - Object Names and IDs
    - Labels and Selectors
    - Namespaces
    - Annotations
    - Field Selectors
    - Finalizers
    - Owners and Dependents
    - Recommended Labels
    - Storage Versions

---

## 1. Overview

Kubernetes هي منصة بتدير الـ **Containerized Workloads** والـ **Services** الي ممكن تكون محتاجة Configurations و Automations.

**طب ايه هو الـ Containerized Workload؟**
دا عبارة عن Services و Applications محطوطة جوا Containers، وانت بتديرهم وبتدير التعامل معاهم بحيث Kubernetes يقدر:

- يشغلك الـ Containers
- يزود عدد النسخ أو يقللها
- يعمل restart (Self-Healing) لو الـ Container وقع
- يوزع الـ workload على الـ nodes
- يراقب الـ health
- يعمل rolling updates
- يربط الخدمات ببعض

### مثال: E-Commerce Project

لو عندك مشروع مقسّم لـ:

- Frontend
- Backend
- Database
- Caching (Redis)

هتقسمه لـ 4 Pods (هنتكلم عن الـ Pods بعدين):

- Container للـ Frontend
- Container للـ Backend
- Container للـ Database
- Container للـ Redis

> **ملاحظة:** الـ Pod مش لازم يكون جواه Container واحد بس — ممكن يكون فيه أكتر من Container مرتبطين ببعض، والـ Kubernetes هو اللي بيدير الـ Pods دي.
>
> وكمان مش شرط تحط الـ Database نفسها جوه Kubernetes — ده قرار بيعتمد على الـ architecture بتاعت المشروع، وممكن تستخدم Database managed service برا الـ cluster.

### ليه ممكن تحتاجه وهتستخدمه في إيه؟

الـ Containers طريقة كويسة علشان تشغل بيها المشاريع، وفي الـ production محتاج تنظمهم بحيث تتأكد إن مفيش وقت توقف — لو وقع container يلحقك في حاجة تشتغل بدله.

فـ Kubernetes بيساعدك تدير الـ workloads على مجموعة nodes، ويتعامل مع الـ scaling والـ failover، وبيقدملك:

| الميزة | الشرح |
|---|---|
| **Service Discovery & Load Balancing** | بيوفر طريقة إن الـ Services تلاقي وتتواصل مع بعض، وبيوزع الـ network traffic على الـ Pods اللي ورا الـ Service علشان يفضل الوصول للـ application مستقر حتى لو عندك أكتر من Pod. |
| **Storage Orchestration** | بيديك الحرية تختار وحدة التخزين (لوكال أو كلاود)، وبيربط ويدير الـ storage resources تلقائيًا. |
| **Automated Rollouts & Rollbacks** | بينقل الـ application من version قديم لجديد بالتدريج (Rollout)، ولو حصلت مشكلة تقدر تعمل Rollback للـ version القديم. |
| **Automatic Bin Packing (Resource Allocation)** | بيوفر مجموعة nodes تشغّل الـ workload، وتقدر تحدد الـ CPU/RAM (Requests & Limits) لكل Container، وهو يستخدمها في اختيار الـ node المناسبة. |
| **Self-Healing** | بيعمل restart أو replace للـ Containers/Pods اللي فشلت، وبيعمل kill للـ Containers اللي مش بترد على health checks، ومش بيعتبر الـ Pod جاهز لاستقبال traffic غير لما الـ readiness check يقول إنه جاهز. |
| **Configuration Management** | تقدر تنظم الـ sensitive information (passwords, OAuth tokens, SSH keys) باستخدام Secrets، وتدير الإعدادات باستخدام ConfigMaps، وتعدل من غير ما تعيد بناء الـ Container Images. |
| **Batch Execution** | بيدير الـ Batch Workloads زي Jobs و CronJobs، وممكن يعيد تشغيل الـ Pods الخاصة بالـ Job لو فشلت حسب الـ configuration. |
| **Scaling Up/Down** | تقدر توسع أو تقلل المشروع بكوماند بسيط، UI، أو تلقائيًا بناءً على استهلاك الـ CPU. |
| **IPv4/IPv6 Dual-Stack** | بيدعم تشغيل الـ Pods والـ Services بـ IPv4 و IPv6 مع بعض في نفس الـ cluster. |
| **Extensibility** | تقدر تضيف features/extensions من غير ما تعدل في الـ source code، وتوسع الـ API والـ functionality باستخدام extensibility mechanisms. |

### إيه اللي مش بيعمله Kubernetes؟

باختصار، Kubernetes مش منصة بتجيبلك كل حاجة جاهزة من الـ deployment لحد الـ database والـ monitoring والـ logging في مكان واحد. هو بيشتغل على مستوى الـ Containers مش الـ Hardware، وبيوفر حاجات موجودة عادة في الـ PaaS (deployment, scaling, load balancing)، بس مش Monolithic — بيديك الـ building blocks اللي تقدر تبني بيها Developer Platform وتختار أدواتك.

بالتفصيل، Kubernetes:

- **Does not limit the types of applications supported** — مش بيحدد نوع معين من الـ applications، بيدعم Stateless و Stateful و Data Processing Workloads. لو الـ application يشتغل جوه Container، المفروض يشتغل كويس على Kubernetes.
- **Does not deploy source code and does not build your application** — مش بياخد الـ source code ويبنيه Image. الـ build والـ CI/CD (GitHub Actions, GitLab CI, Jenkins...) مسؤوليتك انت ومنظمتك.
- **Does not provide application-level services** — مفيش Message Bus، Database، Redis، أو Spark جاهزين كـ built-in services. تقدر تشغلهم كـ workloads جوه Kubernetes، أو تتعامل مع services برا الـ cluster.
- **Does not dictate logging, monitoring, or alerting solutions** — بيوفر integrations ومكانيزمات لجمع الـ metrics، لكن انت اللي بتختار الأدوات.
- **Does not provide nor mandate a configuration language/system** — بيوفر Declarative API، وانت تختار الطريقة المناسبة لوصف الـ Desired State.
- **Does not provide nor adopt comprehensive machine configuration/management/self-healing systems** — بيدير الـ workloads والـ containers، مش الـ Machines نفسها.
- **Kubernetes is not a mere orchestration system** — الـ orchestration التقليدي معناه Workflow محدد ("اعمل A، وبعدين B، وبعدين C") ينفَّذ بالترتيب. لكن Kubernetes عنده مجموعة من الـ independent composable control processes بتفضل تراقب الـ Current State وتحاول تخليه مطابق للـ Desired State — مش مهم بالنسبة لك هو وصل بإيه بالظبط.

  مثال:
  ```text
  Desired State: 3 Pods
  Current State: 2 Pods
  ```
  Kubernetes يلاحظ إن فيه Pod ناقص ويحاول يخلي الـ Current State = 3 Pods.

  يعني بدل "اعمل إيه بالترتيب"، انت بتقوله "أنا عايز النتيجة النهائية تكون إيه"، وهو يحافظ على الحالة دي باستمرار — وده اللي بيدّيه مرونة وقابلية توسع وresilience أكتر من نظام Workflow ثابت.

---

## 2. Historical Context

### Traditional Deployment Era

الشركات كانت بتشغل الـ Applications على **Physical Servers**. المشكلة: مفيش طريقة كويسة لعمل Resource Boundaries لكل Application على نفس السيرفر — فممكن App واحدة تاخد معظم الـ CPU/RAM وتأثر على الباقي.

الحل البدائي: سيرفر لكل Application — لكن ده مش scalable: سيرفرات كتير، resources مش مستغلة بالكامل، وتكلفة عالية.

### Virtualized Deployment Era

ظهر الـ **Virtualization**: يشغّل أكتر من Virtual Machine (VM) على نفس الـ Physical Server، وكل VM معزولة عن التانية، وعندها OS كامل خاص بيها وLibraries وApplications، وتشتغل فوق Virtualized Hardware.

الفوائد:

- استخدام أفضل للـ Resources
- Scalability أحسن
- إضافة/تحديث Applications أسهل
- تقليل تكلفة الـ Hardware
- عزل أكبر بين الـ Applications

### Container Deployment Era

الـ **Containers** شبه الـ VMs في العزل، لكن الـ Isolation أخف لأنها بتشارك نفس الـ OS Kernel — وده يخليها Lightweight مقارنة بالـ VMs (أسرع startup واستهلاك resources أقل عادة).

الـ Container عنده حاجات خاصة بيه (filesystem, CPU, memory, process space) لكن من غير Kernel مستقل. ولأنه decoupled عن الـ infrastructure، تقدر تنقل نفس الـ Image بين بيئات مختلفة (Cloud / On-Premises) طالما فيه Container Runtime مناسب.

**فوائد الـ Containers:**

- **Agile application creation and deployment** — إنشاء وتشغيل أسرع وأسهل من الـ VM Images.
- **Continuous development, integration, deployment** — Build/Deployment موثوق ومتكرر، وRollback سريع لأن الـ Images immutable (لو عايز version جديدة، تعمل Image جديدة).
- **Dev/Ops separation of concerns** — الـ Developers يعملوا Image فيه الـ Application والـ Dependencies وقت الـ Build/Release، بدل ما الـ Ops يجهزوا الـ Application وقت الـ Deployment.
- **Observability** — مراقبة على مستوى OS وعلى مستوى Application Health.
- **Environmental consistency** — نفس الـ Image في Dev/Test/Production ("اشتغل عندي مبيشتغلش عندك" أقل).
- **Cloud and OS distribution portability** — يشتغل على توزيعات وبيئات مختلفة طالما فيه Container Runtime.
- **Application-centric management** — التفكير في تشغيل Application بموارد منطقية بدل OS فوق Hardware افتراضي.
- **Loosely coupled, distributed, elastic micro-services** — تقسيم الـ Application لـ Services صغيرة مستقلة بدل Monolith واحد.
- **Resource isolation** — Performance أكثر قابلية للتوقع.
- **Resource utilization** — أخف من الـ VMs، فتقدر تشغل Applications أكتر على نفس الـ Infrastructure.

---

## 3. Kubernetes Components

### الـ Cluster

مجموعة من الـ **Nodes** متجمعة مع بعض، وKubernetes بيديرهم كـ Environment واحدة لتشغيل الـ workloads. الـ Cluster بيتكون من:

1. **Control Plane** — الحاجة اللي بتدير الـ Cluster ومنها Kubernetes بيعرف: الـ Desired State، الـ Pods/Nodes الموجودة، الـ workloads هيشتغل فين، وإزاي يحافظ على الحالة المطلوبة.
2. **Worker Nodes** — الـ Machines اللي بتشغل الـ workloads فعليًا.

### Control Plane Components

| Component | الوظيفة |
|---|---|
| **kube-apiserver** | الـ entry point اللي بنتعامل من خلاله مع الـ Kubernetes HTTP API. |
| **etcd** | Key-Value database بتخزن بيانات الـ Cluster وحالة الـ resources، لازم تكون consistent و highly available. |
| **kube-scheduler** | بيبص على الـ Pods اللي لسه متحطتش على Node، ويختارلها الـ suitable Node. |
| **kube-controller-manager** | بيشغل الـ Controllers اللي تراقب الـ current state وتحاول تخليه مطابق للـ desired state. |
| **cloud-controller-manager** *(optional)* | يخلي Kubernetes يتعامل مع الـ Cloud Provider اللي انت مستخدمه. |

### Node Components

| Component | الوظيفة |
|---|---|
| **kubelet** | الـ agent الشغال على كل Node، بيضمن إن الـ Pods المطلوبة شغالة بما فيها الـ Containers اللي جواها. |
| **kube-proxy** *(optional)* | مسؤول عن الـ network rules على الـ Node لتنفيذ الـ Services والـ traffic بتاعها. |
| **Container runtime** | البرنامج المسؤول فعليًا عن تشغيل الـ Containers (مثل containerd أو CRI-O). |

### Addons

حاجات بتضيف Features، لكنها مش من الـ core components:

- **DNS** — Cluster-wide DNS للـ Services والـ workloads.
- **Web UI (Dashboard)** — واجهة لإدارة ومتابعة الـ Cluster.
- **Container Resource Monitoring** — جمع وتخزين Metrics.
- **Cluster-level Logging** — تجميع الـ Logs في مكان مركزي.

### Flexibility in Architecture

Kubernetes مرن في طريقة توزيع وإدارة الـ Components حسب احتياجاتك — من Cluster بسيطة للـ Development، لـ Architecture أكبر وموزعة للـ Production والـ Large-scale environments.

---

## 4. Objects in Kubernetes

الـ Kubernetes Objects عبارة عن **Persistent Entities** جوه Kubernetes، بيستخدمها لتمثيل الـ state بتاع الـ cluster: إيه الـ Containerized Applications الشغالة، شغالة على أنهي Nodes، الـ Resources المتاحة، والـ Policies (Restart Policies, Upgrades, Fault-tolerance).

**الفكرة الأهم:** الـ Object يعتبر **Record of Intent** — لما تعمل Object، انت بتقول لـ Kubernetes: *"أنا عايز الـ Cluster تكون بالشكل ده"* (Desired State)، وKubernetes يفضل يحاول يخلي الـ Current State مطابق لها.

الـ Create/Modify/Delete بيتم عن طريق الـ **Kubernetes API**، ولو بتستخدم `kubectl` فهو اللي بيعمل الـ API calls دي نيابة عنك.

### Object Spec and Status

معظم الـ Objects عندها:

- **`spec`** → الـ **Desired State**: انت عايز الـ Object يكون عامل إزاي.
- **`status`** → الـ **Current State**: Kubernetes بيحدثها حسب اللي بيحصل فعليًا.

الـ Control Plane يفضل يقارن بينهم ويحاول يخلي `Current State = Desired State`.

مثال:

```yaml
spec:
  replicas: 3
```

يعني "أنا عايز 3 replicas شغالين" (الـ replicas = نسخ طبق الأصل من الـ Application).

```text
Desired State: 3 Pods    Current State: 3 Pods   → تمام

Desired State: 3 Pods    Current State: 2 Pods   → Kubernetes يلاحظ الفرق
                                                     ويشغّل Replacement Pod
```

### Describing a Kubernetes Object (Manifest)

بتوصف الـ Object في ملف **Manifest** (غالبًا YAML، وممكن JSON). مثال Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment

spec:
  selector:
    matchLabels:
      app: nginx

  replicas: 2

  template:
    metadata:
      labels:
        app: nginx

    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

```bash
kubectl apply -f deployment.yaml
```

`kubectl` بياخد الـ YAML ويبعته للـ API Server، وهو اللي يستقبل الـ request ويتعامل مع الـ Object.

> الـ YAML دي مجرد طريقة توصف بيها الـ Object — انت مش بتكتب كود بيتنفذ بالترتيب، بل بتوصف "أنا عايز Deployment بالشكل ده" وKubernetes هو اللي يتصرف علشان يحقق ده.

**شرح الحقول بالترتيب:**

| الحقل | الشرح |
|---|---|
| `apiVersion: apps/v1` | أنهي version من الـ Kubernetes API هيستخدم. هنا `apps/v1` يعني الـ Deployment تابع لـ API group اسمها `apps` بـ version `v1` — مش نسخة Kubernetes نفسها. |
| `kind: Deployment` | نوع الـ Object المطلوب (ممكن تكون `Pod`, `Service`, `ConfigMap`, إلخ). |
| `metadata.name` | اسم الـ Object، مثل `nginx-deployment` — وده اللي يظهر في `kubectl get deployments`. ممكن تحتوي `metadata` كمان على `namespace` و`labels`. |
| `spec` | الـ Desired State للـ Object — وجواها تفاصيل الـ Deployment. |
| `replicas: 2` | عدد الـ Pods المطلوب الحفاظ عليها. لو Pod وقع (Desired=2, Current=1) الـ Deployment/ReplicaSet controllers هيعملوا Pod جديدة. |
| `template` | الـ **Pod Template**: بيوصف إزاي الـ Deployment يعمل الـ Pods (`Deployment → Pod Template → labels + containers`). بما إن `replicas: 2`، هيستخدم نفس الـ Template لعمل 2 Pods متطابقين. |
| `template.metadata.labels` | الـ Labels اللي هتتحط على كل Pod يطلع من الـ Template (هنا `app=nginx`). مهمة جدًا لأن Kubernetes بيستخدمها لربط الـ Resources ببعض. |
| `selector.matchLabels` | يحدد إن الـ Deployment مسؤول عن الـ Pods اللي عندها Label معين. لازم يكون فيه تطابق بين الـ `selector` وبين الـ Labels في الـ `template`. |
| `spec.containers` (جوه الـ template) | يحدد الـ Container(s) جوه الـ Pod — لاحظ إن `spec` هنا مختلفة عن `spec` بتاعة الـ Deployment نفسها؛ دي بتاعة الـ Pod Template. |
| `image: nginx:1.14.2` | الـ Container Image المستخدَمة (`nginx` = الاسم، `1.14.2` = الـ Tag). |
| `ports.containerPort: 80` | الـ Port اللي الـ Container بيسمع عليه. **ملاحظة مهمة:** ده مجرد معلومة عن الـ Port، ومش بيخلي الـ Application متاحة من برا الـ Cluster — ده محتاج **Service**. |

### Required Fields

في أغلب الـ Manifests بتلاقي:

- `apiVersion` — الـ API version المستخدمة.
- `kind` — نوع الـ Object (Deployment, Pod, Service...).
- `metadata` — معلومات تعريف الـ Object (name, UID, namespace).
- `spec` — الـ Desired State.

> خد بالك إن شكل الـ `spec` بيختلف حسب نوع الـ Object — `spec` بتاعة الـ Pod مختلفة عن الـ Deployment ومختلفة عن الـ StatefulSet.

### Server-Side Field Validation

من Kubernetes v1.25، الـ API Server بيدعم **Server-side field validation** لاكتشاف Fields مش معروفة أو مكررة. `kubectl` عنده flag:

```bash
--validate
```

| القيمة | السلوك |
|---|---|
| `strict` (الـ default) | لو فيه مشكلة، الـ request يفشل. |
| `warn` | الـ validation تحصل بس المشكلة تظهر كـ warning والـ request يكمل. |
| `ignore` | مفيش server-side field validation. |

لو `kubectl` مش قادر يتصل بـ API Server بيدعم الميزة دي، ممكن يرجع لـ Client-side validation. من v1.27 وما بعده، الميزة متاحة بشكل دائم.

---

## 5. Kubernetes Object Management

فيه 3 طرق أساسية لإدارة الـ Objects باستخدام `kubectl` — والـ Object الواحد المفروض يتدار بطريقة واحدة بس، مينفعش تخلط بينهم لنفس الـ Object.

| Technique | بتشتغل على | الاستخدام |
|---|---|---|
| Imperative Commands | Live Objects | Development / حاجة سريعة |
| Imperative Object Configuration | Files | Production |
| Declarative Object Configuration | Directories of Files | Production |

### 1. Imperative Commands

تعامل مباشر مع الـ **Live Objects** بكوماند فيه العملية المطلوبة:

```bash
kubectl create deployment nginx --image=nginx
```

- **مميزاته:** سريع وسهل، مناسب للتجارب والـ one-off tasks، مش محتاج YAML.
- **عيوبه:** مفيش configuration محفوظة، صعب Change Review، مفيش audit/history كويس، مفيش template للاستخدام لاحقًا.

### 2. Imperative Object Configuration

الـ configuration في **YAML/JSON file**، وانت بتحدد العملية في الكوماند:

```bash
kubectl create -f nginx.yaml
kubectl delete -f nginx.yaml
kubectl replace -f nginx.yaml
```

- **مميزاته:** ممكن تحط الـ YAML في Git، Code Review سهل، Configuration محفوظة، ممكن تستخدمه كـ template.
- **عيوبه:** لازم تفهم الـ Object schema، `replace` ممكن يمسح تغييرات في الـ Live Object مش موجودة في الملف، أنسب للـ files مش directories.

### 3. Declarative Object Configuration

بتكتب الـ **Desired State** في ملفات configuration من غير ما تحدد لـ `kubectl` هيعمل Create/Update/Delete:

```bash
kubectl apply -f configs/
```

`kubectl` بيشوف الـ configuration ويقرر لكل Object محتاج Create / Update-Patch / Delete. يعني انت بتقول "عايز الـ Cluster تبقى بالشكل ده" وKubernetes يحاول يوصل للحالة دي.

```yaml
spec:
  replicas: 3
```

انت مش بتقول "اعمل Pod، وبعدين Pod، وبعدين Pod" — بتقول "عايز 3 replicas".

**مراجعة التغييرات قبل التطبيق:**

```bash
kubectl diff -f configs/
kubectl apply -f configs/
kubectl apply -R -f configs/   # يدخل جوه الـ subdirectories
```

- **مميزاته:** مناسب جدًا للـ Production، Configuration في files/Git، بيدعم directories، بيحدد تلقائيًا Create/Patch/Delete، التغييرات من writers تانيين ممكن تتحافظ باستخدام `patch` بدل `replace`.
- **عيوبه:** أصعب في الفهم والـ debugging لما يحصل unexpected behavior، الـ merge/patch operations ممكن تكون معقدة.

---

## 6. Object Names and IDs

كل Object عنده:

- **Name** — اسم الـ Object، Unique لنفس نوع الـ resource داخل الـ Namespace.
- **UID** — ID بيولده Kubernetes، Unique على مستوى الـ Cluster كله.

```text
Pod:        myapp-1234
Deployment: myapp-1234     ← عادي، لأنهم نوعين مختلفين
```

لكن مينفعش 2 Pods بنفس الاسم في نفس الـ Namespace. ولو حذفت Object، تقدر تعمل واحد جديد بنفس الاسم.

Kubernetes بيحدد الـ Object باستخدام:

```text
API Group + Resource Type + Namespace + Name
```

> الـ API Version مش جزء من الـ unique identity — مينفعش نفس الـ Object بنفس الاسم بـ `v1` و`v1beta1`.

### generateName

بدل تحديد اسم ثابت:

```yaml
name: nginx
```

تقدر تستخدم:

```yaml
generateName: nginx-
```

وKubernetes يضيف suffix تلقائي: `nginx-x7k92`.

### Name Constraints

معظم الـ resources أسماؤها لازم تكون DNS-compatible:

**DNS Subdomain**
- Max 253 حرف
- lowercase letters/numbers، `-` و `.`
- تبدأ وتنتهي بـ alphanumeric

**RFC 1123 / RFC 1035 Label**
- Max 63 حرف
- lowercase letters/numbers و `-`
- تبدأ بحرف، تنتهي بـ alphanumeric
- (الـ Service ممكن يبدأ برقم لو `RelaxedServiceNameValidation` مفعّل)

**Path Segment**
- مينفعش يكون `.` أو `..`
- مينفعش يحتوي `/` أو `%`

### UIDs

بيتولد تلقائيًا، وكل Object بيتعمل له UID مختلف — حتى لو Pod اتحذف واتعمل تاني بنفس الاسم:

- **Name** = اسم الـ Object الحالي
- **UID** = بيميز الـ Object نفسه عن أي Object تاريخي تاني بنفس الاسم

---

## 7. Labels

الـ Labels عبارة عن `key: value` بتتحط على الـ Objects:

```yaml
metadata:
  labels:
    environment: production
    app: nginx
```

بتُستخدم في: التنظيم، الـ Grouping، الـ Filtering، الـ Selecting. تقدر تضيف/تعدل Labels بعد إنشاء الـ Object، ومش لازم تكون Unique (عادي إن Objects كتير يكون عندها نفس الـ Label).

**أمثلة على أبعاد الـ Labels:**

```text
release: stable / canary
environment: dev / qa / production
tier: frontend / backend / cache
role: master / replica
```

### Labels vs Annotations

| | الاستخدام |
|---|---|
| **Labels** | معلومات للـ identification / selection / filtering. |
| **Annotations** | معلومات إضافية مش بتُستخدم في اختيار الـ Objects. |

### Label Selectors

طريقة Kubernetes لاختيار مجموعة Objects بناءً على Labels:

```bash
kubectl get pods -l app=nginx
```

**نوعين من الـ Selectors:**

**1. Equality-based**
' = ', ' == ' , ' != '


```text
environment=production
environment=production,tier!=frontend   ← الفاصلة (,) = AND
```

**2. Set-based** (`in`, `notin`, `exists`)

```text
environment in (production, qa)      ← production OR qa
tier notin (frontend, backend)       ← مش frontend ولا backend
partition                            ← الـ Label موجود
!partition                           ← الـ Label مش موجود
```

> مفيش `OR` operator مباشر (`||`)، لكن تقدر تعمل OR باستخدام `in`. والفاصلة `,` دايمًا بتعني AND.

### Service + Labels

الـ Service بيستخدم Label Selector عشان يعرف هيبعت Traffic لأنهي Pods:

```yaml
selector:
  app: nginx
```

### Deployment Selector

```yaml
selector:
  matchLabels:
    app: nginx
```

يعني الـ Deployment هيدير الـ Pods اللي عليها `app=nginx` — والـ Labels بتاعة الـ Pods اللي الـ Deployment بيعملها لازم تطابق الـ Selector.

### matchLabels + matchExpressions

```yaml
selector:
  matchLabels:
    component: redis

  matchExpressions:
    - key: tier
      operator: In
      values:
        - cache
```

- `matchLabels` = مطابقة مباشرة key/value.
- `matchExpressions` = شروط باستخدام `In` / `NotIn` / `Exists` / `DoesNotExist`.
- كل الشروط لازم تتحقق (AND).

### Label Filtering & Updating

```bash
kubectl get pods -l app=guestbook
kubectl get pods -l app=guestbook,role=replica     # app=guestbook AND role=replica
kubectl get pods -L app -L tier -L role            # عرض Labels كـ columns

kubectl label pods -l app=nginx tier=fe            # إضافة Label للـ Pods اللي عليها app=nginx
kubectl get pods -l app=nginx -L tier
```

---

## 8. Namespaces

الـ Namespace بيعمل isolation/تقسيم للـ Resources جوه نفس الـ Cluster:

```text
Cluster
  ├── dev
  ├── staging
  └── production
```

الـ Resource names لازم تكون **unique داخل نفس الـ Namespace**، لكن ممكن نفس الاسم يتكرر في Namespaces مختلفة:

```text
dev:        Pod = nginx      ← عادي
production: Pod = nginx      ← عادي

dev:        Pod → nginx
            Pod → nginx      ← مينفعش (تكرار جوه نفس الـ Namespace)
```

الـ Namespace نفسه مش بيكون جوه Namespace تاني، وكل Resource ممكن يكون في Namespace واحد فقط.

### Namespaced vs Cluster-wide Objects

| Namespaced | Cluster-wide |
|---|---|
| Pod, Deployment, Service | Node, PersistentVolume, StorageClass |

### إمتى أستخدم Multiple Namespaces؟

مفيدة لما يكون عندك: Teams مختلفة، Projects مختلفة، Users كتير، حاجة لتقسيم الـ Resources، أو Resource Quotas لكل مجموعة.

> مش لازم تعمل Namespace لكل version من نفس الـ Application (مثلًا nginx v1 و v2) — ممكن يكونوا في نفس الـ Namespace ونستخدم Labels للتمييز. وفي Production يُفضّل عدم الاعتماد على `default` Namespace.

### Initial Namespaces

Kubernetes بيبدأ بـ 4 Namespaces أساسية:

| Namespace | الوظيفة |
|---|---|
| `default` | الافتراضي لو مفيش Namespace محدد. |
| `kube-system` | خاص بـ Kubernetes system objects. |
| `kube-public` | Readable لكل الـ clients حتى غير authenticated — لحاجات ظاهرة على مستوى الـ Cluster. |
| `kube-node-lease` | بيحتوي Lease Objects الخاصة بالـ Nodes، تُستخدم كـ heartbeat لمعرفة حالة الـ Node. |

### Working with Namespaces

```bash
kubectl get namespace                          # أو: kubectl get ns
kubectl get pods --namespace=dev
kubectl run nginx --image=nginx --namespace=dev
```

### Setting Default Namespace

```bash
kubectl config set-context --current --namespace=dev
kubectl get pods                               # هيشتغل على dev تلقائيًا
kubectl config view --minify | grep namespace:
```

### Namespace + DNS

لما تعمل Service، Kubernetes بيعمل لها DNS name بالشكل:

```text
<service-name>.<namespace-name>.svc.cluster.local
```

مثال: `backend.production.svc.cluster.local`

- من نفس الـ Namespace: تقدر توصل باستخدام `backend` فقط.
- من Namespace تانية: تحتاج الـ FQDN الكامل.

ده مفيد إن نفس الـ configuration تشتغل في `dev` / `staging` / `production` من غير تعديل.

### Namespace Names

لازم تكون valid **RFC 1123 DNS label**. الـ prefix `kube-` محجوز لـ Kubernetes system namespaces — متعملش Namespace تبدأ بيه.

### Not All Objects Are in a Namespace

```bash
kubectl api-resources --namespaced=true
kubectl api-resources --namespaced=false
```

### Automatic Labelling

من v1.22، Kubernetes بيضيف تلقائيًا Label للـ Namespace:

```text
kubernetes.io/metadata.name=<اسم الـ namespace>
```

والـ Label ده **immutable**.

---

## 9. Annotations

بتُستخدم لإضافة **non-identifying metadata** — معلومات إضافية مش بتُستخدم لاختيار الـ Objects:

```yaml
metadata:
  annotations:
    imageregistry: "https://hub.docker.com/"
```

### Labels vs Annotations (تفصيل)

| Labels | Annotations |
|---|---|
| Identify / Group / Select / Filter (مثال: `app=nginx` ثم `kubectl get pods -l app=nginx`) | معلومات إضافية زي: Build information، Git commit، Release ID، Image info، Tool info، Logging/Monitoring info، URLs، Extra configuration |

> ممكن تستخدم Labels و Annotations مع بعض في نفس الـ Object.

### Annotation Syntax & Value

الصيغة: `key: value`، والـ key ممكن يكون `prefix/name` (الـ prefix اختياري).

على عكس الـ Labels، قيمة الـ Annotation ممكن تحتوي أي String — حتى spaces أو special characters أو JSON/YAML. لكن إجمالي الـ Annotations للـ Object الواحد لازم يكون ≤ **256 KiB**. الـ key/value نفسهم Strings دايمًا (مش Boolean/Number/List كأنواع مستقلة).

---

## 10. Field Selectors

بتسمحلك تفلتر الـ Objects باستخدام **fields داخل الـ Object نفسه**:

```text
metadata.name=my-service
metadata.namespace!=default
status.phase=Pending
```

```bash
kubectl get pods --field-selector status.phase=Running
```

### Label Selector vs Field Selector

| Label Selector | Field Selector |
|---|---|
| بيفلتر باستخدام `metadata.labels` — `kubectl get pods -l app=nginx` | بيفلتر باستخدام fields في الـ Object — `kubectl get pods --field-selector status.phase=Running` |

### Supported Fields

كل Resource بيدعم على الأقل `metadata.name` و`metadata.namespace`. باقي الـ fields بتختلف حسب النوع — مثلًا الـ Pod عنده:

```text
spec.nodeName
spec.restartPolicy
spec.schedulerName
spec.serviceAccountName
spec.hostNetwork
status.phase
status.podIP
status.podIPs
status.nominatedNodeName
```

لو استخدمت field مش مدعوم، Kubernetes هيرجع Error (مثلًا `foo.bar` مش مدعوم لـ Ingress).

### Operators

Field Selectors **مش بتدعم** `in` / `notin` / `exists` — دي موجودة في Label Selectors فقط.

```bash
kubectl get services --all-namespaces \
  --field-selector metadata.namespace!=default
```

### Chained Field Selectors

```bash
kubectl get pods \
  --field-selector=status.phase!=Running,spec.restartPolicy=Always
```

يعني: `status.phase != Running` **AND** `spec.restartPolicy = Always`.

### Multiple Resource Types

```bash
kubectl get statefulsets,services --all-namespaces \
  --field-selector metadata.namespace!=default
```

---

## 11. Finalizers

الـ Finalizer هو **Namespaced Key** بيخلي Kubernetes يستنى شروط معينة تتحقق قبل ما يعمل **Delete نهائي** للـ Resource (نفس فكرة الـ Finalizer في لغات البرمجة تقريبًا):

```yaml
metadata:
  finalizers:
    - example.com/finalizer-name
```

بتستخدم عشان الـ Controllers تعرف إنها لازم تعمل Cleanup لحاجات الـ Object كان مسؤول عنها قبل ما يتحذف.

### How Finalizers Work (Flow)

```text
DELETE Object
      ↓
API Server
      ↓
deletionTimestamp added        ← الـ Object "اتطلب حذفه"
      ↓
HTTP 202 Accepted               ← الطلب اتقبل، الحذف النهائي لسه ما حصلش
      ↓
Object = Terminating
      ↓
Controller performs cleanup     ← الـ Controller يشوف deletionTimestamp ويبدأ الـ Cleanup
      ↓
Controller removes Finalizer
      ↓
finalizers = empty
      ↓
Kubernetes deletes Object       ← الحذف يكتمل فعليًا
```

### استخدام Finalizers في Garbage Collection

قبل الحذف الفعلي، ممكن تحتاج: حذف API resources مرتبطة، تنظيف Infrastructure مرتبطة، تنفيذ Cleanup معين، أو التأكد إن الـ Resource مبقاش مستخدَم. الـ Finalizer نفسه عادة **مش بيحتوي على الكود** — هو مجرد Key، والـ Controller هو اللي يعرف يتصرف بناءً عليه.

**مثال: PersistentVolume Protection**

```yaml
metadata:
  finalizers:
    - kubernetes.io/pv-protection
```

```bash
kubectl delete pv my-pv
```

الـ PV مش هيتحذف فورًا — هيفضل `Terminating` لحد ما الـ Pod يبطل يستخدمه، وبعدها الـ Finalizer يتشال ويتحذف الـ PV فعليًا.

### ملاحظات مهمة عن الـ Finalizers

لما تعمل `DELETE Object`، Kubernetes:

1. يضيف `deletionTimestamp`.
2. يمنع إضافة Finalizer جديد بعد بداية الحذف (تقدر تشيل الموجودين، لكن مينفعش تضيف جديد).
3. لا تقدر تعدل `deletionTimestamp`.
4. **لا يمكن إحياء الـ Object** بعد طلب الحذف — الحل الوحيد هو حذف الـ Object القديم وعمل واحد جديد شبيه.

### Custom Finalizer Names

لازم تكون **publicly qualified**:

```text
✅ example.com/finalizer-name
❌ finalizer-name
```

الـ API Server بيرفض أي Custom Finalizer مش بالصيغة المطلوبة.

---

## 12. Owner References, Labels and Finalizers

### Labels vs Owner References

- **Labels** → Grouping / Selection / Tracking groups of related objects. مثلًا Job Controller ممكن يحط Labels على الـ Pods بتاعته عشان يعرف الـ Pods المرتبطة بيه.
- **Owner References** → بتحدد **العلاقة الحقيقية** (مين الـ Owner). لو الـ Pod عنده:

  ```yaml
  metadata:
    ownerReferences:
  ```

  بتشير للـ Job اللي عمله. لو الـ Job اتحذف والـ Pods لسه شغالة، Kubernetes يستخدم **Owner References وليس Labels** عشان يعرف الـ Pods المرتبطة ومحتاجة Cleanup.

### Finalizers + Owner References

Kubernetes بيتعامل مع الـ Finalizers أثناء Garbage Collection لما يكون فيه Owner References، وممكن الـ Finalizers تمنع حذف Object/Dependents لفترة أطول من المتوقع. لو Resource عالق في `Terminating`، افحص الـ Finalizers والـ Owner References لمعرفة السبب.

> **مهم جدًا:** ما تشيلش Finalizers يدويًا بدون فهم — الإزالة القسرية ممكن تمنع الـ Cleanup المطلوب من إنه يحصل. تشيله يدويًا فقط لما تكون فاهم وظيفته وعملت الـ Cleanup بطريقة تانية.

### Owners and Dependents

```text
ReplicaSet (Owner)
    ↓
  Pods (Dependents)
```

### Ownership vs Labels and Selectors

مثال: Service → EndpointSlices. الـ Service بيستخدم Labels عشان الـ Control Plane يعرف الـ EndpointSlices المرتبطة بيه، لكن كل EndpointSlice كمان عنده `ownerReferences` يحدد الـ Owner. ده بيساعد أجزاء Kubernetes المختلفة إنها ما تتدخلش في Objects مش هي المسؤولة عنها.

### Owner References in Object Specifications

الـ Owner Reference الصحيحة تحتوي على: Owner Name، Owner UID، وتكون ضمن علاقة صحيحة للـ Namespace. Kubernetes بيعملها تلقائيًا في: `ReplicaSet`, `DaemonSet`, `Deployment`, `Job`, `CronJob`, `ReplicationController` — مثلًا `Deployment → ReplicaSet → Pod`، وعادة مش محتاج تعمل العلاقات دي يدويًا.

### blockOwnerDeletion

```yaml
ownerReferences:
  - blockOwnerDeletion: true
```

Boolean بيتحكم هل الـ Dependent يقدر يمنع Garbage Collection من حذف الـ Owner ولا لأ. Kubernetes ممكن يحددها تلقائيًا لما Controller (زي Deployment Controller) هو اللي بيعمل الـ Owner Reference، وفيه Admission Controller بيتحكم في صلاحية المستخدم لتغييرها بناءً على صلاحيات Delete الخاصة بالـ Owner.

### Cross-Namespace Owner References

**ممنوعة تمامًا**:

- الـ **Namespaced Dependent** ممكن يكون Owner بتاعه في نفس الـ Namespace، أو Cluster-scoped Owner.
- الـ **Cluster-scoped Dependent** لا يمكن يكون عنده Namespaced Owner.

من v1.20، لو حصل كده، الـ Owner Reference تُعتبر غير قابلة للحل، والـ Dependent مش هيدخل Garbage Collection بشكل طبيعي. الـ Garbage Collector بيطلع Warning Event بالـ Reason:

```text
OwnerRefInvalidNamespace
```

```bash
kubectl get events -A --field-selector=reason=OwnerRefInvalidNamespace
```

### Cascading Deletion

نوعين، وKubernetes بيستخدم Finalizers في تنفيذهم:

**Foreground Deletion**
```text
Delete Owner → Delete Dependents أولًا → ثم Delete Owner
```
الـ Dependents اللي عندها `blockOwnerDeletion: true` ممكن تمنع حذف الـ Owner لحد ما يتم التعامل معها.

**Orphan Deletion**
```text
Delete Owner → Owner يتحذف، الـ Dependents تفضل موجودة (Orphaned)
```

---

## 13. Recommended Labels

مجموعة Labels مشتركة بيدعمها Kubernetes tooling (`kubectl`, Dashboard, ...) بتساعد الأدوات المختلفة تفهم الـ Objects بنفس الطريقة، وبتوصف الـ Application.

> Kubernetes مش PaaS ومفيهوش Formal Application Object — مفهوم الـ Application فيه **Informal**، وبيتوصف باستخدام Metadata. الـ Recommended Labels دي **مش Required** — استخدامها بيسهّل الإدارة، الأدوات، الـ Querying، والـ Automation. الـ Prefix المشترك هو `app.kubernetes.io`، وأي Label من غير Prefix تعتبر User-private.

| Label | الوصف | مثال |
|---|---|---|
| `app.kubernetes.io/name` | اسم الـ Application | `mysql` |
| `app.kubernetes.io/instance` | اسم Unique يحدد Instance معينة | `mysql-abcxyz` |
| `app.kubernetes.io/version` | الـ version الحالية (SemVer أو Revision Hash) | `"5.7.21"` |
| `app.kubernetes.io/component` | الـ Component داخل الـ Architecture | `database` |
| `app.kubernetes.io/part-of` | اسم الـ Application الأكبر اللي الـ Component جزء منه | `wordpress` |
| `app.kubernetes.io/managed-by` | الأداة اللي بتدير الـ Application | `Helm` |

### مثال: StatefulSet

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app.kubernetes.io/name: mysql
    app.kubernetes.io/instance: mysql-abcxyz
    app.kubernetes.io/version: "5.7.21"
    app.kubernetes.io/component: database
    app.kubernetes.io/part-of: wordpress
    app.kubernetes.io/managed-by: Helm
```

### Applications and Instances

نفس الـ Application ممكن يتثبت أكتر من مرة في نفس الـ Cluster (مثلًا 3 تثبيتات WordPress) — كلهم بنفس `app.kubernetes.io/name: wordpress`، لكن كل تثبيت له `instance` مختلفة (وكل Instance لازم اسم Unique).

### مثال: Simple Stateless Service

الـ Deployment والـ Service بيشاركوا نفس `name` و`instance` عشان الأدوات تعرف إنهم جزء من نفس الـ Application Instance:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: myservice
    app.kubernetes.io/instance: myservice-abcxyz
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: myservice
    app.kubernetes.io/instance: myservice-abcxyz
```

### مثال: Web Application With Database (WordPress + MySQL عبر Helm)

**WordPress Deployment & Service:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: wordpress
    app.kubernetes.io/instance: wordpress-abcxyz
    app.kubernetes.io/version: "4.9.4"
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: server
    app.kubernetes.io/part-of: wordpress
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: wordpress
    app.kubernetes.io/instance: wordpress-abcxyz
    app.kubernetes.io/version: "4.9.4"
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: server
    app.kubernetes.io/part-of: wordpress
```

**MySQL StatefulSet & Service:**

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  labels:
    app.kubernetes.io/name: mysql
    app.kubernetes.io/instance: mysql-abcxyz
    app.kubernetes.io/version: "5.7.21"
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: database
    app.kubernetes.io/part-of: wordpress
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: mysql
    app.kubernetes.io/instance: mysql-abcxyz
    app.kubernetes.io/version: "5.7.21"
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: database
    app.kubernetes.io/part-of: wordpress
```

> لاحظ: `app.kubernetes.io/name: mysql` لكن `app.kubernetes.io/part-of: wordpress` — يعني MySQL Application/Component منفصل، لكنه جزء من الـ WordPress Application الأكبر.

---

## 14. Storage Versions

### يعني إيه Storage Version؟

الـ API Server بيخزن الـ Objects في **etcd-compatible backing store** (غالبًا `etcd`)، وكل Object بيتخزن Serialized باستخدام version معينة اسمها **Storage Version**.

### API Version vs Storage Version

مختلفين تمامًا. الـ Client يتعامل مع أي API version مدعومة، لكن الـ Object بيتخزن بالـ Storage Version — وKubernetes بيعمل **Automatic Conversion**:

```text
Client → API v1 → API Server → Conversion → Storage Version → etcd
```

**مثال HPA:** تقدر تتعامل مع `HorizontalPodAutoscaler` بـ `v1` أو `v2`، وKubernetes يحوّل الـ API Calls تلقائيًا — الـ Client مش محتاج يعرف الـ Storage Version الفعلية.

### ليه Storage Version مهمة؟

مهمة للـ Cluster Administrators لأنها بتربط: **API Representation** ↔ **Actual Stored Encoding** ↔ **Storage Backend**. ده مهم في: Encryption at Rest، API Deprecation، Storage Migration.

> ملحوظة: ممكن يكون عندك API versions مختلفة (`v1alpha1`, `v1beta1`) لنفس الـ Resource، وطالما الـ Storage Version نفسها ما اتغيرتش، ممكن يتخزنوا بنفس الـ Storage Encoding.

### Storage Version to Resource Mapping

كل Resource عنده **Storage Version واحدة فعّالة (active)** في أي وقت — أي Write جديد بيستخدمها. لكن لو الـ Storage Version اتغيرت قديمًا، ممكن يكون عندك Objects قديمة متخزنة بـ versions مختلفة — كل Object بيتخزن في لحظة معينة بـ Storage Version واحدة فقط.

### Read vs Write

| العملية | السلوك |
|---|---|
| **Read (GET)** | الـ API Server يقرأ الـ Object المخزّن ويحوّله للـ API representation المطلوبة — الـ Object ممكن يفضل متخزن بالـ Old Storage Version. **الـ GET وحده مش بيعمل Migration.** |
| **Write (CREATE/UPDATE)** | بيستخدم الـ **New Storage Version** — الـ Update هو اللي فعليًا يخلي الـ Object يتكتب بالـ Storage Version الجديدة. |

### Custom Resources Storage Versions

الـ Custom Resources (CRs) بتتحدد dynamically عن طريق **CustomResourceDefinition (CRD)**، ولازم تحدد version واحدة فيها `storage: true`.

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.example.com

spec:
  group: example.com

  versions:
  - name: v1beta1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          host:
            type: string
          port:
            type: string

  - name: v1
    served: true
    storage: false
    schema:
      openAPIV3Schema:
        type: object
        properties:
          host:
            type: string
          port:
            type: string
          time:
            type: string

  conversion:
    strategy: None

  scope: Namespaced

  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
```

**Served vs Storage:**

- `served: true` → الـ version دي متاحة للـ API Clients.
- `storage: true` → الـ version دي هي اللي Kubernetes يستخدمها لتخزين الـ CRs. لازم **version واحدة بس** تكون `storage: true`.

في المثال: `v1beta1` = Storage Version، `v1` = مجرد Served API Version.

> **مشكلة الـ `time` field:** الـ `v1beta1` (Storage Version) عندها بس `host` و`port`، لكن `v1` عندها كمان `time`. وبما إن الـ Storage Schema هي schema الـ `v1beta1`، فالـ `time` field مش هيتحفظ فعليًا في التخزين حتى لو استخدمت `v1` API — لأن الـ Storage Definition نفسها ما فيهاش الـ field ده.

### تغيير Storage Version

لو غيّرت الـ Storage Version من Old لـ New:

- أي Objects جديدة/Updates جديدة تستخدم الـ **New Storage Version**.
- لكن الـ Objects القديمة **مش بتتحول تلقائيًا** بمجرد التغيير:
  - `GET` على Object قديم → Conversion وقت القراءة فقط، الـ Object يفضل مخزّن بالـ Old Storage Version.
  - `UPDATE` على Object قديم → بيتكتب من جديد بالـ New Storage Version.

### Storage Versions + Encryption at Rest

Kubernetes ممكن يستخدم Encryption at Rest لحماية حاجات زي `Secrets`. البيانات بتتشفر بدل ما تتخزن بشكل قابل للقراءة مباشرة، والـ API Server بيفك التشفير وقت القراءة — ولازم يكون عنده الـ Key/Configuration المناسب.

### Key Rotation

بعد Encryption Key Rotation، هيكون عندك Old Key و New Key، وممكن بعض الـ Objects تكون لسه متخزنة بالـ Old Key. لازم الـ Old Key والـ New Key يفضلوا متاحين لحد ما تتأكد إن كل الـ Objects اتكتبت من جديد بالـ New Key — لأن الـ Object لازم يكون **actively written/updated** عشان ينتقل فعليًا.

### Migrating to a Different Storage Version

وجود أكتر من Storage Version لنفس الـ Resource ممكن يسبب مشاكل: لو لسه فيه Objects كتير بتستخدم الـ Old Version، مينفعش ببساطة تشيل الـ Old API/Version — هتفقد القدرة على قراءة بعض الـ Objects.

**نفس المشكلة مع الـ Encryption Keys:** لو شلت الـ Old Key وفيه Objects لسه مشفّرة بيها، مش هتقدر تعمل لهم decrypt. لازم تتأكد إن كل الـ Objects اتعمل لها Rewrite بالـ New Key قبل إزالة الـ Old Key.

**Storage Version Migration** هو المفهوم اللي بيدّيك القدرة إنك تنقل الـ Objects من Old Storage Version لـ New Storage Version من غير ما تضطر تعمل Update يدوي لكل Object.
