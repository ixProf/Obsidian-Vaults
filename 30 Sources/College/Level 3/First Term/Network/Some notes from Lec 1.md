---
title: "Some notes from Lec 1"
aliases: []
type: source
status: active
domain: computer-science
tags: [source, computer-science, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---


### 📡 **Comparison Table of Physical Transmission Media**

| **Medium**                     | **Type** | **Description**                                                    | **Data Rate**                        | **Advantages**                                        | **Disadvantages**                           | **Common Uses**                     |
| ------------------------------ | -------- | ------------------------------------------------------------------ | ------------------------------------ | ----------------------------------------------------- | ------------------------------------------- | ----------------------------------- |
| **Twisted-Pair**               | Guided   | Two insulated copper wires twisted together to reduce interference | 10 Mbps – 10 Gbps                    | Low cost, easy installation, widely used              | Short distance, susceptible to interference | Ethernet, DSL, LANs                 |
| **Coaxial Cable**              | Guided   | Central copper conductor with insulation and shielding             | Up to hundreds of Mbps               | Better noise resistance than twisted-pair             | Thicker, more expensive                     | Cable TV, Cable Internet            |
| **Fiber Optics**               | Guided   | Thin glass fibers transmitting data as light pulses                | Tens to hundreds of Gbps             | Very high speed, long distance, secure, immune to EMI | High cost, difficult installation           | Internet backbone, FTTH             |
| **Terrestrial Radio Channels** | Unguided | Wireless transmission using radio waves through the air            | Depends on technology (WiFi, 4G, 5G) | No cables, supports mobility                          | Interference, limited range                 | WiFi, Cellular networks             |
| **Satellite Radio Channels**   | Unguided | Communication via orbiting satellites                              | Up to hundreds of Mbps               | Wide coverage, remote access                          | High latency, expensive                     | Satellite Internet, TV broadcasting |

---

### 🧠 **Quick Notes**

- **Guided Media** → Twisted-Pair, Coaxial, Fiber
    
- **Unguided Media** → Terrestrial Radio, Satellite
    
- **Fastest & most reliable** → Fiber Optics
    
- **Cheapest & most common** → Twisted-Pair
    
- **Highest latency** → Satellite communication
---
تمام 👌  
ده **جدول شامل لكل Layers في Internet Protocol Stack (الـ 5 Layers)**  
متجمع فيه **التعريف + الوظيفة + تسمية الـ packets + أمثلة بروتوكولات**  
وبالإنجليزي 100% زي الكتاب 👇

---

## 🧱 **Internet Protocol Stack – Layers Summary Table**

|**Layer No.**|**Layer Name**|**Definition**|**Main Functions**|**Packet Name**|**Example Protocols / Technologies**|
|---|---|---|---|---|---|
|**5**|**Application Layer**|Provides network services directly to user applications|Defines application-level communication and message formats|**Message**|HTTP, HTTPS, FTP, SMTP, DNS|
|**4**|**Transport Layer**|Transfers data between end systems|Reliable delivery, flow control, congestion control, multiplexing|**Segment**|TCP, UDP|
|**3**|**Network Layer**|Moves packets from source host to destination host|Routing, logical addressing, forwarding|**Datagram**|IP, ICMP, Routing Protocols (OSPF, BGP)|
|**2**|**Link Layer**|Transfers data between neighboring nodes|Framing, error detection, MAC addressing|**Frame**|Ethernet, WiFi (802.11), PPP, DOCSIS|
|**1**|**Physical Layer**|Transmits raw bits over the physical medium|Bit transmission, signaling, encoding|**Bit**|Fiber, Copper, Radio waves|

---

## 🧠 **Important Exam Notes**

- **Packet naming is VERY important** in exams
    
- Each layer **adds its own header** → _Encapsulation_
    
- Routers work up to:
    - **Layer 3 (Network Layer)**
- Link-layer switches work up to:
    - **Layer 2**
- Hosts (PCs, servers):
    - Implement **all 5 layers**
    

---

## 🔁 **Encapsulation Order (Must Memorize)**

```
Message
→ Segment
→ Datagram
→ Frame
→ Bit
```

---
## Detailed Summary of Networks Under Attack

| **Attack Category**         | **Description & Mechanism**                                                                                                                    | **Impact & Defense**                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Malware Infection**       | Malicious software (malware) infects devices to perform unauthorized tasks3. It often spreads exponentially through self-replication.<br>      | Can delete/corrupt files, install spyware to steal passwords/CC data, or enroll hosts into a **botnet**.<br><br>                              |
| **Denial of Service (DoS)** | Aims to make a network or server unusable by legitimate users by overwhelming it. Common types include vulnerability attacks and flooding.<br> | Results in service outages. **DDoS** (Distributed DoS) uses a botnet to flood a target at an aggregate rate exceeding its capacity ($R$ bps). |
| **Packet Sniffing**         | A passive receiver (sniffer) placed near a wireless or wired transmitter captures every packet sent                                            | Can capture sensitive data like SSNs, passwords, and private messages10. **Defense**: Use cryptography to protect data                        |
| **IP Spoofing**             | Attackers forge packets with fake source addresses to masquerade as a trusted entity.                                                          | Allows attackers to trick routers or systems into executing malicious commands13. **Defense**: Requires end-point authentication.<br>         |

---

### Why the Internet Is Insecure

- **Original Trust Model**: The Internet was designed for a small, transparent community that assumed trust among all participants15.
    
- **Modern Complexity**: Today’s Internet involves anonymous communication and untrusted hardware/software16.
    
- **Intermediaries**: Use of third-party intermediaries like caches and mobility agents adds potential points of compromise17.
    
- **Essential Security**: Because communication rarely happens between fully trusted parties now, security mechanisms are no longer optional but essential18.

---

تمام، ده جدول **بسيط وواضح** يوضح كل جهاز أو مكوّن في الشبكة بيشتغل على أي طبقة من الـ five-layer Internet protocol stack:

|الجهاز / المكوّن|الطبقات اللي بيشتغل عليها|دور الجهاز|
|---|---|---|
|**Hub**|Layer 1 (Physical)|بيبعت الإشارة كهربائيًا لكل المنافذ بدون ما يعرف العناوين|
|**Switch (Link-layer)**|Layers 1 & 2|بيبعت الإطارات للـ MAC address الصح، وكمان بينقل الإشارات على الكابل|
|**Router**|Layers 1, 2 & 3|بيبعت الباكيت للـ IP address الصح، وكمان بينقل الإشارات ويشوف الـ MAC addresses داخل الشبكة المحلية|
|**Firewall**|Layers 3 & 4|بيتحكم في الترافيك حسب الـ IP أو البروتوكول (TCP/UDP)|
|**Server / Host**|Layers 1–5|بيشتغل على كل الطبقات، من استقبال الإشارة لحد تشغيل التطبيقات|
|**Access Point (Wi-Fi)**|Layers 1 & 2|بينقل البيانات لاسلكيًا وبيتعامل مع MAC addresses|
|**Modem**|Layer 1|بيحوّل الإشارة من الرقمية للتماثلية أو العكس، مجرد انتقال فيزيائي|

**ملاحظات سريعة:**

- كلما نطلع لفوق في الطبقات، كل جهاز بيشتغل على طبقات أكتر (السيرفر أو الكمبيوتر بيشتغل على كل الطبقات).

- الأجهزة زي switch و hub و AP شغلهم الأساسي في الطبقات السفلى، علشان ينقلوا البيانات بسرعة، من غير ما يهتموا بمحتوى البيانات أو التطبيقات.
    

لو تحب، أقدر أعمللك **نسخة صغيرة كده تصلح لثريد على X**، كل طبقة مع أمثلة أجهزتها بشكل مختصر وسهل. تحب أعملها؟

---

تمام، ده جدول **مختصر وواضح بالإنجليزي** لكل طبقة في **OSI model** مع الوظائف الأساسية وأمثلة على الأجهزة أو البروتوكولات:

|OSI Layer|Main Functions|Examples / Devices|
|---|---|---|
|**7. Application**|Interface for applications, user services, network processes|HTTP, FTP, SMTP, DNS, Web browsers, Email clients|
|**6. Presentation**|Data translation, encryption, compression|JPEG, MPEG, SSL/TLS, ASCII ↔ Unicode|
|**5. Session**|Establishing, managing, terminating sessions between apps|NetBIOS, RPC, PPTP|
|**4. Transport**|End-to-end communication, reliability, flow control|TCP, UDP, SCTP|
|**3. Network**|Routing, logical addressing, packet forwarding|IP, ICMP, Routers|
|**2. Data Link**|Framing, MAC addressing, error detection/correction|Ethernet, Wi-Fi, Switches, Bridges|
|**1. Physical**|Transmission of raw bits, electrical/optical signals|Cables, Hubs, Modems, Fiber optics|

لو تحب، أقدر كمان أعمل **نسخة أصغر تصلح لثريد أو مراجعة سريعة**، بحيث كل طبقة تتكتب في سطر واحد مع أهم وظيفة وجهاز/بروتوكول.

تحب أعملها؟