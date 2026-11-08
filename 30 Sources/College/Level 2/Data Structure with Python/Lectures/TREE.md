---
title: "TREE"
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

```
  A
 / \
B   C
/ \   \
D  E   F
   /
   S
   /
   W
```

- Preorder : Root -> Left -> Right
	- A B D E C F
- Postorder : Left -> Right -> Root
	- D E B F C A
- Inorder : Left -> Root -> Right
	- D B E A C F
- Breadth-First Travesal : Root (Level 1) -> Level 2 (Children) -> Level 3 (Leaves)
	-  A -> B -> C -> D -> E -> F (LEFT -> RIGHT)
- Depth : Number of ancestors of a position p, excluding p
	- Depth(C): 2 {A,B}
	- Depth(E): 1
- Height : Maximum depth of any leaf in the tree.
	- Height(B): 3
- Abstract Methods: root() , parent(p) , num_children(p) , children(p) , __len__()
- Concrete Methods:
	- is_root(p) : True if p is root. 
	- is_leaf(p) : True if p has no children.
	- is_empty() : True if tree is empty.
	- depth(p) , _height1() , _height2() , height(p=None) , __iter__() , positions() , preorder() , postorder() , breadthfirst()

A binary tree is a specialization of a tree that supports three additional accessor methods: 
- T.left(p): Return the position that represents the left child of p, or None if p has no left child. 
- T.right(p): Return the position that represents the right child of p, or None if p has no right child.
- T.sibling(p): Return the position that represents the sibling of p, or None if p has no sibling.
![[Pasted image 20250516084741.png]]


