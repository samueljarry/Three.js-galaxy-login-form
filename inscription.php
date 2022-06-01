<?php
require 'lib.php';

$p  = $_POST['prenom'];
$n  = $_POST['nom'];
$m  = $_POST['mdp'];
$t  = $_POST['tp'];

/* echo ucfirst(mb_strtolower($p)), ucfirst(mb_strtolower($n)), password_hash($m, PASSWORD_BCRYPT), $t; */

$co = connexionBD();
ajouterEtudiant($co, $p, $n, $m, $t);
deconnexionBD($co)
?>