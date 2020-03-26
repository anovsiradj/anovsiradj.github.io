<?php /* 20190621 */
if (in_array('phpinfo', array_keys($_GET))) { phpinfo(); die(); }

function hello($who = 'world')
{
	echo 'hello ', $who, PHP_EOL;
}

class pkg0 extends stdClass
{
	public function __call($fn, $args)
	{
		return func(...$args);
	}
}

class pkg1 extends stdClass
{
	public function fn(...$args)
	{
		return func(...$args);
	}
}

/* nope. doesnt work! */
// function fn(...$args)
function func(...$args)
{
	return call_user_func_array($args[0], array_slice($args, 1));
}

func('hello');
func('hello', PHP_VERSION);
func('func', 'hello', PHP_VERSION);
echo '--------------------------------------------------', PHP_EOL;

/* yep. its works! */
$pkg = new pkg0;
$pkg->fn('hello');
$pkg->fn('hello', PHP_VERSION);
$pkg->fn('func', 'hello');
$pkg->fn('func', 'hello', PHP_VERSION);
echo '--------------------------------------------------', PHP_EOL;

/* yas. this works too! */
$pkg = new pkg1;
$pkg->fn('hello');
$pkg->fn('hello', PHP_VERSION);
$pkg->fn('func', 'hello');
$pkg->fn('func', 'hello', PHP_VERSION);
$pkg->fn('func', 'func', 'hello', PHP_VERSION);
echo '--------------------------------------------------', PHP_EOL;

$arr0 = range(0, 9);

$arr1 = array_filter($arr0, fn($i) => ($i % 2) === 0);

$arr3 = array_filter($arr0, function($i) { return $i % 2; });

$arr2 = array_map(fn($i) => ($i * 10), $arr0);

print_r($arr1);
print_r($arr3);
print_r($arr2);
