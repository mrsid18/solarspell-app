<?php
    #Allow this file to be accessed from other ports/hosts
    header("Access-Control-Allow-Origin: *");

    #Connect to database
    require 'rb-sqlite.php';
    R::setup('sqlite:./solarspell.db');
    R::getDatabaseAdapter()->getDatabase()->stringifyFetches( FALSE );

    $minMax = R::getAll('SELECT MIN(published_date) AS min, MAX(published_date) AS max FROM content');

    echo json_encode($minMax[0]);
?>