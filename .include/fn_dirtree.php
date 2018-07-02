<?php
/*
by
anovsiradj (anov.siradj22@gmail.com)

version
20180701-1

refference
https://stackoverflow.com/a/34190742
*/

/*header('content-type: text/plain');*/

function fn_dirtree($target, &$root, $callback = null) {
	if(is_dir($target)) {
		$target .= '/*';
		$files = glob($target, GLOB_MARK | GLOB_NOSORT | GLOB_NOESCAPE);

		foreach($files as $file) {
			$entry = ['realpath' => realpath($file), 'rawpath' => $file, 'name' => basename($file)];

			if ($entry['name'][0] === '.') continue;

			$root[] = $entry;

			$i = count($root)-1;

			if (is_file($file)) {
				$root[$i]['type'] = 'file';
			} else {
				$root[$i]['type'] = 'dir';
				$root[$i]['node'] = array();
			}

			$callback($root[$i]);

			fn_dirtree($file, $root[$i]['node'], $callback);
		}
	}
} // eofn
