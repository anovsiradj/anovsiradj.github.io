bantu rancang dan bikin aplikasi untuk rekrutmen dan seleksi kandidat.

teknologi:
- vue
- sqlite
- bootstrap v5
- bootstrap icons v1

modul/fitur yang aku pikirkan:
- ada konsep batch/group kandidat
- ada formulir penilaian setiap kandidat
- ada beberapa variasi formulir penilaian setiap kandidat
- bisa membandingkan secara terperinci masing2 kandidat
- ada konsep posisi kandidat

mari kita diskusikan dulu.

--------------------------------------------------------------------------------------------------

menarik, saya baru tau tentang ini:
- Applicant Tracking System
- Assessment System
- Candidate Comparison System

setelah saya diskusikan dengan HR,
salah satu tujuannya adalah untuk keterbukaan dan kemudahan akses informasi untuk:
- recruiter
- manager (orang yang membutuhkan dan mencari kandidat, biasanya berdasarkan deparment)
- reviewer (orang yang memberi penilaian atas instruksi manager, bisa saja manager itu langsung).
- interviewer (bisa manager dan/atau reviewer).

alur berdasarkan kejadian nyata:
- recruiter akan cari kandidat dalam berbagai periode
- recruiter akan mengelompokkan kandidat menjadi banyak batch dalam periode,
misal minggu ke1 ada 4 kandidat, maka itu jadi batch ke1 dalam periode tersebut.
- recruiter akan ada proses screening bertingkat yang dinamis,
yang digunakan recruiter untuk mengerucutkan kandidat.
- recruiter menyerahkan hasil proses rekrutmen ke reviewer melalui manager
- reviewer menerima hasil proses rekrutmen dari manager
- reviewer akan ada proses screening bertingkat yang dinamis,
yang digunakan recruiter untuk mengerucutkan kandidat.
- reviewer mengembalikan hasil ke recruiter melalui manager
- recruiter mengeluarkan statemen

untuk Variasi Form Penilaian, yang pasti bentuknya konsisten:
- didalamnya ada poin penilaian
- setiap poin bisa diberi catatan
- setiap formulir punya rumusnya masing2 (bantu saya rancang ini)
- setiap formulir punya template
- template formulir bisa beda2 seiring waktu

yang saya inginkan adalah aplikasi bisa segeneric mungkin,
sehingga mudah dalam implementasi flow yang dinamis.

untuk Tahapan Rekrutmen bisa dibuat dinamis yang mana ditentukan oleh recruiter dan/atau manager.
aku ingin ada master Tahapan Rekrutmen, sehingga alur nya bisa dinamis.

mari kita diskusikan dulu.

--------------------------------------------------------------------------------------------------

untuk teknologi, berdasarkan saran kamu, aku mutusin pakai:
- pakai php tanpa framework supaya sederhana untuk API (backend)
- pakai sqlite untuk database
- pakai vue v3 latest untuk frontend
- pakai vite
- pakai deno (bukan node)

untuk implementasi awal, tidak perlu ada VERSIONING TEMPLATE,
karena akan menambah beban implementasi, jadi abaikan dulu.

untuk aturan penamaan tabel/kolom database:
- jangan plural, harus singular (misal user,role bukan users,roles).
- relasi harus explicit kecuali dinamis
- tidak boleh ada kolom dengan tipe json

mari kita diskusikan dulu.

--------------------------------------------------------------------------------------------------

dari rancangan yang kamu kasih, kelihatannya sudah matang.

sebelum masuk ke langkah selanjutnya,
validate and evaluate your own result,
make sure that everything is fine.

When in doubt, prompt it out.

--------------------------------------------------------------------------------------------------

untuk ambiguitas Candidate vs Application bisa dibaikan,
setiap Candidate/Application akan berdiri sendiri.

untuk workflow_assignment saya setuju.

untuk "Dynamic Workflow Reality" jadi:
- bisa saja orang tersebut melakukan 2x pengisian formulir yang sama karena revisi/salah/lupa
- recruiter bisa menambah stage baru saat workflow berjalan
- bukan berupa hierarki tapi proses yang berurutan

untuk "Assessment Formula" jadi:
- jika recruiter ingin minimum score, bisa ditentukan di template.

untuk "Template Tidak Versioned" jadi:
- memang bisa ubah/tambah/hapus template
- untuk ketidak sinkronan dengan assessment, tinggal diisi ulang assesment nya.

untuk "Comparison Engine" jadi:
- pilih beberapa/semua kandidat
- ada filter periode,batch,assesment
- bisa tampilkan dalam bentuk tabel rekap hasilnya
- bisa lihat detail dari rekapnya

untuk "Perbandingan" bisa dibandingkan semuanya.

untuk "Auth & Permission" sekarang pakai role saja:
- setiap manager tidak bisa lihat satu sama lain
- reviewer bisa lihat semua periode yang diassign ke dia
- recruiter ada lah HR yang bisa lihat semua

abaikan activity_log, belum dibutuhkan.

untuk fil/upload/Attachment, saya punya tekniknya, ini rancangan tabel file:
- id
- refer_id (id tabel asal yang membutuhkan file)
- refer_table (nama tabel yang membutuhkan file)
- refer_field (kolom sebutan untuk file pada tabel yang membutuhkan file)
- title
- name
- path
- mime
- size
- created_at
- updated_at
- uploaded_at
- created_by
- updated_by
- uploaded_by

jadi file bisa digunakan oleh siapapun.

mari kita diskusikan dulu.

--------------------------------------------------------------------------------------------------

untuk saran kamu di tabel file, tambah kolom:
- hash (dengan komentar checksum)
- ext (singkatan dari extension)

mari kita lanjut ke tahap ERD Final.
