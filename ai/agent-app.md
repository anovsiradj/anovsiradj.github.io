
## Terminologi
- copas = Copy+Paste
- selalu menggunakan penulisan dan penamaan yang sama, hindari konversi terjemahan atau penulisan.

## Metodologi
terapkan polymorphic anti-pattern untuk everything.
terapkan high coupling dengan facade pattern, sehingga bisa menjadi Hybrid loose coupling.

selalu menerapkan metode ini dalam implementasi source sode:
- Observe (Amati)
- Imitate (Tiru)
- Modify (Modifikasi)

## Database
- struktur lengkap tables `./migrations/structures.sql`
- struktur lengkap views `./migrations/helpers/*.sql`

## Environment & CLI
- untuk `APP_ENV` valuenya adalah: dev,test,prod.
