<?php
/**
* DIYLoader (DoItYourself Loader).
* 
* Singleton class autoloader manual tanpa menggunakan Composer.
* Jadi bisa menggunakan package dari github/packagist langsung.
* Walaupun penggunaanya agak ribet.
* 
* Konsepnya Mengikuti aturan PSR-4.
* Sama seperti contoh yg diberikan PSR-4, dengan banyak perubahan.
* 
* @date 201603152228, 201605290904, 201606051603
* @author Mayendra Costanov (anovsiradj) <anov.siradj22@(gmail|live).com>
* @license Jadilah orang yg berguna bagi Nusa, Bangsa dan Orangtua anda.
*/

class DIYLoader {

	protected static $is_watched = false;
	protected static $ns = [];
	private function __construct() {}

	/**
	* untuk memulai loader dengan mendaftarkan SPL autoloader.
	* @return void
	*/
	public static function watch() {
		if (!static::$is_watched) {
			static::$is_watched = true;
			spl_autoload_register(array('DIYLoader', 'loadClass'));
		}
	}

	/**
	* Mendaftarkan namespace class.
	* @param $ns (string) - Namespace (atau prefix) class. Contoh: class a\b\nama. berarti prefixnya: a\b.
	* @param $basedir (string) - Jika direktori sama dengan namespacenya, dapat diisi dengan "?" atau relative "../?".
	* @param $prepend (boolean) - true untuk diawal, false untuk diakhir
	* @return void
	*/
	public static function addns($ns,$basedir,$prepend = false) {
		$ns = trim($ns, '\\');
		$basedir = str_replace('?',str_replace('\\','/',$ns),rtrim($basedir, DIRECTORY_SEPARATOR)).'/';
		$ns .= '\\';

		if (isset(static::$ns[$ns]) === false) {
			static::$ns[$ns] = array();
		}

		if ($prepend) {
			array_unshift(static::$ns[$ns], $basedir);
		} else {
			array_push(static::$ns[$ns], $basedir);
		}
	}

	/**
	* @param $class (string) - Nama lengkap class yang dipanggil dari kode.
	* @return (mixed) - string kalau file ada, false jika tidak.
	*/
	protected static function loadClass($class) {
		$ns = $class;
		while (false !== $pos = strrpos($ns, '\\')) {

			$ns = substr($class, 0, $pos + 1);
			$relative_class = substr($class, $pos + 1);

			$mapped_file = static::loadMappedFile($ns, $relative_class);
			if ($mapped_file) {
				return $mapped_file;
			}
			$ns = rtrim($ns, '\\');
		}
		return false;
	}

	/**
	* @param $ns (string) - Namespace class.
	* @param $relative_class (string) - Nama class.
	* @return mixed - string kalau file ada, false jika tidak.
	*/
	protected static function loadMappedFile($ns, $relative_class) {
		if (isset(static::$ns[$ns]) === false) {
			return false;
		}
		foreach (static::$ns[$ns] as $basedir) {
			$file = $basedir.str_replace('\\', '/', $relative_class).'.php';
			if (static::requireFile($file)) {
				return $file;
			}
		}
		return false;
	}

	/**
	* @param $file (string) - nama file yang sudah dipetakan.
	* @return bool - true jika berhasil, false jika tidak.
	*/
	protected static function requireFile($file) {
	    if (file_exists($file)) {
	        require_once($file);
	        return true;
	    }
	    return false;
	}

	/**
	* @param $what (string) - nama static variable pada loader ini.
	* @param $dump (boolean) - true untuk var_dump, false untuk print_r.
	* @return output
	*/
	public static function debug($what = 'ns',$dump = false) {
		if ($dump) {
			var_dump(static::${$what});
		} else {
			print_r(static::${$what});
		}
	}

}