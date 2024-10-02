<?php

$pdo = new PDO("mysql:host=localhost;dbname=poles_livres", "root", "");

// SELECT * FROM livre
$requete = $pdo->query("SELECT * FROM livre");

if( $requete ) {
    $livres = $requete->fetchAll(PDO::FETCH_ASSOC);
    $livres = json_encode($livres);
    echo $livres;
}
