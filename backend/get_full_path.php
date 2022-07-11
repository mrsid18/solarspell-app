<?php
    header("Access-Control-Allow-Origin: *");
    require 'rb-sqlite.php';

    R::setup('sqlite:./solarspell.db');
    R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE ); 
    #R::fancyDebug(TRUE);
	

    $id =  intval($_GET["id"]);
    $isFolder = boolval($_GET["isFolder"]);
    $pathObject =  new \stdClass();
    $pathObject->childPath = null; 
    if($isFolder){
        $grandchild = R::load("folder", $id);
        $pathObject->id= $id;
        $pathObject->name = $grandchild->folder_name;
        getFullPath($pathObject,$grandchild->parent_id);
    }
    else{
        $grandchild = R::findOne("content_folder", ' id = ? ', [$id]);
        $pathObject->id= $id;
        $pathObject->name = $grandchild->title;
        getFullPath($pathObject,$grandchild->folder_id);
    }

    function getFullPath($fullPathObject, $folder_id){
        if ($folder_id == null) {
            echo json_encode($fullPathObject);
        }
        else {
            $parentFolder = R::load("folder", $folder_id);
            $fullPathObject->childPath = clone($fullPathObject);
            $fullPathObject->id = $parentFolder->id;
            $fullPathObject->name = $parentFolder->folder_name;
            getFullPath($fullPathObject,$parentFolder->parent_id);
        }
    }
?>