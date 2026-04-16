# JSON API SQL

## konsep rancangan

aku punya konsep ide untuk untuk membuat sebuah library mirip GraphQL tapi dalam bentuk JSON API, yang akan berfungsi sebagai perantara antara client dan server dalam mengelola data.

fitur utamanya adalah SQL, terutama DQL (Data Query Language) dan DML (Data Manipulation Language).
tapi juga tidak menutup kemungkinan untuk mengambil data selain SQL,
seperti data statis atau data yang dihasilkan dari proses tertentu.

konsepnya sangat sederhana:
- semua query harus didefinisikan terlebih dahulu, sehingga hanya query yang sudah didefinisikan yang bisa dijalankan. mirip route pada web framework, tapi lebih abstrak,dinamis,fleksibel.
juga tidak terbatas pada HTTP saja, bisa juga digunakan untuk komunikasi antar modul dalam aplikasi, atau komunikasi antara aplikasi yang berbeda.
- dari client mengirim request dalam bentuk JSON
- dari server mengembalian response dalam bentuk JSON

## konsep implementasi

### contoh 1
request:
```json
{
	"input": {
		"query": "/user/object",
		"filter": 1,
	}
}
```
response:
```json
{
	"output": {
		"nama": "Anov Siradj",
		"email": "anovsiradj@mail.com",
		"phone": "081234567890"
	}
}
```
implementasi:
```php
// normalisasi input
if (empty($input['type'])) {
	$input['type'] = 'read';
}
if ($input['type'] === 'read') {
	if (isset($input['filter']) && !is_array($input['filter'])) {
		$input['filter'] = [
			'id' => $input['filter'],
		];
	}
}

// validasi input (memastikan input yang diterima sesuai dengan format yang diharapkan).

// validasi definisi (memastikan query yang diminta sesuai dengan definisi yang ada).

// eksekusi definisi
if ($input['query'] === '/user/item') {
	$output = dbUserItem($input['params']);
}

// output
return $output;
```

### contoh 2
request:
```json
{
	"input": {
		"query": "/kelompok/anggota/array",
		"search": null,
		"filter": {
			"kelompok_id": 34,
			"status": "active"
		},
		"object": {
			"anggota": ["nama"]
		}
	}
}
```
response:
```json
{
	"output": [
		{"nama": "budi"},
		{"nama": "sari"}
	]
}
```

### contoh 3

request

```json
{
	"input": "/auth/session/user"
}
```

response:

```json
{
	"output": {
		"nama": "Anov Siradj",
		"email": "anovsiradj@mail.com",
		"phone": "081234567890"
	}
}
```

implementasi:

```php
// normalisasi input
if (is_string($input)) {
	$input = [
		'query' => $input,
	];
}

// validasi input (memastikan input yang diterima sesuai dengan format yang diharapkan)

// validasi definisi (memastikan query yang diminta sesuai dengan definisi yang ada)

// eksekusi definisi
if ($input['query'] === '/auth/user') {
	$output = authUserModel($input['params']);
}

// output
return $output;
```
