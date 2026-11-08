---
title: "Multidimensional Data Set"
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
- **Definition**: A multidimensional data set in Python is typically represented as a "list of lists," where each inner list represents a row of data. This is commonly used for two-dimensional (2D) arrays, like tables or matrices.
- **Example**:

```
| 22 | 18 | 709 | 5 | 33  |
| 45 | 32 | 830 |120| 750 |
| 4 | 880 | 45 | 66 | 61 |
```

Stored in Python as:
`data = [[22, 18, 709, 5, 33], [45, 32, 830, 120, 750], [4, 880, 45, 66, 61]]`

- **Accessing Elements**: You can access an element using two indices: `data[row][column]`. For example, `data[1][3]` returns 120 (row 1, column 3).
- **Key Point**: This structure mimics a 2D array, making it intuitive for representing tabular data.

#### Initialization Pitfalls (Page 40)

- **Common Mistake #1**: Using multiplication to initialize a 2D list incorrectly:
    `data = ([0] * c) * r # Wrong!`
    
    - Here, c is the number of columns, and r is the number of rows. This creates a single list of length r * c, not a list of r separate lists. For example, `([0] * 3) * 2` becomes `[0, 0, 0, 0, 0, 0]`, not `[0, 0, 0], [0, 0, 0].`
- **Common Mistake #2**: Using a single list reference multiplied:
    `data = [[0] * c] * r # Still Wrong!`
    
    - This creates a list of r references to the _same_ inner list. For example, `[0] * 3] * 2 ` results in`[0, 0, 0], [0, 0, 0]`, but both inner lists are the same object in memory.
    - Problem: Changing one element affects all rows. If you do `data[2][0] = 100`, it changes `data[0][0]` too because they point to the same list.

#### Correct Initialization (Page 41)

- **Solution**: Use a list comprehension to ensure each row is an independent list
    
    `data = [[0] * c for j in range(r)]`
    
    - This creates r distinct inner lists, each with c zeros. For example, `[0] * 3 for j in range(2)]` gives`[0, 0, 0], [0, 0, 0]`, where each inner list is separate.
- **Why It Works**: The `[0] * c `expression is evaluated anew for each iteration of the for loop, avoiding shared references.
- **Key Point**: Proper initialization prevents unintended side effects when modifying elements.

#### Practical Implications

- **Use Case**: Multidimensional data sets are useful for grids, matrices, or any data with rows and columns (e.g., spreadsheets, game boards).
- **Memory Consideration**: Since this is a referential structure (each element is a reference), it’s flexible but uses more memory than a compact array.