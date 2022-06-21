<?php
    require 'rb-sqlite.php';
    header("Access-Control-Allow-Origin: *");
    R::setup('sqlite:./solarspell.db');
    R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE );
    #R::fancyDebug(TRUE);
    
    $metadata_types = R::findAll("metadata_type");
    $all = array();
    foreach($metadata_types as $type) {
        $all_metadata = R::find('metadata', 'type_id = ? order by meta_name asc', [$type->id]);
        if(count($all_metadata) !=0 ){
            $meta_dict = array(
            "name" => $type->type_name,
            "metadata" => array_values($all_metadata)
        );
        array_push($all, $meta_dict);
    }
}
    
    print(json_encode($all));
?>
