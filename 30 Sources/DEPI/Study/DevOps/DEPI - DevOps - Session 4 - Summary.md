---
title: "DEPI - DevOps - Session 4 - Summary"
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
# Packages

يعني اي Package ؟

كل حاجه بيحتاجها الابلكيشن علشان يشتغل. وتكون متضمنه

```bash
Package = bin files + config files + libraries
```

وال Packages بتتشال في Reposatories 

وكل linux distro ليه ال Package Manager بتاعه

Ubuntu => deb
RH => RPM

---

ال RPM بيكون ليه Files 


![[Pasted image 20260808115242.png]]
معلومة.


اوامر rpm
```bash
rpm -i # for installation (Important)
rpm -e # for delete (Important)
rpm --help # for all options
```

---

الاسهل في الاستخدام حاليا هو yum لانك مش محتاج كل ما تعوز تنزل حاجه تنزل ال rpm بتاعه

yum عبارة عن سيستم متكون من جزئين
ال yum نفسه الكومند بتاعه
ودا بيكون مربوط بفايلات والفايلات دي بيكون مكتوب فيها الrepos الي هو يروح يبص عليها ويدور على الباكجز الي انت عايز تسطبها

 ---

# Program and Scripting 

## Program

الـProgram عبارة عن Group of instruction to Solve a  Problem

وفي نوعين من اللغات الي بيتكتب بيها ال Program

![[Pasted image 20260811093417.png]]

- الـ Compiled Langugae كود بتاعك بيتحول **قبل التشغيل** إلى Machine Code أو شكل وسيط قابل للتنفيذ بواسطة برنامج اسمه **Compiler**.

![[Pasted image 20260811093914.png]]
- الـ Compiler ياخد الكود ويحوّله لبرنامج executable، وبعد كده تشغله.

- الـ Interpreted Language
	- في الـ **Interpreted Language**، بيكون عندك برنامج اسمه **Interpreter** مسؤول عن قراءة الكود وتنفيذه أثناء التشغيل.

![[Pasted image 20260811093848.png]]


تمام دلوقتي عرفنا اي هو الـ Program 

طب اي هو الـ Scripting ؟

---

## Scripting

الـ Scripting: عبارة عن Execution of Steps 

شئ مكتوب يتعمل وبس كدا

في فرق بين كتابة Program في بايثون مثلا و انك تكتب Script في بايثون

ف احنا هنسكربت بال Bash

---

## Bash Scripting

لو تفتكر اي هو ال shell 
![[Pasted image 20260811095816.png]]

انه بياخد الامر من الترمنال ويبعته للكيرنال ويشغل الشغل

ليه انواع وهما
- Posix
- Bourne Again SHell او كما يعرف ب BASH
- CShell

فكل دا وظيفته واحدة بياخد الامر يودي للكيرنال يشغل الشغل يرجعلي الشغل

---
### Bash or Python?

اي الفرق ما بين ال Bash و الPython استخدم انهي ؟

ال Bash و ال Python بيستخدموا في كتابة ال Scripting  

هو على حسب متقدرش تحدد غير على حسب احتياجك
بس الاسرع  هو Bash لانه بي execute الCompile File 
والبايثون هو الاقوى لانه يقدر يتعامل مع اي حاجه يعني ممكن تستخدمه حتى انه ي execute ال bash script 

ف استخدامه مختلف، حاجه تنفع مع البايثون بس ف هتستخدم البايثون، والعكس

---
### 1. بداية الـ Bash Script

أي Bash Script غالبًا بيبدأ بـ **Shebang**، وده بيحدد الـ interpreter اللي هيشغل الـ script.

```bash
#!/bin/bash
```

أو بشكل عام:

```bash
#!<shell_path>
```

مثال:

```bash
#!/usr/bin/bash
```

> ملاحظة: `#!/bin/bash` مش مجرد تعليق عادي؛ الـ OS بيستخدم الـ shebang لمعرفة البرنامج اللي هيشغل الملف.

---

### 2. Variables

في Bash، تعريف الـ variable بيكون بالشكل:

```bash
x=5
y="z"
```

**مهم جدًا:** ممنوع تحط مسافات حوالين =

غلط:

```bash
x = 5
```

 صح:

```bash
x=5
```

#### استخدام الـ Variable

ممكن تستخدمه عن طريق `$`:

```bash
echo $x
echo $y
```

أو:

```bash
echo ${x}
echo ${y}
```

مثال:

```bash
x=5
y="z"

echo "${y} ${x}"
```

Output:

```text
z 5
```

#### Naming

في Bash، الـ variables عادةً بتكون:

```bash
camelCase
```

أو:

```bash
PascalCase
```

لكن **الأكثر شيوعًا في Shell Scripts** هو:

```bash
UPPER_CASE
```

مثال:

```bash
USER_NAME="Mahmoud"
MAX_RETRIES=3
```

---

### 3. Reading User Input

لو عايز تستقبل Input من الـ user:

```bash
read name
```

مثال:

```bash
echo "Enter your name:"
read name

echo "Hello $name"
```

لو المستخدم كتب:

```text
Mahmoud
```

النتيجة:

```text
Hello Mahmoud
```

---

### 4. Environment / Special Variables

في Bash عندك مجموعة **Special Variables** مهمة.

#### `$?`

بتحتوي على **Exit Status** لآخر command اتنفذ.

```bash
echo $?
```

القيمة:

```text
0
```

تعني إن الـ command نجح.

أي قيمة **غير 0** غالبًا معناها إن حصل Error أو إن الـ command فشل.

مثال:

```bash
ls
echo $?
```

لو `ls` نجح:

```text
0
```

مثال:

```bash
ls /something-that-does-not-exist
echo $?
```

ممكن يرجع:

```text
2
```

> القاعدة المهمة: **0 = Success، non-zero = Failure**.

---

### 5. if Condition

الـ syntax الأساسي:

```bash
if [ condition ]; then
    # commands
fi
```

مثال:

```bash
num=15

if [ $num -gt 10 ]; then
    echo "Number is greater than 10"
fi
```

هنا بنسأل:

> هل `num` أكبر من `10`؟

---

### 6. Comparison Operators

في Bash، طريقة المقارنة بتختلف حسب نوع البيانات.

#### Numerical Comparison

|Operator|المعنى|
|---|---|
|`-gt`|Greater Than `>`|
|`-lt`|Less Than `<`|
|`-eq`|Equal `=`|
|`-le`|Less Than or Equal `<=`|
|`-ge`|Greater Than or Equal `>=`|
|`-ne`|Not Equal `!=`|

مثال:

```bash
num=15

if [ $num -gt 10 ]; then
    echo "Greater than 10"
fi
```

#### مهم

في المقارنة الرقمية **ما تستخدمش**:

```bash
>
<
>=
<=
```

استخدم:

```bash
-gt
-lt
-ge
-le
```

---

### 7. String Comparison

مع الـ Strings:

#### Equal

```bash
=
```

#### Not Equal

```bash
!=
```

مثال:

```bash
name="Mahmoud"

if [ "$name" = "Mahmoud" ]; then
    echo "Hello Mahmoud"
fi
```

⚠️ الأفضل تحط الـ variable بين `"`:

```bash
"$name"
```

خصوصًا لو الـ value ممكن تحتوي على spaces.

---

#### String Empty / Not Empty

##### `-n`

تعني إن الـ String **Not Empty**.

```bash
if [ -n "$name" ]; then
    echo "Name is not empty"
fi
```

##### `-z`

تعني إن الـ String **Empty**.

```bash
if [ -z "$name" ]; then
    echo "Name is empty"
fi
```

احفظهم:

```text
-n → Not empty
-z → Empty
```

---

### 8. if / else

لو عندك حالتين:

```bash
num=8

if [ $num -gt 10 ]; then
    echo "Number is greater than 10"
else
    echo "Number is 10 or less"
fi
```

لو الشرط True → ينفذ الـ `if`.

لو False → ينفذ الـ `else`.

---

### 9. if / elif / else

لو عندك أكتر من condition:

```bash
num=10

if [ $num -gt 10 ]; then
    echo "Number is greater than 10"

elif [ $num -eq 10 ]; then
    echo "Number is exactly 10"

else
    echo "Number is less than 10"
fi
```

الترتيب:

```text
if
 ↓
condition 1
 ↓
elif
 ↓
condition 2
 ↓
else
```

---

### 10. File & Directory Conditions

Bash بيديك operators مخصوصة للـ Files والـ Directories.

| Operator | الاستخدام            |
| -------- | -------------------- |
| `-e`     | هل الـ path موجود؟   |
| `-f`     | هل هو File عادي؟     |
| `-d`     | هل هو Directory؟     |
| `-L`     | هل هو Symbolic Link؟ |

#### هل الـ path موجود؟

```bash
if [ -e "$file" ]; then
    echo "Exists"
fi
```

#### هل هو Directory؟

```bash
if [ -d "$dir" ]; then
    echo "Directory exists"
fi
```

#### هل هو Symbolic Link؟

```bash
if [ -L "$link" ]; then
    echo "Symbolic link exists"
fi
```

> `-l` ممكن تلاقيها في بعض السياقات، لكن استخدم `-L` كصيغة واضحة لاختبار symbolic link.

---

### 11. while Loop

الـ `while` بتكرر التنفيذ **طالما الـ condition True**.

Syntax:

```bash
while [ condition ]; do
    # commands
done
```

مثال:

```bash
num=1

while [ $num -le 5 ]; do
    echo $num
    num=$((num + 1))
done
```

Output:

```text
1
2
3
4
5
```

---

### 12. for Loop

ممكن تعمل loop على مجموعة values:

```bash
for x in $var
do
    # commands
done
```

لكن الـ common syntax:

```bash
for x in $var; do
    echo "$x"
done
```

مثال:

```bash
names="Ali Ahmed Mahmoud"

for name in $names; do
    echo "$name"
done
```

Output:

```text
Ali
Ahmed
Mahmoud
```

---

### 13. Range في for Loop

ممكن تعمل range باستخدام:

```bash
{start..end}
```

مثال:

```bash
for x in {1..5}; do
    echo $x
done
```

Output:

```text
1
2
3
4
5
```

يعني:

```bash
{1..5}
```

تساوي تقريبًا:

```text
1 2 3 4 5
```

---

### 14. Loop Control

عندك 3 أوامر مهمين:

#### `break`

يخرج من الـ loop بالكامل.

```bash
for x in {1..10}; do

    if [ $x -eq 5 ]; then
        break
    fi

    echo $x
done
```

الـ loop هتقف عند `5`.

---

#### `continue`

يتخطى **الـ current iteration** ويروح للـ iteration اللي بعدها.

```bash
for x in {1..5}; do

    if [ $x -eq 3 ]; then
        continue
    fi

    echo $x
done
```

Output:

```text
1
2
4
5
```

---

#### `exit`

يخرج من الـ **Script نفسه**.

```bash
echo "Start"

exit 1

echo "This will not execute"
```

---

### 15. Functions

الـ Function بتستخدمها علشان تجمع مجموعة commands في block واحد وتقدر تستدعيها أكتر من مرة.

Syntax:

```bash
function_name() {
    # commands
}
```

مثال:

```bash
sayHello() {
    echo "Hello"
}
```

ولما عايز تستدعيها:

```bash
sayHello
```

Output:

```text
Hello
```

#### Parameters

في Bash، الـ function ممكن تستقبل arguments:

```bash
greet() {
    echo "Hello $1"
}
```

وتستدعيها:

```bash
greet "Mahmoud"
```

Output:

```text
Hello Mahmoud
```

هنا:

```text
$1 → أول argument
$2 → ثاني argument
$3 → ثالث argument
...
```

مثال:

```bash
sum() {
    echo $(($1 + $2))
}

sum 10 20
```

Output:

```text
30
```

---

---

# Automation using Ansible

## What is Automation?

هي عملية بنقلل فيها عدد الـ **Steps** اللي بناخدها لأقل عدد ممكن، علشان نضمن إن الـ **Operation** بتاعتنا تفضل سريعة ومايحصلهاش أي **Interruption**.

الحاجة اللي ملهاش Automation، نقدر نعملها Automation باستخدام **Scripting**.

واحنا هنا عندنا حاجة اسمها **Ansible**.

الفكرة الأساسية ورا Ansible إنها **Configuration Management**، لأنها أصلًا عبارة عن:

> **Configuration as Code (CaC)**

وهي مسؤولة عن إدارة الـ **Configuration** في الـ **Data Center** بتاعتك.

---
## How to Setup Ansible ?

![[Pasted image 20260811110802.png]]

دا الـ **Architecture** بتاعت الـ Ansible.

ندخل على الـ **Components**.

والي لا غنى عنه طبعًا هو **Python**.

وده بسبب إن Ansible شغالة أو معتمدة على حاجة اسمها **Modules**، والـ Modules دي مكتوبة باستخدام **Python**.

![[Pasted image 20260811111037.png]]

طب Ansible هيوصل إزاي للـ Nodes دي؟

عندنا Ansible عبارة عن **Agentless**.

يعني إيه الكلام ده؟

الـ **Agent** دي حاجة بتتسطب على الحاجة اللي أنا عايز أتحكم فيها، وفي حالتي دي هتبقى مثلًا الـ **Managed Nodes**.

فـ Ansible لغت الفكرة دي وقالت:

> أنا هكلم الـ Nodes بتاعتي عن طريق الـ **SSH**.

![[Pasted image 20260811111409.png]]

بعد ما تم تجهيز الـ Ansible، عايزين نشغله بقى.

فهو بيحتاج لملفين أساسيين علشان يشتغل:

### 1. Inventory

دا بيكون محطوط فيه كل الـ **IPs** بتاعت الـ **Hosts** اللي هيتحكم فيهم Ansible، واللي بنسميهم:

**Managed Nodes**

### 2. ansible.cfg

دا عبارة عن الـ **Configuration** الخاصة بـ Ansible نفسها.

---

## Setup Ansible on VMware

هنعمل **Clone** من الـ Machine الأساسية بتاعتك لـ 3 Machines:

- 1 Master
- 2 Workers

يعني:

```
Master
   │
   ├── Worker 01
   │
   └── Worker 02
```

هتعمل Connection للـ 3 بشكل طبيعي في الـ External Terminal اللي بتستخدمه، وفي حالتنا ده **MobaXterm**.

```
ssh hostname@ip
```

Example:

```
ssh root@192.168.11.332
```

وهتدخل الـ Password اللي عملته، وبس تمام.

---

## Install Python on the Master

هتنزل Python على الـ **Master**:

```
yum install python3-pip
```

وبعدها هتسطب **Ansible** من خلال Python، علشان ميحصلش Conflict بسبب الـ Versions:

```
pip install ansible
```

**كل ده على الـ Master بس!**

---

## Prepare SSH on All Nodes

هنسطب الـ SSH عليهم كلهم، وهنعمل الـ Keys عليهم كلهم برضو عن طريق الـ **Multiple Execution** في MobaXterm.

وبعد كده هنكريت User باسم:

```
ansible
```

ونعمل Password ليه:

```
useradd ansible
passwd ansible
```

---

## Add Ansible User to Sudoers

نضيف الـ User في الـ **sudoers** في المكان اللي فيه:

```
Allow root to run any commands anywhere
```

نفتح الملف:

```
vi /etc/sudoers
```

ونضيف:

```
## Allow root to run any commands anywhere
root    ALL=(ALL)     ALL
ansible ALL=(ALL)     NOPASSWD: ALL
```

والأحسن إننا نخليه يشتغل **من غير Password**، علشان ميحصلش أي **Interruption** أثناء الـ Automation.

---

## Switch to the Ansible User

بعد كده نعمل Switch للـ User:

```
su - ansible
```

وبعدها هنعمل الـ **SSH Keys** بتاعتنا:

```
ssh-keygen
```

وندوس **Enter** لحد ما يخلص.

وكده أنت زي الفل.

---

## Copy SSH Keys to Workers

دلوقتي أنت محتاج تبدل الـ **SSH Keys** مع باقي الـ Workers.

من الـ **Master**:

```
ssh-copy-id ansible@host01_ip
ssh-copy-id ansible@host02_ip
```

هيطلب منك الـ Password أول مرة، وبعد كده مش هيطلبه تاني.

وبكده الـ **Master** يقدر يتصل بالـ Workers عن طريق SSH من غير ما يطلب Password كل مرة.

```
Master
  │
  │ SSH Key
  ├──────────────→ Worker 01
  │
  │ SSH Key
  └──────────────→ Worker 02
```
---

# مصادر للمذاكرة

[W3School - Bash Script](https://www.w3schools.com/bash/bash_script.php)

[Getting Started with Ansible](https://docs.ansible.com/projects/ansible/latest/getting_started/index.html)

