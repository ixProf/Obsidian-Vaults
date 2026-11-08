---
title: "DEPI - Assignment 1 - DevOps"
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

1. هنفتح ملف `/etc/passwd`:
    

```bash
sudo vipw
```

2. هنضيف السطر دا مثلا التالي:
    

```text
testroot:x:0:0:Test Root:/home/testroot:/bin/bash
```

3. هنعمل دايركتوري ال home ونساين البيرمشن:
    

```bash
sudo mkdir /home/testroot
sudo chown 0:0 /home/testroot
```

4. نعمل باسورد لليوزر الجديد
    

```bash
sudo passwd testroot
```

5. هنجرب نلوج إن كدا
    

```bash
su - testroot
```

ونجرب نتست ال id 

```bash
id
```

هيطلعلنا كدا

```text
uid=0(testroot) gid=0(root) groups=0(root)
```

هنلاقي أن اليوزر الجديد الي هو دا **`testroot`** معاه كل البيرمشن بتاعت ال `root` لأن الكيرنال بتاع لينكس بيعتمد على **UID** مش على ال user name. 
