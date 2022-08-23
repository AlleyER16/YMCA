<?php

    header("Content-Type: application/json");

    // data url string that was uploaded
    $access_type = $_POST["type"] ?? "public";
    $file = $_FILES["image"];

    $file_name = uniqid(md5(time()), true)."_".$file["name"];
    $file_path = "$access_type/$file_name";

    move_uploaded_file($file["tmp_name"], $file_path);

    echo json_encode([
        "message" => "File uploaded successfully",
        "file_path" => $file_path
    ]);

?>