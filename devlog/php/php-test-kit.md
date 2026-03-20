
# instalasi

untuk semua proyek:

```sh
composer require --dev rector/rector phpstan/phpstan vimeo/psalm
```

khusus laravel perlu:

```sh
composer require --dev psalm/plugin-laravel larastan/larastan
```

# konfigurasi

khusus laravel perlu:

```
includes:
    - vendor/larastan/larastan/extension.neon
    - vendor/nesbot/carbon/extension.neon
parameters:
	level: 0
	paths:
		- app
	bootstrapFiles:
		- phpstanAliases.php
	excludePaths:
		- .git
		- .agent
		- .vscode
		- public
		- storage
		- resources/js
		- resources/css
		- resources/assets
		- vendor
		- node_modules
	ignoreErrors:
		- "#Called 'env' outside of the config directory#"
		- "#Relation '[a-zA-Z0-9]+' is not found#"
		- '#in empty\(\) always exists and is always falsy#'
		- '#in empty\(\) always exists and is not falsy#'
		- '#on left side of \?\?= always exists and is always null#'
```

# eksekusi

```sh
php ./vendor/bin/phpstan --memory-limit=1G
php ./vendor/bin/psalm --no-cache
```
