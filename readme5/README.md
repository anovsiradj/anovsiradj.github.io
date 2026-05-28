# Readme5

[../README.md](../README.md)
[./agent-antig-in.md](./agent-antig-in.md)
[agent-antig-out.md](agent-antig-out.md)
[./hljs.md](./hljs.md)

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

## table

[sample1](https://commonmark.thephpleague.com/2.x/extensions/tables/)

th | th(center) | th(right)
---|:----------:|----------:
td | td         | td

## hljs

[examples](./hljs.md).

## mmjs

[examples](./mmjs.md).

# development

## Todos

- large image overflow, current workaround `readme.config.style.push('#[content] img {max-width: 70%}');`
- subfolder image broken
- dropdown for markdown for navigation
- testing using other markdown packages.

## Versions

```
201606092158: first
201606100155: second
20260507: upgrade deps, mermaid, new table, new toc, add top.
20260528: navigation
```

# Credit

Powered by [`Markdown-It`](//markdown-it.github.io/) and [`highlight.js`](//highlightjs.org/).
Using [`Ubuntu`](//www.google.com/fonts/specimen/Ubuntu) font.
By [`anovsiradj`](//ne-a-r.blogspot.com/ncr).


`![HTML5 Logo Badge](./favicon.svg)`
