create vue package as a wrapper for `elfinder` with name `vue-elfinder`.
you must provide `backend` and `frontend` implementation of elfinder.

- https://github.com/studio-42/elfinder
- https://studio-42.github.io/elFinder/

everything must be configurable using either JSON file and/or JS Object.

for Vue SFC (Single-File Component) lets call it `widget`.
always use ES module (web standard) instead CommonJS js.

use this files/folders structure:
```
./widgets/
./plugins/
./package.json
```

for widget (.vue file), put it to `./widgets/`.
for plugin (.js file), put it to `./plugins/`.

provide unit testing, e2e testing, browser testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

aku ingin mengingatkan kamu bahwa proyek ini adalah library (vue sfc package) yang akan didistribusikan lewat NPM dan JSR.

penyesuaian: everything must be configurable using either JSON file and/or JS Object.

karena di `./src/` hanya digunakan untuk testing/debugging,
jadi lebih baik taruh ke `./tests/app/` saja sekalian.

karena di `./public/` hanya digunakan untuk testing/debugging,
jadi lebih baik taruh ke `./tests/pub/` saja sekalian.

karena di `./test-results/` hanya digunakan untuk testing/debugging,
jadi lebih baik taruh ke `./tests/results/` saja sekalian.

karena di `./files/` hanya digunakan untuk testing/debugging,
jadi lebih baik taruh ke `./tests/uploads/` saja sekalian.

karena di `./config/default.json` cuma hanya akan ada 1 file,
jadi lebih baik taruh ke `./plugins/default.json` saja sekalian.

harusnya tidak perlu `plugins/index.js` kan bisa langsung import `./widgets/elfinder.vue`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

karena di `./backend/server.js` hanya digunakan untuk testing/debugging,
jadi taruh ke `./tests/server.js` saja sekalian.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

kalo begitu, hapus saja `./tests/pub/` karena tidak diperlukan.

aku rename `./tests/app/` jadi `./tests/client/`, bantu adjust.

bikin `./docs/` untuk dokumentasi,
berdasarkan apa yang sudah kamu lakukan.
juga dokumentasikan:
- penjelasan elfinder, cantumkan juga link resminya.
- jelaskan struktur files/folders
- konsep
- tujuan