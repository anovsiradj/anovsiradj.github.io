coba validasi dan evaluasi PRD,
kira2 apa yang masih kurang, belum pas, atau lainnya.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
barusan aku kepikiran konsep ini,
akan aku simulasikan pakai json/sql untuk sebagai pseudo konsep untuk workflow dan dynamic.


```sql
projects [
	{
		id: 1
		preset: scrum_v5
		name: 'project 1'
		current_workflow: null
		blocking_workflow: null
	}
	{
		id: 2
		preset: waterfall_v2
		name: "project 2"
		current_workflow: 'testing'
		blocking_workflow: true
	}
]

workflows [
	{
		id: 12
		project_id: 1
		name: "planning"
	}
	{
		id: 13
		project_id: 1
		name: "testing"
	}
	{
		id: 21
		project_id: 2
		name: "planning"
	}
	{
		id: 22
		project_id: 2
		name: "testing"
	}
]
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pindah panduan ./ENGINE.md ke `./docs/` sdan pecah sesuai saranmu.

untuk `Terlalu Banyak "Future" State`, pelajari dan pahami `./PRD.md`.
perihal saran mu untuk flagging, aku setuju.

kalo sudah, kasih pendapatmu lagi.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pindah saja `./ENGINE.md` ke dalam `./docs/` dan perbarui link.
update catatan untuk engine di `./AGENTS.md`.

audit ulang plan 01, karena kamu sudah mempelajari dan memahami PRD dan ENGINE.
