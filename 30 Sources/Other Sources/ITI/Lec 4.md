---
title: "Lec 4"
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

# DOM (Document Object Model)

- Stands for Document Object Model
- W3C Standard
- Defines a Standard way to Access and Manipulate HTM Documents
- Platform and Language Independent

![[Pasted image 20251224235905.png]]

---
## JavaScript Object Hierarchy

- is structured with the **Window** object at the top, serving as the parent for all other browser objects. This structure is often referred to as the **BOM (Browser Object Model)**.

- **Window**: This is the top-level object in the hierarchy. It contains properties that apply to the entire browser window.

- **Navigator**: This object holds properties related to the name and version of the browser (Navigator) currently being used.

- **Document**: This object contains properties based on the actual content of the page/document. Examples include the page title, background color, links, and forms.

- **Location**: This object possesses properties based on the current URL of the page.

- **History**: This object functions as an array containing properties representing the URLs the client has previously requested.

- **Screen**: This object contains information specifically about the visitor's display screen (e.g., resolution, dimensions)

![[Pasted image 20251225001155.png]]

---
# BOM (Browser Object Model)
- Stands for Browser Object Model
- Covers objects which relate to the browser
- At the top of the BOM Hierarchy is window object.
## 1. Hierarchy and Status
- Window
	- ***Navigator***: Contains properties related to the name and version of the browser being used.
	
	- ***Screen***: Contains information about the visitor's display screen (outside the browser window), such as dimensions and color depth.
	
	- ***History***: Contains properties representing the URLs the client has previously requested, functioning as an array of URLs.
	
	- ***Location***: Contains properties based on the current URL. It refers to the current web address.
	
	- ***Document***: Represents the content of the page itself.
- **Equal Status:** Each of these objects below the window holds **equal status**.
- **Direct Relation:** They all relate directly to the `window` object, meaning they are properties of the window

## 2. Capabilities of the BOM

The BOM allows developers to interact with the browser itself rather than just the webpage content. Specifically, it enables scripts to:

- Move the browser window.
- Change the text in the status bar.
- Perform other actions that do not directly relate to the content inside the page.
## BOM vs DOM:
here is often confusion regarding the naming conventions of these models:

- **The Misconception:** The BOM is frequently not referred to by its proper name and is often colloquially "wrapped up" or lumped together with the DOM.
    
- **The Reality:** The DOM (Document Object Model) is actually a subset of the BOM. The DOM deals strictly with the **document** content, while the BOM acts as the container for the DOM.
---
# 1. Windows: 
This is the top-level object in the JavaScript hierarchy representing the browser window.

**Key Properties:**

## 1. **Dimensions:** 

- `innerHeight`: Returns the inner Height of a window's content area -> window.innerHeight
- `innerWidth`: Returns the inner width of a window's content area -> window.innerWidth
- `outerHeight`: Returns the outer height of a window, including toolbars/scrollbars -> window.outerHeight
- `outerWidth` : Returns the outer width of a window, including toolbars/scrollbars -> window.outerWidth
## 2. **Position:** 

- `screenX` = `screenLeft`: Returns the horizontal coordinate of the window relative to the screen `window.screenLeft`
		- بيرجعلك المسافة الأفقية بين المتصفح والحافة الشمال للشاشة
- `screenY` = `screenTop`: Returns the vertical coordinate of the window relative to the screen -> `window.screenY` .
		-بيرجعلك المسافة الرأسية بين المتصفح والحافة اللي فوق للشاشة

**مثال عملي:** تخيل إنك فاتح نافذة "كروم" صغيرة ومش مالية الشاشة، وحطيتها في نص سطح المكتب.

- لو الكود طلعلك `screenX = 500`، ده معناه إن المتصفح يبعد 500 بيكسل عن شمال الشاشة.
- لو حركت المتصفح بإيدك ولزقته في الشمال خالص، القيمة دي هتبقى `0`.

- `pageXOffset` = `scrollX`: Returns the pixels the current document has been scrolled from the upper left corner of the window 
		- دي وظيفتها تقولك إنت عملت **Scroll** قد إيه بالعرض جوه الصفحة.
- `pageYOffset` = `scrollY`: Returns the pixels the current document has been scrolled (vertically) from the upper left corner of the window `window.pageYOffset`
	
	- دي زي اللي فاتت بس للطول. بتقولك إنت نزلت قد إيه في الصفحة لتحت.
    

**مثال عملي:** إنت فاتح صفحة "فيسبوك" (صفحة طويلة جداً).

- طول ما إنت لسه في أول بوست فوق، `pageYOffset` بـ `0`.
- كل ما تنزل تقرأ بوستات أكتر (Scroll Down)، الرقم ده بيزيد وبيعرفك إنت نزلت مسافة قد إيه في الصفحة.

- الخلاصة
	- الـ **Screen** (`X`, `Y`): مكان "الشباك" نفسه على سطح المكتب.
	- الـ **Scroll** (`pageX`, `pageY`): مكانك "جوه الصفحة" وإنت بتقرأ.

## **3. Dialog Boxes and Window Opening:**

- `alert()`: Displays a message with an OK button.
        `window.alert("Hello")`
- `confirm()`: Displays a dialog with OK and Cancel (returns true/false).
        `window.confirm("Do you want to exit")`
- `prompt()`: Prompts the user for input.
        `name = prompt("Please enter your name", "")`
- `open()` to open a new window 
		`window.open(url, name, properties)`
- `close()` to close it.
		`window.close()`

## 4. **Window Control:** 
These methods control the focus and loading state of the window.  
- **`focus()`**: Sets focus to the current window.
    
    - _Syntax:_ `window.focus()`
    بعد ما تفتح الصفحة وتطلع منها ترجع تدوس فوكاس ف ترجع الصفحة تاني
- **`blur()`**: Removes focus from the current window.
	
    - _Syntax:_ `window.blur()`
         
- **`getSelection()`**: Returns a Selection object representing the range of text selected by the user.
    
    - _Syntax:_ `window.getSelection()`
        
- **`stop()`**: Stops the window from loading.
    
    - _Syntax:_ `window.stop()`
        
- **`print()`**: Prints the contents of the specified window.
    
    - _Syntax:_ `window.print()`
        

## 5. Movement and Resizing
These methods are used to change the position or size of the window.

- **`moveTo(h, v)`**: Moves the window to a specific horizontal (`h`) and vertical (`v`) position relative to the top-left of the screen.
    
- **`moveBy(h, v)`**: Moves the window by a specified number of pixels (`+` or `-`) from its current position.
    
- **`resizeTo(h, v)`**: Changes the size of the window to a specific horizontal (`h`) and vertical (`v`) width and height.
    
- **`resizeBy(h, v)`**: Changes the size of the window by adding or subtracting pixels (`+` or `-`) from its current size.
	
- **`scrollTo(h, v)`**: Scrolls the document to a specific horizontal (`h`) and vertical (`v`) pixel position from the top of the document.
    
- **`scrollBy(h, v)`**: Scrolls the document by a specified number of pixels (`+` or `-`) from the current scroll position.

## 6. **Timing:**

- `setTimeout()`: Executes code once after a delay.
     : بتنفذ كود مرة واحدة بس بعد مرور وقت معين.
- `setInterval()`: Executes code repeatedly at specified intervals.
     بتنفذ كود معين بشكل متكرر كل فترة زمنية (بالمللي ثانية)
- To stop them, use `clearTimeout()` or `clearInterval()`.
---
# 2. Screen

The screen object provides information about the display screen outside the browser window.

This object allows scripts to:
- Detect the browser's usable area. 
- Return information on the display screen's dimensions and color depth
## 1. Total Dimensions

These properties refer to the full physical resolution of the monitor.

- **`height`**: Returns the total height of the screen.
- **`width`**: Returns the total width of the screen.
## 2. Available Dimensions

These properties refer to the usable screen area, subtracting system interface elements like the taskbar.

- **`availHeight`**: Returns the height of the screen **excluding the Windows Taskbar**.
- **`availWidth`**: Returns the width of the screen **excluding the Windows Taskbar**.

## 3. Color Information

These properties provide information about the screen's color capabilities.

- **`colorDepth`**: Returns the bit depth of the color palette used for displaying images.
    
- **`pixelDepth`**: Returns the color resolution (in bits per pixel) of the screen.

---
# 3. Navigator

object represents the browser application.

This Object allows scripts to see:
- Browser Type
- Browser Version
- ***All of its Properties are read-only***
Properties:
- `appName` : Get the name of the browser -> `navigator.appName`
- `appVersion`: Get the version of the browser -> `navigator.appVersion`
- `language`: Get the Language of the browser -> `navigator.language`
- `cookieEnabled`: Returns whether the browser allows cookies or not -> `navigator.cookieEnabled`
- `platform`: Return the name of the OS
- `onLine` : Determines whether the browser is online
- `geolocation`: Return a Geolocation object that can be used to locate user's position.

---
# 4. Location

refers to the current URL
- href is the default property of the Location object -> location.herf;

- replace method loads the specified URL over the current history entry. -> location.replace(URL)
## 1. Properties

These properties allow you to read or modify specific parts of the URL:

- **`href`**: Sets or returns the entire URL. It is considered the default property of the location object.
    
    - _Example:_ `var url = location.href;`
    
- **`hash`**: Sets or returns the anchor part of a URL (the part starting with `#`).
    
- **`search`**: Sets or returns the query string part of a URL (the part starting with `?`).
    

### 2. Methods

These methods allow you to navigate or refresh the page:

- **`assign(URL)`**: Loads a new document.
    
    - **Key Feature:** It **creates** a new entry in the browser's history list, so the user can use the "Back" button to return to the previous page.
        
- **`replace(URL)`**: Replaces the current document with a new one.
    
    - **Key Feature:** It **does not** create a history entry. The new URL replaces the current one in the history list, so the user **cannot** use the "Back" button to return.
        
        +1
        
- **`reload()`**: Reloads the current document (similar to pressing the Refresh button).


### 1. Properties Examples

Scenario: Imagine the current URL in your browser address bar is:

http://www.example.com/page.html?user=john#contact

| **Property** | **Code Example**                                                                     | **Result / Output**                                                                                    |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **`href`**   | `var currentUrl = window.location.href;`<br><br>  <br><br>`console.log(currentUrl);` | **`http://www.example.com/page.html?user=john#contact`**<br><br>  <br><br>Returns the full URL string. |
| **`search`** | `var query = window.location.search;`<br><br>  <br><br>`console.log(query);`         | **`?user=john`**<br><br>  <br><br>Returns the query string part (everything starting from the `?`).    |
| **`hash`**   | `var anchor = window.location.hash;`<br><br>  <br><br>`console.log(anchor);`         | **`#contact`**<br><br>  <br><br>Returns the anchor part (everything starting from the `#`).            |

---

### 2. Methods Examples

#### A. `assign()` vs `replace()`

The key difference is how they handle the **History** (the Back button).

**Example 1: Using `assign()`**

```js
// Navigates to Google
window.location.assign("http://www.google.com");
```

- **Result:** The browser loads Google.
    
- **Back Button:** **Active**. You can click "Back" to return to your previous page because `assign` creates a new entry in the history.
    

**Example 2: Using `replace()`**

```js
// Replaces the current page with Google
window.location.replace("http://www.google.com");
```

- **Result:** The browser loads Google.
    
- **Back Button:** **Inactive** (for this specific step). You **cannot** click "Back" to return to the previous page because the current page was _replaced_ in the history, not added to it

#### B. `reload()`

**Example 3: Using `reload()`**

```js
// Refreshes the current page
window.location.reload();
```

- **Result:** The page refreshes, just like pressing `F5` or the refresh icon in the browser toolbar.

---
# 5. History

Based on the lecture slides, here is the explanation of the **History Object**, which is used to manage the user's browser session history.

### 1. What is the History Object?

- **Definition:** It is an **Array of URLs** representing the pages the client has visited.
    
- **Purpose:** It allows JavaScript programs to send the user back or forward to different pages in their history list.
    
- **Reference:** You can access it using `window.history`3.

### 2. Properties

- **`length`**: Returns the number of URLs currently in the history list.
    
    - _Example:_ If you opened 5 pages in a tab, `history.length` will be 5.
    

### 3. Methods

These methods allow you to navigate through the history stack:

- **`back()`**: Loads the previous URL in the history list.
    
    - _Effect:_ Same as clicking the browser's "Back" button.
        
- **`forward()`**: Loads the next URL in the history list.
    
    - _Effect:_ Same as clicking the browser's "Forward" button.
        
- **`go(index)`**: Loads a specific URL from the history list based on a relative index number.
    
    - _Effect:_
        
        - `history.go(-1)` is the same as `back()`.
        - `history.go(1)` is the same as `forward()`.
        - `history.go(-2)` goes back two pages.


---
### Practical Example

Scenario:

Imagine a user browses in this order:

1. **https://www.google.com/search?q=Google.com** (Step 1)
    
2. **Facebook.com** (Step 2)
    
3. **YouTube.com** (Current Page - Step 3)
    

**Code & Results:**

|**Method / Property**|**Code**|**Result**|
|---|---|---|
|**length**|`console.log(history.length);`|Output: **3** (because there are 3 pages in the list).|
|**back()**|`history.back();`|The browser returns to **Facebook.com**.|
|**go()**|`history.go(-2);`|The browser returns to **https://www.google.com/search?q=Google.com** (jumping back 2 steps).|
|**forward()**|`history.forward();`|(If currently at Facebook) The browser goes to **YouTube.com**.|

---

# 6. Event Object:

Based on the provided text, here is a structured summary of the **Event Object**, its properties, and how to handle events in JavaScript.

### 1. What is the Event Object?

When an event (like a click) occurs on an HTML element, an **Event Object** is automatically created.

- It holds specific information about that event.
    
- Events are usually paired with functions (handlers) that execute only when the event happens.
    

### 2. Common Properties

These properties apply to most event types:

- **`target`**: The specific element that triggered the event (in older IE versions, this was called `srcElement`).
    
- **`type`**: The name/type of the event (e.g., "click", "mousedown").
    
- **`timeStamp`**: The time (in milliseconds since 1970) when the event was created.
    
- **`bubbles`**: Returns `true` if the event is a bubbling event.
    
- **`cancelable`**: Returns `true` if the event's default action can be prevented.
    

---

### 3. MouseEvent Properties

If the event involves the mouse, the object provides location and button details:

**Coordinates:**

- **`screenX` / `screenY`**: Coordinates relative to the **physical screen**.
    
- **`clientX` / `clientY`**: Coordinates relative to the **current window**.
    
- **`pageX` / `pageY`**: Coordinates relative to the **document** (useful if the page is scrolled).
    
- **`offsetX` / `offsetY`**: Coordinates relative to the **target element** itself.
    

**Buttons & Keys:**

- **`button`**: Indicates which mouse button was pressed.
    
    - `0`: Left button.
        
    - `1`: Wheel/Middle button.
        
    - `2`: Right button.
        
    - _(Note: IE8 uses different values: 1 for Left, 2 for Right, 4 for Middle)_.
        
- **Modifier Keys**: `altKey`, `ctrlKey`, and `shiftKey` return `true` if those keys were pressed during the mouse click.
    

---

### 4. KeyboardEvent Properties

If the event involves the keyboard:

- **`key`**: Returns the character string of the key (e.g., "a", "Enter").
    
- **`code`**: Returns the code value of the physical key.
    
- **`altKey`, `ctrlKey`, `shiftKey`**: Return `true` if these modifiers were pressed.
    
- **Deprecated**: The `which` and `keyCode` properties are deprecated; modern specifications recommend using `key`.
    

---

### 5. Event Methods

You can control the behavior of events using these methods:

- **`preventDefault()`**: Cancels the default browser behavior for an event.
    
    - _Example:_ Preventing a "Submit" button from actually submitting a form, or stopping a link from following its URL.
        
- **`stopPropagation()`**: Stops the event from "bubbling" up to parent elements.
    

---

### 6. Event Propagation (Bubbling)

- **Concept:** When an event triggers on a child element (the deepest element), it triggers on that element first, then moves up to trigger handlers on the parent elements in nesting order.

- **Stopping it:** To stop this behavior, use `e.stopPropagation()` (or `e.cancelBubble = true` for IE < 9)

---

### 7. Ways to Handle Events

There are three main ways to bind an event to an element:

1. **Tag Attribute:** Writing the JavaScript directly in the HTML (e.g., `onclick="alert('hi')"`).
    
2. **Object Property:** Assigning a function to the element property in JS (e.g., `document.getElementById('b1').onclick = showAlert;`)

3. **`addEventListener()` Method (Recommended):**
    
    - **Syntax:** `element.addEventListener(event, function, useCapture)`.
        
    - **Benefits:**
        
        - Separates JS from HTML.
        - Can add multiple listeners to one element without overwriting others.
        - Provides control over bubbling vs. capturing phases (via the third parameter).

Browser Compatibility Note:

For IE8 and earlier, addEventListener is not supported. You must use attachEvent(event, function) instead, and detachEvent to remove it.

---
تعالى على المسودة الي بنقول الي فهمناه هنا هنمشي بوينتس

- اي حاجة بتحصل في الصفحة اسمها Event
	- لما اليوزر يضغط كليك او كتب حرف فالكيبورد حرك الماوس مثلا عمل سابميت
- لما اي ايفنت يحصل -> البراوزر بيعمل اوبجيكت تلقائي اسمه Event Object وبيحتوي على كل المعلومات عن الي حصل

مثلا
```js
<button id="btn">Click Me</button>

<script>
document.getElementById("btn").addEventListener("click", function(e) {
    console.log(e);
});
</script>
```

- هنا لما نضغط على الزرار البراوزر بيبعت Object اسمه e و e فيه كل التفاصيل عن ال event زي اي طيب ؟
	- مين الي اتضغط؟ وامتى؟ واي نوع الإيفنت الي حصل؟ مكان الماوس فين؟ وهكذا

---

اي اهم الخصائص بتاعت ال event object ؟

- target بيعرفك العنصر الي حصل عليه الايفنت فعليا
- type نوع الحدث الي حصل سواء كان click او غيره
- timeStamp الوقت الي حصل فيه الايفنت
- bubbles بيقولك الحدث دا بيطلع لفوق ولا لا 

- cancelable يعني ينفع يمنع سلوك بيعمله الايفنت ولا لا ؟
	- مثلا فورم بيعمل سابمت تمام او مثلا لينك بيفتح صفحة وهكذا


بالنسبة ل Mouse Events
- screenX / screenY مكان الماوس على الشاشة كلها
- clientX / clientY مكان الماوس جوا النافذة
- pageX / pageY مكان الماوس في الصفحة كاملة حتى لو فيها Scroll
- offsetX / offsetY مكان الماوس جوا العنصر نفسه

بالنسبة ل button الخاص من الماوس لما تدوس كليك يمين بتديلك رقم 2 و لو دوست كليك شمال بيديلك رقم 0 ولو دوست على البلية تدوس رقم 1

دمج الكليك مع كل من 
e.ctrlKey -> عبارة عن كليك + CTRL ودا علشان تحدد اكتر من عنصر
e.altKey -> عبارة عن كليك و Alt نسخ او تعديل
e.shiftKey -> تحديد مجموعة

بالنسبة للكيبورد 
e.key القيمة الفعلية للمفتاح
e.code المكان للزرار ف الكيبورد

بالنسبة لل preventDefault مثلا يعني زي ما شرحنا فوق، لو مثلا حطينا لينك معين عملناله تعطيل preventDefault ف مهما دوست عليه مش هيروح لحتة

```html

<a href="https://google.com" id="link">Go to google</a>
```
```js
document.getElementById("link").addEventListener("click", function(e){
    e.preventDefault();
    alert("Going to nothing");
});
```

بالنسبة لل Event Bubbling مثلا ضغطنا على زرار
الزرار هيتضغط
و ال div هيتأثر و ال body و من ثم ال Document كله

e.stopPropagation(); تستخدمه لو مش عايز الباقي يتأثر

امتى تستخدم البابلينج لو عندك مثلا اكتر من زرار ف الديف وكلهم بيعملوا نفس الحاجة فلما تدوس زرار كأنه كله اتداس


بالنسبة ازاي تكتب الايفنت او تهندل الإيفنت زي ما بيقولوا

- جوا ال html 
```html
<button onclick="alert('Hello')"> click me </button>
```
اول ما يضغط المستخدم الزرار يشتغل
عيوبها إنك بتحط الجافاسكربت فال html ودا (تنظيميا غلط)
مينفعش يعمل اكثر من حدث
ودي تعتبر طريقة قديمة مش مفضلة

الطريقة التانية وهي
- Object Property
- ربط ال html بال JS بحيث انك بتجيب العنصر ف ال JS وتنفذه جوا دالة جو بروبيرتي onclick

```html
<button id="btn">Click Me</button>
```
```js
document.getElementById("btn").onclick = function() {
	alert("hello");
}
```

عيبها انه مينفعش تعمل اكتر من حدث لنفس الزر ولو حطيت ف اخر حاجة هيشتغل
```js
btn.onclick = function() {
	console.log("First"); // decline
}
btn.onclick = function() {
	console.log("second") // will be active
}
```

الكود التاني هيشيل الأول

- بالنسبة لأفضل طريقة وهي ال addEventListener 
	-  الطريقة دي تعتبر الافضل لأنها بتفصل ال html عن ال JS 
	- تقدر تضيف اكثر من حدث لنفس العنصر
	- تقدر تتحكم فال Bubbling 
	- اسهل في المشاريع الكبيرة
```js
let btn = document.getElementById("btn");

btn.addEventListener("click", function() {
	console.log("1")
})
btn.addEventListener("click", function() {
	console.log("2")
})
```

1 , 2 هيظهروا 

وبس

---
