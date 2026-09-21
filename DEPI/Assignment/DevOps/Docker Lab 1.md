ٍٍ
# Difference Between CMD , ENTRYPOINT

- الـ`CMD` سهل انك تعمله override بالكامل لو الUser كتب أمر تاني وقت `docker run`.
- الـ`ENTRYPOINT` **ثابت** ومش بيتلغي بسهولة، أي حاجة تكتبها وقت `docker run` بتتضاف كـarguments له، مش بتستبدله.

# Difference Between RUN , ADD
### `COPY`

بينسخ **ملفات أو مجلدات من جهازك (local machine)** إلى جوه الـ container/image.

```dockerfile
# Source (not in container)
COPY app.py /app/app.py 
# Destination (in the container)
COPY ./src /app/src

```
### `ADD`
بيعمل **نفس اللي بيعمله `COPY`**، لكنه بيدعم مصدرين إضافيين:

```dockerfile
# 1. From URL Directly
ADD https://example.com/file.tar.gz /app/

# 2. Auto-Extract tar file and store it in dir
ADD archive.tar.gz /app/
```

**الفرق عن `COPY`:**

1. الـ**URL كمصدر**: تقدر تحط رابط بدل ما الملف يكون عندك محلياً، وDocker هيحمله تلقائي.
2. **فك ضغط تلقائي (auto-extract)**: لو الملف المصدر كان `tar` ، الـ`ADD` هيفكه تلقائيا في الdestination

---

# Problem 1

## Run the container hello-world  

```bash
docker run hello-world
```

![[Pasted image 20260819151734.png]]
## Check the container status  

```bash
docker ps -a
```

![[Pasted image 20260819151759.png]]

## Start the stopped container  

```bash
docker start <container_id_or_name> # 2280b672ee9b
```

![[Pasted image 20260819151836.png]]

## Remove the Container

```bash
docker rm <container_id_or_name> # 2280b672ee9b
```

![[Pasted image 20260819152026.png]]


## Remove the image

```bash
docker rmi <image_name> # hello-world
```

![[Pasted image 20260819152528.png]]

---

# Problem 2

## Run container centos or ubuntu in an interactive mode

```bash
docker run -it --name my_ubuntu ubuntu
```

## Run the following command in the container “echo docker ”

```bash
echo docker
```


## Open a bash shell in the container and touch a file named hello-docker

بما إنك أصلاً داخل الكونتينر بـ shell (لأنك شغلته بـ `-it`)، تقدر تعمل مباشرة:

```bash
touch hello-docker
```

## - Stop the container and remove it. Write your comment about the file hello-docker

```bash
exit
```

```bash
docker stop my_ubuntu
docker rm my_ubuntu
```

بالنسبة لملف hello-docker
الملف ده اتمسح نهائيا ومش هنلاقيله أي أثر بعد ما تمسح الكونتينر.
ودا بسبب إن أي تعديل بتعمله جوه الكونتينر بيتخزن في الـ **writable layer** الخاصة بالكونتينر نفسه، مش في الإيميدج ولا في أي مكان تاني (زي الvolume يعني).
فلما تمسح الكونتينر (`docker rm`)، الlayer دي بتتمسح معاه، وبكدا أي بيانات كانت جواه زي الملف الي عملناه دا بتتمسح معاه برضو

إلا لو كنت عملت `docker commit` قبل المسح
 ال`docker commit` : بتعمل Image جديدة من الContainer بعد التعديلات اللي حصلت جواه.  فلما بعمل commit بيحفظ التعديل دا في image جديدة وهي read-only layer

او لو استخدمنا استخدمت `volume`/`bind mount` علشان نحفظ البيانات دي بره الكونتينر.

## Remove all stopped containers

```bash
docker container prune
```

![[Pasted image 20260819153315.png]]

---

# Problem 3

## Deploy a MySQL database called app-database. Use the mysql latest image, and use the -e flag to set MYSQL_ROOT_PASSWORD to P4sSw0rd0!. The container should run in the background.

```bash
docker run -d --name app_mysql -e MYSQL_ROOT_PASSWORD=P4sSw0rd0! mysql:latest
```

الـ `e-` دي بتاعت ال Environment Variable 

![[Pasted image 20260819160431.png]]

---

# Problem 4

## Run the image Nginx

```bash
docker run -d --name my_nginx -p 8080:80 nginx
```

## Add html static files to the container and make sure they are accessible

```bash
docker exec -it my_nginx bash
```

```bash
echo "<hi> ROOOODRI IS ON FIRE, YOUR DEFNSE IS TERRIFIED <h1>" > /usr/share/nginx/html/index.html

exit
```



![[Pasted image 20260819162016.png]]

## Commit the container with image name IMAGE_NAME

```bash
docker commit my_nginx rodri_onfire
```

for test
```bash
docker run -d --name rodri_is_onFire t -p 8081:80 rodri_onfire
```

![[Pasted image 20260819163214.png]]

![[Pasted image 20260819163142.png]]

---

# Problem 5

## Python app

```python
print("RODRI IS ON FIRE , YOUR DEFENSE IS TERRIFIED !!!!!")
print("RODRI IS ON FIRE , YOUR DEFENSE IS TERRIFIED !!!!!")
print("RODRI IS ON FIRE , YOUR DEFENSE IS TERRIFIED !!!!!")
print("RODRI IS ON FIRE , YOUR DEFENSE IS TERRIFIED !!!!!")
print("RODRI IS ON FIRE , YOUR DEFENSE IS TERRIFIED !!!!!")
```

## Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY . .
CMD ["python", "app.py"]
```

## Build and Test

```bash
docker build -t python-rodri-app:v1 . 
docker run --rm python-rodri-app:v1
```

## Multistaged file

```dockerfile
FROM python:3.12-slim AS bulider
WORKDIR /app
COPY . .

FROM python:3.12-alpine
WORKDIR /app
COPY --from=builder /app/app.py
CMD ["python", "app.py"]

```

علشان نرنه بما اننا غيرنا الاسم ف هنستخدم f- 
```bash
docker build -t python-rodri-app:slim -f Dockerfile.multistage .
```

```bash
docker run --rm python-rodri-app:slim
```

علشان نقارن بين الاتنين 

```bash
docker images | grep python-rodri-app
```

![[Pasted image 20260819165311.png]]


![[Pasted image 20260819164300.png]]

## Pushed on DockerHub 

اول حاجه هنسجل الدخول

```bash
docker login
```

هندي بقى تاج للاسم بتاعنا الي فالهوست لليوزرنيم بتاع دوكر هب 

```bash
docker tag python-rodri-app:v1 iprofx/python-rodri-app:v1 
docker tag python-rodri-app:slim iprofx/python-rodri-app:slim
```

هنبدا نبوشه بقى بشكل طبيعي 

```bash
docker push iprofx/python-rodri-app:v1
docker push iprofx/python-rodri-app:slim
```

![[Pasted image 20260819170938.png]]

![[Pasted image 20260819171041.png]]

