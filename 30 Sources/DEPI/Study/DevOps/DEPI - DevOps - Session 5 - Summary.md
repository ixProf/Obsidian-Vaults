---
title: "DEPI - DevOps - Session 5 - Summary"
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
# Configuration (`ansible.cfg`)

ملف `ansible.cfg` مسؤول عن تحديد الإعدادات الافتراضية الخاصة بـ **Ansible**.

من أشهر الأقسام الموجودة فيه:

## `[defaults]`

```ini
[defaults]
inventory = /etc/ansible/hosts
forks = 5
remote_user = ansible
timeout = 10
stdout_callback = yaml
private_key_file = ~/.ssh/id_rsa
```

### `inventory`

بيحدد مكان ملف الـ **Inventory** اللي فيه السيرفرات أو الـ Hosts اللي هنتعامل معاها.

مثال:

```ini
inventory = /etc/ansible/hosts
```

### `forks`

بيحدد عدد الـ Hosts اللي Ansible يقدر ينفذ عليها Tasks **في نفس الوقت**.

```ini
forks = 5
```

يعني Ansible يقدر يتعامل مع 5 Hosts بشكل متوازي.

### `remote_user`

الـ User اللي Ansible هيستخدمه علشان يعمل SSH على الـ Remote Hosts.

```ini
remote_user = ansible
```

### `timeout`

أقصى مدة انتظار أثناء محاولة الاتصال بالـ Host.

```ini
timeout = 10
```

يعني لو الاتصال أخد وقت أطول من 10 ثوانٍ، ممكن تعتبر محاولة الاتصال فشلت حسب السياق والإعدادات.

### `stdout_callback`

بيحدد شكل الـ Output اللي هيظهر في الـ Terminal.

مثلاً:

```ini
stdout_callback = yaml
```

ممكن يخلي الـ Output يظهر بشكل أسهل في القراءة.

### `private_key_file`

بيحدد مكان الـ SSH Private Key اللي Ansible هيستخدمه للاتصال بالسيرفرات.

```ini
private_key_file = ~/.ssh/id_rsa
```

---

## `[privilege_escalation]`

القسم ده مسؤول عن **رفع الصلاحيات**.

لو عندك Task محتاجة صلاحيات أعلى، مثلاً تنفيذ أمر كـ `root`، نستخدم:

```ini
[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False
```

### `become`

بيسمح لـ Ansible برفع الصلاحيات.

```ini
become = True
```

### `become_method`

بيحدد الطريقة اللي هنرفع بيها الصلاحيات.

مثلاً باستخدام `sudo`:

```ini
become_method = sudo
```

### `become_user`

الـ User اللي هنشتغل بصلاحياته بعد رفع الصلاحيات.

```ini
become_user = root
```

### `become_ask_pass`

بيحدد هل Ansible يسأل عن Password الخاصة برفع الصلاحيات أم لا.

```ini
become_ask_pass = False
```

> لو الـ sudo محتاج Password، وعدم استخدام `ask_pass` أو إعداد `sudoers` بشكل مناسب هيؤدي لفشل الـ Task.

---

# Inventory / Hosts

الـ **Inventory** هو الملف اللي بنحط فيه الـ Servers أو الـ Hosts اللي Ansible هيتعامل معاهم.

ممكن نضيف IP مباشرة:

```ini
192.168.100.132
```

أو نستخدم Domain Name:

```ini
server1.example.com
```

---

## استخدام Ranges

لو عندك مجموعة Hosts أسماؤهم ماشية بنمط معين:

```ini
web[a:z].example.com
```

ده يمثل Hosts من:

```text
weba.example.com
webb.example.com
webc.example.com
...
webz.example.com
```

وممكن نستخدم Range بالأرقام:

```ini
web[1:5].example.com
```

يعني:

```text
web1.example.com
web2.example.com
web3.example.com
web4.example.com
web5.example.com
```

وبالنسبة للـ IPs:

```ini
192.168.1.[10:20]
```

ده يمثل:

```text
192.168.1.10
192.168.1.11
...
192.168.1.20
```

---

## Groups

ممكن نقسم الـ Hosts إلى Groups حسب نوعهم أو مكانهم.

مثلاً:

```ini
[cairo]
192.168.1.15
192.168.1.16

[alex]
192.168.10.13
192.168.10.14
```

لو نفذت أمر على Group اسمها `cairo`، Ansible هينفذ الأمر على كل الـ Hosts الموجودة داخل الجروب ده.

مثلاً:

```bash
ansible cairo -m ping
```

---

### Groups داخل Groups

ممكن نعمل Group كبيرة تحتوي على Groups أخرى باستخدام `:children`.

```ini
[cairo:children]
front
back

[front]
192.168.10.13

[back]
192.168.10.14
```

هنا:

```text
cairo
├── front
│   └── 192.168.10.13
│
└── back
    └── 192.168.10.14
```

لو شغلت على:

```bash
ansible cairo -m ping
```

هيشتغل على كل الـ Hosts الموجودة في:

- `front`
    
- `back`
    

ولو عايز تشتغل على الـ Frontend فقط:

```bash
ansible front -m ping
```

أو Backend فقط:

```bash
ansible back -m ping
```

---

# تشغيل Ansible

عندنا طريقتين أساسيتين:

1. **Ad-Hoc Commands**
    
2. **Playbooks**
    

---

## 1. Ad-Hoc Commands

الـ **Ad-Hoc Commands** عبارة عن أوامر سريعة بننفذها مباشرة من الـ CLI.

الصيغة العامة:

```bash
ansible <host-pattern> -m <module> -a "<arguments>"
```

- `<host-pattern>`: الـ Host أو الـ Group اللي هنشتغل عليها.
    
- `-m`: الـ Module.
    
- `-a`: Arguments الخاصة بالـ Module.
    

---

### مثال 1: اختبار الاتصال باستخدام `ping`

```bash
ansible cairo -m ping
```

مثال للـ Output:

```text
192.168.10.13 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}

192.168.10.14 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

معنى:

```text
ping: pong
```

إن Ansible قدر يتصل بالـ Host بنجاح.

> الـ Ansible Ping مش ICMP Ping العادي؛ ده بيختبر إن Ansible قادر يتصل وينفذ Python على الـ Managed Host.


### حالات الـ Task في Ansible

#### 1. `SUCCESS`

معناها إن الـ **Task اتنفذت بنجاح**، بدون أي Error.

مثال:

```text
worker-02 | SUCCESS => {
    "changed": false
}
```

يعني:

> العملية نجحت لكن مش شرط تكون عملت تغيير.

#### 2. `CHANGED`

معناها إن الـ **Task نجحت وعملت تغيير فعلي** في الـ Managed Host.

مثال: إنشاء User جديد.

```text
worker-02 | CHANGED => {
    "changed": true
}
```

يعني:

> العملية نجحت + حصل تغيير

مثلاً:

- إنشاء User.
    
- تثبيت Package.
    
- تشغيل Service كانت متوقفة.
    
- إنشاء File.
    

#### 3. `FAILED`

معناها إن الـ **Task فشلت** وحصل Error.

```text
worker-02 | FAILED => {
    "msg": "Permission denied"
}
```

يعني:

> العملية فشلت

مثلاً بسبب:

- Permission Denied.
- الـ Host غير متاح
- Package غير موجودة.

- أمر مكتوب بشكل خاطئ.
    

---

### مثال 2: تنفيذ أمر `date`

ممكن نستخدم Module اسمها `command`:

```bash
ansible all -m command -a "date"
```

ده هينفذ:

```bash
date
```

على كل الـ Hosts الموجودة في الـ Inventory.

### مثال 3: عرض محتويات ملف

```bash
ansible all -m command -a "cat /etc/hosts"
```

هيعرض محتويات:

```text
/etc/hosts
```

على كل السيرفرات.

### مثال 4: إنشاء User

الأفضل استخدام `user` module:

```bash
ansible all -m user -a "name=ahmed state=present" -b
```

هنا:

- `all`: كل الـ Hosts.
- `-m user`: استخدام User Module.
- `name=ahmed`: اسم الـ User.
- `state=present`: تأكد إن الـ User موجود.
- `-b`: استخدم `become` لرفع الصلاحيات.


مهم: الصيغة الشائعة للـ Ad-Hoc arguments بتكون مثل:

```bash
key=value
```

وليس YAML-style مثل:

```bash
name: ahmed
```

### مثال 5: حذف User

```bash
ansible all -m user -a "name=ahmed state=absent" -b
```

### مثال 6: تثبيت Package

```bash
ansible all -m dnf -a "name=nginx state=present" -b
```


### مثال 7: تشغيل Service

```bash
ansible all -m service -a "name=nginx state=started enabled=yes" -b
```

هنا Ansible هيعمل:

- يتأكد إن `nginx` شغال.
    
- يتأكد إنه يشتغل تلقائيًا بعد Restart للسيرفر.
    

---

### ملخص الـ Ad-Hoc

الـ Ad-Hoc مناسب للعمليات السريعة مثل:

```text
Ping Hosts
Run Command
Create User
Delete User
Install Package
Start Service
Stop Service
```

مثلاً:

```bash
ansible web_servers -m ping
```

أو:

```bash
ansible web_servers -m command -a "uptime"
```

لكن لو عندك **أكثر من Task** وعايز العملية تكون منظمة وقابلة لإعادة الاستخدام، هنا نستخدم **Playbooks**.

---

## 2. Ansible Playbooks

الـ **Playbook** هو ملف بنكتب فيه مجموعة من الـ Plays والـ Tasks.

امتداده غالبًا:

```text
.yml
```

أو:

```text
.yaml
```

مثلاً:

```text
playbook.yaml
```

الـ Playbook بيستخدم **YAML**.

---

### YAML vs JSON

الاتنين بيستخدموا لتمثيل البيانات، لكن YAML بيكون أسهل في القراءة والكتابة بالنسبة للـ Configuration.

### JSON

```json
{
  "name": "Mahmoud",
  "role": "Backend Engineer",
  "skills": ["C#", ".NET", "SQL"]
}
```

### YAML

```yaml
name: Mahmoud
role: Backend Engineer

skills:
  - C#
  - .NET
  - SQL
```

في Ansible بنستخدم YAML لأنه أوضح وأسهل في كتابة الـ Infrastructure والـ Automation.

---

### تركيب الـ Playbook

مثال بسيط:

```yaml
---
- name: Test Ansible Connection
  hosts: all
  gather_facts: false

  tasks:
    - name: Ping all servers
      ansible.builtin.ping:
```

هنا عندنا:

#### Play

```yaml
- name: Test Ansible Connection
```

دي اسم الـ Play.

#### Hosts

```yaml
hosts: all
```

بيحدد هنشتغل على مين.

ممكن:

```yaml
hosts: all
```

أو:

```yaml
hosts: cairo
```

أو:

```yaml
hosts: web_servers
```

#### Tasks

```yaml
tasks:
```

هنا بنكتب الـ Tasks اللي عايزين ننفذها.

مثلاً:

```yaml
tasks:
  - name: Ping all servers
    ansible.builtin.ping:
```

كل Task بتستخدم Module معينة.
### `state` في Ansible

الـ `state` بتحدد **الحالة المطلوبة (Desired State)** للحاجة اللي Ansible بيتعامل معاها.

يعني بدل ما تقوله:

> نفّذ الأمر ده.

بتقوله:

> خلّي الحاجة دي في الحالة دي.

مثلاً:

```yaml
- name: Create Ahmed user
  ansible.builtin.user:
    name: ahmed
    state: present
```

هنا أنت بتقول لـ Ansible:

> اتأكد إن الـ User `ahmed` موجود.

---

### أهم حالات `state`

#### 1. `present`

معناها:

> الحاجة لازم تكون موجودة.

مثال مع User:

```yaml
- name: Create user
  ansible.builtin.user:
    name: ahmed
    state: present
```

لو `ahmed` مش موجود → Ansible هيعمله.

لو موجود بالفعل → مش هيعمل حاجة.

```text
مش موجود → يتم إنشاؤه → CHANGED
موجود     → لا تغيير      → SUCCESS
```

---

#### 2. `absent`

معناها:

> الحاجة لازم تكون غير موجودة.

مثال:

```yaml
- name: Remove user
  ansible.builtin.user:
    name: ahmed
    state: absent
```

لو الـ User موجود → هيتم حذفه.

لو مش موجود → مش هيعمل حاجة.

```text
موجود      → يتم حذفه → CHANGED
مش موجود   → لا تغيير  → SUCCESS
```

---

#### مع الـ Packages

مثلاً باستخدام `apt`:

##### `present`

معناها الـ Package تكون متثبتة:

```yaml
- name: Install nginx
  ansible.builtin.apt:
    name: nginx
    state: present
```

---

##### `absent`

معناها حذف الـ Package:

```yaml
- name: Remove nginx
  ansible.builtin.apt:
    name: nginx
    state: absent
```

---

##### `latest`

معناها:

> اتأكد إن أحدث Version من الـ Package متثبت.

```yaml
- name: Update nginx
  ansible.builtin.apt:
    name: nginx
    state: latest
```

لو فيه Version أحدث → هيعمل Update.

لو أنت بالفعل على أحدث Version → مفيش تغيير.

---

#### مع الـ Services

هنا الـ `state` ليها حالات مختلفة شوية:

##### `started`

معناها:

> اتأكد إن الـ Service شغالة.

```yaml
- name: Start nginx
  ansible.builtin.service:
    name: nginx
    state: started
```

---

##### `stopped`

معناها:

> اتأكد إن الـ Service متوقفة.

```yaml
- name: Stop nginx
  ansible.builtin.service:
    name: nginx
    state: stopped
```

---

##### `restarted`

معناها:

> اعمل Restart للـ Service.

```yaml
- name: Restart nginx
  ansible.builtin.service:
    name: nginx
    state: restarted
```

غالبًا كل مرة تشغل الـ Task دي هيحصل Restart، وبالتالي غالبًا تظهر `CHANGED`.

---

##### `reloaded`

معناها:

> اعمل Reload للـ Configuration بدون Restart كامل لو الـ Service بتدعم ده.

```yaml
- name: Reload nginx
  ansible.builtin.service:
    name: nginx
    state: reloaded
```

---

|Module|حالات `state` المشهورة|
|---|---|
|`user`|`present`, `absent`|
|`package` / `apt` / `dnf`|`present`, `absent`, `latest`|
|`service`|`started`, `stopped`, `restarted`, `reloaded`|
|`file`|`file`, `directory`, `touch`, `absent`, `link`, `hard`|

### الفكرة الأساسية

```text
state = الحالة المطلوبة
```

مثلاً:

```yaml
state: present
```

أنت **مش بتقوله "أنشئ الحاجة" مباشرة**، أنت بتقوله:

> اتأكد إنها موجودة.

وده سبب إن Ansible بيشتغل بفكرة **Idempotency**:

```text
الحالة الحالية = الحالة المطلوبة
        ↓
   SUCCESS / changed: false

الحالة الحالية ≠ الحالة المطلوبة
        ↓
      CHANGED
```

يعني أهم حاجة تفتكرها: **`state` مش ليها قيم ثابتة لكل Ansible؛ قيمها بتختلف حسب الـ Module اللي أنت بتستخدمه.**

---

### مثال كامل: Playbook

عايزين نعمل Playbook يقوم بـ:

1. اختبار الاتصال.
    
2. عرض الوقت والتاريخ.
    
3. عرض محتويات `/etc/hosts`.
    

```yaml
---
- name: Basic Server Information
  hosts: all
  gather_facts: false

  tasks:
    - name: Test connection
      ansible.builtin.ping:

    - name: Display current date
      ansible.builtin.command: date

    - name: Display hosts file
      ansible.builtin.command: cat /etc/hosts
```

---

### تشغيل الـ Playbook

بنستخدم:

```bash
ansible-playbook playbook.yaml
```

لو عندك Inventory مختلف:

```bash
ansible-playbook -i inventory.ini playbook.yaml
```

---

### مثال: إنشاء User باستخدام Playbook

بدل ما نكتب Ad-Hoc Command كل مرة:

```bash
ansible all -m user -a "name=ahmed state=present" -b
```

ممكن نعمل Playbook:

```yaml
---
- name: Create Users
  hosts: all
  become: true

  tasks:
    - name: Create Ahmed user
      ansible.builtin.user:
        name: ahmed
        state: present
```

ثم نشغله:

```bash
ansible-playbook create-user.yaml
```

---

## الفرق بين Ad-Hoc و Playbook

|Ad-Hoc|Playbook|
|---|---|
|أمر سريع|مجموعة Tasks منظمة|
|بيتكتب في CLI|بيتكتب في YAML File|
|مناسب للمهام البسيطة|مناسب للـ Automation|
|صعب إعادة استخدامه لو كبير|سهل إعادة استخدامه|
|مناسب للأوامر الفورية|مناسب للـ Infrastructure as Code|
|مثال: Ping|مثال: Install + Configure + Start Nginx|

### مثال Ad-Hoc:

```bash
ansible all -m ping
```

### مثال Playbook:

```yaml
- name: Check all servers
  hosts: all

  tasks:
    - name: Ping servers
      ansible.builtin.ping:
```

**الخلاصة:**  
الـ **Ad-Hoc** = تنفيذ سريع لمهمة مباشرة.  
الـ **Playbook** = Automation منظم وقابل للتكرار لمجموعة من المهام.

---

الاماكن الي بيعدي عليها Ansible علشان يجيب ال Config بتاعته و ال Inventory بتاعته

1. ANSIBLE_CONFIG = "Config Path" -> Enviroment Variable
2. Current Location (pwd)
3. Home dir(user) -> suppose user name is ahmed
ahmed runs ansible search in ? /home/ahmed حمادة هلال
4. /etc/ansbile/---.cfg and hosts

---
## أهم Options في `ansible-playbook`

### 1. تشغيل Playbook

```bash
ansible-playbook playbook.yaml
```

ده الأمر الأساسي لتشغيل الـ Playbook.

---

### 2. `-i` تحديد الـ Inventory

لو الـ Inventory مش متحدد في `ansible.cfg`:

```bash
ansible-playbook -i inventory.ini playbook.yaml
```

أو:

```bash
ansible-playbook -i hosts playbook.yaml
```

يعني:

> استخدم ملف Inventory معين بدل الـ Default.

---

### 3. `-l` أو `--limit`

لتحديد Host أو Group معين، بدل تشغيل الـ Playbook على كل الـ Hosts.

مثلاً الـ Playbook فيه:

```yaml
hosts: all
```

لكن أنت عايز تشغله على `cairo` فقط:

```bash
ansible-playbook playbook.yaml -l cairo
```

أو Host معين:

```bash
ansible-playbook playbook.yaml -l worker-01
```

---

### 4. `-e` أو `--extra-vars`

لإرسال Variables أثناء تشغيل الـ Playbook.

مثلاً عندك:

```yaml
- name: Create user
  ansible.builtin.user:
    name: "{{ username }}"
```

تشغله كده:

```bash
ansible-playbook playbook.yaml -e "username=ahmed"
```

يعني قيمة:

```text
username = ahmed
```

---

### 5. `--check`

ده اسمه **Check Mode** أو بشكل بسيط:

> Dry Run

بيخليك تشوف إيه اللي Ansible _هيغيره_ بدون ما ينفذ التغييرات فعليًا.

```bash
ansible-playbook playbook.yaml --check
```

مثلاً لو الـ Playbook هيعمل:

- Install Nginx
    
- Create User
    
- Start Service
    

Ansible يحاول يتوقع التغييرات، لكن بدون تطبيقها فعليًا، مع العلم إن بعض الـ Modules لا تدعم Check Mode بشكل كامل.

---

### 6. `--diff`

بيعرض الفرق بين الحالة الحالية والحالة اللي الـ Playbook عايز يوصلها، خصوصًا مع الملفات والـ Templates.

```bash
ansible-playbook playbook.yaml --diff
```

وممكن تستخدمه مع `--check`:

```bash
ansible-playbook playbook.yaml --check --diff
```

وده مفيد جدًا قبل ما تطبق تغييرات مهمة.

---

### 7. `-v` زيادة الـ Verbosity

لو عايز تفاصيل أكتر عن اللي بيحصل أثناء التنفيذ:

```bash
ansible-playbook playbook.yaml -v
```

وممكن تزود مستوى التفاصيل:

```bash
ansible-playbook playbook.yaml -vv
```

```bash
ansible-playbook playbook.yaml -vvv
```

```bash
ansible-playbook playbook.yaml -vvvv
```

كل ما تزود `v`، Ansible يعرض تفاصيل أكتر.

مثلاً في حالة الـ SSH Problems، غالبًا:

```bash
ansible-playbook playbook.yaml -vvv
```

مفيد جدًا في الـ Troubleshooting.

---

### 8. `--syntax-check`

بيعمل فحص للـ Syntax بتاع الـ Playbook قبل التشغيل.

```bash
ansible-playbook playbook.yaml --syntax-check
```

مفيد للتأكد إن ملف YAML والـ Playbook Syntax صحيح قبل التنفيذ.

---

### 9. `--list-hosts`

بيعرضلك الـ Hosts اللي الـ Playbook هيشتغل عليهم بدون تشغيل الـ Tasks.

```bash
ansible-playbook playbook.yaml --list-hosts
```

مثلاً:

```text
playbook: playbook.yaml

  play #1 (web_servers): Install Nginx
    pattern: ['web_servers']
    hosts (2):
      worker-01
      worker-02
```

يعني تعرف قبل التنفيذ:

> مين السيرفرات اللي هيتطبق عليها الـ Playbook؟

---

### 10. `--list-tasks`

بيعرض الـ Tasks الموجودة في الـ Playbook بدون تشغيلها.

```bash
ansible-playbook playbook.yaml --list-tasks
```

مثلاً:

```text
playbook: playbook.yaml

  play #1 (all): Configure Servers

    tasks:
      Test connection
      Install nginx
      Start nginx
```

---

### 11. `--start-at-task`

لو الـ Playbook وقف عند Task معينة وعايز تبدأ من Task محددة:

```bash
ansible-playbook playbook.yaml --start-at-task "Install nginx"
```

Ansible هيبدأ من:

```text
Install nginx
```

وهيكمل الـ Tasks اللي بعدها.

---

### 12. `--step`

بيخليك تشغل الـ Tasks واحدة واحدة.

```bash
ansible-playbook playbook.yaml --step
```

Ansible هيسألك قبل كل Task تقريبًا هل عايز تنفذها ولا لأ.

مفيد أثناء التعلم أو الـ Debugging.

---

### 13. `-b` أو `--become`

لتشغيل الـ Playbook مع رفع الصلاحيات.

```bash
ansible-playbook playbook.yaml -b
```

يعني تقريبًا:

```text
become: true
```

ولو محتاج تدخل Password الخاصة بالـ Become:

```bash
ansible-playbook playbook.yaml -b -K
```

---
