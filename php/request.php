<?php

require("db_connect.php");

$request = $db->prepare("SELECT * FROM task"); // on prépare le requete pour récupérer les données de la table task
$request->execute(); // on execute

$response = $request->fetchAll(PDO::FETCH_ASSOC); // on met en tableau

echo json_encode($response); // on transforme en Json

?>