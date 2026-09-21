- **Foreign Key Constraint:** Prevents invalid references to non-existent parent rows.
- **ON DELETE / ON UPDATE:** Defines what happens when parent data changes.
	
	- **Actions:** `CASCADE`: Deletes child rows when parent is deleted.
	- `SET NULL` : Keeps child row but clears reference.
	- `SET DEFAULT` :Keeps child row but put a default data to reference.
	- `NO ACTION`: Prevents deletion if child exists.