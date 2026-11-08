---
title: "Referential Integrity Rules"
aliases: []
type: source
status: active
domain: database-systems
tags: [source, database-systems]
created: 2026-09-21
updated: 2026-10-20
source:
related: []
---
- **Foreign Key Constraint:** Prevents invalid references to non-existent parent rows.
- **ON DELETE / ON UPDATE:** Defines what happens when parent data changes.
	
	- **Actions:** `CASCADE`: Deletes child rows when parent is deleted.
	- `SET NULL` : Keeps child row but clears reference.
	- `SET DEFAULT` :Keeps child row but put a default data to reference.
	- `NO ACTION`: Prevents deletion if child exists.