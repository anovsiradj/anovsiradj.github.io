


# tasak

(TrAnSaksi ApliKasi)

struktur dan arsitektur database untuk aplikasi transaksional

## skema

- pk: primary_key
- fk: foreign_key
- nk: natural_key
- sk: surrogate_key

- `pk` auto increment, harus bigint.
- `fk` untuk hierarki recursive, harus bigint.
- `nk` untuk kode data yang digunakan IRL
- `sk` *(saya belum kepikiran)*
- `taxon` untuk relasi dengan banyak `fk`, wajib ada kolom `asal_pk` dan `tuju_pk`.
- khusus `{tabel}_taxon` untuk `asal_pk` dan `tuju_pk` adalah `pk` dari `{table}`
- khusus `file` kolom `fk` digunakan sebagai `pk` dari tabel
- khusus `meta` kolom `fk` digunakan sebagai `pk` dari tabel

```php
data {
	pk
	fk
	nk
	tipe1
	tipe2
	tipe3

	slug
	title
	content
}

taxon {
	pk
	asal_pk <=> data.id
	tuju_pk <=> data.id
	user_pk
	grup_pk
	item_pk
	tipe
}

grup {
	pk
	data_pk
	user_pk
	tipe
}

item
item_file {
	pk
	fk
	...file
}
item_meta {
	pk
	fk
	...meta
}

meta {
	pk
	fk
	table
	field
	value
}

status {
	pk
	fk
	table
	field
	value
}

notify {
	pk
	to => user.pk
	at
	tipe
	title
	content
}

actify {
	pk
	by => user.pk
	at
	fk
	tipe {
		enum: [create,update,delete,login,logout,...]
	}
	table
	content:json
}

master {
	pk
	fk
	nk
	tipe1
	tipe2
	tipe3
}
master_taxon {
	pk
	fk
	asal_pk <=> master.pk
	tuju_pk <=> master.pk
	grup_pk
	user_pk
	tipe
}

config {
	pk
	grup
	key
	val
	sort
	icon
	title
	input_hint
	input_type
	input_label
	input_default
	input_placeholder
}

file {
	pk
	fk
	table
	name_file // origin name
	name_user // custom name by user
	size
	path
}

user
user_taxon {
	pk
	fk
	asal_pk <=> user.pk
	tuju_pk <=> user.pk
	tipe1
	tipe2
	tipe3
}

wilayah {
	pk
	fk
	nk
	tipe
	nama
}
```

## pustaka

- https://stackoverflow.com/questions/51154697/erp-database-designing-approach
- https://www.academia.edu/3161344/Flexible_Database_Design_for_ENTERPRISE_RESOURCE_PLANNING_ERP_APPLICATIONS
- https://stackoverflow.com/questions/36491033/what-is-the-best-practice-database-design-for-transactions-aggregation
- https://use-the-index-luke.com/sql/clustering/index-only-scan-covering-index
