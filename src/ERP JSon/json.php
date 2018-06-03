<?php

    $obj = $_POST["x"];
    $usu = $_POST["usu"];

    $fp = fopen("json/".$usu.'.json', 'w');
    fputs($fp, $obj);
    fclose($fp);

?>