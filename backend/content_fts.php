<?php
header("Access-Control-Allow-Origin: *");
require 'rb-sqlite.php';
R::setup('sqlite:./solarspell.db');
R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE );
#R::fancyDebug(TRUE);
$search_string = $_GET["search_string"];
$contentList =    R::getAll( 'SELECT rowid as id, highlight(content_fts, 0, \'<mark>\', \'</mark>\') as title, file_name, description, file_size FROM content_fts where content_fts match :search_string order by rank ',
        [':search_string' => $search_string]
    );
$result_object =  new \stdClass();
$result_object->searchString = $search_string;
$result_object->contentList = array_values($contentList);
echo json_encode($result_object);
?>
