### **1. Document Object**

The document object represents the entire HTML document and is the entry point for accessing all 
elements on a page.
- Properties
    - bgColor: Specifies the background color.
        
    - fgColor: Specifies the text color.
        
    - linkColor: Color of unvisited links.
        
    - vlinkColor: Color of visited links.
        
    - alinkColor: Color of links when clicked.
        
    - title: Contents of the page title tag.

- Methods
    
    - Content Writing:
        
        - write(): Writes HTML expressions to the document.
        - writeln(): Writes HTML expressions followed by a new line character.
            
    - Element Access:
        
        - getElementById("ID"): Accesses an element by its ID.
            
        - getElementsByName("NAME"): Returns a collection of objects with a specific name.
            
        - getElementsByTagName("TAGNAME"): Returns a collection of objects with a specific tag.
            
        - getElementsByClassName("ClassName"): Returns a collection of objects with a specific class.
            
    - CSS Selectors:
        
        - querySelector(css rule): Returns the first element matching the CSS selector.
            
        - querySelectorAll(css rule): Returns a NodeList of all elements matching the CSS selector.

- Collections (Arrays containing entries for specific elements)
    
    - forms: All forms in the document.
    - images: All images in the document.
    - anchors: All anchors in the document.
    - links: All links in the document.

*  **Event Handlers** (Events that happen to the document itself):
* **`onClick`**: Triggered when the user clicks anywhere on the document.
	* **`onDblClick`**: Triggered when the user double-clicks anywhere on the document.
	* **`onKeyDown`**: Triggered when the user presses a keyboard key down.
	* **`onKeyPress`**: Triggered when the user presses a key (typically used for characters).
	* **`onKeyUp`**: Triggered when the user releases a keyboard key.
	* **`onMouseDown`**: Triggered when a mouse button is pressed down.
	* **`onMouseUp`**: Triggered when a mouse button is released.



---

### **2. Image Object**

The Image object represents an image created with the `<img>` tag. These are stored in the `document.images` array.

```js
// Reference:
	[window.]document.imageName
	[window.]document.imageID
	[window.]document.images[i]
	[window.]document.images[“ImgID”]
	[window.]document.getElementById(“ImageID”)
```
```html
<html>

	<body>
		<img name=“img1” src=“img1.jpg”>
		<img name=“img2” src=“img2.jpg”>
	</body>
</html>
```
* **Properties** (Attributes you can read or change):
	* **`name`**: The name of the image.
	* **`id`**: The unique ID of the image.
	* **`src`**: The source URL (file path) of the image.
	* **`height`**: The height of the image in pixels.
	* **`width`**: The width of the image in pixels.


*  **Event Handlers** (Interactions specific to images):
	* **`onmouseout`**: Triggered when the mouse pointer moves *away* from the image.
	* **`onmouseover`**: Triggered when the mouse pointer moves *onto* (over) the image.
	* **`onmousemove`**: Triggered when the mouse pointer moves *while it is over* the image.
	* **`onclick`**: Triggered when the user clicks the image.
	* **`ondblclick`**: Triggered when the user double-clicks the image.



**Example: Image Interaction**

```javascript
var img = document.getElementById("myImg");
// Change image size when mouse is over it
img.onmouseover = function() {
    this.width = "200"; 
    this.height = "200";
};

```

---
 
### 3. Form Object 
 
 Represents an HTML form. Objects within a form can be accessed by name or numeric index.

```js
[window.]document.formname
[window.]document.forms[i]
[window.]document.forms[“formNAME”]
[window.]document.forms[“formID”]
```

- Properties
    - elements[]: An array of all elements within the form.
    - length: The number of elements in the form.
    - name, id: The form's name and ID.
    - target: The target window for form submission.
- Methods
    
    - reset(): Clears all user input.
    - submit(): Submits the form content to the server.
    
- Event Handlers
    
    - onReset: Executed when the form is reset.
    - onSubmit: Executed when the form is submitted.

---

### **4. Text Object**

The Text object represents a text input field in an HTML form (created using `<input type="text">`).

- **Properties** (Attributes you can read or change):
    
    - **`value`**: Sets or returns the current text inside the input field.
        
    - **`readOnly`**: A boolean (true/false) that sets or returns whether the text field is read-only (user cannot edit it).
        
    - **`disabled`**: A boolean (true/false) that sets or returns whether the text field is disabled (grayed out and unusable).
        
- **Methods** (Actions you can perform on the text field):
    
    - **`blur()`**: Removes focus from the field5.
    - **`focus()`**: Assigns focus to the field; places the cursor inside the control.
    - **`select()`**: Selects (highlights) all the text content inside the control.
    
- **Event Handlers**:
    
    - **`onfocus`**: Triggered when the user clicks inside or tabs into the field (gains focus).
       
    - **`onblur`**: Triggered when the user leaves the field (clicks outside or tabs away).
       
    - **`onchange`**: Triggered when the user leaves the field **after** the content has been changed.
       

```js
var txt = document.getElementById("myText");

// Automatically highlight all text when the user clicks inside
txt.onfocus = function() {
    this.select(); 
};

// Alert the user only if they changed the text and left the field
txt.onchange = function() {
    alert("You changed the value to: " + this.value);
};
```

---

### **5. Drop Down List (Select Object & Option Object)**

This consists of a main `<select>` element containing multiple `<option>` elements.

#### **A. Properties for `<select>` (The List itself)**

- **`length`**: Returns the number of options in the list.
    
- **`selectedIndex`**: Returns the index number (starting at 0) of the currently selected option.
    
- **`options[]`**: An array containing all the option objects in the list.
    
- **`value`**: Sets or returns the value of the selected option.
	
- `text`: The text label associated with an option 
    
- **`multiple`**: Sets or returns whether multiple items can be selected at once.

#### **B. Properties for `<option>` (Individual Items)**

- **`selected`**: A boolean (true/false) indicating if this specific option is chosen.
    
- **`value`**: The data value associated with the option (what is sent to the server).
    
- **`text`**: The visible text label displayed to the user.
    
- **`index`**: The position of the option in the list.
    

#### **C. Methods (For the Drop Down)**

- **`add()`**: Adds a new option to the dropdown list.
- **`remove()`**: Removes an option from the dropdown list.
- **`focus()`**: Assigns focus to the list.
- **`blur()`**: Removes focus from the list.

#### **D. Event Handlers**

- **`onfocus`**: Triggered when the list gains focus.
    
- **`onblur`**: Triggered when the list loses focus.
    
- **`onchange`**: Triggered when the user chooses a **different** option than the one currently selected.
    

**Example: Drop Down List**



```js
// HTML: <select id="mySelect"><option value="A">Apple</option><option value="B">Banana</option></select>

var list = document.getElementById("mySelect");

// Check which item is selected using selectedIndex
list.onchange = function() {
    var index = this.selectedIndex; // Get the number (e.g., 1)
    var text = this.options[index].text; // Get the text (e.g., "Banana")
    alert("You picked: " + text);
};

// Add a new option programmatically
// Note: Actual syntax usually requires creating an Option object first, 
// but the lecture lists 'add()' as a method.
```
---
### **6. Button Object**

Represents a standard HTML button `<input type="button">`.

*  **Methods** (Actions the button can perform):
	* **`blur()`**: Removes focus from the button.
	* **`focus()`**: Assigns focus to the button (places the cursor/selection on it).
	* **`click()`**: Programmatically simulates a mouse click on the button (acts as if the user clicked it).
* **Event Handlers**:
	* **`onclick`**: The mouse is clicked and released over the button.
	* **`ondblclick`**: The mouse is double-clicked over the button.
	* **`onmousedown`**: The mouse button is pressed down over the button.
	* **`onmouseup`**: The mouse button is released over the button.
	* **`onmouseover`**: The mouse cursor is moved on top of the button.
	* **`onmouseout`**: The mouse cursor is moved off the button.
**Example: Button Methods**

```javascript
var btn = document.getElementById("submitBtn");
// Automatically click the button via code
btn.click(); 
// Remove focus from the button
btn.blur();

```

---

### **7. Radio Button Object**

Represents a radio button `<input type="radio">`. Radio buttons are usually grouped by `name` so only one can be selected at a time.

*  **Properties**:
	* **`length`**: The number of radio buttons with the same name.
	* **`checked`**: A boolean (true/false) indicating if the button is currently selected.
	* **`value`**: The value attribute associated with the button.
* **Methods**:
	* **`blur()`**: Removes focus from the radio button.
	* **`focus()`**: Assigns focus to the radio button.
	* **`click()`**: Simulates a click on the radio button (selecting it).
* **Event Handlers**:
	* **`onfocus`**: Triggered when the control gains focus.
	* **`onblur`**: Triggered when the control loses focus.
	* **`onclick`**: Triggered when the button is clicked.

---

### **8. Check Box Object**

Represents a checkbox `<input type="checkbox">` which allows independent selection.

* **Properties**:
	* **`checked`**: A boolean (true/false) indicating if the box is checked.
	* **`value`**: The value attribute of the checkbox.
- **Methods**:
	* **`blur()`**: Removes focus from the checkbox.
	* **`focus()`**: Assigns focus to the checkbox.
	* **`click()`**: Simulates a mouse click (toggling the checkbox).
* **Event Handlers**:
	* **`onfocus`**: Triggered when the control gains focus.
	* **`onblur`**: Triggered when the control loses focus.
	* **`onclick`**: Triggered when the checkbox is clicked.

---

### **9. DIV vs. SPAN (Detailed Explanation)**

Both `DIV` and `SPAN` are used to add text or HTML elements to a page dynamically without removing existing page contents. The document distinguishes them primarily by how you manipulate their content properties.

#### **Content Properties (The Differences)**
There are three main properties used to interact with the content inside a DIV or SPAN:

1. **`innerText`**:
* **Function**: Sets or returns the text content.
* **Detail**: It is "aware of the rendered appearance of text". It treats HTML tags as literal text, not code.
	* *Result:* If you add `<b>text</b>`, the user sees the characters `<b>` on screen.


2. **`textContent`**:
* **Function**: Sets or returns the text content.
* **Detail**: The document notes it executes HTML tags in the text, though standard behavior often treats it as raw text. The provided example shows it outputting the tags literally.
3. **`innerHTML`**:
* **Function**: Sets or returns the **HTML code** inside the element.
* **Detail**: It executes the HTML tags found in the string.
	* *Result:* If you add `<b>text</b>`, the browser renders the word **text** in bold.



#### **Example: DIV/SPAN Content Manipulation**

This example demonstrates the exact behavior described in the lecture:

```javascript
// Assume HTML: <div id="d1"></div>

// 1. Using innerText
document.getElementById("d1").innerText = "<b>new text</b>";
// Output on screen: <b>new text</b> (The tags are visible to the user)

// 2. Using textContent
document.getElementById("d1").textContent = "<b>new text</b>";
// Output on screen: <b>new text</b> (The tags are visible)

// 3. Using innerHTML
document.getElementById("d1").innerHTML = "<b>new text</b>";
// Output on screen: new text (The text is bold, tags are hidden and executed)

```

---
### **10. Variety of DOM References (Finding HTML Elements)**

This section outlines the different methods available to locate and access specific elements within the HTML document structure.

- **Finding HTML elements by ID**: accessing a unique element using its `id` attribute.
    
- **Finding HTML elements by tag name**: accessing a collection of elements that share the same tag (e.g., all `<div>` tags).
    
- **Finding HTML elements by class name**: accessing a collection of elements that share the same specific CSS class.
    
- **Finding HTML elements by CSS selectors**: using `querySelector` or `querySelectorAll` to find elements using standard CSS syntax (e.g., `#id`, `.class`).
    
- **Finding HTML elements by HTML object collections**: accessing elements through built-in arrays like `document.images`, `document.forms`, or `document.links`.
    

### **11. The `this` Object**

The `this` keyword is used to refer to the **current object** being interacted with. It acts as a self-reference, allowing an element to change its own properties without needing to look up its ID.

#### **Usage 1: Self-Reference in Event Handlers**

You can use `this` directly inside an HTML tag's event attribute to modify that specific element.

- **Example**: Changing the text inside an input field when the user focuses on it.
```html
    <input type="text" onFocus="this.value='You are in!'"/>
```

#### **Usage 2: Passing Current Object to a Function**

You can pass `this` as a parameter to a JavaScript function. This allows a single function to handle events for multiple different elements dynamically.

- **Example**:
```js
    function myFunction(myObject) {
       // 'myObject' becomes the element that was clicked
       myObject.value = "In the function!!"; 
    }
```

```html
<input type="text" onClick="myFunction(this)"/>
```

---

# Reference

- DOM HTML Objects reference
	- http://www.w3schools.com/jsref/default.asp
- innerText
	- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
- textContent
	- https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
- Quiz on this Lecture:
	- https://gemini.google.com/share/a6822ddce8e2