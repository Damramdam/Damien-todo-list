<?php

require("db_connect.php");

if (isset($_GET["action"])) { // on vérifie si action existe
	$action = $_GET["action"]; // on récupère sa valeur
	
	switch ($action) { // on analyse la valeur d'action
		case "add":
			// on ajoute un élément
			if (isset($_GET["content"])) { // on vérifie s'il y a un contenu dans le GET
				$content = htmlspecialchars($_GET["content"]); // on récupère le contenu et on se protège des injection SQL
				$content = $db->quote($content); // sécurité supplémentaire en passant le contenu entre des quotes
				$date = $db->quote($_GET["date"]); // idem pour la date
				$prepare = "INSERT INTO task (date, content) VALUES ($date, $content)"; 
				$add = $db->prepare($prepare); // on prépare la requete
				$add->execute(); // on execute la requete
			}
			break;

		case "update":
			// modifier un element
			if (isset($_GET["id"]) && isset($_GET["edit-content"])) { // on vérifie si "id" et "content" existent en GET
				$content = htmlspecialchars($_GET["edit-content"]); // on récupère le contenu et on se protège des injection SQL
				$content = $db->quote($content);
				$id = $_GET["id"];
				$date = $_GET["edit-date"];
				$date = substr($date, 0, -3);
				$date = $db->quote($date);
				echo $content;
				echo $id;
				echo $date;
				$prepare = "UPDATE task SET content = $content, date = $date WHERE id = $id";
				$update = $db->prepare($prepare); // on prépare la requete
				try {
					$update->execute(); // on execute la requete
				} catch(PDOException $e) { // si la connexion à la BDD échoue
				    echo $e->getMessage(); // on envoie un message d'erreur
				}
			}
			break;

		case "remove":
			// supprimer un élément
			if (isset($_GET["id"])) { // on vérifie si "id" et "content" existent en GET
				$id = $_GET["id"]; // on récupère sa valeur
				$remove = $db->prepare("DELETE FROM task WHERE id = :id"); // on prépare la requete
				$remove->bindValue(":id", $id); // on attache les valeurs
				$remove->execute(); // on execute la requete
			}
			break;
	}
}

?>