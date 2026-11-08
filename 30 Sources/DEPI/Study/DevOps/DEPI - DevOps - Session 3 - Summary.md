---
title: "DEPI - DevOps - Session 3 - Summary"
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

# Permissions and Ownerships
 ليه لما نيجي ننقل الملكية ليوزر تاني او نغير الجروب بأي كانت الطريقة مش بيحصل ويظهرلنا ال Error دا

Operation not Permitted

ودا بسبب ال Cabability

يطلعوا ايه ال capabilities دول ؟

الـ **Capabilities** في لينكس هي آلية بتقسّم صلاحيات المستخدم **root** إلى صلاحيات أصغر ومستقلة، بدل ما يكون عندك إما Root يقدر يعمل كل حاجة أو User عادي ميقدرش يعمل حاجة.

قديمًا:

- لو أنت **Root (UID = 0)** → عندك كل الصلاحيات.
- لو User عادي → معندكش الصلاحيات دي.

فقسملك الحاجه دي لحاجتين

## 1. Privileged Process

هي أي **Process** تمتلك صلاحيات خاصة (Privileges أو Capabilities) تسمح لها بتنفيذ عمليات اليوزر العادي ميقدرش ينفذها.

أمثلة على ما تستطيع فعله:

- تغيير مالك الملفات (`chown`)
- فتح منافذ أقل من 1024 (مثل 80 و443)
- تحميل أو إزالة Kernel Modules
- تغيير إعدادات الشبكة
- إيقاف أو إعادة تشغيل الجهاز
    

عادةً تكون:

- Process تعمل كمستخدم **root**.
- أو Process لديها **Linux Capabilities** مثل `CAP_CHOWN` أو `CAP_NET_ADMIN`.


**مثال:**

```bash
sudo chown ahmed file.txt
```

البرنامج `chown` هنا يعمل بصلاحيات Root، لذلك يعتبر **Privileged Process**.

---

## 2. Unprivileged Process

هي Process تعمل بصلاحيات مستخدم عادي، ولا تمتلك Capabilities خاصة.

لذلك لا تستطيع تنفيذ العمليات الحساسة.

مثال:

```bash
chown ahmed file.txt
```

بدون `sudo` سيظهر:

```text
Operation not permitted
```

لأنها **Unprivileged Process**.

---

### مثال يوضح الفرق

لنفترض أن لديك ملفًا:

```bash
-rw-r--r-- 1 mahmoud users file.txt
```

إذا شغلت:

```bash
cat file.txt
```

فهذا مجرد قراءة، ولا يحتاج صلاحيات خاصة، لذا أي **Unprivileged Process** (إذا كانت صلاحيات الملف تسمح) يمكنه تنفيذ ذلك.

أما إذا شغلت:

```bash
chown ali file.txt
```

فهذا يحتاج `CAP_CHOWN`.

- إذا كانت العملية **Unprivileged** → سترى:
    
    ```
    Operation not permitted
    ```
    
- إذا كانت العملية **Privileged** → سينجح الأمر.


لكن مع الـ **Linux Capabilities**، كل صلاحية اتفصلت لوحدها، زي:

- `CAP_CHOWN` → تغيير مالك الملف (`chown`).
- `CAP_DAC_OVERRIDE` → تجاوز صلاحيات القراءة والكتابة والتنفيذ.
- `CAP_NET_ADMIN` → إدارة إعدادات الشبكة.
- `CAP_SYS_ADMIN` → صلاحيات إدارية كثيرة على النظام.
- `CAP_SETUID` → تغيير الـ UID.
- `CAP_SETGID` → تغيير الـ GID.
    

---

### ليه بيظهر `Operation not permitted` مع `chown` أو تغيير الجروب؟

لأن تغيير مالك الملف (`chown`) يحتاج الـ **Capability** اسمها:

```
CAP_CHOWN
```

لو العملية (Process) اللي شغالة معندهاش الـ Capability دي، الكيرنل هيرفض الطلب ويرجع:

```
Operation not permitted
```

حتى لو الملف بتاعك.

---

### مثال

لو User عادي كتب:

```bash
chown ali file.txt
```

هيظهر:

```bash
chown: changing ownership of 'file.txt': Operation not permitted
```

لأنه معندوش `CAP_CHOWN`.

---

### طب والجروب؟

لو استخدمت:

```bash
chgrp developers file.txt
```

- لو الجروب `developers` أنت عضو فيها → غالبًا هينجح (إذا كنت مالك الملف).
    
- لو مش عضو فيها → هتاخد:
    

```bash
Operation not permitted
```

لأن الكيرنل بيتحقق من الصلاحيات والـ Capabilities.

---

### مين عنده الـ Capabilities؟

الـ Root عادةً يمتلك كل الـ Capabilities، لذلك يقدر ينفذ:

```bash
sudo chown user file.txt
```

أما البرامج أو العمليات فيمكن إعطاؤها Capability معينة فقط بدون منحها صلاحيات Root كاملة باستخدام أمر مثل:

```bash
sudo setcap cap_chown+ep program
```

في الحالة دي البرنامج هيقدر يغير ملكية الملفات لأنه امتلك `CAP_CHOWN` فقط، وليس كل صلاحيات Root.

كلمة sudo دي اختصار لـ Super User do

يعني احنا بنعمل الحاجة دي بس بماهية يوزر تاني
موجود في /etc/sudoers

![[Pasted image 20260803122243.png]]

انت هنا تقدر تدي يوزر صلاحيات، او جروب صلاحيات
عندك حاجه اسمها ال wheel ودا لو انت عايز اي حد يشتغل بصلاحيات اي حاجه بتحطه في جروب ال wheel

---

### الخلاصة

- **Capabilities** = مجموعة صلاحيات صغيرة داخل نواة لينكس بدل صلاحيات Root الكاملة.
    
- عند تنفيذ `chown` يحتاج البرنامج أو العملية إلى **`CAP_CHOWN`**.
    
- إذا كانت الـ Capability المطلوبة غير موجودة، الكيرنل يرفض العملية ويظهر:
    
    ```
    Operation not permitted
    ```
    
- الهدف من Capabilities هو تطبيق مبدأ **Least Privilege**: إعطاء كل برنامج أقل قدر من الصلاحيات التي يحتاجها فقط، مما يزيد من أمان النظام.

---
# Process Monitoring

اي Program عبارة عن Steps of Instructions اول ما يشتغل هيبقى Process لان ساعتها بيحجز resources من الجهاز سواء كانت ram , cpu , storage 

وال Process ليها Life Cycle


![[Pasted image 20260805074358.png]]


في لينكس بقى في نوعين من ال Process 
- Simple Process 
- Frok Process

![[Pasted image 20260805074659.png]]

دا شكل ال Frok Process اما ال simple فهي مجرد بروسيس بس 
عندنا أمرين مهمين جدًا في لينكس علشان تتابع ال Processes وهي شغالة وهما:

- `top`
    
- `ps`
    

كل واحد ليه استخدام مختلف، وهنعرف امتى نستخدم كل واحد.

---
## top

أمر **`top`** في لينكس بيستخدم علشان يعرضلك كل ال Processes الي شغالة حاليًا على النظام بشكل **Live** يعني الشاشة بتفضل تحدث نفسها كل كام ثانية.

اول ما تكتب:

```bash
top
```

هيفتحلك شاشة فيها معلومات عن الجهاز والـ Processes كلها وهي شغالة.

---

### أول جزء : معلومات عن النظام

في أول الشاشة هتلاقي معلومات زي:

- **Uptime**
    
    - الجهاز شغال بقاله قد اي بدون Restart.
        
- **Load Average**
    
    - حمل الجهاز خلال آخر:
        
        - دقيقة.
        - 5 دقائق.
        - 15 دقيقة.

- عدد ال Users الحاليين.
- نسبة استهلاك ال CPU
- نسبة استهلاك ال RAM.
- استخدام الـ Swap.

مثال:

```text
top - 10:20:15 up 2 days, 3:15, 2 users, load average: 0.30, 0.45, 0.60
```

---

### تاني جزء : قائمة ال Processes

بعد معلومات النظام هيبدأ يعرضلك كل Process شغالة.

كل سطر بيمثل Process واحدة.

| Column  | Meaning                                 |
| ------- | --------------------------------------- |
| PID     | رقم العملية                             |
| USER    | اليوزر اللي مشغلها                      |
| PR      | الأولوية (Priority)                     |
| NI      | قيمة الـ Nice                           |
| VIRT    | الذاكرة الافتراضية                      |
| RES     | الذاكرة الفعلية المستخدمة               |
| SHR     | الذاكرة المشتركة                        |
| S       | حالة العملية (Running - Sleeping ...)   |
| %CPU    | استهلاك المعالج                         |
| %MEM    | استهلاك الرام                           |
| TIME+   | الوقت اللي استخدمته العملية على الـ CPU |
| COMMAND | اسم البرنامج أو الأمر                   |


---
### أهم الاختصارات داخل top

| Shortcut | Meaning                       |
| -------- | ----------------------------- |
| `q`      | الخروج من `top`               |
| `P`      | ترتيب حسب استهلاك الـ CPU     |
| `M`      | ترتيب حسب استهلاك الـ RAM     |
| `T`      | ترتيب حسب وقت استخدام الـ CPU |
| `k`      | قتل Process (هيطلب منك PID)   |
| `r`      | تغيير قيمة الـ Nice           |
| `h`      | عرض المساعدة                  |

---

### مثال

لو ظهر عندك:

```text
PID USER  %CPU %MEM COMMAND
2456 root 85.3 3.2 nginx
3150 user 40.1 1.5 firefox
```

يبقى:

- الـ **nginx** بيستهلك حوالي **85%** من المعالج.
- الـ **firefox** بيستهلك حوالي **40%** من المعالج.
    

---
## ps

طيب لو أنا مش محتاج شاشة Live، وعايز أعرف ايه ال Processes الموجودة **في اللحظة دي بس**؟

هستخدم أمر اسمه:

```bash
ps
```

كلمة **ps** اختصار لـ **Process Status**.

وظيفته إنه يعرضلك ال Processes الموجودة حاليًا، لكنه **مش بيحدث نفسه باستمرار** زي `top`.

يعني أول ما ينفذ الأمر بياخد **Snapshot** للـ Processes الموجودة في اللحظة دي ويعرضها، وبعدها ينتهي.

---

### أشهر استخداماته

#### 1. عرض العمليات الخاصة باليوزر الحالي

```bash
ps
```

مثال:

```text
PID TTY          TIME CMD
2156 pts/0    00:00:00 bash
3201 pts/0    00:00:00 ps
```

ومعنى الأعمدة:

- **PID**
    - رقم العملية.
- **TTY**
    - التيرمنال اللي العملية شغالة عليه.
- **TIME**
    - الوقت اللي العملية استخدمته من الـ CPU.
- **CMD**
    - اسم البرنامج أو الأمر.


---

#### 2. عرض كل العمليات الموجودة على النظام

```bash
ps -e
```

أو

```bash
ps -A
```

الاتنين نفس الفكرة، وهيعرضوا كل ال Processes الموجودة على الجهاز.

---

#### 3. عرض معلومات أكثر

```bash
ps -ef
```

أو

```bash
ps aux
```

وده أكتر استخدام هتقابله، لأنه بيعرض معلومات زيادة عن كل Process.

مثال:

```text
UID   PID  PPID  %CPU %MEM COMMAND
root    1     0   0.0  0.1 /sbin/init
root  550     1   0.3  0.8 sshd
user 2031   550   5.1  2.4 firefox
```

أهم الأعمدة:

- **UID**
    - صاحب العملية.
- **PID**
    - رقم العملية.
- **PPID**
    - رقم الـ Parent Process.
- **%CPU**
    - نسبة استهلاك المعالج.

- **%MEM**
    - نسبة استهلاك الرام.

- **COMMAND**
    - اسم البرنامج أو الأمر اللي شغل العملية.

---

#### 4. البحث عن Process معينة

غالبًا هنستخدم `grep`.

مثلاً:

```bash
ps -ef | grep nginx
```

أو

```bash
ps aux | grep ssh
```

وده هيجيب أي Process اسمها `nginx` أو `ssh`.

---

## الفرق بين `top` و `ps`

|`top`|`ps`|
|---|---|
|بيعرض ال Processes بشكل Live|بياخد Snapshot مرة واحدة|
|الشاشة بتفضل تتحدث|الأمر بينتهي بعد التنفيذ|
|مناسب لمراقبة أداء الجهاز|مناسب للبحث عن Process أو معرفة PID|
|استهلاكه أعلى شوية|استهلاكه أقل|

---

##### امتى أستخدم كل واحد؟

استخدم **`top`** لو:

- عايز تعرف مين بيستهلك الـ CPU دلوقتي.
    
- عايز تعرف مين بيستهلك الـ RAM.
    
- عايز تتابع الجهاز لحظة بلحظة.
    

أما استخدم **`ps`** لو:

- عايز تعرف هل Process معينة شغالة ولا لأ.
    
- عايز تجيب الـ PID.
    
- هتستخدمه داخل Shell Script.
    

---
## Sleep

أحيانًا وإنت بتكتب Shell Script أو حتى بتجرب أوامر، هتحتاج توقف تنفيذ الأوامر لمدة معينة.

في الحالة دي بنستخدم أمر اسمه:

```bash
sleep time
```

الـ `time` هنا هي المدة اللي عايز البرنامج يستناها قبل ما يكمل تنفيذ.

مثلاً:

```bash
sleep 5
```

هيستنى **5 ثواني** وبعدها يكمل.

ممكن برضو:

```bash
sleep 30
```

يستنى 30 ثانية.

أو:

```bash
sleep 60
```

يستنى دقيقة.

وكمان تقدر تستخدم وحدات زمنية بدل الثواني:

```bash
sleep 5m
```

يعني 5 دقائق.

```bash
sleep 2h
```

يعني ساعتين.

```bash
sleep 1d
```

يعني يوم كامل.

---

### طب لو عايز أوقف `sleep` قبل ما يخلص؟

قدامك طريقتين.

#### أول طريقة

لو الأمر شغال في نفس الـ Terminal.

اضغط:

```text
Ctrl + C
```

وده هيبعت Signal اسمها:

```text
SIGINT (2)
```

للـ Process وهتقفل فورًا.

---

#### تاني طريقة

لو الـ Process شغالة في Terminal تاني أو في الخلفية.

هتحتاج تستخدم أمر اسمه:

```bash
kill
```

---

## kill
وظيفته الأساسية هي:

> إرسال **Signal** إلى Process معينة.

وبعدين الـ Process نفسها هي اللي تقرر تتصرف إزاي حسب نوع الـ Signal اللي وصلتلها.

---
### يعني ايه Signal؟

الـ **Signal** عبارة عن رسالة صغيرة بيبعتها النظام أو اليوزر للـ Process علشان يقولها تعمل حاجة معينة.

مثلاً:

- اقفل.
    
- وقف مؤقت.
    
- كمل شغلك.
    
- أعد تحميل الإعدادات.
    

يعني `kill` مش بيقتل العملية دايمًا، هو مجرد بيبعتلها Signal.

---

#### صيغة الأمر

```bash
kill [signal] PID
```

- **PID**
    
    - رقم الـ Process.
        
- **signal**
    
    - الإشارة اللي هتتبعت للـ Process.
        

مثال:

```bash
kill 3250
```

---

### طب لو مكتبتش Signal؟

ساعتها `kill` هيبعت تلقائيًا:

```text
SIGTERM (15)
```

وده معناه:

> "اقفل نفسك بشكل طبيعي."

---

### طب أجيب الـ PID منين؟

غالبًا باستخدام:

```bash
ps -ef
```

أو

```bash
ps aux
```

مثلاً:

```text
root   3250 ... nginx
```

يبقى الـ PID هو:

```text
3250
```

بعدها تقدر تعمل:

```bash
kill 3250
```

---

### اشهر الـ Signals

مش كل Signal معناها قتل.

كل واحدة ليها وظيفة مختلفة.

---

#### SIGTERM (15)

دي الإشارة الافتراضية.

يعني لما تكتب:

```bash
kill PID
```

أو

```bash
kill -15 PID
```

يبقى الاتنين نفس الحاجة.

الـ Process هنا بتاخد فرصة إنها:

- تحفظ البيانات.
- تقفل الملفات
- تقفل أي Connections.
- تعمل Cleanup.
- وبعدها تقفل.
علشان كده دي أول حاجة بنجربها.

---

#### SIGKILL (9)

لو الـ Process مرضيتش تقفل.

بنستخدم:

```bash
kill -9 PID
```

وده معناه:

> اقفل العملية فورًا (Force).

الـ Process هنا مش هتلحق:

- تحفظ ملفات.
    
- تعمل Cleanup.
    
- تقفل Connections.
    

النواة (Kernel) بتنهيها مباشرة.

علشان كده `kill -9` بيكون آخر حل.

---

#### SIGINT (2)

دي الإشارة اللي بتتبعت لما تضغط:

```text
Ctrl + C
```

مثلاً:

```bash
sleep 1000
```

وبعدين ضغطت:

```text
Ctrl + C
```

اللي حصل فعليًا إن النظام بعت:

```text
SIGINT (2)
```

للـ Process.

---

### ليه بنكتب 9 أو 15؟

كل Signal في لينكس ليها:

- اسم.
    
- رقم.
    

مثلاً:

|الرقم|الاسم|
|---|---|
|2|SIGINT|
|9|SIGKILL|
|15|SIGTERM|
|18|SIGCONT|
|19|SIGSTOP|

علشان كده:

```bash
kill -9 PID
```

يعني:

> ابعت Signal رقم 9 وهي `SIGKILL`.

---

### أشوف كل الـ Signals ازاي؟

استخدم:

```bash
kill -l
```

هيظهرلك حاجة زي:

```text
1) SIGHUP
2) SIGINT
3) SIGQUIT
4) SIGKILL
5) SIGTERM
6) SIGCONT
7) SIGSTOP
...
```

---

#### مثال عملي

شغل Process:

```bash
sleep 300
```

هات الـ PID:

```bash
ps -ef | grep sleep
```

اقفلها بشكل طبيعي:

```bash
kill PID
```

لو مرضيتش تقفل:

```bash
kill -9 PID
```

---
## Jobs

الـ **Job** هي ==أي Process شغالة من نفس الـ Terminal بتاعك==، وتقدر تتحكم فيها (تشغلها، توقفها، أو تخليها تشتغل في الخلفية).

---
### Background Job

لو عايز تشغل أمر وتفضل تستخدم الـ Terminal في نفس الوقت، حط ==علامة `&` في آخر الأمر==.

مثلاً:

```bash
sleep 100 &
```

هيشتغل `sleep` في الخلفية (Background)، والـ Terminal هترجعلك مباشرة.

هيظهرلك حاجة زي:

```text
[1] 3250
```

الرقم الأول:

```text
[1]
```

ده **Job ID**.

أما:

```text
3250
```

فده **PID** الخاص بالـ Process.

---

### أشوف الـ Jobs الموجودة

استخدم:

```bash
jobs
```

مثال:

```text
[1]+ Running    sleep 100 &
[2]- Running    sleep 200 &
```

وده هيعرض كل الـ Jobs اللي شغالة من الـ Terminal الحالي.

---

### إيقاف Job مؤقتًا

لو شغلت أمر في الـ Foreground زي:

```bash
sleep 100
```

وبعدين ضغطت:

```text
Ctrl + Z
```

فالعملية **مش هتتقفل**.

هيتبعتلها Signal اسمها:

```text
SIGSTOP
```

وتدخل في حالة اسمها:

```text
Stopped
```

---
### تشغيل الـ Job في الخلفية

بعد ما تعمل:

```text
Ctrl + Z
```

نفذ:

```bash
bg
```

أو لو عندك أكتر من Job:

```bash
bg %1
```

هتشتغل العملية في الخلفية، وتقدر تكمل شغلك على الـ Terminal.

---

### ترجع الـ Job للواجهة

لو عايز العملية ترجع تشتغل قدامك في الـ Terminal تاني:

```bash
fg 1
```

أو:

```bash
fg %1
```

ساعتها الـ Job هترجع تشتغل في الـ Foreground.

---

### الفرق بين `bg` و `fg`

|Command|Meaning|
|---|---|
|`bg`|يشغل الـ Job في الخلفية (Background)|
|`fg`|يرجع الـ Job للواجهة (Foreground)|

---

### قتل Job

تقدر تقتل الـ Job باستخدام رقمها:

```bash
kill %1
```

أو باستخدام الـ PID:

```bash
kill 3250
```

ولو مش راضية تقفل:

```bash
kill -9 3250
```

---
#### مثال عملي

شغل أمر:

```bash
sleep 300
```

اضغط:

```text
Ctrl + Z
```

هتلاقي رسالة زي:

```text
[1]+ Stopped    sleep 300
```

شغله في الخلفية:

```bash
bg
```

اعرض الـ Jobs:

```bash
jobs
```

رجعه للواجهة:

```bash
fg
```

ولو خلصت منه:

```bash
kill %1
```

---
### خلاصة الموضوع دا

- أي Process بتشغلها من الـ Terminal تعتبر **Job**.
    
- `&` بيشغل الأمر في الـ Background مباشرة.
    
- `jobs` يعرض كل الـ Jobs الموجودة.
    
- `Ctrl + Z` يوقف الـ Job مؤقتًا (Stopped).
    
- `bg` يشغل الـ Job في الخلفية.
    
- `fg` يرجع الـ Job للواجهة.
    
- `kill` يقدر ينهي الـ Job سواء باستخدام **PID** أو **Job ID** (`%1`).

---

# Demons in Linux

الـsystemd دي اول Process بتقوم في اللينكس وهي المسؤولة انها تقوم باقي ال Process الي فاللينكس، d دي اختصار لكلمة demon

ساعتها بقى اي حاجه مكتوب اخرها d فدا على طول تعرف انها شغالة في ال Background

في لينكس معندناش Extension يعني لو لقينا ملف اسمه test.txt فدا اسمه كامل مش اسمه و اكستنشن عكس الويندوز

ليه هي كدا ؟
علشان اليوزر و باقي ال programs تميز

---

## Types of Demons

عندنا Demons دي مقسمة انواع

![[Pasted image 20260805101435.png]]

---
### Service 
ودي اكتر حاجه شائعة في الاستخدام

- لو عندي ابلكيشن وعايزه يشتغل ف هو بيتعامل ك service ع الهوست بتاعي، ف انا عايز اتحكم فيه لو عايزه يشتغل اول ما الجهاز يشتغل وما إلى ذلك..
 
- وساعتها أقدر أتحكم فيه بسهولة باستخدام:

```bash
systemctl start service_name
```

أوقفه:

```bash
systemctl stop service_name
```

أعمله Restart:

```bash
systemctl restart service_name
```

وأخليه يشتغل أول ما الجهاز يعمل Boot:

```bash
systemctl enable service_name
```

---
### Socket

- الـ **Socket Unit** مسؤولة عن استقبال أي Connection جاي من برنامج تاني أو من الشبكة.

- بمجرد ما ييجي Connection، تقوم `systemd` بتشغيل الـ Service المطلوبة.

- يعني بدل ما الـ Service تفضل شغالة طول الوقت، الـ Socket تستنى أي Request، ولما ييجي تشغل الـ Service.

- وده بيساعد في تقليل استهلاك الـ Resources.

- ومن أشهر استخداماته:
	- الـIPC (Inter Process Communication).
	- الـNetwork Services.

---

### Timer
الـ **Timer** يعتبر البديل الحديث للـ **Cron**.

وظيفته إنه يشغل Service في وقت معين أو كل فترة زمنية معينة.

مثلاً:

- كل يوم الساعة 12.
- كل ساعة.
- كل 10 دقائق.

بدل ما تستخدم:

```bash
cron
```

تقدر تستخدم:

```bash
systemd Timer
```

---

### Path

الـ **Path Unit** بتراقب File أو Directory معين.
أول ما يحصل تغيير عليه، تقوم بتشغيل Service معينة.

يعني مثلاً:

- لو File جديد اتضاف.
- أو ملف اتعدل.
- أو Folder اتغير محتواه.

ساعتها `systemd` تشغل الـ Service اللي انت محددها.

وده مفيد جدًا في الـ Automation.

---

ال Systemd لما يشتغل هيروح ل dir معين هيشوف كل ال services ويشغلها وليه dir تاني بس مش تحت شرط يشتغلوا دا بمزاجك انت يعني

الdir الي بيشغلها ال systemd 

```
/etc/systemd/system
```

علشان نتحكم في ال service بشكل مريح وبطريقة اسهل واحسن هنتعامل ب systemctl 

## systemctl

بعد ما عرفنا إن **`systemd`** هي المسؤولة عن إدارة الـ Services والـ Daemons، فإحنا محتاجين أمر نتعامل بيه معاها.

الأمر ده اسمه:

```bash
systemctl
```

وده يعتبر **الأداة الرسمية للتحكم في `systemd`**.

من خلاله تقدر:

- تشغل Service.
- توقف Service.
- تعمل Restart.
- تعرف حالتها.
- تخليها تشتغل مع بداية تشغيل الجهاز.
- تلغي تشغيلها مع بداية التشغيل.
    

---

### 1. معرفة حالة Service

لو عايز تعرف هل Service شغالة ولا لأ:

```bash
systemctl status service_name
```

مثال:

```bash
systemctl status nginx
```

هيظهرلك معلومات زي:

- هل الـ Service شغالة ولا لا.
    
- الـ PID.
    
- من إمتى وهي شغالة.
    
- آخر Logs الخاصة بيها.
    

---

### 2. تشغيل Service

```bash
systemctl start service_name
```

مثال:

```bash
systemctl start nginx
```

هيشغل الـ Service لو كانت متوقفة.

---

### 3. إيقاف Service

```bash
systemctl stop service_name
```

مثال:

```bash
systemctl stop nginx
```

هيوقف الـ Service.

---

### 4. إعادة تشغيل Service

بعد ما تعدل في Configuration أو يحصل أي تغيير، غالبًا هتحتاج تعمل Restart.

```bash
systemctl restart service_name
```

مثال:

```bash
systemctl restart nginx
```

---

### 5. إعادة تحميل الـ Configuration

أحيانًا الـ Service بتدعم إنها تقرأ الـ Configuration من جديد من غير ما تعمل Restart.

```bash
systemctl reload service_name
```

مثال:

```bash
systemctl reload nginx
```

وده أفضل من الـ Restart لأنه مش بيوقف الخدمة.

---

### 6. تشغيل الـ Service مع بداية تشغيل الجهاز

لو عايز الـ Service تشتغل كل مرة الجهاز يعمل Boot:

```bash
systemctl enable service_name
```

مثال:

```bash
systemctl enable nginx
```

---

### 7. منع الـ Service من العمل مع بداية التشغيل

```bash
systemctl disable service_name
```

مثال:

```bash
systemctl disable nginx
```

---

### 8. معرفة هل الـ Service شغالة ولا لا

```bash
systemctl is-active service_name
```

مثال:

```bash
systemctl is-active nginx
```

لو شغالة هيظهر:

```text
active
```

ولو متوقفة:

```text
inactive
```

---

### 9. معرفة هل الـ Service مفعلة مع الـ Boot

```bash
systemctl is-enabled service_name
```

مثال:

```bash
systemctl is-enabled nginx
```

ممكن تظهر:

```text
enabled
```

أو

```text
disabled
```

---

### 10. عرض كل الـ Services

لعرض كل الـ Services الموجودة:

```bash
systemctl list-units --type=service
```

ولو عايز تعرض كل الـ Services حتى المتوقفة:

```bash
systemctl list-unit-files --type=service
```

---

### أشهر أوامر `systemctl`

|Command|Meaning|
|---|---|
|`systemctl status service`|عرض حالة الـ Service|
|`systemctl start service`|تشغيل الـ Service|
|`systemctl stop service`|إيقاف الـ Service|
|`systemctl restart service`|إعادة تشغيل الـ Service|
|`systemctl reload service`|إعادة تحميل الـ Configuration|
|`systemctl enable service`|تشغيل الـ Service مع الـ Boot|
|`systemctl disable service`|منع تشغيلها مع الـ Boot|
|`systemctl is-active service`|معرفة هل الـ Service شغالة|
|`systemctl is-enabled service`|معرفة هل هتشتغل مع بداية النظام|
|`systemctl list-units --type=service`|عرض الـ Services الشغالة|
|`systemctl list-unit-files --type=service`|عرض كل الـ Services|

---

#### مثال عملي

لو عندك Web Server اسمه `nginx`، تقدر تتحكم فيه كالتالي:

```bash
systemctl status nginx
```

تعرف حالته.

```bash
systemctl start nginx
```

تشغله.

```bash
systemctl restart nginx
```

تعمله Restart بعد أي تعديل.

```bash
systemctl enable nginx
```

تخليه يشتغل تلقائيًا مع كل Boot.

---

## Service

شكل ال Service
![[Pasted image 20260805134419.png]]

### `[Unit]` Section

دا فيه شوية info ومحتاج اي ال unit دا، بيقولك انه بيشتغل بعد ال network target , sshd-keygen.target

### `[Service]`

ده أهم قسم.

هو المسؤول عن تشغيل الخدمة.

---

```ini
[Service]
Type=notify
```

#### Type

بيحدد systemd يعرف إمتى الخدمة أصبحت شغالة.

أشهر الأنواع:

##### simple

```
يشغل البرنامج
ويعتبره Running فورًا.
```

---

##### exec

يشغل البرنامج

ولو الـ exec نجح

↓

الخدمة Running.

---

##### forking

للبرامج القديمة.

البرنامج يعمل Fork

والـ Parent يخرج

والـ Child يكمل.

مثل:

```
httpd
mysqld
```

---

##### oneshot

لتشغيل سكريبت مرة واحدة.

مثال:

```
Backup Script
```

---

##### notify

المستخدم هنا.

يعني البرنامج نفسه يرسل رسالة إلى systemd يقول فيها:

```
أنا أصبحت جاهز.
```

وده يجعل systemd يعرف أن sshd انتهى من التهيئة.

---

```ini
EnvironmentFile=-/etc/sysconfig/sshd
```

#### EnvironmentFile

تحميل متغيرات البيئة من ملف.

مثلاً:

```
OPTIONS="-D"
```

هيتم استخدامها داخل الخدمة.

---

علامة

```
-
```

في البداية معناها:

لو الملف غير موجود

↓

لا تعتبره Error.

---

```ini
ExecReload=/bin/kill -HUP $MAINPID
```

#### ExecReload

الأمر الذي ينفذ عند:
```bash
systemctl reload sshd
```

بدل إعادة تشغيل الخدمة بالكامل.

في المثال:

```
kill -HUP PID
```

يرسل إشارة:

```
SIGHUP
```

للعملية الرئيسية.

البرنامج بعدها يعيد قراءة الإعدادات.

بدون إيقاف الاتصالات الحالية.

---

```ini
KillMode=process
```

#### KillMode

يحدد مين يتم قتله عند:
```bash
systemctl stop
```

أشهر الأنواع:

##### control-group

يقتل كل العمليات التابعة للخدمة.

---

##### process

يقتل العملية الرئيسية فقط.

وده الموجود هنا.

---

##### mixed

الرئيسية أولًا

ثم الباقي.

---
##### none

لا يقتل أي عملية.

---

```ini
Restart=on-failure
```

#### Restart

متى يعيد تشغيل الخدمة.

القيم المشهورة:

```
no
always
on-success
on-failure
on-abnormal
```

في المثال:

```
on-failure
```

يعني:

إذا ==sshd خرج بسبب خطأ==

↓

systemd يعيد تشغيله.

---

```ini
RestartSec=42s
```

#### RestartSec

قبل إعادة التشغيل
ينتظر

```
42 ثانية
```

ثم يحاول تشغيل الخدمة مرة أخرى.

---

### `[Install]`

ده القسم الخاص بتفعيل الخدمة عند الإقلاع.

---

```ini
[Install]
WantedBy=multi-user.target
```

#### WantedBy

لما تنفذ:

```bash
systemctl enable sshd
```

يقوم systemd بإنشاء رابط (Symbolic Link) بحيث يتم تشغيل الخدمة عندما يصل النظام إلى:

```
multi-user.target
```

---

# SSH : Secure Shell

مكانها `etc/ssh`
دا بيسمحلك انك تقدر تخش ع اي سيرفر تاني بطريقة أمنة، يعني بيعمل encryption للداتا وكدا

```bash
ssh hostname@ip 
```

```bash
ssh root@192.168.100.134
```

---

## Enctyption

دي عملية تشفير للداتا بتاعتك يعني تحولها لرموز وارقام لحمايتها ويتعملها encryption عن طريق key بيه بتعمل encrypte وبيه بتعمل decrypte بيه

وفي نوعين من ال Encryption

### Symmetric

![[Pasted image 20260805141816.png]]

فكرته يعني التماثل، ان الحاجتين زي بعض، الي هو عندك symmetric Key واحد فال Encryption يعني يا انا بعمل ال Key عندي واعمل encrypte للداتا وابعته مع الداتا الي اتعملها Encryption للسيرفر علشان يعملها decryption بنفس ال key

طب انقله ازاي للسيرفر، من او إلى ؟

فدي كانت من عيوب ال symmetric key وانه كان insecure فعمل نوع تاني وهو Asymmetric Key

---

### Asymmetric Key

![[Pasted image 20260805142734.png]]


- هنا فحالة ال source 
	- انا هبعت لل destnation ال public key بتاعي علشان يعمل بيه encryption للداتا ويبعتلي الداتا متشفرة وانا هفك التشفير بتاعها بال private key بتاعي 
- والي بيحصل فالسورس بيحصل فالديستنيشن برضو نفس الكلام

ساعتها خلى الموضوع secure جدا علشان مفيش حد هيقدر يعمل decryption غير للي معاه private key ومفيش حد بيكون معاه ال private غير الي فالمكان بس


فدي بيعتمد عليها ال ssh 

---

علشان نتصل بالسيرفر باستخدام **SSH** بطريقة أكثر أمانًا (**Secure**)، مش هنعتمد على تسجيل الدخول باستخدام **Username + Password**، لأن الباسورد ممكن يتخمن أو يتعرض لهجوم **Brute Force**.

بدلًا من كده هنستخدم **SSH Key Authentication**، وعلشان نعمل كده هنعدل شوية إعدادات في ملف:

```bash
/etc/ssh/sshd_config
```

---

### أول حاجة: نمنع الـ Root من تسجيل الدخول عبر SSH

```ini
PermitRootLogin no
```

لما نخليها `no`، يبقى مستخدم **root** مش هيقدر يعمل Login على السيرفر عن طريق SSH نهائيًا، سواء باستخدام Password أو SSH Keys.

وده بيعتبر من أهم خطوات تأمين السيرفر، لأن أغلب محاولات الاختراق بتستهدف حساب الـ **root**.

---

### ثاني حاجة: نلغي تسجيل الدخول باستخدام الباسورد

```ini
PasswordAuthentication no
```

لما نخليها `no`، يبقى أي مستخدم مش هيقدر يدخل باستخدام كلمة المرور، وهيكون تسجيل الدخول مسموح فقط باستخدام **SSH Keys**.

---

## إنشاء الـ SSH Keys

علشان ننشئ زوج من المفاتيح (**Key Pair**) نستخدم الأمر:

```bash
ssh-keygen
```

هيطلب منك بعض البيانات، منها:

- مكان حفظ المفتاح، ولو ضغطت **Enter** هيستخدم المكان الافتراضي.
    
- بعد كده هيطلب منك **Passphrase** (كلمة مرور للمفتاح نفسه)، ودي اختيارية، ممكن تسيبها فاضية أو تحطها لو عايز طبقة حماية إضافية.
    

بعد انتهاء الأمر هيتم إنشاء مفتاحين داخل مجلد:

```bash
~/.ssh/
```

وهما:

```text
id_rsa       -> Private Key
id_rsa.pub   -> Public Key
```

- **Private Key** هو المفتاح الخاص، وده يفضل موجود على جهازك فقط، ومينفعش تشاركه مع أي حد.
- **Public Key** هو المفتاح العام، وده اللي هنضيفه على السيرفر علشان يسمح لنا بالدخول.

---

## نقل الـ Public Key إلى السيرفر

بعد إنشاء الـ Keys، لازم ننقل الـ **Public Key** إلى السيرفر، وده يتم بسهولة باستخدام:

```bash
ssh-copy-id username@server_ip
```

مثال:

```bash
ssh-copy-id hassan@192.168.1.100
```

هيطلب منك **Password** آخر مرة، وبعدها هيضيف الـ **Public Key** داخل الملف:

```bash
~/.ssh/authorized_keys
```

على السيرفر.

---

## تسجيل الدخول بعد ذلك

بعد ما الـ Public Key يبقى موجود على السيرفر، تقدر تدخل بالأمر:

```bash
ssh username@server_ip
```

مثال:

```bash
ssh hassan@192.168.1.100
```

وقتها هيستخدم برنامج الـ SSH الـ **Private Key** الموجود على جهازك، والسيرفر هيتحقق منه باستخدام الـ **Public Key** الموجود داخل `authorized_keys`.

لو المفتاحين متطابقين، هيسمح لك بالدخول مباشرة **بدون استخدام Password**، وبهذا يكون الاتصال أكثر أمانًا من الاعتماد على كلمات المرور.

---