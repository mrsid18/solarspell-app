<?php
    require 'rb-sqlite.php';
    header("Access-Control-Allow-Origin: *");
    R::setup('sqlite:./solarspell.db');
    R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE );
    #R::fancyDebug(TRUE);
    
    $id = intval($_GET["id"]);
    $content = R::load("content", $id);
    $metadata_filtered= R::getAll('SELECT metadata_id FROM content_metadata WHERE content_id = ' .$id);
    $metadata_types = R::findAll("metadata_type");
	$metadata_ids = [];
    foreach ($metadata_filtered as $meta){
        $metadata_ids[] = $meta['metadata_id'];
    }
    $metadata = R::find( 'metadata',' id IN ('.R::genSlots( $metadata_ids ).')',$metadata_ids);
    $metadata_list = array();
    foreach($metadata_types as $type) {
        if ($type->type_name == "Collection"){
            continue;
        }
        $values = '';
        foreach($metadata as $meta) {
            if ($meta->type_id == $type->id){
                $values .= $meta->meta_name .", ";
            }
        }
        if ($values == ''){
            continue;
        }
        $meta_dict = array(
            "name" => $type->type_name,
            "value" => rtrim($values, ', ')
        );
        array_push($metadata_list, $meta_dict);
    }
    $result_object =  new \stdClass();
    $result_object->parentFolder = getGrandParent($content->folder_id);
    $result_object->content = $content;  
    $result_object->metadata = array_values($metadata_list);  
    echo json_encode($result_object);
    
    function getGrandParent($parent_id){
        $grandParentFolder = R::load("folder", $parent_id);
        if ($grandParentFolder->parent_id == null) {
            return clone($grandParentFolder);
        }
        else {
            return getGrandParent($grandParentFolder->parent_id);
        }
    }
?>