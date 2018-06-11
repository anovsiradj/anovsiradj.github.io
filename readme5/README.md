# Readme5

Why called `Readme5` ? Because `HTML5` :)

Readme source [README.md](README.md).

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

# Style

Add before `init(...)`:

Add Style:

```javascript
readme.config.style.push('body {background-color:red;}');
```

Add Style Content:

```javascript
readme.config.style.push('#[content] {background-color:red;}');
```
Result: `#my_awesome_readme {background-color:red;}`.


Add Style Table Of Content:

```javascript
readme.config.style.push('#[toc] {background-color:red;}');
```

Result: `#my_awesome_readme_toc {background-color:red;}`.

---

### Credit

Powered by [`Markdown-It`](//markdown-it.github.io/) and [`highlight.js`](//highlightjs.org/).
Using [`Ubuntu`](//www.google.com/fonts/specimen/Ubuntu) font.
By [`anovsiradj`](//ne-a-r.blogspot.com/ncr).
