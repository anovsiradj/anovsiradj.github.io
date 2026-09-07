Create a react component package with name `react-jui` as a wrapper for `jquery-ui` library.
the packages root folder is `./pkgs/`.

- https://api.jqueryui.com/
- https://jqueryui.com/demos/

Everything should be configurable using JSON files and/or JS Objects,
while still having default settings.
Always use ES modules (web standards) rather than CommonJS.
For the component, let's just call it `widget`.

use this files/folders structure:
```
./package.json
./widgets/JuiWidgetName1.tsx
./widgets/JuiWidgetName2.tsx
./plugins/WidgetName1Default.json
./plugins/WidgetName2Default.json
./tests/
./docs/
```

for widget files (.tsx), put it to `./widgets/`.
for plugin files (.js), put it to `./plugins/`.
