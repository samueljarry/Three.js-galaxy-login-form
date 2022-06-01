<?php
require 'lib.php';

$p  = $_POST['prenom'];
$n  = $_POST['nom'];
$m  = $_POST['mdp'];
$t  = $_POST['tp'];


$co = connexionBD();
ajouterEtudiant($co, $p, $n, $m, $t);
deconnexionBD($co)
?>
