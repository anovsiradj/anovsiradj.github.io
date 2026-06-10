bikin chrome/web extension untuk blokir domain.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

to make thing easy in the future, create these agent skills:
- chrome-ext-opfs: skill for use OPFS and managing the files in chrome extension
- chrome-ext-sqlite: skill for use sqlite-wasm and do CRUD in chrome extension
- chrome-ext-npm: skill for use npm packages and using it on every ways (worker,background,foreground,etc) in chrome extension
- chrome-ext-esm: skill for use ES modules on every ways (worker,background,foreground,etc) in chrome extension

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

https://github.com/clmnin/sqlite-opfs-mv3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

kita sudah berputar2 memperbaiki hal yang sama berkali2, tapi masih belum terselesaiakan.

masalah:
- popup selalu timeout seakan2, belum pernah fix
- database belum pernah berhasil terhubung
- kemungkinan agent skills juga salah

karena sudah ada seseorang yang sudah membuktikan implementasi sqlite+opfs+offscreen:
https://github.com/clmnin/sqlite-opfs-mv3

rombak saja dengan approach yang sama https://github.com/clmnin/sqlite-opfs-mv3

rombak tahap1:
- samakan approach sqlite+opfs+offscreen dengan https://github.com/clmnin/sqlite-opfs-mv3
- jadikan popup page sebagai option page juga supaya bisa standalone full page
- hapus unused,redundant code
- gunakan sqlite-wasm dari node_modules hapus sqlite-wasm di dir ./lib

jika sudah selesai, aku akan melakukan e2e testing dan debugging secara manual.
jika sudah lolos, lanjut rombak tahap2.

rombak tahap2
- perbaiki agent skills

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

update these agent skills based on current project implementation:
- chrome-ext-opfs
- chrome-ext-sqlite
- chrome-ext-npm
- chrome-ext-esm

remove unused,redundant code.
