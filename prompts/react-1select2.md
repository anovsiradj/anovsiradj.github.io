Create a react component package with name `react-select2` as a wrapper for `select2` library.
the packages root folder is `./pkgs/`.

- https://select2.org/
- https://github.com/select2/select2

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the component, let's just call it `widget`.

use this files/folders structure:
```
./package.json
./widgets/select2.vue
./plugins/default.json
./tests/
./docs/
```

for widget files (.tsx), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.
