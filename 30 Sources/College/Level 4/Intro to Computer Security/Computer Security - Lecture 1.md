---
title: "Computer Security - Lecture 1"
aliases: []
type: source
status: active
domain: computer-science
tags: [source, computer-science, course]
created: 2026-10-16
updated: 2026-11-01
source:
related: []
---
# What is Information Security 

> Information security means protecting information andinformation system from unauthorized access, use,modification or destruction [[Lecture 1.pdf#page=2&selection=4,0,27,28&markId=6982234c985e1d5b|↗]]

![[Pasted image 20261016202106.png]]

## What's CIA in Cryptography?
 
> CIA \=\= Confidentiality, Integrity, and Availability [[Lecture 1.pdf#page=3&selection=4,0,4,51&markId=4860df6091b4ecd5|↗]]

- Confidentiality
	- aims to prevent unauthorized reading information
- Integrity
	- Detect unauthorized writing of information
- Availability
	- Data is available in a timely manner when needed

--- 

- Cryptology
	- The art and science of makingand breaking “secret codes”
- Cryptography 
	- making “secret codes”
- Cryptanalysis 
	- breaking “secret codes”

## Terminology:



![[Pasted image 20261016203038.png]]

- Plaintext
	- original message
- Ciphertext
	- encrypted or coded message
- Encryption 
	- convert from plaintext to ciphertext(enciphering)
- Decryption
	- restore the plaintext from ciphertext(deciphering)
- Key
	- information used in cipher known only tosender/receiver
- Cipher
	- a particular algorithm (cryptographic system) [[Lecture 1.pdf#page=5&selection=4,0,69,45&markId=d76714bc3dd9b6de|↗]]

---

### How to Speak Crypto?

1. cipher or cryptosystem is used to encryptthe plaintext [[Lecture 1.pdf#page=6&selection=6,0,18,9&markId=16f4b0e12717e059|↗]]
2. result of encryption is ciphertext [[Lecture 1.pdf#page=6&selection=22,4,24,10&markId=524160cecf00d3e0|↗]]
3. We decrypt ciphertext to recover plaintext [[Lecture 1.pdf#page=6&selection=28,0,32,31&markId=66ba00afa8e56618|↗]]
4. key is used to configure a cryptosystem [[Lecture 1.pdf#page=6&selection=38,0,40,35&markId=8524307263f1c85d|↗]]

#### Symmetric Key:
- symmetric key cryptosystem uses the samekey to encrypt as to decrypt [[Lecture 1.pdf#page=6&selection=46,0,50,28&markId=1f53f02537417771|↗]]
![[Pasted image 20261016203623.png]]
#### Public (Asymmetric) Key

> cryptosystem uses a public key to encrypt and a private keyto decrypt [[Lecture 1.pdf#page=6&selection=58,0,67,10&markId=2f1fa39fbcfef696|↗]]

![[Pasted image 20261016203719.png]]

---
# Crypto

- Basic assumptions
	- The system is completely known to the attacker
	- Only the key is secret
	- That is, crypto algorithms are not secret
- This is known as ==Kerckhoffs’ Principle==
- All encryption algorithms are based on two general principles:
	1. substitution: in which ==🟡each element in the plaintext== (bit,letter, group of bits or letters) ==🟡is mapped into another element.==
	2. Transposition: in which ==elements in the plaintext are rearranged==.
-  The fundamental requirement is that no information be lost(that is, that all operations are reversible). [[Lecture 1.pdf#page=9&selection=2,0,52,46&markId=6f8707949fbacee6|↗]]

---

## Classic Cryptosystems 

> – Rail Fence cipher
> – Columnar Transposition cipher
> – Double transposition cipher
> – Simple Substitution cipher
> – Playfair cipher
> – One time pad cipher
> – Vigenere Cipher– Affine Cipher
> – Hill Cipher [[Lecture 1.pdf#page=10&selection=10,0,46,11&markId=9fc76c7226519aed|↗]]

---

### Rail Fence Cipher

> The plaintext is written down as a sequence ofdiagonals and then read off as a sequence of rows [[Lecture 1.pdf#page=14&selection=4,0,6,49&markId=6fe32b59695fb4ae|↗]]

> you have to write your message in zigzag lines across thepage [[Lecture 1.pdf#page=11&selection=4,50,7,4&markId=733ca43d979e99d8|↗]]

> then read off each row. [[Lecture 1.pdf#page=11&selection=7,10,7,33&markId=b58d24ed8eecbdf4|↗]]

#### Encryption:

1. you need to have a key the number of rows you are going to have

2. then start writing the letters of the plaintext ==diagonally== down to the right until you reach the number of rows specified by the key. [[Lecture 1.pdf#page=11&selection=17,4,37,36&markId=b49a1887a273169c|↗]]

3. You then bounce back up diagonally until you hit the first row again. [[Lecture 1.pdf#page=11&selection=41,0,43,16&markId=1f6b13c0d8a2c8bb|↗]]

4.  This continues until the end of the plaintext. [[Lecture 1.pdf#page=11&selection=47,0,47,46&markId=f4a5e96cd5a1100b|↗]]
![[Pasted image 20261016205315.png]]

#### Decryption

1. start by making a grid with ==as many rows as the key is== , and ==as many columns as the length of the ciphertext==. [[Lecture 1.pdf#page=15&selection=4,3,7,15&markId=57a68313139cfd69|↗]]
2. then place the first letter in the top leftsquare, and dashes diagonally downwards wherethe letters will be. [[Lecture 1.pdf#page=15&selection=11,3,14,20&markId=1fbd7aeda6a0d599|↗]]
3. we get back to the top row, we place thenext letter in the ciphertext. Continue like thisacross the row, and start the next row when youreach the end. [[Lecture 1.pdf#page=15&selection=18,5,23,14&markId=f2be81354301a71|↗]]
![[Pasted image 20261016211410.png]]

---
#### Cryptanalysis 

- The cipher's key is N the number of rails
	- N is known, the ciphertext can be decrypted by using the previous algorithm.
-  If Values of N equal to or greater than L(the length of theciphertext) will not be usable then the ciphertext is the same as the plaintext.
- Therefore the number of usable keys is low, ==allowing the brute-force attack of trying all possible keys.==
-  As a result, the rail-fence cipher is considered weak.

---

### Columnar Transposition Cipher

#### Encryption

نشرحها بالعربي بشكل سريع علشان عسر الفهم مثلا، انت هتكتب المسج او ال `plaintext` سطر سطر في شكل matrix عدد ال columns يساوي طول ال Key المكتوب 
يعني لو انا اديتك 4312567 و ال plaintext بتاعتي هتبقى 
attackpostponeduntiltwoam
ف انا عايز احولها ل cipher text ف اي العمل ؟

دلوقتي علشان نحدد كام row ف انت هتسأل نفسك سؤال اي اقرب عدد للطول بتاع ال plaintext لما تيجي تضرب ال rows ف ال columns ؟
row x columns = Length
Row x 7 = 25
row = 3.xxx 
ف انت هتعمل Ceil ف هتبقى 4

![[Pasted image 20261016214555.png]]

دلوقتي الجملة بتاعتك خلصت وقتها، انت هتعمل اي فالفاضين ؟ حط اي كلام x مثلا او xyz او اي حاجه

هبدأ اقرأ بناءا على ال columns ordering على حسب ترتيب الاعمدة
يعني العمود الاول هيتقرأ الاولى وهكذا لحد ما اوصل لرقم 7

![[Pasted image 20261016215406.png]]

فهيطلع معانا بالشكل دا

دا بالنسبة لل encryption

---

#### Decryption

في الـ Encryption كنا بنكتب الـ Plaintext في شكل Matrix، وبعدها بنقرأ الأعمدة حسب ترتيب الأرقام الموجودة في الـ Key.

أما في الـ Decryption فهنعمل العكس: هنرجّع كل مجموعة حروف للعمود الصحيح بتاعها، وبعدها نقرأ الـ Matrix بالعرض (Row by Row) علشان نرجع للـ Plaintext الأصلي.

- **Key:** `4312567`
    
- **Ciphertext:** `TTNA APTM TSUO AODW COIX KNLY PETZ`
    
أول حاجة هنشيل المسافات من الـ Ciphertext ونحسب عدد الحروف.
- Ciphertext Length = 28
- Key Length = 7
    
عدد الـ Columns بيساوي طول الـ Key، وبالتالي عندنا 7 Columns.

علشان نحسب عدد الـ Rows:

`Rows = Ciphertext Length / Key Length`

`Rows = 28 / 7 = 4`

إذن عندنا Matrix مكونة من 4 Rows و7 Columns.


الـ Key بتاعنا هو:

`4 3 1 2 5 6 7`

كل رقم بيوضح ترتيب قراءة العمود أثناء الـ Encryption.

في الـ Decryption لازم نرجع كل مجموعة حروف للعمود اللي يطابق ترتيبها في الـ Key.

- المجموعة الأولى `TTNA` تروح للعمود الثالث، لأن رقمه في الـ Key هو 1.
- المجموعة الثانية `APTM` تروح للعمود الرابع، لأن رقمه 2.
- المجموعة الثالثة `TSUO` تروح للعمود الثاني، لأن رقمه 3.
- المجموعة الرابعة `AODW` تروح للعمود الأول، لأن رقمه 4.
- المجموعة الخامسة `COIX` تروح للعمود الخامس، لأن رقمه 5.
- المجموعة السادسة `KNLY` تروح للعمود السادس، لأن رقمه 6.
- المجموعة السابعة `PETZ` تروح للعمود السابع، لأن رقمه 7.

نقسم الـ Ciphertext لمجموعات، كل مجموعة فيها 4 حروف، لأن عندنا 4 Rows.

بعد كده نحط كل مجموعة في العمود الصحيح حسب الـ Key.

|Column|Key Number|Characters|
|---|---|---|
|1|4|AODW|
|2|3|TSUO|
|3|1|TTNA|
|4|2|APTM|
|5|5|COIX|
|6|6|KNLY|
|7|7|PETZ|

بعد ملء الأعمدة، نقرأ الـ Matrix بالعرض، من الشمال لليمين، صفًا صفًا.

بعد قراءة الصفوف، المفروض نرجع للـ Plaintext الأصلي.

النص المتوقع في المثال:

`ATTACKPOSTPONEDUNTILTWOAM`

Meaning: Attack postponed until two AM.

![[Pasted image 20261016221629.png]]

---

> The columnar transposition cipher is not the easiest oftransposition ciphers to break, but there are statistical properties of language that can be exploited to recover the key. [[Lecture 1.pdf#page=25&selection=4,0,9,8&markId=976a8c6206092baa|↗]]

> To greatly increase the security, a substitution ciphercould be employed as well as the transposition.• A peculiarity of transposition ciphers is that thefrequency distribution of the characters will be identicalto that of natural text (since no substitutions have beenperformed, it is just the order that has been mixed up). [[Lecture 1.pdf#page=25&selection=13,0,35,56&markId=f4c09643a2d617ab|↗]]

---

### Double Transposition Cipher

#### Encryption

بص يا سيدي، الـ Double Transposition شبه الـ Columnar Transposition، بس بدل ما نغيّر ترتيب الـ Columns بس، إحنا هنا هنغيّر ترتيب الـ Rows والـ Columns كمان.

يعني عندنا خطوتين بنعملهم بالترتيب:

1. Row Permutation
2. Column Permutation

خلينا ناخد المثال بتاعنا:

- **Plaintext:** `attackatdawn`
- **Matrix Size:** `3 × 4`

أول حاجة هنكتب الـ Plaintext جوه الـ Matrix سطر سطر، بحيث يكون عندنا 3 Rows و4 Columns.

|a|t|t|a|
|---|---|---|---|
|c|k|a|t|
|d|a|w|n|

دلوقتي عايزين نعمل Transposition، يعني نغيّر ترتيب الصفوف والأعمدة حسب الـ Permutations اللي السؤال مديهالنا.

**Step 1: Row Permutation**

السؤال بيقول:

`(1, 2, 3) → (3, 2, 1)`

يعني هنغيّر ترتيب الصفوف بحيث:

- الـ Row 1 يروح مكان الـ Row 3.
- الـ Row 2 يفضل مكانه.
- الـ Row 3 يروح مكان الـ Row 1.

بالتالي الـ Matrix هتبقى:

|d|a|w|n|
|---|---|---|---|
|c|k|a|t|
|a|t|t|a|

**Step 2: Column Permutation**

بعد ما خلصنا ترتيب الصفوف، هنبدأ نغيّر ترتيب الأعمدة.
السؤال بيقول:
`(1, 2, 3, 4) => (4, 2, 1, 3)`

يعني ترتيب الأعمدة الجديد هيكون:

- الـ Column 4 ييجي الأول.
- الـ Column 2 ييجي الثاني.
- الـ Column 1 ييجي الثالث.
- الـ Column 3 ييجي الرابع.

بالتالي الـ Matrix هتبقى:

|n|a|d|w|
|---|---|---|---|
|t|k|c|a|
|a|t|a|t|

**Step 3: Generate Ciphertext**

بعد ما خلصنا تبديل الصفوف والأعمدة، هنقرأ الـ Matrix صف صف يعني Row by Row.

- Row 1: `NADW`
- Row 2: `TKCA`
- Row 3: `ATAT`
    

إذن الـ Ciphertext النهائي:

`NADWTKCAATAT`

---

#### Decryption

في الـ Encryption كنا بنكتب الـ Plaintext في Matrix، وبعدها بنغيّر ترتيب الـ Rows الأول، ثم الـ Columns.

أما في الـ Decryption فهنعمل العكس، يعني هنرجّع الأعمدة الأول، وبعدها الصفوف، علشان نرجع للـ Plaintext الأصلي.

معانا:

- **Ciphertext:** `NADWTKCAATAT`
    
- **Matrix Size:** `3 × 4`
    
- **Row Permutation:** `(1, 2, 3) → (3, 2, 1)`
    
- **Column Permutation:** `(1, 2, 3, 4) → (4, 2, 1, 3)`
    

**Step 1: Write Ciphertext in the Matrix**

أول حاجة هنكتب الـ Ciphertext سطر سطر في Matrix حجمها 3 × 4، لأن عندنا 12 حرفًا.

|n|a|d|w|
|---|---|---|---|
|t|k|c|a|
|a|t|a|t|

**Step 2: Reverse Column Permutation**

فاكر إننا في الـ Encryption رتّبنا الأعمدة بالشكل ده؟

`(1, 2, 3, 4) → (4, 2, 1, 3)`

يعني الأعمدة الجديدة بقت بالترتيب: Column 4، ثم Column 2، ثم Column 1، ثم Column 3.

علشان نفك التشفير، لازم نرجّع كل عمود لمكانه الأصلي.

بمعنى:

- العمود الأول الحالي يرجع للعمود الرابع الأصلي.
    
- العمود الثاني يفضل العمود الثاني.
    
- العمود الثالث يرجع للعمود الأول.
    
- العمود الرابع يرجع للعمود الثالث.
    

بعد ما نرجّع ترتيب الأعمدة، الـ Matrix هتبقى:

|d|a|w|n|
|---|---|---|---|
|c|k|a|t|
|a|t|t|a|

**Step 3: Reverse Row Permutation**

فاكر إننا في الـ Encryption قلبنا ترتيب الصفوف بالشكل ده؟

`(1, 2, 3) → (3, 2, 1)`

علشان نفك التشفير، هنرجّع الصفوف لترتيبها الأصلي:

- الـ Row 1 الحالي يرجع مكان الـ Row 3.
    
- الـ Row 2 يفضل مكانه.
    
- الـ Row 3 الحالي يرجع مكان الـ Row 1.
    

بعد ما نرجّع ترتيب الصفوف، الـ Matrix هتبقى:

|a|t|t|a|
|---|---|---|---|
|c|k|a|t|
|d|a|w|n|

**Step 4: Recover Plaintext**

دلوقتي نقرأ الـ Matrix بالعرض، من الشمال لليمين، صف صف.

- Row 1: `ATTA`
    
- Row 2: `CKAT`
    
- Row 3: `DAWN`
    

إذن الـ Plaintext الأصلي:

`ATTACKATDAWN`

---

**Remember:**

Encryption: Write Matrix → Permute Rows → Permute Columns → Read Rows.

Decryption: Write Matrix → Reverse Columns → Reverse Rows → Read Rows.