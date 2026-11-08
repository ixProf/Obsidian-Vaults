---
title: "AI - Lecture 2"
aliases: []
type: source
status: active
domain: ai-machine-learning
tags: [source, ai-machine-learning, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

# 3) يعني إيه Agent؟

الـ **Agent** هو أي كيان يقدر:

- يستقبل معلومات من البيئة
- وبعدها يتخذ Action أو قرار


بمعنى أبسط:

- **Sensors** = الحاجات اللي بيحس أو يشوف بيها
- **Actuators** = الحاجات اللي بينفذ بيها القرار

مثال بسيط:

- الإنسان Sensor عنده العين والأذن
- و Actuator عنده الإيد والرجل والصوت

في الذكاء الاصطناعي:

- العربية الذكية Sensor عندها كاميرات ورادار
- و Actuator عندها الفرامل والدركسيون والبنزين


---

# 4) Task Environment

في السلايد اتقال إن **Task Environments are “problems” to which rational agents are the solutions**.  
يعني البيئة أو المهمة هي المشكلة، والـ rational agent هو الحل المناسب ليها. وكمان السلايد قال إن وصف أي Task Environment يحتاج 4 عناصر:  
**Performance measure, Environment, Actuators, Sensors**، وده اسمه **PEAS**.

وده من أهم أجزاء المحاضرة كلها.

---

# 5) PEAS

اختصار **PEAS** معناه:

## P = Performance Measure

يعني هنقيّم الـ Agent على أساس إيه؟  
يعني إيه اللي يخليني أقول إنه ناجح أو فشل؟

مثلاً:

- لو Taxi driver:
    
    - يوصل بسرعة

    - بأمان

    - قانوني

    - يحقق راحة للراكب
        

يبقى دي كلها معايير نجاحه.

## E = Environment

البيئة اللي الـ Agent شغال فيها.

مثلاً في حالة التاكسي:

- الطريق
    
- العربيات
    
- الإشارات
    
- الناس
    
- الشرطة
    
- الطقس
    

## A = Actuators

الوسائل اللي بيأثر بيها على البيئة.

مثلاً في عربية:

- steering
- brake
- accelerator
- horn

## S = Sensors

الوسائل اللي بياخد بيها معلومات من البيئة.

مثلاً:

- camera
    
- radar
    
- GPS
    
- speedometer
    

وده ظاهر بشكل واضح في سلايد PEAS اللي بتسأل:

- Performance: how agent be assessed?
- Environment: what elements exist around agent?
- Actuators: how agent change the environment?
- Sensors: how agent sense the environment?

---

# 6) مثال PEAS: Taxi Driver

الجدول في السلايد عرض مثال **Taxi Driver** بالشكل ده تقريبًا:

- **Performance Measure**:
    
    - safe
        
    - fast
        
    - legal
        
    - comfortable trip
        
    - maximize profits
        
    - minimize impact on other road users
        
- **Environment**:
    
    - roads
        
    - traffic
        
    - police
        
    - pedestrians
        
    - customers
      
    - weather
- **Actuators**:
    - steering
    - accelerator
    - brake
    - signal
    - horn
    - display
    - speech
- **Sensors**:
    
    - cameras
        
    - radar
        
    - speedometer
        
    - GPS
        
    - engine sensors
        
    - accelerometer
        
    - microphones
        
    - touchscreen
        

### نفهم المثال ده إزاي؟

المثال ده بيقول لك:  
مش كفاية أقول “ده agent” وخلاص  
لازم أوصف:

- هدفه
- بيتعامل مع إيه
- بياخد input إزاي
- وبينفذ output إزاي

ودي طريقة التفكير اللي هتحتاجها جدًا في الامتحان وفي الأسئلة العملية.

---

# 7) أمثلة PEAS تانية

السلايدات كمان عرضت أمثلة تانية:

## Part-picking robot

- Performance: نسبة الأجزاء اللي اتحطت صح + السرعة
- Environment: conveyor belt + parts + bins
- Actuators: jointed arm and hand
- Sensors: camera + joint angle sensors

### تفسيره

روبوت في مصنع بيلقط قطع ويحطها في صناديق معينة.  
هقول إنه شغال كويس لو:

- بيحط القطعة في المكان الصحيح
- بسرعة
- مع أقل أخطاء

---

## Medical diagnosis system

- Performance: healthy patient + reduced cost / تقليل التكاليف
- Environment: patient + hospital + staff
- Actuators: display of questions, tests, diagnoses, treatments
- Sensors: touch/voice input of symptoms and findings أو keyboard entry بحسب السلايدات المختلفة

### تفسيره

السيستم الطبي ده Agent لأن:

- بياخد بيانات من المريض
- يحللها
- يقترح تشخيص أو علاج

هو مش بيحرك دراع ميكانيكي، لكن الـ action هنا ممكن يكون:

- عرض أسئلة
- طلب تحاليل
- إظهار تشخيص

يعني الـ action مش لازم يكون ميكانيكي، ممكن يكون **قرار أو عرض معلومات**.

---

## أمثلة أخرى في الجدول

السلايد كمان عرض:

- Satellite image analysis system
    
- Refinery controller
    
- Interactive English tutor
    

وده معناه إن الـ Agent مش لازم يكون Robot فقط، ممكن يكون:

- برنامج
    
- نظام تعليمي
    
- نظام تحكم صناعي
    
- نظام تحليل صور
    

---

# 8) Assignment الموجود في المحاضرة

في سلايد واضح مكتوب فيه:  
**Design the agent for your projects? (PEAS)**

وده معناه إنك ممكن يتطلب منك:

- تختار مشروع
    
- وتكتب له PEAS
    

وده سؤال متوقع جدًا.

---

# 9) Environment Properties – ODESDA

---

# 10) Fully Observable vs Partially Observable

## Fully Observable

يعني الـ Agent يقدر يشوف **الحالة الكاملة للبيئة** في كل لحظة.  
مثال السلايد: **Chess**.

### ليه الشطرنج Fully Observable؟

لأن كل القطع موجودة قدامك  
مفيش معلومة مخفية

## Partially Observable

يعني الـ Agent ماعندوش وصول كامل لكل حالة البيئة، بسبب:

- محدودية الحساسات
    
- أو noise
    
- أو معلومات ناقصة
    

أمثلة السلايد:

- Card game
    
- Robot in dark room using sonar
    

### الفكرة

لو في معلومات ناقصة، الـ agent غالبًا هيحتاج:

- memory
- internal model

- أو probabilistic reasoning
    

---

# 11) Deterministic vs Stochastic

## Deterministic

الحالة الجاية تتحدد بالكامل من:

- الحالة الحالية
    
- والفعل اللي الـ agent عمله
    

أمثلة السلايد:

- solving mathematical equation
- tic tac toe



### المعنى

لو عملت نفس الحركة في نفس الظروف، النتيجة هتكون نفسها

## Stochastic

فيه عشوائية أو عدم يقين  
مثال:

- weather prediction
    
- financial markets
    
- games with dice زي Ludo
    

### المعنى

حتى لو اخترت نفس الفعل، النتيجة مش مضمونة 100%

---

# 12) Episodic vs Sequential

## Episodic

الخبرة مقسمة لحلقات مستقلة  
كل حلقة = percept + action  
وكل واحدة مستقلة عن اللي قبلها

مثال:

- Image classification


### ليه؟

لأن الصورة الحالية مش معتمدة على الصورة اللي قبلها

## Sequential

القرار الحالي بيأثر على القرارات اللي بعده  
أمثلة:

- Chess
- Autonomous driving


### المعنى

في الأنظمة دي لازم تفكر لقدام، لأن الغلطة دلوقتي ممكن تبوظ اللي بعده

---

# 13) Static vs Dynamic

## Static

البيئة لا تتغير أثناء ما الـ Agent بيفكر  
مثال:

- Crossword puzzle
    

## Dynamic

البيئة ممكن تتغير أثناء التفكير  
مثال:

- Robotic vacuum cleaning while people walk around
    

### الفكرة المهمة

لو البيئة Dynamic، السرعة هنا مهمة جدًا  
لأن لو تأخرت في القرار، الدنيا تكون اتغيرت

---

# 14) Discrete vs Continuous

## Discrete

عدد الحالات أو الأفعال محدود وواضح  
مثال:

- Board games
    

## Continuous

الحالة أو الحركة تتوصف بقيم real numbers  
مثال:

- robotic arm movement
    
- self-driving vehicles
    

### الفرق ببساطة

- Discrete: moves محددة
    
- Continuous: الحركة أو الزمن أو المسافة قيم مستمرة
    

---

# 15) Single-Agent vs Multi-Agent

## Single-Agent

الـ Agent هو الوحيد اللي بيتصرف في البيئة  
مثال:

- solving a maze
    

## Multi-Agent

فيه أكثر من agent في البيئة  
وممكن يكونوا:

- cooperative
    
- أو competitive
    

أمثلة:

- multiplayer video games
    
- stock trading
    

### ملاحظة مهمة

وجود agents تانيين بيخلي القرار أصعب، لأنك مش بتتعامل مع بيئة بس، لكن مع كيانات تانية بتفكر وتتصرف

---

# 16) Simple Reflex Agents

السلايد قال إن **Simple reflex agents**:

- أبسط نوع من الـ agents
    
- تختار action فقط بناءً على current percept
    
- تتجاهل percept history
    
- تستخدم condition-action rules
    

### يعني إيه condition-action rule؟

يعني قاعدة بالشكل:

- If condition → do action
    

مثال:

- لو العربية قدامك وقفت → فرامل
    
- لو في تراب في المكان → شفط
    

### مشكلته الأساسية

السلايد قال بوضوح إنه:

- **has no memory**
    
- **no internal model of the world**
    
- وبالتالي يشتغل بكفاءة فقط في **fully observable environments**
    

### يبقى حفظة مهمة:

Simple Reflex Agent:

- سريع
    
- بسيط
    
- رخيص في التفكير
    
- لكنه محدود جدًا
    

---

# 17) Model-Based Reflex Agents

السلايد عرفه إنه Agent عنده:

- internal memory
    
- أو state  
    وده بيساعده ياخد قرارات حتى لو مش شايف البيئة بالكامل. ويقدر يحدّث الحالة الداخلية لما يستقبل input جديد، وبعدين يستخدم condition-action rules مع الحالي + اللي يعرفه من قبل.
    

### المعنى بالمصري

بدل ما يعيش اللحظة بس، هو:

- فاكر جزء من اللي حصل
    
- عامل model داخلي للعالم
    
- يقدر يكمّل حتى لو بعض المعلومات اختفت
    

### مثال توضيحي

لو عربية كانت قدامك واستخبت ورا شاحنة:

- Simple Reflex ممكن يعتبرها اختفت
    
- لكن Model-Based هيبقى “فاكر” إنها موجودة غالبًا
    

---

# 18) أمثلة على Model-Based Reflex Agents

السلايد ذكر أمثلة زي:

- Self-driving cars
    
- Robotic vacuum cleaners
    
- Video game NPCs
    

### Self-driving car

بتستخدم:

- cameras
    
- LiDAR
    
- radar  
    عشان تبني model ثلاثي الأبعاد للعالم حولها.
    

### Robotic vacuum

بتحفظ خريطة للمكان  
وتعرف إيه اللي اتنضف وإيه لأ

### Video game NPC

تفتكر مكان اللاعب أو آخر حركة ليه

---

# 19) Goal-Based Agents

من نتائج البحث في الملف، المحاضرة كمان شرحت **Goal-based agents**، وقالت إنها:

- لا تكتفي برد الفعل الحالي
    
- لكن تعمل وفي بالها **Goal**
    
- وهي امتداد لفكرة model-based reflex agents
    
- مثالها: التاكسي عند المفترق لا يختار أي طريق عشوائي، بل يفكر في وجهة الراكب
    

### الفرق بينها وبين Reflex

- Reflex: “أنا شايف إيه دلوقتي؟”
    
- Goal-based: “أنا عايز أوصل لفين؟”
    

### مثال

Self-driving car:

- Goal: الوصول للوجهة بأمان
    
- لو لقت roadblock تغيّر المسار وتستمر نحو الهدف
    

---

# 20) Utility-Based Agents

المحاضرة كمان أوضحت إن **Goals وحدها ليست دائمًا كافية**، لأن أكثر من طريق قد يحقق الهدف، لكن بدرجات جودة مختلفة. عشان كده Utility-based agents تستخدم **utility function** تقيس قد إيه النتيجة مرغوبة أو “مُرضية”. مثال: التاكسي لا يريد فقط الوصول، بل يفكر هل الطريق أسرع، أكثر أمانًا، أو أقل تكلفة.

### الفرق المهم

- Goal-based: هل حققت الهدف أم لا؟
    
- Utility-based: أي نتيجة أفضل من غيرها؟
    

### مثال سهل

لو عندك طريقين يوصّلوك:

- طريق 1 سريع لكنه مزدحم وخطر
    
- طريق 2 أبطأ شوية لكنه آمن ورخيص
    

الـ utility-based agent يختار حسب “أفضلية” النتيجة، مش مجرد الوصول

---

# 21) Learning Agents

المحاضرة كمان فيها جزء عن **Learning agents**، وعرفته إنهم أنظمة ذكية تتحسن مع الوقت من خلال الخبرة، وتتكيف مع البيئات الجديدة أو غير المعروفة. وبيكون عندهم مكونات أساسية:

- learning element
    
- performance element
    
- critic
    
- problem generator  
    والهدف منها اتخاذ قرارات أفضل بناءً على feedback والخبرات السابقة.
    

### معناها ببساطة

ده agent مش بس بيشتغل  
ده كمان:

- يغلط
    
- يتعلم
    
- يحسّن نفسه
    

### مثال

سيستم توصية أفلام  
كل ما المستخدم يتفاعل أكتر:

- السيستم يفهم ذوقه
    
- ويطلع اقتراحات أحسن
    

---

# 22) ربط كل الأنواع ببعض

عشان الصورة تثبت:

## Simple Reflex

- يعتمد على الحالي فقط
    
- بدون memory
    

## Model-Based Reflex

- يعتمد على الحالي + state داخلي
    
- مناسب مع partial observability
    

## Goal-Based

- بيفكر في الهدف النهائي
    

## Utility-Based

- بيفكر في أفضل نتيجة، مش أي نتيجة
    

## Learning Agent

- بيتحسن مع الوقت من الخبرة
    

---

# 23) أهم فكرة “Rational Agent”

رغم إن السلايدات المعروضة قدامنا مش فيها شرح نصي كبير للرشنالية، لكن من سياق الفصل نفسه، الجزء ده مقصوده:  
الـ **Rational Agent** هو agent يختار الفعل اللي يحقق أفضل أداء ممكن حسب:

- المعلومات المتاحة له
    
- الـ percept sequence
    
- والـ performance measure
    

يعني الـ rational مش معناه “عارف كل حاجة”  
لكن معناه:  
**بياخد أفضل قرار ممكن بناءً على اللي يعرفه حاليًا**

وده مهم جدًا لأن الطلبة أحيانًا يفتكروا rational = perfect  
وده مش لازم

---

# 24) إيه المطلوب منك غالبًا في الامتحان؟

من المحاضرة دي غالبًا الأسئلة تيجي في أشكال زي:

## تعريفات

- عرف agent
    
- عرف PEAS
    
- عرف simple reflex agent
    
- عرف model-based reflex agent
    

## Compare

- fully vs partially observable
    
- deterministic vs stochastic
    
- episodic vs sequential
    
- static vs dynamic
    
- discrete vs continuous
    
- single-agent vs multi-agent
    

## تطبيق

- صمّم PEAS لمشروع معين
    
- صنّف البيئة بتاعة نظام معين حسب ODESDA
    
- حدّد نوع الـ agent المناسب
    

---

# 25) إزاي تجاوب سؤال PEAS؟

لو جالك مشروع، امشي كده:

## مثال: Smart Attendance System

- Performance:
    
    - accuracy
        
    - speed
        
    - reduce cheating
        
- Environment:
    
    - students
        
    - classrooms
        
    - schedules
        
    - network
        
- Actuators:
    
    - mark attendance
        
    - send notifications
        
    - generate reports
        
- Sensors:
    
    - QR scanner
        
    - camera
        
    - location / user input
        

أهم حاجة ما تخلطش بين:

- Sensor = بياخد بيها input
    
- Actuator = ينفذ بيها action
    

---

# 26) إزاي تحفظ ODESDA بسهولة؟

احفظها كأزواج:

- Observable ↔ Partially Observable
    
- Deterministic ↔ Stochastic
    
- Episodic ↔ Sequential
    
- Static ↔ Dynamic
    
- Discrete ↔ Continuous
    
- Agent ↔ Multi-Agent
    

واسأل نفسك في أي نظام:

- هل شايف كل حاجة؟
    
- هل النتيجة مضمونة؟
    
- هل كل قرار مستقل؟
    
- هل البيئة ثابتة؟
    
- هل الحالات محددة ولا مستمرة؟
    
- هل في agent واحد ولا أكتر؟
    

---

# 27) الخلاصة الكبيرة للمحاضرة

المحاضرة كلها بتقول لك 3 أفكار كبار:

## أولًا

أي نظام ذكي لازم يتفهم من خلال:

- البيئة
    
- المدخلات
    
- المخرجات
    
- معيار النجاح  
    وده PEAS
    

## ثانيًا

مش كل البيئات شبه بعض  
ولازم تصنّف البيئة قبل ما تختار نوع الـ agent  
وده ODESDA

## ثالثًا

الـ agents ليها درجات:

- Simple Reflex
    
- Model-Based
    
- Goal-Based
    
- Utility-Based
    
- Learning Agents  
    وكل ما البيئة تبقى أصعب، غالبًا تحتاج agent أذكى وأغنى في التمثيل واتخاذ القرار.
    

---

# 28) ملخص سريع للحفظ

- **PEAS** = Performance, Environment, Actuators, Sensors
    
- **Task Environment** = المشكلة اللي الـ agent بيشتغل عليها
    
- **Fully observable** = شايف كل حاجة
    
- **Partially observable** = شايف جزء فقط
    
- **Deterministic** = نفس الفعل يدي نفس النتيجة
    
- **Stochastic** = فيه عشوائية
    
- **Episodic** = كل موقف مستقل
    
- **Sequential** = القرار الحالي يأثر على اللي بعده
    
- **Static** = البيئة ثابتة
    
- **Dynamic** = البيئة بتتغير
    
- **Discrete** = حالات محددة
    
- **Continuous** = قيم مستمرة
    
- **Simple Reflex** = بدون memory
    
- **Model-Based** = عنده state داخلي
    
- **Goal-Based** = يعمل لتحقيق هدف
    
- **Utility-Based** = يختار أفضل نتيجة
    
- **Learning Agent** = يتعلم من الخبرة
    

---

لو تحب، أقدر أحول لك ده كمان إلى **أسئلة وأجوبة للمذاكرة** أو **نوتس مختصرة جدًا ليلة الامتحان**.