Create a Vue SFC package as a wrapper for `ckeditor` with the name `vue-ckeditor`.

- v4 docs https://ckeditor.com/docs/ckeditor4/latest/index.html
- v5 docs https://ckeditor.com/docs/ckeditor5/latest/index.html
- bedakan widget ckeditor untuk v4 dengan v5.

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the Vue SFC (Single-File Component), let's just call it `widget`.

use this files/folders structure:
```
./package.json
./widgets/v4.vue
./widgets/v5.vue
./plugins/v4.json
./plugins/v5.json
./tests/
./docs/
```

for widget files (.vue), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.

provides unit testing, browser testing, integration testing.

This package will be distributed through NPM and JSR.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a `./docs/` folder for documentation,
based on everything you've done.

Also document the following:
- ./docs/README.md: An explanation of ckeditor, including official links.
- ./docs/README.md: An explanation of concepts and objectives.
- ./docs/structure.md: An explanation of files and folders
- ./docs/testing.md: An explanation of debugging and testing
- ./docs/specification.md
