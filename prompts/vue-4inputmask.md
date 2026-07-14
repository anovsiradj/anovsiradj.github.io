Create a Vue SFC package with name `vue-inputmask` as a wrapper for `inputmask` library.

- https://github.com/RobinHerbots/Inputmask
- https://robinherbots.github.io/Inputmask/

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the Vue SFC (Single-File Component), let's just call it `widget`.

use this files/folders structure:
```
./package.json
./widgets/inputmask.vue
./plugins/default.json
./tests/
./docs/
```

for widget files (.vue), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

provides unit testing, browser testing, integration testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

aku sudah eksekusi `npx playwright install`.
lakukan full test suite, harus 100% coverage, perbaiki jika ada test bermasalah.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

move `./PUBLISHING.md` to `./docs/`.
move `./tests/README.md` to `./docs/TESTING.md`
