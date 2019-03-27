<?php


header("Content-type: application/json; charset=utf-8"); 

$host = "localhost";
$dbname = "todo-list";
$login = "root";
$pwd = "";

try {
    $db = new PDO('mysql:host='.$host.';dbname='.$dbname, $login, $pwd); 
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
} catch(PDOException $e) { 
    $e->getMessage(); 
}

?>