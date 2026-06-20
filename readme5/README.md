# Readme5

[../README.md](../README.md)

Why called `Readme5` ? Because `HTML5` :)

Readme source [./README.md](./README.md).

---

# Usage

```html
<div id="my_awesome_readme"></div>

<script src="readme5.js"></script>
<script>
	var readme = new Readme5('my_awesome_readme');
	readme.init('README.md');
</script>
```

---

## Style

Add before `init(...)`:

Add Style:

```js
readme.config.style.push('body {background-color:red;}');
```

Add Style Content:

```js
readme.config.style.push('#[content] {background-color:red;}');
```
Result: `#my_awesome_readme {background-color:red;}`.


Add Style Table Of Content:

```js
readme.config.style.push('#[toc] {background-color:red;}');
```

Result: `#my_awesome_readme_toc {background-color:red;}`.

---

## External Link

External links auto-open in new tab (default `_blank`). Override via config:

```js
var readme = new Readme5('my_awesome_readme');
readme.link_external_target = '_self'; // or false to disable
readme.init('README.md');
```

---

## table

[sample1](https://commonmark.thephpleague.com/2.x/extensions/tables/)

th | th(center) | th(right)
---|:----------:|----------:
td | td         | td

## [./hljs.md](./hljs.md)

## [./mmjs.md](./mmjs.md)

# development

## Todos

- large image overflow, current workaround `readme.config.style.push('#[content] img {max-width: 70%}');`
- subfolder image broken
- dropdown for markdown for nav
- testing using other markdown packages.

## Versions

```
201606092158: first
201606100155: second
20260507: upgrade deps, mermaid, new table, new toc, add top.
20260528: route
20260620: add mmjs zenuml, change default font.
```

# Credit

Powered by
[`Markdown-It`](https://markdown-it.github.io/),
[`mermaid.js`](https://mermaid.ai/open-source/),
[`highlight.js`](https://highlightjs.org/).
Using [`JetBrains Mono`](https://fonts.google.com/specimen/JetBrains+Mono) font.
By [`anovsiradj`](https://github.com/anovsiradj).

`![HTML5 Logo Badge](./favicon.svg)`
