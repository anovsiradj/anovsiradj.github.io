
tables
- menu (maybe)
- user
- auth_entri
- auth_akses

```txt
user {}
auth_entri {
	nama
	tipe {
		enum: [role,perm]
	}
	extra:json
}
auth_akses {
	pk
	user_pk
	menu_pk
	ortu
	anak
	extra:json
}
```
