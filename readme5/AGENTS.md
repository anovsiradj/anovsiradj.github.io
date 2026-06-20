# Readme5 (R5)

## Table of Contents (ToC)

each link must be formatted as `#/{markdown}#/{anchor}`:
- `{markdown}` is a link to the markdown file
- `{anchor}` is a link to the anchor hash (heading)

## `R5.init()`

this method is used to load a markdown file, the URL can be relative or absolute.

## `R5.link_init()`

fungsi ini sudah final, sengaja dibuat seperti itu, jangan diubah seenaknya, kecuali memang harus disesuaikan.

## `{R5|config}.cache`

a boolean to define if cache buster is enable or disable.

if this value is true, use `Date.now()` as default value.
if this value is not boolean, use it for value instead of using `Date.now()`.

## `{R5|config}.route`

a boolean to define if navigation using `location.hash` as route is enable or disable.

## `{R5|config}.menu`

array of menu entries untuk navigation dropdown.
setiap entry bisa string (`'#/file.md'`) atau object (`{text: 'Label', link: '#/file.md'}`).
bisa juga langsung berupa element `<select>`.

dropdown digenerate otomatis diatas konten. value berubah → `location.hash` diupdate.

## `{R5|config}.link_external_target`

controls the `target` attribute for external links (http://, https://, //).

default `'_blank'`. set to `false` or empty string to disable.
