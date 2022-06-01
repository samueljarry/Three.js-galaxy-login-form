<?php
require 'lib.php';

$p = $_POST['prenom'];
$n = $_POST['nom'];
$m = $_POST['mdp'];

$co=connexionBD();
 $req='SELECT * FROM etudiant 
 WHERE prenom 
 LIKE "'.ucfirst(mb_strtolower($p)).'"
 AND 
 nom 
 LIKE "'.ucfirst(mb_strtolower($n)).'"';
 echo '<p>'.$req.'</p>';
 // on lance la requête
 $resultat=$co->query($req);
 // on calcule le nombre de lignes renvoyées
 $lignes_resultat=$resultat->rowCount();
 if ($lignes_resultat>0) { // y a-t-il des résultats ?
 // oui : pour chaque résultat : afficher
 $ligne=$resultat->fetch(PDO::FETCH_ASSOC);
 if (password_verify($m, $ligne['mdp'])) {
    $_SESSION['co']= $ligne['prenom'];
    header('location:index.php');
 } else {
 echo '<p>KO... :(</p>';
 }
 }
 deconnexionBD($co);


?>