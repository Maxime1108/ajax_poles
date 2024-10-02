<?php

$id = $_GET["id"] ?? null;

if( $id ) { // si $id n'est pas vide ou null
    $pdo = new PDO("mysql:host=localhost;dbname=poles_livres", "root", "");
    $requete = $pdo->prepare("SELECT * FROM livre WHERE id = :id");
    $requete->bindValue(":id", $id);
    if( $requete->execute() ) {
        if( $requete->rowCount() == 1 ) {
            $livre = $requete->fetch(PDO::FETCH_ASSOC);
            // La fonction 'header' ajoute un entête à la réponse HTTP renvoyée.
            // L'entête 'Content-type' permet de spécifier le type de contenu d'une réponse
            //      HTTP
            header('Content-Type: application/json');

            echo json_encode($livre);
            exit;
        } else {
            // La fonction http_response_code permet de définir le code HTTP de la 
            //      réponse HTTP. Par défaut, quand une page est trouvé, le code est 200.
            http_response_code(404);
            exit;
        }
    }
}
http_response_code(500);
exit;