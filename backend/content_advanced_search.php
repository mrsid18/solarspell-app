<?php
require 'rb-sqlite.php';
header("Access-Control-Allow-Origin: *");
header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );


R::setup('sqlite:./solarspell.db');
R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE );
#R::fancyDebug(TRUE);
$data = json_decode(file_get_contents("php://input"));
$title = $data->title == null ?'': $data->title;
$min_date = $data->min_date;
$max_date = $data->max_date;
$metadata = $data->metadata;
$search_query = '';
$contentList = [];
#title
if(trim($title) != ''){
    $search_query .= ' title LIKE \'%' .strtolower($title) .'%\'';
}

#published date
$date_query = '';
if($min_date!=='' && $max_date!=='') {
    $date_query .= ' published_date BETWEEN \''.$min_date .'\' AND \'' .$max_date .'\'';
 } elseif($max_date!=='') {
    $date_query .= ' published_date < '.$max_date;
 } elseif($min_date!=='' ) {
     $date_query .= ' published_date > ' .$min_date;
 }
 if($search_query !=''){
     if($date_query !=''){
        $search_query .= ' AND' .$date_query;
        //$search_query .= ' AND published_date IS NOT NULL AND' .$date_query;
     }
 }
 else{
    if($date_query !=''){
        $search_query .= $date_query;
    }
 }

#metadata
$metadata_query = '';
if(count($metadata)!=0){
    if ($search_query!= ''){
        $search_query .= ' AND';
    }
    $contentList = R::find( 'content', $search_query .' @shared.metadata.id
    IN ('.R::genSlots( $metadata ).') GROUP BY content_id HAVING COUNT(content_id) >=' .count($metadata),$metadata);
}
else{
    $contentList = R::find( 'content', $search_query);
}
echo json_encode(array_values($contentList));
?>
