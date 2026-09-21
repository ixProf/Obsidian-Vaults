# Agend of Day

- Overview
	- Kubernetes Components
	- Object In Kubernetes
		- Kubernetes Object Management
		- Object Names and IDs
		- Labels and Selector
		- Namespace
		- Annotation
		- Field Selectors
		- Finalizer
		- Owners and Dependents
		- Recommended Labels
		- Storage Versions

---
# Overview

بيقولك ان الKubernetes انها منصة بتدير ال Containerized Workloads و ال Services الي ممكن تكون محتاجة Configurations و Automations

طب لو اتسألنا سؤال اي هو ال Containerized Workloads هنقولك ان دا عبارة عن Services , Applications محطوطة جوا Containers ف انت بتديرهم وتدير التعامل معاهم

بحيث انه يقدر

- يشغلك الContainers
- يزود عدد النسخ او يقللها
- يعمل restart او ما نسميه بال Self-Healing لو الContainer وقع
- يوزع ال workload على nodes كدا
- ويراقب ال health
- ويعمل rolling updates
- ويربط الخدمات ببعض

يعني وليكن عندك مشروع E-Commerce مقسم

- فرونت اند
- باك اند
- داتابيز
- كاشينج (ريديس يعني)
    

فعلشان تستخدم kubernetes معاها

هتقسمه ل 4 pods (هنتكلم عن ال pods دي بعدين)

- كونتينر لل Frontend
- واحد للباك
- واحد للداتابيز
- واحد للريديس
    

بس خد بالك ان الـ Pod مش <mark style="background: #FFF3A3A6;">لازم يكون جواه Container واحد بس، ممكن يكون فيه أكتر من Container مرتبطين ببعض</mark>، والـ Kubernetes هو اللي بيدير الـ Pods دي.

وكمان مش شرط تحط الداتابيز نفسها جوه Kubernetes، ده قرار بيعتمد على الـ architecture بتاعت المشروع، وممكن تستخدم Database managed service برا الـ cluster.

---

- **ليه ممكن تحتاجه وهتستخدمه في ايه ؟**

بص بيقولك ان الكونتينرز دي طريقة كويسة علشان تشغل بيها المشاريع بتاعتك، وفي الproduction انت محتاج تنظم الكونتينرز دي، بحيث انها لما تشغل الابلكيشن تتأكد ان مفيش وقت للوقف، يعني لو وقع كونتينر يلحقك بان في حاجه تشتغل تاني

فهي بتساعدك تدير ال workloads بتاعتك على مجموعة من الـ nodes، وتتعامل مع ال scaling و ال failover بتاع المشروع بتاعك وكمان بتقدملك

- الService Discovery وال load balancing
    يعني ايه يقولك يعني انه بيوفرلك طريقة ان ال Services تلاقي وتتواصل مع بعض، وكمان بيوزع ال network traffic على الـ Pods اللي ورا الـ Service، علشان يفضل الوصول للـ application مستقر حتى لو عندك أكتر من Pod
    
- بينسق التخزين بتاعك
    هنا كوبيرنيتيز بيديلك الحرية في اختيار وحدة الخزين بتاعتك سواء كانت لوكال ولا كلاود وكمان بيديلك طريقة انك تربط وتدير الـ storage resources دي بشكل تلقائي
    
- اتمتة كاملة لعمليتي ال Rollback , Rollout
    هو هنا يقدر يبدلك من حالة الـ deployment القديمة للجديدة بشكل تدريجي، يعني يعملك Rollout بحيث ينقل الـ application من version قديم لـ version جديد، ولو حصلت مشكلة تقدر تعمل Rollback وترجعه للـ version القديمة
    
- بيعملك Resource Allocation
    يعني بأختصار كدا بيوفرلك مجموعة من ال nodes انها تقدر تستخدمها ف انها تشغلك ال workload بتاعك، لا وكمان انت تقدر تديها الـ CPU والـ RAM اللي ممكن يستخدمها كل Container، عن طريق الـ Requests والـ Limits، وهي تستخدم المعلومات دي في اختيار الـ node المناسبة وتنظيم استخدام الـ resources
    
- الSelf-healing
    هنا بيرسترلك الـ Containers والـ Pods لو فشلت وكمان ممكن يستبدلها، وكمان يعمل kill للـ Containers اللي مش بترد على الـ user-defined health checks، ومش بيعتبر الـ Pod جاهز لاستقبال traffic غير لما يكون الـ readiness check بتاعه بيقول انه جاهز
    
- الConfiguration Management
    هنا بقى بتقدر تنظملك كل ال sensitive information زي الباسوردس و ال OAuth Tokens وال SSH Keys بقى، باستخدام الـ Secrets، وكمان تقدر تدير الـ configuration باستخدام الـ ConfigMaps، وتقدر تعمل deploy وتعدل براحتك الكونفيجريشن من غير ما تعيد بناء ال Container Images
    
- الBatch Execution
    اضافة للخدمات دي تقدر تديرلك ال Batch Workloads زي الـ Jobs والـ CronJobs، وممكن Kubernetes يعيد تشغيل الـ Pods الخاصة بالـ Job لو فشلت حسب الـ configuration بتاعتها
    
- ال Scaling Up-Down
    هنا تقدر توسع المشروع بتاعك او تقسمه بالشكل الي يريحك بكومند بسيطة او استخدامك لل UI او اتومتايك كدا بناءا على استهلاك ال CPU
    
- ال IPv4/IPv6 dual-stack
    بتدعم تشغيل الـ Pods والـ Services باستخدام IPv4 و IPv6 مع بعض في نفس الـ cluster
    
- مصمم علشان تقدر تعمله توسع بعدين
    تقدر تضيف الـ features والـ extensions للـ Kubernetes نفسه من غير ما تحتاج تعدل في الـ Kubernetes source code، وكمان تقدر توسع الـ API والـ functionality بتاعته باستخدام الـ extensibility mechanisms

---
- **ايه الي مش بيعمله Kubernetes ؟**

باختصار Kubernetes مش منصة بتجيبلك كل حاجة جاهزة من أول الـ deployment لحد الـ database والـ monitoring والـ logging وكل حاجة في مكان واحد.

هو بيشتغل على مستوى الـ Containers مش على مستوى الـ Hardware، فبالتالي بيوفرلك حاجات موجودة عادة في الـ PaaS زي الـ deployment والـ scaling والـ load balancing، وكمان بيسمحلك تدمج أنظمة الـ logging والـ monitoring والـ alerting اللي انت عايز تستخدمها.

بس Kubernetes مش Monolithic، يعني مش بيقولك لازم تستخدم حلول معينة هو عاملها، والحاجات دي ممكن تكون optional و pluggable.

يعني Kubernetes بيديك الـ building blocks اللي تقدر تبني بيها Developer Platform، وفي نفس الوقت سايبلك الحرية تختار الأدوات والحلول اللي تناسبك.

Kubernetes:

- Does not limit the types of applications supported.
    
    يعني مش بيقولك نوع معين من الـ applications هو اللي ينفع تشتغل عليه، هو بيحاول يدعم أنواع مختلفة جدًا من الـ workloads، سواء Stateless أو Stateful أو Data Processing Workloads.
    
    يعني لو الـ application بتاعك يقدر يشتغل جوه Container، فالمفروض يقدر يشتغل كويس على Kubernetes.
    
- Does not deploy source code and does not build your application.
    
    يعني Kubernetes مش بياخد الـ source code بتاعك ويبنيهولك ويطلعلك Container Image.
    
    انت اللي بتعمل الـ build والـ CI/CD pipeline بتاعتك، سواء باستخدام GitHub Actions أو GitLab CI أو Jenkins أو أي tool تانية.
    
    يعني الـ Continuous Integration والـ Continuous Delivery والـ ==Continuous Deployment مش حاجة Kubernetes بيفرضها عليك، انت والمنظمة بتاعتك بتحددوا الـ workflow المناسب.==
    
- Does not provide application-level services, such as middleware (for example, message buses), data-processing frameworks (for example, Spark), databases (for example, MySQL), caches, nor cluster storage systems (for example, Ceph) as built-in services.
    
    يعني Kubernetes مش بيقولك خد عندك Message Bus جاهز، أو Database جاهزة، أو Redis جاهز، أو Spark جاهز.
    
    الحاجات دي مش Built-in Services جوه Kubernetes.
    
    لكن تقدر تشغل الحاجات دي جوه Kubernetes كـ workloads، أو تخلي الـ applications اللي شغالة على Kubernetes تتعامل مع Services موجودة برا الـ cluster.
    
- Does not dictate logging, monitoring, or alerting solutions.
    
    يعني Kubernetes مش بيفرض عليك تستخدم Logging أو Monitoring أو Alerting solution معينة.
    
    هو بيوفرلك بعض الـ integrations والـ mechanisms اللي تساعدك تجمع وتصدر الـ metrics، لكن انت اللي بتختار الأدوات اللي هتستخدمها.
    
- Does not provide nor mandate a configuration language/system.
    
    يعني Kubernetes مش بيفرض عليك Configuration Language معينة زي Jsonnet.
    
    هو بيوفرلك Declarative API، وانت تقدر تستخدم أي طريقة أو format مناسب علشان توصف الـ Desired State اللي انت عايز Kubernetes يوصلها.
    
- Does not provide nor adopt any comprehensive machine configuration, maintenance, management, or self-healing systems.
    
    يعني Kubernetes مش مسؤول عن إدارة الـ Machines نفسها بشكل شامل.
    
    هو بيدير الـ workloads والـ containers اللي شغالة عليها، لكن مش بيقولك ازاي تعمل Machine Configuration أو Maintenance أو Management كامل للـ servers نفسها.
    
- Additionally, Kubernetes is not a mere orchestration system.
    
    يعني Kubernetes مش مجرد Orchestrator بيقول للـ containers:
    
    اعمل A  
    وبعدها اعمل B  
    وبعدها اعمل C
    
    لأن الـ orchestration بالشكل التقليدي معناه إنك بتحدد Workflow معين، وهو ينفذه بالترتيب.
    
    لكن Kubernetes فكرته مختلفة شوية.
    
    هو عنده مجموعة من الـ independent و composable control processes، والـ processes دي بتفضل بشكل مستمر تبص على الـ Current State وتحاول تخليه مطابق للـ Desired State اللي انت محدده.
    
    يعني انت مش لازم تقوله:
    اعمل A وبعدها B وبعدها C
    
    انت بتقوله أنا عايز الـ application تكون بالشكل ده
    
    وهو يفضل يحاول يوصل الـ Current State للـ Desired State.
    
    يعني مثلًا لو انت عايز 3 replicas من الـ application:
    
    ```text
    Desired State:
    3 Pods
    
    Current State:
    2 Pods
    ```
    
    فـKubernetes يلاحظ إن فيه Pod ناقص ويحاول يخلي الـ Current State:
    
    ```text
    Current State:
    3 Pods
    ```
    
    ومش مهم بالنسبة لك هو وصل للحالة دي بإيه بالظبط.
    
    وعشان كده Kubernetes بيكون أكثر مرونة وقابلية للتوسع والـ resilience من مجرد نظام بيشغل Workflow محدد خطوة بخطوة.
    
    يعني بدل ما تكون بتقوله "اعمل إيه بالترتيب"، انت بتقوله "أنا عايز النتيجة النهائية تكون إيه"، وهو بشكل مستمر يحاول يحافظ على الحالة دي.

---
- **Historical context for Kubernetes**

بص هنا بيشرحلك ليه الـ Kubernetes والـ Containers بقوا مفيدين، وبيبدأ معاك من الأول خالص في طريقة تشغيل الـ Applications.

![[Pasted image 20260913014327.png]]

 **Traditional deployment era:**

في البداية الشركات كانت بتشغل الـ Applications على Physical Servers.

المشكلة هنا إن مفيش طريقة كويسة تعمل Resource Boundaries لكل Application على نفس الـ Physical Server، فممكن Application واحدة تستهلك معظم الـ CPU والـ RAM، وبالتالي الـ Applications التانية اللي شغالة على نفس الـ Server يحصلها performance issues.

فكان الحل إن كل Application تتحط على Physical Server لوحدها.

بس المشكلة إن ده مش scalable، لأنك كده هتحتاج Servers كتير جدًا، وكمان الـ Resources ممكن تفضل مش مستخدمة بالكامل، وفي نفس الوقت تكلفة شراء وصيانة الـ Physical Servers هتبقى عالية.

يعني مثلًا: Physical ServerApp 1
- بتستخدم Resources كتير
- الـApp 2 محتاجة Resources
- الـApp 3 → محتاجة Resources

لو App 1 أخدت معظم الـ Resources، الـ Apps التانية ممكن تتأثر.

فالحل البدائي كان: انك تعمل سيرفر لكل ابلكيشن، بس كده عندك Resource Wastage وتكلفة عالية.

---

**Virtualized deployment era**

بعد كده ظهر الـ Virtualization كحل للمشكلة دي.

الـ Virtualization بتخليك تشغل أكتر من Virtual Machine (VM) على نفس الـ Physical Server، وكل VM بتكون معزولة عن التانية بدرجة كويسة.

يعني بدل ما يكون عندك: سيرفر لكل ابلكيشن

تقدر تعمل:
![[Pasted image 20260913014651.png]]

وكمان كل VM بتكون Machine كاملة بشكل منطقي، يعني عندها الـ Operating System بتاعها والـ Libraries والـ Applications الخاصة بيها، وبتشتغل فوق الـ Virtualized Hardware.

وده ساعد في:

- استخدام الـ Resources بشكل أفضل
- تحسين الـ Scalability
- إضافة أو تحديث الـ Applications بسهولة أكبر
- تقليل تكلفة الـ Hardware
- عزل الـ Applications عن بعض بدرجة أكبر

وممكن تعتبر إن الـ Virtualization بتخليك تقدم مجموعة من الـ Physical Resources على شكل مجموعة من الـ Virtual Machines.

---

 **Container deployment era**

بعد كده ظهرت الـ Containers.

الـ Containers شبه الـ VMs في إن كل Application بتكون معزولة عن التانية، لكن الـ Isolation بتاع الـ Containers أخف من الـ VMs، لأن الـ Containers بتشارك نفس الـ Operating System Kernel.

وعشان كده الـ Containers تعتبر Lightweight مقارنة بالـ VMs.

يعني في الـ VM بيقمسلك الهايبرفايزر لوجيكال اوبريتنج سيستم  بحيث يكون كل VM عندها Operating System كامل خاص بيها.

لكن في الـ Containers:
![[Pasted image 20260913014814.png]]

الـ Containers بتشارك الـ OS Kernel، وده اللي بيخليها أخف وأسرع في الـ startup والـ resource usage من الـ VMs في العادة.

وبرضه الـ Container بيكون عنده حاجات خاصة بيه زي الـ filesystem والـ CPU والـ memory والـ process space، لكن هو مش عنده Kernel مستقل زي الـ VM.

وكمان لأن الـ Container بيكون decoupled بدرجة كبيرة عن الـ underlying infrastructure، تقدر تنقل نفس الـ Container Image بين بيئات مختلفة زي الـ Cloud أو الـ On-Premises، طالما الـ environment بيوفر Container Runtime مناسب.

Containers بقت مشهورة لأنها بتوفر benefits كتير، منها:

- تطبيق الـAgile application creation and deployment: بتخلي إنشاء وتشغيل الـ Applications أسهل وأسرع، وكمان إنشاء الـ Container Images بيكون أسهل وأخف من التعامل مع VM Images في حالات كتير.
    
- عمليات Continuous development, integration, and deployment: بتساعدك تعمل Build و Deployment للـ Container Images بشكل reliable ومتكرر، وكمان تقدر تعمل Rollback بسرعة لأن الـ Images بتكون immutable، يعني بعد ما تعمل Image version معينة المفروض إنك متغيرهاش، ولو عايز version جديدة تعمل Image جديدة.
    
- الـDevOps separation of concerns: الـ Developers يقدروا يعملوا Container Image فيها الـ Application والـ Dependencies بتاعتها وقت الـ Build/Release، بدل ما الـ Operations team يضطر يجهز الـ Application وقت الـ Deployment، وده بيفصل الـ Application عن الـ Infrastructure بشكل أكبر.
    
- الـObservability: الـ Containers والـ ecosystem اللي حواليها بتساعدك تراقب مش بس معلومات وMetrics على مستوى الـ OS، لكن كمان تقدر تراقب Application Health والـ Signals الخاصة بالـ Application.
    
- الـEnvironmental consistency في ال development, testing, and production: نفس الـ Container Image تقدر تستخدمها في Development و Testing و Production، فبتقلل مشكلة اشتغل عندي ومبيشتغلش عندك.
    
- الـCloud and OS distribution portability: تقدر تشغل الـ Containers على توزيعات مختلفة زي Ubuntu و RHEL، وعلى الـ On-Premises infrastructure أو الـ Public Clouds المختلفة، طالما فيه Container Runtime مناسب.
    
- الـApplication-centric management: بترفع مستوى الـ abstraction من إنك بتفكر في تشغيل Operating System فوق Virtual Hardware، لإنك تبدأ تفكر في تشغيل Application باستخدام Logical Resources.
    
- بيكون Loosely coupled, distributed, elastic, liberated micro-services: تقدر تقسم الـ Application لمجموعة من الـ Services الصغيرة والمستقلة، وكل Service تقدر تتdeploy وتتدار بشكل مستقل وديناميكي بدل ما يكون عندك Monolithic Application كلها شغالة على Machine واحدة كبيرة.
    
- الاهم بقى وهي الـResource isolation: كل Container تقدر تحددله Resources معينة، وده بيساعدك تحصل على Performance أكثر predictable بدل ما Application واحدة تاخد Resources بشكل عشوائي وتضر الباقي.
    
- والـResource utilization: بسبب إن الـ Containers أخف من الـ VMs في العادة، تقدر تشغل عدد أكبر من الـ Applications على نفس الـ Infrastructure، وبالتالي تستفيد من الـ Resources بشكل أكثر كفاءة.

---
## Kubernetes Components

![[Pasted image 20260913121804.png]]

هنتكلم عن الcomponents بتاعت kubernetes 
عندنا حاجه اسمها cluster ويعني ايه دا ؟

- الـCluster
هي عبارة عن مجموعة من ال Nodes متجمعة مع بعض، وKubernetes بيدريهم كأنهم Environment واحدة علشان تشغلك ال workloads بتاعتك

وال cluster بيتكون من ايه ؟

- اولًا : Control Plane 
	دا عبارة عن الحاجة الي بتدير الCluster والي من خلالها كوبيرنيتيز بتعرف
	- اي هو ال desired state الي انت عايزه
	- ال Pods و الNodes الموجودة
	- الworkloads هيشتغل فين
	- وازاي يحافظ على الحالة الي انت طلبتها
	
- ثانيًا: ال Worker Nodes 
	ودي عبارة عن ال Machines الي بتشغل ال workloads فعليًا

--- 
### Control Plane Components

دي بقى تعتبر العقل بتاع الـ Cluster، وهي اللي بتدير الـ overall state بتاع الـ cluster:

- الـ**kube-apiserver**
    ده الـ component الأساسي اللي بيعرض الـ Kubernetes HTTP API، يعني هو ==الـ entry point اللي بنتعامل من خلاله مع الـ Kubernetes API.==
    
- الـ**etcd**
    دي قاعدة بيانات Key-Value بتخزن فيها Kubernetes بيانات الـ Cluster وحالة الـ resources، ولازم تكون consistent و highly available.
    
- الـ**kube-scheduler**
    ده اللي بيبص على الـ Pods اللي لسه متحطتش على Node، ويختارلها الـ suitable Node اللي تقدر تشتغل عليها.
    
- الـ**kube-controller-manager**
    ده بيشغل الـ Controllers، والـ Controllers دي بتفضل تراقب الـ current state وتحاول تخليه مطابق للـ desired state اللي انت محدده.
    
- الـ**cloud-controller-manager** _(optional)_
    ده لو انت شغال على Cloud، بيخلي Kubernetes يتعامل مع الـ Cloud Provider اللي انت مستخدمه.
    

---

### Node Components

دي الـ components اللي بتكون موجودة على الـ Nodes وبتكون مسؤولة عن تشغيل الـ Pods وتوفير الـ runtime environment بتاع Kubernetes:

- الـ**kubelet**
    ده يعتبر الـ agent اللي شغال على كل Node، وبيضمن إن الـ Pods المطلوبة على الـ Node دي شغالة، بما فيها الـ Containers اللي جواها.
    
- الـ**kube-proxy** _(optional)_
    ده مسؤول عن الـ network rules على الـ Node واللي بتساعد في تنفيذ الـ Services والـ network traffic بتاعها.
    
- الـ**Container runtime**
    ده البرنامج المسؤول فعليًا عن تشغيل الـ Containers.
    زي مثلًا containerd أو CRI-O.
    

---

### Addons

دي حاجات بتضيف Features للـ Kubernetes، لكنها مش الـ core components الأساسية:

- **DNS**
    
    بيوفر Cluster-wide DNS، بحيث الـ Services والـ workloads تقدر تلاقي بعض باستخدام الـ names.
    
- **Web UI (Dashboard)**
    
    بيديك Web Interface تقدر من خلالها تدير وتتابع الـ Cluster.
    
- **Container Resource Monitoring**
    
    بيجمع ويخزن الـ Metrics الخاصة بالـ Containers والـ Resources.
    
- **Cluster-level Logging**
    
    بيجمع الـ Logs الخاصة بالـ Containers ويحفظها في مكان مركزي.
    

---

### Flexibility in Architecture

الـKubernetes مرن في طريقة الـ Architecture بتاعته، يعني تقدر توزع وتدير الـ Components حسب احتياجاتك.

فممكن يكون عندك Cluster بسيطة للـ Development، أو Architecture أكبر وموزعة للـ Production والـ Large-scale environments.

---
## Objects In Kubernetes

بص الـ Kubernetes Objects دي عبارة عن **Persistent Entities** جوه Kubernetes، يعني حاجات Kubernetes بيخزنها وبيستخدمها علشان يمثل بيها الـ state بتاع الـ cluster.

يعني من خلالها تقدر توصف:

- إيه الـ Containerized Applications اللي شغالة
- شغالة على أنهي Nodes
- الـ Resources المتاحة للـ Applications دي
- والـ Policies اللي بتحدد الـ Applications دي تتصرف إزاي، زي الـ Restart Policies والـ Upgrades والـ Fault-tolerance
    

وأهم فكرة هنا إن الـ Kubernetes Object يعتبر **Record of Intent**.

يعني انت لما تعمل Object، انت بشكل أساسي بتقول لـ Kubernetes:

> أنا عايز الـ Cluster تكون بالشكل ده. وده اسمه **Desired State**.

وبعد كده Kubernetes يفضل بشكل مستمر يحاول يخلي الـ Current State بتاع الـ Cluster مطابق للـ Desired State بتاعتك.

ولما تيجي تتعامل مع الـ Objects سواء Create أو Modify أو Delete، ده بيتم عن طريق **Kubernetes API**.

ولو انت بتستخدم `kubectl`، فالـ `kubectl` هو اللي بيعمل الـ API calls دي نيابة عنك.


---

### Object spec and status

معظم الـ Kubernetes Objects عندها حاجتين مهمين:

- `spec`
- `status`
    

الـ **spec** دي بتحدد ==الـ Desired State،== يعني انت عايز الـ Object يكون عامل إزاي.

أما الـ **status** فدي بتوصف ==الـ Current State،== وKubernetes هو اللي بيحدثها بناءً على اللي بيحصل فعليًا في الـ Cluster.
والـ Control Plane يفضل يقارن بينهم ويحاول يخلي:

```text
Current State = Desired State
```

مثلاً عندك Deployment وكتبت فيه:

```yaml
spec:
  replicas: 3
```

فانت كده بتقول لـ Kubernetes:

> "أنا عايز 3 replicas من الـ Application دي يكونوا شغالين."

وال replicas دي عبارة عن نسخة طبق الاصل من الابلكيشن بتاعك

فـ Kubernetes يشوف الـ Desired State دي ويحاول يخليها تحصل.

لو عندك:

```text
Desired State:
3 Pods

Current State:
3 Pods
```

تمام.

لكن لو واحد من الـ Pods وقع:

```text
Desired State:
3 Pods

Current State:
2 Pods
```

Kubernetes يلاحظ الفرق ويحاول يصلحه ويشغل Replacement Pod، علشان يرجع تاني لـ:

```text
Desired State:
3 Pods

Current State:
3 Pods
```

---

### Describing a Kubernetes object

لما تيجي تعمل Object في Kubernetes، لازم تحدد الـ **Desired State** بتاعته، وكمان معلومات أساسية عنه زي الـ Name.

وغالبًا انت بتكتب المعلومات دي في ملف اسمه **Manifest**، والـ Manifest بيكون غالبًا YAML، وممكن كمان JSON.

مثلاً Deployment:

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

وبعدين تقدر تعمل:

```bash
kubectl apply -f deployment.yaml
```

هنا `kubectl` بياخد الـ YAML ويبعته للـ Kubernetes API، والـ API Server هو اللي يستقبل الـ request ويتعامل مع الـ Object.

طب لو نشرح الفايل دا
الـ YAML هنا مجرد **طريقة بتكتب بيها الـ Kubernetes Object**.

يعني انت مش بتكتب كود بيتنفذ بالترتيب.

انت بتوصف لـ Kubernetes:

> "أنا عايز Deployment بالشكل ده."

وبعدين Kubernetes هو اللي يتصرف علشان يحقق الكلام ده.


 1. `apiVersion`

```yaml
apiVersion: apps/v1
```

دي بتقول لـ Kubernetes:

> أنا هستخدم أنهي version من الـ Kubernetes API علشان أعمل الـ Object ده؟

هنا:

```text
apps/v1
```

يعني الـ Deployment ده تابع للـ `apps` API group وبيستخدم version `v1`.

مش معناها إن نسخة Kubernetes نفسها `v1`.

 2. `kind`

```yaml
kind: Deployment
```

دي بتقول:

> أنا عايز أعمل **أنهي نوع Object؟**

هنا:

```text
Deployment
```

يعني Kubernetes:

> تمام، انت عايز تعمل Deployment.

ممكن بدلها يكون:

```yaml
kind: Pod
```

أو:

```yaml
kind: Service
```

أو:

```yaml
kind: ConfigMap
```

وهكذا.
3. `metadata`

```yaml
metadata:
  name: nginx-deployment
```

دي معلومات عن الـ Object نفسه.

هنا انت بتقول:

> اسم الـ Deployment بتاعي `nginx-deployment`.

يعني لو عملت:

```bash
kubectl get deployments
```

ممكن تشوف:

```text
NAME
nginx-deployment
```

والـ `metadata` ممكن تحتوي معلومات تانية زي:

```yaml
metadata:
  name: nginx-deployment
  namespace: production
  labels:
    app: nginx
```

4. `spec`

```yaml
spec:
```

دي بتقول:

> أنا عايز الـ Deployment ده يكون عامل إزاي؟

يعني دي **Desired State**.
وجواها بتحدد تفاصيل الـ Deployment.


5. `replicas`

```yaml
replicas: 2
```

دي معناها:

> أنا عايز **2 Pods** من الـ Application دي شغالين.

انت بتقول للـ Deployment:

> حافظلي على 2 replicas من الـ Pod.

ولو Pod وقع:

```text
Desired = 2
Current = 1
```

الـ Deployment/ReplicaSet controllers هيحاولوا يعملوا Pod جديدة.

6. `template`

```yaml
template:
```

الـ Deployment مش بيعمل الـ Pods من العدم.

هو عنده **Pod Template** بيقول:

> لما تعمللي Pods، اعملها بالشكل ده.

يعني:

```yaml
template:
  metadata:
    labels:
      app: nginx

  spec:
    containers:
    - name: nginx
      image: nginx:1.14.2
```

دي مواصفات الـ Pods اللي الـ Deployment هيعملها.

فكر فيها كده:

```text
Deployment
   │
   │ عندي Template
   ↓
Pod Template
   │
   ├── labels
   └── containers
         ↓
       nginx
```

وبما إن:

```yaml
replicas: 2
```

فهو يستخدم الـ Template دي علشان يعمل **2 Pods بنفس الشكل**.

 7. `template.metadata.labels`

```yaml
template:
  metadata:
    labels:
      app: nginx
```

هنا بنحط Label على الـ Pods اللي هتتعمل.

يعني كل Pod هيطلع من الـ Template دي هيبقى عليه:

```text
app=nginx
```

فتقدر تتخيل:

```text
Pod 1
labels:
  app=nginx

Pod 2
labels:
  app=nginx
```

والـ Labels دي مهمة جدًا لأن Kubernetes بيستخدمها علشان يربط Resources ببعض.
8. `selector`

```yaml
selector:
  matchLabels:
    app: nginx
```

دي معناها:

> الـ Deployment ده مسؤول عن الـ Pods اللي عليها Label `app=nginx`.

يعني:

```text
Deployment
    │
    │ selector: app=nginx
    ↓
Pods with app=nginx
```

وعشان كده عندك:

```yaml
selector:
  matchLabels:
    app: nginx
```

وفي الـ Template:

```yaml
labels:
  app: nginx
```

==لازم يكون بينهم تطابق مناسب.==

يعني الـ Deployment بيقول:

> أنا بدور على Pods عليها `app=nginx`.

والـ Template بتقول:

> أنا هعمل Pods عليها `app=nginx`.

9. `containers`

نخش بقى جوه الـ Pod:

```yaml
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
```

دي بتقول:

> الـ Pod دي جواها Container اسمه `nginx`.

لاحظ حاجة مهمة:

```yaml
spec:
```

الأولى كانت بتاعة **Deployment**.

لكن دي:

```yaml
template:
  spec:
```

دي بتاعة **Pod Template**.
10. `image`

```yaml
image: nginx:1.14.2
```

دي بتقول:

> استخدم الـ Container Image دي علشان تشغل الـ Container.

هنا:

```text
nginx
```

اسم الـ Image.

و:

```text
1.14.2
```

هو الـ Tag.

يعني Kubernetes هيطلب من الـ Container Runtime يشغل:

```text
nginx:1.14.2
```

11. `ports`

```yaml
ports:
- containerPort: 80
```

دي بتقول إن الـ Container عنده application بتسمع على:

```text
Port 80
```

يعني nginx جوه الـ Container بيشتغل على Port 80.

**لكن خد بالك جدًا:**

وجود:

```yaml
containerPort: 80
```

مش معناه إن الـ Application بقت متاحة من بره الـ Cluster.

دي مجرد معلومة عن الـ Port اللي الـ Container بيستخدمه.

علشان تخلي الـ Application متاحة من خلال Kubernetes networking، غالبًا هتحتاج **Service**.


---

### Required fields

في أغلب الـ Kubernetes Object Manifests هتلاقي الحاجات الأساسية دي:

- `apiVersion` - بتحدد الـ API version اللي الـ Object ده بيستخدمها
    
- `kind` - بتحدد نوع الـ Object اللي انت عايز تعمله، زي Deployment أو Pod أو Service
    
- `metadata` - معلومات بتعرف الـ Object، زي الـ name والـ UID والـ namespace
    
- `spec` - الـ Desired State بتاع الـ Object
    

مثلاً:

```yaml
apiVersion: apps/v1
kind: Deployment

metadata:
  name: nginx-deployment

spec:
  replicas: 2
```

هنا بتقول لـ Kubernetes:

```text
apiVersion → هستخدم أنهي API version

kind → أنا بعمل Deployment

metadata → اسمه nginx-deployment

spec → أنا عايز 2 replicas
```

وخد بالك إن شكل الـ `spec` بيختلف حسب نوع الـ Object.

يعني `spec` بتاعة الـ Pod مختلفة عن `spec` بتاعة الـ Deployment، ومختلفة عن `spec` بتاعة الـ StatefulSet.

مثلاً في الـ Pod:

```yaml
spec:
  containers:
  - name: nginx
    image: nginx
```

هنا الـ `spec` بتحدد الـ desired state بتاعة الـ Pod، ومن ضمنها الـ Container Image.

أما الـ Deployment فـ `spec` بتاعته ممكن تحدد عدد الـ replicas والـ Pod Template وغيرها.

والـ StatefulSet برضه عنده `spec` خاصة بيه، وجواها Pod Template بيحدد شكل الـ Pods اللي الـ StatefulSet Controller هيعملها.

---

### Server side field validation

من Kubernetes v1.25، الـ API Server بقى عنده **Server-side field validation**، يعني يقدر يكتشف لو انت كتبت Fields مش معروفة أو مكررة في الـ Object.

والـ `kubectl` عنده:

```bash
--validate
```

والـ validation ممكن تكون:

- حالة الـ`strict` -> لو فيه مشكلة في الـ validation، الـ request يفشل
    
- حالة الـ`warn` -> الـ validation تحصل، لكن المشكلة تظهر كـ warning والـ request يكمل
    
- حالة الـ`ignore` → مفيش server-side field validation
    

والـ default بتاع `kubectl` هو:

```text
--validate=true
```
يعني عبارة عن `strict`

ولو `kubectl` مش قادر يتصل بـ API Server بيدعم Server-side validation، ممكن يرجع يستخدم **Client-side validation**.

ومن Kubernetes v1.27 وما بعده، الـ API Server بيوفر Server-side field validation بشكل دائم.

---
## Kubernetes Object Management


في 3 طرق أساسية لإدارة الـ Kubernetes Objects باستخدام `kubectl`:

1. **Imperative Commands**
2. **Imperative Object Configuration**
3. **Declarative Object Configuration**


الـ Object الواحد المفروض يتدار بطريقة واحدة بس، مينفعش نخلط بينهم لنفس الـ Object.

|Technique|بتشتغل على|الاستخدام|
|---|---|---|
|Imperative Commands|Live Objects|Development / حاجة سريعة|
|Imperative Object Configuration|Files|Production|
|Declarative Object Configuration|Directories of Files|Production|

---

### 1. Imperative Commands

هنا أنا بتعامل مباشرة مع الـ **Live Objects** في الـ Cluster.

يعني بدي `kubectl` command فيه الـ operation اللي أنا عايزها.

مثال:

```bash
kubectl create deployment nginx --image=nginx
```

يعني اعمل Deployment اسمه `nginx` باستخدام Image اسمها `nginx`.

#### مميزاته:

- سريع وسهل.
- مناسب للتجارب والـ one-off tasks.
- مش محتاج أعمل YAML.

#### عيوبه:

- مفيش configuration محفوظة كملف.
- صعب أعمل change review.
- مفيش audit/history كويس للتغييرات.
- مش بيديني template أستخدمه لإنشاء Objects تانية.


---

### 2. Imperative Object Configuration

هنا الـ configuration بتاعة الـ Object بتكون موجودة في **YAML أو JSON file**.
وأنا بحدد في الـ command أنا عايز أعمل إيه.

مثال:

```bash
kubectl create -f nginx.yaml
```

يعني اعمل الـ Object الموجود في `nginx.yaml`.

وممكن:

```bash
kubectl delete -f nginx.yaml
```

لحذف الـ Objects الموجودة في الملف.

أو:

```bash
kubectl replace -f nginx.yaml
```

لعمل replace للـ live configuration باللي موجود في الملف.

#### مميزاته:

- الـ YAML ممكن يتحط في Git.
- سهل نعمل code review للتغييرات.
- عندي configuration محفوظة.
- ممكن أستخدم نفس الـ file كـ template.
    

#### عيوبه:

- لازم أفهم Object schema وأكتب YAML.
- الـ`replace` ممكن يمسح تغييرات موجودة في الـ Live Object ومش موجودة في الـ YAML.
- مناسب أكتر للـ files مش directories.
    

---

### 3. Declarative Object Configuration

هنا أنا بكتب **Desired State** في الـ configuration files، ومش بحدد لـ `kubectl` يعمل Create ولا Update ولا Delete.

مثال:

```bash
kubectl apply -f configs/
```

فـ`kubectl` بيشوف الـ configuration ويحدد لكل Object هل محتاج:

- Create
- Update / Patch
- Delete
    

يعني أنا بقول:

> أنا عايز الـ Cluster يبقى بالشكل ده.

وKubernetes يحاول يوصل للـ Desired State.

#### مثال:

```yaml
spec:
  replicas: 3
```

أنا مش بقول:

> اعمل Pod، وبعدين اعمل Pod، وبعدين اعمل Pod.

أنا بقول:

> أنا عايز 3 replicas.

---

#### `kubectl diff`

قبل ما أعمل apply ممكن أشوف التغييرات:

```bash
kubectl diff -f configs/
```

وبعدين:

```bash
kubectl apply -f configs/
```

أطبق التغييرات.

ولو عايز يدخل جوه الـ subdirectories:

```bash
kubectl apply -R -f configs/
```

#### مميزاته:

- مناسب جدًا للـ Production.
- الـconfiguration موجودة في files وGit.
- بيدعم directories.
- بيحدد تلقائيًا Create / Patch / Delete.
- التغييرات اللي حصلت على الـ Live Objects من writers تانيين ممكن يتم الحفاظ عليها باستخدام `patch` بدل `replace`.
    

#### عيوبه:

- أصعب في الفهم والـ debugging لما يحصل unexpected behavior.
- الـ merge/patch operations ممكن تبقى معقدة.
    

---
## Object Names and IDs

كل Kubernetes Object عنده:

- ال**Name** ودا عبارة عن اسم الـ Object، وهو Unique لنفس نوع الـ resource داخل الـ Namespace.
- وعندك الـ**UID** ودا عبارة عن ID بيولده ال Kubernetes وبيكون Unique على مستوى الـ Cluster كله.

مثال:

ممكن يكون عندي:

```text
Pod:        myapp-1234
Deployment: myapp-1234
```

==عادي لأنهم نوعين مختلفين.==

لكن مينفعش يكون عندي 2 Pods بنفس الاسم في نفس الـ Namespace.

ولو حذفت Object، أقدر أعمل Object جديد بنفس الـ Name.

### الـKubernetes بيحدد الـ Object باستخدام:

```text
API Group
+ Resource Type
+ Namespace
+ Name
```

الـ API Version مش جزء من الـ unique identity، يعني مينفعش أعمل نفس الـ Object بنفس الاسم باستخدام `v1` و `v1beta1`.

---
### generateName

بدل ما أحدد:

```yaml
name: nginx
```

ممكن أستخدم:

```yaml
generateName: nginx-
```

وقتها الـKubernetes هيضيف ==suffix== تلقائي:

```text
nginx-x7k92
```

---

### Name Constraints

معظم الـ resources لازم أسمائها تكون DNS-compatible.

#### DNS Subdomain

- Max 253 characters
- lowercase letters/numbers
- `-` و `.`
- يبدأ وينتهي بـ alphanumeric

#### RFC 1123 / RFC 1035 Label

- Max 63 characters
- lowercase letters/numbers و `-`
- يبدأ بحرف
- ينتهي بـ alphanumeric

> الـService ممكن يبدأ برقم لو `RelaxedServiceNameValidation` enabled.

#### Path Segment

بعض الـ resources اسمها مينفعش يكون:

```text
.
..
```

ومينفعش يحتوي:

```text
/
%
```

---

### UIDs

الـ **UID** بيتولد تلقائيًا بواسطة Kubernetes.

كل Object بيتعمل في الـ Cluster له UID مختلف.

يعني حتى لو:

```text
Pod old: myapp
```

اتحذف وبعدها عملت:

```text
Pod new: myapp
```

الـ Name نفسه، لكن الـ UID مختلف.

الـ**Name = اسم الـ Object الحالي**
الـ**UID = بيميز الـ Object نفسه عن أي Object تاريخي تاني**

---

## Labels

الـ **Labels** عبارة عن:

```text
key: value
```

بتتحط على الـ Objects زي Pods.

مثال:

```yaml
metadata:
  labels:
    environment: production
    app: nginx
```

الـ Labels بتستخدم في:

- تنظيم الـ Objects
- الـGrouping
- الـFiltering
- الـSelecting Objects
    

وممكن أضيف أو أعدل Labels بعد إنشاء الـ Object.

> الـ Labels مش لازم تكون Unique، عادي جدًا Objects كتير يكون عندها نفس الـ Label.

مثال:

```text
Pod 1 → app=nginx
Pod 2 → app=nginx
Pod 3 → app=nginx
```

---

### Labels Examples

ممكن أستخدم Labels بأبعاد مختلفة:

```text
release: stable / canary

environment: dev / qa / production

tier: frontend / backend / cache

role: master / replica
```

مثلاً:

```yaml
labels:
  app: guestbook
  tier: backend
  role: master
```

---

### Labels vs Annotations

**Labels:**

> معلومات بنستخدمها في الـ **identification / selection / filtering**.

**Annotations:**

> معلومات إضافية مش بنستخدمها في اختيار الـ Objects.

---

### Label Selectors

الـ **Label Selector** هو الطريقة اللي Kubernetes بيستخدمها عشان يختار مجموعة Objects بناءً على Labels.

مثلاً عندي:

```text
Pod 1 → app=nginx
Pod 2 → app=nginx
Pod 3 → app=redis
```

لو عملت:

```bash
kubectl get pods -l app=nginx
```

هجيب:

```text
Pod 1
Pod 2
```

---

#### نوعين من Selectors

##### 1. Equality-based

'=' , ' == ', ' != '
مثال:

```text
environment=production
```

يعني:

> هات اللي `environment` بتاعه production.

وممكن أكتر من شرط:

```text
environment=production,tier!=frontend
```

`,` معناها **AND**.

يعني لازم الشرطين يتحققوا.

---

##### 2. Set-based

Operators:

```text
in
notin
exists
```

مثال:

```text
environment in (production, qa)
```

يعني:

> environment تكون production أو qa.

مثال:

```text
tier notin (frontend, backend)
```

يعني:

> tier مش frontend ولا backend.

مثال:

```text
partition
```

يعني:

> الـ Label `partition` موجود.

و:

```text
!partition
```

يعني:

> الـ Label `partition` مش موجود.

---

### Important

مفيش `OR` operator مباشر:

```text
||
```

لكن ممكن أعمل OR باستخدام `in`:

```text
environment in (production, qa)
```

يعني:

```text
production OR qa
```

وبرضه `,` = **AND**.

---

### Service + Labels

الـ **Service** بيستخدم Label Selector عشان يعرف أنهي Pods هو هيبعتلها Traffic.

مثلاً:

```yaml
selector:
  app: nginx
```

يعني:

> الـ Service اختار الـ Pods اللي عندها:

```text
app=nginx
```

==فـ Labels والـ Selectors مهمين جدًا في ربط الـ Objects ببعض.==

---

### Deployment Selector

في Deployment ممكن أستخدم:

```yaml
selector:
  matchLabels:
    app: nginx
```

وده معناه:

> الـ Deployment هيدير الـ Pods اللي عليها `app=nginx`.

والـ Pods اللي الـ Deployment بيعملها لازم الـ Labels بتاعتها تطابق الـ Selector.

---

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

`matchLabels` = key/value مباشر.

`matchExpressions` = شروط باستخدام:

```text
In
NotIn
Exists
DoesNotExist
```

==وكل الشروط لازم تتحقق:==

```text
AND
```

---

### Label Filtering

أقدر أستخدم Labels في `kubectl`:

```bash
kubectl get pods -l app=guestbook
```

أو:

```bash
kubectl get pods -l app=guestbook,role=replica
```

يعني:

```text
app=guestbook AND role=replica
```

وممكن أعرض الـ Labels كـ columns:

```bash
kubectl get pods -L app -L tier -L role
```

---

### Updating Labels

أقدر أضيف Label لـ Objects موجودة بالفعل باستخدام:

```bash
kubectl label pods -l app=nginx tier=fe
```

هنا:

```text
-l app=nginx
```

تختار الـ Pods اللي عندها:

```text
app=nginx
```

وبعدين:

```text
tier=fe
```

تضيف لهم الـ Label.

ولعرضها:

```bash
kubectl get pods -l app=nginx -L tier
```

---
## Namespaces

الـ **Namespace** بيعمل isolation / تقسيم للـ Resources جوه نفس الـ Cluster.

يعني بدل ما كل الـ Resources تبقى في مكان واحد، أقدر أقسمهم:

```text
Cluster
	dev
	staging
	production
```

الـ Resource names لازم تكون **unique داخل نفس الـ Namespace**، لكن ممكن نفس الاسم يتكرر في Namespaces مختلفة.

مثال:

```text
dev:
  Pod = nginx

production:
  Pod = nginx
```

لكن:

```text
dev:
  Pod → nginx
  Pod → nginx
```

مينفعش.

الـ Namespace نفسه مش بيكون جوه Namespace تاني.

وكل Resource ==ممكن يكون في **Namespace واحد فقط**.==

---

### Namespaced vs Cluster-wide Objects

مش كل Kubernetes Objects بتستخدم Namespace.

#### Namespaced Objects

زي:

```text
Pod
Deployment
Service
```

دول بيكونوا داخل Namespace.

#### Cluster-wide Objects

زي:

```text
Node
PersistentVolume
StorageClass
```

دول مش تابعين لأي Namespace.

---
### امتى أستخدم Multiple Namespaces؟

الـ Namespaces مفيدة لما يكون عندي:

- Teams مختلفة
- Projects مختلفة
- Users كتير
- محتاج أقسم Resources
- Resource Quotas لكل مجموعة

مش لازم أعمل Namespace لكل version من نفس التطبيق.

مثلاً:

```text
nginx v1
nginx v2
```

ممكن يكونوا في نفس Namespace ونستخدم **Labels** للتمييز بينهم.

> في Production يفضل عدم الاعتماد على `default` Namespace، واستخدام Namespaces مخصصة.

---

### Initial Namespaces

Kubernetes بيبدأ بـ 4 Namespaces أساسيين:

 `default`

الـ Namespace الافتراضي للـ Resources ==لو أنا محددتش Namespace.==

`kube-system`

خاص بالـ ==Kubernetes system objects.==

 `kube-public`

بيكون Readable لكل الـ clients حتى غير authenticated، ومخصص لحاجات محتاج تكون ظاهرة على مستوى الـ Cluster.
`kube-node-lease`

بيحتوي على ==**Lease Objects** ==الخاصة بالـ Nodes، والـ Node بيستخدمها كـ heartbeat عشان Control Plane يعرف حالة الـ Node.

---

### Working with Namespaces

عرض الـ Namespaces:

```bash
kubectl get namespace
```

أو:

```bash
kubectl get ns
```

أحدد Namespace لأمر معين:

```bash
kubectl get pods --namespace=dev
```

أو:

```bash
kubectl run nginx --image=nginx --namespace=dev
```

---

### Setting Default Namespace

أقدر أخلي Namespace معينة هي ==الـ default== للـ current context:

```bash
kubectl config set-context --current --namespace=dev
```

وبعدها:

```bash
kubectl get pods
```

هيشتغل على `dev` بدل ما كل مرة أكتب:

```bash
--namespace=dev
```

وأقدر أتأكد:

```bash
kubectl config view --minify | grep namespace:
```

---

### Namespace + DNS

لما أعمل Service، على طول Kubernetes بيعمل لها DNS name.

الشكل:

```text
<service-name>.<namespace-name>.svc.cluster.local
```

مثال:

```text
backend.production.svc.cluster.local
```

لو أنا داخل نفس الـ Namespace، غالبًا أقدر أوصل للـ Service باستخدام:

```text
backend
```

لكن لو عايز أوصل لـ Service في Namespace تانية، أقدر أستخدم الـ FQDN:

```text
backend.production.svc.cluster.local
```

وده مفيد إن نفس configuration تشتغل في:

```text
dev
staging
production
```

---

### Namespace Names

الـ Namespace name لازم يكون valid **RFC 1123 DNS label**.

ومهم:

```text
kube-
```

الـprefix ==محجوز للـ Kubernetes system== namespaces، فمتعملش Namespace تبدأ بـ `kube-`.

---

### Not All Objects Are in a Namespace

أقدر أعرف الـ Resources اللي بتستخدم Namespace:

```bash
kubectl api-resources --namespaced=true
```

واللي مش بتستخدم Namespace:

```bash
kubectl api-resources --namespaced=false
```

---

### Automatic Labelling

من Kubernetes `v1.22`، Kubernetes بيضيف تلقائيًا Label للـ Namespace:

```text
kubernetes.io/metadata.name
```

وقيمته بتكون اسم الـ Namespace.

مثلاً Namespace اسمها:

```text
dev
```

يبقى:

```text
kubernetes.io/metadata.name=dev
```

والـ Label ده **immutable**.

---

## Annotations

الـ **Annotations** بتستخدم لإضافة **non-identifying metadata** للـ Objects.
يعني معلومات إضافية عن الـ Object، لكن مش بنستخدمها عشان نختار Objects.

مثال:

```yaml
metadata:
  annotations:
    imageregistry: "https://hub.docker.com/"
```

---

### Labels vs Annotations

#### Labels

بنستخدمها في:

```text
Identify
Group
Select
Filter
```

مثلاً:

```text
app=nginx
```

وبعدين:

```bash
kubectl get pods -l app=nginx
```

#### Annotations

معلومات إضافية للـ Object، ومش بتستخدم في selection.

مثلاً ممكن أخزن:

```text
Build information
Git commit
Release ID
Image information
Tool information
Logging/Monitoring information
URLs
Extra configuration
```

وممكن أستخدم **Labels و Annotations مع بعض** في نفس Object.

---

### Annotation Syntax

هي برضه:

```text
key: value
```

والـ Key ممكن يكون:

```text
prefix/name
```

والـ Prefix optional.

### Annotation Value

على عكس Labels، الـ Annotation value ممكن تحتوي أي String، حتى:

```text
spaces
special characters
JSON
YAML
```

لكن إجمالي الـ Annotations الخاصة بالـ Object الواحد لازم يكون أقل من أو يساوي:

```text
256 KiB
```

والـ key/value نفسهم بيكونوا Strings، مش Boolean أو Number أو List كـ types مستقلة.

---

## Field Selectors

الـ **Field Selector** ==بيسمحلي أفلتر الـ Objects باستخدام **fields داخل الـ Object نفسه**.==

مثلاً:

```text
metadata.name=my-service
metadata.namespace!=default
status.phase=Pending
```

مثال:

```bash
kubectl get pods --field-selector status.phase=Running
```

يعني:

> هات الـ Pods اللي `status.phase` بتاعها `Running`.

---

### Label Selector vs Field Selector

**Label Selector:**

بيفلتر باستخدام:

```text
metadata.labels
```

مثال:

```bash
kubectl get pods -l app=nginx
```

**Field Selector:**

بيفلتر باستخدام fields في الـ Object:

```bash
kubectl get pods --field-selector status.phase=Running
```

---

### Supported Fields

كل Resource بيدعم على الأقل:

```text
metadata.name
metadata.namespace
```

لكن باقي الـ fields بتختلف حسب نوع الـ Resource.

مثلاً Pod عنده:

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

ولو استخدمت Field مش مدعوم، Kubernetes هيرجع Error.

مثلاً:

```bash
kubectl get ingress --field-selector foo.bar=baz
```

مش هينفع لأن `foo.bar` مش supported field للـ Ingress.

---

### Field Selector Operators

مثال:

```bash
kubectl get services --all-namespaces \
  --field-selector metadata.namespace!=default
```
يعني:

> هات الـ Services اللي مش موجودة في `default`.

### مهم

Field Selectors **مش بتدعم**:

```text
in
notin
exists
```
دي موجودة في **Label Selectors** فقط.

---

### Chained Field Selectors

أقدر أستخدم أكتر من condition، وبينهم `,` يعني **AND**.

مثال:

```bash
kubectl get pods \
  --field-selector=status.phase!=Running,spec.restartPolicy=Always
```

يعني:

```text
status.phase != Running
AND
spec.restartPolicy = Always
```

---

### Multiple Resource Types

ممكن أعمل Field Selector على أكتر من Resource type:

```bash
kubectl get statefulsets,services --all-namespaces \
  --field-selector metadata.namespace!=default
```

يعني يجيب:

```text
StatefulSets + Services
```

اللي مش موجودين في `default`.

---
## Finalizers

الـ **Finalizer** هو Namespaced Key بيخلي Kubernetes يستنى شروط معينة تتحقق ==قبل ما يعمل **Delete نهائي** للـ Resource.==

يعني هو عبارة عن الفايناليزر الي احنا نعرفه في لغات البرمجة او حاجه شبه كدا يعني

الـ Finalizer بيكون موجود في:

```yaml
metadata:
  finalizers:
    - example.com/finalizer-name
```

الـ Finalizers بتستخدم عشان الـ Controllers تعرف إنها لازم تعمل Cleanup لحاجات الـ Object كان مسؤول عنها قبل ما يتم حذفه.

---

### How Finalizers Work

لما تعمل Delete لـ Object عليه Finalizers:

 1. Kubernetes يضيف`deletionTimestamp`

مثلاً:

```yaml
metadata:
  deletionTimestamp: "2026-09-13T..."
```

وده معناه إن الـ Object **اتطلب حذفه**.

 2. الـ Object لا يتم حذفه مباشرة

بدل ما يختفي، يدخل في حالة:

```text
Terminating
```

3. Kubernetes يرجع HTTP 202

```text
202 Accepted
```

يعني Kubernetes قبل طلب الحذف، لكن الحذف النهائي لسه ما حصلش.

---
 4. الـ Controller المسؤول عن الـ Finalizer يتدخل

الـ Controller يشوف إن:

```yaml
metadata.deletionTimestamp
```

اتحدد.

فيعرف إن الـ Object مطلوب حذفه، ويبدأ يعمل الـ Cleanup أو الشروط المطلوبة.

 5. الـ Controller يشيل الـ Finalizer

بعد ما يخلص:

```yaml
metadata:
  finalizers: []
```

أو يشيل الـ Finalizer الخاص بيه من القائمة.

 6. Kubernetes يحذف الـ Object

لما:

```text
metadata.finalizers = empty
```

والـ `deletionTimestamp` موجود، Kubernetes يعتبر إن الحذف اكتمل ويزيل الـ Object نهائيًا.

- Finalizers Flow

```text
DELETE Object
      ↓
API Server
      ↓
deletionTimestamp added
      ↓
HTTP 202 Accepted
      ↓
Object = Terminating
      ↓
Controller performs cleanup
      ↓
Controller removes Finalizer
      ↓
finalizers = empty
      ↓
Kubernetes deletes Object
```

### استخدام Finalizers في Garbage Collection

ممكن تستخدم Finalizers للتحكم في **Garbage Collection**

مثلاً قبل ما Kubernetes يحذف Object، ممكن تحتاج:

- حذف API resources مرتبطة به.
- تنظيف Infrastructure مرتبطة به.
- تنفيذ Cleanup معين.
- التأكد إن Resource مبقاش يستخدم مستخدمًا.
    

الـ Finalizer نفسه عادة **مش بيحتوي على الكود**.

هو مجرد Key:

```yaml
finalizers:
  - example.com/cleanup
```

والـ Controller هو اللي يعرف

---

#### مثال: PersistentVolume Protection

من أشهر الـ Finalizers:

```text
kubernetes.io/pv-protection
```

لو عندك:

```text
PersistentVolume
      ↓
مستخدم بواسطة Pod
```

Kubernetes ممكن يضيف:

```yaml
metadata:
  finalizers:
    - kubernetes.io/pv-protection
```

لو حاولت تحذف الـ PersistentVolume:

```bash
kubectl delete pv my-pv
```

الـ PV مش هيتحذف فورًا.

هيفضل:

```text
Terminating
```

لأن الـ Finalizer لسه موجود.

بعد ما الـ Pod يبطل يستخدم الـ PersistentVolume:

```text
Pod stops using PV
        ↓
pv-protection removed
        ↓
PV deleted
```

---

### Important Notes About Finalizers

لما تعمل:

```text
DELETE Object
```

Kubernetes:

1. يضيف `deletionTimestamp`.
2. يبدأ يمنع التعديلات على الـ Finalizers بطريقة تسمح بإضافة Finalizer جديد.
3. تقدر **تشيل Finalizers موجودة**.
4. لا تقدر تضيف Finalizer جديد بعد بداية الحذف.
5. لا تقدر تعدل `deletionTimestamp`.


---

#### لا يمكن إحياء Object بعد Delete Request

بعد ما طلبت حذف الـ Object:

```text
DELETE requested
```

مينفعش تعمل:

```text
Resurrect Object
```

الطريقة الوحيدة لو محتاجه تاني:

```text
Delete old Object
      ↓
Create new similar Object
```

---

### Custom Finalizer Names

لو هتعمل Finalizer بنفسك، لازم الاسم يكون **publicly qualified**.

صح:

```text
example.com/finalizer-name
```

غلط:

```text
finalizer-name
```

Kubernetes API Server بيرفض Custom Finalizers اللي مش بالـ qualified format المطلوب.

---

## Owner References, Labels and Finalizers

في Kubernetes عندنا حاجات مختلفة بتوصف العلاقة بين الـ Objects، لكن كل واحدة لها وظيفة مختلفة.

---

### Labels

الـ Labels تستخدم في:

```text
Grouping
Selection
Tracking groups of related objects
```

مثلاً Controller ممكن يستخدم Label عشان يتتبع مجموعة Pods.

لو Job عمل Pods:

```text
Job
 ↓
Pods
```

الـ Job Controller ممكن يحط Labels على الـ Pods عشان يعرف الـ Pods المرتبطة بالـ Job.

---

### Owner References

الـ Owner Reference بتحدد العلاقة الحقيقية:
> مين الأونر بتاع الاوبجيكت دا

مثلاً:

```text
Job
 ↓
Pod
```

الـ Pod يكون عنده:

```yaml
metadata:
  ownerReferences:
```

تشير إلى الـ Job اللي عمله.

لو حذفت الـ Job والـ Pods لسه شغالة، Kubernetes يستخدم **Owner References وليس Labels** عشان يعرف أي Pods مرتبطة بالـ Job وبالتالي محتاجة Cleanup.

---

### Finalizers + Owner References

وقتها Kubernetes بيتعامل مع الـ Finalizers أثناء Garbage Collection لما يكون فيه Owner References.

ممكن Finalizers تمنع حذف Object أو Dependents لفترة أطول من المتوقع.

لو Object عالق في الحذف:

```text
Terminating
```

ممكن تحتاج تفحص:

```text
Finalizers
Owner References
```

عشان تعرف سبب المشكلة.

---
> مهم جدًا: ما تشيلش Finalizers يدويًا بدون فهم

لو Resource عالق في:

```text
Terminating
```

ما تعملش Remove للـ Finalizer عشوائيًا.

لأن الـ Finalizer غالبًا موجود لسبب.

إزالته بالقوة ممكن تعمل مشاكل، مثل إن Cleanup المطلوب ما يحصلش.

تشيله يدويًا فقط لما:

- تكون فاهم وظيفة الـ Finalizer.
- وتكون عملت الـ Cleanup بطريقة أخرى.
    

---

### Owners and Dependents

في Kubernetes بعض الـ Objects بتكون **Owners** لـ Objects أخرى.

مثال:

```text
ReplicaSet
    ↓
  Pods
```

الـ ReplicaSet = Owner

الـ Pods = Dependents

---

### Ownership vs Labels and Selectors

الـ Ownership مختلف عن Labels وSelectors.

مثلاً عندنا:

```text
Service
   ↓
EndpointSlices
```

الـ Service يستخدم Labels عشان الـ Control Plane يعرف الـ EndpointSlices المرتبطة بالـ Service.

لكن بالإضافة للـ Labels، كل EndpointSlice managed for a Service عنده:

```yaml
metadata:
  ownerReferences:
```

عشان يحدد الـ Owner.

الـ Owner References بتساعد أجزاء Kubernetes المختلفة إنها ما تتدخلش في Objects مش هي المسؤولة عنها.

---

### Owner References in Object Specifications

الـ Dependent Object عنده:

```yaml
metadata:
  ownerReferences:
```

والـ Owner Reference الصحيحة تحتوي على:

- Owner Name
- Owner UID
    
- وتكون ضمن العلاقة الصحيحة للـ Namespace.

الـKubernetes بيعمل Owner References تلقائيًا في حاجات زي:

```text
ReplicaSet
DaemonSet
Deployment
Job
CronJob
ReplicationController
```

مثلاً:

```text
Deployment
    ↓
ReplicaSet
    ↓
Pod
```

عادة مش محتاج تعمل العلاقات دي يدويًا.

---

### blockOwnerDeletion

في `ownerReferences` فيه field اسمه:

```yaml
blockOwnerDeletion: true
```

نوعه Boolean.

وظيفته التحكم في هل الـ Dependent يقدر يمنع Garbage Collection من حذف الـ Owner ولا لأ.

مثلاً:

```text
Owner
  ↓
Dependent
```

لو:

```yaml
blockOwnerDeletion: true
```

فالـ Dependent ممكن يمنع Garbage Collection من حذف الـ Owner في الحالات المناسبة.

الKubernetes ممكن يحدد القيمة تلقائيًا لما Controller زي Deployment Controller هو اللي بيعمل Owner Reference.

وفيه Admission Controller بيتحكم في صلاحية المستخدم لتغيير القيمة دي بناءً على صلاحيات Delete الخاصة بالـ Owner.

---

### Cross-Namespace Owner References

الـ Cross-Namespace Owner References **ممنوعة**.

يعني لو الـ Dependent Namespaced:

```text
Namespace A
   Owner
     ↓
Namespace B
   Dependent
```

ده غير مسموح.

لو الـ Owner Namespaced، لازم يكون في **نفس Namespace** بتاع الـ Dependent.

---

#### Namespaced Dependent

الـ Namespaced Dependent ممكن يكون Owner بتاعه في نفس الـ Namespace.

أو:

```text
Cluster-scoped Owner
```

---

#### Cluster-scoped Dependent

الـ Cluster-scoped Dependent لا يمكن يكون عنده Namespaced Owner.

من Kubernetes v1.20، لو حصل كده بيتم اعتبار الـ Owner Reference غير قابلة للحل، وبالتالي الـ Dependent مش هيقدر يدخل Garbage Collection بشكل طبيعي.

---
#### OwnerRefInvalidNamespace

من Kubernetes v1.20، لو Garbage Collector اكتشف Owner Reference غير صالحة بسبب Namespace:

بيطلع Warning Event بالـ Reason:

```text
OwnerRefInvalidNamespace
```

تقدر تبحث عنها:

```bash
kubectl get events -A --field-selector=reason=OwnerRefInvalidNamespace
```

---

### Ownership and Finalizers

لما تعمل Delete لـ Resource، الـ API Server يسمح للـ Controller المسؤول إنه يعالج الـ Finalizer Rules.

مثال:

```text
PersistentVolume
      ↓
Used by Pod
```

وعليه:

```text
kubernetes.io/pv-protection
```

لو عملت Delete:

```text
PV
 ↓
Terminating
```

ويفضل موجود لحد ما الـ PV ما يبقاش مستخدم بواسطة Pod.

بعدها:

```text
Finalizer removed
      ↓
PV deleted
```

---

#### Cascading Deletion

الKubernetes ممكن يستخدم Finalizers في:

```text
Foreground deletion
Orphan deletion
```

---

##### Foreground Deletion

في Foreground Deletion Kubernetes يضيف:

```text
foreground Finalizer.
```

الفكرة:

```text
Owner
 ↓
Dependents
```

الـ Owner يستنى الـ Dependents المطلوبة تتشال الأول.

يعني:

```text
Delete Owner
     ↓
Delete Dependents
     ↓
Delete Owner
```

والـ Dependents اللي عندها:

```yaml
blockOwnerDeletion: true
```

ممكن تمنع حذف الـ Owner لحد ما يتم التعامل معها.

---

##### Orphan Deletion

في Orphan Deletion Kubernetes يضيف:

```text
orphan
```

Finalizer.

الهدف إن الـ Owner يتحذف لكن الـ Dependents تفضل موجودة.

```text
Owner
 ↓
Delete Owner

Dependents
 ↓
Remain
```

---

### Recommended Labels

Kubernetes بيدعم أدوات أكتر من:

```text
kubectl
Dashboard
```

وجود مجموعة Labels مشتركة بيساعد الأدوات المختلفة إنها تفهم الـ Objects بنفس الطريقة.

الـ Recommended Labels بتوصف الـ Application وبتخلي التعامل معها أسهل.

---

#### الKubernetes لا يفرض مفهوم Application رسمي

Kubernetes:

- مش PaaS.
- مش عنده Formal Application Object لازم تستخدمه.
    
- الـ Application مفهوم Informal.
    
- بيتوصف باستخدام Metadata.
    

يعني Kubernetes بيسيب تعريف الـ Application مرن.

---
 Recommended Labels مش Required

الـ Labels دي:

```text
app.kubernetes.io/...
```

**Recommended فقط**.

مش مطلوبة عشان Kubernetes Core Tooling يشتغل.

لكن استخدامها بيسهل:

- إدارة الـ Applications.
- التعامل مع الأدوات المختلفة.
- Querying.
- Automation.

الـ Prefix المشترك:

```text
app.kubernetes.io
```

والـ Labels اللي من غير Prefix تعتبر ==User-private.==

 1. `app.kubernetes.io/name`

اسم الـ Application.
مثال:

```yaml
app.kubernetes.io/name: mysql
```

-`app.kubernetes.io/instance`

اسم Unique يحدد Instance معينة من الـ Application.

مثال:

```yaml
app.kubernetes.io/instance: mysql-abcxyz
```

3. `app.kubernetes.io/version`

Version الحالية للـ Application.
مثال:

```yaml
app.kubernetes.io/version: "5.7.21"
```

ممكن تكون:

```text
SemVer
Revision Hash
```

4. `app.kubernetes.io/component`

الـ Component داخل الـ Architecture.

مثال:

```yaml
app.kubernetes.io/component: database
```

5. `app.kubernetes.io/part-of`

اسم الـ Application الأكبر اللي الـ Component ده جزء منه.

مثال:

```yaml
app.kubernetes.io/part-of: wordpress
```

6. `app.kubernetes.io/managed-by`

الأداة اللي بتدير الـ Application.

مثال:

```yaml
app.kubernetes.io/managed-by: Helm
```

- Example: StatefulSet

مثال من الـ Documentation:

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

هنا:

```text
Application = mysql
Instance    = mysql-abcxyz
Version     = 5.7.21
Component   = database
Part of     = wordpress
Managed by  = Helm
```

---

### Applications and Instances

ممكن نفس الـ Application يتثبت أكتر من مرة في نفس Kubernetes Cluster.

مثلاً WordPress:

```text
WordPress Installation 1
WordPress Installation 2
WordPress Installation 3
```

كلهم نفس Application:

```yaml
app.kubernetes.io/name: wordpress
```

لكن كل Installation لها Instance مختلفة:

```yaml
app.kubernetes.io/instance: wordpress-abcxyz
```

يعني:

```text
Application
    ↓
wordpress

Instance
    ↓
wordpress-abcxyz
```

وكل Instance لازم يكون لها Unique Name.

Example: Simple Stateless Service

عندنا Application اسمها:

```text
myservice
```

عندنا Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: myservice
    app.kubernetes.io/instance: myservice-abcxyz
```

الـ Deployment مسؤول عن الـ Pods.

وعندنا Service:

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: myservice
    app.kubernetes.io/instance: myservice-abcxyz
```

الـ Service مسؤول عن Exposing الـ Application.

يعني الاتنين ممكن يكون عندهم نفس:

```text
name
instance
```

عشان الأدوات تعرف إنهم جزء من نفس Application Instance.

Example: Web Application With Database

عندنا Application كبيرة:

```text
WordPress
```

والـ Application فيها:

```text
WordPress Server
MySQL Database
```

ومستخدمة عن طريق:

```text
Helm
```

- WordPress Deployment

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
```

هنا:

```text
name       = wordpress
instance   = wordpress-abcxyz
version    = 4.9.4
managed by = Helm
component  = server
part of    = wordpress
```

---

## WordPress Service

```yaml
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

الـ Service هنا بيعمل Expose للـ WordPress.

- MySQL StatefulSet

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
```

هنا:

```text
name       = mysql
instance   = mysql-abcxyz
version    = 5.7.21
managed by = Helm
component  = database
part of    = wordpress
```

لاحظ إن:

```yaml
app.kubernetes.io/name: mysql
```

لكن:

```yaml
app.kubernetes.io/part-of: wordpress
```

يعني MySQL نفسه Application/Component منفصل، لكنه جزء من WordPress Application الأكبر.

---

## MySQL Service

```yaml
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

وبالتالي الـ MySQL StatefulSet والـ MySQL Service عندهم Metadata بتوضح:

```text
MySQL
 ↓
Database Component
 ↓
Part of WordPress
```

---

## Storage Versions

## يعني إيه Storage Version؟

الـKubernetes API Server بيخزن الـ Objects في:

```text
etcd-compatible backing store
```

وغالبًا بيكون:

```text
etcd
```

كل Object بيتخزن Serialized باستخدام Version معينة.

الـ Version دي اسمها:

```text
Storage Version
```

---

### API Version vs Storage Version

لازم تفرق بينهم.

مثلاً Resource عنده:

```text
v1
v2
```

الـ Client ممكن يتعامل مع الـ API باستخدام أي Version مدعومة.

لكن الـ Object نفسه بيتخزن في الـ Storage باستخدام Storage Version.

Kubernetes بيعمل Automatic Conversion.

مثال:

```text
Client
  ↓
API v1
  ↓
API Server
  ↓
Conversion
  ↓
Storage Version
  ↓
etcd
```

---

#### مثال HPA

لو عندك:

```text
HorizontalPodAutoscaler
```

ممكن تتعامل معاه باستخدام:

```text
v1
```

أو:

```text
v2
```

فKubernetes يحول الـ API Calls تلقائيًا، وبالتالي الـ Client مش محتاج يعرف الـ Storage Version الفعلية.

---

### ليه Storage Version مهمة؟

مهمة للـ Cluster Administrators لأنها بتربط:


API Representation
Actual Stored Encoding
Storage Backend


وده مهم خصوصًا في حاجات زي:

```text
Encryption at Rest
API Deprecation
Storage Migration
```

---

### API Version Separate From Storage Version

الـ API Version والـ Storage Version مش نفس الحاجة.

مثلاً ممكن يكون عندك:

```text
v1alpha1
v1beta1
```

لنفس Resource.

الاتنين ممكن يتم التعامل معهم كـ API Versions مختلفة.

لكن طالما Storage Version نفسها ما اتغيرتش، الاتنين ممكن يتم تخزينهم بنفس الـ Storage Encoding.

يعني:

> v1alpha1 API & v1beta1 API in same storage version


---

### Storage Version to Resource Mapping

كل Resource عنده:

```text
1 active Storage Version
```

في أي وقت. أي Write للـ Object بيستخدم الـ active Storage Version.

- لكن ممكن يكون عندك Old Objects

لو Storage Version اتغيرت:

```text
Old Storage Version
        ↓
New Storage Version
```

ممكن تلاقي Objects مختلفة متخزنة باستخدام Versions مختلفة.

مثلاً:

```text
Object A → Old Storage Version
Object B → New Storage Version
```

كل Object في لحظة معينة بيتخزن باستخدام Storage Version واحدة فقط.

---

### Read vs Write

دي نقطة مهمة جدًا.

#### Read

لما تعمل:

```text
GET
```

الـ API Server:

```text
Storage
Read stored object
Convert
Requested API representation
```

الـ Object ممكن يفضل متخزن بالـ Old Storage Version.

يعني مجرد:

```text
GET
```

مش بيعمل Migration.

---

#### Write / Update

لما تعمل:

```text
CREATE
UPDATE
```

بيتم استخدام الـ New Storage Version.

يعني:

```text
Old Storage Object
     UPDATE
New Storage Version
```

---

### Custom Resources Storage Versions

الـ Custom Resources مختلفة عن Built-in Resources.

الـ CRs بتتحدد dynamically عن طريق:

```text
CustomResourceDefinition (CRD)
```

وبالتالي لازم تحدد Version معينة تكون:

```yaml
storage: true
```

- CRD Example

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

---

### Served vs Storage

#### Served

```yaml
served: true
```

معناها إن الـ Version ==دي متاحة للـ API Clients.==

---
#### Storage

```yaml
storage: true
```

معناها إن الـ Version دي هي اللي Kubernetes يستخدمها لتخزين الـ CRs.

ولازم:

```text
One and only one version
```

تكون:
```yaml
storage: true
```

- CRD Example Explanation

في المثال:
```yaml
v1beta1:
  served: true
  storage: true
```

و:

```yaml
v1:
  served: true
  storage: false
```

يبقى:

```text
v1beta1 = Storage Version
v1       = Served API Version
```

---
مشكلة الـ `time` Field

في المثال:

```text
v1beta1
```

عندها:

```text
host
port
```

لكن:

```text
v1
```

عندها:

```text
host
port
time
```

وبما إن:

```text
v1beta1 = Storage Version
```

فـ Storage Schema بتاعة `v1beta1` مش فيها:

```text
time
```

وبالتالي الـ `v1` API Object مش هيقدر يحتفظ بالـ `time` field في الـ Storage بالشكل ده، لأن Storage Definition نفسها لا تحتوي على الـ field.

---
### تغيير Storage Version

لو غيرت الـ Storage Version:

```text
Old Version
New Version
```

أي Objects جديدة أو Updates جديدة تستخدم الـ New Storage Version.

لكن Objects القديمة **مش بتتحول كلها تلقائيًا بمجرد تغيير الـ Storage Version**.

- GET

```text
GET Old Object
	Conversion
API Response
```

الـ Object ممكن يفضل بالـ Old Storage Version.

- UPDATE

```text
UPDATE Old Object
New Storage Version
Object rewritten
```

يعني الـ Update هو اللي يخلي الـ Object يتكتب بالـ New Storage Version.

---

- Storage Versions + Encryption at Rest

Kubernetes ممكن يستخدم:

```text
Encryption at Rest
```

خصوصًا لحماية حاجات زي:

```text
Secrets
```

بدل ما البيانات تكون محفوظة بشكل قابل للقراءة مباشرة في الـ Storage، يتم تشفيرها.

الـ API Server لما يقرأ البيانات:

```text
Storage
Encrypted Data
API Server decrypts
Object
```

والـ API Server لازم يكون عنده الـ Key/Configuration المناسب عشان يعرف يتعامل مع البيانات المخزنة.

---

### Key Rotation

لو عملت:

```text
Encryption Key Rotation
```

هيكون عندك:

```text
Old Key
New Key
```

وممكن بعض الـ Objects تكون لسه متخزنة باستخدام الـ Old Key.

لذلك لازم الـ Old Key والـ New Key يفضلوا متاحين لحد ما تتأكد إن الـ Objects اتكتبت مرة أخرى باستخدام الـ New Key.

لأن الـ Object لازم يكون:

```text
actively written / updated
```

عشان ينتقل للـ New Storage Version / representation حسب الحالة.

---

### Migrating to a Different Storage Version

وجود أكتر من Storage Version لنفس Resource ممكن يعمل مشاكل للـ Cluster Administrator.

مثلاً لو عندك:

```text
Old Storage Version
```

ولسه Objects كتير بتستخدمها، مينفعش ببساطة تشيل الـ Old API/Version.
لأن ممكن يحصل:

```text
Remove Old Version
Objects still stored with Old Version
Unable to read some objects
```

---
### المشكلة مع عدد كبير من Objects

لو عندك عدد كبير جدًا من Objects:

```text
Object 1 → Old
Object 2 → New
Object 3 → Old
Object 4 → New
...
```

ممكن يبقى صعب تعرف هل كل الـ Objects انتقلت للـ New Storage Version ولا لأ.

وده يخلي إزالة الـ Old Version خطر.

---

# Encryption Keys Problem

نفس الفكرة مع Encryption Keys.
لو بعض Objects لسه مستخدمة الـ Old Encryption Key:

```text
Old Key
  ↓
Some Objects
```

وإنت شلت الـ Old Key:

```text
Remove Old Key
      ↓
Old encrypted objects
      ↓
Cannot decrypt/read
```

لذلك لازم تتأكد إن كل الـ Objects اتعمل لها Rewrite باستخدام الـ New Key قبل إزالة الـ Old Key.

---
### Storage Version Migration

Kubernetes عنده مفهوم:

```text
Storage Version Migration
```

هدفه إنك تقدر تنقل الـ Objects من:

```text
Old Storage Version
```

إلى:

```text
New Storage Version
```

بدون ما تضطر تعمل Update يدوي لكل Object.

---