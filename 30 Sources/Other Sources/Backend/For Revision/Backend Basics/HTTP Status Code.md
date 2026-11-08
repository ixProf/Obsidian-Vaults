---
title: "HTTP Status Code"
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
### HTTP Status Codes باختصار 
الـ **HTTP Status Codes** هي أرقام السيرفر بيرجعها بعد أي Request علشان يقولك حصل إيه بالظبط. أول رقم في الـ Status Code هو اللي بيحدد نوع الاستجابة.
## 1xx - Informational

معناها: **"استنى، لسه بكمل."**

- **101 Switching Protocols** → السيرفر وافق يغير البروتوكول (زي التحويل لـ WebSocket).
## 2xx - Success

معناها: **"الدنيا تمام والطلب نجح."**

- **200 OK** → الطلب نجح.
- **201 Created** → تم إنشاء Resource جديد.
- **204 No Content** → الطلب نجح، لكن مفيش بيانات هترجع.
## 3xx - Redirection

معناها: **"روح للمكان ده بدل هنا."**

- **301 Moved Permanently** → الرابط اتغير نهائي.
- **302 Found** → الرابط اتغير مؤقتًا.
- **304 Not Modified** → الملف متغيرش، استخدم النسخة اللي عندك في الـ Cache.
## 4xx - Client Error

معناها: **"الغلط منك إنت (العميل)."**

- **400 Bad Request** → الـ Request نفسه غلط.
- **401 Unauthorized** → محتاج Login أو Authentication.
- **403 Forbidden** → أنت معروف، لكن معندكش صلاحية.
- **404 Not Found** → المورد أو الصفحة مش موجودة.
- **429 Too Many Requests** → بعت Requests كتير في وقت قصير.
## 5xx - Server Error

معناها: **"الغلط من السيرفر."**

- **500 Internal Server Error** → مشكلة عامة داخل السيرفر.
- **502 Bad Gateway** → السيرفر استلم رد غلط من سيرفر تاني.
- **503 Service Unavailable** → السيرفر واقع أو تحت صيانة أو عليه ضغط.
- **504 Gateway Timeout** → السيرفر استنى سيرفر تاني كتير ومردش.


---

## أسهل طريقة تحفظهم

| الفئة   | معناها            |
| ------- | ----------------- |
| **1xx** | استنى شوية        |
| **2xx** | كله تمام          |
| **3xx** | روح لمكان تاني    |
| **4xx** | الغلط منك         |
| **5xx** | الغلط من السيرفر  |

**قاعدة ذهبية تحفظها:**

- **2 = Success**
    
- **3 = Redirect**
    
- **4 = Client Problem**
    
- **5 = Server Problem**