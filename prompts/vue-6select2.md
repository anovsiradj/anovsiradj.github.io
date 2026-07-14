Create a Vue SFC package with name `vue-select2` as a wrapper for `select2` library.

- https://select2.org/
- https://github.com/select2/select2

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the Vue SFC (Single-File Component), let's just call it `widget`.

use this files/folders structure:
```
./package.json
./widgets/select2.vue
./plugins/default.json
./tests/
./docs/
```

for widget files (.vue), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

provides unit testing, browser testing (only chrome and firefox), integration testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

untuk test gagal karena `Perlu perbaikan mock jQuery` tidak usah mock,
langsung pakai jquery.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

eksekusi browser testing.
gunakan browser yang sudah diinstall, jangan download ulang.

lokasi binary browser:
- chrome `C:\Program Files\Google\Chrome\Application\chrome.exe`
- firefox `C:\Program Files\Firefox Nightly\firefox.exe`

INGAT, aku pakai windows bukan linux, jadi kamu harus pakai powershell.