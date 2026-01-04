
# answer for 

## workflow

my flutter guideline, is always:

- wrapper for existing (material/cupertino) widgets to create componets that inspired by Bootstrap (web ui toolkit)
- wrapper for existing packages (internal: http/intl/etc, external: dotenv/sqflite/etc) that inspired from PHP and JS/ES (mostly feature in web/jquery and sometime nodejs).
- only sqflite (sqlite), and nothing else except for cache, just put it on appdir.

iam planning to distributing my wrapper as packages to.

firebase: last time iam using it was 5 ago (2020).

iam rarely using state management packages,
simple global/shared state and builtin features already satisfy all my usecases.

above guideline is also used in my company to,
because we need fast development livecycle.

----------------------------------------------------------------

### idea

1) datepicker could be generic without popup.
i was thinking about inline datepicker inspired by jquery-ui.

2) theming, it is kinda something.
i was hoping about more generic and consistent declarations like CSS.

3) form and it is fields, could be more easy like FormData on the web/js.

```
ThemeAssign(
	'*', // ALL
	fontsize: 10px
)
ThemeAssign(
	[TextField, DropdownField], // widget(s)
	fontsize: 13px
)
```

4) i feels there is will be more, 
but nothing came to my mind.
