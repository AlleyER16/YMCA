<?php

    header("Content-Type: application/json");

    $dir = __DIR__ . "/public";

    $files = scandir($dir);

    $return_files = [];

    foreach($files as $file) {
        if($file != "." && $file != "..") {
            array_push($return_files, $file);
        }
    }

    echo json_encode($return_files);

?>