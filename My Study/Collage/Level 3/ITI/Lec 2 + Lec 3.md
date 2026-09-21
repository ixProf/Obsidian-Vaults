
السلام عليكم ورحمة الله وبركاته، التلخيص دا شامل كل ال Built-in Objects ال 9 الي كانوا 5 ف المحاضرة التانية و 4 فالمحاضرة التالتة ف قولت اضيفهم على بعض احسن. وتلخيص باقي المحاضرة التالتة هيكون بعده إن شاء الله.
# JavaScript Objects

JavaScript objects fall into **four main families**:

1. **Custom Objects** – Created by developers for specific needs
2. **Built-in Objects** – Ready-to-use tools provided by JavaScript
3. **BOM Objects** (Browser Object Model) – Control the browser environment
	- The BOM deal with the characteristic and properties of the web browser  
4. **DOM Objects** (Document Object Model) – Make web pages dynamic and interactive
	- the DOM provides the ability for a JS Script to access, manipulate, and extend the content of a web page dynamically

---
# Built-in Objects

### **1. String:**

- **Definition:** "Enables us to work with and manipulate strings of text".

- **Functionality:** It has methods to manipulate content (like `substring`, `replace`) , manipulate appearance (like `bold`, `fontcolor`) , and convert strings to HTML elements.

### **2. Math:**

- **Definition:** "Allows you to perform common mathematical tasks".

- **Functionality:** It is a **static object** (you don't create an instance of it) used for calculations like `Math.PI` (constants), `Math.round`, `Math.sqrt`, and `Math.random`.

### **3. Array:**

- **Definition:** Used to store and manage collections of data. The slides also mention **Associative Arrays**, which "provide let you specify key-value pairs" using strings as keys instead of numbers.

- **Functionality:** It includes methods to modify the list such as `push`, `pop`, `reverse`, `sort`, and `join`.

### **4. Date:**

- **Definition:** "To obtain and manipulate the date and time in a script".

- **Functionality:** It uses methods to **get** time details (like `getDate`, `getFullYear`) and **set** time details (like `setHours`), or convert dates to strings (`toUTCString`).

### **5. Object (Literal Object):**

- **Definition:** "An unordered list of primitive data types (and sometimes reference data types) that is stored as a series of name-value pairs".
    
- **Functionality:** It allows grouping related data and functions (methods) together without needing to create a class instance first.

### **6. Number:**

 - **Definition:** An object that represents numeric values.
    
- **Functionality:** While you usually use simple numbers (like `x = 5`), the Number object provides constants (like `MAX_VALUE`) and methods to format numbers (like fixing decimal points).

### **7. RegExp (Regular Expression)**

- **Definition:** An object used to describe a pattern of characters.
- **Functionality:** It is mainly used to search for or replace patterns within strings. The lecture demonstrates this inside the `replace()` method using slashes `/ /` syntax.
### **8. Boolean**

- **Definition:** An object wrapper for logical values.
    
- **Functionality:** It allows you to create objects that represent `true` or `false`. It is often used to convert other data types into a true/false value (e.g., 0 is false, 1 is true).
### **9. Error**

- **Definition:** An object that represents a runtime error.
    
- **Functionality:** When a script fails, an Error object is created containing details like the error name and message. This helps developers fix (debug) the code.
---
# 1. String Objects:

Used to manipulate text. It has one main property: `length`.
**Key Methods:**
- **Finding Content:**
    - `charAt(index)`: Returns the character at a specific index.
    - `indexOf(string)`: Finds the _first_ occurrence of a text (returns `-1` if not found).
    - `lastIndexOf(string)`: Finds the _last_ occurrence.
- **Extracting & Modifying:**
    - `substring(start, end)`: Extracts a portion of the text.
    - `replace(old, new)`: Swaps text. 
	    - ***You can use regex (`/e/g`) to replace all occurrences.***
    - `toLowerCase()` / `toUpperCase()`: Changes text case.
- **HTML Wrappers (Old School):**
    - The lecture lists methods that wrap text in HTML tags, like 
	    - **`.bold()`**: Displays the string in bold by wrapping it in `<b>` tags.
		- **`.italics()`**: Displays the string in italics by wrapping it in `<i>` tags.
		- **`.fontsize(size)`**: Sets the font size of the string by wrapping it in `<font size="...">` tags.
		- **`.fontcolor("green")`**: Sets the text color of the string by wrapping it in `<font color="...">` tags.
		- **`.link("url")`**: Creates a hyperlink by wrapping the string in an `<a>` anchor tag with an `href` attribute.
		- **`.strike()`**: Displays a line through the text (strikethrough) by wrapping it in `<strike>` tags.
		- **`.sup()`**: Displays the text as a superscript by wrapping it in `<sup>` tags.
		- **`.toLowerCase()`**: Converts all characters in the string to lowercase letters.
		- **`.toUpperCase()`**: Converts all characters in the string to uppercase letters

---
# 2. Math Objects:

This is a **static object**, meaning you don't use `new Math()`; you just call it directly.

- **Constants:** 
	- `Math.PI` (3.14...)
	- `Math.E` (Euler's constant).
- **Common Methods:**
    - **Rounding:** 
	    - `Math.floor(8.9)`: Rounds the number ==**down** to the nearest integer== by removing the decimal part completely. → 8
	    - `Math.ceil(8.1)` Rounds the number ==**up** to the nearest integer==, increasing it if there is any decimal value. → 9
	    - `Math.round(.567)` Rounds the number to the nearest integer standardly ==(rounds up if fraction is ≥ 0.5, rounds down if < 0.5). ==→ 1.
	    -  بص بإختصار floor بتقرب لأقل رقم صحيح يعني كأنك هتشيل الارقام العشرية الي جنب الرقم، Ceil هتقرب لأكبر رقم صحيح ليه حتى لو حطيت 1 من عشرة عادي هتقربه، Round التقريب الي احنا متعودين عليه لو اكبر من .5 هيقرب لأعلى لو اقل من .5 هيقرب لأقل

    - **Calculation:** 
	    - `Math.pow(2, 3)` (Power),
	    - `Math.sqrt(9)` (Square root), `Math.abs(-5)` (Absolute value).
    - **Min/Max:** 
	    - `Math.max(1, 700)`
	    - `Math.min(1, 700)`.
    - **Random:** 
	    - `Math.random()` gives a number between 0 and 1.
    - **Trig:**
	    - **`cos(n)`**: Returns the cosine of a number (angle in radians).
		- **`sin(n)`**: Returns the sine of a number (angle in radians).
		- **`tan(n)`**: Returns the tangent of an angle.
		- **`acos(n)`**: Returns the arccosine (in radians) of a number.
		- **`asin(n)`**: Returns the arcsine (in radians) of a number.
		- **`atan(n)`**: Returns the arctangent (in radians) of a number.
		- **`exp(n)`**: Returns the value of $E^n$ (Euler's number raised to the power of n).
		- **`log(n)`**: Returns the natural logarithm (base $E$) of a number.
---
# 3. Array Objects:

انا شايف انكم تروحوا تشوفوا الموقع بتاع Mozilla افضل لأنه ملخص فيها كل حاجة ومش محتاج تلخيص

تبص على Description و بعدها تروح على الExamples الي فالنص اعتقد مش وقت انك تبص عليه دلوقتي، الفاينال يوم الجمعة
بس خلينا نعمل جدول بسيط فيه الميثودس وبيعملوا ايه

| **Method**                                | **Description**                                                                                                             | **Example & Result**                                                                                                                                                 |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`join()`**                              | Joins all elements of an array into a single string. You can specify a separator (like `*`).                                | `arr1.join("*")`<br><br>  <br><br>**Result:** `"A*B*C"`                                                                                                              |
| **`reverse()`**                           | Reverses the order of the elements in an array.                                                                             | `arr1.reverse()`<br><br>  <br><br>**Result:** `"C,B,A"`                                                                                                              |
| **`pop()`**                               | Removes the **last** element of an array and returns that element.                                                          | `arr1.pop()`<br><br>  <br><br>**Result:** `"C"` (Length becomes 2)                                                                                                   |
| **`push(element)`**                       | Adds new elements to the **end** of an array and returns the new length.                                                    | `arr1.push("D")`<br><br>  <br><br>**Result:** `4` (New length). Array becomes `["A", "B", "C", "D"]`                                                                 |
| **`shift()`**                             | Removes the **first** element of an array and returns that element.                                                         | `arr1.shift()`<br><br>  <br><br>**Result:** `"A"` (Index 0 becomes "B")                                                                                              |
| **`unshift(element)`**                    | Adds new elements to the **beginning** of an array and returns the new length.                                              | `arr1.unshift("D")`<br><br>  <br><br>**Result:** `4` (Index 0 becomes "D")                                                                                           |
| **`sort()`**                              | Sorts the elements of an array alphabetically by default.<br><br>  <br><br>_(Note: Default sort treats numbers as strings)_ | `arr2.sort()`<br><br>  <br><br>**Result:** `1, 10, 2`                                                                                                                |
| **`splice(start, deleteCount, item...)`** | Adds or removes elements from an array at a specific index.                                                                 | `var fruits = ["Banana", "Orange", "Apple"];`<br><br>  <br><br>`fruits.splice(1, 0, "Lemon");`<br><br>  <br><br>**Result:** `["Banana", "Lemon", "Orange", "Apple"]` |
| **`find(function)`**                      | Returns the **value** of the _first_ element that passes a test (provided by a function).                                   | `var nums = [5, 12, 8, 130, 44];`<br><br>  <br><br>`var found = nums.find(x => x > 10);`<br><br>  <br><br>**Result:** `12`                                           |
| **`filter(function)`**                    | Creates a **new array** with _all_ elements that pass the test.                                                             | `var nums = [5, 12, 8, 130, 44];`<br><br>  <br><br>`var result = nums.filter(x => x > 10);`<br><br>  <br><br>**Result:** `[12, 130, 44]`                             |

## Associative Arrays: The Arrays That Aren't
- Associative arrays provide let you specify key-value pairs. عاملة زي الديكشنري والماب
- Associative array is just like an ordinary array, except that instead of the indices being numbers, they’re strings, which can be a lot easier to remember and reference:
- Although the keys for an associative array have to be strings, the values can be of any data type, including other arrays or associative arrays.

Syntax:

```html
<script>

var assocArray = new Array( );
assocArray["APE"] = "Excellent";
assocArray["Gorila"] = "pass";

</script>
```

---
# 4. **Date Object 📅**
**Definition:** It is used to obtain and manipulate the date and time in a script.
Important Numerical Conventions:
Before using methods, you must know how JavaScript counts time:

- **Months:** `0-11` (0 is January, 11 is December).
- **Days (Week):** `0-6` (0 is Sunday, 1 is Monday).
- **Hours:** `0-23`.
---
### **1. "get" Methods (Reading Time)**
These methods are used for **getting** date and time values from date objects3.

| **Method**          | **Description / Return**                              |
| ------------------- | ----------------------------------------------------- |
| **`getDate()`**     | Returns the day of the month (1-31).                  |
| **`getDay()`**      | Returns the day of the week (0-6, where 0 is Sunday). |
| **`getMonth()`**    | Returns the month (0-11).                             |
| **`getFullYear()`** | Returns the full year (e.g., 2006).                   |
| **`getHours()`**    | Returns the hour (0-23).                              |
| **`getMinutes()`**  | Returns the minutes (0-59).                           |
| **`getTime()`**     | Returns the time in milliseconds (full timestamp).    |

---
### **2. "set" Methods (Writing Time)**

These methods are used for **setting** (changing) date and time values in date objects11.

| **Method**           | **Description**                                                                 |
| -------------------- | ------------------------------------------------------------------------------- |
| **`setDate(n)`**     | Changes the day of the month.                                                   |
| **`setMonth(n)`**    | Changes the month (0-11).                                                       |
| **`setFullYear(n)`** | Changes the year.                                                               |
| **`setHours(n)`**    | Changes the hour.                                                               |
| **`setMinutes(n)`**  | Changes the minutes.                                                            |
| **`setTime(n)`**     | Sets the time using milliseconds (often used to copy time from another object). |

---
### **3. "to" Methods (Formatting Time)**

These methods are used for **returning string values** from date objects to make them readable18.

| **Method**                 | **Description / Example**                                                 |
| -------------------------- | ------------------------------------------------------------------------- |
| **`toString()`**           | Returns the full date string (e.g., "Sat Nov 25 11:13:00 UTC...").        |
| **`toDateString()`**       | Returns only the date part (e.g., "Sun Nov 1 2006").                      |
| **`toUTCString()`**        | Converts the date to a UTC standard string (e.g., "Sat, 25 Nov 2006..."). |
| **`toLocaleString()`**     | Formats the date based on your computer's local settings (OS format).     |
| **`toLocaleDateString()`** | Returns just the date part based on local settings.                       |
| **`toLocaleTimeString()`** | Returns just the time part (e.g., "11:13:00 AM").                         |

---
#  5. **Literal Objects (Custom)**

دي مخدتش حقها في المحاضرة صراحة ف تعالى نشرحها بشكل اوضح (مفيدة على فكرة).

**1. Definition** An object is essentially an **unordered list** of data types stored as **name-value pairs**.
- **Properties:** These are the data items stored in the list.
- **Methods:** These are functions stored inside the object.
**2. Creating an Object (Syntax)** You can define an object directly using curly braces `{}` without needing to create a class instance first.

- **Example:**
```js
    var emp1 = { Name: "Richard", Age: 30 };
```

**3. Accessing Properties** You can access or modify the data inside the object using the **dot notation** (`.`).

- **Example:**
```js
    emp1.Name = "Big G"; // Changing a value
    alert(emp1.Name);      // Accessing a value
```

**4. Adding Methods & The `this` Keyword** You can define functions inside the object. When writing a function inside an object, you use the keyword **`this`** to refer to the object itself.

- **How it works:** `this.name` tells the code to "look for the property called 'name' inside _this_ specific object."
    
- **Example:**

```js
    var emp1 = {
        name: "Aly",
        age: 23,
        show: function() {
            // 'this.name' refers to "Aly" inside this object
            alert(this.name + " is " + this.age + " years old.");
        }
    };
    
    // Calling the method:
    emp1.show();
```

---
# **6. Number Object**

The Number object acts as a wrapper for primitive numeric values.

- **Creation:**
	- **Recommended:** Declare as a primitive variable: `var n = 10;`
	- **Not Recommended:** Declare ==as an object==: `var n = new Number(10);`
	- **Default:** If created without a value (`new Number()`), it defaults to `0`.
- Constants (Properties):
	These are read-only values used to define limits or special states.
	- **`Number.MAX_VALUE`**: The largest possible number in JavaScript ($1.79... \times 10^{308}$).
    
	- **`Number.MIN_VALUE`**: The smallest possible number (closest to zero, $5 \times 10^{-324}$).
    
	- **`Number.NaN`**: Represents "Not-A-Number" (result of invalid math).
    
	- **`Number.POSITIVE_INFINITY`**: Represents infinity (e.g., generated by overflow).
    
	- **`Number.NEGATIVE_INFINITY`**: Represents negative infinity.

- Methods:
	These methods help format numbers as strings:
	- **`toFixed(x)`**: Formats the number to a specific number of **decimal places**.
    
	- _Example:_ `34.8896.toFixed(2)` → `"34.89"` (Rounds the result).
	
	- **`toPrecision(x)`**: Formats the number to a specific **total length** (digits + decimals).
    
    - _Example:_ `34.8896.toPrecision(3)` → `"34.9"`.
    
	- **`toExponential(x)`**: Returns the number in exponential notation (Scientific notation).
    
    - _Example:_ `56789.toExponential(2)` → `"5.68e+4"`.
    
	- **`toString(base)`**: Converts the number to a string. It can convert base systems (like Hexadecimal) if a parameter is provided.
    - _Example:_ `n.toString(16)` converts the number to Hex.


---

# **7. Boolean Object**

The Boolean object is used to convert non-boolean values into a `true` or `false` value.

**Rules for Conversion:**

- Values that result in false:
    0, null, "" (empty string), false, NaN.
- Values that result in true:
    true, "true" (string), "false" (string—because it is not empty), 1.

---

# **8. Regular Expression (RegExp) Object**

A Regular Expression provides a powerful way to search and manipulate text by defining a **pattern**. It is commonly used for validation (checking if an input matches a specific format like an email).

Syntax:

You can create a RegExp in two ways:

1. **Explicit (Object):** `var regex = new RegExp("pattern", "flags");`
    
2. **Literal:** `var regex = /pattern/flags;`
    

Flags (Modes):

Optional parameters that change how the search works:

- **`i`**: Ignore case (matches "A" and "a").
    
- **`g`**: Global search (finds all matches, not just the first).
    
- **`m`**: Multiline search.
    

**Special Characters (Syntax):**

- **Anchors:**
    
    - `^`: Starts with (e.g., `^a` matches "apple").
        
    - `$`: Ends with (e.g., `z$` matches "az").
        
- **Wildcards & Sets:**
    
    - `.`: Any character.
        
    - `[]`: Any character inside the brackets (e.g., `[a-z]`).
        
    - `[^]`: Any character **NOT** inside the brackets.
        
    - `|`: OR (e.g., `abc|def` matches "abc" or "def").
        
- **Quantifiers (How many?):**
    
    - `*`: 0 or more times.
        
    - `+`: 1 or more times.
        
    - `?`: 0 or 1 time.
        
    - `{n}``: Exactly _n_ times.
        
    - `{n,}`: _n_ or more times.
        

Object Methods:

These are methods belonging to the RegExp object itself:

- **`test()`**: Returns `true` if a match is found, otherwise `false`.
    
- **`exec()`**: Returns the first matched text (as an object) or `null`.
    

String Methods using RegExp:

These are String methods that accept a RegExp as a parameter:

- **`match()`**: Returns an array of matches.
    
- **`search()`**: Returns the position (index) of the first match.
    
- **`replace()`**: Replaces matched text with new text.
    
- **`split()`**: Splits a string into an array based on the pattern.

```js
 SCENARIO: Processing a "Messy" Log String 
   We will use RegExp to validate, search, and extract data.


// 1. The Input String (Note: It has multiple lines)
var logData = "Start_Log: User 'Ali' logged in.\n" +
              "Error Code: 404 Not Found.\n" +
              "Email: ali@example.com sent an email.\n" +
              "warning: disk space low.\n" +
              "END_LOG";

console.log("--- 1. RegExp Object Methods (test & exec) ---");

// A. Using test() -> Returns Boolean (true/false) 
// Syntax: /pattern/flags
// Special Char: ^ (Start of line) 
// Flag: i (Ignore Case) 
var startPattern = /^start_log/i; 
var isLogValid = startPattern.test(logData);
console.log("Is valid start? " + isLogValid); // Output: true

// B. Using exec() -> Returns the first match object or null 
// Special Char: \d (digit - implies [0-9]), + (1 or more) 
// Pattern: Find "Code: " followed by digits
var errorPattern = /Code: [0-9]+/; 
var errorMatch = errorPattern.exec(logData);
console.log("Found Error: " + errorMatch[0]); // Output: "Code: 404"


console.log("\n--- 2. String Methods (search, match, replace, split) ---");

// A. search() -> Returns position index 
// Special Char: | (OR) 
// Pattern: Look for 'Error' OR 'warning'
var position = logData.search(/Error|warning/); 
console.log("First issue found at index: " + position); 

// B. match() -> Returns array of matches 
// Flag: g (Global search - finds ALL matches, not just the first) 
// Special Char: . (Any character) and * (0 or more) [cite: 239, 240]
// Pattern: Match anything looking like an email (Simplified)
var emailPattern = /[a-z]+@[a-z]+\.[a-z]+/g; 
var emailsFound = logData.match(emailPattern);
console.log("Emails found: " + emailsFound); // Output: ["ali@example.com"]

// C. replace() -> Substitutes text 
// Scenario: We want to hide the user's name for privacy.
// Special Char: . (Any char), * (Zero or more) 
var hiddenLog = logData.replace(/'User .*'/, "'User ***'");
console.log("Censored Log Line: " + hiddenLog.split("\n")[0]); 
// Output: Start_Log: 'User ***' logged in.

// D. split() -> Splits string into array based on pattern 
// Pattern: Split by new line (\n) OR a colon (:)
var splitData = logData.split(/\n|:/);
console.log("First 3 elements of split array:", splitData.slice(0,3));


console.log("\n--- 3. Advanced Quantifiers & Sets ---");

// Pattern: Match a word with exactly 3 letters 
// Quantifier: {3} (Exact amount)
// Set: [a-z] (Range) 
// Flag: g (Global), i (Ignore case)
var threeLetterWords = /\b[a-z]{3}\b/gi; 
// Note: \b is word boundary (standard JS), though not explicitly in slides, 
// it helps isolate words like 'Ali' or 'low'.
var words = logData.match(threeLetterWords);
console.log("3-letter words found: " + words); 
// Output might include: 'Ali', 'low' (depending on exact string boundaries)
```

---
# References:

## Quiz on Content: 
https://gemini.google.com/share/3d43d509663b
## W3Schools:
- String Objects: http://www.w3schools.com/jsref/jsref_obj_string.asp
- Math Objects: http://www.w3schools.com/jsref/jsref_obj_math.asp
- Array Objects: http://www.w3schools.com/jsref/jsref_obj_array.asp
- Date Objects: http://www.w3schools.com/jsref/jsref_obj_date.asp
## Developer Mozilla:
- Array Objects and find() & filter() Methods:: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 