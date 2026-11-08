---
title: "AutoMapper"
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

# What's AutoMapper?

![[Pasted image 20260523221122.png|675]]

> AutoMapper is an Object-Object Mapper. Object-Object Mapping works by Transforming an Input Object of one type to Output Object of all different Type

بالعربي كدا:

> هو عبارة عن مكتبة من مكتبات الدوت نت، وظيفته انه يعمل Mapping بين الObject to Object بشكل اوتوماتيكي، بدل ما كل مرة انت بتعمله بإيدك ودا هياخد منك وقت ومجهود


## على سبيل المثال:

- وانت بتعمل بروجيكت WebAPI معروف انك لازم تعمل DTOs بحيث انك تعرف تبعت الداتا بتاعتك بس بعيدا عن ال Entities الخاصة بالداتابيز،
	- طب يعني ايه ال DTOs؟

### DTOs;

الـ DTOs اختصار لـ:

> Data Transfer Objects

عبارة عن Objects معمولة مخصوص علشان **تنقل البيانات** بين الطبقات أو بين الـ API والـ Client.


أنت عندك Entity داخل الداتا بيز:

```csharp
public class User
{
    public int Id { get; set; }

    public string FullName { get; set; }

    public string Email { get; set; }

    public string PasswordHash { get; set; }

    public bool IsAdmin { get; set; }
}
```

هل منطقي تبعت كل ده للـ Frontend؟

لا.

ليه؟  
لأن:

- في بيانات حساسة
- في بيانات ملهاش لازمة
- أحيانًا عايز شكل مختلف للبيانات

فهنا بنستخدم DTO.

---

#### مثال DTO

```csharp
public class UserReadDto
{
    public string FullName { get; set; }

    public string Email { get; set; }
}
```

الـ API هيرجع ده فقط.

---

#### الفرق بين Entity و DTO

|Entity|DTO|
|---|---|
|مرتبط بالداتا بيز|لنقل البيانات|
|فيه كل البيانات|فيه البيانات المطلوبة فقط|
|EF Core بيتعامل معاه|API بيتعامل معاه|
|ممكن يحتوي Navigation Properties|غالبًا بسيط|
|داخلي|خارجي|

---

#### ليه الـ DTO مهم جدًا؟

## 1) Security

مينفعش تبعت:

```csharp
PasswordHash
```

للـ Client.

---

#### 2) تقليل حجم البيانات

بدل ما تبعت Object ضخم،  
تبعت البيانات المطلوبة فقط.

---

#### 3) فصل الطبقات

الـ Frontend ميبقاش مرتبط بشكل الداتا بيز.

---

#### 4) تنظيم الـ API

يبقى عندك:

- Create DTO
    
- Update DTO
    
- Read DTO
    

كل واحد لغرض معين.

---

#### الـ Flow الحقيقي في ASP.NET Core

الـ Client يبعت:

```json
{
  "name": "Laptop",
  "price": 50000
}
```

↓

الـ Controller يستقبل:

```csharp
ProductCreateDto
```

↓

يتحول لـ Entity:

```csharp
Product
```

↓

يتخزن في الداتا بيز.

---

## نرجع لل AutoMapper

قبل ما اذاكر ال AutoMapper واقرأ عنها، انا استخدمت في مشروعي شئ اشبه بال AutoMapper وممكن اكون بعتبره Manual Mapper، على سبيل المثال، في مشروع (واحة الدرعية)

### Model (User)

```cs
public class User
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public Role Role { get; set; } = Role.Admin;

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string? ResetPasswordCodeHash { get; set; }
    public DateTime? ResetPasswordCodeExpiresAt { get; set; }
    public DateTime? LastResetPasswordRequestAt { get; set; }
}
```

### DTO (UserResponseDTO)

```cs
public class UserResponseDto
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }
}

```

### Services (UserService Ex: GetAllAsync Method)

```cs
public async Task<List<UserResponseDto>> GetAllAsync()
{
    return await _context.Users
    .OrderBy(u => u.Id)
    .Select(u => new UserResponseDto
    {
        Id = u.Id,
        FullName = u.FullName,
        Email = u.Email,
        PhoneNumber = u.PhoneNumber,
        Role = u.Role.ToString(),
        IsActive = u.IsActive,
        CreatedAt = u.CreatedAt
    })
    .ToListAsync();
}
```

تخيل انك مطالب تعمل كل دا فكل الميثود وكل السيرفسيز التانية لكل مودل
**حوار صح؟**

الحل جه في وجود ال AutoMapper، طب نشتغل بيه ازاي؟


## الخطوة 1) تثبيت AutoMapper

```bash
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

---

## الخطوة 2) إنشاء Mapping Profile

اعمل فولدر:

```text
Mappings
```

---

### UserProfile.cs

```csharp
using AutoMapper;
using Wa7at_ElDr3yah_API.DTOs.User;
using Wa7at_ElDr3yah_API.Models;

namespace Wa7at_ElDr3yah_API.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserResponseDto>()
                .ForMember(
                    dest => dest.Role,
                    opt => opt.MapFrom(src => src.Role.ToString())
                );

            CreateMap<UserRequestDto, User>();
        }
    }
}
```

---
### إيه اللي عملته هنا؟

كدا انا قولتله بإختصار حول من User ل UserResponseDto أوتوماتيك.
بس ممكن تواجهنا مشكلة وحيدة وهي ال `Role`

في الـ Model:

```csharp
Role Enum
```

وفي الـ DTO:

```csharp
string
```
فقولتله  
حوّلها بـ:

```csharp
src.Role.ToString()
```

---
## الخطوة 3) تسجيل AutoMapper

في Program.cs

```csharp
builder.Services.AddAutoMapper(typeof(UserProfile));
```

---

## الخطوة 4) تعديل الـ Service

---

#### قبل AutoMapper

```csharp
return MapToDto(user);
```

---
#### بعد AutoMapper

أضف:

```csharp
private readonly IMapper _mapper;
```

---
#### Constructor

```csharp
public UserService(AppDbContext context, IMapper mapper)
{
    _context = context;
    _mapper = mapper;
}
```

---
#### GetAllAsync
##### قبل

```csharp
.Select(u => new UserResponseDto
{
    Id = u.Id,
    FullName = u.FullName,
    Email = u.Email,
    PhoneNumber = u.PhoneNumber,
    Role = u.Role.ToString(),
    IsActive = u.IsActive,
    CreatedAt = u.CreatedAt
})
```

##### بعد

```csharp
var users = await _context.Users
    .OrderBy(u => u.Id)
    .ToListAsync();

return _mapper.Map<List<UserResponseDto>>(users);
```

---

## ال Resolver في AutoMapper

في بعض الأحيان بيكون عندك Property محتاجة Logic أعقد شوية من مجرد:

```csharp
MapFrom()
```

وهنا بييجي دور الـ Resolver.

الـ Resolver بيسمحلك تكتب Logic مخصص للتحويل أثناء عملية الـ Mapping.

---

### مثال من مشروعنا

احنا عندنا:

```csharp
Role Enum
```

وفي الـ DTO:

```csharp
string
```

احنا حليناها قبل كدا باستخدام:

```csharp
src.Role.ToString()
```

لكن بدل ما نحط الـ Logic جوه الـ Profile مباشرة، ممكن نفصلها باستخدام Resolver.

---

## إنشاء Resolver

### RoleResolver.cs

```csharp
using AutoMapper;
using Wa7at_ElDr3yah_API.DTOs.User;
using Wa7at_ElDr3yah_API.Models;

namespace Wa7at_ElDr3yah_API.Mappings.Resolvers
{
    public class RoleResolver 
        : IValueResolver<User, UserResponseDto, string>
    {
        public string Resolve(
            User source,
            UserResponseDto destination,
            string destMember,
            ResolutionContext context)
        {
            return source.Role.ToString();
        }
    }
}
```

---

## استخدام الـ Resolver داخل الـ Profile

### UserProfile.cs

```csharp
using AutoMapper;
using Wa7at_ElDr3yah_API.DTOs.User;
using Wa7at_ElDr3yah_API.Models;
using Wa7at_ElDr3yah_API.Mappings.Resolvers;

namespace Wa7at_ElDr3yah_API.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserResponseDto>()
                .ForMember(
                    dest => dest.Role,
                    opt => opt.MapFrom<RoleResolver>()
                );

            CreateMap<UserRequestDto, User>();
        }
    }
}
```

---

### ليه ممكن نستخدم Resolver بدل MapFrom؟

لأن أحيانًا بيكون عندك:

- Business Logic
- عمليات حسابية
- شرط معين
- التعامل مع أكتر من Property
- Formatting معقد

فبدل ما الـ Profile يبقى ضخم، بتنقل الـ Logic داخل Resolver منفصل ومنظم.

---

مصادر فيديوهات الي ذاكرت منها

- [فيديو سريع وبسيط جدا يشرحلك الموضوع ببساطة](https://www.youtube.com/watch?v=_h2gUj3DtSI)
- [دا فيديو عملي بيوضحلك استخدامها بشكل موضح ومفصل](https://www.youtube.com/watch?v=irL3A1Evpcg)
