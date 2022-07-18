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
    #$result_object->parentFolder = getGrandParent($content->folder_id);
    $result_object->parentFolder = getParent($content->id);
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

    function getLanguage($content_id){
        $result = R::getCell('SELECT meta_name from metadata 
        INNER JOIN metadata_type 
        ON metadata.type_id = metadata_type.id INNER JOIN content_metadata 
        ON metadata.id = content_metadata.metadata_id
        WHERE content_metadata.content_id = '.$content_id .' 
        AND metadata_type.type_name = "Language"');
        return $result;
    }

    function getContentType($content_id){
        $result = R::getCell('SELECT meta_name from metadata 
        INNER JOIN metadata_type 
        ON metadata.type_id = metadata_type.id INNER JOIN content_metadata 
        ON metadata.id = content_metadata.metadata_id
        WHERE content_metadata.content_id = '.$content_id .' 
        AND metadata_type.type_name = "Resource Type"');
        return $result; 
    }

    function getSubject($content_id){
        $result = R::getCell('SELECT meta_name from metadata 
        INNER JOIN metadata_type 
        ON metadata.type_id = metadata_type.id INNER JOIN content_metadata 
        ON metadata.id = content_metadata.metadata_id
        WHERE content_metadata.content_id = '.$content_id .' 
        AND metadata_type.type_name = "Subject"');
        return $result; 
    }

    function getParent($content_id){
        $result = R::getCell('SELECT folder_name from folder 
        INNER JOIN content_folder 
        ON folder.id = content_folder.folder_id 
        WHERE content_folder.id = '.$content_id);
        return $result;
    }
?>