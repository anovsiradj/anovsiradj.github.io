bantu rombak `resume.html`, tujuan utama nya adalah:
- separate of concern untuk data dan view
- in the future, akan saya integrasikan dengan AI, yaitu kasih chat bot.
- multi bahasa id(id-ID) dan en(en-US)

rombak tahap 1:
- pindah semua konten resume ke database dalam bentuk json, taruh file di `./resume/db.json`.
- pertahankan data dengan enkripsi base64.
- jangan ubah tech stacks sama sekali.

hal penting yg harus selalu kamu ingat,
selalu dokumentasikan resume di `./resume/index.md`.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
rombak tahap 2:
- setelah aku pikir2, multi bahasa ditiadakan dulu.
- ganti umur dengan akumulasi lama pengalaman kerja
- deteksi light/dark mode pakai `prefers-color-scheme` lalu persistent pakai localstorage
- mobile-first responsive, lakukan optimasi jika diperlukan atau kamu menemukan isu.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
aku telah melakukan beberapa penyesuaian:
- upgrade bootstrap latest
- hapus jspdf kalo tidak belum dipake
- kasih favicon

rombak tahap 3:
- harusnya responsive mobile-first jangan manual tapi pake variable builtin bootstrap <https://getbootstrap.com/docs/5.3/customize/css-variables/>, manfaatkan semua variables/features yang sudah disediakan (css,widget,etc).
- harusnya akumulasi lama pengalaman kerja, bukan pakai kapan mulainya (`experience_start`) tapi akumulasi dari lama bekerja di masing2 perusahaan.
- ada isu, kalo db.json telat data tidak terender oleh vue. harusnya view menunggu sampai data benar2 terload.

untuk akumulasi lama pengalaman kerja, konsepnya kurang lebih seperti ini:
- setiap object `experiences` ada property: mulai,selesai,tahun_mulai,bulan_mulai,tahun_selesai,bulan_selesai.
- `mulai` adalah date (YYYY-mm-dd)
- `tahun_mulai` dan `tahun_selesai` adalah year (YYYY)
- `bulan_mulai` dan `bulan_selesai` adalah month (mm)
- urutan pengkondisiannya adalah `mulai` atau `tahun_mulai` dan `bulan_mulai` atau `tahun_mulai` atau `NULL`, untuk `selesai` juga sama.
- untuk `period`, dirangkai berdasarkan `*mulai` dan `*selesai`, jadi tidak manual.
- untuk perhitungannya, yang digunakan hanya bulan dan tahun, hari tidak perlu.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
adjust `./resume/worker.js` supaya pakai stale-while-revalidate caching strategy
