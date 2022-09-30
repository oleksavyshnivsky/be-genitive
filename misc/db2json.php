<?php

define('DBHOST', 'localhost:3307');
define('DBNAME', 'rodovyidb');
define('DBUSER', 'root');
define('DBPASS', '');

require_once 'inc/DB.class.php';

$dbres = DB::query("SELECT x.nominative, x.nomhtml, x.genitive FROM genitive x");
$res = [];
while ($row = $dbres->fetch_object()) {
	$tmp = [
		'n'	=>	$row->nominative,
		'g'	=>	$row->genitive,
	];
	if ($row->nomhtml) $tmp['h'] = $row->nomhtml;
	$res[] = $tmp;
}

file_put_contents('../extension/dictionary.js', 'const DICTIONARY = '.json_encode($res).PHP_EOL);
echo 'Done', PHP_EOL;
