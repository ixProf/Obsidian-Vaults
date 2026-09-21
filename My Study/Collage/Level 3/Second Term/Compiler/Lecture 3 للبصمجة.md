
# 3.1 The Parsing Process

- ==Parsing== is the ==task of Syntax Analysis==  
	
- The syntax is defined by the grammar rules of a Context-Free Grammar 
	
- The ==rules== of a context-free grammar are ==recursive== 
	
- The ==basic data structure of Syntax Analysis== is ==parse tree or syntax tree==  
	- The syntactic structure of a language must also be recursive
	
- Takes the sequence of ==tokens== produced by the scanner as its ==input== and produces ==the syntax tree as its output==
	
- Issues of the Parsing
	- Parser calls a scanner `getToken` to fetch the next token from the input, parser follow: `SyntaxTree = parser()`
		
	- in Single-Pass compiler
		- No Explicit syntax tree needs
			
		- the parser steps themselves will represent the syntax tree implicitly by call `Parse()`
		
	- In-Multi-Pass compiler
		- the further passes will use the ==syntax tree as their input==
			
		- SyntaxTree is a Dynamic data structure
		
	- Treatment of errors
		- is more difficult for the parser than the scanner
			
		- Error in scanner:
			- Generate and error token and consume the offending character
				
		- Error in Parser
			- The parser ==must not only report an error message==
				
			- The parser ==must recover from the error and continue parsing "to find as many errors as possible"==
			
		- Parser may perform as an error repair
			- Error recovery ==is the reporting of meaningful error messages== and the resumption of parsing as close to the actual error as possible

---
# 3.2 Context-Free Grammars

- A context-free grammar ==is a specification for the syntactic structure of a programming language==  
	- Similar to the specification of the lexical structure of a language using regular expressions  
	- Except involving recursive rules  

---
## 3.2.1 Comparison to Regular  Expression Notation

- Basic Regular Expression Rules:
	- ==Three== Operations:
		- Choice
		- Concatenations
		- Repetition
	- Equal Sign represents the ==definition== of a name for a regular expression
	- ==Name== was written in ==italics== to distinguish it from a sequence of actual characters.
	
- Grammars Rules
	- ==Vertical Bar== appears as ==meta-symbol== for choice
		
	- Concatenation ==is used as a standard operation==
		
	- ==NO META-SYMBOL FOR REPETITION==
		
	- Use the ==arrow symbol== -> to express the definitions of names instead of ==equality== =
		
	- Name are written in italic
		
	- Grammar rules ==use regular expressions as components==
	- Grammar rules in this form usually said to be in BNF

---
## 3.2.2 Specification of Context-Free Grammar Rules

- Symbols of grammar rules
	
	- Grammar rules are ==defined 'OVER' an alphabet== or set of symbols
	- Using the Regular Expressions to ==represent the tokens==
- Construction of CFG rule
	- Given an alphabet, a CFG rule in BNF consist of string of symbols.
		- 1st symbol -> name for a structure
		- 2nd symbol -> is the meta-symbol "->".
		- this symbol followed by a string of symbols
		exp -> exp op exp
		op -> + | - | *
	- A grammar rule in BNF is ==interpreted as follows==
		- The rule defines the structure whose ==name is to the left of the arrow==
		- the structure is defined to consist of one of the choices on the right-hand side separated by the vertical bars ' | '
		- The sequences of symbols and structure names within each choice defines the layout of the structure
		exp -> exp op exp
		op -> + | - | *

---
## 3.2.3 Derivations & Language Defined by a Grammar

- CFG rules determine the set of ==syntactically legal string of tokens symbols for the structures defined by the rules==
- Derivations
	- A derivation ==is a sequence of replacements of structure names by choices on the right sides of grammar rules==
		
	- A derivation **begins** with a ==single structure name== and **ends** with ==a string of token symbols==
		
	- At each step in a derivation, a single replacement is made using ==one choice from a grammar rule==
		
	- Grammar rules determine ==the legal strings of token symbols== by ==means of derivations==


- Language Defined by a Grammar
	- ==the set of all strings of token symbols obtained by derivations== from the exp symbol is ==Language defined by the grammar== of expressions
	
- Grammar for a Programming Language
	- The grammar for a programming language often defines a structure ==called program==

- Symbols in Rules
	- Start symbol
		- ==The most general structure== is listed first in the grammar rules
	- Non-Terminals
		- ==Structure names== are also called ==non-terminals==, since they always must be ==replaced further on in a derivation==
	- Terminal
		- ==Symbols in the alphabet==
		- Terminals are ==usually tokens==

- Recursion
	- The Grammar Rule:
		- A -> A a | a
		- A -> a A | a
	- Generates the language (the set of all strings of one or more a's) -> a+
	- Left-Recursive
		- The non-terminal ==A== appears as the ==**'first'** symbol on the right-hand side== of the rule defining A
			A -> A a | a
	- Right-Recursive
		- The non-terminal A appears as the ==**'last'** symbol on the right-hand side== of the rule defining A
			A -> a A | a
		

---
# 3.3 Parse trees and abstract syntax trees


## 3.3.1 Parse Tree

### Derivation VS Structure

- Derivations don't ==uniquely represent the structure of the strings==
### Parsing Tree

- A parse tree corresponding to a derivation is a ==labeled tree==
	- Interior nodes -> non-terminal , the leaf nodes -> terminals
	- And the children of each internal node represent the replacement of the associated non-terminal in one step of the derivation
![[Pasted image 20260609093801.png]]

- Left Most Derivation
	- exp => exp op exp
		 => number op exp
		 => number + exp
		 => number + number
	- A derivation in which the ==leftmost non-terminal is replaced at each step in the derivation==
	- Corresponds to the ==preorder== numbering of the internal nodes of its associated parse tree
- Right Most Derivation
	- exp => exp op exp
		 => exp op number
		 => exp + number
		 => number + number
	- A derivation in which the ==rightmost non-terminal is replaced at each step in the derivation==
	- Corresponds to the ==postorder numbering== of the internal nodes of its associated parse tree

## 3.3.2 Abstract Syntax Tree

- The parse tree ==contains more information than is absolutely necessary== for a compiler
	
-  Tree for Expression (34-3) * 42
	- The parentheses tokens have ==actually disappeared==
		- still represents precisely the semantic content of  subtracting 3 from 34, and then multiplying by 42.
![[Pasted image 20260609095205.png]]

- Abstract syntax trees or syntax trees?
	- Syntax trees represent abstractions of the actual source code token sequences,  
		- The token sequences ==cannot be recovered== from them (unlike parse trees).  
		- Nevertheless they ==contain all the information needed for translation==, in a more efficient form than parse trees
	- A parse tree is a representation for the structure of ordinary ==called concrete syntax== when comparing it to abstract syntax.
		
	- Abstract syntax can be given a formal definition using a BNF-like notation, just like concrete syntax
# 3.4 Ambiguity

- What's Ambiguity?
	- Parse tress and syntax trees ==uniquely express the structure of syntax==
	- But it is possible for a grammar to permit a string to have ==more than one parse tree==
	![[Pasted image 20260609102007.png]]

- An Ambiguous Grammar
	- A grammar that generates a string with ==distinct parse trees==
	- Such a grammar represents a serious problem for a parser
	- an ambiguous grammar is ==like a non-deterministic automaton==
		
	- Ambiguity in grammars ==cannot be removed nearly as easily as NFA==
	- Ambiguity Grammars always ==fail the test== that we introduce later for the standard parsing algorithms

- Two Basic Methods dealing with ambiguity
	- Method 1: Disambiguating Rules
		- Keep the grammar unchanged and add rules to specify the correct interpretation.
			1. Operator Precedence: Determines which operator is evaluated first.
				Example:
				  34 - 3 * 42
				Since `*` has higher precedence than `-`, it is interpreted as:
					34 - (3 * 42)
			 2. Operator Associativity: Determines the evaluation order when operators have the same precedence.
				Example:
					34 - 3 - 2
				If `-` is ==**left-associative**==, it becomes:
					==(34 - 3)== - 2
			- Advantages
				- Grammar remains simple.
				-  No need to rewrite the grammar.
			- Disadvantages
				- The language structure is not described by the grammar alone.
				-  Additional rules must be known separately.
	
	- Method 2: Rewrite the Grammar
		- Modify the grammar so that it produces only one valid parse tree for each string.
			- Example:
				exp → factor op factor | factor
				factor → (exp) | number
				op → + | - | *
		- This grammar allows only one operation at a time.
		- Therefore expressions like:
			34 - 3 - 42
			34 - 3 * 42
			are **illegal** and ==must be written with parentheses==:
				(34 - 3) - 42
				34 - (3 * 42)
		- Advantages
			- The grammar itself completely defines the syntax.
			- No external disambiguation rules are required.
	    - Disadvantages
		    - The grammar may become more complex.
		    - It may change the language being recognized (some previously valid expressions become invalid).

---

## 3.4.2 Precedence and Associativity

### 1. Group of Equal Precedence

To give operators ==different precedence levels, the grammar is divided into multiple non-terminals==:

```text
exp    → exp addop exp | term
addop  → + | -
term   → term mulop term | factor
mulop  → *
factor → (exp) | number
```

- `+` and `-` belong to the same precedence level.
    
- `*` belongs to a higher precedence level.
    
- In the parse tree, lower-precedence operators appear closer to the root.
    
- Therefore, `+` and `-` are evaluated after `*`.
    

Example:

```text
34 - 3 * 42
```

is interpreted as:

```text
34 - (3 * 42)
```

---

### 2. Precedence Cascade

A **precedence cascade** is created by introducing different grammar levels:

```text
exp
 ↓
term
 ↓
factor
```

Each level represents a different operator precedence.

A common unambiguous form is:

```text
exp    → exp addop term | term
addop  → + | -
term   → term mulop factor | factor
mulop  → *
factor → (exp) | number
```

---

### 3. Associativity

Associativity is controlled by recursion direction.

#### Left Recursion ⇒ Left Associativity

```text
exp → exp addop term | term
```

Example:

```text
34 - 3 - 42
```

becomes:

```text
(34 - 3) - 42
```

---

#### Right Recursion ⇒ Right Associativity

```text
exp → term addop exp | term
```

Example:

```text
34 - 3 - 42
```

becomes:

```text
34 - (3 - 42)
```

---

### 4. Removal of Ambiguity

The final unambiguous grammar is:

```text
exp    → exp addop term | term
addop  → + | -
term   → term mulop factor | factor
mulop  → *
factor → (exp) | number
```

This grammar guarantees:

- `*` has higher precedence than `+` and `-`.
    
- `+`, `-`, and `*` are left-associative.
    
- Only one parse tree is generated for each valid expression.
    

---

### 5. Example: `34 - 3 * 42`

Using the grammar above:

```text
34 - 3 * 42
```

is parsed as:

```text
34 - (3 * 42)
```

because:

1. `3 * 42` is reduced at the `term` level.
    
2. Then subtraction is performed at the `exp` level.
    

---

- **Precedence** determines which operator is evaluated first.
    
- **Associativity** determines evaluation order among operators with the same precedence.
    
- **Left recursion ⇒ Left associativity.**
    
- **Right recursion ⇒ Right associativity.**
    
- **Precedence cascades** are used to remove ambiguity in expression grammars.
    
- Parse trees become larger, but syntax trees are not affected.

---

## 3.4.3 The Dangling Else Problem

### What is the Dangling Else Problem?

The **Dangling Else Problem** is a grammar ambiguity that occurs when an `else` clause can be associated with more than one `if` statement.

Consider:

```c
if (0)
    if (1)
        other
    else
        other
```

The question is:

**Which `if` does the `else` belong to?**

---

### Why is the Grammar Ambiguous?

Given:

```text
statement → if-stmt | other

if-stmt → if (exp) statement
        | if (exp) statement else statement

exp → 0 | 1
```

The string:

```text
if (0) if (1) other else other
```

can generate **two different parse trees**.

#### Interpretation 1

Associate `else` with the **first (outer) if**:

```c
if (0)
{
    if (1)
        other;
}
else
{
    other;
}
```

---

#### Interpretation 2

Associate `else` with the **second (inner) if**:

```c
if (0)
{
    if (1)
        other;
    else
        other;
}
```

Since two parse trees exist, the grammar is ambiguous.

---

### Standard Solution: Closest Nested Rule

Most programming languages use the rule:

> An `else` is matched with the nearest unmatched `if`.

This is called the:

#### Most Closely Nested Rule

Therefore:

```c
if (x != 0)
    if (y == 1/x)
        ok = TRUE;
    else
        z = 1/x;
```

is interpreted as:

```c
if (x != 0)
{
    if (y == 1/x)
        ok = TRUE;
    else
        z = 1/x;
}
```

The `else` belongs to the inner `if`.

---

### How to Associate Else with the Outer If?

Use braces:

```c
if (x != 0)
{
    if (y == 1/x)
        ok = TRUE;
}
else
{
    z = 1/x;
}
```

Now the `else` clearly belongs to the outer `if`.

---

### Removing the Ambiguity in BNF

Split statements into:

#### Matched Statements

Every `if` has a matching `else`.

#### Unmatched Statements

An `if` without an `else`.

Grammar:

```text
statement → matched-stmt
          | unmatched-stmt

matched-stmt →
      if (exp) matched-stmt else matched-stmt
    | other

unmatched-stmt →
      if (exp) statement
    | if (exp) matched-stmt else unmatched-stmt
```

---

### Main Idea

Only a **matched-stmt** can appear before an `else`.

This forces every `else` to be matched as soon as possible with the nearest unmatched `if`.

Thus ambiguity is removed.

---
 Definition: **Dangling Else Problem:** An ambiguity that occurs when an `else` can be associated with more than one `if`.

Standard Disambiguating Rule: Associate each `else` with the nearest unmatched `if`.**

Methods to Remove the Ambiguity

1. Use the **most closely nested rule**.
    
2. Rewrite the grammar using **matched-stmt** and **unmatched-stmt**.
    
3. Require every `if` to have an `else`.
    
4. Use explicit closing keywords such as `end if`.
    

---
## 3.4.4 Inessential Ambiguity — Summary

## Definition

**Inessential Ambiguity** occurs when ==a grammar is ambiguous, but the ambiguity does **not affect the meaning== (semantics)** of the program.

In other words:

- Multiple parse trees may exist.
    
- The final syntax tree or semantic ==result remains the same.==
    
- Therefore, we usually do not care which parse tree is chosen.
    

---

## Example 1: Statement Sequences

Grammar:

```text
stmt-sequence → stmt-sequence ; stmt-sequence
              | stmt

stmt → s
```

Consider:

```text
s ; s ; s
```

Two parses are possible:

### Left Grouping

```text
(s ; s) ; s
```

### Right Grouping

```text
s ; (s ; s)
```

The grammar is ambiguous because there are multiple parse trees.

However, both represent the same sequence of statements:

```text
s
s
s
```

So the abstract syntax tree can be considered equivalent.

This ambiguity ==is therefore **inessential**.==

---

## Example 2: Associative Operations

Consider arithmetic addition:

```text
a + b + c
```

Possible parses:

```text
(a + b) + c
```

or

```text
a + (b + c)
```

Since addition is associative:

```text
(a + b) + c = a + (b + c)
```

both expressions produce exactly the same result.

---

### Another Example

String concatenation:

```text
("ab" + "cd") + "ef"
```

and

```text
"ab" + ("cd" + "ef")
```

both produce:

```text
abcdef
```

Again, the ambiguity does not change the meaning.

---

## Why Is It Called "Inessential"?

Because the ambiguity exists only in the grammar structure.

It does **not** affect:

- program behavior,
    
- semantic meaning,
    
- final computed value.
    

Therefore the ambiguity is considered "inessential" (not important).

---

## Important Note

Even if the ambiguity is harmless:

> A parser still cannot accept multiple parse trees without choosing one.

So the compiler writer must still provide a disambiguation rule, such as:

- left associativity
    
- right associativity
    
- precedence rules
    

to help the parser construct a single parse tree.

---

### Essential vs. Inessential Ambiguity

|Essential Ambiguity|Inessential Ambiguity|
|---|---|
|Changes program meaning|Does not change program meaning|
|Different parse trees produce different semantics|Different parse trees produce same semantics|
|Must be removed carefully|Often harmless|
|Example: Dangling Else|Example: `a + b + c`|

---