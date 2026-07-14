Create a Vue SFC package with name `vue-jui` as a wrapper for `jquery-ui` library.

- https://api.jqueryui.com/
- https://jqueryui.com/demos/

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the Vue SFC (Single-File Component), let's just call it `widget`.

use this files/folders structure:
```
./package.json
./widgets/jui_{WIDGET_NAME1}.vue
./widgets/jui_{WIDGET_NAME2}.vue
./plugins/{WIDGET_NAME1}_default.json
./plugins/{WIDGET_NAME2}_default.json
./tests/
./docs/
```

for widget files (.vue), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

provides unit testing, browser testing, integration testing.

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