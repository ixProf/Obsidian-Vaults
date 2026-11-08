---
title: "Summaries"
aliases: []
type: source
status: active
domain: devops-infrastructure
tags: [source, devops-infrastructure, course]
created: 2026-09-21
updated: 2026-11-02
source:
related: []
---
# Ansible — Exam Summary

## 1. `ansible.cfg`

ملف الـ Configuration الخاص بـ Ansible.

### أهم Sections

**`[defaults]`**

|Option|وظيفته|
|---|---|
|`inventory`|مكان ملف الـ Inventory|
|`forks`|عدد الـ Hosts اللي Ansible ينفذ عليها بالتوازي|
|`remote_user`|المستخدم المستخدم في SSH|
|`timeout`|وقت انتظار الاتصال|
|`stdout_callback`|شكل الـ Output|
|`private_key_file`|مكان SSH Private Key|

مثال:

```ini
[defaults]
inventory = /etc/ansible/hosts
forks = 5
remote_user = ansible
timeout = 10
private_key_file = ~/.ssh/id_rsa
```

---

### `[privilege_escalation]`

مسؤول عن **رفع الصلاحيات**.

```ini
[privilege_escalation]
become = True
become_method = sudo
become_user = root
become_ask_pass = False
```

|Option|المعنى|
|---|---|
|`become`|تفعيل رفع الصلاحيات|
|`become_method`|طريقة رفع الصلاحيات مثل `sudo`|
|`become_user`|المستخدم بعد رفع الصلاحيات|
|`become_ask_pass`|هل يطلب Password للـ become؟|

**احفظ:**

```text
become → هل أرفع الصلاحيات؟
become_method → إزاي؟
become_user → لمين؟
become_ask_pass → أطلب Password؟
```

---

# 2. Configuration Search Order

لما Ansible يدور على `ansible.cfg`:

```text
1. ANSIBLE_CONFIG
        ↓
2. Current Directory
        ↓
3. Home Directory
        ↓
4. /etc/ansible/ansible.cfg
```

### مهم جدًا

`ANSIBLE_CONFIG` = **Environment Variable**

مثال:

```bash
export ANSIBLE_CONFIG=/path/to/ansible.cfg
```

والـ Default system configuration:

```text
/etc/ansible/ansible.cfg
```

---

# 3. Inventory

الـ Inventory بيحدد الـ **Managed Hosts** اللي Ansible هيتعامل معاها.

ممكن تستخدم:

```ini
192.168.1.10
```

أو:

```ini
server1.example.com
```

---

## Ranges

### Alphabetic

```ini
web[a:z].example.com
```

ينتج:

```text
weba
webb
webc
...
webz
```

### Numeric

```ini
web[1:5].example.com
```

ينتج:

```text
web1
web2
web3
web4
web5
```

### IP Range

```ini
192.168.1.[10:20]
```

يعني:

```text
192.168.1.10 → 192.168.1.20
```

---

# 4. Inventory Groups

مثال:

```ini
[cairo]
192.168.1.15
192.168.1.16

[alex]
192.168.10.13
192.168.10.14
```

تقدر تستهدف Group كاملة:

```bash
ansible cairo -m ping
```

---

## Groups of Groups

باستخدام:

```ini
:children
```

مثال:

```ini
[cairo:children]
front
back

[front]
192.168.10.13

[back]
192.168.10.14
```

هنا `cairo` تحتوي:

```text
front
back
```

---

# 5. Ad-Hoc Commands

أوامر سريعة من الـ CLI.

الصيغة:

```bash
ansible <host-pattern> -m <module> -a "<arguments>"
```

### أهم Flags

|Flag|المعنى|
|---|---|
|`-m`|Module|
|`-a`|Arguments|
|`-b`|Become / privilege escalation|
|`-i`|تحديد Inventory|

---

## أشهر أمثلة

### Ping

```bash
ansible all -m ping
```

**مهم:**

Ansible `ping` **مش ICMP Ping**.

هو بيختبر قدرة Ansible على الاتصال بالـ Host وتنفيذ الـ module المطلوبة.

---

### Command

```bash
ansible all -m command -a "date"
```

---

### User

```bash
ansible all -m user -a "name=ahmed state=present" -b
```

### Delete User

```bash
ansible all -m user -a "name=ahmed state=absent" -b
```

### Install Package

```bash
ansible all -m dnf -a "name=nginx state=present" -b
```

### Start Service

```bash
ansible all -m service -a "name=nginx state=started enabled=yes" -b
```

---

# 6. Task Results

### `SUCCESS`

الـ Task نجحت.

لكن:

```text
SUCCESS ≠ حصل تغيير
```

ممكن تكون:

```text
changed: false
```

---

### `CHANGED`

الـ Task نجحت **وحصل تغيير فعلي**.

مثال:

```text
changed: true
```

---

### `FAILED`

الـ Task فشلت.

مثلاً:

```text
Permission denied
```

---

## احفظها

```text
SUCCESS → نجحت
CHANGED → نجحت + غيرت حاجة
FAILED  → فشلت
```

---

# 7. Playbooks

الـ Playbook = مجموعة Automation مكتوبة في YAML.

امتدادها غالبًا:

```text
.yml
.yaml
```

مثال:

```yaml
---
- name: Test Servers
  hosts: all
  gather_facts: false

  tasks:
    - name: Ping servers
      ansible.builtin.ping:
```

### أهم عناصر Playbook

```text
Play
 ↓
hosts
 ↓
tasks
 ↓
module
```

---

# 8. `hosts`

بتحدد الـ Hosts اللي الـ Play هتشتغل عليها.

مثلاً:

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

---

# 9. `tasks`

مجموعة العمليات اللي Ansible هينفذها.

```yaml
tasks:
  - name: Install nginx
    ansible.builtin.apt:
      name: nginx
      state: present
```

---

# 10. `state`

دي من **أهم النقاط في Ansible**.

`state` = **Desired State**

يعني الحالة اللي أنت عايز الحاجة تكون عليها.

### User

```yaml
state: present
```

المستخدم لازم يكون موجود.

```yaml
state: absent
```

المستخدم لازم يكون غير موجود.

---

### Packages

```text
present → Package موجودة
absent  → Package مش موجودة
latest  → أحدث Version
```

مثال:

```yaml
state: latest
```

---

### Services

```text
started  → شغالة
stopped  → متوقفة
restarted → Restart
reloaded → Reload Configuration
```

---

# 11. Idempotency

فكرة أساسية جدًا في Ansible.

لو:

```text
Current State = Desired State
```

مش محتاج يعمل تغيير.

مثال:

```yaml
state: present
```

والـ User موجود بالفعل:

```text
SUCCESS
changed: false
```

لو مش موجود:

```text
CHANGED
changed: true
```

### احفظ:

```text
Current = Desired
      ↓
No Change

Current ≠ Desired
      ↓
Change
```

---

# 12. Ad-Hoc vs Playbook

|Ad-Hoc|Playbook|
|---|---|
|أمر سريع|Automation منظمة|
|CLI|YAML|
|Task بسيطة|Multiple Tasks|
|مناسب للعمليات الفورية|مناسب للـ Automation|
|أقل قابلية لإعادة الاستخدام|قابل لإعادة الاستخدام|

### مثال Ad-Hoc

```bash
ansible all -m ping
```

### Playbook

```yaml
- name: Check servers
  hosts: all
  tasks:
    - name: Ping
      ansible.builtin.ping:
```

---

# 13. أهم `ansible-playbook` Options

### تشغيل Playbook

```bash
ansible-playbook playbook.yaml
```

### تحديد Inventory

```bash
ansible-playbook -i inventory.ini playbook.yaml
```

`-i` = **Inventory**

---

### Limit

تشغيل على Host/Group معين:

```bash
ansible-playbook playbook.yaml -l cairo
```

`-l` = **Limit**

---

### Extra Variables

```bash
ansible-playbook playbook.yaml -e "username=ahmed"
```

`-e` = **Extra Variables**

---

### Check Mode

```bash
ansible-playbook playbook.yaml --check
```

يعني:

> Dry Run / شوف التغييرات المتوقعة بدون تطبيقها.

---

### Diff

```bash
ansible-playbook playbook.yaml --diff
```

يعرض الفرق، خصوصًا في الملفات.

الأفضل قبل التغيير:

```bash
ansible-playbook playbook.yaml --check --diff
```

---

### Verbosity

```bash
-v
-vv
-vvv
-vvvv
```

كل ما تزود `v` → تفاصيل أكثر.

لـ SSH Troubleshooting:

```bash
ansible-playbook playbook.yaml -vvv
```

---

### Syntax Check

```bash
ansible-playbook playbook.yaml --syntax-check
```

يفحص Syntax بدون تشغيل الـ Playbook.

---

### List Hosts

```bash
ansible-playbook playbook.yaml --list-hosts
```

يعرض الـ Hosts المستهدفة.

---

### List Tasks

```bash
ansible-playbook playbook.yaml --list-tasks
```

يعرض الـ Tasks بدون تنفيذها.

---

### Start At Task

```bash
ansible-playbook playbook.yaml --start-at-task "Install nginx"
```

يبدأ من Task معينة ويكمل بعدها.

---

### Step

```bash
ansible-playbook playbook.yaml --step
```

يسمحلك تتعامل مع الـ Tasks خطوة بخطوة.

---

### Become

```bash
ansible-playbook playbook.yaml -b
```

رفع الصلاحيات.

ولو محتاج Password:

```bash
ansible-playbook playbook.yaml -b -K
```

```text
-b → Become
-K → Ask for Become Password
```

---

# أهم حاجات تتحفظ قبل الامتحان

لو وقتك ضيق، ركز على دول بالترتيب:

```text
1. ansible.cfg
2. Configuration Search Order
3. Inventory
4. Groups + :children
5. Ad-Hoc Syntax
6. Modules
7. SUCCESS / CHANGED / FAILED
8. Playbook Structure
9. state
10. Idempotency
11. Ad-Hoc vs Playbook
12. ansible-playbook Options
```

### Cheat Sheet سريع جدًا

```text
-m     → Module
-a     → Arguments
-i     → Inventory
-l     → Limit
-e     → Extra Variables
-b     → Become
-K     → Ask Become Password

--check         → Dry Run
--diff          → Show Changes
--syntax-check  → Check Syntax
--list-hosts    → Show Hosts
--list-tasks    → Show Tasks
--start-at-task → Start from Task
--step          → Step by Step
-v/-vv/-vvv     → Verbosity

present   → موجود
absent    → غير موجود
latest    → أحدث Version

started   → Service شغالة
stopped   → Service متوقفة
restarted → Restart
reloaded  → Reload

SUCCESS → نجح
CHANGED → نجح + حصل تغيير
FAILED  → فشل
```

---
# Docker & Containerization — Exam Cheat Sheet

هنا هنركز على **التعريفات + المقارنات + الأوامر + الحاجات اللي غالبًا تتسأل MCQ / True-False**.

---

# 1. Virtualization vs Containerization

## Virtualization

Physical Server → Hypervisor → VMs

```text
Physical Server
      │
  Hypervisor
      │
 ┌────┼────┐
 VM1  VM2  VM3
  │    │    │
 OS   OS   OS
```

كل VM عندها:

> **Application + Dependencies + Guest OS**

### أهم نقطة

كل VM عندها **Operating System كامل خاص بها**.

---

## Containerization

Physical Server → Host OS → Containers

```text
Physical Server
      │
    Host OS
      │
   Linux Kernel
      │
 ┌────┼────┐
 C1   C2   C3
```

كل Container تحتوي على:

> **Application + Dependencies**

والـContainers **تشارك Host Kernel**.

### أهم فرق

```text
VM
→ Own Guest OS

Container
→ Shared Host Kernel
```

---

# 2. Hypervisor

الـHypervisor مسؤول عن إدارة الـVMs وموارد الـPhysical Server.

مثل:

```text
CPU
RAM
Storage
Network
```

وكمان يوفر Isolation بين الـVMs.

### احفظ

> **Hypervisor = يدير Virtual Machines**

---

# 3. Container

الـContainer:

> بيئة معزولة لتشغيل Application.

ليست VM صغيرة.

بشكل مبسط:

```text
Application
     ↓
Container Environment
     ↓
Host Kernel
     ↓
Hardware
```

---

# 4. Kernel

الـKernel هو الجزء الأساسي من الـOperating System المسؤول عن التعامل مع الـHardware وإدارة موارد النظام.

مثل:

```text
CPU
Memory
Processes
Filesystem
Networking
```

---

# 5. Docker

Docker من أشهر الأدوات المستخدمة في:

- Build Containers
    
- Run Containers
    
- Manage Containers
    
- Manage Images
    

مثال:

```bash
docker run nginx
```

---

# 6. Docker Image vs Container

دي **مهمة جدًا**.

### Image

> Template / Blueprint

```text
Image
   ↓
Container
```

الـImage لا تمثل Application شغالًا بحد ذاته.

### Container

> Running/Runtime instance created from an Image.

```text
Docker Image
     │
 ┌───┼───┐
 ▼   ▼   ▼
C1  C2  C3
```

نفس الـImage ممكن تعمل منها Containers متعددة.

### احفظ

```text
Image = Template
Container = Instance
```

---

# 7. Dockerfile

الـDockerfile:

> ملف يحتوي على Instructions لبناء Docker Image.

مثال:

```dockerfile
FROM ubuntu

WORKDIR /app

COPY . .

ENTRYPOINT ["./app"]
```

العلاقة:

```text
Dockerfile
     │
 docker build
     ↓
Docker Image
     │
 docker run
     ↓
Container
```

### احفظ

```text
Dockerfile = Instructions / Recipe
Image      = Blueprint
Container  = Running Instance
```

---

# 8. Image Layers

الـDocker Image مكونة من Layers.

مثلاً:

```text
Layer 1 → Base Image
Layer 2 → Dependencies
Layer 3 → Application
```

### أهم فوائد الـLayers

- Reuse
    
- Build Cache
    
- Faster Builds
    
- تقليل تكرار البيانات
    

لو Layer قديمة لم تتغير، Docker ممكن يستخدمها من الـCache بدل إعادة بنائها.

---

# 9. Namespaces

الـNamespace مسؤولة عن:

> **Isolation**

أو:

> **What the Container Can See**

مثلاً تعزل:

- Processes
    
- Network
    
- Users
    
- Hostname
    
- Filesystem views
    

### أشهر أنواع Namespaces

```text
PID
Network
User
Mount
```

### PID Namespace

تعزل الـProcesses.

```text
Container A
PID 1

Container B
PID 1
```

ممكن الاتنين يكون عندهم PID 1 لأن كل Container في PID Namespace مختلفة.

### Network Namespace

تعزل:

- Network Interface
    
- IP
    
- Routing
    
- Ports
    

### User Namespace

تعزل User IDs وخصوصًا سياق الـroot.

---

# 10. Cgroups

**cgroups = Control Groups**

مسؤولة عن:

> **Resource Control**

يعني:

> **How Much Can the Container Use?**

مثلاً:

```text
Container A
CPU: 2 Cores
RAM: 2 GB
```

### Resources

ممكن تتحكم في:

- CPU
    
- Memory
    
- وغيرها من الموارد
    

---

# 11. Namespace vs cgroups

دي من أهم المقارنات:

|Namespace|cgroups|
|---|---|
|Isolation|Resource Control|
|What can it see?|How much can it use?|
|Processes|CPU/Memory|
|Network|Resource Limits|
|Users|—|

### احفظ الجملة:

> **Namespace = What can I see?**

> **cgroups = How much can I use?**

---

# 12. Docker Architecture

الصورة المهمة:

```text
Docker Client
      ↓
Docker Engine / Daemon
      ↓
containerd
      ↓
runc
      ↓
Linux Kernel
```

---

## Docker Client

هو الـCLI اللي بتستخدمه:

```bash
docker run
docker build
docker ps
docker stop
```

---

## Docker Daemon

عملية شغالة في الـBackground.

> Daemon = Background Process

تستقبل Requests وتدير عمليات Docker.

---

## containerd

مسؤول عن إدارة الـContainer lifecycle وأعمال مثل:

- Container management
    
- Image handling
    
- Storage
    
- Runtime interaction
    

---

## runc

> **Low-Level Container Runtime**

هو اللي بيعمل Create/Start للـContainer باستخدام Linux Kernel features.

خصوصًا:

```text
Namespaces
cgroups
```

---

# 13. OCI

**OCI = Open Container Initiative**

هي:

> **Standards / Specifications للـContainers**

مش Tool لتشغيل Containers.

أهم Specifications:

```text
Image Specification
Runtime Specification
```

---

## OCI vs runc

مهمة جدًا:

```text
OCI
↓
Standards / Specifications

runc
↓
Implementation of OCI Runtime Specification
```

يعني:

> OCI بتحط القواعد، وrunc بيطبق Runtime Specification.

---

# 14. Docker Internal Flow

لما تعمل:

```bash
docker run nginx
```

بشكل مبسط:

```text
Docker Client
      ↓
Docker Engine
      ↓
containerd
      ↓
runc
      ↓
Linux Kernel
      ↓
Container
      ↓
nginx Process
```

### نقطة امتحان

`runc` مش Hypervisor.

هو **Low-Level Container Runtime**.

---

# 15. Self-Healing / Restart Policies

Docker يقدر يعمل Restart للـContainers تلقائيًا باستخدام Restart Policies.

الصيغة:

```bash
docker run --restart=<policy> image
```

أهم Policies:

```text
no
on-failure
always
unless-stopped
```

---

## `no`

Default.

```text
Container Stops
      ↓
No automatic restart
```

---

## `on-failure`

يعيد التشغيل عند انتهاء الـContainer بسبب Failure / non-zero exit.

```bash
--restart=on-failure
```

ممكن تحدد عدد المحاولات:

```bash
--restart=on-failure:5
```

---

## `always`

يحاول إعادة تشغيل الـContainer عند توقفها.

```bash
--restart=always
```

---

## `unless-stopped`

يعيد تشغيلها تلقائيًا **إلا إذا تم إيقافها يدويًا**.

```bash
--restart=unless-stopped
```

### احفظ الفرق

```text
no
→ Don't restart

on-failure
→ Restart on failure

always
→ Always restart

unless-stopped
→ Always restart unless manually stopped
```

---

# 16. أهم Docker Commands

## Run

```bash
docker run nginx
```

إنشاء وتشغيل Container من Image.

---

## Detached Mode

```bash
docker run -d nginx
```

`-d`:

> Detached → Background

---

## Name

```bash
docker run --name webserver nginx
```

تحديد اسم للـContainer.

---

## Interactive + Terminal

```bash
docker run -it ubuntu bash
```

```text
-i → Interactive
-t → TTY
```

---

# 17. Port Mapping

```bash
docker run -p 8080:80 nginx
```

الصيغة:

```text
HOST_PORT:CONTAINER_PORT
```

يعني:

```text
Host 8080
    ↓
Container 80
```

### مهم

```text
-p 8080:80
```

**8080 = Host**

**80 = Container**

---

# 18. Container Management

### Running Containers

```bash
docker ps
```

يعرض الـRunning Containers فقط.

### All Containers

```bash
docker ps -a
```

يعرض:

> Running + Stopped

---

## Stop

```bash
docker stop webserver
```

إيقاف Container.

---

## Start

```bash
docker start webserver
```

تشغيل Container موجودة ومتوقفة.

---

## Remove

```bash
docker rm webserver
```

حذف Container.

ولو عايز Force:

```bash
docker rm -f webserver
```

---

# 19. Image Commands

## List Images

```bash
docker images
```

أو:

```bash
docker image ls
```

---

## Remove Image

```bash
docker rmi nginx
```

أو:

```bash
docker rmi IMAGE_ID
```

---

# 20. Prune

### Stopped Containers

```bash
docker container prune
```

يحذف الـunused/stopped containers.

### Unused Images

```bash
docker image prune
```

يحذف الـunused dangling images.

### All Unused Images

```bash
docker image prune -a
```

يحذف الـunused images بشكل أوسع.

---

# 21. أوامر الحذف الجماعي

كل الـContainers:

```bash
docker rm -f $(docker ps -aq)
```

كل الـImages:

```bash
docker rmi $(docker images -q)
```

### مهم جدًا

```bash
docker ps -aq
```

تعني:

```text
-a → All containers
-q → IDs only
```

---

# أهم 15 نقطة للحفظ

لو داخل الامتحان ومش هتلحق تراجع كله:

```text
1. VM has its own Guest OS.
2. Containers share the Host Kernel.
3. Hypervisor manages VMs.
4. Docker manages Containers.
5. Image = Template.
6. Container = Instance/Runtime.
7. Dockerfile = Instructions to build Image.
8. Namespace = Isolation.
9. cgroups = Resource Control.
10. Namespace → What can I see?
11. cgroups → How much can I use?
12. OCI = Container Standards.
13. runc = Low-Level Container Runtime.
14. containerd = Container lifecycle management.
15. Docker → containerd → runc → Kernel.
```

## أو احفظ الـFlow ده

```text
             Virtualization

Physical Server
      ↓
  Hypervisor
      ↓
     VMs
      ↓
 Guest OS + App
```

```text
             Containerization

Physical Server
      ↓
    Host OS
      ↓
    Kernel
      ↓
  Containers
      ↓
 App + Dependencies
```

```text
              Docker

Dockerfile
    ↓ build
Docker Image
    ↓ run
Container
    ↓
containerd
    ↓
runc
    ↓
Linux Kernel
    ↓
Namespaces + cgroups
```

ده الجزء اللي أنصحك **تحفظه حرفيًا تقريبًا** للامتحان؛ باقي التفاصيل افهمها من الـflow ده.

---

# Docker Cheat Sheet — Images, Containers, Dockerfile, Volumes

## 1. Image Commands

|Command|وظيفته|
|---|---|
|`docker images`|يعرض الـ Images الموجودة Local|
|`docker rmi IMAGE`|يمسح Image|
|`docker search IMAGE`|يبحث عن Image على Docker Hub|
|`docker history IMAGE`|يعرض Layers/History بتاعة Image|
|`docker tag IMAGE NEW_NAME`|يعمل Tag/اسم جديد يشاور لنفس الـ Image|
|`docker commit CONTAINER IMAGE`|يحول حالة Container الحالية إلى Image جديدة|
|`docker save`|يحفظ Image في `.tar`|
|`docker load`|يرجع Image من `.tar`|

### أهم فرق

```text
docker save  → Image → .tar
docker load  → .tar → Image

docker commit → Container → Image
```

**احفظها:**

> `save/load` للـ **Image ↔ TAR**  
> `commit` للـ **Container → Image**

---

# 2. Image Backup

الـ Flow المهم:

```text
Image
  ↓
docker save
  ↓
nginx-backup.tar
  ↓
docker rmi
  ↓
Image Deleted
  ↓
docker load
  ↓
Image Restored
```

### Commands

```bash
docker save -o nginx-backup.tar nginx:latest
```

ثم:

```bash
docker rmi nginx:latest
```

وللاسترجاع:

```bash
docker load -i nginx-backup.tar
```

**MCQ مهم:**

- Backup Image → `docker save`
    
- Restore Image from TAR → `docker load`
    
- Delete Image → `docker rmi`
    

---

# 3. Container Commands

|Command|الوظيفة|
|---|---|
|`docker run`|Create + Start Container جديد|
|`docker start`|يشغل Container موجود ومتوقف|
|`docker stop`|يوقف Container شغال|
|`docker restart`|Stop + Start|
|`docker ps`|Running Containers فقط|
|`docker ps -a`|كل Containers|
|`docker logs`|Logs بتاعة Container|
|`docker logs -f`|متابعة Logs Live|

### أهم فرق

```text
docker run   → Container جديد
docker start → Container موجود
```

---

# 4. `docker run`

```bash
docker run nginx
```

تقريبًا:

```text
docker pull   → لو Image مش موجودة
docker create
docker start
```

### بدون `-d`

```bash
docker run nginx
```

Foreground / Attached.

### مع `-d`

```bash
docker run -d nginx
```

Detached → Container يشتغل في Background.

**احفظ:**

> `-d = Detached`

---

# 5. `--name`

بدل الاسم العشوائي:

```bash
docker run -d --name webserver nginx
```

بعدها:

```bash
docker stop webserver
docker start webserver
docker logs webserver
```

---

# 6. Port Mapping

الصيغة:

```bash
-p HOST_PORT:CONTAINER_PORT
```

مثال:

```bash
docker run -d -p 8080:80 nginx
```

معناها:

```text
Host : 8080
       ↓
Container : 80
```

فتدخل:

```text
localhost:8080
```

### أهم نقطة امتحان

في:

```bash
-p 8080:80
```

**8080 = Host**

**80 = Container**

احفظ:

> **HOST : CONTAINER**

---

## أكثر من Port

```bash
docker run -d \
-p 8080:80 \
-p 8443:443 \
nginx
```

يعني:

```text
8080 → 80
8443 → 443
```

---

# 7. `-P` vs `-p`

### `-p`

إنت بتحدد الـ Host Port:

```bash
-p 8080:80
```

### `-P`

Docker يعمل Publish تلقائي للـ exposed ports ويختار Host Ports بنفسه.

```bash
docker run -d -P nginx
```

مثلاً:

```text
32768 → 80
```

**احفظ:**

```text
-p = manually specified port
-P = automatically assigned host port
```

---

# 8. `-it`

لتشغيل Container Interactive:

```bash
docker run -it ubuntu bash
```

### `-i`

```text
Interactive
```

يبقي الـ Standard Input مفتوح.

### `-t`

```text
TTY
```

يوفر Terminal.

مع بعض:

```bash
-it
```

تقدر تدخل وتتعامل مع الـ Container.

للخروج:

```bash
exit
```

---

# 9. `--rm`

يحذف الـ Container تلقائيًا بعد ما يخلص:

```bash
docker run --rm ubuntu echo "Hello"
```

الـ Flow:

```text
Create
 ↓
Start
 ↓
Execute
 ↓
Finish
 ↓
Stop
 ↓
Delete
```

**احفظ:**

> `--rm = Automatically remove container after it exits`

---

# 10. Container Main Process

دي من **أهم نقاط Docker**:

> الـ Container بيستمر طالما الـ Main Process بتاعه شغال.

مثال:

```bash
docker run ubuntu echo "Hello"
```

`echo` يخلص → Process انتهى → Container يخرج.

أما:

```bash
docker run -d nginx
```

Nginx process مستمر → Container يفضل Running.

### احفظها كده:

```text
Main Process Running
       ↓
Container Running

Main Process Ends
       ↓
Container Exited
```

---

# 11. `docker inspect`

```bash
docker inspect webserver
```

يعرض Detailed information غالبًا بصيغة JSON.

ممكن تعرف:

- Container ID
    
- Image
    
- State
    
- IP
    
- Ports
    
- Environment Variables
    
- Mounts
    
- Network
    
- Restart Policy
    

### `-f`

للـ filtering / formatting.

مثال:

```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' webserver
```

**احفظ:**

> `inspect = detailed information`

---

# 12. `docker events`

```bash
docker events
```

يعرض Docker events بشكل **Live**.

مثلاً:

```text
create
start
stop
destroy
```

ممكن تعمل Filter:

```bash
docker events --filter type=container
```

أو:

```bash
docker events --filter event=start
```

**احفظ:**

> `events = مراقبة أحداث Docker Live`

---

# 13. `docker port`

```bash
docker port webserver
```

يعرض الـ Port Mapping.

لو:

```bash
docker run -d --name webserver -p 8080:80 nginx
```

ممكن:

```text
80/tcp -> 0.0.0.0:8080
```

يعني:

```text
Container 80
     ↓
Host 8080
```

---

# 14. `docker top`

```bash
docker top webserver
```

يعرض الـ **Processes الموجودة داخل Container**.

زي فكرة:

```bash
ps
```

لكن بتشوف Processes الخاصة بالـ Container.

**احفظ:**

> `top = Processes`

---

# 15. `docker stats`

```bash
docker stats
```

Monitoring للـ Resources بشكل Live.

بيعرض:

- CPU
    
- Memory
    
- Network I/O
    
- Block I/O
    
- PIDs
    

Container واحد:

```bash
docker stats webserver
```

مرة واحدة فقط:

```bash
docker stats --no-stream
```

**احفظ:**

> `stats = Resource Usage`

---

# 16. `docker diff`

```bash
docker diff test
```

يعرض التغييرات في Filesystem بتاع الـ Container مقارنة بالـ Image الأصلية.

### الحروف

|Letter|Meaning|
|---|---|
|`A`|Added|
|`C`|Changed|
|`D`|Deleted|

مثال:

```text
A /newfile.txt
C /etc/hosts
D /oldfile.txt
```

**احفظ:**

```text
A = Added
C = Changed
D = Deleted
```

---

# 17. Image Storage / Registry

عندك:

```text
             Registry
          /             \
     Docker Hub       Private Registry
             ↓
           pull
             ↓
        Local Storage
```

والعكس:

```text
Local Image
    ↓
   push
    ↓
 Registry
```

### أهم Commands

```text
pull → Registry → Local
push → Local → Registry

save → Image → TAR
load → TAR → Image

rmi → Delete Image
run → Image → Container
commit → Container → Image
```

---

# 18. Container States

الـ Container ممكن يكون:

```text
Running
Paused
Stopped / Exited
```

والـ transitions المهمة:

```text
Image
  ↓ run
Running
  ↓ stop
Stopped
  ↓ start
Running
```

والـ Pause:

```text
Running ←→ Paused
```

### Delete

```bash
docker rm container
```

يمسح Container متوقف.

```bash
docker rm -f container
```

Force remove حتى لو Running.

---

# Dockerfile

## الفكرة

```text
Dockerfile
     ↓ docker build
   Image
     ↓ docker run
 Container
```

Dockerfile = **Instructions لبناء Image**.

---

# Dockerfile Instructions Cheat Sheet

|Instruction|معناها|
|---|---|
|`FROM`|Base Image|
|`RUN`|Command وقت Build|
|`CMD`|Default command وقت Runtime|
|`ENTRYPOINT`|Main/fixed executable|
|`COPY`|Copy local files|
|`ADD`|COPY + features إضافية|
|`ENV`|Environment variable|
|`ARG`|Build-time variable|
|`EXPOSE`|Documentation للـ port|
|`VOLUME`|Mount point للـ storage|
|`USER`|User اللي هيشغل الأوامر|
|`WORKDIR`|Working directory|

---

# أهم 6 Instructions

## `FROM`

```dockerfile
FROM ubuntu:22.04
```

Base Image.

**مطلوبة مرة واحدة على الأقل** في Dockerfile عادي.

---

## `RUN`

```dockerfile
RUN apt-get update && apt-get install -y python3
```

يتنفذ **وقت Build**.

```text
RUN → Build time
```

ويضيف filesystem changes إلى image layer.

---

## `CMD`

```dockerfile
CMD ["python3", "app.py"]
```

Default command عند تشغيل Container.

```text
CMD → Runtime
```

وممكن المستخدم يعمل Override:

```bash
docker run myimage bash
```

---

## `ENTRYPOINT`

```dockerfile
ENTRYPOINT ["python3"]
```

يحدد الـ main executable.

لو:

```dockerfile
ENTRYPOINT ["python3"]
CMD ["app.py"]
```

فـ:

```bash
docker run myimage
```

تشغل:

```text
python3 app.py
```

ولو:

```bash
docker run myimage test.py
```

تبقى:

```text
python3 test.py
```

### احفظ

```text
ENTRYPOINT = ثابت
CMD        = Default / قابل للتغيير
```

---

# `EXPOSE`

```dockerfile
EXPOSE 80
```

**لا يفتح Port فعليًا للـ Host.**

هو documentation / metadata للـ image.

للنشر فعليًا:

```bash
docker run -p 8080:80 myimage
```

**MCQ مشهور:**

> Does `EXPOSE 80` make port 80 accessible from the host?

**No.**

---

# `ENV` vs `ARG`

دي مهمة جدًا:

||`ENV`|`ARG`|
|---|---|---|
|الاستخدام|Environment Variable|Build Variable|
|Build|متاح|متاح|
|Runtime|متاح|مش متاح تلقائيًا|
|مثال|`ENV APP_ENV=prod`|`ARG VERSION=1.0`|

### احفظ:

> `ARG = Build Time`

> `ENV = Build + Runtime`

---

# `COPY` vs `ADD`

### COPY

```dockerfile
COPY app.py /app/
```

ينقل ملفات من **Build Context المحلي** للـ Image.

### ADD

يدعم بالإضافة إلى النسخ المحلي:

- URLs
    
- Automatic extraction لبعض tar archives
    

### Best Practice

> استخدم `COPY` في أغلب الحالات، و`ADD` لما تحتاج ميزاته الإضافية.

---

# `WORKDIR`

```dockerfile
WORKDIR /app
```

يحدد الـ current working directory.

وبعدها:

```dockerfile
COPY . .
```

الـ files هتتحط بالنسبة للـ `/app`.

---

# `USER`

```dockerfile
USER appuser
```

يحدد المستخدم اللي هيشغل الـ instructions اللاحقة وContainer runtime الافتراضي.

لو مفيش `USER`، فالافتراضي غالبًا `root`.

---

# `VOLUME`

```dockerfile
VOLUME /var/lib/mysql
```

يحدد mount point للـ persistent storage.

---

# Dockerfile Layers

مثال:

```dockerfile
FROM ubuntu
RUN apt-get install python3
COPY app.py /app
```

كل instruction filesystem-changing بيشارك في بناء Layers، مع ملاحظة إن مش كل instruction بتنشئ layer بنفس المعنى في الصورة التقليدية للـ Dockerfile.

الأهم في الامتحان:

> Layers تساعد في **caching + reuse** وتقليل وقت الـ rebuild.

---

# Multi-Stage Build

## المشكلة

Build environment ممكن يحتوي:

```text
SDK
Compiler
Source Code
Build Tools
Dependencies
```

لكن Runtime محتاج:

```text
Application
Runtime dependencies
```

فالحل:

```text
Stage 1: Build
        ↓
     Publish
        ↓
Stage 2: Runtime
        ↓
Final Small Image
```

### .NET Example

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder

WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app
COPY --from=builder /app/publish .

ENTRYPOINT ["dotnet", "MyApi.dll"]
```

### `AS builder`

```dockerfile
FROM ... AS builder
```

بيدي اسم للـ Stage.

### `--from=builder`

```dockerfile
COPY --from=builder /app/publish .
```

يعني:

> خد الملفات من Stage اسمها `builder`.

**أهم فائدة:**

> Final image أصغر وأنضف لأنها لا تحتوي على SDK وBuild tools.

---

# Docker Volumes

## المشكلة

الـ Container عنده Writable Layer.

لو:

```bash
docker rm container
```

الـ Container layer تتمسح.

وبالتالي البيانات الموجودة عليها تضيع.

---

# Volume

Volume = Storage مستقل عن عمر الـ Container.

```text
Container
    │
    │ mount
    ↓
Volume
```

لو Container اتمسح:

```text
Container → Deleted
Volume    → Still Exists
```

وبالتالي Container جديد يقدر يستخدم نفس البيانات.

---

# أنواع Storage

## 1. Named Volume

Docker بيدير مكان التخزين وإنت بتدي الـ Volume اسم.

```bash
docker volume create my_data
```

ثم:

```bash
docker run -d \
--name mydb \
-v my_data:/var/lib/mysql \
mysql:8.0
```

الصيغة:

```text
-v VOLUME_NAME:CONTAINER_PATH
```

---

## 2. Anonymous Volume

```bash
docker run -d \
-v /var/lib/mysql \
mysql:8.0
```

مفيش اسم قبل `:`، Docker ينشئ Volume باسم عشوائي.

---

## 3. Bind Mount

إنت بتحدد path على الـ Host:

```bash
docker run -d \
-v /home/user/mysql-data:/var/lib/mysql \
mysql:8.0
```

الصيغة:

```text
-v HOST_PATH:CONTAINER_PATH
```

### الفرق

```text
Named Volume
Docker manages location

Bind Mount
You specify host path
```

---

# Volume Commands

### Create

```bash
docker volume create my_data
```

### List

```bash
docker volume ls
```

### استخدام

```bash
docker run -v my_data:/data image
```

---

# أهم Scenario للـ Volumes

```bash
docker volume create my_data
```

```bash
docker run -d --name mydb \
-v my_data:/var/lib/mysql \
mysql:8.0
```

بعدها:

```bash
docker rm -f mydb
```

الـ Container اتمسح.

لكن:

```text
my_data
```

لسه موجود.

وبعدين:

```bash
docker run -d --name mydb2 \
-v my_data:/var/lib/mysql \
mysql:8.0
```

`mydb2` يقدر يشوف البيانات القديمة.

---

# أهم حاجات تحفظها قبل الامتحان

لو الوقت ضيق، احفظ دول حرفيًا:

```text
Image = Template
Container = Running/created instance of Image
Dockerfile = Instructions to build Image

run   = Create + Start
start = Start existing stopped container

ps    = Running containers
ps -a = All containers

-d = Detached
-it = Interactive + TTY
--rm = Delete container automatically after exit

-p = HOST:CONTAINER
-P = Automatically publish exposed ports

save = Image → TAR
load = TAR → Image

pull = Registry → Local
push = Local → Registry

commit = Container → Image
rmi = Remove Image

inspect = Detailed information
events = Live Docker events
port = Port mappings
top = Container processes
stats = Resource usage
diff = Filesystem changes

A = Added
C = Changed
D = Deleted
```

### Dockerfile

```text
FROM       = Base Image
RUN        = Build-time command
CMD        = Default runtime command
ENTRYPOINT = Main/fixed executable
COPY       = Copy local files
ADD        = COPY + extra features
ENV        = Build + Runtime variable
ARG        = Build-time variable
EXPOSE     = Documentation, NOT port publishing
WORKDIR    = Working directory
USER       = Runtime/build user
VOLUME     = Mount point
```

### Storage

```text
Container Writable Layer
        ↓
Deleted with Container

Volume
        ↓
Independent from Container
        ↓
Data survives container deletion
```

### Multi-stage

```text
Builder Stage
SDK + Source + Tools
        ↓
     Publish
        ↓
Runtime Stage
Runtime + Final App
```

وأهم 5 فروق ممكن ييجوا MCQ:

```text
RUN vs CMD
→ RUN Build / CMD Runtime

CMD vs ENTRYPOINT
→ CMD Default / ENTRYPOINT Main executable

ENV vs ARG
→ ENV Runtime / ARG Build-time

COPY vs ADD
→ COPY simpler / ADD has extra capabilities

-p vs -P
→ -p manual mapping / -P automatic host port
```