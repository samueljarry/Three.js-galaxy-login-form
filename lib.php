<?php

session_start();
// Identifiants
require 'mdp.php';

/* 
    Connexion
*/
function connexionBD()
{
  $mabd = null;
  try {
    $mabd = new PDO('mysql:host=127.0.0.1;port=3306;
              dbname=sae202;charset=UTF8;', 
              USER, PASSWORD);
    $mabd->query('SET NAMES utf8;');
  } catch (PDOException $e) {
    echo '<p>Erreur : ' . $e->getMessage() . '</p>';
    die();
  }
  // on retourne la variable de connexion
  return $mabd;
}

/* 
    Déconnexion
*/
function deconnexionBD(&$mabd) {
    $mabd=null;
  }

/* 
  Récupérer séléction groupe TP
*/ 

function listeTP($mabd) {
    $req = "SELECT * FROM tp";
    try {
        $resultat = $mabd->query($req);
    } catch (PDOException $e) {
        // s'il y a une erreur, on l'affiche
        echo '<p>Erreur : ' . $e->getMessage() . '</p>';
        die();
    }
    foreach ($resultat as $value) {
        echo '<option value="'.$value['groupe'].'">'; // id de l'auteur
        echo $value['groupe']; // prénom espace nom
        echo '</option>'."\n";
    }
}

/* 
    Inscription étudiant
*/

 function ajouterEtudiant($mabd, $p, $n, $m, $t)
 {
     $req = 'INSERT INTO etudiant (prenom, nom, tp, mdp) 
     VALUES 
     ("'.ucfirst(mb_strtolower($p)).'",
     "'.ucfirst(mb_strtolower($n)).'",
     "'.$t.'",
     "'.password_hash($m, PASSWORD_BCRYPT).'"
     )';
     echo '<p>' . $req . '</p>' . "\n";
     try {
         $resultat = $mabd->query($req);
     } catch (PDOException $e) {
         // s'il y a une erreur, on l'affiche
         echo '<p>Erreur : ' . $e->getMessage() . '</p>';
         die();
     }
     if ($resultat->rowCount() == 1) {
         echo "<p>L'étudiant a été ajouté.</p><br>";
     } else {
         echo '<p>Erreur lors de l\'ajout.</p>' . "\n";
         die();
     }
 }

?>
