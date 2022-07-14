<?php
	header("Access-Control-Allow-Origin: *");
    require 'rb-sqlite.php';

    R::setup('sqlite:./solarspell.db');
    R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE );
    #R::fancyDebug(TRUE);
    
    $modules = R::findAll("module", "order by module_name asc");
    print(json_encode(array_values($modules)));
?>