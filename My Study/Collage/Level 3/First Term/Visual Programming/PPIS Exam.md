
1. Which method is used to programmatically add an item to a ListBox?
   A) ListBox.AddItem()
   B) ListBox.Items.Add()
   C) ListBox.Append()
   D) ListBox.Items.Insert()
   **✅ Correct Answer: B) ListBox.Items.Add()**

2. Which of the following is the correct syntax for TryParse on a string value "45.67" to parse as a double?
   A) double.TryParse(out result, "45.67");
   B) double.Parse("45.67", result);
   C) TryParse("45.67", result);
   D) double.TryParse("45.67", out result);
   **✅ Correct Answer: D) double.TryParse("45.67", out result);**

3. Which of the following methods would you use to add new lines to a file without overwriting its contents?
   A) File.AppendText
   B) File.CreateText
   C) File.WriteAllText
   D) File.ReadAllText
   **✅ Correct Answer: A) File.AppendText**

4. To close an application's form in code, you use the statement this.Close();
   A) True
   B) False
   **✅ Correct Answer: A) True**

5. Which property controls how the background image is displayed on the form?
   A) ImageLayout
   B) SizeMode
   C) BackgroundImageLayout
   D) Image
   **✅ Correct Answer: C) BackgroundImageLayout**

6. What will be the output of the following code?
   `string str = "Hello"; MessageBox.Show(str.IndexOf('h'));`
   A) 0
   B) 1
   C) -1
   D) Error
   **✅ Correct Answer: C) -1** *(Note: 'h' is lowercase, but "Hello" starts with uppercase 'H', so it's not found.)*

7. The Load event takes place after the form is displayed on the screen.
   A) True
   B) False
   **✅ Correct Answer: B) False**

8. How can you programmatically set focus to a TextBox control named textBox1?
   A) textBox1.SetFocus();
   B) textBox1.Focus();
   C) SetFocus(textBox1);
   D) textBox1.Focus= true;
   **✅ Correct Answer: B) textBox1.Focus();**

9. When you call a string object's Split method, the method divides the string into substrings and returns them as an array of strings.
   A) True
   B) False
   **✅ Correct Answer: A) True**

10. Which property of the GroupBox is used to set the title displayed at the top of the box?
    A) Text
    B) Title
    C) Header
    D) Name
    **✅ Correct Answer: A) Text**

11. Which property controls how the image is sized or stretched within the PictureBox?
    A) AutoSize
    B) ImageMode
    C) Stretch
    D) SizeMode
    **✅ Correct Answer: D) SizeMode**

12. EndOfFile property is used to checks whether the end of the file has been reached?
    A) True
    B) False
    **✅ Correct Answer: B) False** *(Note: In typical .NET streams, the property is `EndOfStream`. `EndOfFile` is VB-specific or legacy.)*

13. What is returned when the user clicks the Open button in OpenFileDialog?
    A) Dialog.Open
    B) Dialog.OK
    C) DialogResult.Open
    D) DialogResult.OK
    **✅ Correct Answer: D) DialogResult.OK**

14. The ................ file format is commonly used to export spreadsheet data to a text file.
    A) SDV
    B) CSV
    C) XML
    D) PDF
    **✅ Correct Answer: B) CSV**

15. In a Windows Forms application, where should you declare a field variable if you need to access it from multiple event handlers (e.g., button clicks)?
    A) Inside each method where it is used
    B) As a parameter in each method
    C) At the class level, outside any methods
    D) In the Main method
    **✅ Correct Answer: C) At the class level, outside any methods**

16. Forms and most controls have a ForeColor property that allows you to change the object's background color.
    A) True
    B) False
    **✅ Correct Answer: B) False**

17. rand.Next(10) returns ........................
    A) 0 to 9
    B) 1 to 10
    C) 0 to 10
    D) -10 to 10
    **✅ Correct Answer: A) 0 to 9**

18. String.Compare() returns a Boolean value
    A) True
    B) False
    **✅ Correct Answer: B) False** *(Note: It returns an integer.)*

19. What will be the output of the following code?
    `double x = 123.41; MessageBox.Show(x.ToString("n1"));`
    A) 123.41
    B) 123.4
    C) $123.41
    D) $123.4
    **✅ Correct Answer: B) 123.4**

20. Trim() removes whitespace in the middle of a string.
    A) True
    B) False
    **✅ Correct Answer: B) False**

21. What will be the output of the following code?
    `string str1 = "Hello"; string str2 = str1.Remove(1); MessageBox.Show(str2);`
    A) H
    B) ello
    C) Hllo
    D) e
    **✅ Correct Answer: A) H**

22. You add your own code to the Program.cs file as you develop an application.
    A) True
    B) False
    **✅ Correct Answer: A) True**

23. What would you use to determine if any RadioButton in a group is selected?
    A) if (radioButton.Checked == true)
    B) if (radioButton.Text == "Selected")
    C) radioButton.IsChecked
    D) radioButton.Selected == true
    **✅ Correct Answer: A) if (radioButton.Checked == true)**

24. Which of the following is not a valid value for the BorderStyle property of a Label control?
    A) FixedSingle
    B) Fixed3D
    C) FixedDouble
    D) None
    **✅ Correct Answer: C) FixedDouble**

25. The default value of the AutoSize property of a Label control is True.
    A) True
    B) False
    **✅ Correct Answer: A) True**

26. Which property hides the characters typed in a TextBox (for passwords)?
    A) Hidden
    B) UseSystemPasswordChar
    C) Password
    D) PasswordChar
    **✅ Correct Answer: D) PasswordChar**

27. You can clear the contents of a TextBox control in the same way that you clear the contents of a Label control.
    A) True
    B) False
    **✅ Correct Answer: B) False**

28. Which of the following statements allows you to select the item at index 2 in a ListBox?
    A) ListBox.SelectItem(2);
    B) ListBox.Items[2].Selected = true;
    C) ListBox.Select(2);
    D) ListBox.SelectedIndex = 2;
    **✅ Correct Answer: D) ListBox.SelectedIndex = 2;**

29. Consider the following code:
    `private void checkBox1_CheckedChanged(...) { MessageBox.Show("Changed"); }`
    How many times is the message shown when the user checks and then unchecks the CheckBox1?
    A) 0
    B) 1
    C) 2
    D) None of these
    **✅ Correct Answer: C) 2**

30. Multiple RadioButton controls in the same GroupBox can be selected at the same time.
    A) True
    B) False
    **✅ Correct Answer: B) False**

31. What is the output of the following code?
    `static void Test(int a, int b = 5, int c = 3) { ... }` called with `Test(2, 3);`
    A) 5
    B) 8
    C) 10
    D) Error
    **✅ Correct Answer: B) 8** *(Math: a=2, b=3, c=3 (default). Sum = 8)*

32. Which of the following is NOT considered an overload of the method `void Sum(int number1, int number2)`?
    A) void Sum(int number1)
    B) int Sum(int number1, int number2)
    C) void Sum(double number1, int number2)
    D) void Sum(double number1, double number2)
    **✅ Correct Answer: B) int Sum(int number1, int number2)** *(Reason: You cannot overload based on return type only.)*

33. Which of the following is NOT the correct way to define and initialize an array of 3 integers?
    A) `int[] a = {5, 3, 4};`
    B) `int[] a; a = new int[3]{5, 3, 4};`
    C) `int[] a; a = new int[3]; a[0]=5; ...`
    D) `int[] a; a = new int{5, 3, 4};`
    **✅ Correct Answer: D** *(Reason: Missing square brackets `[]` after `new int`)*
