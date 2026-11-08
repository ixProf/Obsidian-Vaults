---
title: "Go Modules"
aliases: ["Go Module", "go.mod"]
type: permanent
status: evergreen
domain: programming-languages
tags: [permanent, go, modules, dependencies]
created: 2026-11-08
updated: 2026-11-08
source: "[[30 Sources/Other Sources/My Master/Roadmap/GoLang/Chapter 1 & 2 From Learning Go (Jon Bonder)]]"
related: ["[[20 Zettelkasten/Permanent Notes/Variable Shadowing in Go]]", "[[30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 3]]", "[[10 Maps of Content/Programming Languages MOC]]"]
---

# Go Modules

## Idea

A Go module is the unit that ties a project to its identity and its dependencies. It is created with `go mod init` and recorded in a `go.mod` file at the project root, so a build can be reproduced from an explicit list of requirements instead of the developer's machine.

## Explanation

### Creating a module

From a project directory:

```bash
mkdir ch1
cd ch1
go mod init hello_world
```

This produces `go.mod` in the project root. A minimal file looks like:

```text
module hello_world
go 1.20
```

- The first line sets the **module name**.
- The second line sets the **Go version** the project requires.
- The same file also records the project's dependencies, which makes it comparable to Python's `requirements.txt`.

The source's compact definition:

```text
Module = Project + its information + Dependencies
```

### Managing dependencies

`go.mod` should not normally be edited by hand. Dependency changes are made through Go commands such as:

- `go get` — add or update a dependency.
- `go mod tidy` — remove unused requirements and add missing ones, keeping the file consistent with the code.

### Why a module rather than just a folder

The module name is more than a label: it is the prefix for the project's import paths. Declaring dependencies in `go.mod` also makes the dependency set explicit and reproducible, rather than depending on whatever happens to be installed globally.

## Why it matters

- Every Go project that is more than a single file needs a module boundary.
- `go.mod` records both the Go version and the dependency set, so builds are repeatable.
- Tooling can resolve imports because the module name defines the import prefix.
- Using `go get` and `go mod tidy` instead of hand-editing keeps `go.mod` and the code in sync.
- It is the entry point for understanding how Go projects are structured, built, and shared.

## Related

- [[20 Zettelkasten/Permanent Notes/Variable Shadowing in Go]]
- [[30 Sources/Other Sources/My Master/Roadmap/GoLang/Chapter 1 & 2 From Learning Go (Jon Bonder)]]
- [[30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 3]]
- [[30 Sources/Other Sources/My Master/Roadmap/GoLang/Go - Chapter 4]]
- [[10 Maps of Content/Programming Languages MOC]]
- [[10 Maps of Content/Research and Master's Prep MOC]]

## Source

- `Chapter 1 & 2 From Learning Go (Jon Bonder).md`, module section (project directory, `go mod init`, `go.mod` contents, module name and Go version, dependency management with `go get` and `go mod tidy`).
- The `Learning Go` Literature Note is a PDF annotation index, not a chapter summary; the chapter source note remains the canonical explanation.
