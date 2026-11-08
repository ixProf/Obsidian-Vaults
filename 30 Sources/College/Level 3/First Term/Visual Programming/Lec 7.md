---

## **Comprehensive Summary: String and Character Processing**

title: "Lec 7"
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
## I. Introduction to String and Character Processing

- Text processing is essential for many programming tasks such as password validation (checking length, digits, uppercase/lowercase letters).
    
- C# provides powerful tools for working with strings, including accessing and manipulating individual characters within text.
    

---

## II. The `char` Data Type

**Definition**

- The `char` data type represents a **single character**.
    

**Storage**

- A `char` variable can store **only one character** at a time.
    

**Syntax**

- Character literals use **single quotes**: `'g'`
    
- Strings use **double quotes**: `"hello"`
    

**Relationship Between `char` and `string`**

- A string is a collection (sequence) of characters.
    
- Individual characters in a string can be accessed using an index:
    
    - `name[0]` → first character
        
- Indexing is **zero-based**.
    

**Iteration Through a String**

- You can loop through characters using:
    
    - `for` loop
        
    - `foreach` loop
        

---

## III. Character Inspection and Conversion

The `char` structure provides static methods to inspect and convert characters.

### Character Inspection Methods

(These methods return `true` or `false`)

- `char.IsDigit(ch)` → checks if the character is a digit (0–9)
    
- `char.IsLetter(ch)` → checks if the character is a letter
    
- `char.IsLetterOrDigit(ch)` → checks if it is a letter or digit
    
- `char.IsLower(ch)` → checks if the letter is lowercase
    
- `char.IsUpper(ch)` → checks if the letter is uppercase
    
- `char.IsWhiteSpace(ch)` → checks for whitespace (space, tab, newline)
    
- `char.IsPunctuation(ch)` → checks for punctuation symbols
    

### Character Conversion Methods

- `char.ToLower(ch)` → converts character to lowercase
    
- `char.ToUpper(ch)` → converts character to uppercase
    

---

## IV. String Search Methods

C# provides built-in methods to search within strings.

- **`Contains(substring)`**
    
    - Returns `true` if the substring exists in the string, otherwise `false`.
        
- **`IndexOf(substring)`**
    
    - Returns the index of the **first occurrence** of the substring.
        
    - Returns `-1` if the substring is not found.
        
- **`LastIndexOf(substring)`**
    
    - Returns the index of the **last occurrence** of the substring.
        
    - Returns `-1` if not found.
        

---

## V. String Extraction and Modification

- **`Substring(startIndex)`**
    
    - Returns characters from `startIndex` to the end of the string.
        
- **`Substring(startIndex, length)`**
    
    - Returns a portion of the string starting at `startIndex` with the specified length.
        
- **`Insert(index, value)`**
    
    - Inserts text at a specific position.
        
    - Returns a **new string**.
        
- **`Remove(startIndex, count)`**
    
    - Removes a specified number of characters.
        
    - Returns a **new string**.
        
- **`Trim()`**
    
    - Removes whitespace from both the beginning and end of the string.
        
- **`TrimStart()` / `TrimEnd()`**
    
    - Remove whitespace from one side only.
        

---

## VI. Formatting Strings (`PadLeft` and `PadRight`)

These methods are used to align text output.

- **`PadLeft(totalWidth, paddingChar)`**
    
    - Adds padding characters to the **left** until the total width is reached.
        
- **`PadRight(totalWidth, paddingChar)`**
    
    - Adds padding characters to the **right**.
		
	- لو النص اكبر من ال totalwidth مش هيقدر يضيف حاجة
	- لو مفيش paddingChar هيتعامل معاها ك whitespcae
---

## VII. The Timer Control

**Purpose**

- A component that triggers an event at fixed time intervals.
    
- Common uses include clocks, animations, slideshows, and periodic updates.
    

**Key Properties**

- `Interval` → time between ticks in milliseconds (1000 = 1 second)
    
- `Enabled` → starts (`true`) or stops (`false`) the timer
    

**Methods**

- `Start()` → starts the timer
    
- `Stop()` → stops the timer
    

**Event**

- `Tick` → occurs every time the interval elapses
    

---

## II. Defaults Mentioned in the Lecture

1. **`IndexOf` Default Return**
    
    - Returns **`-1`** if the substring is not found.
        
2. **`Substring` Default Length**
    
    - If length is omitted, characters are returned **from the start index to the end of the string**.
        
3. **`Trim` Default Behavior**
    
    - Removes **whitespace characters** from both ends of the string.
        
4. **`PadLeft` / `PadRight` Default Padding**
    
    - Uses a **space character `' '`** if no padding character is specified.
        

---

## III. Common Errors and Their Causes

|Error Description|Code Example|Cause|
|---|---|---|
|String-to-Char Assignment Error|`char letter = "g";`|Strings (`" "`) and characters (`' '`) are different data types.|
|Read-Only Character Access|`str[0] = 'H';`|Strings are immutable; characters can be read but not modified directly.|
|Validation Logic Error|_(Concept)_|Failing to check if `IndexOf` returns `-1` leads to incorrect validation logic.|

---

لو حابب:

- أمثلة C# على كل method
    
- ملخص أقصر للمراجعة قبل الامتحان
    
- أسئلة MCQ + صح وغلط
    
- شرح بالمصري خطوة خطوة
    

قولّي 👌