<?php
define('DS',DIRECTORY_SEPARATOR);

function insert() {
	if (!defined('_ROOT_')) {
		die('WIZARD!');
	}
	$caller_dir = ltrim(_ROOT_,__DIR__);
	$deep_up = empty($caller_dir) ? $caller_dir : (str_repeat("..".DS, count(explode(DS, $caller_dir))));

	h($deep_up.'VENDOR'.DS.'Some'.DS.'Namespace'.DS.'class.php');
}

function h($o,$s = 1) {
	echo "<h{$s}>";echo $o;echo "</h{$s}>";
}