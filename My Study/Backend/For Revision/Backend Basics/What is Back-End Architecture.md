# مقدمة عن الـ Backend Architecture

علشان تفهم الـ Backend صح، لازم الأول تعرف مين بيتكلم مع مين.

الفكرة كلها عبارة عن:

> **Client ➜ Server ➜ App ➜ Database ➜ App ➜ Server ➜ Client**

وده اسمه **Request-Response Cycle**.

---

# أولًا: يعني إيه Client؟

الـ **Client** هو أي حاجة تبعت Request للسيرفر.

مش لازم يكون Browser.

ممكن يكون:

- Chrome
- Firefox
- Mobile App
- React أو Angular Frontend
- Desktop Application
- Smart TV
- IoT Device
- Server تاني
    

أي حاجة بتبعت HTTP Request تعتبر Client.

---

# يعني إيه Backend؟

الـ Backend هو كل اللي بيحصل بعد ما الـ Client يبعت Request.

بيتكون من 3 أجزاء رئيسية:

```
Backend
│
├── Server
├── Application
└── Database
```

---

# 1) Server

الـ Server هو مجرد **كمبيوتر**.

وظيفته الأساسية:

- يستقبل Requests.
    
- يبعتها للتطبيق.
    
- يرجع Response.
    

مش لازم يبقى جهاز خارق.

حتى اللاب بتاعك أثناء التطوير يعتبر Server.

مثلاً لما تشغل:

```bash
dotnet run
```

أو

```bash
npm start
```

أنت كده شغلت Server على جهازك.

---

# 2) Application (App)

وده أهم جزء.

هو البرنامج اللي شغال على السيرفر.

وظيفته:

- يستقبل الـ Request.
    
- يفهم المطلوب.
    
- يجيب البيانات.
    
- يعمل Business Logic.
    
- يرجع Response.
    

مثلاً في ASP.NET

```http
GET /products/5
```

الـ App هيقول:

```
أجيب المنتج رقم 5
```

ويروح للداتا بيز.

---

# 3) Database

هي المكان اللي البيانات بتتخزن فيه.

زي:

- SQL Server
    
- MySQL
    
- PostgreSQL
    
- MongoDB
    

بدل ما البيانات تفضل في الـ RAM وتضيع لما الجهاز يقفل.

---

# ليه Database؟

علشان:

 تخزن البيانات بشكل دائم
تقدر تسترجعها
لو السيرفر وقع البيانات متضيعش

---

# Routing

لما Request يوصل للسيرفر.

لازم يعرف:

> مين هيشغله؟

وده اسمه

**Routing**

يعني ربط

```
HTTP Method
+
URI
```

بكود معين.

مثال

```
GET /products
```

يروح لـ

```csharp
GetProducts()
```

---

```
POST /products
```

يروح لـ

```csharp
CreateProduct()
```

كل Method + URI

بيسموا

```
Route
```

---

# Middleware

دي من أهم الحاجات في أي Backend.

هي أي كود بيتنفذ **بين استلام الـ Request وإرسال الـ Response**.

يعني:

```
Request

↓

Authentication

↓

Logging

↓

Validation

↓

Authorization

↓

Controller

↓

Response
```

كل واحدة من دول Middleware.

وظيفتها:

- تعدل الـ Request.
    
- تعمل Logging.
    
- تتحقق من الـ Token.
    
- تكلم Database.
    
- تكمل للـ Middleware اللي بعدها.
    

وفي الآخر واحدة منهم ترجع Response.

---

# Response

السيرفر ممكن يرجع أكتر من نوع Response.

مثلاً

## HTML

```html
<h1>Hello</h1>
```

---

## JSON

```json
{
    "id":1,
    "name":"Chair"
}
```

وده الأشهر في الـ APIs.

---

## Status Code فقط

زي

```
204 No Content
```

يعني العملية نجحت لكن مفيش بيانات.

---

# Web API

يعني إيه API؟

ببساطة:

هو واجهة بتسمح لبرنامج يكلم برنامج تاني.

أما Web API

فهو مجموعة من

```
Endpoints
```

زي

```
GET /products

POST /products

DELETE /products/5

PUT /products/3
```

الـ Frontend يكلمها.

---

# Endpoint

هو Route معين.

مثلاً

```
GET /users
```

Endpoint

---

```
POST /orders
```

Endpoint

---

# أهم مبادئ الـ Request-Response Cycle

## 1) السيرفر مش بيبدأ الكلام

السيرفر عمره ما يبعت Response من نفسه.

لازم الأول يجيله Request.

يعني:

```
Client
    ↓
Request
    ↓
Server
    ↓
Response
```

مش العكس.

---

## 2) كل Request لازم ليه Response

حتى لو

```
404
```

أو

```
500
```

لازم يرجع حاجة.

لو مرجعش

الـ Client هيفضل مستني للأبد.

---

## 3) Request واحد = Response واحد

مينفعش تعمل

```csharp
return Ok();

return BadRequest();
```

أو

```csharp
Response.Write();

Response.Write();
```

بعد ما تبعت Response خلاص الاتصال انتهى.

---

# رحلة الـ Request (مثال عملي)

تخيل عندك متجر إلكتروني، والعميل عايز يشوف منتج رقمه **66432**.

### 1. المستخدم يضغط على المنتج

المتصفح يبعت:

```http
GET /products/66432
```

يعني:

- **GET** = عايز يقرأ بيانات.
    
- **66432** = رقم المنتج.
    

---

### 2. الـ Request يسافر عبر الإنترنت

يوصل لأقرب Server خاص بالموقع.

---

### 3. السيرفر يستقبل الـ Request

السيرفر شغال ومستني أي طلبات.

---

### 4. الـ Routing يحدد مين هيعالج الطلب

يشوف:

```
GET + /products/{id}
```

ويروح للـ Controller المناسب.

---

### 5. التطبيق يحتاج البيانات

فيقول للداتا بيز:

```
هات المنتج 66432
```

---

### 6. الداتا بيز ترجع البيانات

مثلاً:

```json
{
  "id": 66432,
  "name": "Phone Case",
  "price": 350
}
```

---

### 7. السيرفر يبني الـ Response

يرجع:

```http
200 OK
```

ومعاه الـ JSON.

---

### 8. الـ Response يرجع للمتصفح

عبر الإنترنت.

---

### 9. المتصفح يعرض البيانات

الـ Frontend ياخد الـ JSON ويعرض:

- اسم المنتج.
    
- السعر.
    
- الصورة.
    
- التقييمات.
    

---

# ملخص الرسم

```text
Client
   │
   │ Request
   ▼
Server
   │
   ▼
Application
   │
   ▼
Middleware
   │
   ▼
Database
   │
   ▲
Application
   │
   ▲
Server
   │ Response
   ▲
Client
```

## الخلاصة

- **Client**: أي برنامج بيبعت Request.
    
- **Server**: جهاز بيستقبل الـ Requests.
    
- **Application**: الكود اللي بينفذ المنطق (Business Logic).
    
- **Database**: مكان تخزين البيانات بشكل دائم.
    
- **Route**: عبارة عن **HTTP Method + URI**.
    
- **Middleware**: كود بيتنفذ بين استلام الـ Request وإرسال الـ Response.
    
- **Web API**: مجموعة Endpoints يتعامل معاها الـ Frontend أو أي Client.
    
- **Request واحد يقابله Response واحد**، والسيرفر لا يبدأ التواصل من نفسه، بل ينتظر طلبًا من الـ Client أولًا.