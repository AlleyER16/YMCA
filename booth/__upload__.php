<?php

    // data url string that was uploaded
    $access_type = $_POST["type"] ?? "public";
    $data_url = $_POST["image"];

    list($type, $data) = explode(';', $data_url);
    list(, $data) = explode(',', $data);
    $data = base64_decode($data);

    $file_name = uniqid(md5(time()), true).".jpg";
    $file_path = "$access_type/$file_name";

    file_put_contents($file_path, $data);

    echo $file_path;

?>