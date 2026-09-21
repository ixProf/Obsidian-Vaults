
# Images Commands



- الـ`docker images` : بتعرضلك كل الـ **Images** الموجودة على الجهاز.
    
- الـ`docker rmi` : بتمسح **Image معينة**.  
    مثال:  
    `docker rmi nginx`
    
- الـ`docker search` : بتبحث عن **Image** على Docker Hub.  
    مثال:  
    `docker search nginx`
    
- الـ`docker history` : بتعرضلك الـ **History والـ Layers** الخاصة بالـ Image.  
    مثال:  
    `docker history nginx`
    
- الـ`docker tag` : بتضيف **Tag جديد** للـ Image أو بتعمل اسم/نسخة جديدة تشير لنفس الـ Image.  
    مثال:  
    `docker tag nginx:latest mynginx:v1`
    
- الـ`docker commit` : بتعمل **Image جديدة من Container موجود** بعد التعديلات اللي حصلت جواه.  
    يعني لو شغلت Container وعدلت فيه، تقدر تحفظ حالته الحالية كـ Image جديدة.  
    مثال:  
    `docker commit container_name myimage:v1`
    
    **ملحوظة:** الـ Container بيكون له Writable Layer فوق الـ Read-only Layers بتاعة الـ Image، و`commit` بيحفظ التغييرات دي داخل Image جديدة.
    
- الـ`docker save` : بيحفظ الـ **Image في ملف** تقدر تنقله لجهاز تاني أو تحتفظ بيه كـ Backup، غالبًا بصيغة `.tar`.  
    مثال:  
    `docker save -o nginx.tar nginx:latest`
    
- الـ`docker load` : بيعمل **Load/Image Import** من ملف تم إنشاؤه باستخدام `docker save`.  
    مثال:  
    `docker load -i nginx.tar`


## الـImage BackUp

### 1.نتأكد إن ال image موجودة

```bash
docker images
```

مثلاً عندنا:

```text
REPOSITORY   TAG       IMAGE ID
nginx        latest    abc123
```

---

### 2. نعمل Backup للImage

```bash
docker save -o nginx-backup.tar nginx:latest
```

المعنى:

- الـ`docker save` → حفظ الـ Image.
    
- الـ`o nginx-backup.tar-` → اسم ملف الـ Backup.
    
- الـ`nginx:latest` → الـ Image اللي عايزين نحفظها.
    

نتأكد إن الملف اتعمل:

```bash
ls -lh nginx-backup.tar
```

هيظهر عندك ملف:

```text
nginx-backup.tar
```

---

### 3. نفترض إن الـ Image اتمسحت

```bash
docker rmi nginx:latest
```

ونتأكد:

```bash
docker images
```

مش هتلاقي `nginx` موجودة.

---

### 4. نرجع الـ Image من الـ Backup

```bash
docker load -i nginx-backup.tar
```

المعنى:

- `docker load` → استرجاع الـ Image.
    
- `-i` → تحديد ملف الـ Input.
    
- `nginx-backup.tar` → ملف الـ Backup.
    

---

### 5. نتأكد إنها رجعت

```bash
docker images
```

هتلاقي:

```text
REPOSITORY   TAG       IMAGE ID
nginx        latest    abc123
```

### الـ Flow بالكامل

```text
1.nginx:latest
2.docker save
3.nginx-backup.tar
4.docker rmi nginx:latest
5.Image deleted
6.docker load -i nginx-backup.tar
7.nginx:latest restored
```

**الأوامر وراء بعض:**

```bash
docker pull nginx:latest
docker save -o nginx-backup.tar nginx:latest
docker rmi nginx:latest
docker load -i nginx-backup.tar
docker images
```


---

# Container Commands

- الـ`docker start` : بيشغل **Container متوقف**.  
    مثال:  
    `docker start webapp`
    
- الـ`docker stop` : بيوقف **Container شغال**.  
    مثال:  
    `docker stop webapp`
    
- الـ`docker restart` : بيعمل **Restart للـ Container**، يعني يوقفه ويشغله تاني.  
    مثال:  
    `docker restart webapp`
    

- الـ`docker run` : بيعمل **Create + Start** لـ Container جديد من Image.
    
    مثال:  
    `docker run nginx`
    
    ولو عايز تسميه:  
    `docker run --name webapp nginx`


- الـ`docker ps` : بيعرضلك كل الـ **Containers اللي شغالة حاليًا** فقط.
    
    مثال:  
    `docker ps`
    

- الـ`docker ps -a` : بيعرضلك **كل الـ Containers** سواء شغالة أو متوقفة.
    
    مثال:  
    `docker ps -a`
    

- الـ`docker logs` : بيعرضلك الـ **Logs أو الـ Output** الخاص بالـ Container، وده مفيد جدًا لمعرفة الأخطاء أو متابعة اللي بيحصل جواه.
    
    مثال:  
    `docker logs webapp`
    
    ولو عايز تتابع الـ Logs بشكل مباشر:  
    `docker logs -f webapp`
    


---
## docker run options
أولًا: يعني إيه `docker run`؟

الأمر الأساسي:

```bash
docker run IMAGE
```

مثال:

```bash
docker run nginx
```

لما تكتب الأمر ده Docker بيعمل حاجتين:

1. **ينشئ Container جديد** من الـ Image.
    
2. **يشغل الـ Container**.
    

ولو الـ Image مش موجودة عندك محليًا، Docker غالبًا هيعمل:

![[Pasted image 20260817123104.png]]
يعني `docker run` تقريبًا:

```text
docker pull   → لو الـ Image مش موجودة
docker create
docker start
```

---

### 1. تشغيل Container بشكل عادي

```bash
docker run nginx
```

هنا Docker هيشغل الـ Nginx في ==الـ **Foreground**.==

يعني الـ Terminal بتاعك هيفضل متعلق بالـ Container.

مثلاً:

```text
Terminal
    │
    ▼
docker run nginx
    │
    ▼
Container Running
    │
    ▼
Terminal attached to Container
```

لو ضغطت:

```bash
CTRL + C
```

غالبًا هتبعت إشارة للـ Process الأساسي والـ Container ممكن يقف.

---

### 2. تشغيل الـ Container في الخلفية `-d`

واحدة من أهم الـ Options:

```bash
docker run -d nginx
```

أو:

```bash
docker run --detach nginx
```

`-d` معناها **Detached Mode**.

يعني الـ Container يشتغل ==في الخلفية ويرجعلك الـ Terminal فورًا.==

مثال:

```bash
docker run -d nginx
```

هيظهرلك Container ID:

```text
a8f3d2c...
```


دلوقتي تقدر تستخدم الـ Terminal عادي.

وتشوف الـ Containers الشغالة:

```bash
docker ps
```

#### الفرق بين Foreground و Detached Mode

#### بدون `-d`

```bash
docker run nginx
```
![[Pasted image 20260817124025.png]]
#### مع `-d`

```bash
docker run -d nginx
```
![[Pasted image 20260817130514.png]]

---

### 3. تسمية الـ Container باستخدام `--name`

لو كتبت:

```bash
docker run nginx
```

Docker هيدي للـ Container اسم تلقائي عشوائي مثل:

```text
happy_morse
```

وده مش عملي.

الأفضل تسميه بنفسك:

```bash
docker run --name webserver nginx
```

دلوقتي تقدر تستخدم الاسم بدل الـ Container ID.

مثلاً:

```bash
docker stop webserver
```

```bash
docker start webserver
```

```bash
docker logs webserver
```

مثال عملي أفضل:

```bash
docker run -d --name webserver nginx
```

المعنى:

```text
-d              → شغله في الخلفية
--name webserver → سمي الـ Container webserver
nginx           → استخدم Image اسمها nginx
```

---

### 4. الـ Port Mapping باستخدام `-p`

دي من أهم الحاجات.

مثلاً شغلت:

```bash
docker run -d nginx
```

الـ Nginx شغال **داخل الـ Container** على Port:

```text
80
```

لكن ده لا يعني تلقائيًا إنك تقدر تدخل من الـ Browser على:

```text
localhost:80
```

لازم تعمل **Port Mapping** بين جهازك والـ Container.

الصيغة:

```bash
docker run -p 'HOST_PORT':'CONTAINER_PORT' IMAGE
```

مثال:

```bash
docker run -d -p 8080:80 nginx
```

المعنى:

![[Pasted image 20260817133841.png]]

يعني لما تفتح:

```text
http://localhost:8080
```

الطلب هيروح إلى:

```text
Container Port 80
```

#### نفهمها كده:

```bash
-p 8080:80
```

أول رقم:

```text
8080
```

ده Port على **الجهاز بتاعك Host**.

ثاني رقم:

```text
80
```

ده Port داخل الـ **Container**.

#### مثال آخر

```bash
docker run -d -p 5000:80 nginx
```

```text
localhost:5000
       │
       ▼
Host Port 5000
       │
       ▼
Container Port 80
       │
       ▼
Nginx
```

==مش لازم الاتنين يكونوا نفس الرقم.==

ممكن:

```bash
-p 8080:80
```

أو:

```bash
-p 5000:80
```

أو حتى:

```bash
-p 80:80
```

لكن لازم الـ Host Port ما يكونش مستخدم بالفعل.

---

### 5. نشر أكثر من Port

ممكن تعمل أكتر من Port Mapping:

```bash
docker run -d \
-p 8080:80 \
-p 8443:443 \
nginx
```

يعني:

```text
Host 8080 → Container 80
Host 8443 → Container 443
```

---

### 6. استخدام `-P` بدل `-p`

في فرق مهم جدًا:

```bash
-P
```

Capital `P`.

مثلاً:

```bash
docker run -d -P nginx
```

الـDocker هيعمل Publish تلقائي للـ Ports اللي الـ Image معلنة عنها.

لكن Docker ممكن يختارلك Port عشوائي على الـ Host.

عشان تعرف اختار إيه:

```bash
docker ps
```

ممكن تشوف حاجة مثل:

```text
0.0.0.0:32768->80/tcp
```

يعني:

```text
Host Port 32768 → Container Port 80
```

عمليًا، لو أنت عايز تحدد الـ Port بنفسك، استخدم:

```bash
-p
```

مثال:

```bash
docker run -d -p 8080:80 nginx
```

---

### 7. تشغيل الـ Container بشكل Interactive باستخدام `-it`

دي مهمة جدًا لما تشغل Linux Container وعايز تدخل جواه.

مثلاً:

```bash
docker run -it ubuntu bash
```

هنا عندنا:

```text
-i = Interactive
-t = Allocate TTY
```

مع بعض:

```bash
-it
```

بتخليك تقدر تتعامل مع الـ Container كأنك فاتح Terminal جواه.

مثال:

```bash
docker run -it ubuntu bash
```

هتلاقي نفسك داخل الـ Container:

```text
root@abc123:/#
```

دلوقتي تقدر تعمل:

```bash
ls
```

```bash
pwd
```

```bash
apt update
```

ولما تعمل:

```bash
exit
```

هتخرج.

ولو الـ Process الأساسي هو `bash`، خروجه غالبًا هيوقف الـ Container.

---

### 8. الفرق بين `-i` و `-t`

### `-i`

بتخلي الـ Standard Input مفتوح عشان تقدر تبعت Input للـ Container.

### `-t`

بتعمل Terminal افتراضي TTY.

عشان كده غالبًا بنستخدمهم مع بعض:

```bash
-it
```

مثال مشهور:

```bash
docker run -it ubuntu bash
```

وده غير:

```bash
docker run -d nginx
```

لأن Nginx Service مش محتاج منك تدخل وتتفاعل معاه يدويًا، فغالبًا بنستخدم:

```bash
-d
```

---

### 9. تشغيل الـ Container وحذفه تلقائيًا باستخدام `--rm`

مثلاً:

```bash
docker run --rm ubuntu echo "Hello Docker"
```

هيحصل الآتي:

```text
1. Create Container
2. Start
3. Execute Command
4. Command Finishes
5. Container Stops
6. Docker Deletes Container Automatically
```

لو شغلت:

```bash
docker ps -a
```

مش هتلاقي الـ Container.

وده مفيد جدًا في الـ Containers المؤقتة.

مثلاً:

```bash
docker run --rm ubuntu ls
```

أو:

```bash
docker run --rm python python --version
```

---

### 10. تنفيذ Command داخل الـ Container عند تشغيله

بص للصيغة:

```bash
docker run IMAGE COMMAND
```

مثال:

```bash
docker run ubuntu ls
```

هنا Docker:

1. ينشئ Container من Ubuntu.
    
2. يشغله.
    
3. ينفذ:
    

```bash
ls
```

4. لما الأمر ينتهي، الـ Container هيقف.
    

مثال:

```bash
docker run ubuntu echo "Hello"
```

الناتج:

```text
Hello
```

الـ Container بعد كده هيكون:

```text
Exited
```

لأن الـ Main Process انتهى.

ودي نقطة مهمة جدًا:

> **الـ Container بيعيش طالما الـ Main Process بتاعه شغال.**

مثال:

```bash
docker run ubuntu echo "Hello"
```

`echo` خلص → Container وقف.

لكن:

```bash
docker run -d nginx
```

الـ Nginx Process شغال → Container شغال.

---

## Some Containers Commands
### 1. `docker inspect`

الأمر:

```bash
docker inspect CONTAINER_OR_IMAGE
```

ده بيعرض **معلومات تفصيلية جدًا** عن الـ Container أو الـ Image بصيغة **JSON**.

مثال:

```bash
docker inspect webserver
```

ممكن تعرف منه معلومات زي:

- الـ Container ID
- الـ Image المستخدمة
- الـ IP Address
- الـ Environment Variables
- الـ Ports
- الـ Volumes / Mounts
- الـ Network
- حالة الـ Container
- وقت الإنشاء والتشغيل
- الـ Restart Policy
    

مثال:

```bash
docker inspect webserver
```

هيطلع Output كبير شبه:

```json
[
  {
    "Id": "abc123...",
    "Name": "/webserver",
    "State": {
      "Status": "running"
    },
    "Config": {
      "Image": "nginx"
    }
  }
]
```

#### مثال مهم جدًا: معرفة IP الـ Container

```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' webserver
```

هنا استخدمنا:

```bash
-f
```

علشان نفلتر الـ Output بدل ما نشوف الـ JSON كله.

---

### 2. `docker events`

الأمر:

```bash
docker events
```

ده بيعرضلك **الأحداث Events اللي بتحصل في Docker بشكل Live**.

مثلاً افتح Terminal واكتب:

```bash
docker events
```

وسيبه شغال.

في Terminal تاني نفذ:

```bash
docker run --name test nginx
```

ممكن تشوف Events زي:

```text
container create
container start
```

ولو عملت:

```bash
docker stop test
```

هتشوف:

```text
container stop
```

ولو مسحته:

```bash
docker rm test
```

هتشوف:

```text
container destroy
```

يعني `docker events` زي **مراقب مباشر لكل اللي بيحصل في Docker**.

### تقدر تحدد الأحداث الخاصة بالـ Container فقط:

```bash
docker events --filter type=container
```

أو تحدد Event معين:

```bash
docker events --filter event=start
```

---

### 3. `docker port`

الأمر:
```bash
docker port CONTAINER
```

ده بيعرضلك الـ **Port Mapping** الخاصة بالـ Container.

مثلاً عندك:

```bash
docker run -d --name webserver -p 8080:80 nginx
```
هنا عملنا:

```text
Host Port 8080 → Container Port 80
```
لو كتبت:

```bash
docker port webserver
```
ممكن يطلع:

```text
80/tcp -> 0.0.0.0:8080
```
يعني:
```text
Container
Port 80
   │
   ▼
Host
Port 8080
```

وتقدر تسأل عن Port معين:
```bash
docker port webserver 80
```

---

### 4. `docker top`

الأمر:
```bash
docker top CONTAINER
```

ده بيعرضلك الـ **Processes الشغالة داخل Container معين**.

مثلاً:
```bash
docker top webserver
```
ممكن يطلع:

```text
UID      PID      PPID     C     STIME    TTY     TIME      CMD
root     1234     1200     0     10:30    ?       00:00:00 nginx
system   1300     1234     0     10:30    ?       00:00:00 nginx
```

يعني تقدر تعرف:

- مين الـ Processes الشغالة.
- الـ PID.
- الـ Parent Process.
- الأمر اللي شغال.

فكر فيها كأنك بتعمل:

```bash
ps
```
لكن على الـ Container من الـ Host.

---

### 5. `docker stats`

الأمر:

```bash
docker stats
```

ده بيعرضلك **استهلاك الـ Resources بشكل Live**.

يعني يراقب الـ Containers ويعرض:

- CPU Usage
- Memory Usage
- Memory Limit
- Network I/O
- Block I/O
- PIDs
    

مثلاً:

```bash
docker stats
```

ممكن تشوف:

```text
CONTAINER ID   NAME        CPU %    MEM USAGE / LIMIT
abc123         webserver   0.15%    20MiB / 4GiB
```

لو عايز تراقب Container واحد فقط:

```bash
docker stats webserver
```

### لو عايز تشوف النتيجة مرة واحدة فقط:

```bash
docker stats --no-stream
```

بدل ما يفضل Live.

---
### 6. `docker diff`

الأمر:

```bash
docker diff CONTAINER
```

ده بيعرضلك **التغييرات اللي حصلت في الـ Filesystem بتاع الـ Container مقارنةً بالـ Image الأصلية**.

مثلاً:
```bash
docker run -it --name test ubuntu bash
```
دخلت جوه وعملت:

```bash
touch /test.txt
```
وعدلت ملف موجود مثلًا.

بعد ما تخرج، نفذ:

```bash
docker diff test
```
ممكن تشوف:

```text
A /test.txt
```

الحروف المهمة:

### `A`

```text
A = Added
```
يعني File أو Directory جديد اتضاف.

### `C`

```text
C = Changed
```
يعني File أو Directory حصل فيه تعديل.

### `D`
```text
D = Deleted
```
يعني File أو Directory اتمسح.

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

وده مفيد جدًا عشان تعرف:

> **إيه اللي اتغير جوه الـ Container عن الـ Image الأصلية؟**

---

# For Recap 

![[Pasted image 20260817144410.png]]
## أولاً: جزء الـ Image

**فيه خط تاني بيفصل بين external و local:**

- **External**: الـ Registries (اللي بره جهازك) — Public registry (زي Docker Hub)، Red Hat Container Catalog، Private registry
- **Local**: الـ storage اللي على جهازك أنت

**الحركة بين الاتنين:**

- الـ**pull**: تسحب image من الـ registry لجهازك  (node local)
- الـ**push**: ترفع الـ image من جهازك للـ registry

**جوه node local (local storage) فيه ٣ حالات للـ image:**

1. الـ**local storage**: الـ image متخزن جاهز للاستخدام
2. الـ**.TAR file**: ملف مضغوط
3. الـ**deleted**: اتمسح

**الأوامر اللي بتنقل بين الحالات دي:**

- الـ**save**: تحول الـ image لملف `.tar`
- الـ**load**: ترجع الـ `.tar` تاني لـ local storage
- الـ**rmi**: تمسح الـ image (remove image)
- الـ**run**: تاخد الـ image وتشغل منها **container** (وده اللي بيوصلك للجزء التاني)
- الـ**commit**: العكس — تاخد container شغال وتحوله لـ image جديد
- الـ**create / export**: بتربط بين local storage وبين حالة الـ container

## ثانياً: جزء الـ Container

الـ container عنده ٣ حالات رئيسية:

1. **running**: شغال
2. **paused**: متوقف مؤقت (لكن لسه في الذاكرة)
3. **stopped**: واقف تمام

**الانتقالات بين الحالات:**

- الـ**run**: من الـ image → running مباشرة
- الـ**start**: من stopped → running
- الـ**pause / unpause**: بين running و paused
- الـ**kill / stop**: من ال running لل stopped
- الـ**restart**: تعيد تشغيل الـ container وهو لسه running (دورة صغيرة)
- الـ**exec**: تدخل جوه container شغال بالـ terminal (زي `docker exec`)

**لما الـ container يقف من نفسه (exited or oom killed):**

- بيتسأل سؤال: **restart policy?**
    - لو **yes** → يرجع تاني لحالة **running**
    - لو **no** → يفضل في حالة **stopped**

**وأخيراً:**

- الـ**rm**: تمسح container وهو **stopped** → يروح لحالة **deleted**
- الـ**rm -f**: تمسح container حتى لو **running** (force remove) → يروح مباشرة لـ **deleted**

---

# Docker File
### الفكرة الأساسية

الـ**Dockerfile** هو ملف نصي (script) فيه مجموعة تعليمات (instructions)، وكل تعليمة بتوصف خطوة معينة عشان تبني منها **image** مخصص (customized).

يعني بدل ما تعمل image يدوي وتنصب عليه حاجات واحدة واحدة، بتكتب كل الخطوات دي في ملف واحد اسمه `Dockerfile`، وDocker بيقرأه وينفذه تلقائي عشان يطلعلك الـ image.

### كل instruction = طبقة (Layer) جديدة

 **كل سطر (instruction) في الـ Dockerfile بيعمل layer جديد فوق بعضه** جوه الـ image.

يعني لو عندك مثلاً:

```dockerfile
FROM ubuntu
RUN apt-get install python
COPY app.py /app
```

كل سطر من دول (`FROM`, `RUN`, `COPY`) بيضيف **طبقة (layer)** فوق اللي قبلها، والـ image النهائي هو كل الطبقات دي محطوطة فوق بعض (stacked).

**الفايدة من كده:** لو غيرت سطر واحد بس، Docker مش بيعيد بناء كل الـ layers من الأول — بيعيد بناء اللي اتغير بس، وده بيوفر وقت ومساحة ==(caching).==

#### إيه اللي بيتكتب في الـ Dockerfile عادة؟

زي ما موضح تحت:

- **تسطيب الـ dependencies** (زي المكتبات أو البرامج اللي التطبيق محتاجها)
- **نسخ الملفات من جهازك جوه الـ image
- **ضبط الـ environment variables**
- **إعداد الـ container** نفسه 
![[Pasted image 20260818110840.png]]


## Dockerfile basics

```dockerfile
# Sets the base image for subsequent instructions, you should write this command at least in Dockerfile 
FROM 

# execute any commands in a new layer on top of the current image and commit the result. (Used mainly for installing packages)
RUN

# Provide defaults for executing command inside a container
CMD

# informs Docker that container listens on the specified network ports at run time
EXPOSE

# sets environment variable
ENV

# Copies new files or directories to container
COPY

# Lets you do that too, but it also supports 2 other sources.
# First, you can use a URL instade of a local file / directory. 
# Secondly, you can extract a tar file from the source directly into the destination
ADD

# Configures a container that will run as an executable = CMD
ENTRYPOINT

# Creates a mount point for externally mounted volumes or othe containers
VOLUME

# sets the user name for following RUN/CMD/ENTRYPOINT commands, by default it run commands as a root
USER

# sets the working directorym by default it run commands in home directory /home
WORKDIR

# Defines a build-time variable
ARG
```

### 1. `FROM`

بيحدد **الـ image الأساسي** (base image) اللي هتبني عليه الـ image بتاعك.

```dockerfile
FROM ubuntu:22.04
```

- **لازم** تكتب `FROM` مرة على الأقل في أي Dockerfile — من غيرها Docker مش هيعرف يبدأ منين.
- ممكن تختار base image لغة برمجة جاهزة زي `python:3.11` أو `node:18`، أو نظام تشغيل نضيف زي `ubuntu` أو `alpine`.

### 2. `RUN`

بينفذ أي **أمر (command)** جوه الـ image وقت الـ **build**، وبيعمل layer جديد فوق اللي قبله ويحفظ (commit) النتيجة.

```dockerfile
RUN apt-get update && apt-get install -y python3
```

- بيتستخدم غالباً عشان **تنصب حاجات** (packages, dependencies).
- بيتنفذ **مرة واحدة بس وقت بناء الـ image**، مش وقت تشغيل الـ container.
- كل `RUN` بيضيف layer جديد، فالأفضل تجمع أكتر من أمر في `RUN` واحد بـ `&&` عشان تقلل عدد الـ layers.

### 3. `CMD`

بيحدد **الأمر الافتراضي (default command)** اللي هيتنفذ لما الـ **container يشتغل** (run)، مش وقت الـ build.

```dockerfile
CMD ["python3", "app.py"]
```

- بيتنفذ **مرة واحدة بس عند الـ `docker run`**.
- لو المستخدم كتب أمر تاني وقت الـ `run` (زي `docker run myimage bash`)، الأمر ده بيبقى **override** لـ `CMD`.
- ممكن يكون في `CMD` واحد بس في الـ Dockerfile — لو كتبت أكتر من واحد، آخر واحد بس هو اللي هيشتغل.

### 4. `EXPOSE`

بيقول لـ Docker إن الـ **container هيـListen** على **port** معين وقت التشغيل.

```dockerfile
EXPOSE 80
```

- ده بسdocumentation — مش بيعمل فتح فعلي للـ port للعالم الخارجي.
- عشان فعلياً تربط الـ port ده بجهازك، لازم تستخدم `-p` وقت الـ `docker run`:
 
```bash
    docker run -p 8080:80 myimage
```
- بس بيفيد جداً كتوضيح لأي حد بيستخدم الـ image إنه يعرف إيه الـ port المفروض يستخدمه.

### 5. `ENV`

بيحدد **environment variable** جوه الـ image، وبيفضل موجود طول عمر الـ container.

```dockerfile
ENV APP_HOME=/app
ENV NODE_ENV=production
```

- المتغيرات دي بتبقى متاحة **وقت الـ build** (للـ instructions اللي بعدها زي `RUN`) **وكمان وقت الـ runtime** (جوه الـ container نفسه).
- ممكن تستخدمها في أوامر تانية:
    
    ```dockerfile
    ENV APP_HOME=/appWORKDIR $APP_HOME
    ```
    
- مفيدة جداً لضبط إعدادات زي `PATH`, ports افتراضية, أو أي config بيحتاجه التطبيق.

### 6. `COPY`

بينسخ **ملفات أو مجلدات من جهازك (local machine)** إلى جوه الـ container/image.

```dockerfile
# Source (not in container)
COPY app.py /app/app.py 
# Destination (in the container)
COPY ./src /app/src

```

- المصدر (source) لازم يكون **موجود على جهازك محلياً** — مش من الإنترنت.
- بسيط وواضح، وده اللي بيخليه الأفضل والأكتر استخداماً في أغلب الحالات (best practice).

### 7. `ADD`

بيعمل **نفس اللي بيعمله `COPY`**، لكنه بيدعم مصدرين إضافيين:

```dockerfile
# 1. From URL Directly
ADD https://example.com/file.tar.gz /app/

# 2. Auto-Extract tar file and store it in dir
ADD archive.tar.gz /app/
```

**الفرق عن `COPY`:**

1. الـ**URL كمصدر**: تقدر تحط رابط بدل ما الملف يكون عندك محلياً، وDocker هيحمله تلقائي.
2. **فك ضغط تلقائي (auto-extract)**: لو الملف المصدر كان `tar` (زي `.tar`, `.tar.gz`, إلخ)، `ADD` هيفكه تلقائياً في الـ destination — من غير ما تحتاج تعمل `RUN tar -xzf` بنفسك.

### ملاحظة مهمة (Best Practice)

مع إن `ADD` عنده مميزات زيادة، الـ **best practice** المتعارف عليها إنك تستخدم `COPY` في أغلب الحالات، وما تستخدمش `ADD` إلا لما فعلاً محتاج ميزة الـ URL أو الـ auto-extract. السبب:

- `ADD` سلوكه أحياناً غير متوقع (زي إنه ممكن يفك أي ملف مضغوط تلقائي حتى لو مكنتش قاصد كده)
- `COPY` أوضح وأسهل تتوقع نتيجته بالظبط

### 8. `ENTRYPOINT`

بيحدد **الأمر الرئيسي الثابت** اللي الـ container هيشتغل بيه كأنه "executable"  يعني الـ container بيبقى شكله زي إنه برنامج بيتنفذ.

```dockerfile
ENTRYPOINT ["python3", "app.py"]
```

**الفرق عن `CMD`:**

- الـ`CMD` سهل الـ **override** بالكامل لو المستخدم كتب أمر تاني وقت `docker run`.
- الـ`ENTRYPOINT` **ثابت** ومش بيتلغي بسهولة، أي حاجة تكتبها وقت `docker run` بتتضاف كـ **arguments** له، مش بتستبدله.

**غالباً بيتستخدموا مع بعض:**

```dockerfile
ENTRYPOINT ["python3"]
CMD ["app.py"]
```

هنا `python3` ثابت مش هيتغير، لكن `app.py` (اللي هو الـ default argument) ممكن تغيره وقت التشغيل:

```bash
docker run myimage other_script.py
```

### 9. `VOLUME`

بيعمل **mount point** جوه الـ container، عشان تربط بيها تخزين خارجي (من جهازك أو من container تاني) بدل ما البيانات تتخزن جوه الـ container نفسه.

```dockerfile
VOLUME /app/data
```

- مفيد جداً للبيانات اللي المفروض **تفضل موجودة** حتى لو الـ container اتمسح (زي بيانات قاعدة بيانات).
- أي حاجة تتكتب في المسار ده جوه الـ container، فعلياً بتتخزن بره في الـ volume، مش في الـ container layer.

### 10. `USER`

بيحدد **اسم المستخدم (أو UID)** اللي هيشتغل بيه أي أوامر بعده (`RUN`, `CMD`, `ENTRYPOINT`).

```dockerfile
USER appuser
```

- **الافتراضي (default)**: لو ما كتبتش `USER`، كل الأوامر بتتنفذ كـ **root**.
- تشغيل الـ container بـ root مش آمن (security risk)، فمن الـ best practices إنك تعمل user جديد بصلاحيات محدودة وتحدده بـ `USER`:
    
    ```dockerfile
    RUN useradd -m appuser
    USER appuser
    ```
    

### 11. `WORKDIR`

بيحدد **الـ directory الحالي (working directory)** جوه الـ container، واللي أي أمر بعده (`RUN`, `CMD`, `COPY`, إلخ) هيتنفذ فيه.

```dockerfile
WORKDIR /app
```

- **الافتراضي**: لو ما حددتش `WORKDIR`، الأوامر بتتنفذ في `home/`
- بيفضل أحسن من إنك تكتب مسار كامل كل مرة في كل أمر.
- تقدر تستخدمه أكتر من مرة، وكل مرة بيغير الـ directory الحالي:
    
    ```dockerfile
    WORKDIR /appCOPY . .WORKDIR /app/srcRUN python3 setup.py
    ```
    

### 12. `ARG`

بيحدد **متغير وقت الـ build فقط** (build-time variable)، تقدر تمرره وقت عمل الـ `docker build`.

```dockerfile
ARG VERSION=1.0
RUN echo "Building version $VERSION"
```

وقت الـ build:

```bash
docker build --build-arg VERSION=2.0 -t myimage .
```

---

## Best Practice 

- وانت بتختار ال base image اختار اصغر حاجه فالحجم مثلا عندك `alpine`

- بدل ما تعمل اكتر من run تحت بعض وتكتر في ال layers بتاعت ال image بتاعتك ممكن تختصرهم بال &&
من كدا 

```dockerfile
FROM alpine:latest
RUN apk add --update --no-cache python3
RUN ln -sf python3 /usr/bin/python
RUN addgroup -S appgroup
RUN adduser -S appuser -G appgroup
WORKDIR /app
USER appuser
COPY app.py .
ENTRYPOINT ["python", "app.py"]
```

عدد ال Layers كدا

![[Pasted image 20260818140518.png]]

لكدا :

```dockerfile
FROM alpine:latest
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python && addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
USER appuser
COPY app.py .
ENTRYPOINT ["python", "app.py"]
```

### ملخص: ENTRYPOINT vs CMD

#### الفرق الجوهري

|                                   | `CMD`                   | `ENTRYPOINT`                          |
| --------------------------------- | ----------------------- | ------------------------------------- |
| الطبيعة                           | أمر افتراضي (default)   | أمر ثابت (fixed)                      |
| لما تكتب أمر في `docker run`      | بيستبدل الـ CMD بالكامل | بيتضاف كـ argument بعد الـ ENTRYPOINT |
| بيتحدد بيه "شخصية" الـ container؟ | لا                      | ايوه                                  |

#### مثال يوضح الفرق

```dockerfile

CMD ["python", "app.py"]
```

```bash
docker run myimage bash
```
 النتيجة: bash فقط (الـ CMD اتلغى بالكامل)

```dockerfile

ENTRYPOINT ["python", "app.py"]
```

```bash
docker run myimage bash
```

 النتيجة: python app.py bash (bash بقى argument زيادة، والكود اتنفذ برضو)
 
#### ليه بنفضل ENTRYPOINT؟

**1. الـ Container بيحافظ على "غرضه" الأساسي** لو الـ container غرضه إنه يشغل تطبيق Python معين، `ENTRYPOINT` بيضمن إن الأمر ده **دايماً هيتنفذ**، مهما المستخدم كتب بعده. المستخدم مش هيقدر "يلغي" السلوك الأساسي بالغلط.

**2. بيمنع الأخطاء غير المقصودة** لو حد كتب `docker run myimage --debug` وهو قاصد يمرر flag لتطبيقك، مع `CMD` هيحصل استبدال كامل وممكن الـ container يعمل حاجة غير متوقعة. مع `ENTRYPOINT`، الـ `--debug` هتتضاف كـ argument للتطبيق نفسه بشكل آمن ومتوقع.

**3. مرونة + ثبات مع بعض (الأفضل عملياً)** الاستخدام الأمثل إنك تجمعهم مع بعض:

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

- `python` **ثابت** ومش هيتغير أبداً
- `app.py` **قابل للتغيير** بسهولة لو حبيت تشغل ملف تاني:

```bash
docker run myimage         
docker run myimage test.py 
```

---

# Upload Docker File on Docker Hub

 خطوات رفع الـ Docker Image على Docker Hub

## 1. اعمل حساب على Docker Hub (لو مالكش حساب)

روح على [hub.docker.com](https://hub.docker.com/) واعمل تسجيل حساب جديد، واحفظ الـ **username** بتاعك كويس، هتحتاجه بعد شوية.

## 2. اعمل Login من الـ Terminal

```bash
docker login
```

هيطلبلك الـ username والـ password بتاع Docker Hub. لو نجح هيقولك:

```
Login Succeeded
```

## 3. اتأكد إن الـ Image موجود عندك محلياً

```bash
docker images
```

هتلاقي قايمة بكل الـ images الموجودة على جهازك، تأكد إن اللي عايز ترفعه موجود فيها.

## 4. اعمل Tag للـ Image بالصيغة الصح

Docker Hub بيطلب إن اسم الـ image يكون بالشكل ده:

```
username/repository-name:tag
```

```bash
docker tag my-python-app:latest username/my-python-app:v1
```

**مثال حقيقي:**

```bash
docker tag depi-python:v4 iprofx/depi-r5:py-app-v1
```

>  لازم يبدأ بنفس الـ username بتاعك على Docker Hub، وإلا الـ push هيفشل ويديك خطأ صلاحيات (permission denied).

## 5. ارفع الـ Image

```bash
docker push username/repository-name:tag
```

**مثال:**

```bash
docker push iprofx/depi-r5:py-app-v1
```

هتلاقي كل الـ layers بتاعت الـ image بتترفع واحدة واحدة، وممكن ياخد وقت حسب حجم الـ image وسرعة النت عندك.

## 6. تأكد إن الرفع نجح

روح على صفحة الـ repository بتاعتك على Docker Hub:

```
https://hub.docker.com/r/username/repository-name
```

هتلاقي الـ image ظاهر هناك بالـ tag اللي اخترته.

## 7. جرب تسحبه على جهاز تاني (اختياري، للتأكد)

```bash
docker pull username/repository-name:tag
docker run username/repository-name:tag
```

---

# Multi-Stage Builds

## المشكلة اللي بتحلها

لما بتبني تطبيق (خصوصاً بلغات زي Go, Java, Node.js, .NET) بتحتاج غالباً:

- أدوات بناء (compilers, build tools) عشان تعمل compile للكود
- الـ source code نفسه
- مكتبات كتير وقت البناء بس

لكن وقت **التشغيل الفعلي (runtime)**، مش محتاج كل الحاجات دي — محتاج بس **الملف النهائي الجاهز**.

**المشكلة:** لو كتبت كل حاجة في Dockerfile واحد عادي، كل أدوات البناء والمكتبات دي بتفضل **داخل الـ image النهائي**، وده بيخلي حجمه كبير جدا من غير داعي.

## الحل: Multi-Stage Build

بتقسم الـ Dockerfile لـ **مراحل (stages)** متعددة، كل مرحلة عندها `FROM` خاص بيها، وبتاخد بس **النتيجة النهائية** من مرحلة البناء وتحطها في image نضيف وخفيف.

## مثال عملي (.NET application)

```dockerfile
# Stage 1: Install dependencies and build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=builder /app/publish .
ENTRYPOINT ["dotnet", "MyApi.dll"]
```

## إزاي ده بيشتغل؟

**المرحلة الأولى (`builder`):**

- بتستخدم image كبير فيه .NET SDK كامل (compiler, MSBuild, NuGet) (`dotnet/sdk:8.0` حجمه ممكن يكون **800MB+**)
- بتعمل `dotnet publish` للتطبيق وتطلع الملفات الجاهزة في `/app/publish`

**المرحلة الثانية:**

- بتبدأ من image **أصغر بكتير** (`dotnet/aspnet:8.0` حجمه ~220MB، مخصص للتشغيل بس)
- بتستخدم `COPY --from=builder` عشان تاخد **الملفات الجاهزة بس** من المرحلة الأولى
- كل حاجة تانية من المرحلة الأولى (الـ SDK, source code, build tools) **بتتشال تماماً** ومش بتدخل الـ image النهائي خالص

## الفايدة الرئيسية: تقليل الحجم بشكل كبير

| |من غير Multi-stage|مع Multi-stage|
|---|---|---|
|Base image|`dotnet/sdk:8.0` (~800MB)|`dotnet/aspnet:8.0` (~220MB) + الملفات النهائية فقط|
|حجم الـ image النهائي|ممكن يوصل **900MB+**|ممكن يبقى **220-250MB بس**|

## مثال تاني (.NET مع restore منفصل لتحسين الـ caching)

```dockerfile
# Stage 1: تنصيب dependencies وعمل build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /src
COPY ["MyApi/MyApi.csproj", "MyApi/"]
RUN dotnet restore "MyApi/MyApi.csproj"
COPY . .
WORKDIR /src/MyApi
RUN dotnet publish -c Release -o /app/publish

# Stage 2: التشغيل
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=builder /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "MyApi.dll"]
```

## أهم حاجة تفهمها: `AS` و `--from`

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
```

كلمة `AS builder` دي بتديلك **اسم** للمرحلة دي عشان تقدر ترجع تشير لها بعدين.

```dockerfile
COPY --from=builder /app/publish .
```

الـ`--from=builder` معناها: "خد الملفات دي من المرحلة اللي سميتها `builder`"، مش من جهازك المحلي.

---

# Docker Volumes

## المشكلة اللي بتحلها

لو فاكر الصورة الأولى اللي شرحناها بتاعة دورة حياة الـ container، أي بيانات بتتكتب **جوه الـ container نفسه** بتفضل مرتبطة بيه بس. يعني لو الـ container اتمسح (`rm`) أو اتعمله rebuild:

```bash
docker rm my_container
```

**كل البيانات اللي جواه بتروح للأبد، البيانات دي كانت متخزنة في الـ **writable layer** بتاعة الـ container، واللي بتضيع تماماً بمجرد ما الـ container يتشال.

ده مشكلة كبيرة لو عندك مثلاً **database** شغالة جوه container، أو ملفات المستخدمين، أو أي بيانات مهمة عايزها **تفضل موجودة** حتى لو الـ container اتحدّث أو اتشال.

## الحل: Volumes

الـ **Volume** هو مساحة تخزين **بره الـ container**، بتديره Docker نفسه، وبتتوصل بالـ container عن طريق **mount**. البيانات فيها بتفضل موجودة **حتى لو الـ container اتمسح**.

![[Pasted image 20260819123154.png]]
## أنواع التخزين في Docker

فيه ٣ طرق أساسية تخزن بيها بيانات خارج الـ container:

| النوع                | فين بيتخزن                                           | مين بيديره    |
| -------------------- | ---------------------------------------------------- | ------------- |
| **Named Volumes**    | مكان بيديره Docker نفسه (`/var/lib/docker/volumes/`) | Docker        |
| **Bind Mounts**      | أي مكان تحدده إنت على الجهاز (host)                  | إنت بنفسك     |
| **anonymous Volume** | في الـ RAM (memory) بس، ==مؤقت==                     | Docker (وقتي) |
|                      |                                                      |               |

**الفرق الأهم بين Volume و Bind Mount:**

- **الـVolume**: ودا الdocker هو اللي بيتحكم في مكان التخزين، وده **الأفضل والموصى بيه** لمعظم الحالات
- الـ**Bind Mount**: إنت بتحدد المسار بنفسك على جهازك (host)، مفيد لو عايز تربط مجلد معين بعينه (زي وقت التطوير development)

| النوع                | فين بيتخزن                                                   | مين بيدي الاسم                     |
| -------------------- | ------------------------------------------------------------ | ---------------------------------- |
| **Named Volume**     | `/var/lib/docker/volumes/` (على الـ disk)                    | إنت بتسميه بنفسك                   |
| **Anonymous Volume** | `/var/lib/docker/volumes/` (نفس المكان بالظبط، على الـ disk) | Docker بيديله اسم عشوائي (hash)    |
| **Bind Mount**       | أي مكان تحدده إنت على الـ host                               | إنت بتحدد المسار                   |

## 1. Named Volume — مثال

```bash
# create the volume and give it a name
docker volume create my_data

# run it with a container and explicitly specify the name
docker run -d --name mydb -v my_data:/var/lib/mysql mysql:8.0
```

هنا لو عملت `docker volume ls` هتلاقي:

```
DRIVER    VOLUME NAME
local     my_data
```

---
## 2. Anonymous Volume — مثال

```bash
docker run -d --name mydb -v /var/lib/mysql mysql:8.0
```

لاحظ الفرق: كتبت بس المسار جوه الـ container (`/var/lib/mysql`) **من غير** ما تحدد اسم قبله بـ `:`.

لو عملت `docker volume ls` هتلاقي:

```
DRIVER    VOLUME NAME
local     8f3a9c2d1e5b7f4a6c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
```

**المشكلة فيه:** بما إن الاسم عشوائي، **صعب تتبعه** أو تربطه بـ container تاني بسهولة، وأسهل إنه "يضيع" أو يفضل موجود كـ dangling volume بعد ما الـ container يتشال.

---
## 3. Bind Mount — مثال

```bash
docker run -d --name mydb -v /home/user/mysql-data:/var/lib/mysql mysql:8.0
```

هنا `/home/user/mysql-data` ده **مسار حقيقي على جهازك (host)** إنت اللي حدده، مش Docker.

**مثال تاني شائع جداً في التطوير (development):**

```bash
docker run -d --name myapp -v /home/user/my-project/src:/app/src node:18
```

ده بيخليك تعدل الكود على جهازك مباشرة، والتعديل بيظهر جوه الـ container **فوراً** من غير ما تحتاج تعمل rebuild — مفيد جداً وقت التطوير.

---
## إزاي تستخدم Volume؟

### 1. تعمل volume يدوياً

```bash
docker volume create my_data
```
### 2. تشوف الـ volumes الموجودة

```bash
docker volume ls
```
### 3. تشغل container وتربطه بالـ volume

```bash
docker run -d --name mydb -v my_data:/var/lib/mysql mysql:8.0
```
هنا:
- `my_data` = اسم الـ volume
- الـ`/var/lib/mysql` = المسار **جوه الـ container** اللي هيتربط بالـ volume ده (ده المكان اللي MySQL بيخزن فيه بياناته)
## مثال عملي يوضح الفايدة

```bash
docker run -d --name mydb -v my_data:/var/lib/mysql mysql:8.

docker rm -f mydb

docker run -d --name mydb2 -v my_data:/var/lib/mysql mysql:8.0
```

**النتيجة:** الـ container الجديد (`mydb2`) هيلاقي **نفس البيانات** اللي كانت في `mydb` القديم، رغم إن الـ container الأول اتمسح تماماً! لأن البيانات كانت متخزنة في الـ volume، مش جوه الـ container نفسه.

## استخدام Volumes في `Dockerfile`

تقدر كمان تحدد الـ mount point جوه الـ Dockerfile نفسه:

```dockerfile
FROM mysql:8.0
VOLUME /var/lib/mysql
```

لكن لاحظ إن `VOLUME` في الـ Dockerfile **بس بيحدد إن المسار ده لازم يكون volume**، ومش بيسمي الـ volume أو يربطه باسم معين — ده بتحدده وقت الـ `docker run` بالـ `-v`.

---
