# HTTP Request Methods

الـ **HTTP Request Methods** أو **HTTP Verbs** هي الطرق اللي الـ Client (زي المتصفح أو الـ Frontend) بيقول بيها للسيرفر: "أنا عايز أعمل إيه؟"

كل Method ليها غرض معين.


# 1. GET

**الغرض:** جلب البيانات فقط.

- بيستخدم لما عايز تقرأ Data.
- المفروض ميغيرش أي حاجة في قاعدة البيانات.
- غالبًا مبيبعتش Body.

### مثال

```http
GET /api/products
```

النتيجة:

```json
[
  {
    "id":1,
    "name":"Chair"
  }
]
```

في ASP.NET

```csharp
[HttpGet]
public IActionResult GetProducts()
{
}
```

---

# 2. POST

**الغرض:** إنشاء Resource جديد
بيستخدم لما تضيف بيانات جديدة.

مثال

```http
POST /api/products
```

Body

```json
{
    "name":"Chair",
    "price":500
}
```

لو نجح غالبًا يرجع

```
201 Created
```

---

# 3. PUT

**الغرض:** تحديث المورد بالكامل.

يعني لازم تبعت كل البيانات.

مثال

قبل

```json
{
    "name":"Chair",
    "price":500
}
```

Request

```http
PUT /api/products/1
```

Body

```json
{
    "name":"Gaming Chair",
    "price":700
}
```

بعدها كل البيانات القديمة هتتستبدل بالجديدة.

---

# 4. PATCH

**الغرض:** تحديث جزء من البيانات فقط.

لو عايز تغير السعر بس

```http
PATCH /api/products/1
```

Body

```json
{
    "price":700
}
```

مش محتاج تبعت الاسم.

---

# 5. DELETE

**الغرض:** حذف Resource.

```http
DELETE /api/products/1
```

لو نجح غالبًا يرجع

```
204 No Content
```

---

# 6. HEAD

زي GET بالظبط...

لكن **من غير الـ Body**.

بيرجع الـ Headers فقط.

بيستخدم لما تعرف:

- حجم الملف
    
- آخر تعديل
    
- هل موجود ولا لا
    

بدون تنزيل المحتوى.

---

# 7. OPTIONS

بيسأل السيرفر:

> "إيه الـ Methods المسموح بيها هنا؟"

مثلاً

```
OPTIONS /api/products
```

ممكن يرجع

```
Allow:
GET
POST
PUT
DELETE
```

وبيستخدم كتير في CORS.

---

# 8. CONNECT

بيستخدم لعمل Tunnel بين Client وسيرفر.

غالبًا مع:

- HTTPS Proxy
    

مش هتستخدمه في APIs العادية.

---

# 9. TRACE

بيعمل Loopback للـ Request.

بيستخدم في Debugging.

نادراً جداً بيتستخدم وممكن يبقى مقفول لأسباب أمنية.

---

# أشهر Methods في الـ APIs

|Method|الاستخدام|
|---|---|
|GET|قراءة بيانات|
|POST|إنشاء بيانات|
|PUT|تحديث كامل|
|PATCH|تحديث جزئي|
|DELETE|حذف|

دول تقريبًا 99% من شغلك في Backend.

---

# Safe - يعني إيه؟

يعني الـ Method **مش بيغير أي بيانات**.

أمثلة:

GET
HEAD

يعني مهما كررتهم مش هيغيروا قاعدة البيانات.

---

# Idempotent - يعني إيه؟

دي من أهم المفاهيم في الـ Backend.

معناها:

> لو كررت نفس الـ Request 100 مرة، النتيجة النهائية هتفضل واحدة.

## مثال

```http
PUT /products/1
```

```json
{
   "price":100
}
```

لو بعته مرة

السعر = 100

لو بعته 100 مرة

السعر برضو = 100

يبقى PUT **Idempotent**.

---

مثال DELETE

```
DELETE /products/1
```

أول مرة هيحذف المنتج.
تاني مرة المنتج أصلاً مش موجود.
لكن الحالة النهائية هي نفسها:

> المنتج محذوف.

عشان كده DELETE يعتبر Idempotent.

---

أما POST

```
POST /products
```

كل مرة هيضيف منتج جديد.

مرة:

```
1 Product
```

مرتين:

```
2 Products
```

ثلاث مرات:

```
3 Products
```

فالنتيجة بتتغير.

إذن POST **مش Idempotent**.

---

# Cacheable - يعني إيه؟

يعني المتصفح أو أي Proxy يقدر يخزن الـ Response بدل ما يطلبه كل مرة.

مثال

```
GET /products
```

لو البيانات متغيرتش،

المتصفح ممكن يستخدم النسخة المخزنة (Cache) بدل ما يبعت Request جديد.

ده بيزود السرعة وبيقلل الحمل على السيرفر.

---

# ملخص سريع

|Method|الاستخدام|Safe|Idempotent|Cacheable|
|---|---|---|---|---|
|GET|قراءة البيانات|✅|✅|✅|
|HEAD|قراءة الـ Headers فقط|✅|✅|✅|
|POST|إنشاء بيانات|❌|❌|أحيانًا|
|PUT|تحديث كامل|❌|✅|❌|
|PATCH|تحديث جزء من البيانات|❌|❌|أحيانًا|
|DELETE|حذف|❌|✅|❌|
|OPTIONS|معرفة الـ Methods المتاحة|✅|✅|❌|
|TRACE|Debugging|✅|✅|❌|
|CONNECT|إنشاء Tunnel|❌|❌|❌|

## أسهل طريقة تحفظهم

- **GET** → اقرأ
    
- **POST** → أضف 
    
- **PUT** → استبدل الكل
    
- **PATCH** → عدّل جزء
    
- **DELETE** → احذف
    
- **HEAD** → هات الـ Headers بس
    
- **OPTIONS** → اسأل السيرفر "إيه المسموح؟"
    
- **TRACE** → اختبر مسار الـ Request
    
- **CONNECT** → اعمل اتصال (Tunnel) مع السيرفر أو Proxy.