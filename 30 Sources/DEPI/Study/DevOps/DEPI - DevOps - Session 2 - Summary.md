---
title: "DEPI - DevOps - Session 2 - Summary"
aliases: []
type: source
status: active
domain: devops-infrastructure
tags: [source, devops-infrastructure, course]
created: 2026-09-21
updated: 2026-10-02
source:
related: []
---
- ازاي نعمل Directory 
```bash
mkdir Directory_Name
```

ملاحظات على ال `ls`
- لعرض تفاصيل الدايركتوريز في المكان الي انت فيه
	- نكتب `ls -l`
- لعرض كل الدايركتوريز والفايلز وكل حاجه بما فيهم المختفيين 
	- نكتب `ls -a`
- نسوي الاتنين ؟ سهلة
	- نكتب `ls -al`
- طب انا غتت وعايز التفاصيل ومعاها الinode
	- سهلة `ls -li`
```bash
ls --help
```
علشان يجيبلك كل الاوبشنز الموجودة واختار فيها الي انت عايزه

- لو عايز تكريت 2 فولدر جوا بعض بحيث يكون فولدر جوا فولدر ف انت هتعمل كدا
```bash
mkdir -p depi-5/depi-6
```
- كدا اصبح ان depi-5 هو parent ل depi-6

## طرق كتابة Multiple Commands

### علامة ال && 

واحدة من الطرق الي بنكتب بيها ال Multiple Commands فمثلا عندك Command زي كدا
```bash
touch txt.xyz && mkdir xyz
```

الي هيحصل هنا انه أول حاجه هيعملها وانه هيكريت الفايل txt.xyz وبعدها هيكريت الفولدر xyz 
بس الطريقة دي مش بيتم الاعتماد بيها في الاستخدام ليه؟؟
- افتراضا لو اول حصل فيه ايرور ؟ <mark style="background-color: #ADCCFFA6;">التاني مش هيشتغل، علشان && بتنفذ الاول فلازم الاول يبقى صح علشان التاني يشتغل</mark> برضو
نيجي لحالة الPermission 

# Permission 

الصلاحيات الي بتظهرلك وانت بتكتب الامر دا
```bash
ls -al
```

![[Pasted image 20260730163714.png]]

بتبقى ظاهرة عندك بالشكل اول خانة عندك وهي بيكون فيها 4 حاجات
- نوع الشئ دا ودا بيبقى واضح من اول حاجه فيه 
	- لو كانت - تبقى فايل
	- لو كان d تبقى directory
	- لو كان l يبقى link
- بعد كدا عندك هتتقسم ل تلاتات
	- أول تلاتة ودا بيكون صلاحيات اليوزر العادي User Permission
	- تاني تلاتة ودا بتكون صلاحيات الجروب Group Permission
	- تالت تلاتة ودول بيكونوا خاصين بال other Permission الي هو لا دا ولا دا

خانة الارقام دي بقى هي المسؤولة عن ال Link Counter وعلشان تفهمها اكتر محتاجه تشوف الكيرنال والهارد وير بقى وبتاع

معلومة إثرائية كدا

> ينفع يتعمل Hard Link بشكل طبيعي للDirectory ودا بتتمثل في ال .. الي بيكونوا في الroot directory معمولين من ال OS نفسه

يعني مثلا انت جوا فولدر اسمه depi وجواه depi-1 ودا كمان جواه depi-2 انت دخلت جوا ال depi-2 وعايز تطلع ل depi ال depi يعتبر parent للdepi-1 ف انت هتطلع بشكل ريلتيف من depi-2 ل 1 ومن 1 ل depi
فالأسهل انك هتستخدم ايه ؟ طبعا ال ..
depi/depi-1/depi-2
```bash
cd ..
```
/depi

---

علشان تعمل copy لفولدر او لفايل انت بتستخدم `cp`

مثلا يعني انت عندك فايل اسمه hard انت حابب تعمل نسخه منه جوا ملف depi ف انت تعمل اي؟
```bash
cp hard depi/
```

كدا هيتعمل نسخة من هارد وتتحط جوا depi


| command                 | Meaning                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| `cp -p`                 | بينسخها كمان بالبيرمشن بتاعتها                                    |
| `cp -v`                 | يعرض تفاصيل كل ملف يتم نسخه.                                      |
| `cp -r`                 | بتنسخ المجلد وكل اللي جواه (الملفات والمجلدات الفرعية) مرة واحدة. |
| `mv source destenation` | عملية النقل من مكان لمكان او لتغيير الاسم                         |

- امر echo هو امر مسؤول عن الطباعة فقط يعني بياخد الحاجه الي هيطبعها وتطبع في الترمنال بتاعك بشكل طبيعي
```bash
echo "hello from Asyut"
hello from Asyut
```

اي هو ال Environment Variable ؟
هو <mark style="background-color: #FFF3A3A6;">**متغير بيخزن قيمة يستخدمها نظام التشغيل أو البرامج**</mark> أثناء التشغيل.

ببساطة، هو زي **إعدادات عامة** يقدر أي برنامج يقرأها بدل ما تكتب القيم داخل الكود.

مثال مثلا:

- اسم المستخدم الحالي:

```bash
echo $USER
```

- الـHome Directory:

```bash
echo $HOME
```

- المجلدات اللي النظام بيدور فيها على الأوامر:

```bash
echo $PATH
```

لو عايز اعمل بقى فاريبل ؟
```bash
DEPI=r5
```

علشان اعرضها ؟
```bash
echo DEPI
r5
```

في فرق ما بين حاجتين شبه بعض جدا وهما ال double qoutation , single qoutation 
- الـdouble qoutation : <mark style="background-color: #FFF3A3A6;">تكتبلك الجملة وتعوض عن الvariable الي انت مستدعيها بقيمتها </mark>يعني مثلا بناءا ع الي فوق
```bash
echo "The current time is $(date) and we are in round $DEPI"
The current time is Thu Jul 30 05:16:22 and we are in round r5
```

اما بعدها لو استخدمنا ال single qoutation ؟
- هيكتب ==كل حاجه بالنص ومش هيعوض عن اي حاجه خالص يعني كأنك بتقول اكتبهالي بالظبط== 
```bash
echo 'The current time is $(date) and we are in round $DEPI'
The current time is $(date) and we are in round $DEPI
```

---

- ال redirecation:

قبل ما ندخل في الموضوع دا عندنا حاجتين
- Standard Input (strin)
	- Ex: Keyboard
- Standard Output (strout)
	- Ex: Screen/Terminal

كل فايل عندنا ليه حاجه اسمها file Description:
ودا بيتكلم في 3 حاجات اساسية
- FD 0 -> Input
- FD 1 -> Output
- FD 2 -> **Error**

احنا نقدر نـRedirect التلات حاجات دي ازاي ؟

في Command مثلا
```bash
Command < xyz
```

كدا انا عملت redirect ل xyz لل Command دا (input)

لو عايز اعمل Redirect ل output للكومند بتاعي
```bash
Command > file
```

لو ا redirect ال error ؟
```bash
command 2 > file
```

لو ه redirect ال input , error ؟ 
```bash
command 2 > & 1
```

مثال مثلا
```bash
echo "The current time is $(date) and we are in round $DEPI" > PROF
```

هنا هو هيحط ال Output في ملف اسمه PROF ولو الملف دا مش موجود ؟
هيكريته وهيحط فيه ال Output ولو عملنا Cat هتلاقي الاوتبوت فيه

```bash
echo "The current time is $(date) and we are in round $DEPI" > PROF
cat PROF
The current time is Thu Jul 30 05:16:22 and we are in round r5
```

نعمل مثال لل Error 
```bash
cp depi/ xyz/
cp: -r not specified: ommiting directory 'depi/'

cp depi/ xyz/ 2 > PROF2

cat PROF2
cp: -r not specified: ommiting directory 'depi/'
```

لو عملنا Double Redirection هيحط في الملف كل حاجه انت ممكن تعملها ولو مثلا 
```bash
echo "The current time is $(date) and we are in round $DEPI" >> PROF
echo "The current time is $(date) and we are in round $DEPI" >> PROF
echo "The current time is $(date) and we are in round $DEPI" >> PROF
echo "The current time is $(date) and we are in round $DEPI" >> PROF
echo "The current time is $(date) and we are in round $DEPI" >> PROF
cat PROF
The current time is Thu Jul 30 05:16:22 and we are in round r5
The current time is Thu Jul 30 05:16:22 and we are in round r5
The current time is Thu Jul 30 05:16:22 and we are in round r5
The current time is Thu Jul 30 05:16:22 and we are in round r5
The current time is Thu Jul 30 05:16:22 and we are in round r5
```

لكن لو redirection واحدة فهو هيعمل override ع الي موجود وهيخلي اخر حاجه اتعملها redirection

 العلامة دي | بتاخد الاوتبوت بتاع اول كومند وبتدخله كإنبوت للكومند الي بعدها
 
![[Pasted image 20260801120812.png]]

دا لو حاجه معتمدة ع التانية تستخدمها

## Editing Tool VI

- Modes
	- Command Mode - While Opening `vi file_name`
		- Deleteing , inserting, anything in file
			- dd -> delete line
			- hold d -> delete all
			- $ -> last line
			- 0 -> first line
			- u -> undo
			- /x -> search for x
	- Editing Mode
		- when pressing i in command mode
			- write what you want
				- I -> first line
				- A -> Last line
				- ESC -> Return to command mode
				- :wq -> save and quit
				- :q! -> don't save and quit

Most 3 Important File
- /etc/passwd
	- دا الفايل الي موجود فيه كل ال users الي على السيستم

![[Pasted image 20260801125431.png]]

- ال userID بينقسم ل 3
	- Super User -> 0
	- System User -> 1: 999
	- Normal User 1000 

- /etc/group
![[Pasted image 20260801125956.png]]

- /etc/shadow
- مسؤول عن ال password information

![[Pasted image 20260802175308.png]]


| Command                         | Meaning                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| useradd                         | Adding User                                                                 |
| useradd -c "Comment" username   | to Create a User with a Message/Comment and username                        |
| groupadd group_name             | adding group                                                                |
| useradd -g group_name user_name | adding/create and adding user to specific group as Primary Groups           |
| useradd -g group_name user_name | adding/create and adding user to specific group as     Supplementary Groups |
| useradd -a username             | append user to the supplemental groups                                      |
| userdel user_name               | delete a exsiting user                                                      |
| history                         | view all history                                                            |
| passwod username                | change password of specific user                                            |
| su username                     | to switch to specific user                                                  |
|                                 |                                                                             |
-  الـDefault بتاع ال Creation
- الShell : هيستخدم ال Bash
- ال Home Dire : هيكون ف /home/username
- الuser_id: هيكريت على حسب اليوزر نيم المتاح عنده فوق ال 1000

- الـPrimary Group: بتكون مجموعة اساسية وموجودة قبل كدا
- الSupp Group: دي جروبات بتضيفها ع الجروب الاساسية وممكن يستخدموا مع بعض

```bash
useradd -g developers -G sudo, docker ahmed
```

ساعتها هيكون 
- Primary Group: developers
- Supplementary Groups: sudo, docker

 
- CTRL+R
علشان تبحث في التيرمنال في الHistory بتاعك 
ولو جبت الي انت عايزه لكن خلاك في اخر الCommand وعايز تبقى ف أوله ؟
- CTRL+A للأول
- CTRL+E للأخر

- الHistory: يجيبلك الهيستوري بتاعك، كل الكومندس الي انت كتبتها

---

# Ownership and Permissions

- Ownership
	- User
	- Group(Primary Group)
	- Other
- Permissions
	- r : can read the dir
	- w : can write on directory (create a file etc..)
	- x : can execute
![[Pasted image 20260802224845.png]]

هنا هتلاقي في
- الـUser Permission: هنا اليوزر يقدر يقرأ ويكتب في الدايركتوري rw
- اما في ال Group و ال Other : فهما اخرهم يعملوا Read

علشان تغير ال Ownership بتاع ال file عندنا 2 Command


| Command                            | Meaning                                                     |
| ---------------------------------- | ----------------------------------------------------------- |
| `chown user_name file_name`        | change ownership of file to another user                    |
| `chown :group_name file`           | Change ownership of the file to another group               |
| `chown user_name :group_name file` | Change ownership of the file to another group and user_name |
| chgrp group_name file_name         | Change ownership of the file to another group               |

علشان نغير ال Permission ؟ عندك طريقتين

- chmod 
	- لو numerical way
		- r = 4
		- w = 2
		- x = 1

![[Pasted image 20260802231416.png]]
مثلا
```bash
chmod 7 6 1 test
```

- User can read and write and execute
- Group can read and write
- Other can only execute

`rwxrw-x--`  file will show like this

- لو alphaptic مثلا 
```bash
chmod u+r
```

زود على ال user انه يـread

- نقدر نستخدم Option -R مع الاتنين chmod , chown 
	- يعني ايه -R ؟
		- الـ`-R` معناها **Recursive** (بشكل تكراري): يعني الأمر مش هيطبق على الملف الحالي بس، هيطبق على **كل الملفات والمجلدات اللي جواه**.
