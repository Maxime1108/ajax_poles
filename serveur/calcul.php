<?php

/* EXO : écrire le code PHP pour récupérer dans l'URL 2 valeurs,
            nommées a et b.
        Ensuite la page calcul.php doit afficher le résultat de l'addition
        des 2 nombres.

    https://monsite.fr/index.php?a=...&b=...
google.com/search?q=pole+s
        */

$a = $_GET["a"] ?? null;
$b = $_GET["b"] ?? null;
$o = $_GET["o"] ?? "addition";

if( !is_null($a) && !is_null($b) ) {  // si a et b ne sont pas null
    $str = "";

    switch ($o) {
        case 'addition':
            $str = $a + $b;
            break;
        
        case "soustraction":
            $str = $a - $b;
            break;
        
        case 'multiplication':
            $str = $a * $b;
            break;
        
        case "division":
            if( $b == 0 ) {
                http_response_code(418);
            }
            $str = $a / $b;
            break;

        default:
            $str = "ERREUR";
    }
    echo $str;
}