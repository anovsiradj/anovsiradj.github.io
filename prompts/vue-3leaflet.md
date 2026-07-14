Create a Vue SFC package with name `vue-leaflet` as a wrapper for `leaflet` library.

- https://leafletjs.com/reference.html
- https://leafletjs.com/plugins.html

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the Vue SFC (Single-File Component), let's just call it `widget`.

use this files/folders structure:
```
./package.json
./widgets/leaflet.vue
./plugins/default.json
./tests/
./docs/
```

for widget files (.vue), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

gunakan leaflet versi 2 ke atas, termasuk versi 2 fase alpha/beta/dst.
- https://leafletjs.com/reference-2.0.0.html
- https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

pikirkan cara untuk menambahkan handle ke Lifecycle Hooks (created,mounted,updated,dst),
supaya bisa menggunakan fitur leaflet lainnya seperti "Raster Layers" (WMS,overlay), "Vector Layers" (Polygon,Rectangle), dst.
karena pemakaian tidak hanya sebatas menampilkan peta saja, seperti zoom/move/dst.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

dengan implementasi yang sudah kamu bikin, sekalian saja lengkapi untuk:
- semua Vector Layers
- semua Raster Layers
- semua UI Layers
- semua Other Layers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

karena di `./files/` hanya digunakan untuk testing/debugging,
jadi lebih baik taruh ke `./tests/uploads/` saja sekalian.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

pindah `./composables/useLeaflet.js` ke `./plugins/useLeaflet.js` dan adjust.