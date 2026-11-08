---
title: "JS Lecture 1"
aliases: []
type: source
status: active
domain: programming-languages
tags: [source, programming-languages, course]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---

# Notes 

- JS is a ==Web Client Side Scripting Language== -> ?
	- in Web Programming there's two sides:
		- Server-Side Programming : refers to a remote web server where the website is hosted. Processing happens on ==the server **before**== the content is sent to the client's browse
			- NodeJS (server-side JS environment)
			
		- Client-Side Programming: refers to the user's local device, such as a laptop, smartphone, or desktop. Processing happens directly within the **web browser** (e.g., Chrome, Safari, Firefox) after the web page has been delivered.
			- Key Languages: JS (behavior) - HTML (structure) - CSS (Styling)

- الخلاصة: Client-Side هو كود بيتنفذ في متصفح المستخدم لإضافة تفاعل وحركات في الصفحة ، أما Server-Side فهو كود بيتنفذ على ال Server عشان يجهز ملفات الـ HTML، يدير الداتا بيزس، ويرد على طلبات المتصفح.

So We can Say: 
- JavaScript is a **client-side scripting language** designed to ==add interactivity== and ==dynamic updates== to web pages. Unlike HTML (structural) and CSS (presentational), JavaScript handles **behavioral** aspects.
	- **Key Traits**: It is lightweight, interpreted, case-sensitive, and ==object-based (prototype-based)== rather than class-based like Java or C#.
		-***What's Meaning of Object-based? and What's difference between Object-based and Class-based***
- Class-based: must define a **Class** (a blueprint) first, then create an object from it. It’s like having a cookie cutter before you can make a cookie.

```java
// You MUST define the blueprint first
class Car {
	 String brand = "Toyota";
}
// Then you create the instance
Car myCar = new Car();
```

- Object-based: You can create objects directly or use an existing object as a "prototype" for a new one

```js
// 1. Creating an object directly (No class needed)
var car = {
	brand: "Toyota",
	drive: function() {
		console.log("Driving...");
	}
};
// 2. Prototype-based: Adding a property to an existing object structure
// Even if we used a constructor, JS uses "prototypes" behind the scenes
function User(name) {
	this.name = name;
}
// We add a method to the 'prototype' so all User objects can use it
User.prototype.sayHi = function() {
	return "Hi, I am " + this.name;
};
var student = new User("Ahmed");
console.log(student.sayHi()); // "Hi, I am Ahmed"
```

- ***Smart Question: Is JavaScript OOP Language or Functional Language?*** 
	- ==JS is a Multi-paradigm that support both in the same time== -> how?
		- As an Object-Oriented (OOP) Language: JavaScript is defined as an object-based or prototype-based language, Class-based languages are a ==subset of the larger family of OOP languages==, ==which also includes prototype-based languages== like JavaScript.
			```js
				// Focusing on the object and its state
				var car = {
						brand: "Volvo", [cite: 174]
					    start: function() { 
							console.log("Engine started"); 
						}
					};
			```
		- As and Functional Language: JavaScript as a programming language with **first-class functions** --> How?
			- "First-class" means functions are treated like any other variable—they can be passed as arguments to other functions, returned by another function, and assigned as a value to a variable.
			```js
				function multiply(x, y) {
					return x * y;
				}
				var result = multiply(5, 3);
			```

- **Capabilities**: It can validate user input, handle events, create cookies, and detect browser information.
- **Limitations**: For security, it cannot directly access files on a user's system or a web server (except cookies).
- **Server-side**: Through **NodeJS**, JavaScript can also be used for server-side applications.
---
# JS Characteristics

- JavaScript characteristics:
	- Case sensitive 
	- Object-oriented 
	- Event-Driven 
	- Interpreted language 
	- Browser-Dependent 
	- Platform independent 
	- Dynamic
---
# 1. JavaScript Strength & weakness

| Strength              | Weakness                                                          |
| --------------------- | ----------------------------------------------------------------- |
| Quick Development     | Limited Range of Built-in Methods                                 |
| Easy to Learn (هههه)  | No Code Hiding                                                    |
| Platform Independence | Browser Dependant                                                 |
| Small Overhead        | Altering the text on an HTML page will reload the entire document |

---
# 2. Embedding JavaScript
There are three primary ways to include JS in a web document:
1. **Internal**: Between `<script>` tags anywhere in the HTML.
```html	
< script > document.write (" welcome to JavaScript world");
```
2. **Event Handlers**: Directly within HTML attributes (e.g., `onClick="alert('Hello')"` ).
```html
<input type="button" value="Click Me" onClick="alert('Hello')"/> 
```
3. **External**: Link to a `.js` file using the `src` attribute in a `<script>` tag
```js
function dosomething() { 
	alert (“Hello “);
}
```

```html
<HEAD> 
	<TITLE>A Simple Document</TITLE> 
	<script src= “myJSFile.js” > </script> 
</HEAD>
<body>
	<script> 
		dosomething();
	</script>
</body>	
```

---
# 3. Variables and Scope
* **Declarations**: Variables are declared using `var`, `let`, or `const`.
* الـ `var` عبارة عن **(Function Scope)**
	- المتغير اللي بيتعرف بـ `var` بيكون متاح داخل الدالة كلها اللي اتعرف فيها.
	- لو عرفته جوه بلوك `{}` (زي `if` أو `for`) بيفضل متاح عادي برا البلوك ده طالما لسه جوه نفس الدالة.
	- **باختصار:** الـ `var` مبيحترمش حدود الـ `{}` البلوك، بيحترم بس حدود الـ `function`.

### **2. الـ `let` والـ `const` (نطاق البلوك - Block Scope)**
- دي ميزة جديدة انضافت في **ES6**.
- المتغيرات دي بتتحبس جوه البلوك `{}` اللي اتعرفت فيه (سواء كان `if`, `for`, `while`).

- لو حاولت تنادي عليهم برا البلوك `{}`، هيطلعلك **Error** فوراً.
### **تطبيق على الكود اللي كتبته:**

```JavaScript
function test() {
  if (true) {
    var x = "I am var";     // نطاق دالة (متاح في test كلها)
    let y = "I am let";     // نطاق بلوك (متاح جوه الـ if بس)
    const z = "I am const"; // نطاق بلوك (متاح جوه الـ if بس)
  }

  console.log(x); // شغال وهيطبع "I am var" لأن var scoped للدالة 
  console.log(y); // Error: y is not defined لأنها محبوسة جوه الـ if
  console.log(z); // Error: z is not defined لأنها محبوسة جوه الـ if
}

test();

// برا الدالة خالص:
console.log(x); // Error: x is not defined لأنها برا الـ function scope]
```

* **Hoisting**: Variables declared with `var` and functions are "hoisted" to the top of their scope, meaning they can be referenced before they are declared. `let` and `const` are **not** hoisted

- الـ `var` بيحصل لها **Hoisting**، يعني المتصفح بيرفع "الإعلان عن المتغير" (Declaration) بس لأول السكوب.
- القيمة مش بتترفع، فلو ناديت المتغير قبل سطر التعيين، النتيجة هتكون `undefined`.
- المحاضرة بتقول إنك تقدر تستخدم المتغير قبل ما تعلن عنه من غير ما يحصل Error.

- الـ `let` و `const` ومنطقة الـ TDZ
- لو حاولت تستخدم متغير `let` قبل ما السطر بتاعه ييجي، هيطلع لك **ReferenceError** فوراً.
- الـ **TDZ (Temporal Dead Zone)** هي الفترة من أول البلوك لحد سطر تعريف المتغير؛ في الفترة دي المتغير "موجود" كحجز مكان لكن "ممنوع" اللمس أو الاستخدام.

```js
var a = 5; 
console.log(a); // ✅ undefined 
console.log(b); //  Error: Cannot access 'b' before initialization let b = 10;
console.log(c); // ❌ Error: Cannot access 'c' before initialization const c = 15;
```

* **Scope**:
	* **Global**: Declared outside functions or via the `window` object.

```js
var globalX = 10; // Global Scope

function showGlobal() {
    console.log(globalX); // Accessible inside the function
}
```

 - **Local/Function**: Declared inside a function.
```js
function localExample() {
    var functionVar = "I am local"; // Function Scope [cite: 189, 195]
    console.log(functionVar); // ✅ Works here
}

console.log(functionVar); // ❌ Error: Not accessible outside [cite: 199]
```
* **Block**: Variables declared with `let` or `const` are limited to the specific block (e.g., inside an `if` or `for` loop) where they are defined.
```js
function blockTest() {
	if (true) {
        var notBlocked = "I escape the if-block"; // var is function-scoped [cite: 254]
        let blocked = "I am trapped in the if-block"; // let is block-scoped [cite: 271]
        
        console.log(blocked); // Works inside the block [cite: 273]
    }

    console.log(notBlocked); //  Works (var sees the whole function) [cite: 260]
    console.log(blocked); // Error: blocked is not defined [cite: 277, 292]
}
```

***Addition important Topic: closure is a feature where an inner function has access to the variables of its outer (enclosing) function, even after the outer function has finished executing.***

- Function Scope
	- variables declared inside a function are local to that function. In a closure, the inner function "remembers" this local scope.
 - Global vs. Local Scope
	- function can access variables from the global scope. A closure is essentially an extension of this idea: an inner function can access variables from its "parent" function's scope.
- Example of Closure Logic (Based on Page 20)
```js
function outerFunction() {
    var x = 1; // Variable in the outer scope [cite: 182]

    function innerFunction() {
        console.log(x); // The inner function "closes over" x
    }
    
    return innerFunction;
}

const myClosure = outerFunction();
myClosure(); // Output: 1 (It still remembers x!)
```

* **Strict Mode**: Declaring `"use strict";` helps write secure code by turning "bad syntax" (like using undeclared variables) into real errors.
	-  JavaScript in strict mode does not allow variables to be used if they are not declared.
```js
	"use strict";
	x = 3.14; 	// This will cause a syntax error
	y = 10; 	// This will not cause an error, as y is hoisted.
	var y;
```

---
# 4. Operators and Operations

### **Operators and Expressions**

JavaScript supports several types of operators based on the number of operands1:
- **Unary**: Requires one operand (e.g., $x++$)
- **Binary**: Requires two operands (e.g., $x + 2$).
- **Ternary**: Requires three operands, specifically the Conditional Operator (`? :`)

#### **A. Operator Types**

| **Category**   | **Operators**                                  | **Description**                              |
| -------------- | ---------------------------------------------- | -------------------------------------------- |
| **Arithmetic** | `+`, `-`, `*`, `/`, `%`, `++`, `--`            | Basic math and remainder5555.<br><br>+1      |
| **Assignment** | `=`, `+=`, `-=`, `*=`, `/=`, `%=`              | Assigning or modifying values6666.<br><br>+1 |
| **Comparison** | `<`, `>`, `<=`, `>=`, `==`, `!=`, `===`, `!==` | Includes strict equality7.                   |
| **Logical**    | `&&` (AND), `                                  |                                              |
| **Bitwise**    | `&`, `\|`, `^`, `~`, `<<`, `>>`, `>>>`         | Bit-level operations8.                       |
| **Special**    | `typeof`, `,` (comma), `+` (string)            | Type checking, sequencing, and               |

#### **B. Precedence and Associativity**
**Operator Precedence** determines the evaluation order (highest to lowest):
1. **Parentheses** `()`
2. **Multiply/Divide/Modulus** `*`, `/`, `%`
3. **Addition/Subtraction** `+`, `-`
4. **Comparison** `<`, `<=`, `>=`, `>`
5. **Equality** `==`, `!=`
6. **Logical AND** `&&`
7. **Logical OR** `||`
8. **Conditional** `?:`
9. **Assignment** `=`, `+=`, `-=`, etc.
**Operator Associativity** determines the order for operators with the same precedence.

---
# 5. Coercion

Coercion is the automatic conversion of one data type to another during execution2
- **Example**: Converting a Number to a String (1 + "2" = "12" )22.
---
# 6. Controlling Program Flow**

#### **A. Conditional Statements**
- **if...else**:

```js
    if (condition) {
     /* code */ } 
    else if (condition) {
     /* code */ 
     } 
    else {
     /* code */ 
     }
```

- **Conditional (Ternary) Operator:** This is a shortcut for the `if...else` statement .
    
    - **Syntax:** `(Condition) ? if_true : if_false;`
```JavaScript
        var temp = 120;
        var x = (temp > 100) ? "red" : "blue"; // x will be "red" [cite: 375]
        
        var temp = 20;
        var y = (temp > 100) ? "red" : "blue"; // y will be "blue" [cite: 377]
```
  
- **Comma Operator (`,`):** It allows multiple expressions to be executed sequentially from left to right, returning the value of the last expression .
    - **Usage:** Commonly used when naming multiple variables or in `for` loop increments .
    - **Example from Lecture:** `var k = 0, i, j = 0;`

- **switch/case**: Used to compare an expression against multiple values23. Requires `break` to stop execution and supports a `default`
```js
switch (expression) {
  case value1:
    statements;
    break; // Stops execution from falling into the next case [cite: 449]
  case value2:
    statements;
    break;
  default: // Executes if no cases match [cite: 459]
    statements;
}
```

#### **B. Loop Statements**

- **for**: 
```js
for (var i=0; i<10; i++) { document.write(" number" + i); }
```
- **while**: Checks condition before execution
```js
while (condition) { statements }
```
- **do...while**: Executes once before checking the condition
```js
do { 
	statements 
} while (condition)
```
- **for...in**: 
```js
for (variablename in object) { statement }
```
- **Breaking Loops**: 
	- `break` exits the loop;
	- `continue` skips to the next iteration.
---
### **4. Dialogue Boxes**

- **alert("message")**: Simple output to a dialog box
![[Pasted image 20251224034746.png]]
- **prompt("label", "default")**: Interacts with the user for input; returns the input string
![[Pasted image 20251224034925.png]]
- **confirm("question")**: Returns `true` if OK is clicked, `false` if Cancel is clicked.
![[Pasted image 20251224035259.png]]
---
### **5. Built-in Functions**

| **Function**     | **Description**                      | **Example Result**              |
| ---------------- | ------------------------------------ | ------------------------------- |
| **parseInt()**   | String to integer.                   | `parseInt("3a")` -> 3.          |
| **parseFloat()** | String to float.                     | `parseFloat("3.55")` -> 3.55.   |
| **Number()**     | Converts object to number.           | `Number(false)` -> 0.           |
| **String()**     | Converts object to string.           | `String(999)` -> "999".         |
| **isFinite()**   | Checks if value is a number only.    | `isFinite("33a")` -> false.     |
| **isNaN()**      | Checks if value is Not-a-Number.     | `isNaN("abc")` -> true.         |
| **eval()**       | Evaluates a string as an expression. | `eval("7+3")` -> 10.            |
| **escape()**     | Encodes special characters.          | `"test val"` -> `"test%20val"`. |
| **unescape()**   | Decodes escape sequences.            | `"%20"` -> `" "`.               |

- **`parseInt()`**: بتحول النص لرقم صحيح وبتقف عند أول حرف مش رقم.
- **`parseFloat()`**: بتحول النص لرقم عشري (بكسر) وبتقبل علامة النقطة.
- **`Number()`**: بتحول الكائن كله لرقم صافي، ولو فيه حرف واحد غلط بتطلع `NaN`.
- **`String()`**: بتحول أي نوع بيانات (زي الرقم أو البوليان) لنص مكتوب.
- **`isNaN()`**: بتختبر القيمة وبترجع `true` لو كانت "ليست رقماً".
- **`isFinite()`**: بتأكد إن القيمة رقم حقيقي ومحدد مش مالانهاية ولا نص.
- **`eval()`**: بتاخد نص وتنفذه كأنه كود برمجي وبترجع نتيجة العملية.
- **`escape()`**: بتشفر الرموز الخاصة والمسافات في النص وتحولها لأكواد (زي `%20`).
- **`unescape()`**: بتفك تشفير الأكواد وترجع النص لأصله بالرموز الطبيعية.

```js
// 1. Parsing Functions (String to Number)
console.log(parseInt("3"));       // Returns 3 
console.log(parseInt("3a"));      // Returns 3 (Stops at first non-digit)
console.log(parseInt("a3"));      // Returns NaN (Starts with a letter)

console.log(parseFloat("3.55"));  // Returns 3.55 
console.log(parseFloat("3.55a")); // Returns 3.55

// 2. Conversion Functions
console.log(Number(false));       // Returns 0 
console.log(Number("999"));       // Returns 999 
console.log(Number("123hui"));    // Returns NaN (Strict conversion)

console.log(String(true));        // Returns "true"
console.log(String(999));         // Returns "999"

// 3. Validation Functions
console.log(isFinite(33));        // Returns true (It is a finite number)
console.log(isFinite("Hello"));   // Returns false

console.log(isNaN(0/0));          // Returns true (Not a Number)
console.log(isNaN("abc"));        // Returns true 
console.log(isNaN("348"));        // Returns false (It is a valid number)

// 4. Execution & Encoding Functions
var a = 999, b = 777;
console.log(eval("a + b"));       // Returns 1776 (Evaluates string as code)

var encoded = escape("test val"); // Returns "test%20val" (Encodes spaces/special chars)
console.log(unescape(encoded));   // Returns "test val" (Decodes back to original)
```

---

### **6. User-Defined Functions**

Functions can be declared and then called. 
They can also return values using the `return` keyword
- **Syntax**:
```js
    function functionName(parameter) {
      // statements
      return value;
    } [cite: 539, 541, 544, 547
```

- **Defaults (ES6)**: You can set default values in the parameters  
- **Hoisting**: Function statements are hoisted and can be called before their declaration.
---
# 7. Debugging Errors

![[Pasted image 20251224040553.png]]

---
# 8. JavaScript Guidelines

![[Pasted image 20251224040833.png]]

---
# 9. **JavaScript Variable Naming Rules**

- **First Character Requirement**: The first character of a variable name must be a **letter**, an **underscore (_)**, or a **dollar sign ($)**.
- **Subsequent Characters**: After the first character, you can use **letters**, **digits**, **underscores**, or **dollar signs**.
- **No Spaces**: You must not use spaces inside variable names (e.g., use `FirstName` instead of `First Name`).
- **Case Sensitivity**: Names are case-sensitive; for example, `FirstName` is different from `firstName`.
- **Avoid Reserved Words**: Do not use words that JavaScript already uses for other purposes, such as `var`, `if`, or `for`.

---
### **Professional Naming Conventions (Style Guide)**

To write clear and maintainable code, the lecture recommends the following:
- **Descriptive Names**: Variables should clearly describe what they represent.
- **Use camelCase**: It is standard practice for JavaScript programmers to start names with a lowercase letter and capitalize the first letter of each subsequent word (e.g., `firstName`, `masterCard`, `interCity`).
---

### **Examples of Data Types and Naming**
Variables are loosely typed, meaning their type is determined at runtime based on the value assigned.

| **Data Type**      | **Example Name** | **Value Example**     |
| ------------------ | ---------------- | --------------------- |
| **String**         | `userName`       | `"Ayaat"`             |
| **Numeric**        | `totalPoints`    | `90`                  |
| **Boolean**        | `isStudent`      | `false`               |
| **Array**          | `colors` جمع     | `["pink", "brown"]`   |
| **Null/Undefined** | `count`          | `null` or `undefined` |

---
### **Practical Summary Table**

| **Practice**       | **Bad Example**        | **Good Example (camelCase)**   |
| ------------------ | ---------------------- | ------------------------------ |
| **Clarity**        | `let x = "aya@e.com";` | `let userEmail = "aya@e.com";` |
| **Spacing**        | `let user name;`       | `let userName;`                |
| **Starting Char**  | `let 1user;`           | `let user1;`                   |
| **Reserved Words** | `let for = 5;`         | `let forLoopCount = 5;`        |

---
# Some Links important

- Quiz on this lecture: https://gemini.google.com/share/69eebceb32a6
- To Learn more and more Visit this website: https://www.javascripttutorial.net/
