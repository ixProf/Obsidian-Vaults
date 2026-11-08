---
title: "Variable Shadowing in Go"
aliases: ["Shadowing in Go", "Go Shadowing"]
type: permanent
status: evergreen
domain: programming-languages
tags: [permanent, go, scope, shadowing]
created: 2026-11-08
updated: 2026-11-08
source: "[[30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 4]]"
related: ["[[20 Zettelkasten/Permanent Notes/Go Modules]]", "[[30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 4]]", "[[10 Maps of Content/Programming Languages MOC]]"]
---

# Variable Shadowing in Go

## Idea

Shadowing happens when a declaration inside an inner block reuses the name of an identifier from an outer block. The inner declaration hides the outer one for as long as it is in scope; the outer variable itself is not changed.

## Explanation

### The basic case

```go
func main() {
    x := 10

    if x > 5 {
        fmt.Println(x)
        x := 5
        fmt.Println(x)
    }

    fmt.Println(x)
}
```

Output:

```text
10
5
10
```

- The first `fmt.Println(x)` reads the outer `x`, which is `10`.
- `x := 5` declares a **new** variable inside the `if` block, hiding the outer one.
- The second `fmt.Println(x)` prints the inner value, `5`.
- After the `if` ends, the inner variable leaves scope and the outer `x` is visible again, still `10`.

The outer variable does not disappear and its value does not change. It is simply not reachable by that name while the inner declaration is in scope.

### Shadowing with multiple assignment

```go
func main() {
    x := 10

    if x > 5 {
        x, y := 5, 20
        fmt.Println(x, y)
    }

    fmt.Println(x)
}
```

Output:

```text
5 20
10
```

Even though `x` already exists in the outer block, `x, y := 5, 20` shadows `x` and declares a new `y` inside the `if`. The reason is that `:=` reuses variables only from the **same block**, not from outer blocks. It is legal as long as at least one variable on the left is new.

This is why `:=` deserves care: it can shadow an existing variable by accident when the intent was to assign to it. To change a variable in the same scope, use `=` instead of `:=`.

### Shadowing package names

Shadowing is not limited to variables. A local declaration can hide an imported package name:

```go
func main() {
    x := 10
    fmt.Println(x)

    fmt := "oops"
    fmt.Println(fmt)
}
```

This fails to compile:

```text
fmt.Println undefined (type string has no field or method Println)
```

After `fmt` is declared as a local string, the name refers to the string, not to the `fmt` package, so `fmt.Println` is no longer available in that scope. Avoid using well-known package names as local variable names.

### The universe block

Go's outermost scope is the **universe block**, which predeclares names such as the built-in types (`int`, `string`), constants (`true`, `false`), built-in functions (`make`, `close`), and `nil`. These are not keywords, so they can also be shadowed. Doing so is legal but usually a bad idea: it can cause unexpected behaviour or compilation errors and makes bugs harder to find. Because shadowing is sometimes intentional, `go vet` does not treat every case as an error.

## Why it matters

- Shadowing silently changes which variable a name refers to, which is a common source of logic bugs.
- `:=` inside an `if`, `for`, or `switch` block creates new variables rather than updating outer ones.
- Shadowing an imported package name breaks code that uses that package in the same scope.
- The outer value is preserved, so the bug can be invisible until the inner block exits.
- Prefer `=` for assignment and use `go vet` as a check, not as a guarantee.

## Related

- [[20 Zettelkasten/Permanent Notes/Go Modules]]
- [[30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 4]]
- [[10 Maps of Content/Programming Languages MOC]]

## Source

- `Go - Chapter 4.md`, "Blocks", "Shadowing Variables", "Shadowing with Multiple Assignment", "Shadowing Package Names", and "The Universe Block" (including the `10 / 5 / 10` example and the `fmt` compilation error).
