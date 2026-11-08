---
title: "REST API"
aliases: []
type: source
status: active
domain: backend-engineering
tags: [source, backend-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


# يعني إيه API أصلًا؟

قبل REST لازم نفهم API.

## API = Application Programming Interface

وده ببساطة **وسيلة تواصل بين برنامج وبرنامج**.

يعني بدل ما برنامج يدخل جوه برنامج تاني ويشوف شغال إزاي، هو بيكلمه من خلال واجهة واضحة.

### مثال بسيط

عندك:

- Mobile App
- Web App
- Backend Server

الموبايل أو الويب لما يحب:

- يجيب users
- يعمل login
- يضيف product
- يحذف order

فهو **ما بيتعاملش مع الداتا مباشرة**  
هو بيبعت طلب للـ Backend عن طريق API.

---

# يعني إيه REST؟

## REST = Representational State Transfer

REST مش لغة ولا فريم ورك ولا بروتوكول جديد

REST هو **Architectural Style**  
يعني **أسلوب أو مجموعة مبادئ** لتصميم الـ APIs.

بمعنى هو طريقة منظمة تخليك تبني API بشكل مفهوم، مرتب، وقابل للتوسع.

---

# الفكرة الأساسية في REST

REST بيقولك:

بدل ما تعمل API شكله عشوائي زي:

```http
/getAllUsers
/createNewUser
/deleteUserById/5
/updateUserName
```

اعمل API مبني على **Resources**.

---

# يعني إيه Resource؟

الـ Resource هو أي شيء في السيستم تقدر تتعامل معاه.

مثلًا:

- users
- products
- orders
- categories
- students
- books
    

كل واحدة من دول تعتبر Resource.

---

# REST بيعامل الداتا على إنها Resources

يعني بدل ما تقول:

- اعمل function اسمها getUsers
    
- اعمل function اسمها createUser
    

REST يقولك:

- عندي Resource اسمه `users`
    
- وبتحدد العملية باستخدام **HTTP Method**
    

مثال:

```http
GET /users
POST /users
GET /users/5
PUT /users/5
DELETE /users/5
```

هنا:

- `/users` = المورد
    
- `GET / POST / PUT / DELETE` = العملية
    

---

# طب يعني إيه RESTful API؟

## RESTful API

هو API **ملتزم بمبادئ REST**

يعني:  
مش أي API على HTTP يبقى RESTful  
لازم يكون مصمم على طريقة REST.

### إذًا الفرق:

- **REST** = القواعد أو الأسلوب
- **RESTful API** = API معمول وفق القواعد دي

---

# مثال سريع يوضح الفرق

لو عندك API بالشكل ده:

```http
POST /createUser
POST /deleteUser
POST /getUsers
```

ده API عادي، ==لكنه **مش RESTful غالبًا**==  
لأنه ماشي بمنطق الأوامر، مش بمنطق الـ Resources.

لكن لو عملته كده:

```http
GET /users
POST /users
GET /users/1
DELETE /users/1
```

يبقى أقرب جدًا لـ RESTful API.

---
# مبادئ REST الأساسية

REST ليه شوية قيود أو قواعد مشهورة.  
مش لازم تحفظ أسمائها بس لازم تفهم معناها.


## 1) Client-Server

لازم يبقى فيه فصل واضح بين:

- **Client**
- **Server**

### Client

هو اللي بيطلب  
مثل:

- Browser
- Mobile App
- Frontend App in Angular/React

### Server

- يستقبل الطلب
- يعالج المنطق
- يتعامل مع الداتابيز
- يرجع رد

### فايدة الفصل ده

- الواجهة تتغير براحتك
- الباك إند يتطور لوحده
- تقدر تستخدم نفس الـ API مع ويب وموبايل

### مثال

عندك API للطلاب:

- Web App يستخدمه
- Mobile App يستخدمه
- Desktop App يستخدمه

كلهم بيكلموا نفس الـ Server.

---

## 2) Stateless


### يعني Stateless إيه؟

يعني ==**كل Request لازم يكون مستقل بنفسه**==

السيرفر **ما يعتمدش على معلومات محفوظة من Request سابق**  
عشان يفهم الـ Request الحالي.

**اخدنا في النيتورك حاجة زي كدا علشان كدا كنا بنستخدم الكوكيز لو فاكرين**

### يعني إيه عملي؟

لو عملت request:

```http
GET /orders
```

السيرفر لازم يعرف من أنت من خلال الـ request نفسه:

- Token
- Headers
- Query
- Body

مش يقول:

- أنا فاكر إنك كنت عامل login من 10 دقايق في request تاني -> وطبعا دا حله الكوكيز زي ما اخدنا


لو عندك Authentication بـ JWT

الكلينت يبعت:

```http
Authorization: Bearer <token>
```

في كل request محتاج صلاحية.

ده RESTful  
لأن كل request شايل المعلومات المطلوبة.

### فايدة Stateless

- أسهل في التوسع
- أسهل في التوزيع على أكثر من سيرفر
- أسهل في الصيانة
- أقل تعقيد

---

## 3) Resource-Based

REST==بيركز على الـ Resources== مش الأفعال.

يعني بنسأل نفسنا:

- أنا بتعامل مع إيه؟  

### ودا مثال غلط

```http
/getAllProducts
/addNewProduct
/updateProductPrice
/removeProduct
```

### صح أكثر في REST

```http
GET /products
POST /products
PUT /products/5
DELETE /products/5
```

---

## 4) Uniform Interface

يعني يكون فيه **شكل موحد للتعامل** مع الـ API.

بمعنى:

- يكون في URLs منطقية
- استخدام الـ HTTP Methods صح
- الـ Response واضح
- الـ Resource naming consistent

### مثال

لو عندي users و products  
يبقى:

```http
GET /users
GET /products
POST /users
POST /products
```

مش:

```http
GET /fetchAllUsers
GET /showProductsList
POST /insertProductNow
```

مش منطقي اني اكتب fetchAllUsers في ال URL انا كدا بعبط

---

## 5) Cacheable

بعض الـ Responses ينفع تتخزن مؤقتًا Cache  
علشان الأداء يبقى أحسن.

مثال:

- قائمة الدول
- قائمة المدن
- المنتجات العامة

لو البيانات مش بتتغير بسرعة، ممكن الـ client أو proxy يعملها cache.

علشان كدا في الاغلب كنا بنلاقي static APIs وبنستخدمها 

---

## 6) Layered System

العميل مش لازم يعرف هو بيتعامل مع:

- السيرفر الأساسي
- Proxy
- Load Balancer
- Gateway

مثلا انا هجيب واحد مش فاهم حاجة فدا كله ف هقوله انت هتبعت على البروكسي الاول وبعدها لكذا ولكذا وادخله في لفة ملهاش لزمة ليه

هو بس الي عليه بيبعت request، والـ architecture من جوه ممكن تبقى متعددة الطبقات.

---

# HTTP Methods في REST

دي أساس التعامل، اه خدناها قبل كدا بس متتكبرش على العلم يا صديقي وراجع

## GET

علشان تجيب بيه البيانات.

```http
GET /users
```

يعني هات كل الـ users

```http
GET /users/5
```

يعني هات الـ user اللي رقمه 5

### ReadOnly Method
### ملاحظات

- GET ماينفعش يعدل البيانات
- مفروض يكون للقراءة فقط

---

## POST

بيستخدم لإنشاء Resource جديد.
### مثال

```http
POST /users
```

والـ body:

```json
{
  "name": "Mahmoud",
  "email": "mahmoud@example.com"
}
```

يعني أنشئ user جديد.

---

## PUT

بيستخدم غالبًا ==لتعديل== الـ Resource كامل.

### مثال

```http
PUT /users/5
```

يعني عدل الـ user رقم 5.

---

## PATCH

بيستخدم ==لتعديل **جزء**== من الـ Resource، مش كله. 
Partial Modify

### مثال

```http
PATCH /users/5
```

```json
{
  "email": "new@email.com"
}
```

يعني غير الإيميل فقط.

---

## DELETE

بيستخدم لحذف Resource.

### مثال

```http
DELETE /users/5
```

يعني احذف الـ user رقم 5.

---

# قواعد تصميم ال URLs في ال REST

الـ URL في REST مهم جدًا.

## 1) استخدم nouns مش verbs

### غلط

```http
/getUsers
/createUser
/deleteUser
```

### صح

```http
/users
/users/1
```


## 2) استخدم plural غالبًا

### الأفضل

```http
/users
/products
/orders
```

أفضل من:

```http
/user
/product
/order
```

لأنك بتتعامل مع collection من الموارد.

## 3) استخدم nesting عند الحاجة

مثال:

```http
/users/5/orders
```

يعني الأوردرات الخاصة باليوزر رقم 5

```http
/orders/10/items
```

يعني عناصر الأوردر رقم 10

## 4) استخدم query string للفلاتر والبحث

مثال:

```http
GET /products?category=laptop
GET /products?page=2
GET /products?pageSize=10
GET /products?sort=price
GET /users?name=mahmoud
```

يعني:

- فلترة
- pagination
- sorting
- search

---

# الفرق بين URI و URL بسرعة

غالبًا في الكلام اليومي هتلاقي الناس بتقول URL  
لكن هنا يكفيك تفهم إن:

```http
/users/5
```

ده العنوان اللي هتتعامل من خلاله مع الـ Resource.

---

# Request و Response في REST

كل interaction غالبًا بيكون بالشكل ده:

## Request

بيكون فيه:

- Method
- URL
- Headers
- Body أحيانًا -> على حسب الميثود

### مثال Request

```http
POST /users
Content-Type: application/json
Authorization: Bearer token
```

```json
{
  "name": "Mahmoud",
  "email": "mahmoud@example.com"
}
```
## Response

بيرجع:

- Status Code
- Headers
- Body

### مثال Response

```http
201 Created
Content-Type: application/json
```

```json
{
  "id": 7,
  "name": "Mahmoud",
  "email": "mahmoud@example.com"
}
```

---

# Status Codes

الـ status code بيقول نتيجة العملية.

 - 200 OK - الطلب نجح.
- 201 Created - تم إنشاء resource جديد
- 204 No Content 
	- العملية نجحت لكن من غير body في الرد.
	- مثال:
	- DELETE نجح
	- أو update مش محتاج يرجع data
    
-  400 Bad Request
	- فيه مشكلة في الطلب نفسه.
	- body ناقص
	- format غلط
	- validation failed

- 401 Unauthorized
	- المستخدم مش عامل authentication
	- مفيش token
	- أو token غير صالح

- 403 Forbidden
	- المستخدم معروف، لكن **مش مسموح له** يعمل العملية دي.
	- يوزر عايز يمسح ادمن مثلا

- 404 Not Found
	- الريسورس المطلوب غير موجود.

مثال:

```http
GET /users/999
```

ومفيش user بالـ id ده.
- 500 Internal Server Error
	- غلط من السيرفر ودا اوسخ ايرور صراحة شكله مش لطيف

يعني فيه exception أو مشكلة داخلية.

---

# JSON وعلاقته بـ REST

REST نفسه ما قالش لازم JSON فقط  
لكن عمليًا أغلب REST APIs اليوم بتستخدم JSON.

### ليه JSON؟

- خفيف
- واضح
- سهل القراءة
- سهل التعامل معاه في JavaScript و C# وغيرهم

### مثال JSON

```json
{
  "id": 1,
  "name": "Ali",
  "email": "ali@example.com"
}
```

---

# مثال كامل على RESTful API

تعالى نفترض إن عندنا نظام Students.

## 1) Get all students

```http
GET /students
```

### Response

```json
[
  {
    "id": 1,
    "name": "Mahmoud"
  },
  {
    "id": 2,
    "name": "Ahmed"
  }
]
```

---

## 2) Get student by id

```http
GET /students/1
```

### Response

```json
{
  "id": 1,
  "name": "Mahmoud"
}
```

---

## 3) Add student

```http
POST /students
```

### Body

```json
{
  "name": "Mahmoud",
  "age": 20
}
```

### Response

```http
201 Created
```

```json
{
  "id": 10,
  "name": "Mahmoud",
  "age": 20
}
```

---

## 4) Update student

```http
PUT /students/10
```

### Body

```json
{
  "name": "Mahmoud Sayed",
  "age": 21
}
```

---

## 5) Delete student

```http
DELETE /students/10
```

### Response

```http
204 No Content
```

---

# إزاي تعرف إن الـ API ده RESTful فعلًا؟

مش لازم يبقى 100% textbook، لكن غالبًا يكون فيه:

- Resources واضحة
- URLs نظيفة
- HTTP Methods مستخدمة صح
- Stateless
- Status codes مناسبة
- JSON responses واضحة
- Separation between client and server

---

# أمثلة شائعة لناس بتغلط فيها

## 1) استخدام POST لكل حاجة

مثال:

```http
POST /getUsers
POST /deleteUser
POST /updateUser
```

ده شائع، لكنه مش RESTful كويس.

الأفضل:

```http
GET /users
DELETE /users/1
PUT /users/1
```

## 2) أسماء endpoints فيها أفعال كثيرة

مثال:

```http
/createNewOrder
/cancelCurrentOrder
/updateOrderAddress
```

الأفضل:

```http
POST /orders
PATCH /orders/5
PUT /orders/5/address
```

حسب التصميم.

## 3) عدم استخدام status codes صح

مثال:  
ترجع 200 حتى لو فيه خطأ

وده غلط  
لازم تستخدم:

- 400
- 401
- 404
- 500  
    بحسب الحالة
## 4) خلط الـ Resource بالـ action


```http
POST /users/5/delete
```

الأفضل:

```http
DELETE /users/5
```

---
# هل كل HTTP API يعتبر REST؟

لا.

ممكن API يكون:

- شغال على HTTP
- وبيستخدم JSON

لكن مش RESTful

لو مثلًا:

- كل حاجة POST
- أسماء endpoints عشوائية
- مفيش resource orientation
- مفيش استخدام صح للـ status codes

يبقى HTTP API فقط، مش RESTful بالمعنى القوي.


---

# RESTful API في .NET

في ASP.NET Core Web API، أنت غالبًا هتكتب Controllers أو Minimal APIs.

مثال Controller:

```csharp
[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Ok();
    }

    [HttpPost]
    public IActionResult Create(CreateStudentDto dto)
    {
        return CreatedAtAction(nameof(GetById), new { id = 1 }, dto);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateStudentDto dto)
    {
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        return NoContent();
    }
}
```

الكود ده شكله RESTful لأن:

- resource اسمه students
    
- methods واضحة
    
- endpoints نظيفة
    
- status codes مناسبة
    

---

# طب إيه معنى كلمة Representational في REST؟

الاسم نفسه فيه كلمة Representational  
يعني أنت غالبًا ما بترجعش الـ object الداخلي نفسه كما هو، لكن **تمثيل له**.

مثلًا:  
عندك User في الداتابيز فيه:

- PasswordHash
    
- SecurityStamp
    
- InternalFlags
    

لكن لما ترجع response للـ client، بترجع:

```json
{
  "id": 1,
  "name": "Mahmoud",
  "email": "m@example.com"
}
```

ده Representation للـ Resource  
مش كل تفاصيله الداخلية.

وعشان كده بنستخدم DTOs كثير.

## هيكون في تلخيص لل DTOs قريب

---

# أفضل Practices في تصميم RESTful APIs

## 1) خليك consistent

لو بدأت plural، كمل plural  
لو بدأت naming style معين، كمل عليه
## 2) استخدم nouns مش verbs
## 3) استخدم status codes صح
## 4) قسم بين DTO و Entity
## 5) اعمل validation

## 6) استخدم pagination

لو عندك lists كبيرة

مثال:

```http
GET /products?page=1&pageSize=10
```

## 7) استخدم filtering و sorting بشكل واضح

مثل:

```http
GET /orders?status=pending
GET /products?sort=priceDesc
```

## 8) خليك واضح في الـ error response

بدل ما ترجع error مبهم

مثال أفضل:

```json
{
  "message": "Email is required"
}
```
