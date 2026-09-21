

# يعني إيه JSON Patch أصلاً؟

## JSON Patch

هو **طريقة لتعديل جزء من البيانات (Partial Update)** بدل ما تبعت الأوبجكت كله.


# الفرق بين PUT و PATCH

## PUT

- بيبدل كل الـ Resource
    

```http
PUT /users/1
```

لازم تبعت كل الداتا

## PATCH

- بيعدل جزء بس
    

```http
PATCH /users/1
```

تبعت التغيير فقط

---

# شكل JSON Patch

JSON Patch عبارة عن **Array من العمليات**

```json
[
  {
    "op": "replace",
    "path": "/name",
    "value": "Mahmoud"
  }
]
```

---

# مكونات العملية

كل operation فيها:

|Field|المعنى|
|---|---|
|op|نوع العملية|
|path|المكان|
|value|القيمة|

---

# العمليات (Operations)

## 1) add


يضيف قيمة أو يغير قيمة موجودة

---

## 2) remove


يمسح عنصر

---

## 3) replace


يغير القيمة (يمسح القديم ويضيف الجديد)

---

## 4) move

ينقل قيمة

---

## 5) copy


ينسخ قيمة من غير ما يمسح الاصل

---

## 6) test

يتأكد من القيمة تطابق الموجود ولا لا
 لو فشل → كل العملية تفشل

---

# Path (المسار)

Path uses `/` to access properties

المسار بيحدد مكان التعديل

### مثال

```json
"/orders/0"
```

يعني أول عنصر

```json
"/orders/-"
```

يعني آخر عنصر

---
## قبل

```json
{
  "name": "John"
}
```

## Patch

```json
[
  {
    "op": "replace",
    "path": "/name",
    "value": "Ali"
  }
]
```

## بعد

```json
{
  "name": "Ali"
}
```

---
# استخدامه في ASP.NET Core

## علشان نستخدمه في مشروعنا لازم ننزل Package

```
Microsoft.AspNetCore.Mvc.NewtonsoftJson
```

## نضيف في Program.cs

```csharp
builder.Services.AddControllers()
    .AddNewtonsoftJson();
```

---

# Controller

```csharp
[HttpPatch]
public IActionResult Update(
    [FromBody] JsonPatchDocument<User> patchDoc)
{
    var user = GetUser();

    patchDoc.ApplyTo(user);

    return Ok(user);
}
```

# أهم سطر

```csharp
patchDoc.ApplyTo(user);
```

ده اللي بيطبق التعديلات

---

# Content-Type مهم

لازم تبعت:

```
application/json-patch+json
```

---

# Atomic Operation

All operations succeed or all fail
يا كله يشتغل يا كله يفشل

---

# ModelState Validation

```csharp
patchDoc.ApplyTo(user, ModelState);

if (!ModelState.IsValid)
    return BadRequest(ModelState);
```

---

# Security (مهم جداً)

## المشاكل

- ممكن تعديل fields حساسة
- ممكن DoS
- ممكن كسر business logic

## الحل

- تحقق من الداتا
- متعرضش كل properties
- استخدم Auth

# أهم فكرة لازم تفهمها

بدل:

```json
{
  "name": "Ali",
  "email": "a@gmail.com"
}
```

تكتب:

```json
[
  {
    "op": "replace",
    "path": "/name",
    "value": "Ali"
  }
]
```

---