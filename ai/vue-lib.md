
# rencana

- deno
- vite
- jest

# wrapper

Create a Vue SFC package with name `package` as a wrapper for `3rdparty` library.

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the Vue SFC (Single-File Component), let's just call it `widget`.

# structure

use this files/folders structure:
```
./package.json
./widgets/
./plugins/
./tests/
./docs/
```

for widget files (.vue), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.

This package will be distributed through NPM and JSR.

# dokum

Use a `global-first` approach, like in the old days of web development.

# debug

provides unit testing, browser testing, integration testing.

run full test suite

# vendor

provide configuration for distribution via NPM and JSR.
