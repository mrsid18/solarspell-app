<?php
	header("Access-Control-Allow-Origin: *");
    require 'rb-sqlite.php';

    R::setup('sqlite:./solarspell.db');
    R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE );
    #R::fancyDebug(TRUE);
    
    $folders = R::findAll("folder", " parent_id IS NULL order by folder_name asc");
    print(json_encode(getTree($folders)));
	
	function getTree($folders){
		foreach($folders as $folder) {
			$node = array();
			$node['id'] = $folder->id;
			$node['name'] = $folder->folder_name;
			$children = R::find('folder', 'parent_id = ?  ORDER BY folder_name asc', [$folder->id] );
			if(count($children) !=0 ){
				$node['children'] = getTree($children);
			}
			$tree[] = $node;
		}
		return $tree;
	}
?>