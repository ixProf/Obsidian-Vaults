---
title: "DEPI DevOps - Exam"
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
# Session 1 Commands

|#|Command|الاستخدام|مثال|
|--:|---|---|---|
|1|`ip -a`|عرض معلومات الـNetwork Interfaces والـIP|`ip -a`|
|2|`who`|معرفة المستخدمين المتصلين حاليًا بالسيرفر|`who`|
|3|`uname`|معرفة معلومات عن الـOS / Kernel|`uname`|
|4|`uname -a`|عرض معلومات تفصيلية عن الـKernel والنظام|`uname -a`|
|5|`clear`|تنظيف شاشة الـTerminal|`clear`|
|6|`date`|عرض التاريخ والوقت|`date`|
|7|`hostname`|عرض اسم الجهاز|`hostname`|
|8|`hostnamectl`|عرض معلومات وإعدادات الـHostname|`hostnamectl`|
|9|`hostnamectl hostname`|عرض الـHostname الحالي|`hostnamectl hostname`|
|10|`hostnamectl set-hostname "name"`|تغيير اسم الجهاز|`hostnamectl set-hostname "server1"`|
|11|`ls`|عرض الملفات والـDirectories الموجودة في المكان الحالي|`ls`|
|12|`ls -al`|عرض كل الملفات بالتفصيل، بما فيها الملفات المخفية|`ls -al`|
|13|`cd`|الانتقال من Directory إلى آخر|`cd bin`|
|14|`cd /path`|الانتقال باستخدام **Absolute Path**|`cd /usr/bin`|
|15|`cd directory`|الانتقال باستخدام **Relative Path**|`cd bin`|
|16|`cd ..`|الرجوع إلى الـParent Directory|`cd ..`|
|17|`cd ~`|الانتقال إلى الـHome Directory|`cd ~`|
|18|`pwd`|معرفة الـDirectory الحالي|`pwd`|
|19|`touch file`|إنشاء File جديد|`touch test.txt`|
|20|`cat file`|عرض محتوى الـFile|`cat test.txt`|
|21|`cat > file`|إنشاء File وكتابة محتوى بداخله|`cat > test.txt`|
|22|`head file`|عرض أول 10 سطور من الـFile|`head test.txt`|
|23|`head -n num file`|عرض أول عدد محدد من السطور|`head -n 5 test.txt`|
|24|`tail file`|عرض آخر 10 سطور من الـFile|`tail test.txt`|
|25|`tail -n num file`|عرض آخر عدد محدد من السطور|`tail -n 5 test.txt`|
|26|`rm -f file`|حذف الـFile بالقوة|`rm -f test.txt`|
|27|`ln -s file link`|إنشاء **Soft Link**|`ln -s file1 file2`|
|28|`ln file link`|إنشاء **Hard Link**|`ln file1 file2`|
|29|`command --help`|عرض الـOptions الخاصة بالأمر بشكل مختصر|`ls --help`|
|30|`man command`|فتح الـManual التفصيلي للأمر|`man ls`|

### ⚡ أهم Commands للحفظ السريع

| Command    | المعنى السريع    |
| ---------- | ---------------- |
| `ip -a`    | IP / Network     |
| `who`      | مين داخل؟        |
| `uname`    | معلومات الـOS    |
| `clear`    | تنظيف الشاشة     |
| `date`     | التاريخ والوقت   |
| `hostname` | اسم الجهاز       |
| `ls`       | List             |
| `cd`       | Change Directory |
| `pwd`      | أنا فين؟         |
| `touch`    | Create File      |
| `cat`      | Read File        |
| `head`     | أول الملف        |
| `tail`     | آخر الملف        |
| `rm`       | Remove           |
| `ln -s`    | Soft Link        |
| `ln`       | Hard Link        |
| `--help`   | Help مختصر       |
| `man`      | Manual تفصيلي    |

---
# Session 2 Commands

واضح إنك رفعت **الجزء الجديد من نوتس Linux**. وده بيكمل الـcommands اللي عملناها فوق، فدي **كل الـcommands الموجودة في الملف الجديد** في جدول واحد، بنفس محتوى النوتس:

|#|Command|الاستخدام|
|--:|---|---|
|1|`mkdir Directory_Name`|إنشاء Directory جديد|
|2|`ls`|عرض محتويات الـDirectory الحالي|
|3|`ls -l`|عرض محتويات الـDirectory بالتفاصيل|
|4|`ls -a`|عرض الملفات والـDirectories بما فيها المخفية|
|5|`ls -al`|عرض كل المحتويات بالتفاصيل + المخفية|
|6|`ls -li`|عرض المحتويات مع الـinode information|
|7|`ls --help`|عرض الـoptions المتاحة لأمر `ls`|
|8|`mkdir -p depi-5/depi-6`|إنشاء Directories متداخلة، وإنشاء الـParent إذا لم يكن موجودًا|
|9|`touch txt.xyz`|إنشاء File|
|10|`command1 && command2`|تنفيذ الأمر الثاني فقط إذا نجح الأمر الأول|
|11|`cd ..`|الرجوع إلى الـParent Directory|
|12|`cp source destination`|نسخ File أو Directory|
|13|`cp -p`|نسخ مع الحفاظ على الـPermissions|
|14|`cp -v`|عرض تفاصيل الملفات أثناء النسخ|
|15|`cp -r`|نسخ Directory وكل ما بداخله بشكل Recursive|
|16|`mv source destination`|نقل File/Directory أو تغيير اسمه|
|17|`echo "text"`|طباعة نص في الـTerminal|
|18|`echo $USER`|عرض قيمة Environment Variable الخاصة بالمستخدم الحالي|
|19|`echo $HOME`|عرض الـHome Directory للمستخدم|
|20|`echo $PATH`|عرض الـPATH الذي يبحث فيه النظام عن الأوامر|
|21|`DEPI=r5`|إنشاء Environment/Shell Variable|
|22|`echo $DEPI`|عرض قيمة الـVariable|
|23|`echo "..."`|استخدام Double Quotes مع إمكانية استبدال الـVariables وCommand Substitution|
|24|`echo '...'`|استخدام Single Quotes لإظهار النص كما هو بدون expansion|
|25|`command < file`|عمل Redirect للـStandard Input|
|26|`command > file`|Redirect للـOutput إلى File، ويستبدل المحتوى الموجود|
|27|`command 2 > file`|Redirect للـError إلى File|
|28|`command 2>&1`|توجيه الـError إلى نفس مكان الـOutput|
|29|`command >> file`|إضافة الـOutput في نهاية الـFile بدون حذف المحتوى القديم|
|30|`command1 \| command2`|إرسال Output الأمر الأول كـInput للأمر الثاني|
|31|`vi file_name`|فتح/إنشاء File باستخدام `vi`|
|32|`dd`|حذف السطر الحالي في `vi`|
|33|`d`|أمر للحذف في Command Mode؛ وتكراره يستخدم للحذف حسب السياق|
|34|`$`|الانتقال إلى نهاية السطر في `vi`|
|35|`0`|الانتقال إلى بداية السطر في `vi`|
|36|`u`|Undo في `vi`|
|37|`/x`|البحث عن `x` في `vi`|
|38|`i`|الدخول إلى Editing/Insert Mode|
|39|`I`|الدخول للـInsert عند بداية السطر|
|40|`A`|الدخول للـInsert عند نهاية السطر|
|41|`ESC`|الرجوع إلى Command Mode|
|42|`:wq`|Save + Quit من `vi`|
|43|`:q!`|Quit بدون حفظ|
|44|`useradd`|إنشاء User|
|45|`useradd -c "Comment" username`|إنشاء User مع Comment|
|46|`groupadd group_name`|إنشاء Group|
|47|`useradd -g group_name user_name`|إنشاء User وتحديد الـPrimary Group|
|48|`useradd -G group_name user_name`|إضافة User إلى Supplementary Group أثناء الإنشاء|
|49|`useradd -a username`|إضافة/Append User إلى الـSupplementary Groups حسب النوتس|
|50|`userdel user_name`|حذف User|
|51|`history`|عرض الـCommand History|
|52|`passwd username`|تغيير Password لمستخدم|
|53|`su username`|التحويل إلى User آخر|
|54|`useradd -g developers -G sudo,docker ahmed`|إنشاء `ahmed` بـPrimary Group `developers` وSupplementary Groups `sudo`, `docker`|
|55|`CTRL + R`|البحث في الـCommand History|
|56|`CTRL + A`|الانتقال إلى بداية الـCommand|
|57|`CTRL + E`|الانتقال إلى نهاية الـCommand|
|58|`chown user_name file_name`|تغيير User Ownership للـFile|
|59|`chown :group_name file`|تغيير Group Ownership للـFile|
|60|`chown user_name:group_name file`|تغيير User وGroup Ownership|
|61|`chgrp group_name file_name`|تغيير Group Ownership|
|62|`chmod 761 test`|تغيير Permissions باستخدام الـNumerical Method|
|63|`chmod u+r file`|إضافة Read Permission للـUser|
|64|`chmod -R ...`|تطبيق الأمر Recursive على المحتويات الداخلية|
|65|`chown -R ...`|تغيير Ownership بشكل Recursive|

### 🔐 Permission Commands

الجزء ده مهم جدًا:

|Symbol|القيمة الرقمية|المعنى|
|---|--:|---|
|`r`|`4`|Read|
|`w`|`2`|Write|
|`x`|`1`|Execute|

وبالتالي:

```text
7 = 4 + 2 + 1 = rwx
6 = 4 + 2     = rw-
1 = 1         = --x
```

فمثلًا:

```bash
chmod 761 test
```

تعني:

```text
User   → 7 → rwx
Group  → 6 → rw-
Other  → 1 → --x
```

### 🔀 Redirection Cheat Sheet

|Syntax|يعمل إيه؟|
|---|---|
|`<`|Input|
|`>`|Output مع استبدال المحتوى|
|`>>`|Output مع الإضافة في النهاية|
|`2>`|Error|
|`2>&1`|Error → نفس مكان Output|
|`\|`|Output → Input للأمر التالي|

والـFile Descriptors الموجودة في النوتس:

|FD|يمثل|
|--:|---|
|`0`|Standard Input|
|`1`|Standard Output|
|`2`|Standard Error|

--- 
# Session 3 Commands

|#|Command|الاستخدام|
|--:|---|---|
|1|`sudo chown ahmed file.txt`|تنفيذ `chown` بصلاحيات مرتفعة|
|2|`chown user file.txt`|تغيير مالك الـFile|
|3|`chgrp developers file.txt`|تغيير الـGroup الخاصة بالـFile|
|4|`sudo setcap cap_chown+ep program`|إعطاء برنامج Capability محددة مثل `CAP_CHOWN`|
|5|`sudo`|تنفيذ أمر بصلاحيات مستخدم مخول، غالبًا بصلاحيات Root|
|6|`top`|عرض الـProcesses بشكل Live ومراقبة استهلاك CPU/RAM|
|7|`ps`|عرض Snapshot للـProcesses الحالية|
|8|`ps -e`|عرض كل الـProcesses الموجودة على النظام|
|9|`ps -A`|عرض كل الـProcesses الموجودة على النظام|
|10|`ps -ef`|عرض تفاصيل موسعة لكل الـProcesses|
|11|`ps aux`|عرض تفاصيل موسعة لكل الـProcesses|
|12|`ps -ef \| grep nginx`|البحث عن Process مرتبطة بـ`nginx`|
|13|`ps aux \| grep ssh`|البحث عن Process مرتبطة بـ`ssh`|
|14|`sleep time`|إيقاف التنفيذ لمدة معينة|
|15|`sleep 5`|الانتظار 5 ثوانٍ|
|16|`sleep 5m`|الانتظار 5 دقائق|
|17|`sleep 2h`|الانتظار ساعتين|
|18|`sleep 1d`|الانتظار يومًا|
|19|`kill PID`|إرسال `SIGTERM` افتراضيًا إلى Process|
|20|`kill -15 PID`|إرسال `SIGTERM` للـProcess|
|21|`kill -9 PID`|إرسال `SIGKILL` وإنهاء Process فورًا|
|22|`kill -l`|عرض قائمة الـSignals|
|23|`sleep 100 &`|تشغيل الأمر في الـBackground|
|24|`jobs`|عرض الـJobs الخاصة بالـTerminal الحالي|
|25|`bg`|تشغيل Job متوقفة في الـBackground|
|26|`bg %1`|تشغيل Job معينة في الـBackground|
|27|`fg 1`|إعادة Job إلى الـForeground|
|28|`fg %1`|إعادة Job معينة إلى الـForeground|
|29|`kill %1`|إرسال Signal إلى Job باستخدام Job ID|
|30|`systemctl`|التحكم في Services وإدارتها|
|31|`systemctl status service_name`|معرفة حالة Service|
|32|`systemctl start service_name`|تشغيل Service|
|33|`systemctl stop service_name`|إيقاف Service|
|34|`systemctl restart service_name`|إعادة تشغيل Service|
|35|`systemctl reload service_name`|إعادة تحميل Configuration بدون Restart كامل|
|36|`systemctl enable service_name`|جعل Service تعمل تلقائيًا مع Boot|
|37|`systemctl disable service_name`|منع Service من العمل تلقائيًا مع Boot|
|38|`systemctl is-active service_name`|معرفة هل Service تعمل حاليًا|
|39|`systemctl is-enabled service_name`|معرفة هل Service مفعلة عند Boot|
|40|`systemctl list-units --type=service`|عرض الـServices المحملة/النشطة|
|41|`systemctl list-unit-files --type=service`|عرض ملفات الـServices وحالة تفعيلها|
|42|`systemctl reload sshd`|Reload لإعدادات SSH|
|43|`systemctl enable sshd`|تفعيل SSH للعمل مع Boot|
|44|`ssh hostname@ip`|الاتصال بسيرفر باستخدام SSH|
|45|`ssh root@192.168.100.134`|مثال للاتصال بـSSH|
|46|`ssh-keygen`|إنشاء SSH Key Pair|
|47|`ssh-copy-id username@server_ip`|نسخ الـPublic Key إلى السيرفر|
|48|`ssh-copy-id hassan@192.168.1.100`|مثال لنسخ الـPublic Key|
|49|`ssh username@server_ip`|تسجيل الدخول باستخدام SSH|
|50|`ssh hassan@192.168.1.100`|مثال لتسجيل الدخول بـSSH|

### 🎮 اختصارات مهمة

|Shortcut|الاستخدام|
|---|---|
|`q` داخل `top`|الخروج من `top`|
|`P` داخل `top`|ترتيب الـProcesses حسب CPU|
|`M` داخل `top`|ترتيب حسب RAM|
|`T` داخل `top`|ترتيب حسب CPU Time|
|`k` داخل `top`|قتل Process وإدخال PID|
|`r` داخل `top`|تغيير الـNice|
|`h` داخل `top`|عرض Help|
|`Ctrl + C`|إرسال `SIGINT` للـProcess الحالية|
|`Ctrl + Z`|إيقاف الـForeground Job مؤقتًا|
|`Ctrl + R`|البحث في الـHistory|
|`Ctrl + A`|الذهاب لبداية الـCommand|
|`Ctrl + E`|الذهاب لنهاية الـCommand|

### 🔐 أهم الـSignals

|Signal|Number|الاستخدام|
|---|--:|---|
|`SIGINT`|`2`|Interrupt، مثل `Ctrl+C`|
|`SIGKILL`|`9`|إنهاء Process فورًا|
|`SIGTERM`|`15`|طلب إنهاء Process بشكل طبيعي|
|`SIGCONT`|`18`|استكمال Process متوقفة|
|`SIGSTOP`|`19`|إيقاف Process|

### ⚙️ أهم أوامر `systemctl`

|Command|المعنى|
|---|---|
|`start`|Start|
|`stop`|Stop|
|`restart`|Restart|
|`reload`|Reload Configuration|
|`enable`|Start on Boot|
|`disable`|Don't Start on Boot|
|`status`|عرض الحالة|
|`is-active`|هل تعمل الآن؟|
|`is-enabled`|هل مفعلة للـBoot؟|

---
# Session 4 Commands

|#|Command|الاستخدام|
|--:|---|---|
|1|`rpm -i package.rpm`|تثبيت Package بصيغة RPM|
|2|`rpm -e package`|حذف Package|
|3|`rpm --help`|عرض جميع Options الخاصة بـ`rpm`|
|4|`#!/bin/bash`|تحديد Bash كـInterpreter للـScript باستخدام Shebang|
|5|`x=5`|تعريف Variable|
|6|`y="z"`|تعريف String Variable|
|7|`echo $x`|طباعة قيمة Variable|
|8|`echo ${x}`|طباعة قيمة Variable باستخدام `${}`|
|9|`read name`|استقبال Input من المستخدم وتخزينه في Variable|
|10|`echo "..."`|طباعة نص أو قيمة Variable|
|11|`echo $?`|معرفة Exit Status لآخر Command تم تنفيذه|
|12|`if [ condition ]; then ... fi`|تنفيذ Commands بناءً على Condition|
|13|`if ... else ... fi`|تنفيذ أحد فرعين حسب نتيجة الـCondition|
|14|`if ... elif ... else ... fi`|التعامل مع أكثر من Condition|
|15|`-gt`|مقارنة: Greater Than|
|16|`-lt`|مقارنة: Less Than|
|17|`-eq`|مقارنة: Equal|
|18|`-le`|Less Than or Equal|
|19|`-ge`|Greater Than or Equal|
|20|`-ne`|Not Equal|
|21|`=`|مقارنة Strings للتساوي|
|22|`!=`|مقارنة Strings لعدم التساوي|
|23|`-n`|اختبار أن الـString ليست فارغة|
|24|`-z`|اختبار أن الـString فارغة|
|25|`-e`|اختبار هل الـPath موجود|
|26|`-f`|اختبار هل الـPath عبارة عن Regular File|
|27|`-d`|اختبار هل الـPath عبارة عن Directory|
|28|`-L`|اختبار هل الـPath عبارة عن Symbolic Link|
|29|`while [ condition ]; do ... done`|تكرار Commands طالما الـCondition صحيحة|
|30|`for x in $var; do ... done`|عمل Loop على مجموعة Values|
|31|`for x in {1..5}; do ... done`|عمل Loop على Range من Values|
|32|`break`|الخروج من الـLoop بالكامل|
|33|`continue`|تخطي الـCurrent Iteration والانتقال للي بعدها|
|34|`exit 1`|إنهاء الـScript وإرجاع Exit Status|
|35|`function_name() { ... }`|تعريف Function في Bash|
|36|`$1`|أول Argument للـFunction|
|37|`$2`|ثاني Argument للـFunction|
|38|`$3`|ثالث Argument للـFunction|
|39|`function_name argument`|استدعاء Function وإرسال Argument|
|40|`yum install python3-pip`|تثبيت Python Pip باستخدام Yum|
|41|`pip install ansible`|تثبيت Ansible باستخدام Pip|
|42|`useradd ansible`|إنشاء User باسم `ansible`|
|43|`passwd ansible`|تعيين Password للـUser|
|44|`vi /etc/sudoers`|فتح ملف Sudoers لتعديل صلاحيات الـUsers|
|45|`su - ansible`|التحويل إلى User `ansible` مع Login Environment|
|46|`ssh-keygen`|إنشاء SSH Key Pair|
|47|`ssh-copy-id ansible@host01_ip`|نسخ الـSSH Public Key إلى Worker|
|48|`ssh-copy-id ansible@host02_ip`|نسخ الـSSH Public Key إلى Worker|
|49|`ssh hostname@ip`|الاتصال بـMachine عن طريق SSH|

### 📦 Package Management

|Command|الاستخدام|
|---|---|
|`rpm -i`|Install|
|`rpm -e`|Erase / Delete|
|`rpm --help`|Help|

والنوتس بتوضح إن الـPackage عبارة عن مجموعة من **binary files + configuration files + libraries**، والـPackages بتتخزن في Repositories، ولكل Linux distro/عائلة Package Manager مناسب لها.

### 🐚 Bash أهم الـSyntax

|Syntax|المعنى|
|---|---|
|`#!/bin/bash`|Bash Shebang|
|`x=5`|Variable|
|`echo $x`|استخدام Variable|
|`read name`|أخذ Input|
|`$?`|Exit Status|
|`if`|Condition|
|`elif`|Condition إضافية|
|`else`|الحالة البديلة|
|`while`|Loop بشرط|
|`for`|Loop على مجموعة|
|`break`|إنهاء Loop|
|`continue`|تخطي Iteration|
|`exit`|إنهاء Script|
|`function()`|إنشاء Function|
|`$1`, `$2`, `$3`|Function Arguments|

### 🤖 Ansible Setup

|Command|الاستخدام|
|---|---|
|`ssh hostname@ip`|الاتصال بالـManaged Node|
|`yum install python3-pip`|تثبيت Pip/Python tools على الـMaster|
|`pip install ansible`|تثبيت Ansible|
|`useradd ansible`|إنشاء Ansible User|
|`passwd ansible`|إنشاء Password للـUser|
|`vi /etc/sudoers`|تعديل Sudoers|
|`su - ansible`|التحويل إلى Ansible User|
|`ssh-keygen`|إنشاء SSH Keys|
|`ssh-copy-id ansible@host_ip`|إرسال الـPublic Key للـWorker|

---
# Session 5 Commands

|#|Command / Syntax|الاستخدام|
|--:|---|---|
|1|`ansible-config`|التعامل مع إعدادات Ansible|
|2|`ansible.cfg`|ملف الـConfiguration الافتراضي لـAnsible|
|3|`inventory = /etc/ansible/hosts`|تحديد مكان الـInventory|
|4|`forks = 5`|تنفيذ Tasks على 5 Hosts بالتوازي|
|5|`remote_user = ansible`|تحديد الـRemote User|
|6|`timeout = 10`|تحديد وقت انتظار الاتصال|
|7|`stdout_callback = yaml`|تحديد شكل الـOutput|
|8|`private_key_file = ~/.ssh/id_rsa`|تحديد SSH Private Key|
|9|`become = True`|تفعيل Privilege Escalation|
|10|`become_method = sudo`|استخدام `sudo` لرفع الصلاحيات|
|11|`become_user = root`|تحديد المستخدم بعد رفع الصلاحيات|
|12|`become_ask_pass = False`|عدم طلب Password للـBecome|

---

## 🖥️ Inventory

|#|Command / Syntax|الاستخدام|
|--:|---|---|
|13|`192.168.100.132`|إضافة Host باستخدام IP|
|14|`server1.example.com`|إضافة Host باستخدام Domain|
|15|`web[a:z].example.com`|إنشاء Hosts باستخدام Character Range|
|16|`web[1:5].example.com`|إنشاء Hosts باستخدام Numeric Range|
|17|`192.168.1.[10:20]`|إنشاء IP Range|
|18|`[cairo]`|إنشاء Group|
|19|`[cairo:children]`|إنشاء Group تحتوي Groups أخرى|

---

## 🚀 Ad-Hoc Commands

|#|Command|الاستخدام|
|--:|---|---|
|20|`ansible cairo -m ping`|اختبار الاتصال بكل Hosts الموجودة في `cairo`|
|21|`ansible all -m ping`|اختبار الاتصال بكل الـHosts|
|22|`ansible all -m command -a "date"`|تنفيذ `date` على كل الـHosts|
|23|`ansible all -m command -a "cat /etc/hosts"`|عرض `/etc/hosts` على كل الـHosts|
|24|`ansible all -m user -a "name=ahmed state=present" -b`|إنشاء User|
|25|`ansible all -m user -a "name=ahmed state=absent" -b`|حذف User|
|26|`ansible all -m dnf -a "name=nginx state=present" -b`|تثبيت Nginx|
|27|`ansible all -m service -a "name=nginx state=started enabled=yes" -b`|تشغيل Nginx وتفعيله عند Boot|
|28|`ansible web_servers -m ping`|Ping على Group معينة|
|29|`ansible web_servers -m command -a "uptime"`|تنفيذ `uptime` على Group|

---

## 📄 Playbooks

|#|Command|الاستخدام|
|--:|---|---|
|30|`ansible-playbook playbook.yaml`|تشغيل Playbook|
|31|`ansible-playbook -i inventory.ini playbook.yaml`|تشغيل Playbook باستخدام Inventory محدد|
|32|`ansible-playbook playbook.yaml -l cairo`|تشغيل Playbook على Group محددة|
|33|`ansible-playbook playbook.yaml -l worker-01`|تشغيل Playbook على Host محدد|
|34|`ansible-playbook playbook.yaml -e "username=ahmed"`|تمرير Extra Variable|
|35|`ansible-playbook playbook.yaml --check`|Dry Run / Check Mode|
|36|`ansible-playbook playbook.yaml --diff`|عرض الفرق في التغييرات|
|37|`ansible-playbook playbook.yaml --check --diff`|Check + عرض الـDiff|
|38|`ansible-playbook playbook.yaml -v`|Verbosity مستوى 1|
|39|`ansible-playbook playbook.yaml -vv`|Verbosity أعلى|
|40|`ansible-playbook playbook.yaml -vvv`|Verbosity أعلى للـTroubleshooting|
|41|`ansible-playbook playbook.yaml -vvvv`|أعلى مستوى Verbosity|
|42|`ansible-playbook playbook.yaml --syntax-check`|فحص Syntax بدون تشغيل|
|43|`ansible-playbook playbook.yaml --list-hosts`|عرض الـHosts التي سيعمل عليها الـPlaybook|
|44|`ansible-playbook playbook.yaml --list-tasks`|عرض الـTasks بدون تنفيذها|
|45|`ansible-playbook playbook.yaml --start-at-task "Install nginx"`|البدء من Task معينة|
|46|`ansible-playbook playbook.yaml --step`|تنفيذ الـTasks خطوة بخطوة|
|47|`ansible-playbook playbook.yaml -b`|تشغيل مع Privilege Escalation|
|48|`ansible-playbook playbook.yaml -b -K`|Become + طلب Password|

---

## 📌 أهم Options تحفظها

|Option|معناها|
|---|---|
|`-m`|Module|
|`-a`|Module Arguments|
|`-i`|Inventory|
|`-l`|Limit|
|`-e`|Extra Variables|
|`-b`|Become|
|`-K`|Ask Become Password|
|`-v`|Verbosity|
|`--check`|Dry Run|
|`--diff`|Show Differences|
|`--syntax-check`|فحص Syntax|
|`--list-hosts`|عرض Hosts|
|`--list-tasks`|عرض Tasks|
|`--start-at-task`|البدء من Task معينة|
|`--step`|تشغيل Step by Step|

### 🧠 أهم 3 حاجات في الجزء ده

```text
ansible
   ↓
Ad-Hoc Commands
   ↓
ansible <host-pattern> -m <module> -a "<args>"
```

```text
ansible-playbook
   ↓
Playbook (.yml / .yaml)
   ↓
ansible-playbook playbook.yaml
```

```text
ansible.cfg
   ↓
Configuration

Inventory
   ↓
Hosts / Groups
```

---
# Docker 1 Commands

|#|Command|الاستخدام|
|--:|---|---|
|1|`docker --version`|معرفة إصدار Docker|
|2|`docker run IMAGE`|إنشاء وتشغيل Container من Image|
|3|`docker run -d IMAGE`|تشغيل Container في الخلفية|
|4|`docker run --name NAME IMAGE`|إنشاء Container باسم محدد|
|5|`docker run -it IMAGE bash`|تشغيل Container بشكل Interactive والدخول إلى Bash|
|6|`docker run -p 8080:80 IMAGE`|عمل Port Mapping بين Host وContainer|
|7|`docker run --restart=always IMAGE`|تشغيل Container مع Restart Policy|
|8|`docker ps`|عرض الـRunning Containers|
|9|`docker ps -a`|عرض كل الـContainers بما فيها المتوقفة|
|10|`docker stop CONTAINER`|إيقاف Container|
|11|`docker start CONTAINER`|تشغيل Container متوقفة|
|12|`docker rm CONTAINER`|حذف Container|
|13|`docker rm -f CONTAINER`|حذف Container بالقوة حتى لو كانت شغالة|
|14|`docker rm CONTAINER1 CONTAINER2`|حذف أكثر من Container|
|15|`docker container prune`|حذف كل الـStopped Containers|
|16|`docker rm -f $(docker ps -aq)`|حذف كل الـContainers|
|17|`docker images`|عرض الـDocker Images|
|18|`docker image ls`|عرض الـDocker Images|
|19|`docker rmi IMAGE`|حذف Image|
|20|`docker rmi IMAGE_ID`|حذف Image باستخدام ID|
|21|`docker rmi IMAGE1 IMAGE2`|حذف أكثر من Image|
|22|`docker image prune`|حذف الـUnused/Dangling Images|
|23|`docker image prune -a`|حذف كل الـImages غير المستخدمة بواسطة Containers|
|24|`docker rmi $(docker images -q)`|حذف كل الـImages|
|25|`docker ps -aq`|إظهار IDs لكل الـContainers|
|26|`docker images -q`|إظهار IDs لكل الـImages|

---

## 🔄 Restart Policies

|Policy|الاستخدام|
|---|---|
|`--restart=no`|لا تعمل Restart تلقائيًا — وهي الـDefault|
|`--restart=on-failure`|Restart عند انتهاء الـContainer بسبب Failure|
|`--restart=on-failure:5`|Restart عند Failure بحد أقصى 5 مرات|
|`--restart=always`|إعادة تشغيل الـContainer تلقائيًا عند توقفها|
|`--restart=unless-stopped`|Restart تلقائي إلا إذا تم إيقافها يدويًا|

مثال:

```bash
docker run -d --name webapp --restart=always nginx
```

---

## 🧱 Dockerfile / Image / Container

|العنصر|معناه|
|---|---|
|`Dockerfile`|Instructions لبناء الـImage|
|`docker build`|بناء Image من Dockerfile|
|`Docker Image`|Template لإنشاء Containers|
|`docker run`|إنشاء وتشغيل Container من Image|
|`Docker Container`|Instance شغالة من الـImage|
|`FROM`|تحديد الـBase Image|
|`WORKDIR`|تحديد Working Directory|
|`COPY`|نسخ Files إلى الـImage|
|`ENTRYPOINT`|تحديد الـMain Process/Command للـContainer|

مثال الـDockerfile الموجود عندك:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY . .

ENTRYPOINT ["dotnet", "MyApp.dll"]
```

---

## ⚙️ Docker Architecture — المهم تحفظه

|Component|وظيفته|
|---|---|
|**Docker Client**|الأوامر اللي بتكتبها مثل `docker run`|
|**Docker Engine**|يستقبل Requests ويدير Docker|
|**Docker Daemon**|Process شغالة في Background وتدير عمليات Docker|
|**containerd**|إدارة Lifecycle للـContainers والـImages وغيرها|
|**shim**|Process وسيطة مرتبطة بتشغيل الـContainer|
|**runc**|Low-level Container Runtime|
|**Linux Kernel**|يوفر Features زي Namespaces وcgroups|
|**OCI**|Standards الخاصة بالـContainer Images وRuntimes|

والـFlow المبسط:

```text
Docker Client
     ↓
Docker Engine / Daemon
     ↓
containerd
     ↓
shim
     ↓
runc
     ↓
Linux Kernel
     ↓
Container
```

---

## 🔒 Container Isolation

|Technology|الوظيفة|
|---|---|
|**Namespaces**|Isolation — تحدد الـResources والبيئة التي يراها الـContainer|
|**PID Namespace**|عزل الـProcesses|
|**Network Namespace**|عزل الـNetwork|
|**User Namespace**|عزل الـUsers/UIDs|
|**Mount Namespace**|عزل الـFilesystem Mounts|
|**cgroups**|Resource Control|
|CPU cgroup|التحكم في استهلاك CPU|
|Memory cgroup|التحكم في استهلاك RAM|

### أسهل طريقة لحفظهم:

```text
Namespace
   ↓
What can I SEE?
```

```text
cgroups
   ↓
How much can I USE?
```

---

## 🐧 Docker Installation على CentOS

|#|Command|الاستخدام|
|--:|---|---|
|1|`sudo yum remove docker ...`|إزالة نسخ Docker القديمة|
|2|`sudo yum install -y yum-utils`|تثبيت `yum-utils`|
|3|`sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`|إضافة Docker Repository|
|4|`sudo yum install -y docker-ce docker-ce-cli containerd.io`|تثبيت Docker وcontainerd|
|5|`sudo systemctl start docker`|تشغيل Docker Service|
|6|`docker --version`|التأكد من إصدار Docker|

---
# Docker 2 Commands

## Image Commands

|Command|الاستخدام|مثال|
|---|---|---|
|`docker images`|عرض كل الـ Images الموجودة Local|`docker images`|
|`docker rmi IMAGE`|حذف Image معينة|`docker rmi nginx`|
|`docker search IMAGE`|البحث عن Image على Docker Hub|`docker search nginx`|
|`docker history IMAGE`|عرض History والـ Layers الخاصة بالـ Image|`docker history nginx`|
|`docker tag IMAGE NEW_TAG`|إضافة Tag/اسم جديد يشير لنفس الـ Image|`docker tag nginx:latest mynginx:v1`|
|`docker commit CONTAINER IMAGE:TAG`|إنشاء Image جديدة من حالة Container الحالية|`docker commit webapp myimage:v1`|
|`docker save -o FILE IMAGE`|حفظ Image في ملف `.tar`|`docker save -o nginx.tar nginx:latest`|
|`docker load -i FILE`|استرجاع Image من ملف تم عمله بـ `docker save`|`docker load -i nginx.tar`|

### 🔄 Image Backup

|الخطوة|Command|الوظيفة|
|---|---|---|
|1|`docker images`|التأكد إن الـ Image موجودة|
|2|`docker save -o nginx-backup.tar nginx:latest`|عمل Backup للـ Image|
|3|`ls -lh nginx-backup.tar`|التأكد إن ملف الـ Backup اتعمل|
|4|`docker rmi nginx:latest`|حذف الـ Image|
|5|`docker images`|التأكد إنها اتمسحت|
|6|`docker load -i nginx-backup.tar`|استرجاع الـ Image|
|7|`docker images`|التأكد إنها رجعت|

**Flow:**

```text
Image
  ↓ docker save
.tar
  ↓ docker rmi
Deleted
  ↓ docker load
Image Restored
```

---

# Container Commands

|Command|الاستخدام|مثال|
|---|---|---|
|`docker run IMAGE`|Create + Start Container جديد|`docker run nginx`|
|`docker start CONTAINER`|تشغيل Container متوقف|`docker start webapp`|
|`docker stop CONTAINER`|إيقاف Container شغال|`docker stop webapp`|
|`docker restart CONTAINER`|Restart للـ Container|`docker restart webapp`|
|`docker ps`|عرض الـ Containers الشغالة فقط|`docker ps`|
|`docker ps -a`|عرض كل الـ Containers|`docker ps -a`|
|`docker logs CONTAINER`|عرض Logs الخاصة بالـ Container|`docker logs webapp`|
|`docker logs -f CONTAINER`|متابعة Logs بشكل Live|`docker logs -f webapp`|
|`docker inspect CONTAINER/IMAGE`|عرض تفاصيل كثيرة بصيغة JSON|`docker inspect webserver`|
|`docker events`|مراقبة Docker Events بشكل Live|`docker events`|
|`docker port CONTAINER`|عرض Port Mapping|`docker port webserver`|
|`docker top CONTAINER`|عرض Processes داخل Container|`docker top webserver`|
|`docker stats`|مراقبة Resource Usage بشكل Live|`docker stats`|
|`docker diff CONTAINER`|عرض تغييرات Filesystem مقارنة بالـ Image|`docker diff test`|

---

## `docker run` Options

|Option|المعنى|الاستخدام|
|---|---|---|
|`-d`|Detached|تشغيل Container في الخلفية|
|`--detach`|Detached|نفس `-d`|
|`--name`|اسم الـ Container|تحديد اسم بدل الاسم العشوائي|
|`-p`|Port Mapping|ربط Host Port بـ Container Port|
|`-P`|Publish All|نشر الـ Ports المعلنة تلقائيًا|
|`-i`|Interactive|إبقاء Standard Input مفتوح|
|`-t`|TTY|إنشاء Terminal|
|`-it`|Interactive + TTY|الدخول والتعامل مع Container من Terminal|
|`--rm`|Auto Remove|حذف Container تلقائيًا بعد توقفه|

---

### أهم أمثلة `docker run`

#### تشغيل عادي

```bash
docker run nginx
```

```text
docker run
   ↓
Create Container
   ↓
Start Container
```

ولو الـ Image مش موجودة:

```text
docker pull
   ↓
docker create
   ↓
docker start
```

---

#### Detached Mode

```bash
docker run -d nginx
```

|بدون `-d`|مع `-d`|
|---|---|
|Foreground|Background|
|Terminal متعلق بالـ Container|Terminal يرجعلك|
|مناسب للتفاعل|مناسب للخدمات|

---

#### تسمية Container

```bash
docker run -d --name webserver nginx
```

وبعدها:

```bash
docker stop webserver
docker start webserver
docker logs webserver
```

---

##  Port Mapping

الصيغة:

```bash
docker run -p HOST_PORT:CONTAINER_PORT IMAGE
```

مثال:

```bash
docker run -d -p 8080:80 nginx
```

يعني:

```text
Host :8080
     ↓
Container :80
     ↓
Nginx
```

|Command|المعنى|
|---|---|
|`-p 8080:80`|Host 8080 → Container 80|
|`-p 5000:80`|Host 5000 → Container 80|
|`-p 80:80`|Host 80 → Container 80|

### أكثر من Port

```bash
docker run -d \
-p 8080:80 \
-p 8443:443 \
nginx
```

```text
8080 → 80
8443 → 443
```

---

## `-P` vs `-p`

|Option|الاستخدام|
|---|---|
|`-p 8080:80`|إنت بتحدد الـ Host Port بنفسك|
|`-P`|Docker يعمل Publish للـ exposed ports ويختار Host Ports|

مثال:

```bash
docker run -d -P nginx
```

ثم:

```bash
docker ps
```

ممكن تشوف:

```text
0.0.0.0:32768->80/tcp
```

يعني:

```text
Host 32768 → Container 80
```

---

## 💻 `-it`

```bash
docker run -it ubuntu bash
```

|Option|المعنى|
|---|---|
|`-i`|Interactive|
|`-t`|Allocate TTY|
|`-it`|Interactive Terminal|

بعد الدخول:

```bash
ls
pwd
apt update
```

للخروج:

```bash
exit
```

---

## 🗑️ `--rm`

```bash
docker run --rm ubuntu echo "Hello Docker"
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
Delete automatically
```

مفيد جدًا للـ temporary containers.

---

# ▶️ تشغيل Command عند إنشاء Container

الصيغة:

```bash
docker run IMAGE COMMAND
```

مثال:

```bash
docker run ubuntu ls
```

أو:

```bash
docker run ubuntu echo "Hello"
```

النقطة المهمة:

> **الـ Container بيعيش طالما الـ Main Process بتاعه شغال.**

مثلاً:

```bash
docker run ubuntu echo "Hello"
```

`echo` يخلص → الـ Container يخرج `Exited`.

بينما:

```bash
docker run -d nginx
```

Nginx شغال → Container يفضل `Running`.

---

# 🔍 Container Inspection & Monitoring

## `docker inspect`

```bash
docker inspect webserver
```

يعرض معلومات تفصيلية مثل:

- Container ID
    
- Image
    
- IP Address
    
- Environment Variables
    
- Ports
    
- Volumes/Mounts
    
- Network
    
- State
    
- Restart Policy
    

### استخراج IP فقط

```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' webserver
```

`-f` = Format/Filter للـ Output.

---

## `docker events`

```bash
docker events
```

يعرض الأحداث Live.

ممكن تتابع:

```text
create
start
stop
destroy
```

### Events الخاصة بالـ Containers

```bash
docker events --filter type=container
```

### Event معين

```bash
docker events --filter event=start
```

---

## `docker port`

```bash
docker port webserver
```

مثلاً:

```text
80/tcp -> 0.0.0.0:8080
```

يعني:

```text
Host 8080 → Container 80
```

Port معين:

```bash
docker port webserver 80
```

---

## `docker top`

```bash
docker top webserver
```

يعرض الـ Processes الموجودة داخل Container.

مفيد لمعرفة:

```text
PID
PPID
Process
Command
```

---

## `docker stats`

```bash
docker stats
```

يعرض Resource Usage بشكل Live:

|Resource|المعنى|
|---|---|
|CPU %|استهلاك CPU|
|MEM USAGE|Memory المستخدمة|
|MEM LIMIT|Memory Limit|
|NET I/O|Network I/O|
|BLOCK I/O|Disk/Block I/O|
|PIDS|عدد Processes|

Container واحد:

```bash
docker stats webserver
```

مرة واحدة بدون Live:

```bash
docker stats --no-stream
```

---

# 📝 `docker diff`

```bash
docker diff test
```

يعرض التغييرات في Filesystem مقارنة بالـ Image الأصلية.

|Letter|المعنى|
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

يعني:

```text
A → Added
C → Changed
D → Deleted
```

---

# 🌐 Registry vs Local Storage

|المكان|المعنى|أمثلة|
|---|---|---|
|**External / Registry**|Images خارج جهازك|Docker Hub / Private Registry|
|**Local Storage**|Images على جهازك|Docker Local Storage|

### الحركة بينهما

|Command|الاتجاه|الوظيفة|
|---|---|---|
|`docker pull`|Registry → Local|سحب Image|
|`docker push`|Local → Registry|رفع Image|
|`docker save`|Local Image → `.tar`|تصدير Image|
|`docker load`|`.tar` → Local Image|استيراد Image|
|`docker rmi`|Local → Deleted|حذف Image|
|`docker run`|Image → Container|إنشاء وتشغيل Container|
|`docker commit`|Container → Image|إنشاء Image من Container|

---

# 🐳 Container Lifecycle

الحالات الأساسية في النوتس:

```text
              ┌──────────┐
              │  Image   │
              └────┬─────┘
                   │
                  run
                   ↓
              ┌──────────┐
              │ RUNNING  │
              └────┬─────┘
                   │
          ┌────────┴────────┐
          │                 │
       pause             stop/kill
          ↓                 ↓
      PAUSED            STOPPED
          │                 │
       unpause            start
          │                 │
          └──────→ RUNNING ←┘
```

والـ Container لما يكون `stopped`:

```bash
docker rm container
```

→ Deleted

ولو Running:

```bash
docker rm -f container
```

→ Force Remove

---

# 📝 Dockerfile Instructions

|Instruction|الاستخدام|
|---|---|
|`FROM`|تحديد Base Image|
|`RUN`|تنفيذ Command أثناء Build|
|`CMD`|Default Command وقت تشغيل Container|
|`EXPOSE`|توثيق الـ Port الذي يستمع عليه Container|
|`ENV`|تعريف Environment Variable|
|`COPY`|نسخ ملفات من Build Context|
|`ADD`|COPY + ميزات إضافية مثل URL وtar extraction|
|`ENTRYPOINT`|تحديد الأمر الرئيسي للـ Container|
|`VOLUME`|تحديد Mount Point للـ Volume|
|`USER`|تحديد User الذي ستعمل به الأوامر|
|`WORKDIR`|تحديد Working Directory|
|`ARG`|Build-time Variable|

### أهم فرق لازم تحفظه

|`RUN`|`CMD`|
|---|---|
|وقت **Build**|وقت **Runtime**|
|ينفذ Commands أثناء بناء Image|Default Command عند تشغيل Container|
|ينتج Layer|لا يُعتبر Layer تشغيلية مثل `RUN`|

---

# ⚔️ `CMD` vs `ENTRYPOINT`

||`CMD`|`ENTRYPOINT`|
|---|---|---|
|الطبيعة|Default Command|Main/Fixed Command|
|`docker run IMAGE COMMAND`|يستبدله|يمرره كـ Argument|
|مناسب لـ|Default behavior|Main purpose/executable|

مثال:

```dockerfile
CMD ["python", "app.py"]
```

ثم:

```bash
docker run myimage bash
```

→ `bash` يستبدل الـ CMD.

أما:

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

ثم:

```bash
docker run myimage test.py
```

→ تصبح:

```bash
python test.py
```

**Pattern مهم جدًا:**

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

`ENTRYPOINT` = ثابت  
`CMD` = Default argument قابل للتغيير.

---

# 🏗️ Multi-Stage Build

الفكرة:

```text
Builder Stage
    ↓
Compile / Publish
    ↓
Final Runtime Image
```

مثال:

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

|Syntax|معناها|
|---|---|
|`AS builder`|تسمية الـ Stage|
|`COPY --from=builder`|نسخ ملفات من Stage اسمها `builder`|
|SDK Image|Build tools|
|ASP.NET Image|Runtime فقط|

**الهدف الأساسي:** الـ Final Image تحتوي على الـ Runtime والملفات اللازمة للتشغيل بدل أدوات الـ Build كاملة.

---

# 💾 Docker Volumes

## أنواع التخزين

|النوع|مكان التخزين|مين بيديره؟|الاستخدام|
|---|---|---|---|
|Named Volume|Docker-managed storage|Docker|Persistent Data|
|Anonymous Volume|Docker-managed storage|Docker|Temporary/unnamed persistence|
|Bind Mount|أي Path على Host|إنت|Development / specific host path|

> **مهم:** حسب التفاصيل المكتوبة في المصدر، الـ Anonymous Volume هنا مخزن على الـ disk داخل Docker-managed storage، وليس في الـ RAM.

---

# 📦 Volume Commands

|Command|الاستخدام|مثال|
|---|---|---|
|`docker volume create NAME`|إنشاء Named Volume|`docker volume create my_data`|
|`docker volume ls`|عرض الـ Volumes|`docker volume ls`|
|`-v NAME:PATH`|ربط Named Volume|`-v my_data:/var/lib/mysql`|
|`-v HOST:CONTAINER`|عمل Bind Mount|`-v /home/user/data:/app/data`|

### Named Volume

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

```text
Docker Volume
my_data
   │
   ↓
/var/lib/mysql
   │
   ↓
MySQL Container
```

---

# Anonymous Volume

```bash
docker run -d \
--name mydb \
-v /var/lib/mysql \
mysql:8.0
```

الفرق:

```text
Named:
my_data:/var/lib/mysql

Anonymous:
/var/lib/mysql
```

في الـ Anonymous Docker هو اللي بيدي الـ Volume اسمًا تلقائيًا.

---

# Bind Mount

```bash
docker run -d \
--name myapp \
-v /home/user/my-project/src:/app/src \
node:18
```

يعني:

```text
Host:
/home/user/my-project/src
        │
        ↓
Container:
/app/src
```

مفيد جدًا في Development لأن التعديلات على ملفات الـ Host تظهر داخل الـ Container.

---

# 🧠 Volume Persistence

مثال:

```bash
docker volume create my_data
```

```bash
docker run -d \
--name mydb \
-v my_data:/var/lib/mysql \
mysql:8.0
```

بعدها:

```bash
docker rm -f mydb
```

ثم:

```bash
docker run -d \
--name mydb2 \
-v my_data:/var/lib/mysql \
mysql:8.0
```

الـ `mydb2` يستخدم **نفس الـ Volume** وبالتالي البيانات الموجودة فيه تظل موجودة رغم حذف الـ Container القديم.

---

# ⭐ أهم Commands للحفظ

لو هتذاكر الجزء ده للامتحان، ركز خصوصًا على دول:

```bash
docker images
docker rmi
docker search
docker history
docker tag
docker commit
docker save
docker load

docker run
docker start
docker stop
docker restart
docker ps
docker ps -a
docker logs
docker inspect
docker events
docker port
docker top
docker stats
docker diff

docker pull
docker push

docker volume create
docker volume ls
```

وأهم `docker run` options:

```text
-d       → Detached
--name   → Container name
-p       → Port mapping
-P       → Publish ports automatically
-it      → Interactive terminal
--rm     → Delete automatically
```

وأهم Dockerfile:

```text
FROM
RUN
CMD
EXPOSE
ENV
COPY
ADD
ENTRYPOINT
VOLUME
USER
WORKDIR
ARG
```

**أهم 5 فروق تحفظهم:**

```text
docker pull  → Registry → Local
docker push  → Local → Registry

docker save  → Image → .tar
docker load  → .tar → Image

docker run   → Image → Container
docker commit → Container → Image

CMD          → Default
ENTRYPOINT   → Main/Fixed

Volume       → Docker-managed persistent storage
Bind Mount   → Host path controlled by you
```