
# multi fungsi tabel auth?

aku kepikiran untuk gabung tabel role,perm,menu jadi satu tabel yaitu auth.

nanti jadinya seperti

```sql
auth {
	id
	id_paren
	tipe1
	tipe2
	tipe3
	tipe4
	tipe5

	nama
	kode
	slug

	extra:json
}
```
